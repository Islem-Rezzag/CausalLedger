# Incident Vocabulary

## Purpose

Incident vocabulary gives CausalLedger precise language for naming, triaging, investigating, correlating, resolving, and closing money-movement incidents without turning agents into financial truth.

This document supports future M06 invariant work, M07 incident engine work, M08 causal graph work, M09 replay work, M10 agent tool contracts, M11 agentic investigator work, M12 repair planner work, and MoneyFlowBench scenarios.

## Incident scope

An incident is in scope when available evidence, future deterministic checks, replay output, or unresolved evidence conflicts indicate that a money movement, ledger representation, settlement outcome, reconciliation result, payout, refund, chargeback, bank posting, or provider state may be incorrect, incomplete, duplicated, delayed, contradictory, or unsupported.

Operational incidents that affect evidence collection, investigation, replay, or repair review are also in scope when they can affect the ability to prove financial truth.

## What this document defines

This document defines incident vocabulary, actors, statuses, severity language, type labels, common incident paths, evidence examples, correctness questions, failure patterns, and boundaries with adjacent M01 domain areas.

The terms are documentation-only vocabulary. They are intended to guide future schemas, deterministic invariants, incident workflows, causal graph modeling, replay outputs, agent tool contracts, repair proposals, and benchmark scenarios.

## What this document does not define

This document does not define incident schemas, database tables, API routes, workflow logic, severity scoring, invariant algorithms, graph nodes, replay algorithms, repair approval, repair application, evidence receipt schemas, human review states, UI behavior, connector behavior, or runtime classes.

This document does not authorize LLM agents to create financial truth, mutate money, approve repairs, delete evidence, post ledger entries, modify raw events, override deterministic checks, or close incidents without evidence-backed rules.

## Relationship to payment lifecycle vocabulary

Payment lifecycle vocabulary belongs to M01.01. Future incident work may use payment lifecycle terms to describe affected payments, refunds, chargebacks, lifecycle divergence, duplicate events, missing events, delayed events, provider state disagreement, and first divergence points.

M01.05 does not redefine payment lifecycle states or transitions.

## Relationship to ledger vocabulary

Ledger vocabulary belongs to M01.02. Future incident work may use ledger terms to describe affected accounts, ledger transactions, ledger entries, balances, posting expectations, reversals, suspense concepts, and ledger correctness incidents.

M01.05 does not define ledger posting behavior, balancing logic, account rules, or ledger mutation.

## Relationship to settlement vocabulary

Settlement vocabulary belongs to M01.03. Future incident work may use settlement terms to describe affected settlement rows, provider payouts, bank postings, settlement deductions, fees, reserves, releases, adjustments, and settlement ledger divergence.

M01.05 does not define settlement matching, payout reconciliation, bank posting rules, or settlement schemas.

## Relationship to reconciliation vocabulary

Reconciliation vocabulary belongs to M01.04. Future incident work may use reconciliation terms to describe exceptions, unmatched records, duplicate matches, contradictory evidence, reconciliation ledger divergence, reconciliation settlement divergence, false positives, and unresolved exceptions.

M01.05 does not define reconciliation algorithms, match thresholds, tolerances, or exception workflow logic.

## Relationship to future invariant engine

Future M06 invariant work may produce failed invariant signals that support incident detection. A failed invariant is a future deterministic signal, not an LLM judgment. Invariant results may identify money movement divergence, ledger imbalance, lifecycle impossibility, settlement mismatch, reconciliation exception, or evidence contradiction.

M01.05 does not define invariant algorithms, thresholds, severity scoring, or pass/fail rules.

## Relationship to future incident engine

Future M07 incident engine work may use this vocabulary to define incident records, lifecycle transitions, deduplication, correlation, ownership, escalation, and closure requirements. Incident creation must remain anchored to deterministic signals, raw evidence, canonical events, replay outputs, evidence bundles, or human review according to future rules.

M01.05 does not implement incident creation or workflow transitions.

