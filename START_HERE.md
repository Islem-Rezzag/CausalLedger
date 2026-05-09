# Start Here

This repository is currently a control-plane bootstrap for CausalLedger. Do not begin product implementation from this file, and do not start the next submilestone unless the previous submilestone has QA PASS and its PR is merged.

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

- Do not implement product functionality.
- Do not implement MoneyEvent logic.
- Do not implement ledger logic.
- Do not implement invariants.
- Do not implement the agent runtime.
- Do not implement UI features.
- Do not start M00 or any milestone until the user explicitly asks.
- Do not implement product behavior during M00 unless the active plan explicitly scopes it, and M00 currently scopes control-plane work only.

## Correct first success

The correct first success is that Codex can read the repo, understand current project state, and safely continue from active docs without chat memory.
