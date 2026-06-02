# Domain Model

## Status

M01.01 through M01.09 are defined domain vocabulary and boundary documents. M01.10 is `Completed and merged` after QA recovery PR #29 merged at git commit `a878d55` (`test: QA recovery M01.10 domain model summary (#29)`) and remains the canonical M01 domain model summary. M01.11 is `Completed and merged` after PR #30 merged at git commit `a424924` (`docs: write M01.11 reliability model (#30)`) and defines `docs/RELIABILITY.md` as the reliability model for the domain. M01.12 has written `docs/THREAT_MODEL.md` as the threat model for the domain and is `Completed and merged` after PR #31 merged; duplicate PR merges #32 and #33 from the same M01.12 branch are recorded as a process deviation.

M01.13 QA Domain Consistency produced `docs/status/M01_DOMAIN_CONSISTENCY.md` and merged at git commit `27c39b6` (`docs: run M01.13 domain consistency QA (#35)`). M01 closeout passed, and the completed M01 plan lives at `plans/completed/CLP-0002-m01-domain-model-and-scope-freeze.md`.

Product implementation has not started. This file is documentation only and does not implement MoneyEvent runtime logic, ledger runtime logic, settlement runtime logic, reconciliation runtime logic, incident runtime logic, invariants, causal graph runtime logic, replay runtime logic, agent runtime, repair planning runtime logic, human-review runtime logic, UI features, external connectors, database schemas, API routes, GitHub Actions, CI workflows, or product behavior.

## Product thesis

CausalLedger is a planned continuous payment lifecycle observability and incident-response system for fintech money movement. It is designed to build a living causal timeline from provider events, webhooks, ledger entries, settlement files, bank evidence, refunds, chargebacks, and provider failures so teams can find, prove, replay, and safely review repairs for money-movement breaks.

The safety thesis is non-negotiable: the LLM never owns financial truth.

LLM agents may investigate, summarize, and propose. LLM agents may not mutate money, approve repairs, delete evidence, post ledger entries, modify raw events, override deterministic invariants, or act as human reviewers.

## Domain model purpose

This domain model defines language and boundaries before schemas and runtime code. It prevents Codex and future implementation threads from inventing inconsistent terms for money movement, evidence, incidents, repair proposals, review states, and out-of-scope areas.

Future milestones should read this file first, then follow the linked source docs for detailed vocabulary. It supports future M03 MoneyEvent, M04 Ledger, M06 Invariant, M07 Incident, M08 Graph, M09 Replay, M10-M13 Agent/Repair/Human Review, and M14 MoneyFlowBench work while keeping scope constrained for a high-stakes fintech AI project.

`docs/RELIABILITY.md` now defines the reliability model for this domain: how financial truth, deterministic validation, evidence handling, replay, repair safety, human review, AI boundaries, cost controls, auditability, and ablations should stay trustworthy in future implementation milestones.

`docs/THREAT_MODEL.md` now defines the threat model for this domain: how evidence, deterministic truth boundaries, repair and human review boundaries, agent/tool boundaries, prompt injection, privacy, secrets, supply chain, model cost, ablations, operations, and governance can fail and which future milestones must implement mitigations.

## Core scope

CausalLedger domain scope includes:

- payment lifecycle correctness;
- continuous lifecycle observation;
- ledger correctness evidence;
- settlement and payout evidence;
- reconciliation breaks;
- living causal timelines;
- financial incidents and progressive certainty states;
- evidence receipts and bundles;
- safe repair proposal vocabulary;
- human review states;
- deterministic validation boundaries;
- AI-assisted investigation boundaries;
- benchmark and ablation evaluation planning.

This is not runtime implementation. These concepts are domain language for future implementation milestones, not working product features.

## Domain map

