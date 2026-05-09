---
name: handoff-auditor
description: Ensure every slice leaves a compact, complete handoff for the next Codex thread.
---

## When to use

Use at the end of builder, QA, closeout, and security review threads.

## Required checks

- Use `docs/ops/validation-and-handoff-workflow.md` as the canonical workflow when present.
- Include submilestone ID and name, branch, and active plan.
- Include what changed and what did not.
- Include files created, files changed, and files intentionally not touched.
- Include commands run, command results, validation skipped and why, warnings, and validation result.
- Include safe-to-commit, safe-to-push, safe-to-open-PR, and QA-only safe-to-merge statements.
- Include risks, limitations, remaining issues, and next recommended thread.
- Confirm active plan and status docs were updated.
- Confirm product implementation status is truthful.

## CausalLedger invariants

- Every meaningful slice must update active plan and status files.
- Do not claim unfinished capabilities as implemented.
- QA safe-to-merge requires validation and forbidden-scope checks.
- Handoff cannot approve repairs, mutate money, delete evidence, post ledger entries, modify raw events, or override deterministic invariants.

## Output behavior

Return missing handoff items, readiness gaps, and a final safe-to-proceed judgment scoped to commit, push, PR, or QA merge readiness.
