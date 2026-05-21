# Human Review States

## Purpose

Human review states give CausalLedger one vocabulary for describing when a human must review incident evidence, repair proposals, root-cause memos, escalation decisions, policy exceptions, and closure decisions.

This document exists so future repair planner, human review workbench, security hardening, audit logging, and public launch work can use the same review language without letting LLM output become approval authority or financial truth.

No runtime implementation is defined or claimed in this document.

## Human review scope

Human review covers decisions where a human must judge whether evidence is sufficient, whether a proposed action is within policy, whether an escalation is needed, whether an incident can close, or whether a future controlled sandbox repair may proceed.

Human review is not a substitute for deterministic validation. A human may approve a bounded review decision only within their role, policy, evidence, and audit scope. A human review decision cannot make unsupported financial facts true.

## What this document defines

- Human review terms.
- Review actors and role boundaries.
- Review statuses and decision states.
- Escalation, delegation, reassignment, policy exception, and break-glass vocabulary.
- Repair-review status vocabulary for future repair proposals.
- Approval and rejection boundaries.
- AI boundaries in review.
- Review evidence expectations.
- Correctness questions CausalLedger asks about human review.
- Human review failure patterns.
- Boundaries with M01.01 through M01.07 and M01.09.

## What this document does not define

- Runtime human review workflows, state machines, transition guards, permissions, queues, APIs, databases, schemas, UI, notification systems, or audit-log storage.
- Payment lifecycle vocabulary; that belongs to M01.01.
- Ledger vocabulary; that belongs to M01.02.
- Settlement vocabulary; that belongs to M01.03.
- Reconciliation vocabulary; that belongs to M01.04.
- Incident vocabulary; that belongs to M01.05.
- Safe and unsafe repair vocabulary; that belongs to M01.06.
- Evidence receipt vocabulary; that belongs to M01.07.
- Out-of-scope domain definitions; that belongs to M01.09.
- Repair execution, production money movement, ledger posting, raw event mutation, evidence deletion, or deterministic invariant overrides.

## Relationship to payment lifecycle vocabulary

Payment lifecycle vocabulary belongs to M01.01. Human review may later reference a payment lifecycle reference when deciding whether evidence is sufficient, whether a lifecycle is unresolved, or whether an incident closure memo is supportable.

M01.08 does not redefine payment phases, provider events, refunds, disputes, payouts, bank posting, or lifecycle reconciliation.

## Relationship to ledger vocabulary

Ledger vocabulary belongs to M01.02. Human review may later reference ledger transactions, ledger entries, balance snapshots, reversals, adjustments, and immutable ledger history when reviewing incident evidence or a future repair proposal.

Human review cannot override ledger immutability, approve unbalanced ledger history, or treat a reviewer opinion as a deterministic ledger check.

## Relationship to settlement vocabulary

Settlement vocabulary belongs to M01.03. Human review may later reference settlement batches, settlement files, payout references, bank posting dates, and settlement unresolved states when reviewing evidence or escalation needs.

M01.08 does not redefine settlement math, payout processing, or provider settlement behavior.

## Relationship to reconciliation vocabulary

Reconciliation vocabulary belongs to M01.04. Human review may later reference reconciliation breaks, unmatched records, variances, tolerances, and exception states when deciding whether evidence is complete enough to close or escalate an incident.

Human review cannot replace deterministic reconciliation checks or silently convert unresolved exceptions into proven matches.

## Relationship to incident vocabulary

Incident vocabulary belongs to M01.05. Human review may later attach to incident ownership, severity, evidence completeness, root-cause support, closure, reopening, and escalation decisions.

M01.08 does not redefine incident creation, incident severity, incident types, or incident lifecycle behavior.

## Relationship to safe and unsafe repair vocabulary

Safe and unsafe repair vocabulary belongs to M01.06. Human review states describe how a proposal may be reviewed; they do not redefine repair types, safe repairs, unsafe repairs, forbidden autonomous repairs, rollback plans, idempotency, or replay-before-apply expectations.

Safe to propose still means safe to send for review, not safe for autonomous application.

## Relationship to evidence receipt model

Evidence receipt vocabulary belongs to M01.07. Human review may later cite evidence bundle references, raw evidence references, normalized evidence references, provenance, chain of custody, evidence conflicts, evidence gaps, and limitations.

Human review decisions must stay linked to evidence where evidence is required. A review comment or agent memo without evidence IDs is context, not proof.

## Relationship to future repair planner

