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

    packages_root = ROOT / "packages"
    if not packages_root.exists():
        return errors
    for package_dir in packages_root.iterdir():
        if not package_dir.is_dir():
            continue
        for path in package_dir.rglob("*"):
            if path.is_file() and path.name != "README.md":
                errors.append(
                    f"packages placeholder contains non-README file: {path.relative_to(ROOT).as_posix()}"
                )
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
