# CLP-0001 M00 Repo Operating System

## Purpose / Big Picture

Establish the file-first operating system for CausalLedger milestone work. This plan covers M00 only and keeps the repository usable by future Codex threads without relying on chat memory.

Current submilestone status: M00.07 Milestone Closeout Workflow builder work is complete and awaiting QA. M00.01 through M00.06 are completed and merged. M00 remains in progress.

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
- [x] 2026-05-08: Finalized M00.03 as `Completed and merged` after merge into `main` at commit `f289d5e`.
- [x] 2026-05-08: Started M00.04 builder thread on branch `m00-04-builder-and-qa-prompt-protocol`.
- [x] 2026-05-08: Ran branch guard before edits: branch matched `m00-04-builder-and-qa-prompt-protocol`, `git status --short` was clean, and `origin` points to `https://github.com/Islem-Rezzag/CausalLedger.git`.
- [x] 2026-05-08: Confirmed M00.01, M00.02, and M00.03 are completed and merged, M00.04 had not started, M00 remains in progress, M01-M21 are not started, no product code exists, and this file is the active plan.
- [x] 2026-05-08: Created `docs/ops/builder-qa-prompt-protocol.md`.
- [x] 2026-05-08: Expanded builder, QA, and handoff packet prompt templates.
- [x] 2026-05-08: Updated entry docs, tracking docs, validation script, and bootstrap tests for the prompt protocol.
- [x] 2026-05-08: Ran M00.04 builder validation and recorded results.
- [x] 2026-05-08: Handed off M00.04 to QA without marking it QA passed or completed.
- [x] 2026-05-08: Started M00.04 QA on branch `m00-04-builder-and-qa-prompt-protocol`; branch guard passed, `git status --short` was clean, and `origin` points to `https://github.com/Islem-Rezzag/CausalLedger.git`.
- [x] 2026-05-08: Verified the builder and QA prompt protocol, prompt templates, tracking integration, active docs integration, validation coverage, and forbidden-scope boundary.
- [x] 2026-05-08: Ran M00.04 QA validation and recorded PASS.
- [x] 2026-05-08: Marked M00.04 as `QA passed, awaiting merge` without marking it `Completed and merged`.
- [x] 2026-05-08: Finalized M00.04 as `Completed and merged` after merge into `main` at commit `e686c77`.
- [x] 2026-05-08: Started M00.05 builder thread on branch `m00-05-validation-and-handoff-workflow`.
- [x] 2026-05-08: Ran branch guard before edits: branch matched `m00-05-validation-and-handoff-workflow`, `git status --short` was clean, and `origin` points to `https://github.com/Islem-Rezzag/CausalLedger.git`.
- [x] 2026-05-08: Confirmed M00.01, M00.02, M00.03, and M00.04 are completed and merged, M00.05 had not started before this builder, M00 remains in progress, M01-M21 are not started, no product code exists, and this file is the active plan.
- [x] 2026-05-08: Created `docs/ops/validation-and-handoff-workflow.md`.
- [x] 2026-05-08: Updated builder, QA, and handoff templates for validation results, skipped validation, warnings, and readiness statements.
- [x] 2026-05-08: Updated prompt protocol, planning guidance, validation-ladder skill, handoff-auditor skill, entry docs, validation script, and bootstrap tests for the validation and handoff workflow.
- [x] 2026-05-08: Ran M00.05 builder validation and recorded results.
- [x] 2026-05-08: Handed off M00.05 to QA without marking it QA passed or completed.
- [x] 2026-05-09: Started M00.05 QA on branch `m00-05-validation-and-handoff-workflow`; branch guard passed, `git status --short` was clean, and `origin` points to `https://github.com/Islem-Rezzag/CausalLedger.git`.
- [x] 2026-05-09: Verified M00.05 validation workflow, handoff expectations, prompt integration, skill integration, active-doc integration, validation coverage, tracking, and forbidden-scope boundaries.
- [x] 2026-05-09: Ran M00.05 QA validation and recorded PASS.
- [x] 2026-05-09: Marked M00.05 as `QA passed, awaiting merge` without marking it `Completed and merged`.
- [x] 2026-05-09: Finalized M00.05 as `Completed and merged` after merge into `main` at commit `b82e5d1`.
- [x] 2026-05-09: Started M00.06 builder thread on branch `m00-06-github-pr-and-issue-workflow`.
- [x] 2026-05-09: Ran branch guard before edits: branch matched `m00-06-github-pr-and-issue-workflow`, `git status --short` was clean, and `origin` points to `https://github.com/Islem-Rezzag/CausalLedger.git`.
- [x] 2026-05-09: Confirmed M00.01 through M00.05 are completed and merged, M00.06 had not started before this builder, M00 remains in progress, M01-M21 are not started, no product code exists, and this file is the active plan.
- [x] 2026-05-09: Created GitHub PR workflow guidance, labels and milestones guidance, branch protection guidance, PR template, and issue templates.
- [x] 2026-05-09: Updated active docs, workflow docs, prompt templates, milestone tracking, status docs, validation script, and bootstrap tests for the GitHub workflow artifacts.
- [x] 2026-05-09: Ran M00.06 builder validation and recorded results.
- [x] 2026-05-09: Handed off M00.06 to QA without marking it QA passed or completed.
- [x] 2026-05-09: Started M00.06 QA on branch `m00-06-github-pr-and-issue-workflow`; branch guard passed, `git status --short` was clean, and `origin` points to `https://github.com/Islem-Rezzag/CausalLedger.git`.
- [x] 2026-05-09: Verified M00.06 GitHub workflow docs, templates, tracking, validation coverage, and forbidden-scope boundaries.
- [x] 2026-05-09: Fixed concise M00.06 control-plane reference gaps in `WORKFLOW.md` and `prompts/template_milestone_closeout.md`.
- [x] 2026-05-09: Ran M00.06 QA validation and recorded PASS.
- [x] 2026-05-09: Marked M00.06 as `QA passed, awaiting merge` without marking it `Completed and merged`.
- [x] 2026-05-10: Finalized M00.06 as `Completed and merged` after merge into `main` at commit `a0fdf6bc422f573235d48ee8cde93fd92d25e617`.
- [x] 2026-05-10: Started M00.07 builder thread on branch `m00-07-milestone-closeout-workflow`.
- [x] 2026-05-10: Ran branch guard before edits: branch matched `m00-07-milestone-closeout-workflow`, `git status --short` was clean, and `origin` points to `https://github.com/Islem-Rezzag/CausalLedger.git`.
- [x] 2026-05-10: Confirmed M00.01 through M00.06 are completed and merged, M00.07 had not started before this builder, M00 remains in progress, M00.08 and M01-M21 are not started, no product code exists, and this file is the active plan.
- [x] 2026-05-10: Created `docs/ops/milestone-closeout-workflow.md`.
- [x] 2026-05-10: Updated milestone closeout prompt and plan templates, handoff packet fields, workflow references, validation script, and bootstrap tests for milestone closeout control-plane coverage.
- [x] 2026-05-10: Ran M00.07 builder validation and recorded results.
- [x] 2026-05-10: Confirmed product implementation has not started; `apps/` and `packages/` contain placeholder README files only.
- [x] 2026-05-10: Handed off M00.07 to QA without marking it QA passed or completed.

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
- M00.04 starts from `main` at commit `f289d5e`, which contains the merged M00.03 planning and tracking lifecycle.
- M00.04 found the prompt templates existed but were too thin to enforce branch guard, same-branch QA, validation, forbidden scope, tracking updates, and complete handoff fields.
- `make bootstrap-check` remains unavailable in the current Windows shell; underlying Python validation and pytest checks were run directly.
- M00.04 QA found no blocking defects. `rg` remains unavailable with `Access is denied`, so PowerShell `Select-String` was used for QA text searches.
- M00.05 starts from `main` at commit `e686c77`, which contains the merged M00.04 builder and QA prompt protocol.
- M00.05 found the handoff template and protocol needed explicit fields for skipped validation, warnings, safe-to-push, safe-to-open-PR, and QA-only safe-to-merge readiness.
- M00.05 QA found no blocking defects. `make bootstrap-check` remains unavailable in the current Windows shell, so the required direct Python validation, pytest, and diff checks were run.
- M00.06 starts from `main` at commit `b82e5d1`, which contains the merged M00.05 validation and handoff workflow.
- M00.06 QA found two minor control-plane reference gaps: `WORKFLOW.md` needed direct pointers to label/milestone and branch protection guidance, and the milestone closeout prompt needed a concise pointer to GitHub PR post-merge expectations.
- M00.07 starts from `main` at commit `a0fdf6bc422f573235d48ee8cde93fd92d25e617`, which contains the merged M00.06 GitHub PR and issue workflow.
- M00.07 found that the milestone closeout prompt and plan template were too thin to enforce PR merge verification, validation evidence checks, plan movement criteria, deferrals, follow-up work, and next milestone readiness.

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
- 2026-05-08: M00.03 is `Completed and merged` because commit `f289d5e` is present on `main` and `origin/main`.
- 2026-05-08: M00.04 remains control-plane only; its output is reusable prompt protocol documentation and templates, not product functionality.
- 2026-05-08: Builder handoff does not replace QA, QA PASS does not equal completion, and `Completed and merged` remains tied to PR merge plus tracking finalization.
- 2026-05-08: M00.04 QA PASS moves the submilestone to `QA passed, awaiting merge`; it is safe to merge but not fully complete until the PR merges and tracking is finalized.
- 2026-05-08: M00.04 is `Completed and merged` because commit `e686c77` is present on `main` and `origin/main`.
- 2026-05-08: M00.05 remains control-plane only; its output is validation and handoff workflow documentation, template alignment, skill guidance, and validation coverage.
- 2026-05-08: M00.05 builder completion can move the registry to `Builder complete, awaiting QA`, but not to QA passed or `Completed and merged`.
- 2026-05-09: M00.05 QA PASS moves the submilestone to `QA passed, awaiting merge`; it is safe to merge but not fully complete until the PR merges and tracking is finalized.
- 2026-05-09: M00.05 is `Completed and merged` because commit `b82e5d1` is present on `main` and `origin/main`.
- 2026-05-09: M00.06 remains control-plane only; its output is GitHub PR, issue, label, milestone, branch protection, and merge-readiness workflow documentation and templates.
- 2026-05-09: M00.06 QA PASS moves the submilestone to `QA passed, awaiting merge`; it is safe to merge but not fully complete until the PR merges and tracking is finalized.
- 2026-05-10: M00.06 is `Completed and merged` because commit `a0fdf6bc422f573235d48ee8cde93fd92d25e617` is present on `main` and `origin/main`.
- 2026-05-10: M00.07 remains control-plane only; its output is milestone closeout workflow documentation, template alignment, reference updates, and validation coverage.

