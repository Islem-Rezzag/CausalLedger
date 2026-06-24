from __future__ import annotations

import argparse
import os
import shutil
import socket
import subprocess
import sys
import time
from dataclasses import dataclass
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
FORBIDDEN_EMAIL_DOMAIN = "qmul" + ".ac.uk"

FORBIDDEN_PRODUCT_TABLES = {
    "money_events",
    "ledger_entries",
    "ledger_transactions",
    "balances",
    "invariant_results",
    "incidents",
    "evidence_receipts",
    "evidence_bundles",
    "graph_nodes",
    "graph_edges",
    "replay_sessions",
    "repair_proposals",
    "agent_runs",
}


@dataclass
class Result:
    status: str
    name: str
    detail: str


class Reporter:
    def __init__(self) -> None:
        self.results: list[Result] = []

    def pass_(self, name: str, detail: str) -> bool:
        self._record("PASS", name, detail)
        return True

    def fail(self, name: str, detail: str) -> bool:
        self._record("FAIL", name, detail)
        return False

    def skip(self, name: str, detail: str) -> bool:
        self._record("SKIPPED", name, detail)
        return True

    def _record(self, status: str, name: str, detail: str) -> None:
        self.results.append(Result(status, name, detail))
        print(f"[{status}] {name}: {detail}")

    def failed(self) -> bool:
        return any(result.status == "FAIL" for result in self.results)

    def summary(self) -> None:
        counts = {status: 0 for status in ["PASS", "FAIL", "SKIPPED"]}
        for result in self.results:
            counts[result.status] += 1
        print(
            "\nSummary: "
            f"{counts['PASS']} PASS, {counts['FAIL']} FAIL, {counts['SKIPPED']} SKIPPED"
        )


def display_command(args: list[str]) -> str:
    return " ".join(args)


def resolve_command(args: list[str]) -> tuple[list[str] | None, str | None]:
    executable = args[0]
    if Path(executable).is_absolute() or os.sep in executable:
        return args, None
    resolved = shutil.which(executable)
    if resolved is None:
        return None, f"required command not found: {executable}"
    return [resolved, *args[1:]], None


def run_capture(
    args: list[str],
    *,
    env: dict[str, str] | None = None,
    timeout_seconds: int | None = None,
) -> subprocess.CompletedProcess[str] | None:
    resolved, error = resolve_command(args)
    if error is not None or resolved is None:
        return None

    merged_env = os.environ.copy()
    if env:
        merged_env.update(env)

    return subprocess.run(
        resolved,
        cwd=ROOT,
        env=merged_env,
        text=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        timeout=timeout_seconds,
        check=False,
    )


def run_check(
    reporter: Reporter,
    name: str,
    args: list[str],
    *,
    env: dict[str, str] | None = None,
    timeout_seconds: int | None = None,
) -> bool:
    resolved, error = resolve_command(args)
    if error is not None or resolved is None:
        return reporter.fail(name, error or "command resolution failed")

    merged_env = os.environ.copy()
    if env:
        merged_env.update(env)

    try:
        completed = subprocess.run(
            resolved,
            cwd=ROOT,
            env=merged_env,
            text=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            timeout=timeout_seconds,
            check=False,
        )
    except subprocess.TimeoutExpired:
        return reporter.fail(
            name,
            f"timed out after {timeout_seconds} seconds: {display_command(args)}",
        )

    output = completed.stdout.strip()
    if completed.returncode == 0:
        detail = output.splitlines()[0] if output else display_command(args)
        return reporter.pass_(name, detail)

    print(output)
    return reporter.fail(
        name,
        f"exit {completed.returncode}: {display_command(args)}",
    )


