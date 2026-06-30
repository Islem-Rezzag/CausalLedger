from __future__ import annotations

import importlib.util
import json
import subprocess
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

QA_PATH = ROOT / "scripts" / "qa-dev-environment.py"
qa_spec = importlib.util.spec_from_file_location("qa_dev_environment", QA_PATH)
assert qa_spec is not None
qa_dev = importlib.util.module_from_spec(qa_spec)
assert qa_spec.loader is not None
sys.modules[qa_spec.name] = qa_dev
qa_spec.loader.exec_module(qa_dev)


def text(rel: str) -> str:
    return (ROOT / rel).read_text(encoding="utf-8")


def completed(args: list[str], stdout: str = "", returncode: int = 0) -> subprocess.CompletedProcess[str]:
    return subprocess.CompletedProcess(args, returncode, stdout=stdout, stderr="")


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


def m03_table(rows: list[list[str]]) -> str:
    header = "| ID | Name | Status | Notes |"
    divider = "| --- | --- | --- | --- |"
    body = ["| " + " | ".join(row) + " |" for row in rows]
    return "\n".join(["# M03", "", "## Detailed submilestones", "", header, divider, *body])


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


def test_04b_m03_requires_lean_planning_rows_from_fixtures():
    registry_rows = validator.parse_registry_table(
        registry_table(
            [
                [
                    "M03.01",
                    "Canonical MoneyEvent concept and contract planning",
                    "M03 Canonical MoneyEvent engine",
                    "Builder complete, awaiting QA",
                    validator.M03_ACTIVE_PLAN,
                    "",
                    "",
                    "",
                    "",
                    "",
                ],
                [
                    "M03.02",
                    "MoneyEvent TypeScript types and schema boundary",
                    "M03 Canonical MoneyEvent engine",
                    "Not started",
                    validator.M03_ACTIVE_PLAN,
                    "",
                    "",
                    "",
                    "",
                    "",
                ],
            ]
        )
    )
    errors = validator.validate_m03_milestone_consistency(
        registry_rows,
        m03_table(
            [
                [
                    "M03.01",
                    "Canonical MoneyEvent concept and contract planning",
                    "Builder complete, awaiting QA",
                    "Pending.",
                ],
                ["M03.02", "MoneyEvent TypeScript types and schema boundary", "Not started", "Pending."],
            ]
        ),
    )
    assert "docs/milestones/M03.md must contain exactly M03.01 through M03.06" in errors
    assert "registry must contain exactly M03.01 through M03.06" in errors


def test_04c_m03_later_rows_must_remain_not_started_during_m03_01():
    registry_rows = validator.parse_registry_table(
        registry_table(
            [
                [
                    "M03.01",
                    "Canonical MoneyEvent concept and contract planning",
                    "M03 Canonical MoneyEvent engine",
                    "Builder complete, awaiting QA",
                    validator.M03_ACTIVE_PLAN,
                    "",
                    "",
                    "",
                    "",
                    "",
                ],
                [
                    "M03.02",
                    "MoneyEvent TypeScript types and schema boundary",
                    "M03 Canonical MoneyEvent engine",
                    "Builder in progress",
                    validator.M03_ACTIVE_PLAN,
                    "",
                    "",
                    "",
                    "",
                    "",
                ],
                [
                    "M03.03",
                    "Evidence-to-MoneyEvent mapping fixtures and simulator planning",
                    "M03 Canonical MoneyEvent engine",
                    "Not started",
                    validator.M03_ACTIVE_PLAN,
                    "",
                    "",
                    "",
                    "",
                    "",
                ],
                [
                    "M03.04",
                    "MoneyEvent validation and normalization rules",
                    "M03 Canonical MoneyEvent engine",
                    "Not started",
                    validator.M03_ACTIVE_PLAN,
                    "",
                    "",
                    "",
                    "",
                    "",
                ],
                [
                    "M03.05",
                    "MoneyEvent test fixtures and benchmark seed cases",
                    "M03 Canonical MoneyEvent engine",
                    "Not started",
                    validator.M03_ACTIVE_PLAN,
                    "",
                    "",
                    "",
                    "",
                    "",
                ],
                [
                    "M03.06",
                    "MoneyEvent QA and closeout",
                    "M03 Canonical MoneyEvent engine",
                    "Not started",
                    validator.M03_ACTIVE_PLAN,
                    "",
                    "",
                    "",
                    "",
                    "",
                ],
            ]
        )
    )
    errors = validator.validate_m03_milestone_consistency(
        registry_rows,
        m03_table(
            [
                [
                    "M03.01",
                    "Canonical MoneyEvent concept and contract planning",
                    "Builder complete, awaiting QA",
                    "Pending.",
                ],
                [
                    "M03.02",
                    "MoneyEvent TypeScript types and schema boundary",
                    "Builder in progress",
                    "Pending.",
                ],
                [
                    "M03.03",
                    "Evidence-to-MoneyEvent mapping fixtures and simulator planning",
                    "Not started",
                    "Pending.",
                ],
                [
                    "M03.04",
                    "MoneyEvent validation and normalization rules",
                    "Not started",
                    "Pending.",
                ],
                [
                    "M03.05",
                    "MoneyEvent test fixtures and benchmark seed cases",
                    "Not started",
                    "Pending.",
                ],
                ["M03.06", "MoneyEvent QA and closeout", "Not started", "Pending."],
            ]
        ),
    )
    assert "M03.02 must remain Not started during M03.01" in errors


