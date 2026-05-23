# Reliability

## Status

M01.11 completed the CausalLedger reliability model as documentation only. M01.12 has written the CausalLedger threat model as documentation only and is `QA passed, awaiting merge`. M01.13 QA Domain Consistency remains. Product implementation has not started.

Current validation proves documentation and control-plane coherence only. It does not prove runtime reliability, financial correctness, replay determinism, repair safety, agent safety, observability, security, or production readiness.

This file defines expectations for future implementation milestones. It does not implement product functionality, MoneyEvent runtime logic, ledger runtime logic, settlement runtime logic, reconciliation runtime logic, incident runtime logic, invariants, causal graph runtime logic, replay runtime logic, agent runtime, repair planning runtime logic, human-review runtime logic, UI features, external connectors, database schemas, API routes, GitHub Actions, CI workflows, or product behavior.

## Purpose

`docs/RELIABILITY.md` defines how CausalLedger should remain trustworthy when used for fintech money-movement incident response. It connects the M01 domain model to reliability expectations for evidence, deterministic validation, replay, repair safety, human review, auditability, agentic investigation, model cost, and future benchmarks.

The purpose is to prepare future milestones to implement reliability mechanisms deliberately, without letting Codex invent reliability expectations later. Reliability claims must stay tied to implemented controls, deterministic validation, evidence, replay artifacts, and human approval.

## Reliability thesis

CausalLedger reliability comes from deterministic financial checks, evidence provenance, replay, repair validation, human review, audit trails, and bounded AI assistance.

The LLM never owns financial truth.

LLM output may help humans investigate, summarize uncertainty, compare evidence, draft memos, and propose next steps. It must not decide financial truth, approve repairs, mutate money, delete evidence, post ledger entries, modify raw events, override deterministic invariants, act as a human reviewer, or claim unsupported certainty.

## Reliability scope

Reliability for CausalLedger covers the planned ability to keep these areas explainable, evidence-linked, and bounded:

- Payment lifecycle interpretation.
- Ledger correctness.
- Settlement and payout interpretation.
- Reconciliation breaks.
- Incident creation and triage.
- Evidence receipts and evidence bundles.
- Causal graph references.
- Replay sessions.
- Repair proposals.
- Human review.
- Agentic investigation.
- Benchmark and ablation evaluation.

Implementation comes later. M01.11 defines reliability expectations only.

## What reliability means for CausalLedger

Reliability means future users can trace a money-movement conclusion back to source evidence, deterministic validation, replay output when applicable, human review when required, and an audit trail that records who or what produced each artifact.

Reliable behavior should preserve uncertainty instead of hiding it. Missing, stale, delayed, duplicated, contradictory, redacted, or low-confidence evidence must remain visible. Unsupported root-cause hypotheses must stay hypotheses until evidence and deterministic checks support them.

Reliable behavior should also remain bounded. CausalLedger can support incident response and repair proposals, but it must not become the system that autonomously moves money or decides out-of-scope financial, legal, tax, AML/KYC, sanctions, fraud, credit, investment, banking, treasury, ERP, or payment-processing outcomes.

## What reliability does not mean

Reliability does not mean:

- AI decisions are automatically trusted.
- LLM output is evidence.
- Repairs can be applied without deterministic validation.
- Humans can override immutable evidence.
- CausalLedger is a legal, tax, AML/KYC, fraud, credit, or investment decision system.
- Production money movement is in scope for v1 without separate authorization, deterministic controls, security review, auditability, and human approval.
- Benchmark results are production guarantees.
- Documentation claims are implemented runtime mechanisms.

## Financial truth model

Raw evidence is source material. It may include provider webhooks, provider API records, dashboard exports, settlement files, payout reports, bank statements, internal payment records, ledger exports, reconciliation reports, refund records, chargeback records, support tickets, operator notes, or controlled simulator outputs.

Evidence receipts should capture provenance, source identity, observed and source timestamps, hashes or checksums where future implementation defines them, gaps, limitations, redaction status, confidentiality boundaries, and chain-of-custody metadata.

Canonical events may be derived later from raw evidence and deterministic transformations. Deterministic validators decide structural correctness and invariant outcomes. Replay proves that an incident or state reconstruction can be reproduced from explicit inputs. Human review approves decisions within an authorized scope.

