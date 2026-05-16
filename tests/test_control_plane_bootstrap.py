from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


def test_required_root_files_exist():
    for rel in [
        "README.md",
        "START_HERE.md",
        "AGENTS.md",
        "PLANS.md",
        "WORKFLOW.md",
        "Makefile",
        ".env.example",
        ".gitignore",
        "CHANGELOG.md",
    ]:
        assert (ROOT / rel).is_file(), rel


def test_required_project_docs_exist():
    for rel in [
        "docs/INDEX.md",
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
        "docs/status/M00_FREEZE_READINESS.md",
        "docs/status/M00_CLOSEOUT.md",
        "docs/milestones/SUBMILESTONE_REGISTRY.md",
        "plans/active/CLP-0002-m01-domain-model-and-scope-freeze.md",
        "plans/completed/CLP-0001-m00-repo-operating-system.md",
    ]:
        assert (ROOT / rel).is_file(), rel


def test_required_control_plane_directories_exist():
    for rel in [
        "docs/status",
        "docs/milestones",
        "docs/specs",
        "docs/evals",
        "docs/decisions",
        "docs/ops",
        "docs/references",
        "docs/releases",
        "docs/domain",
        ".github",
        ".github/ISSUE_TEMPLATE",
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
    ]:
        assert (ROOT / rel).is_dir(), rel


def test_milestone_files_exist():
    for index in range(22):
        assert (ROOT / f"docs/milestones/M{index:02}.md").is_file()


def test_roadmap_has_real_submilestone_counts():
    roadmap = (ROOT / "plans" / "ROADMAP.md").read_text(encoding="utf-8")

    assert "TBD" not in roadmap

    expected_counts = {
        "M00": 8,
        "M01": 13,
        "M02": 20,
        "M03": 19,
        "M04": 18,
        "M05": 19,
        "M06": 18,
        "M07": 16,
        "M08": 18,
        "M09": 17,
        "M10": 15,
        "M11": 15,
        "M12": 17,
        "M13": 12,
        "M14": 24,
        "M15": 15,
        "M16": 14,
        "M17": 18,
        "M18": 16,
        "M19": 17,
        "M20": 16,
        "M21": 15,
    }

    for milestone, count in expected_counts.items():
        assert f"| {count} |" in next(
            line for line in roadmap.splitlines() if line.startswith(f"| {milestone} ")
        )


def test_versioning_and_release_docs_are_coherent():
    versioning = (ROOT / "docs" / "VERSIONING.md").read_text(encoding="utf-8")
    release_ladder = (
        ROOT / "docs" / "releases" / "RELEASE_LADDER.md"
    ).read_text(encoding="utf-8")
    v1_scope = (ROOT / "docs" / "releases" / "V1_SCOPE.md").read_text(
        encoding="utf-8"
    )
    changelog = (ROOT / "CHANGELOG.md").read_text(encoding="utf-8")

    for phrase in [
        "semantic versioning",
        "`v0.1.0` is the M00 Repo Operating System foundation release",
        "`v0.1.0` is not a product release",
        "`v1.0.0` is the first serious public product release",
        "Do not claim product readiness from placeholder files, specs, plans, or control-plane validation",
    ]:
        assert phrase in versioning

    for phrase in [
        "v0.1.0: M00 Repo Operating System Foundation",
        "v0.2.0: M01-M02 Domain And Local Development Foundation",
        "v0.3.0: M03-M06 Financial Truth Core",
        "v0.4.0: M07-M09 Incident Digital Twin Core",
        "v0.5.0: M10-M13 Safe Agentic Layer",
        "v0.6.0: M14-M15 Benchmark And Demo",
        "v1.0.0: First Serious Public Product Release",
        "v1.1.0+: Connectors, Observability, Security, And Polish",
        "v2.0.0: Company-Grade / Enterprise Version",
    ]:
        assert phrase in release_ladder

    for phrase in [
        "M01-M15 complete",
        "Minimum M17 cost and latency tracking for agent runs",
        "Minimum M18 proof that the LLM cannot mutate money",
        "Minimum M20 public README, demo script, architecture diagram, benchmark table, and launch-quality docs",
        "`v1.0.0` must not require all M16-M21 work to be complete",
    ]:
        assert phrase in v1_scope

    for phrase in [
        "## Unreleased",
        "## v0.1.0 - Repo Operating System Foundation",
        "No product functionality is implemented in `v0.1.0`",
    ]:
        assert phrase in changelog

    for rel in [
        "README.md",
        "docs/INDEX.md",
        "docs/ACTIVE_DOCS.md",
        "START_HERE.md",
        "PLANS.md",
        "WORKFLOW.md",
    ]:
        text = (ROOT / rel).read_text(encoding="utf-8")
        for reference in [
            "docs/VERSIONING.md",
            "docs/releases/RELEASE_LADDER.md",
            "docs/releases/V1_SCOPE.md",
            "CHANGELOG.md",
            "plans/active/CLP-0002-m01-domain-model-and-scope-freeze.md",
        ]:
            assert reference in text, f"{rel} missing {reference}"


