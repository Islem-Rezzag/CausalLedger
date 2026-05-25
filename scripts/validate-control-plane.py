from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]

REQUIRED_FILES = [
    "README.md",
    "START_HERE.md",
    "AGENTS.md",
    "PLANS.md",
    "WORKFLOW.md",
    "Makefile",
    ".env.example",
    ".gitignore",
    "CHANGELOG.md",
    "docs/INDEX.md",
    "docs/ACTIVE_DOCS.md",
    "docs/PROJECT_BRIEF.md",
    "docs/PRODUCT_VISION.md",
    "docs/ARCHITECTURE.md",
    "docs/DOMAIN_MODEL.md",
    "docs/domain/README.md",
    "docs/domain/payment-lifecycle.md",
    "docs/domain/ledger-vocabulary.md",
    "docs/domain/settlement-vocabulary.md",
    "docs/domain/reconciliation-vocabulary.md",
    "docs/domain/incident-vocabulary.md",
    "docs/domain/repair-vocabulary.md",
    "docs/domain/evidence-receipt-model.md",
    "docs/domain/human-review-states.md",
    "docs/domain/out-of-scope-domains.md",
    "docs/RELIABILITY.md",
    "docs/THREAT_MODEL.md",
    "docs/TOKEN_COST_STRATEGY.md",
    "docs/VERSIONING.md",
    "docs/releases/RELEASE_LADDER.md",
    "docs/releases/V1_SCOPE.md",
    "docs/ops/planning-and-tracking-system.md",
    "docs/ops/builder-qa-prompt-protocol.md",
    "docs/ops/validation-and-handoff-workflow.md",
    "docs/ops/github-pr-and-issue-workflow.md",
    "docs/ops/github-labels-and-milestones.md",
    "docs/ops/branch-protection.md",
    "docs/ops/milestone-closeout-workflow.md",
    "docs/ops/repo-operating-system-freeze.md",
    "docs/status/CURRENT_STATE.md",
    "docs/status/WEEKLY_LOG.md",
    "docs/status/RISK_REGISTER.md",
    "docs/status/TECH_DEBT.md",
    "docs/status/OPEN_QUESTIONS.md",
    "docs/status/CAPABILITY_MATRIX.md",
    "docs/status/NEXT_RECOMMENDED_THREAD.md",
    "docs/status/M00_FREEZE_READINESS.md",
    "docs/status/M00_CLOSEOUT.md",
    "docs/status/M01_DOMAIN_CONSISTENCY.md",
    "docs/milestones/SUBMILESTONE_REGISTRY.md",
    "plans/ROADMAP.md",
    "plans/active/CLP-0002-m01-domain-model-and-scope-freeze.md",
    "plans/completed/CLP-0001-m00-repo-operating-system.md",
    "plans/templates/execplan-template.md",
    "plans/templates/qa-plan-template.md",
    "plans/templates/milestone-closeout-template.md",
    "prompts/template_builder_submilestone.md",
    "prompts/template_qa_submilestone.md",
    "prompts/template_milestone_closeout.md",
    "prompts/template_security_review.md",
    "prompts/template_handoff_packet.md",
    ".github/PULL_REQUEST_TEMPLATE.md",
    ".github/ISSUE_TEMPLATE/submilestone-task.yml",
    ".github/ISSUE_TEMPLATE/qa-review.yml",
    ".github/ISSUE_TEMPLATE/blocked-slice.yml",
    ".github/ISSUE_TEMPLATE/research-spike.yml",
    ".github/ISSUE_TEMPLATE/bug.yml",
    ".github/ISSUE_TEMPLATE/config.yml",
    "tests/test_control_plane_bootstrap.py",
]

REQUIRED_DIRS = [
    "docs",
    "plans",
    "prompts",
    ".github",
    ".github/ISSUE_TEMPLATE",
    ".agents",
    "apps",
    "packages",
    "scenarios",
    "tests",
    "scripts",
    "reports",
    "artifacts",
    "data",
    "infra",
    "docs/status",
    "docs/milestones",
    "docs/specs",
    "docs/evals",
    "docs/decisions",
    "docs/ops",
    "docs/references",
    "docs/releases",
    "docs/domain",
    "plans/active",
    "plans/completed",
    "plans/archived",
    "plans/templates",
    "apps/api",
    "apps/web",
    "apps/worker",
    "apps/agent-runtime",
    "packages/core",
    "packages/events",
    "packages/ledger",
    "packages/invariants",
    "packages/incidents",
    "packages/graph",
    "packages/replay",
    "packages/repair",
    "packages/evidence",
    "packages/connectors",
    "packages/evals",
    "packages/sdk-python",
    "packages/sdk-typescript",
    "packages/mcp-server",
    "tests/unit",
    "tests/integration",
    "tests/e2e",
    "tests/scenario",
    "tests/security",
    "tests/regression",
    "data/fixtures",
    "data/synthetic",
    "infra/docker",
    "infra/migrations",
    "infra/local-observability",
]

MILESTONES = [f"docs/milestones/M{i:02}.md" for i in range(22)]

SPEC_FILES = [
    "docs/specs/money-event-schema.md",
    "docs/specs/ledger-transaction-schema.md",
    "docs/specs/invariant-spec.md",
    "docs/specs/incident-schema.md",
    "docs/specs/causal-graph-spec.md",
    "docs/specs/replay-session-schema.md",
    "docs/specs/agent-tool-contracts.md",
    "docs/specs/repair-plan-schema.md",
    "docs/specs/evidence-bundle-schema.md",
]

EVAL_FILES = [
    "docs/evals/MONEYFLOWBENCH_SPEC.md",
    "docs/evals/ABLATION_STRATEGY.md",
    "docs/evals/ABLATION_MATRIX.md",
    "docs/evals/SCENARIO_FORMAT.md",
    "docs/evals/SCORING_RUBRIC.md",
    "docs/evals/REPAIR_SAFETY_TESTS.md",
    "docs/evals/HALLUCINATION_TESTS.md",
    "docs/evals/COST_BENCHMARKS.md",
]

ADR_FILES = [
    "docs/decisions/ADR-0001-project-thesis.md",
    "docs/decisions/ADR-0002-llm-cannot-mutate-money.md",
    "docs/decisions/ADR-0003-deterministic-invariants-first.md",
    "docs/decisions/ADR-0004-codex-threading-model.md",
]

SKILLS = [
    "causalledger-plan-orchestrator",
    "modular-architecture-guard",
    "financial-correctness-guard",
    "money-event-schema-guard",
    "ledger-invariant-guard",
    "causal-graph-guard",
    "replay-engine-guard",
    "agent-tool-boundary-guard",
    "repair-safety-guard",
    "moneyflowbench-evidence-auditor",
    "validation-ladder-composer",
    "token-cost-guard",
    "handoff-auditor",
]

