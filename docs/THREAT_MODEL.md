# Threat Model

## Status

M01.12 has written the CausalLedger threat model as documentation only and is `Completed and merged` after PR #31 merged; duplicate PR merges #32 and #33 from the same M01.12 branch are recorded as a process deviation. M01.13 QA Domain Consistency is `Completed and merged` after verifying this threat model against `docs/DOMAIN_MODEL.md`, `docs/RELIABILITY.md`, the M01 domain docs, evaluation docs, and tracking files in `docs/status/M01_DOMAIN_CONSISTENCY.md`. M01 closeout passed after PR #35 merged at git commit `27c39b6`.

Product implementation has not started. Current validation only proves documentation and control-plane coherence, not runtime security, runtime reliability, financial correctness, replay determinism, repair safety, privacy protection, access control, production readiness, or compliance.

This file defines threats and planned mitigations for future milestones. It does not implement security controls, MoneyEvent runtime logic, ledger runtime logic, settlement runtime logic, reconciliation runtime logic, incident runtime logic, invariants, causal graph runtime logic, replay runtime logic, agent runtime, repair planning runtime logic, human-review runtime logic, UI features, external connectors, database schemas, API routes, GitHub Actions, CI workflows, or product behavior.

## Purpose

`docs/THREAT_MODEL.md` defines the threats CausalLedger must consider when used for fintech money-movement incident response. It prepares future implementation milestones to build security and safety mechanisms deliberately without letting Codex invent security assumptions later.

This threat model connects to `docs/DOMAIN_MODEL.md`, which defines the canonical domain vocabulary and boundaries, and to `docs/RELIABILITY.md`, which defines how future behavior should remain evidence-linked, deterministic where financial truth is involved, replayable where applicable, reviewable, bounded, and auditable.

Threat modeling matters because CausalLedger is planned for high-stakes workflows: payment failures, ledger discrepancies, settlement mismatches, bank posting disagreements, reconciliation exceptions, incident investigation, repair proposal drafting, human review, and agent-assisted analysis. Mistakes in these workflows can cause money loss, unsupported customer or merchant outcomes, misleading audit records, unsafe repairs, secrets exposure, privacy failures, and false product claims.

## Threat model thesis

CausalLedger's threat model is based on protecting financial evidence, deterministic truth boundaries, human approval boundaries, and LLM tool boundaries.

The LLM never owns financial truth.

Threats become most dangerous when LLM output, incomplete evidence, unsafe repair pressure, or permission mistakes can influence money-related decisions. CausalLedger must preserve the difference between evidence, deterministic validation, replay output, repair proposals, human review decisions, and agent explanations.

The safest future implementation path is to treat untrusted evidence text, model output, imported files, support notes, provider payloads, and agent memos as inputs that require deterministic interpretation, provenance, review, and scoped permissions before they can affect incident state, repair eligibility, or any future production action.

## Threat model scope

This threat model covers planned threats around:

- Raw evidence.
- Evidence receipts.
- Payment lifecycle records.
- Ledger records.
- Settlement and reconciliation evidence.
- Incident records.
- Causal graph references.
- Replay results.
- Repair proposals.
- Human review decisions.
- Agentic investigation outputs.
- Benchmark and ablation artifacts.
- Future APIs and connectors.
- Future UI and review workbench.
- Future secrets and credentials.

Implementation comes later. This document names threats, assets, boundaries, planned mitigations, and future milestone dependencies only.

## What this threat model does not do

This document does not:

- Implement security controls.
- Implement authentication or authorization.
- Implement RBAC.
- Implement encryption.
- Implement secret management.
- Implement audit logs.
- Implement agent tools.
- Implement repair execution controls.
- Provide legal, tax, AML/KYC, sanctions, fraud, credit, or investment advice.
- Certify compliance.

Documentation statements here are not runtime guarantees. Future milestones must implement, test, and review security controls before any runtime security claim is made.

## Protected assets

CausalLedger must protect these assets in future implementation:

