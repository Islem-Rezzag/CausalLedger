# MoneyEvent Conceptual Contract

## Status

This is the M03.01 conceptual contract for canonical MoneyEvents. It is documentation only and not runtime implementation.

It does not define TypeScript types, runtime schemas, parsers, validators, normalizers, storage, fixtures, simulator data, database tables, migrations, API routes, product UI, ledger posting, invariants, incidents, graph behavior, replay, repair behavior, agent tools, or money mutation.

## Purpose

A canonical MoneyEvent is the future evidence-derived representation CausalLedger will use to describe a money-movement lifecycle occurrence in a source-neutral way.

MoneyEvent exists so later systems can reason over provider events, settlement rows, bank lines, ledger references, refunds, chargebacks, and related records without making every downstream layer depend on source-specific payload shapes.

Future layers that depend on this concept include:

- ledger mapping and posting proposals;
- deterministic invariants;
- incident creation and triage;
- causal graph relationships;
- replay sessions;
- repair proposal planning;
- human review;
- agent investigation;
- MoneyFlowBench scenarios.

The contract is intentionally conceptual first. Later M03 submilestones may turn parts of it into code, but only with scoped deterministic validation.

## Non-Goals

A MoneyEvent is not a ledger entry. A ledger entry is a future accounting record with debit or credit semantics; a MoneyEvent describes an observed or derived lifecycle occurrence before ledger behavior.

A MoneyEvent is not a payment provider event. Provider events and webhooks are source evidence with provider-specific fields, delivery semantics, retries, and payloads.

A MoneyEvent is not a bank statement line. Bank lines are cash-side evidence and may confirm, contradict, lag, or only partially match provider or settlement evidence.

A MoneyEvent is not a settlement row. Settlement rows are report evidence and may contain fees, reserves, adjustments, payout references, timing differences, or bundled movements.

A MoneyEvent is not an incident. Incidents are future investigation records created from deterministic failures, conflicts, gaps, or unresolved states.

A MoneyEvent is not a repair. Repairs are future proposals or reviewed actions with validators, rollback planning, idempotency, replay where needed, and human approval.

A MoneyEvent is not an LLM explanation. LLM output may explain or propose, but it cannot create evidence, financial truth, validation results, replay output, or human approval.

## Core Semantic Fields

These are conceptual fields, not a schema:

| Concept | Meaning |
| --- | --- |
| Event identity | A future durable identity for the canonical event, expected to follow the ADR-0008 `evt_` direction when implemented. |
| Source identity | The source system, file, provider, internal system, or simulator context that supplied the source evidence. |
| Source type | The category of source evidence, such as provider webhook, provider API record, settlement file, bank statement, internal record, or controlled simulator output. |
| Evidence references | References to evidence receipts, raw payload hashes, source records, file rows, or receipt identifiers that support the event. |
| Provenance | How the event was derived, when it was observed, what source record or receipt it came from, and what transformation boundary produced it. |
| Amount | Money amount in integer minor units only. |
| Currency | ISO 4217 currency code. Currency is required wherever an amount is present. |
| Actor or account party | The merchant, customer, platform, provider, account, counterparty, or other role involved when evidence supports that relationship. |
| Object or financial instrument reference | The payment, refund, chargeback, payout, settlement row, bank line, ledger reference, or other financial object the event concerns. |
| Event kind | The lifecycle meaning, such as provider payment captured, refund created, chargeback opened, payout row observed, or bank deposit observed. |
| Event time | The source event time asserted by the source, when available. |
| Observed time | The time CausalLedger observed, ingested, received, or recorded the source evidence. |
| Idempotency key | A future deterministic key used to prevent duplicate source deliveries or replayed evidence from creating duplicate MoneyEvents. |
| Causation or correlation references | References that link related events, such as original payment, refund, chargeback, settlement, payout, or bank evidence. |
| Uncertainty and confidence boundaries | Explicit representation of missing, delayed, partial, ambiguous, conflicting, or provider-only evidence. |
| Raw evidence locator or receipt reference | A pointer to the source material or evidence receipt. The MoneyEvent does not replace raw evidence. |

## Lifecycle Meaning

Lifecycle labels describe the state of a canonical event artifact, not product behavior yet:

- Observed: source evidence was seen or received, but canonical interpretation may still be incomplete.
- Normalized: future deterministic transformation has mapped source-specific evidence into canonical conceptual fields.
- Validated: future deterministic checks have accepted the event structure and required references for the scoped rule set.
- Rejected: future deterministic checks have rejected the candidate event, with reasons and evidence references.
- Superseded: a later event or corrected source record changes the preferred canonical interpretation while preserving prior evidence.
- Reversed or adjusted: later evidence indicates a previous money movement was reversed, adjusted, charged back, refunded, or otherwise corrected.
- Unresolved or uncertain: evidence is incomplete, conflicting, delayed, ambiguous, or insufficient for a stronger lifecycle conclusion.

These lifecycle meanings do not create ledger entries, incidents, repairs, or human approvals.

## Evidence Rules

MoneyEvents must be derived from evidence.

Raw evidence remains the source material. A MoneyEvent may normalize or reference source material, but it must not replace source payloads, evidence receipts, provider records, settlement files, bank statements, or audit records.

A MoneyEvent must cite evidence receipts, source references, raw evidence locators, source row references, hashes, or comparable future evidence identifiers when they exist.

LLM-generated text cannot create financial truth. An LLM may summarize a MoneyEvent or explain uncertainty, but it cannot create the event, validate it, approve it, or resolve unsupported evidence gaps.

