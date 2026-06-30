# Tech Debt

No product tech debt exists yet because product implementation has not started.

## Placeholders to resolve later

- Evolve monorepo tooling and task conventions as implementation pressure appears.
- Evolve test framework conventions for product/domain tests once product implementation starts.
- Extend test typecheck conventions as future product packages add non-scaffold test layouts.
- Define future MoneyEvent runtime schema details, JSON representation, parser, validator, normalizer, fixture, and package internals in later M03 submilestones.
- Define professional engineering evidence for future error handling, structured logging, deployment documentation, auth/authz design, and scalable data modeling.

## Accepted local-environment limitations

- Local Docker is unavailable in the current Windows shell unless a later validation run proves otherwise. M02 relies on GitHub Actions `infra-smoke` plus QA script behavioral tests for Docker/Postgres/migration evidence.
- `make bootstrap-check` is unavailable in the current Windows shell unless a later validation run proves otherwise. Direct Python validation commands are the accepted equivalent for this environment.