- Raw evidence.
- Evidence receipts.
- Evidence bundles.
- Source payload hashes.
- Provenance metadata.
- Payment lifecycle references.
- Ledger transaction references.
- Settlement rows.
- Bank statement references.
- Reconciliation exceptions.
- Incident records.
- Causal graph references.
- Replay artifacts.
- Repair proposals.
- Validation results.
- Human review decisions.
- Audit trails.
- Prompt and agent run logs.
- Model inputs and outputs.
- Secrets and credentials.
- Customer and merchant identifiers.
- Internal operational notes.

Asset protection means preserving integrity, provenance, confidentiality, authority boundaries, reviewability, and auditability according to future scoped controls. It does not mean these assets or controls exist today.

## Trust boundaries

Future CausalLedger implementation must treat these as trust boundaries:

- External provider systems.
- Bank systems.
- Internal ledger systems.
- Internal payment systems.
- Settlement file imports.
- CSV/manual uploads.
- Evidence ingestion boundary.
- Evidence storage boundary, future only.
- LLM context boundary.
- Agent tool boundary.
- Deterministic validator boundary.
- Human review boundary.
- Repair simulation boundary.
- Production money movement boundary.
- GitHub/repo control-plane boundary.
- Local development environment boundary.

Every crossing should eventually record source, authority, permissions, provenance, validation status, and audit context. Untrusted data crossing into LLM context must not become instructions. LLM output crossing toward workflow state must remain advisory unless deterministic controls and authorized human review explicitly support the next state.

## Actors and adversaries

Planned legitimate actors include:

- Payment operations user.
- Finance operations user.
- Support user.
- Platform engineer.
- Ledger engineer.
- Risk/compliance observer.
- Human reviewer.
- AI investigator.
- External provider.
- Customer or merchant as affected party.

Planned adversarial or failure actors include:

- Malicious external actor.
- Malicious or careless internal user.
- Compromised integration.
- Prompt injection attacker.
- Poisoned evidence source.
- Overconfident model output.
- Misconfigured Codex or agent workflow.

Not every threat requires malice. A stale export, careless reviewer, ambiguous settlement row, overconfident model memo, or misconfigured read/write tool can be as dangerous as an attacker when money-related decisions are involved.

## Threat categories

High-level categories for future implementation and evaluation:

- Evidence integrity threats.
- Provenance threats.
- Prompt injection threats.
- Tool misuse threats.
- Authorization threats.
- Repair safety threats.
- Human review bypass threats.
- Hallucination and unsupported conclusion threats.
- Data privacy threats.
- Secrets exposure threats.
- Out-of-scope product claim threats.
- Cost exhaustion threats.
- Benchmark or ablation misuse threats.
- Operational process threats.
- Supply-chain and dependency threats.

## Evidence threats

Evidence threats include:

- Missing evidence.
- Duplicated evidence.
- Delayed evidence.
- Stale evidence.
- Contradictory evidence.
- Forged evidence.
- Poisoned evidence.
- Modified raw payload.
- Deleted evidence.
- Wrong source attribution.
- Missing provenance.
- Hash mismatch.
- Redaction mistake.
- Confidentiality misclassification.
- Evidence bundle assembled without enough coverage.

Why this matters: evidence is the starting point for future incident records, replay inputs, repair proposals, human review decisions, and audit explanations. If evidence is incomplete, altered, deleted, misattributed, over-redacted, under-redacted, or poisoned, CausalLedger can produce plausible but unsafe narratives.

Planned mitigations include future evidence receipts, source payload hashes, provenance metadata, chain-of-custody metadata, append-only handling, evidence gap tracking, evidence conflict preservation, confidentiality classes, redaction boundaries, and human review when evidence is missing or contradictory. These are future controls, not implemented mechanisms.

## Ledger and financial truth threats

Ledger and financial truth threats include:

- Unbalanced ledger transaction.
- Duplicate posting.
- Unsupported posting.
- Reversal without original.
- Adjustment without evidence.
- Mutated ledger evidence.
- Currency mismatch.
- Balance drift.
- LLM-declared financial truth.
- Unsupported repair proposal.
- Deleting history to fix a mistake.

Why this matters: ledger and financial truth boundaries must not depend on model confidence, narrative convenience, or manual deletion. A ledger correction that hides history is worse than an explicit, evidence-backed correction path.