Future M12 repair planner work may use human review states to mark whether a repair proposal is ready for sandbox simulation, needs more evidence, failed deterministic validation, needs revision, or is rejected.

M01.08 does not define repair plan schema fields, repair validators, repair simulations, or repair application behavior.

## Relationship to future human review workbench

Future M13 human review workbench work may use this vocabulary for queues, review items, reviewer identity, review reasons, review comments, attachments, approvals, rejections, escalations, delegations, reassignment, audit trail display, and sandbox repair gating.

M01.08 does not create UI features, API routes, review queues, permissions, or storage.

## Relationship to future security and audit logs

Future M18 security hardening may use this vocabulary for reviewer approval logs, dual-control checks, break-glass audit expectations, policy exception handling, immutable approval records, reviewer identity, and conflict-of-interest controls.

M01.08 does not define authentication, authorization, RBAC, structured logging, signatures, retention, or security controls.

## Relationship to future agentic investigation

Future agentic investigation may summarize evidence, draft review memos, propose reviewer questions, identify missing evidence, and compare repair alternatives. The AI investigator is a non-approving assistant only.

The AI investigator cannot approve, reject, apply, or execute repairs. It cannot act as a human reviewer, mark incidents closed, create policy exception approval, or escalate on its own.

## Core human review concepts

| Concept | Vocabulary meaning |
| --- | --- |
| Human review | A bounded human decision step where an authorized person reviews evidence, policy, deterministic validation results, and proposed next action. |
| Reviewer | A human assigned to inspect a review item and make or recommend a decision within review scope. |
| Approver | A human with authority to approve a specific decision type under the applicable approval policy. An approver may also be a reviewer, but authority is scoped. |
| Requester | A person, system, or future workflow that asks for human review. The requester does not become the approver by requesting review. |
| Observer | A person who may read or monitor review context without approval authority. |
| Reviewer identity | The traceable identity of the human reviewer or approver. It must not be replaced by a team name, AI identity, or anonymous note where accountability is required. |
| Reviewer role | The business or technical role that explains why the reviewer is eligible for the scoped decision. |
| Reviewer reason | The stated reason the reviewer accepted, rejected, escalated, delegated, requested evidence, or closed a review item. |
| Review queue | A future conceptual grouping of review items waiting for triage, assignment, decision, escalation, or closure. This document does not define queue runtime behavior. |
| Review item | A conceptual unit requiring review, such as an incident closure decision, root-cause memo sufficiency review, evidence sufficiency question, escalation request, policy exception request, or repair proposal review. |
| Review decision | The recorded outcome of review, including status, reviewer identity, timestamp, rationale, and supporting references. |
| Approval | A scoped human decision that a review item may proceed to the next allowed step. Approval is not permission to bypass deterministic validation or execute production money movement. |
| Rejection | A scoped human decision that a review item must not proceed as proposed. Rejection should include rationale and evidence or policy reference when available. |
| Request for more evidence | A reviewer decision that available evidence is incomplete, stale, conflicting, or insufficient for the scoped question. |
| Escalation | Moving a review item to a higher authority, specialized role, risk function, or incident owner because the reviewer cannot decide within scope. |
| Delegation | Assigning a review task to another authorized reviewer while preserving original context, audit trail, and scope. |
| Reassignment | Moving responsibility for a review item to another reviewer, often because of capacity, role mismatch, conflict of interest, or availability. |
| Approval threshold | The minimum role, authority, number of reviewers, evidence quality, validation result, or policy condition required for a decision. |
| Approval policy | A future policy that describes who may approve what, under which evidence, validation, dual-control, or escalation requirements. |
| Review policy | A future policy that describes when review is required, how review is assigned, and what evidence, rationale, and audit expectations apply. |
| Approval scope | The exact decision that an approval covers. Approval scope is narrow and must not expand into unrelated money movement, evidence deletion, raw event mutation, or ledger rewriting. |
| Review scope | The question, artifact, incident, repair proposal, evidence bundle, or closure decision under review. |
| Review status | A vocabulary label that describes where a review item stands. M01.08 does not define a runtime state machine. |
| Decision timestamp | The time a human decision was recorded. It must be distinct from evidence timestamps, incident timestamps, replay timestamps, and future system ingestion timestamps. |
| Decision evidence | Evidence references, validator results, replay outputs, incident references, or policy references used to support the review decision. |
| Decision rationale | The human explanation for the decision, including why evidence is sufficient or insufficient for the scoped question. |
| Audit trail | The review history, identities, timestamps, comments, attachments, evidence references, status changes, and decision records needed for later inspection. |
| Immutable approval record | A future append-only approval record that must not be silently edited after recording. Later corrections should be additional records, not rewrites. |
| Review comment | Human-authored context attached to a review item. A comment is not proof unless it cites evidence. |
| Review attachment | A supporting artifact attached to review, such as a memo, export, screenshot, or policy reference. Attachments must preserve provenance and confidentiality expectations. |
| Conflict of interest | A condition where the reviewer has an ownership, authorship, operational, financial, or policy conflict that may make them ineligible for the scoped decision. |
| Dual control | A requirement that at least two authorized roles participate in a sensitive review or approval. |
| Four-eyes review | A specific dual-control pattern where a second authorized human independently reviews or approves a decision. |
| Break-glass approval | A restricted concept for emergency approval under exceptional conditions. It must require strict audit trail, explicit scope, high-authority review, and later retrospective review. |
| Policy exception | A restricted concept for approving a documented exception to normal policy. It must be explicit, scoped, time-bound where applicable, evidence-backed, and auditable. |

