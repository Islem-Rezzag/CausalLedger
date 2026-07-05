# MoneyEvent Mapping Fixtures and Simulator Planning

## Status

This is the M03.03 planning artifact for evidence-to-MoneyEvent mapping fixtures and future simulator design.

This document is documentation and planning only. It does not create fixture data. It does not create simulator data. It does not create parser behavior, validator behavior, normalizer behavior, evidence storage, real connectors, live ingestion, database tables, migrations, API routes, product UI, ledger posting, incidents, graph behavior, replay behavior, repair behavior, agent runtime, external integrations, or money mutation.

## Purpose

Mapping fixtures are needed so future implementation can test evidence-to-MoneyEvent behavior against explicit expectations instead of inventing source semantics inside parser or validator code.

M03.03 defines the controlled evidence families, conceptual mapping shape, fixture categories, and simulator boundaries that later M03 work can turn into deterministic validation and test fixtures. Future implementation depends on this planning for:

- source identity and source type expectations;
- raw evidence reference and evidence receipt expectations;
- idempotency and duplicate-delivery expectations;
- event time, observed time, and settlement or bank timing distinctions;
- amount and currency handling;
- uncertainty for missing, partial, delayed, duplicate, or conflicting evidence;
- clear non-goals for runtime ingestion and simulator behavior.

## Non-goals

M03.03 does not implement:

- a real provider connector;
- live evidence ingestion;
- evidence storage;
- runtime parser behavior;
- runtime validator behavior;
- runtime normalizer behavior;
- database tables or migrations;
- API routes;
- product UI;
- ledger posting;
- repair approval or repair application;
- simulator source code or generated simulator output;
- JSON, YAML, CSV, or executable fixture files.

## Evidence families

| Evidence family | Conceptual source type | Mapping concern |
| --- | --- | --- |
| Provider authorization events | `provider.webhook` or `provider.api_record` | Preserve provider event identity, payment reference, event time, observed time, and provider-only uncertainty until capture, settlement, or bank evidence arrives. |
| Provider capture events | `provider.webhook` or `provider.api_record` | Map to captured-payment meaning while preserving raw provider reference, amount, currency, party/object references, and idempotency inputs. |
| Provider refund events | `provider.webhook` or `provider.api_record` | Preserve refund reference, original payment reference, amount, currency, and uncertainty about settlement or bank confirmation. |
| Provider chargeback or dispute events | `provider.webhook` or `provider.api_record` | Represent chargeback-opened meaning without assuming final outcome, fee impact, bank impact, or repair need. |
| Settlement or payout rows | `settlement.file` | Preserve file identity, row identity, payout or settlement object, component type, amount, currency, settlement date, and related payment/refund/fee references. |
| Bank statement lines | `bank.statement` | Preserve bank source identity, posting date, amount, currency, account reference, and uncertainty about provider payout match. |
| Duplicate webhook delivery | `provider.webhook` | Treat duplicate delivery as duplicate evidence, not duplicate money movement, when source identity and idempotency inputs match. |
| Delayed evidence | any supported source type | Preserve late arrival and separate source event time from observed time so later deterministic logic can update interpretation without rewriting raw evidence. |
| Conflicting provider and bank evidence | multiple source types | Preserve both evidence references and conflict state instead of choosing a final truth through LLM output. |
| Partial evidence | any supported source type | Represent what is supported and keep unsupported fields, matches, or lifecycle claims uncertain. |
| Reversal or adjustment evidence | provider, settlement, or bank source types | Preserve original-object relationship and reversal or adjustment meaning without posting ledger entries. |

## Mapping principles

Raw evidence remains the source of truth. A mapped MoneyEvent is a future derived canonical artifact that cites raw evidence references; it does not replace source payloads, evidence receipts, source file rows, source hashes, bank records, or provider records.

Mapped MoneyEvents must cite evidence references when future receipts, raw locators, hashes, source records, or row identifiers exist. Missing evidence must be explicit rather than hidden behind a confident default.

Mapping must preserve provenance: source system, source type, source record identity, observation boundary, raw locator or receipt reference, and any transformation boundary that produced the candidate event.

Mapping must preserve idempotency. Duplicate provider delivery, repeated import of the same settlement row, or replay of the same controlled simulator output should conceptually map to the same canonical occurrence when deterministic idempotency inputs match. Distinct money movement must not be collapsed just because references are similar.

Mapping must preserve event time versus observed time. Source event time, settlement date, bank posting date, file date, and CausalLedger observed time can differ and may arrive out of order.

Uncertainty must remain explicit for missing currency, missing amount, partial evidence chains, delayed settlement, ambiguous bank matching, conflicting amount, and unsupported lifecycle conclusions.

Mapping must not post to a ledger, mutate money, approve repairs, modify raw events, delete evidence, override deterministic invariants, or let an LLM create financial truth.

## Loop engineering role in M03.03

M03.03 mapping fixtures are future verifier inputs, not runtime behavior. They define planned evidence cases and expected MoneyEvent mapping expectations so later deterministic implementation can compare actual mapper output against explicit expectations.

Future mapping loops should compare source evidence against expected MoneyEvent mapping expectations. Those loops must preserve raw evidence references, provenance, idempotency, event time versus observed time, amount, currency, and uncertainty across every attempted mapping.

Future mapping loops may reject, mark uncertain, or defer mappings when evidence is missing, delayed, duplicate, ambiguous, or conflicting. They must not let an LLM decide financial truth, and they must not ingest live evidence, store records, post ledger entries, create incidents, or approve repairs.

