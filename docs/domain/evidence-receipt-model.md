# Evidence Receipt Model

## Purpose

The evidence receipt model gives CausalLedger precise vocabulary for naming how source evidence is identified, referenced, preserved, limited, redacted, conflicted, bundled, and audited before future ingestion, storage, replay, incident, graph, repair, and human review implementation begins.

No runtime implementation is defined or claimed by this document.

This document exists so future MoneyEvent schema work, evidence bundle work, deterministic invariants, incident timelines, causal graph relationships, replay sessions, agentic investigation, repair proposals, and human review can cite source evidence without letting LLM output replace evidence or become financial truth.

## Evidence receipt scope

An evidence receipt is in scope when CausalLedger needs a durable vocabulary record that some evidence exists, where it came from, when it was observed or received, how it can be referenced, what limitations apply, and how derived summaries remain tied to source evidence.

The scope covers vocabulary for source evidence, raw references, normalized references, provenance, chain of custody, checksums or hashes, timestamps, freshness, retention, redaction, confidentiality, uncertainty, confidence, limitations, conflicts, coverage, gaps, bundles, statuses, rejection reasons, append-only handling, raw evidence immutability, derived evidence boundaries, and audit trails.

The scope is conceptual. It does not define a schema, parser, database, storage backend, API, connector, ingestion worker, file format, retention engine, access-control system, redaction implementation, hash algorithm, or evidence-processing runtime.

## What this document defines

This document defines evidence receipt vocabulary, safety boundaries, relationships to prior M01 docs, evidence support expectations, missing-evidence handling, conflict handling, redaction boundaries, append-only and immutable raw evidence language, and why evidence receipts are central to the CausalLedger moat.

The terms are documentation-only vocabulary. Future implementation milestones may turn them into schemas, deterministic validators, storage records, replay inputs, graph references, incident evidence links, and repair proposal requirements.

## What this document does not define

This document does not define product functionality, evidence ingestion runtime, evidence storage, databases, APIs, schemas, file parsers, external connectors, MoneyEvent runtime behavior, ledger runtime behavior, incident runtime behavior, repair execution, agent runtime, GitHub Actions, CI workflows, deployment, authentication, authorization, structured logging, or production readiness.

This document does not authorize LLM agents to mutate money, approve repairs, delete evidence, modify raw evidence, post ledger entries, modify raw events, override deterministic invariants, hide evidence conflicts, turn summaries into evidence, or claim unsupported financial facts.

## Relationship to payment lifecycle vocabulary

Payment lifecycle vocabulary belongs to M01.01. Evidence receipts may later reference provider events, webhook payloads, provider API records, refund records, dispute records, chargeback records, payout reports, bank posting evidence, and lifecycle references.

M01.07 does not redefine payment lifecycle phases or implement lifecycle event ingestion. It defines how evidence supporting those lifecycle terms should remain source-linked, limited, and auditable in future work.

## Relationship to ledger vocabulary

Ledger vocabulary belongs to M01.02. Evidence receipts may later support ledger facts, ledger entries, source references, evidence references, balances, reversals, adjustments, suspense questions, and immutable ledger record explanations.

M01.07 does not define ledger schemas, posting behavior, balancing logic, account state, ledger mutation, or ledger truth. Evidence receipts can support ledger investigation, but they do not post ledger entries and do not become ledger truth by themselves.

## Relationship to settlement vocabulary

Settlement vocabulary belongs to M01.03. Evidence receipts may later reference settlement files, settlement rows, payout reports, provider balance transactions, fee reports, reserve evidence, adjustment rows, chargeback reports, refund reports, and bank postings.

M01.07 does not define settlement parsing, settlement math, payout matching, provider integrations, or bank import behavior.

## Relationship to reconciliation vocabulary

Reconciliation vocabulary belongs to M01.04. Evidence receipts may later support reconciliation sources and targets, match candidates, confirmed matches, exceptions, unresolved records, evidence gaps, false matches, and reconciliation explanations.

M01.07 does not define matching algorithms, tolerances, reconciliation run state machines, or exception closure rules. Missing or conflicting evidence should be surfaced as a limitation, conflict, or gap rather than hidden.

## Relationship to incident vocabulary

Incident vocabulary belongs to M01.05. Evidence receipts may later support incident triggers, detection sources, affected objects, evidence links, timelines, first divergence points, suspected root causes, confirmed root causes, and reopening decisions.

M01.07 does not define incident schemas, incident creation logic, severity scoring, ownership workflow, closure rules, or incident storage.

## Relationship to repair vocabulary