The vocabulary includes reviewer role, reviewer reason, request for more evidence, review policy, decision evidence, review attachment, four-eyes review, and break-glass approval as documentation-only terms.

## Review actors

| Actor | Review role boundary |
| --- | --- |
| Finance operations reviewer | Reviews financial operations evidence, reconciliation context, settlement context, and incident closure support within finance operations scope. |
| Payment operations reviewer | Reviews provider, payout, refund, dispute, chargeback, webhook, and payment lifecycle evidence within payment operations scope. |
| Ledger engineer reviewer | Reviews ledger vocabulary context, ledger evidence, posting implications, immutable ledger history, and future repair proposal constraints within engineering scope. |
| Platform engineer reviewer | Reviews platform evidence, source-system behavior, logs, future tool output boundaries, replay environment readiness, and operational risk within platform scope. |
| Risk or compliance observer | Observes sensitive decisions, policy exceptions, audit readiness, evidence sufficiency, and regulatory or compliance implications without automatic approval authority. |
| Support observer | Provides customer, merchant, or support-ticket context without becoming a financial truth source or repair approver. |
| Incident owner | Owns incident coordination, escalation, and closure preparation, but must still rely on evidence, deterministic validation, and applicable approval policy. |
| Repair proposer | Drafts or submits a repair proposal for review. The proposer is not automatically authorized to approve the proposal. |
| AI investigator | Non-approving assistant only. It may summarize evidence, draft memos, propose questions, highlight gaps, and compare alternatives; it cannot approve, reject, apply, or execute repairs. |
| System validator | Deterministic check source only. Validator output may support review, but the system validator is not a human reviewer or approver. |

The review actor vocabulary includes finance operations reviewer, payment operations reviewer, ledger engineer reviewer, platform engineer reviewer, risk or compliance observer, support observer, incident owner, repair proposer, AI investigator, and system validator.

## Human review states

These states are vocabulary labels only. They do not define a state machine, transition rules, role permissions, storage records, APIs, or UI behavior.

| State | State type | Vocabulary meaning |
| --- | --- | --- |
| `review_not_required` | Terminal for review need | The scoped question does not require human review under future policy. This does not waive deterministic validation where validation is required. |
| `review_required` | Non-terminal | Human review is required before the scoped item may proceed. |
| `review_pending` | Non-terminal | Review is required and waiting for assignment, evidence, reviewer action, or policy routing. |
| `reviewer_assigned` | Non-terminal | An eligible reviewer has been assigned, but no final decision has been recorded. |
| `evidence_requested` | Non-terminal | A reviewer requested more evidence before decision. |
| `evidence_received` | Non-terminal | Requested evidence has been received or attached and needs review. |
| `review_in_progress` | Non-terminal | The reviewer is actively assessing evidence, policy, validation results, rationale, or escalation need. |
| `approved` | Terminal for the scoped review decision | The review item is approved within the recorded approval scope. It does not authorize unrelated actions. |
| `rejected` | Terminal for the submitted item | The review item is rejected as submitted. A later revised item should be separately traceable. |
| `escalated` | Non-terminal unless later policy closes it | The item has moved to a higher authority or specialized reviewer. |
| `delegated` | Non-terminal | The review task has been delegated to another authorized reviewer. |
| `reassigned` | Non-terminal | Reviewer responsibility has moved to another reviewer. |
| `expired` | Terminal unless reopened | The review decision window, evidence freshness, or approval validity has expired. |
| `cancelled` | Terminal unless reopened | The requester, incident owner, or future policy cancelled the review item before decision. |
| `policy_exception_requested` | Non-terminal | A policy exception has been requested and must be reviewed under restricted controls. |
| `policy_exception_denied` | Terminal for exception request | The policy exception request is denied. Normal policy remains in force. |
| `policy_exception_approved` | Terminal for exception request | A scoped policy exception is approved under strict constraints, evidence, authority, and audit expectations. |
| `break_glass_requested` | Non-terminal | Emergency approval has been requested under restricted break-glass conditions. |
| `break_glass_denied` | Terminal for break-glass request | The break-glass request is denied. Normal controls remain in force. |
| `break_glass_approved` | Terminal for break-glass request | A restricted emergency approval is recorded with explicit authority, scope, rationale, evidence, and later review expectation. |
| `review_closed` | Terminal for review record | The review record is closed with final status, rationale, and audit trail. Closure does not erase evidence or history. |
| `review_reopened` | Non-terminal | A closed review has been reopened because of new evidence, conflict, failed replay, failed validation, policy concern, or audit correction. |

