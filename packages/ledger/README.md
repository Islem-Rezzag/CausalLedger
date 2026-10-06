# Ledger Package

`@causalledger/ledger` owns M04.01 Account, M04.02 LedgerTransaction header and M04.03 LedgerEntry wire/reference contracts and M04.04 pure exact journal validation.

The original M02.05 scaffold supplied:

- package manifest;
- TypeScript source and test configs extending the root config;
- package boundary export (now describes three schema contracts and pure journal validation);
- bootstrap test;
- local build, typecheck, test, lint, and format-check scripts.

`validateAccountCandidate(unknown)` returns a detached frozen Account snapshot or deterministic issues. `validateAccountCatalog(unknown)` validates a supplied array and rejects every duplicate account ID, including conflicting owner, currency or ledger assignments, without partial output. They neither create nor store accounts. M04.01 itself added no runtime dependency.

The contract requires explicit `acct_`/`ldg_` ULIDs, owner namespace/reference, name, category, normal side, supported currency and active/closed metadata. Supported categories are asset/liability/equity/revenue/expense; asset and expense are debit-normal, the rest credit-normal. Supported currencies are USD/EUR/GBP. No coercion, defaulting, inferred ownership, sign override or unknown fields are allowed.

See [the account contract](../../docs/specs/account-schema.md) for exact fields, identity, sign, lifecycle and input limits. Run `corepack pnpm --filter @causalledger/ledger test` for the executable synthetic demonstration and `corepack pnpm --filter @causalledger/ledger typecheck` for compile-time boundaries.

`validateLedgerTransactionCandidate(unknown)` validates supplied header identity, ledger namespace, status, two UTC clocks, retry key and explicit source/event/receipt/hash references. It returns a detached frozen snapshot or stable issues, with no partial output. Repeated receipt identities with conflicting hashes reject. See [the transaction contract](../../docs/specs/ledger-transaction-schema.md) and the executable synthetic demonstration in ledger tests.

`validateLedgerEntryCandidate(unknown, unknown)` requires versioned entry wire data and explicit `{ transaction, accounts }` snapshots. Canonical positive decimal minor-unit strings from 1 through 9223372036854775807 become exact bigint; zero, negative, Number, bigint input and ambiguous strings reject. Explicit debit/credit side and account/ledger/header references are checked; entry and supplied account currencies must match USD/EUR/GBP. See [the entry contract](../../docs/specs/ledger-entry-schema.md) for input/context/range policy and the executable synthetic debit/currency-drift demonstration.

`validateLedgerJournalCandidate(unknown, suppliedAccounts)` validates a versioned group containing one full header and wire entries. It reuses the existing schema validators, refuses repeated entry IDs and requires positive debit and credit totals of equal exact bigint value separately for each currency. Totals may exceed the per-line maximum. Any error returns stable issues without partial entries or totals. Success sorts entries by ID and totals by currency, preserving header provenance order, and deeply freezes detached snapshots. See [the journal contract](../../docs/specs/ledger-journal-validation.md) and the executable 1250/1250 versus 1250/1249 synthetic demonstration in ledger tests.

Account/header/entry/journal validation establish structural and arithmetic consistency, not financial truth, evidence authenticity, authorization, durable uniqueness, exactly-once occurrences or lifecycle approval. A caller-supplied posted header does not post a journal; a valid entry line is not a balanced transaction. No postings, account balance queries, reversals, business account factories, agents or live money mutation exist. Account/header lifecycle metadata is not posting eligibility. Other packages retain their boundaries. M04.06 and later remain unimplemented. Pure bigint snapshots are not directly JSON serializable; M04.05 adds its own explicit lossless storage encoder.

`createLedgerJournalStore(explicitConnectionUrl)` revalidates journal wire data and the supplied catalog, then appends one complete synthetic journal through an atomic PostgreSQL routine. It snapshots only referenced accounts, preserves exact decimal/bigint money and supplied header metadata, and refuses duplicate durable IDs. The application role cannot mutate/delete/truncate or append entries to existing history. `LedgerJournalStorageError` distinguishes recognized refusal from unknown acknowledgement outcome; no automatic retries or general queries exist. `pg@8.22.0` is the only new runtime dependency.

See [the storage contract](../../docs/specs/ledger-immutable-storage.md). Driver doubles verify I/O/error boundaries; mandatory `corepack pnpm test:ledger-storage` verifies real migration/atomicity/rollback/readback/privilege behavior on an explicitly owned disposable Postgres17 database. Missing configuration fails. PR #66 initial CI37445358766 executed64 real tests and migrations/schema/owned cleanup successfully; candidate independent QA PASS; final tracking-head review and acceptance remain required before human merge. Local Docker is unavailable; pure tests do not substitute for database proof.
