# Builder and QA Prompt Protocol

## Purpose

This protocol defines the reusable prompt shape for every CausalLedger submilestone builder thread and QA thread. It keeps future work file-first, branch-safe, validation-backed, and scoped to one submilestone at a time.

Use `docs/ops/validation-and-handoff-workflow.md` for the canonical validation ladder, unavailable-command handling, failure handling, handoff packet requirements, and safe-to-commit, safe-to-push, safe-to-open-PR, and safe-to-merge criteria.

This document is control-plane guidance only. It does not define product behavior, financial truth, ledger mutation, repair approval, raw event mutation, UI behavior, connector behavior, or any other runtime capability.

## Why every submilestone gets two Codex threads

Every submilestone requires:

- one builder thread to make the scoped change;
- one separate QA thread to inspect the scoped change;
- one shared submilestone branch;
- one shared PR.

The separate QA thread gives a fresh review pass without relying on the builder's chat memory. QA can verify scope, run validation, inspect tracking updates, and either record PASS or identify defects before merge. Builder completion is not QA approval, and QA PASS is not final completion.

## Same-branch, same-PR rule

The builder and QA thread for a submilestone must use the same branch and the same PR. QA fixes, if any, stay on that same branch and PR unless a human explicitly changes the plan.

Do not start the next submilestone branch until the current submilestone has QA PASS, the PR has merged into `main`, and tracking has been finalized as `Completed and merged`.

## Builder thread responsibilities

A builder thread must:

- run the branch guard before editing;
- stop if the branch is not the expected submilestone branch;
- stop if the starting worktree is unexpectedly dirty;
- read active docs and the active plan before edits;
- confirm current state from repo files, not chat memory;
- update tracking to `Builder in progress` before meaningful edits;
- implement only the target submilestone;
- avoid forbidden scope explicitly listed in the prompt;
- update the active plan and status docs;
- run required validation;
- record validation results and limitations;
- set the target submilestone to `Builder complete, awaiting QA` only after validation passes or an accepted limitation is recorded;
- produce a handoff packet for the QA thread that includes validation results, skipped validation, warnings, readiness statements, and the exact next recommended thread.

## QA thread responsibilities

A QA thread must:

- run the branch guard before editing;
- stop if the branch is not the expected submilestone branch;
- stop if the starting worktree is unexpectedly dirty unless the prompt explicitly scopes those files;
- act as a strict reviewer for the audited submilestone only;
- inspect the files changed by the builder;
- verify forbidden scope was not touched;
- verify the builder validation record and run required validation directly;
- fix only scoped defects when the prompt authorizes QA fixes;
- re-run validation after any QA fix;
- record PASS or FAIL;
- state whether the PR is safe to merge based on validation, forbidden-scope checks, tracking, and scoped defect handling;
- update tracking according to the result;
- produce a QA handoff packet.

## Branch guard rules

Every builder and QA prompt must require these commands before any file edit:

```powershell
git branch --show-current
git status --short
git remote -v
```

If the branch does not exactly match the expected submilestone branch, stop immediately and do not edit files.

If the starting worktree is dirty, report the dirty files and stop unless every dirty file is intentionally part of the same requested submilestone and the prompt explicitly allows continuing.

The branch guard result must be recorded in the active plan or QA notes.

## How to write a builder prompt

A builder prompt must be specific enough that Codex can execute the submilestone without prior chat. Include:

- thread name;
- target submilestone ID and title;
- expected branch name;
- control-plane or product-code scope statement;
- branch guard and worktree cleanliness rule;
- first-read file order;
- current-state confirmation checklist;
- exact work to perform;
- explicit forbidden scope;
- tracking files to update;
- validation commands;
- validation ladder levels that apply;
- acceptance criteria;
- handoff packet requirements.

Use concrete file paths and status transitions. Do not ask a builder to infer milestone state from previous chat.

## How to write a QA prompt

A QA prompt must be strict and audit-oriented. Include:

- thread name;
- audited submilestone ID and title;
- expected branch name;
- same-branch, same-PR reminder;
- branch guard and worktree cleanliness rule;
- strict reviewer role;
- no-scope-widening rule;
- files to inspect;
- forbidden changes check;
- validation commands;
- validation ladder levels that apply;
- status transition rules;
- PASS or FAIL output requirements;
- safe-to-merge statement;
- exact next recommended thread.

