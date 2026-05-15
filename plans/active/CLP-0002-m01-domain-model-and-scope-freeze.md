# CLP-0002 M01 Domain Model and Scope Freeze

## Purpose / Big Picture

M01 freezes CausalLedger domain language, boundaries, and non-goals before any domain-model implementation begins. It is a domain and scope planning milestone, not a product runtime implementation milestone.

M01 may update docs, specifications, milestone tracking, and status files. M01 must not implement APIs, databases, ledger logic, MoneyEvent runtime code, invariants, agent runtime, repair planner, UI, external connectors, GitHub Actions, CI workflows, or product behavior.

The safety boundary is non-negotiable: LLM agents may investigate, summarize, and propose, but they do not mutate money, approve repairs, delete evidence, post ledger entries, modify raw events, or override deterministic invariants. Financial truth must come from raw evidence, canonical events, deterministic invariants, replay outputs, evidence bundles, and explicit human approval.

The first M01 implementation submilestone after this planning thread is `M01.01 Define payment lifecycle`.

Current M01 execution status: M01 planning is complete and merged at git commit `2cfd75a` (`docs: plan M01 domain model and scope freeze (#10)`). M01 is the active milestone, M01.01 Define payment lifecycle is completed and merged after post-merge QA recovery, and M01.02 Define ledger vocabulary is the current domain-documentation submilestone awaiting QA on branch `m01-02-define-ledger-vocabulary`.

## Progress

- [x] Branch guard passed on `m01-planning-domain-model-and-scope-freeze`.
- [x] Starting worktree was clean.
- [x] Confirmed tag `v0.1.0` exists for the M00 repo operating system foundation.
- [x] Confirmed M00 is complete and the completed plan lives at `plans/completed/CLP-0001-m00-repo-operating-system.md`.
- [x] Confirmed `plans/active/` contained no active milestone plan before this M01 planning thread.
- [x] Confirmed product directories contain placeholder README files only.
- [x] Created this active M01 plan.
- [x] Added release and versioning documentation.
- [x] Cleaned stale current-state M00 closeout wording.
- [x] Updated roadmap, milestone, status, active docs, and index links for M01 planning.
- [x] Updated control-plane validation and bootstrap tests for the active M01 plan and versioning docs.
- [x] Run required validation commands.
- [x] Record final validation results and handoff.
- [x] 2026-05-11: M01 planning QA branch guard passed on `m01-planning-domain-model-and-scope-freeze`; starting worktree was clean.
- [x] 2026-05-11: QA found and fixed scoped planning defects: missing required concise references in `START_HERE.md` and `WORKFLOW.md`, incomplete exact M01.01-M01.13 submilestone enumeration in this active plan, and stale project brief current-status wording.
- [x] 2026-05-11: QA updated control-plane validation coverage so the missing entry-doc references and exact M01 submilestone list are checked.
- [x] 2026-05-11: QA verified M00 is completed, `v0.1.0` exists, M01 planning is active, M01.01 through M01.13 remain `Not started`, M02 through M21 remain `Not started`, and product implementation has not started.
- [x] 2026-05-11: QA validation passed after scoped fixes.
- [x] 2026-05-11: Finalized M01 planning merge tracking from git commit `2cfd75a` before starting M01.01 work.
- [x] 2026-05-11: Started M01.01 builder on branch `m01-01-define-payment-lifecycle`; branch guard passed, the starting worktree was clean, and M01.01 was marked `Builder in progress`.
- [x] 2026-05-11: Created `docs/domain/README.md` and `docs/domain/payment-lifecycle.md` as documentation-only M01.01 domain artifacts.
- [x] 2026-05-11: Updated `docs/DOMAIN_MODEL.md` into an M01 domain index and added lightweight domain-dependency notes to related spec placeholders.
- [x] 2026-05-11: Updated M01.01 tracking to `Builder complete, awaiting QA`.
- [x] 2026-05-11: First M01.01 control-plane validation run failed because `docs/status/CURRENT_STATE.md` lacked the exact M00.01-through-M00.08 summary phrase required by validation; fixed the scoped tracking wording and reran successfully.
- [x] 2026-05-11: M01.01 validation passed with `python scripts/validate-control-plane.py`, `python -m pytest tests/test_control_plane_bootstrap.py` with 18 tests, and `git diff --check`.
- [x] 2026-05-11: `make bootstrap-check` was skipped because `make` is unavailable in the current Windows shell.
- [x] 2026-05-11: Started M01.01 post-merge QA recovery on branch `m01-01-qa-recovery-define-payment-lifecycle` after builder PR #11 was squash-merged before the required QA thread; branch guard passed, starting worktree was clean, and latest commit was `1175789`.
- [x] 2026-05-11: Audited merged M01.01 docs, tracking, validation coverage, and forbidden-scope boundaries; found no payment-lifecycle content defects and no product implementation.
- [x] 2026-05-11: Recorded the M01.01 protocol deviation and post-merge QA recovery in tracking/status files.
- [x] 2026-05-11: M01.01 post-merge QA recovery validation passed with `python scripts/validate-control-plane.py`, `python -m pytest tests/test_control_plane_bootstrap.py` with 18 tests, and `git diff --check`.
- [x] 2026-05-11: `make bootstrap-check` was skipped for M01.01 post-merge QA recovery because `make` is unavailable in the current Windows shell.
- [x] 2026-05-15: Finalized M01.01 as completed and merged after post-merge QA recovery before starting M01.02; latest git history shows commit `6480c1d` (`test: QA recovery M01.01 payment lifecycle (#12)`).
- [x] 2026-05-15: Started M01.02 builder on branch `m01-02-define-ledger-vocabulary`; branch guard passed, the starting worktree was clean, and M01.02 was marked `Builder in progress`.
- [x] 2026-05-15: Created `docs/domain/ledger-vocabulary.md` as documentation-only M01.02 domain vocabulary.
- [x] 2026-05-15: Updated the M01 domain index, domain README, README, docs index, and lightweight spec dependency notes to reference ledger vocabulary without defining runtime schemas or behavior.
- [x] 2026-05-15: Updated control-plane validation and bootstrap tests for ledger vocabulary documentation coverage.
- [x] 2026-05-15: Updated M01.02 tracking to `Builder complete, awaiting QA`.

