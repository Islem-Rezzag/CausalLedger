# Changelog

All notable CausalLedger release changes are recorded here.

## Unreleased

- Started M01 planning for domain model and scope freeze.
- Added versioning and release-scope documentation.
- Added and completed the M01 plan at `plans/completed/CLP-0002-m01-domain-model-and-scope-freeze.md`.
- Added M01 domain vocabulary and boundary documents for payment lifecycle, ledger, settlement, reconciliation, incidents, safe and unsafe repairs, evidence receipts, human review states, and out-of-scope domains.
- Added canonical M01 domain, reliability, threat-model, and domain consistency QA documentation.
- Added `docs/status/M01_CLOSEOUT.md` and closed M01 as documentation/control-plane work.
- Started M02 planning with active plan `plans/active/CLP-0003-m02-monorepo-and-local-development-environment.md`, continuous lifecycle observer alignment, and lightweight M02 planning ADR placeholders.
- Completed M02.01 stack ADRs for TypeScript-first monorepo direction, local development implications, and deferred CI/runtime boundaries.
- Completed M02.02 minimal non-domain `apps/api` TypeScript/Fastify scaffold.
- Completed M02.03 minimal non-domain `apps/web` React/Vite scaffold.
- Completed M02.04 minimal non-domain `apps/worker` TypeScript scaffold.
- Added M02 process-amendment tracking fixes, M02 process diet, structural control-plane validation direction, and ADR-0008 identity, money, and storage direction.
- Completed and merged M02.05 package scaffolds, ESLint baseline, CI baseline, test typecheck coverage, and explicit Python CI dependencies after PR #43 merged at `6e76045`.
- Completed and merged M02.06 local-only Docker Compose/Postgres, migration tooling, env placeholders, infrastructure readiness stubs, and remote infrastructure smoke validation after PR #44 merged at `80ce206`.
- M02.07 Builder created a repeatable QA development environment with `pnpm qa:dev`, `scripts/qa-dev-environment.py`, explicit Docker opt-in, documentation, validator coverage, and bootstrap tests.
- M02.07 QA corrected truthful dirty-worktree, repository-local identity, deterministic Docker environment, flow-control, CI proof, and behavioral-test coverage.
- Completed and merged M02.07 after PR #45 merged into `main` at `4a4f381adb7ed263fb26d0373f00043f2fe6a6bc`.
- Closed M02 with `docs/status/M02_CLOSEOUT.md`; the completed M02 plan moved to `plans/completed/CLP-0003-m02-monorepo-and-local-development-environment.md`, no active milestone plan remains, and M03 remains `Not started`.
- Started M03 planning with active plan `plans/active/CLP-0004-m03-canonical-moneyevent-engine.md` and a lean six-submilestone Canonical MoneyEvent Engine plan; no MoneyEvent behavior, runtime schema, database table, API route, UI, storage, or product/domain implementation was added.
- M03 Planning QA passed locally for PR #47 as planning/control-plane QA only; M03.01 through M03.06 remain `Not started`, and no MoneyEvent behavior, runtime schema, parser, validator, storage, database table, API route, UI, fixture, simulator, benchmark data, or product/domain implementation was added.
- Completed M03 planning after PR #47 merged into `main` at commit `0606d3b21c05f2cf98397c9f5b0f1eddfa104a74`.
- M03.01 Builder created `docs/MONEYEVENT_CONTRACT.md` as a conceptual MoneyEvent contract covering purpose, non-goals, semantic fields, lifecycle meaning, evidence, idempotency, time, money, uncertainty, future-layer relationships, and explanatory examples; no MoneyEvent runtime behavior, TypeScript type, schema, parser, validator, normalizer, storage, fixture, simulator data, migration, API route, UI, or product behavior was added.
- M03.01 QA passed for PR #48 as documentation/control-plane QA only; the MoneyEvent conceptual contract is coherent and documentation-only, M03.02 through M03.06 remain `Not started`, and no MoneyEvent runtime behavior, TypeScript type, schema, parser, validator, normalizer, storage, fixture, simulator data, migration, API route, UI, or product behavior was added.
- M03.01 completed after PR #48 merged into `main` at `babadf52762c407fc4d49c6e1d1b0b6cc0542b8e`.
- M03.02 Builder added a TypeScript-only MoneyEvent type boundary in `packages/events` with branded IDs, integer minor-unit `bigint` amount, ISO 4217 currency branding, evidence/provenance/idempotency/time/uncertainty/lifecycle fields, package exports, compile-time-oriented tests, and validator allowlists; no parser, validator, normalizer, runtime schema, storage, fixture, simulator data, migration, API route, UI, ledger posting, repair behavior, agent runtime, or product behavior was added.
- Product functionality remains not implemented.

## v0.1.0 - Repo Operating System Foundation

M00 Repo Operating System established the repository control plane:

- active docs and repo guidance;
- roadmap and canonical submilestone registry;
- milestone docs for M00-M21;
- planning, builder, QA, validation, GitHub PR, issue, and closeout workflows;
- prompt templates and local CausalLedger skills;
- GitHub PR and issue templates;
- control-plane validation script and bootstrap tests;
- M00 freeze readiness and closeout records.

No product functionality is implemented in `v0.1.0`. There is no MoneyEvent runtime, ledger runtime, invariant runtime, incident runtime, causal graph runtime, replay runtime, agent runtime, repair planner, UI, API, database, connector, GitHub Actions workflow, CI workflow, or real secret handling.
