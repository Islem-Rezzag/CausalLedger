# Tech Debt

M03 is closed after PR #60 merged. No product implementation defect is confirmed. The future decisions below are unimplemented roadmap scope, not technical debt merely because they remain unbuilt.

- Local Docker and Docker Compose validation remain unavailable on the audited machine; remote `infra-smoke` is green, but future storage/migration work needs approved local Docker setup or an equivalent deterministic environment.
- Browser-level automation is not installed and should be selected only when a usable M15-era product flow requires it.
- The completion roadmap overlay is a proposal, not an active rewrite; milestone acceptance criteria and one-branch/one-PR traceability remain authoritative.

## Future scope and decisions (not confirmed technical debt)

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


## M04 closeout debt review (2026-10-09)

M04 has implemented and tested durable exact money encoding, bounded per-entry values with BigInt aggregate sums, atomic append, rollback, immutable SQL guards, ordinary retry identity, full linked reversals and explicit account-role validators/configuration wrappers. Earlier future-storage/accounting notes are historical, not current blockers. No confirmed ledger implementation defect remains after M04.18 independent QA. Source-specific mapping, economic-occurrence deduplication, authoritative currency registry, lifecycle authorization and production operations remain future scope. M02-only infrastructure wording is superseded by fourteen mandatory approved owned PostgreSQL17 suites, migration recovery and populated upgrades; local Docker/make limitations persist. Branches are intentionally retained for audit/recovery; no deletion is authorized.


## Verified M04 closeout and M05 planning (2026-10-12)

M04 closeout/current source claims reconciled and plan moved after verified human merge. M05 simulator ownership/dialects/seed policy remain planning until owning reviewed implementation; existing Docker/make limits and retained branches unchanged.
