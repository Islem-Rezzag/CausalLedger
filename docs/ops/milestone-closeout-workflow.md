# Milestone Closeout Workflow

## Purpose

Milestone closeout proves that a milestone is actually finished, auditable, and ready to hand off without relying on chat memory. It gathers the completed submilestones, merged PRs, validation evidence, status updates, risks, tech debt, open questions, deferred work, and next milestone readiness into one durable closeout packet.

This workflow is control-plane guidance only. It does not implement product functionality, MoneyEvent logic, ledger logic, invariants, incident logic, causal graph logic, replay logic, agent runtime, repair planning, UI behavior, external connectors, GitHub Actions, or CI workflows.

## When milestone closeout is required

Run milestone closeout when:

- the final planned submilestone in a milestone has QA PASS, its PR has merged, and post-merge tracking has marked it `Completed and merged`;
- a human explicitly asks to close a milestone;
- a milestone is being deferred, split, or stopped before all planned submilestones are complete;
- the next milestone should be prepared but must not start until the current milestone is closed cleanly.

Do not start the next milestone during closeout. Closeout can recommend the next thread, but it cannot create a new active milestone plan unless explicitly authorized.

## Submilestone closeout vs milestone closeout

Submilestone closeout is the lifecycle of one submilestone branch and PR. It ends only when QA records PASS, the PR merges into `main`, and tracking moves that row to `Completed and merged`.

Milestone closeout is the milestone-level audit after all required submilestones are completed, or after explicitly approved deferrals are recorded. It checks the whole milestone, decides whether the active milestone plan can move to `plans/completed/`, and prepares the next milestone readiness handoff.

## Milestone closeout preconditions

Before closeout can pass:

- the branch guard has run for the closeout thread;
- the worktree is clean or dirty files are explicitly part of closeout;
- the active plan for the milestone is identified;
- every required submilestone is `Completed and merged` or explicitly `Deferred` with a reason and follow-up owner;
- every required submilestone PR is merged or an approved deferral explains why no merge exists;
- required validation evidence is recorded in the active plan, status docs, registry, PRs, or handoff packets;
- status docs are synchronized with the registry, milestone doc, roadmap, and active plan;
- risk, tech debt, and open-question docs have been reviewed and updated if needed;
- no repo docs claim product functionality that has not been implemented and validated.

## Verify all submilestones are complete

Use `docs/milestones/SUBMILESTONE_REGISTRY.md` as the canonical registry:

- filter rows for the target milestone ID;
- confirm each required row is `Completed and merged`;
- confirm deferred rows are explicitly marked `Deferred`, explain the deferral, and identify follow-up work;
- confirm there are no `Not started`, `Builder in progress`, `Builder complete, awaiting QA`, `QA in progress`, `QA passed, awaiting merge`, or `Blocked` rows unless the milestone is being closed as incomplete;
- confirm the milestone doc lists the same statuses;
- confirm the active plan outcomes match the registry rows.

## Verify all PRs are merged

For each completed submilestone:

- identify the PR number or merge reference from the registry, active plan, PR body, or weekly log;
- confirm the PR merged into `main`;
- record the merge date and commit hash when available;
- confirm QA PASS happened before merge;
- confirm post-merge tracking finalized the row as `Completed and merged`.

If a PR cannot be verified, the milestone cannot close as complete. Record the missing evidence and recommend a follow-up closeout or merge-verification thread.

## Verify no branches are left open unintentionally

Inspect local and remote branches:

- identify branches for completed submilestones;
- confirm remote submilestone branches are deleted or intentionally retained with a reason;
- confirm local stale branches are either harmless or documented for human cleanup;
- confirm no branch contains unmerged milestone work that should have been in a PR;
- never delete branches during closeout unless the prompt explicitly authorizes scoped Git cleanup.

Open branches are allowed only when they are intentional and recorded in the closeout packet.

## Verify validation evidence exists

Validation evidence should include:

- builder validation commands and results for each submilestone;
- QA validation commands and results for each submilestone;
- skipped validation and why;
- warnings and accepted limitations;
- final milestone closeout validation commands and results;
- links or references to PRs, handoff packets, status docs, and active plan sections where evidence is recorded.

For M00 control-plane closeout, use the control-plane ladder from `docs/ops/validation-and-handoff-workflow.md`.

## Verify active plan outcomes are complete

Check the active plan:

- progress items for the milestone are complete or explicitly deferred;
- outcomes and retrospective are current;
- validation results are recorded;
- remaining risks, limitations, and next thread recommendation are current;
- no unfinished work is described as done;
- no future milestone work has started unless explicitly authorized elsewhere.

The active plan can move to `plans/completed/` only after milestone closeout passes and the closeout packet says it is safe to move.

