# Repair Vocabulary

## Purpose

Repair vocabulary gives CausalLedger precise language for describing safe and unsafe repair paths without implementing repair runtime behavior or letting agents become financial truth.

No runtime implementation is defined or claimed by this document.

This document supports future M10 agent tool contracts, M11 agentic investigator work, M12 repair planner work, M13 human review work, M14 MoneyFlowBench scenarios, M18 security hardening, and later product implementation.

## Repair scope

A repair is in scope when a money-movement incident, evidence conflict, deterministic failure, replay result, reconciliation exception, ledger divergence, settlement issue, refund issue, chargeback issue, provider retry question, or case workflow issue may need a proposed corrective path.

In M01.06, repair means proposed resolution vocabulary only. It does not mean that CausalLedger can apply a repair, post a ledger entry, move money, retry a provider operation, delete evidence, modify a raw event, update a customer-facing message, or approve a corrective action.

## What this document defines

This document defines repair vocabulary, safety boundaries, evidence requirements, validation expectations, repair categories, rejection reasons, and the distinction between safe-to-propose paths and forbidden autonomous actions.

The terms are documentation-only vocabulary. They are intended to guide future schemas, deterministic validators, replay outputs, approval workflows, agent tool contracts, repair simulations, audit logs, and benchmark scenarios.

## What this document does not define

This document does not define repair schemas, database tables, API routes, workflow logic, repair execution, repair approval workflow implementation, provider retry implementation, ledger posting, MoneyEvent runtime behavior, replay algorithms, deterministic validator code, UI behavior, connector behavior, GitHub Actions, CI workflows, or runtime classes.

This document does not authorize LLM agents to mutate money, post ledger entries, approve repairs, apply repairs, delete evidence, modify raw events, override invariants, bypass human review, release external communications, or claim unsupported financial facts.

## Relationship to payment lifecycle vocabulary

Payment lifecycle vocabulary belongs to M01.01. Future repair work may use payment lifecycle terms to describe affected payments, refunds, chargebacks, provider state divergence, missing lifecycle events, duplicate lifecycle events, delayed lifecycle events, and retry candidates.

M01.06 does not redefine payment lifecycle states, provider transitions, webhook handling, or lifecycle runtime behavior.

## Relationship to ledger vocabulary

Ledger vocabulary belongs to M01.02. Future repair work may use ledger terms to describe proposed compensating entries, reversals, suspense-account handling, adjustment candidates, account references, idempotency keys, evidence references, and balanced posting requirements.

M01.06 does not define ledger posting behavior, ledger mutation, account rules, or balancing algorithms.

## Relationship to settlement vocabulary

Settlement vocabulary belongs to M01.03. Future repair work may use settlement terms to describe proposed settlement explanation updates, settlement adjustment candidates, payout issue handling, reserve or release clarification, and provider payout discrepancy review.

M01.06 does not define settlement matching, payout reconciliation, bank posting rules, settlement schemas, or settlement mutation.

## Relationship to reconciliation vocabulary

Reconciliation vocabulary belongs to M01.04. Future repair work may use reconciliation terms to describe explanation updates, exception disposition candidates, false match correction proposals, unresolved exception escalation, and evidence-backed reconciliation notes.

M01.06 does not define reconciliation algorithms, match thresholds, tolerance rules, exception workflow logic, or automatic exception closure.

## Relationship to incident vocabulary

Incident vocabulary belongs to M01.05. Future repair work may use incident terms to describe root-cause support, repair candidate identification, human review handoff, resolution paths, closure support, reopening after failed replay, blast radius, and escalation.

M01.06 does not define incident state machines, incident storage, severity scoring, or closure rules.

## Relationship to future evidence work

Future M01.07 and later evidence work must define evidence receipt structure, evidence bundles, provenance, retention, source identity, and append-only evidence behavior. M01.06 can name repair evidence requirements, but it does not define evidence schemas or evidence bundle runtime behavior.

Repair proposals must remain evidence-backed. Missing evidence, contradictory evidence, unsupported amounts, unknown affected entities, or unavailable replay output must be recorded as uncertainty rather than hidden.

