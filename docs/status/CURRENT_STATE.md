# Current State

## Current phase

Control-plane bootstrap. M00 Repo operating system is in progress. Current submilestone is M00.06 GitHub PR and Issue Workflow.

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
- First active M00 plan.
- Planning and tracking operations guide for submilestone lifecycle state.
- Builder and QA prompt protocol operations guide.
- Validation and handoff workflow operations guide.
- GitHub PR and issue workflow operations guide.
- GitHub labels and milestones guidance.
- Branch protection guidance.
- Reusable builder, QA, and handoff packet prompt templates.
- GitHub PR and issue templates.

## What does not exist

- Product functionality.
- MoneyEvent logic.
- Ledger logic.
- Invariant engine.
- Agent runtime.
- UI features.
- External connectors.
- Scenario benchmark implementation.

## Active plan

`plans/active/CLP-0001-m00-repo-operating-system.md`

## Current submilestone

M00.06 GitHub PR and Issue Workflow QA passed and is awaiting PR merge on branch `m00-06-github-pr-and-issue-workflow`.

M00.01 Roadmap and submilestone registry is completed and merged. M00.02 Active docs and repo guidance is completed and merged. M00.03 Planning and Tracking System is completed and merged at commit `f289d5e`. M00.04 Builder and QA Prompt Protocol is completed and merged at commit `e686c77`. M00.05 Validation and Handoff Workflow is completed and merged at commit `b82e5d1`.

## Product code status

No product code exists yet.

## Next action

Run `Merge M00.06 PR - GitHub PR and Issue Workflow`. Do not mark M00.06 completed until PR merge and post-merge tracking finalization occur.

## Implementation warning

Do not start product implementation. Continue M00 only through the active plan.

## Validation limitations

- `make bootstrap-check` could not be run on 2026-05-04 because `make` is not available in the current Windows shell.
- Equivalent underlying checks were run directly with Python:
  - `python scripts/validate-control-plane.py`
  - `python -m pytest tests/test_control_plane_bootstrap.py`
- `rg` failed to launch in this Windows shell with access denied during exploratory checks; PowerShell listing/search was used instead.

## Latest validation

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