Terminal means the vocabulary label ends the current review item or request unless a later reopened or revised item is explicitly created. Non-terminal means more review, evidence, validation, escalation, reassignment, or closure remains. M01.08 does not define allowed transitions.

## Repair-review states

These states apply to repair proposals from M01.06 without redefining safe or unsafe repairs. They are vocabulary labels for future review and control points only.

| State | State type | Vocabulary meaning |
| --- | --- | --- |
| `repair_review_required` | Non-terminal | A repair proposal requires human review before any next step. |
| `repair_review_pending` | Non-terminal | Repair review is waiting for assignment, evidence, validator output, replay context, or reviewer action. |
| `repair_evidence_incomplete` | Non-terminal | The proposal does not cite enough evidence, bundle context, or incident support for decision. |
| `repair_validator_failed` | Terminal for the submitted proposal unless revised | Deterministic repair validation failed. Human approval cannot bypass the failed validator. |
| `repair_validator_passed` | Non-terminal | Deterministic validation passed for the scoped proposal, but human approval and replay or sandbox constraints may still be required. |
| `repair_approved_for_sandbox` | Terminal for sandbox authorization scope | A human approves the proposal only for controlled sandbox simulation or dry-run review. This is not production approval. |
| `repair_rejected` | Terminal for the submitted proposal | The repair proposal is rejected. |
| `repair_needs_revision` | Non-terminal | The repair proposal needs changes before review can continue. |
| `repair_escalated` | Non-terminal | The proposal is escalated to engineering, finance, risk, compliance, or higher authority. |
| `repair_applied_in_sandbox` | Future controlled state only | A future controlled sandbox environment records that a repair was applied in sandbox after required validation and approval. This document does not create that capability. |
| `repair_ready_for_replay` | Future controlled state only | A future controlled workflow marks the proposal ready for deterministic replay after evidence, validation, and approval prerequisites. This document does not create replay behavior. |
| `repair_not_approved_for_production` | Terminal for production approval | The proposal is not approved for production action. |
| `production_repair_forbidden_without_policy` | Terminal policy boundary | Production repair is forbidden unless future policy, external system controls, deterministic validation, evidence, replay where required, and human approval explicitly allow it. |

No repair can be applied without human review and deterministic validation where review and validation are required. M01.08 does not imply production repair execution exists.

## What humans may approve

Within CausalLedger v1 scope, humans may approve only bounded review decisions:

- Approving a repair proposal for sandbox simulation after required evidence and deterministic validation.
- Approving that evidence is sufficient for a root-cause memo, while preserving uncertainty and cited evidence IDs.
- Approving incident closure after deterministic checks and evidence review support closure.
- Approving escalation to engineering, finance, risk, compliance, or another authorized reviewer.
- Approving documented policy exceptions only under strict constraints, explicit scope, sufficient authority, rationale, evidence, and audit trail.

These approvals do not by themselves mutate money, post ledger entries, execute production repairs, delete evidence, modify raw events, override immutable history, or bypass deterministic validators.

## What humans may not approve inside CausalLedger v1 scope

Inside CausalLedger v1 scope, human review may not approve:

- Bypassing deterministic validators.
- Deleting raw evidence.
- Modifying raw events.
- Approving LLM-only financial truth.
- Approving production money movement without external system controls.
- Overriding immutable ledger history.
- Treating an agent memo as sufficient proof without evidence IDs.

If a future policy exception or break-glass process touches these boundaries, it must remain outside autonomous agent authority and require explicit human, deterministic, security, audit, and external-control constraints defined in later milestones.

