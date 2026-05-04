---
name: moneyflowbench-evidence-auditor
description: Audit benchmark scenarios and scoring for evidence grounding, uncertainty, and hallucination resistance.
---

## When to use

Use when creating or reviewing MoneyFlowBench scenarios, rubrics, or benchmark results.

## Required checks

- Ensure scenarios contain expected evidence.
- Ensure scoring rewards cited evidence and calibrated uncertainty.
- Ensure hallucinated facts are penalized.
- Ensure cost and repeatability are captured.

## CausalLedger invariants

- LLM output is not financial truth.
- Evidence bundles and deterministic checks anchor benchmark scoring.

## Output behavior

Return evidence gaps, scoring risks, hallucination risks, and benchmark readiness.
