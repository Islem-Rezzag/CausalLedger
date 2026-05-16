# Reconciliation Vocabulary

## Purpose

The reconciliation vocabulary gives CausalLedger one shared language for comparing expected internal records with observed external records across payment providers, settlement reports, payout reports, bank statements, ledger records, refunds, chargebacks, fees, reserves, and adjustments.

This document exists so future MoneyEvent schema work, provider and bank simulator work, deterministic invariants, incidents, causal graph modeling, replay, repair planning, and MoneyFlowBench scenarios can use the same reconciliation terms without letting LLM output become financial truth.

No runtime implementation is defined or claimed in this document.

## Reconciliation scope

Reconciliation scope covers conceptual comparison between records that should describe the same money movement, balance movement, deduction, payout, bank posting, clearing movement, or exception.

Reconciliation may compare:

- Provider data to internal payment state.
- Provider settlement rows to ledger postings.
- Provider payout totals to bank statement lines.
- Refund records to settlement deductions.
- Chargeback records to settlement deductions.
- Bank lines to provider payouts.
- Ledger clearing movements to settlement outcomes.

This scope is vocabulary only. It names comparison concepts, statuses, paths, evidence examples, correctness questions, and failure patterns so future implementation can be precise.

## What this document defines

- Core reconciliation terms.
- Conceptual reconciliation sources and targets.
- Reconciliation status vocabulary.
- Reconciliation path vocabulary.
- Conceptual reconciliation evidence examples.
- Correctness questions CausalLedger should ask about reconciliation.
- Failure-pattern vocabulary for future deterministic checks.
- Boundaries with payment lifecycle, ledger, settlement, incident, repair, evidence, human review, MoneyEvent, simulator, invariant, graph, replay, repair planner, and MoneyFlowBench work.

## What this document does not define

- Payment lifecycle vocabulary; that belongs to M01.01.
- Ledger vocabulary; that belongs to M01.02.
- Settlement vocabulary; that belongs to M01.03.
- Incident vocabulary; that belongs to M01.05.
- Safe and unsafe repair vocabulary; that belongs to M01.06.
- Evidence receipt structure; that belongs to M01.07.
- Human review states; that belongs to M01.08.
- MoneyEvent schema fields, runtime normalization, validators, or package code.
- Ledger entries, account balances, posting rules, or double-entry behavior.
- Matching algorithms, tolerance algorithms, close rules, or state machines.
- Deterministic invariant logic.
- Incident creation logic, incident severity, or incident lifecycle.
- Causal graph nodes, edges, traversal, ranking, or persistence.
- Replay session logic.
- Repair approval, repair safety rules, repair application, or money mutation.
- UI, API, database, connector, GitHub Actions, CI workflow, or product behavior.

## Relationship to payment lifecycle vocabulary

Payment lifecycle vocabulary belongs to M01.01. Reconciliation may compare lifecycle evidence such as captured payments, refunds, disputes, chargebacks, provider payout touchpoints, bank posting touchpoints, and lifecycle references against internal and external records.

This document does not redefine payment phases or lifecycle terminal states. It only names reconciliation comparisons that may use lifecycle records later.

## Relationship to ledger vocabulary

Ledger vocabulary belongs to M01.02. Reconciliation may compare future ledger transactions, ledger entries, clearing accounts, suspense accounts, fee entries, refund entries, chargeback entries, reserve entries, adjustment entries, and bank clearing entries against provider, settlement, payout, and bank evidence.

This document does not define chart of accounts, posting rules, double-entry validators, or ledger mutation. Agents cannot post ledger entries or treat reconciliation explanations as ledger truth.

## Relationship to settlement vocabulary

Settlement vocabulary belongs to M01.03. Reconciliation may compare settlement batches, settlement rows, payout objects, gross amounts, net amounts, fees, refunds, chargebacks, reserves, reserve releases, adjustments, and bank postings against internal records.

This document does not redefine settlement math, payout states, settlement periods, reserve behavior, or settlement failure patterns except where they are referenced as reconciliation inputs.

## Relationship to future MoneyEvent schema

Future MoneyEvent schema work may use reconciliation terms as candidate status, reference, comparison, or exception vocabulary. M03 must still define exact schema fields, source references, idempotency keys, timestamps, actors, amounts, currency, provenance, and immutability rules.

