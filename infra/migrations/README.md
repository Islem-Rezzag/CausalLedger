# Migrations

M02.06 established `node-pg-migrate`; its historical README-only boundary remains enforced for earlier lifecycle phases. M04.05 admits exactly `1780000000000_m04_05_immutable_journal.cjs`, owned by the reviewed ledger storage slice. No other domain tables/migrations are authorized.

This migration requires explicitly provisioned separate restricted `causalledger_storage_owner` and `causalledger_storage_app` identities. It creates only ledger transactions, per-journal Account snapshots and immutable entries, plus safe append/validation/immutability functions. The app cannot write tables directly, mutate history or extend existing journals. Down refuses populated history and removes only empty reviewed objects. It never grants an agent write or approval authority.

`pnpm migrate:up` and `pnpm migrate:down` require an explicit `DATABASE_URL`, ignore this README and never silently select a database. Do not run either against user databases. Production provisioning/migrations remain outside this slice.

`pnpm test:ledger-storage` provisions and verifies its own disposable synthetic Postgres17 database/roles in an explicitly owned Compose environment, runs real up/down/up and behavioral acceptance, inspects exact public schema, then verifies identities before cleanup. It refuses existing resources and missing configuration, ignores ambient DATABASE_URL as a target source, and never substitutes another database. Existing CI supplies this required environment; local no-Docker evidence cannot prove storage behavior.

M04.06 adds no migration or mutable balance table. Its reader uses the same selected entries/headers/account snapshots and existing SELECT grants. The mandatory owned runner now executes storage and balance database suites sequentially; previous migration/privilege/cleanup acceptance remains required.
