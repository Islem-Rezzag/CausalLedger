# Settlement Vocabulary

No runtime implementation is defined or claimed in this document.

## Purpose

Settlement vocabulary gives CausalLedger precise language for how captured funds, provider deductions, reserves, payouts, and bank postings are described before future MoneyEvent, simulator, invariant, incident, graph, replay, and connector work starts.

The goal is to make settlement questions explainable without turning this M01.03 document into product behavior. Future systems may use these terms as inputs to deterministic schemas, checks, evidence links, and replay artifacts, but this document does not implement those systems.

## Settlement scope

Settlement covers the provider, platform, merchant, seller, and bank-facing movement from captured or otherwise financially effective payment activity toward payout and bank posting. It includes provider settlement reports, settlement files, payout objects, balance transactions, fees, refunds, chargebacks, reserves, adjustments, references, statuses, and evidence touchpoints.

Settlement is not the same as payment lifecycle, ledger posting, or reconciliation. Payment lifecycle explains what happened to a payment. Ledger vocabulary explains durable financial records and double-entry language. Settlement explains how provider-side activity is batched, deducted, paid out, and connected to bank evidence.

## What this document defines

- Settlement vocabulary terms and boundaries.
- Settlement actors and systems.
- Settlement status terms and terminal or non-terminal meanings at vocabulary level.
- Common settlement paths.
- Conceptual settlement evidence examples.
- Questions CausalLedger asks about settlement.
- Settlement failure-pattern vocabulary.
- Boundaries with neighboring M01 domain areas.

## What this document does not define

- Product functionality.
- MoneyEvent runtime logic or field definitions.
- Ledger runtime logic, posting rules, balancing rules, or account schemas.
- Invariant algorithms, severity levels, thresholds, or pass/fail behavior.
- Incident engine states, ownership, escalation, or closure behavior.
- Causal graph nodes, edges, traversal, ranking, or persistence.
- Replay inputs, clocks, ordering rules, snapshots, or output artifacts.
- Repair planning, repair approval, repair application, or rollback behavior.
- UI, APIs, databases, GitHub Actions, CI workflows, external connectors, or provider integrations.
- Detailed reconciliation vocabulary or matching rules; those belong to M01.04.

## Relationship to payment lifecycle vocabulary

Payment lifecycle vocabulary belongs to M01.01 and is defined in `docs/domain/payment-lifecycle.md`.

Settlement vocabulary may reference lifecycle events such as `payment_captured`, `refund_completed`, `chargeback_created`, `provider_payout_created`, `provider_payout_paid`, and `bank_posted`. These references only describe where settlement evidence may connect to lifecycle evidence.

M01.03 does not redefine payment lifecycle phases, lifecycle terminality, authorization, capture, refund, chargeback, or bank posting semantics.

## Relationship to ledger vocabulary

Ledger vocabulary belongs to M01.02 and is defined in `docs/domain/ledger-vocabulary.md`.

Settlement vocabulary may reference future ledger postings, clearing movements, provider clearing accounts, suspense accounts, adjustment accounts, and reconciliation references. Those references only identify where settlement evidence may need to connect to future ledger records.

M01.03 does not post ledger entries, define double-entry treatment, calculate balances, create a chart of accounts, or decide whether a settlement event should create a ledger transaction.

## Relationship to future MoneyEvent schema

Future M03 MoneyEvent schema work may use settlement terms as candidate event names, source references, lifecycle links, amount categories, idempotency clues, provenance fields, or evidence links.

M01.03 does not define MoneyEvent fields, validators, normalization rules, storage behavior, or idempotency algorithms. Settlement truth must come from raw evidence, canonical events, deterministic transforms, replay, evidence bundles, and human approval where required.

## Relationship to future provider and bank simulator

Future M05 provider and bank simulator work may generate provider payout objects, settlement reports, settlement files, bank statement lines, fee rows, refund rows, chargeback rows, reserve rows, and adjustment rows using this vocabulary.

M01.03 does not implement simulators, generate files, create fixtures, connect to providers, or model provider-specific formats.

## Relationship to future invariant engine

