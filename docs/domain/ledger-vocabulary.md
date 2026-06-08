# Ledger Vocabulary

## Purpose

The ledger vocabulary gives CausalLedger one shared language for describing internal financial records, double-entry expectations, evidence references, correction patterns, and unresolved ledger questions.

This document exists so future MoneyEvent schema work, double-entry ledger core work, deterministic invariants, incidents, causal graph modeling, replay, and repair planning can use the same terms without letting LLM output become financial truth.

No runtime implementation is defined or claimed in this document.

## Ledger scope

The ledger scope covers vocabulary for internal ledger records that may represent money movements, liabilities, clearing movements, revenue, fees, refunds, disputes, chargebacks, payouts, bank postings, reversals, and adjustments.

The scope is conceptual. It names ledger terms and boundaries so future implementation can be precise. It does not define account charts, posting rules, balancing algorithms, persistence, APIs, schemas, or validators.

## What this document defines

- Core ledger terms.
- Account category vocabulary.
- Double-entry vocabulary.
- Ledger state vocabulary.
- Conceptual ledger evidence examples.
- Correctness questions CausalLedger should ask about ledger records.
- Failure-pattern vocabulary for future deterministic checks.
- Boundaries with adjacent M01 domain areas.
- Boundaries for future M03, M04, M06, M07, M08, M09, and M12 work.

## What this document does not define

- Product functionality.
- MoneyEvent runtime logic or schema fields.
- Ledger runtime logic, chart-of-accounts implementation, balancing code, posting code, or balance calculation.
- Deterministic invariant algorithms.
- Incident creation logic or lifecycle states.
- Causal graph nodes, edges, traversal, ranking, or persistence.
- Replay session inputs, clocks, ordering, snapshots, or outputs.
- Repair planning, repair approval, or repair application.
- Settlement, reconciliation, evidence receipt, or human review vocabulary in full.
- UI, API, database, connector, GitHub Actions, CI, or external communication behavior.

## Relationship to payment lifecycle vocabulary

Payment lifecycle vocabulary belongs to M01.01 and is defined in `docs/domain/payment-lifecycle.md`.

Ledger vocabulary may reference payment lifecycle events, such as `payment_captured`, `refund_completed`, `chargeback_created`, `provider_payout_paid`, and `bank_posted`, because future ledger records should be explainable against lifecycle evidence.

Ledger records may arrive during the payment lifecycle and may update the future causal timeline before settlement is complete. Ledger correctness remains subject to deterministic checks and later reconciliation evidence; an early ledger record is not final financial truth by itself.

M01.02 does not redefine payment lifecycle phases and does not decide whether a lifecycle event should create a ledger posting.

## Relationship to future MoneyEvent schema

Future M03 MoneyEvent schema work may use ledger terms as candidate references, event classifications, source links, idempotency clues, or provenance fields.

M01.02 does not define MoneyEvent fields, validators, normalization rules, storage behavior, or idempotency algorithms. MoneyEvent truth must come from raw evidence, canonical events, deterministic transforms, and provenance, not from LLM narrative.

## Relationship to future double-entry ledger core

Future M04 Double-entry Ledger Core work may turn these terms into ledger primitives, posting rules, journal records, balance calculations, and deterministic checks.

M01.02 does not implement ledger primitives, post entries, mutate ledger state, calculate balances, or define a chart of accounts.

## Relationship to future invariant engine

Future M06 Invariant Engine work may convert ledger correctness questions and failure patterns into deterministic checks.

M01.02 does not define invariant algorithms, thresholds, severities, pass/fail outcomes, or fixtures. CausalLedger will not let an LLM decide whether a ledger transaction balances or whether a ledger record is financially correct.

## Relationship to future incident engine

Future M07 Incident Engine work may use ledger failure vocabulary to classify unresolved, duplicated, unsupported, contradictory, or unsafe ledger conditions.