| Domain area | Source doc | Defined in submilestone | Primary future milestones using it |
| --- | --- | --- | --- |
| Payment lifecycle | [docs/domain/payment-lifecycle.md](domain/payment-lifecycle.md) | M01.01 | M03, M05, M06, M07, M08, M09 |
| Ledger vocabulary | [docs/domain/ledger-vocabulary.md](domain/ledger-vocabulary.md) | M01.02 | M04, M06, M07, M08, M09, M12 |
| Settlement vocabulary | [docs/domain/settlement-vocabulary.md](domain/settlement-vocabulary.md) | M01.03 | M05, M06, M07, M08, M09, M16 |
| Reconciliation vocabulary | [docs/domain/reconciliation-vocabulary.md](domain/reconciliation-vocabulary.md) | M01.04 | M06, M07, M08, M09, M14 |
| Incident vocabulary | [docs/domain/incident-vocabulary.md](domain/incident-vocabulary.md) | M01.05 | M07, M08, M09, M11, M14 |
| Repair vocabulary | [docs/domain/repair-vocabulary.md](domain/repair-vocabulary.md) | M01.06 | M12, M13, M18 |
| Evidence receipt model | [docs/domain/evidence-receipt-model.md](domain/evidence-receipt-model.md) | M01.07 | M03, M07, M08, M09, M11, M14, M18 |
| Human review states | [docs/domain/human-review-states.md](domain/human-review-states.md) | M01.08 | M12, M13, M18, M20 |
| Out-of-scope domains | [docs/domain/out-of-scope-domains.md](domain/out-of-scope-domains.md) | M01.09 | All future milestones |

## Domain source documents

The detailed source documents remain authoritative for their own vocabulary boundaries:

- [docs/domain/payment-lifecycle.md](domain/payment-lifecycle.md) defines payment lifecycle actors, objects, phases, paths, evidence examples, uncertainty, questions, and failure-pattern vocabulary.
- [docs/domain/ledger-vocabulary.md](domain/ledger-vocabulary.md) defines internal ledger, account, double-entry, transaction, entry, posting, balance, reversal, adjustment, source-reference, and evidence-reference vocabulary.
- [docs/domain/settlement-vocabulary.md](domain/settlement-vocabulary.md) defines settlement, payout, provider report, settlement file, settlement row, fee, reserve, adjustment, chargeback deduction, refund deduction, payout, bank posting, and settlement status vocabulary.
- [docs/domain/reconciliation-vocabulary.md](domain/reconciliation-vocabulary.md) defines reconciliation runs, sources, targets, matching, candidates, confirmed matches, unmatched records, exceptions, breaks, variance, tolerance, and unresolved exception vocabulary.
- [docs/domain/incident-vocabulary.md](domain/incident-vocabulary.md) defines incident actors, statuses, severity, types, affected objects, timelines, first divergence point, hypotheses, root-cause support, escalation, closure, and reopening vocabulary.
- [docs/domain/repair-vocabulary.md](domain/repair-vocabulary.md) defines repair candidates, repair proposals, safe-to-propose paths, unsafe repairs, forbidden autonomous repair, evidence requirements, rollback, idempotency, replay-before-apply, and human approval boundaries.
- [docs/domain/evidence-receipt-model.md](domain/evidence-receipt-model.md) defines evidence receipts, sources, raw references, normalized references, provenance, chain of custody, hashes, timestamps, limitations, conflicts, gaps, coverage, bundles, append-only handling, and raw evidence immutability.
- [docs/domain/human-review-states.md](domain/human-review-states.md) defines human review actors, decisions, statuses, reviewer identity, rationale, escalation, delegation, policy exceptions, break-glass concepts, repair-review states, AI review boundaries, and audit expectations.
- [docs/domain/out-of-scope-domains.md](domain/out-of-scope-domains.md) defines hard non-goals, adjacent-but-not-core domains, forbidden claims, LLM forbidden actions, future-extension rules, and positioning boundaries.

## Cross-domain lifecycle

At a conceptual level, CausalLedger follows money movement through this living lifecycle model:

```text
payment lifecycle event
  -> evidence receipt
  -> canonical MoneyEvent update
  -> living causal timeline update
  -> deterministic check
  -> suspected, confirmed, dismissed, or unresolved break
  -> incident if required
  -> replay and evidence bundle
  -> repair proposal if safe
  -> human review
  -> closure or continued monitoring
```

This is a conceptual model only. It does not define schemas, state machines, validators, graph edges, replay ordering, repair workflows, review permissions, storage, APIs, or product behavior.

