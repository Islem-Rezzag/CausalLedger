# Start Here

This repository is currently a control-plane bootstrap for CausalLedger. Do not begin product implementation from this file.

## First-run instructions for Codex

Read the active docs before making any changes. Treat this repository as file-first: project memory lives in the repo, not in prior chat context.

## Required read order

1. `docs/ACTIVE_DOCS.md`
2. `README.md`
3. `AGENTS.md`
4. `PLANS.md`
5. `WORKFLOW.md`
6. `plans/ROADMAP.md`
7. `docs/status/CURRENT_STATE.md`
8. Active plan in `plans/active/`, if one exists

## Active-plan rule

If an active plan exists, continue only that plan. Do not widen scope, start another milestone, or silently create competing plans.

If no active plan exists, do not code. Create a CausalLedger Plan first.

## Recommended thread model

- one planning thread per milestone
- one builder thread per submilestone
- one QA thread per submilestone
- one closeout thread per milestone

## Review ritual after each slice

After every meaningful slice, update the active plan, `docs/status/CURRENT_STATE.md`, `docs/status/WEEKLY_LOG.md`, and any relevant risk or tech-debt notes. Run validation and produce a handoff packet.

## What not to do first

- Do not implement product functionality.
- Do not implement MoneyEvent logic.
- Do not implement ledger logic.
- Do not implement invariants.
- Do not implement the agent runtime.
- Do not implement UI features.
- Do not start M00 or any milestone until the user explicitly asks.

## Correct first success

The correct first success is that Codex can read the repo, understand current project state, and safely continue from active docs without chat memory.
