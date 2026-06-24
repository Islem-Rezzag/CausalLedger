from __future__ import annotations

import importlib.util
import json
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
VALIDATOR_PATH = ROOT / "scripts" / "validate-control-plane.py"


spec = importlib.util.spec_from_file_location("validate_control_plane", VALIDATOR_PATH)
assert spec is not None
validator = importlib.util.module_from_spec(spec)
assert spec.loader is not None
sys.modules[spec.name] = validator
spec.loader.exec_module(validator)


def text(rel: str) -> str:
    return (ROOT / rel).read_text(encoding="utf-8")


def registry_table(rows: list[list[str]]) -> str:
    header = "| ID | Name | Milestone | Status | Active Plan | Branch | PR | Last Validation | Last Updated | Notes |"
    divider = "| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |"
    body = ["| " + " | ".join(row) + " |" for row in rows]
    return "\n".join(["# Registry", "", header, divider, *body])


def roadmap_table(rows: list[list[str]]) -> str:
    header = "| Milestone | Goal | Focus | Exit criteria | Submilestone count | Status |"
    divider = "| --- | --- | --- | --- | --- | --- |"
    body = ["| " + " | ".join(row) + " |" for row in rows]
    return "\n".join(["# Roadmap", "", header, divider, *body])


def m02_table(rows: list[list[str]]) -> str:
    header = "| ID | Name | Status | Notes |"
    divider = "| --- | --- | --- | --- |"
    body = ["| " + " | ".join(row) + " |" for row in rows]
    return "\n".join(["# M02", "", "## Detailed submilestones", "", header, divider, *body])


def valid_registry_text() -> str:
    return registry_table(
        [
            [
                "M02.99",
                "Example parser row",
                "M02 Monorepo and local development",
                "Not started",
                "plans/active/CLP-0003-m02-monorepo-and-local-development-environment.md",
                "",
                "",
                "",
                "2026-06-11",
                "Pending.",
            ],
            [
                "M03.01",
                "Define event",
                "M03 Canonical MoneyEvent engine",
                "Not started",
                "",
                "",
                "",
                "",
                "",
                "",
            ],
        ]
    )


def test_01_valid_registry_table_parses_from_fixture():
    rows = validator.parse_registry_table(valid_registry_text())
    assert [row.submilestone_id for row in rows] == ["M02.99", "M03.01"]
    assert validator.validate_registry_rows(rows) == []


def test_02_invalid_registry_status_is_rejected_from_fixture():
    registry_text = valid_registry_text().replace("Not started", "Almost done", 1)
    rows = validator.parse_registry_table(registry_text)
    assert "M02.99 has invalid status: Almost done" in validator.validate_registry_rows(rows)


def test_03_duplicate_registry_id_is_rejected_from_fixture():
    duplicate_registry = registry_table(
        [
            ["M02.98", "Example row", "M02 Monorepo", "Not started", "", "", "", "", "", ""],
            ["M02.98", "Example row again", "M02 Monorepo", "Not started", "", "", "", "", "", ""],
        ]
    )
    rows = validator.parse_registry_table(duplicate_registry)
    assert "duplicate registry ID: M02.98" in validator.validate_registry_rows(rows)


def test_04_m02_milestone_status_mismatch_is_rejected_from_fixtures():
    registry_rows = validator.parse_registry_table(
        registry_table(
            [
                [
                    "M02.97",
                    "Example row",
                    "M02 Monorepo",
                    "Builder in progress",
                    "",
                    "m02-05-package-scaffolds-eslint-ci",
                    "",
                    "",
                    "",
                    "",
                ]
            ]
        )
    )
    mismatch_m02 = m02_table(
        [["M02.97", "Example row", "Not started", "Tracking doc not updated."]]
    )
    errors = validator.validate_m02_milestone_consistency(registry_rows, mismatch_m02)
    assert errors == [
        "docs/milestones/M02.md M02.97 status is Not started, registry says Builder in progress"
    ]


def test_05_missing_active_plan_is_rejected(tmp_path, monkeypatch):
    (tmp_path / "plans" / "active").mkdir(parents=True)
    monkeypatch.setattr(validator, "ROOT", tmp_path)
    assert validator.validate_active_plan_count() == [
        "plans/active must contain exactly one CLP-*.md active plan"
    ]


