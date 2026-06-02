# Current State

## Current phase

M00 Repo operating system is completed and tagged as `v0.1.0`. M01 Domain Model and Scope Freeze is completed and closed. M01 planning merged at git commit `2cfd75a` (`docs: plan M01 domain model and scope freeze (#10)`), M01.01 through M01.13 are `Completed and merged`, and M01.13 QA Domain Consistency merged at git commit `27c39b6` (`docs: run M01.13 domain consistency QA (#35)`). The completed M01 plan lives at `plans/completed/CLP-0002-m01-domain-model-and-scope-freeze.md`, and the M01 closeout packet lives at `docs/status/M01_CLOSEOUT.md`. M02 Monorepo and Local Development Environment planning is in progress on branch `m02-planning-monorepo-and-local-development-environment`; the active M02 planning plan is `plans/active/CLP-0003-m02-monorepo-and-local-development-environment.md`. M02.01 through M02.20 remain `Not started`, and M03 through M21 remain `Not started`.

M01.01 Define payment lifecycle is domain documentation only and is recorded as `Completed and merged` after post-merge QA recovery. The builder PR #11 was squash-merged before required QA at commit `1175789`, and the protocol deviation was recovered through the M01.01 QA recovery PR merged at commit `6480c1d` (`test: QA recovery M01.01 payment lifecycle (#12)`). Product implementation has not started.

M01.05 Define incident vocabulary is domain vocabulary documentation plus scoped offline ablation planning only. The builder PR #16 was squash-merged before required QA at commit `5c3943b` (`docs: define M01.05 incident vocabulary and ablation strategy (#16)`), and the protocol deviation was recovered by QA recovery PR #18 merged at commit `3bdedeb` (`test: QA recovery M01.05 incident vocabulary and ablation strategy (#18)`). Product implementation has not started.

M01.06 Define safe and unsafe repairs is domain vocabulary documentation only. It defines safe-to-propose repair vocabulary, unsafe and forbidden autonomous repair boundaries, evidence requirements, replay-before-apply expectations, deterministic validation expectations, idempotency, rollback planning, human approval, escalation, repair categories, and moat rationale without implementing repair runtime behavior. Product implementation has not started.

M01.07 Define evidence receipt model is domain vocabulary documentation only. It defines evidence receipts, evidence sources, source identity, evidence providers, raw and normalized evidence references, provenance, chain of custody, checksums or hashes, timestamps, freshness, retention state, redaction boundaries, confidentiality classes, uncertainty, confidence, limitations, conflicts, coverage, gaps, evidence bundles, receipt statuses, rejection reasons, append-only handling, immutable raw evidence boundaries, derived evidence boundaries, audit trails, safety boundaries, and moat rationale without implementing evidence ingestion runtime, storage, schemas, databases, APIs, parsers, connectors, or runtime evidence processing. Product implementation has not started.

M01.08 Define human review states is domain vocabulary documentation only. It defines human review vocabulary, review actors, review statuses, decision states, escalation states, delegation, reassignment, approval and rejection boundaries, repair-review states, AI review boundaries, evidence expectations, correctness questions, and failure patterns without implementing human-review runtime, review queues, state machines, approval engines, APIs, databases, UI, or runtime product behavior. Product implementation has not started.

M01.09 Define out-of-scope domains is domain boundary documentation only. It defines hard out-of-scope domains, adjacent-but-not-core domains, forbidden product claims, LLM forbidden actions, future-extension rules, interview and product positioning boundaries, and examples without implementing product functionality, runtime behavior, APIs, databases, UI, connectors, scoring engines, advisory systems, repair execution, or autonomous money movement. Product implementation has not started.

M01.10 Write DOMAIN_MODEL.md is domain model summary documentation only. It rewrote `docs/DOMAIN_MODEL.md` as the canonical M01 domain model summary synthesizing payment lifecycle, ledger, settlement, reconciliation, incident, repair, evidence, human review, and out-of-scope boundaries without implementing runtime behavior. Builder PR #28 was squash-merged before required QA at commit `dc6800b`, and QA recovery PR #29 merged at git commit `a878d55` (`test: QA recovery M01.10 domain model summary (#29)`). Product implementation has not started.

M01.11 Write RELIABILITY.md is reliability model documentation only. It rewrote `docs/RELIABILITY.md` as the canonical CausalLedger reliability model for deterministic financial checks, evidence provenance, replay, repair validation, human review, audit trails, bounded AI assistance, model routing and cost reliability, observability, ablations, failure modes, metrics, future implementation dependencies, and guardrails without implementing runtime reliability mechanisms. M01.11 is `Completed and merged` after PR #30 merged at git commit `a424924`. Product implementation has not started.

M01.12 Write THREAT_MODEL.md is threat model documentation only. It rewrote `docs/THREAT_MODEL.md` as the canonical CausalLedger threat model for evidence handling, deterministic financial truth boundaries, settlement and reconciliation, incident and replay, repair and human review, agentic AI, prompt injection, tool and permission boundaries, model routing and cost, privacy, secrets, supply chain, out-of-scope abuse, evaluation, ablations, operations, governance, future implementation dependencies, and guardrails without implementing runtime security controls. M01.12 is `Completed and merged` after PR #31 merged. Duplicate PR merges #32 and #33 were also created from the same M01.12 branch; this was a process deviation, no revert is being done in this finalization thread, and the corrective action is to restore tracking consistency and continue with stricter PR discipline: future submilestones should create only one PR per branch and delete the branch after merge. Product implementation has not started.

## What exists

- Root repo guidance files.
- Planning system and roadmap skeleton.
- Status tracking files.
- Milestone skeleton files.
- Prompt templates.
- Local CausalLedger skill files.
- Control-plane validation script and test.
- Placeholder directories and short README files.
- Canonical M00-M21 submilestone registry.
- Detailed M00-M21 milestone docs.
- Top-level project docs for brief, vision, architecture, canonical M01 domain model summary, canonical CausalLedger reliability model, canonical CausalLedger threat model, token cost strategy, and docs index.
- Completed M00 plan at `plans/completed/CLP-0001-m00-repo-operating-system.md`.
- Planning and tracking operations guide for submilestone lifecycle state.
- Builder and QA prompt protocol operations guide.
- Validation and handoff workflow operations guide.
- GitHub PR and issue workflow operations guide.
- GitHub labels and milestones guidance.
- Branch protection guidance.
- Milestone closeout workflow operations guide.
- M00 repo operating system freeze guide and readiness report.
- M00 closeout packet.
- Reusable builder, QA, and handoff packet prompt templates.
- GitHub PR and issue templates.
- Completed M01 plan at `plans/completed/CLP-0002-m01-domain-model-and-scope-freeze.md`.
- M01 closeout packet at `docs/status/M01_CLOSEOUT.md`.
- Active M02 planning plan at `plans/active/CLP-0003-m02-monorepo-and-local-development-environment.md`.
- M02 planning ADR placeholders at `docs/decisions/ADR-0005-m02-stack-and-monorepo-direction.md`, `docs/decisions/ADR-0006-local-dev-and-ci-baseline.md`, and `docs/decisions/ADR-0007-logging-error-handling-and-observability-direction.md`.
- Versioning docs at `docs/VERSIONING.md`, `docs/releases/RELEASE_LADDER.md`, and `docs/releases/V1_SCOPE.md`.
- Domain vocabulary and boundary docs at `docs/domain/payment-lifecycle.md`, `docs/domain/ledger-vocabulary.md`, `docs/domain/settlement-vocabulary.md`, `docs/domain/reconciliation-vocabulary.md`, `docs/domain/incident-vocabulary.md`, `docs/domain/repair-vocabulary.md`, `docs/domain/evidence-receipt-model.md`, `docs/domain/human-review-states.md`, and `docs/domain/out-of-scope-domains.md`.
- Ablation planning docs at `docs/evals/ABLATION_STRATEGY.md` and `docs/evals/ABLATION_MATRIX.md`.
- M01 domain consistency QA report at `docs/status/M01_DOMAIN_CONSISTENCY.md`.
- `CHANGELOG.md`.

## What does not exist