def test_active_m01_plan_lists_planned_submilestones_and_scope_boundary():
    plan = (
        ROOT / "plans" / "active" / "CLP-0002-m01-domain-model-and-scope-freeze.md"
    ).read_text(encoding="utf-8")

    for phrase in [
        "M01 freezes CausalLedger domain language, boundaries, and non-goals",
        "not a product runtime implementation milestone",
        "M01 may update docs, specifications, milestone tracking, and status files",
        "M01 must not implement APIs, databases, ledger logic, MoneyEvent runtime code, invariants, agent runtime, repair planner, UI, external connectors, GitHub Actions, CI workflows, or product behavior",
        "LLM agents may investigate, summarize, and propose, but they do not mutate money, approve repairs, delete evidence, post ledger entries, modify raw events, or override deterministic invariants",
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
        "docs/domain/payment-lifecycle.md",
        "docs/domain/ledger-vocabulary.md",
        "docs/domain/settlement-vocabulary.md",
    ]:
        assert phrase in plan


def test_m01_payment_lifecycle_domain_docs_are_documentation_only():
    domain_readme = (ROOT / "docs" / "domain" / "README.md").read_text(
        encoding="utf-8"
    )
    payment_lifecycle = (
        ROOT / "docs" / "domain" / "payment-lifecycle.md"
    ).read_text(encoding="utf-8")
    domain_model = (ROOT / "docs" / "DOMAIN_MODEL.md").read_text(encoding="utf-8")

    for phrase in [
        "domain vocabulary",
        "do not implement runtime behavior",
        "Payment lifecycle",
        "Ledger vocabulary",
    ]:
        assert phrase in domain_readme

    for phrase in [
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
        "authorization_expired",
        "payment_captured",
        "capture_failed",
        "payment_voided_or_cancelled",
        "refund_requested",
        "refund_processing",
        "refund_completed",
        "refund_failed",
        "dispute_opened",
        "dispute_resolved",
        "chargeback_created",
        "chargeback_reversed",
        "provider_payout_created",
        "provider_payout_paid",
        "provider_payout_failed",
        "bank_posted",
        "lifecycle_reconciled",
        "lifecycle_unresolved",
        "payment_requested -> payment_authorized -> payment_captured -> provider_payout_created -> provider_payout_paid -> bank_posted -> lifecycle_reconciled",
        "These are lifecycle vocabulary terms only, not implemented invariants",
    ]:
        assert phrase in payment_lifecycle

    for forbidden_claim in [
        "implements MoneyEvent",
        "implements ledger",
        "implements invariants",
        "runtime implementation is complete",
        "schema is defined",
    ]:
        assert forbidden_claim not in payment_lifecycle

    for phrase in [
        "M01 domain index",
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
    ]:
        assert phrase in domain_model


