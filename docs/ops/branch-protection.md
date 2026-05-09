# Branch Protection Guidance

## Purpose

Branch protection reduces accidental merges, force pushes, deleted history, unresolved review conversations, and unreviewed changes on `main`. It supports the CausalLedger builder/QA discipline without replacing repo tracking, QA handoffs, or human judgment.

This document is guidance only. Configure branch protection in the GitHub UI unless a later authorized slice adds automation. This M00.06 slice does not add GitHub Actions or CI workflows.

## Recommended `main` Settings

For `main`, enable:

- require a pull request before merging;
- require conversation resolution before merging;
- disallow force pushes;
- disallow deletion.

When GitHub Actions or other checks exist later, optionally enable:

- require status checks before merging;
- require branches to be up to date before merging.

When the project becomes public or has collaborators, optionally enable:

- require reviews before merging;
- require review from code owners if CODEOWNERS exists later.

## Solo Project Guidance

Because this project is currently solo, GitHub reviewer approvals may remain off for now. QA thread discipline still applies:

- builder completion does not approve the PR;
- QA must run on the same branch and PR;
- QA must record PASS before merge;
- `Completed and merged` is allowed only after the PR merges and tracking is finalized.

If GitHub cannot enforce review approvals, enforce the rule through the PR body, active plan, registry, status docs, and handoff packet.

## Status Checks

Do not require status checks until the checks exist. M00.06 does not add GitHub Actions or CI.

After GitHub Actions exist, recommended required checks should match the validation ladder for the slice, such as control-plane validation, tests, linting, or product-specific checks. A green status check is not enough if QA has not recorded PASS.

## Merge Discipline

Before merge:

- PR branch matches the submilestone branch;
- PR body is complete;
- QA recorded PASS;
- required validation passed or accepted limitations are recorded;
- forbidden-scope checklist is clean;
- conversations are resolved;
- branch has no merge conflicts.

After merge:

- update local `main`;
- finalize the submilestone as `Completed and merged` in tracking docs;
- delete the remote branch when safe;
- start the next submilestone only after finalization.

## Force Push And Deletion

Force pushes to `main` should stay disabled. Deletion of `main` should stay disabled.

Force pushes to submilestone branches are not recommended because they can obscure QA and review history. If a branch history cleanup is unavoidable before PR review, record it in the PR body and active plan.

## Admin Override

Avoid admin bypass for ordinary work. If a branch protection rule is bypassed due to an emergency or setup limitation, record:

- what rule was bypassed;
- why;
- who approved it;
- validation evidence;
- follow-up needed to restore normal discipline.