## Surprises & Discoveries

- `v0.1.0` already exists and should remain the M00 repo operating system foundation release.
- `plans/active/` contained only its README placeholder before this plan was created.
- The only future-launch versioning conflict found was M20.12 using `Add v0.1.0 release`; that wording now refers to the public product release instead.
- Product and future infrastructure directories still contain placeholder README files only.
- M01 planning QA found entry-doc reference coverage gaps that the builder validation did not catch; validation coverage now checks those references and the full active-plan submilestone list.
- M01.01 builder PR #11 was accidentally squash-merged before the required QA thread; this plan records that the post-merge QA recovery path was completed before M01.02 began.
- M01.02 needs ledger vocabulary terms that are precise enough for future ledger, invariant, incident, graph, replay, and repair work while remaining documentation-only.

## Decision Log

- 2026-05-11: Treat `v0.1.0` as a control-plane foundation release, not a product release.
- 2026-05-11: Mark M01 as `Planning in progress` at the milestone level while keeping M01.01 through M01.13 `Not started`.
- 2026-05-11: Use `Prepare v1.0.0 public release` as the consistent M20.12 wording.
- 2026-05-11: Keep M01 planning scoped to docs, specifications, tracking, and validation; no product runtime artifacts are allowed.
- 2026-05-11: QA fixes remain scoped to M01 planning documentation, status clarity, and control-plane validation coverage; no M01.01 or product implementation work is started.
- 2026-05-11: Because M01.01 was merged before QA, record M01.01 as `Completed and merged` only with explicit post-merge QA recovery notes, and do not start M01.02 until the QA recovery PR merges.
- 2026-05-15: M01.01 QA recovery is merged; M01.02 may proceed as documentation-only ledger vocabulary work.
- 2026-05-15: Keep ledger balance, posting, reversal, and adjustment rules deterministic future work; M01.02 defines vocabulary only and does not authorize agents to post ledger entries.

## Context and Orientation

M00 Repo Operating System is complete. M00.01 through M00.08 are `Completed and merged`, `docs/status/M00_CLOSEOUT.md` exists, and `v0.1.0` tags the repo operating system foundation.