## Relationship to future causal graph

Future M08 causal graph work may link incidents to affected payments, ledger entries, settlement rows, payouts, bank statement lines, refunds, chargebacks, provider events, evidence bundles, replay results, hypotheses, and repair proposals.

Every future causal relationship must be evidence-linked or deterministically derived. M01.05 does not define graph node types, edge types, traversal, ranking, or storage.

## Relationship to future replay engine

Future M09 replay work may reconstruct the incident timeline, first divergence point, affected records, invariant outcomes, evidence arrival order, and whether a closed incident must reopen after failed replay.

Replay must be deterministic and reproducible. M01.05 does not define replay inputs, snapshots, clocks, ordering rules, or output schemas.

## Relationship to future agentic investigation

Future M11 agentic investigation may use this vocabulary to summarize evidence, generate hypotheses, compare possible causes, explain uncertainty, identify missing evidence, and draft non-authoritative memos.

The AI investigator is a read-only assistant only. It can help summarize and hypothesize, but it cannot decide financial truth, mutate money, approve repairs, delete evidence, post ledger entries, modify raw events, override deterministic checks, close incidents as financially true, or treat confidence as proof.

## Relationship to future repair planner

Future M12 repair planner work may use incident vocabulary to decide when a repair candidate can be proposed for human review. Repair proposals must remain proposals only and require evidence, deterministic validation, replay or simulation where future rules require it, idempotency, rollback considerations, and human approval before any future application path.

M01.05 does not define safe repair types, unsafe repair types, repair approval, repair application, rollback, idempotency, or money mutation. Safe and unsafe repair vocabulary belongs to M01.06.

## Relationship to future MoneyFlowBench scenarios

Future MoneyFlowBench scenarios may use incident vocabulary to describe scenario signals, failed invariant support, affected objects, first divergence points, evidence conflicts, root-cause hypotheses, false positives, duplicate incidents, repair candidate boundaries, escalation quality, hallucination risks, and closure evidence.

M01.05 does not define scenario schemas, benchmark runners, scoring code, answer files, or product behavior.

## Core incident concepts

