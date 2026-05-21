# Out-of-Scope Domains

## Purpose

Out-of-scope domain boundaries define what CausalLedger explicitly does not do, even when future evidence, incidents, repairs, human review, agent workflows, or benchmark scenarios may reference adjacent financial operations concepts.

These boundaries matter because CausalLedger is a fintech AI project. Ambiguous product language can accidentally drift into regulated, high-risk, or money-moving domains such as AML, KYC, sanctions, credit, tax, legal advice, investment advice, fraud scoring, or autonomous finance. M01.09 freezes the non-goals before implementation begins.

No runtime implementation is defined or claimed by this document.

## What this document defines

- CausalLedger's domain scope boundary.
- Hard out-of-scope domains.
- Adjacent but not core domains that may be referenced as evidence or context.
- Product claims CausalLedger must not make.
- Actions the LLM must never perform.
- Future-extension rules for adjacent domains.
- Interview and product-positioning boundaries.
- Examples that separate in-scope incident evidence from out-of-scope decisions.

## What this document does not define

- Product functionality, runtime behavior, schemas, APIs, databases, UI, connectors, agent tools, CI workflows, or deployment.
- Legal, tax, regulatory, AML, KYC, sanctions, fraud, credit, investment, accounting, treasury, banking, or payment-processing product requirements.
- Runtime policy engines, scoring engines, approval workflows, enforcement workflows, or external communications.
- Any authority for an LLM agent to mutate money, approve repairs, delete evidence, post ledger entries, modify raw events, override deterministic checks, or act as a human reviewer.

## Relationship to payment lifecycle vocabulary

Payment lifecycle vocabulary belongs to M01.01. Out-of-scope boundaries may reference payments, refunds, chargebacks, payouts, provider events, webhooks, bank postings, and lifecycle divergence only to define what CausalLedger may investigate as money-movement evidence.

M01.09 does not redefine payment lifecycle states, provider behavior, payment processing, payout execution, dispute operations, or money movement.

## Relationship to ledger vocabulary

Ledger vocabulary belongs to M01.02. Out-of-scope boundaries may reference ledger transactions, ledger entries, reversals, adjustments, balances, and evidence references when describing ledger correctness evidence.

CausalLedger is not a ledger replacement and does not become a system of record for ledger truth. It must not autonomously post ledger entries, change balances, override double-entry requirements, or replace deterministic ledger checks.

## Relationship to settlement vocabulary

Settlement vocabulary belongs to M01.03. Out-of-scope boundaries may reference settlement files, payout reports, provider balances, fees, reserves, bank postings, and settlement reconciliation evidence.

CausalLedger is not a settlement processor, payout executor, treasury platform, bank core, or payment processor. It may help investigate settlement discrepancies, but it must not move funds, execute payouts, or make banking determinations.

## Relationship to reconciliation vocabulary

Reconciliation vocabulary belongs to M01.04. Out-of-scope boundaries may reference reconciliation breaks, unmatched records, false matches, tolerances, exceptions, and evidence gaps as incident evidence.

CausalLedger is not a generic accounting close platform and is not a replacement for reconciliation, ERP, or accounting systems. It may explain money-movement reconciliation breaks, but it must not autonomously close exceptions as financial truth.

## Relationship to incident vocabulary

Incident vocabulary belongs to M01.05. Out-of-scope boundaries may reference financial incidents, operational incidents, root-cause support, affected objects, evidence timelines, escalation, and closure evidence.

CausalLedger can support incident response for money-movement correctness. It cannot make legal or regulatory conclusions, autonomously notify regulators, decide sanctions outcomes, approve enforcement action, or replace human incident command.

## Relationship to repair vocabulary

Safe and unsafe repair vocabulary belongs to M01.06. Out-of-scope boundaries may reference repair proposals, repair candidates, unsafe repairs, forbidden autonomous repairs, evidence requirements, replay-before-apply, rollback, idempotency, and human approval.

CausalLedger may define proposal vocabulary and future validation expectations. It must not autonomously approve repairs, apply repairs, retry production provider operations, post ledger corrections, move money, or bypass human approval.

## Relationship to evidence receipt model