M01 is the next milestone. It exists to settle payment, ledger, settlement, reconciliation, incident, repair, evidence, review-state, and out-of-scope language before future implementation milestones create product behavior.

Current source directories under `apps/`, `packages/`, `scenarios/`, `data/`, and `infra/` are placeholders only. Their README files do not implement product behavior.

Current M01 submilestone state:

- `M01.01 Define payment lifecycle` - Completed and merged after post-merge QA recovery.
- `M01.02 Define ledger vocabulary` - Builder complete, awaiting QA.
- `M01.03 Define settlement vocabulary`
- `M01.04 Define reconciliation vocabulary`
- `M01.05 Define incident vocabulary`
- `M01.06 Define safe and unsafe repairs`
- `M01.07 Define evidence receipt model`
- `M01.08 Define human review states`
- `M01.09 Define out-of-scope domains`
- `M01.10 Write DOMAIN_MODEL.md`
- `M01.11 Write RELIABILITY.md`
- `M01.12 Write THREAT_MODEL.md`
- `M01.13 QA domain consistency`

M01.03 through M01.13 remain planned scope only and are not started.

## Scope

Original M01 planning scope completed before M01.01:

- Create `plans/active/CLP-0002-m01-domain-model-and-scope-freeze.md`.
- Update current-state tracking to show M01 planning was active during the planning slice.
- Keep M01.01 through M01.13 `Not started` during the planning slice.
- Keep M02 through M21 `Not started`.
- Add versioning and release-scope documentation.
- Add `CHANGELOG.md`.
- Correct M20.12 release wording so it no longer conflicts with the existing `v0.1.0` foundation tag.
- Update validation so the new control-plane artifacts are required.
- Run control-plane validation, bootstrap tests, diff whitespace checks, and `make bootstrap-check` when available.

Current M01.01 builder scope:

- Create `docs/domain/README.md`.
- Create `docs/domain/payment-lifecycle.md`.
- Update `docs/DOMAIN_MODEL.md` into an M01 domain index.
- Add concise links to the new domain docs from entry docs.
- Add lightweight domain-dependency notes to related spec placeholders.
- Update M01.01 tracking and validation coverage.
- Keep M01.02 through M01.13 `Not started`.
- Keep M02 through M21 `Not started`.

Current M01.01 QA recovery scope:

- Audit the already-merged M01.01 builder work from commit `1175789`.
- Fix only scoped M01.01 documentation, tracking, or validation defects if found.
- Record the post-merge QA recovery clearly in the active plan, milestone docs, registry, status files, and validation coverage.
- Keep M01.02 through M01.13 `Not started`.
- Keep M02 through M21 `Not started`.

Current M01.02 builder scope:

- Finalize M01.01 recovery state as completed and merged before M01.02 work.
- Create `docs/domain/ledger-vocabulary.md`.
- Define ledger vocabulary, account categories, double-entry language, ledger states, evidence examples, correctness questions, and failure-pattern vocabulary.
- Link the ledger vocabulary doc from `docs/DOMAIN_MODEL.md`, `docs/domain/README.md`, `docs/INDEX.md`, and `README.md`.
- Add lightweight domain-dependency notes to related spec placeholders.
- Update M01.02 tracking and validation coverage.
- Keep M01.03 through M01.13 `Not started`.
- Keep M02 through M21 `Not started`.

Out of scope:

- Product functionality.
- MoneyEvent logic or runtime schemas.
- Ledger logic.
- Invariant logic.
- Incident logic.
- Causal graph logic.
- Replay logic.
- Agent runtime.
- Repair planning logic.
- UI features.
- External connectors.
- GitHub Actions or CI workflows.
- Database schemas.
- API routes.
- M01.01 product implementation or runtime behavior.
- M01.02 product implementation or runtime behavior.
- M01.03 implementation.
- M02 implementation.
- M02-M21 scope changes beyond the explicit M20.12 versioning wording correction.

## Plan of Work

Original M01 planning work completed:

1. Create the active M01 plan from the exec plan template and make it self-contained.
2. Add versioning docs:
   - `docs/VERSIONING.md`
   - `docs/releases/RELEASE_LADDER.md`
   - `docs/releases/V1_SCOPE.md`
   - `CHANGELOG.md`