## AI boundaries in review

AI may:

- Summarize evidence.
- Draft review memos.
- Propose questions for the reviewer.
- Highlight missing evidence.
- Compare repair alternatives.

AI may summarize evidence, draft memos, propose questions, highlight missing evidence, and compare repair alternatives only as advisory support.

AI may not:

- Approve.
- Reject.
- Escalate on its own.
- Apply repair.
- Mark incident closed.
- Create policy exception approval.
- Act as a human reviewer.

AI output is advisory, evidence-linked context. It cannot establish reviewer identity, satisfy dual control, create immutable approval records, or become financial truth.

## Review evidence expectations

Human review decisions should conceptually cite the evidence and context needed for the scoped decision. Depending on the review item, expected references may include:

- Evidence bundle reference.
- Incident reference.
- Repair proposal reference.
- Validator result reference.
- Replay result reference.
- Causal graph reference.
- Ledger transaction reference.
- Payment lifecycle reference.
- Settlement or reconciliation reference.
- Reviewer comment.
- Reviewer identity.
- Timestamp.
- Decision rationale.

These expectations are conceptual only. M01.08 does not define schemas, required fields, storage, signatures, or validation algorithms.

## Questions CausalLedger asks about human review

- Was human review required?
- Was the reviewer authorized for this decision?
- Was the evidence complete enough for review?
- Did the reviewer cite evidence or rationale?
- Did deterministic validation pass before approval?
- Was the decision within reviewer scope?
- Was an escalation required?
- Was a policy exception requested?
- Was the review closed with adequate evidence?
- Was the AI kept out of approval authority?
- Is the review decision auditable?

These questions are candidates for future deterministic checks, review policies, audit review, and QA. They are not implemented tests in M01.08.

## Human review failure patterns

These failure patterns are vocabulary only. They do not implement detection, scoring, tests, alerts, storage, or workflow behavior.

| Pattern | Review meaning |
| --- | --- |
| Approval without evidence | A decision approves a review item without sufficient evidence references. |
| Approval without validator pass | A decision approves a step that required deterministic validation before that validation passed. |
| Approval outside reviewer scope | A reviewer approves a decision outside their role, authority, policy, or approval threshold. |
| Missing reviewer identity | The decision lacks accountable human identity. |
| Missing decision rationale | The decision lacks a reason, evidence explanation, or policy basis. |
| Stale approval | An approval is used after its evidence, reviewer authority, policy window, or decision timestamp is no longer current. |
| Conflicting approvals | Multiple approvals disagree on outcome, scope, evidence, policy, or authority. |
| Duplicate review | The same review item is duplicated in a way that obscures decision authority or audit history. |
| Review closed without evidence | A review is closed without adequate evidence, rationale, or closure support. |
| Review bypassed | A workflow proceeds as if review passed even though review was required. |
| AI treated as approver | AI output, tool output, or agent memo is treated as a human approval. |
| Policy exception without authority | A policy exception is approved by an unauthorized person or without required conditions. |
| Break-glass approval without audit trail | Emergency approval lacks identity, timestamp, scope, rationale, evidence, or retrospective review expectation. |
| Repair approved despite unsafe category | A repair proposal categorized as unsafe or forbidden is approved as if it were safe to proceed. |
| Incident closed before replay evidence | Incident closure is approved before required replay evidence or deterministic validation exists. |

## Boundaries with other M01 areas

- Payment lifecycle vocabulary belongs to M01.01.
- Ledger vocabulary belongs to M01.02.
- Settlement vocabulary belongs to M01.03.
- Reconciliation vocabulary belongs to M01.04.
- Incident vocabulary belongs to M01.05.
- Safe and unsafe repair vocabulary belongs to M01.06.
- Evidence receipt model belongs to M01.07.
- Out-of-scope domains belong to M01.09.

M01.08 may reference these areas only as boundaries, review inputs, or future dependencies. It does not fully define those domains, redefine repair types from M01.06, redefine evidence receipt model from M01.07, or define out-of-scope domains.

## Non-implementation statement

This document is vocabulary only. No human-review runtime, review queue, state machine, transition guard, approval engine, authorization system, RBAC, audit-log storage, database, schema, API route, UI feature, notification system, MoneyEvent runtime, ledger runtime, settlement runtime, reconciliation runtime, incident runtime, invariant engine, causal graph runtime, replay runtime, agent runtime, repair planner runtime, repair execution, external connector, GitHub Action, CI workflow, deployment, authentication, authorization, structured logging, or product behavior is created by M01.08.