Planned mitigations include deterministic ledger checks, immutable records, reversals or compensating entries, evidence references, source references, idempotency checks, currency checks, balance validators, and rejection of LLM-declared financial truth. Future validators must decide structural correctness; AI can only explain failed checks or propose bounded next steps.

## Settlement and reconciliation threats

Settlement and reconciliation threats include:

- Missing settlement row.
- Duplicate settlement row.
- Payout mismatch.
- Bank posting mismatch.
- Fee variance without explanation.
- Reserve mismatch.
- FX variance.
- False match.
- Ambiguous match.
- Unresolved aged exception.
- Reconciliation exception closed without evidence.

Why this matters: settlement and reconciliation are where provider-visible, bank-visible, and internal representations meet. False certainty in matching or exception closure can hide money loss, customer harm, merchant payout errors, or accounting drift.

Planned mitigations include deterministic matching where possible, explicit uncertainty where matching is ambiguous, evidence references for settlement rows and bank postings, exception aging, materiality thresholds where future scope defines them, incident creation for unresolved or material breaks, and human review for closure decisions.

## Incident and replay threats

Incident and replay threats include:

- Incident without evidence.
- Wrong severity.
- Missing affected amount.
- Missing first divergence point.
- Duplicate incident not linked.
- Root cause hallucination.
- Incident closed without resolution evidence.
- Replay cannot reproduce incident.
- Replay result misinterpreted.
- Replay used as proof beyond available evidence.

Why this matters: incidents guide operational attention and future repair review. Replay can strengthen proof only when inputs, assumptions, ordering, clocks, and evidence references are explicit. Replay cannot prove facts that evidence does not contain.

Planned mitigations include incident evidence requirements, affected-object and affected-amount fields, first-divergence tracking, duplicate incident linking, root-cause evidence citation, replay artifacts, reproducibility checks, closure checks, and explicit unresolved states when evidence or replay is insufficient.

## Repair and human review threats

Repair and human review threats include:

- Unsafe repair proposal.
- Repair proposed before root cause is supported.
- Repair without rollback plan.
- Repair without idempotency key.
- Repair validator bypass.
- Human approval without evidence.
- Reviewer outside authority.
- Missing reviewer identity.
- Policy exception without audit.
- Break-glass approval without controls.
- Repair applied to production without explicit authorization.

Why this matters: repair pressure can turn incomplete evidence and plausible narratives into money mutation. Human review is meaningful only when reviewer identity, authority, rationale, evidence, scope, and audit trail are explicit.

Planned mitigations include deterministic repair validators, sandbox-only repair approval concepts until future scope says otherwise, human review, reviewer identity, approval scope, audit trail, escalation paths, dual-control or four-eyes review where needed, restricted policy exceptions, break-glass controls, replay or dry-run simulation, rollback or compensation planning, and idempotency requirements. M01.12 does not implement any repair execution control.

## Agentic AI threats

Agentic AI threats include:

- Hallucinated root cause.
- Unsupported confidence.
- Missing evidence IDs.
- Summarizing poisoned evidence as truth.
- Over-trusting agent memo.
- Agent treats itself as reviewer.
- Agent suggests forbidden repair.
- Agent leaks sensitive data into prompt/output.
- Model ignores uncertainty.
- Model oversteps out-of-scope domains.

Why this matters: an AI investigator can make incomplete evidence look coherent. In CausalLedger, an agent memo is not evidence, not a deterministic check, not reviewer identity, not approval, and not financial truth.

Planned mitigations include read-only tools, structured outputs, evidence-ID requirements, explicit uncertainty fields, critic agents, hallucination tests, prompt-injection tests, tool permission tests, forbidden-action tests, human review, and separation between advisory artifacts and workflow state. Future agents must investigate, summarize, and propose only.

## Prompt injection threats

Prompt injection threats include:

- Malicious text inside provider payload.
- Malicious text inside CSV upload.
- Malicious support note.
- Malicious evidence file.
- Prompt attempting to override system policy.
- Prompt asking agent to approve repair.
- Prompt asking agent to ignore evidence.
- Prompt asking agent to reveal secrets.
- Prompt asking agent to call forbidden tools.

