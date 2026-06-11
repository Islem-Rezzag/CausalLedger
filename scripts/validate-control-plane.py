from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]

ALLOWED_STATUSES = {
    "Not started",
    "Builder in progress",
    "Builder complete, awaiting QA",
    "QA passed, awaiting merge",
    "Completed and merged",
    "Blocked",
    "Deferred",
}

REQUIRED_FILES = [
    "README.md",
    "START_HERE.md",
    "AGENTS.md",
    "PLANS.md",
    "WORKFLOW.md",
    "Makefile",
    ".gitignore",
    "CHANGELOG.md",
    "docs/ACTIVE_DOCS.md",
    "docs/INDEX.md",
    "docs/PROJECT_BRIEF.md",
    "docs/PRODUCT_VISION.md",
    "docs/ARCHITECTURE.md",
    "docs/DOMAIN_MODEL.md",
    "docs/RELIABILITY.md",
    "docs/THREAT_MODEL.md",
    "docs/TOKEN_COST_STRATEGY.md",
    "docs/VERSIONING.md",
    "docs/releases/RELEASE_LADDER.md",
    "docs/releases/V1_SCOPE.md",
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
    "docs/status/M01_CLOSEOUT.md",
    "docs/milestones/SUBMILESTONE_REGISTRY.md",
    "docs/milestones/M02.md",
    "docs/decisions/ADR-0005-m02-stack-and-monorepo-direction.md",
    "docs/decisions/ADR-0006-local-dev-and-ci-baseline.md",
    "docs/decisions/ADR-0007-logging-error-handling-and-observability-direction.md",
    "docs/decisions/ADR-0008-identity-money-and-storage.md",
    "plans/ROADMAP.md",
    "plans/active/CLP-0003-m02-monorepo-and-local-development-environment.md",
    "plans/completed/CLP-0001-m00-repo-operating-system.md",
    "plans/completed/CLP-0002-m01-domain-model-and-scope-freeze.md",
    "tests/test_control_plane_bootstrap.py",
    "package.json",
    "pnpm-workspace.yaml",
    "turbo.json",
    "tsconfig.base.json",
    "pnpm-lock.yaml",
    "apps/api/package.json",
    "apps/api/README.md",
    "apps/api/tsconfig.json",
    "apps/api/src/app.ts",
    "apps/api/src/index.ts",
    "apps/api/test/bootstrap.test.ts",
    "apps/web/package.json",
    "apps/web/README.md",
    "apps/web/tsconfig.json",
    "apps/web/tsconfig.node.json",
    "apps/web/vite.config.ts",
    "apps/web/index.html",
    "apps/web/src/App.tsx",
    "apps/web/src/main.tsx",
    "apps/web/src/App.test.tsx",
    "apps/worker/package.json",
    "apps/worker/README.md",
    "apps/worker/tsconfig.json",
    "apps/worker/src/index.ts",
    "apps/worker/test/bootstrap.test.ts",
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

EXPECTED_M02_STATUSES = {
    "M02.01": "Completed and merged",
    "M02.02": "Completed and merged",
    "M02.03": "Completed and merged",
    "M02.04": "Completed and merged",
    "M02.05": "Not started",
    "M02.06": "Not started",
    "M02.07": "Not started",
    "M02.08": "Deferred",
    "M02.09": "Deferred",
    "M02.10": "Deferred",
    "M02.11": "Deferred",
    "M02.12": "Deferred",
    "M02.13": "Deferred",
    "M02.14": "Deferred",
    "M02.15": "Deferred",
    "M02.16": "Deferred",
    "M02.17": "Deferred",
    "M02.18": "Deferred",
    "M02.19": "Deferred",
    "M02.20": "Deferred",
}

FORBIDDEN_APP_TERMS = [
    "MoneyEvent",
    "ledger",
    "invariant",
    "incident",
    "evidence ingestion",
    "replay",
    "repair",
    "queue",
    "scheduler",
    "connector",
    "database",
]


@dataclass(frozen=True)
class RegistryRow:
    submilestone_id: str
    name: str
    milestone: str
    status: str
    active_plan: str
    branch: str
    pr: str
    last_validation: str
    last_updated: str
    notes: str


def read_text(rel: str) -> str:
    return (ROOT / rel).read_text(encoding="utf-8")


def missing_paths(paths: list[str], kind: str) -> list[str]:
    missing: list[str] = []
    for rel in paths:
        path = ROOT / rel
        if kind == "file" and not path.is_file():
            missing.append(rel)
        if kind == "dir" and not path.is_dir():
            missing.append(rel)
    return missing


def parse_registry() -> list[RegistryRow]:
    rows: list[RegistryRow] = []
    registry = read_text("docs/milestones/SUBMILESTONE_REGISTRY.md")
    for line in registry.splitlines():
        if not line.startswith("| M"):
            continue
        cells = [cell.strip() for cell in line.strip().strip("|").split("|")]
        if len(cells) != 10:
            raise ValueError(f"registry row has {len(cells)} cells: {line}")
        rows.append(RegistryRow(*cells))
    return rows


def registry_by_id() -> dict[str, RegistryRow]:
    return {row.submilestone_id: row for row in parse_registry()}


def active_plan_files() -> list[Path]:
    return sorted((ROOT / "plans" / "active").glob("CLP-*.md"))


def validate_required_structure() -> list[str]:
    errors: list[str] = []
    for rel in missing_paths(REQUIRED_FILES, "file"):
        errors.append(f"missing required file: {rel}")
    for rel in missing_paths(REQUIRED_DIRS, "dir"):
        errors.append(f"missing required directory: {rel}")
    if len(active_plan_files()) != 1:
        errors.append("plans/active must contain exactly one CLP-*.md active plan")
    return errors


def validate_registry() -> list[str]:
    errors: list[str] = []
    try:
        rows = parse_registry()
    except ValueError as exc:
        return [str(exc)]

    if not rows:
        return ["registry table did not parse any submilestone rows"]

    seen: set[str] = set()
    for row in rows:
        if row.submilestone_id in seen:
            errors.append(f"duplicate registry ID: {row.submilestone_id}")
        seen.add(row.submilestone_id)
        if row.status not in ALLOWED_STATUSES:
            errors.append(f"{row.submilestone_id} has invalid status: {row.status}")

    by_id = {row.submilestone_id: row for row in rows}
    for submilestone_id, expected_status in EXPECTED_M02_STATUSES.items():
        row = by_id.get(submilestone_id)
        if row is None:
            errors.append(f"{submilestone_id} missing from registry")
        elif row.status != expected_status:
            errors.append(
                f"{submilestone_id} status is {row.status}, expected {expected_status}"
            )

    for milestone in range(3, 22):
        prefix = f"M{milestone:02}."
        for row in rows:
            if row.submilestone_id.startswith(prefix) and row.status != "Not started":
                errors.append(f"{row.submilestone_id} must remain Not started")
    return errors


def validate_status_consistency() -> list[str]:
    errors: list[str] = []
    roadmap = read_text("plans/ROADMAP.md")
    current = read_text("docs/status/CURRENT_STATE.md")
    m02 = read_text("docs/milestones/M02.md")
    next_thread = read_text("docs/status/NEXT_RECOMMENDED_THREAD.md")

    expected_phrases = [
        "M02.01 through M02.04 are `Completed and merged`",
        "M02.05 through M02.07 remain `Not started`",
        "M03 through M21 remain `Not started`",
        "Product implementation has not started",
    ]
    for rel, text in [
        ("plans/ROADMAP.md", roadmap),
        ("docs/status/CURRENT_STATE.md", current),
        ("docs/milestones/M02.md", m02),
    ]:
        for phrase in expected_phrases:
            if phrase not in text:
                errors.append(f"{rel} missing status phrase: {phrase}")

    if (
        "M02 process amendment QA - tracking fixes, process diet, validator cleanup, and ADR-0008"
        not in next_thread
    ):
        errors.append("NEXT_RECOMMENDED_THREAD.md does not point to process amendment QA")
    if "M02.05 Builder - package scaffolds + ESLint + CI baseline" not in next_thread:
        errors.append("NEXT_RECOMMENDED_THREAD.md does not name M02.05 as next after merge")
    if len(current.splitlines()) > 80:
        errors.append("CURRENT_STATE.md exceeds the 80 line cap")
    return errors


def validate_docs() -> list[str]:
    errors: list[str] = []
    domain_model = read_text("docs/DOMAIN_MODEL.md")
    if "M02.01 through M02.20 remain `Not started`" in domain_model:
        errors.append("DOMAIN_MODEL.md hardcodes stale live M02 status")
    if "Live milestone progress is tracked in `plans/ROADMAP.md`" not in domain_model:
        errors.append("DOMAIN_MODEL.md does not redirect live milestone progress")

    current = read_text("docs/status/CURRENT_STATE.md")
    for phrase in [
        'Current "lint" validation before the real ESLint baseline means TypeScript no-emit or script-level validation',
        "The 32 Python tests are control-plane/doc-coherence tests",
    ]:
        if phrase not in current:
            errors.append(f"CURRENT_STATE.md missing terminology note: {phrase}")

    changelog = read_text("CHANGELOG.md")
    for phrase in [
        "Completed M02.01 stack ADRs",
        "Completed M02.02 minimal non-domain `apps/api`",
        "Completed M02.03 minimal non-domain `apps/web`",
        "Completed M02.04 minimal non-domain `apps/worker`",
        "ADR-0008 identity, money, and storage direction",
    ]:
        if phrase not in changelog:
            errors.append(f"CHANGELOG.md missing M02 entry: {phrase}")

    gitignore = read_text(".gitignore")
    for phrase in ["reports/*.pdf", "reports/*.xlsx"]:
        if phrase not in gitignore:
            errors.append(f".gitignore missing {phrase}")

    for rel in ["docs/ACTIVE_DOCS.md", "docs/INDEX.md"]:
        if "docs/decisions/ADR-0008-identity-money-and-storage.md" not in read_text(rel):
            errors.append(f"{rel} does not index ADR-0008")
    return errors


def validate_no_secrets() -> list[str]:
    env_example = ROOT / ".env.example"
    if not env_example.exists():
        return []
    populated = [
        line
        for line in env_example.read_text(encoding="utf-8").splitlines()
        if "=" in line and line.split("=", 1)[1].strip()
    ]
    if populated:
        return [".env.example contains populated values before secrets handling exists"]
    return []


def validate_forbidden_paths() -> list[str]:
    errors: list[str] = []
    if (ROOT / ".github" / "workflows").exists():
        errors.append(".github/workflows exists before CI is authorized in this amendment")

    for package_dir in (ROOT / "packages").iterdir():
        if not package_dir.is_dir():
            continue
        for path in package_dir.rglob("*"):
            if path.is_file() and path.name != "README.md":
                errors.append(f"packages placeholder contains non-README file: {path.relative_to(ROOT).as_posix()}")
    return errors


def validate_app_scaffolds() -> list[str]:
    errors: list[str] = []
    api_source = read_text("apps/api/src/app.ts")
    if ".get(" in api_source or ".post(" in api_source or ".route(" in api_source:
        errors.append("apps/api registers routes before domain API scope")

    web_source = read_text("apps/web/src/App.tsx")
    for term in ["MoneyEvent", "ledger", "incident", "evidence", "repair"]:
        if term in web_source:
            errors.append(f"apps/web contains product UI term: {term}")

    worker_source = read_text("apps/worker/src/index.ts")
    if "jobs: []" not in worker_source:
        errors.append("apps/worker no longer has an empty jobs list")
    for term in FORBIDDEN_APP_TERMS:
        if term.lower() in worker_source.lower() and term not in {"queue", "scheduler"}:
            errors.append(f"apps/worker contains forbidden domain term: {term}")
    return errors


def validate_adr_0008() -> list[str]:
    errors: list[str] = []
    adr = read_text("docs/decisions/ADR-0008-identity-money-and-storage.md")
    for phrase in [
        "## Status",
        "Accepted.",
        "Use prefixed ULIDs",
        "`rcpt_`",
        "`evt_`",
        "`txn_`",
        "`inc_`",
        "`rpl_`",
        "`run_`",
        "`prop_`",
        "`rev_`",
        "`bndl_`",
        "`request_id` is generated at the API edge",
        "`correlation_id` is propagated to worker jobs",
        "Money is stored as integer minor units",
        "Currencies use ISO 4217 currency codes",
        "Floats are forbidden for money",
        "Postgres is the planned system of record",
        "Raw evidence bytes are stored write-once, keyed by SHA-256 content hash",
        "Evidence receipts store hash and locator, not raw payload bodies",
        "No database implementation",
        "No ID library implementation",
        "No storage implementation",
        "No evidence runtime",
    ]:
        if phrase not in adr:
            errors.append(f"ADR-0008 missing phrase: {phrase}")
    return errors


def validate() -> list[str]:
    errors: list[str] = []
    errors.extend(validate_required_structure())
    errors.extend(validate_registry())
    errors.extend(validate_status_consistency())
    errors.extend(validate_docs())
    errors.extend(validate_no_secrets())
    errors.extend(validate_forbidden_paths())
    errors.extend(validate_app_scaffolds())
    errors.extend(validate_adr_0008())
    return errors


def main() -> None:
    errors = validate()
    if errors:
        print("Control-plane validation failed.")
        for error in errors:
            print(f"  - {error}")
        raise SystemExit(1)
    print("Control-plane validation passed.")


if __name__ == "__main__":
    main()