## Relationship to future replay work

Future M09 replay work may provide deterministic reconstruction and dry-run repair simulation. M01.06 defines replay-before-apply as a safety expectation for future sensitive repairs, but it does not implement replay, simulation, snapshots, comparison logic, or artifact output.

## Relationship to future agentic investigation

Future M11 agentic investigation may use this vocabulary to draft repair proposals, identify missing evidence, summarize uncertainty, compare candidate paths, flag unsafe repair attempts, and explain why escalation is required.

The AI investigator is a proposal-only assistant. It may investigate, summarize, hypothesize, and propose repair plans, but it cannot decide financial truth, mutate money, post ledger entries, approve repairs, apply repairs, delete evidence, modify raw events, override deterministic checks, bypass human review, release external communications, or claim unsupported financial facts.

## Relationship to future repair planner

Future M12 repair planner work may turn this vocabulary into proposal schemas, validator rules, repair types, unsafe repair rejection, rollback-plan requirements, idempotency-key requirements, evidence-ID requirements, simulation requirements, and deterministic repair validation.

M01.06 does not implement the repair planner and does not create any repair application path.

## Relationship to future human review

Future M13 human review work must define reviewer roles, approval states, rejection states, approval records, rejection reasons, reviewer identity, audit trails, and reviewed application paths. M01.06 names human approval as a required boundary, but it does not implement human review workflow.

## Core repair concepts

| Term | Repair meaning |
| --- | --- |
| Repair proposal | A non-authoritative plan that describes a possible corrective path, required evidence, expected effect, validation needs, idempotency key, rollback plan, uncertainty, and human review requirement. A repair proposal is not permission to act. |
| Repair candidate | A possible repair path identified during investigation before it has enough support to become a complete repair proposal. A candidate can be rejected, escalated, or expanded into an evidence-backed repair plan. |
| Evidence-backed repair plan | A repair proposal that cites the evidence, deterministic signals, replay or simulation outputs where available, affected objects, preconditions, postconditions, rollback plan, idempotency key, and approval requirement needed for future review. |
| Safe repair | A repair path that is safe to propose for human review because it is evidence-backed, bounded, reversible or compensable where appropriate, idempotent, deterministic-validateable, replayable or simulatable when required, and explicitly not autonomously applied by an agent. |
| Unsafe repair | A repair path that is missing evidence, has unclear ownership, lacks deterministic validation, lacks an idempotency key, lacks a rollback or compensation plan, has unknown blast radius, requires destructive action, bypasses review, or could mutate financial truth without sufficient controls. |
| Forbidden autonomous repair | Any repair an autonomous agent attempts to approve, apply, execute, or cause without required deterministic controls and explicit human approval. This is forbidden even when the proposed action might be valid after review. |
| Destructive action | Any action that deletes evidence, suppresses audit history, rewrites raw events, rewrites ledger history, erases provenance, removes review records, issues money movement, changes customer or merchant financial state, or releases external communications in a way that cannot be safely reconstructed. |
| Rollback plan | A written plan describing how to reverse, compensate, halt, or recover from a proposed repair if validation fails, replay contradicts the expected effect, duplicate application occurs, external provider state diverges, or human review rejects the result. |
| Replay-before-apply | A future safety rule requiring deterministic replay or dry-run simulation before sensitive repair application. Replay-before-apply checks expected before and after state without trusting LLM output. |
| Deterministic validation | A non-LLM check that verifies repair preconditions, evidence IDs, idempotency, account existence, balanced ledger effects, affected scope, replay output, postconditions, and forbidden action rejection according to future rules. |
| Idempotency key | A stable key that identifies one intended repair operation or proposal so retries, duplicate reviews, duplicate provider calls, or duplicate ledger proposals can be detected and prevented. |
| Human approval | Explicit approval by an authorized human reviewer under future review rules. Human approval cannot be inferred from an LLM answer, confidence score, draft memo, or missing objection. |
| Escalation | Routing a repair candidate or unsafe attempt to a higher-authority human, risk, finance, engineering, legal, compliance, or incident role because evidence, impact, uncertainty, blast radius, destructive action risk, or customer harm requires additional review. |
| Repair evidence requirements | The minimum evidence needed to review a repair proposal, including affected object IDs, raw evidence references, provenance, deterministic check results, replay or simulation results when required, root-cause support, affected amount and currency, and known uncertainty. |
| Repair uncertainty | Any known gap, ambiguity, contradiction, missing evidence, unknown affected amount, unknown affected party, unresolved root cause, unavailable replay output, validator limitation, or operational assumption that affects repair review. |
| Repair blast radius | The set of customers, merchants or sellers, accounts, payments, refunds, chargebacks, payouts, providers, bank postings, ledger entries, periods, evidence bundles, workflows, or external parties that may be affected by a repair. |
| Repair preconditions | Conditions that must be true before a repair can proceed, such as root-cause support, evidence availability, deterministic validator pass, replay-before-apply pass, idempotency key presence, bounded blast radius, and human approval. |
| Repair postconditions | Conditions expected after a repair, such as invariant pass, balanced ledger state, unchanged raw evidence, preserved audit trail, correct case status, documented customer impact, and no duplicate application. |
| Repair audit trail | The durable record of who proposed, reviewed, approved, rejected, simulated, applied, rolled back, or escalated a repair, plus evidence references, validator output, timestamps, reasons, and residual risk. |
| Compensation | A corrective action that creates a new explicit counteraction or make-whole path without erasing the original record. Compensation preserves history and may be appropriate when reversal is impossible or not semantically correct. |
| Reversal | A corrective action that negates or unwinds a prior ledger or money movement representation while preserving both the original action and the reversal record. Reversal must not mean deleting the original record. |
| Dry-run repair simulation | A future simulation that evaluates expected repair effects without applying them to live financial truth, provider state, ledger state, raw evidence, or external communications. |
| Repair rejection reason | The explicit reason a repair candidate or proposal is rejected, such as insufficient evidence, failed deterministic validation, missing idempotency key, missing rollback plan, unsafe destructive action, excessive blast radius, unsupported amount, or missing human approval. |

