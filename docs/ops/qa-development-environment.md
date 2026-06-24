# QA Development Environment

## Purpose

M02.07 defines the repeatable local QA path for the completed M02 foundation. It validates repository tooling, workspace commands, control-plane coherence, and optional local infrastructure smoke checks. It does not validate CausalLedger product behavior because product behavior does not exist yet.

## Prerequisites

- Python 3 with `pytest` available from `requirements-dev.txt`.
- Node.js, npm, and pnpm through the workspace package manager version.
- Git with a repository-local `user.name` and `user.email`. Global Git identity is not sufficient for M02.07 QA.
- Docker and Docker Compose only when running the explicit Docker path.

Do not configure real secrets for M02.07. `.env.example` values must remain empty.

## First-Time Setup

Install Python development dependencies:

```powershell
python -m pip install -r requirements-dev.txt
```

Install workspace dependencies reproducibly:

```powershell
pnpm install --frozen-lockfile
```

Configure repository-local Git identity before committing:

```powershell
git config user.name "Mohamed Islem Rezzag Baara"
git config user.email "Islem-Rezzag@users.noreply.github.com"
```

The QA command reads identity with `git config --local --get`. A global value may be useful for other repositories, but it does not prove this repository will commit with the required no-reply identity.

No commit or trailer should use the disallowed institutional email domain named in the M02.07 prompt.

## Standard Validation

Run the default QA development command:

```powershell
pnpm qa:dev
```

The default command is non-destructive. It does not start Docker, create databases, run migrations against local services, or modify product state. It reports `PASS`, `FAIL`, and `SKIPPED` with reasons.

The default command fails when `git status --short` reports a dirty worktree. Final QA and pre-merge validation require a clean worktree so the command result corresponds to the committed PR state.

Intermediate development checks may use:

```powershell
pnpm qa:dev -- --allow-dirty
```

Allowed dirty mode is reported as `SKIPPED` for the clean-worktree requirement and must not be used as final QA evidence.

The default path checks:

- Python, Node, npm, and pnpm availability;
- Git branch, worktree state, remote, and repository-local identity;
- Python dev dependency availability;
- frozen pnpm install;
- typecheck, ESLint, tests, build, and formatting;
- control-plane validation and control-plane pytest;
- `git diff --check`;
- Docker validation as skipped unless explicitly requested.

## Docker Validation

Run Docker validation only when local Docker is available and you want stateful local infrastructure smoke coverage:

```powershell
python scripts/qa-dev-environment.py --with-docker
```

With pnpm:

```powershell
pnpm qa:dev -- --with-docker
```

The Docker path checks:

- Docker version;
- Docker Compose version;
- Compose configuration;
- local Postgres start and health;
- empty migration smoke through `pnpm migrate:up`;
- public schema inspection that allows only no tables or `pgmigrations`;
- cleanup through `docker compose down -v`.

The script uses a unique Compose project name and a temporary local host port. The cleanup path always runs for resources created by the script.

Docker mode sets its own QA database name, user, password, host, port, and `DATABASE_URL` before Compose and migration commands run. Shell-level overrides for `CAUSALLEDGER_POSTGRES_DB`, `CAUSALLEDGER_POSTGRES_USER`, `CAUSALLEDGER_POSTGRES_PASSWORD`, `CAUSALLEDGER_POSTGRES_HOST`, or `DATABASE_URL` must not change the QA Docker target. The local-only QA password is not printed in normal command output.

## What Checks Prove

- Tool checks prove required local tools can be invoked.
- `pnpm install --frozen-lockfile` proves dependencies can be installed from the lockfile without changing it.
- Typecheck, lint, test, build, and format checks prove the current scaffold commands run.
- Control-plane validation proves active docs, registry, status, scaffolds, env placeholders, CI shape, and forbidden-scope checks remain coherent.
- Docker validation proves the local Compose/Postgres/migration boundary can smoke run and clean up.

## What Checks Do Not Prove

- No product/domain behavior is implemented or validated.
- No MoneyEvent schema, ledger logic, financial invariant, incident lifecycle, evidence storage, causal graph, replay engine, repair behavior, agent runtime, product UI, auth/authz, Redis, queue, scheduler, connector, production deployment, or real secret handling is validated.
- `/infra/ready` remains process-only readiness and does not prove database readiness, migration readiness, product health, evidence availability, or financial correctness.

## Common Failures And Safe Recovery

- Missing `pytest`: run `python -m pip install -r requirements-dev.txt`.
- Missing pnpm: enable Corepack and activate the pinned pnpm version from `package.json`.
- Dirty worktree: inspect `git status --short`; do not discard unrelated user changes.
- Frozen install failure: do not rewrite the lockfile unless the active slice explicitly includes dependency changes.
- Docker unavailable: run the standard command and rely on GitHub Actions `infra-smoke` evidence for Docker/Postgres coverage.
- Docker smoke failure: run `docker compose down -v` with the project shown by the script if cleanup fails, then inspect Docker logs before retrying.

## CI Relationship

`.github/workflows/ci.yml` configures repository-local test identity and runs `pnpm qa:dev` on Linux. It also keeps the individual standard workspace checks visible. Its `infra-smoke` job provides remote Docker/Postgres/migration evidence when local Docker is unavailable.

Local QA remains useful before opening PRs because it catches environment, formatting, and control-plane issues before CI runs.

## Boundary

M02.07 is a QA environment slice only. It does not start M03, does not implement MoneyEvent behavior, and does not create product/domain runtime capabilities.
