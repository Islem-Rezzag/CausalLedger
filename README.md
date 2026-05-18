# CausalLedger

CausalLedger is an agentic financial incident-response and money-movement digital twin for fintech systems. It helps fintech teams find, prove, replay, and safely repair money-movement breaks across payments, ledgers, settlement files, bank statements, refunds, chargebacks, webhooks, and provider failures.

CausalLedger is not a payment processor, not a ledger replacement, not a generic reconciliation tool, not a fraud platform, not an AML platform, and not an autonomous finance agent.

The LLM never owns financial truth. LLM agents may investigate, summarize, and propose. LLM agents may not mutate money, approve repairs, delete evidence, post ledger entries, modify raw events, or override deterministic invariants.

## One-line pitch

CausalLedger helps fintech teams prove, replay, and safely repair money-movement incidents without letting agents become financial truth.

## Current status

CausalLedger has completed M00 Repo Operating System and tagged it as `v0.1.0`. M01 planning is complete and merged, the active M01 plan is `plans/active/CLP-0002-m01-domain-model-and-scope-freeze.md`, M01.01 Define Payment Lifecycle is recorded as `Completed and merged` after post-merge QA recovery, M01.02 Define Ledger Vocabulary is `Completed and merged`, M01.03 Define Settlement Vocabulary is `Completed and merged` at git commit `e54a917`, M01.04 Define Reconciliation Vocabulary is `Completed and merged` at git commit `5dfe928`, M01.05 Define Incident Vocabulary is `Completed and merged` after QA recovery PR #18 merged at git commit `3bdedeb`, M01.06 Define Safe and Unsafe Repairs is `Completed and merged` after PR #21 merged at git commit `7adc96d` (`docs: define M01.06 safe and unsafe repairs (#21)`), and M01.07 Define Evidence Receipt Model is `Completed and merged` after PR #23 merged at git commit `a88b5ff` (`docs: define M01.07 evidence receipt model (#23)`).

This repository currently contains architecture, planning, prompt, skill, milestone, status, GitHub template, versioning, and validation scaffolding only. No product functionality, evidence ingestion runtime, evidence storage layer, MoneyEvent logic, ledger logic, invariants, incident engine, causal graph, replay engine, agent runtime, repair planner runtime, repair execution, UI, APIs, databases, GitHub Actions, CI workflows, secrets, or external connectors exist yet.

## What CausalLedger is

- A planned financial incident-response system.
- A planned money-movement digital twin.
- A planned causal debugging layer for payment operations.
- A planned deterministic financial correctness engine.
- A planned agentic investigation workbench.
- A planned replay and repair-safety system.
- A planned benchmark foundation for agentic financial operations.

## What CausalLedger is not

- A payment processor.
- A ledger replacement.
- A generic reconciliation tool.
- A fraud platform.
- An AML platform.
- An autonomous finance agent.
- A source of financial truth through LLM output.

## Safety principle

The LLM never owns financial truth.

LLM agents may investigate incidents, summarize evidence, generate hypotheses, explain uncertainty, draft case memos, and propose repair plans. LLM agents may not mutate money, post ledger entries, approve repairs, delete evidence, modify raw events, override invariants, release external communications, or claim unsupported financial facts.

Financial truth comes from raw evidence, canonical money events, deterministic invariants, double-entry ledger checks, causal graph relationships, replay results, evidence bundles, and human approval.

## Documentation map