def active_current_state() -> str:
    return """# Current State

## Current phase

M03 is in progress under active plan `plans/active/CLP-0004-m03.md`.

## Current submilestone and branch

Current slice: `M03 Planning`.

Current branch: `m03-planning`.

## Next action

Continue M03 planning.

## Product implementation status

Product implementation has not started.
"""


def between_milestone_current_state() -> str:
    return """# Current State

## Current phase

M02 is completed. No active milestone plan exists.

## Current submilestone and branch

Current slice: `None - between milestones`.

Current branch: `m02-closeout`.

## Next action

Start M03 planning after closeout merge.

## Product implementation status

Product implementation has not started.
"""


def m03_next_thread() -> str:
    return """# Next Recommended Thread

Thread name:
M03 Planning - Canonical MoneyEvent Engine

Precondition:
M02 closeout passed.

Scope:
Create the M03 planning branch and active M03 plan.
"""


def test_05_zero_active_plan_is_rejected_when_current_state_claims_active_milestone(
    tmp_path, monkeypatch
):
    (tmp_path / "plans" / "active").mkdir(parents=True)
    monkeypatch.setattr(validator, "ROOT", tmp_path)
    assert validator.validate_active_plan_count(active_current_state(), m03_next_thread()) == [
        "plans/active contains zero CLP-*.md plans but status docs do not describe a valid between-milestone state"
    ]


