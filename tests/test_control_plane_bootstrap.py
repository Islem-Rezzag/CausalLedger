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
        "docs/evals/ABLATION_STRATEGY.md",
        "docs/evals/ABLATION_MATRIX.md",
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
        "At least one public ablation table",
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
        "M01.08 is `Completed and merged`",
        "M01.09 is `QA passed, awaiting merge`",
        "M01.10 through M01.13 remain planned scope only and are not started",
        "docs/domain/payment-lifecycle.md",
        "docs/domain/ledger-vocabulary.md",
        "docs/domain/settlement-vocabulary.md",
        "docs/domain/reconciliation-vocabulary.md",
        "docs/domain/incident-vocabulary.md",
        "docs/domain/repair-vocabulary.md",
        "docs/domain/evidence-receipt-model.md",
        "docs/domain/human-review-states.md",
        "docs/domain/out-of-scope-domains.md",
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
        "Repair vocabulary",
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
        "docs/domain/reconciliation-vocabulary.md",
        "docs/domain/incident-vocabulary.md",
        "docs/domain/repair-vocabulary.md",
        "docs/domain/evidence-receipt-model.md",
        "docs/domain/human-review-states.md",
        "The domain model is not complete",
        "Ledger vocabulary",
        "Settlement vocabulary",
        "Reconciliation vocabulary",
        "Incident vocabulary",
        "Repair vocabulary",
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


def test_m01_reconciliation_vocabulary_domain_doc_is_documentation_only():
    reconciliation_vocabulary = (
        ROOT / "docs" / "domain" / "reconciliation-vocabulary.md"
    ).read_text(encoding="utf-8")
    domain_readme = (ROOT / "docs" / "domain" / "README.md").read_text(
        encoding="utf-8"
    )
    domain_model = (ROOT / "docs" / "DOMAIN_MODEL.md").read_text(encoding="utf-8")

    for phrase in [
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
        "reconciliation run",
        "reconciliation period",
        "reconciliation window",
        "source record",
        "target record",
        "internal record",
        "external record",
        "expected record",
        "observed record",
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
    ]:
        assert phrase in reconciliation_vocabulary

    for forbidden_claim in [
        "implements MoneyEvent",
        "implements ledger",
        "implements invariants",
        "runtime implementation is complete",
        "schema is defined",
    ]:
        assert forbidden_claim not in reconciliation_vocabulary

    assert "reconciliation-vocabulary.md" in domain_readme
    assert "docs/domain/reconciliation-vocabulary.md" in domain_model


def test_m01_incident_vocabulary_domain_doc_is_documentation_only():
    incident_vocabulary = (
        ROOT / "docs" / "domain" / "incident-vocabulary.md"
    ).read_text(encoding="utf-8")
    domain_readme = (ROOT / "docs" / "domain" / "README.md").read_text(
        encoding="utf-8"
    )
    domain_model = (ROOT / "docs" / "DOMAIN_MODEL.md").read_text(encoding="utf-8")

    for phrase in [
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
        "evidence bundle",
        "suspected root cause",
        "confirmed root cause",
        "confidence",
        "first divergence point",
        "duplicate incident",
        "incident deduplication",
        "incident correlation",
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
    ]:
        assert phrase in incident_vocabulary

    for forbidden_claim in [
        "implements MoneyEvent",
        "implements ledger",
        "implements invariants",
        "runtime implementation is complete",
        "schema is defined",
    ]:
        assert forbidden_claim not in incident_vocabulary

    assert "incident-vocabulary.md" in domain_readme
    assert "docs/domain/incident-vocabulary.md" in domain_model


def test_m01_repair_vocabulary_domain_doc_is_documentation_only():
    repair_vocabulary = (
        ROOT / "docs" / "domain" / "repair-vocabulary.md"
    ).read_text(encoding="utf-8")
    domain_readme = (ROOT / "docs" / "domain" / "README.md").read_text(
        encoding="utf-8"
    )
    domain_model = (ROOT / "docs" / "DOMAIN_MODEL.md").read_text(encoding="utf-8")

    for phrase in [
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
    ]:
        assert phrase in repair_vocabulary

    for forbidden_claim in [
        "implements MoneyEvent",
        "implements ledger",
        "implements invariants",
        "runtime implementation is complete",
        "schema is defined",
        "applies repairs",
        "posts ledger entries",
    ]:
        assert forbidden_claim not in repair_vocabulary

    assert "repair-vocabulary.md" in domain_readme
    assert "docs/domain/repair-vocabulary.md" in domain_model


