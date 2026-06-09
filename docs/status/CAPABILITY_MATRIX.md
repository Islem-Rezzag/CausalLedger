# Capability Matrix

| Capability | Status | Notes |
| --- | --- | --- |
| Repo operating system | Completed | Control-plane files only; M00.01 through M00.08 are completed and merged, M00 closeout passed, and `v0.1.0` tags the foundation |
| Domain model and scope freeze | Completed | M01 planning is complete and merged; completed M01 plan exists at `plans/completed/CLP-0002-m01-domain-model-and-scope-freeze.md`; M01.01 through M01.13 are Completed and merged; M01 closeout passed; `docs/status/M01_CLOSEOUT.md` records validation, process deviations, future work, and M02 planning readiness |
| Monorepo and local development | In progress | Active plan exists at `plans/active/CLP-0003-m02-monorepo-and-local-development-environment.md`; M02.01 and M02.02 are completed and merged, M02.03 is builder complete awaiting QA, and M02.04 through M02.20 remain Not started |
| API app foundation | Completed and merged | `apps/api` has a minimal non-domain TypeScript/Fastify scaffold; PR #39 merged into `main` at commit `8ddf5da`; no CausalLedger product routes or domain behavior |
| Web app foundation | Builder complete, awaiting QA | `apps/web` has a minimal non-domain React/Vite scaffold on branch `m02-03-create-apps-web`; no CausalLedger product UI, API calls, routing, auth/authz, database behavior, or domain behavior |
| Continuous lifecycle observer alignment | Planned direction | Documentation-only language for living causal timeline, live/replay input timing, and progressive incident certainty; no runtime implementation |
| MoneyEvent engine | Not started | No product logic |
| Ledger core | Not started | No product logic |
| Invariant engine | Not started | No product logic |
| Incident engine | Not started | No product logic |
| Causal graph | Not started | No product logic |
| Replay engine | Not started | No product logic |
| Agent runtime | Not started | No product logic |
| Repair planner | Not started | No product logic |
| UI command center | Not started | No product logic |