If evidence is missing, contradictory, delayed, redacted, partial, or stale, the MoneyEvent must preserve that uncertainty instead of hiding it.

## Idempotency and Deduplication

Repeated provider events should conceptually map to the same MoneyEvent when the evidence describes the same source occurrence and the idempotency key matches.

Duplicate evidence differs from duplicate money movement. A provider may retry a webhook several times for one capture; that is duplicate evidence delivery, not necessarily multiple captures. A settlement file may contain distinct rows for separate fees, refunds, or adjustments; those are not duplicates merely because they reference the same payment.

Idempotency key design matters because mistakes here can either duplicate money movement or collapse distinct lifecycle events. Future implementation must be deterministic and source-aware.

Idempotency should consider source identity, source type, source record identity, object reference, event kind, amount, currency, and relevant event time when evidence supports those fields.

## Time Semantics

Source event time is the time asserted by the source system for the lifecycle occurrence.

Observed time is when CausalLedger received, ingested, or recorded the source evidence.

Settlement or bank-posting time is separate when relevant. A captured payment, settlement row, payout, and bank deposit may all have different times and may arrive out of order.

Delayed evidence must remain explicit. Later settlement or bank evidence can confirm, dismiss, amend, or leave unresolved an earlier provider-only interpretation.

Future code must not guess ordering from wall-clock arrival alone when source timestamps, settlement dates, bank posting dates, and receipt times disagree.

## Money Semantics

Amounts use integer minor units only.

Currencies use ISO 4217 codes and must be present with amounts.

Floats are forbidden for money.

Signed amount versus directional amount must be explicitly planned, not guessed. For example, a refund, chargeback, fee, or payout may be represented by direction, sign, event kind, or accounting side in future work, but M03.01 does not choose a runtime encoding.

Amount and currency semantics must be deterministic because later ledger, invariant, replay, repair, and benchmark work depends on them.

## Uncertainty

Uncertainty is a first-class boundary:

- missing evidence means an expected source, receipt, row, or confirmation is unavailable;
- conflicting evidence means two sources disagree about amount, currency, status, timing, object identity, or lifecycle meaning;
- partial evidence means source material supports only part of the event;
- provider-only evidence before settlement or bank confirmation means the event is not yet cash-confirmed;
- delayed evidence means later source material may update or supersede the current interpretation.

Uncertainty must remain explicit. It must not be collapsed into a confident LLM narrative, silent default, or hidden implementation choice.

## Relationship to Future Layers

Ledger: MoneyEvents may later inform ledger transaction construction, but they are not ledger entries and do not post money.

Invariants: deterministic checks may later inspect MoneyEvents for idempotency, lifecycle consistency, currency consistency, duplicate evidence, missing evidence, or conflicts.

Incidents: incidents may later be opened from deterministic failures or unresolved evidence conflicts. A MoneyEvent itself is not an incident.

Graph: causal graph work may later link MoneyEvents to evidence, ledger entries, payouts, bank lines, incidents, replay sessions, and repair proposals.

Replay: replay may later reconstruct event order from evidence receipts, source event time, observed time, settlement time, and deterministic rules.

Repair: repair work may later propose corrections that reference MoneyEvents, but a MoneyEvent cannot approve or apply a repair.

Human review: reviewers may later inspect MoneyEvents with evidence references, uncertainty, and deterministic validation results. Human approval remains separate.

Agent investigation: agents may later summarize MoneyEvents and evidence bundles through read-only tools. Agent output remains advisory.

## Conceptual Examples

Provider payment captured: a provider webhook says payment `pay_123` was captured for 1250 minor units in GBP at a source event time. The future MoneyEvent should reference the webhook evidence receipt, provider source identity, object reference, amount, currency, capture kind, source event time, observed time, and idempotency key. It should not post a ledger entry.

Refund created: a provider API record says a refund was created for an original payment. The future MoneyEvent should preserve the original payment reference, refund reference, source evidence, amount, currency, source and observed times, and whether bank or settlement confirmation is still missing.

Chargeback opened: a dispute or chargeback source record says a chargeback was opened. The future MoneyEvent should reference the provider evidence and affected object while preserving uncertainty about final outcome, fees, settlement impact, and bank impact until later evidence arrives.

Settlement payout row: a settlement file row lists a payout or payout component. The future MoneyEvent should reference the file, row identity, source identity, amount, currency, payout or settlement object, file date, observed time, and any relationship to captured payments, refunds, fees, reserves, or chargebacks.

Bank deposit line: a bank statement line shows a deposit. The future MoneyEvent should reference the bank evidence receipt and bank posting time while keeping the provider payout match explicit or uncertain.

Duplicate webhook: two provider webhooks carry the same provider event identifier and describe the same capture. The future idempotency key should collapse duplicate delivery into one canonical occurrence while preserving both evidence receipts if both are retained.

Conflicting provider and bank evidence: provider evidence says a payout was paid for 100000 minor units in GBP, but bank evidence shows a different posted amount or date. The MoneyEvent layer should preserve both references and the conflict. It must not let an LLM choose the final truth.

## Deferred Decisions

The exact runtime schema, TypeScript type names, field optionality, validation rules, normalizer behavior, parser behavior, fixture shape, storage model, and database representation are deferred to later M03 submilestones.

The signed-versus-directional amount model is deferred because it affects ledger mapping, invariants, replay, and repair semantics.

The lifecycle taxonomy is intentionally conceptual here. Later submilestones must decide which statuses are runtime fields, validation outputs, or incident states.

The idempotency key formula is deferred to deterministic implementation work. M03.01 only records the properties it must preserve.
