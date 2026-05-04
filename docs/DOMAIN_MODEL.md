# Domain Model

## Status

Placeholder for M01 Domain model and scope freeze. This file intentionally does not define the full domain model yet.

## Product thesis

CausalLedger is an agentic financial incident-response and money-movement digital twin for fintech systems. It helps fintech teams find, prove, replay, and safely repair money-movement breaks across payments, ledgers, settlement files, bank statements, refunds, chargebacks, webhooks, and provider failures.

CausalLedger is not a payment processor, not a ledger replacement, not a generic reconciliation tool, not a fraud platform, not an AML platform, and not an autonomous finance agent.

The LLM never owns financial truth. LLM agents may investigate, summarize, and propose. LLM agents may not mutate money, approve repairs, delete evidence, post ledger entries, modify raw events, or override deterministic invariants.

## Domain areas to define in M01

- Payment lifecycle.
- Ledger vocabulary.
- Settlement vocabulary.
- Reconciliation vocabulary.
- Incident vocabulary.
- Safe and unsafe repairs.
- Evidence receipt model.
- Human review states.
- Out-of-scope domains.

## Guardrails for M01

M01 must keep financial truth deterministic and must not treat LLM output as evidence. Any future domain term that implies money mutation, ledger posting, evidence deletion, repair approval, or raw event modification must explicitly require deterministic controls and human approval.
