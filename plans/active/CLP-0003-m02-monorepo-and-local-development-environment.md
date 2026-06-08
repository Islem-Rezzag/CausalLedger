# CLP-0003 M02 Monorepo and Local Development Environment

## Purpose / Big Picture

Plan the local development foundation for CausalLedger before any M02 implementation submilestone begins.

M02 should make the repository ready for product implementation by choosing a coherent monorepo direction, app and package layout, local services, validation conventions, and control-plane expectations. This planning thread is documentation and tracking work only.

M02 planning also aligns CausalLedger's product direction with the continuous payment lifecycle observer framing: CausalLedger is a continuous payment lifecycle observability and incident-response system that builds a living causal timeline from provider events, webhooks, ledger entries, settlement files, bank evidence, refunds, and chargebacks. It can ingest evidence as it arrives, flag suspected breaks early, and later confirm, dismiss, resolve, or keep incidents unresolved as settlement and bank evidence becomes available.

The original M02 planning thread did not start M02.01 implementation and did not create product behavior.

M02.01 is `QA passed, awaiting PR merge` as a documentation-only stack decision slice after M02 planning PR #37 merged into `main`. M02.01 does not create product runtime behavior.

## Progress

- [x] 2026-06-02: Confirmed branch `m02-planning-monorepo-and-local-development-environment`.
- [x] 2026-06-02: Confirmed `git status --short` was clean before edits.
- [x] 2026-06-02: Confirmed remote `origin` points to `https://github.com/Islem-Rezzag/CausalLedger.git`.
- [x] 2026-06-02: Confirmed recent history shows M01 closeout merged at `0d58f04` and M01.13 merged at `27c39b6`.
- [x] 2026-06-02: Confirmed tag `v0.1.0` exists.
- [x] 2026-06-02: Confirmed no active `CLP-*.md` plan existed before M02 planning started.
- [x] 2026-06-02: Created this M02 active plan.
- [x] Complete documentation alignment for continuous lifecycle observation.
- [x] Create M02 planning ADR placeholders.
- [x] Update status and tracking docs for M02 planning.
- [x] Update control-plane validation for M02 planning artifacts.
- [x] Run validation.
- [x] Hand off to M02 planning QA.
- [x] 2026-06-08: M02 Planning QA passed for PR #37 on branch `m02-planning-monorepo-and-local-development-environment`.
- [x] 2026-06-08: M02 planning PR #37 merged into `main` at commit `18148f7` (`M02 planning monorepo and local development environment (#37)`).
- [x] 2026-06-08: Created branch `m02-01-choose-backend-and-frontend-stack` from updated `main`.
- [x] 2026-06-08: M02.01 branch guard passed on `m02-01-choose-backend-and-frontend-stack`; `git status --short` was clean and `origin` points to `https://github.com/Islem-Rezzag/CausalLedger.git`.
- [x] 2026-06-08: Read the required active docs, M02 plan, M02 milestone docs, ADRs, and ops workflow files before editing.
- [x] 2026-06-08: Finalized M02 planning merge tracking and started M02.01 as the current submilestone.
- [x] 2026-06-08: Resolved ADR-0005 with a TypeScript-first monorepo direction: Node.js/Fastify backend, React/Vite frontend, pnpm workspaces, Turborepo, ESLint/Prettier, Vitest, and Zod or equivalent future schema validation.
- [x] 2026-06-08: Updated ADR-0006 with local development direction while deferring package manifests, runtime services, Docker Compose, migrations, health checks, and CI workflows.
- [x] 2026-06-08: Kept M02.02 through M02.20 `Not started`, M03 through M21 `Not started`, and product implementation not started.
- [x] 2026-06-08: M02.01 builder validation passed with `python scripts/validate-control-plane.py`, `python -m pytest tests/test_control_plane_bootstrap.py` with 32 tests, and `git diff --check`; `make bootstrap-check` was skipped because `make` is unavailable in the current Windows shell.
- [x] 2026-06-08: M02.01 Builder complete, awaiting QA.
- [x] 2026-06-08: M02.01 QA passed on branch `m02-01-choose-backend-and-frontend-stack` for PR #38.
- [x] 2026-06-08: M02.01 QA validation passed with `python scripts/validate-control-plane.py`, `python -m pytest tests/test_control_plane_bootstrap.py` with 32 tests, and `git diff --check`; `make bootstrap-check` was skipped because `make` is unavailable in the current Windows shell.
- [x] 2026-06-08: M02.01 marked `QA passed, awaiting PR merge`.