def check_git_state(reporter: Reporter) -> None:
    branch = run_capture(["git", "branch", "--show-current"])
    if branch is None or branch.returncode != 0:
        reporter.fail("Git branch", "could not read current branch")
    else:
        reporter.pass_("Git branch", branch.stdout.strip() or "<detached>")

    status = run_capture(["git", "status", "--short"])
    if status is None or status.returncode != 0:
        reporter.fail("Git worktree state", "could not read worktree status")
    else:
        status_text = status.stdout.strip()
        if status_text:
            reporter.pass_(
                "Git worktree state",
                "dirty; scoped changes should be reviewed before commit",
            )
            print(status_text)
        else:
            reporter.pass_("Git worktree state", "clean")

    remote = run_capture(["git", "remote", "-v"])
    if remote is None or remote.returncode != 0:
        reporter.fail("Git remote", "could not read remotes")
    elif "origin" not in remote.stdout:
        reporter.fail("Git remote", "origin remote is not configured")
    else:
        first_line = remote.stdout.strip().splitlines()[0]
        reporter.pass_("Git remote", first_line)

    user_name = run_capture(["git", "config", "--get", "user.name"])
    user_email = run_capture(["git", "config", "--get", "user.email"])
    if (
        user_name is None
        or user_email is None
        or user_name.returncode != 0
        or user_email.returncode != 0
    ):
        reporter.fail("Repository-local Git identity", "user.name or user.email is missing")
        return

    name = user_name.stdout.strip()
    email = user_email.stdout.strip()
    if FORBIDDEN_EMAIL_DOMAIN in email.lower():
        reporter.fail(
            "Repository-local Git identity",
            "forbidden institutional email domain configured",
        )
    elif not name or not email:
        reporter.fail("Repository-local Git identity", "user.name or user.email is empty")
    else:
        reporter.pass_("Repository-local Git identity", f"{name} <{email}>")


def check_tool_versions(reporter: Reporter) -> None:
    reporter.pass_(
        "Python version",
        f"{sys.version_info.major}.{sys.version_info.minor}.{sys.version_info.micro}",
    )
    run_check(reporter, "Node version", ["node", "--version"])
    run_check(reporter, "npm version", ["npm", "--version"])
    run_check(reporter, "pnpm version", ["pnpm", "--version"])


def check_standard_environment(reporter: Reporter) -> None:
    run_check(reporter, "Python dev dependency availability", [sys.executable, "-m", "pytest", "--version"])
    run_check(reporter, "Frozen pnpm installation", ["pnpm", "install", "--frozen-lockfile"])
    run_check(reporter, "Typecheck", ["pnpm", "typecheck"])
    run_check(reporter, "ESLint", ["pnpm", "lint"])
    run_check(reporter, "Tests", ["pnpm", "test"])
    run_check(reporter, "Build", ["pnpm", "build"])
    run_check(reporter, "Formatting", ["pnpm", "format:check"])
    run_check(reporter, "Control-plane validation", [sys.executable, "scripts/validate-control-plane.py"])
    run_check(
        reporter,
        "Control-plane pytest",
        [sys.executable, "-m", "pytest", "tests/test_control_plane_bootstrap.py"],
    )
    run_check(reporter, "Git diff whitespace check", ["git", "diff", "--check"])


def find_local_port() -> int:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        sock.bind(("127.0.0.1", 0))
        return int(sock.getsockname()[1])


def docker_compose_args(project: str, *args: str) -> list[str]:
    return ["docker", "compose", "-p", project, *args]


def wait_for_postgres_health(
    reporter: Reporter,
    project: str,
    env: dict[str, str],
) -> bool:
    for _attempt in range(30):
        container = run_capture(docker_compose_args(project, "ps", "-q", "postgres"), env=env)
        container_id = container.stdout.strip() if container and container.returncode == 0 else ""
        if container_id:
            health = run_capture(
                ["docker", "inspect", "--format={{.State.Health.Status}}", container_id],
                env=env,
            )
            status = health.stdout.strip() if health and health.returncode == 0 else ""
            if status == "healthy":
                return reporter.pass_("Postgres health", "postgres container is healthy")
            if status == "unhealthy":
                run_check(reporter, "Postgres logs", docker_compose_args(project, "logs", "postgres"), env=env)
                return reporter.fail("Postgres health", "postgres container became unhealthy")
        time.sleep(2)
    run_check(reporter, "Postgres compose status", docker_compose_args(project, "ps"), env=env)
    run_check(reporter, "Postgres logs", docker_compose_args(project, "logs", "postgres"), env=env)
    return reporter.fail("Postgres health", "timed out waiting for healthy status")


