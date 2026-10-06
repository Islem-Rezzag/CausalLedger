/* M04.05: run only against the explicitly provisioned storage database/roles. */
exports.up = (pgm) =>
  pgm.sql(String.raw`
DO $guard$
BEGIN
  IF current_user <> 'causalledger_storage_owner' OR
     EXISTS (SELECT 1 FROM pg_catalog.pg_roles WHERE rolname IN
       ('causalledger_storage_owner', 'causalledger_storage_app') AND
       (rolsuper OR rolcreatedb OR rolcreaterole OR rolbypassrls OR rolreplication)) OR
     NOT EXISTS (SELECT 1 FROM pg_catalog.pg_roles WHERE rolname = 'causalledger_storage_app') OR
     pg_catalog.pg_has_role('causalledger_storage_app', 'causalledger_storage_owner', 'MEMBER')
  THEN RAISE EXCEPTION 'Restricted, separate storage owner/application roles are required';
  END IF;
END
$guard$;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT USAGE ON SCHEMA public TO causalledger_storage_app;
ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE EXECUTE ON FUNCTIONS FROM PUBLIC;

CREATE FUNCTION public.ledger_object(v jsonb, fields text[]) RETURNS boolean
LANGUAGE sql IMMUTABLE SET search_path = pg_catalog, pg_temp AS $f$
  SELECT CASE WHEN jsonb_typeof(v) = 'object' THEN
    v ?& fields AND (SELECT count(*) FROM jsonb_object_keys(v)) = cardinality(fields)
    ELSE false END
$f$;
CREATE FUNCTION public.ledger_strings(v jsonb, fields text[]) RETURNS boolean
LANGUAGE sql IMMUTABLE SET search_path = pg_catalog, pg_temp AS $f$
  SELECT coalesce(bool_and(jsonb_typeof(v -> field) = 'string'), false)
  FROM unnest(fields) field
$f$;
CREATE FUNCTION public.ledger_instant(v text) RETURNS boolean
LANGUAGE plpgsql IMMUTABLE SET search_path = pg_catalog, pg_temp AS $f$
BEGIN
  IF v IS NULL OR v COLLATE "C" !~ '^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]{3}Z$'
    OR left(v,4) = '0000' THEN RETURN false; END IF;
  RETURN to_char(v::timestamptz AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"') = v;
EXCEPTION WHEN invalid_datetime_format OR datetime_field_overflow THEN RETURN false;
END
$f$;
CREATE FUNCTION public.ledger_header(v jsonb) RETURNS boolean
LANGUAGE plpgsql IMMUTABLE SET search_path = pg_catalog, pg_temp AS $f$
DECLARE p jsonb; r jsonb;
BEGIN
  IF public.ledger_object(v, ARRAY['contractVersion','id','ledgerId','status','effectiveAt','recordedAt','idempotencyKey','provenance']) IS NOT TRUE OR
     public.ledger_strings(v, ARRAY['contractVersion','id','ledgerId','status','effectiveAt','recordedAt','idempotencyKey']) IS NOT TRUE OR
     v->>'contractVersion' <> 'm04.02-ledger-transaction.v1' OR
     v->>'id' COLLATE "C" !~ '^txn_[0-7][0-9A-HJKMNP-TV-Z]{25}$' OR
     v->>'ledgerId' COLLATE "C" !~ '^ldg_[0-7][0-9A-HJKMNP-TV-Z]{25}$' OR
     v->>'status' NOT IN ('pending','posted','rejected','voided') OR
     public.ledger_instant(v->>'effectiveAt') IS NOT TRUE OR public.ledger_instant(v->>'recordedAt') IS NOT TRUE OR
     v->>'idempotencyKey' COLLATE "C" !~ '^[A-Za-z0-9][A-Za-z0-9._:-]{0,127}$'
  THEN RETURN false; END IF;
  p := v->'provenance';
  IF public.ledger_object(p, ARRAY['source','moneyEventIds','evidence']) IS NOT TRUE OR
     public.ledger_object(p->'source', ARRAY['namespace','id']) IS NOT TRUE OR
     public.ledger_strings(p->'source', ARRAY['namespace','id']) IS NOT TRUE OR
     p->'source'->>'namespace' COLLATE "C" !~ '^[a-z][a-z0-9.-]{0,63}$' OR
     p->'source'->>'id' COLLATE "C" !~ '^[A-Za-z0-9][A-Za-z0-9._:-]{0,127}$' OR
     jsonb_typeof(p->'moneyEventIds') IS DISTINCT FROM 'array' OR
     jsonb_typeof(p->'evidence') IS DISTINCT FROM 'array'
  THEN RETURN false; END IF;
  IF jsonb_array_length(p->'evidence') = 0 OR
     (SELECT count(*) <> count(DISTINCT value) FROM jsonb_array_elements(p->'moneyEventIds')) OR
     (SELECT count(*) <> count(DISTINCT value->>'receiptId') FROM jsonb_array_elements(p->'evidence'))
  THEN RETURN false; END IF;
  FOR r IN SELECT value FROM jsonb_array_elements(p->'moneyEventIds') LOOP
    IF jsonb_typeof(r) IS DISTINCT FROM 'string' OR r #>> '{}' COLLATE "C" !~ '^evt_[0-7][0-9A-HJKMNP-TV-Z]{25}$'
      THEN RETURN false; END IF;
  END LOOP;
  FOR r IN SELECT value FROM jsonb_array_elements(p->'evidence') LOOP
    IF public.ledger_object(r, ARRAY['receiptId','contentHash']) IS NOT TRUE OR
       public.ledger_strings(r, ARRAY['receiptId','contentHash']) IS NOT TRUE OR
       r->>'receiptId' COLLATE "C" !~ '^rcpt_[0-7][0-9A-HJKMNP-TV-Z]{25}$' OR
       r->>'contentHash' COLLATE "C" !~ '^sha256:[0-9a-f]{64}$'
    THEN RETURN false; END IF;
  END LOOP;
  RETURN true;
END
$f$;
CREATE FUNCTION public.ledger_account(v jsonb) RETURNS boolean
LANGUAGE plpgsql IMMUTABLE SET search_path = pg_catalog, pg_temp AS $f$
DECLARE n jsonb; u jsonb; k integer;
BEGIN
  IF public.ledger_object(v, ARRAY['storageVersion','account']) IS NOT TRUE OR
     jsonb_typeof(v->'storageVersion') IS DISTINCT FROM 'string' OR v->>'storageVersion' <> 'm04.05-account-snapshot.v1'
  THEN RETURN false; END IF;
  v := v->'account';
  IF public.ledger_object(v, ARRAY['contractVersion','id','ledgerId','name','category','normalBalance','currency','owner','status']) IS NOT TRUE OR
     public.ledger_strings(v, ARRAY['contractVersion','id','ledgerId','category','normalBalance','currency','status']) IS NOT TRUE OR
     v->>'contractVersion' <> 'm04.01-account.v1' OR
     v->>'id' COLLATE "C" !~ '^acct_[0-7][0-9A-HJKMNP-TV-Z]{25}$' OR
     v->>'ledgerId' COLLATE "C" !~ '^ldg_[0-7][0-9A-HJKMNP-TV-Z]{25}$' OR
     v->>'currency' NOT IN ('USD','EUR','GBP') OR v->>'status' NOT IN ('active','closed') OR
     NOT ((v->>'category' IN ('asset','expense') AND v->>'normalBalance' = 'debit') OR
          (v->>'category' IN ('liability','equity','revenue') AND v->>'normalBalance' = 'credit')) OR
     public.ledger_object(v->'owner', ARRAY['namespace','id']) IS NOT TRUE OR
     public.ledger_strings(v->'owner', ARRAY['namespace','id']) IS NOT TRUE OR
     v->'owner'->>'namespace' COLLATE "C" !~ '^[a-z][a-z0-9.-]{0,63}$' OR
     v->'owner'->>'id' COLLATE "C" !~ '^[A-Za-z0-9][A-Za-z0-9._:-]{0,127}$'
  THEN RETURN false; END IF;
  n := v->'name';
  -- UTF-16 storage encoding preserves every accepted name, including lone surrogates.
  IF public.ledger_object(n, ARRAY['representation','units']) IS NOT TRUE OR
     jsonb_typeof(n->'representation') IS DISTINCT FROM 'string' OR n->>'representation' <> 'utf16_code_units' OR
     jsonb_typeof(n->'units') IS DISTINCT FROM 'array'
  THEN RETURN false; END IF;
  IF jsonb_array_length(n->'units') NOT BETWEEN 1 AND 120 THEN RETURN false; END IF;
  FOR u IN SELECT value FROM jsonb_array_elements(n->'units') LOOP
    IF jsonb_typeof(u) IS DISTINCT FROM 'number' OR u::text !~ '^[0-9]{1,5}$' THEN RETURN false; END IF;
    k := u::text::integer;
    IF k NOT BETWEEN 32 AND 65535 OR k = 127 THEN RETURN false; END IF;
  END LOOP;
  IF (n->'units'->>0)::integer IN (32,160,5760,8192,8193,8194,8195,8196,8197,8198,8199,8200,8201,8202,8232,8233,8239,8287,12288,65279) OR
     (n->'units'->>-1)::integer IN (32,160,5760,8192,8193,8194,8195,8196,8197,8198,8199,8200,8201,8202,8232,8233,8239,8287,12288,65279)
  THEN RETURN false; END IF;
  RETURN true;
END
$f$;

CREATE TABLE public.ledger_transactions (
  id text PRIMARY KEY,
  ledger_id text NOT NULL,
  journal_version text NOT NULL CHECK (journal_version = 'm04.04-ledger-journal.v1'),
  header jsonb NOT NULL CHECK (public.ledger_header(header) IS TRUE),
  UNIQUE(id,ledger_id),
  CHECK (header->>'id' = id AND header->>'ledgerId' = ledger_id)
);
CREATE TABLE public.ledger_account_snapshots (
  transaction_id text NOT NULL,
  account_id text NOT NULL,
  ledger_id text NOT NULL,
  currency text NOT NULL CHECK (currency IN ('USD','EUR','GBP')),
  snapshot jsonb NOT NULL CHECK (public.ledger_account(snapshot) IS TRUE),
  PRIMARY KEY(transaction_id,account_id),
  UNIQUE(transaction_id,account_id,ledger_id,currency),
  FOREIGN KEY(transaction_id,ledger_id) REFERENCES public.ledger_transactions(id,ledger_id),
  CHECK (snapshot->'account'->>'id' = account_id AND snapshot->'account'->>'ledgerId' = ledger_id AND snapshot->'account'->>'currency' = currency)
);
CREATE TABLE public.ledger_entries (
  id text PRIMARY KEY CHECK (id COLLATE "C" ~ '^ent_[0-7][0-9A-HJKMNP-TV-Z]{25}$'),
  transaction_id text NOT NULL,
  ledger_id text NOT NULL,
  account_id text NOT NULL,
  contract_version text NOT NULL CHECK (contract_version = 'm04.03-ledger-entry.v1'),
  side text NOT NULL CHECK (side IN ('debit','credit')),
  representation text NOT NULL CHECK (representation = 'integer_minor_units'),
  minor_units bigint NOT NULL CHECK (minor_units > 0),
  currency text NOT NULL CHECK (currency IN ('USD','EUR','GBP')),
  FOREIGN KEY(transaction_id,ledger_id) REFERENCES public.ledger_transactions(id,ledger_id),
  FOREIGN KEY(transaction_id,account_id,ledger_id,currency)
    REFERENCES public.ledger_account_snapshots(transaction_id,account_id,ledger_id,currency)
);
CREATE FUNCTION public.ledger_deny_mutation() RETURNS trigger
LANGUAGE plpgsql SET search_path = pg_catalog, pg_temp AS $f$
BEGIN RAISE EXCEPTION 'Stored journal history is immutable' USING ERRCODE = '55000'; END
$f$;
CREATE TRIGGER immutable_transactions BEFORE UPDATE OR DELETE ON public.ledger_transactions
  FOR EACH ROW EXECUTE FUNCTION public.ledger_deny_mutation();
CREATE TRIGGER immutable_accounts BEFORE UPDATE OR DELETE ON public.ledger_account_snapshots
  FOR EACH ROW EXECUTE FUNCTION public.ledger_deny_mutation();
CREATE TRIGGER immutable_entries BEFORE UPDATE OR DELETE ON public.ledger_entries
  FOR EACH ROW EXECUTE FUNCTION public.ledger_deny_mutation();
CREATE TRIGGER immutable_transactions_truncate BEFORE TRUNCATE ON public.ledger_transactions
  FOR EACH STATEMENT EXECUTE FUNCTION public.ledger_deny_mutation();
CREATE TRIGGER immutable_accounts_truncate BEFORE TRUNCATE ON public.ledger_account_snapshots
  FOR EACH STATEMENT EXECUTE FUNCTION public.ledger_deny_mutation();
CREATE TRIGGER immutable_entries_truncate BEFORE TRUNCATE ON public.ledger_entries
  FOR EACH STATEMENT EXECUTE FUNCTION public.ledger_deny_mutation();

CREATE FUNCTION public.append_ledger_journal(journal jsonb, accounts jsonb) RETURNS jsonb
LANGUAGE plpgsql SECURITY DEFINER SET search_path = pg_catalog, pg_temp AS $f$
DECLARE h jsonb; e jsonb; a jsonb; t text; l text;
BEGIN
  IF public.ledger_object(journal, ARRAY['contractVersion','transaction','entries']) IS NOT TRUE OR
     jsonb_typeof(journal->'contractVersion') IS DISTINCT FROM 'string' OR
     journal->>'contractVersion' <> 'm04.04-ledger-journal.v1' OR
     public.ledger_header(journal->'transaction') IS NOT TRUE OR
     jsonb_typeof(journal->'entries') IS DISTINCT FROM 'array' OR
     jsonb_typeof(accounts) IS DISTINCT FROM 'array'
  THEN RAISE EXCEPTION 'Invalid complete journal wire data' USING ERRCODE = '22023'; END IF;
  IF jsonb_array_length(journal->'entries') = 0 THEN
    RAISE EXCEPTION 'A complete journal requires entries' USING ERRCODE = '22023'; END IF;
  h := journal->'transaction'; t := h->>'id'; l := h->>'ledgerId';
  -- New transaction identity seals the journal; an existing one can never be extended.
  INSERT INTO public.ledger_transactions(id,ledger_id,journal_version,header)
    VALUES(t,l,journal->>'contractVersion',h);
  FOR a IN SELECT value FROM jsonb_array_elements(accounts) LOOP
    IF public.ledger_account(a) IS NOT TRUE THEN
      RAISE EXCEPTION 'Invalid account snapshot' USING ERRCODE = '22023'; END IF;
    INSERT INTO public.ledger_account_snapshots(transaction_id,account_id,ledger_id,currency,snapshot)
      VALUES(t,a->'account'->>'id',a->'account'->>'ledgerId',a->'account'->>'currency',a);
  END LOOP;
  FOR e IN SELECT value FROM jsonb_array_elements(journal->'entries') LOOP
    IF public.ledger_object(e, ARRAY['contractVersion','id','transactionId','ledgerId','accountId','side','amount']) IS NOT TRUE OR
       public.ledger_strings(e, ARRAY['contractVersion','id','transactionId','ledgerId','accountId','side']) IS NOT TRUE OR
       public.ledger_object(e->'amount', ARRAY['representation','minorUnits','currency']) IS NOT TRUE OR
       public.ledger_strings(e->'amount', ARRAY['representation','minorUnits','currency']) IS NOT TRUE OR
       e->>'transactionId' <> t OR e->>'ledgerId' <> l OR
       e->'amount'->>'minorUnits' COLLATE "C" !~ '^[1-9][0-9]{0,18}$'
    THEN RAISE EXCEPTION 'Invalid entry wire data or header reference' USING ERRCODE = '22023'; END IF;
    INSERT INTO public.ledger_entries(id,transaction_id,ledger_id,account_id,contract_version,side,representation,minor_units,currency)
      VALUES(e->>'id',e->>'transactionId',e->>'ledgerId',e->>'accountId',e->>'contractVersion',e->>'side',
        e->'amount'->>'representation',(e->'amount'->>'minorUnits')::bigint,e->'amount'->>'currency');
  END LOOP;
  IF EXISTS (SELECT currency FROM public.ledger_entries WHERE transaction_id = t GROUP BY currency
    HAVING sum(CASE WHEN side = 'debit' THEN minor_units::numeric ELSE 0 END) = 0 OR
           sum(CASE WHEN side = 'credit' THEN minor_units::numeric ELSE 0 END) = 0 OR
           sum(CASE WHEN side = 'debit' THEN minor_units::numeric ELSE -minor_units::numeric END) <> 0)
  THEN RAISE EXCEPTION 'Exact per-currency debit/credit equality is required' USING ERRCODE = '23514'; END IF;
  IF EXISTS (SELECT 1 FROM public.ledger_account_snapshots a WHERE a.transaction_id = t AND NOT EXISTS
    (SELECT 1 FROM public.ledger_entries e WHERE e.transaction_id = t AND e.account_id = a.account_id))
  THEN RAISE EXCEPTION 'Only referenced account snapshots may be stored' USING ERRCODE = '22023'; END IF;
  RETURN jsonb_build_object('contractVersion','m04.05-ledger-storage.v1','transactionId',t,
    'entryCount',jsonb_array_length(journal->'entries'));
END
$f$;
REVOKE ALL ON ALL TABLES IN SCHEMA public FROM PUBLIC, causalledger_storage_app;
GRANT SELECT ON public.ledger_transactions, public.ledger_account_snapshots, public.ledger_entries TO causalledger_storage_app;
REVOKE ALL ON ALL FUNCTIONS IN SCHEMA public FROM PUBLIC, causalledger_storage_app;
GRANT EXECUTE ON FUNCTION public.append_ledger_journal(jsonb,jsonb) TO causalledger_storage_app;
`);

exports.down = (pgm) =>
  pgm.sql(String.raw`
DO $guard$
BEGIN
  IF current_user <> 'causalledger_storage_owner' OR
     EXISTS (SELECT 1 FROM public.ledger_transactions) OR
     EXISTS (SELECT 1 FROM public.ledger_account_snapshots) OR
     EXISTS (SELECT 1 FROM public.ledger_entries)
  THEN RAISE EXCEPTION 'Down migration refuses stored history or wrong owner'; END IF;
END
$guard$;
DROP FUNCTION public.append_ledger_journal(jsonb,jsonb);
DROP TABLE public.ledger_entries;
DROP TABLE public.ledger_account_snapshots;
DROP TABLE public.ledger_transactions;
DROP FUNCTION public.ledger_deny_mutation();
DROP FUNCTION public.ledger_account(jsonb);
DROP FUNCTION public.ledger_header(jsonb);
DROP FUNCTION public.ledger_instant(text);
DROP FUNCTION public.ledger_strings(jsonb,text[]);
DROP FUNCTION public.ledger_object(jsonb,text[]);
`);
