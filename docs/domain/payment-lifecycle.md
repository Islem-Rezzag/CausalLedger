# Payment Lifecycle

## Purpose

The payment lifecycle model gives CausalLedger one vocabulary for describing how a payment moves from an initial request through provider events, refunds, disputes, payout touchpoints, bank posting touchpoints, and reconciliation touchpoints.

This document exists so future MoneyEvent schema work, simulators, invariant definitions, incident classification, causal graph modeling, and replay can use the same terms without letting LLM output become financial truth.

No runtime implementation is defined or claimed in this document.

## Lifecycle scope

The lifecycle starts when a payment is requested by a merchant, platform, user, or system. It follows externally visible and internally referenced payment progress until the lifecycle is completed, failed, cancelled, reversed, disputed, paid out, bank-posted, reconciled, or left unresolved.

The lifecycle covers payment movement vocabulary only. It can name lifecycle touchpoints for ledger, settlement, bank posting, and reconciliation, but it does not define those domains in full.

## Live lifecycle observation vs historical replay

CausalLedger may process lifecycle evidence as it arrives or replay it later from stored evidence. Both paths should use the same future MoneyEvent, invariant, incident, graph, replay, evidence, and repair-safety concepts.

Live lifecycle observation can flag suspected breaks while evidence is still incomplete. Later settlement files, bank evidence, ledger records, refund records, chargeback records, or provider evidence can confirm a break, dismiss a suspected break, resolve it after delayed evidence arrives, or keep it unresolved when evidence remains missing or contradictory.

This section is planning vocabulary only. It does not implement live ingestion, streaming, replay, incident creation, or timeline updates.

## What this document defines

- Payment lifecycle actors.
- Payment lifecycle objects.
- Payment lifecycle phases and state names.
- Normal payment path vocabulary.
- Failure and exception path vocabulary.
- Terminal and non-terminal lifecycle states.
- Provider event perspective.
- Live lifecycle observation vs historical replay.
- Boundary notes for internal ledger, settlement, and reconciliation perspectives.
- Evidence and uncertainty examples.
- Correctness questions CausalLedger should ask about payment lifecycle.
- Failure-pattern vocabulary for future deterministic checks.
- Boundaries for future M03, M06, M07, M08, and M09 work.

## What this document does not define

- Ledger vocabulary; that belongs to M01.02.
- Settlement vocabulary; that belongs to M01.03.
- Reconciliation vocabulary; that belongs to M01.04.
- Incident vocabulary; that belongs to M01.05.
- Safe and unsafe repair vocabulary; that belongs to M01.06.
- Evidence receipt vocabulary; that belongs to M01.07.
- Human review states; that belongs to M01.08.
- MoneyEvent schema fields, runtime normalization, validators, or package code.
- Ledger entries, account balances, posting rules, or double-entry behavior.
- Deterministic invariant logic.
- Incident creation logic.
- Causal graph nodes, edges, traversal, or ranking.
- Replay session logic.
- Repair planning or repair approval.
- UI, API, database, connector, or CI behavior.

## Lifecycle actors

| Actor | Lifecycle role |
| --- | --- |
| Payer | Party whose payment instrument or account is charged, refunded, or disputed. |
| Merchant or platform | Party requesting the payment and receiving payment-provider outcomes. |
| Payment provider | External processor, gateway, acquirer, or platform that emits provider events about authorization, capture, refund, dispute, chargeback, payout, and failure states. |
| Issuer or payment method network | External party that can approve, decline, expire, dispute, or reverse payment activity through provider-visible events. |
| Internal system | The future CausalLedger-observed application or ledger system that records internal references to payment progress. |
| Bank | External financial institution where payout or bank posting touchpoints may be observed. |
| Human operator | User who reviews evidence and approves future repair actions outside this lifecycle vocabulary. |

## Lifecycle objects

