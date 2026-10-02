# Ledger Package

`@causalledger/ledger` owns M04.01 Account, M04.02 LedgerTransaction header and M04.03 LedgerEntry wire/reference contracts and deterministic validation.

The original M02.05 scaffold supplied:

- package manifest;
- TypeScript source and test configs extending the root config;
- package boundary export (now describes the three schema contracts);
- bootstrap test;
- local build, typecheck, test, lint, and format-check scripts.

`validateAccountCandidate(unknown)` returns a detached frozen Account snapshot or deterministic issues. `validateAccountCatalog(unknown)` validates a supplied array and rejects every duplicate account ID, including conflicting owner, currency or ledger assignments, without partial output. They neither create nor store accounts. No runtime dependency was added.

The contract requires explicit `acct_`/`ldg_` ULIDs, owner namespace/reference, name, category, normal side, supported currency and active/closed metadata. Supported categories are asset/liability/equity/revenue/expense; asset and expense are debit-normal, the rest credit-normal. Supported currencies are USD/EUR/GBP. No coercion, defaulting, inferred ownership, sign override or unknown fields are allowed.

See [the account contract](../../docs/specs/account-schema.md) for exact fields, identity, sign, lifecycle and input limits. Run `corepack pnpm --filter @causalledger/ledger test` for the executable synthetic demonstration and `corepack pnpm --filter @causalledger/ledger typecheck` for compile-time boundaries.

`validateLedgerTransactionCandidate(unknown)` validates supplied header identity, ledger namespace, status, two UTC clocks, retry key and explicit source/event/receipt/hash references. It returns a detached frozen snapshot or stable issues, with no partial output. Repeated receipt identities with conflicting hashes reject. See [the transaction contract](../../docs/specs/ledger-transaction-schema.md) and the executable synthetic demonstration in ledger tests.

`validateLedgerEntryCandidate(unknown, unknown)` requires versioned entry wire data and explicit `{ transaction, accounts }` snapshots. Canonical positive decimal minor-unit strings from 1 through 9223372036854775807 become exact bigint; zero, negative, Number, bigint input and ambiguous strings reject. Explicit debit/credit side and account/ledger/header references are checked; entry and supplied account currencies must match USD/EUR/GBP. See [the entry contract](../../docs/specs/ledger-entry-schema.md) for input/context/range policy and the executable synthetic debit/currency-drift demonstration.

Account/header/entry validation establish structural consistency, not financial truth, evidence authenticity, authorization, durable uniqueness, exactly-once occurrences or lifecycle approval. A caller-supplied posted header does not post a journal; a valid entry line is not a balanced transaction. No debit-equals-credit enforcement, postings, balances, reversals, storage, database behavior, business account factories, agents or money mutation exist. Other packages retain their boundaries. M04.04 and later remain unimplemented; no dependency added. Internal bigint snapshots are not directly JSON serializable and no serializer exists.