M01.02 does not define incident states, ownership, severity, escalation, service-level rules, or closure behavior.

## Relationship to future causal graph

Future M08 Causal Graph work may connect ledger records to lifecycle events, source evidence, invariant failures, incidents, replay sessions, and repair proposals.

M01.02 does not define graph node types, edge types, traversal, ranking, root-cause scoring, or graph persistence. Future causal relationships must be evidence-backed or deterministically derived.

## Relationship to future replay engine

Future M09 Replay Engine work may use ledger vocabulary to reconstruct how ledger state changed over time from evidence-linked records.

M01.02 does not define replay inputs, replay clocks, ordering rules, snapshots, deterministic reconstruction algorithms, or replay output artifacts.

## Relationship to future repair planner

Future M12 Repair Planner work may propose reversals, compensating entries, suspense-account investigation, or manual review paths.

M01.02 does not approve repairs, apply repairs, mutate money, post entries, or authorize agents to change ledger state. Any future repair action that changes money or ledger state requires deterministic controls and human approval.

## Core ledger concepts

The core ledger vocabulary includes ledger, account, account type, ledger transaction, ledger entry, debit, credit, journal entry, posting, pending posting, posted transaction, reversal, adjustment, balance, balance snapshot, opening balance, closing balance, currency, minor units, idempotency key, immutable ledger record, source reference, evidence reference, transaction reference, and reconciliation reference.

| Term | Meaning |
| --- | --- |
| Ledger | A durable record of financial movements and balances. In CausalLedger vocabulary, a ledger is a future deterministic truth layer, not an LLM-authored narrative. |
| Account | A named ledger container used to classify entries and balances. M01.02 does not define a chart of accounts or account storage. |
| Account type | A category that describes how an account is interpreted, such as asset, liability, revenue, expense, clearing, suspense, or adjustment. Exact accounting treatment belongs to future M04 work. |
| Ledger transaction | A group of ledger entries intended to describe one balanced financial record. This vocabulary does not define transaction schema, persistence, or validation. |
| Ledger entry | One debit or credit line inside a ledger transaction, associated with an account, amount, currency, and references in future schema work. |
| Debit | One side of double-entry vocabulary. The effect of a debit depends on account type and must be handled by future deterministic rules, not LLM judgment. |
| Credit | The other side of double-entry vocabulary. The effect of a credit depends on account type and must be handled by future deterministic rules, not LLM judgment. |
| Journal entry | A ledger transaction or accounting record that groups related debits and credits. This term is vocabulary only and does not imply any implemented journal system. |
| Posting | The act or result of recording a ledger entry or ledger transaction to the ledger. Agents cannot post ledger entries. |
| Pending posting | A proposed, staged, or not-yet-final ledger posting. It is not financial truth until future deterministic controls and required approval make it valid. |
| Posted transaction | A ledger transaction accepted into the durable ledger by future deterministic posting rules. This document does not implement those rules. |
| Reversal | A ledger record that offsets or negates a previous posting while preserving the original record. Reversal vocabulary requires a reference to the original posting in future schema work. |
| Adjustment | A ledger record that corrects or compensates for a discrepancy with evidence and review context. Adjustment vocabulary does not authorize undocumented or LLM-approved corrections. |
| Balance | The net amount for an account at a point in time or over a period, computed by future deterministic ledger logic. |
| Balance snapshot | A recorded view of account balances at a specific time or replay boundary. M01.02 does not define snapshot generation. |
| Opening balance | The balance at the start of a period, import, replay session, or ledger window. Future work must define provenance for opening balances. |
| Closing balance | The balance at the end of a period, import, replay session, or ledger window. Future work must define deterministic calculation and evidence links. |
| Currency | The monetary currency associated with an amount, such as USD, GBP, or EUR. Future work must define supported currency representation. |
| Minor units | Integer-denominated smallest currency units, such as cents or pence, used to avoid floating-point ambiguity. Future work must define exact amount representation. |
| Idempotency key | A stable key used to prevent duplicate processing or duplicate postings for the same source-intended movement. M01.02 does not define key construction. |
| Immutable ledger record | A ledger record that should be preserved after creation. Mistakes should be corrected by reversals or compensating entries, not deletion or mutation of history. |
| Source reference | A pointer to the system, provider event, internal record, or process that caused or justified a ledger record. Future schema work must define exact fields. |
| Evidence reference | A pointer to raw evidence or an evidence bundle that supports a ledger record. Evidence receipt and preservation vocabulary belongs to M01.07. |
| Transaction reference | A stable reference that connects related lifecycle events, MoneyEvents, ledger transactions, entries, incidents, graph nodes, replay artifacts, or repair proposals. |
| Reconciliation reference | Boundary note only: a future reference used to connect ledger records with settlement, bank, or reconciliation artifacts. Full reconciliation vocabulary belongs to M01.04. |