Why this matters: evidence and operational text are untrusted data. They may contain instructions that target the AI investigator, tool router, reviewer, or future workflow state.

Planned mitigations include evidence/tool separation, instruction hierarchy, prompt-injection tests, evidence quoting discipline, safe rendering of untrusted text, forbidden-tool guards, output validation, and human review for sensitive transitions. Future implementation must ensure untrusted evidence text is treated as data, not instructions.

## Tool and permission threats

Tool and permission threats include:

- Write tool exposed to AI.
- Read-only guard missing.
- SQL write operation through query tool.
- Repair approval tool exposed.
- Evidence deletion tool exposed.
- Ledger mutation tool exposed.
- Production connector write access.
- Authz misconfiguration.
- Role confusion between AI and human reviewer.

Why this matters: a tool boundary mistake can convert an advisory agent into a source of mutation. The most dangerous failure is not a bad answer alone; it is a bad answer with an overpowered tool.

Planned mitigations include tool contracts, explicit permissions, read-only SQL enforcement, separation between read tools and proposal tools, denial of mutation tools, audit logs, negative permission tests, human-only approval actions, and future M10/M18 tool-permission tests. These controls do not exist yet.

## Model routing and cost threats

Model routing and cost threats include:

- Using expensive model for every event.
- Large evidence context causing cost blowup.
- Context compression hiding critical evidence.
- Cheap model missing high-risk incident.
- Model router misclassifying severity.
- Cache returning stale evidence summary.

Why this matters: cost and quality failures can become safety failures. A cost-control system that hides evidence can mislead the investigator; an always-strong model route can become unaffordable and unbounded; a stale cache can preserve an old false narrative.

Planned mitigations include model routing policy, cost telemetry, latency telemetry, evidence cache invalidation, severity-aware routing, scoped evidence packs, context-size limits, benchmarked routing, ablation evaluation, and review of cache freshness. Cost savings must be measured, not assumed.

## Data privacy and confidentiality threats

Data privacy and confidentiality threats include:

- Exposing customer identifiers.
- Exposing merchant identifiers.
- Leaking bank statement details.
- Leaking internal notes.
- Poor redaction.
- Over-sharing evidence in LLM context.
- Storing sensitive prompt outputs without classification.

Why this matters: incident-response workflows combine sensitive evidence, financial references, support notes, internal decisions, and model outputs. Over-sharing can create privacy exposure even when financial logic is correct.

Planned mitigations include confidentiality classes, redaction boundaries, least-necessary context, audit logs, future access controls, prompt-output classification, retention rules, and reviewer-visible redaction limitations. M01.12 does not implement privacy controls.

## Secrets and credential threats

Secrets and credential threats include:

- API keys in repo.
- Secrets in evidence payloads.
- Secrets in logs.
- Secrets in prompt context.
- Connector credentials exposed to agent.
- Local `.env` misuse.

Why this matters: future connectors and agent tools will likely need credentials. Those credentials must never become evidence, prompt content, fixture text, logs, or agent-visible data unless a future security design explicitly scopes a safe boundary.

Planned mitigations include `.env.example`, no real secrets in repo, connector credential boundaries, local `.env` discipline, access control, future secrets scanning, log redaction, prompt redaction, and secret-free fixtures. These remain future implementation responsibilities.

## Dependency and supply-chain threats

Dependency and supply-chain threats include:

- Malicious dependency.
- Vulnerable package.
- Poisoned fixture.
- Unsafe GitHub action, future only.
- Compromised connector library.
- Test fixture with real secrets.
- Generated code with hidden behavior.

Why this matters: future product code, connectors, tests, and evaluation fixtures can import risk. A malicious dependency or poisoned fixture can undermine evidence integrity, tool safety, or benchmark validity.

Planned mitigations include dependency scanning in future, fixture review, no real secrets, review of generated code, lockfile review where future tooling defines it, connector library review, CI security checks in future, and explicit security review before GitHub Actions or deployment automation exist.

## Abuse and out-of-scope domain threats

