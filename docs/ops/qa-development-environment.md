# QA Development Environment

## Purpose

M02.07 defines the repeatable local QA path for the completed M02 foundation. It validates repository tooling, workspace commands, control-plane coherence, and optional local infrastructure smoke checks. The historical M02 baseline does not validate CausalLedger product behavior. Current default workspace suites additionally cover implemented MoneyEvent and ledger contracts. M04.05 database guarantees require the dedicated real Postgres acceptance below.

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
- M04.05 mandatory isolated migration up/down/up and storage acceptance through `pnpm test:ledger-storage` (historical M02 used empty `pnpm migrate:up`);
- explicit storage-database public schema inspection allowing exactly three reviewed ledger tables plus `pgmigrations`; the bootstrap Compose database is inspected separately and remains empty or metadata-only;
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

- Historical M02 verdict: No product/domain behavior is implemented or validated. Current pure MoneyEvent/ledger suites provide scoped behavioral proof; they do not establish storage guarantees.
- The historical scaffold-only suite did not validate MoneyEvent schema or ledger logic. Current checks still do not prove financial invariant, incident lifecycle, evidence storage, causal graph, replay engine, repair behavior, agent runtime, product UI, auth/authz, Redis, queue, scheduler, connector, production deployment, or real secret handling is validated.
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


## M04.05 mandatory storage route

GitHub Actions `infra-smoke` already provisions disposable Postgres17. Its evolved job requires `pnpm test:ledger-storage`, not merely an empty migration smoke. The runner requires explicit `LEDGER_STORAGE_TEST_ADMIN_URL` and `LEDGER_STORAGE_TEST_DISPOSABLE=YES_M04_05_SYNTHETIC_ONLY`, verifies loopback/bootstrap/version, refuses existing test resources, creates its own named synthetic database and separate restricted identities, inspects exact public tables/functions, and runs real storage tests. Missing configuration fails, never skips; DATABASE_URL is not a fallback. Cleanup checks exact recorded identities and removes only runner-owned resources; CI always removes its own Compose resources.

`--with-docker` now runs this same mandatory storage command after its isolated Postgres becomes healthy, passing its owned bootstrap target independently of shell overrides. Standard `qa:dev` still reports Docker skipped without starting a database. That skip cannot establish M04.05 acceptance. When local Docker is unavailable, mandatory final-head CI provides real Postgres evidence; local reports stay limited to unit/type/control/workspace checks. No system installation is required for this approved remote route. See `docs/specs/ledger-immutable-storage.md` for the tested scope and acknowledgement/authority limits.