def inspect_schema(reporter: Reporter, project: str, env: dict[str, str]) -> bool:
    completed = run_capture(
        docker_compose_args(
            project,
            "exec",
            "-T",
            "postgres",
            "psql",
            "-U",
            "causalledger",
            "-d",
            "causalledger_dev",
            "-Atc",
            "select tablename from pg_tables where schemaname = 'public' order by tablename;",
        ),
        env=env,
    )
    if completed is None:
        return reporter.fail("Postgres schema inspection", "docker command is unavailable")
    if completed.returncode != 0:
        print(completed.stdout.strip())
        return reporter.fail("Postgres schema inspection", "could not inspect public schema")

    tables = {line.strip() for line in completed.stdout.splitlines() if line.strip()}
    forbidden = sorted(tables & FORBIDDEN_PRODUCT_TABLES)
    if forbidden:
        return reporter.fail(
            "Postgres schema inspection",
            "forbidden product/domain tables found: " + ", ".join(forbidden),
        )
    unexpected = sorted(table for table in tables if table != "pgmigrations")
    if unexpected:
        return reporter.fail(
            "Postgres schema inspection",
            "unexpected public schema tables found: " + ", ".join(unexpected),
        )
    detail = "no public tables" if not tables else "allowed metadata tables: " + ", ".join(sorted(tables))
    return reporter.pass_("Postgres schema inspection", detail)


def check_docker_environment(reporter: Reporter, *, with_docker: bool) -> None:
    if not with_docker:
        reporter.skip("Docker validation", "not requested; run with --with-docker for Compose/Postgres checks")
        return

    if not run_check(reporter, "Docker version", ["docker", "--version"]):
        return
    if not run_check(reporter, "Docker Compose version", ["docker", "compose", "version"]):
        return

    project = f"causalledger-qa-{os.getpid()}"
    port = find_local_port()
    docker_env = {
        "CAUSALLEDGER_POSTGRES_PORT": str(port),
    }
    migration_env = {
        **docker_env,
        "DATABASE_URL": (
            "postgres://causalledger:causalledger_local_password"
            f"@127.0.0.1:{port}/causalledger_dev"
        ),
    }

    try:
        run_check(
            reporter,
            "Docker Compose configuration",
            docker_compose_args(project, "config"),
            env=docker_env,
        )
        started = run_check(
            reporter,
            "Postgres start",
            docker_compose_args(project, "up", "-d", "postgres"),
            env=docker_env,
        )
        if started and wait_for_postgres_health(reporter, project, docker_env):
            run_check(reporter, "Migration smoke", ["pnpm", "migrate:up"], env=migration_env)
            inspect_schema(reporter, project, docker_env)
    finally:
        run_check(
            reporter,
            "Docker cleanup",
            docker_compose_args(project, "down", "-v"),
            env=docker_env,
        )


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Run the CausalLedger M02 QA development environment checks."
    )
    parser.add_argument(
        "--with-docker",
        action="store_true",
        help="Run explicit Docker Compose/Postgres/migration smoke validation.",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    reporter = Reporter()

    print("CausalLedger QA development environment")
    print(f"Repository: {ROOT}")
    print(f"Docker mode: {'enabled' if args.with_docker else 'disabled'}\n")

    check_tool_versions(reporter)
    check_git_state(reporter)
    check_standard_environment(reporter)
    check_docker_environment(reporter, with_docker=args.with_docker)
    reporter.summary()

    return 1 if reporter.failed() else 0


if __name__ == "__main__":
    raise SystemExit(main())