Abuse and out-of-scope domain threats include:

- User asks for legal conclusion.
- User asks for AML/KYC decision.
- User asks for fraud score.
- User asks for credit decision.
- User asks for investment advice.
- User asks system to autonomously move money.
- User asks system to bypass review.
- Project positioning overclaims product capability.

Why this matters: CausalLedger may reference adjacent evidence, but it must not become an AML/KYC platform, sanctions screening system, fraud scorer, credit engine, tax advisor, legal advisor, investment advisor, payment processor, bank, treasury system, ERP replacement, autonomous repair executor, or autonomous money movement system.

Planned mitigations include out-of-scope boundary docs, refusal/redirect policy in future UI/agent behavior, launch-positioning discipline, README and docs claims discipline, human review, and explicit future milestone scope before any adjacent-domain extension is considered.

## Evaluation and ablation threats

Evaluation and ablation threats include:

- Unsafe ablation used outside benchmark.
- Negative control accidentally enabled in runtime.
- Benchmark overfitting.
- Ablation results overclaimed.
- Insufficient scenario coverage.
- Reporting only successful scenarios.
- Ignoring hallucination or unsafe repair rate.

Why this matters: MoneyFlowBench and ablations are meant to measure safety and quality, not create shortcuts around safety controls. A benchmark that hides failures can make unsafe architecture look ready.

Planned mitigations include offline-only ablation configs, benchmark metadata, scenario diversity, public failure cases, explicit scope statements, hallucination and unsafe-repair metrics, evidence precision and recall metrics, cost metrics, and clear distinction between benchmark evidence and production readiness.

## Operational and governance threats

Operational and governance threats include:

- Skipping QA.
- Merging before QA.
- Stale tracking status.
- Codex switching branches unexpectedly.
- Product implementation started before domain freeze.
- Unreviewed scope expansion.
- Milestone status overclaim.
- Unclear ownership of dangerous decisions.

Why this matters: project control-plane mistakes can lead to premature product claims, unreviewed security decisions, and hidden scope expansion. In a high-stakes fintech project, governance drift is a threat category.

Planned mitigations include branch guards, builder/QA protocol, post-merge finalization, status tracking, PR review, milestone closeout, exact next-thread guidance, validation records, and explicit ownership for dangerous decisions. Current validation checks docs/control-plane coherence only.

## Threat-to-mitigation matrix

