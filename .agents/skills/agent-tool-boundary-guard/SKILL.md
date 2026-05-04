---
name: agent-tool-boundary-guard
description: Ensure agent tools remain read-only or proposal-only unless explicitly approved by humans and deterministic controls.
---

## When to use

Use when defining agent runtime behavior, tool contracts, MCP interfaces, or tool permissions.

## Required checks

- Separate read tools from proposal tools.
- Block money mutation, repair approval, evidence deletion, ledger posting, and raw event modification.
- Require explicit human approval for privileged actions.
- Validate tool contracts with negative tests.

## CausalLedger invariants

- Agents can investigate, summarize, and propose.
- Agents cannot mutate money, approve repairs, delete evidence, post ledger entries, or modify raw events.

## Output behavior

Return allowed tools, forbidden tools, boundary risks, and safe-to-proceed status.
