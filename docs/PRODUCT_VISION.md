# Product Vision

## Product thesis

CausalLedger is an agentic financial incident-response and money-movement digital twin for fintech systems. It helps fintech teams find, prove, replay, and safely repair money-movement breaks across payments, ledgers, settlement files, bank statements, refunds, chargebacks, webhooks, and provider failures.

CausalLedger is not a payment processor, not a ledger replacement, not a generic reconciliation tool, not a fraud platform, not an AML platform, and not an autonomous finance agent.

The LLM never owns financial truth. LLM agents may investigate, summarize, and propose. LLM agents may not mutate money, approve repairs, delete evidence, post ledger entries, modify raw events, or override deterministic invariants.

## Product wedge

The wedge is high-stakes fintech incident response for money-movement breaks that are expensive to investigate manually and dangerous to repair casually. The first credible product surface is a deterministic incident workbench backed by replayable evidence and agentic investigation memos.

## Cost-saving value proposition

CausalLedger aims to reduce time spent tracing payment, ledger, settlement, bank, refund, chargeback, webhook, and provider failure discrepancies. The value proposition is fewer manual investigation hours, fewer unsafe repairs, faster audit evidence, and clearer incident ownership.

## Interview demo narrative

A strong demo should show a fintech operator opening a money-movement incident, inspecting evidence, following a causal trace, seeing deterministic invariant failures, reading an evidence-grounded agent memo, replaying the incident, and reviewing a safe repair proposal that still requires human approval.

## Open-source moat

The open-source moat is trust: clear schemas, deterministic invariants, transparent safety boundaries, reproducible scenarios, and auditable benchmark results. The repo should make it obvious that agents assist investigation without owning financial truth.

## MoneyFlowBench as the star-worthy layer

MoneyFlowBench should become the public benchmark for agentic financial operations. It should measure root-cause quality, evidence precision, repair safety, hallucination resistance, latency, and token cost across realistic money-movement incident scenarios.