Future M06 invariant work may convert settlement correctness questions and failure patterns into deterministic checks.

M01.03 does not define invariant algorithms, thresholds, severities, pass/fail outcomes, or repair actions. CausalLedger will not let an LLM decide whether settlement totals match, whether a payout is missing, or whether a bank posting proves settlement.

## Relationship to future incident engine

Future M07 incident work may use settlement failure vocabulary to describe missing, duplicated, delayed, contradictory, unresolved, or unsupported settlement evidence.

M01.03 does not define incident states, incident creation rules, ownership, escalation, severity, service-level expectations, or closure behavior.

## Relationship to future causal graph

Future M08 causal graph work may connect settlement rows, payout objects, bank lines, lifecycle events, ledger records, invariant failures, incidents, replay sessions, and repair proposals.

M01.03 does not define graph node types, edge types, traversal, ranking, root-cause scoring, or graph persistence. Future causal relationships must be evidence-backed or deterministically derived.

## Relationship to future replay engine

Future M09 replay work may use settlement vocabulary to reconstruct when payment activity entered settlement batches, when deductions occurred, when payouts were created, when bank postings arrived, and where unresolved differences remained.

M01.03 does not define replay inputs, replay clocks, ordering rules, snapshots, deterministic reconstruction algorithms, or replay output artifacts.

## Relationship to future connector work

Future connector work may import provider settlement files, payout reports, balance transactions, bank statements, refund reports, chargeback reports, and fees reports.

M01.03 does not add connectors, credentials, webhooks, ingestion jobs, provider clients, bank APIs, file parsers, polling logic, or normalization code. Future connector evidence must preserve source identity, provenance, and raw evidence without letting agents modify raw events.

## Core settlement concepts

The core settlement vocabulary includes settlement, clearing, payout, provider payout, settlement batch, settlement report, settlement file, settlement row, settlement period, settlement window, settlement cut-off time, settlement date, value date, payout date, bank posting date, gross settlement amount, net settlement amount, fee deduction, reserve, rolling reserve, reserve release, adjustment, chargeback deduction, refund deduction, payout reference, settlement reference, bank statement reference, provider balance, pending balance, available balance, settlement currency, payout currency, FX settlement, and settlement status.

