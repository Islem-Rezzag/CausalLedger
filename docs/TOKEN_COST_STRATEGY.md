# Token Cost Strategy

## Product thesis

CausalLedger is an agentic financial incident-response and money-movement digital twin for fintech systems. It helps fintech teams find, prove, replay, and safely repair money-movement breaks across payments, ledgers, settlement files, bank statements, refunds, chargebacks, webhooks, and provider failures.

CausalLedger is not a payment processor, not a ledger replacement, not a generic reconciliation tool, not a fraud platform, not an AML platform, and not an autonomous finance agent.

The LLM never owns financial truth. LLM agents may investigate, summarize, and propose. LLM agents may not mutate money, approve repairs, delete evidence, post ledger entries, modify raw events, or override deterministic invariants.

## Cost boundary

Do not use LLM calls for ingestion, normalization, invariants, incident creation, ledger posting, evidence truth, or repair approval. These must be deterministic.

## Planned LLM usage

Future LLM use is limited to investigation support, hypothesis generation, summarization, critic passes, and memo drafting after deterministic evidence packs exist. LLM output must remain advisory and evidence-linked.

## Model selection

Do not call expensive models by default. Prefer scoped context, deterministic prefilters, smaller models where adequate, and escalation only for harder investigation or synthesis tasks.

## Metrics to track later

- Input tokens per incident.
- Output tokens per incident.
- Cost per incident.
- Agent investigation latency.
- Repair validation latency.
- Model selection decisions.
- Benchmark cost and latency for MoneyFlowBench.

## Context controls

Use file-first handoffs, bounded evidence packs, explicit evidence IDs, and context compression when needed. Do not rely on hidden chat memory for project state or incident truth.