| Object | Lifecycle meaning |
| --- | --- |
| Payment request | Initial intent to charge or collect funds. |
| Authorization | Provider or network response that reserves or approves funds for possible capture. |
| Capture | Provider-visible step that turns an authorization into a charge or payable amount. |
| Cancellation or void | Provider-visible step that stops or reverses an uncaptured authorization path. |
| Refund | Provider-visible return of funds after capture. |
| Dispute | Provider-visible challenge to a captured payment. |
| Chargeback | Provider-visible money-movement consequence of a dispute. |
| Provider payout | Provider-side payout batch, transfer, or payout item that can include captured payments, refunds, disputes, fees, or adjustments. This is only a lifecycle touchpoint in M01.01. |
| Bank posting | Bank-side statement or transaction line that corresponds to provider payout movement. This is only a lifecycle touchpoint in M01.01. |
| Lifecycle reference | Stable reference used to connect provider events, internal records, payouts, bank lines, evidence, and future MoneyEvents. This document does not define the schema for that reference. |

## Lifecycle phases

| Phase | Meaning | State type |
| --- | --- | --- |
| `payment_requested` | A payment attempt has been initiated and awaits provider outcome. | Non-terminal |
| `payment_authorized` | The provider or network has approved or reserved funds for possible capture. | Non-terminal |
| `authorization_failed` | Authorization was declined or failed before capture. | Terminal for the authorization attempt |
| `authorization_expired` | Authorization was approved but expired before capture or cancellation. | Terminal for the authorization path |
| `payment_captured` | Authorized funds were captured or an immediate-charge payment succeeded. | Non-terminal for the full lifecycle |
| `capture_failed` | Capture failed after a request or authorization. | Terminal for the capture attempt unless retried under a future defined lifecycle |
| `payment_voided_or_cancelled` | The payment or authorization was voided or cancelled before capture completion. | Terminal for the payment attempt |
| `refund_requested` | A refund was requested for a captured payment. | Non-terminal |
| `refund_processing` | A refund is accepted or in progress but not yet completed or failed. | Non-terminal |
| `refund_completed` | Refund completion is visible from provider evidence. | Terminal for the refund path |
| `refund_failed` | Refund failure is visible from provider evidence. | Terminal for the refund path unless retried under a future defined lifecycle |
| `dispute_opened` | A payer, issuer, provider, or network opened a dispute against a captured payment. | Non-terminal |
| `dispute_resolved` | A dispute reached a provider-visible resolution. | Terminal for the dispute path |
| `chargeback_created` | A chargeback was created from a dispute or network process. | Non-terminal until resolved, reversed, or reconciled in later domain work |
| `chargeback_reversed` | A chargeback was reversed by provider-visible evidence. | Terminal for the chargeback reversal path |
| `provider_payout_created` | Provider created a payout, transfer, or payout item touching the lifecycle. | Non-terminal lifecycle touchpoint |
| `provider_payout_paid` | Provider marked a payout, transfer, or payout item as paid. | Non-terminal lifecycle touchpoint |
| `provider_payout_failed` | Provider marked a payout, transfer, or payout item as failed. | Exception touchpoint |
| `bank_posted` | Bank statement or bank transaction evidence appears for the related movement. | Non-terminal lifecycle touchpoint |
| `lifecycle_reconciled` | Available lifecycle evidence is sufficient to consider the lifecycle closed for future reconciliation logic. | Terminal lifecycle state |
| `lifecycle_unresolved` | Expected evidence is missing, duplicated, delayed, contradictory, ambiguous, or not yet connected. | Non-terminal or terminal depending on future incident and review vocabulary |

Payout, bank posting, and reconciliation terms are included only as lifecycle touchpoints. M01.01 does not define settlement files, settlement math, payout accounting, bank-statement matching, or reconciliation logic.

## Normal payment path

The default successful payment path is:

`payment_requested -> payment_authorized -> payment_captured -> provider_payout_created -> provider_payout_paid -> bank_posted -> lifecycle_reconciled`

This path names expected lifecycle progression only. It does not say how future code must store, match, post, settle, or reconcile the payment.

## Failure and exception paths