## Money movement object map

| Object | What it is | Vocabulary owner | Likely future milestone using it |
| --- | --- | --- | --- |
| Payment | A payment attempt or movement from request through provider-visible outcome and later touchpoints. | [docs/domain/payment-lifecycle.md](domain/payment-lifecycle.md) | M03, M06, M07, M08, M09 |
| Authorization | Provider or network approval or reservation of funds for possible capture. | [docs/domain/payment-lifecycle.md](domain/payment-lifecycle.md) | M03, M05, M06, M09 |
| Capture | Provider-visible step that makes authorized or immediate-charge funds financially effective. | [docs/domain/payment-lifecycle.md](domain/payment-lifecycle.md) | M03, M04, M06, M09 |
| Refund | Provider-visible return of funds after capture, with possible settlement, ledger, and reconciliation effects. | [docs/domain/payment-lifecycle.md](domain/payment-lifecycle.md) | M03, M05, M06, M07, M09 |
| Dispute | Provider-visible challenge to a captured payment. | [docs/domain/payment-lifecycle.md](domain/payment-lifecycle.md) | M03, M07, M08, M09 |
| Chargeback | Money-movement consequence of a dispute, often with settlement, ledger, bank, and evidence effects. | [docs/domain/payment-lifecycle.md](domain/payment-lifecycle.md) and [docs/domain/settlement-vocabulary.md](domain/settlement-vocabulary.md) | M03, M05, M06, M07, M09 |
| Payout | Movement from provider, acquirer, platform, or bank toward a merchant, seller, platform, or bank account. | [docs/domain/settlement-vocabulary.md](domain/settlement-vocabulary.md) | M05, M06, M07, M08, M09, M16 |
| Settlement row | One report or file row describing payment, fee, refund, chargeback, reserve, adjustment, payout, or reference information. | [docs/domain/settlement-vocabulary.md](domain/settlement-vocabulary.md) | M05, M06, M07, M08, M09, M16 |
| Bank statement line | Bank-side evidence for payout, reversal, fee, adjustment, refund, chargeback, or other bank-posted movement. | [docs/domain/settlement-vocabulary.md](domain/settlement-vocabulary.md) and [docs/domain/reconciliation-vocabulary.md](domain/reconciliation-vocabulary.md) | M05, M06, M07, M09, M16 |
| Ledger transaction | A future balanced group of ledger entries describing one durable financial record. | [docs/domain/ledger-vocabulary.md](domain/ledger-vocabulary.md) | M04, M06, M07, M08, M09 |
| Ledger entry | One debit or credit line inside a ledger transaction, associated with an account, amount, currency, and references in future schema work. | [docs/domain/ledger-vocabulary.md](domain/ledger-vocabulary.md) | M04, M06, M08, M09, M12 |
| Reconciliation exception | A break, unmatched record, mismatch, ambiguous match, or unresolved condition requiring evidence, review, or future deterministic handling. | [docs/domain/reconciliation-vocabulary.md](domain/reconciliation-vocabulary.md) | M06, M07, M08, M09, M14 |
| Incident | An evidence-backed investigation unit for money-movement breaks, deterministic failures, contradictions, gaps, or unresolved states. | [docs/domain/incident-vocabulary.md](domain/incident-vocabulary.md) | M07, M08, M09, M11, M14 |
| Evidence receipt | A durable vocabulary record that source evidence was observed or received with provenance, timestamps, limitations, conflicts, and handling context. | [docs/domain/evidence-receipt-model.md](domain/evidence-receipt-model.md) | M03, M07, M08, M09, M11, M14, M18 |
| Evidence bundle | A future packaged set of evidence receipts, raw references, normalized references, provenance, limitations, conflicts, gaps, replay references, incident references, and review context. | [docs/domain/evidence-receipt-model.md](domain/evidence-receipt-model.md) | M09, M11, M13, M14, M18 |
| Repair proposal | A non-authoritative proposed corrective path with evidence, validation needs, expected effect, idempotency, rollback, uncertainty, and human review requirements. | [docs/domain/repair-vocabulary.md](domain/repair-vocabulary.md) | M12, M13, M18 |
| Human review decision | A bounded human decision with reviewer identity, scope, rationale, evidence, timestamp, and audit trail expectations. | [docs/domain/human-review-states.md](domain/human-review-states.md) | M13, M18, M20 |
| Replay result | A future deterministic reconstruction artifact showing what happened, when it happened, and whether evidence and invariants support a conclusion. | [docs/domain/payment-lifecycle.md](domain/payment-lifecycle.md), [docs/domain/ledger-vocabulary.md](domain/ledger-vocabulary.md), and [docs/domain/evidence-receipt-model.md](domain/evidence-receipt-model.md) | M09, M12, M14 |

