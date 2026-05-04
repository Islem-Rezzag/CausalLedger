---
name: causalledger-plan-orchestrator
description: Keep CausalLedger work aligned to active plans, milestones, status docs, and handoff rules.
---

## When to use

Use before complex work, milestone planning, submilestone execution, QA, and closeout.

## Required checks

- Confirm active docs were read.
- Confirm whether an active plan exists.
- Continue only the active plan if present.
- Require plan creation before coding if no active plan exists.
- Ensure status docs and handoff packet are updated.

## CausalLedger invariants

- Agents can investigate, summarize, and propose.
- Agents cannot mutate money, approve repairs, delete evidence, post ledger entries, or modify raw events.
- Do not claim unfinished capabilities as implemented.

## Output behavior

Return the active plan status, next safe action, validation expectation, and exact next recommended thread.