QA should verify that the builder updated durable repo state and did not claim capabilities that are not implemented.

## Required prompt sections

Builder and QA prompts must include these sections, adjusted for the thread role:

- `Thread name`
- `Target submilestone` or `Audited submilestone`
- `Expected branch`
- `Branch guard`
- `Working tree cleanliness`
- `Read first`
- `Current state to confirm`
- `Scope`
- `Forbidden scope`
- `Work to perform` or `Review to perform`
- `Tracking updates`
- `Validation commands`
- `Acceptance criteria`
- `Output format`
- `Handoff packet`

## Required validation sections

Every prompt must name exact validation commands and applicable ladder levels from `docs/ops/validation-and-handoff-workflow.md`. Control-plane M00 slices use:

```powershell
python scripts/validate-control-plane.py
python -m pytest tests/test_control_plane_bootstrap.py
git diff --check
```

Run `make bootstrap-check` when `make` is available. If it is unavailable, record the limitation and the direct checks run instead.

Future product-code milestones must add deterministic tests that match the product behavior under change. Product behavior cannot be claimed from docs-only validation.

Do not claim validation passed without naming partial validation, skipped validation, unavailable commands, warnings, and accepted limitations.

## Required forbidden-scope sections

Every builder and QA prompt must say what is out of scope. For M00 control-plane work, forbidden scope includes:

- product functionality;
- MoneyEvent logic;
- ledger logic;
- invariant logic;
- incident logic;
- causal graph logic;
- replay logic;
- agent runtime;
- repair planning logic;
- UI features;
- external connectors;
- the next submilestone;
- future milestones not explicitly started.

For later product-code milestones, the prompt must list adjacent packages or behaviors that must not change.

## Required handoff packet fields

Every builder and QA handoff packet must include:

- submilestone ID and name;
- branch;
- active plan;
- files created;
- files changed;
- files intentionally not touched;
- commands run;
- command results;
- validation skipped and why;
- warnings;
- current submilestone status;
- whether product implementation started;
- remaining issues;
- whether safe to commit;
- whether safe to push;
- whether safe to open PR;
- whether safe to merge if QA;
- exact next recommended thread;
- PASS or FAIL for QA handoffs.

The handoff must be durable enough for the next Codex thread to continue from repo files without chat memory.

## Handling QA fixes

QA may fix only defects inside the audited submilestone when the QA prompt allows it. QA fixes must:

- stay on the same branch and PR;
- avoid scope widening;
- update tracking docs and the active plan;
- re-run required validation;
- record the defect, fix, and result in the QA handoff.

If the fix would touch another submilestone, product area, or unsafe financial behavior, QA must fail the slice and recommend the exact follow-up thread.

## Handling failed QA

When QA fails:

- do not mark the submilestone complete;
- do not start the next submilestone;
- record FAIL in the active plan, weekly log, and next-thread docs;
- set the registry to `Blocked`, `Builder in progress`, or `Builder complete, awaiting QA` according to the needed fix;
- point `docs/status/NEXT_RECOMMENDED_THREAD.md` to the exact fix or QA retry thread;
- keep work on the same branch and PR.

## Handling no-change QA pass

When QA finds no required fixes:

- record PASS;
- record the files inspected and validation commands run;
- update the registry to `QA passed, awaiting merge`;
- update the active plan, milestone doc, roadmap if needed, current state, weekly log, and next recommended thread;
- state that the PR is safe to merge only after validation and forbidden-scope checks pass or accepted limitations are recorded;
- do not mark `Completed and merged` until the PR has actually merged into `main`.

## Handling product-code milestones later

For product-code milestones after M00:

- keep LLM output advisory and never a source of financial truth;
- require deterministic schemas, invariants, replay, evidence, or tests appropriate to the product area;
- forbid autonomous money mutation, ledger posting, raw evidence deletion, repair approval, external release, and invariant override;
- add package-specific read order and validation commands;
- record whether any runtime behavior changed;
- avoid claiming product capability until code and deterministic validation exist.

## Avoiding chat-memory dependency

Prompts must carry enough context for a fresh Codex thread to act safely:

- name the exact active plan;
- name the exact branch;
- list files to read;
- state current statuses to confirm;
- include forbidden scope;
- require tracking updates;
- require validation;
- require a handoff packet.

If a fact matters to future work, put it in a repo file. Chat messages are not durable proof of branch guard results, QA PASS, validation, merge status, or next action.
