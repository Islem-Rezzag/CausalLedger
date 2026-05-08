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
    "docs/INDEX.md",
    "docs/ACTIVE_DOCS.md",
    "docs/PROJECT_BRIEF.md",
    "docs/PRODUCT_VISION.md",
    "docs/ARCHITECTURE.md",
    "docs/DOMAIN_MODEL.md",
    "docs/RELIABILITY.md",
    "docs/THREAT_MODEL.md",
    "docs/TOKEN_COST_STRATEGY.md",
    "docs/ops/planning-and-tracking-system.md",
    "docs/status/CURRENT_STATE.md",
    "docs/status/WEEKLY_LOG.md",
    "docs/status/RISK_REGISTER.md",
    "docs/status/TECH_DEBT.md",
    "docs/status/OPEN_QUESTIONS.md",
    "docs/status/CAPABILITY_MATRIX.md",
    "docs/status/NEXT_RECOMMENDED_THREAD.md",
    "docs/milestones/SUBMILESTONE_REGISTRY.md",
    "plans/ROADMAP.md",
    "plans/active/CLP-0001-m00-repo-operating-system.md",
    "plans/templates/execplan-template.md",
    "plans/templates/qa-plan-template.md",
    "plans/templates/milestone-closeout-template.md",
    "prompts/template_builder_submilestone.md",
    "prompts/template_qa_submilestone.md",
    "prompts/template_milestone_closeout.md",
    "prompts/template_security_review.md",
    "prompts/template_handoff_packet.md",
    "tests/test_control_plane_bootstrap.py",
]

REQUIRED_DIRS = [
    "docs",
    "plans",
    "prompts",
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


def missing_paths(paths, kind):
    missing = []
    for rel in paths:
        path = ROOT / rel
        if kind == "file" and not path.is_file():
            missing.append(rel)
        if kind == "dir" and not path.is_dir():
            missing.append(rel)
    return missing


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

    if missing_files or missing_dirs:
        print("Control-plane validation failed.")
        if missing_files:
            print("Missing files:")
            for rel in missing_files:
                print(f"  - {rel}")
        if missing_dirs:
            print("Missing directories:")
            for rel in missing_dirs:
                print(f"  - {rel}")
        raise SystemExit(1)

    print("Control-plane validation passed.")


if __name__ == "__main__":
    main()
