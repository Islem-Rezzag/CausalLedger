---
name: token-cost-guard
description: Keep agentic workflows cost-aware and benchmarkable.
---

## When to use

Use when designing agent workflows, model routing, benchmark runs, or observability.

## Required checks

- Identify costly loops or unbounded retrieval.
- Require cost and latency metrics where relevant.
- Prefer scoped context and explicit handoffs.
- Avoid relying on hidden chat memory.

## CausalLedger invariants

- File-first handoff is required for continuity.
- Agent outputs must remain auditable and bounded.

## Output behavior

Return cost risks, context controls, and metrics to capture.