The vocabulary includes repair proposal, repair candidate, evidence-backed repair plan, safe repair, unsafe repair, forbidden autonomous repair, destructive action, rollback plan, replay-before-apply, deterministic validation, idempotency key, human approval, escalation, repair evidence requirements, repair uncertainty, repair blast radius, repair preconditions, repair postconditions, repair audit trail, compensation, reversal, dry-run repair simulation, and repair rejection reason as documentation-only terms.

## Agent repair boundary

LLM agents may:

- investigate evidence and incident context;
- summarize evidence and uncertainty;
- hypothesize root causes;
- identify repair candidates;
- draft repair proposals;
- compare safe-to-propose alternatives;
- flag unsafe repair attempts;
- recommend escalation;
- explain why deterministic validation, replay, rollback, idempotency, or human approval is required.

LLM agents may not:

- mutate money;
- post ledger entries;
- approve repairs;
- apply repairs;
- delete evidence;
- modify raw events;
- override invariants;
- bypass human review;
- release external communications;
- claim unsupported financial facts.

An LLM-generated repair proposal is advisory. It is not evidence, not approval, not a deterministic validation result, and not financial truth.

## Repair evidence requirements

A repair proposal should name the evidence needed for future review. Required evidence may include:

- incident ID or affected case reference;
- affected payment, payout, refund, chargeback, settlement, reconciliation, bank, provider, and ledger references;
- affected amount and currency, or an explicit unknown amount statement;
- raw evidence references and provenance;
- canonical event references when future MoneyEvent work exists;
- ledger, settlement, reconciliation, invariant, graph, and replay references when future systems exist;
- root-cause support and unresolved alternative causes;
- deterministic validation output or a stated validation gap;
- dry-run repair simulation or replay output when future rules require it;
- idempotency key;
- rollback plan or compensation plan;
- human approval requirement;
- repair uncertainty and blast radius;
- repair rejection reason if the candidate is rejected.

