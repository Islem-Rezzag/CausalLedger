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
