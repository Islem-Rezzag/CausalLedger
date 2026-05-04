---
name: financial-correctness-guard
description: Check that financial correctness is deterministic and not delegated to LLM judgment.
---

## When to use

Use for MoneyEvent, ledger, invariant, incident, replay, repair, or evidence-related changes.

## Required checks

- Confirm financial truth source is deterministic.
- Confirm LLM output is advisory only.
- Confirm validation includes financial edge cases.
- Confirm human approval is required for financial mutation.

## CausalLedger invariants

- Financial truth comes from raw evidence, canonical events, deterministic invariants, replay, evidence bundles, and human approval.
- Agents cannot mutate money or override invariants.

## Output behavior

Report correctness risks, missing deterministic checks, validation expectations, and PASS or FAIL when reviewing.