- Product functionality.
- MoneyEvent logic.
- Ledger logic.
- Invariant engine.
- Incident engine.
- Causal graph.
- Replay engine.
- Agent runtime.
- Repair planner runtime or repair execution.
- Evidence ingestion runtime or evidence storage layer.
- UI features.
- External connectors.
- Scenario benchmark implementation.
- Runtime tests.
- API implementation.
- Database implementation.
- GitHub Actions or CI workflows.
- Deployment.
- Auth/authz runtime.
- Structured logging.
- Monitoring.
- Runtime security controls.
- Real secrets.

## Active plan

The active milestone planning plan is `plans/active/CLP-0003-m02-monorepo-and-local-development-environment.md`.

The completed M01 milestone plan is `plans/completed/CLP-0002-m01-domain-model-and-scope-freeze.md`.

The completed M00 plan remains at `plans/completed/CLP-0001-m00-repo-operating-system.md`.

## Current submilestone

M00.01 through M00.08 are completed and merged. M01.01 Define payment lifecycle is `Completed and merged` after post-merge QA recovery. M01.02 Define ledger vocabulary is `Completed and merged`. M01.03 Define settlement vocabulary is `Completed and merged` at git commit `e54a917`. M01.04 Define reconciliation vocabulary is `Completed and merged` at git commit `5dfe928`. M01.05 Define incident vocabulary is `Completed and merged` after QA recovery PR #18 merged at git commit `3bdedeb`. M01.06 Define safe and unsafe repairs is `Completed and merged` after PR #21 merged at git commit `7adc96d`. M01.07 Define evidence receipt model is `Completed and merged` after PR #23 merged at git commit `a88b5ff`. M01.08 Define human review states is `Completed and merged` after PR #26 merged at git commit `1fde07a`. M01.09 Define out-of-scope domains is `Completed and merged` after PR #27 merged at git commit `1b40773`. M01.10 Write DOMAIN_MODEL.md is `Completed and merged` after QA recovery PR #29 merged at git commit `a878d55`. M01.11 Write RELIABILITY.md is `Completed and merged` after PR #30 merged at git commit `a424924`. M01.12 Write THREAT_MODEL.md is `Completed and merged` after PR #31 merged; duplicate PR merges #32 and #33 from the same branch are recorded as a process deviation. M01.13 QA Domain Consistency is `Completed and merged` after PR #35 merged at git commit `27c39b6`. M02 planning is in progress. M02.01 through M02.20 remain `Not started`; M03 through M21 remain `Not started`.

M00.01 Roadmap and submilestone registry is completed and merged. M00.02 Active docs and repo guidance is completed and merged. M00.03 Planning and Tracking System is completed and merged at commit `f289d5e`. M00.04 Builder and QA Prompt Protocol is completed and merged at commit `e686c77`. M00.05 Validation and Handoff Workflow is completed and merged at commit `b82e5d1`. M00.06 GitHub PR and Issue Workflow is completed and merged at commit `a0fdf6bc422f573235d48ee8cde93fd92d25e617`. M00.07 Milestone Closeout Workflow is completed and merged at commit `ae19cd0e4b34ad8c16c3d4f8ee1adbe08e7575f6`. M00.08 Repo Operating System QA and Freeze is completed and merged at commit `db312d16f3059a2714f929c4bcb831d4a6a5a173`.

## Product code status

No product code exists yet. Product directories contain placeholder README files only, and `.github/workflows/` does not exist.

## Next action

Run the exact next recommended thread: `M02 Planning QA - Monorepo and Local Development Environment`.

## Implementation warning

Do not start product implementation. The next thread must QA M02 planning only and must not create product behavior, MoneyEvent runtime code, ledger runtime logic, settlement runtime logic, reconciliation runtime logic, incident runtime logic, invariants, graph logic, replay logic, agent runtime, repair planning runtime logic, repair execution, human-review runtime logic, AML/KYC behavior, sanctions screening, fraud scoring, credit decisions, legal or tax advice, investment advice, UI features, APIs, databases, storage layers, file parsers, external connectors, GitHub Actions, CI workflows, runtime authentication or authorization, RBAC, encryption, secret management, audit logs, structured logging implementation, monitoring, runtime security controls, or product behavior. Do not start M02.01 Builder until M02 planning QA passes and the planning PR merges.

## Validation limitations

- `make bootstrap-check` could not be run on 2026-05-04 because `make` is not available in the current Windows shell.
- `make bootstrap-check` could not be run for M01.01 builder validation on 2026-05-11 because `make` is not available in the current Windows shell.
- `make bootstrap-check` could not be run for M01.01 post-merge QA recovery on 2026-05-11 because `make` is not available in the current Windows shell.
- `make bootstrap-check` could not be run for M01.02 builder validation on 2026-05-15 because `make` is not available in the current Windows shell.
- `make bootstrap-check` could not be run for M01.02 QA validation on 2026-05-15 because `make` is not available in the current Windows shell.
- `make bootstrap-check` could not be run for M01.03 builder validation on 2026-05-15 because `make` is not available in the current Windows shell.
- `make bootstrap-check` could not be run for M01.03 QA validation on 2026-05-16 because `make` is not available in the current Windows shell.
- `make bootstrap-check` could not be run for M01.04 builder validation on 2026-05-16 because `make` is not available in the current Windows shell.
- `make bootstrap-check` could not be run for M01.04 QA validation on 2026-05-16 because `make` is not available in the current Windows shell.
- `make bootstrap-check` could not be run for M01.05 builder validation on 2026-05-16 because `make` is not available in the current Windows shell.
- `make bootstrap-check` could not be run for M01.05 QA recovery validation on 2026-05-16 because `make` is not available in the current Windows shell.
- `make bootstrap-check` could not be run for M01.06 QA validation on 2026-05-18 because `make` is not available in the current Windows shell.
- `make bootstrap-check` could not be run for M01.06 post-merge finalization on 2026-05-18 because `make` is not available in the current Windows shell.
- `make bootstrap-check` could not be run for M01.07 builder validation on 2026-05-18 because `make` is not available in the current Windows shell.
- `make bootstrap-check` could not be run for M01.07 QA validation on 2026-05-18 because `make` is not available in the current Windows shell.
- `make bootstrap-check` could not be run for M01.07 post-merge finalization on 2026-05-18 because `make` is not available in the current Windows shell.
- `make bootstrap-check` could not be run for M01.08 builder validation on 2026-05-21 because `make` is not available in the current Windows shell.
- `make bootstrap-check` could not be run for M01.08 QA validation on 2026-05-21 because `make` is not available in the current Windows shell.
- `make bootstrap-check` could not be run for M01.09 builder validation on 2026-05-21 because `make` is not available in the current Windows shell.
- `make bootstrap-check` could not be run for M01.09 QA validation on 2026-05-21 because `make` is not available in the current Windows shell.
- `make bootstrap-check` could not be run for M01.10 builder validation on 2026-05-21 because `make` is not available in the current Windows shell.
- `make bootstrap-check` could not be run for M01.10 QA recovery validation on 2026-05-21 because `make` is not available in the current Windows shell.
- `make bootstrap-check` could not be run for M01.11 builder validation on 2026-05-21 because `make` is not available in the current Windows shell.
- `make bootstrap-check` could not be run for M01.11 QA validation on 2026-05-21 because `make` is not available in the current Windows shell.
- `make bootstrap-check` could not be run for M01.12 builder validation on 2026-05-21 because `make` is not available in the current Windows shell.
- `make bootstrap-check` could not be run for M01.12 QA validation on 2026-05-23 because `make` is not available in the current Windows shell.
- `make bootstrap-check` could not be run for M01.12 post-merge finalization on 2026-05-23 because `make` is not available in the current Windows shell.
- `make bootstrap-check` could not be run for M01.13 builder validation on 2026-05-23 because `make` is not available in the current Windows shell.
- `make bootstrap-check` could not be run for M01.13 QA validation on 2026-05-25 because `make` is not available in the current Windows shell.
- `make bootstrap-check` could not be run for M01 closeout validation on 2026-05-25 because `make` is not available in the current Windows shell.
- Equivalent underlying checks were run directly with Python:
  - `python scripts/validate-control-plane.py`
  - `python -m pytest tests/test_control_plane_bootstrap.py`
- Earlier M00 exploratory checks recorded `rg` access denied; M00.08 QA used `rg` successfully.

## Latest validation