M01.04 does not define a MoneyEvent schema and does not modify raw events.

## Relationship to future provider and bank simulator

Future M05 provider and bank simulators may generate provider payment events, settlement rows, payout reports, bank statement lines, refund records, chargeback records, fee records, reserve records, and adjustment rows that exercise reconciliation paths.

M01.04 does not define simulator fixtures, connectors, payload formats, bank importers, provider integrations, or generation logic.

## Relationship to future invariant engine

Future M06 invariant work may turn reconciliation questions and failure patterns into deterministic checks. Examples include unmatched records, amount mismatch, currency mismatch, timing mismatch, reference mismatch, duplicate match, ambiguous match, and reconciliation ledger or settlement divergence.

This document does not define invariant algorithms, thresholds, tolerances, pass/fail rules, severity, or fixtures. Invariant results must be deterministic and cannot be replaced by LLM judgment.

## Relationship to future incident engine

Future M07 incident work may use unresolved reconciliation exceptions, contradictory evidence, aged exceptions, duplicate matches, false matches, settlement divergence, ledger divergence, or missing bank lines as incident inputs.

This document does not define incident severity, incident lifecycle, ownership, escalation, service-level rules, or closure. Incident creation must come from deterministic evidence and invariant outcomes, not narrative confidence.

## Relationship to future causal graph

Future M08 causal graph work may model reconciliation relationships between payment events, settlement rows, payout objects, bank statement lines, ledger transactions, ledger entries, evidence bundles, replay results, exceptions, and repair proposals.

This document does not define graph node types, edge types, traversal, ranking, root-cause scoring, or graph persistence. Every future causal relationship must be supported by evidence or deterministic derivation, and uncertainty must remain explicit.

## Relationship to future replay engine

Future M09 replay work may reconstruct reconciliation state across a period or window, including when evidence was expected, observed, matched, unresolved, or later resolved.

This document does not define replay inputs, snapshots, clocks, ordering rules, determinism requirements, or replay output artifacts. Replay must be deterministic, reproducible, and evidence-linked.

## Relationship to future repair planner

Future M12 repair planning may use reconciliation exceptions as inputs to proposal generation, such as recommending evidence collection, operator review, suspense usage, or compensating journal proposals.

M01.04 does not define safe repair types, unsafe repair types, repair approval, repair application, rollback, idempotency, or money mutation. Repair behavior must remain proposal-first and require deterministic validation plus human approval before any future application path.

## Relationship to future MoneyFlowBench scenarios

Future MoneyFlowBench scenarios may use reconciliation vocabulary to describe expected matches, missing records, duplicate records, delayed bank lines, fee variance, refund variance, chargeback variance, FX variance, ambiguous references, and unresolved exceptions.

M01.04 does not define benchmark scenario format, scoring rubrics, benchmark runners, or expected answer files. Benchmark scoring must reward cited evidence, calibrated uncertainty, and refusal to invent unsupported financial facts.

## Core reconciliation concepts