Future simulator loops are offline and deterministic only. They may exercise controlled planned evidence sequences later, but M03.03 does not create fixture data, simulator output, simulator source code, ingestion, storage, parser, validator, normalizer, or product behavior.

Conceptual loop:

source evidence -> planned mapping expectation -> future mapper/validator -> deterministic check -> pass/fail/uncertain result -> recorded fixture outcome

## Planned fixture shape

Future fixture files are deferred. When a later submilestone is allowed to create fixture data, each fixture should conceptually include:

| Field | Purpose |
| --- | --- |
| Fixture ID | Stable controlled ID for the planned case, such as a human-readable slug and future deterministic fixture identifier. |
| Evidence type | Provider webhook, provider API record, settlement row, bank statement line, delayed evidence, conflicting evidence, or partial evidence. |
| Source system | Controlled source identity, not a real connector credential or live provider. |
| Raw evidence reference | Planned receipt ID, raw locator, source record ID, row reference, or content hash placeholder; never raw secret-bearing payload data. |
| Expected MoneyEvent fields | Conceptual target kind, source type, amount, currency, object, party, evidence reference, provenance, relationship, lifecycle state, and time fields. |
| Expected uncertainty | Missing, partial, delayed, conflicting, ambiguous, provider-only, or none-known state with evidence-backed reasons. |
| Expected idempotency behavior | Whether repeated evidence should collapse into one canonical occurrence or remain separate because the source occurrence differs. |
| Expected mapping notes | Human-readable explanation of the mapping rationale and any deferred deterministic rule. |
| Non-goals | Explicit statement that the fixture does not ingest, store, validate, normalize, post, repair, or simulate runtime behavior. |

Illustrative pseudo-records should stay in documentation tables until M03.05 or another explicitly scoped future slice creates fixture data.

## Planned fixture categories

| Category | Expected mapping focus | Explicit uncertainty or boundary |
| --- | --- | --- |
| Simple provider capture | Provider capture evidence maps conceptually to `payment.captured` with amount, currency, payment object, source event time, observed time, and provider-only evidence references. | Settlement and bank confirmation are absent unless separately represented. |
| Provider refund | Refund evidence maps conceptually to `refund.created` with original payment relationship and refund object reference. | Bank and settlement confirmation remain uncertain if not present. |
| Chargeback opened | Dispute or chargeback evidence maps conceptually to `chargeback.opened`. | Outcome, fees, settlement deduction, and bank impact remain unresolved. |
| Settlement payout row | Settlement evidence maps conceptually to `settlement.row_observed` or `payout.observed`. | Relationships to payments, fees, reserves, refunds, or chargebacks must be explicit or uncertain. |
| Bank deposit line | Bank evidence maps conceptually to `bank.posting_observed`. | Provider payout match remains explicit or ambiguous. |
| Duplicate provider webhook | Repeated provider delivery maps to the same conceptual occurrence when idempotency inputs match. | Both evidence receipts may still be preserved later; duplicate evidence is not duplicate money movement. |
| Delayed settlement | Later settlement evidence can confirm, adjust, or leave unresolved an earlier provider-only interpretation. | Observed time and source event or file date must remain distinct. |
| Conflicting amount | Provider, settlement, or bank amounts disagree. | The future MoneyEvent must preserve conflict references instead of choosing a truth through LLM output. |
| Missing currency | Source evidence includes amount but no usable currency. | Mapping must stay rejected or uncertain in later deterministic validation; no default currency may be inferred. |
| Partial evidence chain | Only one part of a payment, refund, chargeback, payout, or bank chain is present. | Missing links remain visible and cannot be narrated away. |

## Simulator planning

A future simulator may generate controlled provider-like events, settlement rows, bank lines, refunds, chargebacks, delayed evidence, duplicate delivery, conflicting records, and partial evidence chains.

The future simulator should remain deterministic. Given the same scenario ID, seed, source-clock plan, and evidence family sequence, it should produce the same source identities, source record IDs, event times, observed times, evidence references, and expected MoneyEvent mapping expectations.

Future simulator output should cite scenario IDs and evidence IDs. Scenario IDs should identify the controlled case; evidence IDs should identify each source record or planned receipt; expected MoneyEvent IDs or idempotency keys should be derived deterministically when implementation scope allows it.

M03.03 must not generate simulator output yet. It must not add a simulator package, CLI, source code, queues, schedules, connectors, provider mocks, bank mocks, storage, JSON/YAML/CSV datasets, or benchmark cases.

## Relationship to later M03 slices

M03.04 should use this mapping design to define deterministic validation and normalization rules for source identity, idempotency, money, currency, timestamps, source references, provenance, duplicates, missing evidence, delayed evidence, partial evidence, and conflicts. M03.04 must not use LLM judgment as validation.

M03.05 may create deterministic test fixtures and benchmark seed cases only after M03.04 clarifies the validation and normalization rules. M03.05 should keep future MoneyFlowBench reuse in mind, but it must not claim benchmark scoring, product readiness, incident detection, replay correctness, repair safety, or production behavior.

M03.06 should QA the full M03 MoneyEvent scope, including forbidden runtime scope, deterministic test coverage, documentation alignment, and truthful closeout readiness.

## Reversible and expensive decisions

Fixture category names, fixture ordering, document tables, scenario labels, and explanatory notes are reversible. They can change as long as active docs and status tracking stay coherent.

Source identity semantics, idempotency inputs, timestamp meaning, raw evidence reference shape, amount/currency interpretation, and uncertainty taxonomy are expensive to reverse. Future code, validators, replay, incidents, ledger mapping, repair proposals, and benchmark cases will depend on those decisions.