REQUIRED_TEXT = {
    "docs/ops/validation-and-handoff-workflow.md": [
        "Level 0: Branch and worktree guard",
        "Level 1: File and scope inspection",
        "Level 2: Control-plane validation",
        "Level 3: Unit or bootstrap tests",
        "Level 4: Diff and whitespace checks",
        "Level 5: Product tests, when product code exists",
        "Level 6: Scenario/eval tests, when benchmark code exists",
        "Level 7: Security and forbidden-scope checks",
        "Level 8: Human PR review and merge readiness",
        "Validation skipped and why",
        "Safe to merge means, for QA only",
    ],
    "prompts/template_handoff_packet.md": [
        "## Submilestone ID and name",
        "## Branch",
        "## PR",
        "## Active plan",
        "## Command results",
        "## Validation skipped and why",
        "## Warnings",
        "## Deferred work",
        "## Whether safe to push",
        "## Whether safe to open PR",
        "## Whether safe to start next milestone if milestone closeout",
    ],
    "docs/ops/milestone-closeout-workflow.md": [
        "Milestone closeout preconditions",
        "Submilestone closeout vs milestone closeout",
        "Verify all submilestones are complete",
        "Verify all PRs are merged",
        "Verify no branches are left open unintentionally",
        "Verify validation evidence exists",
        "Verify active plan outcomes are complete",
        "Verify status docs are synchronized",
        "Verify risk, tech debt, and open questions are updated",
        "Verify no product claims were made incorrectly",
        "Prepare next milestone readiness",
        "Move active plans to completed",
        "Archive stale plans or stale docs",
        "Milestone closeout packet",
        "Milestones that cannot be closed",
        "Deferred submilestones",
        "Follow-up work",
    ],
    "prompts/template_milestone_closeout.md": [
        "Milestone ID and name",
        "Completed submilestones",
        "Merged PRs",
        "Validation summary",
        "Changed docs",
        "Changed code",
        "Skipped validation and why",
        "Warnings",
        "Risks",
        "Tech debt",
        "Open questions",
        "Deferred work",
        "Next milestone readiness",
        "Whether active plan can move to completed",
        "Whether safe to start next milestone",
    ],
    "plans/templates/milestone-closeout-template.md": [
        "## Milestone ID and name",
        "## Completed submilestones",
        "## Merged PRs",
        "## Validation summary",
        "## Changed docs",
        "## Changed code",
        "## Skipped validation and why",
        "## Warnings",
        "## Risks",
        "## Tech debt",
        "## Open questions",
        "## Deferred work",
        "## Next milestone readiness",
        "## Whether active plan can move to completed",
        "## Whether safe to start next milestone",
    ],
    "docs/ops/repo-operating-system-freeze.md": [
        "Purpose",
        "What ready means",
        "Before M00 can close",
        "What must remain false before M01 starts",
        "Verify active docs",
        "Verify roadmap and registry",
        "Verify status files",
        "Verify prompt templates",
        "Verify skills",
        "Verify GitHub templates",
        "Verify validation coverage",
        "Verify no product code has started",
        "Verify M01 has not started",
        "What M01 may do after M00 closeout",
        "What M01 may not do without its own active plan",
        "Prepare for M00 closeout",
    ],
    "docs/status/M00_FREEZE_READINESS.md": [
        "M00 purpose",
        "Completed submilestones",
        "M00.08 current status",
        "Control-plane artifacts created",
        "Validation evidence summary",
        "Known limitations",
        "Make unavailable note",
        "No product implementation status",
        "No M01 active plan status",
        "Readiness checklist",
        "Remaining steps before M00 can fully close",
        "Exact next recommended thread after M00.08 builder",
        "Exact next recommended thread after M00.08 QA and merge",
    ],
    "docs/status/M00_CLOSEOUT.md": [
        "Milestone ID and name",
        "Completed submilestones",
        "Deferred submilestones",
        "Merged PRs",
        "Validation summary",
        "Changed docs",
        "Changed code",
        "Skipped validation and why",
        "Warnings",
        "Risks",
        "Tech debt",
        "Open questions",
        "Deferred work",
        "Follow-up work",
        "Next milestone readiness",
        "Whether active plan can move to completed",
        "Whether safe to start next milestone",
        "Exact next recommended thread",
        "No product functionality was implemented",
        "No M01 active plan exists",
    ],
    "docs/VERSIONING.md": [
        "semantic versioning",
        "`v0.1.0` is the M00 Repo Operating System foundation release",
        "`v0.1.0` is not a product release",
        "Only a human operator or a Codex thread explicitly authorized by a human may create and push release tags",
        "`v1.0.0` is the first serious public product release",
        "Do not claim product readiness from placeholder files, specs, plans, or control-plane validation",
    ],
    "docs/releases/RELEASE_LADDER.md": [
        "v0.1.0: M00 Repo Operating System Foundation",
        "v0.2.0: M01-M02 Domain And Local Development Foundation",
        "v0.3.0: M03-M06 Financial Truth Core",
        "v0.4.0: M07-M09 Incident Digital Twin Core",
        "v0.5.0: M10-M13 Safe Agentic Layer",
        "v0.6.0: M14-M15 Benchmark And Demo",
        "v1.0.0: First Serious Public Product Release",
        "v1.1.0+: Connectors, Observability, Security, And Polish",
        "v2.0.0: Company-Grade / Enterprise Version",
    ],
    "docs/releases/V1_SCOPE.md": [
        "M01-M15 complete",
        "Minimum M17 cost and latency tracking for agent runs",
        "Minimum M18 proof that the LLM cannot mutate money",
        "Minimum M20 public README, demo script, architecture diagram, benchmark table, and launch-quality docs",
        "At least one public ablation table",
        "`v1.0.0` must not require all M16-M21 work to be complete",
    ],
    "CHANGELOG.md": [
        "## Unreleased",
        "## v0.1.0 - Repo Operating System Foundation",
        "No product functionality is implemented in `v0.1.0`",
    ],
    "plans/active/CLP-0002-m01-domain-model-and-scope-freeze.md": [
        "M01 freezes CausalLedger domain language, boundaries, and non-goals",
        "M01 must not implement APIs, databases, ledger logic, MoneyEvent runtime code, invariants, agent runtime, repair planner, UI, external connectors, GitHub Actions, CI workflows, or product behavior",
        "M01 planning is complete and merged at git commit `2cfd75a`",
        "M01.05 Define incident vocabulary is completed and merged after QA recovery PR #18 merged at git commit `3bdedeb`",
        "post-merge QA recovery",
        "M01.01 Define payment lifecycle",
        "M01.02 Define ledger vocabulary",
        "M01.03 Define settlement vocabulary",
        "M01.04 Define reconciliation vocabulary",
        "M01.05 Define incident vocabulary",
        "M01.06 Define safe and unsafe repairs",
        "M01.07 Define evidence receipt model",
        "M01.08 Define human review states",
        "M01.09 Define out-of-scope domains",
        "M01.10 Write DOMAIN_MODEL.md",
        "M01.11 Write RELIABILITY.md",
        "M01.12 Write THREAT_MODEL.md",
        "M01.13 QA domain consistency",
        "M01.09 is `Completed and merged`",
        "M01.10 is `Completed and merged`",
        "M01.11 is `Completed and merged`",
        "M01.12 is `Completed and merged`",
        "M01.13 is builder complete awaiting QA",
        "M02 through M21 remain `Not started`",
        "docs/domain/payment-lifecycle.md",
        "docs/domain/ledger-vocabulary.md",
        "docs/domain/settlement-vocabulary.md",
        "docs/domain/reconciliation-vocabulary.md",
        "docs/domain/incident-vocabulary.md",
        "docs/domain/repair-vocabulary.md",
        "docs/domain/evidence-receipt-model.md",
        "docs/domain/human-review-states.md",
        "docs/domain/out-of-scope-domains.md",
    ],
    "docs/domain/README.md": [
        "domain vocabulary",
        "not implement runtime behavior",
        "Payment lifecycle",
        "Ledger vocabulary",
        "Settlement vocabulary",
        "Reconciliation vocabulary",
        "Incident vocabulary",
        "Repair vocabulary",
        "Evidence receipt model",
        "Human review states",
        "Out-of-scope domains",
    ],
    "docs/domain/payment-lifecycle.md": [
        "No runtime implementation is defined or claimed",
        "## Purpose",
        "## Lifecycle scope",
        "## What this document defines",
        "## What this document does not define",
        "## Lifecycle actors",
        "## Lifecycle objects",
        "## Lifecycle phases",
        "## Normal payment path",
        "## Failure and exception paths",
        "## Terminal states",
        "## Non-terminal states",
        "## Provider event perspective",
        "## Internal ledger perspective",
        "## Settlement perspective",
        "## Reconciliation perspective",
        "## Lifecycle evidence examples",
        "## Lifecycle uncertainty examples",
        "## Questions CausalLedger asks about payment lifecycle",
        "## Lifecycle failure patterns",
        "## Boundaries for future M03 MoneyEvent schema",
        "## Boundaries for future M06 invariants",
        "## Boundaries for future M07 incidents",
        "## Boundaries for future M08 causal graph",
        "## Boundaries for future M09 replay",
        "payment_requested",
        "payment_authorized",
        "authorization_failed",
        "payment_captured",
        "provider_payout_created",
        "bank_posted",
        "lifecycle_reconciled",
        "These are lifecycle vocabulary terms only, not implemented invariants",
    ],
    "docs/domain/ledger-vocabulary.md": [
        "No runtime implementation is defined or claimed",
        "## Purpose",
        "## Ledger scope",
        "## What this document defines",
        "## What this document does not define",
        "## Relationship to payment lifecycle vocabulary",
        "## Relationship to future MoneyEvent schema",
        "## Relationship to future double-entry ledger core",
        "## Relationship to future invariant engine",
        "## Relationship to future incident engine",
        "## Relationship to future causal graph",
        "## Relationship to future replay engine",
        "## Relationship to future repair planner",
        "## Core ledger concepts",
        "## Account categories",
        "## Double-entry vocabulary",
        "## Ledger state vocabulary",
        "## Ledger evidence examples",
        "## Questions CausalLedger asks about ledger records",
        "## Ledger failure patterns",
        "## Boundaries with future M01 areas",
        "ledger",
        "account",
        "ledger transaction",
        "ledger entry",
        "debit",
        "credit",
        "journal entry",
        "posting",
        "pending posting",
        "posted transaction",
        "reversal",
        "adjustment",
        "balance snapshot",
        "minor units",
        "idempotency key",
        "immutable ledger record",
        "source reference",
        "evidence reference",
        "transaction reference",
        "reconciliation reference",
        "cash account",
        "bank account",
        "provider clearing account",
        "customer liability account",
        "merchant payable account",
        "suspense account",
        "total debits equal total credits",
        "CausalLedger will not let the LLM decide whether a ledger transaction balances",
        "These are vocabulary terms only, not implemented invariants",
    ],
    "docs/domain/settlement-vocabulary.md": [
        "No runtime implementation is defined or claimed",
        "## Purpose",
        "## Settlement scope",
        "## What this document defines",
        "## What this document does not define",
        "## Relationship to payment lifecycle vocabulary",
        "## Relationship to ledger vocabulary",
        "## Relationship to future MoneyEvent schema",
        "## Relationship to future provider and bank simulator",
        "## Relationship to future invariant engine",
        "## Relationship to future incident engine",
        "## Relationship to future causal graph",
        "## Relationship to future replay engine",
        "## Relationship to future connector work",
        "## Core settlement concepts",
        "## Settlement actors and systems",
        "## Settlement statuses",
        "## Settlement paths",
        "## Settlement evidence examples",
        "## Questions CausalLedger asks about settlement",
        "## Settlement failure patterns",
        "## Boundaries with other M01 areas",
        "settlement",
        "clearing",
        "payout",
        "provider payout",
        "settlement batch",
        "settlement report",
        "settlement file",
        "settlement row",
        "settlement period",
        "settlement window",
        "settlement cut-off time",
        "settlement date",
        "value date",
        "payout date",
        "bank posting date",
        "gross settlement amount",
        "net settlement amount",
        "fee deduction",
        "rolling reserve",
        "reserve release",
        "chargeback deduction",
        "refund deduction",
        "payout reference",
        "settlement reference",
        "bank statement reference",
        "provider balance",
        "pending balance",
        "available balance",
        "settlement currency",
        "payout currency",
        "FX settlement",
        "settlement status",
        "Payment provider or PSP",
        "Acquiring bank",
        "Finance operations user",
        "`settlement_pending`",
        "`settlement_batched`",
        "`settlement_file_received`",
        "`settlement_report_received`",
        "`payout_created`",
        "`payout_in_transit`",
        "`payout_paid`",
        "`payout_failed`",
        "`payout_reversed`",
        "`settlement_adjusted`",
        "`reserve_held`",
        "`reserve_released`",
        "`bank_posted`",
        "`settlement_reconciled`",
        "`settlement_unresolved`",
        "Captured payments -> settlement batch -> payout created -> payout paid -> bank posted -> settlement reconciled",
        "Provider payout object",
        "Did captured payments appear in a settlement batch?",
        "Did provider payout totals match expected gross minus fees, refunds, chargebacks, and reserves?",
        "Missing settlement row",
        "Duplicate settlement row",
        "Missing payout",
        "Failed payout",
        "Payout amount mismatch",
        "Payout currency mismatch",
        "Bank posting missing",
        "Fee not explained",
        "Reserve held without release reference",
        "Settlement ledger divergence",
        "These failure patterns are vocabulary only",
        "Payment lifecycle vocabulary belongs to M01.01",
        "Ledger vocabulary belongs to M01.02",
        "Reconciliation vocabulary belongs to M01.04",
        "Incident vocabulary belongs to M01.05",
        "Safe and unsafe repair vocabulary belongs to M01.06",
        "Evidence receipt model belongs to M01.07",
        "Human review states belong to M01.08",
    ],
    "docs/domain/reconciliation-vocabulary.md": [
        "No runtime implementation is defined or claimed",
        "## Purpose",
        "## Reconciliation scope",
        "## What this document defines",
        "## What this document does not define",
        "## Relationship to payment lifecycle vocabulary",
        "## Relationship to ledger vocabulary",
        "## Relationship to settlement vocabulary",
        "## Relationship to future MoneyEvent schema",
        "## Relationship to future provider and bank simulator",
        "## Relationship to future invariant engine",
        "## Relationship to future incident engine",
        "## Relationship to future causal graph",
        "## Relationship to future replay engine",
        "## Relationship to future repair planner",
        "## Relationship to future MoneyFlowBench scenarios",
        "## Core reconciliation concepts",
        "## Reconciliation sources and targets",
        "## Reconciliation statuses",
        "## Reconciliation paths",
        "## Reconciliation evidence examples",
        "## Questions CausalLedger asks about reconciliation",
        "## Reconciliation failure patterns",
        "## Boundaries with other M01 areas",
        "reconciliation",
        "reconciliation run",
        "reconciliation period",
        "reconciliation window",
        "source record",
        "target record",
        "internal record",
        "external record",
        "expected record",
        "observed record",
        "matching",
        "match candidate",
        "confirmed match",
        "unmatched record",
        "partial match",
        "one-to-one match",
        "one-to-many match",
        "many-to-one match",
        "many-to-many match",
        "matching key",
        "reference key",
        "amount match",
        "currency match",
        "date match",
        "tolerance",
        "variance",
        "break",
        "exception",
        "aged exception",
        "unresolved exception",
        "resolved exception",
        "false positive",
        "false negative",
        "suspense",
        "write-off",
        "manual adjustment",
        "reconciliation status",
        "Payment provider events",
        "Provider settlement reports",
        "Provider payout reports",
        "Bank statement lines",
        "Internal payment records",
        "Internal ledger records",
        "Support or operations notes, as evidence context only",
        "provider data to internal payment state",
        "provider settlement rows to ledger postings",
        "provider payout totals to bank statement lines",
        "`reconciliation_not_started`",
        "`reconciliation_in_progress`",
        "`matched`",
        "`partially_matched`",
        "`unmatched_internal`",
        "`unmatched_external`",
        "`amount_mismatch`",
        "`currency_mismatch`",
        "`timing_mismatch`",
        "`reference_mismatch`",
        "`duplicate_match`",
        "`ambiguous_match`",
        "`exception_open`",
        "`exception_in_review`",
        "`exception_resolved`",
        "`reconciliation_complete`",
        "`reconciliation_unresolved`",
        "Expected internal record -> observed external record -> confirmed match -> `reconciliation_complete`",
        "Expected internal amount -> observed external amount differs -> variance -> `exception_open`",
        "Expected payout -> no bank line yet -> `timing_mismatch` -> later `bank_posted` -> `matched`",
        "External provider or bank record appears with no internal record -> `unmatched_external` -> `exception_open`",
        "Internal payment, ledger, or payout expectation exists with no provider or bank record -> `unmatched_internal` -> `exception_open`",
        "Batch total matches but individual rows require breakdown -> `partially_matched` -> `exception_in_review`",
        "One external record maps to multiple internal records unexpectedly -> `duplicate_match` -> `exception_open`",
        "Multiple possible records have similar references or amounts -> `ambiguous_match` -> `exception_in_review`",
        "`exception_open` -> evidence attached -> explanation accepted -> `exception_resolved`",
        "Provider payment event",
        "Provider settlement row",
        "Provider payout object",
        "Bank statement line",
        "Ledger transaction",
        "Ledger entry",
        "Evidence bundle reference",
        "Replay result reference",
        "Did every expected internal record find a corresponding external record?",
        "Did every external record map to a known internal record?",
        "Is a difference explained by fees, refunds, chargebacks, reserves, FX, timing, or adjustments?",
        "Unmatched internal record",
        "Unmatched external record",
        "Amount mismatch",
        "Currency mismatch",
        "Timing mismatch",
        "Reference mismatch",
        "Duplicate match",
        "Ambiguous match",
        "False match",
        "Missing bank line",
        "Missing settlement row",
        "Missing ledger posting",
        "Unexplained fee variance",
        "Unexplained refund variance",
        "Unexplained chargeback variance",
        "Reserve mismatch",
        "FX variance",
        "Aged exception",
        "Unresolved exception",
        "Reconciliation ledger divergence",
        "Reconciliation settlement divergence",
        "These failure patterns are vocabulary only",
        "Payment lifecycle vocabulary belongs to M01.01",
        "Ledger vocabulary belongs to M01.02",
        "Settlement vocabulary belongs to M01.03",
        "Incident vocabulary belongs to M01.05",
        "Safe and unsafe repair vocabulary belongs to M01.06",
        "Evidence receipt model belongs to M01.07",
        "Human review states belong to M01.08",
    ],
    "docs/domain/incident-vocabulary.md": [
        "## Purpose",
        "## Incident scope",
        "## What this document defines",
        "## What this document does not define",
        "## Relationship to payment lifecycle vocabulary",
        "## Relationship to ledger vocabulary",
        "## Relationship to settlement vocabulary",
        "## Relationship to reconciliation vocabulary",
        "## Relationship to future invariant engine",
        "## Relationship to future incident engine",
        "## Relationship to future causal graph",
        "## Relationship to future replay engine",
        "## Relationship to future agentic investigation",
        "## Relationship to future repair planner",
        "## Relationship to future MoneyFlowBench scenarios",
        "## Core incident concepts",
        "## Incident actors and consumers",
        "## Incident statuses",
        "## Incident severity vocabulary",
        "## Incident type vocabulary",
        "## Incident paths",
        "## Incident evidence examples",
        "## Questions CausalLedger asks about incidents",
        "## Incident failure patterns",
        "## Boundaries with other M01 areas",
        "## Non-implementation statement",
        "incident trigger",
        "detection source",
        "failed invariant",
        "weak signal",
        "affected amount",
        "affected currency",
        "affected customer",
        "affected merchant or seller",
        "affected account",
        "affected payment",
        "affected payout",
        "affected refund",
        "affected chargeback",
        "value at risk",
        "blast radius",
        "evidence link",
        "evidence bundle",
        "suspected root cause",
        "confirmed root cause",
        "confidence",
        "first divergence point",
        "duplicate incident",
        "incident deduplication",
        "incident correlation",
        "AI investigator",
        "read-only assistant only",
        "cannot decide financial truth",
        "`incident_detected`",
        "`triage_pending`",
        "`investigating`",
        "`evidence_requested`",
        "`evidence_complete`",
        "`root_cause_hypothesized`",
        "`root_cause_confirmed`",
        "`repair_candidate_identified`",
        "`awaiting_human_review`",
        "`resolution_in_progress`",
        "`resolved`",
        "`closed`",
        "`reopened`",
        "`false_positive`",
        "`duplicate_incident`",
        "`deferred`",
        "`informational`",
        "`low`",
        "`medium`",
        "`high`",
        "`critical`",
        "affected customer count",
        "financial loss risk",
        "customer harm risk",
        "operational urgency",
        "regulatory or audit relevance",
        "`payment_lifecycle_incident`",
        "`ledger_correctness_incident`",
        "`settlement_incident`",
        "`reconciliation_incident`",
        "`payout_incident`",
        "`refund_incident`",
        "`chargeback_incident`",
        "`bank_posting_incident`",
        "`duplicate_event_incident`",
        "`missing_event_incident`",
        "`delayed_event_incident`",
        "`provider_state_disagreement`",
        "`ledger_lifecycle_divergence`",
        "`settlement_ledger_divergence`",
        "`reconciliation_exception_incident`",
        "`evidence_contradiction_incident`",
        "`unresolved_money_movement_incident`",
        "signal -> failed invariant or unresolved evidence -> `incident_detected` -> `triage_pending`",
        "`triage_pending` -> `investigating` -> `evidence_requested` or `evidence_complete` -> `root_cause_hypothesized`",
        "`root_cause_hypothesized` -> evidence review -> `root_cause_confirmed`",
        "`root_cause_confirmed` -> `repair_candidate_identified` -> `awaiting_human_review`",
        "`awaiting_human_review` -> `resolution_in_progress` -> `resolved` -> `closed`",
        "`incident_detected` -> `investigating` -> `false_positive` -> `closed`",
        "`incident_detected` -> `duplicate_incident` -> linked to parent incident",
        "`closed` -> new evidence or failed replay -> `reopened`",
        "Provider event",
        "Payment lifecycle event",
        "Ledger transaction",
        "Settlement row",
        "Provider payout",
        "Bank statement line",
        "Webhook delivery log",
        "Raw payload hash",
        "Agent memo, as non-authoritative explanation only",
        "What signal created the incident?",
        "Which invariant or evidence conflict supports the incident?",
        "What is the first known divergence point?",
        "Is human review required before any repair is considered?",
        "Incident without evidence",
        "Unsupported root-cause claim",
        "Missing first divergence point",
        "Incident closed without resolution evidence",
        "Agent memo without evidence IDs",
        "Repair proposed before root cause is supported",
        "Payment lifecycle vocabulary belongs to M01.01",
        "Ledger vocabulary belongs to M01.02",
        "Settlement vocabulary belongs to M01.03",
        "Reconciliation vocabulary belongs to M01.04",
        "Safe and unsafe repair vocabulary belongs to M01.06",
        "Evidence receipt model belongs to M01.07",
        "Human review states belong to M01.08",
    ],
    "docs/domain/repair-vocabulary.md": [
        "No runtime implementation is defined or claimed",
        "## Purpose",
        "## Repair scope",
        "## What this document defines",
        "## What this document does not define",
        "## Relationship to payment lifecycle vocabulary",
        "## Relationship to ledger vocabulary",
        "## Relationship to settlement vocabulary",
        "## Relationship to reconciliation vocabulary",
        "## Relationship to incident vocabulary",
        "## Relationship to future evidence work",
        "## Relationship to future replay work",
        "## Relationship to future agentic investigation",
        "## Relationship to future repair planner",
        "## Relationship to future human review",
        "## Core repair concepts",
        "## Agent repair boundary",
        "## Repair evidence requirements",
        "## Compensation versus reversal",
        "## Repair proposal lifecycle vocabulary",
        "## Repair categories",
        "## Safe to propose, review required, and forbidden",
        "## Repair rejection reasons",
        "## Why this boundary protects the CausalLedger moat",
        "## Boundaries with other M01 areas",
        "## Non-implementation statement",
        "repair proposal",
        "repair candidate",
        "evidence-backed repair plan",
        "safe repair",
        "unsafe repair",
        "forbidden autonomous repair",
        "destructive action",
        "rollback plan",
        "replay-before-apply",
        "deterministic validation",
        "idempotency key",
        "human approval",
        "escalation",
        "repair evidence requirements",
        "repair uncertainty",
        "repair blast radius",
        "repair preconditions",
        "repair postconditions",
        "repair audit trail",
        "compensation",
        "reversal",
        "dry-run repair simulation",
        "repair rejection reason",
        "mutate money",
        "post ledger entries",
        "approve repairs",
        "apply repairs",
        "delete evidence",
        "modify raw events",
        "override invariants",
        "bypass human review",
        "release external communications",
        "claim unsupported financial facts",
        "`repair_candidate_identified`",
        "`repair_proposal_drafted`",
        "`repair_proposal_rejected`",
        "`repair_escalated`",
        "`awaiting_human_approval`",
        "`repair_approved_by_human`",
        "`repair_ready_for_dry_run`",
        "`repair_dry_run_failed`",
        "`repair_dry_run_passed`",
        "`repair_application_forbidden`",
        "Documentation-only correction",
        "Evidence-link correction",
        "Case-status correction",
        "Reconciliation explanation update",
        "Proposed ledger adjustment",
        "Proposed settlement adjustment",
        "Proposed refund correction",
        "Proposed chargeback correction",
        "Provider-retry recommendation",
        "Unsafe autonomous money movement",
        "Unsafe raw evidence mutation",
        "Unsafe ledger rewrite",
        "Unsafe deletion or suppression of audit evidence",
        "Safe means safe to propose for review, not safe for autonomous application",
        "Human review is required whenever a proposal changes persistent case state",
        "Forbidden autonomous repair categories include unsafe autonomous money movement",
        "turns repair planning into a controlled enterprise workflow rather than a generic agent action",
        "Payment lifecycle vocabulary belongs to M01.01",
        "Ledger vocabulary belongs to M01.02",
        "Settlement vocabulary belongs to M01.03",
        "Reconciliation vocabulary belongs to M01.04",
        "Incident vocabulary belongs to M01.05",
        "Evidence receipt model belongs to M01.07",
        "Human review states belong to M01.08",
    ],
    "docs/domain/evidence-receipt-model.md": [
        "No runtime implementation is defined or claimed",
        "## Purpose",
        "## Evidence receipt scope",
        "## What this document defines",
        "## What this document does not define",
        "## Relationship to payment lifecycle vocabulary",
        "## Relationship to ledger vocabulary",
        "## Relationship to settlement vocabulary",
        "## Relationship to reconciliation vocabulary",
        "## Relationship to incident vocabulary",
        "## Relationship to repair vocabulary",
        "## Relationship to future human review",
        "## Core evidence receipt concepts",
        "## Evidence source examples",
        "## Evidence receipt statuses",
        "## Evidence rejection reasons",
        "## Timestamp vocabulary",
        "## Raw and derived evidence boundaries",
        "## Redaction and confidentiality boundary",
        "## Evidence uncertainty, confidence, limitations, conflicts, coverage, and gaps",
        "## Evidence bundles",
        "## Safety boundary",
        "## Questions CausalLedger asks about evidence receipts",
        "## Evidence failure patterns",
        "## Why evidence receipts protect the CausalLedger moat",
        "## Boundaries with other M01 areas",
        "## Non-implementation statement",
        "evidence receipt",
        "evidence source",
        "source identity",
        "evidence provider",
        "raw evidence reference",
        "normalized evidence reference",
        "provenance",
        "chain of custody",
        "checksum or hash",
        "evidence timestamp",
        "ingestion timestamp",
        "observation timestamp",
        "received-at timestamp",
        "evidence freshness",
        "evidence retention state",
        "redaction boundary",
        "evidence confidentiality class",
        "evidence uncertainty",
        "evidence confidence",
        "evidence limitation",
        "evidence conflict",
        "evidence coverage",
        "evidence gap",
        "evidence bundle",
        "evidence receipt status",
        "evidence rejection reason",
        "append-only evidence handling",
        "immutable raw evidence boundary",
        "derived evidence boundary",
        "evidence audit trail",
        "raw evidence must not be silently modified",
        "evidence receipts must not become financial truth by themselves",
        "LLM output must not replace source evidence",
        "conflicting evidence must be surfaced, not hidden",
        "missing evidence must trigger limitation",
        "redaction must protect sensitive data without destroying auditability",
        "evidence mutation or deletion is a destructive action",
        "mutate financial truth",
        "Payment lifecycle vocabulary belongs to M01.01",
        "Ledger vocabulary belongs to M01.02",
        "Settlement vocabulary belongs to M01.03",
        "Reconciliation vocabulary belongs to M01.04",
        "Incident vocabulary belongs to M01.05",
        "Safe and unsafe repair vocabulary belongs to M01.06",
        "Human review states belong to M01.08",
    ],
    "docs/domain/human-review-states.md": [
        "No runtime implementation is defined or claimed",
        "## Purpose",
        "## Human review scope",
        "## What this document defines",
        "## What this document does not define",
        "## Relationship to payment lifecycle vocabulary",
        "## Relationship to ledger vocabulary",
        "## Relationship to settlement vocabulary",
        "## Relationship to reconciliation vocabulary",
        "## Relationship to incident vocabulary",
        "## Relationship to safe and unsafe repair vocabulary",
        "## Relationship to evidence receipt model",
        "## Relationship to future repair planner",
        "## Relationship to future human review workbench",
        "## Relationship to future security and audit logs",
        "## Relationship to future agentic investigation",
        "## Core human review concepts",
        "## Review actors",
        "## Human review states",
        "## Repair-review states",
        "## What humans may approve",
        "## What humans may not approve inside CausalLedger v1 scope",
        "## AI boundaries in review",
        "## Review evidence expectations",
        "## Questions CausalLedger asks about human review",
        "## Human review failure patterns",
        "## Boundaries with other M01 areas",
        "## Non-implementation statement",
        "human review",
        "reviewer",
        "approver",
        "requester",
        "observer",
        "reviewer identity",
        "reviewer role",
        "reviewer reason",
        "review queue",
        "review item",
        "review decision",
        "approval",
        "rejection",
        "request for more evidence",
        "escalation",
        "delegation",
        "reassignment",
        "approval threshold",
        "approval policy",
        "review policy",
        "approval scope",
        "review scope",
        "review status",
        "decision timestamp",
        "decision evidence",
        "decision rationale",
        "audit trail",
        "immutable approval record",
        "review comment",
        "review attachment",
        "conflict of interest",
        "dual control",
        "four-eyes review",
        "break-glass approval",
        "policy exception",
        "finance operations reviewer",
        "payment operations reviewer",
        "ledger engineer reviewer",
        "platform engineer reviewer",
        "risk or compliance observer",
        "support observer",
        "incident owner",
        "repair proposer",
        "AI investigator",
        "system validator",
        "cannot approve, reject, apply, or execute repairs",
        "`review_not_required`",
        "`review_required`",
        "`review_pending`",
        "`reviewer_assigned`",
        "`evidence_requested`",
        "`evidence_received`",
        "`review_in_progress`",
        "`approved`",
        "`rejected`",
        "`escalated`",
        "`delegated`",
        "`reassigned`",
        "`expired`",
        "`cancelled`",
        "`policy_exception_requested`",
        "`policy_exception_denied`",
        "`policy_exception_approved`",
        "`break_glass_requested`",
        "`break_glass_denied`",
        "`break_glass_approved`",
        "`review_closed`",
        "`review_reopened`",
        "`repair_review_required`",
        "`repair_review_pending`",
        "`repair_evidence_incomplete`",
        "`repair_validator_failed`",
        "`repair_validator_passed`",
        "`repair_approved_for_sandbox`",
        "`repair_rejected`",
        "`repair_needs_revision`",
        "`repair_escalated`",
        "`repair_applied_in_sandbox`",
        "`repair_ready_for_replay`",
        "`repair_not_approved_for_production`",
        "`production_repair_forbidden_without_policy`",
        "AI may summarize evidence",
        "AI may not",
        "Evidence bundle reference",
        "Was human review required?",
        "Was the AI kept out of approval authority?",
        "Approval without evidence",
        "AI treated as approver",
        "Payment lifecycle vocabulary belongs to M01.01",
        "Ledger vocabulary belongs to M01.02",
        "Settlement vocabulary belongs to M01.03",
        "Reconciliation vocabulary belongs to M01.04",
        "Incident vocabulary belongs to M01.05",
        "Safe and unsafe repair vocabulary belongs to M01.06",
        "Evidence receipt model belongs to M01.07",
        "Out-of-scope domains belong to M01.09",
        "No human-review runtime",
    ],
    "docs/domain/out-of-scope-domains.md": [
        "No runtime implementation is defined or claimed",
        "## Purpose",
        "## What this document defines",
        "## What this document does not define",
        "## Relationship to payment lifecycle vocabulary",
        "## Relationship to ledger vocabulary",
        "## Relationship to settlement vocabulary",
        "## Relationship to reconciliation vocabulary",
        "## Relationship to incident vocabulary",
        "## Relationship to repair vocabulary",
        "## Relationship to evidence receipt model",
        "## Relationship to human review states",
        "## Relationship to future product implementation",
        "## Relationship to future company and version roadmap",
        "## CausalLedger core scope",
        "## Hard out-of-scope domains",
        "## Adjacent but not core domains",
        "## Claims CausalLedger must not make",
        "## Actions the LLM must never perform",
        "## Future-extension rules",
        "## Interview and product positioning boundaries",
        "## Examples",
        "## Non-implementation statement",
        "Money movement lifecycle correctness",
        "ledger correctness evidence",
        "Settlement and payout evidence",
        "Reconciliation break evidence",
        "Financial incident response",
        "Causal event reconstruction",
        "Replayable incident evidence",
        "Safe repair proposal vocabulary",
        "Human review and approval boundaries",
        "Benchmark and ablation evaluation",
        "AML platform",
        "KYC onboarding platform",
        "sanctions screening platform",
        "fraud scoring product",
        "Credit underwriting",
        "Credit risk scoring",
        "Market risk",
        "Trading risk",
        "Investment advice",
        "Tax advice",
        "Legal or regulatory advice",
        "Consumer personal finance assistant",
        "Generic accounting close platform",
        "ERP replacement",
        "payment processor",
        "Bank core system",
        "treasury management system",
        "Autonomous finance agent",
        "autonomous repair executor",
        "Autonomous money movement system",
        "general APM or infrastructure observability platform",
        "Customer support chatbot as a standalone product",
        "Fraud signals",
        "AML/KYC references",
        "Regulatory incident reporting evidence",
        "Audit evidence support",
        "Customer support explanation",
        "Accounting close support",
        "Treasury context",
        "provider outage context",
        "Operational resilience reporting",
        "Compliance evidence packaging",
        "CausalLedger is not a bank",
        "CausalLedger does not autonomously move money",
        "CausalLedger does not decide financial truth using an LLM",
        "Move money",
        "Approve repairs",
        "Post ledger entries",
        "Delete evidence",
        "Modify raw events",
        "Override deterministic checks",
        "Make AML/KYC determinations",
        "Make credit decisions",
        "Make sanctions determinations",
        "Call production write APIs",
        "claim regulatory determinations",
        "without a new scope decision",
        "Financial incident response for money movement",
        "AI accountant",
        "AI that fixes money automatically",
        "Duplicate webhook creates duplicate ledger posting",
        "Missing bank posting after payout",
        "Suspicious refund pattern",
        "Customer identity mismatch",
        "Chargeback affects settlement",
        "No product functionality",
    ],
    "docs/status/M01_DOMAIN_CONSISTENCY.md": [
        "## Purpose",
        "## Scope",
        "## Checked Files",
        "## Current Milestone Status",
        "## Completed M01 Submilestones",
        "## Remaining M01 Status",
        "## Product Implementation Status",
        "## Terminology Consistency Results",
        "## Domain Boundary Consistency Results",
        "## Reliability Consistency Results",
        "## Threat Model Consistency Results",
        "## AI Boundary Consistency Results",
        "## Evaluation And Ablation Consistency Results",
        "## Versioning Consistency Results",
        "## Roadmap And Registry Consistency Results",
        "## Spec Placeholder Consistency Results",
        "## Missing CI And Production Feature Consistency Results",
        "## Forbidden-Scope Verification",
        "## Unresolved Issues",
        "## Recommendation For M01 Closeout Readiness",
        "M01.12 Write THREAT_MODEL.md is `Completed and merged`",
        "Duplicate PR merges #32 and #33",
        "M01.13 QA Domain Consistency is the current submilestone",
        "Builder complete, awaiting QA",
        "Product implementation has not started",
        "No GitHub Actions or CI workflows exist",
        "No runtime tests, APIs, database schemas, deployment, auth/authz runtime",
        "LLM output is not evidence",
        "Dangerous ablations are offline negative controls only",
        "MoneyFlowBench implementation is future work",
        "M02 through M21 remain `Not started`",
        "M01 is not ready for closeout yet",
    ],
    "docs/DOMAIN_MODEL.md": [
        "## Status",
        "## Product thesis",
        "## Domain model purpose",
        "## Core scope",
        "## Domain map",
        "## Domain source documents",
        "## Cross-domain lifecycle",
        "## Money movement object map",
        "## Evidence and truth model",
        "## Deterministic truth boundaries",
        "## Agentic AI boundaries",
        "## Human review and repair boundaries",
        "## Out-of-scope boundaries",
        "## Future implementation dependencies",
        "## Versioning and release relevance",
        "## Validation and evaluation relevance",
        "## Remaining M01 work",
        "## Guardrails for implementation milestones",
        "canonical M01 domain model summary",
        "M01.01 through M01.09 are defined",
        "M01.10 is `Completed and merged`",
        "M01.11 is `Completed and merged`",
        "M01.12 has written `docs/THREAT_MODEL.md` as the threat model for the domain",
        "M01.13 QA Domain Consistency has produced",
        "The whole M01 milestone is not complete yet",
        "Product implementation has not started",
        "docs/RELIABILITY.md",
        "docs/THREAT_MODEL.md",
        "Payment lifecycle",
        "docs/domain/payment-lifecycle.md",
        "docs/domain/ledger-vocabulary.md",
        "docs/domain/settlement-vocabulary.md",
        "docs/domain/reconciliation-vocabulary.md",
        "docs/domain/incident-vocabulary.md",
        "docs/domain/repair-vocabulary.md",
        "docs/domain/evidence-receipt-model.md",
        "docs/domain/human-review-states.md",
        "docs/domain/out-of-scope-domains.md",
        "Ledger vocabulary",
        "Settlement vocabulary",
        "Reconciliation vocabulary",
        "Incident vocabulary",
        "Repair vocabulary",
        "Evidence receipt model",
        "Human review states",
        "Out-of-scope domains",
    ],
    "docs/RELIABILITY.md": [
        "## Status",
        "## Purpose",
        "## Reliability thesis",
        "CausalLedger reliability comes from deterministic financial checks, evidence provenance, replay, repair validation, human review, audit trails, and bounded AI assistance.",
        "The LLM never owns financial truth.",
        "## Reliability scope",
        "## What reliability means for CausalLedger",
        "## What reliability does not mean",
        "## Financial truth model",
        "## Deterministic-first reliability",
        "## Evidence reliability",
        "## Ledger and accounting reliability",
        "## Settlement and reconciliation reliability",
        "## Incident reliability",
        "## Replay reliability",
        "## Repair reliability",
        "## Human review reliability",
        "## Agentic AI reliability",
        "## Model routing and cost reliability",
        "## Observability and auditability",
        "## Evaluation and ablation reliability",
        "## Security and threat-model dependency",
        "## Failure modes and mitigations",
        "## Reliability metrics",
        "## Future implementation dependencies",
        "## Remaining M01 reliability work",
        "## Guardrails for future implementation milestones",
        "Current validation proves documentation and control-plane coherence only",
        "M01.12 has written the CausalLedger threat model",
        "M01.13 QA Domain Consistency is `Builder complete, awaiting QA`",
        "Product implementation has not started",
        "LLM memos are explanations only",
        "Event identity and idempotency checks",
        "total debits to equal total credits",
        "Bank posting is an external cash truth touchpoint",
        "Root-cause hypotheses are not confirmed facts without evidence",
        "Safe-to-propose is not safe-to-apply",
        "AI cannot act as reviewer",
        "read-only tools by default",
        "Cost savings must be measured",
        "request IDs",
        "root-cause accuracy",
        "Dangerous ablations are offline negative controls only",
        "M01.12 `docs/THREAT_MODEL.md` defines the threat model",
        "Do not implement reliability claims without validation",
    ],
    "docs/THREAT_MODEL.md": [
        "## Status",
        "## Purpose",
        "## Threat model thesis",
        "CausalLedger's threat model is based on protecting financial evidence, deterministic truth boundaries, human approval boundaries, and LLM tool boundaries.",
        "The LLM never owns financial truth.",
        "Threats become most dangerous when LLM output, incomplete evidence, unsafe repair pressure, or permission mistakes can influence money-related decisions.",
        "## Threat model scope",
        "## What this threat model does not do",
        "## Protected assets",
        "## Trust boundaries",
        "## Actors and adversaries",
        "## Threat categories",
        "## Evidence threats",
        "## Ledger and financial truth threats",
        "## Settlement and reconciliation threats",
        "## Incident and replay threats",
        "## Repair and human review threats",
        "## Agentic AI threats",
        "## Prompt injection threats",
        "## Tool and permission threats",
        "## Model routing and cost threats",
        "## Data privacy and confidentiality threats",
        "## Secrets and credential threats",
        "## Dependency and supply-chain threats",
        "## Abuse and out-of-scope domain threats",
        "## Evaluation and ablation threats",
        "## Operational and governance threats",
        "## Threat-to-mitigation matrix",
        "## Future implementation dependencies",
        "## Remaining M01 threat-model work",
        "## Guardrails for future implementation milestones",
        "Current validation only proves documentation and control-plane coherence, not runtime security",
        "Product implementation has not started",
        "Raw evidence",
        "Evidence receipts",
        "Evidence bundles",
        "External provider systems",
        "LLM context boundary",
        "Agent tool boundary",
        "Human review boundary",
        "Production money movement boundary",
        "Prompt injection attacker",
        "Poisoned evidence source",
        "Write tool exposed to AI",
        "Repair approval tool exposed",
        "API keys in repo",
        "offline-only ablation configs",
        "Evidence integrity",
        "M03, M07, M08, M09, M18",
        "Do not expose write tools to AI agents unless explicitly scoped and guarded.",
        "Do not enable unsafe ablations outside offline benchmark mode.",
    ],
    "docs/evals/ABLATION_STRATEGY.md": [
        "What an ablation is",
        "Ablations may disable safety components only inside offline benchmark scenarios. Production runtime must keep safety boundaries enforced.",
        "offline benchmark experiments, not production toggles",
        "Unsafe ablations must never be enabled in production",
        "MoneyFlowBench",
        "deterministic-first design",
        "agent safety",
        "cost and latency",
        "repair safety",
        "security testing",
        "does not implement ablation runners",
    ],
    "docs/evals/ABLATION_MATRIX.md": [
        "Deterministic-first ablations",
        "Agentic AI ablations",
        "Repair-safety ablations",
        "Evidence-quality ablations",
        "Cost and latency ablations",
        "Security ablations",
        "Scenario-complexity ablations",
        "`full_system`",
        "`deterministic_only`",
        "`llm_only_negative_control`",
        "`no_invariant_engine`",
        "`no_causal_graph`",
        "`no_replay`",
        "`no_critic_agent`",
        "`no_evidence_id_requirement`",
        "`small_model_vs_strong_model`",
        "`no_model_router`",
        "`no_evidence_cache`",
        "`missing_evidence`",
        "`poisoned_evidence`",
        "`no_repair_validator_negative_control`",
        "`no_rollback_requirement_negative_control`",
        "`no_idempotency_requirement_negative_control`",
        "`no_human_review_negative_control`",
        "`prompt_injection_attack`",
        "`forbidden_tool_access_attempt`",
        "Offline negative control only",
    ],
    "docs/evals/MONEYFLOWBENCH_SPEC.md": [
        "## Ablation support",
        "named ablation configurations",
        "Ablations are offline benchmark experiments, not production toggles",
        "does not implement a runner",
    ],
    "docs/evals/SCORING_RUBRIC.md": [
        "## Ablation-related scoring dimensions",
        "Root-cause accuracy by ablation variant",
        "Evidence precision by ablation variant",
        "Evidence recall by ablation variant",
        "Unsafe repair rate by ablation variant",
        "Hallucination rate by ablation variant",
        "Escalation quality by ablation variant",
        "Latency by ablation variant",
        "Token cost by ablation variant",
    ],
    "docs/evals/REPAIR_SAFETY_TESTS.md": [
        "Repair-safety ablation boundary",
        "must never disable validators in production",
        "offline benchmark scenarios",
    ],
    "docs/evals/HALLUCINATION_TESTS.md": [
        "no-evidence-ID",
        "no-critic ablations",
    ],
    "docs/evals/COST_BENCHMARKS.md": [
        "small model",
        "strong model",
        "model router",
        "cached evidence",
        "compressed context",
    ],
    "docs/milestones/M14.md": [
        "M14.16 | Add benchmark and ablation runner",
        "M14.23 | Add benchmark and ablation report",
        "M14.24 | QA MoneyFlowBench and ablation suite",
        "ablation reporting",
        "offline benchmark experiments, not production toggles",
    ],
    "docs/ops/github-pr-and-issue-workflow.md": [
        "one branch",
        "one PR",
        "one builder thread",
        "one QA thread",
        "same branch and PR",
        "Do not merge without QA PASS",
        "Missing GitHub CLI",
        "Auditability And Interview-Grade Traceability",
    ],
    "START_HERE.md": [
        "plans/active/CLP-0002-m01-domain-model-and-scope-freeze.md",
        "docs/VERSIONING.md",
        "docs/releases/RELEASE_LADDER.md",
        "docs/releases/V1_SCOPE.md",
        "CHANGELOG.md",
    ],
    "WORKFLOW.md": [
        "docs/VERSIONING.md",
        "docs/releases/RELEASE_LADDER.md",
        "docs/releases/V1_SCOPE.md",
        "CHANGELOG.md",
        "plans/active/CLP-0002-m01-domain-model-and-scope-freeze.md",
    ],
    ".github/PULL_REQUEST_TEMPLATE.md": [
        "# Submilestone",
        "# Branch",
        "# Active Plan",
        "# Product Implementation Status",
        "# Validation Commands Run",
        "# QA Status",
        "# Forbidden-Scope Checklist",
        "# Safe-To-Merge Checklist",
        "No product code unless explicitly scoped.",
        "Branch guard used.",
        "QA run on same branch.",
        "Safe to merge only after QA PASS.",
    ],
    "docs/ops/github-labels-and-milestones.md": [
        "type:builder",
        "type:qa",
        "type:control-plane",
        "scope:no-product-code",
        "risk:financial-correctness",
        "M00 Repo operating system",
        "M21 Company version",
        "manual creation in the GitHub UI",
    ],
    "docs/ops/branch-protection.md": [
        "require a pull request before merging",
        "require conversation resolution before merging",
        "disallow force pushes",
        "disallow deletion",
        "GitHub reviewer approvals may remain off",
        "QA thread discipline still applies",
    ],
}


