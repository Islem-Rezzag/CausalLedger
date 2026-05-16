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
        "M01.03 Define settlement vocabulary is the current domain-documentation submilestone",
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
        "M01.04 through M01.13 remain planned scope only and are not started",
        "M02 through M21 remain `Not started`",
        "docs/domain/payment-lifecycle.md",
        "docs/domain/ledger-vocabulary.md",
        "docs/domain/settlement-vocabulary.md",
    ],
    "docs/domain/README.md": [
        "domain vocabulary",
        "not implement runtime behavior",
        "Payment lifecycle",
        "Ledger vocabulary",
        "Settlement vocabulary",
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
    "docs/DOMAIN_MODEL.md": [
        "M01 domain index",
        "Payment lifecycle",
        "docs/domain/payment-lifecycle.md",
        "docs/domain/ledger-vocabulary.md",
        "docs/domain/settlement-vocabulary.md",
        "The domain model is not complete",
        "Ledger vocabulary",
        "Settlement vocabulary",
        "Reconciliation vocabulary",
        "Incident vocabulary",
        "Safe and unsafe repairs",
        "Evidence receipt model",
        "Human review states",
        "Out-of-scope domains",
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
        "QA passed, awaiting merge",
        "m01-03-define-settlement-vocabulary",
        "validate-control-plane passed",
        "pytest",
        "git diff --check passed",
    ]:
        if phrase not in row:
            errors.append(f"M01.03 registry row missing QA marker: {phrase}")

    for index in range(4, 14):
        submilestone = f"M01.{index:02}"
        row = next(
            (line for line in registry.splitlines() if line.startswith(f"| {submilestone} |")),
            "",
        )
        if "Not started" not in row:
            errors.append(f"{submilestone} is not Not started during M01.03 QA")

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

    if "Merge M01.03 PR - Define Settlement Vocabulary" not in next_thread:
        errors.append(
            "Next recommended thread is not Merge M01.03 PR - Define Settlement Vocabulary"
        )
    if "Do not start M01.04" not in next_thread:
        errors.append("Next recommended thread does not block M01.04 until M01.03 QA and merge")

    domain_doc = ROOT / "docs/domain/payment-lifecycle.md"
    ledger_doc = ROOT / "docs/domain/ledger-vocabulary.md"
    settlement_doc = ROOT / "docs/domain/settlement-vocabulary.md"
    domain_index = ROOT / "docs/DOMAIN_MODEL.md"
    if not domain_doc.is_file():
        errors.append("M01.01 payment lifecycle doc is missing")
    if not ledger_doc.is_file():
        errors.append("M01.02 ledger vocabulary doc is missing")
    if not settlement_doc.is_file():
        errors.append("M01.03 settlement vocabulary doc is missing")
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
    if domain_index.is_file():
        text = domain_index.read_text(encoding="utf-8")
        if "docs/domain/payment-lifecycle.md" not in text:
            errors.append("docs/DOMAIN_MODEL.md does not reference docs/domain/payment-lifecycle.md")
        if "docs/domain/ledger-vocabulary.md" not in text:
            errors.append("docs/DOMAIN_MODEL.md does not reference docs/domain/ledger-vocabulary.md")
        if "docs/domain/settlement-vocabulary.md" not in text:
            errors.append("docs/DOMAIN_MODEL.md does not reference docs/domain/settlement-vocabulary.md")

    domain_readme = ROOT / "docs/domain/README.md"
    if domain_readme.is_file():
        text = domain_readme.read_text(encoding="utf-8")
        if "docs/domain/ledger-vocabulary.md" not in text and "ledger-vocabulary.md" not in text:
            errors.append("docs/domain/README.md does not reference docs/domain/ledger-vocabulary.md")
        if "docs/domain/settlement-vocabulary.md" not in text and "settlement-vocabulary.md" not in text:
            errors.append("docs/domain/README.md does not reference docs/domain/settlement-vocabulary.md")

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
