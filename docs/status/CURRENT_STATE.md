# Current State

## Current phase

M00 Repo operating system is completed and tagged as `v0.1.0`. M01 Domain Model and Scope Freeze is completed and closed; M01.01 through M01.13 are `Completed and merged`, and M01.13 QA Domain Consistency merged at git commit `27c39b6`.

M02 Monorepo and Local Development Environment is in progress under active plan `plans/active/CLP-0003-m02-monorepo-and-local-development-environment.md`. M02 planning PR #37 merged at `18148f7`; M02.01 PR #38 merged at `fb2b901`; M02.02 PR #39 merged at `8ddf5da`; M02.03 PR #40 merged at `6ad4b0c`; M02.04 PR #41 merged at `f52396558e127e33e02c6e992d8a5f91cfe4dc0f`.

## Current submilestone and branch

Current slice: `M02 process amendment - tracking fixes, process diet, validator cleanup, and ADR-0008`.

Current branch: `m02-amendment-process-diet`.

M02.01 through M02.04 are `Completed and merged`. M02.05 through M02.07 remain `Not started`. M02.05 is now the next builder thread after this process-amendment PR merges and QA passes.

## What exists

- Active M02 plan and durable M00/M01 completed plans.
- Documentation, active docs, planning workflows, prompt templates, local skills, milestone docs, status docs, GitHub templates, versioning docs, and control-plane validation.
- Minimal non-domain TypeScript/Fastify `apps/api` scaffold.
- Minimal non-domain React/Vite `apps/web` scaffold.
- Minimal non-domain TypeScript `apps/worker` scaffold.
- Placeholder future package directories and app directories with README files only.

## What does not exist

- Product functionality or product/domain tests.
- MoneyEvent, ledger, invariant, incident, evidence-ingestion, graph, replay, agent-runtime, repair, or human-review runtime behavior.
- CausalLedger product UI, domain API routes, database implementation, storage layer, file parsers, queues, schedulers, external connectors, Docker Compose, GitHub Actions, CI workflow, auth/authz runtime, structured logging runtime, monitoring, runtime security controls, or real secrets.

## Next action

Run `M02 process amendment QA - tracking fixes, process diet, validator cleanup, and ADR-0008` after this builder branch has a PR or is ready to open one.

Next after merge: `M02.05 Builder - package scaffolds + ESLint + CI baseline`, but only after the process-amendment PR merges into `main` and post-merge tracking is finalized.

## Latest validation

- 2026-06-11 M02 process amendment builder: `python scripts/validate-control-plane.py` passed; `python -m pytest tests/test_control_plane_bootstrap.py` passed with 32 tests; `git diff --check` passed; `pnpm install`, `pnpm typecheck`, `pnpm test`, `pnpm build`, `pnpm lint`, and `pnpm format:check` passed; `make bootstrap-check` skipped because `make` is unavailable.
- 2026-06-11 M02.04 QA: `python scripts/validate-control-plane.py` passed; `python -m pytest tests/test_control_plane_bootstrap.py` passed with 32 tests; `git diff --check` passed; package validation passed; `make bootstrap-check` skipped because `make` is unavailable.
- 2026-06-09 M02.04 builder: control-plane validation, pytest, diff check, and package validation passed; `make bootstrap-check` skipped because `make` is unavailable.

## Terminology note

- Current "lint" validation before the real ESLint baseline means TypeScript no-emit or script-level validation, not full ESLint enforcement unless explicitly stated.
- The 32 Python tests are control-plane/doc-coherence tests, not CausalLedger product/domain tests.

## Product implementation status

Product implementation has not started. No product/domain behavior was implemented by M02.01, M02.02, M02.03, M02.04, or this process-amendment slice.

M03 through M21 remain `Not started`.