Repair vocabulary belongs to M01.06. Repair proposals from M01.06 require evidence-backed support. Evidence receipts give future repair proposals a vocabulary for citing raw evidence references, normalized evidence references, provenance, confidence, uncertainty, limitations, conflicts, gaps, redaction, audit trail, and retention state.

M01.07 does not define repair schemas, repair validators, repair approval, repair application, provider retry execution, ledger posting, or repair runtime behavior. A repair proposal can cite evidence receipts as support, but evidence receipts do not approve the proposal.

## Relationship to future human review

Human review states belong to M01.08. This document may briefly reference future human review as a boundary when evidence is missing, conflicted, confidential, redacted, or destructive to mutate.

M01.07 does not define reviewer states, approval state machines, reviewer identity records, approval records, rejection records, review queue behavior, or review UI.

## Core evidence receipt concepts

| Term | Evidence receipt meaning |
| --- | --- |
| Evidence receipt | A durable vocabulary record that source evidence was observed or received, with references, source identity, provenance, timestamps, integrity clues, limitations, confidentiality, and audit context. It is a receipt for evidence presence and handling, not financial truth by itself. |
| Evidence source | The system, provider, bank, ledger export, settlement file, reconciliation report, support system, operator note, simulator output, or other origin that produced or exposed evidence. |
| Source identity | The stable identity attributes used to distinguish where evidence came from, such as provider name, account, environment, tenant, connector, file origin, webhook source, bank, export job, or human source role. |
| Evidence provider | The external or internal party, system, or process that supplies evidence to CausalLedger. A provider may be a PSP, bank, internal ledger, support tool, finance operator, simulator, or future connector. |
| Raw evidence reference | A pointer to the original evidence as received or observed, such as a payload, file, row, webhook, statement line, export, screenshot, note, or future archive record. It should preserve enough identity to find the raw item without embedding sensitive data in every downstream document. |
| Normalized evidence reference | A pointer to a future canonical or transformed representation derived from raw evidence. It must remain linked to raw evidence and must not replace the raw evidence reference. |
| Provenance | The record of origin, source identity, collection context, handling steps, derivations, timestamps, integrity checks, redaction boundaries, and actor or system involvement for evidence. |
| Chain of custody | The ordered handling record from evidence source to receipt to derived reference to bundle, including who or what observed, received, transformed, redacted, linked, reviewed, or rejected the evidence. |
| Checksum or hash | A deterministic integrity clue over raw or derived evidence content. Future implementation must define algorithms and exact coverage. M01.07 names the concept only. |
| Evidence timestamp | The time stated by the evidence itself, such as provider event time, bank posting time, settlement file date, ledger posting time, support note time, or source-system creation time. |
| Ingestion timestamp | A future system timestamp for when evidence enters a CausalLedger ingestion boundary. M01.07 names the term but does not implement ingestion. |
| Observation timestamp | The time CausalLedger, a connector, a human, or a future tool first observed the evidence, which may differ from when the evidence was created or received. |
| Received-at timestamp | The time evidence was received by a future CausalLedger boundary or recorded as received by an operator or source system. The phrase received-at timestamp is vocabulary only here. |
| Evidence freshness | A description of whether evidence is current enough for the question being investigated, considering source lag, expected file cadence, event delivery delay, provider availability, and known clock differences. |
| Evidence retention state | A vocabulary label for whether evidence is expected to be retained, archived, expired, legally held, redacted, quarantined, rejected, or pending policy review. This does not implement retention policy. |
| Redaction boundary | The line between sensitive data that must be protected and audit data that must remain traceable. Redaction should hide sensitive values without destroying provenance, hashes, source references, or reviewability. |
| Evidence confidentiality class | A vocabulary label for the sensitivity of evidence, such as public, internal, confidential, restricted, regulated, payment-sensitive, bank-sensitive, customer-sensitive, or secret-bearing. This does not implement access control. |
| Evidence uncertainty | Any ambiguity, missing context, source ambiguity, clock discrepancy, weak reference, redaction effect, transformation loss, or unresolved question that limits what the evidence can support. |
| Evidence confidence | A support signal describing how strongly the receipt and related evidence appear to support an investigation claim. Confidence is not proof and cannot replace source evidence, deterministic checks, replay, or human approval. |
| Evidence limitation | A stated constraint on what evidence can prove, such as partial file coverage, missing source identity, delayed delivery, redaction, weak reference keys, unsupported timestamps, or incomplete chain of custody. |
| Evidence conflict | A condition where two or more evidence items disagree about state, amount, currency, timing, identity, source reference, outcome, or handling. Conflicts must be surfaced and preserved, not hidden. |
| Evidence coverage | The portion of an investigation question, time period, source set, object set, or money movement path covered by available evidence. Coverage can be complete, partial, unknown, stale, or contradictory. |
| Evidence gap | A missing, unavailable, delayed, inaccessible, rejected, expired, or insufficient evidence item needed to support an investigation, invariant, replay, incident conclusion, or repair proposal. |
| Evidence bundle | A future packaged set of evidence receipts, raw references, normalized references, provenance, limitations, conflicts, gaps, replay references, and review context for an investigation or repair question. M01.07 defines vocabulary only, not bundle schema or export behavior. |
| Evidence receipt status | A vocabulary label describing the handling state of an evidence receipt, such as received, accepted, rejected, quarantined, superseded by later evidence, limited, conflicted, redacted, bundled, or retained. |
| Evidence rejection reason | The explicit reason evidence cannot be accepted for a question or must be quarantined, such as unknown source identity, failed checksum, unsupported format, missing provenance, destructive handling risk, confidentiality violation, duplicate ambiguity, or suspected tampering. |
| Append-only evidence handling | A safety principle that evidence history should be extended with new receipts, corrections, redaction records, or rejection records rather than silently overwritten. |
| Immutable raw evidence boundary | The boundary that raw evidence must not be silently modified, rewritten, backfilled, or deleted to make an investigation easier. Corrections should be append-only and traceable. |
| Derived evidence boundary | The boundary that summaries, normalized references, extracted fields, agent memos, screenshots, translations, and transformations are derived artifacts. They must stay linked to source evidence and must not replace raw evidence. |
| Evidence audit trail | The durable record of evidence receipt, handling, transformation, redaction, review, rejection, bundling, access, retention, limitation, conflict, and destructive-action approval where future rules permit it. |

