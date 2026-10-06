/* M04.08 additive scoped reservations. M04.05 history and append behavior stay intact. */
exports.up = (pgm) => pgm.sql(String.raw`
DO $guard$
BEGIN
  IF current_user <> 'causalledger_storage_owner' OR
     EXISTS (SELECT 1 FROM pg_catalog.pg_roles WHERE rolname IN ('causalledger_storage_owner','causalledger_storage_app')
       AND (rolsuper OR rolcreatedb OR rolcreaterole OR rolbypassrls OR rolreplication)) OR
     NOT EXISTS (SELECT 1 FROM pg_catalog.pg_roles WHERE rolname='causalledger_storage_app') OR
     pg_catalog.pg_has_role('causalledger_storage_app','causalledger_storage_owner','MEMBER')
  THEN RAISE EXCEPTION 'Restricted separate storage identities required'; END IF;
END
$guard$;
CREATE FUNCTION public.ledger_idempotency_payload(journal jsonb, accounts jsonb) RETURNS jsonb
LANGUAGE plpgsql IMMUTABLE SET search_path=pg_catalog,pg_temp AS $f$
DECLARE h jsonb; e jsonb; a jsonb; p jsonb; lines jsonb; snapshots jsonb; events jsonb; evidence jsonb;
BEGIN
  IF public.ledger_object(journal,ARRAY['contractVersion','transaction','entries']) IS NOT TRUE OR
     jsonb_typeof(journal->'contractVersion') IS DISTINCT FROM 'string' OR journal->>'contractVersion'<>'m04.04-ledger-journal.v1' OR
     public.ledger_header(journal->'transaction') IS NOT TRUE OR
     jsonb_typeof(journal->'entries') IS DISTINCT FROM 'array' OR jsonb_typeof(accounts) IS DISTINCT FROM 'array'
  THEN RAISE EXCEPTION 'Invalid journal wire data' USING ERRCODE='22023'; END IF;
  h:=journal->'transaction';
  IF jsonb_array_length(journal->'entries')=0 OR jsonb_array_length(accounts)=0 OR
    (SELECT count(*)<>count(DISTINCT value->>'id') FROM jsonb_array_elements(journal->'entries')) OR
    (SELECT count(*)<>count(DISTINCT value->'account'->>'id') FROM jsonb_array_elements(accounts))
  THEN RAISE EXCEPTION 'Empty or duplicate identities' USING ERRCODE='22023'; END IF;
  FOR a IN SELECT value FROM jsonb_array_elements(accounts) LOOP
    IF public.ledger_account(a) IS NOT TRUE OR a->'account'->>'ledgerId'<>h->>'ledgerId' OR NOT EXISTS
      (SELECT 1 FROM jsonb_array_elements(journal->'entries') q WHERE q->>'accountId'=a->'account'->>'id')
    THEN RAISE EXCEPTION 'Invalid referenced snapshot' USING ERRCODE='22023'; END IF;
  END LOOP;
  FOR e IN SELECT value FROM jsonb_array_elements(journal->'entries') LOOP
    IF public.ledger_object(e,ARRAY['contractVersion','id','transactionId','ledgerId','accountId','side','amount']) IS NOT TRUE OR
       public.ledger_strings(e,ARRAY['contractVersion','id','transactionId','ledgerId','accountId','side']) IS NOT TRUE OR
       e->>'contractVersion'<>'m04.03-ledger-entry.v1' OR e->>'id' COLLATE "C" !~ '^ent_[0-7][0-9A-HJKMNP-TV-Z]{25}$' OR
       e->>'transactionId'<>h->>'id' OR e->>'ledgerId'<>h->>'ledgerId' OR e->>'side' NOT IN ('debit','credit') OR
       public.ledger_object(e->'amount',ARRAY['representation','minorUnits','currency']) IS NOT TRUE OR
       public.ledger_strings(e->'amount',ARRAY['representation','minorUnits','currency']) IS NOT TRUE OR
       e->'amount'->>'representation'<>'integer_minor_units' OR
       e->'amount'->>'minorUnits' COLLATE "C" !~ '^[1-9][0-9]{0,18}$' OR
       NOT EXISTS (SELECT 1 FROM jsonb_array_elements(accounts) q WHERE q->'account'->>'id'=e->>'accountId'
         AND q->'account'->>'currency'=e->'amount'->>'currency')
    THEN RAISE EXCEPTION 'Invalid entry or reference' USING ERRCODE='22023'; END IF;
    IF (e->'amount'->>'minorUnits')::numeric>9223372036854775807
    THEN RAISE EXCEPTION 'Invalid bounded money' USING ERRCODE='22023'; END IF;
  END LOOP;
  IF EXISTS (SELECT value->'amount'->>'currency' FROM jsonb_array_elements(journal->'entries') GROUP BY value->'amount'->>'currency'
    HAVING count(*) FILTER (WHERE value->>'side'='debit')=0 OR count(*) FILTER (WHERE value->>'side'='credit')=0 OR
      sum(CASE WHEN value->>'side'='debit' THEN (value->'amount'->>'minorUnits')::numeric ELSE -(value->'amount'->>'minorUnits')::numeric END)<>0)
  THEN RAISE EXCEPTION 'Exact per-currency balance required' USING ERRCODE='23514'; END IF;
  SELECT jsonb_agg(value-ARRAY['id','transactionId'] ORDER BY value->>'accountId' COLLATE "C",value->>'side' COLLATE "C",
    value->'amount'->>'minorUnits' COLLATE "C",value->'amount'->>'currency' COLLATE "C") INTO lines FROM jsonb_array_elements(journal->'entries');
  SELECT jsonb_agg(value ORDER BY value->'account'->>'id' COLLATE "C") INTO snapshots FROM jsonb_array_elements(accounts);
  p:=h->'provenance';
  SELECT coalesce(jsonb_agg(value ORDER BY value #>> '{}' COLLATE "C"),'[]'::jsonb) INTO events FROM jsonb_array_elements(p->'moneyEventIds');
  SELECT jsonb_agg(value ORDER BY value->>'receiptId' COLLATE "C") INTO evidence FROM jsonb_array_elements(p->'evidence');
  p:=jsonb_set(jsonb_set(p,'{moneyEventIds}',events),'{evidence}',evidence);
  h:=jsonb_set(h-ARRAY['id','idempotencyKey'],'{provenance}',p);
  RETURN jsonb_build_object('contractVersion',journal->'contractVersion','transaction',h,'entries',lines,'accounts',snapshots);
END
$f$;
CREATE TABLE public.ledger_idempotency_keys (
  ledger_id text COLLATE "C" NOT NULL,
  source_namespace text COLLATE "C" NOT NULL CHECK(source_namespace ~ '^[a-z][a-z0-9.-]{0,63}$'),
  idempotency_key text COLLATE "C" NOT NULL CHECK(idempotency_key ~ '^[A-Za-z0-9][A-Za-z0-9._:-]{0,127}$'),
  transaction_id text NOT NULL,
  payload jsonb NOT NULL,
  receipt jsonb NOT NULL,
  PRIMARY KEY(ledger_id,source_namespace,idempotency_key),
  FOREIGN KEY(transaction_id,ledger_id) REFERENCES public.ledger_transactions(id,ledger_id),
  CHECK(public.ledger_object(receipt,ARRAY['contractVersion','transactionId','entryCount']) IS TRUE AND
    receipt->>'contractVersion'='m04.08-idempotency.v1' AND receipt->>'transactionId'=transaction_id AND
    jsonb_typeof(receipt->'entryCount')='number' AND receipt->>'entryCount' ~ '^[1-9][0-9]*$')
);
CREATE TRIGGER immutable_idempotency BEFORE UPDATE OR DELETE ON public.ledger_idempotency_keys
  FOR EACH ROW EXECUTE FUNCTION public.ledger_deny_mutation();
CREATE TRIGGER immutable_idempotency_truncate BEFORE TRUNCATE ON public.ledger_idempotency_keys
  FOR EACH STATEMENT EXECUTE FUNCTION public.ledger_deny_mutation();
CREATE FUNCTION public.append_idempotent_ledger_journal(journal jsonb, accounts jsonb) RETURNS jsonb
LANGUAGE plpgsql VOLATILE SECURITY DEFINER SET search_path=pg_catalog,pg_temp AS $f$
DECLARE semantic jsonb; h jsonb; previous public.ledger_idempotency_keys%ROWTYPE; original jsonb;
BEGIN
  IF current_setting('transaction_isolation')<>'read committed'
  THEN RAISE EXCEPTION 'Explicit READ COMMITTED required' USING ERRCODE='22023'; END IF;
  semantic:=public.ledger_idempotency_payload(journal,accounts); h:=journal->'transaction';
  -- A hash collision only serializes unrelated scope; full exact PK and payload equality remain authoritative.
  PERFORM pg_advisory_xact_lock(hashtextextended(jsonb_build_array(h->>'ledgerId',h->'provenance'->'source'->>'namespace',h->>'idempotencyKey')::text,0));
  -- VOLATILE separate command gets a fresh READ COMMITTED snapshot after a waiting lock.
  SELECT * INTO previous FROM public.ledger_idempotency_keys WHERE ledger_id=h->>'ledgerId'
    AND source_namespace=h->'provenance'->'source'->>'namespace' AND idempotency_key=h->>'idempotencyKey';
  IF FOUND THEN
    IF previous.payload IS DISTINCT FROM semantic
    THEN RAISE EXCEPTION 'Idempotency scope conflicts with original payload' USING ERRCODE='23505'; END IF;
    RETURN previous.receipt;
  END IF;
  original:=public.append_ledger_journal(journal,accounts);
  original:=jsonb_set(original,'{contractVersion}','"m04.08-idempotency.v1"');
  INSERT INTO public.ledger_idempotency_keys(ledger_id,source_namespace,idempotency_key,transaction_id,payload,receipt)
    VALUES(h->>'ledgerId',h->'provenance'->'source'->>'namespace',h->>'idempotencyKey',h->>'id',semantic,original);
  RETURN original;
END
$f$;
REVOKE ALL ON public.ledger_idempotency_keys FROM PUBLIC,causalledger_storage_app;
GRANT SELECT ON public.ledger_idempotency_keys TO causalledger_storage_app;
REVOKE ALL ON FUNCTION public.ledger_idempotency_payload(jsonb,jsonb), public.append_idempotent_ledger_journal(jsonb,jsonb) FROM PUBLIC,causalledger_storage_app;
GRANT EXECUTE ON FUNCTION public.append_idempotent_ledger_journal(jsonb,jsonb) TO causalledger_storage_app;
`);
exports.down = (pgm) => pgm.sql(String.raw`
DO $guard$
BEGIN
  IF current_user<>'causalledger_storage_owner' OR EXISTS(SELECT 1 FROM public.ledger_idempotency_keys)
  THEN RAISE EXCEPTION 'Down refuses idempotency history or wrong owner'; END IF;
END
$guard$;
DROP FUNCTION public.append_idempotent_ledger_journal(jsonb,jsonb);
DROP TABLE public.ledger_idempotency_keys;
DROP FUNCTION public.ledger_idempotency_payload(jsonb,jsonb);
`);
