# ADR-0006: Local Development and CI Baseline

## Status

Accepted for M02.01 stack implications. Detailed local services, health checks, migrations, and CI automation remain deferred to their scoped M02 submilestones.

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
- Keep CI workflow creation deferred to M02.19.

## Planning Constraints

- Do not create `.github/workflows/` in this submilestone.
- Do not claim CI/CD exists before M02.19 implements and validates its scope.
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

These commands are direction only until the relevant manifests are created by later submilestones.

## Deferred Work

- `apps/api`, `apps/web`, and `apps/worker` manifests were created in M02.02 through M02.04 as minimal non-domain scaffolds.
- `apps/agent-runtime` is deferred to the M10 era.
- Shared package manifests are deferred to redefined M02.05.
- ESLint baseline and any GitHub Actions workflow are deferred to redefined M02.05.
- Postgres local development, Docker Compose, migrations, and health-check stubs are deferred to redefined M02.06.
- Redis local development is deferred until a queue or scheduler design proves the need.

## Next Step

Use this ADR as the local-development constraint set for M02.02 through M02.19. Do not start M02.02 until M02.01 QA passes, the M02.01 PR merges, and post-merge tracking is finalized.
