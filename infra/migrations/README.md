# Migrations

M02.06 establishes the migration tooling boundary with `node-pg-migrate`.

This directory intentionally contains no product schema migrations yet. Do not add MoneyEvent, ledger, invariant, incident, evidence, graph, replay, repair, agent, connector, queue, or scheduler tables in M02.06.

Run migrations against local Postgres only after setting `DATABASE_URL` in an untracked local environment:

```powershell
pnpm migrate:up
pnpm migrate:down
```

At this stage the migration tool may create its own metadata table when executed. That metadata does not represent CausalLedger product storage behavior.