- 2026-06-02: M02 planning branch guard passed on `m02-planning-monorepo-and-local-development-environment`; the starting worktree was clean, remote `origin` points to `https://github.com/Islem-Rezzag/CausalLedger.git`, recent history showed `0d58f04` (`docs: close out M01 domain model and scope freeze (#36)`) and M01.13 at `27c39b6`, and tag `v0.1.0` exists.
- 2026-06-02: M02 planning created `plans/active/CLP-0003-m02-monorepo-and-local-development-environment.md`, created ADR placeholders `docs/decisions/ADR-0005-m02-stack-and-monorepo-direction.md`, `docs/decisions/ADR-0006-local-dev-and-ci-baseline.md`, and `docs/decisions/ADR-0007-logging-error-handling-and-observability-direction.md`, aligned continuous lifecycle observer language, mapped OrbitSoft-readiness constraints, and kept M02.01 through M02.20 `Not started`.
- 2026-06-02: M02 planning validation passed with `python scripts/validate-control-plane.py`, `python -m pytest tests/test_control_plane_bootstrap.py` with 32 tests, and `git diff --check`; `make bootstrap-check` could not run because `make` is unavailable in the current Windows shell.
- 2026-05-25: M01 closeout branch guard passed on `m01-closeout-domain-model-and-scope-freeze`; the starting worktree was clean, remote `origin` points to `https://github.com/Islem-Rezzag/CausalLedger.git`, recent history showed M01.13 merged at `27c39b6` (`docs: run M01.13 domain consistency QA (#35)`), and tag `v0.1.0` exists.
- 2026-05-25: M01 closeout created `docs/status/M01_CLOSEOUT.md`, moved the M01 plan to `plans/completed/CLP-0002-m01-domain-model-and-scope-freeze.md`, updated M01 tracking to `Completed and merged`, kept M02 through M21 `Not started`, and did not create an M02 active plan.
- 2026-05-25: M01 closeout verified product implementation has not started; future product directories contain placeholder README files only, `.github/workflows/` does not exist, and no real secrets were found.
- 2026-05-25: M01 closeout validation passed with `python scripts/validate-control-plane.py`, `python -m pytest tests/test_control_plane_bootstrap.py` with 31 tests, and `git diff --check`; `make bootstrap-check` could not run because `make` is unavailable in the current Windows shell.
- 2026-05-25: M01.13 QA branch guard passed on `m01-13-qa-domain-consistency`; the starting worktree was clean, latest commit was `254bdcd` (`docs: run M01.13 domain consistency QA`), remote `origin` points to `https://github.com/Islem-Rezzag/CausalLedger.git`, and tag `v0.1.0` exists.
- 2026-05-25: M01.13 QA verified the domain consistency report, DOMAIN_MODEL, RELIABILITY, THREAT_MODEL, M01 domain docs, eval docs, spec placeholders, roadmap, registry, active plan, status docs, validation coverage, and forbidden-scope boundaries.
- 2026-05-25: M01.13 QA fixed the checked-file list in `docs/status/M01_DOMAIN_CONSISTENCY.md` so the report records itself as inspected.
- 2026-05-25: M01.13 QA validation passed with `python scripts/validate-control-plane.py`, `python -m pytest tests/test_control_plane_bootstrap.py` with 30 tests, and `git diff --check`; `make bootstrap-check` could not run because `make` is unavailable in the current Windows shell.
- 2026-05-25: M01.13 is `QA passed, awaiting merge`; PR #35 is open; it is not completed, merged, or closed. M01 is still active, M01 closeout remains required after M01.13 PR merge, and the next recommended thread is `Merge M01.13 PR - Domain Consistency`.
- 2026-05-23: M01.13 builder branch guard passed on `m01-13-qa-domain-consistency`; the starting worktree was clean, latest commit was `686f69b` (`M01.12: finalize threat model after merge`), remote `origin` points to `https://github.com/Islem-Rezzag/CausalLedger.git`, and tag `v0.1.0` exists.
- 2026-05-23: M01.13 confirmed M01.12 Write THREAT_MODEL.md is `Completed and merged` after PR #31 merged; duplicate PR merges #32 and #33 from the same M01.12 branch are recorded as a process deviation; M01.13 QA Domain Consistency is the current submilestone; M02 through M21 remain `Not started`; product implementation has not started.
- 2026-05-23: M01.13 created `docs/status/M01_DOMAIN_CONSISTENCY.md` and verified domain terminology, domain boundaries, reliability, threat model, AI boundaries, out-of-scope positioning, versioning, evaluation and ablation planning, spec placeholders, roadmap, registry, active plan, status docs, and forbidden-scope boundaries.
- 2026-05-23: M01.13 builder validation passed with `python scripts/validate-control-plane.py`, `python -m pytest tests/test_control_plane_bootstrap.py`, and `git diff --check`; `make bootstrap-check` could not run because `make` is unavailable in the current Windows shell.
- 2026-05-23: M01.13 is `Builder complete, awaiting QA`; it is not QA passed, completed, merged, or closed. M01 is still active, M01 closeout remains required after M01.13 QA PASS and PR merge, and the next recommended thread is `M01.13 QA - Domain Consistency`.
- 2026-05-23: M01.12 post-merge finalization branch guard passed on `m01-12-post-merge-finalization`; the starting worktree was clean, latest commit was `d8cf4dd` (`M01 12 write threat model (#33)`), remote `origin` points to `https://github.com/Islem-Rezzag/CausalLedger.git`, and tag `v0.1.0` exists.
- 2026-05-23: M01.12 was finalized as `Completed and merged` after PR #31 merged. Duplicate PR merges #32 and #33 were also created from the same M01.12 branch; this was recorded as a process deviation. No revert was done. Corrective action is tracking consistency plus stricter PR discipline: one PR per branch and branch deletion after merge for future submilestones.
- 2026-05-23: M01.13 QA Domain Consistency was recorded as the next submilestone after M01.12 finalization merged. M02 through M21 remained `Not started`; product implementation had not started.
- 2026-05-23: Initial M01.12 post-merge finalization `python scripts/validate-control-plane.py` failed because `docs/status/NEXT_RECOMMENDED_THREAD.md` used equivalent but non-exact wording for the finalization-PR precondition; the scoped wording was fixed and validation was rerun successfully.
- 2026-05-23: M01.12 post-merge finalization validation passed with `python scripts/validate-control-plane.py`, `python -m pytest tests/test_control_plane_bootstrap.py` with 29 tests, and `git diff --check`; `make bootstrap-check` could not run because `make` is unavailable in the current Windows shell.
- 2026-05-23: M01.12 QA branch guard passed on `m01-12-write-threat-model`; the starting worktree was clean, latest commit was `18a9aa7` (`docs: write M01.12 threat model`), remote `origin` points to `https://github.com/Islem-Rezzag/CausalLedger.git`, and tag `v0.1.0` exists.
- 2026-05-23: M01.12 QA verified `docs/THREAT_MODEL.md`, tracking/status files, validation coverage, and forbidden-scope boundaries. No THREAT_MODEL.md content defects and no product implementation were found.
- 2026-05-23: M01.12 QA applied scoped tracking/status and control-plane validation expectation updates for the expected pre-merge QA state, with M01.13 still not started at that checkpoint, M02 through M21 `Not started`, and the exact next thread recorded as `Merge M01.12 PR - Write THREAT_MODEL.md`.
- 2026-05-23: M01.12 QA validation passed with `python scripts/validate-control-plane.py`, `python -m pytest tests/test_control_plane_bootstrap.py` with 29 tests, and `git diff --check`; `make bootstrap-check` could not run because `make` is unavailable in the current Windows shell.
- 2026-05-23: At the earlier M01.12 QA checkpoint, M01.12 had not yet been finalized as merged; it was later recorded as `Completed and merged` after PR #31 merged and post-merge finalization completed. M01.13 had not started at that checkpoint; M02 through M21 remained `Not started`; product implementation had not started.
- 2026-05-21: M01.11 was finalized as `Completed and merged` after PR #30 merged at git commit `a424924` (`docs: write M01.11 reliability model (#30)`) before M01.12 builder work began.
- 2026-05-21: M01.12 builder branch guard passed on `m01-12-write-threat-model`; the starting worktree was clean, latest commit was `a424924` (`docs: write M01.11 reliability model (#30)`), remote `origin` points to `https://github.com/Islem-Rezzag/CausalLedger.git`, and tag `v0.1.0` exists.
- 2026-05-21: M01.12 was marked `Builder in progress`; M01.13 remains `Not started`; M02 through M21 remain `Not started`; product implementation has not started.
- 2026-05-21: M01.12 rewrote `docs/THREAT_MODEL.md` as the canonical CausalLedger threat model and updated README, docs index, domain model, reliability model, active plan, roadmap, milestone, registry, status docs, capability matrix, tech debt, risk register, and validation coverage.
- 2026-05-21: Initial M01.12 `python scripts/validate-control-plane.py` failed because `docs/status/NEXT_RECOMMENDED_THREAD.md` recorded M01.11 completion only with the full submilestone name while validation expected the exact shorter phrase; the scoped next-thread wording was fixed and validation was rerun successfully.
- 2026-05-21: M01.12 builder validation passed with `python scripts/validate-control-plane.py`, `python -m pytest tests/test_control_plane_bootstrap.py` with 29 tests, and `git diff --check`; `make bootstrap-check` could not run because `make` is unavailable in the current Windows shell.
- 2026-05-21: M01.12 was marked `Builder complete, awaiting QA`; M01.13 remains `Not started`; M02 through M21 remain `Not started`; product implementation has not started.
- 2026-05-21: M01.10 was finalized as `Completed and merged` after QA recovery PR #29 merged at git commit `a878d55` (`test: QA recovery M01.10 domain model summary (#29)`) before M01.11 builder work began.
- 2026-05-21: M01.11 builder branch guard passed on `m01-11-write-reliability`; the starting worktree was clean, latest commit was `a878d55` (`test: QA recovery M01.10 domain model summary (#29)`), remote `origin` points to `https://github.com/Islem-Rezzag/CausalLedger.git`, and tag `v0.1.0` exists.
- 2026-05-21: M01.11 was marked `Builder in progress`; M01.12 and M01.13 remain `Not started`; M02 through M21 remain `Not started`; product implementation has not started.
- 2026-05-21: M01.11 rewrote `docs/RELIABILITY.md` as the canonical CausalLedger reliability model and updated README, docs index, domain model, active plan, roadmap, milestone, registry, status, capability, tech-debt, risk-register, and validation coverage.
- 2026-05-21: Initial M01.11 `python -m pytest tests/test_control_plane_bootstrap.py` failed because the new reliability-model test treated the required negative statement `LLM output is evidence` as a forbidden positive claim; the scoped test assertion was narrowed and validation was rerun successfully.
- 2026-05-21: M01.11 builder validation passed with `python scripts/validate-control-plane.py`, `python -m pytest tests/test_control_plane_bootstrap.py` with 28 tests, and `git diff --check`; `make bootstrap-check` could not run because `make` is unavailable in the current Windows shell.
- 2026-05-21: M01.11 was marked `Builder complete, awaiting QA`; M01.12 and M01.13 remain `Not started`; M02 through M21 remain `Not started`; product implementation has not started.
- 2026-05-21: M01.11 QA branch guard passed on `m01-11-write-reliability`; the starting worktree was clean, latest commit was `518d8a8` (`docs: write M01.11 reliability model`), remote `origin` points to `https://github.com/Islem-Rezzag/CausalLedger.git`, and tag `v0.1.0` exists.
- 2026-05-21: M01.11 QA verified `docs/RELIABILITY.md`, tracking/status files, validation coverage, and forbidden-scope boundaries; no reliability model content defects and no product implementation were found.
- 2026-05-21: M01.11 QA validation passed with `python scripts/validate-control-plane.py`, `python -m pytest tests/test_control_plane_bootstrap.py` with 28 tests, and `git diff --check`; `make bootstrap-check` could not run because `make` is unavailable in the current Windows shell.
- 2026-05-21: M01.11 was marked `QA passed, awaiting merge`; M01.12 and M01.13 remain `Not started`; M02 through M21 remain `Not started`; product implementation has not started.
- 2026-05-21: M01.09 was finalized as `Completed and merged` after PR #27 merged at git commit `1b40773` (`docs: define M01.09 out-of-scope domains (#27)`) before M01.10 builder work began.
- 2026-05-21: M01.10 builder branch guard passed on `m01-10-write-domain-model`; the starting worktree was clean, latest commit was `1b40773` (`docs: define M01.09 out-of-scope domains (#27)`), remote `origin` points to `https://github.com/Islem-Rezzag/CausalLedger.git`, and tag `v0.1.0` exists.
- 2026-05-21: M01.10 was marked `Builder in progress`; M01.11 through M01.13 and M02 through M21 remain `Not started`; product implementation has not started.
- 2026-05-21: M01.10 rewrote `docs/DOMAIN_MODEL.md` as the canonical M01 domain model summary and updated README, docs index, status, roadmap, milestone, registry, capability, tech-debt, active plan, and validation coverage.
- 2026-05-21: Initial M01.10 `python scripts/validate-control-plane.py` failed because the M01.10 registry row used lower-case `no product implementation or runtime behavior` while validation expected the exact capitalized marker; the scoped registry wording was fixed and validation was rerun successfully.
- 2026-05-21: M01.10 builder validation passed with `python scripts/validate-control-plane.py`, `python -m pytest tests/test_control_plane_bootstrap.py` with 27 tests, and `git diff --check`; `make bootstrap-check` could not run because `make` is unavailable in the current Windows shell.
- 2026-05-21: M01.10 was marked `Builder complete, awaiting QA`; M01.11 through M01.13 and M02 through M21 remain `Not started`; product implementation has not started.
- 2026-05-21: Started M01.10 post-merge QA recovery on branch `m01-10-qa-recovery-domain-model` after builder PR #28 was squash-merged before the required QA thread at commit `dc6800b`; branch guard passed, the starting worktree was clean, remote `origin` points to `https://github.com/Islem-Rezzag/CausalLedger.git`, latest commit was `dc6800b` (`docs: write M01.10 domain model summary (#28)`), and tag `v0.1.0` exists.
- 2026-05-21: Audited the already-merged M01.10 DOMAIN_MODEL.md work, tracking/status files, validation coverage, and forbidden-scope boundaries; found no domain model content defects and no product implementation.
- 2026-05-21: Recorded the M01.10 merge-before-QA protocol deviation and QA recovery in tracking/status files and validation coverage.
- 2026-05-21: M01.10 QA recovery validation passed with `python scripts/validate-control-plane.py`, `python -m pytest tests/test_control_plane_bootstrap.py` with 27 tests, and `git diff --check`; `make bootstrap-check` could not run because `make` is unavailable in the current Windows shell.
- 2026-05-21: M01.10 was marked `QA recovery passed, awaiting recovery PR merge`; M01.11 through M01.13 and M02 through M21 remain `Not started`; product implementation has not started.
- 2026-05-21: M01.08 was finalized as `Completed and merged` after PR #26 merged at git commit `1fde07a` (`docs: define M01.08 human review states (#26)`) before M01.09 builder work began.
- 2026-05-21: M01.09 builder branch guard passed on `m01-09-define-out-of-scope-domains`; the starting worktree was clean, latest commit was `1fde07a` (`docs: define M01.08 human review states (#26)`), and tag `v0.1.0` exists.
- 2026-05-21: M01.09 out-of-scope domains were added as documentation only in `docs/domain/out-of-scope-domains.md`.
- 2026-05-21: M01.09 was marked `Builder complete, awaiting QA`; M01.10 through M01.13 and M02 through M21 remain `Not started`.
- 2026-05-21: Initial M01.09 `python scripts/validate-control-plane.py` failed because new validation strings expected lower-case phrases where the domain doc used capitalized Markdown bullets and table cells; the scoped validation and bootstrap-test strings were aligned and validation was rerun successfully.
- 2026-05-21: `python scripts/validate-control-plane.py` passed for M01.09 builder.
- 2026-05-21: `python -m pytest tests/test_control_plane_bootstrap.py` passed with 27 tests for M01.09 builder.
- 2026-05-21: `git diff --check` passed for M01.09 builder.
- 2026-05-21: `make bootstrap-check` could not run for M01.09 builder because `make` is unavailable in the current Windows shell.
- 2026-05-21: M01.09 QA branch guard passed on `m01-09-define-out-of-scope-domains`; the starting worktree was clean, latest commit was `e103fa2` (`docs: define M01.09 out-of-scope domains`), and tag `v0.1.0` exists.
- 2026-05-21: M01.09 QA reviewed `docs/domain/out-of-scope-domains.md`, domain links, high-level positioning docs, lightweight spec dependency notes, tracking/status files, validation coverage, and forbidden-scope boundaries.
- 2026-05-21: M01.09 QA found no out-of-scope domain content defects and made only tracking/status/control-plane validation updates.
- 2026-05-21: M01.09 was marked `QA passed, awaiting merge`; M01.10 through M01.13 and M02 through M21 remain `Not started`.
- 2026-05-21: `python scripts/validate-control-plane.py` passed for M01.09 QA.
- 2026-05-21: `python -m pytest tests/test_control_plane_bootstrap.py` passed with 27 tests for M01.09 QA.
- 2026-05-21: `git diff --check` passed for M01.09 QA.
- 2026-05-21: `make bootstrap-check` could not run for M01.09 QA because `make` is unavailable in the current Windows shell.
- 2026-05-21: Product implementation has not started; no MoneyEvent runtime, ledger runtime, settlement runtime, reconciliation runtime, incident runtime, invariant engine, causal graph runtime, replay runtime, agent runtime, repair planner runtime, human-review runtime, UI, external connector, database schema, API route, GitHub Action, CI workflow, autonomous repair execution, autonomous money movement, legal/tax/AML/KYC/fraud/credit/investment advice, or product behavior was added.
- 2026-05-21: M01.08 QA branch guard passed on `m01-08-define-human-review-states`; the starting worktree was clean, latest commit was `3ed6b7a` (`docs: define M01.08 human review states`), and tag `v0.1.0` exists.
- 2026-05-21: M01.08 QA reviewed `docs/domain/human-review-states.md`, domain links, lightweight spec dependency notes, tracking/status files, validation coverage, and forbidden-scope boundaries.
- 2026-05-21: M01.08 QA found no human-review content defects and made only tracking/status/control-plane validation updates.
- 2026-05-21: M01.08 was marked `QA passed, awaiting merge`; M01.09 through M01.13 and M02 through M21 remain `Not started`.
- 2026-05-21: `python scripts/validate-control-plane.py` passed for M01.08 QA.
- 2026-05-21: `python -m pytest tests/test_control_plane_bootstrap.py` passed with 26 tests for M01.08 QA.
- 2026-05-21: `git diff --check` passed for M01.08 QA.
- 2026-05-21: `make bootstrap-check` could not run for M01.08 QA because `make` is unavailable in the current Windows shell.
- 2026-05-21: Product implementation has not started; no human-review runtime, review queue, state machine, approval engine, API, database, UI, repair execution, agent runtime, GitHub Action, CI workflow, deployment, auth/authz implementation, structured logging implementation, or product behavior was added.
- 2026-05-21: M01.08 builder branch guard passed on `m01-08-define-human-review-states`; the starting worktree was clean, latest commit was `6ff0cfa` (`docs: finalize M01.07 after merge (#25)`), and tag `v0.1.0` exists.
- 2026-05-21: M01.08 human review states were added as documentation only in `docs/domain/human-review-states.md`.
- 2026-05-21: M01.08 was marked `Builder complete, awaiting QA`; M01.09 through M01.13 and M02 through M21 remain `Not started`.
- 2026-05-21: `python scripts/validate-control-plane.py` passed for M01.08 builder.
- 2026-05-21: `python -m pytest tests/test_control_plane_bootstrap.py` passed with 26 tests for M01.08 builder.
- 2026-05-21: `git diff --check` passed for M01.08 builder.
- 2026-05-21: `make bootstrap-check` could not run for M01.08 builder because `make` is unavailable in the current Windows shell.
- 2026-05-21: Product implementation has not started; no human-review runtime, review queue, state machine, approval engine, API, database, UI, repair execution, agent runtime, GitHub Action, CI workflow, deployment, auth/authz implementation, structured logging implementation, or product behavior was added.
- 2026-05-18: M01.07 post-merge finalization branch setup passed on `m01-07-post-merge-finalization`; the starting worktree was clean, `origin/main` was fetched and fast-forwarded into local `main`, PR #23 was confirmed merged into `main` at squash commit `a88b5ff` (`docs: define M01.07 evidence receipt model (#23)`), and local `main`/`origin/main` were confirmed at `0313f4e` (`docs: define M01.07 evidence receipt model`).
- 2026-05-18: M01.07 was marked `Completed and merged`; M01.08 through M01.13 and M02 through M21 remain `Not started`.
- 2026-05-18: Next recommended thread updated to `M01.08 Builder - Define Human Review States`.
- 2026-05-18: `python scripts/validate-control-plane.py` passed for M01.07 post-merge finalization.
- 2026-05-18: `python -m pytest tests/test_control_plane_bootstrap.py -q` passed with 25 tests for M01.07 post-merge finalization.
- 2026-05-18: `git diff --check` passed for M01.07 post-merge finalization.
- 2026-05-18: `make bootstrap-check` could not run for M01.07 post-merge finalization because `make` is unavailable in the current Windows shell.
- 2026-05-18: Product implementation has not started; no runtime product code, evidence ingestion runtime, evidence storage layer, database, schema, API, file parser, external connector, GitHub Action, CI workflow, deployment, auth/authz implementation, structured logging implementation, repair execution, repair planner runtime, or money mutation was added.
- 2026-05-18: M01.07 QA branch setup passed on `m01-07-define-evidence-receipt-model`; the starting worktree was clean, the branch fast-forwarded cleanly, PR #23 matched the expected branch and title, and builder commit `509738d` was present.
- 2026-05-18: M01.07 QA reviewed `docs/domain/evidence-receipt-model.md`, domain links, status tracking, validation coverage, PR #23 metadata, hidden Unicode warnings, and forbidden-scope boundaries.
- 2026-05-18: M01.07 QA applied a scoped documentation clarification so missing evidence explicitly includes gap outcomes and evidence receipts explicitly do not mutate financial truth.
- 2026-05-18: M01.07 QA marked M01.07 `QA passed, awaiting merge`; M01.08 through M01.13 and M02 through M21 remain `Not started`.
- 2026-05-18: `python scripts/validate-control-plane.py` passed for M01.07 QA.
- 2026-05-18: `python -m pytest tests/test_control_plane_bootstrap.py -q` passed with 25 tests for M01.07 QA.
- 2026-05-18: `git diff --check` passed for M01.07 QA.
- 2026-05-18: `make bootstrap-check` could not run for M01.07 QA because `make` is unavailable in the current Windows shell.
- 2026-05-18: Hidden-character scan found a UTF-8 BOM in `docs/milestones/SUBMILESTONE_REGISTRY.md`; the same BOM exists on `origin/main`, so it is a benign pre-existing marker and no risky bidirectional, isolate, or zero-width characters were introduced by M01.07.
- 2026-05-18: Product implementation has not started; no runtime product code, evidence ingestion runtime, evidence storage layer, database, schema, API, file parser, external connector, GitHub Action, CI workflow, deployment, auth/authz implementation, structured logging implementation, repair execution, repair planner runtime, or money mutation was added.
- 2026-05-18: M01.07 builder branch setup passed on `m01-07-define-evidence-receipt-model`; the starting worktree was clean, `origin/main` was fetched, `main` fast-forwarded cleanly to `5cd675c`, and M01.06 finalization was confirmed merged at `5cd675c` after PR #22.
- 2026-05-18: M01.07 evidence receipt model was added as documentation only in `docs/domain/evidence-receipt-model.md`.
- 2026-05-18: M01.07 was marked `Builder complete, awaiting QA`; M01.08 through M01.13 and M02 through M21 remain `Not started`.
- 2026-05-18: `python scripts/validate-control-plane.py` passed for M01.07 builder.
- 2026-05-18: `python -m pytest tests/test_control_plane_bootstrap.py -q` passed with 25 tests for M01.07 builder.
- 2026-05-18: `git diff --check` passed for M01.07 builder.
- 2026-05-18: `make bootstrap-check` could not run for M01.07 builder because `make` is unavailable in the current Windows shell.
- 2026-05-18: Product implementation has not started; no runtime product code, evidence ingestion runtime, evidence storage layer, database, schema, API, file parser, external connector, GitHub Actions, CI workflow, deployment, auth/authz implementation, structured logging implementation, repair execution, repair planner runtime, or money mutation was added.
- 2026-05-18: M01.06 post-merge finalization branch setup passed on `m01-06-post-merge-finalization`; the starting worktree was clean, `origin/main` was fetched, `main` fast-forwarded cleanly, and PR #21 was confirmed merged at git commit `7adc96d` (`docs: define M01.06 safe and unsafe repairs (#21)`).
- 2026-05-18: M01.06 was marked `Completed and merged`; M01.07 through M01.13 and M02 through M21 remain `Not started`.
- 2026-05-18: Next recommended thread updated to `M01.07 Builder - Define Evidence Receipt Model`.
- 2026-05-18: `python scripts/validate-control-plane.py` passed for M01.06 post-merge finalization.
- 2026-05-18: `python -m pytest tests/test_control_plane_bootstrap.py -q` passed with 24 tests for M01.06 post-merge finalization.
- 2026-05-18: `git diff --check` passed for M01.06 post-merge finalization.
- 2026-05-18: `make bootstrap-check` could not run for M01.06 post-merge finalization because `make` is unavailable in the current Windows shell.
- 2026-05-18: Product implementation has not started; no runtime product code, API, database, GitHub Actions, CI workflow, deployment, auth/authz implementation, structured logging implementation, repair execution, repair planner runtime, or money mutation was added.
- 2026-05-18: M01.06 QA branch setup passed on `m01-06-define-safe-and-unsafe-repairs`; the starting worktree was clean, `origin` points to `https://github.com/Islem-Rezzag/CausalLedger.git`, and the branch fast-forwarded cleanly.
- 2026-05-18: M01.06 QA reviewed `docs/domain/repair-vocabulary.md`, domain links, status tracking, validation coverage, forbidden-scope boundaries, and PR #21 metadata.
- 2026-05-18: At QA time, PR #21 body still contained default template placeholders; `gh` was unavailable in the current Windows shell, so the issue was recorded as a pre-merge accuracy note.
- 2026-05-18: `python scripts/validate-control-plane.py` passed for M01.06 QA.
- 2026-05-18: `python -m pytest tests/test_control_plane_bootstrap.py -q` passed with 24 tests for M01.06 QA.
- 2026-05-18: `git diff --check` passed for M01.06 QA.
- 2026-05-18: M01.06 is marked `QA passed, awaiting merge`; M01.07 through M01.13 and M02 through M21 remain `Not started`.
- 2026-05-18: Product implementation has not started; no runtime product code, API, database, GitHub Actions, CI workflow, repair execution, repair planner runtime, or money mutation was added.
- 2026-05-17: M01.06 builder branch setup passed on `m01-06-define-safe-and-unsafe-repairs`; the starting worktree was clean, `main` was up to date with `origin/main`, and the existing M01.06 branch contained no unique M01.06 work before it was aligned to updated `origin/main`.
- 2026-05-17: M01.06 builder defined safe and unsafe repair vocabulary as documentation only in `docs/domain/repair-vocabulary.md`.
- 2026-05-17: Initial M01.06 `python scripts/validate-control-plane.py` failed because `docs/status/NEXT_RECOMMENDED_THREAD.md` blocked M01.07 and M02 in combined wording while validation expected the exact `Do not start M02` phrase; the scoped wording was fixed and validation was rerun successfully.
- 2026-05-17: `python scripts/validate-control-plane.py` passed for M01.06 builder.
- 2026-05-17: `python -m pytest tests/test_control_plane_bootstrap.py -q` passed with 24 tests for M01.06 builder.
- 2026-05-17: `git diff --check` passed for M01.06 builder.
- 2026-05-17: M01.06 is marked `Builder complete, awaiting QA`; M01.07 through M01.13 and M02 through M21 remain `Not started`.
- 2026-05-17: Product implementation has not started; no runtime product code, API, database, GitHub Actions, CI workflow, repair execution, repair planner runtime, or money mutation was added.
- 2026-05-17: M01.05 post-merge finalization branch guard passed on `m01-05-post-merge-finalization`; the starting worktree was clean and `origin` points to `https://github.com/Islem-Rezzag/CausalLedger.git`.
- 2026-05-17: Local git history confirmed `main`, `origin/main`, and the current branch at commit `3bdedeb` (`test: QA recovery M01.05 incident vocabulary and ablation strategy (#18)`).
- 2026-05-17: Updated M01.05 tracking to `Completed and merged`, recorded QA recovery PR #18 and merge commit `3bdedeb`, kept M01.06 through M01.13 and M02 through M21 `Not started`, and set the next recommended thread to `M01.06 Builder - Define Safe and Unsafe Repairs`.
- 2026-05-17: `python scripts/validate-control-plane.py` passed for M01.05 post-merge finalization.
- 2026-05-17: `python -m pytest tests/test_control_plane_bootstrap.py -q` passed with 23 tests for M01.05 post-merge finalization.
- 2026-05-17: `git diff --check` passed for M01.05 post-merge finalization.
- 2026-05-17: Product implementation has not started; no runtime product code, API, database, GitHub Actions, CI workflow, repair behavior, or M01.06 content was added.
- 2026-05-16: M01.05 builder PR #16 was already squash-merged before the required QA thread; QA recovery ran on branch `m01-05-qa-recovery-incident-vocabulary-ablation-strategy` from commit `5c3943b`.
- 2026-05-16: M01.05 QA recovery audited incident vocabulary, ablation strategy, ablation matrix, MoneyFlowBench/eval notes, future milestone ablation notes, tracking/status files, validation coverage, and forbidden-scope boundaries.
- 2026-05-16: M01.05 QA recovery applied scoped documentation and tracking fixes only; no product implementation was added.
- 2026-05-16: `python scripts/validate-control-plane.py` passed for M01.05 QA recovery.
- 2026-05-16: `python -m pytest tests/test_control_plane_bootstrap.py` passed with 23 tests for M01.05 QA recovery.
- 2026-05-16: `git diff --check` passed for M01.05 QA recovery.
- 2026-05-16: `make bootstrap-check` could not run for M01.05 QA recovery because `make` is unavailable in the current Windows shell.
- 2026-05-16: M01.05 remained in the pre-finalization QA recovery state; M01.06 through M01.13 and M02 through M21 remained `Not started`.
- 2026-05-16: M01.04 was finalized as `Completed and merged` at git commit `5dfe928` (`docs: define M01.04 reconciliation vocabulary (#15)`) before M01.05 builder work began.
- 2026-05-16: M01.05 builder branch guard passed on `m01-05-define-incident-vocabulary`; the starting worktree was clean, `origin` points to `https://github.com/Islem-Rezzag/CausalLedger.git`, latest commit is `5dfe928`, and tag `v0.1.0` exists.
- 2026-05-16: M01.05 is marked `Builder in progress`; M01.06 through M01.13 and M02 through M21 remain `Not started`, and product implementation has not started.
- 2026-05-16: M01.05 builder defined incident vocabulary and scoped ablation planning as documentation only.
- 2026-05-16: Initial M01.05 `python scripts/validate-control-plane.py` run failed because two incident severity dimensions appeared only with initial capitals while validation expected lower-case phrases; the scoped bullets were lower-cased and validation was rerun successfully.
- 2026-05-16: `python scripts/validate-control-plane.py` passed for M01.05 builder.
- 2026-05-16: `python -m pytest tests/test_control_plane_bootstrap.py` passed with 23 tests for M01.05 builder.
- 2026-05-16: `git diff --check` passed for M01.05 builder.
- 2026-05-16: `make bootstrap-check` could not run for M01.05 builder because `make` is unavailable in the current Windows shell.
- 2026-05-16: `Get-Command make -ErrorAction SilentlyContinue` found no `make` command in the current Windows shell.
- 2026-05-16: M01.05 is marked `Builder complete, awaiting QA`; M01.06 through M01.13 and M02 through M21 remain `Not started`, and product implementation has not started.
- 2026-05-16: M01.04 QA passed after reviewing reconciliation vocabulary content, tracking, validation coverage, and forbidden-scope boundaries.
- 2026-05-16: `python scripts/validate-control-plane.py` passed for M01.04 QA.
- 2026-05-16: `python -m pytest tests/test_control_plane_bootstrap.py` passed with 21 tests for M01.04 QA.
- 2026-05-16: `git diff --check` passed for M01.04 QA.
- 2026-05-16: `make bootstrap-check` could not run for M01.04 QA because `make` is unavailable in the current Windows shell.
- 2026-05-16: M01.04 builder passed after defining reconciliation vocabulary content, tracking, validation coverage, and forbidden-scope boundaries.
- 2026-05-16: `python scripts/validate-control-plane.py` passed for M01.04 builder.
- 2026-05-16: `python -m pytest tests/test_control_plane_bootstrap.py` passed with 21 tests for M01.04 builder.
- 2026-05-16: `git diff --check` passed for M01.04 builder.
- 2026-05-16: `make bootstrap-check` could not run for M01.04 builder because `make` is unavailable in the current Windows shell.
- 2026-05-16: M01.03 was finalized as `Completed and merged` at git commit `e54a917` (`docs: define M01.03 settlement vocabulary (#14)`) before M01.04 builder work began.
- 2026-05-16: M01.04 builder branch guard passed on `m01-04-define-reconciliation-vocabulary`; the starting worktree was clean, `origin` points to `https://github.com/Islem-Rezzag/CausalLedger.git`, latest commit is `e54a917`, and tag `v0.1.0` exists.
- 2026-05-16: M01.04 is marked `Builder in progress`; M01.05 through M01.13 and M02 through M21 remain `Not started`, and product implementation has not started.
- 2026-05-16: M01.03 QA passed after reviewing settlement vocabulary content, tracking, validation coverage, and forbidden-scope boundaries.
- 2026-05-16: `python scripts/validate-control-plane.py` passed for M01.03 QA.
- 2026-05-16: `python -m pytest tests/test_control_plane_bootstrap.py` passed with 20 tests for M01.03 QA.
- 2026-05-16: `git diff --check` passed for M01.03 QA.
- 2026-05-16: `make bootstrap-check` could not run for M01.03 QA because `make` is unavailable in the current Windows shell.
- 2026-05-15: M01.03 builder passed after defining settlement vocabulary content, tracking, validation coverage, and forbidden-scope boundaries.
- 2026-05-15: `python scripts/validate-control-plane.py` passed for M01.03 builder.
- 2026-05-15: `python -m pytest tests/test_control_plane_bootstrap.py` passed with 20 tests for M01.03 builder.
- 2026-05-15: `git diff --check` passed for M01.03 builder.
- 2026-05-15: `make bootstrap-check` could not run for M01.03 builder because `make` is unavailable in the current Windows shell.
- 2026-05-15: M01.02 QA passed after reviewing ledger vocabulary content, tracking, validation coverage, and forbidden-scope boundaries.
- 2026-05-15: `python scripts/validate-control-plane.py` passed for M01.02 QA.
- 2026-05-15: `python -m pytest tests/test_control_plane_bootstrap.py` passed with 19 tests for M01.02 QA.
- 2026-05-15: `git diff --check` passed for M01.02 QA.
- 2026-05-15: `make bootstrap-check` was not run for M01.02 QA because `make` is unavailable in the current Windows shell.
- 2026-05-15: M01.02 builder validation passed after one scoped documentation wording fix.
- 2026-05-15: Initial M01.02 `python scripts/validate-control-plane.py` run failed because `docs/domain/ledger-vocabulary.md` defined some terms only in title-cased table cells while validation expected lower-case phrases; a scoped vocabulary-list sentence was added and validation was rerun successfully.
- 2026-05-15: `python scripts/validate-control-plane.py` passed for M01.02 builder.
- 2026-05-15: `python -m pytest tests/test_control_plane_bootstrap.py` passed with 19 tests for M01.02 builder.
- 2026-05-15: `git diff --check` passed for M01.02 builder.
- 2026-05-15: `make bootstrap-check` was not run for M01.02 builder because `make` is unavailable in the current Windows shell.
- 2026-05-11: M01.01 post-merge QA recovery passed after auditing the merged builder work at commit `1175789` (`docs: define M01.01 payment lifecycle (#11)`).
- 2026-05-11: M01.01 QA recovery found no payment-lifecycle content defects and made only scoped tracking/status/control-plane validation updates.
- 2026-05-11: `python scripts/validate-control-plane.py` passed for M01.01 QA recovery.
- 2026-05-11: `python -m pytest tests/test_control_plane_bootstrap.py` passed with 18 tests for M01.01 QA recovery.
- 2026-05-11: `git diff --check` passed for M01.01 QA recovery.
- 2026-05-11: `make bootstrap-check` was not run for M01.01 QA recovery because `make` is unavailable in the current Windows shell.
- 2026-05-11: M01.01 builder validation passed after one scoped tracking wording fix.
- 2026-05-11: Initial M01.01 `python scripts/validate-control-plane.py` run failed because `docs/status/CURRENT_STATE.md` lacked the exact M00.01-through-M00.08 summary phrase required by validation; the phrase was restored and validation was rerun successfully.
- 2026-05-11: `python scripts/validate-control-plane.py` passed for M01.01 builder.
- 2026-05-11: `python -m pytest tests/test_control_plane_bootstrap.py` passed with 18 tests for M01.01 builder.
- 2026-05-11: `git diff --check` passed for M01.01 builder.
- 2026-05-11: `make bootstrap-check` was not run for M01.01 builder because `make` is unavailable in the current Windows shell.
- 2026-05-11: M01 planning QA passed after scoped control-plane fixes.
- 2026-05-11: QA scope audit passed.
- 2026-05-11: `python scripts/validate-control-plane.py` passed.
- 2026-05-11: `python -m pytest tests/test_control_plane_bootstrap.py` passed with 17 tests.
- 2026-05-11: `git diff --check` passed.
- 2026-05-11: `make bootstrap-check` was not run because `make` is unavailable in the current Windows shell.
- 2026-05-11: M01 planning validation passed.
- 2026-05-11: `python scripts/validate-control-plane.py` passed.
- 2026-05-11: `python -m pytest tests/test_control_plane_bootstrap.py` passed with 16 tests.
- 2026-05-11: `git diff --check` passed.
- 2026-05-11: `make bootstrap-check` was not run because `make` is unavailable in the current Windows shell.
- 2026-05-04: `python scripts/validate-control-plane.py` passed.
- 2026-05-04: `python -m pytest tests/test_control_plane_bootstrap.py` passed with 7 tests.
- 2026-05-04: `make bootstrap-check` was not run because `make` is unavailable.
- 2026-05-05: M00.01 QA review passed.
- 2026-05-05: `python scripts/validate-control-plane.py` passed.
- 2026-05-05: `python -m pytest tests/test_control_plane_bootstrap.py` passed with 7 tests.
- 2026-05-05: `make bootstrap-check` was not run because `make` is unavailable.
- 2026-05-05: M00.02 builder validation passed.
- 2026-05-05: `python scripts/validate-control-plane.py` passed.
- 2026-05-05: `python -m pytest tests/test_control_plane_bootstrap.py` passed with 7 tests.
- 2026-05-05: `git diff --check` passed.
- 2026-05-05: `make bootstrap-check` was not run because `make` is unavailable.
- 2026-05-06: M00.02 QA review passed after a scoped branch guard guidance fix.
- 2026-05-06: `python scripts/validate-control-plane.py` passed.
- 2026-05-06: `python -m pytest tests/test_control_plane_bootstrap.py` passed with 7 tests.
- 2026-05-06: `git diff --check` passed.
- 2026-05-06: `make bootstrap-check` was not run because `make` is unavailable.
- 2026-05-06: M00.03 builder started on branch `m00-03-planning-and-tracking-system`.
- 2026-05-06: M00.03 builder validation passed.
- 2026-05-06: `python scripts/validate-control-plane.py` passed.
- 2026-05-06: `python -m pytest tests/test_control_plane_bootstrap.py` passed with 8 tests.
- 2026-05-06: `git diff --check` passed.
- 2026-05-06: `make bootstrap-check` was not run because `make` is unavailable in the current Windows shell.
- 2026-05-06: M00.03 QA review passed after a scoped post-merge finalization guidance fix.
- 2026-05-06: `python scripts/validate-control-plane.py` passed.
- 2026-05-06: `python -m pytest tests/test_control_plane_bootstrap.py` passed with 8 tests.
- 2026-05-06: `git diff --check` passed with a CRLF normalization warning for `docs/milestones/SUBMILESTONE_REGISTRY.md`.
- 2026-05-06: `make bootstrap-check` was not run because `make` is unavailable in the current Windows shell.
- 2026-05-06: M00.03 remained incomplete at that time until PR merge.
- 2026-05-08: M00.03 finalized as `Completed and merged` after merge into `main` at commit `f289d5e`.
- 2026-05-08: M00.04 builder started on branch `m00-04-builder-and-qa-prompt-protocol`; branch guard passed and the worktree was clean before edits.
- 2026-05-08: M00.04 builder validation passed: `python scripts/validate-control-plane.py`, `python -m pytest tests/test_control_plane_bootstrap.py` with 9 tests, and `git diff --check`.
- 2026-05-08: `make bootstrap-check` was not run because `make` is unavailable in the current Windows shell.
- 2026-05-08: M00.04 QA started on branch `m00-04-builder-and-qa-prompt-protocol`; branch guard passed, the worktree was clean before QA edits, and `origin` points to `https://github.com/Islem-Rezzag/CausalLedger.git`.
- 2026-05-08: M00.04 QA validation passed: `python scripts/validate-control-plane.py`, `python -m pytest tests/test_control_plane_bootstrap.py` with 9 tests, and `git diff --check`.
- 2026-05-08: M00.04 QA PASS recorded; M00.04 is safe to merge but remains incomplete until PR merge and tracking finalization.
- 2026-05-08: `make bootstrap-check` was not run during M00.04 QA because `make` is unavailable in the current Windows shell.
- 2026-05-08: M00.04 finalized as `Completed and merged` after merge into `main` at commit `e686c77`.
- 2026-05-08: M00.05 builder started on branch `m00-05-validation-and-handoff-workflow`; branch guard passed and the worktree was clean before edits.
- 2026-05-08: M00.05 builder validation passed: `python scripts/validate-control-plane.py`, `python -m pytest tests/test_control_plane_bootstrap.py` with 10 tests, and `git diff --check`.
- 2026-05-08: `make bootstrap-check` was not run for M00.05 builder validation because `make` is unavailable in the current Windows shell.
- 2026-05-09: M00.05 QA started on branch `m00-05-validation-and-handoff-workflow`; branch guard passed, the worktree was clean before QA edits, and `origin` points to `https://github.com/Islem-Rezzag/CausalLedger.git`.
- 2026-05-09: M00.05 QA validation passed: `python scripts/validate-control-plane.py`, `python -m pytest tests/test_control_plane_bootstrap.py` with 10 tests, and `git diff --check`.
- 2026-05-09: `make bootstrap-check` was not run for M00.05 QA because `make` is unavailable in the current Windows shell.
- 2026-05-09: M00.05 QA PASS recorded; M00.05 is safe to merge but remains incomplete until PR merge and tracking finalization.
- 2026-05-09: M00.05 finalized as `Completed and merged` after merge into `main` at commit `b82e5d1`.
- 2026-05-09: M00.06 builder started on branch `m00-06-github-pr-and-issue-workflow`; branch guard passed and the worktree was clean before edits.
- 2026-05-09: M00.06 builder validation passed: `python scripts/validate-control-plane.py`, `python -m pytest tests/test_control_plane_bootstrap.py` with 12 tests, and `git diff --check`.
- 2026-05-09: `make bootstrap-check` was not run for M00.06 builder validation because `make` is unavailable in the current Windows shell.
- 2026-05-09: M00.06 QA started on branch `m00-06-github-pr-and-issue-workflow`; branch guard passed, the worktree was clean before QA edits, and `origin` points to `https://github.com/Islem-Rezzag/CausalLedger.git`.
- 2026-05-09: M00.06 QA fixed concise control-plane reference gaps in `WORKFLOW.md` and `prompts/template_milestone_closeout.md`, then updated tracking to `QA passed, awaiting merge`.
- 2026-05-09: M00.06 QA validation passed: `python scripts/validate-control-plane.py`, `python -m pytest tests/test_control_plane_bootstrap.py` with 12 tests, and `git diff --check`.
- 2026-05-09: `make bootstrap-check` was not run for M00.06 QA because `make` is unavailable in the current Windows shell.
- 2026-05-10: M00.06 finalized as `Completed and merged` after merge into `main` at commit `a0fdf6bc422f573235d48ee8cde93fd92d25e617`.
- 2026-05-10: M00.07 builder started on branch `m00-07-milestone-closeout-workflow`; branch guard passed and the worktree was clean before edits.
- 2026-05-10: M00.07 builder validation passed: `python scripts/validate-control-plane.py`, `python -m pytest tests/test_control_plane_bootstrap.py` with 13 tests, and `git diff --check`.
- 2026-05-10: `make bootstrap-check` was not run for M00.07 builder validation because `make` is unavailable in the current Windows shell.
- 2026-05-10: M00.07 QA started on branch `m00-07-milestone-closeout-workflow`; branch guard passed, the worktree was clean before QA edits, and `origin` points to `https://github.com/Islem-Rezzag/CausalLedger.git`.
- 2026-05-10: M00.07 QA verified milestone closeout workflow coverage, closeout prompt and plan templates, handoff packet milestone fields, related workflow references, tracking state, validation coverage, and forbidden-scope boundaries.
- 2026-05-10: M00.07 QA validation passed: `python scripts/validate-control-plane.py`, `python -m pytest tests/test_control_plane_bootstrap.py` with 13 tests, and `git diff --check`.
- 2026-05-10: `make bootstrap-check` was not run for M00.07 QA because `make` is unavailable in the current Windows shell.
- 2026-05-10: M00.07 QA PASS recorded; M00.07 is safe to merge but remains incomplete until PR merge and tracking finalization.
- 2026-05-10: Product implementation remains not started; `apps/` and `packages/` contain placeholder README files only.
- 2026-05-10: M00.07 finalized as `Completed and merged` after merge into `main` at commit `ae19cd0e4b34ad8c16c3d4f8ee1adbe08e7575f6`.
- 2026-05-10: M00.08 builder started on branch `m00-08-repo-operating-system-qa-and-freeze`; branch guard passed and the worktree was clean before edits.
- 2026-05-10: M00.08 builder created the repo operating system freeze guide and M00 freeze readiness report, completed targeted control-plane consistency updates, and updated validation coverage.
- 2026-05-10: M00.08 builder validation passed: `python scripts/validate-control-plane.py`, `python -m pytest tests/test_control_plane_bootstrap.py` with 14 tests, and `git diff --check`.
- 2026-05-10: `make bootstrap-check` was not run for M00.08 builder validation because `make` is unavailable in the current Windows shell.
- 2026-05-10: M00.08 marked `Builder complete, awaiting QA`; M00 remains in progress, and M01-M21 remain not started.
- 2026-05-10: M00.08 QA review passed after a scoped freeze readiness next-step fix.
- 2026-05-10: `python scripts/validate-control-plane.py` passed for M00.08 QA.
- 2026-05-10: `python -m pytest tests/test_control_plane_bootstrap.py` passed for M00.08 QA with 14 tests.
- 2026-05-10: `git diff --check` passed for M00.08 QA.
- 2026-05-10: `make bootstrap-check` was not run for M00.08 QA because `make` is unavailable in the current Windows shell.
- 2026-05-10: M00.08 marked `QA passed, awaiting merge`; M00 remains in progress, and M01-M21 remain not started.
- 2026-05-11: Finalized M00.08 as `Completed and merged` after PR #8 merged into `main` at commit `db312d16f3059a2714f929c4bcb831d4a6a5a173`.
- 2026-05-11: M00 closeout validation passed: `python scripts/validate-control-plane.py`.
- 2026-05-11: M00 closeout validation passed: `python -m pytest tests/test_control_plane_bootstrap.py` with 15 tests.
- 2026-05-11: M00 closeout validation passed: `git diff --check`.
- 2026-05-11: `make bootstrap-check` was not run for M00 closeout because `make` is unavailable in the current Windows shell.