## Surprises & Discoveries

- OrbitSoft feedback highlights missing professional engineering evidence: comprehensive error handling, structured logging, CI/CD pipeline, architecture and deployment documentation, authentication and authorization in API projects, and advanced data modeling. M02 planning must map these gaps to the right milestones without implementing them here.
- Product implementation has not started. Future product directories still contain placeholder README files only.
- `.github/workflows/` does not exist and must not be created in this planning thread.

## Decision Log

| Date | Decision | Status | Notes |
| --- | --- | --- | --- |
| 2026-06-02 | M02 planning starts on branch `m02-planning-monorepo-and-local-development-environment`. | Recorded | Branch guard passed and the starting worktree was clean. |
| 2026-06-02 | Keep M02 planning documentation-only. | Recorded | No product code, runtime APIs, databases, CI workflows, logging implementation, auth/authz implementation, or deployment is added. |
| 2026-06-02 | Treat live monitoring and historical replay as the same canonical event engine with different input timing. | Proposed direction | Future milestones must validate this before runtime claims. |
| 2026-06-08 | M02 planning PR #37 merged into `main`. | Recorded | Merge commit `18148f7`; M02.01 is safe to start after post-merge tracking finalization. |
| 2026-06-08 | Choose a TypeScript-first monorepo direction. | Accepted | Future stack: Node.js/Fastify API, React/Vite web, pnpm workspaces, Turborepo, TypeScript shared packages, ESLint/Prettier, Vitest, and Zod or equivalent schema validation later. |
| 2026-06-08 | Keep M02.01 documentation-only. | Accepted | No dependency installation, package manifests, lockfiles, app runtime, package runtime, API behavior, database behavior, CI workflow, or MoneyEvent behavior. |
| 2026-06-08 | M02.01 QA passed. | Accepted | PR #38 is ready for human merge; M02.01 is not completed until PR #38 merges into `main` and post-merge tracking is finalized. |

## Context and Orientation

M00 Repo Operating System is completed and tagged as `v0.1.0`. M01 Domain Model and Scope Freeze is completed and closed. M01.01 through M01.13 are `Completed and merged`, and the completed M01 plan lives at `plans/completed/CLP-0002-m01-domain-model-and-scope-freeze.md`.

M02 planning PR #37 has merged into `main` at commit `18148f7`. M02.01 is the current submilestone and is documentation-only stack decision work on branch `m02-01-choose-backend-and-frontend-stack`; QA passed and PR #38 is awaiting human merge.

Historical planning marker before M02.01 started: M02.01 through M02.20 remain `Not started`.

## Scope

In scope for this planning thread:

- Create the M02 active plan.
- Align project docs with continuous payment lifecycle observability and living causal timeline language.
- Record live monitoring, historical replay, and progressive incident certainty as future planning boundaries.
- Map OrbitSoft-readiness feedback to future milestones.
- Create lightweight planning ADR placeholders for stack and monorepo direction, local dev and CI baseline, and logging/error handling/observability direction.
- Update status and tracking docs.
- Update control-plane validation for planning artifacts.
- Run control-plane validation.
- Produce a handoff packet.

In scope for M02.01:

- Confirm M02 planning PR #37 merged into `main`.
- Update tracking truthfully from M02 planning to M02.01.
- Choose and document backend/frontend stack direction.
- Choose and document package manager, monorepo task runner, formatting/linting, test framework, and future schema direction.
- Document local developer experience principles and stack implications.
- Keep the slice documentation-only.

Out of scope for this planning thread:

- MoneyEvent runtime logic.
- Ledger runtime logic.
- Settlement runtime logic.
- Reconciliation runtime logic.
- Incident runtime logic.
- Invariants.
- Causal graph runtime logic.
- Replay runtime logic.
- Agent runtime.
- Repair planning runtime logic.
- Human-review runtime logic.
- UI product features.
- Runtime APIs.
- Runtime databases.
- External connectors.
- GitHub Actions or CI workflows.
- Runtime structured logging implementation.
- Runtime auth/authz implementation.
- Production deployment.
- M02.02 or later work.
- Runtime app creation.
- Package implementation.
- Dependency installation.
- Lockfile creation.
- M03 or later milestone work.

## M02 Submilestones and Expected Branches

