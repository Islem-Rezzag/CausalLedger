---
name: handoff-auditor
description: Ensure every slice leaves a compact, complete handoff for the next Codex thread.
---

## When to use

Use at the end of builder, QA, closeout, and security review threads.

## Required checks

- Include what changed and what did not.
- Include commands run and validation result.
- Include risks, limitations, and next recommended thread.
- Confirm active plan and status docs were updated.

## CausalLedger invariants

- Every meaningful slice must update active plan and status files.
- Do not claim unfinished capabilities as implemented.

## Output behavior

Return missing handoff items and a final safe-to-proceed judgment.