| Threat | Affected asset or boundary | Likelihood | Impact | Planned mitigation | Future milestone dependency |
| --- | --- | --- | --- | --- | --- |
| Missing or stale evidence | Raw evidence, evidence receipts, evidence bundles | Medium | High | Evidence gap tracking, freshness metadata, chain-of-custody metadata, human review | M03, M07, M08, M09, M18 |
| Modified raw payload | Raw evidence, source payload hashes | Medium | Critical | Hashes, append-only handling, provenance, immutable raw evidence boundary | M03, M07, M08, M09, M18 |
| Wrong source attribution | Provenance metadata, evidence receipts | Medium | High | Source identity, capture method, provenance validation, reviewer-visible limitations | M03, M07, M08, M09 |
| Unbalanced ledger transaction | Ledger transaction references, deterministic validator boundary | Medium | Critical | Deterministic ledger checks, currency checks, evidence references | M04, M06, M12, M18 |
| Duplicate posting | Ledger records, payment lifecycle references | Medium | High | Idempotency keys, duplicate detection, evidence references, validators | M04, M06, M12 |
| False settlement or bank match | Settlement rows, bank statement references, reconciliation exceptions | Medium | High | Deterministic matching where possible, explicit uncertainty, exception aging | M05, M06, M07, M08, M09 |
| Incident closed without evidence | Incident records, human review boundary | Medium | High | Incident evidence requirements, closure checks, root-cause citation | M07, M11, M14, M18 |
| Replay used beyond evidence | Replay artifacts, deterministic validator boundary | Low | High | Replay input requirements, reproducibility checks, explicit limitations | M09, M12, M14 |
| Unsafe repair proposal | Repair proposals, repair simulation boundary | Medium | Critical | Deterministic repair validators, rollback, idempotency, replay or dry run, human review | M12, M13, M18 |
| Human approval without authority | Human review decisions, human review boundary | Medium | Critical | Reviewer identity, role authority, approval scope, audit trail, escalation | M13, M18 |
| Hallucinated root cause | Agent outputs, incident records | High | High | Evidence-ID requirements, structured outputs, critic agents, hallucination tests | M11, M14, M18 |
| Prompt injection in provider payload | LLM context boundary, evidence ingestion boundary | Medium | High | Evidence/tool separation, instruction hierarchy, prompt-injection tests, forbidden-tool guards | M10, M14, M18 |
| Forbidden write tool exposed to AI | Agent tool boundary, production money movement boundary | Low | Critical | Tool contracts, explicit permissions, read-only SQL enforcement, negative permission tests | M10, M18 |
| Customer or merchant data leaked | Model inputs/outputs, prompt logs, audit trails | Medium | High | Confidentiality classes, redaction, least-necessary context, future access controls | M16, M18, M19 |
| Secrets exposed in repo or prompts | Secrets and credentials, local development environment | Medium | Critical | `.env.example`, no real secrets, secrets scanning in future, connector credential boundaries | M16, M18, M19 |
| Malicious or vulnerable dependency | Dependency boundary, local and CI environments | Medium | High | Dependency scanning in future, generated-code review, fixture review, CI security checks | M18, M19 |
| Cost blowup from large evidence context | Model routing boundary, agent run logs | High | Medium | Model routing policy, cost telemetry, scoped context, cache invalidation, ablation evaluation | M14, M17, M18 |
| Unsafe ablation enabled outside benchmark | Benchmark artifacts, runtime configuration boundary | Low | Critical | Offline-only ablation configs, negative-control isolation, explicit scope statements | M14, M17, M18, M20 |
| Out-of-scope legal or AML claim | Product positioning boundary, agent output | Medium | High | Out-of-scope docs, refusal/redirect policy, README and launch positioning discipline | M20 |
| QA or status tracking skipped | GitHub/repo control-plane boundary | Medium | High | Branch guards, builder/QA protocol, status synchronization, PR review, closeout | M01.13, M18, M20 |

Mitigations in this table are planned or documentation/control-plane mitigations unless a future milestone implements and validates them. M01.12 does not claim runtime security controls exist.

## Future implementation dependencies

| Security or threat category | Future milestones |
| --- | --- |
| Evidence integrity | M03, M07, M08, M09, M18 |
| Ledger integrity | M04, M06, M12, M18 |
| Settlement/reconciliation integrity | M05, M06, M07, M08, M09 |
| Incident safety | M07, M11, M14, M18 |
| Replay safety | M09, M12, M14 |
| Repair/human review safety | M12, M13, M18 |
| Agent/tool safety | M10, M11, M18 |
| Privacy/secrets | M16, M18, M19 |
| Observability/audit | M17, M18, M19 |
| Ablation safety | M14, M17, M18, M20 |
| Launch positioning | M20 |

Future implementation milestones must tie threat mitigations to code, tests, review, and validation before making runtime claims.

## Remaining M01 threat-model work

M01.13 QA Domain Consistency is `Completed and merged`.

M01.13 QA verified `docs/DOMAIN_MODEL.md`, `docs/RELIABILITY.md`, `docs/THREAT_MODEL.md`, domain docs, eval docs, and status tracking for mutual consistency. M01 closeout has passed, and no M01 threat-model work remains. M02 remains `Not started`.

Product implementation still must not start until M02 and later scoped milestones.

## Guardrails for future implementation milestones

- Do not expose write tools to AI agents unless explicitly scoped and guarded.
- Do not allow LLM output to become financial truth.
- Do not bypass deterministic validation.
- Do not delete or mutate raw evidence.
- Do not implement production repair execution without separate scope, validation, human review, and audit.
- Do not include secrets in repo, fixtures, logs, prompts, or evidence examples.
- Do not enable unsafe ablations outside offline benchmark mode.
- Do not overclaim legal, compliance, fraud, credit, tax, or investment conclusions.
- Do not skip Builder/QA/PR workflow.
