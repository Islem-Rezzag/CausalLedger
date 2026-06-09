# API App

`apps/api` is the future HTTP API boundary for CausalLedger.

M02.02 creates only a minimal TypeScript/Fastify application foundation:

- a Fastify app factory;
- a server entrypoint;
- non-domain bootstrap validation;
- package scripts for local development, build, test, lint, format checking, and type checking.

No CausalLedger product or domain behavior is implemented here. There are no MoneyEvent routes, ledger routes, incident routes, evidence ingestion routes, repair routes, auth/authz, database connections, external connectors, or health-check endpoints.