## Verify status docs are synchronized

Review and update as needed:

- `docs/status/CURRENT_STATE.md`;
- `docs/status/WEEKLY_LOG.md`;
- `docs/status/NEXT_RECOMMENDED_THREAD.md`;
- `plans/ROADMAP.md`;
- target `docs/milestones/MXX.md`;
- `docs/milestones/SUBMILESTONE_REGISTRY.md`;
- active plan in `plans/active/`.

All of these files must tell the same story about the target milestone status, next action, product implementation status, validation state, and whether the next milestone is safe to start.

## Verify risk, tech debt, and open questions are updated

Review:

- `docs/status/RISK_REGISTER.md`;
- `docs/status/TECH_DEBT.md`;
- `docs/status/OPEN_QUESTIONS.md`;
- `docs/status/CAPABILITY_MATRIX.md` when capability claims may be affected.

If closeout finds unresolved risk, debt, or questions, update the relevant file or explain why no update was needed. Do not bury durable issues only in the chat handoff.

## Verify no product claims were made incorrectly

Closeout must check entry docs, status docs, milestone docs, and the active plan for unsupported implementation claims. For M00, docs must continue to say that no product functionality, MoneyEvent logic, ledger logic, invariants, incident engine, causal graph, replay engine, agent runtime, repair planning, UI, or external connectors exist.

Docs may describe planned future capabilities, but they must not imply those capabilities are implemented before code and deterministic validation exist.

## Prepare next milestone readiness

Next milestone readiness means:

- the current milestone is complete or explicitly closed as incomplete;
- the next milestone has no unresolved blocker from the current milestone;
- the next recommended thread is exact;
- the next branch is not created until authorized;
- any required pre-read docs, active plan expectations, and validation expectations are named;
- product-not-started or product-implemented status is truthful.

Closeout may recommend creating the next active plan, but must not create or start it unless the prompt explicitly scopes that work.

## Move active plans to completed

Move a milestone active plan from `plans/active/` to `plans/completed/` only when:

- all required closeout preconditions pass;
- the closeout packet says the plan can move;
- status docs and roadmap are updated for the milestone state;
- the next recommended thread no longer points back to unresolved work in the closed milestone.

If the plan cannot move, keep it in `plans/active/`, record why, and point the next thread to the blocking closeout work.

## Archive stale plans or stale docs

Archive stale plans or docs only when closeout identifies a concrete stale artifact and the prompt authorizes cleanup. Prefer moving stale plans to `plans/archived/` over rewriting history. Do not delete evidence, raw events, validation records, handoff packets, or PR records.

If stale material cannot be cleaned up during closeout, record the limitation in the closeout packet and in `docs/status/TECH_DEBT.md` if it creates durable confusion.

## Milestone closeout packet

A complete milestone closeout packet must include:

- milestone ID and name;
- completed submilestones;
- deferred submilestones and reasons;
- merged PRs and merge references;
- validation summary;
- changed docs;
- changed code;
- skipped validation and why;
- warnings;
- risks;
- tech debt;
- open questions;
- deferred work;
- follow-up work;
- next milestone readiness;
- whether the active plan can move to completed;
- whether it is safe to start the next milestone;
- exact next recommended thread.

Use `prompts/template_milestone_closeout.md` and `plans/templates/milestone-closeout-template.md` when preparing closeout.

## Milestones that cannot be closed

If the milestone cannot close:

- do not mark the milestone complete;
- do not move the active plan to `plans/completed/`;
- record the blocker in the active plan, current state, weekly log, and next recommended thread;
- update `RISK_REGISTER.md`, `TECH_DEBT.md`, or `OPEN_QUESTIONS.md` if the blocker is durable;
- recommend the smallest follow-up thread that can resolve the blocker.

## Deferred submilestones

Deferred submilestones are allowed only when explicitly approved or when the milestone is intentionally closed as incomplete. Each deferral must include:

- submilestone ID and name;
- reason for deferral;
- impact on milestone exit criteria;
- follow-up milestone or thread;
- validation or evidence that remains missing;
- whether the next milestone is safe to start despite the deferral.

Deferred work is not completed work.

## Follow-up work

Follow-up work must be concrete, scoped, and traceable. Record it in the closeout packet and, when durable, in the roadmap, active plan, status docs, risk register, tech debt, or open questions. Do not hide follow-up work in chat memory.

## Closeout validation

Run validation scaled to the closeout scope. For M00 control-plane closeout, run:

- `python scripts/validate-control-plane.py`;
- `python -m pytest tests/test_control_plane_bootstrap.py`;
- `git diff --check`;
- `make bootstrap-check` when `make` is available.

Record unavailable optional commands, skipped validation, warnings, and accepted limitations.
