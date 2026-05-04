---
name: repair-safety-guard
description: Keep repair work limited to proposals, validation, idempotency, rollback planning, and human approval.
---

## When to use

Use when designing repair plans, repair validation, rollback behavior, or approval workflows.

## Required checks

- Confirm repair is a proposal, not application.
- Require replay or simulation before repair claims.
- Require idempotency and rollback considerations.
- Require human approval before any financial mutation.

## CausalLedger invariants

- Agents cannot approve repairs.
- Agents cannot mutate money.
- Repair application requires human approval.

## Output behavior

Report unsafe repair paths, missing approvals, and validation expectations.