## Evidence and truth model

Raw evidence is source material. It may come from provider webhooks, provider API records, dashboard exports, settlement files, payout reports, bank statements, internal payment records, ledger exports, reconciliation reports, refund records, chargeback records, support tickets, operator notes, or future controlled simulator outputs.

Evidence receipts describe source, provenance, chain of custody, timestamps, hashes or checksums where future implementation defines them, coverage, gaps, uncertainty, confidentiality, redaction, limitations, conflicts, and handling status. Normalized events may be derived later, but raw evidence remains important and must not be silently replaced.

LLM output is not evidence. Agent memos are explanations only. Financial truth requires evidence, deterministic validation, replay where applicable, evidence bundles where applicable, and human review where needed.

## Deterministic truth boundaries

Lifecycle consistency checks must be deterministic. Ledger balance checks must be deterministic. Settlement and reconciliation matching should be deterministic or explicitly uncertain when evidence is missing, delayed, ambiguous, contradictory, or outside future tolerance rules.

Repair safety must rely on deterministic validators, evidence references, idempotency, rollback or compensation planning, replay or dry-run simulation when required, and human approval before any future application path. Severity, confidence, and hypotheses may support triage, but they must not become financial truth alone.

## Agentic AI boundaries

AI may read, summarize, hypothesize, compare, and draft memos. When future runtime evidence IDs exist, AI must cite them for evidence-backed claims and must preserve uncertainty when evidence is missing or conflicted.

AI may not mutate money, approve repairs, delete evidence, modify raw events, post ledger entries, override invariants, act as a reviewer, grant policy exceptions, release external communications, or claim unsupported financial facts.

Future agent tooling must be read-only except for memo or proposal artifacts. Proposal artifacts are advisory and must remain separate from deterministic truth, evidence, approval, or product mutation.

## Human review and repair boundaries

Repairs are proposals until validated and reviewed. Safe-to-propose does not mean safe-to-apply.

Production repair execution is out of scope for v1 unless separately authorized by future scope, external system controls, deterministic validators, security review, audit logs, and explicit human approval. Human review must include identity, rationale, evidence, approval scope, timestamp, and audit trail.

Break-glass and policy exceptions are restricted concepts. They must be explicit, scoped, evidence-backed, high-authority, auditable, and outside autonomous agent authority.

## Out-of-scope boundaries

CausalLedger is not:

- a payment processor;
- a ledger replacement;
- an AML/KYC platform;
- sanctions screening;
- fraud scoring;
- credit underwriting;
- legal, tax, investment, or regulatory advice;
- an autonomous finance agent;
- autonomous money movement;
- a general APM platform;
- a standalone customer support chatbot.

The full boundary is defined in [docs/domain/out-of-scope-domains.md](domain/out-of-scope-domains.md). Future milestones must not drift into these domains without explicit milestone scope, expert review where applicable, deterministic controls, security review, audit logs, and truthful release notes.

## Future implementation dependencies

