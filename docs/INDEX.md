# Documentation Index

## Project thesis

CausalLedger is an agentic financial incident-response and money-movement digital twin for fintech systems. It helps fintech teams find, prove, replay, and safely repair money-movement breaks across payments, ledgers, settlement files, bank statements, refunds, chargebacks, webhooks, and provider failures.

CausalLedger is not a payment processor, not a ledger replacement, not a generic reconciliation tool, not a fraud platform, not an AML platform, and not an autonomous finance agent.

The LLM never owns financial truth. LLM agents may investigate, summarize, and propose. LLM agents may not mutate money, approve repairs, delete evidence, post ledger entries, modify raw events, or override deterministic invariants.

## Read first

1. `docs/ACTIVE_DOCS.md`
2. `README.md`
3. `START_HERE.md`
4. `AGENTS.md`
5. `PLANS.md`
6. `WORKFLOW.md`
7. `docs/INDEX.md`
8. `plans/ROADMAP.md`
9. `docs/status/CURRENT_STATE.md`
10. `docs/status/NEXT_RECOMMENDED_THREAD.md`
11. Active plan in `plans/active/`, if one exists

## Active execution links

- `START_HERE.md` - required first read, active-plan detection, wrong-branch recovery, and handoff rules.
- `AGENTS.md` - non-negotiable safety rules, module boundaries, skills, branch guard, and done definition.
- `PLANS.md` - plan locations, required sections, builder rules, QA rules, closeout, and truthfulness rules.
- `WORKFLOW.md` - submilestone branch, PR, QA, validation, local-shell, status, and handoff workflow.
- `docs/ACTIVE_DOCS.md` - canonical active docs boundary, conflict rules, stale-doc handling, and update rules.
- `docs/ops/planning-and-tracking-system.md` - canonical submilestone status lifecycle and tracking operations.
- `docs/ops/builder-qa-prompt-protocol.md` - reusable builder and QA prompt protocol.
- `docs/ops/validation-and-handoff-workflow.md` - validation ladder, unavailable-command handling, readiness criteria, and handoff packet rules.
- `docs/ops/github-pr-and-issue-workflow.md` - PR, issue, same-branch QA, failed-QA, and merge-readiness workflow.
- `docs/ops/github-labels-and-milestones.md` - suggested GitHub labels and milestones.
- `docs/ops/branch-protection.md` - recommended branch protection settings for `main`.
- `docs/ops/milestone-closeout-workflow.md` - milestone closeout preconditions, packet, plan movement, deferrals, and next milestone readiness.
- `docs/ops/repo-operating-system-freeze.md` - M00 freeze readiness and control-plane coherence checks.
- `docs/VERSIONING.md` - semantic versioning strategy, release tag rules, and overclaim prevention.
- `docs/releases/RELEASE_LADDER.md` - planned version ladder from `v0.1.0` through company-grade releases.
- `docs/releases/V1_SCOPE.md` - practical `v1.0.0` scope target.
- `CHANGELOG.md` - release history and unreleased changes.
- `plans/ROADMAP.md` - canonical milestone sequence, counts, statuses, and exit criteria.
- `docs/status/CURRENT_STATE.md` - current phase, active plan, product code status, and validation status.
- `docs/status/NEXT_RECOMMENDED_THREAD.md` - exact next recommended thread.
- `docs/status/M00_FREEZE_READINESS.md` - M00 freeze readiness report.
- `docs/status/M00_CLOSEOUT.md` - M00 closeout packet.
- `docs/status/M01_DOMAIN_CONSISTENCY.md` - M01 domain consistency QA report.
- `docs/status/M01_CLOSEOUT.md` - M01 closeout packet.
- `docs/milestones/SUBMILESTONE_REGISTRY.md` - canonical M00-M21 submilestone registry.
- `plans/completed/CLP-0001-m00-repo-operating-system.md` - completed M00 execution plan.
- `plans/completed/CLP-0002-m01-domain-model-and-scope-freeze.md` - completed M01 plan.
- `prompts/template_builder_submilestone.md` - reusable builder thread prompt template.
- `prompts/template_qa_submilestone.md` - reusable QA thread prompt template.
- `prompts/template_handoff_packet.md` - reusable handoff packet template.
- `prompts/template_milestone_closeout.md` - reusable milestone closeout prompt template.
- `plans/templates/milestone-closeout-template.md` - reusable milestone closeout packet template.
- `.github/PULL_REQUEST_TEMPLATE.md` - submilestone PR body checklist.
- `.github/ISSUE_TEMPLATE/` - issue templates for submilestones, QA, blockers, research, and bugs.