def test_06_more_than_one_active_plan_is_rejected(tmp_path, monkeypatch):
    active = tmp_path / "plans" / "active"
    active.mkdir(parents=True)
    (active / "CLP-0003-one.md").write_text("", encoding="utf-8")
    (active / "CLP-0004-two.md").write_text("", encoding="utf-8")
    monkeypatch.setattr(validator, "ROOT", tmp_path)
    assert validator.validate_active_plan_count(active_current_state(), m03_next_thread()) == [
        "plans/active must not contain more than one CLP-*.md active plan"
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


def test_10a_moneyevent_contract_rejects_runtime_code_fences(tmp_path, monkeypatch):
    contract = tmp_path / "docs" / "MONEYEVENT_CONTRACT.md"
    contract.parent.mkdir(parents=True)
    contract.write_text(
        "\n".join(
            [
                "# MoneyEvent Contract",
                "conceptual contract",
                "not runtime implementation",
                "not a ledger entry",
                "not a payment provider event",
                "not a bank statement line",
                "not a settlement row",
                "not an incident",
                "not a repair",
                "not an LLM explanation",
                "event identity",
                "source identity",
                "source type",
                "evidence references",
                "provenance",
                "integer minor units",
                "ISO 4217",
                "idempotency key",
                "source event time",
                "observed time",
                "raw evidence remains the source material",
                "LLM-generated text cannot create financial truth",
                "duplicate webhook",
                "conflicting provider and bank evidence",
                "```ts",
                "export type MoneyEvent = {};",
                "```",
            ]
        ),
        encoding="utf-8",
    )
    monkeypatch.setattr(validator, "ROOT", tmp_path)
    errors = validator.validate_moneyevent_contract_doc()
    assert "MONEYEVENT_CONTRACT.md must not contain runtime code fences" in errors
    assert "MONEYEVENT_CONTRACT.md must not define a MoneyEvent type" in errors


def test_10b_fixture_or_simulator_data_is_rejected_before_m03_03(tmp_path, monkeypatch):
    fixture = tmp_path / "data" / "fixtures" / "duplicate_webhook.md"
    fixture.parent.mkdir(parents=True)
    fixture.write_text("fixture placeholder\n", encoding="utf-8")
    monkeypatch.setattr(validator, "ROOT", tmp_path)
    assert validator.validate_no_m03_fixture_or_simulator_data() == [
        "data/fixtures may contain only README.md before fixture or simulator scope: duplicate_webhook.md"
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

Scope:
Merge the process amendment PR only after QA PASS.
"""
    assert validator.validate_next_thread_structure(next_thread) == []


def test_13_roadmap_status_is_derived_from_registry_fixture(tmp_path, monkeypatch):
    (tmp_path / "plans" / "active").mkdir(parents=True)
    monkeypatch.setattr(validator, "ROOT", tmp_path)
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


def test_13a_roadmap_allows_planning_active_when_active_plan_exists(tmp_path, monkeypatch):
    active = tmp_path / "plans" / "active"
    active.mkdir(parents=True)
    (active / "CLP-0004-m03-canonical-moneyevent-engine.md").write_text(
        "# M03\n", encoding="utf-8"
    )
    monkeypatch.setattr(validator, "ROOT", tmp_path)
    rows = validator.parse_registry_table(
        registry_table(
            [
                ["M03.01", "Future", "M03 MoneyEvent", "Not started", "", "", "", "", "", ""],
                ["M03.02", "Future", "M03 MoneyEvent", "Not started", "", "", "", "", "", ""],
            ]
        )
    )
    roadmap = roadmap_table(
        [["M03 Canonical MoneyEvent engine", "Goal", "Focus", "Exit", "2", "Planning active"]]
    )
    assert validator.validate_roadmap_consistency(rows, roadmap) == []


def test_13b_roadmap_completed_allows_deferred_rows_after_closeout():
    rows = validator.parse_registry_table(
        registry_table(
            [
                ["M02.01", "Done", "M02 Monorepo", "Completed and merged", "", "", "", "", "", ""],
                ["M02.08", "Deferred", "M02 Monorepo", "Deferred", "", "", "", "", "", ""],
            ]
        )
    )
    roadmap = roadmap_table(
        [["M02 Monorepo and local development", "Goal", "Focus", "Exit", "2", "Completed"]]
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


def test_17_active_m03_plan_exists_during_m03_planning():
    assert validator.active_plan_files() == [ROOT / validator.M03_ACTIVE_PLAN]


def test_17b_one_active_plan_is_valid_during_active_milestone(tmp_path, monkeypatch):
    active = tmp_path / "plans" / "active"
    active.mkdir(parents=True)
    (active / "CLP-0004-m03.md").write_text("# M03\n", encoding="utf-8")
    monkeypatch.setattr(validator, "ROOT", tmp_path)
    assert validator.validate_active_plan_count(active_current_state(), m03_next_thread()) == []


def test_17c_zero_active_plan_is_valid_between_milestones(tmp_path, monkeypatch):
    (tmp_path / "plans" / "active").mkdir(parents=True)
    monkeypatch.setattr(validator, "ROOT", tmp_path)
    assert (
        validator.validate_active_plan_count(
            between_milestone_current_state(), m03_next_thread()
        )
        == []
    )


def test_17d_completed_m02_plan_exists_and_active_m02_plan_is_absent():
    assert (
        ROOT
        / "plans"
        / "completed"
        / "CLP-0003-m02-monorepo-and-local-development-environment.md"
    ).is_file()
    assert not (
        ROOT
        / "plans"
        / "active"
        / "CLP-0003-m02-monorepo-and-local-development-environment.md"
    ).exists()


def test_17e_m03_plan_location_is_active_only():
    assert validator.validate_m03_plan_location() == []


def test_17f_moneyevent_contract_doc_exists_and_is_conceptual():
    assert (ROOT / validator.MONEYEVENT_CONTRACT_DOC).is_file()
    assert validator.validate_moneyevent_contract_doc() == []


def test_18_live_registry_table_parses():
    assert len(validator.parse_registry()) > 300


def test_19_live_registry_statuses_are_allowed():
    assert validator.validate_registry() == []


def test_20_live_m02_doc_matches_registry_statuses():
    rows = validator.parse_registry()
    assert validator.validate_m02_milestone_consistency(rows, text("docs/milestones/M02.md")) == []


def test_20b_live_m03_doc_matches_registry_statuses():
    rows = validator.parse_registry()
    assert validator.validate_m03_milestone_consistency(rows, text("docs/milestones/M03.md")) == []


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
        "Completed and merged M02.05 package scaffolds, ESLint baseline, CI baseline, test typecheck coverage, and explicit Python CI dependencies"
        in changelog
    )
    assert (
        "Completed and merged M02.06 local-only Docker Compose/Postgres, migration tooling, env placeholders, infrastructure readiness stubs, and remote infrastructure smoke validation"
        in changelog
    )
    assert (
        "M02.07 Builder created a repeatable QA development environment"
        in changelog
    )
    assert "M02.07 QA corrected truthful dirty-worktree" in changelog


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
    assert '"/infra/ready"' in api_source
    assert api_source.count(".get(") == 1
    assert ".post(" not in api_source
    assert ".route(" not in api_source
    assert 'status: "process-ready"' in api_source
    assert 'status: "ready"' not in api_source
    assert 'database: "not-checked"' in api_source
    assert 'migrations: "not-checked"' in api_source


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
    for rel in ["README.md", "docs/status/CURRENT_STATE.md"]:
        content = text(rel).lower()
        assert (
            "product implementation has not started" in content
            or "product domain implementation has not started" in content
        )


def test_39b_no_moneyevent_runtime_files_exist():
    assert validator.validate_no_moneyevent_runtime_files() == []


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
    assert (
        ".github/workflows/ci.yml must install Python dev dependencies"
        in validator.validate_github_workflows()
    )


def test_48_requirements_dev_declares_pytest(tmp_path, monkeypatch):
    (tmp_path / "requirements-dev.txt").write_text("ruff>=0.1\n", encoding="utf-8")
    monkeypatch.setattr(validator, "ROOT", tmp_path)
    assert validator.validate_python_dev_requirements() == [
        "requirements-dev.txt must declare pytest for CI control-plane tests"
    ]


def test_49_local_infrastructure_baseline_is_valid():
    assert validator.validate_local_infrastructure() == []


def test_50_env_example_contains_required_local_infra_keys():
    env_example = text(".env.example")
    for key in validator.REQUIRED_LOCAL_ENV_KEYS:
        assert f"{key}=" in env_example


def test_51_docker_compose_is_local_postgres_only():
    compose = text("docker-compose.yml")
    assert "postgres:" in compose
    assert "postgres:17-alpine" in compose
    assert "127.0.0.1" in compose
    assert "pg_isready" in compose
    assert "container_name:" not in compose
    assert "redis" not in compose.lower()


def test_52_migration_directory_contains_no_schema_files():
    migration_files = {
        path.name
        for path in (ROOT / "infra" / "migrations").iterdir()
        if path.is_file()
    }
    assert migration_files == {"README.md"}


def test_53_product_migration_file_is_rejected(tmp_path, monkeypatch):
    migration_dir = tmp_path / "infra" / "migrations"
    migration_dir.mkdir(parents=True)
    (migration_dir / "README.md").write_text("# Migrations\n", encoding="utf-8")
    (migration_dir / "001_create_money_events.sql").write_text(
        "create table money_events (id text primary key);\n",
        encoding="utf-8",
    )
    monkeypatch.setattr(validator, "ROOT", tmp_path)
    assert validator.validate_migration_directory() == [
        "infra/migrations may contain only README.md before product schema scope: 001_create_money_events.sql"
    ]


def test_54_compose_rejects_redis_scope(tmp_path, monkeypatch):
    (tmp_path / "docker-compose.yml").write_text(
        """services:
  postgres:
    image: postgres:17-alpine
    environment:
      POSTGRES_PASSWORD: causalledger_local_password
    ports:
      - "127.0.0.1:5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready"]
  redis:
    image: redis:7-alpine
""",
        encoding="utf-8",
    )
    monkeypatch.setattr(validator, "ROOT", tmp_path)
    assert "docker-compose.yml must not define redis behavior in M02.06" in (
        validator.validate_compose_postgres()
    )


def test_55_compose_rejects_fixed_container_name(tmp_path, monkeypatch):
    (tmp_path / "docker-compose.yml").write_text(
        """services:
  postgres:
    image: postgres:17-alpine
    container_name: causalledger-postgres
    environment:
      POSTGRES_PASSWORD: causalledger_local_password
    ports:
      - "127.0.0.1:5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready"]
