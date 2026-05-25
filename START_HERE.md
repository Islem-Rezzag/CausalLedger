# Start Here

This repository has completed the M00 control-plane bootstrap and tagged it as `v0.1.0`. M01 planning is complete and merged, M01 is active in `plans/active/CLP-0002-m01-domain-model-and-scope-freeze.md`, M01.01 Define Payment Lifecycle is recorded as `Completed and merged` after post-merge QA recovery, M01.02 Define Ledger Vocabulary is `Completed and merged`, M01.03 Define Settlement Vocabulary is `Completed and merged` at git commit `e54a917`, M01.04 Define Reconciliation Vocabulary is `Completed and merged` at git commit `5dfe928`, M01.05 Define Incident Vocabulary is `Completed and merged` after QA recovery PR #18 merged at git commit `3bdedeb`, M01.06 Define Safe and Unsafe Repairs is `Completed and merged` after PR #21 merged at git commit `7adc96d`, M01.07 Define Evidence Receipt Model is `Completed and merged` after PR #23 merged at git commit `a88b5ff` (`docs: define M01.07 evidence receipt model (#23)`), M01.08 Define Human Review States is `Completed and merged` after PR #26 merged at git commit `1fde07a` (`docs: define M01.08 human review states (#26)`), M01.09 Define Out-of-Scope Domains is `Completed and merged` after PR #27 merged at git commit `1b40773` (`docs: define M01.09 out-of-scope domains (#27)`), M01.10 Write DOMAIN_MODEL.md is `Completed and merged` after QA recovery PR #29 merged at git commit `a878d55` (`test: QA recovery M01.10 domain model summary (#29)`), M01.11 Write RELIABILITY.md is `Completed and merged` after PR #30 merged at git commit `a424924` (`docs: write M01.11 reliability model (#30)`), M01.12 Write THREAT_MODEL.md is `Completed and merged` after PR #31 merged, and M01.13 QA Domain Consistency is `Builder complete, awaiting QA`. Duplicate PR merges #32 and #33 from the same M01.12 branch are recorded as a process deviation. Do not begin product implementation from this file.

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

- Do not implement product functionality.
- Do not implement MoneyEvent logic.
- Do not implement ledger logic.
- Do not implement invariants.
- Do not implement the agent runtime.
- Do not implement UI features.
- Do not start M02 or later milestone work before the remaining M01 submilestones are completed and merged.
- Do not implement product behavior during M01.01, M01.02, M01.03, or M01.04.

## Correct first success

The correct first success is that Codex can read the repo, understand current project state, and safely continue from active docs without chat memory.