Evidence requirements are conceptual in M01.06. Evidence receipt schemas and evidence bundle formats belong to M01.07 and later evidence work.

## Compensation versus reversal

Compensation and reversal are different repair concepts.

A compensation adds a new corrective action that makes affected parties whole or offsets a prior outcome while preserving the original evidence and ledger history. Compensation can be appropriate when the original event was real but created an undesired or incomplete outcome.

A reversal negates a prior financial representation while preserving the original record and the reversal record. Reversal can be appropriate when a prior ledger representation or money movement must be unwound under future deterministic rules.

Neither compensation nor reversal permits deleting original evidence, rewriting raw events, rewriting ledger history, or letting an agent post entries. Both require evidence, deterministic validation, idempotency, rollback or compensation planning, and human approval before any future application path.

## Repair proposal lifecycle vocabulary

These lifecycle labels are vocabulary only. They do not define a state machine, database schema, approval workflow, API, or runtime behavior.

| Label | Vocabulary meaning |
| --- | --- |
| `repair_candidate_identified` | A possible repair path has been identified, but evidence, validation, replay, approval, or scope may still be incomplete. |
| `repair_proposal_drafted` | A non-authoritative proposal has been written with known evidence, uncertainty, expected effect, validation needs, idempotency, and rollback requirements. |
| `repair_proposal_rejected` | A candidate or proposal has been rejected with a recorded repair rejection reason. |
| `repair_escalated` | The candidate or proposal requires additional human, finance, engineering, risk, legal, compliance, or incident review. |
| `awaiting_human_approval` | The proposal cannot proceed unless an authorized human reviewer approves it under future review rules. |
| `repair_approved_by_human` | A future human approval has been recorded. This label does not itself apply a repair. |
| `repair_ready_for_dry_run` | The proposal has enough information to run a future dry-run repair simulation. |
| `repair_dry_run_failed` | Future simulation or replay contradicted the expected result or exposed unsafe effects. |
| `repair_dry_run_passed` | Future simulation or replay matched expected bounded effects. This is still not approval or application. |
| `repair_application_forbidden` | The proposed action is not allowed to be applied by an autonomous agent or by any path that bypasses deterministic controls and human review. |

## Repair categories

Safe means safe to propose for review, not safe for autonomous application. Human approval, deterministic validation, and replay-before-apply requirements below describe future application boundaries only.