""",
        encoding="utf-8",
    )
    monkeypatch.setattr(validator, "ROOT", tmp_path)
    assert "docker-compose.yml must not set a fixed container_name for local Postgres" in (
        validator.validate_compose_postgres()
    )


def test_56_api_readiness_rejects_ambiguous_ready_status(tmp_path, monkeypatch):
    api_source = tmp_path / "apps" / "api" / "src" / "app.ts"
    api_source.parent.mkdir(parents=True)
    api_source.write_text(
        """const infrastructureReadyResponse = {
  service: "api",
  status: "ready",
  scope: "infrastructure",
  productImplementation: "not-started",
} as const;

export function buildApiApp() {
  app.get("/infra/ready", async () => infrastructureReadyResponse);
}
""",
        encoding="utf-8",
    )
    web_source = tmp_path / "apps" / "web" / "src" / "App.tsx"
    web_source.parent.mkdir(parents=True)
    web_source.write_text("export function App() { return null; }\n", encoding="utf-8")
    worker_source = tmp_path / "apps" / "worker" / "src" / "index.ts"
    worker_source.parent.mkdir(parents=True)
    worker_source.write_text("export const worker = { jobs: [] };\n", encoding="utf-8")
    monkeypatch.setattr(validator, "ROOT", tmp_path)
    errors = validator.validate_app_scaffolds()
    assert "apps/api /infra/ready must not report generic ready status" in errors
    assert (
        'apps/api /infra/ready missing truthful stub field: status: "process-ready"'
        in errors
    )
    assert (
        'apps/api /infra/ready missing truthful stub field: database: "not-checked"'
        in errors
    )


def test_57_ci_requires_infra_smoke_job(tmp_path, monkeypatch):
    workflow_dir = tmp_path / ".github" / "workflows"
    workflow_dir.mkdir(parents=True)
    (workflow_dir / "ci.yml").write_text(
        """name: CI
