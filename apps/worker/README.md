# Worker App

`apps/worker` is the future background worker boundary for CausalLedger.

M02.04 creates only a minimal TypeScript worker application foundation:

- a worker bootstrap module;
- non-domain bootstrap validation;
- package scripts for local development, build, test, lint, format checking, and type checking.

Run worker checks through the workspace scripts:

- `pnpm --filter @causalledger/worker build`
- `pnpm --filter @causalledger/worker test`
- `pnpm --filter @causalledger/worker typecheck`
- `pnpm --filter @causalledger/worker lint`
- `pnpm --filter @causalledger/worker format:check`

No CausalLedger product or domain behavior is implemented here. There are no jobs, queues, schedulers, provider connectors, database connections, MoneyEvent logic, ledger logic, invariant checks, incident processing, evidence ingestion, replay behavior, graph behavior, repair behavior, structured logging runtime, auth/authz, health checks, CI workflow, or Docker Compose behavior.

Future product worker behavior belongs to later scoped milestones after their own plans, deterministic validation, and QA gates.
