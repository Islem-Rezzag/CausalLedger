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
- `plans/ROADMAP.md` - canonical milestone sequence, counts, statuses, and exit criteria.
- `docs/status/CURRENT_STATE.md` - current phase, active plan, product code status, and validation status.
- `docs/status/NEXT_RECOMMENDED_THREAD.md` - exact next recommended thread.
- `docs/milestones/SUBMILESTONE_REGISTRY.md` - canonical M00-M21 submilestone registry.
- `plans/active/CLP-0001-m00-repo-operating-system.md` - active M00 execution plan.

## Core project docs

- `docs/PROJECT_BRIEF.md` - concise project brief, users, boundaries, and current status.
- `docs/PRODUCT_VISION.md` - wedge, value proposition, demo narrative, open-source moat, and MoneyFlowBench positioning.
- `docs/ARCHITECTURE.md` - planned architecture and safety boundaries without implementation claims.
- `docs/DOMAIN_MODEL.md` - M01 placeholder for future domain definitions.
- `docs/RELIABILITY.md` - deterministic-first reliability expectations.
- `docs/THREAT_MODEL.md` - initial threat categories and unsafe action boundaries.
- `docs/TOKEN_COST_STRATEGY.md` - cost and model-use strategy for future agentic work.

## Milestone docs

- `docs/milestones/SUBMILESTONE_REGISTRY.md` is the canonical M00-M21 submilestone registry.
- `docs/milestones/M00.md` through `docs/milestones/M21.md` describe milestone goals, submilestones, acceptance criteria, validation expectations, status, and handoff notes.

## Status docs

- `docs/status/CURRENT_STATE.md` - current phase, active plan, product code status, and validation status.
- `docs/status/WEEKLY_LOG.md` - chronological progress log.
- `docs/status/NEXT_RECOMMENDED_THREAD.md` - exact next thread recommendation.
- `docs/status/TECH_DEBT.md` - placeholders, shortcuts, and deferred cleanup.

## Current implementation status

The repository is still in control-plane bootstrap. It contains docs, plans, prompt templates, skills, placeholder directories, and control-plane validation only. It does not contain product functionality.
