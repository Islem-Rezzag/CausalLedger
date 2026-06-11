from __future__ import annotations

import importlib.util
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


def registry() -> dict[str, object]:
    return validator.registry_by_id()


def test_01_required_files_exist():
    assert not validator.missing_paths(validator.REQUIRED_FILES, "file")


def test_02_required_directories_exist():
    assert not validator.missing_paths(validator.REQUIRED_DIRS, "dir")


def test_03_exactly_one_active_plan_exists():
    assert [path.name for path in validator.active_plan_files()] == [
        "CLP-0003-m02-monorepo-and-local-development-environment.md"
    ]


def test_04_registry_table_parses():
    assert len(validator.parse_registry()) > 300


def test_05_registry_statuses_are_allowed():
    assert not [
        row
        for row in validator.parse_registry()
        if row.status not in validator.ALLOWED_STATUSES
    ]


def test_06_m02_completed_rows_are_current():
    rows = registry()
    for submilestone_id in ["M02.01", "M02.02", "M02.03", "M02.04"]:
        assert rows[submilestone_id].status == "Completed and merged"


def test_07_m02_remaining_active_rows_are_not_started():
    rows = registry()
    for submilestone_id in ["M02.05", "M02.06", "M02.07"]:
        assert rows[submilestone_id].status == "Not started"


def test_08_m02_absorbed_rows_are_deferred():
    rows = registry()
    for index in range(8, 21):
        assert rows[f"M02.{index:02}"].status == "Deferred"


def test_09_m03_through_m21_remain_not_started():
    for row in validator.parse_registry():
        if any(row.submilestone_id.startswith(f"M{index:02}.") for index in range(3, 22)):
            assert row.status == "Not started"


def test_10_roadmap_records_process_diet():
    roadmap = text("plans/ROADMAP.md")
    assert "M02.01 through M02.04 are `Completed and merged`" in roadmap
    assert "M02.05 through M02.07 remain `Not started`" in roadmap
    assert "former M02.08 through M02.20 rows are deferred or absorbed" in roadmap


def test_11_m02_doc_records_restructured_remaining_work():
    m02 = text("docs/milestones/M02.md")
    assert "Create all remaining package scaffolds + ESLint + CI baseline" in m02
    assert "Local infrastructure: Docker Compose + Postgres + migration tool + health-check stubs" in m02
    assert "`apps/agent-runtime` creation moved to the M10 era" in m02
    assert "Redis is deferred until needed" in m02


def test_12_current_state_is_short():
    assert len(text("docs/status/CURRENT_STATE.md").splitlines()) <= 80


def test_13_current_state_names_branch_and_next_action():
    current = text("docs/status/CURRENT_STATE.md")
    assert "m02-amendment-process-diet" in current
    assert "M02 process amendment QA - tracking fixes, process diet, validator cleanup, and ADR-0008" in current


def test_14_current_state_has_terminology_note():
    current = text("docs/status/CURRENT_STATE.md")
    assert 'Current "lint" validation before the real ESLint baseline means TypeScript no-emit or script-level validation' in current
    assert "The 32 Python tests are control-plane/doc-coherence tests" in current


def test_15_next_recommended_thread_is_process_amendment_qa():
    next_thread = text("docs/status/NEXT_RECOMMENDED_THREAD.md")
    assert "M02 process amendment QA - tracking fixes, process diet, validator cleanup, and ADR-0008" in next_thread
    assert "M02.05 Builder - package scaffolds + ESLint + CI baseline" in next_thread


def test_16_domain_model_does_not_hardcode_live_m02_status():
    domain_model = text("docs/DOMAIN_MODEL.md")
    assert "M02.01 through M02.20 remain `Not started`" not in domain_model
    assert "Live milestone progress is tracked in `plans/ROADMAP.md`" in domain_model


def test_17_changelog_records_m02_01_through_m02_04():
    changelog = text("CHANGELOG.md")
    assert "Completed M02.01 stack ADRs" in changelog
    assert "Completed M02.02 minimal non-domain `apps/api`" in changelog
    assert "Completed M02.03 minimal non-domain `apps/web`" in changelog
    assert "Completed M02.04 minimal non-domain `apps/worker`" in changelog


