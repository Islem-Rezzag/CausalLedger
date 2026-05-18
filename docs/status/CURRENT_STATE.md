# Current State

## Current phase

M00 Repo operating system is completed and tagged as `v0.1.0`. M01 planning is complete and merged into the current branch history at git commit `2cfd75a` (`docs: plan M01 domain model and scope freeze (#10)`). M01 is the active milestone, the active M01 plan is `plans/active/CLP-0002-m01-domain-model-and-scope-freeze.md`, M01.02 Define ledger vocabulary is `Completed and merged` at git commit `fd1e259` (`docs: define M01.02 ledger vocabulary (#13)`), M01.03 Define settlement vocabulary is `Completed and merged` at git commit `e54a917` (`docs: define M01.03 settlement vocabulary (#14)`), M01.04 Define reconciliation vocabulary is `Completed and merged` at git commit `5dfe928` (`docs: define M01.04 reconciliation vocabulary (#15)`), M01.05 Define incident vocabulary is `Completed and merged` after QA recovery PR #18 merged at git commit `3bdedeb`, and M01.06 Define safe and unsafe repairs is `Completed and merged` after PR #21 merged at git commit `7adc96d` (`docs: define M01.06 safe and unsafe repairs (#21)`).

M01.01 Define payment lifecycle is domain documentation only and is recorded as `Completed and merged` after post-merge QA recovery. The builder PR #11 was squash-merged before required QA at commit `1175789`, and the protocol deviation was recovered through the M01.01 QA recovery PR merged at commit `6480c1d` (`test: QA recovery M01.01 payment lifecycle (#12)`). Product implementation has not started.

M01.05 Define incident vocabulary is domain vocabulary documentation plus scoped offline ablation planning only. The builder PR #16 was squash-merged before required QA at commit `5c3943b` (`docs: define M01.05 incident vocabulary and ablation strategy (#16)`), and the protocol deviation was recovered by QA recovery PR #18 merged at commit `3bdedeb` (`test: QA recovery M01.05 incident vocabulary and ablation strategy (#18)`). Product implementation has not started.

M01.06 Define safe and unsafe repairs is domain vocabulary documentation only. It defines safe-to-propose repair vocabulary, unsafe and forbidden autonomous repair boundaries, evidence requirements, replay-before-apply expectations, deterministic validation expectations, idempotency, rollback planning, human approval, escalation, repair categories, and moat rationale without implementing repair runtime behavior. Product implementation has not started.

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
- Domain vocabulary docs at `docs/domain/payment-lifecycle.md`, `docs/domain/ledger-vocabulary.md`, `docs/domain/settlement-vocabulary.md`, `docs/domain/reconciliation-vocabulary.md`, `docs/domain/incident-vocabulary.md`, and `docs/domain/repair-vocabulary.md`.
- Ablation planning docs at `docs/evals/ABLATION_STRATEGY.md` and `docs/evals/ABLATION_MATRIX.md`.
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

M01.01 Define payment lifecycle is `Completed and merged` after post-merge QA recovery. M01.02 Define ledger vocabulary is `Completed and merged`. M01.03 Define settlement vocabulary is `Completed and merged` at git commit `e54a917`. M01.04 Define reconciliation vocabulary is `Completed and merged` at git commit `5dfe928`. M01.05 Define incident vocabulary is `Completed and merged` after QA recovery PR #18 merged at git commit `3bdedeb`. M01.06 Define safe and unsafe repairs is `Completed and merged` after PR #21 merged at git commit `7adc96d`. M00.01 through M00.08 are completed and merged. M01.07 through M01.13 remain `Not started`, and M02 through M21 remain `Not started`.

M00.01 Roadmap and submilestone registry is completed and merged. M00.02 Active docs and repo guidance is completed and merged. M00.03 Planning and Tracking System is completed and merged at commit `f289d5e`. M00.04 Builder and QA Prompt Protocol is completed and merged at commit `e686c77`. M00.05 Validation and Handoff Workflow is completed and merged at commit `b82e5d1`. M00.06 GitHub PR and Issue Workflow is completed and merged at commit `a0fdf6bc422f573235d48ee8cde93fd92d25e617`. M00.07 Milestone Closeout Workflow is completed and merged at commit `ae19cd0e4b34ad8c16c3d4f8ee1adbe08e7575f6`. M00.08 Repo Operating System QA and Freeze is completed and merged at commit `db312d16f3059a2714f929c4bcb831d4a6a5a173`.

## Product code status

No product code exists yet. Product directories contain placeholder README files only, and `.github/workflows/` does not exist.

## Next action

Begin the next documentation-only M01 slice. The exact next recommended thread is `M01.07 Builder - Define Evidence Receipt Model`.

## Implementation warning

Do not start product implementation. The next M01.07 builder thread may only define the evidence receipt model as documentation and tracking work. It must not create product behavior, MoneyEvent runtime code, ledger runtime logic, settlement runtime logic, reconciliation runtime logic, incident runtime logic, invariants, graph logic, replay logic, agent runtime, repair planning runtime logic, repair execution, UI, APIs, databases, external connectors, GitHub Actions, or CI workflows. Do not start M02.

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
- Equivalent underlying checks were run directly with Python:
  - `python scripts/validate-control-plane.py`
  - `python -m pytest tests/test_control_plane_bootstrap.py`
- Earlier M00 exploratory checks recorded `rg` access denied; M00.08 QA used `rg` successfully.

## Latest validation

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