Evidence receipt vocabulary belongs to M01.07. Out-of-scope boundaries may reference evidence receipts, raw evidence references, normalized evidence references, provenance, chain of custody, conflicts, gaps, redaction, limitations, and evidence bundles.

CausalLedger can preserve and package evidence for investigation. It cannot delete or rewrite financial evidence, replace source evidence with LLM output, or turn an evidence package into a legal, tax, AML, KYC, sanctions, credit, fraud, or investment determination.

## Relationship to human review states

Human review states belong to M01.08. Out-of-scope boundaries may reference reviewer identity, approval scope, review decisions, escalation, policy exceptions, break-glass concepts, and repair-review states.

CausalLedger cannot replace human review. LLM output cannot act as reviewer identity, reviewer rationale, approval authority, dual control, policy exception approval, or final rejection authority.

## Relationship to future product implementation

Future product implementation may use these boundaries to constrain requirements, schemas, tests, UI copy, agent tool contracts, benchmark scenarios, and release notes. This document is a domain boundary input, not an implementation artifact.

Future runtime work must keep product claims tied to implemented and validated behavior. Domain scope does not mean all in-scope capabilities exist yet.

## Relationship to future company and version roadmap

Future company-version planning may choose to add integrations or support workflows near adjacent domains. Those choices require explicit milestone scope, expert review where applicable, deterministic controls, security review, audit logs, and truthful release notes.

No future roadmap item may silently convert CausalLedger into a bank, payment processor, ledger replacement, AML/KYC platform, sanctions engine, fraud score provider, credit decision engine, legal advisor, tax advisor, investment advisor, autonomous repair executor, or autonomous money-movement system.

## CausalLedger core scope

CausalLedger is in scope for domain language around:

- Money movement lifecycle correctness.
- Ledger correctness evidence.
- Settlement and payout evidence.
- Reconciliation break evidence.
- Financial incident response.
- Causal event reconstruction.
- Replayable incident evidence.
- Safe repair proposal vocabulary.
- Human review and approval boundaries.
- Benchmark and ablation evaluation for financial operations scenarios.

This is domain scope only. It does not mean these capabilities are implemented, validated, production-ready, or available in runtime product behavior.

## Hard out-of-scope domains

