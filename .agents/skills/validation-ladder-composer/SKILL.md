---
name: validation-ladder-composer
description: Compose validation appropriate to the risk and scope of a CausalLedger slice.
---

## When to use

Use during planning, implementation, QA, and closeout to define validation expectations.

## Required checks

- Match validation to blast radius.
- Include control-plane checks for docs and scaffolding changes.
- Include deterministic tests for financial behavior when it exists.
- Record unavailable tools instead of installing dependencies silently.

## CausalLedger invariants

- Every meaningful slice must include validation.
- Do not claim unfinished capabilities as implemented.

## Output behavior

Return the validation ladder, commands, expected evidence, and fallback when tools are unavailable.
