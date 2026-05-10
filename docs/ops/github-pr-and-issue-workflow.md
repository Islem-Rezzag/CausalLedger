# GitHub PR and Issue Workflow

## Purpose

The GitHub PR and issue workflow gives every CausalLedger submilestone a consistent remote review container, traceable scope record, validation record, QA handoff path, and merge discipline. It connects file-first repo tracking with GitHub review mechanics without making GitHub the source of financial truth.

This document is control-plane guidance only. It does not implement product functionality, MoneyEvent logic, ledger logic, invariants, incident logic, causal graph logic, replay logic, agent runtime, repair planning, UI behavior, external connectors, GitHub Actions, or CI workflows.

## Branch Naming Convention

Use one branch per submilestone:

```text
mXX-YY-kebab-case-submilestone-title
```

Examples:

- `m00-06-github-pr-and-issue-workflow`
- `m01-01-define-payment-lifecycle`

The branch name must match the submilestone prompt and registry row. Builder and QA threads must stop before edits if the current branch does not exactly match the expected branch.

## PR Naming Convention

Use one PR per submilestone. Recommended title:

```text
MXX.YY: Submilestone Title
```

Examples:

- `M00.06: GitHub PR and Issue Workflow`
- `M01.01: Define Payment Lifecycle`

When a conventional commit prefix is useful, keep the submilestone visible:

```text
docs: M00.06 GitHub PR and issue workflow
```

## PR Body Expectations

Use `.github/PULL_REQUEST_TEMPLATE.md`. A complete submilestone PR body should identify:

- submilestone ID and title;
- branch;
- active plan;
- scope and forbidden scope;
- files created and changed;
- product implementation status;
- validation commands and results;
- skipped validation and why;
- QA status;
- handoff packet link or summary;
- safe-to-merge checklist.

The PR body should be updated when builder validation completes, when QA starts, when QA fixes are applied, and when QA records PASS or FAIL.

## Issue Template Usage

Issue templates live in `.github/ISSUE_TEMPLATE/`:

- `submilestone-task.yml` for planned submilestone work that needs issue-level tracking.
- `qa-review.yml` for QA review records when a separate issue is useful.
- `blocked-slice.yml` for blockers that prevent safe progress.
- `research-spike.yml` for bounded research without implementation.
- `bug.yml` for observed defects in docs, control-plane behavior, or future product behavior.

Do not add labels in issue templates unless the labels have been created in GitHub. Suggested labels and milestones are documented in `docs/ops/github-labels-and-milestones.md`.

## When To Create An Issue

Create an issue when:

- the work needs discussion before a branch starts;
- a blocker needs durable tracking beyond the current PR;
- QA fails and the fix is not immediately scoped;
- research is needed before implementation;
- a bug is discovered outside the active submilestone;
- a decision affects multiple future submilestones.

The issue should point to the active plan, target branch if known, relevant PR if one exists, validation evidence, and exact next action.

## When A Submilestone PR Is Enough

A separate issue is optional when the active plan, registry row, branch, PR body, status docs, and handoff packet already carry the full submilestone context. For routine M00 builder and QA work, the PR alone can be the remote review container.

Do not create issues just to duplicate information already captured in the active plan and PR body.

## One Branch, One PR, One Builder Thread, One QA Thread

Each submilestone uses:

- one branch;
- one PR;
- one builder thread;
- one QA thread.

The builder produces the scoped change and handoff packet. QA inspects the same branch and PR, runs validation, records PASS or FAIL, and states merge readiness. Builder completion is not QA approval. QA PASS is not final completion until the PR merges and tracking is finalized.

## Same-Branch, Same-PR Builder/QA Rule

Builder and QA must use the same branch and PR. QA fixes, if any, stay on that same branch and PR unless a human explicitly changes the plan.

Do not start the next submilestone branch until the current submilestone has QA PASS, the PR has merged into `main`, and post-merge tracking has marked the current submilestone `Completed and merged`.

## Draft PR Versus Normal PR

Open a draft PR when:

- builder work is still in progress but a remote review container is useful;
- QA has not started;
- validation has not completed;
- a blocker or failed QA needs visible tracking.

Mark the PR ready for review when builder validation has passed or accepted limitations are recorded and the submilestone is `Builder complete, awaiting QA`.

Keep the PR unmerged until QA records PASS. A normal, non-draft PR is not permission to merge without QA PASS.

## Before Opening A PR

Check:

- branch guard passed on the expected submilestone branch;
- working tree changes are scoped to the submilestone;
- active plan and status docs are updated for builder progress;
- forbidden scope was not touched;
- no product functionality is claimed unless explicitly scoped and implemented;
- validation has run or the PR is intentionally draft while validation is still pending;
- the PR body names the active plan, changed files, validation state, and next action.

Codex may run validation, stage, commit, and push scoped changes only when the prompt explicitly authorizes those Git actions. Codex must not merge PRs into `main`.

## Before Running QA

Check:

- PR exists and points to the expected submilestone branch;
- builder handoff packet is present in the PR body, final response, or status docs;
- registry row is `Builder complete, awaiting QA`;
- required builder validation passed or accepted limitations are recorded;
- branch guard passes for QA on the same branch;
- QA has the exact files to inspect and forbidden scope to verify.

