# CausalLedger

CausalLedger is a planned continuous payment lifecycle observability and incident-response system for fintech money movement. It is designed to build a living causal timeline from provider events, webhooks, ledger entries, settlement files, bank evidence, refunds, chargebacks, and provider failures so teams can find, prove, replay, and safely review repairs for money-movement breaks.

CausalLedger is not a bank, payment processor, ledger replacement, AML/KYC platform, fraud scoring engine, credit risk engine, tax or legal advisor, investment advisor, ERP replacement, treasury management system, or autonomous finance agent.

The LLM never owns financial truth. LLM agents may investigate, summarize, and propose. LLM agents may not mutate money, approve repairs, delete evidence, post ledger entries, modify raw events, or override deterministic invariants.

## One-line pitch

CausalLedger helps fintech teams prove, replay, and safely repair money-movement incidents without letting agents become financial truth.

## Current status

CausalLedger has completed M00 Repo Operating System and tagged it as `v0.1.0`. M01 Domain Model and Scope Freeze is completed and closed after M01.01 through M01.13 completed and merged. M02 Monorepo and Local Development Environment is completed after M02.01 through M02.07 completed and merged; the M02 closeout PR #46 merged into `main` at commit `24228fd`. M03 planning PR #47 merged into `main` at commit `0606d3b21c05f2cf98397c9f5b0f1eddfa104a74`, and M03.01 PR #48 merged into `main` at commit `babadf52762c407fc4d49c6e1d1b0b6cc0542b8e`. The completed M02 plan is `plans/completed/CLP-0003-m02-monorepo-and-local-development-environment.md`, and the closeout packet is `docs/status/M02_CLOSEOUT.md`. M03 Canonical MoneyEvent Engine is active under `plans/active/CLP-0004-m03-canonical-moneyevent-engine.md`; M03.02 Builder is complete and awaiting QA, M03.03 through M03.06 remain `Not started`, and product runtime behavior has not started.

This repository currently contains architecture, planning, prompt, skill, milestone, status, GitHub templates, versioning, validation scaffolding, workspace manifests, a minimal non-domain `apps/api` TypeScript/Fastify scaffold with an infrastructure-only process readiness stub, a minimal non-domain `apps/web` React/Vite scaffold, a minimal non-domain `apps/worker` TypeScript scaffold, scaffold-only package boundaries for the M02.05 packages, a `packages/events` MoneyEvent TypeScript type boundary, a real ESLint baseline, a minimal GitHub Actions CI baseline with infrastructure smoke validation, local-only Docker Compose/Postgres plus migration tooling scaffolding, and a repeatable M02.07 QA development environment command and guide. No product functionality, evidence ingestion runtime, evidence storage layer, MoneyEvent runtime schema, parser, validator, normalizer, ingestion or storage behavior, ledger logic, invariants, incident engine, causal graph, replay engine, agent runtime, repair planner runtime, repair execution, product UI features, CausalLedger domain API routes, product database schema, queues, schedulers, deployment, auth/authz runtime, structured logging, monitoring, runtime security controls, real secrets, or external connectors exist yet.

## What CausalLedger is