def test_18_gitignore_ignores_generated_report_binaries():
    gitignore = text(".gitignore")
    assert "reports/*.pdf" in gitignore
    assert "reports/*.xlsx" in gitignore
    assert "reports/tmp/" in gitignore


def test_19_env_example_has_no_populated_values():
    env_path = ROOT / ".env.example"
    if env_path.exists():
        for line in env_path.read_text(encoding="utf-8").splitlines():
            if "=" in line:
                assert not line.split("=", 1)[1].strip()


def test_20_github_workflows_do_not_exist_yet():
    assert not (ROOT / ".github" / "workflows").exists()


def test_21_packages_are_placeholder_only():
    for package_dir in (ROOT / "packages").iterdir():
        if package_dir.is_dir():
            assert [path.name for path in package_dir.rglob("*") if path.is_file()] == [
                "README.md"
            ]


def test_22_api_scaffold_has_no_domain_routes():
    api_source = text("apps/api/src/app.ts")
    assert ".get(" not in api_source
    assert ".post(" not in api_source
    assert ".route(" not in api_source


def test_23_web_scaffold_has_no_product_ui():
    web_source = text("apps/web/src/App.tsx")
    for term in ["MoneyEvent", "ledger", "incident", "evidence", "repair"]:
        assert term not in web_source


def test_24_worker_scaffold_has_no_jobs_or_domain_behavior():
    worker_source = text("apps/worker/src/index.ts")
    assert "jobs: []" in worker_source
    for term in ["MoneyEvent", "ledger", "invariant", "incident", "evidence", "replay", "repair"]:
        assert term.lower() not in worker_source.lower()


def test_25_adr_0008_exists_and_is_accepted():
    adr = text("docs/decisions/ADR-0008-identity-money-and-storage.md")
    assert "# ADR-0008: Identity, Money, and Storage Direction" in adr
    assert "Accepted." in adr


def test_26_adr_0008_records_id_direction():
    adr = text("docs/decisions/ADR-0008-identity-money-and-storage.md")
    for prefix in ["`rcpt_`", "`evt_`", "`txn_`", "`inc_`", "`rpl_`", "`run_`", "`prop_`", "`rev_`", "`bndl_`"]:
        assert prefix in adr
    assert "`request_id` is generated at the API edge" in adr
    assert "`correlation_id` is propagated to worker jobs" in adr


def test_27_adr_0008_records_money_direction():
    adr = text("docs/decisions/ADR-0008-identity-money-and-storage.md")
    assert "Money is stored as integer minor units" in adr
    assert "Currencies use ISO 4217 currency codes" in adr
    assert "Floats are forbidden for money" in adr


def test_28_adr_0008_records_storage_direction():
    adr = text("docs/decisions/ADR-0008-identity-money-and-storage.md")
    assert "Postgres is the planned system of record" in adr
    assert "Raw evidence bytes are stored write-once, keyed by SHA-256 content hash" in adr
    assert "Evidence receipts store hash and locator, not raw payload bodies" in adr


def test_29_adr_0008_is_indexed():
    for rel in ["docs/ACTIVE_DOCS.md", "docs/INDEX.md"]:
        assert "docs/decisions/ADR-0008-identity-money-and-storage.md" in text(rel)


def test_30_workspace_manifests_remain_minimal():
    assert "packages/*" in text("pnpm-workspace.yaml")
    assert "turbo" in text("package.json")
    assert "strict" in text("tsconfig.base.json")


def test_31_no_product_implementation_claims_in_live_status():
    for rel in ["README.md", "docs/status/CURRENT_STATE.md", "docs/status/NEXT_RECOMMENDED_THREAD.md"]:
        content = text(rel).lower()
        assert (
            "product implementation has not started" in content
            or "product domain implementation has not started" in content
        )


def test_32_validator_main_checks_pass():
    assert validator.validate() == []