| Term | Reconciliation meaning |
| --- | --- |
| Reconciliation | The evidence-grounded comparison of expected and observed records to determine whether they describe the same money movement, balance movement, deduction, payout, bank posting, or exception. |
| Reconciliation run | A bounded reconciliation attempt over a defined period, window, source set, target set, and comparison purpose. |
| Reconciliation period | The business, accounting, settlement, or reporting period the reconciliation intends to cover. |
| Reconciliation window | The time range in which expected and observed records are searched or considered eligible for matching, including allowable timing delays. |
| Source record | A record used as one side of a comparison. The source may be internal or external depending on the reconciliation question. |
| Target record | The record or set of records the source record is compared against. The target may be internal or external depending on the reconciliation question. |
| Internal record | A record from the future observed internal system, such as a payment record, ledger record, refund record, chargeback record, fee record, reserve record, or adjustment record. |
| External record | A provider, bank, network, processor, settlement, payout, or other third-party record. |
| Expected record | A record CausalLedger expects to find based on earlier evidence, deterministic state, accounting expectation, or provider or ledger reference. |
| Observed record | A record actually present in available evidence, exports, reports, statements, or future imported data. |
| Matching | The process of comparing candidate records using references, amount, currency, dates, source identity, and evidence context. This document does not define algorithms. |
| Match candidate | A possible relationship between records that requires deterministic validation, supporting evidence, or human review before being treated as confirmed. |
| Confirmed match | A match supported by sufficient deterministic criteria or reviewed evidence according to future rules. M01.04 does not define those rules. |
| Unmatched record | An expected or observed record that does not currently have a confirmed counterpart. |
| Partial match | A comparison where some criteria or aggregate totals align but record-level explanation is incomplete. |
| One-to-one match | One source record corresponds to one target record. |
| One-to-many match | One source record corresponds to multiple target records, such as one payout matching multiple bank or ledger movements under future defined rules. |
| Many-to-one match | Multiple source records correspond to one target record, such as multiple settlement rows matching one payout total under future defined rules. |
| Many-to-many match | Multiple source records correspond to multiple target records, often requiring batch or aggregate explanation. |
| Matching key | A value used to compare records, such as provider payment ID, payout ID, settlement batch ID, ledger transaction ID, bank reference, amount, currency, date, or source identity. |
| Reference key | A stable identifier or reference string used to connect records across systems. A weak or reused reference can create ambiguity. |
| Amount match | A comparison where monetary amounts agree under the future defined basis for gross, net, fee, refund, chargeback, reserve, adjustment, or FX handling. |
| Currency match | A comparison where currency codes agree, or where future FX settlement rules explicitly explain a currency difference. |
| Date match | A comparison where event dates, settlement dates, payout dates, bank posted dates, or ledger dates align within a future defined window. |
| Tolerance | A future deterministic allowance for acceptable difference, such as small FX rounding or date lag. M01.04 names the concept only and does not define thresholds. |
| Variance | A difference between compared records, such as amount, currency, date, reference, count, or classification. |
| Break | A reconciliation difference that requires explanation, review, deterministic classification, or future incident handling. |
| Exception | A reconciliation break or unmatched condition that remains open for explanation, evidence collection, review, or future deterministic handling. |
| Aged exception | An exception that remains open beyond a future defined age or review threshold. M01.04 does not define thresholds. |
| Unresolved exception | An exception that lacks enough evidence or accepted explanation to close. |
| Resolved exception | An exception with sufficient evidence or accepted explanation according to future deterministic and human-review rules. |
| False positive | A record or relationship incorrectly flagged as a reconciliation problem. |
| False negative | A real reconciliation problem that was not flagged. |
| Suspense | A boundary term for a temporary holding or investigation concept in future ledger or repair work. M01.04 does not define suspense account posting or approval. |
| Write-off | Boundary note only: a possible future finance outcome for immaterial or approved unresolved differences. M01.04 does not define write-off policy, approval, posting, or repair behavior. |
| Manual adjustment | Boundary note only: a possible future operator or finance action. M01.04 does not define adjustment approval, posting, or repair application. |
| Reconciliation status | A vocabulary label describing a reconciliation record, match, run, or exception at a point in time. This document does not define a state machine. |

The vocabulary includes reconciliation, reconciliation run, reconciliation period, reconciliation window, source record, target record, internal record, external record, expected record, observed record, matching, match candidate, confirmed match, unmatched record, partial match, one-to-one match, one-to-many match, many-to-one match, many-to-many match, matching key, reference key, amount match, currency match, date match, tolerance, variance, break, exception, aged exception, unresolved exception, resolved exception, false positive, false negative, suspense, write-off, manual adjustment, and reconciliation status as documentation-only terms.

## Reconciliation sources and targets

Conceptual reconciliation sources and targets may include:

- Payment provider events.
- Provider settlement reports.
- Provider payout reports.
- Bank statement lines.
- Internal payment records.
- Internal ledger records.
- Refund records.
- Chargeback records.
- Fee records.
- Reserve records.
- Adjustment records.
- Support or operations notes, as evidence context only.

Support or operations notes may explain what a person believed or did. They are context, not deterministic financial truth, unless future evidence and approval rules make their role explicit.

Reconciliation may compare provider data to internal payment state, provider settlement rows to ledger postings, provider payout totals to bank statement lines, refund records to settlement deductions, chargeback records to settlement deductions, bank lines to provider payouts, and ledger clearing movements to settlement outcomes.

## Reconciliation statuses

These statuses are vocabulary labels only. They do not define a state machine, transition guard, storage model, or workflow implementation.

