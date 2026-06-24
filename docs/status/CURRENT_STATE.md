# Current State

## Current phase

M00 Repo operating system is completed and tagged as `v0.1.0`. M01 Domain Model and Scope Freeze is completed and closed; M01.01 through M01.13 are `Completed and merged`, and M01.13 QA Domain Consistency merged at git commit `27c39b6`.

M02 Monorepo and Local Development Environment is in progress under active plan `plans/active/CLP-0003-m02-monorepo-and-local-development-environment.md`. M02 planning PR #37 merged at `18148f7`; M02.01 PR #38 merged at `fb2b901`; M02.02 PR #39 merged at `8ddf5da`; M02.03 PR #40 merged at `6ad4b0c`; M02.04 PR #41 merged at `f52396558e127e33e02c6e992d8a5f91cfe4dc0f`; the M02 process amendment PR #42 merged at `d5c27c4`.

## Current submilestone and branch

Current slice: `M02.05 Builder - Package Scaffolds, ESLint, and CI Baseline`.

Current branch: `m02-05-package-scaffolds-eslint-ci`.

M02.01 through M02.04 are `Completed and merged`; the process amendment is merged. M02.05 is `Builder complete, awaiting QA`. M02.06 and M02.07 remain `Not started`.

## What exists

- Active M02 plan and durable M00/M01 completed plans.
- Documentation, active docs, planning workflows, prompt templates, local skills, milestone docs, status docs, GitHub templates, versioning docs, ADR-0008, and control-plane validation.
- Minimal non-domain TypeScript/Fastify `apps/api` scaffold.
- Minimal non-domain React/Vite `apps/web` scaffold.
- Minimal non-domain TypeScript `apps/worker` scaffold.
- Scaffold-only package boundaries for `packages/core`, `packages/events`, `packages/ledger`, `packages/invariants`, `packages/incidents`, `packages/graph`, `packages/replay`, `packages/repair`, `packages/evidence`, and `packages/evals`.
- A flat ESLint baseline for TypeScript app and package scaffolds.
- Minimal `.github/workflows/ci.yml` baseline that runs install, typecheck, lint, test, build, format check, and control-plane validation.
- Deferred app and package directories outside M02.05 still contain README files only.

## What does not exist

- Product functionality or product/domain tests.
- MoneyEvent, ledger, invariant, incident, evidence-ingestion, graph, replay, agent-runtime, repair, or human-review runtime behavior.
- CausalLedger product UI, domain API routes, database implementation, storage layer, file parsers, queues, schedulers, external connectors, Docker Compose, deployment/release workflow, auth/authz runtime, structured logging runtime, monitoring, runtime security controls, or real secrets.

## Next action

Run `M02.05 QA - Package Scaffolds, ESLint, and CI Baseline` on the same branch and PR.

Do not start M02.06 until M02.05 QA passes, the M02.05 PR merges into `main`, and post-merge tracking is finalized.

## Latest validation

- 2026-06-24 M02.05 builder: final validation passed for control-plane validation, bootstrap pytest with 40 tests, diff check, Node/npm/pnpm version checks, `pnpm install`, `pnpm typecheck`, forced ESLint plus `pnpm lint`, `pnpm test`, `pnpm build`, and `pnpm format:check`; initial package `typecheck` and `test` failed before the workspace install refreshed package links, then passed after `pnpm install`; `pnpm install` emitted the non-blocking `esbuild@0.28.0` ignored-build-scripts warning; `make bootstrap-check` skipped because `make` is unavailable in this Windows shell.
- 2026-06-24 M02 process amendment QA: validation passed and PR #42 merged at `d5c27c4`.
- 2026-06-11 M02 process amendment builder: control-plane validation, pytest with 32 tests, diff check, and package validation passed; `make bootstrap-check` skipped because `make` is unavailable.
- 2026-06-11 M02.04 QA: control-plane validation, pytest with 32 tests, diff check, and package validation passed; `make bootstrap-check` skipped because `make` is unavailable.

## Terminology note

- M02.05 introduced a real flat ESLint baseline. Earlier `lint` validation before M02.05 meant TypeScript no-emit or script-level validation, not full ESLint enforcement.
- Python tests are control-plane/doc-coherence tests, not CausalLedger product/domain tests.

## Product implementation status

Product implementation has not started. No product/domain behavior was implemented by M02.01, M02.02, M02.03, M02.04, the process amendment, or M02.05.

M03 through M21 remain `Not started`.