| Path | Lifecycle sequence |
| --- | --- |
| Authorization failure path | `payment_requested -> authorization_failed` |
| Authorization expiry path | `payment_requested -> payment_authorized -> authorization_expired` |
| Capture failure path | `payment_requested -> payment_authorized -> capture_failed` |
| Cancellation or void path | `payment_requested -> payment_authorized -> payment_voided_or_cancelled` |
| Refund path | `payment_captured -> refund_requested -> refund_processing -> refund_completed` |
| Failed refund path | `payment_captured -> refund_requested -> refund_failed` |
| Dispute and chargeback path | `payment_captured -> dispute_opened -> chargeback_created -> dispute_resolved` |
| Chargeback reversal path | `payment_captured -> dispute_opened -> chargeback_created -> chargeback_reversed` |
| Payout failure path | `payment_captured -> provider_payout_created -> provider_payout_failed` |
| Unresolved lifecycle path | Any expected next event is missing, duplicated, delayed, contradictory, ambiguous, or not connected to the expected lifecycle reference. |

## Terminal states

Terminal states end a lifecycle path unless future evidence opens a separate follow-up path or future domain work defines a lawful continuation:

- `authorization_failed`
- `authorization_expired`
- `capture_failed`
- `payment_voided_or_cancelled`
- `refund_completed`
- `refund_failed`
- `dispute_resolved`
- `chargeback_reversed`
- `lifecycle_reconciled`

`lifecycle_unresolved` is terminal only when a future human review or deterministic incident process closes the investigation as unresolved. M01.01 does not define those review or incident states.

## Non-terminal states

Non-terminal states expect one or more future lifecycle events, evidence records, or review decisions:

- `payment_requested`
- `payment_authorized`
- `payment_captured`
- `refund_requested`
- `refund_processing`
- `dispute_opened`
- `chargeback_created`
- `provider_payout_created`
- `provider_payout_paid`
- `provider_payout_failed`
- `bank_posted`
- `lifecycle_unresolved` when investigation remains open

## Provider event perspective

From the provider perspective, lifecycle state is observed through provider events, webhook payloads, API records, dashboard exports, payout reports, dispute records, refund records, and chargeback records.

Provider events are evidence inputs, not final truth by themselves. Future CausalLedger work must preserve source identity, provider event IDs, timestamps, payload references, and idempotency clues so duplicated, delayed, out-of-order, or contradictory provider events can be handled deterministically.

## Internal ledger perspective

Internal ledger records may disagree with provider events, but M01.01 does not define ledger vocabulary or posting rules. The only lifecycle boundary note is that internal records should be connectable to payment lifecycle references so future M01.02 and M04 work can compare internal state against provider-observed lifecycle state.

Agents cannot post ledger entries or treat internal ledger descriptions as financial truth without deterministic ledger checks.

## Settlement perspective

Provider payout states are lifecycle touchpoints only. M01.01 does not define settlement batches, settlement-file columns, gross and net settlement math, fees, reserves, adjustments, payout accounting, or provider-specific settlement semantics. Those belong to M01.03 and later implementation milestones.

## Reconciliation perspective

`bank_posted` and `lifecycle_reconciled` are lifecycle touchpoints only. M01.01 does not define bank matching, reconciliation tolerances, break categories, balancing logic, or close rules. Those belong to M01.04 and later implementation milestones.

## Lifecycle evidence examples

Examples of evidence that may later support lifecycle reconstruction:

- Payment-provider webhook payload for authorization success or failure.
- Payment-provider API record for capture success or failure.
- Refund creation and refund outcome event.
- Dispute and chargeback records.
- Provider payout report with payout ID, payout status, and related payment reference.
- Bank statement line or bank transaction export that appears to reference provider payout movement.
- Internal order, checkout, payment attempt, or ledger reference linked to a provider payment ID.
- Audit note or operator memo, treated as context rather than deterministic truth.

M01.01 names evidence examples only. Evidence receipt, preservation, receipts, hashes, bundle structure, and provenance requirements belong to M01.07 and later implementation milestones.

## Lifecycle uncertainty examples