## Context and Orientation

CausalLedger is in control-plane bootstrap. The current goal is to encode project direction, roadmap structure, milestone sequencing, and thread handoff rules in repo files. The slice must not implement MoneyEvent logic, ledger behavior, invariants, incident logic, causal graph behavior, replay, repair planning, agent runtime, UI, or external connectors.

The LLM never owns financial truth. LLM agents may investigate, summarize, and propose, but may not mutate money, approve repairs, delete evidence, post ledger entries, modify raw events, or override deterministic invariants.

## Scope

In scope for M00.07:

- Finalizing M00.06 as `Completed and merged` before M00.07 work.
- Creating `docs/ops/milestone-closeout-workflow.md`.
- Updating `prompts/template_milestone_closeout.md` and `plans/templates/milestone-closeout-template.md`.
- Updating `prompts/template_handoff_packet.md` with milestone closeout fields.
- Adding concise references from active docs, workflow docs, and entry docs to the milestone closeout workflow.
- Updating milestone tracking, roadmap, active plan, and status docs for M00.07.
- Updating control-plane validation script and bootstrap tests for the new workflow and templates.
- Status and handoff updates.

Out of scope:

- Product implementation.
- MoneyEvent, ledger, invariant, incident, graph, replay, repair, agent runtime, UI, or connector logic.
- Active plans for M01-M21.
- Starting M00.08.
- Repair approval or any money-state mutation.

