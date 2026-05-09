# Validation and Handoff Workflow

## Purpose

Validation and handoff keep CausalLedger work reproducible, reviewable, and safe across Codex threads. Validation proves the slice matched its scope with the strongest checks currently available. Handoff records what changed, what did not change, what validation ran, what did not run, and what the next thread should do.

This document is control-plane guidance only. It does not implement product behavior, MoneyEvent logic, ledger logic, invariants, incident logic, causal graph logic, replay logic, agent runtime, repair planning logic, UI behavior, external connectors, or any money-state mutation.

## Validation ladder levels

Use the lowest complete ladder that matches the slice, then add higher levels when the slice touches those risks.

| Level | Required when |
| --- | --- |
| Level 0: Branch and worktree guard | Every builder, QA, closeout, and fix thread before file edits. |
| Level 1: File and scope inspection | Every meaningful slice. Inspect the intended files, changed files, and forbidden scope. |
| Level 2: Control-plane validation | Any slice that changes docs, plans, prompts, skills, scaffolding, status, registry, or validation scripts. |
| Level 3: Unit or bootstrap tests | Any slice with tests available for the touched area; required for M00 bootstrap/control-plane slices. |
| Level 4: Diff and whitespace checks | Every slice before handoff. Use `git diff --check`; inspect the diff for scope and accidental churn. |
| Level 5: Product tests, when product code exists | Any future slice that changes runtime product code, schemas, package behavior, UI, connectors, or APIs. |
| Level 6: Scenario/eval tests, when benchmark code exists | Any future slice that changes scenarios, MoneyFlowBench, scoring, repair-safety tests, hallucination tests, or eval harnesses. |
| Level 7: Security and forbidden-scope checks | Any slice touching tool contracts, permissions, secrets, destructive actions, repair approval, external communications, evidence handling, raw events, or financial truth boundaries. |
| Level 8: Human PR review and merge readiness | Every submilestone before merge. QA PASS and required validation must be recorded before merge readiness is claimed. |

Do not claim a higher level passed when only a lower level ran. If a level is not applicable because its code does not exist yet, record it as not applicable rather than passed.

## Control-plane-only ladder

For M00 control-plane-only submilestones, run:

1. Level 0: branch guard and clean worktree check.
2. Level 1: inspect changed docs, prompts, skills, status, and validation files for scope.
3. Level 2: `python scripts/validate-control-plane.py`.
4. Level 3: `python -m pytest tests/test_control_plane_bootstrap.py`.
5. Level 4: `git diff --check` and manual diff inspection.
6. Level 7: forbidden-scope check that no product implementation or product capability claim was introduced.
7. Level 8: QA thread review before merge.

`make bootstrap-check` is optional when available and may wrap the required Python checks. If `make` is unavailable on Windows, run the direct Python commands and record the limitation.

## Docs-only ladder

For docs-only submilestones, run:

1. Level 0 branch guard.
2. Level 1 file, link, status, and scope inspection.
3. Level 2 control-plane validation when active docs, roadmap, milestone docs, plans, status docs, or ops docs change.
4. Level 4 diff and whitespace checks.
5. Level 7 forbidden-scope check when docs discuss safety boundaries, financial truth, repair approval, evidence, or agent permissions.
6. Level 8 QA review before merge.

Docs-only validation cannot prove product behavior. The handoff must say product implementation did not start unless product code was explicitly in scope and implemented.

## Prompt and template ladder

For prompt, template, and skill submilestones, run:

1. Level 0 branch guard.
2. Level 1 inspect every prompt/template/skill changed for branch guard, scope, tracking, validation, and handoff fields.
3. Level 2 control-plane validation.
4. Level 3 bootstrap tests when they assert prompt/template/skill coverage.
5. Level 4 diff and whitespace checks.
6. Level 7 forbidden-scope check that prompts and skills keep LLM agents advisory and do not authorize money mutation, repair approval, raw evidence deletion, ledger posting, invariant override, or unsupported financial truth claims.
7. Level 8 QA review before merge.

## Future product-code ladder

When product code exists, product-code submilestones must add checks beyond M00 control-plane validation:

1. Level 0 branch guard.
2. Level 1 inspect touched packages, adjacent boundaries, generated files, and forbidden scope.
3. Level 2 control-plane validation if docs, plans, prompts, skills, or status files change.
4. Level 3 unit or bootstrap tests for changed packages.
5. Level 4 diff and whitespace checks.
6. Level 5 deterministic product tests for the implemented behavior.
7. Level 7 safety checks when the change touches financial truth, agent tools, evidence, repair, or mutation boundaries.
8. Level 8 QA review before merge.

Product behavior can be claimed only when implemented code and deterministic validation exist. LLM output, docs, prompt text, or handoff prose cannot establish financial truth.

## Future eval and benchmark ladder

When benchmark code exists, scenario and eval submilestones must include:

1. Levels 0 through 4 as applicable.
2. Level 6 scenario or eval tests for changed benchmark cases, scoring, evidence expectations, uncertainty handling, hallucination resistance, repair-safety checks, and cost reports.
3. Level 7 checks when evals could incentivize unsafe mutation, unsupported certainty, evidence deletion, or repair approval.
4. Level 8 QA review before merge.

Eval results must be recorded as benchmark evidence, not product truth.

## Future security-sensitive ladder

Security-sensitive submilestones must include:

1. Levels 0 through 4 as applicable.
2. Level 5 product tests if runtime code changes.
3. Level 7 security checks for secrets, permissions, write APIs, destructive actions, evidence immutability, audit logs, prompt injection, poisoned evidence, unsafe repair, and human approval boundaries.
4. Level 8 human PR review and explicit merge readiness.

If a security check cannot run, the slice must record the skipped check, reason, residual risk, and exact follow-up. Do not treat an unavailable security check as a pass.

## Required commands

Every builder and QA thread starts with:

```powershell
git branch --show-current
git status --short
git remote -v
```

M00 control-plane slices must run before builder or QA handoff:

```powershell
python scripts/validate-control-plane.py
python -m pytest tests/test_control_plane_bootstrap.py
git diff --check
```

Future product, eval, and security slices must add commands specific to the changed package, scenario, or boundary.

## Optional commands

Run this when available:

```powershell
make bootstrap-check
```

Other optional checks may include targeted test subsets, generated-doc verification, link checks, linting, formatting, scenario runs, or security scanners. Optional commands become required only when the active plan or submilestone prompt says they are required.

## Unavailable commands

If a command such as `make` is unavailable, do not install dependencies silently and do not claim the command passed. Record:

- command skipped;
- reason, such as unavailable in the current Windows shell;
- equivalent direct checks run, if any;
- residual limitation, if no equivalent exists.

For M00, unavailable `make bootstrap-check` is acceptable when the direct Python validation and pytest commands pass.

## Validation failures

If required validation fails:

- do not mark the slice builder-complete, QA-passed, safe to merge, or completed;
- inspect the failure and fix only scoped defects when authorized;
- rerun the failed command and any dependent checks after the fix;
- record the failure, fix, rerun result, and remaining risk in the active plan and status docs;
- if the fix is not safely in scope, mark or leave the submilestone in the appropriate blocked or builder state and point `docs/status/NEXT_RECOMMENDED_THREAD.md` to the exact fix thread.

## Warnings that are not failures

Warnings are not passes. Record warnings separately from failures when they do not block the slice. Include:

- warning text or concise summary;
- command that emitted it;
- why it is non-blocking;
- whether a follow-up is needed.

Line-ending warnings, unavailable optional tools, or search-tool limitations may be non-blocking for M00 if required validation passes and the limitation is recorded.

## Recording validation results

Record validation results in:

- active plan progress or validation section;
- `docs/status/CURRENT_STATE.md` latest validation;
- `docs/status/WEEKLY_LOG.md`;
- `docs/milestones/SUBMILESTONE_REGISTRY.md` last validation field;
- final handoff packet.

Include command names, pass/fail/skipped status, test count when available, warnings, and the date.

## Recording skipped validation

Skipped validation must say:

- exact command or level skipped;
- why it was skipped;
- whether it was required or optional;
- what equivalent checks ran;
- residual risk or follow-up.

Do not write "validation passed" without clarifying skipped required or optional checks.

## Commit, push, PR, and merge readiness

Safe to commit means:

- scope matches the target submilestone;
- required builder validation passed or accepted limitations are recorded;
- tracking files and active plan are updated;
- no forbidden scope or product capability claim was introduced;
- handoff packet is complete.

Safe to push means:

- safe-to-commit conditions are met;
- the branch is the expected submilestone branch;
- no unrelated dirty files remain;
- the remote is confirmed.

Safe to open PR means:

- builder work is complete;
- validation results and skipped validation are recorded;
- the submilestone is marked `Builder complete, awaiting QA`;
- the PR title/body or handoff points QA to files changed, validation, risks, and next steps.

Safe to merge means, for QA only:

- QA inspected scope, changed files, tracking, and forbidden-scope boundaries;
- QA ran required validation or recorded accepted limitations;
- any QA fixes were scoped and revalidated;
- the submilestone is marked `QA passed, awaiting merge`;
- the QA handoff explicitly says the PR is safe to merge.

Only post-merge tracking finalization may mark a submilestone `Completed and merged`.

## Handoff packet requirements

Every builder and QA handoff packet must include:

- submilestone ID and name;
- branch;
- active plan;
- files created;
- files changed;
- files intentionally not touched;
- commands run;
- command results;
- Validation skipped and why;
- warnings;
- current tracking status;
- product implementation started or not;
- remaining issues;
- safe to commit;
- safe to push;
- safe to open PR;
- safe to merge, for QA only;
- exact next recommended thread.

Builder handoff should say whether the slice is ready for QA. QA handoff should say PASS or FAIL, whether the PR is safe to merge, and whether any scoped fixes were applied.

## QA handoff status updates

QA must verify validation, not only read docs. After QA:

- PASS updates the submilestone to `QA passed, awaiting merge`, records validation, and points next thread to merge/finalization.
- FAIL records defects, keeps or moves the submilestone to the appropriate blocked or builder state, and points next thread to the exact fix or QA retry.
- Any QA fix must remain inside the audited submilestone, update tracking, and rerun validation.

QA must not mark `Completed and merged`; that status waits for merge confirmation and tracking finalization.

## Evidence preservation in M00

M00 preserves evidence through lightweight repo records:

- command summaries in active plan and status docs;
- validation command output summarized in handoff;
- registry last-validation fields;
- weekly log entries;
- git diff available from the branch.

Do not overcomplicate M00 with evidence bundles, generated reports, or product artifacts. Future evidence bundles belong to later product milestones and must remain append-only and provenance-aware when implemented.