| Term | Incident meaning |
| --- | --- |
| Incident | A tracked condition requiring investigation because evidence, deterministic checks, replay, or unresolved conflicts suggest something may be wrong, incomplete, contradictory, duplicated, delayed, unsupported, or operationally blocked. |
| Financial incident | An incident that may affect financial truth, balances, money movement state, customer obligations, merchant or seller funds, settlement, payout, refund, chargeback, bank posting, accounting representation, or audit evidence. |
| Money movement incident | A financial incident involving a payment, payout, refund, chargeback, settlement movement, bank posting, ledger movement, provider state, or money movement evidence. |
| Operational incident | An incident involving evidence collection, provider availability, webhook delivery, replay availability, investigation workflow, or human review workflow that can affect the ability to prove or repair financial truth. |
| Incident trigger | The signal or condition that caused an incident to be opened or considered, such as a future failed invariant, unresolved evidence conflict, reconciliation exception, missing event, duplicate event, delayed event, or failed replay. |
| Detection source | The source that produced or surfaced the trigger, such as a deterministic invariant, reconciliation run, replay output, provider report, bank file, operator review, support escalation, or future benchmark scenario. |
| Failed invariant | A future deterministic signal showing that a defined rule did not hold. A failed invariant can support incident detection but is not defined in this document. |
| Anomaly | A weak signal that something may be unusual. An anomaly alone is not financial truth and should not create unsupported conclusions without evidence or future deterministic support. |
| Incident type | A vocabulary label for the broad class of incident, such as payment lifecycle, ledger correctness, settlement, reconciliation, payout, refund, chargeback, bank posting, duplicate event, missing event, delayed event, or evidence contradiction. |
| Incident status | A vocabulary label describing where the incident is in investigation, evidence gathering, confirmation, repair candidate review, resolution, closure, duplicate handling, reopening, false-positive handling, or deferral. |
| Severity | The seriousness of the incident based on conceptual dimensions such as affected amount, affected parties, loss risk, customer harm risk, operational urgency, evidence confidence, reversibility, and regulatory or audit relevance. |
| Priority | The ordering of work based on severity, urgency, human availability, operational load, regulatory sensitivity, or business need. Priority does not replace severity or evidence. |
| Impact | The observed or potential effect of an incident on financial truth, customers, merchants or sellers, accounts, operations, compliance, support, engineering, or auditability. |
| Affected amount | The monetary amount known or suspected to be affected. If unknown, the incident should say so rather than inventing an amount. |
| Affected currency | The currency tied to the affected amount or records. Currency must stay explicit because amount alone is incomplete. |
| Affected customer | A customer whose payment state, funds, obligation, refund, dispute, support experience, or evidence trail may be affected. |
| Affected merchant or seller | A merchant or seller whose payout, settlement, account balance, fee, reserve, adjustment, refund, chargeback, or evidence trail may be affected. |
| Affected account | A future ledger, provider, bank, merchant, seller, customer, suspense, clearing, payable, receivable, revenue, fee, reserve, or adjustment account that may be involved. |
| Affected payment | A payment whose lifecycle, provider state, ledger representation, settlement treatment, reconciliation result, or evidence support may be affected. |
| Affected payout | A payout whose provider, settlement, bank, ledger, reconciliation, or evidence state may be affected. |
| Affected refund | A refund whose lifecycle, settlement deduction, bank movement, ledger representation, or evidence trail may be affected. |
| Affected chargeback | A chargeback or dispute outcome whose lifecycle, settlement deduction, bank movement, ledger representation, or evidence trail may be affected. |
| Value at risk | The amount or exposure that could become loss, overpayment, underpayment, unreconciled funds, customer harm, merchant harm, or audit risk if the incident remains unresolved. |
| Blast radius | The set of affected or potentially affected customers, merchants or sellers, accounts, payments, payouts, refunds, chargebacks, providers, bank postings, periods, systems, or evidence bundles. |
| Customer impact | The observed or potential harm to customers, including incorrect charge state, delayed refund, missing payment confirmation, support burden, disputed obligation, or unclear communication. |
| Business impact | The observed or potential harm to the business, including financial loss, operational load, support escalation, audit exposure, regulatory relevance, provider dispute, reporting delay, or reputational risk. |
| Evidence link | A reference to raw evidence, canonical events, ledger records, settlement rows, reconciliation exceptions, replay output, evidence bundle references, human notes, or other supporting artifacts. |
| Evidence bundle | Boundary note only: a future packaged set of evidence and provenance. Evidence bundle structure belongs to later evidence and bundle work, not this document. |
| Suspected root cause | A possible explanation for the incident that is not yet confirmed. It must remain provisional and evidence-linked. |
| Confirmed root cause | An explanation supported by sufficient evidence, deterministic checks, replay, or future human review rules. M01.05 does not define those confirmation rules. |
| Hypothesis | A proposed explanation that helps guide investigation. A hypothesis is not proof and must be tested against evidence. |
| Confidence | A support signal only. Confidence can communicate strength of support or uncertainty, but it cannot replace evidence, deterministic checks, replay, or human approval. |
| Owner | The person or role accountable for driving the incident toward evidence-backed resolution. |
| Assignee | The person or role currently responsible for the next investigation, evidence, engineering, finance, support, or review action. |
| Escalation | The act of raising an incident to additional roles or higher urgency because of severity, risk, blocked evidence, customer harm, audit relevance, or unresolved status. |
| Timeline | The ordered record of signals, evidence arrival, status changes, hypotheses, confirmations, repair candidate review, resolution activity, closure, reopening, and notes. |
| First divergence point | The earliest known point where expected state and observed evidence diverged. This may be a lifecycle event, ledger posting, settlement row, payout, bank line, refund, chargeback, reconciliation result, or replay step. |
| Related incident | An incident connected by evidence, affected objects, source systems, root cause, timing, provider behavior, or operational context. |
| Duplicate incident | An incident that describes the same underlying problem as another incident and should be linked to a parent or canonical incident rather than investigated as independent truth. |
| Parent incident | The canonical or broader incident that one or more child or duplicate incidents are linked to. |
| Child incident | A narrower or dependent incident linked to a parent incident because it shares cause, evidence, affected scope, or investigation context. |
| Incident deduplication | The process of identifying incidents that describe the same underlying problem. Deduplication should preserve evidence and links rather than erase useful history. |
| Incident correlation | The process of associating incidents that may share cause, affected objects, evidence, timing, provider behavior, or operational impact. Correlation is not proof of causation. |
| Resolution | The evidence-backed state where the incident has an accepted explanation, operational outcome, repair candidate result, false-positive conclusion, duplicate link, deferral, or closure path under future rules. |
| Closure | The status where the incident is no longer active because future rules say resolution, duplicate handling, false-positive handling, or deferral evidence is sufficient. Closure can be reopened by new evidence or failed replay. |
| Post-incident note | A durable note describing lessons, evidence gaps, follow-up work, risk, or operational improvements after resolution or closure. A note is explanatory, not financial truth. |