## Plan of Work

1. Confirm required branch guard and clean starting state.
2. Read required active docs and confirm current state.
3. Finalize M00.06 as `Completed and merged`.
4. Create the milestone closeout workflow guide.
5. Update milestone closeout prompt and plan templates.
6. Align active docs, workflow docs, prompt templates, tracking files, and status docs for M00.07.
7. Confirm validation coverage for the new milestone closeout artifacts and update validation if necessary.
8. Run validation and record results.

## Concrete Steps

- Create `docs/ops/milestone-closeout-workflow.md`.
- Update `prompts/template_milestone_closeout.md`.
- Update `plans/templates/milestone-closeout-template.md`.
- Update `docs/ops/builder-qa-prompt-protocol.md`.
- Update `docs/ops/planning-and-tracking-system.md`.
- Update `prompts/template_handoff_packet.md`.
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
- Update `scripts/validate-control-plane.py` for milestone closeout workflow and template checks.
- Update `tests/test_control_plane_bootstrap.py` for milestone closeout workflow and template checks.

## Validation and Acceptance

Required validation:

- `python scripts/validate-control-plane.py`
- `python -m pytest tests/test_control_plane_bootstrap.py`
- `git diff --check`

Optional validation:

- `make bootstrap-check` if `make` is available.

Acceptance:

- Active documentation files are internally consistent.
- Entry points agree on active plan, branch guard, builder/QA, PR merge, validation, GitHub workflow, handoff workflow, and milestone closeout workflow.
- M00.06 is finalized as `Completed and merged`.
- Builder tracking does not mark M00.07 QA passed or fully complete.
- `docs/ops/milestone-closeout-workflow.md` exists and defines milestone closeout preconditions, submilestone versus milestone closeout, merged PR verification, branch cleanup checks, validation evidence checks, status synchronization, plan movement, stale artifact handling, deferrals, and follow-up work.
- `prompts/template_milestone_closeout.md` and `plans/templates/milestone-closeout-template.md` include milestone ID and name, completed submilestones, merged PRs, validation summary, changed docs, changed code, skipped validation, warnings, risks, tech debt, open questions, deferred work, next milestone readiness, active-plan movement, and safe-to-start-next-milestone fields.
- Validation covers the new milestone closeout workflow docs and templates.
- No product code is implemented.
- Control-plane validation passes or limitations are recorded.
- Status docs and handoff packet are updated.

## Idempotence and Recovery

This slice is documentation-first and should be safe to rerun by replacing deterministic control-plane sections with the same workflow and tracking content. If validation fails, keep M00.07 in `Builder in progress` or mark it `Blocked`, record the failure in status docs, and recommend a follow-up thread to fix the control-plane gap.

No raw evidence, money state, ledger state, repair approval, or external system is touched.

## Artifacts and Notes

Primary artifacts:

- `docs/ops/planning-and-tracking-system.md`
- `docs/ops/builder-qa-prompt-protocol.md`
- `docs/ops/validation-and-handoff-workflow.md`
- `docs/ops/github-pr-and-issue-workflow.md`
- `docs/ops/github-labels-and-milestones.md`
- `docs/ops/branch-protection.md`
- `docs/ops/milestone-closeout-workflow.md`
- `prompts/template_builder_submilestone.md`
- `prompts/template_qa_submilestone.md`
- `prompts/template_handoff_packet.md`
- `prompts/template_milestone_closeout.md`
- `plans/templates/milestone-closeout-template.md`
- `.github/PULL_REQUEST_TEMPLATE.md`
- `.github/ISSUE_TEMPLATE/`
- `docs/milestones/SUBMILESTONE_REGISTRY.md`
- `docs/milestones/M00.md`
- `plans/ROADMAP.md`
- `scripts/validate-control-plane.py`
- `tests/test_control_plane_bootstrap.py`
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
- `python scripts/validate-control-plane.py` passed on 2026-05-08 for M00.04 builder validation.
- `python -m pytest tests/test_control_plane_bootstrap.py` passed on 2026-05-08 for M00.04 builder validation with 9 tests.
- `git diff --check` passed on 2026-05-08 for M00.04 builder validation.
- `make bootstrap-check` was not run on 2026-05-08 because `make` is unavailable in the current Windows shell.
- `python scripts/validate-control-plane.py` passed on 2026-05-08 for M00.04 QA validation.
- `python -m pytest tests/test_control_plane_bootstrap.py` passed on 2026-05-08 for M00.04 QA validation with 9 tests.
- `git diff --check` passed on 2026-05-08 for M00.04 QA validation.
- `make bootstrap-check` was not run on 2026-05-08 for M00.04 QA because `make` is unavailable in the current Windows shell.
- `python scripts/validate-control-plane.py` passed on 2026-05-08 for M00.05 builder validation.
- `python -m pytest tests/test_control_plane_bootstrap.py` passed on 2026-05-08 for M00.05 builder validation with 10 tests.
- `git diff --check` passed on 2026-05-08 for M00.05 builder validation.
- `make bootstrap-check` was not run on 2026-05-08 for M00.05 builder validation because `make` is unavailable in the current Windows shell.
- `python scripts/validate-control-plane.py` passed on 2026-05-09 for M00.05 QA validation.
- `python -m pytest tests/test_control_plane_bootstrap.py` passed on 2026-05-09 for M00.05 QA validation with 10 tests.
- `git diff --check` passed on 2026-05-09 for M00.05 QA validation.
- `make bootstrap-check` was not run on 2026-05-09 for M00.05 QA because `make` is unavailable in the current Windows shell.
- `python scripts/validate-control-plane.py` passed on 2026-05-09 for M00.06 builder validation.
- `python -m pytest tests/test_control_plane_bootstrap.py` passed on 2026-05-09 for M00.06 builder validation with 12 tests.
- `git diff --check` passed on 2026-05-09 for M00.06 builder validation.
- `make bootstrap-check` was not run on 2026-05-09 for M00.06 builder validation because `make` is unavailable in the current Windows shell.
- `python scripts/validate-control-plane.py` passed on 2026-05-09 for M00.06 QA validation.
- `python -m pytest tests/test_control_plane_bootstrap.py` passed on 2026-05-09 for M00.06 QA validation with 12 tests.
- `git diff --check` passed on 2026-05-09 for M00.06 QA validation.
- `make bootstrap-check` was not run on 2026-05-09 for M00.06 QA because `make` is unavailable in the current Windows shell.
- `python scripts/validate-control-plane.py` passed on 2026-05-10 for M00.07 builder validation.
- `python -m pytest tests/test_control_plane_bootstrap.py` passed on 2026-05-10 for M00.07 builder validation with 13 tests.
- `git diff --check` passed on 2026-05-10 for M00.07 builder validation.
- `make bootstrap-check` was not run on 2026-05-10 for M00.07 builder validation because `make` is unavailable in the current Windows shell.

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
- At the time of M00.03 QA, verified M00.01 and M00.02 were `Completed and merged`, M00.03 was not marked `Completed and merged`, and M00.04 through M21.15 remained `Not started`.
- Fixed ambiguous post-merge finalization guidance by defining the default next-builder finalization model and optional dedicated finalization thread.
- Recorded M00.03 QA PASS while leaving final completion blocked on PR merge at that time.
- Did not implement product functionality.