| Term | Meaning |
| --- | --- |
| Settlement | The provider or financial-network process that groups financially effective activity and prepares it for payout, bank posting, or unresolved follow-up. |
| Clearing | The intermediary process where funds, obligations, fees, or deductions are acknowledged before final payout or bank posting. Clearing is vocabulary only and does not define ledger account treatment. |
| Payout | A movement of funds from a provider, acquirer, platform, or bank toward a merchant, platform, seller, or bank account. |
| Provider payout | A payout object, report entry, or provider-side record describing funds sent or intended to be sent by a PSP or payment provider. |
| Settlement batch | A provider-defined grouping of payments, refunds, chargebacks, fees, reserves, adjustments, or payout rows over a period or window. |
| Settlement report | A provider, bank, or platform report summarizing settlement activity and deductions. |
| Settlement file | A downloadable or imported file, often CSV or fixed-format, that contains settlement rows. This term does not define a parser or file schema. |
| Settlement row | One line or record inside a settlement report or file that describes a payment, deduction, fee, reserve, adjustment, payout, or reference. |
| Settlement period | The business period covered by settlement activity, such as a calendar day, provider processing day, or merchant-defined accounting period. |
| Settlement window | The operational time interval in which activity is eligible to be batched or paid out. |
| Settlement cut-off time | The time after which activity rolls into a later settlement window or batch. |
| Settlement date | The date assigned by a provider, acquirer, platform, or bank to settlement processing. It may differ from value date, payout date, or bank posting date. |
| Value date | The date on which funds are considered economically effective by a bank, provider, or finance process. It may differ from the date evidence is received. |
| Payout date | The date a payout is created, initiated, sent, or recorded by the paying system, depending on future evidence context. |
| Bank posting date | The date a bank statement or bank transaction records the funds. It may lag provider payout evidence. |
| Gross settlement amount | The total amount before fees, refunds, chargebacks, reserves, adjustments, or other deductions. |
| Net settlement amount | The amount after deductions, additions, reserves, releases, adjustments, and FX effects that is expected to be paid out or posted. |
| Fee deduction | A provider, network, bank, platform, or processing fee deducted from gross settlement or payout amount. |
| Reserve | Funds held back from payout for risk, dispute, rolling reserve, contractual, or operational reasons. |
| Rolling reserve | A reserve held as a percentage or amount across a defined rolling period before later release. This document does not define reserve policy. |
| Reserve release | A later settlement movement that releases previously held reserve funds. It should be traceable to the original hold in future evidence or schema work. |
| Adjustment | A provider, bank, platform, or finance-operations correction row that changes settlement totals. It requires evidence in future implementation work. |
| Chargeback deduction | A deduction caused by a dispute, chargeback, reversal, or related fee. It should remain traceable to chargeback evidence where available. |
| Refund deduction | A deduction caused by a completed or provider-recorded refund. It should remain traceable to refund evidence where available. |
| Payout reference | A provider, bank, platform, or internal reference used to identify a payout. |
| Settlement reference | A provider, report, file, batch, or internal reference used to identify settlement activity. |
| Bank statement reference | A bank-provided reference or description used to identify a bank statement line or transaction. |
| Provider balance | The provider-side amount available, pending, reserved, or otherwise tracked by the PSP or payment provider. |
| Pending balance | Provider-side funds or deductions not yet available for payout, bank posting, or final classification. |
| Available balance | Provider-side funds available for payout or transfer according to provider evidence. |
| Settlement currency | The currency used for settlement calculations or report rows. |
| Payout currency | The currency used for the payout or bank transfer. It may differ from settlement currency in FX settlement. |
| FX settlement | Settlement that involves currency conversion, exchange rates, FX fees, or currency mismatch risk. M01.03 does not define conversion logic. |
| Settlement status | A vocabulary label describing where settlement activity appears in the provider-to-bank path. Status terms are defined below without state-machine rules. |

## Settlement actors and systems

| Actor or system | Settlement meaning |
| --- | --- |
| Payment provider or PSP | The provider that processes payment activity, reports settlement, and may create payouts or balance transactions. |
| Acquiring bank | The acquiring or settlement bank that participates in card or payment-network settlement. |
| Merchant | The business receiving payment proceeds or carrying deductions, reserves, refunds, chargebacks, or adjustments. |
| Platform or marketplace | The platform that may receive aggregate payouts, allocate funds to sellers, or mediate settlement reporting. |
| Seller or sub-merchant | A participant under a platform or marketplace that may receive allocated settlement proceeds or deductions. |
| Customer | Settlement origin boundary only. Customer payment, refund, or dispute activity may cause settlement rows, but customer behavior is not a settlement actor inside this vocabulary. |
| Bank | The financial institution where payouts, deposits, withdrawals, or bank postings appear as evidence. |
| Internal ledger | Boundary note only. Future ledger records may reference settlement evidence, but M01.03 does not post or mutate ledger entries. |
| Finance operations user | A human operator who reviews settlement evidence, explains differences, and approves future actions where required by policy. |
| Support or operations user | A consumer of settlement evidence only. Support or operations users may inspect evidence or explanations but cannot use LLM output as financial truth. |

## Settlement statuses

These statuses are vocabulary terms only. They do not define a state machine, transition rules, schema fields, product behavior, or deterministic validation.