def test_m01_ledger_vocabulary_domain_doc_is_documentation_only():
    ledger_vocabulary = (
        ROOT / "docs" / "domain" / "ledger-vocabulary.md"
    ).read_text(encoding="utf-8")
    domain_readme = (ROOT / "docs" / "domain" / "README.md").read_text(
        encoding="utf-8"
    )
    domain_model = (ROOT / "docs" / "DOMAIN_MODEL.md").read_text(encoding="utf-8")

    for phrase in [
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
        "ledger transaction",
        "ledger entry",
        "debit",
        "credit",
        "journal entry",
        "pending posting",
        "posted transaction",
        "reversal",
        "adjustment",
        "balance snapshot",
        "opening balance",
        "closing balance",
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
        "revenue account",
        "fee expense account",
        "suspense account",
        "total debits equal total credits",
        "CausalLedger will not let the LLM decide whether a ledger transaction balances",
        "Ledger records should not be deleted",
        "`pending`",
        "`posted`",
        "`reversed`",
        "`adjusted`",
        "`voided`",
        "`rejected`",
        "`disputed`",
        "`unresolved`",
        "Provider payment captured",
        "Does the ledger transaction balance?",
        "Unbalanced transaction",
        "Duplicate posting",
        "Missing posting",
        "Unsupported posting",
        "Orphan reversal",
        "Adjustment without evidence",
        "Currency mismatch",
        "Ledger lifecycle divergence",
        "These are vocabulary terms only, not implemented invariants",
        "Settlement vocabulary belongs to M01.03",
        "Reconciliation vocabulary belongs to M01.04",
        "Incident vocabulary belongs to M01.05",
        "Safe and unsafe repair vocabulary belongs to M01.06",
        "Evidence receipt model belongs to M01.07",
        "Human review states belong to M01.08",
    ]:
        assert phrase in ledger_vocabulary

    for forbidden_claim in [
        "implements MoneyEvent",
        "implements ledger",
        "implements invariants",
        "runtime implementation is complete",
        "schema is defined",
    ]:
        assert forbidden_claim not in ledger_vocabulary

    assert "ledger-vocabulary.md" in domain_readme
    assert "docs/domain/ledger-vocabulary.md" in domain_model


def test_m01_settlement_vocabulary_domain_doc_is_documentation_only():
    settlement_vocabulary = (
        ROOT / "docs" / "domain" / "settlement-vocabulary.md"
    ).read_text(encoding="utf-8")
    domain_readme = (ROOT / "docs" / "domain" / "README.md").read_text(
        encoding="utf-8"
    )
    domain_model = (ROOT / "docs" / "DOMAIN_MODEL.md").read_text(encoding="utf-8")

    for phrase in [
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
    ]:
        assert phrase in settlement_vocabulary

    for forbidden_claim in [
        "implements MoneyEvent",
        "implements ledger",
        "implements invariants",
        "runtime implementation is complete",
        "schema is defined",
    ]:
        assert forbidden_claim not in settlement_vocabulary

    assert "settlement-vocabulary.md" in domain_readme
    assert "docs/domain/settlement-vocabulary.md" in domain_model


def test_submilestone_registry_contains_all_expected_rows():
    registry = (
        ROOT / "docs" / "milestones" / "SUBMILESTONE_REGISTRY.md"
    ).read_text(encoding="utf-8")

    assert (
        "| ID | Name | Milestone | Status | Active Plan | Branch | PR | Last Validation | Last Updated | Notes |"
        in registry
    )
    assert "| M00.01 | Roadmap and submilestone registry |" in registry
    assert "| M21.15 | QA company version |" in registry

    rows = [
        line
        for line in registry.splitlines()
        if line.startswith("| M") and not line.startswith("| Milestone")
    ]
    assert len(rows) == 360


def test_planning_tracking_status_states_are_documented():
    tracking_doc = (ROOT / "docs" / "ops" / "planning-and-tracking-system.md").read_text(
        encoding="utf-8"
    )
    registry = (
        ROOT / "docs" / "milestones" / "SUBMILESTONE_REGISTRY.md"
    ).read_text(encoding="utf-8")

    for status in [
        "Not started",
        "Builder in progress",
        "Builder complete, awaiting QA",
        "QA in progress",
        "QA passed, awaiting merge",
        "Completed and merged",
        "Blocked",
        "Deferred",
    ]:
        assert status in tracking_doc
        assert status in registry


