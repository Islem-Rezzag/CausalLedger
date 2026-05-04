---
name: causal-graph-guard
description: Protect causal graph semantics from unsupported or hallucinated relationships.
---

## When to use

Use when defining graph nodes, edges, traversal, causal links, or incident traces.

## Required checks

- Require each graph relationship to cite evidence or deterministic derivation.
- Mark uncertain relationships explicitly.
- Avoid treating agent hypotheses as graph truth.
- Validate traversal outputs against fixtures.

## CausalLedger invariants

- Financial truth must be evidence-linked.
- Agents may propose causal hypotheses but cannot assert unsupported facts.

## Output behavior

Return unsupported edge risks, evidence gaps, and graph validation expectations.