The vocabulary includes incident, financial incident, money movement incident, operational incident, incident trigger, detection source, failed invariant, anomaly, incident type, incident status, severity, priority, impact, affected amount, affected currency, affected customer, affected merchant or seller, affected account, affected payment, affected payout, affected refund, affected chargeback, value at risk, blast radius, customer impact, business impact, evidence link, evidence bundle, suspected root cause, confirmed root cause, hypothesis, confidence, owner, assignee, escalation, timeline, first divergence point, related incident, duplicate incident, parent incident, child incident, incident deduplication, incident correlation, resolution, closure, and post-incident note as documentation-only terms.

## Incident actors and consumers

| Actor or consumer | Vocabulary meaning |
| --- | --- |
| Payment operations user | A user who investigates payment lifecycle, provider state, webhook, refund, chargeback, payout, and customer-impact questions. |
| Finance operations user | A user who investigates settlement, payout, bank posting, ledger representation, accounting, reconciliation, and finance close questions. |
| Support user | A user who needs evidence-backed incident context to answer customer, merchant, or seller questions without inventing financial facts. |
| Platform engineer | A user who investigates infrastructure, ingestion, webhook delivery, replay availability, deterministic check execution, and operational reliability. |
| Ledger engineer | A user who investigates ledger representation, posting expectations, account behavior, balance movement, corrections, and deterministic ledger checks. |
| Risk or compliance observer | A read or review participant who needs auditability, evidence links, regulatory relevance, and boundary clarity. |
| AI investigator | A read-only assistant only. It may summarize, hypothesize, compare evidence, identify missing evidence, and draft memos, but it cannot decide financial truth, mutate money, approve repairs, delete evidence, post ledger entries, modify raw events, or override deterministic checks. |
| Human reviewer | Boundary note only: a future human role that may review evidence, approve or reject repair proposals, or accept closure under future human review vocabulary. Detailed human review states belong to M01.08. |
| External provider | Evidence source only, such as a payment provider, processor, bank, network, settlement source, or webhook source. Provider text or metadata is not automatically financial truth without evidence handling and deterministic interpretation. |
| Customer | Affected party only. A customer may be affected by payment, refund, dispute, support, or communication outcomes. |
| Merchant or seller | Affected party only. A merchant or seller may be affected by payout, settlement, reserve, fee, adjustment, refund, chargeback, or account outcomes. |

## Incident statuses

These statuses are vocabulary labels only. They do not define a state machine, transition guard, database schema, human approval model, or workflow implementation.

