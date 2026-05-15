# Current State

## Current phase

M00 Repo operating system is completed and tagged as `v0.1.0`. M01 planning is complete and merged into the current branch history at git commit `2cfd75a` (`docs: plan M01 domain model and scope freeze (#10)`). M01 is the active milestone, the active M01 plan is `plans/active/CLP-0002-m01-domain-model-and-scope-freeze.md`, and M01.02 Define ledger vocabulary is the current submilestone awaiting QA.

M01.01 Define payment lifecycle is domain documentation only and is recorded as `Completed and merged` after post-merge QA recovery. The builder PR #11 was squash-merged before required QA at commit `1175789`, and the protocol deviation was recovered through the M01.01 QA recovery PR merged at commit `6480c1d` (`test: QA recovery M01.01 payment lifecycle (#12)`). Product implementation has not started.

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
- Top-level project docs for brief, vision, architecture, domain placeholder, reliability, threat model, token cost strategy, and docs index.
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
- Active M01 plan at `plans/active/CLP-0002-m01-domain-model-and-scope-freeze.md`.
- Versioning docs at `docs/VERSIONING.md`, `docs/releases/RELEASE_LADDER.md`, and `docs/releases/V1_SCOPE.md`.
- Domain vocabulary docs at `docs/domain/payment-lifecycle.md` and `docs/domain/ledger-vocabulary.md`.
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
- Repair planning.
- UI features.
- External connectors.
- Scenario benchmark implementation.
- API implementation.
- Database implementation.
- GitHub Actions or CI workflows.
- Real secrets.

## Active plan

The active M01 milestone plan is `plans/active/CLP-0002-m01-domain-model-and-scope-freeze.md`.

The completed M00 plan remains at `plans/completed/CLP-0001-m00-repo-operating-system.md`.

## Current submilestone

M01.01 Define payment lifecycle is `Completed and merged` after post-merge QA recovery. M01.02 Define ledger vocabulary is `Builder complete, awaiting QA` on branch `m01-02-define-ledger-vocabulary`. M00.01 through M00.08 are completed and merged. M01.03 through M01.13 remain `Not started`, and M02 through M21 remain `Not started`.

M00.01 Roadmap and submilestone registry is completed and merged. M00.02 Active docs and repo guidance is completed and merged. M00.03 Planning and Tracking System is completed and merged at commit `f289d5e`. M00.04 Builder and QA Prompt Protocol is completed and merged at commit `e686c77`. M00.05 Validation and Handoff Workflow is completed and merged at commit `b82e5d1`. M00.06 GitHub PR and Issue Workflow is completed and merged at commit `a0fdf6bc422f573235d48ee8cde93fd92d25e617`. M00.07 Milestone Closeout Workflow is completed and merged at commit `ae19cd0e4b34ad8c16c3d4f8ee1adbe08e7575f6`. M00.08 Repo Operating System QA and Freeze is completed and merged at commit `db312d16f3059a2714f929c4bcb831d4a6a5a173`.

## Product code status

No product code exists yet. Product directories contain placeholder README files only, and `.github/workflows/` does not exist.

## Next action

Run M01.02 QA on the same branch and PR after the builder commit is pushed. The exact next recommended thread is `M01.02 QA - Define Ledger Vocabulary`.

## Implementation warning

Do not start product implementation. M01.02 may update domain docs, lightweight spec references, tracking, and validation only. It must not create product behavior, MoneyEvent runtime code, ledger runtime logic, invariants, incident logic, graph logic, replay logic, agent runtime, repair planning logic, UI, APIs, databases, external connectors, GitHub Actions, or CI workflows.

## Validation limitations

- `make bootstrap-check` could not be run on 2026-05-04 because `make` is not available in the current Windows shell.
- `make bootstrap-check` could not be run for M01.01 builder validation on 2026-05-11 because `make` is not available in the current Windows shell.
- `make bootstrap-check` could not be run for M01.01 post-merge QA recovery on 2026-05-11 because `make` is not available in the current Windows shell.
- `make bootstrap-check` could not be run for M01.02 builder validation on 2026-05-15 because `make` is not available in the current Windows shell.
- Equivalent underlying checks were run directly with Python:
  - `python scripts/validate-control-plane.py`
  - `python -m pytest tests/test_control_plane_bootstrap.py`
- Earlier M00 exploratory checks recorded `rg` access denied; M00.08 QA used `rg` successfully.

## Latest validation

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
