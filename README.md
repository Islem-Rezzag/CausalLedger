# CausalLedger

CausalLedger is a planned continuous payment lifecycle observability and incident-response system for fintech money movement. It is designed to build a living causal timeline from provider events, webhooks, ledger entries, settlement files, bank evidence, refunds, chargebacks, and provider failures so teams can find, prove, replay, and safely review repairs for money-movement breaks.

CausalLedger is not a bank, payment processor, ledger replacement, AML/KYC platform, fraud scoring engine, credit risk engine, tax or legal advisor, investment advisor, ERP replacement, treasury management system, or autonomous finance agent.

The LLM never owns financial truth. LLM agents may investigate, summarize, and propose. LLM agents may not mutate money, approve repairs, delete evidence, post ledger entries, modify raw events, or override deterministic invariants.

## One-line pitch

CausalLedger helps fintech teams prove, replay, and safely repair money-movement incidents without letting agents become financial truth.

## Current status

M00–M04 are closed; V1_PUBLIC_PRODUCT remains approved. M05.01 and M05.02 are Completed and merged in verified PR82/PR83. M05.03 Simulate payment captured is Builder complete, awaiting QA on m05-03-simulate-payment-captured under plans/active/CLP-0006-m05-provider-and-bank-simulator.md. Synthetic capture composition is implemented; M05.04–M05.19 and M06–M21 remain Not started/unbound.

Implemented runtime includes source-neutral MoneyEvent and deterministic ledger schemas, journal checks, immutable storage, exact readers, durable retry identity, full linked reversals and account-role validation, with property/adversarial corpora and a synthetic demonstration. Formal M04 closeout is verified and complete. Source-specific ingestion, invariant/incident/graph/replay/repair/agent engines, benchmark and product UI remain unimplemented.

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
- `docs/specs/ledger-entry-schema.md` - M04.03 exact entry money and reference validation, without posting.
- `docs/specs/ledger-journal-validation.md` - M04.04 exact per-currency journal equality and whole-group refusal, without posting.
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
- `docs/status/M03_CLOSEOUT_READINESS.md` - historical M03.06 independent-QA readiness packet.
- `docs/status/M03_CLOSEOUT.md` - formal M03 closeout packet.
- `docs/status/PROJECT_COMPLETION_GOAL.md` and `docs/status/PROJECT_COMPLETION_GOAL.json` - persistent human-gated completion goal.
- `docs/status/LOCAL_ENVIRONMENT_READINESS.md` - audited local run and test readiness.
- `docs/status/PROJECT_COMPLETION_AUDIT.md` - release-target gap analysis and recommendation.
- `docs/public/PUBLIC_RELEASE_EVIDENCE_PLAN.md` - required evidence and claim boundaries.
- `docs/milestones/SUBMILESTONE_REGISTRY.md` - canonical M00-M21 submilestone registry.
- `plans/completed/CLP-0001-m00-repo-operating-system.md` - completed M00 plan.
- `plans/completed/CLP-0002-m01-domain-model-and-scope-freeze.md` - completed M01 plan.
- `plans/completed/CLP-0003-m02-monorepo-and-local-development-environment.md` - completed M02 plan.
- `plans/completed/CLP-0004-m03-canonical-moneyevent-engine.md` - completed M03 plan.
- `plans/proposals/CLP-PROJECT-COMPLETION-GOAL.md` - proposed workstream overlay pending human approval.
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
- `docs/MONEYEVENT_MAPPING_FIXTURES.md` - M03.03 evidence-to-MoneyEvent mapping fixture and simulator planning; documentation only, with no fixture data, simulator data, parser, validator, storage, ingestion, or product behavior.
- `docs/MONEYEVENT_VALIDATION_NORMALIZATION.md` - M03.04 source-neutral runtime candidate validation and deterministic normalization specification.
- `docs/MONEYEVENT_FIXTURES_BENCHMARK_SEEDS.md` - M03.05 controlled fixture corpus, benchmark seed metadata, evidence, uncertainty, hallucination-resistance, repeatability, cost, and safety boundaries.
- `packages/events/README.md` - MoneyEvent compile-time, M03.04 scoped runtime, and M03.05 test-fixture boundary.
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
- `scenarios/`: M03.05 early MoneyFlowBench seed metadata plus future incident and benchmark cases.
- `tests/`: control-plane tests; package-local deterministic product and fixture tests live with their packages.
- `scripts/`: validation scaffolding.
- `infra/`: local-only Docker Compose/Postgres and migration scaffolding; no production infrastructure or product schema.
- `reports/`, `artifacts/`, `data/`: future outputs and fixtures.

## How to work with Codex

