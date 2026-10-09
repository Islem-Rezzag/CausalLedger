# Start Here

M00-M03 are closed and V1_PUBLIC_PRODUCT is approved. M04.01-M04.17 are Completed and merged. Human PR #78 merge626dbc04 matches reviewed6b4fa5ad/tree d36e7eed, final CI37804064435 (1785 ledger/1742 controls/1224 real PostgreSQL assertions), cleanQA18/0/1 and independent QA PASS; full diff empty and main reachability verified. M04.18 QA ledger core is **Builder complete, awaiting QA** on `m04-18-qa-ledger-core`, no current PR, under active `plans/active/CLP-0005-m04-double-entry-ledger-core.md`. Fresh ledger1785/32files and fullcontrol1882 PASS; type/lint/build/format PASS; intermediateQA17/0/2 PASS. Mandatory current database acceptance and independent QA pending. Final actual-head gates and human merge remain. Formal M04 closeout remains separate after all18 rows merge; M05-M21 remain Not started. Current evidence is in `docs/status/CURRENT_STATE.md`.

Current versioning and release-scope references are `docs/VERSIONING.md`, `docs/releases/RELEASE_LADDER.md`, `docs/releases/V1_SCOPE.md`, and `CHANGELOG.md`.

## First-run instructions for Codex

Read the active docs before making any changes. Treat this repository as file-first: project memory lives in the repo, not in prior chat context.

## Required read order

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

## Active-plan rule

Detect active plans by listing `plans/active/` and reading any `CLP-*.md` file found there.

If an active plan exists, continue only that plan. Do not widen scope, start another milestone, or silently create competing plans. Read the active plan before editing and update it at every meaningful stopping point.

If no active plan exists, do not code. Create a CausalLedger Plan first, record the intended milestone or submilestone, and update status docs before implementation begins.

## Branch recovery

Every builder and QA thread must start with a branch guard:

- `git branch --show-current`
- `git status --short`
- `git remote -v`

If Codex is on the wrong branch, stop before editing. Report the current branch, expected branch, dirty files if any, and the safest recovery command for a human to run, such as `git switch <expected-branch>`. Do not create commits, move branches, or rewrite work to recover automatically unless the user explicitly asks.

Codex may stage, commit, or push scoped changes only when explicitly authorized. Codex must not merge PRs; humans merge after QA PASS and normal merge readiness checks.

## Recommended thread model

- one planning thread per milestone
- one builder thread per submilestone
- one QA thread per submilestone
- one closeout thread per milestone

Each submilestone uses the same branch and the same PR for its builder thread and QA thread. Open a draft PR before QA when possible. Merge only after QA records PASS.

Use `docs/ops/builder-qa-prompt-protocol.md`, `docs/ops/github-pr-and-issue-workflow.md`, `prompts/template_builder_submilestone.md`, `prompts/template_qa_submilestone.md`, and `prompts/template_handoff_packet.md` when preparing future builder, QA, PR, and handoff prompts.

## Review ritual after each slice

After every meaningful slice, update the active plan, `docs/status/CURRENT_STATE.md`, `docs/status/WEEKLY_LOG.md`, `docs/status/NEXT_RECOMMENDED_THREAD.md`, and any relevant risk or tech-debt notes. Run validation and produce a handoff packet.

The handoff packet must include files created, files changed, files intentionally not touched, validation commands, validation result, completion status, product implementation status, remaining issues, and exact next recommended thread.

## What not to do first

- Do not implement product functionality outside the active submilestone.
- Do not extend MoneyEvent logic beyond the active source-neutral boundary.
- Keep ledger work inside current M04.18 acceptance/demo; no runtime/DDL/API/financial authority. Human merge and separate formalM04closeout beforeM05.
- Do not implement invariants.
- Do not implement the agent runtime.
- Do not implement UI features.
- Do not close M03 or start M04 before M03.06 independent QA PASS, PR merge, and formal M03 milestone closeout.
- Do not implement product behavior during M01.01, M01.02, M01.03, or M01.04.

## Correct first success

The correct first success is that Codex can read the repo, understand current project state, and safely continue from active docs without chat memory.