| Status | Vocabulary meaning | Terminal meaning |
| --- | --- | --- |
| `reconciliation_not_started` | No reconciliation run or comparison has begun for the scoped records. | Non-terminal. |
| `reconciliation_in_progress` | A reconciliation run or comparison is underway. | Non-terminal. |
| `matched` | Compared records have a confirmed match under future deterministic or reviewed criteria. | Usually terminal for that comparison unless later evidence reopens it. |
| `partially_matched` | Some criteria or totals match, but record-level explanation is incomplete. | Non-terminal. |
| `unmatched_internal` | An internal or expected record has no confirmed external counterpart. | Non-terminal until resolved or accepted as unresolved by future rules. |
| `unmatched_external` | An external or observed record has no confirmed internal counterpart. | Non-terminal until resolved or accepted as unresolved by future rules. |
| `amount_mismatch` | Compared records disagree on amount outside future defined explanation or tolerance. | Non-terminal. |
| `currency_mismatch` | Compared records disagree on currency without a future supported FX or currency explanation. | Non-terminal. |
| `timing_mismatch` | Expected and observed records do not align within the expected date or posting window. | Non-terminal; may later become matched or unresolved. |
| `reference_mismatch` | Reference keys or identifiers disagree, are missing, malformed, reused, or incompatible. | Non-terminal. |
| `duplicate_match` | A record appears to match more records than expected or the same evidence is counted more than once. | Non-terminal. |
| `ambiguous_match` | Multiple plausible match candidates exist and cannot yet be distinguished. | Non-terminal. |
| `exception_open` | A reconciliation break is open for explanation, evidence, review, or deterministic classification. | Non-terminal. |
| `exception_in_review` | An open exception is under human or future workflow review. | Non-terminal. |
| `exception_resolved` | The exception has an accepted evidence-backed explanation under future rules. | Terminal for that exception unless reopened by later evidence. |
| `reconciliation_complete` | The scoped reconciliation run is complete with required matches or accepted resolutions. | Terminal for the run unless later evidence reopens it. |
| `reconciliation_unresolved` | The scoped reconciliation cannot currently be completed because evidence remains missing, duplicated, delayed, contradictory, ambiguous, or unsupported. | Terminal only if future review accepts unresolved closure; otherwise non-terminal. |

Terminal labels describe vocabulary expectations, not implementation behavior. Future workflow or invariant work must define exact transitions, reopen rules, review requirements, and audit requirements.

## Reconciliation paths

These paths name common reconciliation narratives for future deterministic checks and scenarios. They do not implement workflow logic.

| Path | Vocabulary sequence |
| --- | --- |
| Happy path | Expected internal record -> observed external record -> confirmed match -> `reconciliation_complete` |
| Amount variance path | Expected internal amount -> observed external amount differs -> variance -> `exception_open` |
| Timing delay path | Expected payout -> no bank line yet -> `timing_mismatch` -> later `bank_posted` -> `matched` |
| Missing internal path | External provider or bank record appears with no internal record -> `unmatched_external` -> `exception_open` |
| Missing external path | Internal payment, ledger, or payout expectation exists with no provider or bank record -> `unmatched_internal` -> `exception_open` |
| Partial match path | Batch total matches but individual rows require breakdown -> `partially_matched` -> `exception_in_review` |
| Duplicate match path | One external record maps to multiple internal records unexpectedly -> `duplicate_match` -> `exception_open` |
| Ambiguous match path | Multiple possible records have similar references or amounts -> `ambiguous_match` -> `exception_in_review` |
| Resolved exception path | `exception_open` -> evidence attached -> explanation accepted -> `exception_resolved` |
| Unresolved path | Missing, duplicated, delayed, contradictory, or ambiguous evidence remains unresolved -> `reconciliation_unresolved` |

`bank_posted` is a payment lifecycle and settlement touchpoint, not a full reconciliation state machine in this document.

## Reconciliation evidence examples

Examples of evidence that may later support reconciliation:

- Provider payment event.
- Provider settlement row.
- Provider payout object.
- Bank statement line.
- Ledger transaction.
- Ledger entry.
- Refund record.
- Chargeback record.
- Fee record.
- Reserve record.
- Adjustment row.
- Reconciliation note.
- Evidence bundle reference.
- Replay result reference.

