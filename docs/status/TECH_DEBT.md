# Tech Debt

M03.04 introduces one tightly scoped product runtime boundary. Its deferred decisions are tracked below rather than hidden in implementation.

## Placeholders to resolve later

- Evolve monorepo tooling and task conventions as implementation pressure appears.
- Evolve test framework conventions for product/domain tests once product implementation starts.
- Extend test typecheck conventions as future product packages add non-scaffold test layouts.
- Decide whether a future runtime schema framework is warranted; M03.04 uses dependency-free strict validation over a JSON-safe candidate.
- Extend the reviewed M03.05 MoneyEvent fixtures or benchmark seeds only through a separately scoped future slice that preserves strict manifest validation and evidence grounding.
- Define source-specific parsing and idempotency derivation, authoritative currency-registry validation, storage representation, cross-event deduplication, lifecycle transitions, and accounting direction in separately scoped future work.
- Define professional engineering evidence for future error handling, structured logging, deployment documentation, auth/authz design, and scalable data modeling.

## Accepted local-environment limitations

- Local Docker is unavailable in the current Windows shell unless a later validation run proves otherwise. M02 relies on GitHub Actions `infra-smoke` plus QA script behavioral tests for Docker/Postgres/migration evidence.
- `make bootstrap-check` is unavailable in the current Windows shell unless a later validation run proves otherwise. Direct Python validation commands are the accepted equivalent for this environment.