def test_m01_evidence_receipt_model_domain_doc_is_documentation_only():
    evidence_receipt = (
        ROOT / "docs" / "domain" / "evidence-receipt-model.md"
    ).read_text(encoding="utf-8")
    domain_readme = (ROOT / "docs" / "domain" / "README.md").read_text(
        encoding="utf-8"
    )
    domain_model = (ROOT / "docs" / "DOMAIN_MODEL.md").read_text(encoding="utf-8")

    for phrase in [
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
        "`receipt_observed`",
        "`receipt_received`",
        "`receipt_accepted`",
        "`receipt_limited`",
        "`receipt_conflicted`",
        "`receipt_quarantined`",
        "`receipt_rejected`",
        "`receipt_redacted`",
        "`receipt_bundled`",
        "`receipt_retained`",
        "`receipt_superseded`",
        "raw evidence must not be silently modified",
        "evidence receipts must not become financial truth by themselves",
        "LLM output must not replace source evidence",
        "derived summaries must remain linked to source evidence",
        "conflicting evidence must be surfaced, not hidden",
        "missing evidence must trigger limitation",
        "redaction must protect sensitive data without destroying auditability",
        "evidence mutation or deletion is a destructive action",
        "mutate financial truth",
        "Repair proposals from M01.06 require evidence-backed support",
        "Payment lifecycle vocabulary belongs to M01.01",
        "Ledger vocabulary belongs to M01.02",
        "Settlement vocabulary belongs to M01.03",
        "Reconciliation vocabulary belongs to M01.04",
        "Incident vocabulary belongs to M01.05",
        "Safe and unsafe repair vocabulary belongs to M01.06",
        "Human review states belong to M01.08",
    ]:
        assert phrase in evidence_receipt

    for forbidden_claim in [
        "implements MoneyEvent",
        "implements ledger",
        "implements invariants",
        "runtime implementation is complete",
        "schema is defined",
        "ingests evidence",
        "stores evidence",
        "deletes evidence",
    ]:
        assert forbidden_claim not in evidence_receipt

    assert "evidence-receipt-model.md" in domain_readme
    assert "docs/domain/evidence-receipt-model.md" in domain_model


def test_m01_human_review_states_domain_doc_is_documentation_only():
    human_review = (
        ROOT / "docs" / "domain" / "human-review-states.md"
    ).read_text(encoding="utf-8")
    domain_readme = (ROOT / "docs" / "domain" / "README.md").read_text(
        encoding="utf-8"
    )
    domain_model = (ROOT / "docs" / "DOMAIN_MODEL.md").read_text(encoding="utf-8")

    for phrase in [
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
    ]:
        assert phrase in human_review

    for forbidden_claim in [
        "implements MoneyEvent",
        "implements ledger",
        "implements invariants",
        "runtime implementation is complete",
        "schema is defined",
        "state machine is implemented",
        "approval engine is implemented",
    ]:
        assert forbidden_claim not in human_review

    assert "human-review-states.md" in domain_readme
    assert "docs/domain/human-review-states.md" in domain_model


def test_m01_out_of_scope_domains_doc_is_documentation_only():
    out_of_scope = (
        ROOT / "docs" / "domain" / "out-of-scope-domains.md"
    ).read_text(encoding="utf-8")
    domain_readme = (ROOT / "docs" / "domain" / "README.md").read_text(
        encoding="utf-8"
    )
    domain_model = (ROOT / "docs" / "DOMAIN_MODEL.md").read_text(encoding="utf-8")

    for phrase in [
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
    ]:
        assert phrase in out_of_scope

    for forbidden_claim in [
        "runtime implementation is complete",
        "approval engine is implemented",
        "state machine is implemented",
        "scoring engine is implemented",
        "production write API is implemented",
    ]:
        assert forbidden_claim not in out_of_scope

    assert "out-of-scope-domains.md" in domain_readme
    assert "docs/domain/out-of-scope-domains.md" in domain_model