| Category | Vocabulary meaning | Safe to propose | Human approval | Replay-before-apply | Deterministic validation | Escalation | Autonomous agent action |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Documentation-only correction | Corrects explanatory text, case memo wording, internal notes, or non-authoritative interpretation without changing evidence, raw events, ledger state, money state, external communications, or deterministic outputs. | Yes, when evidence-linked and marked non-financial. | Required before persistent case or audit records change under future rules. | Not usually required unless the correction changes a financial conclusion. | Required for links, status consistency, and no-financial-mutation checks. | Escalate if wording changes financial meaning, customer impact, or closure support. | May draft only; autonomous persistence is not financial truth. |
| Evidence-link correction | Adds, fixes, or clarifies a reference to existing evidence without modifying the evidence itself. | Yes, when the referenced evidence exists and provenance is preserved. | Required before persistent evidence references affect review, closure, or repair decisions. | Not usually required unless the link changes repair eligibility or financial interpretation. | Required to verify evidence IDs, hashes or provenance, and append-only behavior where future evidence rules exist. | Escalate if the old and new links support different financial conclusions. | May propose only; cannot delete, rewrite, or suppress evidence. |
| Case-status correction | Proposes a corrected incident or review status, such as returning a case to investigation or moving a candidate to human review. | Yes, when backed by evidence and future state rules. | Required before status changes that affect resolution, closure, repair review, or customer-facing outcomes. | Required before status changes that depend on replay or repair effects. | Required for allowed transition, evidence, and permission checks. | Escalate closures, reopenings, disputed states, and high-impact cases. | May propose only; cannot close or resolve as financial truth. |
| Reconciliation explanation update | Updates the explanation for a reconciliation exception, mismatch, false match, or unresolved break without changing matched records or financial state. | Yes, when evidence-linked and uncertainty is explicit. | Required before explanation supports closure, customer communication, or repair review. | Required if the update affects future repair application or closure after replay. | Required for evidence links, no balance mutation, and exception-state consistency. | Escalate if explanation is disputed, incomplete, or high impact. | May draft only; cannot auto-close exceptions as financial truth. |
| Proposed ledger adjustment | Proposes a future ledger adjustment, compensation, reversal, suspense movement, or balanced journal candidate. | Yes, as proposal only. | Always required before any ledger-affecting path. | Required before any future ledger application path. | Required for balanced entries, account existence, idempotency, evidence, and invariant checks. | Escalate for material amounts, broad blast radius, unsupported accounts, or uncertainty. | Forbidden to apply, post, or approve. |
| Proposed settlement adjustment | Proposes a future settlement correction, payout adjustment, reserve or release handling, fee correction, or settlement explanation that may affect financial truth. | Yes, as proposal only. | Always required before any settlement-affecting path. | Required before any future settlement-affecting application path. | Required for evidence, payout totals, amount and currency, idempotency, and invariant checks. | Escalate material payout, reserve, fee, bank, or provider impact. | Forbidden to apply, submit, or approve. |
| Proposed refund correction | Proposes a future refund correction, make-whole path, duplicate refund prevention, failed refund retry review, or refund ledger correction. | Yes, as proposal only. | Always required before any refund-affecting path. | Required before any future refund, ledger, or customer-impacting application path. | Required for refund state, amount and currency, provider state, idempotency, duplicate prevention, and evidence checks. | Escalate customer harm, duplicate refund risk, chargeback interaction, or uncertain provider state. | Forbidden to issue, retry, cancel, approve, or communicate as final. |
| Proposed chargeback correction | Proposes a future chargeback, dispute, fee, reversal, representment, or ledger correction path. | Yes, as proposal only. | Always required before any dispute, chargeback, ledger, or customer-impacting path. | Required before any future chargeback or ledger application path. | Required for dispute evidence, deadlines, amount and currency, fee handling, idempotency, and invariant checks. | Escalate legal, compliance, customer harm, deadline, or provider dispute risk. | Forbidden to submit, accept, reverse, approve, or communicate as final. |
| Provider-retry recommendation | Recommends that a human or deterministic workflow consider retrying a provider sync, provider API action, webhook replay, payout check, or status fetch. | Yes, as recommendation only. | Required before any external provider call that changes state or sends communications. | Required when retry could change financial state, duplicate effects, or external state. | Required for idempotency, provider state, duplicate prevention, rate limits, and evidence checks. | Escalate if provider behavior is uncertain, duplicated, high impact, or customer-facing. | Forbidden to execute state-changing retries or external writes. |
| Unsafe autonomous money movement | Any autonomous transfer, refund, payout, debit, credit, provider action, settlement action, or customer-impacting financial mutation. | No. It may only be flagged as unsafe and rejected or escalated. | Human approval is required for any legitimate future money-affecting path, but approval cannot make autonomous application safe. | Required for legitimate future reviewed paths; not applicable to autonomous attempts because they are forbidden. | Required to reject autonomous mutation attempts and validate reviewed alternatives. | Always escalate. | Forbidden. |
| Unsafe raw evidence mutation | Editing, deleting, overwriting, suppressing, or backfilling raw evidence to make a repair easier or hide a contradiction. | No. It may only be flagged as unsafe and rejected or escalated. | Human approval may govern append-only corrective evidence, but raw evidence mutation remains unsafe. | Not applicable to raw evidence mutation. | Required to detect provenance breaks, hash changes, deletion, suppression, or non-append-only behavior. | Always escalate. | Forbidden. |
| Unsafe ledger rewrite | Rewriting, deleting, reclassifying, or replacing ledger history instead of preserving the original record and using future reversal or compensation rules. | No. It may only be flagged as unsafe and rejected or escalated. | Human approval cannot authorize silent history rewrite; future reviewed reversal or compensation may be proposed instead. | Required for legitimate future reversal or compensation alternatives. | Required to reject rewrite attempts and validate balanced alternatives. | Always escalate. | Forbidden. |
| Unsafe deletion or suppression of audit evidence | Deleting audit logs, review records, evidence links, provenance, failed validation output, rejection reasons, or communications context to simplify repair review. | No. It may only be flagged as unsafe and rejected or escalated. | Human approval may govern retention exceptions under future policy, but suppression to change repair outcome is forbidden. | Not applicable to deletion or suppression. | Required to preserve audit trail, provenance, rejection reasons, and validation records. | Always escalate. | Forbidden. |