| Domain | Why it is out of scope | What CausalLedger may still observe or reference | What CausalLedger must not claim or do |
| --- | --- | --- | --- |
| AML platform | AML requires regulated program design, monitoring, case management, reporting, and expert compliance ownership outside the money-movement incident-response scope. | AML case IDs, alerts, or evidence provided by a customer's compliance system as incident context. | Make AML determinations, classify suspicious activity for filing, replace AML systems, or file reports. |
| KYC onboarding platform | Identity verification and onboarding decisions require dedicated controls, vendors, policies, and legal/compliance ownership. | Customer identity references or KYC status evidence supplied by another system. | Verify identity, approve onboarding, reject onboarding, or decide identity truth. |
| Sanctions screening platform | Sanctions screening requires dedicated list management, matching, escalation, and compliance workflows. | Sanctions alert references supplied by a sanctions system as evidence context. | Make sanctions determinations, clear or block customers, or replace screening tools. |
| Fraud scoring product | Fraud scoring is a predictive risk product with model governance, enforcement effects, and false-positive obligations outside the core scope. | Fraud signals or suspicious operational patterns as context for investigation. | Produce fraud scores, enforce fraud outcomes, block users, or decide fraud. |
| Credit underwriting | Underwriting grants or denies credit and requires credit policy, adverse action, compliance, and model governance. | Credit-product references if they affect a money-movement incident. | Approve, reject, price, or recommend credit. |
| Credit risk scoring | Credit risk scoring affects credit access and portfolio risk decisions outside incident evidence reconstruction. | Risk score references supplied by a credit system as context. | Generate credit risk scores or make credit decisions. |
| Market risk | Market risk models exposure to prices, rates, liquidity, and portfolio movement, not payment incident evidence. | Market context if supplied as background for a treasury or settlement incident. | Measure market VaR, recommend hedges, or decide trading exposure. |
| Trading risk | Trading risk covers execution, positions, limits, and trading controls outside money-movement incident response. | Trading-system references if they create downstream settlement evidence. | Approve trades, set trading limits, or manage trading risk. |
| Investment advice | Investment advice requires suitability, fiduciary, disclosure, and regulatory obligations outside CausalLedger scope. | Investment-account references if they are source evidence for a payment incident. | Recommend investments, portfolio moves, trading strategies, or suitability outcomes. |
| Tax advice | Tax advice requires jurisdiction-specific expert judgment and filings outside incident evidence packaging. | Tax document references as evidence when provided. | Determine tax treatment, calculate obligations for filing, or advise tax strategy. |
| Legal or regulatory advice | Legal conclusions require licensed counsel or regulatory experts and cannot be produced by an incident tool. | Evidence that counsel, compliance, or regulators may review. | Decide legal obligations, regulatory filing requirements, liability, privilege, or legal strategy. |
| Consumer personal finance assistant | Consumer budgeting and advice is a different product surface from fintech operations incident response. | Consumer impact evidence in an incident, such as affected customer accounts. | Provide consumer budgeting advice, financial coaching, or personal finance recommendations. |
| Generic accounting close platform | Accounting close spans broad close workflows, journal management, consolidations, and reporting beyond money-movement incidents. | Close-task references or accounting exports as evidence context. | Replace close management tools or certify accounting close completeness. |
| ERP replacement | ERP systems own broad enterprise resource planning, accounting, procurement, inventory, and operations workflows. | ERP records as source evidence when relevant to an incident. | Replace ERP records, workflows, approvals, or system-of-record authority. |
| Payment processor | Payment processors authorize, capture, settle, refund, dispute, and route payments. CausalLedger investigates evidence around those activities. | Processor events, webhooks, payouts, disputes, refunds, and reports. | Process payments, authorize charges, capture funds, refund funds, route transactions, or act as a PSP. |
| Bank core system | Bank cores hold accounts, balances, postings, and banking operations. CausalLedger is not a banking ledger. | Bank statements, posting evidence, account references, or bank file records. | Change bank balances, open accounts, post bank transactions, or act as bank core. |
| Treasury management system | Treasury owns cash positioning, liquidity, bank connectivity, payments, and financial operations decisions. | Treasury context, bank account references, cash movement evidence, or payout context. | Manage cash positions, initiate treasury payments, approve liquidity moves, or replace treasury systems. |
| Autonomous finance agent | Autonomous finance agents make or execute finance decisions. CausalLedger is evidence-backed and human-reviewed. | Proposed next steps or investigation memos as advisory context. | Autonomously decide financial truth, move money, approve actions, or operate finance workflows end to end. |
| Autonomous repair executor | Repair execution can mutate money, ledgers, providers, evidence, or customer state and requires deterministic controls and human approval. | Repair proposals, validation needs, rollback plans, and human review state. | Apply repairs, approve repairs, retry production actions, or post corrective entries without authorized controls. |
| Autonomous money movement system | Moving money is outside advisory incident response and requires external payment, banking, treasury, and authorization controls. | Evidence about money movement from source systems. | Initiate, reverse, reroute, settle, refund, or otherwise move money. |
| General APM or infrastructure observability platform | APM owns broad service telemetry, infrastructure metrics, tracing, and uptime operations. | Provider outage context, webhook delivery failures, or service incident references that affect money evidence. | Replace APM, own infrastructure health monitoring, or claim general observability coverage. |
| Customer support chatbot as a standalone product | Support chatbots directly interact with customers and require messaging, escalation, policy, and communication controls. | Support notes, ticket IDs, customer impact summaries, or draft internal explanation context. | Act as standalone support agent, send external customer communications, or resolve support cases autonomously. |

## Adjacent but not core domains

Adjacent domains may appear as evidence, references, or context. They are not owned by CausalLedger.

