---
name: validation-ladder-composer
description: Compose validation appropriate to the risk and scope of a CausalLedger slice.
---

## When to use

Use during planning, implementation, QA, and closeout to define validation expectations.

## Required checks

- Use `docs/ops/validation-and-handoff-workflow.md` as the canonical workflow when present.
- Match validation to blast radius.
- Include control-plane checks for docs and scaffolding changes.
- Name the applicable ladder levels: Level 0 through Level 8.
- Include deterministic tests for financial behavior when it exists.
- Record unavailable tools instead of installing dependencies silently.
- Record skipped validation, warnings, accepted limitations, and residual risk.

## CausalLedger invariants

- Every meaningful slice must include validation.
- Do not claim unfinished capabilities as implemented.
- Do not claim product, eval, or security validation passed when only control-plane validation ran.
- LLM output can explain or propose but cannot establish financial truth.

## Output behavior

Return the applicable validation ladder, commands, command results expected, skipped-validation format, warning handling, readiness criteria, expected evidence, and fallback when tools are unavailable.