The vocabulary includes evidence receipt, evidence source, source identity, evidence provider, raw evidence reference, normalized evidence reference, provenance, chain of custody, checksum or hash, evidence timestamp, ingestion timestamp, observation timestamp, received-at timestamp, evidence freshness, evidence retention state, redaction boundary, evidence confidentiality class, evidence uncertainty, evidence confidence, evidence limitation, evidence conflict, evidence coverage, evidence gap, evidence bundle, evidence receipt status, evidence rejection reason, append-only evidence handling, immutable raw evidence boundary, derived evidence boundary, and evidence audit trail as documentation-only terms.

## Evidence source examples

Evidence sources may include:

- payment provider webhook payloads;
- provider API records;
- provider dashboard exports;
- settlement files and settlement rows;
- payout reports;
- bank statements and bank transaction lines;
- internal payment records;
- internal ledger exports;
- reconciliation reports and exception files;
- refund and chargeback reports;
- support tickets and operator notes, as context rather than deterministic truth;
- simulator outputs from future controlled test systems.

These examples do not define connectors, file parsers, ingestion jobs, storage records, or source-specific schemas.

## Evidence receipt statuses

These statuses are vocabulary labels only. They do not define a state machine, storage model, transition guards, permissions, or workflow implementation.

| Status | Vocabulary meaning |
| --- | --- |
| `receipt_observed` | Evidence was seen by a human, system, or future connector, but receipt details may still be incomplete. |
| `receipt_received` | Evidence was recorded as received by a future CausalLedger boundary or by an operator. |
| `receipt_accepted` | Evidence appears usable for the scoped investigation question, subject to limitations, conflicts, and future deterministic validation. |
| `receipt_limited` | Evidence is usable only with stated limitations, such as partial coverage, redaction, weak reference keys, source lag, or missing context. |
| `receipt_conflicted` | Evidence conflicts with other evidence and must be preserved as a conflict rather than silently resolved. |
| `receipt_quarantined` | Evidence should not be used as support until a suspected integrity, source, confidentiality, format, or tampering issue is reviewed. |
| `receipt_rejected` | Evidence is not accepted for the scoped question, with an evidence rejection reason. Rejection must not delete the evidence trail. |
| `receipt_redacted` | Evidence has a redacted representation for safe handling, while auditability remains tied to raw evidence and provenance. |
| `receipt_bundled` | Evidence has been included in a future evidence bundle for an investigation, incident, replay, or repair proposal. |
| `receipt_retained` | Evidence is retained according to future policy, legal hold, archive, or audit needs. |
| `receipt_superseded` | Later evidence changes the investigation context, but the earlier receipt remains preserved and auditable. |

## Evidence rejection reasons

Evidence may be rejected, quarantined, or limited when any of these reasons apply:

- unknown evidence source;
- missing source identity;
- missing raw evidence reference;
- missing provenance;
- broken or missing checksum or hash where future rules require one;
- unsupported or malformed format;
- duplicate ambiguity;
- suspected tampering;
- chain-of-custody gap;
- confidentiality violation;
- destructive handling requirement;
- redaction destroyed auditability;
- evidence timestamp conflict;
- stale evidence for the scoped question;
- insufficient coverage;
- source text or operator note unsupported by raw evidence.

Rejection is not deletion. A rejected receipt should still preserve the fact that the evidence existed or was offered, why it was rejected, and what follow-up or limitation remains.

## Timestamp vocabulary

Evidence questions often depend on multiple clocks. M01.07 distinguishes these timestamps so future deterministic systems can avoid conflating them:

- Evidence timestamp: time stated by the evidence itself.
- Observation timestamp: time the evidence was first observed by CausalLedger, a future tool, or a human.
- Received-at timestamp: time the evidence was received at a future CausalLedger boundary or recorded as received.
- Ingestion timestamp: future system time for evidence entering an ingestion boundary.

These timestamps may disagree because of source lag, provider delays, file cutoffs, timezone differences, manual exports, retry behavior, or clock skew. Timestamp disagreement should create evidence uncertainty or evidence conflict instead of being silently normalized away.

## Raw and derived evidence boundaries

Raw evidence must not be silently modified. The immutable raw evidence boundary means CausalLedger should preserve the source item and record later corrections, redactions, replacements, limitations, or rejections as new traceable facts.

Derived evidence must remain subordinate to raw evidence. Normalized fields, summaries, extracted tables, LLM memos, translations, screenshots, or replay-ready references may help investigation, but they must keep links to raw evidence references and provenance. LLM output must not replace source evidence.

If raw evidence is missing or inaccessible, derived summaries must say so. A derived summary without source evidence is context at best, not proof.

## Redaction and confidentiality boundary

Redaction should protect sensitive data without destroying auditability. A redacted representation should preserve enough source identity, provenance, checksum or hash context, timestamp context, and reference structure for future review while hiding sensitive values that should not be broadly exposed.

Confidentiality classes are vocabulary only in M01.07. Future security and access-control work must define exact permissions, masking behavior, secret handling, audit logs, retention exceptions, and destructive-action controls.

Redaction must not be used to hide conflicts, erase inconvenient evidence, obscure failed validation, or make unsupported repair proposals appear safer.

## Evidence uncertainty, confidence, limitations, conflicts, coverage, and gaps

Evidence uncertainty describes what is unknown or ambiguous. Evidence confidence describes apparent support strength. Evidence limitation describes what the evidence cannot support. Evidence conflict describes disagreement. Evidence coverage describes what is covered. Evidence gap describes what is missing.

These concepts keep investigation honest:

- Unsupported claims should cite the evidence gap or limitation.
- Conflicting evidence must be surfaced, not hidden.
- Missing evidence must trigger limitation, evidence request, refusal, rejection, or escalation states rather than invented facts.
- Confidence must not replace raw evidence, deterministic invariants, replay, evidence bundles, or human approval.
- LLM summaries must explicitly link to source evidence and preserve uncertainty.

## Evidence bundles

An evidence bundle is a future packaged set of evidence receipts and related context for an incident, replay, causal graph view, repair proposal, audit review, or export.

An evidence bundle may later contain raw evidence references, normalized evidence references, provenance, chain-of-custody records, checksum or hash records, timestamp context, confidentiality classes, redaction boundaries, limitations, conflicts, gaps, replay references, incident references, repair proposal references, and human review references.

M01.07 does not define an evidence bundle schema, export format, storage model, signing model, UI, API, or runtime bundle generator.

## Safety boundary

CausalLedger may use evidence to investigate and support incident reasoning, but evidence receipts must remain within these boundaries:

- raw evidence must not be silently modified;
- evidence receipts must not become financial truth by themselves;
- LLM output must not replace source evidence;
- derived summaries must remain linked to source evidence;
- conflicting evidence must be surfaced, not hidden;
- missing evidence must trigger limitation, rejection, evidence request, refusal, or escalation states;
- redaction must protect sensitive data without destroying auditability;
- evidence mutation or deletion is a destructive action and must remain outside autonomous agent authority.

Evidence receipts can support investigation, replay, incident reasoning, deterministic validation, and repair proposals. They do not approve repairs, post ledger entries, mutate money, close incidents as financial truth, override invariants, or decide what happened without deterministic support.

