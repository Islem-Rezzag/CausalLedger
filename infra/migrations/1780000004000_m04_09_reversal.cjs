exports.up = (pgm) =>
  pgm.sql(String.raw`
DO $guard$
BEGIN
  IF current_user<>'causalledger_storage_owner' OR
    EXISTS(SELECT 1 FROM pg_catalog.pg_roles WHERE rolname IN ('causalledger_storage_owner','causalledger_storage_app')
      AND (rolsuper OR rolcreatedb OR rolcreaterole OR rolreplication OR rolbypassrls)) OR
    NOT EXISTS(SELECT 1 FROM pg_catalog.pg_roles WHERE rolname='causalledger_storage_app') OR
    pg_catalog.pg_has_role('causalledger_storage_app','causalledger_storage_owner','MEMBER')
  THEN RAISE EXCEPTION 'Restricted storage owner/application identities required'; END IF;
END
$guard$;
CREATE TABLE public.ledger_reversals (
  original_transaction_id text PRIMARY KEY,
  reversal_transaction_id text UNIQUE NOT NULL,
  ledger_id text NOT NULL,
  contract_version text NOT NULL CHECK(contract_version='m04.09-ledger-reversal.v1'),
  kind text NOT NULL CHECK(kind='full'),
  CHECK(original_transaction_id<>reversal_transaction_id),
  FOREIGN KEY(original_transaction_id,ledger_id) REFERENCES public.ledger_transactions(id,ledger_id),
  FOREIGN KEY(reversal_transaction_id,ledger_id) REFERENCES public.ledger_transactions(id,ledger_id)
);
CREATE TRIGGER immutable_reversals BEFORE UPDATE OR DELETE ON public.ledger_reversals
  FOR EACH ROW EXECUTE FUNCTION public.ledger_deny_mutation();
CREATE TRIGGER immutable_reversals_truncate BEFORE TRUNCATE ON public.ledger_reversals
  FOR EACH STATEMENT EXECUTE FUNCTION public.ledger_deny_mutation();
CREATE FUNCTION public.append_ledger_reversal(request jsonb, accounts jsonb) RETURNS jsonb
LANGUAGE plpgsql VOLATILE SECURITY DEFINER SET search_path=pg_catalog,pg_temp AS $f$
DECLARE journal jsonb; h jsonb; semantic jsonb; original jsonb; snapshots jsonb; original_semantic jsonb;
  expected_entries jsonb; previous public.ledger_idempotency_keys%ROWTYPE; link public.ledger_reversals%ROWTYPE;
  has_key boolean; has_link boolean; original_id text; receipt jsonb;
BEGIN
  IF current_setting('transaction_isolation')<>'read committed'
  THEN RAISE EXCEPTION 'Explicit READ COMMITTED required' USING ERRCODE='22023'; END IF;
  IF public.ledger_object(request,ARRAY['contractVersion','kind','originalTransactionId','journal']) IS NOT TRUE OR
    public.ledger_strings(request,ARRAY['contractVersion','kind','originalTransactionId']) IS NOT TRUE OR
    request->>'contractVersion'<>'m04.09-ledger-reversal.v1' OR request->>'kind'<>'full' OR
    request->>'originalTransactionId' COLLATE "C" !~ '^txn_[0-7][0-9A-HJKMNP-TV-Z]{25}$'
  THEN RAISE EXCEPTION 'Strict full reversal request required' USING ERRCODE='22023'; END IF;
  journal:=request->'journal'; h:=journal->'transaction'; original_id:=request->>'originalTransactionId';
  semantic:=public.ledger_idempotency_payload(journal,accounts);
  IF h->>'status'<>'posted' OR h->>'id'=original_id
  THEN RAISE EXCEPTION 'Distinct posted reversal required' USING ERRCODE='23514'; END IF;
  -- Exact08 scope lock FIRST; original lock uses the disjoint two-int advisory-lock space.
  PERFORM pg_advisory_xact_lock(hashtextextended(jsonb_build_array(h->>'ledgerId',h->'provenance'->'source'->>'namespace',h->>'idempotencyKey')::text,0));
  PERFORM pg_advisory_xact_lock(409,hashtext(original_id));
  -- Separate VOLATILE commands observe a fresh READ COMMITTED snapshot after waiting.
  SELECT * INTO previous FROM public.ledger_idempotency_keys WHERE ledger_id=h->>'ledgerId'
    AND source_namespace=h->'provenance'->'source'->>'namespace' AND idempotency_key=h->>'idempotencyKey';
  has_key:=FOUND;
  SELECT * INTO link FROM public.ledger_reversals WHERE original_transaction_id=original_id;
  has_link:=FOUND;
  IF (has_key AND (NOT has_link OR previous.transaction_id<>link.reversal_transaction_id OR previous.payload IS DISTINCT FROM semantic)) OR
     (has_link AND (NOT has_key OR link.contract_version<>request->>'contractVersion' OR link.kind<>request->>'kind'))
  THEN RAISE EXCEPTION 'Existing key/outcome or full reversal conflicts' USING ERRCODE='23505'; END IF;
  IF EXISTS(SELECT 1 FROM public.ledger_reversals WHERE reversal_transaction_id=original_id)
  THEN RAISE EXCEPTION 'Reversal of a reversal is unsupported' USING ERRCODE='23514'; END IF;
  SELECT jsonb_build_object('contractVersion',t.journal_version,'transaction',t.header,'entries',
    (SELECT jsonb_agg(jsonb_build_object('contractVersion',e.contract_version,'id',e.id,'transactionId',e.transaction_id,
      'ledgerId',e.ledger_id,'accountId',e.account_id,'side',e.side,'amount',jsonb_build_object('representation','integer_minor_units',
      'minorUnits',e.minor_units::text,'currency',e.currency)) ORDER BY e.id) FROM public.ledger_entries e WHERE e.transaction_id=t.id)),
    (SELECT jsonb_agg(a.snapshot ORDER BY a.account_id) FROM public.ledger_account_snapshots a WHERE a.transaction_id=t.id)
    INTO original,snapshots FROM public.ledger_transactions t WHERE t.id=original_id AND t.ledger_id=h->>'ledgerId';
  IF NOT FOUND OR original->'transaction'->>'status'<>'posted'
  THEN RAISE EXCEPTION 'Matching posted original required' USING ERRCODE='23514'; END IF;
  original_semantic:=public.ledger_idempotency_payload(original,snapshots);
  SELECT jsonb_agg(jsonb_set(value,'{side}',to_jsonb(CASE WHEN value->>'side'='debit' THEN 'credit'::text ELSE 'debit'::text END))
    ORDER BY value->>'accountId' COLLATE "C", CASE WHEN value->>'side'='debit' THEN 'credit' ELSE 'debit' END COLLATE "C",
      value->'amount'->>'minorUnits' COLLATE "C",value->'amount'->>'currency' COLLATE "C")
    INTO expected_entries FROM jsonb_array_elements(original_semantic->'entries');
  IF semantic->'entries' IS DISTINCT FROM expected_entries OR semantic->'accounts' IS DISTINCT FROM original_semantic->'accounts'
  THEN RAISE EXCEPTION 'Full inverse multiset and original Account snapshots required' USING ERRCODE='23514'; END IF;
  IF NOT (h->'provenance'->'moneyEventIds' @> original->'transaction'->'provenance'->'moneyEventIds') OR
     NOT (h->'provenance'->'evidence' @> original->'transaction'->'provenance'->'evidence')
  THEN RAISE EXCEPTION 'Original provenance must be retained' USING ERRCODE='23514'; END IF;
  receipt:=public.append_idempotent_ledger_journal(journal,accounts);
  IF NOT has_link THEN
    INSERT INTO public.ledger_reversals(original_transaction_id,reversal_transaction_id,ledger_id,contract_version,kind)
      VALUES(original_id,receipt->>'transactionId',h->>'ledgerId',request->>'contractVersion',request->>'kind');
  END IF;
  RETURN receipt || jsonb_build_object('contractVersion','m04.09-ledger-reversal.v1','kind','full','originalTransactionId',original_id);
END
$f$;
REVOKE ALL ON public.ledger_reversals FROM PUBLIC,causalledger_storage_app;
GRANT SELECT ON public.ledger_reversals TO causalledger_storage_app;
REVOKE ALL ON FUNCTION public.append_ledger_reversal(jsonb,jsonb) FROM PUBLIC,causalledger_storage_app;
GRANT EXECUTE ON FUNCTION public.append_ledger_reversal(jsonb,jsonb) TO causalledger_storage_app;
`);
exports.down = (pgm) =>
  pgm.sql(String.raw`
DO $guard$
BEGIN
  IF current_user<>'causalledger_storage_owner' OR EXISTS(SELECT 1 FROM public.ledger_reversals)
  THEN RAISE EXCEPTION 'Down refuses reversal history or wrong owner'; END IF;
END
$guard$;
DROP FUNCTION public.append_ledger_reversal(jsonb,jsonb);
DROP TABLE public.ledger_reversals;
`);
