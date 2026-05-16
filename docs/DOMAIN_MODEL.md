# Domain Model

## Status

M01 domain index. This file tracks which domain areas are defined and which remain intentionally undefined until their scoped M01 submilestones.

The domain model is not complete. Payment lifecycle vocabulary is defined in M01.01, ledger vocabulary is defined in M01.02, settlement vocabulary is defined in M01.03, and remaining M01 domain areas are not yet defined.

## Product thesis

CausalLedger is an agentic financial incident-response and money-movement digital twin for fintech systems. It helps fintech teams find, prove, replay, and safely repair money-movement breaks across payments, ledgers, settlement files, bank statements, refunds, chargebacks, webhooks, and provider failures.

CausalLedger is not a payment processor, not a ledger replacement, not a generic reconciliation tool, not a fraud platform, not an AML platform, and not an autonomous finance agent.

The LLM never owns financial truth. LLM agents may investigate, summarize, and propose. LLM agents may not mutate money, approve repairs, delete evidence, post ledger entries, modify raw events, or override deterministic invariants.

## Defined in M01

| Domain area | Status | Source |
| --- | --- | --- |
| Payment lifecycle | Defined in M01.01 | [docs/domain/payment-lifecycle.md](domain/payment-lifecycle.md) |
| Ledger vocabulary | Defined in M01.02 | [docs/domain/ledger-vocabulary.md](domain/ledger-vocabulary.md) |
| Settlement vocabulary | Defined in M01.03 | [docs/domain/settlement-vocabulary.md](domain/settlement-vocabulary.md) |

## Domain documentation boundary

Domain documents define vocabulary, scope, and boundaries. They do not implement runtime behavior, schemas, APIs, databases, ledger logic, invariants, incident logic, causal graph traversal, replay, agent runtime, repair application, UI, connectors, GitHub Actions, or CI workflows.

## Remaining M01 domain areas not yet defined

- Reconciliation vocabulary.
- Incident vocabulary.
- Safe and unsafe repairs.
- Evidence receipt model.
- Human review states.
- Out-of-scope domains.

## Guardrails for M01

M01 must keep financial truth deterministic and must not treat LLM output as evidence. Any future domain term that implies money mutation, ledger posting, evidence deletion, repair approval, or raw event modification must explicitly require deterministic controls and human approval.
