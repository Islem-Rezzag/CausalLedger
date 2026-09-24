# Ledger Package

`@causalledger/ledger` owns the M04.01 Account schema and deterministic metadata validation.

The original M02.05 scaffold supplied:

- package manifest;
- TypeScript source and test configs extending the root config;
- package boundary export (now describes the account schema);
- bootstrap test;
- local build, typecheck, test, lint, and format-check scripts.

`validateAccountCandidate(unknown)` returns a detached frozen Account snapshot or deterministic issues. `validateAccountCatalog(unknown)` validates a supplied array and rejects every duplicate account ID, including conflicting owner, currency or ledger assignments, without partial output. They neither create nor store accounts. No runtime dependency was added.

The contract requires explicit `acct_`/`ldg_` ULIDs, owner namespace/reference, name, category, normal side, supported currency and active/closed metadata. Supported categories are asset/liability/equity/revenue/expense; asset and expense are debit-normal, the rest credit-normal. Supported currencies are USD/EUR/GBP. No coercion, defaulting, inferred ownership, sign override or unknown fields are allowed.

See [the account contract](../../docs/specs/account-schema.md) for exact fields, identity, sign, lifecycle and input limits. Run `corepack pnpm --filter @causalledger/ledger test` for the executable synthetic demonstration and `corepack pnpm --filter @causalledger/ledger typecheck` for compile-time boundaries.

Account validation is structural metadata consistency, not financial truth, authorization, durable uniqueness or lifecycle approval. There are no LedgerTransaction/Entry schemas, ledger postings, balances, reversals, storage, database behavior, business account factories, agents or money mutation. Other packages retain their declared boundaries. Later M04 slices remain unimplemented.
