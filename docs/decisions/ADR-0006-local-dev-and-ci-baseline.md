# ADR-0006: Local Development and CI Baseline

## Status

Accepted for M02 local development direction. Package scaffolds, real ESLint enforcement, and the baseline GitHub Actions CI workflow were implemented in M02.05. Local-only Postgres, Docker Compose, migration tooling, a process readiness stub, and remote infrastructure smoke validation were implemented in M02.06 without product storage behavior. M02.07 adds a repeatable QA development environment command and guide for validating the M02 foundation without product/domain behavior.

Legacy validation marker retained from the original M02 planning placeholder: Planning placeholder.

## Context

M02 must define local development commands, local services, health checks, migrations, and a baseline validation path before future product packages depend on them.

M02.01 chooses the tooling direction but does not create a runnable product environment. Later M02 slices must turn this direction into concrete manifests, scripts, services, and checks.

## Decision

The local development direction is:

- Use pnpm workspaces as the future workspace and dependency-management layer.
- Use Turborepo as the future monorepo task runner.
- Keep future package and app scripts explicit, with likely commands for `dev`, `build`, `test`, `lint`, `format`, and `typecheck` once manifests exist.
- Keep control-plane validation available through the existing Python commands while product packages do not exist.
- Add Vitest-based package tests when TypeScript packages are created.
- Add ESLint and Prettier checks when TypeScript manifests are created.
- Keep `.env.example` values empty and never commit real secrets.
- Add a minimal CI workflow in M02.05 after package scaffolds and real lint scripts exist.
- Add local-only Docker Compose/Postgres, migration commands, and infrastructure readiness stubs in M02.06 without product schema or production deployment.

## Planning Constraints

- Keep `.github/workflows/ci.yml` minimal in M02.05.
- Do not claim deployment, release automation, production jobs, secrets, environments, databases, Docker, or Redis exist because the CI baseline exists.
- Do not create `package.json`, `pnpm-workspace.yaml`, `turbo.json`, `pnpm-lock.yaml`, app manifests, package manifests, or dependency installs in M02.01.
- Keep validation commands explicit and reproducible.
- Keep future product directories as placeholders until their scoped M02 submilestones begin.

## Future Command Direction

Future M02 implementation should prefer a small command surface such as:

- `pnpm install` for dependency installation after manifests exist.
- `pnpm dev` for local app and service development after apps exist.
- `pnpm test` for package and app tests after runtime code exists.
- `pnpm lint` and `pnpm format:check` for linting and formatting once configured.
- `pnpm typecheck` for TypeScript type validation once packages exist.
- Existing Python control-plane validation commands for docs, status, registry, and bootstrap tests.

These commands are implemented for the current app scaffolds and M02.05 package scaffolds. Future product packages must add deterministic tests before product behavior can be claimed.

M02.05 QA added explicit test TypeScript configurations and `typecheck:test` scripts so tests are typechecked without being included in production build output.

## M02.05 CI Baseline

M02.05 creates `.github/workflows/ci.yml` with pull request and `main` push triggers.

The workflow uses:

- Node.js 22;
- pnpm through Corepack pinned to the workspace package manager version;
- Python 3.12 for control-plane validation.
- `requirements-dev.txt` for explicit Python dev dependencies invoked by CI.

The workflow runs:

- `pnpm install --frozen-lockfile`;
- `pnpm typecheck`;
- `pnpm lint`;
- `pnpm test`;
- `pnpm build`;
- `pnpm format:check`;
- `python scripts/validate-control-plane.py`;
- `python -m pytest tests/test_control_plane_bootstrap.py`.

This CI baseline does not deploy, release, provision databases, run Docker, use Redis, read secrets, or perform production work.

## M02.06 Local Infrastructure Baseline

M02.06 creates root `docker-compose.yml` for a single local Postgres service bound to `127.0.0.1` by default.

The local infrastructure baseline uses:

- empty `.env.example` values for local overrides;
- root `infra:up`, `infra:down`, and `infra:reset` scripts for Docker Compose;
- `node-pg-migrate` as the lightweight TypeScript/Postgres migration tool;
- root `migrate:up` and `migrate:down` scripts using `DATABASE_URL`;
- `infra/migrations/` as an empty migration boundary with documentation only;
- `/infra/ready` as an API process readiness stub that returns `process-ready` and explicitly marks database and migrations as not checked;
- a GitHub Actions `infra-smoke` job for Compose config, Postgres health, empty migration execution, public schema inspection, and cleanup.

The Compose service intentionally avoids a fixed `container_name` so Docker Compose can namespace containers per checkout.

This baseline does not create product database schema, domain tables, storage behavior, production deployment, Redis, queues, schedulers, external connectors, real secrets, or product health behavior.

## M02.07 QA Development Environment

M02.07 creates `scripts/qa-dev-environment.py`, root `pnpm qa:dev`, and `docs/ops/qa-development-environment.md`.

The default QA command is non-destructive and runs the existing standard checks:

- tool availability and versions for Python, Node, npm, and pnpm;
- Git branch, worktree state, remote, and repository-local identity reporting;
- Python dev dependency availability;
- `pnpm install --frozen-lockfile`;
- `pnpm typecheck`, `pnpm lint`, `pnpm test`, `pnpm build`, and `pnpm format:check`;
- `python scripts/validate-control-plane.py`;
- `python -m pytest tests/test_control_plane_bootstrap.py`;
- `git diff --check`.

Docker/Postgres/migration smoke validation requires explicit `--with-docker` opt-in and uses cleanup with `docker compose down -v` for the resources it creates.

This QA environment does not implement or validate product/domain behavior.

## Deferred Work

- `apps/api`, `apps/web`, and `apps/worker` manifests were created in M02.02 through M02.04 as minimal non-domain scaffolds.
- `apps/agent-runtime` is deferred to the M10 era.
- Shared package manifests were created in redefined M02.05 as scaffold-only package boundaries.
- ESLint baseline and the baseline GitHub Actions workflow were created in redefined M02.05.
- Postgres local development, Docker Compose, migrations, and health-check stubs were created in redefined M02.06 as local infrastructure only.
- QA development environment orchestration was created in redefined M02.07.
- Redis local development is deferred until a queue or scheduler design proves the need.

## Next Step

Use this ADR as the local-development constraint set for M02 closeout and future milestone setup. Do not start M02 closeout until M02.07 QA passes, the M02.07 PR merges, and post-merge tracking is finalized.
