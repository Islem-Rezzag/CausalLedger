# Current State

## Current phase

M00 Repo operating system is completed and tagged as `v0.1.0`. M01 Domain Model and Scope Freeze is completed and closed; M01.01 through M01.13 are `Completed and merged`, and M01.13 QA Domain Consistency merged at git commit `27c39b6`.

M02 Monorepo and Local Development Environment is in progress under active plan `plans/active/CLP-0003-m02-monorepo-and-local-development-environment.md`. M02 planning PR #37 merged at `18148f7`; M02.01 PR #38 merged at `fb2b901`; M02.02 PR #39 merged at `8ddf5da`; M02.03 PR #40 merged at `6ad4b0c`; M02.04 PR #41 merged at `f52396558e127e33e02c6e992d8a5f91cfe4dc0f`; the M02 process amendment PR #42 merged at `d5c27c4`; M02.05 PR #43 merged at `6e76045`.

## Current submilestone and branch

Current slice: `M02.06 Builder - Local Infrastructure: Docker Compose, Postgres, Migration Tool, and Health-Check Stubs`.

Current branch: `m02-06-local-infra-postgres-migrations-health`.

M02.01 through M02.05 are `Completed and merged`. M02.06 is `Builder complete, awaiting QA`. M02.07 remains `Not started`.

## What exists

- Active M02 plan and durable M00/M01 completed plans.
- Minimal non-domain `apps/api`, `apps/web`, and `apps/worker` scaffolds.
- Scaffold-only package boundaries for the ten M02.05 packages, with source and test TypeScript configs.
- Flat ESLint, baseline CI, and explicit Python dev dependencies for control-plane tests.
- Local-only Docker Compose/Postgres, empty local env placeholders, `node-pg-migrate` commands, an empty migration boundary, and `/infra/ready` infrastructure readiness stub.

## What does not exist

- Product functionality or product/domain tests.
- MoneyEvent, ledger, invariant, incident, evidence-ingestion, graph, replay, agent-runtime, repair, or human-review runtime behavior.
- Product database schema, product storage layer, domain API routes, product UI, queues, schedulers, Redis, external connectors, deployment/release workflow, auth/authz runtime, structured logging runtime, monitoring, runtime security controls, or real secrets.

## Next action

Run `M02.06 QA - Local Infrastructure: Docker Compose, Postgres, Migration Tool, and Health-Check Stubs` on the same branch and PR.

Do not start M02.07 until M02.06 QA passes, the M02.06 PR merges, and post-merge tracking is finalized.

## Latest validation

- 2026-06-24 M02.06 builder: `python scripts/validate-control-plane.py`, `python -m pytest tests/test_control_plane_bootstrap.py` with 54 tests, `git diff --check`, Node/npm/pnpm version checks, `pnpm install --frozen-lockfile`, `pnpm typecheck`, `pnpm lint`, `pnpm test`, `pnpm build`, and `pnpm format:check` passed.
- Docker validation was skipped because `docker` is unavailable in the current Windows shell. `make bootstrap-check` was skipped because `make` is unavailable; direct Python validation passed.
- 2026-06-24 M02.05 QA: PR #43 local validation passed after scoped fixes for explicit Python CI dependency installation and test TypeScript coverage; GitHub Actions CI passed; PR #43 merged at `6e76045`.

## Terminology note

- `/infra/ready` is an infrastructure readiness stub, not product health behavior.
- Python tests are control-plane/doc-coherence tests, not CausalLedger product/domain tests.

## Product implementation status

Product implementation has not started. No product/domain behavior was implemented by M02.01 through M02.06.

M03 through M21 remain `Not started`.