Lifecycle uncertainty can appear when:

- A provider retries a webhook and sends the same event more than once.
- A capture event arrives before an authorization event.
- A refund record references a payment that is not visible in available evidence.
- A dispute opens after the payment appears reconciled.
- A provider payout is paid but no related bank line is visible yet.
- A bank line appears before the provider payout report is available.
- Provider status and internal state disagree.
- Timestamps from different systems conflict.
- A lifecycle reference is absent, malformed, duplicated, or reused.
- A human note asserts a state that is not supported by raw evidence.

Uncertainty must remain explicit. LLM explanations can describe uncertainty, but they cannot resolve it as financial truth.

## Questions CausalLedger asks about payment lifecycle

- Did the payment reach the expected next state?
- Did a provider event arrive more than once?
- Did events arrive out of order?
- Did the internal state disagree with provider state?
- Did a terminal state occur without the expected prior evidence?
- Did a refund, dispute, payout, or bank line appear without a matching lifecycle reference?
- Is the lifecycle complete, incomplete, contradictory, or unresolved?
- Is there enough evidence to distinguish delayed evidence from missing evidence?
- Is a lifecycle reference stable enough for future MoneyEvent, incident, graph, and replay work?

## Lifecycle failure patterns

| Pattern | Lifecycle meaning |
| --- | --- |
| Duplicate provider event | Same provider event or equivalent status appears more than once for the same lifecycle reference. |
| Missing provider event | Expected provider evidence for a transition is absent. |
| Delayed provider event | Expected evidence arrives after internal state or downstream touchpoints already advanced. |
| Out-of-order provider event | Later lifecycle evidence arrives before expected earlier evidence. |
| Contradictory provider state | Provider evidence contains incompatible statuses for the same lifecycle reference. |
| Internal state divergence | Internal records describe a lifecycle state that conflicts with provider evidence. |
| Orphan refund | Refund evidence appears without a matching captured payment lifecycle reference. |
| Orphan dispute | Dispute or chargeback evidence appears without a matching captured payment lifecycle reference. |
| Payout mismatch touchpoint | Provider payout evidence does not align with expected captured, refunded, disputed, or charged-back lifecycle references. |
| Bank posting mismatch touchpoint | Bank evidence does not align with expected provider payout lifecycle references. |
| Unresolved lifecycle | Available evidence cannot currently support a complete, non-contradictory lifecycle path. |

These are lifecycle vocabulary terms only, not implemented invariants.

## Boundaries for future M03 MoneyEvent schema

M03 may use payment lifecycle terms as candidate event types, statuses, or domain references. M03 must still define exact schema fields, source references, idempotency keys, timestamps, actors, amounts, currency, provenance, and immutability rules.

M01.01 does not define a MoneyEvent schema and does not modify raw events.

## Boundaries for future M06 invariants

M06 may turn lifecycle questions and failure patterns into deterministic invariant checks. This document does not define invariant algorithms, thresholds, severity, pass/fail rules, or edge-case fixtures.

Invariant results must be deterministic and cannot be replaced by LLM judgment.

## Boundaries for future M07 incidents

M07 may classify unresolved, contradictory, missing, duplicated, orphaned, or divergent lifecycle patterns as incident inputs. This document does not define incident states, ownership, severity, escalation, service-level rules, or closure.

Incident creation must come from deterministic evidence and invariant outcomes, not from narrative confidence.

## Boundaries for future M08 causal graph

M08 may model lifecycle references as graph nodes or evidence-linked relationships. This document does not define graph node types, edge types, traversal, ranking, root-cause scoring, or graph persistence.

Every future causal relationship must be supported by evidence or deterministic derivation, and uncertainty must be represented explicitly.

## Boundaries for future M09 replay

M09 may use lifecycle phases to reconstruct payment state over time. This document does not define replay inputs, snapshots, clocks, ordering rules, determinism requirements, or replay output artifacts.

Replay must be deterministic, reproducible, and evidence-linked. LLM summaries cannot replace replay results.