| ID | Name | Status | Expected branch |
| --- | --- | --- | --- |
| M02.01 | Choose backend and frontend stack | QA passed, awaiting PR merge | `m02-01-choose-backend-and-frontend-stack` |
| M02.02 | Create apps/api | Not started | `m02-02-create-apps-api` |
| M02.03 | Create apps/web | Not started | `m02-03-create-apps-web` |
| M02.04 | Create apps/worker | Not started | `m02-04-create-apps-worker` |
| M02.05 | Create apps/agent-runtime | Not started | `m02-05-create-apps-agent-runtime` |
| M02.06 | Create packages/core | Not started | `m02-06-create-packages-core` |
| M02.07 | Create packages/events | Not started | `m02-07-create-packages-events` |
| M02.08 | Create packages/ledger | Not started | `m02-08-create-packages-ledger` |
| M02.09 | Create packages/invariants | Not started | `m02-09-create-packages-invariants` |
| M02.10 | Create packages/incidents | Not started | `m02-10-create-packages-incidents` |
| M02.11 | Create packages/graph | Not started | `m02-11-create-packages-graph` |
| M02.12 | Create packages/replay | Not started | `m02-12-create-packages-replay` |
| M02.13 | Create packages/repair | Not started | `m02-13-create-packages-repair` |
| M02.14 | Add Postgres | Not started | `m02-14-add-postgres` |
| M02.15 | Add Redis | Not started | `m02-15-add-redis` |
| M02.16 | Add Docker Compose | Not started | `m02-16-add-docker-compose` |
| M02.17 | Add migrations | Not started | `m02-17-add-migrations` |
| M02.18 | Add health checks | Not started | `m02-18-add-health-checks` |
| M02.19 | Add CI baseline | Not started | `m02-19-add-ci-baseline` |
| M02.20 | QA dev environment | Not started | `m02-20-qa-dev-environment` |

Historical planning snapshot retained for control-plane validation: M02.01 | Choose backend and frontend stack | Not started.

## Local Development Decisions to Make

M02.01 decided:

- backend language and framework: TypeScript on Node.js with Fastify for the future API;
- frontend framework: React with Vite for the future web app;
- package manager: pnpm workspaces;
- monorepo task runner: Turborepo;
- formatting and linting conventions: ESLint with TypeScript-aware rules plus Prettier;
- test framework conventions: Vitest for package-level and app-level tests when code exists;
- schema definition format for future MoneyEvent contracts: TypeScript types plus Zod or equivalent runtime schema validation later;
- local developer experience direction: explicit scripts, empty `.env.example` values, deterministic validation commands, and no product claim before runtime code and tests exist.

Future M02 implementation submilestones still must decide concrete:

- package boundaries for deterministic truth, evidence, replay, repair, and agent layers;
- app boundaries for API, web, worker, and agent runtime;
- Postgres local development pattern;
- Redis local development pattern;
- Docker Compose profile structure;
- migration tooling;
- health check expectations;
- CI baseline command set;
- local secrets pattern using empty `.env.example` values only.

## Continuous Lifecycle Observer Alignment

The canonical product direction for planning is continuous payment lifecycle observability and incident response.

CausalLedger should eventually observe provider events, webhooks, ledger entries, settlement rows, bank evidence, refunds, chargebacks, and related signals as evidence arrives. These inputs should update a living causal timeline that preserves provenance, ordering uncertainty, evidence gaps, and contradictory evidence.

This is planning language only. No live ingestion, streaming, storage, timeline engine, or incident engine exists yet.

## Live Monitoring and Historical Replay Planning Boundary

Live monitoring and historical replay should use the same future canonical event engine. The difference is input timing:

- live monitoring processes evidence as it arrives;
- historical replay processes stored evidence later;
- both paths should use the same MoneyEvent, invariant, incident, graph, replay, evidence bundle, and repair-safety concepts.

Future implementation must avoid creating separate truth semantics for live mode and replay mode. Replay must remain deterministic, reproducible, and evidence-linked.

## Progressive Incident Certainty Planning Boundary

Future incidents should support progressive certainty instead of claiming final truth too early:

- suspected break: early evidence indicates a possible issue;
- confirmed break: deterministic checks and later evidence support a mismatch;
- dismissed break: later evidence shows the suspected issue was not a true break;
- resolved after later evidence: delayed settlement or bank evidence explains or closes the issue;
- unresolved due to missing evidence: required evidence has not arrived or remains insufficient;
- unresolved pending review: evidence remains contradictory or ambiguous and needs human review.

