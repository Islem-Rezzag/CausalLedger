# Domain Model

## Status

M01 domain index. This file tracks which domain areas are defined and which remain intentionally undefined until their scoped M01 submilestones.

The domain model is not complete. Payment lifecycle vocabulary is defined in M01.01, ledger vocabulary is defined in M01.02, settlement vocabulary is defined in M01.03, reconciliation vocabulary is defined in M01.04, incident vocabulary is defined in M01.05, safe and unsafe repair vocabulary is defined in M01.06, evidence receipt model is defined in M01.07, human review states are defined in M01.08, out-of-scope domains are defined in M01.09, and remaining M01 domain areas are not yet finalized.

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
| Reconciliation vocabulary | Defined in M01.04 | [docs/domain/reconciliation-vocabulary.md](domain/reconciliation-vocabulary.md) |
| Incident vocabulary | Defined in M01.05 | [docs/domain/incident-vocabulary.md](domain/incident-vocabulary.md) |
| Repair vocabulary | Defined in M01.06 | [docs/domain/repair-vocabulary.md](domain/repair-vocabulary.md) |
| Evidence receipt model | Defined in M01.07 | [docs/domain/evidence-receipt-model.md](domain/evidence-receipt-model.md) |
| Human review states | Defined in M01.08 | [docs/domain/human-review-states.md](domain/human-review-states.md) |
| Out-of-scope domains | Defined in M01.09 | [docs/domain/out-of-scope-domains.md](domain/out-of-scope-domains.md) |

## Domain documentation boundary

Domain documents define vocabulary, scope, and boundaries. They do not implement runtime behavior, schemas, APIs, databases, ledger logic, invariants, incident logic, causal graph traversal, replay, agent runtime, repair application, UI, connectors, GitHub Actions, or CI workflows.

## Remaining M01 areas not yet finalized

- M01.10 `DOMAIN_MODEL.md` finalization.
- M01.11 reliability documentation finalization.
- M01.12 threat model finalization.
- M01.13 domain consistency QA.

## Guardrails for M01

M01 must keep financial truth deterministic and must not treat LLM output as evidence. Any future domain term that implies money mutation, ledger posting, evidence deletion, repair approval, or raw event modification must explicitly require deterministic controls and human approval.
