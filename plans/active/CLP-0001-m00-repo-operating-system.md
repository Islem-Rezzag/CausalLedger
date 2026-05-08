# CLP-0001 M00 Repo Operating System

## Purpose / Big Picture

Establish the file-first operating system for CausalLedger milestone work. This plan covers M00 only and keeps the repository usable by future Codex threads without relying on chat memory.

Current submilestone status: M00.03 Planning and Tracking System QA has passed and is awaiting PR merge. M00.01 and M00.02 are completed and merged. M00 remains in progress.

## Progress

- [x] 2026-05-04: Confirmed branch `m00-01-roadmap-submilestone-registry`.
- [x] 2026-05-04: Confirmed `git status --short` was clean before edits.
- [x] 2026-05-04: Confirmed remote `origin` points to `https://github.com/Islem-Rezzag/CausalLedger.git`.
- [x] 2026-05-04: Read required active docs and confirmed there was no active plan beyond `plans/active/README.md`.
- [x] 2026-05-04: Encode full M00-M21 submilestone registry.
- [x] 2026-05-04: Update M00-M21 milestone docs with detailed submilestones.
- [x] 2026-05-04: Add missing top-level project docs.
- [x] 2026-05-04: Update validation and tests for the new required docs.
- [x] 2026-05-04: Run validation and record results.
- [x] 2026-05-05: Completed M00.01 QA review; roadmap, registry, milestone docs, project docs, status docs, and forbidden-scope checks passed.
- [x] 2026-05-05: Re-ran required validation for QA.
- [x] 2026-05-05: Started M00.02 builder thread on branch `m00-02-active-docs-and-repo-guidance`.
- [x] 2026-05-05: Confirmed branch guard, clean worktree, and remote before edits.
- [x] 2026-05-05: Tightened active docs and repo guidance.
- [x] 2026-05-05: Ran M00.02 validation and recorded results.
- [x] 2026-05-05: Completed M00.02 handoff to QA.
- [x] 2026-05-06: Completed M00.02 QA review on branch `m00-02-active-docs-and-repo-guidance`.
- [x] 2026-05-06: Fixed scoped branch guard guidance defect in `docs/ACTIVE_DOCS.md` and `PLANS.md`.
- [x] 2026-05-06: Re-ran required M00.02 QA validation and recorded PASS.
- [x] 2026-05-06: Confirmed M00.02 is merged into `main` through commit `227e504` / PR #2.
- [x] 2026-05-06: Started M00.03 builder thread on branch `m00-03-planning-and-tracking-system`.
- [x] 2026-05-06: Ran branch guard before edits: branch matched `m00-03-planning-and-tracking-system`, `git status --short` was clean, and `origin` points to `https://github.com/Islem-Rezzag/CausalLedger.git`.
- [x] 2026-05-06: Confirmed M00.01 and M00.02 are completed and merged, M00.03 had not started, M00 remains in progress, M01-M21 are not started, no product code exists, and this file is the active plan.
- [x] 2026-05-06: Added `docs/ops/planning-and-tracking-system.md` to define submilestone status lifecycle and tracking operations.
- [x] 2026-05-06: Expanded the submilestone registry with branch, PR, validation, update, and notes tracking columns.
- [x] 2026-05-06: Ran M00.03 builder validation and recorded results.
- [x] 2026-05-06: Handed off M00.03 to QA without marking it fully complete.
- [x] 2026-05-06: Started M00.03 QA on branch `m00-03-planning-and-tracking-system`; branch guard passed before QA edits, `git status --short` was clean, and `origin` points to `https://github.com/Islem-Rezzag/CausalLedger.git`.
- [x] 2026-05-06: Fixed one scoped M00.03 control-plane defect by defining the post-merge finalization operating model.
- [x] 2026-05-06: Ran M00.03 QA validation and recorded results.
- [x] 2026-05-06: Recorded M00.03 QA PASS and left M00.03 awaiting PR merge.

## Surprises & Discoveries