| Adjacent domain | What CausalLedger can provide | What CausalLedger cannot provide | Future milestone or integration that might reference it | Forbidden claims |
| --- | --- | --- | --- | --- |
| Fraud signals | Evidence that a payment lifecycle, refund, dispute, or ledger pattern is suspicious, unresolved, duplicated, or inconsistent. | Fraud scores, fraud labels, enforcement decisions, account blocks, or chargeback strategy decisions. | M07 incidents, M11 investigation, M14 scenarios, M18 security hardening. | "CausalLedger detects fraud" or "CausalLedger decides fraud." |
| AML/KYC references | Links to AML or KYC records supplied by customer systems when they explain an incident timeline or evidence gap. | AML determinations, KYC decisions, onboarding approval, suspicious activity filing conclusions, or identity verification outcomes. | Future connectors, evidence bundles, human review. | "CausalLedger is an AML/KYC platform" or "CausalLedger clears customers." |
| Regulatory incident reporting evidence | Evidence bundles, timelines, affected objects, and operational impact summaries for human compliance or counsel review. | Legal conclusions about whether a filing is required, filing deadlines, report content approval, or regulator communication. | M13 human review, M18 security, M20 launch docs, company-version roadmap. | "CausalLedger decides whether a regulatory incident must be filed." |
| Audit evidence support | Source-linked evidence packages, provenance, chain of custody, replay outputs, and validation references. | Audit opinions, certification, assurance conclusions, or replacement for auditor judgment. | M09 replay, M13 review, M20 public evidence demos, M21 company version. | "CausalLedger certifies audit correctness." |
| Customer support explanation | Internal evidence-backed explanations for support teams about what happened and what remains uncertain. | Standalone chatbot responses, external customer messaging approval, refund commitments, or legal admissions. | M11 investigation memos, M15 UI, future support integrations. | "CausalLedger resolves support tickets autonomously." |
| Accounting close support | Evidence of ledger, settlement, bank, and reconciliation breaks that may affect close tasks. | Full close workflow, financial statement preparation, journal approval, ERP replacement, or close certification. | M04 ledger, M06 invariants, M07 incidents, M13 review. | "CausalLedger is an accounting close platform." |
| Treasury context | Evidence about payouts, bank postings, settlement timing, reserves, fees, and cash movement context. | Cash positioning decisions, liquidity optimization, bank transfer initiation, treasury approval, or bank connectivity ownership. | M03 MoneyEvents, M05 simulators, M09 replay, M16 connectors. | "CausalLedger manages treasury." |
| Provider outage context | Provider status, webhook delays, failed payouts, API errors, or service incidents as timeline context. | General APM coverage, uptime monitoring ownership, provider SLA enforcement, or infrastructure root-cause authority. | M05 simulator, M07 incidents, M08 graph, M11 investigation. | "CausalLedger is an observability platform." |
| Operational resilience reporting | Evidence of service impact, affected customers, recovery timeline, and unresolved money-movement effects. | Regulatory resilience conclusions, legal reportability decisions, or official external statements. | M07 incidents, M09 replay, M13 review, M18 security. | "CausalLedger determines operational resilience compliance." |
| Compliance evidence packaging | Source-linked bundles, limitations, conflicts, reviewer context, and replay references for compliance teams. | Compliance program management, control ownership, legal signoff, AML/KYC/sanctions decisions, or filing approval. | M13 review, M18 security, M20 public launch, M21 company version. | "CausalLedger provides compliance advice." |

Example boundary: CausalLedger can provide evidence that a payment lifecycle was inconsistent and affected customers, but it cannot make legal conclusions about whether a regulatory incident must be filed.

## Claims CausalLedger must not make

- CausalLedger is not a bank.
- CausalLedger is not a payment processor.
- CausalLedger is not a ledger replacement.
- CausalLedger is not an AML/KYC platform.
- CausalLedger is not a sanctions screening platform.
- CausalLedger is not a fraud scoring engine.
- CausalLedger is not a credit risk engine.
- CausalLedger is not a trading or investment advisor.
- CausalLedger is not a tax or legal advisor.
- CausalLedger is not a consumer personal finance assistant.
- CausalLedger is not an ERP replacement.
- CausalLedger is not a treasury management system.
- CausalLedger is not a general APM or infrastructure observability platform.
- CausalLedger does not autonomously move money.
- CausalLedger does not autonomously approve repairs.
- CausalLedger does not decide financial truth using an LLM.
- CausalLedger does not delete or rewrite financial evidence.
- CausalLedger does not override deterministic validators.
- CausalLedger does not replace human review.

