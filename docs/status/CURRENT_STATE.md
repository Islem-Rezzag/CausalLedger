# Current State

## Current phase

M00 Repo operating system is completed and tagged as `v0.1.0`. M01 Domain Model and Scope Freeze is completed and closed; M01.01 through M01.13 are `Completed and merged`, and M01.13 QA Domain Consistency merged at git commit `27c39b6`.

M02 Monorepo and Local Development Environment is in progress under active plan `plans/active/CLP-0003-m02-monorepo-and-local-development-environment.md`. M02 planning PR #37 merged at `18148f7`; M02.01 PR #38 merged at `fb2b901`; M02.02 PR #39 merged at `8ddf5da`; M02.03 PR #40 merged at `6ad4b0c`; M02.04 PR #41 merged at `f52396558e127e33e02c6e992d8a5f91cfe4dc0f`; the M02 process amendment PR #42 merged at `d5c27c4`; M02.05 PR #43 merged at `6e76045`; M02.06 PR #44 merged at `80ce206`.

## Current submilestone and branch

Current slice: `M02.07 Builder - QA Development Environment`.

Current branch: `m02-07-qa-development-environment`.

M02.01 through M02.06 are `Completed and merged`. M02.07 is `Builder complete, awaiting QA`.

## What exists

- Active M02 plan and durable M00/M01 completed plans.
- Minimal non-domain `apps/api`, `apps/web`, and `apps/worker` scaffolds.
- Scaffold-only package boundaries for the ten M02.05 packages, with source and test TypeScript configs.
- Flat ESLint, baseline CI, and explicit Python dev dependencies for control-plane tests.
- Local-only Docker Compose/Postgres, empty local env placeholders, `node-pg-migrate` commands, an empty migration boundary, remote infrastructure smoke validation, and `/infra/ready` process readiness stub.
- M02.07 QA development environment command `pnpm qa:dev`, explicit Docker opt-in through `scripts/qa-dev-environment.py --with-docker`, and `docs/ops/qa-development-environment.md`.

## What does not exist

- Product functionality or product/domain tests.
- MoneyEvent, ledger, invariant, incident, evidence-ingestion, graph, replay, agent-runtime, repair, or human-review runtime behavior.
- Product database schema, product storage layer, domain API routes, product UI, queues, schedulers, Redis, external connectors, deployment/release workflow, auth/authz runtime, structured logging runtime, monitoring, runtime security controls, or real secrets.

## Next action

Run `M02.07 QA - QA Development Environment` on branch `m02-07-qa-development-environment`.

Do not start M02 closeout until M02.07 QA passes, the M02.07 PR merges into `main`, and post-merge tracking is finalized.

## Latest validation

- 2026-06-24 M02.07 Builder: `python scripts/validate-control-plane.py`, `python -m pytest tests/test_control_plane_bootstrap.py` with 62 tests, `git diff --check`, Node/npm/pnpm version checks, `pnpm install --frozen-lockfile`, `pnpm typecheck`, `pnpm lint`, `pnpm test`, `pnpm build`, `pnpm format:check`, and `pnpm qa:dev` passed. `pnpm qa:dev` reported 18 `PASS`, 0 `FAIL`, and 1 `SKIPPED`; Docker validation was skipped in default mode by design. Local Docker and `make bootstrap-check` are unavailable in this Windows shell.
- 2026-06-24 M02.06 QA: `python scripts/validate-control-plane.py`, `python -m pytest tests/test_control_plane_bootstrap.py` with 57 tests, `git diff --check`, Node/npm/pnpm version checks, `pnpm install --frozen-lockfile`, `pnpm typecheck`, `pnpm lint`, `pnpm test`, `pnpm build`, and `pnpm format:check` passed. Remote GitHub Actions `infra-smoke` passed before PR #44 merged.

## Terminology note

- `/infra/ready` is a process readiness stub with database and migrations explicitly not checked; it is not product health behavior.
- `pnpm qa:dev` validates the M02 development foundation. It is not product/domain QA.
- Python tests are control-plane/doc-coherence tests, not CausalLedger product/domain tests.

## Product implementation status

Product implementation has not started. No product/domain behavior was implemented by M02.01 through M02.07.

M03 through M21 remain `Not started`.
