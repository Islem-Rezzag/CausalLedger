---
name: ledger-invariant-guard
description: Guard ledger and invariant work so correctness remains deterministic and balanced.
---

## When to use

Use when designing ledger transactions, entries, balances, state machines, or invariant checks.

## Required checks

- Confirm double-entry balance expectations.
- Confirm deterministic invariant behavior.
- Confirm agents cannot post ledger entries or override checks.
- Require tests for failure and edge cases.

## CausalLedger invariants

- Agents cannot post ledger entries.
- Agents cannot approve repairs.
- Invariant results are not LLM opinions.

## Output behavior

Report invariant coverage, ledger safety risks, and validation requirements.
