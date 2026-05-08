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
    ]:
        assert (ROOT / rel).is_file(), rel


def test_required_project_docs_exist():
    for rel in [
        "docs/INDEX.md",
        "docs/PROJECT_BRIEF.md",
        "docs/PRODUCT_VISION.md",
        "docs/ARCHITECTURE.md",
        "docs/DOMAIN_MODEL.md",
        "docs/RELIABILITY.md",
        "docs/THREAT_MODEL.md",
        "docs/TOKEN_COST_STRATEGY.md",
        "docs/ops/planning-and-tracking-system.md",
        "docs/milestones/SUBMILESTONE_REGISTRY.md",
        "plans/active/CLP-0001-m00-repo-operating-system.md",
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