- The current roadmap has placeholder submilestone counts.
- M00-M21 milestone files exist, but they are skeletal.
- No product code exists, which matches the requested control-plane-only scope.
- `make bootstrap-check` was previously recorded as unavailable in the Windows shell.
- `rg` failed to launch in this Windows shell with access denied, so PowerShell listing/search was used for file checks.
- M00.01 QA found no defects requiring product or control-plane fixes beyond recording QA status.
- M00.02 found that active docs already stated the broad safety boundary but needed stricter branch guard, same-branch QA, PR merge, active-doc conflict, and handoff wording.
- M00.02 QA found one scoped control-plane defect: `PLANS.md` or `docs/ACTIVE_DOCS.md` needed to state that branch mismatch means stop without editing.
- M00.03 found the registry had all 360 submilestones but used coarse statuses and lacked durable `Last Validation` and `Last Updated` tracking.
- M00.03 found status docs still reflected the pre-M00.03 handoff state after M00.02 merge and needed synchronization.
- M00.03 QA found that post-merge tracking updates were required but the operational model was ambiguous; the default is now that the next submilestone builder finalizes the previous merged PR before starting new work, with an optional dedicated finalization thread if explicitly requested.
- `make bootstrap-check` remains unavailable in the current Windows shell; underlying Python validation and pytest checks were run directly.

## Decision Log

- 2026-05-04: Keep this plan scoped to M00 only.
- 2026-05-04: Treat `docs/milestones/SUBMILESTONE_REGISTRY.md` as the canonical submilestone registry after this slice.
- 2026-05-04: Mark only M00.01 as active during this slice; do not create active plans for M01-M21.
- 2026-05-04: Control-plane validation is sufficient because no product functionality is being implemented.
- 2026-05-04: Mark M00.01 complete because required Python control-plane validation and bootstrap pytest passed.
- 2026-05-05: M00.01 QA passed; M00 remains in progress and the next safe builder slice is M00.02.
- 2026-05-05: M00.02 remains control-plane only; no product implementation is in scope.
- 2026-05-05: Mark M00.02 complete because required control-plane validation, bootstrap pytest, and `git diff --check` passed. Do not start M00.03 until M00.02 QA PASS and PR merge.
- 2026-05-06: M00.02 QA passed after a scoped branch guard documentation fix and re-validation. Do not start M00.03 until the M00.02 PR is merged.
- 2026-05-06: Treat `Completed and merged` as the only fully complete submilestone status in canonical tracking.
- 2026-05-06: M00.03 builder completion can move the registry to `Builder complete, awaiting QA`, but not to `Completed and merged`.
- 2026-05-06: M00.03 QA PASS can move the registry to `QA passed, awaiting merge`; post-merge finalization must move it to `Completed and merged` only after merge is confirmed.

## Context and Orientation

CausalLedger is in control-plane bootstrap. The current goal is to encode project direction, roadmap structure, milestone sequencing, and thread handoff rules in repo files. The slice must not implement MoneyEvent logic, ledger behavior, invariants, incident logic, causal graph behavior, replay, repair planning, agent runtime, UI, or external connectors.

The LLM never owns financial truth. LLM agents may investigate, summarize, and propose, but may not mutate money, approve repairs, delete evidence, post ledger entries, modify raw events, or override deterministic invariants.

## Scope

In scope for M00.03:

- Creating `docs/ops/planning-and-tracking-system.md`.
- Defining canonical submilestone status states.
- Updating `docs/milestones/SUBMILESTONE_REGISTRY.md` to support status, active plan, branch, PR, last validation, last update, and notes tracking.
- Updating M00 tracking files for M00.03.
- Updating status docs to point to M00.03 QA after builder validation.
- Linking the new tracking operations doc from active entry points where useful.
- Validation updates only for control-plane docs if required.
- Status and handoff updates.

Out of scope:

- Product implementation.
- MoneyEvent, ledger, invariant, incident, graph, replay, repair, agent runtime, UI, or connector logic.
- Active plans for M01-M21.
- Repair approval or any money-state mutation.