3. Update roadmap, M01, current-state, next-thread, capability, active-doc, and index files to reflect M01 planning.
4. Clean stale current-state M00 closeout language without rewriting historical audit records.
5. Correct M20.12 wording in `docs/milestones/M20.md` and `docs/milestones/SUBMILESTONE_REGISTRY.md`.
6. Update control-plane validation and bootstrap tests to require the new M01 planning and versioning artifacts.
7. Run validation and record results.

Current M01.01 builder work:

1. Finalize M01 planning merge tracking from git history.
2. Mark M01.01 as `Builder in progress`.
3. Define payment lifecycle vocabulary in `docs/domain/payment-lifecycle.md`.
4. Link the payment lifecycle doc from `docs/DOMAIN_MODEL.md`, `docs/INDEX.md`, and `README.md`.
5. Add lightweight domain-dependency notes to related spec placeholders.
6. Update M01.01 tracking files.
7. Add documentation-only validation checks.
8. Run validation and record results before marking M01.01 `Builder complete, awaiting QA`.

Current M01.01 QA recovery work:

1. Confirm the recovery branch guard and clean starting worktree.
2. Audit the merged M01.01 payment lifecycle domain docs and related tracking.
3. Verify no product implementation or future submilestone scope was started.
4. Record the accidental pre-QA merge and post-merge QA recovery.
5. Update control-plane validation checks from the stale pre-QA state to the recovery state.
6. Run validation and record results before the recovery PR is opened or merged.

Current M01.02 builder work:

1. Finalize M01.01 recovery merge tracking from git history.
2. Mark M01.02 as `Builder in progress`.
3. Define ledger vocabulary in `docs/domain/ledger-vocabulary.md`.
4. Link the ledger vocabulary doc from domain and entry docs.
5. Add lightweight domain-dependency notes to related spec placeholders.
6. Update M01.02 tracking files.
7. Add documentation-only validation checks.
8. Run validation and record results before marking M01.02 `Builder complete, awaiting QA`.

## Concrete Steps

- Confirm branch guard and starting cleanliness.
- Confirm `v0.1.0` is present.
- Confirm no active M01 plan existed before this planning thread.
- Create the active M01 plan.
- Create release and versioning docs.
- Update current status and next-thread guidance so the next implementation thread is `M01.01 Builder - Define Payment Lifecycle`.
- Update milestone status so M01 is planning in progress while all M01 submilestones remain not started.
- Update validation script and tests for the new artifact set.
- Run:
  - `python scripts/validate-control-plane.py`
  - `python -m pytest tests/test_control_plane_bootstrap.py`
  - `git diff --check`
  - `make bootstrap-check` if available

## Validation and Acceptance

Applicable validation ladder:

- Level 0: Branch and worktree guard.
- Level 1: File and scope inspection.
- Level 2: Control-plane validation.
- Level 3: Bootstrap tests.
- Level 4: Diff and whitespace checks.
- Level 7: Forbidden-scope check for no product implementation.

Acceptance criteria:

- Active M01 plan exists at `plans/active/CLP-0002-m01-domain-model-and-scope-freeze.md`.
- M00 remains `Completed`.
- `v0.1.0` is documented as the repo operating system foundation release.
- Versioning docs and `CHANGELOG.md` exist.
- M20.12 no longer says `Add v0.1.0 release`.
- Current-state closeout wording no longer treats the M00 closeout PR as pending.
- M01 is planning in progress where appropriate.
- During the planning slice, M01.01 through M01.13 remained `Not started`.
- After post-merge QA recovery, M01.01 is `Completed and merged` with the protocol deviation recorded in notes.
- M01.02 is `Builder complete, awaiting QA`.
- M01.03 through M01.13 remain `Not started`.
- M02 through M21 remain `Not started`.
- Product implementation has not started.
- No forbidden runtime artifacts are added.
- Validation passes or limitations are recorded.
- Next recommended thread after this builder is `M01.02 QA - Define Ledger Vocabulary`.

## Idempotence and Recovery

This slice is idempotent because it only adds or updates documentation, status tracking, and control-plane validation. Re-running validation should not mutate files.

If validation fails, fix only the scoped control-plane defect and rerun the failed command. Do not implement product behavior to satisfy planning validation. If the branch changes or the worktree gains unrelated dirty files, stop and report the blocker.

## Artifacts and Notes

