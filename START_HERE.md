# Start Here

M00-M03 are closed and V1_PUBLIC_PRODUCT is approved. M04.01-M04.07 are Completed and merged; human PR68 merge584a452 matches reviewed e3190fb/tree5c0338e and exact final QA/clean QA18/0/1/CI37468260697 real113 verified. M04.08 Add idempotency keys is **QA passed, awaiting merge** on `m04-08-add-idempotency-keys`, sole [PR #69](https://github.com/Islem-Rezzag/CausalLedger/pull/69), under active `plans/active/CLP-0005-m04-double-entry-ledger-core.md`. Fresh ledger728/17files, control716, ledger type/lint/build/format PASS; root pre-repair intermediate full QA17/0/2 PASS (dirty override and optional Docker skips). Actual CI37473167737 both jobs and real Postgres17 storage64/balance22/transaction-query27/idempotency39 (152), both-migration recovery, populated legacy preservation, exact schema/functions and owned/Compose cleanup PASS. Existing overall m04_02_qa PASS, both P2 repairs verified, no remaining finding. Final actual-head confirmation/clean QA/CI and human merge remain required; exact final proof stays in this sole PR. M04.09-M04.18 and M05-M21 remain Not started. Current evidence is in `docs/status/CURRENT_STATE.md`.

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
- Keep ledger work inside current M04.08 idempotency keys; no later reversal, posting eligibility or agent financial authority. Independent QA and human merge gate every slice.
- Do not implement invariants.
- Do not implement the agent runtime.
- Do not implement UI features.
- Do not close M03 or start M04 before M03.06 independent QA PASS, PR merge, and formal M03 milestone closeout.
- Do not implement product behavior during M01.01, M01.02, M01.03, or M01.04.

## Correct first success

The correct first success is that Codex can read the repo, understand current project state, and safely continue from active docs without chat memory.
