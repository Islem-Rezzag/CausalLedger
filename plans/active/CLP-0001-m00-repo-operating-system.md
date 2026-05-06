# CLP-0001 M00 Repo Operating System

## Purpose / Big Picture

Establish the file-first operating system for CausalLedger milestone work. This plan covers M00 only and keeps the repository usable by future Codex threads without relying on chat memory.

Current submilestone status: M00.02 Active docs and repo guidance is complete and awaiting QA. M00 remains in progress.

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

## Surprises & Discoveries

- The current roadmap has placeholder submilestone counts.
- M00-M21 milestone files exist, but they are skeletal.
- No product code exists, which matches the requested control-plane-only scope.
- `make bootstrap-check` was previously recorded as unavailable in the Windows shell.
- `rg` failed to launch in this Windows shell with access denied, so PowerShell listing/search was used for file checks.
- M00.01 QA found no defects requiring product or control-plane fixes beyond recording QA status.
- M00.02 found that active docs already stated the broad safety boundary but needed stricter branch guard, same-branch QA, PR merge, active-doc conflict, and handoff wording.

## Decision Log

- 2026-05-04: Keep this plan scoped to M00 only.
- 2026-05-04: Treat `docs/milestones/SUBMILESTONE_REGISTRY.md` as the canonical submilestone registry after this slice.
- 2026-05-04: Mark only M00.01 as active during this slice; do not create active plans for M01-M21.
- 2026-05-04: Control-plane validation is sufficient because no product functionality is being implemented.
- 2026-05-04: Mark M00.01 complete because required Python control-plane validation and bootstrap pytest passed.
- 2026-05-05: M00.01 QA passed; M00 remains in progress and the next safe builder slice is M00.02.
- 2026-05-05: M00.02 remains control-plane only; no product implementation is in scope.
- 2026-05-05: Mark M00.02 complete because required control-plane validation, bootstrap pytest, and `git diff --check` passed. Do not start M00.03 until M00.02 QA PASS and PR merge.

## Context and Orientation

CausalLedger is in control-plane bootstrap. The current goal is to encode project direction, roadmap structure, milestone sequencing, and thread handoff rules in repo files. The slice must not implement MoneyEvent logic, ledger behavior, invariants, incident logic, causal graph behavior, replay, repair planning, agent runtime, UI, or external connectors.

The LLM never owns financial truth. LLM agents may investigate, summarize, and propose, but may not mutate money, approve repairs, delete evidence, post ledger entries, modify raw events, or override deterministic invariants.

## Scope

In scope for M00.02:

- Tightening `START_HERE.md`, `AGENTS.md`, `docs/ACTIVE_DOCS.md`, `PLANS.md`, `WORKFLOW.md`, `README.md`, and `docs/INDEX.md`.
- Updating M00 tracking files for M00.02.
- Validation updates only if required active guidance docs are not already checked.
- Status and handoff updates.

Out of scope:

- Product implementation.
- MoneyEvent, ledger, invariant, incident, graph, replay, repair, agent runtime, UI, or connector logic.
- Active plans for M01-M21.
- Repair approval or any money-state mutation.

## Plan of Work

1. Confirm required branch guard and clean starting state.
2. Read required active docs and confirm current state.
3. Tighten entry-point docs and repo guidance for active docs, branch guards, builder/QA protocol, validation, and handoff.
4. Update active M00 plan, milestone docs, registry, and status docs for M00.02.
5. Confirm validation coverage for required active guidance docs and update validation only if necessary.
6. Run validation and record results.

## Concrete Steps

- Update `START_HERE.md`.
- Update `AGENTS.md`.
- Update `docs/ACTIVE_DOCS.md`.
- Update `PLANS.md`.
- Update `WORKFLOW.md`.
- Update `README.md`.
- Update `docs/INDEX.md`.
- Update `plans/ROADMAP.md` only for current M00.02 status wording.
- Update `docs/milestones/M00.md`.
- Update `docs/milestones/SUBMILESTONE_REGISTRY.md`.
- Update `docs/status/CURRENT_STATE.md`.
- Update `docs/status/WEEKLY_LOG.md`.
- Update `docs/status/NEXT_RECOMMENDED_THREAD.md`.
- Update `docs/status/TECH_DEBT.md` only if this slice introduces placeholders or shortcuts.
- Update `scripts/validate-control-plane.py` only if required active guidance docs are not already checked.
- Update `tests/test_control_plane_bootstrap.py` only if validation coverage needs test support.

## Validation and Acceptance

Required validation:

- `python scripts/validate-control-plane.py`
- `python -m pytest tests/test_control_plane_bootstrap.py`

Optional validation:

- `make bootstrap-check` if `make` is available.

Acceptance:

- Active documentation files are internally consistent.
- Entry points agree on active plan, branch guard, builder/QA, QA PASS, PR merge, validation, and handoff workflow.
- M00.02 tracking is updated.
- No product code is implemented.
- Control-plane validation passes or limitations are recorded.
- Status docs and handoff packet are updated.

## Idempotence and Recovery

This slice is documentation-first and should be safe to rerun by replacing deterministic generated sections with the same registry content. If validation fails, keep M00.01 in progress, record the failure in status docs, and recommend a follow-up thread to fix the control-plane gap.

No raw evidence, money state, ledger state, repair approval, or external system is touched.

## Artifacts and Notes

Primary artifacts:

- `docs/milestones/SUBMILESTONE_REGISTRY.md`
- `plans/ROADMAP.md`
- `docs/milestones/M00.md` through `docs/milestones/M21.md`
- Top-level project docs under `docs/`
- Updated validation script and tests
- Status handoff docs

## Interfaces and Dependencies

Control-plane only:

- Markdown docs.
- Python validation script.
- Pytest bootstrap test.
- Optional Makefile target if available.

No product interfaces or runtime APIs are created or changed.

## Outcomes & Retrospective

M00.01 is complete. The full M00-M21 submilestone registry is encoded, roadmap counts are real, M00-M21 milestone docs now include detailed submilestones, missing top-level project docs exist, and validation enforces the new required docs and registry.

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

Remaining risks:

- M00 is not complete; M00.01 and M00.02 are complete.
- M00.02 still needs separate QA on the same branch and PR before M00.03 can start.
- `docs/DOMAIN_MODEL.md` is intentionally a placeholder for M01.

Next recommended thread: `M00.02 QA - Active Docs and Repo Guidance`.
