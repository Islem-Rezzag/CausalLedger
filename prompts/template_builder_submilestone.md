# Builder Submilestone Prompt

## Thread name

`<MXX.YY Builder - Submilestone Title>`

## Target submilestone

- ID: `<MXX.YY>`
- Title: `<Submilestone title>`
- Expected branch: `<submilestone-branch>`
- PR: `<draft PR link if already opened, or "open/update before QA when available">`
- Active plan: `<plans/active/CLP-....md>`
- Scope type: `<control-plane only | product-code milestone>`

## Branch guard

Before editing any file, run:

```powershell
git branch --show-current
git status --short
git remote -v
```

If the branch is not exactly `<submilestone-branch>`, stop immediately and do not edit files.

## Working tree cleanliness

If the working tree is not clean before starting, report the dirty files and stop unless they are intentionally changed for this exact submilestone.

## Read first

Read active docs before editing. Use this order unless the submilestone prompt adds more files:

1. `docs/ACTIVE_DOCS.md`
2. `README.md`
3. `START_HERE.md`
4. `AGENTS.md`
5. `PLANS.md`
6. `WORKFLOW.md`
7. `docs/INDEX.md`
8. `plans/ROADMAP.md`
9. `docs/status/CURRENT_STATE.md`
10. `docs/status/NEXT_RECOMMENDED_THREAD.md`
11. Active plan in `plans/active/`, if one exists

## Current state to confirm

Confirm from repo files:

- previous submilestone status;
- target submilestone has not already advanced beyond the intended builder state;
- current milestone status;
- future milestones are not started unless explicitly in scope;
- product implementation status;
- active plan path.

## Scope

Implement only the target submilestone. Use `docs/ops/builder-qa-prompt-protocol.md`, `docs/ops/planning-and-tracking-system.md`, `docs/ops/validation-and-handoff-workflow.md`, and `docs/ops/github-pr-and-issue-workflow.md` for required thread, tracking, validation, PR, and handoff rules.

## PR expectations

Use `.github/PULL_REQUEST_TEMPLATE.md` when opening or updating the submilestone PR. A draft PR is acceptable before QA; do not imply the PR is safe to merge until QA records PASS.

## Forbidden scope

Do not widen scope. For M00 control-plane slices, do not implement:

- product functionality;
- MoneyEvent logic;
- ledger logic;
- invariants;
- incident logic;
- causal graph logic;
- replay logic;
- agent runtime;
- repair planning logic;
- UI features;
- external connectors;
- the next submilestone;
- future milestones.

For later product-code milestones, add package-specific forbidden changes here.

## Work to perform

1. `<Concrete work item>`
2. `<Concrete work item>`
3. `<Concrete work item>`

## Tracking update requirements

Update durable tracking in the same slice:

- `docs/milestones/SUBMILESTONE_REGISTRY.md`
- relevant milestone doc in `docs/milestones/`
- `plans/ROADMAP.md`
- active plan
- `docs/status/CURRENT_STATE.md`
- `docs/status/NEXT_RECOMMENDED_THREAD.md`
- `docs/status/WEEKLY_LOG.md`
- `docs/status/TECH_DEBT.md` only if placeholders, shortcuts, or limitations are introduced
- `docs/status/RISK_REGISTER.md` only if a durable risk is discovered
- `docs/status/OPEN_QUESTIONS.md` only if unresolved questions are discovered
- `docs/status/CAPABILITY_MATRIX.md` only if capability status needs clarification
- PR body, if a PR exists or is opened during the slice

Set the target submilestone to `Builder in progress` while working. Set it to `Builder complete, awaiting QA` only after validation passes or an accepted limitation is recorded.

## Validation commands

Run the commands and ladder levels required by the submilestone. For M00 control-plane slices, apply Level 0, Level 1, Level 2, Level 3, Level 4, Level 7, and builder handoff preparation for Level 8:

```powershell
python scripts/validate-control-plane.py
python -m pytest tests/test_control_plane_bootstrap.py
git diff --check
```

Run `make bootstrap-check` if `make` is available. If unavailable, record the limitation.

Record command results, validation skipped and why, warnings, and whether only partial validation ran. Do not claim product validation passed from control-plane checks.

## Acceptance criteria

- Scope matches `<MXX.YY>`.
- Required files are created or updated.
- Tracking files and active plan are synchronized.
- Forbidden scope was not touched.
- Product implementation status is truthful.
- Validation passes or accepted limitations are recorded.
- Target submilestone is not marked QA passed or completed by the builder.
- PR body is ready for same-branch QA when a PR exists or is opened.
- Handoff packet is complete.

## Handoff packet format

Produce a handoff packet with:

1. Submilestone ID and name.
2. Branch.
3. Active plan.
4. Files created.
5. Files changed.
6. Files intentionally not touched.
7. Commands run.
8. Command results.
9. Validation skipped and why.
10. Warnings.
11. Current submilestone status.
12. Whether product implementation started.
13. Remaining issues.
14. Whether safe to commit.
15. Whether safe to push.
16. Whether safe to open PR.
17. Whether safe to merge if QA.
18. Exact next recommended thread.