## Plan of Work

1. Confirm required branch guard and clean starting state.
2. Read required active docs and confirm current state.
3. Create the planning and tracking operations guide.
4. Update active M00 plan, milestone docs, registry, roadmap, and status docs for M00.03.
5. Confirm validation coverage for the new operations guide and update validation if necessary.
6. Run validation and record results.

## Concrete Steps

- Create `docs/ops/planning-and-tracking-system.md`.
- Update `docs/milestones/SUBMILESTONE_REGISTRY.md`.
- Update `plans/active/CLP-0001-m00-repo-operating-system.md`.
- Update `docs/milestones/M00.md`.
- Update `plans/ROADMAP.md`.
- Update `docs/status/CURRENT_STATE.md`.
- Update `docs/status/WEEKLY_LOG.md`.
- Update `docs/status/NEXT_RECOMMENDED_THREAD.md`.
- Update `docs/status/RISK_REGISTER.md` only if a durable tracking risk is recorded.
- Update `docs/status/CAPABILITY_MATRIX.md` only to keep product-not-started status clear.
- Update `docs/ACTIVE_DOCS.md`.
- Update `PLANS.md`.
- Update `WORKFLOW.md`.
- Update `README.md`.
- Update `docs/INDEX.md`.
- Update `docs/status/TECH_DEBT.md` only if this slice introduces placeholders or shortcuts.
- Update `scripts/validate-control-plane.py` only if required active guidance docs are not already checked.
- Update `tests/test_control_plane_bootstrap.py` only if validation coverage needs test support.

## Validation and Acceptance

Required validation:

- `python scripts/validate-control-plane.py`
- `python -m pytest tests/test_control_plane_bootstrap.py`
- `git diff --check`

Optional validation:

- `make bootstrap-check` if `make` is available.

Acceptance:

- Active documentation files are internally consistent.
- Entry points agree on active plan, branch guard, builder/QA, QA PASS, PR merge, validation, and handoff workflow.
- M00.02 tracking is updated.
- M00.03 tracking is updated without marking the submilestone fully complete.
- `docs/ops/planning-and-tracking-system.md` exists and defines canonical status states.
- Registry supports branch, PR, validation, update, and notes tracking.
- M00.03 is `QA passed, awaiting merge` only after QA validation passed.
- No product code is implemented.
- Control-plane validation passes or limitations are recorded.
- Status docs and handoff packet are updated.

## Idempotence and Recovery

This slice is documentation-first and should be safe to rerun by replacing deterministic generated sections with the same registry content. If validation fails, keep M00.03 in `Builder in progress` or mark it `Blocked`, record the failure in status docs, and recommend a follow-up thread to fix the control-plane gap.

No raw evidence, money state, ledger state, repair approval, or external system is touched.

## Artifacts and Notes

Primary artifacts:

- `docs/ops/planning-and-tracking-system.md`
- `docs/milestones/SUBMILESTONE_REGISTRY.md`
- `docs/milestones/M00.md`
- `plans/ROADMAP.md`
- Updated validation script and tests if needed
- Status handoff docs

## Interfaces and Dependencies

Control-plane only:

- Markdown docs.
- Python validation script.
- Pytest bootstrap test.
- Optional Makefile target if available.

No product interfaces or runtime APIs are created or changed.

## Outcomes & Retrospective

M00.01 and M00.02 are completed and merged. The full M00-M21 submilestone registry is encoded, roadmap counts are real, M00-M21 milestone docs include detailed submilestones, missing top-level project docs exist, and validation enforces required docs and registry.

Product implementation did not start. No MoneyEvent logic, ledger logic, invariants, incident logic, graph logic, replay logic, agent runtime, repair planning logic, UI features, or external connectors were implemented.

Validation results:

- `python scripts/validate-control-plane.py` passed on 2026-05-04.
- `python -m pytest tests/test_control_plane_bootstrap.py` passed on 2026-05-04 with 7 tests.
- `make bootstrap-check` was not run because `make` is unavailable in the current Windows shell.
- `python scripts/validate-control-plane.py` passed on 2026-05-05 during QA.
- `python -m pytest tests/test_control_plane_bootstrap.py` passed on 2026-05-05 with 7 tests during QA.
- `make bootstrap-check` was not run on 2026-05-05 because `make` is unavailable in the current Windows shell.
- `python scripts/validate-control-plane.py` passed on 2026-05-05 for M00.02 builder validation.
- `python -m pytest tests/test_control_plane_bootstrap.py` passed on 2026-05-05 for M00.02 builder validation with 7 tests.
- `git diff --check` passed on 2026-05-05 for M00.02 builder validation.
- `make bootstrap-check` was not run on 2026-05-05 for M00.02 because `make` is unavailable in the current Windows shell.
- `python scripts/validate-control-plane.py` passed on 2026-05-06 for M00.02 QA.
- `python -m pytest tests/test_control_plane_bootstrap.py` passed on 2026-05-06 for M00.02 QA with 7 tests.
- `git diff --check` passed on 2026-05-06 for M00.02 QA.
- `make bootstrap-check` was not run on 2026-05-06 for M00.02 QA because `make` is unavailable in the current Windows shell.
- `python scripts/validate-control-plane.py` passed on 2026-05-06 for M00.03 builder validation.
- `python -m pytest tests/test_control_plane_bootstrap.py` passed on 2026-05-06 for M00.03 builder validation with 8 tests.
- `git diff --check` passed on 2026-05-06 for M00.03 builder validation.
- `make bootstrap-check` was not run on 2026-05-06 for M00.03 builder validation because `make` is unavailable in the current Windows shell.
- `python scripts/validate-control-plane.py` passed on 2026-05-06 for M00.03 QA validation.
- `python -m pytest tests/test_control_plane_bootstrap.py` passed on 2026-05-06 for M00.03 QA validation with 8 tests.
- `git diff --check` passed on 2026-05-06 for M00.03 QA validation with a CRLF normalization warning for `docs/milestones/SUBMILESTONE_REGISTRY.md`.
- `make bootstrap-check` was not run on 2026-05-06 for M00.03 QA because `make` is unavailable in the current Windows shell.

M00.03 builder outcome:

- Created the planning and tracking operations guide.
- Defined canonical submilestone status states and allowed transitions.
- Updated the registry schema for active plan, branch, PR, last validation, last updated, and notes tracking.
- Marked M00.01 and M00.02 as `Completed and merged`.
- Marked M00.03 as `Builder complete, awaiting QA` only after validation passed.
- Kept M00.04 through M21.15 as `Not started`.
- Updated roadmap, M00 milestone, active docs, status docs, plan lifecycle docs, validation script, and bootstrap tests for the new tracking document.
- Did not implement product functionality.

M00.03 QA outcome:

- Verified `docs/ops/planning-and-tracking-system.md` exists and covers purpose, canonical tracking files, statuses, builder, QA, merge, blocked, failed-QA, follow-up, synchronization, and chat-memory avoidance guidance.
- Verified the registry contains 360 rows and 360 unique submilestone IDs with required tracking columns.
- Verified M00.01 and M00.02 are `Completed and merged`, M00.03 is not marked `Completed and merged`, and M00.04 through M21.15 remain `Not started`.
- Fixed ambiguous post-merge finalization guidance by defining the default next-builder finalization model and optional dedicated finalization thread.
- Recorded M00.03 QA PASS while leaving final completion blocked on PR merge.
- Did not implement product functionality.

Remaining risks:

- M00 is not complete; M00.01 and M00.02 are completed and merged.
- M00.03 is not fully complete until QA PASS and PR merge.
- `docs/DOMAIN_MODEL.md` is intentionally a placeholder for M01.

Next recommended action after QA validation: merge the M00.03 PR. After merge, run `M00.04 Builder - Builder and QA Prompt Protocol`; its first step must finalize M00.03 as `Completed and merged` before M00.04 work starts.