## Core project docs

- `docs/PROJECT_BRIEF.md` - concise project brief, users, boundaries, and current status.
- `docs/PRODUCT_VISION.md` - wedge, value proposition, demo narrative, open-source moat, and MoneyFlowBench positioning.
- `docs/ARCHITECTURE.md` - planned architecture and safety boundaries without implementation claims.
- `docs/DOMAIN_MODEL.md` - canonical M01 domain model summary.
- `docs/domain/README.md` - domain vocabulary directory boundary.
- `docs/domain/payment-lifecycle.md` - M01.01 payment lifecycle vocabulary and boundaries.
- `docs/domain/ledger-vocabulary.md` - M01.02 ledger vocabulary and boundaries.
- `docs/domain/settlement-vocabulary.md` - M01.03 settlement vocabulary and boundaries.
- `docs/domain/reconciliation-vocabulary.md` - M01.04 reconciliation vocabulary and boundaries.
- `docs/domain/incident-vocabulary.md` - M01.05 incident vocabulary and boundaries.
- `docs/domain/repair-vocabulary.md` - M01.06 safe and unsafe repair vocabulary and boundaries.
- `docs/domain/evidence-receipt-model.md` - M01.07 evidence receipt vocabulary and evidence-boundary definitions.
- `docs/domain/human-review-states.md` - M01.08 human review states, actors, approval boundaries, AI boundaries, and repair-review vocabulary.
- `docs/domain/out-of-scope-domains.md` - M01.09 hard out-of-scope domains, adjacent-but-not-core domains, forbidden claims, LLM forbidden actions, future-extension rules, and positioning boundaries.
- `docs/RELIABILITY.md` - canonical CausalLedger reliability model for deterministic checks, evidence, replay, repair safety, human review, AI boundaries, auditability, metrics, and future dependencies.
- `docs/THREAT_MODEL.md` - canonical CausalLedger threat model for evidence, deterministic financial truth, repair and human review, agent/tool boundaries, prompt injection, privacy, secrets, supply chain, model cost, ablations, and governance risks.
- `docs/TOKEN_COST_STRATEGY.md` - cost and model-use strategy for future agentic work.
- `docs/VERSIONING.md` - versioning policy and release tag discipline.
- `docs/releases/RELEASE_LADDER.md` - planned release progression.
- `docs/releases/V1_SCOPE.md` - minimum and stretch scope for `v1.0.0`.
- `docs/evals/ABLATION_STRATEGY.md` - future offline benchmark ablation strategy.
- `docs/evals/ABLATION_MATRIX.md` - planned ablation groups and negative controls.

## Milestone docs

- `docs/milestones/SUBMILESTONE_REGISTRY.md` is the canonical M00-M21 submilestone registry.
- `docs/milestones/M00.md` through `docs/milestones/M21.md` describe milestone goals, submilestones, acceptance criteria, validation expectations, status, and handoff notes.

## Status docs

- `docs/status/CURRENT_STATE.md` - current phase, active plan, product code status, and validation status.
- `docs/status/WEEKLY_LOG.md` - chronological progress log.
- `docs/status/NEXT_RECOMMENDED_THREAD.md` - exact next thread recommendation.
- `docs/status/TECH_DEBT.md` - placeholders, shortcuts, and deferred cleanup.
- `docs/status/M00_FREEZE_READINESS.md` - M00 freeze readiness, limitations, remaining steps, and next threads.
- `docs/status/M00_CLOSEOUT.md` - M00 closeout packet, validation summary, plan movement, and M01 readiness.
- `docs/status/M01_DOMAIN_CONSISTENCY.md` - M01 domain consistency QA report.
- `docs/status/M01_CLOSEOUT.md` - M01 closeout packet.

## Current implementation status

The repository has completed M00 and tagged the repo operating system foundation as `v0.1.0`. M01 Domain Model and Scope Freeze is completed and closed after M01.01 through M01.13 completed and merged. The completed M01 plan lives at `plans/completed/CLP-0002-m01-domain-model-and-scope-freeze.md`, and the M01 closeout packet lives at `docs/status/M01_CLOSEOUT.md`. M02 Planning - Monorepo and Local Development Environment is the next recommended thread, but M02 remains `Not started` until that planning thread begins. The repo contains docs, plans, prompt templates, skills, placeholder directories, GitHub templates, versioning docs, domain vocabulary, ablation planning docs, and control-plane validation only. It does not contain product functionality.