def test_ablation_planning_docs_are_offline_benchmark_only():
    strategy = (ROOT / "docs" / "evals" / "ABLATION_STRATEGY.md").read_text(
        encoding="utf-8"
    )
    matrix = (ROOT / "docs" / "evals" / "ABLATION_MATRIX.md").read_text(
        encoding="utf-8"
    )
    moneyflowbench = (
        ROOT / "docs" / "evals" / "MONEYFLOWBENCH_SPEC.md"
    ).read_text(encoding="utf-8")
    scoring = (ROOT / "docs" / "evals" / "SCORING_RUBRIC.md").read_text(
        encoding="utf-8"
    )
    repair = (ROOT / "docs" / "evals" / "REPAIR_SAFETY_TESTS.md").read_text(
        encoding="utf-8"
    )
    hallucination = (
        ROOT / "docs" / "evals" / "HALLUCINATION_TESTS.md"
    ).read_text(encoding="utf-8")
    cost = (ROOT / "docs" / "evals" / "COST_BENCHMARKS.md").read_text(
        encoding="utf-8"
    )
    m14 = (ROOT / "docs" / "milestones" / "M14.md").read_text(encoding="utf-8")
    registry = (
        ROOT / "docs" / "milestones" / "SUBMILESTONE_REGISTRY.md"
    ).read_text(encoding="utf-8")

    for phrase in [
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
    ]:
        assert phrase in strategy

    for phrase in [
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
    ]:
        assert phrase in matrix

    for phrase in [
        "## Ablation support",
        "named ablation configurations",
        "Ablations are offline benchmark experiments, not production toggles",
        "does not implement a runner",
    ]:
        assert phrase in moneyflowbench

    for phrase in [
        "Root-cause accuracy by ablation variant",
        "Evidence precision by ablation variant",
        "Evidence recall by ablation variant",
        "Unsafe repair rate by ablation variant",
        "Hallucination rate by ablation variant",
        "Escalation quality by ablation variant",
        "Latency by ablation variant",
        "Token cost by ablation variant",
    ]:
        assert phrase in scoring

    assert "must never disable validators in production" in repair
    assert "no-evidence-ID" in hallucination
    assert "no-critic ablations" in hallucination
    assert "small model" in cost
    assert "strong model" in cost
    assert "model router" in cost
    assert "cached evidence" in cost
    assert "compressed context" in cost

    for phrase in [
        "M14.16 | Add benchmark and ablation runner",
        "M14.23 | Add benchmark and ablation report",
        "M14.24 | QA MoneyFlowBench and ablation suite",
        "ablation reporting",
    ]:
        assert phrase in m14

    m14_rows = [line for line in registry.splitlines() if line.startswith("| M14.")]
    assert len(m14_rows) == 24
    assert "Add benchmark and ablation runner" in registry
    assert "Add benchmark and ablation report" in registry
    assert "QA MoneyFlowBench and ablation suite" in registry


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
    assert "Completed and merged" in row
    assert "m01-03-define-settlement-vocabulary" in row
    assert "e54a917" in row

    row = next(line for line in registry.splitlines() if line.startswith("| M01.04 |"))
    assert "Completed and merged" in row
    assert "m01-04-define-reconciliation-vocabulary" in row
    assert "5dfe928" in row

    row = next(line for line in registry.splitlines() if line.startswith("| M01.05 |"))
    assert "Completed and merged" in row
    assert "m01-05-qa-recovery-incident-vocabulary-ablation-strategy" in row
    assert "post-merge QA recovery" in row
    assert "5c3943b" in row
    assert "#18" in row
    assert "3bdedeb" in row
    assert "validate-control-plane passed" in row
    assert "git diff --check passed" in row

    row = next(line for line in registry.splitlines() if line.startswith("| M01.06 |"))
    assert "Completed and merged" in row
    assert "m01-06-define-safe-and-unsafe-repairs" in row
    assert "#21" in row
    assert "7adc96d" in row
    assert "post-merge finalization passed" in row
    assert "validate-control-plane passed" in row
    assert "pytest 24 passed" in row
    assert "git diff --check passed" in row
    assert "make unavailable" in row
    assert "No product implementation or runtime repair behavior" in row

    row = next(line for line in registry.splitlines() if line.startswith("| M01.07 |"))
    assert "Completed and merged" in row
    assert "m01-07-define-evidence-receipt-model" in row
    assert "#23" in row
    assert "a88b5ff" in row
    assert "0313f4e" in row
    assert "post-merge finalization passed" in row
    assert "validate-control-plane passed" in row
    assert "pytest 25 passed" in row
    assert "git diff --check passed" in row
    assert "make unavailable" in row
    assert "No product implementation or runtime evidence behavior" in row

    row = next(line for line in registry.splitlines() if line.startswith("| M01.08 |"))
    assert "Completed and merged" in row
    assert "m01-08-define-human-review-states" in row
    assert "#26" in row
    assert "1fde07a" in row
    assert "post-merge finalization recorded" in row
    assert "validate-control-plane passed" in row
    assert "pytest 27 passed" in row
    assert "git diff --check passed" in row
    assert "make unavailable" in row
    assert "No product implementation or runtime human-review behavior" in row

    row = next(line for line in registry.splitlines() if line.startswith("| M01.09 |"))
    assert "QA passed, awaiting merge" in row
    assert "m01-09-define-out-of-scope-domains" in row
    assert "validate-control-plane passed" in row
    assert "pytest 27 passed" in row
    assert "git diff --check passed" in row
    assert "make unavailable" in row
    assert "hard out-of-scope domains" in row
    assert "No product implementation or runtime out-of-scope behavior" in row

    for index in range(10, 14):
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
        "M01.03 Define settlement vocabulary is `Completed and merged`",
        "M01.04 Define reconciliation vocabulary is `Completed and merged`",
        "M01.05 Define incident vocabulary is `Completed and merged`",
        "M01.06 Define safe and unsafe repairs is `Completed and merged`",
        "M01.07 Define evidence receipt model is `Completed and merged`",
        "M01.08 Define human review states is `Completed and merged`",
        "M01.09 Define out-of-scope domains is `QA passed, awaiting merge`",
        "M01.10 through M01.13 remain `Not started`",
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
