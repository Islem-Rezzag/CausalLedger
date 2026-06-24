from __future__ import annotations

import json
import re
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

M02_05_PACKAGE_DIRS = [
    "core",
    "events",
    "ledger",
    "invariants",
    "incidents",
    "graph",
    "replay",
    "repair",
    "evidence",
    "evals",
]

APPROVED_PACKAGE_SCAFFOLD_FILES = [
    "README.md",
    "package.json",
    "tsconfig.json",
    "tsconfig.test.json",
    "src/index.ts",
    "test/bootstrap.test.ts",
]

PACKAGE_SCRIPT_NAMES = ["build", "typecheck", "typecheck:test", "test", "lint", "format:check"]

GENERATED_PACKAGE_DIR_NAMES = {"node_modules", "dist", ".turbo", "coverage"}

REQUIRED_LOCAL_ENV_KEYS = [
    "DATABASE_URL",
    "CAUSALLEDGER_POSTGRES_DB",
    "CAUSALLEDGER_POSTGRES_USER",
    "CAUSALLEDGER_POSTGRES_PASSWORD",
    "CAUSALLEDGER_POSTGRES_HOST",
    "CAUSALLEDGER_POSTGRES_PORT",
]

REQUIRED_INFRA_SCRIPTS = {
    "infra:up": "docker compose up -d postgres",
    "infra:down": "docker compose down",
    "infra:reset": "docker compose down -v",
    "migrate:up": "node-pg-migrate up --migrations-dir infra/migrations --ignore-pattern README.md --database-url-var DATABASE_URL",
    "migrate:down": "node-pg-migrate down --migrations-dir infra/migrations --ignore-pattern README.md --database-url-var DATABASE_URL",
}

REQUIRED_FILES = [
    "README.md",
    "START_HERE.md",
    "AGENTS.md",
    "PLANS.md",
    "WORKFLOW.md",
    "Makefile",
    ".gitignore",
    ".env.example",
    "docker-compose.yml",
    "CHANGELOG.md",
    "requirements-dev.txt",
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
    "docs/ops/qa-development-environment.md",
    "plans/ROADMAP.md",
    "plans/active/CLP-0003-m02-monorepo-and-local-development-environment.md",
    "plans/completed/CLP-0001-m00-repo-operating-system.md",
    "plans/completed/CLP-0002-m01-domain-model-and-scope-freeze.md",
    "scripts/qa-dev-environment.py",
    "tests/test_control_plane_bootstrap.py",
    "eslint.config.js",
    ".github/workflows/ci.yml",
    "package.json",
    "pnpm-workspace.yaml",
    "turbo.json",
    "tsconfig.base.json",
    "pnpm-lock.yaml",
    "infra/README.md",
    "infra/docker/README.md",
    "infra/migrations/README.md",
    "apps/api/package.json",
    "apps/api/README.md",
    "apps/api/tsconfig.json",
    "apps/api/tsconfig.test.json",
    "apps/api/src/app.ts",
    "apps/api/src/index.ts",
    "apps/api/test/bootstrap.test.ts",
    "apps/web/package.json",
    "apps/web/README.md",
    "apps/web/tsconfig.json",
    "apps/web/tsconfig.node.json",
    "apps/web/tsconfig.test.json",
    "apps/web/vite.config.ts",
    "apps/web/index.html",
    "apps/web/src/App.tsx",
    "apps/web/src/main.tsx",
    "apps/web/src/App.test.tsx",
    "apps/worker/package.json",
    "apps/worker/README.md",
    "apps/worker/tsconfig.json",
    "apps/worker/tsconfig.test.json",
    "apps/worker/src/index.ts",
    "apps/worker/test/bootstrap.test.ts",
    *[
        f"packages/{package_dir}/{file_name}"
        for package_dir in M02_05_PACKAGE_DIRS
        for file_name in APPROVED_PACKAGE_SCAFFOLD_FILES
    ],
]