- A planned financial incident-response system.
- A planned continuous payment lifecycle observer.
- A planned money-movement digital twin with a living causal timeline.
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
- A KYC onboarding platform.
- A sanctions screening platform.
- A credit risk engine.
- A tax, legal, trading, or investment advisor.
- An ERP or treasury management replacement.
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
- `docs/ops/qa-development-environment.md` - repeatable M02 QA development environment command and Docker opt-in guide.
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
- `docs/domain/human-review-states.md` - M01.08 human review states, actors, approval boundaries, AI boundaries, and repair-review vocabulary.
- `docs/domain/out-of-scope-domains.md` - M01.09 hard out-of-scope domains, adjacent-but-not-core domains, forbidden claims, LLM forbidden actions, future-extension rules, and positioning boundaries.
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
- `docs/status/M01_DOMAIN_CONSISTENCY.md` - M01 domain consistency QA report.
- `docs/status/M01_CLOSEOUT.md` - M01 closeout packet.
- `docs/status/M02_CLOSEOUT.md` - M02 closeout packet.
- `docs/milestones/SUBMILESTONE_REGISTRY.md` - canonical M00-M21 submilestone registry.
- `plans/completed/CLP-0001-m00-repo-operating-system.md` - completed M00 plan.
- `plans/completed/CLP-0002-m01-domain-model-and-scope-freeze.md` - completed M01 plan.
- `plans/completed/CLP-0003-m02-monorepo-and-local-development-environment.md` - completed M02 plan.
- `plans/active/CLP-0004-m03-canonical-moneyevent-engine.md` - active M03 plan.
- `prompts/template_builder_submilestone.md` - reusable builder thread prompt template.
- `prompts/template_qa_submilestone.md` - reusable QA thread prompt template.
- `prompts/template_handoff_packet.md` - reusable handoff packet template.
- `prompts/template_milestone_closeout.md` - reusable milestone closeout prompt template.
- `plans/templates/milestone-closeout-template.md` - reusable milestone closeout packet template.
- `docs/PROJECT_BRIEF.md` - project brief and boundaries.
- `docs/PRODUCT_VISION.md` - wedge, value proposition, demo narrative, open-source moat, and MoneyFlowBench role.
- `docs/ARCHITECTURE.md` - planned architecture and safety boundaries.
- `docs/DOMAIN_MODEL.md` - canonical M01 domain model summary.
- `docs/MONEYEVENT_CONTRACT.md` - M03.01 conceptual MoneyEvent contract; documentation only, with no runtime schema or product behavior.
- `packages/events/README.md` - M03.02 MoneyEvent TypeScript type-boundary package notes; compile-time only, with no parser, validator, normalizer, storage, API, UI, or product behavior.
- `docs/RELIABILITY.md` - canonical CausalLedger reliability model for deterministic checks, evidence, replay, repair safety, human review, AI boundaries, auditability, metrics, and future dependencies.
- `docs/THREAT_MODEL.md` - canonical CausalLedger threat model for evidence, deterministic truth, repair/review, agent/tool, prompt injection, privacy, secrets, supply-chain, cost, ablation, and governance risks.
- `docs/TOKEN_COST_STRATEGY.md` - future model-cost strategy.

## Repo map

- `docs/`: active docs, domain vocabulary, milestone docs, specs, evals, decisions, ops notes, and references.
- `plans/`: active, completed, archived, and template CausalLedger Plans.
- `prompts/`: reusable Codex thread prompt templates.
- `.agents/`: local CausalLedger skills and Codex control-plane guidance.
- `.github/`: GitHub PR and issue templates.
- `apps/`: future deployable services; `apps/api` has a minimal non-domain TypeScript/Fastify scaffold, `apps/web` has a minimal non-domain React/Vite scaffold, `apps/worker` has a minimal non-domain TypeScript scaffold, and other app directories remain placeholders.
- `packages/`: future package boundaries; M02.05 creates scaffold-only packages for core, events, ledger, invariants, incidents, graph, replay, repair, evidence, and evals, while deferred package directories remain README placeholders.
- `scenarios/`: future incident scenarios and benchmark cases.
- `tests/`: control-plane tests now; product tests later.
- `scripts/`: validation scaffolding.
- `infra/`: local-only Docker Compose/Postgres and migration scaffolding; no production infrastructure or product schema.
- `reports/`, `artifacts/`, `data/`: future outputs and fixtures.

## How to work with Codex

Start with `START_HERE.md`. Codex should read active docs in the required order, continue an existing active plan if one exists, and create a plan before coding if no active plan exists. Every builder and QA thread must run the branch guard before edits, stay on the same submilestone branch and PR, update the active plan and status files, run validation, use the GitHub PR workflow when opening or reviewing a PR, and produce a handoff packet. Codex may stage, commit, and push only when explicitly authorized, and must not merge PRs. Humans merge PRs after QA PASS and merge readiness checks. Do not start the next submilestone until QA has passed and the PR has merged.

## Milestone overview

See `plans/ROADMAP.md` and `docs/milestones/SUBMILESTONE_REGISTRY.md` for the canonical detailed milestone and submilestone structure.

## First success condition

Codex understands the repo and can continue from active docs without relying on chat memory.