def test_06_more_than_one_active_plan_is_rejected(tmp_path, monkeypatch):
    active = tmp_path / "plans" / "active"
    active.mkdir(parents=True)
    (active / "CLP-0003-one.md").write_text("", encoding="utf-8")
    (active / "CLP-0004-two.md").write_text("", encoding="utf-8")
    monkeypatch.setattr(validator, "ROOT", tmp_path)
    assert validator.validate_active_plan_count() == [
        "plans/active must contain exactly one CLP-*.md active plan"
    ]


def test_07_populated_env_example_secret_is_rejected(tmp_path, monkeypatch):
    (tmp_path / ".env.example").write_text("API_KEY=real-value\nEMPTY=\n", encoding="utf-8")
    monkeypatch.setattr(validator, "ROOT", tmp_path)
    assert validator.validate_no_secrets() == [
        ".env.example contains populated values before secrets handling exists"
    ]


def test_08_forbidden_product_file_in_deferred_package_is_rejected(
    tmp_path, monkeypatch
):
    product_file = tmp_path / "packages" / "connectors" / "src" / "index.ts"
    product_file.parent.mkdir(parents=True)
    product_file.write_text("export const product = true;\n", encoding="utf-8")
    monkeypatch.setattr(validator, "ROOT", tmp_path)
    assert validator.validate_package_scaffolds() == [
        "deferred package directory contains non-README files: packages/connectors -> src/index.ts"
    ]


def test_09_unexpected_github_workflow_is_rejected(tmp_path, monkeypatch):
    workflow_dir = tmp_path / ".github" / "workflows"
    workflow_dir.mkdir(parents=True)
    (workflow_dir / "deploy.yml").write_text("name: Deploy\n", encoding="utf-8")
    monkeypatch.setattr(validator, "ROOT", tmp_path)
    assert validator.validate_github_workflows() == [
        ".github/workflows may contain exactly ci.yml"
    ]


def test_10_money_event_schema_in_package_source_is_rejected(tmp_path, monkeypatch):
    source = tmp_path / "packages" / "events" / "src" / "index.ts"
    source.parent.mkdir(parents=True)
    source.write_text("export type MoneyEvent = { id: string };\n", encoding="utf-8")
    monkeypatch.setattr(validator, "ROOT", tmp_path)
    assert validator.validate_package_sources("events") == [
        "packages/events/src/index.ts contains MoneyEvent schema"
    ]


def test_11_exact_prose_changes_do_not_fail_current_state_structure():
    current = """# Current State

## Current phase

The active work is a compact QA review of the M02 process amendment.

## Current submilestone and branch

Current slice: `QA pass using different prose`.

Current branch: `m02-amendment-process-diet`.

## Next action

Merge the amendment PR only after QA records PASS.

## Product implementation status

The product remains not started.
"""
    assert validator.validate_current_state_structure(current) == []


def test_12_next_thread_uses_labels_not_exact_sentences():
    next_thread = """# Next Recommended Thread

Thread name:
Merge M02 process amendment PR

Precondition:
QA passed and the branch is still scoped to the amendment.

Next after merge:
M02.05 Builder - Create all remaining package scaffolds + ESLint + CI baseline
"""
    assert validator.validate_next_thread_structure(next_thread) == []


def test_13_roadmap_status_is_derived_from_registry_fixture():
    rows = validator.parse_registry_table(
        registry_table(
            [
                ["M00.01", "One", "M00 Repo operating system", "Completed and merged", "", "", "", "", "", ""],
                ["M00.02", "Two", "M00 Repo operating system", "Completed and merged", "", "", "", "", "", ""],
                ["M02.01", "Done", "M02 Monorepo", "Completed and merged", "", "", "", "", "", ""],
                ["M02.02", "Waiting", "M02 Monorepo", "Not started", "", "", "", "", "", ""],
                ["M03.01", "Future", "M03 MoneyEvent", "Not started", "", "", "", "", "", ""],
            ]
        )
    )
    roadmap = roadmap_table(
        [
            ["M00 Repo operating system", "Goal", "Focus", "Exit", "2", "Completed"],
            ["M02 Monorepo and local development", "Goal", "Focus", "Exit", "2", "In progress"],
            ["M03 Canonical MoneyEvent engine", "Goal", "Focus", "Exit", "1", "Not started"],
        ]
    )
    assert validator.validate_roadmap_consistency(rows, roadmap) == []