Start with `START_HERE.md`. Codex should read active docs in the required order, continue an existing active plan if one exists, and create a plan before coding if no active plan exists. Every builder and QA thread must run the branch guard before edits, stay on the same submilestone branch and PR, update the active plan and status files, run validation, use the GitHub PR workflow when opening or reviewing a PR, and produce a handoff packet. Codex may stage, commit, and push only when explicitly authorized, and must not merge PRs. Humans merge PRs after QA PASS and merge readiness checks. Do not start the next submilestone until QA has passed and the PR has merged.

## Milestone overview

See `plans/ROADMAP.md` and `docs/milestones/SUBMILESTONE_REGISTRY.md` for the canonical detailed milestone and submilestone structure.

## First success condition

Codex understands the repo and can continue from active docs without relying on chat memory.

- `docs/specs/ledger-account-balance-query.md` - M04.06 exact read-only balances, sign, cutoffs and committed snapshot limits.
- `docs/specs/ledger-immutable-storage.md` - M04.05 atomic immutable synthetic storage, encoding, disposable tests and acknowledgement limits.


Current M05.03 capture: M00–M04 are closed; V1_PUBLIC_PRODUCT remains approved. M05.01 and M05.02 are Completed and merged in verified PR82/PR83. M05.03 Simulate payment captured is Builder complete, awaiting QA on m05-03-simulate-payment-captured under plans/active/CLP-0006-m05-provider-and-bank-simulator.md. Synthetic capture composition is implemented; M05.04–M05.19 and M06–M21 remain Not started/unbound.


## M05.02 current checkpoint (2026-10-16)

M00–M04 are closed; V1_PUBLIC_PRODUCT remains approved. M05.01 is Completed and merged in verified human PR82. M05.02 Simulate payment authorized is QA passed, awaiting merge for sole PR #83 on m05-02-simulate-payment-authorized under plans/active/CLP-0006-m05-provider-and-bank-simulator.md. Only the synthetic authorization generator is implemented. Independent candidate acceptance passed; final tracking-head gates and human merge remain. M05.03–M05.19 and M06–M21 remain Not started/unbound.

Human PR82 merged ac092fcb7b0ee16459b1ca1177d4b9b10e0df5ce at 2026-10-16T14:20:14Z by nonbot Islem-Rezzag. Reviewed b0c0e32daf91d95cd9bff555a766dadc0cfc7501 and squash have identical tree 0d2f821264fc0c55ae6ed77eb4ebc65729776014, full diff EMPTY and fetched-main reachability PASS. Root and existing independent reviewer verified primary merge/CI/body/advisory6153826833/canonical reviewer hash bindings. Final simulator107, lifecycle540, controls2397, root clean18/0/1 and both CI38455025292 PASS; ledger1785 and all14 real PostgreSQL suites1227/no skips, recovery/upgrades/schema/DEMO/cleanup PASS. Prior candidate309 behavior probes were carried through356 byte-identical nontracking files, not rerun as fresh final probes. No unchanged01 tests rerun merely to verify merge.

Current02 generator validation is recorded in CURRENT_STATE.md and active CLP0006. Root runs tests; user none. No future feature or financial authority.


## M05.03 current checkpoint (2026-10-18)

M00–M04 are closed; V1_PUBLIC_PRODUCT remains approved. M05.01 and M05.02 are Completed and merged in verified PR82/PR83. M05.03 Simulate payment captured is Builder complete, awaiting QA on m05-03-simulate-payment-captured under plans/active/CLP-0006-m05-provider-and-bank-simulator.md. Synthetic capture composition is implemented; M05.04–M05.19 and M06–M21 remain Not started/unbound.

Builder checks: simulator470/7files and typecheck/lint/build/format PASS; workspace frozen install/typecheck/lint/test/build/format/validator/whitespace PASS using warm dependencies/Turbo cache. Focused historical/current lifecycle475 PASS. Initial full2727 controls:2649 PASS/78 FAIL (dropped completed-M04 navigation link), then all78 failed cases freshly rechecked PASS in69+9 runs after restoring that link, without weakening assertions. Initial intermediate QA15 PASS/2 FAIL/2 skips (format plus navigation regression); both failures repaired and their checks passed. A fresh complete clean-commit QA remains pending; do not label the initial full run PASS. Scope33/protected350, exact88549-byte merged02 and nested histories/raw19/V1/prior proofs/append-only weekly/unchanged financial+02/generic/config/lock/CI PASS. Independent static reviewers found no remaining substantive defect; three test-quality findings repaired. Local Docker/make unavailable; actual PostgreSQL CI/current independent runtime/final gates pending.

Run clean committed candidate QA, existing independent local behavioral/lifecycle/full controls and root actual CI for the sole03 PR, then final exact-head gates and human merge. No04 before verified03 merge. Root runs tests; user none. Native goal remains user-paused.