## Before Merging

Check:

- QA recorded PASS on the same branch and PR;
- required QA validation passed or accepted limitations are recorded;
- registry row is `QA passed, awaiting merge`;
- conversations are resolved;
- no merge conflicts remain;
- PR body and handoff include validation results, skipped validation, warnings, and product implementation status;
- forbidden-scope checklist is clean;
- no one is starting the next submilestone before merge.

Do not merge without QA PASS.

## Squash Merge Guidance

Prefer squash merge for submilestone PRs so `main` has one clear commit per submilestone. The squash commit subject should include the submilestone ID or title.

After merge, the next tracking update must record the merge reference in the registry, milestone doc, roadmap/current state where relevant, weekly log, and active plan.

If the merged PR completes the final required submilestone in a milestone, use `docs/ops/milestone-closeout-workflow.md` before moving the active plan to `plans/completed/` or starting the next milestone.

## Branch Deletion After Merge

Delete the remote submilestone branch after the PR merges and tracking is finalized. Do not delete the branch before merge or while QA fixes are still possible.

If the branch is deleted by GitHub automatically, run:

```powershell
git fetch --prune origin
```

Then start the next submilestone branch from updated `main`.

## Local Main Update After Merge

After a PR merges:

```powershell
git switch main
git pull --ff-only origin main
```

Create the next submilestone branch from updated `main` only after the previous submilestone is finalized as `Completed and merged` in tracking docs.

## Remote Branch Deletion Handling

If a remote branch no longer exists:

- confirm the PR merged before treating the deletion as expected;
- run `git fetch --prune origin`;
- do not recreate a merged branch for ordinary follow-up work;
- create a new branch only for the next authorized submilestone or an explicit follow-up fix.

If the branch was deleted before merge, stop and ask a human to restore or choose the recovery path.

## Failed QA

If QA fails:

- do not merge;
- do not mark the submilestone `QA passed, awaiting merge` or `Completed and merged`;
- keep the same branch and PR open;
- record defects in the active plan, weekly log, PR body, and issue if durable tracking is needed;
- set the registry to `Blocked`, `Builder in progress`, or `Builder complete, awaiting QA` based on the needed fix;
- point `docs/status/NEXT_RECOMMENDED_THREAD.md` to the exact fix or QA retry thread.

## QA Fixes

QA fixes must:

- stay on the same branch and PR;
- be limited to defects inside the audited submilestone;
- avoid product or future-submilestone scope unless explicitly authorized;
- update tracking docs and active plan;
- rerun required validation after the fix;
- record the defect, fix, and validation result in the QA handoff.

If the fix belongs to another submilestone, QA should fail the slice and recommend a follow-up thread.

## Merge Conflicts

If the PR has merge conflicts:

- do not merge;
- update the branch from current `main` using the repo's preferred Git workflow;
- resolve only conflicts inside the submilestone scope;
- rerun required validation;
- update the PR body and handoff with the conflict resolution summary;
- return to QA if the conflict resolution changed reviewed files.

If conflict resolution would alter unrelated product behavior, raw evidence, ledger state, or financial truth boundaries, stop and ask for human direction.

## GitHub Branch Protection

Recommended branch protection for `main` is documented in `docs/ops/branch-protection.md`. For now, this project is solo, so GitHub reviewer approvals may remain off, but QA thread discipline still applies.

When GitHub Actions or required checks are added later, branch protection can require those status checks before merge. This workflow does not add GitHub Actions or CI workflows.

## Missing GitHub CLI

The GitHub CLI is optional for this workflow. If `gh` is missing:

- use the GitHub web UI to open, update, review, and merge PRs;
- record the limitation only when a prompt explicitly expected CLI output;
- do not block control-plane validation solely because `gh` is unavailable;
- keep the PR body and repo tracking files as the durable source of workflow state.

## Avoiding Merge Without QA PASS

The PR must not merge until a QA thread records PASS after inspecting scope, changed files, tracking, forbidden-scope boundaries, validation, skipped validation, warnings, and any scoped QA fixes.

If a PR is merged accidentally before QA PASS, record the breach in `docs/status/RISK_REGISTER.md`, mark the submilestone state truthfully, and run a follow-up QA or remediation thread before starting further submilestones.

## Avoiding Early Next-Submilestone Start

Do not start the next submilestone until:

- current submilestone QA recorded PASS;
- current PR merged into `main`;
- local `main` is updated from `origin/main`;
- registry, milestone doc, roadmap/current state, weekly log, active plan, and next-thread docs finalize the previous submilestone as `Completed and merged`.

## Auditability And Interview-Grade Traceability

GitHub PRs support auditability by tying together:

- one branch and one PR per submilestone;
- PR body scope, validation, and forbidden-scope checklists;
- issue links when blockers, research, or defects need durable tracking;
- QA PASS or FAIL records;
- merge commits or squash commits on `main`;
- active plan, registry, status docs, and handoff packet updates.

The result should let a reviewer reconstruct what changed, why it changed, who reviewed it, what validation ran, what was not validated, and why the next thread is safe to start.
