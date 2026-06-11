# Next Recommended Thread

Thread name: Merge M02.04 PR - Create apps/worker

Precondition:
M02.04 QA passed on branch `m02-04-create-apps-worker` and PR #41 is ready for human merge.

M01 is completed and closed. M01.01 through M01.13 are `Completed and merged`, M01.13 QA Domain Consistency merged at git commit `27c39b6` (`docs: run M01.13 domain consistency QA (#35)`), and the completed M01 plan lives at `plans/completed/CLP-0002-m01-domain-model-and-scope-freeze.md`.

Current boundary:
M02.01 is `Completed and merged`. M02.02 is `Completed and merged` after PR #39 merged into `main` at commit `8ddf5da` (`chore: create M02.02 api scaffold (#39)`). M02.03 is `Completed and merged` after PR #40 merged into `main` at commit `6ad4b0c` (`chore: create M02.03 web scaffold (#40)`). M02.04 is `QA passed, awaiting merge` on branch `m02-04-create-apps-worker` for PR #41. M02.05 through M02.20 remain `Not started`. M03 through M21 are `Not started`. Product domain implementation has not started. The repository has minimal non-domain `apps/api`, `apps/web`, and `apps/worker` scaffolds, but no product functionality, MoneyEvent runtime logic, ledger runtime logic, settlement runtime logic, reconciliation runtime logic, incident runtime logic, invariants, causal graph runtime logic, replay runtime logic, agent runtime, repair planning runtime logic, human-review runtime logic, product UI features, external connectors, CausalLedger domain API routes, databases, queues, schedulers, GitHub Actions, CI workflows, deployment, auth/authz runtime, structured logging, monitoring, runtime security controls, health checks, or product behavior exists.

Next after merge:
M02 process amendment - tracking fixes, process diet, validator cleanup, and ADR-0008, but only after the M02.04 PR is merged into `main` and post-merge tracking is finalized.

Do not mark M02.04 `Completed and merged` until the PR actually merges into `main`.

Do not start M02.05 or the process amendment until PR #41 merges into `main` and post-merge tracking is finalized.