LLM output can explain uncertainty but cannot promote suspected breaks to confirmed truth.

## OrbitSoft-Readiness Constraints

OrbitSoft feedback is mapped to future work as planning constraints:

| Feedback item | Planning treatment | Future milestone mapping |
| --- | --- | --- |
| Comprehensive error handling | Define error taxonomy expectations and local dev conventions without implementing runtime behavior here. | M02, M17, M19 |
| Structured logging | Plan request IDs, event IDs, trace context, and evidence-safe logs without adding runtime logging here. | M17, M18, M19 |
| CI/CD pipeline | Plan M02.19 CI baseline expectations; do not add GitHub Actions in this planning thread. | M02, M18, M19 |
| Architecture decision records | Create lightweight M02 planning ADR placeholders. | M02, M20 |
| Deployment strategy documentation | Plan docs and local profile boundaries without creating production deployment. | M02, M19, M20 |
| Auth/authz design and future runtime | Record future API, UI, and tool permission design constraints; do not implement auth/authz here. | M18, M19 |
| Advanced data modeling for scalable schemas | Preserve schema and data model questions for MoneyEvent, ledger, incidents, graph, replay, and evidence bundles. | M03, M04, M08, M09, M18, M19 |

## Architecture Decision Records to Create

- `docs/decisions/ADR-0005-m02-stack-and-monorepo-direction.md`
- `docs/decisions/ADR-0006-local-dev-and-ci-baseline.md`
- `docs/decisions/ADR-0007-logging-error-handling-and-observability-direction.md`

These ADRs are placeholders for M02 planning and future implementation decisions. They must not claim runtime implementation.

## CI Baseline Expectations

M02.19 should eventually define a baseline local and CI check set. Expected candidate checks include:

- branch and worktree guard;
- control-plane validation;
- bootstrap tests;
- formatting check;
- lint check;
- package-level tests once product packages exist;
- forbidden-scope checks for agent, money mutation, evidence mutation, and repair approval boundaries.

This planning thread must not create `.github/workflows/` or any CI/CD automation.

## Structured Logging and Error-Handling Expectations

Future runtime work should distinguish:

- deterministic validation errors;
- evidence ingestion errors;
- provenance or idempotency errors;
- replay reproducibility errors;
- repair proposal validation errors;
- agent tool-boundary denials;
- auth/authz denials;
- operator-facing incident uncertainty states.

Future structured logs should avoid leaking secrets or sensitive evidence and should preserve request IDs, event IDs, evidence receipt IDs, incident IDs, trace context, and error category where implementation scope defines them.

No runtime logging or error-handling code is implemented in this planning thread.

## Deployment Documentation Expectations

M02 should decide what local deployment documentation belongs in the repo once apps and local services exist. Production deployment remains future work.

Future docs should distinguish local development, test/sandbox, and production assumptions; record required environment variables without real secrets; describe service startup and health checks; and avoid claims that production deployment exists before M19/M20 validation.

## Data Modeling Expectations

M02 should preserve package boundaries so later data modeling can support:

- immutable raw evidence and evidence receipts;
- canonical MoneyEvent records with provenance and idempotency;
- deterministic ledger transactions and entries;
- invariant results;
- incident certainty states;
- causal graph nodes and edges;
- replay sessions and artifacts;
- repair proposals and review records.

Detailed schemas belong to future scoped milestones, especially M03, M04, M07, M08, M09, M12, M13, M18, and M19.

## Product-Boundary Warnings

- Do not implement product behavior in this planning thread.
- Do not claim live ingestion, streaming, replay, timeline updates, incident creation, repair proposal generation, logging, auth/authz, CI/CD, deployment, or databases exist.
- Do not use LLM output as financial truth.
- Do not mutate money, ledger state, raw events, evidence, deterministic invariant results, repair approval, or external communications.
- Do not start M02.02 until M02.01 QA passes, the M02.01 PR merges, and post-merge tracking is finalized.

Historical planning gate now satisfied: Do not start M02.01 Builder until M02 planning QA passes and the planning PR merges.

## Plan of Work