## Questions CausalLedger asks about evidence receipts

- What is the evidence source?
- What source identity distinguishes this evidence from similar evidence?
- What raw evidence reference supports the claim?
- Is there a normalized evidence reference, and does it link back to raw evidence?
- What provenance and chain-of-custody details are known?
- Is there a checksum or hash, and what does it cover?
- Which timestamp is source-stated, observed, received, or future-ingested?
- Is the evidence fresh enough for the question being answered?
- What retention state and confidentiality class apply?
- Does redaction preserve auditability?
- What uncertainty, confidence, limitation, conflict, coverage, or gap remains?
- Does a repair proposal cite evidence receipts instead of relying on an agent assertion?
- Is any requested handling destructive or outside autonomous agent authority?

These questions are future deterministic-check, incident, replay, repair, and review candidates. They are not implemented logic.

## Evidence failure patterns

These failure patterns are vocabulary only. They do not implement detection, scoring, alerts, tests, storage, or rejection logic.

| Pattern | Evidence meaning |
| --- | --- |
| Missing raw evidence reference | A claim points only to a summary, note, or normalized record without a traceable raw source reference. |
| Missing source identity | Evidence lacks enough source identity to distinguish provider, account, tenant, environment, export, or origin. |
| Broken provenance | Origin, handling, transformation, redaction, or review context is absent or inconsistent. |
| Chain-of-custody gap | A handling step is missing between source evidence and derived use. |
| Checksum mismatch | A future checksum or hash does not match expected content or coverage. |
| Timestamp conflict | Evidence timestamp, observation timestamp, received-at timestamp, or ingestion timestamp disagree in a way that affects interpretation. |
| Stale evidence | Evidence is too old, delayed, or incomplete for the question being answered. |
| Redaction destroys auditability | Sensitive data is hidden in a way that prevents traceability, provenance review, or deterministic verification. |
| Confidentiality boundary breach | Evidence is exposed or linked beyond its permitted confidentiality class. |
| Derived evidence replaces raw evidence | A summary, normalized record, or LLM memo is treated as proof without raw evidence linkage. |
| Evidence conflict hidden | Conflicting source records are suppressed, overwritten, or not surfaced. |
| Evidence gap ignored | Missing evidence is not recorded, and the system or agent claims unsupported certainty. |
| Evidence deletion or mutation attempt | Raw evidence, audit trail, provenance, or rejection context is deleted, overwritten, or rewritten. |
| Repair proposal without evidence receipts | A repair proposal relies on agent reasoning or unsupported notes instead of evidence-backed support. |

## Why evidence receipts protect the CausalLedger moat

Evidence receipts are central to the CausalLedger moat because they make financial incident investigation auditable. They create durable links between raw source evidence, derived references, uncertainty, conflicts, replay context, incidents, and repair proposals.

They keep source evidence separate from LLM summaries. Agents can summarize evidence, explain uncertainty, identify gaps, and draft proposals, but the receipt model makes clear that summaries are derived artifacts and not financial truth.

They support replay and deterministic validation later by preserving source identity, timestamps, provenance, chain of custody, and integrity clues. Future replay and invariant work can reconstruct what was known, when it was known, and which evidence supported the conclusion.

They make repair proposals evidence-backed instead of agent-invented. A repair proposal that lacks evidence receipts should be limited, rejected, or escalated rather than treated as safe.

They support enterprise trust boundaries without claiming production runtime exists. The moat is not that CausalLedger has an autonomous agent that acts on money. The moat is that CausalLedger can preserve evidence, separate facts from summaries, expose conflicts, support deterministic replay, and keep humans accountable for destructive or financial decisions.

## Boundaries with other M01 areas

- Payment lifecycle vocabulary belongs to M01.01.
- Ledger vocabulary belongs to M01.02.
- Settlement vocabulary belongs to M01.03.
- Reconciliation vocabulary belongs to M01.04.
- Incident vocabulary belongs to M01.05.
- Safe and unsafe repair vocabulary belongs to M01.06.
- Human review states belong to M01.08.

M01.07 may reference these areas only as boundaries or future dependencies. It does not fully define human review states, production evidence storage, schemas, runtime ingestion, connectors, product APIs, or repair execution behavior.

## Non-implementation statement

This document is vocabulary only. No evidence ingestion runtime, evidence storage, database, schema, API, file parser, external connector, MoneyEvent runtime, ledger runtime, incident runtime, repair runtime, repair execution, agent runtime, GitHub Action, CI workflow, deployment, authentication, authorization, structured logging, or product behavior is implemented by M01.07.
