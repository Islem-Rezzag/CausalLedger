# Local Infrastructure

M02.06 adds a local-only infrastructure baseline for development repeatability.

What exists:

- root `docker-compose.yml` with one local Postgres service;
- empty `.env.example` keys for local overrides;
- root scripts for starting and stopping local infrastructure;
- root migration commands backed by `node-pg-migrate`;
- an infrastructure-only API readiness stub.

What does not exist:

- production deployment;
- cloud infrastructure;
- real secrets or committed credentials;
- Redis, queues, or schedulers;
- product database schema;
- MoneyEvent, ledger, invariant, incident, evidence, graph, replay, repair, agent, or connector tables.

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

Set `DATABASE_URL` in an untracked local shell or `.env` file before running migrations. Example using the local placeholder service:

```powershell
$env:DATABASE_URL="postgres://causalledger:causalledger_local_password@127.0.0.1:5432/causalledger_dev"
pnpm migrate:up
```

The migration directory is intentionally empty except for documentation. Running the migration tool at this stage should create only the tool metadata table if needed; it must not create CausalLedger product/domain tables.