## Actions the LLM must never perform

- Move money.
- Approve repairs.
- Reject repairs as a final authority.
- Post ledger entries.
- Delete evidence.
- Modify raw events.
- Change balances.
- Override deterministic checks.
- Grant policy exceptions.
- Act as a human reviewer.
- Provide legal advice.
- Provide tax advice.
- Provide investment advice.
- Make AML/KYC determinations.
- Make credit decisions.
- Make sanctions determinations.
- Call production write APIs.
- Claim certainty without evidence.

## Future-extension rules

- Adjacent domains require their own explicit milestone or submilestone before they can be added to product scope.
- Legal, tax, AML, KYC, sanctions, credit, or investment domains require expert review before inclusion.
- CausalLedger can export evidence, but it must not provide legal conclusions.
- CausalLedger can show operational impact, but it must not claim regulatory determinations.
- CausalLedger can detect suspicious operational patterns, but it must not become a fraud scoring product without a new scope decision.
- Any production write capability must require deterministic validation, explicit authorization, human approval, audit logs, and separate security review.
- Any scope expansion must update active docs, roadmap, milestone docs, status docs, validation expectations, and release notes without claiming unimplemented capabilities.

## Interview and product positioning boundaries

Good positioning:

- Financial incident response for money movement.
- Money-movement digital twin.
- Causal debugging for payment, ledger, settlement, and reconciliation breaks.
- Evidence-backed AI investigation with deterministic safety boundaries.
- Benchmarked agentic financial operations system.

Bad positioning:

- AI accountant.
- Autonomous finance agent.
- Replacement for Modern Treasury, Stripe, Adyen, banks, ERP, or accounting systems.
- AI fraud engine.
- Legal compliance autopilot.
- AI that fixes money automatically.

## Examples

| Scenario | In scope | Out of scope |
| --- | --- | --- |
| Duplicate webhook creates duplicate ledger posting. | Detect and explain duplicate posting using payment lifecycle, ledger, evidence, incident, and replay vocabulary. | Autonomously move money, post a correcting entry, or approve a production repair. |
| Missing bank posting after payout. | Build incident evidence, timeline, settlement context, payout references, bank evidence gaps, and reviewer questions. | Make a legal determination that reporting is required or send external regulatory communication. |
| Suspicious refund pattern. | Surface operational evidence, unresolved lifecycle state, affected refunds, ledger impact, and missing or conflicting evidence. | Generate a fraud score, block an account, make an enforcement decision, or decide fraud. |
| Customer identity mismatch. | Reference a provided KYC record as evidence context and explain how it affects incident uncertainty. | Perform KYC onboarding, verify identity, clear or reject the customer, or make AML/KYC determinations. |
| Chargeback affects settlement. | Explain settlement and ledger impact evidence, affected rows, deductions, reconciliation breaks, and incident timeline. | Provide legal advice about dispute strategy or guarantee dispute outcome. |
| Provider outage delays webhooks. | Correlate provider outage context with delayed evidence, lifecycle gaps, incident timeline, and replay limitations. | Replace APM tooling, enforce provider SLA terms, or claim infrastructure root cause beyond evidence. |
| Accounting close asks whether a variance can be cleared. | Provide evidence of reconciliation break status, ledger references, settlement evidence, and unresolved limitations. | Certify close completeness, approve journal entries, or replace accounting close controls. |

## Non-implementation statement

This document is domain boundary documentation only. No product functionality, MoneyEvent runtime, ledger runtime, settlement runtime, reconciliation runtime, incident runtime, invariant engine, causal graph runtime, replay runtime, agent runtime, repair planner runtime, repair execution, human-review runtime, UI feature, external connector, database schema, API route, GitHub Action, CI workflow, payment processor integration, AML/KYC system, fraud scoring system, credit decision system, legal advice system, tax advice system, investment advice system, banking system, treasury system, ERP replacement, or autonomous money movement capability is created by M01.09.
