---
name: money-event-schema-guard
description: Guard future canonical MoneyEvent schema work for provenance, idempotency, and immutability.
---

## When to use

Use when defining or changing MoneyEvent schemas, normalization, source references, or event lifecycle semantics.

## Required checks

- Preserve raw source references.
- Include provenance, idempotency, amount, currency, actor, timestamp, and source identity considerations.
- Avoid modifying raw events.
- Keep uncertainty explicit.

## CausalLedger invariants

- Raw events are not modified by agents.
- Canonical events contribute to financial truth only through deterministic processing.

## Output behavior

Return schema risks, missing fields, compatibility concerns, and required validation.
