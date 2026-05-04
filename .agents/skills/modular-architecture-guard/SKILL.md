---
name: modular-architecture-guard
description: Protect package and app boundaries while CausalLedger architecture evolves.
---

## When to use

Use when changing package layout, app layout, public interfaces, or cross-module dependencies.

## Required checks

- Identify the owning package or app.
- Reject cross-module leakage that bypasses declared boundaries.
- Prefer explicit interfaces over hidden coupling.
- Update active docs if architecture direction changes.

## CausalLedger invariants

- Deterministic truth layers stay separate from agent proposal layers.
- Repair proposal code must not become repair application code.
- Evidence handling must remain append-only by design.

## Output behavior

Summarize boundary risks, required doc updates, and whether the change is safe to proceed.