def test_14_roadmap_count_mismatch_is_rejected_from_fixture():
    rows = validator.parse_registry_table(valid_registry_text())
    roadmap = roadmap_table(
        [["M02 Monorepo and local development", "Goal", "Focus", "Exit", "99", "In progress"]]
    )
    errors = validator.validate_roadmap_consistency(rows, roadmap)
    assert "plans/ROADMAP.md M02 count is 99, registry has 1" in errors


def test_15_required_files_exist():
    assert not validator.missing_paths(validator.REQUIRED_FILES, "file")


def test_16_required_directories_exist():
    assert not validator.missing_paths(validator.REQUIRED_DIRS, "dir")


def test_17_exactly_one_active_plan_exists():
    assert [path.name for path in validator.active_plan_files()] == [
        "CLP-0003-m02-monorepo-and-local-development-environment.md"
    ]


def test_18_live_registry_table_parses():
    assert len(validator.parse_registry()) > 300


def test_19_live_registry_statuses_are_allowed():
    assert validator.validate_registry() == []


def test_20_live_m02_doc_matches_registry_statuses():
    rows = validator.parse_registry()
    assert validator.validate_m02_milestone_consistency(rows, text("docs/milestones/M02.md")) == []


def test_21_live_roadmap_matches_registry_statuses_and_counts():
    rows = validator.parse_registry()
    assert validator.validate_roadmap_consistency(rows, text("plans/ROADMAP.md")) == []


def test_22_current_state_is_structural_and_short():
    current = text("docs/status/CURRENT_STATE.md")
    assert validator.validate_current_state_structure(current) == []


def test_23_next_recommended_thread_is_structural():
    next_thread = text("docs/status/NEXT_RECOMMENDED_THREAD.md")
    assert validator.validate_next_thread_structure(next_thread) == []


def test_24_domain_model_does_not_hardcode_live_m02_status():
    domain_model = text("docs/DOMAIN_MODEL.md")
    assert "M02.01 through M02.20 remain `Not started`" not in domain_model
    assert "Live milestone progress" in domain_model
    assert "plans/ROADMAP.md" in domain_model


def test_25_changelog_records_m02_01_through_m02_05():
    changelog = text("CHANGELOG.md")
    assert "Completed M02.01 stack ADRs" in changelog
    assert "Completed M02.02 minimal non-domain `apps/api`" in changelog
    assert "Completed M02.03 minimal non-domain `apps/web`" in changelog
    assert "Completed M02.04 minimal non-domain `apps/worker`" in changelog
    assert (
        "M02.05 QA passed, awaiting merge for package scaffolds, ESLint baseline, CI baseline, test typecheck coverage, and explicit Python CI dependencies"
        in changelog
    )


def test_26_gitignore_ignores_generated_report_binaries():
    gitignore = text(".gitignore")
    assert "reports/*.pdf" in gitignore
    assert "reports/*.xlsx" in gitignore
    assert "reports/tmp/" in gitignore


def test_27_env_example_has_no_populated_values():
    env_path = ROOT / ".env.example"
    if env_path.exists():
        for line in env_path.read_text(encoding="utf-8").splitlines():
            if "=" in line:
                assert not line.split("=", 1)[1].strip()


def test_28_github_workflows_contains_only_ci_yml():
    workflow_dir = ROOT / ".github" / "workflows"
    assert sorted(path.name for path in workflow_dir.iterdir() if path.is_file()) == ["ci.yml"]


def test_29_package_scaffolds_are_exactly_allowlisted():
    expected_scaffold = set(validator.APPROVED_PACKAGE_SCAFFOLD_FILES)
    for package_dir in (ROOT / "packages").iterdir():
        if package_dir.is_dir():
            files = validator.package_files(package_dir)
            if package_dir.name in validator.M02_05_PACKAGE_DIRS:
                assert files == expected_scaffold
            else:
                assert files == {"README.md"}


def test_30_api_scaffold_has_no_domain_routes():
    api_source = text("apps/api/src/app.ts")
    assert ".get(" not in api_source
    assert ".post(" not in api_source
    assert ".route(" not in api_source