1. Create M02 active plan.
2. Add continuous lifecycle observer alignment to selected docs.
3. Add progressive certainty and live/replay planning boundaries.
4. Create ADR placeholders.
5. Update roadmap, M02 milestone doc, registry, status docs, capability matrix, risk register, tech debt, and open questions.
6. Add control-plane validation for M02 planning artifacts.
7. Run validation.
8. Produce handoff and next-thread recommendation.

## Concrete Steps

- Update only docs and control-plane validation files.
- Keep all M02 implementation submilestones `Not started`.
- Keep M03 through M21 `Not started`.
- Preserve the no-product-implementation statement.
- Record validation commands and results after running them.

## Validation and Acceptance

Validation ladder for this planning slice:

- Level 0: branch and worktree guard.
- Level 1: file and forbidden-scope inspection.
- Level 2: control-plane validation with `python scripts/validate-control-plane.py`.
- Level 3: bootstrap tests with `python -m pytest tests/test_control_plane_bootstrap.py`.
- Level 4: whitespace/diff validation with `git diff --check`.
- Level 7: forbidden-scope checks for no product implementation, no CI workflow, no APIs, no databases, no runtime logging, no runtime auth/authz, no deployment, no evidence mutation, no ledger mutation, no repair approval, and no product behavior.

Acceptance criteria for M02.01:

- M02 active plan exists.
- M02 planning PR #37 is confirmed merged into `main`.
- M02.01 status is recorded as `Builder complete, awaiting QA`.
- ADR-0005 records the backend/frontend stack and monorepo direction.
- ADR-0006 records local development implications without adding CI automation or runtime manifests.
- M02.02 through M02.20 remain `Not started`.
- M03 through M21 remain `Not started`.
- Product implementation has not started.
- Validation passes or skipped validation is recorded with a reason.
- Next recommended thread is `M02.01 QA - Choose Backend and Frontend Stack`.

Historical M02 planning acceptance marker retained for validation: M02.01 through M02.20 remain `Not started`; next recommended thread was `M02 Planning QA - Monorepo and Local Development Environment`.

M02.01 QA acceptance criteria:

- ADR-0005 and ADR-0006 remain documentation-only stack decisions.
- No product runtime, package manifests, dependency installation, lockfiles, app runtime, database behavior, API behavior, MoneyEvent behavior, CI workflow, or M02.02 work exists.
- M02.01 status is recorded as `QA passed, awaiting PR merge`.
- M02.02 through M02.20 remain `Not started`.
- M03 through M21 remain `Not started`.
- Product implementation has not started.
- Next recommended thread is `Merge M02.01 PR - Choose Backend and Frontend Stack`.

## M02 Planning QA Record

QA date: 2026-06-08.

Files inspected:

- `docs/ACTIVE_DOCS.md`
- `README.md`
- `START_HERE.md`
- `AGENTS.md`
- `PLANS.md`
- `WORKFLOW.md`
- `docs/INDEX.md`
- `docs/ARCHITECTURE.md`
- `docs/DOMAIN_MODEL.md`
- `docs/PRODUCT_VISION.md`
- `docs/RELIABILITY.md`
- `docs/THREAT_MODEL.md`
- `docs/TOKEN_COST_STRATEGY.md`
- `plans/ROADMAP.md`
- `docs/status/CURRENT_STATE.md`
- `docs/status/NEXT_RECOMMENDED_THREAD.md`
- `docs/status/WEEKLY_LOG.md`
- `docs/status/RISK_REGISTER.md`
- `docs/status/TECH_DEBT.md`
- `docs/status/CAPABILITY_MATRIX.md`
- `docs/milestones/M02.md`
- `docs/milestones/SUBMILESTONE_REGISTRY.md`
- `plans/active/CLP-0003-m02-monorepo-and-local-development-environment.md`
- `docs/decisions/ADR-0005-m02-stack-and-monorepo-direction.md`
- `docs/decisions/ADR-0006-local-dev-and-ci-baseline.md`
- `docs/decisions/ADR-0007-logging-error-handling-and-observability-direction.md`
- `.github/PULL_REQUEST_TEMPLATE.md`
- `tests/test_control_plane_bootstrap.py`
- `scripts/validate-control-plane.py`

QA findings:

- Active M02 planning plan exists.
- `PLANS.md` references the active M02 plan and no longer says the active plan is none.
- M02 planning remains documentation/control-plane only.
- M02.01 through M02.20 remain `Not started`.
- M03 through M21 remain `Not started`.
- Product implementation has not started.
- `apps/` and `packages/` contain placeholder documentation only.
- `.github/workflows/` does not exist.
- Continuous lifecycle observer language is future planning language only.
- Live monitoring and historical replay are described as future paths using the same future canonical event engine with different input timing.
- Progressive incident certainty keeps LLM output out of confirmed financial truth.
- OrbitSoft-readiness feedback is mapped to future milestones without implementation in this planning PR.
- ADR-0005, ADR-0006, and ADR-0007 are planning placeholders and do not claim final implementation.
- Validation tests cover the M02 planning artifacts without claiming product behavior.

Defects found:

- No new formal PR QA defects were found.
- The prior stale `PLANS.md` active-plan reference was already fixed in commit `64b1f7b` and was verified in this QA.

Validation commands:

- `python scripts/validate-control-plane.py`
- `python -m pytest tests/test_control_plane_bootstrap.py`
- `git diff --check`
- `make bootstrap-check`, only if `make` is available

Validation results:

- `python scripts/validate-control-plane.py` passed.
- `python -m pytest tests/test_control_plane_bootstrap.py` passed with 32 tests.
- `git diff --check` passed.
- `make bootstrap-check` was skipped because `make` is unavailable in the current Windows shell. Equivalent Python validation commands were run directly.

QA decision: PASS.

Safe-to-merge statement: safe to merge the M02 planning PR after human review. M02 planning is not completed and merged until the PR actually merges into `main` and post-merge tracking is finalized. Do not start M02.01 until after that merge and finalization.

## M02.01 QA Record

QA date: 2026-06-08.

PR: #38, `https://github.com/Islem-Rezzag/CausalLedger/pull/38`.

Branch: `m02-01-choose-backend-and-frontend-stack`.

Files inspected:

- `docs/ACTIVE_DOCS.md`
- `README.md`
- `START_HERE.md`
- `AGENTS.md`
- `PLANS.md`
- `WORKFLOW.md`
- `docs/INDEX.md`
- `plans/ROADMAP.md`
- `docs/status/CURRENT_STATE.md`
- `docs/status/NEXT_RECOMMENDED_THREAD.md`
- `docs/status/WEEKLY_LOG.md`
- `docs/status/RISK_REGISTER.md`
- `docs/status/TECH_DEBT.md`
- `docs/status/CAPABILITY_MATRIX.md`
- `docs/milestones/M02.md`
- `docs/milestones/SUBMILESTONE_REGISTRY.md`
- `plans/active/CLP-0003-m02-monorepo-and-local-development-environment.md`
- `docs/decisions/ADR-0005-m02-stack-and-monorepo-direction.md`
- `docs/decisions/ADR-0006-local-dev-and-ci-baseline.md`
- `docs/decisions/ADR-0007-logging-error-handling-and-observability-direction.md`
- `docs/ops/planning-and-tracking-system.md`
- `docs/ops/builder-qa-prompt-protocol.md`
- `docs/ops/validation-and-handoff-workflow.md`
- `docs/ops/github-pr-and-issue-workflow.md`
- `.github/PULL_REQUEST_TEMPLATE.md`
- `tests/test_control_plane_bootstrap.py`
- `scripts/validate-control-plane.py`

QA findings:

- ADR-0005 records the TypeScript-first stack direction: Node.js/Fastify backend, React/Vite frontend, pnpm workspaces, Turborepo, ESLint/Prettier, Vitest, and Zod or equivalent future schema validation.
- ADR-0006 records local development implications without adding package manifests, lockfiles, runtime services, Docker Compose, migrations, health checks, or CI workflows.
- ADR-0007 remains planning-only and untouched by M02.01.
- No product implementation, dependency installation, app runtime, package runtime, API behavior, database behavior, MoneyEvent behavior, CI workflow, or M02.02 work exists.
- `apps/`, `packages/`, `scenarios/`, `data/`, and `infra/` contain placeholder README files only.
- `.github/workflows/` does not exist.
- M02.02 through M02.20 remain `Not started`.
- M03 through M21 remain `Not started`.

Defects found:

- `README.md` still reported the pre-M02.01 planning state where M02.01 through M02.20 remained `Not started`.
- The GitHub API reports PR #38 as open and non-draft, while the QA prompt expected an open draft PR.
- The `gh` CLI is unavailable in this Windows shell, so PR status was checked with the GitHub API instead.

Fixes applied:

- Updated `README.md` current status to reflect M02.01 QA passed, awaiting PR merge.
- Updated durable tracking in current state, next recommended thread, weekly log, roadmap, M02 milestone doc, registry, and this active plan.
- Set the exact next recommended thread to `Merge M02.01 PR - Choose Backend and Frontend Stack`.

Validation commands:

- `python scripts/validate-control-plane.py`
- `python -m pytest tests/test_control_plane_bootstrap.py`
- `git diff --check`
- `make bootstrap-check`, only if `make` is available

Validation results:

- `python scripts/validate-control-plane.py` passed.
- `python -m pytest tests/test_control_plane_bootstrap.py` passed with 32 tests.
- `git diff --check` passed.
- `make bootstrap-check` was skipped because `make` is unavailable in the current Windows shell. Equivalent direct Python validation commands were run.

QA decision: PASS.

Safe-to-merge statement: safe to merge PR #38 after human review. M02.01 is not `Completed and merged` until PR #38 actually merges into `main` and post-merge tracking is finalized. Do not start M02.02 until after that merge and finalization.

## Validation Results

2026-06-02 validation results:

- `python scripts/validate-control-plane.py` passed.
- `python -m pytest tests/test_control_plane_bootstrap.py` passed with 32 tests.
- `git diff --check` passed.
- `make bootstrap-check` was skipped because `make` is unavailable in the current Windows shell.

2026-06-08 M02.01 builder validation results:

- `python scripts/validate-control-plane.py` passed.
- `python -m pytest tests/test_control_plane_bootstrap.py` passed with 32 tests.
- `git diff --check` passed.
- `make bootstrap-check` was skipped because `make` is unavailable in the current Windows shell. Equivalent direct Python validation commands were run.

2026-06-08 M02.01 QA validation results:

- `python scripts/validate-control-plane.py` passed.
- `python -m pytest tests/test_control_plane_bootstrap.py` passed with 32 tests.
- `git diff --check` passed.
- `make bootstrap-check` was skipped because `make` is unavailable in the current Windows shell. Equivalent direct Python validation commands were run.

## Idempotence and Recovery

If validation fails, do not widen scope. Fix only planning/control-plane defects introduced by this thread, rerun validation, and record results. If an unexpected dirty worktree appears, inspect it, preserve user changes, and report any conflict before proceeding.

If a future M02.01 QA thread is not on `m02-01-choose-backend-and-frontend-stack`, stop immediately without editing.

## Artifacts and Notes

Created or expected planning artifacts:

- `plans/active/CLP-0003-m02-monorepo-and-local-development-environment.md`
- `docs/decisions/ADR-0005-m02-stack-and-monorepo-direction.md`
- `docs/decisions/ADR-0006-local-dev-and-ci-baseline.md`
- `docs/decisions/ADR-0007-logging-error-handling-and-observability-direction.md`

## Interfaces and Dependencies

Future M02 implementation dependencies:

- app layout: `apps/api`, `apps/web`, `apps/worker`, `apps/agent-runtime`;
- package layout: `packages/core`, `packages/events`, `packages/ledger`, `packages/invariants`, `packages/incidents`, `packages/graph`, `packages/replay`, `packages/repair`;
- local services: Postgres, Redis, Docker Compose, migrations, health checks;
- validation: local checks and CI baseline planning only.

Deterministic truth layers must stay separate from agent proposal layers. Evidence handling remains append-only by design. Repair proposal work must not become repair application work.

## Outcomes & Retrospective

M02 planning builder work completed as documentation/control-plane work only. At that planning-builder handoff, product implementation had not started and M02.01 through M02.20 remained `Not started`.

Exact next recommended thread after this planning builder is complete: `M02 Planning QA - Monorepo and Local Development Environment`.

M02.01 builder and QA work completed as documentation/control-plane work only. Product implementation has not started. M02.01 is `QA passed, awaiting PR merge`; M02.02 through M02.20 remain `Not started`; M03 through M21 remain `Not started`.

Stack decision summary:

- TypeScript-first monorepo.
- Node.js/Fastify future API.
- React/Vite future web app.
- pnpm workspaces.
- Turborepo.
- ESLint/Prettier.
- Vitest.
- TypeScript types plus Zod or equivalent future runtime schema validation for MoneyEvent contracts.

Exact next recommended thread after M02.01 QA is complete: `Merge M02.01 PR - Choose Backend and Frontend Stack`.