| Status | Vocabulary meaning | Terminal meaning |
| --- | --- | --- |
| `incident_detected` | A trigger or evidence conflict has surfaced a potential incident. | Non-terminal. |
| `triage_pending` | The incident is waiting for initial classification, scope review, ownership, or priority assessment. | Non-terminal. |
| `investigating` | An owner or assignee is gathering evidence, checking deterministic outputs, reviewing timelines, or evaluating hypotheses. | Non-terminal. |
| `evidence_requested` | Additional provider, bank, ledger, lifecycle, replay, reconciliation, or human context is needed. | Non-terminal. |
| `evidence_complete` | The available evidence needed for the current investigation question is present under future rules. This does not mean the incident is resolved. | Non-terminal. |
| `root_cause_hypothesized` | A suspected root cause has been proposed and linked to evidence, but not confirmed. | Non-terminal. |
| `root_cause_confirmed` | A root cause is supported by future confirmation rules using evidence, deterministic checks, replay, or review. | Non-terminal. |
| `repair_candidate_identified` | A possible repair path or non-repair resolution path has been identified after root cause support. | Non-terminal. |
| `awaiting_human_review` | A future human review step is needed before repair, closure, or other sensitive action continues. Detailed human review states belong to M01.08. | Non-terminal. |
| `resolution_in_progress` | The accepted resolution path is being executed or tracked under future rules. M01.05 does not define repair application. | Non-terminal. |
| `resolved` | The incident has an evidence-backed resolution outcome under future rules. | Usually terminal before closure, but may reopen with new evidence or failed replay. |
| `closed` | The incident is no longer active because closure criteria are met under future rules. | Terminal unless reopened. |
| `reopened` | A previously closed or resolved incident became active again because new evidence, failed replay, failed invariant, or contradicted resolution invalidated closure. | Non-terminal. |
| `false_positive` | The incident was determined to not represent the suspected problem under future evidence and deterministic rules. | Terminal only after closure. |
| `duplicate_incident` | The incident duplicates another incident and should be linked to the parent or canonical incident. | Terminal for independent investigation, not for the parent incident. |
| `deferred` | Work is intentionally paused or accepted as unresolved for a stated reason under future review rules. | Terminal only if future rules allow deferral closure; otherwise non-terminal. |

Terminal labels describe vocabulary expectations. Future M07 and M13 work must define exact transitions, human review states, reopen rules, closure evidence, audit requirements, and permissions.

## Incident severity vocabulary

Severity communicates seriousness, not work ordering by itself. Priority may differ from severity when operational constraints, urgency, or review availability require it. Severity scoring is not implemented or defined here.

| Severity | Vocabulary meaning |
| --- | --- |
| `informational` | Evidence or a weak signal is worth tracking, but no known financial harm, customer harm, or urgent operational action is currently indicated. |
| `low` | Limited affected scope, low financial exposure, low customer harm risk, and likely reversible or easily explainable impact. |
| `medium` | Material investigation is needed because affected amount, affected parties, evidence conflict, or operational urgency is meaningful but not clearly severe. |
| `high` | Significant financial exposure, customer or merchant impact, operational urgency, audit relevance, evidence contradiction, or hard-to-reverse outcome is present or likely. |
| `critical` | Severe money movement risk, broad blast radius, major customer harm, regulatory or audit relevance, active loss risk, or blocked proof of financial truth requires urgent attention. |

Conceptual severity dimensions include:

- affected amount.
- affected customer count.
- affected merchant or seller count.
- financial loss risk.
- customer harm risk.
- operational urgency.
- evidence confidence.
- reversibility.
- regulatory or audit relevance.

Evidence confidence can affect severity discussion, but confidence is a support signal only. It must not replace evidence, deterministic checks, replay, or human approval.

## Incident type vocabulary

Incident types are vocabulary labels only. They are not implemented incident classes.