## Account categories

These account categories are vocabulary only. They do not implement a chart of accounts, accounting rules, account identifiers, posting logic, or balance behavior.

The account category vocabulary includes cash account, bank account, cash clearing account, provider clearing account, customer liability account, merchant payable account, revenue account, fee expense account, refund liability or refund clearing account, dispute or chargeback account, suspense account, and adjustment account.

| Account category | Meaning |
| --- | --- |
| Cash account | Internal representation of immediately available funds or cash-like balance. |
| Bank account | Ledger category for funds reflected by bank statement or bank transaction evidence. |
| Cash clearing account | Temporary account category for cash movement that is expected to settle into another cash or bank account. |
| Provider clearing account | Temporary account category for provider-side captured funds, refunds, fees, disputes, payouts, or adjustments awaiting settlement or reconciliation. |
| Customer liability account | Liability category for amounts owed to customers, users, or stored-balance holders. |
| Merchant payable account | Liability category for amounts owed to merchants, platforms, sellers, or payees. |
| Revenue account | Category for earned revenue recognized by future accounting rules. |
| Fee expense account | Category for provider, network, bank, or operational fees. |
| Refund liability or refund clearing account | Category for expected or in-progress refund movement. |
| Dispute or chargeback account | Category for disputed, charged-back, reversed, or provisional dispute-related movement. |
| Suspense account | Temporary category for unresolved ledger movement that cannot yet be placed in a more specific account with sufficient evidence. |
| Adjustment account | Category for evidence-backed corrections, compensating entries, or manually reviewed ledger adjustments. |

## Double-entry vocabulary

Every balanced ledger transaction has ledger entries. A balanced transaction is expected to have total debits equal total credits in the same currency and amount representation.

Debits and credits are vocabulary for future deterministic validation. CausalLedger will not let the LLM decide whether a ledger transaction balances. Future validation must be deterministic, reproducible, and evidence-linked.

Ledger records should not be deleted to fix mistakes. Corrections should use reversals or compensating entries so the original record remains visible and auditable.

This section does not implement balancing logic, define account effects, calculate balances, define currency conversion, or authorize ledger posting.

## Ledger state vocabulary

| State | Meaning | Terminal vocabulary note |
| --- | --- | --- |
| `pending` | A posting, transaction, or ledger movement is proposed, staged, imported, or awaiting deterministic validation and approval. | Non-terminal. |
| `posted` | A ledger transaction has been accepted into the durable ledger by future deterministic rules. | Non-terminal for later reversal, adjustment, dispute, or reconciliation context. |
| `reversed` | A later ledger record offsets or negates the original posting while preserving history. | Terminal for the reversal action, but not necessarily for the broader incident or lifecycle. |
| `adjusted` | A correction or compensating entry has been recorded with evidence context. | Terminal for the adjustment record once posted, but not necessarily for the broader discrepancy. |
| `voided` | A pending or not-yet-posted record is cancelled before it becomes durable financial history. | Terminal for that pending record. |
| `rejected` | A proposed posting or transaction failed future deterministic validation or approval and was not posted. | Terminal for that rejected attempt. |
| `disputed` | A ledger movement is under dispute, chargeback review, or disagreement with provider, bank, or internal evidence. | Non-terminal. |
| `unresolved` | Available evidence is missing, duplicated, contradictory, unsupported, or not yet connected to the ledger movement. | Non-terminal unless a future incident or human review process explicitly closes it as unresolved. |

