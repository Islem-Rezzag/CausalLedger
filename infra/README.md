# Local Infrastructure

M02.06 added the local infrastructure baseline. M04.05 PR #66 extends only its reviewed ledger migration and isolated CI boundary; actual real Postgres17 acceptance passed64 tests. Candidate independent QA PASS; final tracking-head checks remain required.

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

The candidate updates the existing disposable Postgres17 CI route to run `pnpm test:ledger-storage` for mandatory migrations, atomic append/rollback/readback and application-role immutability. CI37445358766 on4c3010d executed64 tests, up/down/up migrations, exact schema inspection, owned database/role cleanup and always Compose cleanup; both jobs PASS. PR #66 has candidate independent QA PASS and remains draft pending final tracking-head checks. The runner uses separate restricted identities, refuses existing resources and cleans only verified owned resources. Default developer database credentials are bootstrap placeholders, not storage application permissions. No system installation, production provisioning or user-database mutation is authorized. See the storage spec and QA guide for explicit configuration and limits.
