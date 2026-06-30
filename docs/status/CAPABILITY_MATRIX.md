# Capability Matrix

| Capability | Status | Notes |
| --- | --- | --- |
| Repo operating system | Completed | Control-plane files only; M00.01 through M00.08 are completed and merged, M00 closeout passed, and `v0.1.0` tags the foundation |
| Domain model and scope freeze | Completed | M01 planning is complete and merged; completed M01 plan exists at `plans/completed/CLP-0002-m01-domain-model-and-scope-freeze.md`; M01.01 through M01.13 are Completed and merged; M01 closeout passed; `docs/status/M01_CLOSEOUT.md` records validation, process deviations, future work, and M02 planning readiness |
| Monorepo and local development | Completed | Completed M02 plan exists at `plans/completed/CLP-0003-m02-monorepo-and-local-development-environment.md`; M02.01 through M02.07 are completed and merged, former M02.08 through M02.20 rows are deferred or absorbed, and `docs/status/M02_CLOSEOUT.md` records closeout |
| API app foundation | Completed and merged | `apps/api` has a minimal non-domain TypeScript/Fastify scaffold; PR #39 merged into `main` at commit `8ddf5da`; no CausalLedger product routes or domain behavior |
| Web app foundation | Completed and merged | `apps/web` has a minimal non-domain React/Vite scaffold merged via PR #40 at commit `6ad4b0c`; no CausalLedger product UI, API calls, routing, auth/authz, database behavior, or domain behavior |
| Worker app foundation | Completed and merged | `apps/worker` has a minimal non-domain TypeScript scaffold merged via PR #41 at commit `f52396558e127e33e02c6e992d8a5f91cfe4dc0f`; no jobs, queues, schedulers, provider connectors, database behavior, health checks, or domain behavior |
| Package scaffolds, ESLint, and CI baseline | Completed and merged | M02.05 created scaffold-only packages for core, events, ledger, invariants, incidents, graph, replay, repair, evidence, and evals; root ESLint is real ESLint; `.github/workflows/ci.yml` runs baseline validation with explicit Python dev dependencies; tests are typechecked separately from production builds; PR #43 merged at `6e76045`; no product/domain behavior |
| Local infrastructure baseline | Completed and merged | M02.06 adds local-only Docker Compose/Postgres, empty env example placeholders, `node-pg-migrate` commands, an empty migration boundary, remote infrastructure smoke validation, and `/infra/ready` process readiness only; PR #44 merged at `80ce206`; no product schema, storage behavior, Redis, queues, schedulers, or production deployment |
| QA development environment | Completed and merged | M02.07 adds `pnpm qa:dev`, `scripts/qa-dev-environment.py`, and `docs/ops/qa-development-environment.md` for repeatable standard validation and explicit Docker opt-in; QA corrected truthful dirty-worktree, repository-local identity, deterministic Docker environment, flow-control, CI proof, and behavioral-test coverage; PR #45 merged at `4a4f381`; no product/domain behavior |
| Continuous lifecycle observer alignment | Planned direction | Documentation-only language for living causal timeline, live/replay input timing, and progressive incident certainty; no runtime implementation |
| MoneyEvent engine | M03.01 Builder complete, awaiting QA | Active plan `plans/active/CLP-0004-m03-canonical-moneyevent-engine.md`; M03 planning PR #47 merged at `0606d3b21c05f2cf98397c9f5b0f1eddfa104a74`; `docs/MONEYEVENT_CONTRACT.md` exists as conceptual documentation only; M03.02 through M03.06 are not started; no MoneyEvent runtime, TypeScript type, schema, parser, validator, normalizer, storage, fixture, simulator data, API, UI, or product behavior |
| Ledger core | Not started | No product logic |
| Invariant engine | Not started | No product logic |
| Incident engine | Not started | No product logic |
| Causal graph | Not started | No product logic |
| Replay engine | Not started | No product logic |
| Agent runtime | Not started | No product logic |
| Repair planner | Not started | No product logic |
| UI command center | Not started | No product logic |