def test_builder_qa_prompt_protocol_and_templates_are_complete():
    protocol = (ROOT / "docs" / "ops" / "builder-qa-prompt-protocol.md").read_text(
        encoding="utf-8"
    )
    builder = (ROOT / "prompts" / "template_builder_submilestone.md").read_text(
        encoding="utf-8"
    )
    qa = (ROOT / "prompts" / "template_qa_submilestone.md").read_text(
        encoding="utf-8"
    )
    handoff = (ROOT / "prompts" / "template_handoff_packet.md").read_text(
        encoding="utf-8"
    )

    for phrase in [
        "Why every submilestone gets two Codex threads",
        "Same-branch, same-PR rule",
        "Builder thread responsibilities",
        "QA thread responsibilities",
        "Branch guard rules",
        "Handling QA fixes",
        "Handling failed QA",
        "Handling no-change QA pass",
        "Handling product-code milestones later",
        "Avoiding chat-memory dependency",
    ]:
        assert phrase in protocol

    for text in [protocol, builder, qa]:
        for command in [
            "git branch --show-current",
            "git status --short",
            "git remote -v",
        ]:
            assert command in text

    for phrase in [
        "Thread name",
        "Target submilestone",
        "Working tree cleanliness",
        "Forbidden scope",
        "Tracking update requirements",
        "Validation commands",
        "Acceptance criteria",
        "Handoff packet format",
    ]:
        assert phrase in builder

    for phrase in [
        "Thread name",
        "Audited submilestone",
        "Strict reviewer role",
        "No-scope-widening rule",
        "Files to inspect",
        "Forbidden changes check",
        "Status transition rules",
        "PASS or FAIL output",
        "Safe-to-merge statement",
        "Next recommended thread",
    ]:
        assert phrase in qa

    for phrase in [
        "Files created",
        "Files changed",
        "Files intentionally not touched",
        "Commands run",
        "Validation result",
        "Current submilestone status",
        "Whether product implementation started",
        "Remaining issues",
        "Exact next recommended Codex thread",
        "Whether safe to commit",
        "Whether safe to merge if QA",
    ]:
        assert phrase in handoff


def test_validation_and_handoff_workflow_is_complete():
    workflow = (
        ROOT / "docs" / "ops" / "validation-and-handoff-workflow.md"
    ).read_text(encoding="utf-8")
    builder = (ROOT / "prompts" / "template_builder_submilestone.md").read_text(
        encoding="utf-8"
    )
    qa = (ROOT / "prompts" / "template_qa_submilestone.md").read_text(
        encoding="utf-8"
    )
    handoff = (
        ROOT / "prompts" / "template_handoff_packet.md"
    ).read_text(encoding="utf-8")

    for phrase in [
        "Level 0: Branch and worktree guard",
        "Level 1: File and scope inspection",
        "Level 2: Control-plane validation",
        "Level 3: Unit or bootstrap tests",
        "Level 4: Diff and whitespace checks",
        "Level 5: Product tests, when product code exists",
        "Level 6: Scenario/eval tests, when benchmark code exists",
        "Level 7: Security and forbidden-scope checks",
        "Level 8: Human PR review and merge readiness",
        "Control-plane-only ladder",
        "Docs-only ladder",
        "Prompt and template ladder",
        "Future product-code ladder",
        "Future eval and benchmark ladder",
        "Future security-sensitive ladder",
        "Unavailable commands",
        "Validation failures",
        "Recording skipped validation",
        "Safe to merge means, for QA only",
        "Handoff packet requirements",
    ]:
        assert phrase in workflow

    for text in [builder, qa, handoff]:
        for phrase in [
            "Submilestone ID and name",
            "Branch",
            "PR",
            "Active plan",
            "Command results",
            "Validation skipped and why",
            "Warnings",
            "Whether safe to push",
            "Whether safe to open PR",
        ]:
            assert phrase in text