- `START_HERE.md` - required first read, active-plan detection, branch recovery, and handoff rules.
- `AGENTS.md` - agent safety boundary, skill usage, branch guard, and definition of done.
- `PLANS.md` - CausalLedger Plan requirements, builder and QA rules, and closeout rules.
- `WORKFLOW.md` - branch, PR, QA, validation, shell, and handoff workflow.
- `docs/ACTIVE_DOCS.md` - active docs boundary, canonical files, conflict rules, and update rules.
- `docs/ops/planning-and-tracking-system.md` - canonical submilestone status lifecycle and tracking operations.
- `docs/ops/builder-qa-prompt-protocol.md` - reusable builder and QA prompt protocol.
- `docs/ops/validation-and-handoff-workflow.md` - validation ladder, failure handling, readiness criteria, and handoff packet rules.
- `docs/ops/github-pr-and-issue-workflow.md` - PR, issue, same-branch QA, and merge-readiness workflow.
- `docs/ops/github-labels-and-milestones.md` - suggested GitHub labels and milestones.
- `docs/ops/branch-protection.md` - recommended `main` branch protection settings.
- `docs/ops/milestone-closeout-workflow.md` - milestone closeout preconditions, packet, plan movement, and next milestone readiness workflow.
- `docs/ops/repo-operating-system-freeze.md` - M00 freeze readiness and control-plane coherence checks.
- `docs/domain/README.md` - M01 domain vocabulary directory boundary.
- `docs/domain/payment-lifecycle.md` - M01.01 payment lifecycle vocabulary and boundaries.
- `docs/domain/ledger-vocabulary.md` - M01.02 ledger vocabulary and boundaries.
- `docs/domain/settlement-vocabulary.md` - M01.03 settlement vocabulary and boundaries.
- `docs/domain/reconciliation-vocabulary.md` - M01.04 reconciliation vocabulary and boundaries.
- `docs/domain/incident-vocabulary.md` - M01.05 incident vocabulary and boundaries.
- `docs/domain/repair-vocabulary.md` - M01.06 safe and unsafe repair vocabulary and boundaries.
- `docs/domain/evidence-receipt-model.md` - M01.07 evidence receipt vocabulary and evidence-boundary definitions.
- `docs/evals/ABLATION_STRATEGY.md` - future offline benchmark ablation strategy.
- `docs/evals/ABLATION_MATRIX.md` - planned ablation groups and negative controls.
- `docs/VERSIONING.md` - semantic versioning strategy, release tag rules, and overclaim prevention.
- `docs/releases/RELEASE_LADDER.md` - planned version ladder from `v0.1.0` through company-grade releases.
- `docs/releases/V1_SCOPE.md` - practical `v1.0.0` scope target.
- `CHANGELOG.md` - release history and unreleased changes.
- `.github/PULL_REQUEST_TEMPLATE.md` - PR body checklist for submilestones.
- `.github/ISSUE_TEMPLATE/` - GitHub issue templates for submilestones, QA, blockers, research, and bugs.
- `docs/INDEX.md` - documentation entry point.
- `plans/ROADMAP.md` - milestone sequence, counts, statuses, and exit criteria.
- `docs/status/CURRENT_STATE.md` - current phase, active plan, product code status, and validation status.
- `docs/status/NEXT_RECOMMENDED_THREAD.md` - exact next recommended thread.
- `docs/status/M00_FREEZE_READINESS.md` - M00 freeze readiness report.
- `docs/status/M00_CLOSEOUT.md` - M00 closeout packet.
- `docs/milestones/SUBMILESTONE_REGISTRY.md` - canonical M00-M21 submilestone registry.
- `plans/completed/CLP-0001-m00-repo-operating-system.md` - completed M00 plan.
- `plans/active/CLP-0002-m01-domain-model-and-scope-freeze.md` - active M01 planning plan.
- `prompts/template_builder_submilestone.md` - reusable builder thread prompt template.
- `prompts/template_qa_submilestone.md` - reusable QA thread prompt template.
- `prompts/template_handoff_packet.md` - reusable handoff packet template.
- `prompts/template_milestone_closeout.md` - reusable milestone closeout prompt template.
- `plans/templates/milestone-closeout-template.md` - reusable milestone closeout packet template.
- `docs/PROJECT_BRIEF.md` - project brief and boundaries.
- `docs/PRODUCT_VISION.md` - wedge, value proposition, demo narrative, open-source moat, and MoneyFlowBench role.
- `docs/ARCHITECTURE.md` - planned architecture and safety boundaries.
- `docs/DOMAIN_MODEL.md` - M01 domain index.
- `docs/RELIABILITY.md` - deterministic-first reliability expectations.
- `docs/THREAT_MODEL.md` - initial threat model.
- `docs/TOKEN_COST_STRATEGY.md` - future model-cost strategy.

## Repo map

- `docs/`: active docs, domain vocabulary, milestone docs, specs, evals, decisions, ops notes, and references.
- `plans/`: active, completed, archived, and template CausalLedger Plans.
- `prompts/`: reusable Codex thread prompt templates.
- `.agents/`: local CausalLedger skills and Codex control-plane guidance.
- `.github/`: GitHub PR and issue templates.
- `apps/`: future deployable services; currently placeholders only.
- `packages/`: future domain packages; currently placeholders only.
- `scenarios/`: future incident scenarios and benchmark cases.
- `tests/`: control-plane tests now; product tests later.
- `scripts/`: validation scaffolding.
- `reports/`, `artifacts/`, `data/`, `infra/`: future outputs, fixtures, and local infrastructure scaffolding.

## How to work with Codex

Start with `START_HERE.md`. Codex should read active docs in the required order, continue an existing active plan if one exists, and create a plan before coding if no active plan exists. Every builder and QA thread must run the branch guard before edits, stay on the same submilestone branch and PR, update the active plan and status files, run validation, use the GitHub PR workflow when opening or reviewing a PR, and produce a handoff packet. Codex may stage, commit, and push only when explicitly authorized, and must not merge PRs. Humans merge PRs after QA PASS and merge readiness checks. Do not start the next submilestone until QA has passed and the PR has merged.

## Milestone overview

See `plans/ROADMAP.md` and `docs/milestones/SUBMILESTONE_REGISTRY.md` for the canonical detailed milestone and submilestone structure.

## First success condition

Codex understands the repo and can continue from active docs without relying on chat memory.