LLM memos are explanations only. They can summarize evidence and uncertainty, but they do not become evidence, validators, replay results, reviewer identity, or financial truth.

## Deterministic-first reliability

Future implementation must prioritize deterministic checks before AI reasoning. AI can help explain a failed check, but it cannot replace the check.

Future deterministic reliability examples include:

- Event identity and idempotency checks.
- Payment lifecycle transition checks.
- Ledger balance checks.
- Settlement total checks.
- Reconciliation matching checks.
- Incident deduplication checks.
- Repair validator checks.
- Replay before closure checks.

These examples are reliability requirements for future milestones, not implemented logic.

## Evidence reliability

Evidence reliability depends on preserving raw evidence and keeping provenance visible through every derived artifact. Future evidence handling should retain raw references, source identity, source system, capture method, source timestamp, observed timestamp, receipt timestamp, checksum or hash, chain-of-custody transitions, retention status, and confidentiality classification.

Evidence reliability must also represent freshness, uncertainty, known limitations, coverage, gaps, missing records, stale records, delayed records, conflicting evidence, and ambiguous references. If evidence conflicts, CausalLedger should expose the conflict rather than choose the most convenient narrative.

Redaction and confidentiality boundaries must preserve auditability. Redacted evidence should state what was redacted, why, and whether the redaction limits the conclusion. Evidence bundles should trace every incident claim, replay input, repair proposal, and review decision back to evidence receipts or explicitly record the gap.

## Ledger and accounting reliability

Ledger reliability starts from double-entry vocabulary and future deterministic checks. Future ledger work should require total debits to equal total credits in the same currency and amount representation where a balanced ledger transaction is claimed.

The immutable ledger record boundary matters. Ledger records should not be deleted or rewritten to hide history. Future correction patterns should prefer reversals, compensating entries, or evidence-backed adjustments instead of deletion or mutation.

Future ledger reliability should include idempotency keys, account consistency, currency consistency, amount minor-unit consistency, source references, evidence references, and transaction references. Clearing account drift, suspense account accumulation, unsupported postings, duplicate postings, orphan reversals, and currency mismatches are future reliability signals, not current runtime checks.

## Settlement and reconciliation reliability

Settlement reports, settlement files, payout records, provider balance transactions, refund rows, chargeback rows, reserve rows, adjustment rows, and bank statements are evidence. Bank posting is an external cash truth touchpoint, but it still requires source identity, timing context, and matching evidence.

Fees, refunds, chargebacks, reserves, adjustments, and FX can explain settlement or payout differences. They are explanation candidates until evidence and future deterministic checks support them.

Reconciliation matching should be deterministic or explicitly uncertain. A confirmed match should be backed by matching rules and evidence. An ambiguous match, unmatched record, mismatch, false match, missing bank posting, payout mismatch, or unresolved exception should remain visible and may become an incident signal in future M07 work.

## Incident reliability

An incident must have evidence. The incident trigger should be recorded, including the failed invariant, evidence conflict, missing evidence, duplicate event, unsupported posting, reconciliation break, or other observed reason when available.

Where possible, incident records should capture affected amount, currency, object, lifecycle reference, ledger reference, settlement reference, reconciliation reference, evidence IDs, and first divergence point. Root-cause hypotheses are not confirmed facts without evidence.

Incident closure requires resolution evidence. Closure should not rely on an agent narrative alone. If evidence remains missing or replay cannot reproduce the incident state, the incident should remain open, be reopened, or be explicitly closed as unresolved through human review with recorded rationale.

## Replay reliability

Replay should reproduce the event sequence, evidence assumptions, ordering rules, clocks, snapshots, validator inputs, and incident state from explicit artifacts. A replay result is stronger than an agent narrative because it can be rerun and compared.

Future replay can compare before and after repair effects, but replay does not approve repairs. Replay cannot prove facts that are not present in evidence or deterministically derived from evidence. Replay should expose missing inputs, ambiguous ordering, conflicting timestamps, and non-reproducible state.

Replay failures should block closure or reopen the incident path until evidence, inputs, or assumptions are corrected and reviewed.

## Repair reliability

Repair is a proposal before validation. Safe-to-propose is not safe-to-apply.

