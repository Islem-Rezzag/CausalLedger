# Local Infrastructure

M02.06 added the local infrastructure baseline for development repeatability. The current M04.05 storage candidate extends its migration and isolated CI boundary; real database acceptance is pending.

What exists:

- root `docker-compose.yml` with one local Postgres service;
- empty `.env.example` keys for local overrides;
- root scripts for starting and stopping local infrastructure;
- root migration commands backed by `node-pg-migrate`, with one M04.05 storage candidate migration;
- an infrastructure-only API readiness stub.

What does not exist:

- production deployment;
- cloud infrastructure;
- real secrets or committed credentials;
- Redis, queues, or schedulers;
- accepted product database storage guarantees;
- MoneyEvent, invariant, incident, evidence, graph, replay, repair, agent, or connector tables. The candidate ledger tables require the mandatory tests below.

## Local Postgres

Start local Postgres:

```powershell
pnpm infra:up
```

Stop local Postgres without deleting the volume:

```powershell
pnpm infra:down
```

Stop local Postgres and delete the local volume:

```powershell
pnpm infra:reset
```

The compose file binds Postgres to `127.0.0.1` by default. The default database, user, password, host, and port are local placeholders only and can be overridden with untracked `.env` values.

The default Postgres password is a public local-development placeholder, not a secret. Do not reuse it outside local development. The compose service intentionally omits a fixed `container_name` so Docker Compose can namespace containers per checkout.

## Migrations

The M02 baseline intentionally had an empty migration directory and created only tool metadata. M04.05 now adds `1780000000000_m04_05_immutable_journal.cjs`, limited to ledger transactions, account snapshots, entries and their append/validation functions. It requires explicitly provisioned separate restricted owner and application roles; the default bootstrap credentials do not satisfy that contract. Do not run it on a user database. Follow `infra/migrations/README.md` and `docs/specs/ledger-immutable-storage.md` for the role and schema contract.


## M04.05 storage acceptance

The candidate updates the existing disposable Postgres17 CI route to run `pnpm test:ledger-storage` for mandatory migrations, atomic append/rollback/readback and application-role immutability. Its runner provisions separate restricted identities and a named synthetic test database, refuses existing resources, inspects exact public schema and cleans only verified owned resources. This acceptance has not run: GitHub rejected the branch push because the existing OAuth credential lacks `workflow` permission. No remote M04.05 branch or PR exists. Default developer database credentials are bootstrap placeholders, not storage application permissions. No system installation, production provisioning or user-database mutation is authorized. See `docs/specs/ledger-immutable-storage.md` and the QA guide for explicit configuration and limits.
