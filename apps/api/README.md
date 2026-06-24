# API App

`apps/api` is the future HTTP API boundary for CausalLedger.

M02.02 creates only a minimal TypeScript/Fastify application foundation:

- a Fastify app factory;
- a server entrypoint;
- non-domain bootstrap validation;
- package scripts for local development, build, test, lint, format checking, and type checking.

M02.06 adds `/infra/ready` as an infrastructure-only process readiness stub. It returns `status: "process-ready"` with `database: "not-checked"` and `migrations: "not-checked"`. It confirms that the API process can respond, but it does not check product health, database readiness, migration readiness, financial correctness, evidence availability, or domain behavior.

No CausalLedger product or domain behavior is implemented here. There are no MoneyEvent routes, ledger routes, incident routes, evidence ingestion routes, repair routes, auth/authz, database connections, or external connectors.
