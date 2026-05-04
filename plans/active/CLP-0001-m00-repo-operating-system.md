# CLP-0001 M00 Repo Operating System

## Purpose / Big Picture

Establish the file-first operating system for CausalLedger milestone work. This plan covers M00 only and keeps the repository usable by future Codex threads without relying on chat memory.

Current submilestone status: M00.01 Roadmap and submilestone registry is complete. M00 remains in progress.

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

## Surprises & Discoveries

- The current roadmap has placeholder submilestone counts.
- M00-M21 milestone files exist, but they are skeletal.
- No product code exists, which matches the requested control-plane-only scope.
- `make bootstrap-check` was previously recorded as unavailable in the Windows shell.
- `rg` failed to launch in this Windows shell with access denied, so PowerShell listing/search was used for file checks.

## Decision Log

- 2026-05-04: Keep this plan scoped to M00 only.
- 2026-05-04: Treat `docs/milestones/SUBMILESTONE_REGISTRY.md` as the canonical submilestone registry after this slice.
- 2026-05-04: Mark only M00.01 as active during this slice; do not create active plans for M01-M21.
- 2026-05-04: Control-plane validation is sufficient because no product functionality is being implemented.
- 2026-05-04: Mark M00.01 complete because required Python control-plane validation and bootstrap pytest passed.

## Context and Orientation

CausalLedger is in control-plane bootstrap. The current goal is to encode project direction, roadmap structure, milestone sequencing, and thread handoff rules in repo files. The slice must not implement MoneyEvent logic, ledger behavior, invariants, incident logic, causal graph behavior, replay, repair planning, agent runtime, UI, or external connectors.

The LLM never owns financial truth. LLM agents may investigate, summarize, and propose, but may not mutate money, approve repairs, delete evidence, post ledger entries, modify raw events, or override deterministic invariants.

## Scope

In scope:

- M00.01 Roadmap and submilestone registry.
- M00 active plan creation.
- M00-M21 roadmap and milestone documentation.
- Missing top-level project docs needed by future Codex threads.
- Validation updates for required control-plane docs.
- Status and handoff updates.

Out of scope:

- Product implementation.
- MoneyEvent, ledger, invariant, incident, graph, replay, repair, agent runtime, UI, or connector logic.
- Active plans for M01-M21.
- Repair approval or any money-state mutation.

## Plan of Work

1. Create this M00 active plan.
2. Encode the complete submilestone registry for M00-M21.
3. Update the roadmap with real submilestone counts, statuses, exit criteria, and the current milestone marker.
4. Update milestone files M00-M21 with goals, rationale, detailed submilestones, acceptance criteria, validation expectations, status, and handoff notes.
5. Add missing top-level docs for project brief, vision, architecture, domain placeholder, reliability, threat model, token cost strategy, and docs index.
6. Extend control-plane validation script and tests.
7. Update active docs and status docs.
8. Run validation and record results.

## Concrete Steps

- Add or update `docs/INDEX.md`.
- Add or update `docs/PROJECT_BRIEF.md`.
- Add or update `docs/PRODUCT_VISION.md`.
- Add or update `docs/ARCHITECTURE.md`.
- Add or update `docs/DOMAIN_MODEL.md`.
- Add or update `docs/RELIABILITY.md`.
- Add or update `docs/THREAT_MODEL.md`.
- Add or update `docs/TOKEN_COST_STRATEGY.md`.
- Add or update `docs/milestones/SUBMILESTONE_REGISTRY.md`.
- Update `plans/ROADMAP.md`.
- Update `docs/milestones/M00.md` through `docs/milestones/M21.md`.
- Update `docs/ACTIVE_DOCS.md`.
- Update `README.md` if useful links are missing.
- Update `docs/status/CURRENT_STATE.md`.
- Update `docs/status/WEEKLY_LOG.md`.
- Update `docs/status/NEXT_RECOMMENDED_THREAD.md`.
- Update `docs/status/TECH_DEBT.md` only if this slice introduces placeholders or shortcuts.
- Update `scripts/validate-control-plane.py`.
- Update `tests/test_control_plane_bootstrap.py`.

## Validation and Acceptance

Required validation:

- `python scripts/validate-control-plane.py`
- `python -m pytest tests/test_control_plane_bootstrap.py`

Optional validation:

- `make bootstrap-check` if `make` is available.

Acceptance:

- Full M00-M21 detailed submilestone registry exists.
- `plans/ROADMAP.md` has real submilestone counts, not TBD.
- `docs/milestones/M00.md` through `docs/milestones/M21.md` contain detailed submilestones.
- `docs/milestones/SUBMILESTONE_REGISTRY.md` exists and is canonical.
- Missing top-level docs are created.
- First active M00 plan exists and covers only M00.
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

Remaining risks:

- M00 is not complete; only M00.01 is complete.
- `docs/DOMAIN_MODEL.md` is intentionally a placeholder for M01.
- A QA thread should review the M00.01 documentation and validation changes before proceeding.

Next recommended thread: `M00.01 QA - Roadmap and Submilestone Registry`.