| Status | Meaning | Terminal vocabulary note |
| --- | --- | --- |
| `settlement_pending` | Activity is expected to settle but has not yet appeared in a settlement batch, report, file, payout, or bank line. | Non-terminal. |
| `settlement_batched` | Activity appears in a settlement batch or provider grouping. | Non-terminal. |
| `settlement_file_received` | A settlement file has been received or recorded as evidence. | Non-terminal until parsed, linked, and reconciled by future deterministic work. |
| `settlement_report_received` | A settlement report has been received or recorded as evidence. | Non-terminal until linked and checked by future deterministic work. |
| `payout_created` | A provider, platform, acquirer, or bank payout has been created or initiated. | Non-terminal. |
| `payout_in_transit` | A payout is expected to reach a bank or recipient but has not yet been confirmed by bank posting evidence. | Non-terminal. |
| `payout_paid` | Provider evidence says the payout was paid, sent, completed, or otherwise finished. | Non-terminal until bank posting and reconciliation context are resolved. |
| `payout_failed` | Provider or bank evidence says the payout failed. | Terminal for that payout attempt, but the settlement remains unresolved until future handling explains or replaces it. |
| `payout_reversed` | A payout was reversed, recalled, returned, or offset by later evidence. | Terminal for that reversal action, but not necessarily for the broader settlement. |
| `settlement_adjusted` | A settlement total, row, payout, or balance was changed by an adjustment. | Non-terminal unless future evidence and review close the broader discrepancy. |
| `reserve_held` | Funds were held back from payout as a reserve. | Non-terminal until a release, write-off, or reviewed unresolved outcome exists. |
| `reserve_released` | Previously held reserve funds were released. | Terminal for the release action, but not necessarily for the original settlement period. |
| `bank_posted` | Bank statement or bank transaction evidence shows the payout or related movement. | Non-terminal until reconciliation vocabulary and future matching rules resolve it. |
| `settlement_reconciled` | Settlement evidence, expected payout, deductions, and bank posting have been connected at a vocabulary touchpoint. | Terminal for the settlement question only after future M01.04 reconciliation and deterministic checks define the conditions. |
| `settlement_unresolved` | Evidence is missing, duplicated, delayed, contradictory, ambiguous, or not yet linked. | Non-terminal unless a future incident or human review process explicitly closes it as unresolved. |

Terminal language here is descriptive only. M01.03 does not authorize automatic transitions, settlement closure, payout retries, repairs, or ledger mutation.

## Settlement paths

These paths describe common settlement narratives. They are not state machines, algorithms, tests, or implemented workflows.

| Path | Vocabulary sequence |
| --- | --- |
| Happy path | Captured payments -> settlement batch -> payout created -> payout paid -> bank posted -> settlement reconciled. |
| Fee deduction path | Captured payments -> provider fees deducted -> net payout -> bank posted. |
| Refund deduction path | Captured payment -> refund completed -> refund deducted from settlement or payout. |
| Chargeback deduction path | Captured payment -> chargeback created -> chargeback deducted from settlement or payout. |
| Reserve path | Captured payment -> reserve held -> partial payout -> reserve released later. |
| Payout failure path | Settlement batch -> payout created -> payout failed -> settlement unresolved. |
| Adjustment path | Settlement report -> adjustment row -> settlement adjusted. |
| Unresolved settlement path | Expected payout, settlement row, bank line, or reference missing, duplicated, delayed, contradictory, or ambiguous. |

## Settlement evidence examples

These examples are conceptual only. They do not define schemas, import behavior, parser behavior, evidence bundle structure, or runtime validation.

| Evidence example | Possible future settlement use |
| --- | --- |
| Provider payout object | May identify payout amount, currency, status, payout reference, expected bank posting, and provider balance movement. |
| Settlement report row | May identify a payment, fee, refund, chargeback, reserve, release, adjustment, payout, or reference inside a settlement report. |
| Payout report | May summarize payouts created, in transit, paid, failed, reversed, or delayed. |
| Fees report | May explain fee deductions between gross settlement amount and net settlement amount. |
| Refund report | May explain refund deductions tied to lifecycle or provider evidence. |
| Chargeback report | May explain chargeback deductions, dispute fees, or chargeback timing. |
| Bank statement line | May provide bank posting evidence for a payout, reversal, fee, adjustment, or returned payment. |
| Provider balance transaction | May show pending balance, available balance, reserve hold, reserve release, fee deduction, payout, or adjustment movement. |
| CSV settlement file | May contain settlement rows and references imported as raw evidence by future connector work. |
| Internal reference linking settlement row to lifecycle event | May connect a settlement row to `payment_captured`, `refund_completed`, or `chargeback_created` evidence. |
| Internal reference linking settlement row to ledger entry | May connect settlement evidence to a future ledger posting, clearing movement, suspense entry, or reconciliation reference. |