Future repair progression requires deterministic repair validator checks, evidence references, expected effect, blast-radius analysis, idempotency, rollback or compensation planning, replay or dry-run simulation where required, and human review before progression.

Production repair execution is out of scope unless explicitly authorized by future scope, deterministic controls, security review, external system authorization, audit logs, and human approval. Unsafe and forbidden repairs must be rejected, including repairs that delete evidence, mutate raw events, post unsupported ledger entries, override invariants, hide losses, retry production actions without controls, or let AI approve financial mutation.

## Human review reliability

Human review reliability requires reviewer identity, reviewer role, authority, rationale, evidence cited, approval scope, timestamp, and audit trail. Review outcomes must distinguish approval, rejection, escalation, request for evidence, policy exception, break-glass action, and unresolved closure.

Sensitive decisions should support dual control or four-eyes review. Policy exceptions and break-glass decisions require strict audit, limited scope, explicit authority, evidence references, and follow-up review.

AI cannot act as reviewer. AI output cannot provide reviewer identity, approval authority, final rejection authority, dual control, or policy exception approval.

## Agentic AI reliability

Agentic AI reliability starts with read-only tools by default. Future agents should cite evidence IDs for evidence-backed claims, keep uncertainty explicit, and separate hypotheses from supported conclusions.

Agents must not receive write tools for money mutation, repair approval, evidence deletion, raw event mutation, ledger posting, invariant override, external communications, or production repair execution. Proposal artifacts are advisory and must remain separate from deterministic truth and approval artifacts.

Future mechanisms may include critic agents, evidence checks, hallucination tests, prompt-injection tests, and ablation comparisons. Model output must be validated against evidence and deterministic checks before it influences incident state, repair proposals, or review packets.

## Model routing and cost reliability

Runtime should not use the strongest model for every task by default. Model choice should depend on incident severity, evidence uncertainty, required reasoning depth, context size, latency expectations, and safety sensitivity.

Token usage, latency, model choice, cache use, context size, retrieval volume, and cost should be tracked. Cached evidence, compressed context, and smaller-model routes should be evaluated later through benchmarks.

Cost savings must be measured, not claimed without evidence. A cheaper route is reliable only if it preserves evidence grounding, uncertainty handling, repair safety, and required quality metrics.

## Observability and auditability

Future observability should connect request IDs, event IDs, incident IDs, evidence IDs, agent run IDs, repair proposal IDs, reviewer IDs, validation outcomes, replay artifacts, token usage, cost metrics, latency metrics, and audit logs.

Auditability should answer who or what observed evidence, derived an event, ran a validator, opened or updated an incident, ran an agent, proposed a repair, reviewed a decision, replayed an incident, and exported evidence.

M01.11 does not implement observability, logging, tracing, metrics, dashboards, storage, or audit infrastructure.

## Evaluation and ablation reliability

MoneyFlowBench should measure CausalLedger reliability, not just narrative quality. Future benchmarks should evaluate root-cause accuracy, evidence precision, evidence recall, hallucination rate, unsafe repair rate, replay pass rate, latency, token cost, and human review burden.

Ablations should prove which architecture components matter. Deterministic checks, evidence IDs, causal graph context, replay, critic review, repair validators, model routing, evidence caching, and human review boundaries should be measured rather than assumed.

Dangerous ablations are offline negative controls only. Variants such as LLM-only investigation, no evidence ID requirement, no repair validator, no rollback requirement, no idempotency requirement, no human review, poisoned evidence, prompt injection, and forbidden tool access attempts must not become production toggles.

## Security and threat-model dependency

This reliability model depends on M01.12 `docs/THREAT_MODEL.md`, which now defines threat categories and planned mitigations for evidence integrity, deterministic financial truth, repair and human review, agentic AI, prompt injection, tool permissions, model routing and cost, privacy, secrets, supply chain, ablations, operations, governance, and out-of-scope abuse.

Threat-model mitigations remain future implementation dependencies unless a later milestone implements and validates them. M01.12 does not turn reliability expectations into runtime security controls.

## Failure modes and mitigations

