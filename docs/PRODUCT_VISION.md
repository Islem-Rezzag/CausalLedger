# Product Vision

## Product thesis

CausalLedger is a planned continuous payment lifecycle observability and incident-response system for fintech money movement. It is designed to build a living causal timeline from provider events, webhooks, ledger entries, settlement files, bank evidence, refunds, chargebacks, and provider failures so teams can find, prove, replay, and safely review repairs for money-movement breaks.

CausalLedger is not a bank, payment processor, ledger replacement, AML/KYC platform, fraud scoring engine, credit risk engine, tax or legal advisor, investment advisor, ERP replacement, treasury management system, or autonomous finance agent.

The LLM never owns financial truth. LLM agents may investigate, summarize, and propose. LLM agents may not mutate money, approve repairs, delete evidence, post ledger entries, modify raw events, or override deterministic invariants.

## Product wedge

The wedge is high-stakes fintech incident response for money-movement breaks that are expensive to investigate manually and dangerous to repair casually. The first credible product surface is a deterministic incident workbench backed by replayable evidence and agentic investigation memos.

The wedge is not fraud scoring, AML/KYC, sanctions screening, credit risk, legal compliance autopilot, tax advice, investment advice, ERP replacement, treasury management, payment processing, or autonomous money movement. Those boundaries are recorded in `docs/domain/out-of-scope-domains.md`.

## Cost-saving value proposition

CausalLedger aims to reduce time spent tracing payment, ledger, settlement, bank, refund, chargeback, webhook, and provider failure discrepancies. The value proposition is fewer manual investigation hours, fewer unsafe repairs, faster audit evidence, and clearer incident ownership.

## Interview demo narrative

A strong future demo should show a simulated payment moving through its lifecycle while CausalLedger observes provider events, ledger postings, settlement rows, and bank lines as evidence arrives. The story should show the system first flagging a suspected break, updating the living causal timeline as more evidence appears, and producing an evidence-backed incident report with replay context and a safe repair proposal that still requires human approval.

A strong demo must not position CausalLedger as an AI accountant, autonomous finance agent, legal compliance autopilot, AI fraud engine, or AI that fixes money automatically.

This demo narrative is not implemented yet.

## Open-source moat

The open-source moat is trust: clear schemas, deterministic invariants, transparent safety boundaries, reproducible scenarios, and auditable benchmark results. The repo should make it obvious that agents assist investigation without owning financial truth.

## MoneyFlowBench as the star-worthy layer

MoneyFlowBench should become the public benchmark for agentic financial operations. It should measure root-cause quality, evidence precision, repair safety, hallucination resistance, latency, and token cost across realistic money-movement incident scenarios.