These states are vocabulary only. M01.02 does not define a state machine, transition rules, database fields, validators, or incident lifecycle behavior.

## Ledger evidence examples

These examples are conceptual and do not define schemas, posting rules, or required automation.

| Evidence example | Possible future ledger reference |
| --- | --- |
| Provider payment captured | Possible ledger posting reference for captured funds and provider clearing movement. |
| Refund completed | Possible refund ledger entry reference connected to the original captured payment. |
| Chargeback created | Possible chargeback ledger reference connected to dispute and provider evidence. |
| Payout paid | Possible provider clearing movement reference connected to payout evidence. |
| Bank posted | Possible bank account movement reference connected to bank statement evidence. |
| Manual adjustment | Possible adjustment entry reference connected to evidence, operator review, and future approval context. |

## Questions CausalLedger asks about ledger records

- Does the ledger transaction balance?
- Does every ledger posting have a source reference?
- Did one provider event create more than one financial posting?
- Does a reversal reference the original posting?
- Was a correction recorded without deleting history?
- Does a ledger entry point to the correct lifecycle event?
- Is a ledger movement unresolved, duplicated, unsupported, or contradictory?
- Are amounts represented in currency and minor units without ambiguity?
- Does a pending posting remain pending longer than expected by future policy?
- Does a suspense account balance indicate unresolved movement that needs investigation?

These questions are future deterministic-check candidates, not implemented invariants.

## Ledger failure patterns

| Pattern | Ledger meaning |
| --- | --- |
| Unbalanced transaction | Ledger entries in one transaction do not have equal total debits and credits. |
| Duplicate posting | More than one posting appears for the same source-intended movement or idempotency key. |
| Missing posting | Expected ledger movement is absent for a supported source event or internal transaction reference. |
| Unsupported posting | A ledger posting exists without sufficient source reference or evidence reference. |
| Orphan reversal | A reversal record exists without a traceable original posting. |
| Reversal without original | A reversal attempts to offset a posting that cannot be found or was never posted. |
| Adjustment without evidence | An adjustment exists without evidence, review context, or a source reference. |
| Deleted or mutated ledger evidence | Source or evidence records supporting a ledger movement are removed or altered instead of preserved. |
| Currency mismatch | Related ledger entries, source events, settlement records, or bank records disagree about currency. |
| Rounding mismatch | Related amounts differ because of unclear precision, decimal, or minor-unit handling. |
| Clearing account drift | Clearing account balances do not reduce as expected after settlement, payout, refund, or bank posting touchpoints. |
| Suspense account accumulation | Unresolved movement collects in suspense without timely investigation or evidence resolution. |
| Liability balance mismatch | Customer, merchant, or other liability balances do not align with supported lifecycle and ledger evidence. |
| Ledger lifecycle divergence | Ledger state disagrees with payment lifecycle state, such as a posted payment without matching capture evidence or a refund lifecycle without ledger movement. |

These are vocabulary terms only, not implemented invariants.

## Boundaries with future M01 areas

- Payment lifecycle vocabulary belongs to M01.01.
- Settlement vocabulary belongs to M01.03.
- Reconciliation vocabulary belongs to M01.04.
- Incident vocabulary belongs to M01.05.
- Safe and unsafe repair vocabulary belongs to M01.06.
- Evidence receipt model belongs to M01.07.
- Human review states belong to M01.08.

M01.02 may reference those areas only as boundaries or future dependencies. It does not fully define them here.