| Incident type | Vocabulary meaning |
| --- | --- |
| `payment_lifecycle_incident` | Affected payment lifecycle state, transition, provider state, event ordering, or lifecycle evidence appears incorrect, missing, duplicated, delayed, contradictory, or unsupported. |
| `ledger_correctness_incident` | Ledger representation, account behavior, transaction, entry, balance, posting expectation, or double-entry correctness appears affected. |
| `settlement_incident` | Settlement row, settlement batch, payout, deduction, fee, reserve, release, adjustment, or settlement evidence appears affected. |
| `reconciliation_incident` | Reconciliation matching, exception, unmatched record, duplicate match, false match, variance, or unresolved exception appears affected. |
| `payout_incident` | Provider payout, merchant or seller payout, bank posting, payout ledger representation, or payout evidence appears affected. |
| `refund_incident` | Refund lifecycle, provider refund state, settlement deduction, ledger treatment, bank movement, or evidence trail appears affected. |
| `chargeback_incident` | Dispute or chargeback lifecycle, settlement deduction, ledger treatment, bank movement, customer or merchant obligation, or evidence trail appears affected. |
| `bank_posting_incident` | Bank statement line, posting date, amount, currency, reference, payout receipt, refund movement, chargeback movement, or bank evidence appears affected. |
| `duplicate_event_incident` | The same event, payload, webhook, provider state, ledger representation, settlement row, or evidence item appears counted or processed more than once. |
| `missing_event_incident` | An expected event, payload, ledger record, settlement row, bank line, replay step, or evidence item is absent. |
| `delayed_event_incident` | An expected event or evidence item appears late enough to affect state, reconciliation, replay, support, or closure. |
| `provider_state_disagreement` | Provider state and internal state, ledger state, settlement state, bank state, or replay output disagree. |
| `ledger_lifecycle_divergence` | Payment lifecycle evidence and ledger representation diverge. |
| `settlement_ledger_divergence` | Settlement evidence and ledger representation diverge. |
| `reconciliation_exception_incident` | A reconciliation exception becomes an incident because it is material, aged, contradictory, unresolved, duplicated, or otherwise requires incident handling. |
| `evidence_contradiction_incident` | Available evidence conflicts in a way that prevents supported financial truth. |
| `unresolved_money_movement_incident` | A money movement remains unresolved after available evidence, deterministic checks, replay, or review cannot support a conclusion. |

## Incident paths

These paths name common incident narratives for future deterministic checks, workflows, and scenarios. They do not implement workflow logic.

| Path | Vocabulary sequence |
| --- | --- |
| Detection path | signal -> failed invariant or unresolved evidence -> `incident_detected` -> `triage_pending` |
| Investigation path | `triage_pending` -> `investigating` -> `evidence_requested` or `evidence_complete` -> `root_cause_hypothesized` |
| Confirmation path | `root_cause_hypothesized` -> evidence review -> `root_cause_confirmed` |
| Repair candidate path | `root_cause_confirmed` -> `repair_candidate_identified` -> `awaiting_human_review` |
| Resolution path | `awaiting_human_review` -> `resolution_in_progress` -> `resolved` -> `closed` |
| False positive path | `incident_detected` -> `investigating` -> `false_positive` -> `closed` |
| Duplicate incident path | `incident_detected` -> `duplicate_incident` -> linked to parent incident |
| Reopened path | `closed` -> new evidence or failed replay -> `reopened` |

## Incident evidence examples

Examples of evidence that may later support incidents:

- Provider event.
- Payment lifecycle event.
- Ledger transaction.
- Ledger entry.
- Settlement row.
- Provider payout.
- Bank statement line.
- Reconciliation exception.
- Refund record.
- Chargeback record.
- Webhook delivery log.
- Raw payload hash.
- Evidence bundle reference.
- Causal graph reference.
- Replay result reference.
- Agent memo, as non-authoritative explanation only.
- Human note.

These examples are conceptual. M01.05 does not define evidence schemas, evidence receipt structure, bundle contents, graph references, replay artifacts, hashes, retention policy, connector payloads, or incident storage.

## Questions CausalLedger asks about incidents

