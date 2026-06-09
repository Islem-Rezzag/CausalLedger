# Next Recommended Thread

Thread name: M02.03 QA - Create apps/web

Precondition:
M02.03 Builder completed on branch m02-03-create-apps-web and a PR exists or is ready to be opened.

M01 is completed and closed. M01.01 through M01.13 are `Completed and merged`, M01.13 QA Domain Consistency merged at git commit `27c39b6` (`docs: run M01.13 domain consistency QA (#35)`), and the completed M01 plan lives at `plans/completed/CLP-0002-m01-domain-model-and-scope-freeze.md`.

Current boundary:
M02.01 is `Completed and merged`. M02.02 is `Completed and merged` after PR #39 merged into `main` at commit `8ddf5da` (`chore: create M02.02 api scaffold (#39)`). M02.03 is `Builder complete, awaiting QA` on branch `m02-03-create-apps-web`. M02.04 through M02.20 remain `Not started`. M03 through M21 are `Not started`. Product domain implementation has not started. The repository has a minimal non-domain `apps/api` TypeScript/Fastify scaffold and a minimal non-domain `apps/web` React/Vite scaffold, but no product functionality, MoneyEvent runtime logic, ledger runtime logic, settlement runtime logic, reconciliation runtime logic, incident runtime logic, invariants, causal graph runtime logic, replay runtime logic, agent runtime, repair planning runtime logic, human-review runtime logic, product UI features, external connectors, CausalLedger domain API routes, databases, GitHub Actions, CI workflows, deployment, auth/authz runtime, structured logging, monitoring, runtime security controls, or product behavior exists.

Next after QA:
Merge M02.03 PR - Create apps/web, but only after M02.03 QA passes on the same branch and PR.

Do not start M02.04 until M02.03 QA passes, the M02.03 PR merges into main, and post-merge tracking is finalized.