| Failure mode | Why it matters | Planned mitigation | Future milestone dependency |
| --- | --- | --- | --- |
| Duplicate provider event | Duplicate evidence can create duplicate lifecycle, ledger, settlement, or incident effects. | Event identity and idempotency checks with source references and evidence receipts. | M03, M06, M07 |
| Missing evidence | Missing inputs can make a false narrative look complete. | Evidence gap recording, uncertainty flags, escalation, and reviewer questions. | M03, M07, M11, M13 |
| Contradictory evidence | Conflicts can hide true incident state or cause unsafe repair proposals. | Conflict preservation, deterministic comparison, evidence bundles, and human review. | M07, M09, M13, M18 |
| Unbalanced ledger transaction | An unbalanced ledger claim breaks accounting reliability. | Double-entry validators and rejection of unsupported ledger postings. | M04, M06 |
| Settlement payout mismatch | Payout differences can indicate missing fees, refunds, reserves, chargebacks, FX, or provider errors. | Settlement total checks, payout evidence linkage, and reconciliation exceptions. | M05, M06, M07 |
| Bank posting mismatch | Bank-side cash evidence may not align with provider payout evidence. | Bank matching checks, unresolved exception handling, and incident creation when needed. | M05, M06, M07, M09 |
| Unsupported incident | Incidents without evidence weaken trust and create false operational burden. | Incident evidence requirements and trigger recording. | M07, M11 |
| Hallucinated root cause | Unsupported explanations can mislead repairs and review. | Evidence ID citation, critic checks, hallucination tests, and uncertainty requirements. | M11, M14, M18 |
| Unsafe repair proposal | A proposal could imply mutation, deletion, or unsupported correction. | Repair validators, unsafe repair rejection, replay, rollback, idempotency, and human review. | M12, M13, M18 |
| Review without evidence | Approval without evidence turns review into unsupported authority. | Reviewer evidence citation, rationale, approval scope, and audit trail requirements. | M13, M18 |
| Replay cannot reproduce incident | Non-reproducible state weakens closure and repair claims. | Replay input requirements, reproducibility checks, and closure blocking. | M09, M12, M14 |
| Cost blowup from large evidence context | Unbounded context can make investigation slow, expensive, and hard to audit. | Model routing, scoped evidence packs, caching, context compression, and cost metrics. | M11, M14, M17 |
| Prompt injection attempt | Untrusted evidence text can try to override tool and safety boundaries. | Treat evidence text as untrusted, enforce tool permissions, and test injection scenarios. | M10, M14, M18 |
| Stale domain terminology | Runtime and docs can drift, causing inconsistent claims and validations. | M01.13 consistency QA, source-doc links, and validation coverage. | M01.13, M20 |

## Reliability metrics

Future reliability metrics include:

- Incident detection precision.
- Incident detection recall.
- Root-cause accuracy.
- Evidence precision.
- Evidence recall.
- False positive incident rate.
- False negative incident rate.
- Unsafe repair rejection rate.
- Replay success rate.
- Repair validator pass/fail rate.
- Human approval turnaround time.
- Agent hallucination rate.
- Token cost per incident.
- Latency per investigation.
- Benchmark scenario pass rate.

These are future metrics. They are not currently implemented, measured, or validated.

## Future implementation dependencies

| Reliability area | Future milestones |
| --- | --- |
| Evidence reliability | M03, M07, M08, M09, M18 |
| Ledger reliability | M04, M06, M12 |
| Settlement and reconciliation reliability | M05, M06, M07, M08, M09 |
| Incident reliability | M07, M11, M14 |
| Replay reliability | M09, M12, M14 |
| Repair reliability | M12, M13, M18 |
| Human review reliability | M13, M18, M20 |
| Agent reliability | M10, M11, M14, M17, M18 |
| Cost reliability | M17 |
| Ablation reliability | M14, M17, M18, M20 |

## Remaining M01 reliability work

M01.12 `docs/THREAT_MODEL.md` defines the threat model for the domain and should merge before M01.13 starts.

M01.13 QA Domain Consistency remains and should verify `docs/DOMAIN_MODEL.md`, `docs/RELIABILITY.md`, `docs/THREAT_MODEL.md`, and all M01 domain docs are consistent.

## Guardrails for future implementation milestones

- Do not implement reliability claims without validation.
- Do not use LLM output as evidence.
- Do not allow agents to own financial truth.
- Do not bypass deterministic validators.
- Do not apply repairs without human review and auditability.
- Do not treat benchmark results as production guarantees.
- Do not expand into out-of-scope domains without explicit scope decision.