def test_31_web_scaffold_has_no_product_ui():
    web_source = text("apps/web/src/App.tsx")
    for term in ["MoneyEvent", "ledger", "incident", "evidence", "repair"]:
        assert term not in web_source


def test_32_worker_scaffold_has_no_jobs_or_domain_behavior():
    worker_source = text("apps/worker/src/index.ts")
    assert "jobs: []" in worker_source
    for term in ["MoneyEvent", "ledger", "invariant", "incident", "evidence", "replay", "repair"]:
        assert term.lower() not in worker_source.lower()


def test_33_adr_0008_exists_and_is_accepted():
    adr = text("docs/decisions/ADR-0008-identity-money-and-storage.md")
    assert "# ADR-0008: Identity, Money, and Storage Direction" in adr
    assert "Accepted." in adr


def test_34_adr_0008_records_id_direction():
    adr = text("docs/decisions/ADR-0008-identity-money-and-storage.md")
    for prefix in [
        "`rcpt_`",
        "`evt_`",
        "`txn_`",
        "`inc_`",
        "`rpl_`",
        "`run_`",
        "`prop_`",
        "`rev_`",
        "`bndl_`",
    ]:
        assert prefix in adr
    assert "`request_id` is generated at the API edge" in adr
    assert "`correlation_id` is propagated to worker jobs" in adr


def test_35_adr_0008_records_money_direction():
    adr = text("docs/decisions/ADR-0008-identity-money-and-storage.md")
    assert "Money is stored as integer minor units" in adr
    assert "Currencies use ISO 4217 currency codes" in adr
    assert "Floats are forbidden for money" in adr


def test_36_adr_0008_records_storage_direction():
    adr = text("docs/decisions/ADR-0008-identity-money-and-storage.md")
    assert "Postgres is the planned system of record" in adr
    assert "Raw evidence bytes are stored write-once, keyed by SHA-256 content hash" in adr
    assert "Evidence receipts store hash and locator, not raw payload bodies" in adr


def test_37_adr_0008_is_indexed():
    for rel in ["docs/ACTIVE_DOCS.md", "docs/INDEX.md"]:
        assert "docs/decisions/ADR-0008-identity-money-and-storage.md" in text(rel)


def test_38_workspace_manifests_include_eslint_baseline():
    assert "packages/*" in text("pnpm-workspace.yaml")
    assert "turbo" in text("package.json")
    assert "eslint" in text("package.json")
    assert "typescript-eslint" in text("package.json")
    assert "strict" in text("tsconfig.base.json")


def test_39_no_product_implementation_claims_in_live_status():
    for rel in ["README.md", "docs/status/CURRENT_STATE.md", "docs/status/NEXT_RECOMMENDED_THREAD.md"]:
        content = text(rel).lower()
        assert (
            "product implementation has not started" in content
            or "product domain implementation has not started" in content
        )


def test_40_validator_main_checks_pass():
    assert validator.validate() == []


def write_package_manifest(
    root: Path,
    package_dir: str = "events",
    *,
    name: str = "@causalledger/events",
    private: bool = True,
    scripts: dict[str, str] | None = None,
) -> Path:
    package_path = root / "packages" / package_dir
    package_path.mkdir(parents=True, exist_ok=True)
    package_scripts = scripts or {
        "build": "tsc -p tsconfig.json",
        "typecheck": "tsc -p tsconfig.json --noEmit --pretty false && tsc -p tsconfig.test.json --noEmit --pretty false",
        "typecheck:test": "tsc -p tsconfig.test.json --noEmit --pretty false",
        "test": "vitest run --exclude \"dist/**\"",
        "lint": "eslint . --max-warnings=0",
        "format:check": "prettier --check \"src/**/*.ts\" \"test/**/*.ts\" \"README.md\" \"package.json\" \"tsconfig*.json\"",
    }
    (package_path / "package.json").write_text(
        json.dumps(
            {
                "name": name,
                "version": "0.0.0",
                "private": private,
                "type": "module",
                "scripts": package_scripts,
            }
        ),
        encoding="utf-8",
    )
    return package_path


def write_package_tsconfigs(package_path: Path) -> None:
    (package_path / "tsconfig.json").write_text(
        json.dumps({"extends": "../../tsconfig.base.json", "include": ["src/**/*.ts"]}),
        encoding="utf-8",
    )
    (package_path / "tsconfig.test.json").write_text(
        json.dumps(
            {
                "extends": "./tsconfig.json",
                "compilerOptions": {"noEmit": True, "rootDir": "."},
                "include": ["src/**/*.ts", "test/**/*.ts"],
            }
        ),
        encoding="utf-8",
    )