## Safe to propose, review required, and forbidden

Safe-to-propose repair categories are advisory only. Documentation-only correction, evidence-link correction, case-status correction, reconciliation explanation update, proposed ledger adjustment, proposed settlement adjustment, proposed refund correction, proposed chargeback correction, and provider-retry recommendation may be proposed when they are evidence-backed, uncertainty-aware, bounded, and explicit about validation and approval requirements.

Human review is required whenever a proposal changes persistent case state, evidence references used for decisions, closure support, customer or merchant impact, ledger state, settlement state, refund state, chargeback state, provider state, external communications, or any financial truth source.

Replay-before-apply and deterministic validation are required for future repair paths that could affect balances, ledger entries, money movement state, settlement outcome, refund outcome, chargeback outcome, provider state, closure support, or audit conclusions.

Forbidden autonomous repair categories include unsafe autonomous money movement, unsafe raw evidence mutation, unsafe ledger rewrite, unsafe deletion or suppression of audit evidence, and any attempt by an LLM agent to apply, approve, execute, or release a repair without deterministic controls and human approval.

## Repair rejection reasons

Repair candidates and proposals should be rejected or escalated when any of these conditions apply:

- insufficient evidence;
- unsupported root cause;
- missing affected amount or currency;
- unknown or excessive repair blast radius;
- missing idempotency key;
- missing rollback plan or compensation plan;
- missing repair preconditions or postconditions;
- failed deterministic validation;
- failed dry-run repair simulation or replay;
- destructive action requirement;
- raw evidence mutation requirement;
- ledger rewrite requirement;
- missing human approval;
- attempted autonomous application;
- unresolved customer, merchant, legal, compliance, or audit risk.

Rejection is a safety outcome. A rejected repair candidate can still preserve useful investigation context and should not cause evidence deletion.

## Why this boundary protects the CausalLedger moat

The repair boundary is central to CausalLedger because it lets agents assist with financial incident response while keeping financial truth deterministic.

Agents can reduce investigation cost by finding evidence, naming uncertainty, drafting candidate plans, and comparing safe alternatives. Deterministic systems and humans still decide whether evidence supports the repair, whether replay or simulation passes, whether validation passes, and whether the action is approved.

This boundary prevents autonomous financial mutation, preserves auditability, supports replay, keeps raw evidence append-only, and makes human accountability explicit. It turns repair planning into a controlled enterprise workflow rather than a generic agent action.

The moat is trust: CausalLedger is useful because it can propose repair plans without becoming the actor that mutates money or rewrites truth.

## Boundaries with other M01 areas

- Payment lifecycle vocabulary belongs to M01.01.
- Ledger vocabulary belongs to M01.02.
- Settlement vocabulary belongs to M01.03.
- Reconciliation vocabulary belongs to M01.04.
- Incident vocabulary belongs to M01.05.
- Evidence receipt model belongs to M01.07.
- Human review states belong to M01.08.

M01.06 may reference those areas only as boundaries or future dependencies. It does not fully define evidence receipt models, detailed human review states, product runtime schemas, or repair execution behavior.

## Non-implementation statement

This document is vocabulary only. No repair runtime logic, repair planner, repair schemas, repair validator, replay engine, ledger posting, MoneyEvent runtime, incident workflow, human approval workflow, provider retry execution, UI, API, database, connector, GitHub Action, CI workflow, or product behavior is implemented by M01.06.