## Questions CausalLedger asks about settlement

- Did captured payments appear in a settlement batch?
- Did provider payout totals match expected gross minus fees, refunds, chargebacks, and reserves?
- Did the payout reach the bank?
- Did the bank posting match the expected payout amount and currency?
- Did a settlement row reference a known lifecycle event?
- Did a settlement row link to a ledger posting or clearing movement?
- Did a fee, reserve, refund, chargeback, or adjustment explain the difference?
- Is a settlement complete, incomplete, contradictory, delayed, duplicated, or unresolved?
- Is a reserve release linked to an original reserve hold?
- Is an adjustment supported by provider, bank, platform, or finance-operations evidence?
- Are settlement currency and payout currency consistent or explicitly explained as FX settlement?

These questions are future deterministic-check candidates, not implemented invariants.

## Settlement failure patterns

These failure patterns are vocabulary only. They do not implement invariants, incident creation, reconciliation logic, repair logic, or automated decisions.

| Pattern | Settlement meaning |
| --- | --- |
| Missing settlement row | Expected payment, refund, chargeback, fee, reserve, release, payout, or adjustment evidence is absent from settlement rows. |
| Duplicate settlement row | More than one settlement row appears for the same source-intended settlement movement or reference. |
| Missing payout | Settlement evidence implies a payout should exist, but no payout object, payout report row, or bank movement is found. |
| Failed payout | Payout evidence says a payout failed, was returned, or could not complete. |
| Payout amount mismatch | Payout amount differs from expected net settlement amount after supported deductions, additions, reserves, releases, adjustments, and FX effects. |
| Payout currency mismatch | Payout currency differs from settlement currency or expected bank currency without supported FX settlement evidence. |
| Bank posting missing | Provider payout evidence exists, but no matching bank statement line or bank transaction is found. |
| Bank posting amount mismatch | Bank posting amount differs from expected payout amount without supported fees, FX, reversal, return, or adjustment evidence. |
| Fee not explained | Gross-to-net difference includes a fee-like amount without a fee report, provider balance transaction, or supported evidence. |
| Refund deduction not explained | Refund deduction appears without a linked refund lifecycle event, provider refund record, or settlement row explanation. |
| Chargeback deduction not explained | Chargeback deduction appears without linked dispute, chargeback, provider, or settlement evidence. |
| Reserve held without release reference | Reserve hold exists without later release, write-off, or reviewed unresolved outcome. |
| Reserve release without original hold | Reserve release exists without a traceable earlier reserve hold. |
| Adjustment without evidence | Settlement adjustment exists without provider, bank, platform, internal, or reviewed finance-operations evidence. |
| Settlement file delay | Expected settlement file or report arrives late, is not received, or covers an unexpected settlement period. |
| Settlement reference mismatch | Payout, settlement, bank, lifecycle, or ledger references disagree or cannot be linked. |
| Settlement ledger divergence | Settlement evidence and future ledger records disagree about amount, currency, timing, reference, deduction, reserve, adjustment, or clearing movement. |
| Settlement unresolved | Settlement cannot be confidently linked because evidence is missing, duplicated, delayed, contradictory, ambiguous, or unsupported. |

## Boundaries with other M01 areas

- Payment lifecycle vocabulary belongs to M01.01.
- Ledger vocabulary belongs to M01.02.
- Reconciliation vocabulary belongs to M01.04.
- Incident vocabulary belongs to M01.05.
- Safe and unsafe repair vocabulary belongs to M01.06.
- Evidence receipt model belongs to M01.07.
- Human review states belong to M01.08.

M01.03 may reference those areas only as boundaries or future dependencies. It does not fully define them here.

Settlement vocabulary can mention `settlement_reconciled` and `settlement_unresolved` as lifecycle and evidence touchpoints, but detailed reconciliation vocabulary, matching rules, break classification, and reconciliation outcomes belong to M01.04.