def test_41_missing_package_file_is_rejected_from_fixture(tmp_path, monkeypatch):
    package_path = write_package_manifest(tmp_path)
    write_package_tsconfigs(package_path)
    (package_path / "src").mkdir()
    (package_path / "src" / "index.ts").write_text("export const ok = true;\n", encoding="utf-8")
    (package_path / "README.md").write_text("# Events\n", encoding="utf-8")
    monkeypatch.setattr(validator, "ROOT", tmp_path)
    assert validator.validate_package_scaffolds() == [
        "package scaffold missing files: packages/events -> test/bootstrap.test.ts"
    ]


def test_42_wrong_package_name_is_rejected_from_fixture(tmp_path, monkeypatch):
    write_package_manifest(tmp_path, name="@causalledger/wrong")
    monkeypatch.setattr(validator, "ROOT", tmp_path)
    assert validator.validate_package_manifest("events") == [
        "packages/events/package.json name must be @causalledger/events"
    ]


def test_43_non_private_package_is_rejected_from_fixture(tmp_path, monkeypatch):
    write_package_manifest(tmp_path, private=False)
    monkeypatch.setattr(validator, "ROOT", tmp_path)
    assert validator.validate_package_manifest("events") == [
        "packages/events/package.json must be private"
    ]


def test_44_missing_required_package_script_is_rejected_from_fixture(tmp_path, monkeypatch):
    scripts = {
        "build": "tsc -p tsconfig.json",
        "typecheck": "tsc -p tsconfig.json --noEmit --pretty false",
        "typecheck:test": "tsc -p tsconfig.test.json --noEmit --pretty false",
        "lint": "eslint . --max-warnings=0",
        "format:check": "prettier --check \"src/**/*.ts\"",
    }
    write_package_manifest(tmp_path, scripts=scripts)
    monkeypatch.setattr(validator, "ROOT", tmp_path)
    assert validator.validate_package_manifest("events") == [
        "packages/events/package.json missing test script"
    ]


def test_45_fake_lint_script_is_rejected_from_fixture(tmp_path, monkeypatch):
    package_path = write_package_manifest(tmp_path)
    manifest = json.loads((package_path / "package.json").read_text(encoding="utf-8"))
    manifest["scripts"]["lint"] = "tsc -p tsconfig.json --noEmit"
    (package_path / "package.json").write_text(json.dumps(manifest), encoding="utf-8")
    monkeypatch.setattr(validator, "ROOT", tmp_path)
    assert validator.validate_package_manifest("events") == [
        "packages/events/package.json lint script must run real ESLint"
    ]


def test_46_package_test_tsconfig_must_include_tests(tmp_path, monkeypatch):
    package_path = write_package_manifest(tmp_path)
    write_package_tsconfigs(package_path)
    (package_path / "tsconfig.test.json").write_text(
        json.dumps({"extends": "./tsconfig.json", "include": ["src/**/*.ts"]}),
        encoding="utf-8",
    )
    monkeypatch.setattr(validator, "ROOT", tmp_path)
    assert validator.validate_package_tsconfig("events") == [
        "packages/events/tsconfig.test.json must include test files"
    ]


def test_47_ci_must_install_python_dev_dependencies(tmp_path, monkeypatch):
    workflow_dir = tmp_path / ".github" / "workflows"
    workflow_dir.mkdir(parents=True)
    (workflow_dir / "ci.yml").write_text("name: CI\n", encoding="utf-8")
    monkeypatch.setattr(validator, "ROOT", tmp_path)
    assert validator.validate_github_workflows() == [
        ".github/workflows/ci.yml must install Python dev dependencies"
    ]


def test_48_requirements_dev_declares_pytest(tmp_path, monkeypatch):
    (tmp_path / "requirements-dev.txt").write_text("ruff>=0.1\n", encoding="utf-8")
    monkeypatch.setattr(validator, "ROOT", tmp_path)
    assert validator.validate_python_dev_requirements() == [
        "requirements-dev.txt must declare pytest for CI control-plane tests"
    ]