def test_github_pr_and_issue_workflow_artifacts_are_complete():
    workflow = (
        ROOT / "docs" / "ops" / "github-pr-and-issue-workflow.md"
    ).read_text(encoding="utf-8")
    labels = (
        ROOT / "docs" / "ops" / "github-labels-and-milestones.md"
    ).read_text(encoding="utf-8")
    branch_protection = (
        ROOT / "docs" / "ops" / "branch-protection.md"
    ).read_text(encoding="utf-8")
    pr_template = (ROOT / ".github" / "PULL_REQUEST_TEMPLATE.md").read_text(
        encoding="utf-8"
    )

    for phrase in [
        "Branch Naming Convention",
        "PR Naming Convention",
        "PR Body Expectations",
        "Issue Template Usage",
        "one branch",
        "one PR",
        "one builder thread",
        "one QA thread",
        "same branch and PR",
        "Draft PR Versus Normal PR",
        "Before Opening A PR",
        "Before Running QA",
        "Before Merging",
        "Squash Merge Guidance",
        "Branch Deletion After Merge",
        "Local Main Update After Merge",
        "Remote Branch Deletion Handling",
        "Failed QA",
        "QA Fixes",
        "Merge Conflicts",
        "Missing GitHub CLI",
        "Do not merge without QA PASS",
        "Avoiding Early Next-Submilestone Start",
        "Auditability And Interview-Grade Traceability",
    ]:
        assert phrase in workflow

    for phrase in [
        "type:builder",
        "type:qa",
        "type:docs",
        "type:control-plane",
        "scope:no-product-code",
        "risk:financial-correctness",
        "risk:agent-boundary",
        "M00 Repo operating system",
        "M21 Company version",
        "manual creation in the GitHub UI",
    ]:
        assert phrase in labels

    for phrase in [
        "require a pull request before merging",
        "require conversation resolution before merging",
        "disallow force pushes",
        "disallow deletion",
        "GitHub reviewer approvals may remain off",
        "QA thread discipline still applies",
    ]:
        assert phrase in branch_protection

    for phrase in [
        "# Submilestone",
        "# Branch",
        "# Active Plan",
        "# Scope",
        "# Files Changed",
        "# Product Implementation Status",
        "# Validation Commands Run",
        "# Validation Results",
        "# Skipped Validation And Why",
        "# QA Status",
        "# Forbidden-Scope Checklist",
        "# Handoff Packet Link Or Summary",
        "# Safe-To-Merge Checklist",
        "No product code unless explicitly scoped.",
        "Branch guard used.",
        "Active plan updated.",
        "Registry updated.",
        "Current state updated.",
        "Weekly log updated.",
        "Validation run.",
        "QA run on same branch.",
        "Safe to merge only after QA PASS.",
    ]:
        assert phrase in pr_template


def test_github_issue_templates_exist_and_capture_required_fields():
    templates = {
        "submilestone-task.yml": [
            "Milestone",
            "Submilestone ID",
            "Target branch",
            "Active plan",
            "Builder thread name",
            "Scope",
            "Acceptance criteria",
            "Validation commands",
        ],
        "qa-review.yml": [
            "Audited submilestone",
            "PR link",
            "Branch",
            "QA thread name",
            "Files inspected",
            "Validation commands",
            "Defects found",
            "PASS or FAIL",
        ],
        "blocked-slice.yml": [
            "Blocked submilestone",
            "Branch",
            "Blocker",
            "Attempted validation",
            "Proposed unblock path",
        ],
        "research-spike.yml": [
            "Research question",
            "Scope",
            "Sources to inspect",
            "Expected output",
            "Not-to-implement boundaries",
        ],
        "bug.yml": [
            "Observed behavior",
            "Expected behavior",
            "Affected files",
            "Validation output",
            "Reproduction steps",
        ],
        "config.yml": [
            "blank_issues_enabled: false",
            "Start with active docs",
        ],
    }

    for filename, phrases in templates.items():
        path = ROOT / ".github" / "ISSUE_TEMPLATE" / filename
        assert path.is_file(), filename
        text = path.read_text(encoding="utf-8")
        for phrase in phrases:
            assert phrase in text


def test_milestone_closeout_workflow_and_templates_are_complete():
    workflow = (
        ROOT / "docs" / "ops" / "milestone-closeout-workflow.md"
    ).read_text(encoding="utf-8")
    prompt = (ROOT / "prompts" / "template_milestone_closeout.md").read_text(
        encoding="utf-8"
    )
    template = (
        ROOT / "plans" / "templates" / "milestone-closeout-template.md"
    ).read_text(encoding="utf-8")
    handoff = (ROOT / "prompts" / "template_handoff_packet.md").read_text(
        encoding="utf-8"
    )

    for phrase in [
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
    ]:
        assert phrase in workflow

    for text in [prompt, template]:
        for phrase in [
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
        ]:
            assert phrase in text

    for command in [
        "git branch --show-current",
        "git status --short",
        "git remote -v",
    ]:
        assert command in prompt

    for phrase in [
        "Deferred work",
        "Whether active plan can move to completed if milestone closeout",
        "Whether safe to start next milestone if milestone closeout",
    ]:
        assert phrase in handoff


def test_repo_operating_system_freeze_artifacts_are_complete():
    freeze = (
        ROOT / "docs" / "ops" / "repo-operating-system-freeze.md"
    ).read_text(encoding="utf-8")
    readiness = (
        ROOT / "docs" / "status" / "M00_FREEZE_READINESS.md"
    ).read_text(encoding="utf-8")

    for phrase in [
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
    ]:
        assert phrase in freeze

    for phrase in [
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
    ]:
        assert phrase in readiness