Created artifacts:

- `plans/active/CLP-0002-m01-domain-model-and-scope-freeze.md`
- `docs/VERSIONING.md`
- `docs/releases/RELEASE_LADDER.md`
- `docs/releases/V1_SCOPE.md`
- `CHANGELOG.md`

Notes:

- `plans/active/README.md` remains a harmless placeholder.
- `plans/completed/CLP-0001-m00-repo-operating-system.md` remains the completed M00 plan.
- `docs/status/M00_CLOSEOUT.md` remains historical closeout evidence.
- 2026-05-11 validation results:
  - `python scripts/validate-control-plane.py` passed.
  - `python -m pytest tests/test_control_plane_bootstrap.py` passed with 16 tests.
  - `git diff --check` passed.
  - `make bootstrap-check` could not run because `make` is unavailable in the current Windows shell.
- 2026-05-11 QA validation results after scoped fixes:
  - QA scope audit passed.
  - `python scripts/validate-control-plane.py` passed.
  - `python -m pytest tests/test_control_plane_bootstrap.py` passed with 17 tests.
  - `git diff --check` passed.
  - `make bootstrap-check` could not run because `make` is unavailable in the current Windows shell.
- 2026-05-11 M01.01 builder validation results:
  - First `python scripts/validate-control-plane.py` run failed because `docs/status/CURRENT_STATE.md` lacked the exact M00.01-through-M00.08 summary phrase required by validation.
  - Scoped wording fix applied to `docs/status/CURRENT_STATE.md`.
  - `python scripts/validate-control-plane.py` passed after the fix.
  - `python -m pytest tests/test_control_plane_bootstrap.py` passed with 18 tests.
  - `git diff --check` passed.
  - `make bootstrap-check` could not run because `make` is unavailable in the current Windows shell.
- 2026-05-11 M01.01 post-merge QA recovery validation results:
  - Merged builder work at commit `1175789` was audited.
  - `python scripts/validate-control-plane.py` passed.
  - `python -m pytest tests/test_control_plane_bootstrap.py` passed with 18 tests.
  - `git diff --check` passed.
  - `make bootstrap-check` could not run because `make` is unavailable in the current Windows shell.
- 2026-05-15 M01.02 builder validation results:
  - Initial `python scripts/validate-control-plane.py` failed because the ledger vocabulary doc defined some terms only in title-cased table cells while validation expected lower-case phrases.
  - Added scoped lower-case vocabulary-list sentences to `docs/domain/ledger-vocabulary.md`.
  - `python scripts/validate-control-plane.py` passed.
  - `python -m pytest tests/test_control_plane_bootstrap.py` passed with 19 tests.
  - `git diff --check` passed.
  - `make bootstrap-check` could not run because `make` is unavailable in the current Windows shell.

## Interfaces and Dependencies

M01 planning depends on:

- `AGENTS.md` for the safety boundary.
- `PLANS.md` for plan structure and truthfulness rules.
- `WORKFLOW.md` and `docs/ops/validation-and-handoff-workflow.md` for validation expectations.
- `docs/milestones/SUBMILESTONE_REGISTRY.md` for submilestone state.
- `docs/status/CURRENT_STATE.md` and `docs/status/NEXT_RECOMMENDED_THREAD.md` for current operational direction.

No product runtime interface is introduced by this M01 planning, M01.01 documentation work, or M01.02 documentation work.

## Outcomes & Retrospective

Outcome after M01 planning QA validation:

- M01 planning was active during the planning slice and is now complete and merged.
- M01 planning QA passed after scoped control-plane fixes.
- M01 implementation submilestones remained not started during the planning slice.
- Versioning is documented without overclaiming product readiness.
- Product implementation remains not started.
- Required direct validation passed; `make bootstrap-check` was unavailable.
- The next safe thread is `M01.01 Builder - Define Payment Lifecycle` after this planning PR merges.

Current M01.01 builder outcome:

- M01.01 builder work was squash-merged before the required QA thread.
- M01.01 post-merge QA recovery passed as domain documentation only.
- M01.01 is recorded as `Completed and merged` after post-merge QA recovery.
- Product implementation remains not started.
- M01.02 builder work is documentation-only and awaiting QA.
- M01.03 through M01.13 remain not started.