| Future milestone | Required domain docs |
| --- | --- |
| M03 MoneyEvent engine | [docs/domain/payment-lifecycle.md](domain/payment-lifecycle.md), [docs/domain/settlement-vocabulary.md](domain/settlement-vocabulary.md), [docs/domain/evidence-receipt-model.md](domain/evidence-receipt-model.md), [docs/domain/out-of-scope-domains.md](domain/out-of-scope-domains.md) |
| M04 Ledger core | [docs/domain/ledger-vocabulary.md](domain/ledger-vocabulary.md), [docs/domain/repair-vocabulary.md](domain/repair-vocabulary.md), [docs/domain/evidence-receipt-model.md](domain/evidence-receipt-model.md) |
| M06 Invariant engine | [docs/domain/payment-lifecycle.md](domain/payment-lifecycle.md), [docs/domain/ledger-vocabulary.md](domain/ledger-vocabulary.md), [docs/domain/settlement-vocabulary.md](domain/settlement-vocabulary.md), [docs/domain/reconciliation-vocabulary.md](domain/reconciliation-vocabulary.md), [docs/domain/incident-vocabulary.md](domain/incident-vocabulary.md), [docs/domain/repair-vocabulary.md](domain/repair-vocabulary.md), [docs/domain/evidence-receipt-model.md](domain/evidence-receipt-model.md) |
| M07 Incident engine | [docs/domain/incident-vocabulary.md](domain/incident-vocabulary.md), [docs/domain/evidence-receipt-model.md](domain/evidence-receipt-model.md), and the relevant money-movement domain docs for affected objects |
| M08 Causal graph | All money movement docs plus [docs/domain/evidence-receipt-model.md](domain/evidence-receipt-model.md) |
| M09 Replay | [docs/domain/payment-lifecycle.md](domain/payment-lifecycle.md), [docs/domain/ledger-vocabulary.md](domain/ledger-vocabulary.md), [docs/domain/settlement-vocabulary.md](domain/settlement-vocabulary.md), [docs/domain/reconciliation-vocabulary.md](domain/reconciliation-vocabulary.md), [docs/domain/incident-vocabulary.md](domain/incident-vocabulary.md), [docs/domain/repair-vocabulary.md](domain/repair-vocabulary.md), [docs/domain/evidence-receipt-model.md](domain/evidence-receipt-model.md) |
| M10-M13 Agent/Repair/Human Review | [docs/domain/incident-vocabulary.md](domain/incident-vocabulary.md), [docs/domain/repair-vocabulary.md](domain/repair-vocabulary.md), [docs/domain/evidence-receipt-model.md](domain/evidence-receipt-model.md), [docs/domain/human-review-states.md](domain/human-review-states.md), [docs/domain/out-of-scope-domains.md](domain/out-of-scope-domains.md) |
| M14 MoneyFlowBench | All domain docs plus [docs/evals/ABLATION_STRATEGY.md](evals/ABLATION_STRATEGY.md) and [docs/evals/ABLATION_MATRIX.md](evals/ABLATION_MATRIX.md) |

## Versioning and release relevance

`v0.1.0` is the repo operating system foundation. It is not a product release.

M01 and M02 support the planned `v0.2.0` domain and local development foundation by freezing domain language and then establishing runnable local development. This domain model is not a product release and does not claim runtime behavior.

`v1.0.0` requires later runtime, benchmark, safety, security, and demo work. It depends on future implementation milestones proving behavior with deterministic validation and benchmark evidence.

## Validation and evaluation relevance

Domain docs drive future validation and benchmark scenarios. The current M01 validation proves docs and control-plane coherence, not product behavior.

The ablation strategy is planning only. M14 MoneyFlowBench will eventually test root-cause accuracy, evidence precision and recall, repair safety, hallucination rate, cost, latency, and ablation variants. Until benchmark code exists, no benchmark result or product behavior is claimed.

## Remaining M01 work

No M01 submilestones remain. M02 planning is in progress with active plan `plans/active/CLP-0003-m02-monorepo-and-local-development-environment.md`, but M02.01 through M02.20 remain `Not started`.

M01.12 has merged, duplicate PR merges #32 and #33 from the same M01.12 branch are recorded as a process deviation, and M01.13 QA plus M01 closeout synchronized the domain docs and tracking without starting product implementation.

## Guardrails for implementation milestones

- Do not implement runtime behavior from domain docs unless the relevant implementation milestone is active.
- Do not allow Codex to invent new financial meaning without updating the domain model and source domain docs.
- Do not use LLM output as evidence.
- Do not let agents own financial truth.
- Do not bypass deterministic validation.
- Do not mark future domains as complete without their scoped milestone.