These examples are conceptual. M01.04 does not define evidence schemas, evidence receipt structure, bundle contents, replay artifacts, hashes, retention policy, or connector payloads.

## Questions CausalLedger asks about reconciliation

- Did every expected internal record find a corresponding external record?
- Did every external record map to a known internal record?
- Do matched records agree on amount, currency, date, and reference?
- Is a difference explained by fees, refunds, chargebacks, reserves, FX, timing, or adjustments?
- Is the match one-to-one, one-to-many, many-to-one, or ambiguous?
- Is an unmatched record expected, delayed, duplicated, or suspicious?
- Is an exception resolved with evidence?
- Is the reconciliation complete, partial, contradictory, or unresolved?

These questions are future deterministic-check candidates, not implemented invariants.

## Reconciliation failure patterns

These failure patterns are vocabulary only. They do not implement invariants, incident creation, reconciliation logic, matching algorithms, repair logic, or automated decisions.

| Pattern | Reconciliation meaning |
| --- | --- |
| Unmatched internal record | An internal or expected record has no confirmed external counterpart. |
| Unmatched external record | An external or observed record has no confirmed internal counterpart. |
| Amount mismatch | Compared records disagree on amount outside supported explanation or future tolerance. |
| Currency mismatch | Compared records disagree on currency without supported FX or currency explanation. |
| Timing mismatch | Compared records do not align within the expected reconciliation window. |
| Reference mismatch | Matching keys or reference keys disagree, are missing, malformed, reused, or incompatible. |
| Duplicate match | A record is matched more than once, or duplicated evidence causes overcounting. |
| Ambiguous match | More than one plausible match candidate exists and cannot yet be distinguished. |
| False match | Records are incorrectly treated as matching when evidence does not support the relationship. |
| Missing bank line | A provider payout, settlement outcome, or ledger clearing expectation has no matching bank statement line. |
| Missing settlement row | Expected provider settlement evidence is absent for a payment, refund, chargeback, fee, reserve, release, or adjustment. |
| Missing ledger posting | Expected future ledger transaction or entry is absent for a matched provider, settlement, payout, bank, refund, chargeback, fee, reserve, or adjustment record. |
| Unexplained fee variance | Fee difference cannot be explained by provider evidence, settlement evidence, ledger evidence, or approved finance context. |
| Unexplained refund variance | Refund difference cannot be linked to refund lifecycle, settlement deduction, bank movement, or ledger record. |
| Unexplained chargeback variance | Chargeback difference cannot be linked to dispute, chargeback, settlement deduction, bank movement, or ledger record. |
| Reserve mismatch | Reserve hold, release, or balance does not align across provider, settlement, ledger, or bank evidence. |
| FX variance | Currency conversion or exchange-rate difference is not supported by provider, bank, ledger, or approved finance evidence. |
| Aged exception | An open exception remains unresolved beyond a future defined age or review threshold. |
| Unresolved exception | An exception remains unsupported, contradictory, or unclosed after available evidence and review. |
| Reconciliation ledger divergence | Reconciliation evidence and future ledger records disagree about amount, currency, date, reference, posting, clearing, fee, refund, chargeback, reserve, or adjustment treatment. |
| Reconciliation settlement divergence | Reconciliation evidence and settlement evidence disagree about settlement row, gross amount, net amount, payout, deduction, reserve, release, adjustment, FX, bank posting, or reference. |

## Boundaries with other M01 areas

- Payment lifecycle vocabulary belongs to M01.01.
- Ledger vocabulary belongs to M01.02.
- Settlement vocabulary belongs to M01.03.
- Incident vocabulary belongs to M01.05.
- Safe and unsafe repair vocabulary belongs to M01.06.
- Evidence receipt model belongs to M01.07.
- Human review states belong to M01.08.

M01.04 may reference those areas only as boundaries or future dependencies. It does not fully define them here.

Reconciliation vocabulary can mention breaks, exceptions, resolved exceptions, unresolved exceptions, suspense, write-off, manual adjustment, evidence bundle references, replay result references, and human review as future-adjacent concepts. Detailed incident severity or lifecycle belongs to M01.05. Detailed repair approval and repair safety belongs to M01.06. Evidence receipt structure belongs to M01.07. Human review states belong to M01.08.