jobs:
  validate:
    steps:
      - run: python -m pip install -r requirements-dev.txt
""",
        encoding="utf-8",
    )
    monkeypatch.setattr(validator, "ROOT", tmp_path)
    assert (
        ".github/workflows/ci.yml missing infra-smoke coverage: infra-smoke:"
        in validator.validate_github_workflows()
    )


def test_58_qa_dev_environment_command_is_configured():
    manifest = json.loads(text("package.json"))
    assert manifest["scripts"]["qa:dev"] == "python scripts/qa-dev-environment.py"
    assert "scripts/qa-dev-environment.py" in validator.REQUIRED_FILES
    assert "docs/ops/qa-development-environment.md" in validator.REQUIRED_FILES


def test_59_qa_dev_environment_script_reports_statuses_and_standard_checks():
    script = text("scripts/qa-dev-environment.py")
    for phrase in [
        "PASS",
        "FAIL",
        "SKIPPED",
        "install",
        "--frozen-lockfile",
        "typecheck",
        "lint",
        "test",
        "build",
        "format:check",
        "validate-control-plane.py",
        "test_control_plane_bootstrap.py",
        "--check",
    ]:
        assert phrase in script


def test_60_qa_dev_environment_docker_path_is_explicit_and_cleans_up():
    script = text("scripts/qa-dev-environment.py")
    assert "--with-docker" in script
    assert "not requested; run with --with-docker" in script
    assert "docker" in script
    assert "compose" in script
    assert "finally:" in script
    assert "down" in script
    assert "-v" in script


def test_61_qa_dev_environment_guide_records_scope_and_boundaries():
    guide = text("docs/ops/qa-development-environment.md")
    assert "pnpm qa:dev" in guide
    assert "--with-docker" in guide
    assert "PASS" in guide
    assert "FAIL" in guide
    assert "SKIPPED" in guide
    assert "does not validate CausalLedger product behavior" in guide
    assert "No product/domain behavior is implemented or validated" in guide
    assert "GitHub Actions `infra-smoke`" in guide


def test_62_validator_accepts_qa_dev_environment_artifacts():
    assert validator.validate_qa_development_environment() == []


def git_capture_for(status: str, *, name: str = "Mohamed Islem Rezzag Baara", email: str = "Islem-Rezzag@users.noreply.github.com"):
    responses = {
        ("git", "branch", "--show-current"): completed(
            ["git", "branch", "--show-current"], "m02-07-qa-development-environment\n"
        ),
        ("git", "status", "--short"): completed(["git", "status", "--short"], status),
        ("git", "remote", "-v"): completed(
            ["git", "remote", "-v"],
            "origin\thttps://github.com/Islem-Rezzag/CausalLedger.git (fetch)\n",
        ),
        ("git", "config", "--local", "--get", "user.name"): completed(
            ["git", "config", "--local", "--get", "user.name"], f"{name}\n"
        ),
        ("git", "config", "--local", "--get", "user.email"): completed(
            ["git", "config", "--local", "--get", "user.email"], f"{email}\n"
        ),
    }

    def fake_run_capture(args: list[str], **_kwargs):
        return responses[tuple(args)]

    return fake_run_capture


def result_by_name(reporter: object, name: str):
    for result in reporter.results:
        if result.name == name:
            return result
    raise AssertionError(f"missing result: {name}")


def test_63_reporter_failure_controls_exit_behavior():
    reporter = qa_dev.Reporter()
    assert reporter.pass_("ok", "detail") is True
    assert reporter.skip("skip", "detail") is True
    assert reporter.failed() is False
    assert reporter.fail("bad", "detail") is False
    assert reporter.failed() is True


def test_64_qa_git_state_clean_worktree_passes(monkeypatch):
    monkeypatch.setattr(qa_dev, "run_capture", git_capture_for(""))
    reporter = qa_dev.Reporter()
    qa_dev.check_git_state(reporter, allow_dirty=False)
    assert result_by_name(reporter, "Git clean worktree requirement").status == "PASS"
    assert result_by_name(reporter, "Repository-local Git identity").status == "PASS"
    assert reporter.failed() is False


def test_65_qa_git_state_dirty_worktree_fails_by_default(monkeypatch):
    monkeypatch.setattr(qa_dev, "run_capture", git_capture_for(" M scripts/qa-dev-environment.py\n"))
    reporter = qa_dev.Reporter()
    qa_dev.check_git_state(reporter, allow_dirty=False)
    assert result_by_name(reporter, "Git clean worktree requirement").status == "FAIL"
    assert reporter.failed() is True


def test_66_qa_git_state_dirty_worktree_can_be_explicitly_allowed(monkeypatch):
    monkeypatch.setattr(qa_dev, "run_capture", git_capture_for(" M scripts/qa-dev-environment.py\n"))
    reporter = qa_dev.Reporter()
    qa_dev.check_git_state(reporter, allow_dirty=True)
    result = result_by_name(reporter, "Git clean worktree requirement")
    assert result.status == "SKIPPED"
    assert "--allow-dirty" in result.detail
    assert reporter.failed() is False


def test_67_repository_local_identity_missing_is_rejected(monkeypatch):
    responses = {
        ("git", "branch", "--show-current"): completed(["git", "branch", "--show-current"], "branch\n"),
        ("git", "status", "--short"): completed(["git", "status", "--short"], ""),
        ("git", "remote", "-v"): completed(["git", "remote", "-v"], "origin\turl (fetch)\n"),
        ("git", "config", "--local", "--get", "user.name"): completed(
            ["git", "config", "--local", "--get", "user.name"], "", 1
        ),
        ("git", "config", "--local", "--get", "user.email"): completed(
            ["git", "config", "--local", "--get", "user.email"], "", 1
        ),
    }
    monkeypatch.setattr(qa_dev, "run_capture", lambda args, **_kwargs: responses[tuple(args)])
    reporter = qa_dev.Reporter()
    qa_dev.check_git_state(reporter, allow_dirty=False)
    assert result_by_name(reporter, "Repository-local Git identity").status == "FAIL"


def test_68_repository_local_identity_rejects_forbidden_domain(monkeypatch):
    monkeypatch.setattr(
        qa_dev,
        "run_capture",
        git_capture_for("", email="person@qmul.ac.uk"),
    )
    reporter = qa_dev.Reporter()
    qa_dev.check_git_state(reporter, allow_dirty=False)
    result = result_by_name(reporter, "Repository-local Git identity")
    assert result.status == "FAIL"
    assert "forbidden institutional email domain" in result.detail


def test_69_global_only_identity_is_not_accepted_as_local(monkeypatch):
    calls: list[tuple[str, ...]] = []

    def fake_run_capture(args: list[str], **_kwargs):
        calls.append(tuple(args))
        if args == ["git", "branch", "--show-current"]:
            return completed(args, "branch\n")
        if args == ["git", "status", "--short"]:
            return completed(args, "")
        if args == ["git", "remote", "-v"]:
            return completed(args, "origin\turl (fetch)\n")
        return completed(args, "", 1)

    monkeypatch.setattr(qa_dev, "run_capture", fake_run_capture)
    reporter = qa_dev.Reporter()
    qa_dev.check_git_state(reporter, allow_dirty=False)
    assert ("git", "config", "--local", "--get", "user.name") in calls
    assert ("git", "config", "--get", "user.name") not in calls
    assert result_by_name(reporter, "Repository-local Git identity").status == "FAIL"


def test_70_run_check_reports_missing_command(monkeypatch):
    monkeypatch.setattr(
        qa_dev,
        "resolve_command",
        lambda _args: (None, "required command not found: pnpm"),
    )
    reporter = qa_dev.Reporter()
    assert qa_dev.run_check(reporter, "Missing pnpm", ["pnpm", "--version"]) is False
    result = result_by_name(reporter, "Missing pnpm")
    assert result.status == "FAIL"
    assert "required command not found: pnpm" in result.detail


def test_71_run_check_reports_timeout(monkeypatch):
    monkeypatch.setattr(qa_dev, "resolve_command", lambda args: (args, None))

    def fake_run(*_args, **_kwargs):
        raise subprocess.TimeoutExpired(cmd=["pnpm", "test"], timeout=1)

    monkeypatch.setattr(qa_dev.subprocess, "run", fake_run)
    reporter = qa_dev.Reporter()
    assert qa_dev.run_check(reporter, "Timed command", ["pnpm", "test"], timeout_seconds=1) is False
    result = result_by_name(reporter, "Timed command")
    assert result.status == "FAIL"
    assert "timed out after 1 seconds" in result.detail


def test_72_docker_default_mode_is_skipped():
    reporter = qa_dev.Reporter()
    qa_dev.check_docker_environment(reporter, with_docker=False)
    result = result_by_name(reporter, "Docker validation")
    assert result.status == "SKIPPED"
    assert "--with-docker" in result.detail


def test_73_docker_environment_overrides_shell_values(monkeypatch):
    monkeypatch.setenv("CAUSALLEDGER_POSTGRES_DB", "wrong_db")
    monkeypatch.setenv("CAUSALLEDGER_POSTGRES_USER", "wrong_user")
    monkeypatch.setenv("CAUSALLEDGER_POSTGRES_PASSWORD", "wrong_password")
    monkeypatch.setenv("CAUSALLEDGER_POSTGRES_HOST", "0.0.0.0")
    monkeypatch.setenv("DATABASE_URL", "postgres://wrong:wrong@host/wrong")
    monkeypatch.setattr(qa_dev, "find_local_port", lambda: 15432)
    observed_envs: dict[str, dict[str, str]] = {}

    def fake_run_check(_reporter, name, _args, *, env=None, **_kwargs):
        observed_envs[name] = dict(env or {})
        return True

    monkeypatch.setattr(qa_dev, "run_check", fake_run_check)
    monkeypatch.setattr(qa_dev, "wait_for_postgres_health", lambda *_args, **_kwargs: True)
    monkeypatch.setattr(qa_dev, "inspect_schema", lambda *_args, **_kwargs: True)
    reporter = qa_dev.Reporter()
    qa_dev.check_docker_environment(reporter, with_docker=True)

    compose_env = observed_envs["Docker Compose configuration"]
    assert compose_env["CAUSALLEDGER_POSTGRES_DB"] == "causalledger_qa"
    assert compose_env["CAUSALLEDGER_POSTGRES_USER"] == "causalledger_qa"
    assert compose_env["CAUSALLEDGER_POSTGRES_PASSWORD"] == "causalledger_qa_local_password"
    assert compose_env["CAUSALLEDGER_POSTGRES_HOST"] == "127.0.0.1"
    migration_env = observed_envs["Migration smoke"]
    assert "wrong" not in migration_env["DATABASE_URL"]
    assert "causalledger_qa" in migration_env["DATABASE_URL"]
    assert "15432" in migration_env["DATABASE_URL"]


def test_74_docker_flow_stops_after_compose_config_failure(monkeypatch):
    monkeypatch.setattr(qa_dev, "find_local_port", lambda: 15432)
    called: list[str] = []

    def fake_run_check(_reporter, name, _args, **_kwargs):
        called.append(name)
        return name != "Docker Compose configuration"

    monkeypatch.setattr(qa_dev, "run_check", fake_run_check)
    reporter = qa_dev.Reporter()
    qa_dev.check_docker_environment(reporter, with_docker=True)
    assert "Docker Compose configuration" in called
    assert "Postgres start" not in called
    assert "Docker cleanup" not in called


def test_75_docker_cleanup_runs_after_start_failure(monkeypatch):
    monkeypatch.setattr(qa_dev, "find_local_port", lambda: 15432)
    called: list[str] = []

    def fake_run_check(_reporter, name, _args, **_kwargs):
        called.append(name)
        return name != "Postgres start"

    monkeypatch.setattr(qa_dev, "run_check", fake_run_check)
    reporter = qa_dev.Reporter()
    qa_dev.check_docker_environment(reporter, with_docker=True)
    assert "Postgres start" in called
    assert "Migration smoke" not in called
    assert "Docker cleanup" in called


def test_76_docker_schema_inspection_waits_for_successful_migration(monkeypatch):
    monkeypatch.setattr(qa_dev, "find_local_port", lambda: 15432)
    called: list[str] = []
    inspected = {"value": False}

    def fake_run_check(_reporter, name, _args, **_kwargs):
        called.append(name)
        return name != "Migration smoke"

    monkeypatch.setattr(qa_dev, "run_check", fake_run_check)
    monkeypatch.setattr(qa_dev, "wait_for_postgres_health", lambda *_args, **_kwargs: True)
    monkeypatch.setattr(qa_dev, "inspect_schema", lambda *_args, **_kwargs: inspected.update(value=True))
    reporter = qa_dev.Reporter()
    qa_dev.check_docker_environment(reporter, with_docker=True)
    assert "Migration smoke" in called
    assert inspected["value"] is False
    assert "Docker cleanup" in called
