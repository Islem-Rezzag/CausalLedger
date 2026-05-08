# Planning and Tracking System

## Purpose

The planning and tracking system keeps CausalLedger submilestones durable in repo files from branch creation through builder, QA, PR merge, and next-thread handoff. It prevents Codex threads from relying on chat memory and prevents ambiguous completion claims before QA PASS and PR merge.

This document is control-plane guidance only. It does not define product behavior, financial truth, ledger mutation, repair approval, event mutation, UI behavior, or connector behavior.

Use `docs/ops/builder-qa-prompt-protocol.md` for the reusable builder prompt, QA prompt, same-branch same-PR rule, validation sections, forbidden-scope sections, and handoff packet requirements. The canonical templates are:

- `prompts/template_builder_submilestone.md`
- `prompts/template_qa_submilestone.md`
- `prompts/template_handoff_packet.md`

## Canonical tracking files

These files carry canonical planning and tracking state:

- `docs/milestones/SUBMILESTONE_REGISTRY.md` records every submilestone, status, active plan, branch, PR, latest validation, update date, and notes.
- `plans/active/CLP-0001-m00-repo-operating-system.md` is the active M00 execution plan.
- `plans/ROADMAP.md` records milestone-level status, current submilestone, and product-scope guardrails.
- `docs/milestones/M00.md` through `docs/milestones/M21.md` record milestone-specific submilestone status.
- `docs/status/CURRENT_STATE.md` records current phase, active plan, product code status, latest validation, and next action.
- `docs/status/NEXT_RECOMMENDED_THREAD.md` records the exact next thread name and preconditions.
- `docs/status/WEEKLY_LOG.md` records chronological progress and validation summaries.
- `docs/status/TECH_DEBT.md`, `docs/status/RISK_REGISTER.md`, and `docs/status/OPEN_QUESTIONS.md` record durable limitations, risks, and unresolved decisions when they are discovered.
- `docs/status/CAPABILITY_MATRIX.md` records capability status and must not imply product functionality exists before implementation.

Reference docs and chat transcripts can provide context, but they do not replace these files.

## Status state machine

Canonical submilestone statuses are:

| Status | Allowed when |
| --- | --- |
| Not started | No builder work has begun on the submilestone branch. Future-scope notes are allowed, but no in-progress or completion claims are allowed. |
| Builder in progress | The branch guard has passed on the expected submilestone branch, the starting worktree was clean or intentionally scoped, and builder work is underway. |
| Builder complete, awaiting QA | Builder work is done, required builder validation has passed or an accepted limitation is recorded, the active plan and status docs are updated, and the next recommended thread is QA for the same submilestone. |
| QA in progress | A separate QA thread has passed the branch guard on the same submilestone branch and is inspecting builder work. |
| QA passed, awaiting merge | QA has recorded PASS, required QA validation has passed or an accepted limitation is recorded, and the PR is ready to merge. |
| Completed and merged | The PR for the submilestone has merged into `main`. This is the only status that means the submilestone is fully complete in canonical tracking. |
| Blocked | Work cannot safely continue because of a concrete blocker such as wrong branch, unexpected dirty worktree, missing active plan, failing validation without an accepted limitation, unresolved scope conflict, or unavailable required information. |
| Deferred | The submilestone is intentionally moved out of the current sequence by an explicit plan or human decision. The registry note must explain where the work moved and why. |

A submilestone must not be called fully completed in canonical tracking until its PR is merged into `main`. Builder and QA can record progress, but final completion is tied to merge.

Allowed forward path:

1. `Not started`
2. `Builder in progress`
3. `Builder complete, awaiting QA`
4. `QA in progress`
5. `QA passed, awaiting merge`
6. `Completed and merged`

Exception paths:

- Any active state can move to `Blocked` when work cannot safely proceed.
- `Blocked` can return to the prior appropriate active state after the blocker is resolved and recorded.
- `Not started` or `Blocked` can move to `Deferred` only with an explicit recorded decision.
- `QA in progress` can return to `Builder in progress` or `Builder complete, awaiting QA` when QA fails and a follow-up builder fix is required.

## Before builder starts

Before any file edit, the builder thread must run:

- `git branch --show-current`
- `git status --short`
- `git remote -v`

If the branch is wrong, stop without editing. If the starting worktree is unexpectedly dirty, report the dirty files and stop unless they are explicitly part of the requested submilestone.

After the branch guard passes and before meaningful edits, update tracking files as needed:

- Set the registry row to `Builder in progress`.
- Record the active plan path.
- Record the expected branch.
- Record PR if it already exists, otherwise leave PR blank until opened.
- Record `Last Updated` with the ISO date.
- Add a concise note that builder work started.
- Update the active plan with the branch guard result, scope, and validation expectation.
- Update milestone and roadmap current-state wording if they still point at the previous submilestone.
- Keep future milestones as `Not started`.

## After builder finishes

When builder work is done:

- Run required builder validation for the slice.
- Update the active plan with work performed, decisions, discoveries, commands, results, and limitations.
- Update `docs/status/CURRENT_STATE.md` with current submilestone status, product code status, latest validation, and next action.
- Update `docs/status/NEXT_RECOMMENDED_THREAD.md` to the same-submilestone QA thread.
- Update `docs/status/WEEKLY_LOG.md` with a concise dated entry.
- Update risk, tech-debt, open-question, or capability docs only when the slice created or discovered something durable.
- Set the registry row to `Builder complete, awaiting QA` only after validation passes or an accepted limitation is recorded.

Builder completion does not mean the submilestone is fully complete. The PR still needs QA PASS and merge.

A builder handoff does not replace QA. It is an input to the separate QA thread, not evidence that the submilestone passed review.

## After QA finishes

QA must run in a separate thread on the same branch and PR. QA must inspect relevant files, run validation, record defects, and decide PASS or FAIL.

If QA passes:

- Set the registry row to `QA passed, awaiting merge`.
- Update the active plan with QA commands, results, defects found, fixes if any, and PASS.
- Update milestone, roadmap, current state, weekly log, and next recommended thread to say the PR must merge before the next submilestone starts.
- Do not mark the submilestone `Completed and merged` until merge is confirmed.

QA PASS does not equal `Completed and merged`. It means the PR can proceed to merge if the QA handoff says it is safe to merge.

If QA fails:

- Set the registry row to `Blocked` or return it to the builder state that matches the required fix.
- Record the failure and exact defects in the active plan and weekly log.
- Update `docs/status/NEXT_RECOMMENDED_THREAD.md` to the needed fix or QA retry thread.
- Do not start the next submilestone.

## After PR merge

After the submilestone PR merges into `main`:

- Set the registry row to `Completed and merged`.
- Record the PR reference, merge date, last validation summary, and a concise note.
- Update the milestone doc to show the submilestone as `Completed and merged`.
- Update `plans/ROADMAP.md` only as needed for milestone-level current marker and current submilestone.
- Update `docs/status/CURRENT_STATE.md` and `docs/status/WEEKLY_LOG.md`.
- Update `docs/status/NEXT_RECOMMENDED_THREAD.md` to the next safe builder thread, unless milestone closeout is required.

Only after this step may the next submilestone start.

`Completed and merged` happens only after PR merge and tracking finalization. Merge alone is not enough if the registry, active plan, milestone doc, roadmap, current state, weekly log, and next-thread docs still point at an older state.

Default operational model: the first step of the next submilestone builder thread finalizes the previous submilestone as `Completed and merged` before starting new work. That thread must begin from updated `main`, confirm that the previous PR is merged, run the branch guard for the new submilestone branch, and update the previous registry row, milestone doc, roadmap, current state, weekly log, and next-thread state before making any non-finalization edits. If the previous PR is not merged, stop and instruct the user to merge it first.

A dedicated post-merge finalization thread or branch is also allowed when a human explicitly asks for one. It must perform only the finalization updates listed above and must not start the next submilestone.

## Blocked slices

When a slice is blocked:

- Record `Blocked` in the registry.
- Keep the branch and active plan fields populated if the branch exists.
- Record the blocker, owner if known, and required next action in notes.
- Update the active plan, current state, weekly log, and next recommended thread.
- Record risk or open-question entries only when the blocker is durable beyond the current thread.

Do not use blocked status for ordinary unfinished work. Use it only when continuing would be unsafe or impossible.

## Failed QA

When QA fails:

- Keep the submilestone on the same branch and PR.
- Record QA failure in the active plan and weekly log.
- Set registry status to `Blocked` if the fix is unclear or unsafe, or `Builder in progress` if a scoped follow-up fix is immediately authorized for the same submilestone.
- Update `docs/status/NEXT_RECOMMENDED_THREAD.md` to the exact fix thread or QA retry thread.
- Do not mark the submilestone complete.
- Do not start the next submilestone.

## Follow-up fixes

Follow-up fixes after builder or QA must remain inside the same submilestone unless the active plan explicitly creates a new later submilestone.

For a follow-up fix:

- Use the same branch and PR.
- Run the branch guard again before editing.
- Record the fix in the active plan and weekly log.
- Update the registry status to the active stage that matches the work.
- Re-run the relevant validation before returning to QA or merge.

## Synchronization rules

Keep these files synchronized:

- Registry row: exact submilestone status, active plan, branch, PR, last validation, update date, notes.
- Active plan: detailed execution history, decisions, discoveries, validation, and handoff.
- Roadmap: milestone status and current submilestone marker.
- Milestone doc: submilestone status within that milestone.
- Current state: what exists, what does not, current submilestone, product-code status, latest validation, and next action.
- Next recommended thread: exact thread name and preconditions.
- Weekly log: chronological evidence that the state changed.

If files disagree, treat the registry and active plan as the first places to repair, then align roadmap, milestone doc, and status docs in the same slice.

## Avoiding chat memory

Every meaningful move must be recorded in repo files:

- Branch guard results go in the active plan.
- Work performed goes in the active plan and weekly log.
- Validation commands and results go in the active plan, current state, and weekly log.
- Status changes go in the registry, milestone doc, roadmap where relevant, current state, and next recommended thread.
- Handoff goes in the final response and in the durable status docs.

Do not rely on a previous Codex message to prove a branch guard, validation result, QA PASS, merge, blocker, or next action. If it matters, put it in the repository.