def test_m00_closeout_state_is_coherent():
    registry = (
        ROOT / "docs" / "milestones" / "SUBMILESTONE_REGISTRY.md"
    ).read_text(encoding="utf-8")
    roadmap = (ROOT / "plans" / "ROADMAP.md").read_text(encoding="utf-8")
    closeout = (ROOT / "docs" / "status" / "M00_CLOSEOUT.md").read_text(
        encoding="utf-8"
    )
    current_state = (ROOT / "docs" / "status" / "CURRENT_STATE.md").read_text(
        encoding="utf-8"
    )

    assert not (ROOT / "plans" / "active" / "CLP-0001-m00-repo-operating-system.md").exists()
    assert (
        ROOT / "plans" / "completed" / "CLP-0001-m00-repo-operating-system.md"
    ).is_file()
    active_m01_plan = ROOT / "plans" / "active" / "CLP-0002-m01-domain-model-and-scope-freeze.md"
    assert active_m01_plan.is_file()
    assert [
        path.name
        for path in (ROOT / "plans" / "active").glob("CLP-*.md")
    ] == [active_m01_plan.name]

    for index in range(1, 9):
        submilestone = f"M00.{index:02}"
        row = next(
            line for line in registry.splitlines() if line.startswith(f"| {submilestone} |")
        )
        assert "Completed and merged" in row

    assert "| M00 Repo operating system |" in roadmap
    assert "| 8 | Completed |" in roadmap
    assert "| M01 Domain model and scope freeze |" in roadmap
    assert "| 13 | Active |" in roadmap
    assert "Add v0.1.0 release" not in registry
    assert "Prepare v1.0.0 public release" in registry

    row = next(line for line in registry.splitlines() if line.startswith("| M01.01 |"))
    assert "Completed and merged" in row
    assert "post-merge QA recovery" in row
    assert "m01-01-qa-recovery-define-payment-lifecycle" in row
    assert "1175789" in row

    row = next(line for line in registry.splitlines() if line.startswith("| M01.02 |"))
    assert "Completed and merged" in row
    assert "m01-02-define-ledger-vocabulary" in row
    assert "fd1e259" in row

    row = next(line for line in registry.splitlines() if line.startswith("| M01.03 |"))
    assert "QA passed, awaiting merge" in row
    assert "m01-03-define-settlement-vocabulary" in row
    assert "validate-control-plane passed" in row
    assert "git diff --check passed" in row

    for index in range(4, 14):
        submilestone = f"M01.{index:02}"
        row = next(
            line for line in registry.splitlines() if line.startswith(f"| {submilestone} |")
        )
        assert "Not started" in row

    for milestone in range(2, 22):
        for row in [
            line
            for line in registry.splitlines()
            if line.startswith(f"| M{milestone:02}.")
        ]:
            assert "Not started" in row

    for phrase in [
        "M00 is a control-plane milestone",
        "No product functionality was implemented",
        "No M01 active plan exists",
        "M01 Planning - Domain Model and Scope Freeze",
    ]:
        assert phrase in closeout

    for phrase in [
        "plans/active/CLP-0002-m01-domain-model-and-scope-freeze.md",
        "Product directories contain placeholder README files only",
        "M00.01 through M00.08 are completed and merged",
        "M01.01 Define payment lifecycle is `Completed and merged` after post-merge QA recovery",
        "M01.02 Define ledger vocabulary is `Completed and merged`",
        "M01.03 Define settlement vocabulary is `QA passed, awaiting merge`",
        "M01.04 through M01.13 remain `Not started`",
    ]:
        assert phrase in current_state

    assert not (ROOT / ".github" / "workflows").exists()

    for rel in ["apps", "packages", "scenarios", "data", "infra"]:
        for path in (ROOT / rel).rglob("*"):
            if path.is_file():
                assert path.name == "README.md", path

    env_example = (ROOT / ".env.example").read_text(encoding="utf-8")
    for line in env_example.splitlines():
        if "=" in line:
            assert not line.split("=", 1)[1].strip()


def test_skill_files_exist():
    skills = [
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
    for skill in skills:
        assert (ROOT / ".agents" / "skills" / skill / "SKILL.md").is_file()