- What signal created the incident?
- Which invariant or evidence conflict supports the incident?
- Which money movement objects are affected?
- What is the affected amount and currency?
- Which customers, merchants, sellers, accounts, payments, refunds, payouts, or chargebacks are affected?
- What is the first known divergence point?
- Is the incident caused by missing, duplicated, delayed, contradictory, or unsupported evidence?
- Is the incident still unresolved?
- Is there enough evidence to support a root-cause hypothesis?
- Is the proposed explanation supported by evidence?
- Is this incident a duplicate of another incident?
- Is this incident a false positive?
- Is human review required before any repair is considered?

These questions are future deterministic-check, workflow, and benchmark candidates. They are not implemented incident logic.

## Incident failure patterns

These failure patterns are vocabulary only. They do not implement incident tests, invariants, workflow logic, graph logic, replay logic, repair validation, or automated decisions.

| Pattern | Incident meaning |
| --- | --- |
| Incident without evidence | An incident exists without evidence links, deterministic support, replay support, or a stated unresolved evidence gap. |
| Unsupported root-cause claim | A root cause is asserted without evidence, deterministic checks, replay support, or future human review support. |
| Duplicate incident | Multiple incidents describe the same underlying problem without deduplication or parent linking. |
| Stale incident | An incident remains open without recent investigation, evidence request, owner action, deferral, or closure reason. |
| Unresolved incident | The incident lacks enough evidence or accepted explanation to resolve or close. |
| False positive incident | A detected incident does not represent the suspected problem under future evidence and deterministic rules. |
| Wrong severity | Severity does not match affected amount, affected parties, risk, urgency, reversibility, confidence, or audit relevance. |
| Missing affected amount | The incident fails to state the known affected amount or explicitly say it is unknown. |
| Missing affected entity | The incident fails to identify affected customers, merchants, sellers, accounts, payments, payouts, refunds, chargebacks, or explicitly say they are unknown. |
| Missing first divergence point | The incident fails to identify the earliest known divergence or explain why it is unknown. |
| Missing evidence link | The incident lacks links to supporting evidence, unresolved evidence requests, or future evidence bundle references. |
| Contradictory evidence | Evidence sources disagree and the incident does not preserve or explain the conflict. |
| Incident closed without resolution evidence | The incident is closed without evidence-backed resolution, duplicate handling, false-positive support, deferral support, or closure criteria. |
| Incident reopened after failed replay | A replay contradicts prior closure and the incident must become active again under future rules. |
| Agent memo without evidence IDs | An agent memo makes claims without citing evidence IDs or evidence links and must remain non-authoritative. |
| Repair proposed before root cause is supported | A repair candidate is proposed before root cause has sufficient evidence support under future rules. |
| Incident not linked to relevant lifecycle, ledger, settlement, or reconciliation records | The incident omits available links to affected domain records, making proof, replay, or repair review weaker. |

## Boundaries with other M01 areas

- Payment lifecycle vocabulary belongs to M01.01.
- Ledger vocabulary belongs to M01.02.
- Settlement vocabulary belongs to M01.03.
- Reconciliation vocabulary belongs to M01.04.
- Safe and unsafe repair vocabulary belongs to M01.06.
- Evidence receipt model belongs to M01.07.
- Human review states belong to M01.08.

M01.05 may reference those areas only as boundaries or future dependencies. It does not fully define them here.

Safe repair types, unsafe repair types, repair approval, repair safety, rollback, idempotency, and repair application belong to M01.06 and later repair work. Evidence receipt schema, evidence bundle structure, provenance receipts, and retention rules belong to M01.07 and later evidence work. Detailed human approval states, reviewer states, approval records, rejection states, and review workflow belong to M01.08 and later human review work.

## Non-implementation statement

This document is vocabulary only. No incident runtime logic, schemas, state machines, workflow engine, graph traversal, replay engine, repair planner, UI, API, database, connector, GitHub Action, CI workflow, or product behavior is implemented by M01.05.
