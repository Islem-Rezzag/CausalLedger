# QA Submilestone Prompt

## Thread name

`<MXX.YY QA - Submilestone Title>`

## Audited submilestone

- ID: `<MXX.YY>`
- Title: `<Submilestone title>`
- Expected branch: `<submilestone-branch>`
- PR: `<PR link>`
- Active plan: `<plans/active/CLP-....md>`
- Builder handoff to audit: `<handoff summary or file reference>`

## Branch guard

Before editing any file, run:

```powershell
git branch --show-current
git status --short
git remote -v
```

If the branch is not exactly `<submilestone-branch>`, stop immediately and do not edit files.

## Working tree cleanliness

If the working tree is not clean before starting, report the dirty files and stop unless they are intentionally changed for this exact QA pass.

## Strict reviewer role

Act as a strict reviewer for the audited submilestone only. Verify scope, files, tracking, validation, PR body, and handoff. Do not rely on builder chat memory. Use `docs/ops/validation-and-handoff-workflow.md` for the validation ladder, failure handling, skipped-validation recording, and safe-to-merge criteria. Use `docs/ops/github-pr-and-issue-workflow.md` for same-branch PR discipline, QA fixes, failed QA, and merge readiness.

## Same-branch, same-PR rule

QA must inspect and, if allowed, fix defects on the same branch and PR used by the builder. Do not start a new branch or advance the next submilestone.

## No-scope-widening rule

Do not widen scope. Fix only defects inside `<MXX.YY>` if the QA prompt authorizes fixes. If a needed fix belongs to another submilestone or product area, record FAIL and recommend the exact follow-up thread.

## Files to inspect

- `<file created or changed by builder>`
- `<file created or changed by builder>`
- PR body using `.github/PULL_REQUEST_TEMPLATE.md`
- `docs/milestones/SUBMILESTONE_REGISTRY.md`
- relevant milestone doc in `docs/milestones/`
- active plan
- `docs/status/CURRENT_STATE.md`
- `docs/status/NEXT_RECOMMENDED_THREAD.md`
- `docs/status/WEEKLY_LOG.md`

## Forbidden changes check

Verify the builder did not implement or claim forbidden scope. For M00 control-plane slices, confirm no product functionality, MoneyEvent logic, ledger logic, invariants, incident logic, causal graph logic, replay logic, agent runtime, repair planning logic, UI features, external connectors, next submilestone, or future milestone work started.

## Validation commands

Verify the builder validation record, then run the commands and ladder levels required by the submilestone. For M00 control-plane slices, apply Level 0, Level 1, Level 2, Level 3, Level 4, Level 7, and Level 8:

```powershell
python scripts/validate-control-plane.py
python -m pytest tests/test_control_plane_bootstrap.py
git diff --check
```

Run `make bootstrap-check` if `make` is available. If unavailable, record the limitation.

If QA applies any scoped fix, rerun required validation after the fix. Record command results, validation skipped and why, warnings, and whether only partial validation ran.

## Status transition rules

- If QA passes with no required fixes, set the target submilestone to `QA passed, awaiting merge`.
- If QA fixes scoped defects and validation passes, set the target submilestone to `QA passed, awaiting merge`.
- If QA fails, do not mark the submilestone complete; set the registry to `Blocked`, `Builder in progress`, or `Builder complete, awaiting QA` according to the required fix.
- Do not mark `Completed and merged`; that happens only after PR merge and tracking finalization.

## PASS or FAIL output

Produce exactly one overall result:

- `PASS` when scope, tracking, forbidden-scope checks, and validation pass.
- `FAIL` when any blocking defect remains.

Include defects found, fixes applied, commands run, validation results, and remaining risks.

## Safe-to-merge statement

State whether the PR is safe to merge. QA PASS may say the PR is safe to merge only when validation, tracking, forbidden-scope checks, PR body, and any scoped QA fixes pass or accepted limitations are recorded. QA PASS does not equal `Completed and merged`.

Update the PR body with QA status and merge-readiness summary when the QA prompt authorizes PR edits.

## QA handoff packet format

Produce a QA handoff packet with:

1. Submilestone ID and name.
2. Branch.
3. Active plan.
4. Files created by QA.
5. Files changed by QA.
6. Files intentionally not touched.
7. Commands run.
8. Command results.
9. Validation skipped and why.
10. Warnings.
11. Current tracking status.
12. Whether product implementation started.
13. Remaining issues.
14. Whether safe to commit.
15. Whether safe to push.
16. Whether safe to open PR.
17. Whether safe to merge.
18. Exact next recommended thread.

## Next recommended thread

Name the exact next thread:

- after PASS: `<Merge MXX.YY PR>` or the project-specific merge/finalization thread;
- after FAIL: `<MXX.YY Fix - Submilestone Title>` or `<MXX.YY QA Retry - Submilestone Title>`.