M00.04 builder outcome:

- Finalized M00.03 as `Completed and merged` after confirming commit `f289d5e` is present on `main` and `origin/main`.
- Created the builder and QA prompt protocol operations guide.
- Expanded the reusable builder, QA, and handoff packet templates.
- Updated planning and tracking guidance to state that builder handoff does not replace QA, QA PASS is not completion, `Completed and merged` requires PR merge and tracking finalization, and the next builder may finalize the previous merged submilestone before starting work.
- Added concise references from active entry docs to the prompt protocol and templates.
- Updated control-plane validation and bootstrap tests for the new protocol and template sections.
- Marked M00.04 as `Builder complete, awaiting QA` only after validation passed.
- Kept M00.05 through M21.15 as `Not started`.
- Did not implement product functionality.

M00.04 QA outcome:

- Verified `docs/ops/builder-qa-prompt-protocol.md` exists and covers builder and QA prompt purpose, two-thread submilestone model, builder responsibilities, QA responsibilities, branch guard, same-branch same-PR rule, prompt authoring, required prompt sections, validation sections, forbidden-scope sections, handoff fields, QA fixes, failed QA, no-change QA pass, product-code milestone guidance, and chat-memory avoidance.
- Verified `prompts/template_builder_submilestone.md`, `prompts/template_qa_submilestone.md`, and `prompts/template_handoff_packet.md` include the required fields and guardrails.
- Verified planning and tracking guidance, active docs, status docs, roadmap, milestone docs, validation script, and bootstrap tests are integrated with the protocol.
- Verified M00.03 is `Completed and merged`, M00.04 is not `Completed and merged`, M00.05 through M21.15 remain `Not started`, M00 remains in progress, and M01 through M21 remain `Not started`.
- Verified no product functionality, MoneyEvent logic, ledger logic, invariants, incident logic, causal graph logic, replay logic, agent runtime, repair planning logic, UI features, external connectors, or M00.05/M01 work started.
- Recorded M00.04 QA PASS and left final completion blocked on PR merge.

M00.05 builder outcome:

- Finalized M00.04 as `Completed and merged` after confirming commit `e686c77` is present on `main` and `origin/main`.
- Created the validation and handoff workflow operations guide.
- Defined validation ladder levels 0 through 8 and distinguished control-plane-only, docs-only, prompt/template, future product-code, future eval/benchmark, and future security-sensitive validation.
- Documented required commands, optional commands, unavailable-command handling, validation failure handling, warnings, skipped validation, readiness criteria, QA handoff status updates, and M00 evidence preservation.
- Updated builder, QA, and handoff packet templates with submilestone ID and name, branch, active plan, command results, skipped validation, warnings, safe-to-commit, safe-to-push, safe-to-open-PR, and QA safe-to-merge fields.
- Updated builder/QA protocol, planning guidance, active docs, workflow docs, README, docs index, ops README, validation-ladder skill, handoff-auditor skill, validation script, and bootstrap tests for the new workflow.
- Marked M00.05 as `Builder complete, awaiting QA` only after validation passed.
- Kept M00.06 through M21.15 as `Not started`.
- Did not implement product functionality.

M00.05 QA outcome:

- Verified `docs/ops/validation-and-handoff-workflow.md` exists and covers purpose, validation ladder levels 0 through 8, required and optional commands, unavailable-command handling, validation failures, warnings, skipped validation, readiness criteria, QA handoff status updates, and M00 evidence preservation.
- Verified the handoff packet template includes required fields for submilestone identity, branch, active plan, created and changed files, untouched files, commands, command results, validation result, skipped validation, warnings, status, product implementation status, remaining issues, safe-to-commit, safe-to-push, safe-to-open-PR, QA safe-to-merge, and exact next thread.
- Verified builder and QA templates, builder/QA protocol, planning guidance, active docs, status docs, roadmap, milestone docs, validation script, and bootstrap tests are integrated with the workflow.
- Verified M00.04 is `Completed and merged`, M00.05 is not `Completed and merged`, M00.06 through M21.15 remain `Not started`, M00 remains in progress, and M01 through M21 remain `Not started`.
- Verified no product functionality, MoneyEvent logic, ledger logic, invariants, incident logic, causal graph logic, replay logic, agent runtime, repair planning logic, UI features, external connectors, or M00.06/M01 work started.
- Recorded M00.05 QA PASS and left final completion blocked on PR merge.

M00.06 builder outcome:

- Finalized M00.05 as `Completed and merged` after confirming commit `b82e5d1` is present on `main` and `origin/main`.
- Created the GitHub PR and issue workflow operations guide.
- Created the submilestone PR template and GitHub issue templates for submilestone tasks, QA reviews, blocked slices, research spikes, bugs, and issue config.
- Created GitHub labels and milestones guidance and branch protection guidance.
- Updated entry docs, active docs, workflow docs, planning guidance, builder/QA protocol, validation workflow, prompt templates, milestone tracking, status docs, validation script, and bootstrap tests for the GitHub workflow.
- Marked M00.06 as `Builder complete, awaiting QA` only after validation passed.
- Kept M00.07 through M21.15 as `Not started`.
- Did not implement product functionality.

M00.06 QA outcome:

- Verified `docs/ops/github-pr-and-issue-workflow.md` exists and covers purpose, branch and PR naming, PR body expectations, issue template usage, same-branch same-PR discipline, draft PR guidance, pre-PR, pre-QA, pre-merge, squash merge, branch deletion, local main update, failed-QA, QA-fix, merge-conflict, branch protection, missing-GitHub-CLI, no-early-merge, no-early-next-submilestone, and auditability guidance.
- Verified `.github/PULL_REQUEST_TEMPLATE.md`, `.github/ISSUE_TEMPLATE/`, `docs/ops/github-labels-and-milestones.md`, and `docs/ops/branch-protection.md` match M00.06 scope and do not add GitHub Actions, label automation, milestone automation, product functionality, or unavailable automation claims.
- Fixed concise reference gaps in `WORKFLOW.md` and `prompts/template_milestone_closeout.md`.
- Verified M00.05 is `Completed and merged`, M00.06 is not `Completed and merged`, M00.07 through M21.15 remain `Not started`, M00 remains in progress, and M01 through M21 remain `Not started`.
- Verified no product functionality, MoneyEvent logic, ledger logic, invariants, incident logic, causal graph logic, replay logic, agent runtime, repair planning logic, UI features, external connectors, GitHub Actions, CI workflows, or M00.07/M01 work started.
- Recorded M00.06 QA PASS and left final completion blocked on PR merge.

M00.07 builder outcome:

- Finalized M00.06 as `Completed and merged` after confirming commit `a0fdf6bc422f573235d48ee8cde93fd92d25e617` is present on `main` and `origin/main`.
- Created the milestone closeout workflow operations guide.
- Expanded the milestone closeout prompt and plan templates.
- Updated the handoff packet template with milestone closeout fields.
- Updated entry docs, active docs, workflow docs, planning guidance, builder/QA protocol, validation workflow, GitHub workflow, milestone tracking, status docs, validation script, and bootstrap tests for milestone closeout.
- Marked M00.07 as `Builder complete, awaiting QA` only after validation passed.
- Kept M00.08 through M21.15 as `Not started`.
- Did not implement product functionality.

Remaining risks:

- M00 is not complete; M00.01 through M00.06 are completed and merged.
- M00.07 is not QA passed or fully complete until QA PASS, PR merge, and post-merge tracking finalization.
- `docs/DOMAIN_MODEL.md` is intentionally a placeholder for M01.

Next recommended action: `M00.07 QA - Milestone Closeout Workflow`.