REQUIRED_DIRS = [
    "docs",
    "plans",
    "prompts",
    ".github",
    ".github/ISSUE_TEMPLATE",
    ".github/workflows",
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
    "packages/core/src",
    "packages/core/test",
    "packages/events",
    "packages/events/src",
    "packages/events/test",
    "packages/ledger",
    "packages/ledger/src",
    "packages/ledger/test",
    "packages/invariants",
    "packages/invariants/src",
    "packages/invariants/test",
    "packages/incidents",
    "packages/incidents/src",
    "packages/incidents/test",
    "packages/graph",
    "packages/graph/src",
    "packages/graph/test",
    "packages/replay",
    "packages/replay/src",
    "packages/replay/test",
    "packages/repair",
    "packages/repair/src",
    "packages/repair/test",
    "packages/evidence",
    "packages/evidence/src",
    "packages/evidence/test",
    "packages/connectors",
    "packages/evals",
    "packages/evals/src",
    "packages/evals/test",
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

REGISTRY_COLUMNS = [
    "ID",
    "Name",
    "Milestone",
    "Status",
    "Active Plan",
    "Branch",
    "PR",
    "Last Validation",
    "Last Updated",
    "Notes",
]

MILESTONE_COLUMNS = ["ID", "Name", "Status", "Notes"]

ROADMAP_COLUMNS = [
    "Milestone",
    "Goal",
    "Focus",
    "Exit criteria",
    "Submilestone count",
    "Status",
]

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

FORBIDDEN_PACKAGE_SOURCE_PATTERNS = [
    (re.compile(r"\b(?:type|interface|class)\s+MoneyEvent\b"), "MoneyEvent schema"),
    (re.compile(r"\bMoneyEventSchema\b|\bz\.object\s*\("), "runtime schema implementation"),
    (re.compile(r"\b(?:ledgerEntry|ledgerEntries|balance|balances)\b"), "ledger entries or balances"),
    (re.compile(r"\b(?:InvariantCheck|InvariantResult|financialInvariant)\b"), "financial invariant implementation"),
    (re.compile(r"\b(?:IncidentState|IncidentStatus|incidentStateMachine)\b"), "incident lifecycle implementation"),
    (re.compile(r"\b(?:GraphNode|GraphEdge|graphTraversal|traverseGraph)\b"), "graph traversal implementation"),
    (re.compile(r"\b(?:ReplaySession|replayAlgorithm|runReplay)\b"), "replay algorithm implementation"),
    (re.compile(r"\b(?:RepairPlan|RepairProposal|approveRepair|applyRepair)\b"), "repair logic implementation"),
    (re.compile(r"\b(?:EvidenceStore|EvidenceBundle|storeEvidence)\b"), "evidence storage implementation"),
    (re.compile(r"\b(?:BenchmarkScenario|benchmarkRunner|scoreBenchmark)\b"), "benchmark implementation"),
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


@dataclass(frozen=True)
class MilestoneSubmilestoneRow:
    submilestone_id: str
    name: str
    status: str
    notes: str


@dataclass(frozen=True)
class RoadmapRow:
    milestone: str
    goal: str
    focus: str
    exit_criteria: str
    submilestone_count: str
    status: str


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


def split_markdown_row(line: str) -> list[str]:
    return [cell.strip() for cell in line.strip().strip("|").split("|")]


def is_table_divider(line: str) -> bool:
    cells = split_markdown_row(line)
    return bool(cells) and all(cell and set(cell) <= {"-", ":"} for cell in cells)


def parse_markdown_table(text: str, required_columns: list[str]) -> list[dict[str, str]]:
    lines = text.splitlines()
    for index, line in enumerate(lines):
        if not line.strip().startswith("|"):
            continue
        headers = split_markdown_row(line)
        if not all(column in headers for column in required_columns):
            continue
        if index + 1 >= len(lines) or not is_table_divider(lines[index + 1]):
            continue

        rows: list[dict[str, str]] = []
        for row_line in lines[index + 2 :]:
            if not row_line.strip().startswith("|"):
                break
            if is_table_divider(row_line):
                continue
            cells = split_markdown_row(row_line)
            if len(cells) != len(headers):
                raise ValueError(
                    f"markdown table row has {len(cells)} cells, expected {len(headers)}: {row_line}"
                )
            rows.append(dict(zip(headers, cells)))
        return rows
    raise ValueError(f"markdown table not found with columns: {', '.join(required_columns)}")


def parse_registry_table(text: str) -> list[RegistryRow]:
    rows: list[RegistryRow] = []
    for row in parse_markdown_table(text, REGISTRY_COLUMNS):
        submilestone_id = row["ID"]
        if not submilestone_id.startswith("M"):
            continue
        rows.append(
            RegistryRow(
                submilestone_id=submilestone_id,
                name=row["Name"],
                milestone=row["Milestone"],
                status=row["Status"],
                active_plan=row["Active Plan"],
                branch=row["Branch"],
                pr=row["PR"],
                last_validation=row["Last Validation"],
                last_updated=row["Last Updated"],
                notes=row["Notes"],
            )
        )
    return rows


def parse_registry() -> list[RegistryRow]:
    return parse_registry_table(read_text("docs/milestones/SUBMILESTONE_REGISTRY.md"))


def registry_by_id() -> dict[str, RegistryRow]:
    return {row.submilestone_id: row for row in parse_registry()}


def parse_milestone_submilestone_table(text: str) -> list[MilestoneSubmilestoneRow]:
    rows: list[MilestoneSubmilestoneRow] = []
    for row in parse_markdown_table(text, MILESTONE_COLUMNS):
        submilestone_id = row["ID"]
        if not submilestone_id.startswith("M"):
            continue
        rows.append(
            MilestoneSubmilestoneRow(
                submilestone_id=submilestone_id,
                name=row["Name"],
                status=row["Status"],
                notes=row["Notes"],
            )
        )
    return rows


def parse_roadmap_table(text: str) -> list[RoadmapRow]:
    rows: list[RoadmapRow] = []
    for row in parse_markdown_table(text, ROADMAP_COLUMNS):
        rows.append(
            RoadmapRow(
                milestone=row["Milestone"],
                goal=row["Goal"],
                focus=row["Focus"],
                exit_criteria=row["Exit criteria"],
                submilestone_count=row["Submilestone count"],
                status=row["Status"],
            )
        )
    return rows


def markdown_sections(text: str) -> dict[str, str]:
    sections: dict[str, list[str]] = {}
    current_heading: str | None = None
    for line in text.splitlines():
        if line.startswith("## "):
            current_heading = line[3:].strip().lower()
            sections[current_heading] = []
            continue
        if current_heading is not None:
            sections[current_heading].append(line)
    return {heading: "\n".join(lines).strip() for heading, lines in sections.items()}


def labeled_value(text: str, label: str) -> str | None:
    normalized_label = label.lower()
    lines = text.splitlines()
    for index, line in enumerate(lines):
        stripped = line.strip()
        lower = stripped.lower()
        if lower.startswith(f"{normalized_label}:"):
            value = stripped.split(":", 1)[1].strip()
            if value:
                return value.strip("` ")
            for next_line in lines[index + 1 :]:
                value = next_line.strip()
                if value:
                    return value.strip("` ")
    return None


def active_plan_files() -> list[Path]:
    return sorted((ROOT / "plans" / "active").glob("CLP-*.md"))


def validate_active_plan_count() -> list[str]:
    if len(active_plan_files()) != 1:
        return ["plans/active must contain exactly one CLP-*.md active plan"]
    return []


def validate_required_structure() -> list[str]:
    errors: list[str] = []
    for rel in missing_paths(REQUIRED_FILES, "file"):
        errors.append(f"missing required file: {rel}")
    for rel in missing_paths(REQUIRED_DIRS, "dir"):
        errors.append(f"missing required directory: {rel}")
    errors.extend(validate_active_plan_count())
    return errors


def validate_registry_rows(rows: list[RegistryRow]) -> list[str]:
    errors: list[str] = []
    if not rows:
        return ["registry table did not parse any submilestone rows"]

    seen: set[str] = set()
    for row in rows:
        if row.submilestone_id in seen:
            errors.append(f"duplicate registry ID: {row.submilestone_id}")
        seen.add(row.submilestone_id)
        if row.status not in ALLOWED_STATUSES:
            errors.append(f"{row.submilestone_id} has invalid status: {row.status}")
    return errors


def validate_registry() -> list[str]:
    try:
        rows = parse_registry()
    except ValueError as exc:
        return [str(exc)]
    return validate_registry_rows(rows)


def validate_m02_milestone_consistency(
    registry_rows: list[RegistryRow], m02_text: str
) -> list[str]:
    errors: list[str] = []
    by_id = {row.submilestone_id: row for row in registry_rows}
    try:
        milestone_rows = parse_milestone_submilestone_table(m02_text)
    except ValueError as exc:
        return [f"docs/milestones/M02.md {exc}"]

    if not milestone_rows:
        return ["docs/milestones/M02.md did not parse any submilestone rows"]

    seen: set[str] = set()
    for row in milestone_rows:
        if row.submilestone_id in seen:
            errors.append(f"docs/milestones/M02.md duplicate ID: {row.submilestone_id}")
        seen.add(row.submilestone_id)
        if not row.submilestone_id.startswith("M02."):
            errors.append(f"docs/milestones/M02.md contains non-M02 row: {row.submilestone_id}")
            continue
        registry_row = by_id.get(row.submilestone_id)
        if registry_row is None:
            errors.append(f"docs/milestones/M02.md row missing from registry: {row.submilestone_id}")
            continue
        if row.status != registry_row.status:
            errors.append(
                f"docs/milestones/M02.md {row.submilestone_id} status is {row.status}, "
                f"registry says {registry_row.status}"
            )
    return errors


def milestone_id_from_submilestone(submilestone_id: str) -> str:
    return submilestone_id.split(".", 1)[0]


def milestone_id_from_roadmap(row: RoadmapRow) -> str:
    return row.milestone.split(" ", 1)[0]


def expected_roadmap_status(statuses: list[str]) -> str:
    if statuses and all(status == "Completed and merged" for status in statuses):
        return "Completed"
    if statuses and all(status == "Not started" for status in statuses):
        return "Not started"
    return "In progress"


def validate_roadmap_consistency(
    registry_rows: list[RegistryRow], roadmap_text: str
) -> list[str]:
    errors: list[str] = []
    try:
        roadmap_rows = parse_roadmap_table(roadmap_text)
    except ValueError as exc:
        return [f"plans/ROADMAP.md {exc}"]

    registry_by_milestone: dict[str, list[RegistryRow]] = {}
    for row in registry_rows:
        registry_by_milestone.setdefault(
            milestone_id_from_submilestone(row.submilestone_id), []
        ).append(row)

    roadmap_seen: set[str] = set()
    for row in roadmap_rows:
        milestone_id = milestone_id_from_roadmap(row)
        if not milestone_id.startswith("M"):
            continue
        roadmap_seen.add(milestone_id)
        registry_milestone_rows = registry_by_milestone.get(milestone_id)
        if not registry_milestone_rows:
            errors.append(f"plans/ROADMAP.md has milestone missing from registry: {milestone_id}")
            continue
        try:
            roadmap_count = int(row.submilestone_count)
        except ValueError:
            errors.append(
                f"plans/ROADMAP.md {milestone_id} has non-numeric submilestone count: {row.submilestone_count}"
            )
            continue
        if roadmap_count != len(registry_milestone_rows):
            errors.append(
                f"plans/ROADMAP.md {milestone_id} count is {roadmap_count}, "
                f"registry has {len(registry_milestone_rows)}"
            )
        expected_status = expected_roadmap_status(
            [registry_row.status for registry_row in registry_milestone_rows]
        )
        if row.status != expected_status:
            errors.append(
                f"plans/ROADMAP.md {milestone_id} status is {row.status}, "
                f"registry implies {expected_status}"
            )

    for milestone_id in sorted(registry_by_milestone):
        if milestone_id not in roadmap_seen:
            errors.append(f"registry milestone missing from plans/ROADMAP.md: {milestone_id}")
    return errors


def validate_current_state_structure(current: str) -> list[str]:
    errors: list[str] = []
    sections = markdown_sections(current)
    for heading in [
        "current phase",
        "current submilestone and branch",
        "next action",
        "product implementation status",
    ]:
        if not sections.get(heading):
            errors.append(f"CURRENT_STATE.md missing or empty section: {heading}")

    current_slice = labeled_value(current, "Current slice")
    if not current_slice:
        errors.append("CURRENT_STATE.md missing labeled current slice")
    current_branch = labeled_value(current, "Current branch")
    if not current_branch:
        errors.append("CURRENT_STATE.md missing labeled current branch")

    product_status = sections.get("product implementation status", "").lower()
    if "not started" not in product_status:
        errors.append("CURRENT_STATE.md product implementation status must say not started")

    if len(current.splitlines()) > 80:
        errors.append("CURRENT_STATE.md exceeds the 80 line cap")
    return errors


def validate_next_thread_structure(next_thread: str) -> list[str]:
    errors: list[str] = []
    for label in ["Thread name", "Precondition", "Next after merge"]:
        if not labeled_value(next_thread, label):
            errors.append(f"NEXT_RECOMMENDED_THREAD.md missing labeled {label.lower()}")
    return errors


def validate_status_consistency() -> list[str]:
    errors: list[str] = []
    try:
        registry_rows = parse_registry()
    except ValueError as exc:
        return [str(exc)]

    errors.extend(
        validate_m02_milestone_consistency(
            registry_rows, read_text("docs/milestones/M02.md")
        )
    )
    errors.extend(validate_roadmap_consistency(registry_rows, read_text("plans/ROADMAP.md")))
    errors.extend(validate_current_state_structure(read_text("docs/status/CURRENT_STATE.md")))
    errors.extend(
        validate_next_thread_structure(read_text("docs/status/NEXT_RECOMMENDED_THREAD.md"))
    )
    return errors


def validate_docs() -> list[str]:
    errors: list[str] = []
    domain_model = read_text("docs/DOMAIN_MODEL.md")
    if "M02.01 through M02.20 remain `Not started`" in domain_model:
        errors.append("DOMAIN_MODEL.md hardcodes stale live M02 status")
    if "Live milestone progress" not in domain_model or "plans/ROADMAP.md" not in domain_model:
        errors.append("DOMAIN_MODEL.md does not redirect live milestone progress")

    changelog = read_text("CHANGELOG.md")
    for phrase in [
        "Completed M02.01 stack ADRs",
        "Completed M02.02 minimal non-domain `apps/api`",
        "Completed M02.03 minimal non-domain `apps/web`",
        "Completed M02.04 minimal non-domain `apps/worker`",
        "Completed and merged M02.05 package scaffolds, ESLint baseline, CI baseline, test typecheck coverage, and explicit Python CI dependencies",
        "Completed and merged M02.06 local-only Docker Compose/Postgres, migration tooling, env placeholders, infrastructure readiness stubs, and remote infrastructure smoke validation",
        "M02.07 Builder created a repeatable QA development environment",
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


def validate_env_example_keys() -> list[str]:
    env_example = read_text(".env.example")
    errors: list[str] = []
    for key in REQUIRED_LOCAL_ENV_KEYS:
        if not re.search(rf"(?m)^{re.escape(key)}=", env_example):
            errors.append(f".env.example missing local infra key: {key}")
    return errors


def validate_python_dev_requirements() -> list[str]:
    requirements = read_text("requirements-dev.txt")
    if not re.search(r"(?m)^pytest(?:[<>=~!].*)?$", requirements):
        return ["requirements-dev.txt must declare pytest for CI control-plane tests"]
    return []


def path_has_generated_part(path: Path, root: Path) -> bool:
    return any(part in GENERATED_PACKAGE_DIR_NAMES for part in path.relative_to(root).parts)


def package_files(package_dir: Path) -> set[str]:
    files: set[str] = set()
    for path in package_dir.rglob("*"):
        if path_has_generated_part(path, package_dir):
            continue
        if path.is_file():
            files.add(path.relative_to(package_dir).as_posix())
    return files


def validate_github_workflows() -> list[str]:
    errors: list[str] = []
    workflow_dir = ROOT / ".github" / "workflows"
    if not workflow_dir.exists():
        return [".github/workflows must exist for the M02.05 CI baseline"]
    child_dirs = sorted(path.name for path in workflow_dir.iterdir() if path.is_dir())
    child_files = sorted(path.name for path in workflow_dir.iterdir() if path.is_file())
    if child_dirs:
        errors.append(f".github/workflows contains unexpected directories: {', '.join(child_dirs)}")
    if child_files != ["ci.yml"]:
        errors.append(".github/workflows may contain exactly ci.yml")
    workflow = read_text(".github/workflows/ci.yml") if (workflow_dir / "ci.yml").exists() else None
    if workflow is not None and "python -m pip install -r requirements-dev.txt" not in workflow:
        errors.append(".github/workflows/ci.yml must install Python dev dependencies")
    if workflow is not None:
        for phrase in [
            "infra-smoke:",
            "docker compose config",
            "docker compose up -d postgres",
            "DATABASE_URL: postgres://causalledger:causalledger_local_password@127.0.0.1:5432/causalledger_dev",
            "pnpm migrate:up",
            "docker compose exec -T postgres psql",
            "docker compose down -v",
            "if: always()",
        ]:
            if phrase not in workflow:
                errors.append(f".github/workflows/ci.yml missing infra-smoke coverage: {phrase}")
    return errors


def validate_package_manifest(package_dir: str) -> list[str]:
    errors: list[str] = []
    rel = f"packages/{package_dir}"
    manifest = json.loads(read_text(f"{rel}/package.json"))
    expected_name = f"@causalledger/{package_dir}"
    if manifest.get("name") != expected_name:
        errors.append(f"{rel}/package.json name must be {expected_name}")
    if manifest.get("private") is not True:
        errors.append(f"{rel}/package.json must be private")
    scripts = manifest.get("scripts", {})
    for script_name in PACKAGE_SCRIPT_NAMES:
        if script_name not in scripts:
            errors.append(f"{rel}/package.json missing {script_name} script")
    if scripts.get("lint") != "eslint . --max-warnings=0":
        errors.append(f"{rel}/package.json lint script must run real ESLint")
    return errors


def validate_package_tsconfig(package_dir: str) -> list[str]:
    errors: list[str] = []
    rel = f"packages/{package_dir}"
    tsconfig = json.loads(read_text(f"{rel}/tsconfig.json"))
    if tsconfig.get("extends") != "../../tsconfig.base.json":
        errors.append(f"{rel}/tsconfig.json must extend ../../tsconfig.base.json")
    test_tsconfig = json.loads(read_text(f"{rel}/tsconfig.test.json"))
    if test_tsconfig.get("extends") != "./tsconfig.json":
        errors.append(f"{rel}/tsconfig.test.json must extend ./tsconfig.json")
    if "test/**/*.ts" not in test_tsconfig.get("include", []):
        errors.append(f"{rel}/tsconfig.test.json must include test files")
    return errors


def validate_package_sources(package_dir: str) -> list[str]:
    errors: list[str] = []
    source_path = ROOT / "packages" / package_dir / "src" / "index.ts"
    source = source_path.read_text(encoding="utf-8")
    for pattern, description in FORBIDDEN_PACKAGE_SOURCE_PATTERNS:
        if pattern.search(source):
            errors.append(f"{source_path.relative_to(ROOT).as_posix()} contains {description}")
    return errors


def validate_package_scaffolds() -> list[str]:
    errors: list[str] = []
    expected_files = set(APPROVED_PACKAGE_SCAFFOLD_FILES)

    packages_root = ROOT / "packages"
    if not packages_root.exists():
        return errors
    for package_dir in packages_root.iterdir():
        if not package_dir.is_dir():
            continue
        files = package_files(package_dir)
        if package_dir.name not in M02_05_PACKAGE_DIRS:
            if files != {"README.md"}:
                unexpected = sorted(files - {"README.md"})
                errors.append(
                    f"deferred package directory contains non-README files: "
                    f"{package_dir.relative_to(ROOT).as_posix()} -> {', '.join(unexpected)}"
                )
            continue
        if files != expected_files:
            missing = sorted(expected_files - files)
            extra = sorted(files - expected_files)
            if missing:
                errors.append(
                    f"package scaffold missing files: {package_dir.relative_to(ROOT).as_posix()} -> "
                    f"{', '.join(missing)}"
                )
            if extra:
                errors.append(
                    f"package scaffold contains unexpected files: {package_dir.relative_to(ROOT).as_posix()} -> "
                    f"{', '.join(extra)}"
                )
        errors.extend(validate_package_manifest(package_dir.name))
        errors.extend(validate_package_tsconfig(package_dir.name))
        errors.extend(validate_package_sources(package_dir.name))
    return errors


def validate_forbidden_paths() -> list[str]:
    errors: list[str] = []
    errors.extend(validate_github_workflows())
    errors.extend(validate_package_scaffolds())
    return errors


def validate_root_infra_scripts() -> list[str]:
    errors: list[str] = []
    manifest = json.loads(read_text("package.json"))
    scripts = manifest.get("scripts", {})
    for script_name, expected_command in REQUIRED_INFRA_SCRIPTS.items():
        if scripts.get(script_name) != expected_command:
            errors.append(f"package.json {script_name} script must be `{expected_command}`")
    dev_dependencies = manifest.get("devDependencies", {})
    if "node-pg-migrate" not in dev_dependencies:
        errors.append("package.json must include node-pg-migrate as a dev dependency")
    return errors


def validate_qa_development_environment() -> list[str]:
    errors: list[str] = []
    manifest = json.loads(read_text("package.json"))
    scripts = manifest.get("scripts", {})
    if scripts.get("qa:dev") != "python scripts/qa-dev-environment.py":
        errors.append("package.json qa:dev script must run scripts/qa-dev-environment.py")

    script = read_text("scripts/qa-dev-environment.py")
    for phrase in [
        "PASS",
        "FAIL",
        "SKIPPED",
        "--with-docker",
        "pnpm",
        "install",
        "--frozen-lockfile",
        "typecheck",
        "lint",
        "test",
        "build",
        "format:check",
        "validate-control-plane.py",
        "test_control_plane_bootstrap.py",
        "git",
        "diff",
        "--check",
        "docker",
        "compose",
        "down",
        "-v",
        "finally:",
        "not requested; run with --with-docker",
    ]:
        if phrase not in script:
            errors.append(f"scripts/qa-dev-environment.py missing QA coverage: {phrase}")

    guide = read_text("docs/ops/qa-development-environment.md")
    for phrase in [
        "pnpm qa:dev",
        "--with-docker",
        "PASS",
        "FAIL",
        "SKIPPED",
        "does not validate CausalLedger product behavior",
        "No product/domain behavior is implemented or validated",
        "GitHub Actions `infra-smoke`",
    ]:
        if phrase not in guide:
            errors.append(f"docs/ops/qa-development-environment.md missing guidance: {phrase}")
    return errors


def validate_compose_postgres() -> list[str]:
    errors: list[str] = []
    compose = read_text("docker-compose.yml")
    if not re.search(r"(?m)^\s{2}postgres:\s*$", compose):
        errors.append("docker-compose.yml must define a postgres service")
    if not re.search(r"(?m)^\s*image:\s*postgres:", compose):
        errors.append("docker-compose.yml postgres service must use a postgres image")
    if "127.0.0.1" not in compose:
        errors.append("docker-compose.yml must bind Postgres to 127.0.0.1 by default")
    if "POSTGRES_PASSWORD" not in compose:
        errors.append("docker-compose.yml must define a local placeholder Postgres password")
    if "causalledger_local_password" not in compose:
        errors.append("docker-compose.yml must use an explicit local-only placeholder password")
    if "pg_isready" not in compose:
        errors.append("docker-compose.yml must include a Postgres healthcheck")
    if re.search(r"(?m)^\s*container_name\s*:", compose):
        errors.append("docker-compose.yml must not set a fixed container_name for local Postgres")

    forbidden_terms = ["redis", "queue", "scheduler", "deploy"]
    lower_compose = compose.lower()
    for term in forbidden_terms:
        if re.search(rf"\b{re.escape(term)}\b", lower_compose):
            errors.append(f"docker-compose.yml must not define {term} behavior in M02.06")
    return errors


def validate_migration_directory() -> list[str]:
    migration_dir = ROOT / "infra" / "migrations"
    files = sorted(
        path.relative_to(migration_dir).as_posix()
        for path in migration_dir.rglob("*")
        if path.is_file()
    )
    extra_files = [file_name for file_name in files if file_name != "README.md"]
    if extra_files:
        return [
            "infra/migrations may contain only README.md before product schema scope: "
            + ", ".join(extra_files)
        ]
    return []


def validate_local_infrastructure() -> list[str]:
    errors: list[str] = []
    errors.extend(validate_env_example_keys())
    errors.extend(validate_root_infra_scripts())
    errors.extend(validate_compose_postgres())
    errors.extend(validate_migration_directory())
    return errors


def validate_app_scaffolds() -> list[str]:
    errors: list[str] = []
    api_source = read_text("apps/api/src/app.ts")
    registered_methods = re.findall(
        r"\.(get|post|put|patch|delete|route)\s*\(",
        api_source,
    )
    if registered_methods != ["get"]:
        errors.append("apps/api may register only the GET infrastructure readiness stub")
    if '"/infra/ready"' not in api_source:
        errors.append("apps/api must expose only the /infra/ready infrastructure readiness stub")
    if 'status: "ready"' in api_source:
        errors.append("apps/api /infra/ready must not report generic ready status")
    for phrase in [
        'status: "process-ready"',
        'database: "not-checked"',
        'migrations: "not-checked"',
        'productImplementation: "not-started"',
    ]:
        if phrase not in api_source:
            errors.append(f"apps/api /infra/ready missing truthful stub field: {phrase}")

    web_source = read_text("apps/web/src/App.tsx")
    for term in ["MoneyEvent", "ledger", "incident", "evidence", "repair"]:
        if term in web_source:
            errors.append(f"apps/web contains product UI term: {term}")

    worker_source = read_text("apps/worker/src/index.ts")
    if "jobs: []" not in worker_source:
        errors.append("apps/worker no longer has an empty jobs list")
    for term in FORBIDDEN_APP_TERMS:
        if term.lower() in worker_source.lower():
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
    errors.extend(validate_local_infrastructure())
    errors.extend(validate_qa_development_environment())
    errors.extend(validate_python_dev_requirements())
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