def missing_paths(paths, kind):
    missing = []
    for rel in paths:
        path = ROOT / rel
        if kind == "file" and not path.is_file():
            missing.append(rel)
        if kind == "dir" and not path.is_dir():
            missing.append(rel)
    return missing


def missing_required_text():
    missing = []
    for rel, phrases in REQUIRED_TEXT.items():
        text = (ROOT / rel).read_text(encoding="utf-8")
        for phrase in phrases:
            if phrase not in text:
                missing.append((rel, phrase))
    return missing


def closeout_state_errors():
    errors = []
    active_m00_plan = ROOT / "plans/active/CLP-0001-m00-repo-operating-system.md"
    completed_m00_plan = ROOT / "plans/completed/CLP-0001-m00-repo-operating-system.md"
    active_plan_dir = ROOT / "plans/active"
    active_m01_plan = ROOT / "plans/active/CLP-0002-m01-domain-model-and-scope-freeze.md"

    if active_m00_plan.exists():
        errors.append("M00 plan still exists in plans/active after closeout")
    if not completed_m00_plan.is_file():
        errors.append("Completed M00 plan is missing from plans/completed")

    if not active_m01_plan.is_file():
        errors.append("Active M01 planning plan is missing from plans/active")

    unexpected_active_plans = [
        path.relative_to(ROOT).as_posix()
        for path in active_plan_dir.glob("CLP-*.md")
        if path != active_m01_plan
    ]
    if unexpected_active_plans:
        errors.append(
            "Unexpected active milestone plans exist: "
            + ", ".join(unexpected_active_plans)
        )

    registry = (ROOT / "docs/milestones/SUBMILESTONE_REGISTRY.md").read_text(
        encoding="utf-8"
    )
    for submilestone in [f"M00.{index:02}" for index in range(1, 9)]:
        row = next(
            (line for line in registry.splitlines() if line.startswith(f"| {submilestone} |")),
            "",
        )
        if "Completed and merged" not in row:
            errors.append(f"{submilestone} is not Completed and merged")

    row = next(
        (line for line in registry.splitlines() if line.startswith("| M01.01 |")),
        "",
    )
    for phrase in [
        "Completed and merged",
        "post-merge QA recovery",
        "m01-01-qa-recovery-define-payment-lifecycle",
        "1175789",
    ]:
        if phrase not in row:
            errors.append(f"M01.01 registry row missing QA recovery marker: {phrase}")

    row = next(
        (line for line in registry.splitlines() if line.startswith("| M01.02 |")),
        "",
    )
    for phrase in [
        "Completed and merged",
        "m01-02-define-ledger-vocabulary",
        "fd1e259",
    ]:
        if phrase not in row:
            errors.append(f"M01.02 registry row missing merge marker: {phrase}")

    row = next(
        (line for line in registry.splitlines() if line.startswith("| M01.03 |")),
        "",
    )
    for phrase in [
        "Completed and merged",
        "m01-03-define-settlement-vocabulary",
        "e54a917",
    ]:
        if phrase not in row:
            errors.append(f"M01.03 registry row missing merge marker: {phrase}")

    row = next(
        (line for line in registry.splitlines() if line.startswith("| M01.04 |")),
        "",
    )
    for phrase in [
        "Completed and merged",
        "m01-04-define-reconciliation-vocabulary",
        "5dfe928",
    ]:
        if phrase not in row:
            errors.append(f"M01.04 registry row missing merge marker: {phrase}")

    row = next(
        (line for line in registry.splitlines() if line.startswith("| M01.05 |")),
        "",
    )
    for phrase in [
        "Completed and merged",
        "m01-05-qa-recovery-incident-vocabulary-ablation-strategy",
        "post-merge QA recovery",
        "5c3943b",
        "#18",
        "3bdedeb",
        "validate-control-plane passed",
        "pytest",
        "git diff --check passed",
    ]:
        if phrase not in row:
            errors.append(f"M01.05 registry row missing merge marker: {phrase}")

    row = next(
        (line for line in registry.splitlines() if line.startswith("| M01.06 |")),
        "",
    )
    for phrase in [
        "Completed and merged",
        "plans/active/CLP-0002-m01-domain-model-and-scope-freeze.md",
        "m01-06-define-safe-and-unsafe-repairs",
        "#21",
        "7adc96d",
        "post-merge finalization passed",
        "validate-control-plane passed",
        "pytest 24 passed",
        "git diff --check passed",
        "make unavailable",
        "No product implementation or runtime repair behavior",
    ]:
        if phrase not in row:
            errors.append(f"M01.06 registry row missing merge marker: {phrase}")

    row = next(
        (line for line in registry.splitlines() if line.startswith("| M01.07 |")),
        "",
    )
    for phrase in [
        "Completed and merged",
        "plans/active/CLP-0002-m01-domain-model-and-scope-freeze.md",
        "m01-07-define-evidence-receipt-model",
        "#23",
        "a88b5ff",
        "0313f4e",
        "post-merge finalization passed",
        "validate-control-plane passed",
        "pytest 25 passed",
        "git diff --check passed",
        "make unavailable",
        "No product implementation or runtime evidence behavior",
    ]:
        if phrase not in row:
            errors.append(f"M01.07 registry row missing merge marker: {phrase}")

    row = next(
        (line for line in registry.splitlines() if line.startswith("| M01.08 |")),
        "",
    )
    for phrase in [
        "Completed and merged",
        "plans/active/CLP-0002-m01-domain-model-and-scope-freeze.md",
        "m01-08-define-human-review-states",
        "#26",
        "1fde07a",
        "post-merge finalization recorded",
        "validate-control-plane passed",
        "pytest 27 passed",
        "git diff --check passed",
        "make unavailable",
        "No product implementation or runtime human-review behavior",
    ]:
        if phrase not in row:
            errors.append(f"M01.08 registry row missing merge marker: {phrase}")

    row = next(
        (line for line in registry.splitlines() if line.startswith("| M01.09 |")),
        "",
    )
    for phrase in [
        "Completed and merged",
        "plans/active/CLP-0002-m01-domain-model-and-scope-freeze.md",
        "m01-09-define-out-of-scope-domains",
        "#27",
        "1b40773",
        "post-merge finalization recorded",
        "validate-control-plane passed",
        "pytest 27 passed",
        "git diff --check passed",
        "make unavailable",
        "hard out-of-scope domains",
        "No product implementation or runtime out-of-scope behavior",
    ]:
        if phrase not in row:
            errors.append(f"M01.09 registry row missing merge marker: {phrase}")

    row = next(
        (line for line in registry.splitlines() if line.startswith("| M01.10 |")),
        "",
    )
    for phrase in [
        "Completed and merged",
        "plans/active/CLP-0002-m01-domain-model-and-scope-freeze.md",
        "m01-10-qa-recovery-domain-model",
        "Builder #28 merged; recovery PR #29 merged",
        "post-merge finalization recorded",
        "a878d55",
        "dc6800b",
        "validate-control-plane passed",
        "pytest 27 passed",
        "git diff --check passed",
        "make unavailable",
        "canonical M01 domain model summary",
        "No product implementation or runtime behavior",
    ]:
        if phrase not in row:
            errors.append(f"M01.10 registry row missing merge marker: {phrase}")

    row = next(
        (line for line in registry.splitlines() if line.startswith("| M01.11 |")),
        "",
    )
    for phrase in [
        "Completed and merged",
        "plans/active/CLP-0002-m01-domain-model-and-scope-freeze.md",
        "m01-11-write-reliability",
        "#30 merged",
        "post-merge finalization recorded",
        "a424924",
        "pytest 28 passed",
        "git diff --check passed",
        "make unavailable",
        "canonical reliability model",
        "financial truth model",
        "deterministic-first reliability",
        "evidence reliability",
        "repair reliability",
        "No product implementation or runtime reliability behavior",
    ]:
        if phrase not in row:
            errors.append(f"M01.11 registry row missing merge marker: {phrase}")

    row = next(
        (line for line in registry.splitlines() if line.startswith("| M01.12 |")),
        "",
    )
    for phrase in [
        "Completed and merged",
        "plans/active/CLP-0002-m01-domain-model-and-scope-freeze.md",
        "m01-12-write-threat-model",
        "#31 merged",
        "duplicate #32 and #33 process deviation",
        "Post-merge finalization recorded",
        "QA validation passed",
        "builder validation passed",
        "validate-control-plane passed",
        "pytest",
        "git diff --check passed",
        "make unavailable",
        "Documentation-only THREAT_MODEL.md canonical threat model",
        "No product implementation or runtime security behavior",
    ]:
        if phrase not in row:
            errors.append(f"M01.12 registry row missing completion marker: {phrase}")

    row = next(
        (line for line in registry.splitlines() if line.startswith("| M01.13 |")),
        "",
    )
    for phrase in [
        "Builder complete, awaiting QA",
        "plans/active/CLP-0002-m01-domain-model-and-scope-freeze.md",
        "m01-13-qa-domain-consistency",
        "docs/status/M01_DOMAIN_CONSISTENCY.md",
        "validate-control-plane passed",
        "pytest passed",
        "git diff --check passed",
        "make unavailable",
        "No product implementation",
        "M01 closeout still required after QA PASS and merge",
    ]:
        if phrase not in row:
            errors.append(f"M01.13 registry row missing builder marker: {phrase}")

    for milestone in range(2, 22):
        prefix = f"| M{milestone:02}."
        for row in [line for line in registry.splitlines() if line.startswith(prefix)]:
            if "Not started" not in row:
                errors.append(f"{row.split('|')[1].strip()} is not Not started")

    m00_docs = [
        "docs/milestones/M00.md",
        "plans/ROADMAP.md",
        "docs/status/CURRENT_STATE.md",
        "docs/status/M00_CLOSEOUT.md",
        "docs/status/M00_FREEZE_READINESS.md",
    ]
    for rel in m00_docs:
        text = (ROOT / rel).read_text(encoding="utf-8")
        if "M00.01 through M00.08" not in text:
            errors.append(f"{rel} does not summarize all M00 submilestones")

    roadmap = (ROOT / "plans/ROADMAP.md").read_text(encoding="utf-8")
    if "| M00 Repo operating system |" not in roadmap or "| 8 | Completed |" not in roadmap:
        errors.append("Roadmap does not mark M00 completed")
    if (
        "| M01 Domain model and scope freeze |" not in roadmap
        or "| 13 | Active |" not in roadmap
    ):
        errors.append("Roadmap does not mark M01 active")
    if "Add v0.1.0 release" in registry or "Add v0.1.0 release" in roadmap:
        errors.append("Future public-launch wording still reuses v0.1.0")

    closeout = (ROOT / "docs/status/M00_CLOSEOUT.md").read_text(encoding="utf-8")
    for forbidden_claim in [
        "MoneyEvent",
        "ledger",
        "invariant",
        "incident",
        "graph",
        "replay",
        "agent runtime",
        "repair planner",
        "UI",
        "connector",
        "API",
        "database",
        "GitHub Actions",
        "CI workflow",
        "real secret",
    ]:
        if forbidden_claim not in closeout:
            errors.append(f"M00 closeout does not record no {forbidden_claim} work")

    workflows_dir = ROOT / ".github/workflows"
    if workflows_dir.exists():
        errors.append(".github/workflows exists before CI is authorized")

    placeholder_roots = ["apps", "packages", "scenarios", "data", "infra"]
    unexpected_product_files = []
    for rel in placeholder_roots:
        for path in (ROOT / rel).rglob("*"):
            if path.is_file() and path.name != "README.md":
                unexpected_product_files.append(path.relative_to(ROOT).as_posix())
    if unexpected_product_files:
        errors.append(
            "Future product directories contain non-placeholder files: "
            + ", ".join(unexpected_product_files)
        )

    env_example = (ROOT / ".env.example").read_text(encoding="utf-8")
    populated_env_values = [
        line
        for line in env_example.splitlines()
        if "=" in line and line.split("=", 1)[1].strip()
    ]
    if populated_env_values:
        errors.append(".env.example contains populated values before secrets handling exists")

    current_state = (ROOT / "docs/status/CURRENT_STATE.md").read_text(encoding="utf-8")
    next_thread = (ROOT / "docs/status/NEXT_RECOMMENDED_THREAD.md").read_text(
        encoding="utf-8"
    )
    no_product_texts = [
        ("docs/status/CURRENT_STATE.md", current_state),
        ("docs/status/NEXT_RECOMMENDED_THREAD.md", next_thread),
        ("README.md", (ROOT / "README.md").read_text(encoding="utf-8")),
        ("CHANGELOG.md", (ROOT / "CHANGELOG.md").read_text(encoding="utf-8")),
    ]
    for rel, text in no_product_texts:
        if (
            "Product implementation has not started" not in text
            and "No product functionality" not in text
        ):
            errors.append(f"{rel} does not clearly state product implementation is absent")

    if "M01.13 QA - Domain Consistency" not in next_thread:
        errors.append("Next recommended thread is not M01.13 QA - Domain Consistency")
    if "M01.11 is `Completed and merged`" not in next_thread:
        errors.append("Next recommended thread does not record M01.11 as Completed and merged")
    if "M01.12 Write THREAT_MODEL.md is `Completed and merged`" not in next_thread:
        errors.append("Next recommended thread does not record M01.12 as Completed and merged")
    if "M01.13 is `Builder complete, awaiting QA`" not in next_thread:
        errors.append("Next recommended thread does not record M01.13 as Builder complete awaiting QA")
    if "M01 closeout is not started and remains required after M01.13 QA PASS and PR merge" not in next_thread:
        errors.append("Next recommended thread does not preserve M01 closeout boundary")
    if "Do not start M02" not in next_thread:
        errors.append("Next recommended thread does not block M02 later work")

    domain_doc = ROOT / "docs/domain/payment-lifecycle.md"
    ledger_doc = ROOT / "docs/domain/ledger-vocabulary.md"
    settlement_doc = ROOT / "docs/domain/settlement-vocabulary.md"
    reconciliation_doc = ROOT / "docs/domain/reconciliation-vocabulary.md"
    incident_doc = ROOT / "docs/domain/incident-vocabulary.md"
    repair_doc = ROOT / "docs/domain/repair-vocabulary.md"
    evidence_doc = ROOT / "docs/domain/evidence-receipt-model.md"
    human_review_doc = ROOT / "docs/domain/human-review-states.md"
    out_of_scope_doc = ROOT / "docs/domain/out-of-scope-domains.md"
    domain_index = ROOT / "docs/DOMAIN_MODEL.md"
    if not domain_doc.is_file():
        errors.append("M01.01 payment lifecycle doc is missing")
    if not ledger_doc.is_file():
        errors.append("M01.02 ledger vocabulary doc is missing")
    if not settlement_doc.is_file():
        errors.append("M01.03 settlement vocabulary doc is missing")
    if not reconciliation_doc.is_file():
        errors.append("M01.04 reconciliation vocabulary doc is missing")
    if not incident_doc.is_file():
        errors.append("M01.05 incident vocabulary doc is missing")
    if not repair_doc.is_file():
        errors.append("M01.06 repair vocabulary doc is missing")
    if not evidence_doc.is_file():
        errors.append("M01.07 evidence receipt model doc is missing")
    if not human_review_doc.is_file():
        errors.append("M01.08 human review states doc is missing")
    if not out_of_scope_doc.is_file():
        errors.append("M01.09 out-of-scope domains doc is missing")
    if domain_doc.is_file():
        text = domain_doc.read_text(encoding="utf-8")
        forbidden_claims = [
            "implements MoneyEvent",
            "implements ledger",
            "implements invariants",
            "runtime implementation is complete",
            "schema is defined",
        ]
        for claim in forbidden_claims:
            if claim in text:
                errors.append(f"Payment lifecycle doc makes forbidden runtime claim: {claim}")
    if ledger_doc.is_file():
        text = ledger_doc.read_text(encoding="utf-8")
        forbidden_claims = [
            "implements MoneyEvent",
            "implements ledger",
            "implements invariants",
            "runtime implementation is complete",
            "schema is defined",
        ]
        for claim in forbidden_claims:
            if claim in text:
                errors.append(f"Ledger vocabulary doc makes forbidden runtime claim: {claim}")
    if settlement_doc.is_file():
        text = settlement_doc.read_text(encoding="utf-8")
        forbidden_claims = [
            "implements MoneyEvent",
            "implements ledger",
            "implements invariants",
            "runtime implementation is complete",
            "schema is defined",
        ]
        for claim in forbidden_claims:
            if claim in text:
                errors.append(f"Settlement vocabulary doc makes forbidden runtime claim: {claim}")
    if reconciliation_doc.is_file():
        text = reconciliation_doc.read_text(encoding="utf-8")
        forbidden_claims = [
            "implements MoneyEvent",
            "implements ledger",
            "implements invariants",
            "runtime implementation is complete",
            "schema is defined",
        ]
        for claim in forbidden_claims:
            if claim in text:
                errors.append(f"Reconciliation vocabulary doc makes forbidden runtime claim: {claim}")
    if incident_doc.is_file():
        text = incident_doc.read_text(encoding="utf-8")
        forbidden_claims = [
            "implements MoneyEvent",
            "implements ledger",
            "implements invariants",
            "runtime implementation is complete",
            "schema is defined",
        ]
        for claim in forbidden_claims:
            if claim in text:
                errors.append(f"Incident vocabulary doc makes forbidden runtime claim: {claim}")
    if repair_doc.is_file():
        text = repair_doc.read_text(encoding="utf-8")
        forbidden_claims = [
            "implements MoneyEvent",
            "implements ledger",
            "implements invariants",
            "runtime implementation is complete",
            "schema is defined",
            "applies repairs",
            "posts ledger entries",
        ]
        for claim in forbidden_claims:
            if claim in text:
                errors.append(f"Repair vocabulary doc makes forbidden runtime claim: {claim}")
    if evidence_doc.is_file():
        text = evidence_doc.read_text(encoding="utf-8")
        forbidden_claims = [
            "implements MoneyEvent",
            "implements ledger",
            "implements invariants",
            "runtime implementation is complete",
            "schema is defined",
            "ingests evidence",
            "stores evidence",
            "deletes evidence",
        ]
        for claim in forbidden_claims:
            if claim in text:
                errors.append(f"Evidence receipt model doc makes forbidden runtime claim: {claim}")
    if human_review_doc.is_file():
        text = human_review_doc.read_text(encoding="utf-8")
        forbidden_claims = [
            "implements MoneyEvent",
            "implements ledger",
            "implements invariants",
            "runtime implementation is complete",
            "schema is defined",
            "state machine is implemented",
            "approval engine is implemented",
        ]
        for claim in forbidden_claims:
            if claim in text:
                errors.append(f"Human review states doc makes forbidden runtime claim: {claim}")
    if out_of_scope_doc.is_file():
        text = out_of_scope_doc.read_text(encoding="utf-8")
        forbidden_claims = [
            "runtime implementation is complete",
            "approval engine is implemented",
            "state machine is implemented",
            "scoring engine is implemented",
            "production write API is implemented",
        ]
        for claim in forbidden_claims:
            if claim in text:
                errors.append(f"Out-of-scope domains doc makes forbidden runtime claim: {claim}")
    if domain_index.is_file():
        text = domain_index.read_text(encoding="utf-8")
        required_sections = [
            "## Product thesis",
            "## Domain model purpose",
            "## Core scope",
            "## Domain map",
            "## Cross-domain lifecycle",
            "## Money movement object map",
            "## Evidence and truth model",
            "## Deterministic truth boundaries",
            "## Agentic AI boundaries",
            "## Human review and repair boundaries",
            "## Out-of-scope boundaries",
            "## Future implementation dependencies",
            "## Versioning and release relevance",
            "## Validation and evaluation relevance",
            "## Remaining M01 work",
            "## Guardrails for implementation milestones",
        ]
        for section in required_sections:
            if section not in text:
                errors.append(f"docs/DOMAIN_MODEL.md missing required section: {section}")
        if "docs/domain/payment-lifecycle.md" not in text:
            errors.append("docs/DOMAIN_MODEL.md does not reference docs/domain/payment-lifecycle.md")
        if "docs/domain/ledger-vocabulary.md" not in text:
            errors.append("docs/DOMAIN_MODEL.md does not reference docs/domain/ledger-vocabulary.md")
        if "docs/domain/settlement-vocabulary.md" not in text:
            errors.append("docs/DOMAIN_MODEL.md does not reference docs/domain/settlement-vocabulary.md")
        if "docs/domain/reconciliation-vocabulary.md" not in text:
            errors.append("docs/DOMAIN_MODEL.md does not reference docs/domain/reconciliation-vocabulary.md")
        if "docs/domain/incident-vocabulary.md" not in text:
            errors.append("docs/DOMAIN_MODEL.md does not reference docs/domain/incident-vocabulary.md")
        if "docs/domain/repair-vocabulary.md" not in text:
            errors.append("docs/DOMAIN_MODEL.md does not reference docs/domain/repair-vocabulary.md")
        if "docs/domain/evidence-receipt-model.md" not in text:
            errors.append("docs/DOMAIN_MODEL.md does not reference docs/domain/evidence-receipt-model.md")
        if "docs/domain/human-review-states.md" not in text:
            errors.append("docs/DOMAIN_MODEL.md does not reference docs/domain/human-review-states.md")
        if "docs/domain/out-of-scope-domains.md" not in text:
            errors.append("docs/DOMAIN_MODEL.md does not reference docs/domain/out-of-scope-domains.md")

    domain_readme = ROOT / "docs/domain/README.md"
    if domain_readme.is_file():
        text = domain_readme.read_text(encoding="utf-8")
        if "docs/domain/ledger-vocabulary.md" not in text and "ledger-vocabulary.md" not in text:
            errors.append("docs/domain/README.md does not reference docs/domain/ledger-vocabulary.md")
        if "docs/domain/settlement-vocabulary.md" not in text and "settlement-vocabulary.md" not in text:
            errors.append("docs/domain/README.md does not reference docs/domain/settlement-vocabulary.md")
        if "docs/domain/reconciliation-vocabulary.md" not in text and "reconciliation-vocabulary.md" not in text:
            errors.append("docs/domain/README.md does not reference docs/domain/reconciliation-vocabulary.md")
        if "docs/domain/incident-vocabulary.md" not in text and "incident-vocabulary.md" not in text:
            errors.append("docs/domain/README.md does not reference docs/domain/incident-vocabulary.md")
        if "docs/domain/repair-vocabulary.md" not in text and "repair-vocabulary.md" not in text:
            errors.append("docs/domain/README.md does not reference docs/domain/repair-vocabulary.md")
        if "docs/domain/evidence-receipt-model.md" not in text and "evidence-receipt-model.md" not in text:
            errors.append("docs/domain/README.md does not reference docs/domain/evidence-receipt-model.md")
        if "docs/domain/human-review-states.md" not in text and "human-review-states.md" not in text:
            errors.append("docs/domain/README.md does not reference docs/domain/human-review-states.md")
        if "docs/domain/out-of-scope-domains.md" not in text and "out-of-scope-domains.md" not in text:
            errors.append("docs/domain/README.md does not reference docs/domain/out-of-scope-domains.md")

    m14_doc = (ROOT / "docs/milestones/M14.md").read_text(encoding="utf-8")
    if "Add benchmark and ablation runner" not in m14_doc:
        errors.append("M14 does not include benchmark and ablation runner wording")
    if "Add benchmark and ablation report" not in m14_doc:
        errors.append("M14 does not include benchmark and ablation report wording")
    if "QA MoneyFlowBench and ablation suite" not in m14_doc:
        errors.append("M14 does not include MoneyFlowBench and ablation suite QA wording")
    m14_rows = [line for line in registry.splitlines() if line.startswith("| M14.")]
    if len(m14_rows) != 24:
        errors.append("M14 submilestone count changed from 24")

    return errors


def main():
    required_files = (
        REQUIRED_FILES
        + MILESTONES
        + SPEC_FILES
        + EVAL_FILES
        + ADR_FILES
        + [f".agents/skills/{skill}/SKILL.md" for skill in SKILLS]
    )
    missing_files = missing_paths(required_files, "file")
    missing_dirs = missing_paths(REQUIRED_DIRS, "dir")
    missing_text = missing_required_text()
    closeout_errors = closeout_state_errors()

    if missing_files or missing_dirs or missing_text or closeout_errors:
        print("Control-plane validation failed.")
        if missing_files:
            print("Missing files:")
            for rel in missing_files:
                print(f"  - {rel}")
        if missing_dirs:
            print("Missing directories:")
            for rel in missing_dirs:
                print(f"  - {rel}")
        if missing_text:
            print("Missing required text:")
            for rel, phrase in missing_text:
                print(f"  - {rel}: {phrase}")
        if closeout_errors:
            print("Closeout state errors:")
            for error in closeout_errors:
                print(f"  - {error}")
        raise SystemExit(1)

    print("Control-plane validation passed.")


if __name__ == "__main__":
    main()
