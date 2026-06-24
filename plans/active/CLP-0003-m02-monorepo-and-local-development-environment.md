# CLP-0003 M02 Monorepo and Local Development Environment

## Purpose / Big Picture

Plan the local development foundation for CausalLedger before any M02 implementation submilestone begins.

M02 should make the repository ready for product implementation by choosing a coherent monorepo direction, app and package layout, local services, validation conventions, and control-plane expectations. This planning thread is documentation and tracking work only.

M02 planning also aligns CausalLedger's product direction with the continuous payment lifecycle observer framing: CausalLedger is a continuous payment lifecycle observability and incident-response system that builds a living causal timeline from provider events, webhooks, ledger entries, settlement files, bank evidence, refunds, and chargebacks. It can ingest evidence as it arrives, flag suspected breaks early, and later confirm, dismiss, resolve, or keep incidents unresolved as settlement and bank evidence becomes available.

The original M02 planning thread did not start M02.01 implementation and did not create product behavior.

M02.01 is `Completed and merged` after PR #38 merged into `main` at commit `fb2b901` (`docs: M02.01 choose backend and frontend stack (#38)`). M02.02 Create apps/api is `Completed and merged` after PR #39 merged into `main` at commit `8ddf5da` (`chore: create M02.02 api scaffold (#39)`). M02.03 Create apps/web is `Completed and merged` after PR #40 merged into `main` at commit `6ad4b0c` (`chore: create M02.03 web scaffold (#40)`). M02.04 Create apps/worker is `Completed and merged` after PR #41 merged into `main` at commit `f52396558e127e33e02c6e992d8a5f91cfe4dc0f` (`chore: create M02.04 worker scaffold (#41)`). The M02 process amendment PR #42 merged into `main` at commit `d5c27c4` (`docs: amend M02 process tracking and validation (#42)`). M02.05 is `Completed and merged` after PR #43 merged into `main` at commit `6e76045` (`chore: create M02.05 package ESLint and CI baseline (#43)`). M02.06 is `Completed and merged` after PR #44 merged into `main` at commit `80ce206` (`chore: create M02.06 local infra baseline (#44)`). The current slice is `M02.07 QA - QA Development Environment` on branch `m02-07-qa-development-environment`.

## Progress

- [x] 2026-06-02: Confirmed branch `m02-planning-monorepo-and-local-development-environment`.
- [x] 2026-06-02: Confirmed `git status --short` was clean before edits.
- [x] 2026-06-02: Confirmed remote `origin` points to `https://github.com/Islem-Rezzag/CausalLedger.git`.
- [x] 2026-06-02: Confirmed recent history shows M01 closeout merged at `0d58f04` and M01.13 merged at `27c39b6`.
- [x] 2026-06-02: Confirmed tag `v0.1.0` exists.
- [x] 2026-06-02: Confirmed no active `CLP-*.md` plan existed before M02 planning started.
- [x] 2026-06-02: Created this M02 active plan.
- [x] Complete documentation alignment for continuous lifecycle observation.
- [x] Create M02 planning ADR placeholders.
- [x] Update status and tracking docs for M02 planning.
- [x] Update control-plane validation for M02 planning artifacts.
- [x] Run validation.
- [x] Hand off to M02 planning QA.
- [x] 2026-06-08: M02 Planning QA passed for PR #37 on branch `m02-planning-monorepo-and-local-development-environment`.
- [x] 2026-06-08: M02 planning PR #37 merged into `main` at commit `18148f7` (`M02 planning monorepo and local development environment (#37)`).
- [x] 2026-06-08: Created branch `m02-01-choose-backend-and-frontend-stack` from updated `main`.
- [x] 2026-06-08: M02.01 branch guard passed on `m02-01-choose-backend-and-frontend-stack`; `git status --short` was clean and `origin` points to `https://github.com/Islem-Rezzag/CausalLedger.git`.
- [x] 2026-06-08: Read the required active docs, M02 plan, M02 milestone docs, ADRs, and ops workflow files before editing.
- [x] 2026-06-08: Finalized M02 planning merge tracking and started M02.01 as the current submilestone.
- [x] 2026-06-08: Resolved ADR-0005 with a TypeScript-first monorepo direction: Node.js/Fastify backend, React/Vite frontend, pnpm workspaces, Turborepo, ESLint/Prettier, Vitest, and Zod or equivalent future schema validation.
- [x] 2026-06-08: Updated ADR-0006 with local development direction while deferring package manifests, runtime services, Docker Compose, migrations, health checks, and CI workflows.
- [x] 2026-06-08: Kept M02.02 through M02.20 `Not started`, M03 through M21 `Not started`, and product implementation not started.
- [x] 2026-06-08: M02.01 builder validation passed with `python scripts/validate-control-plane.py`, `python -m pytest tests/test_control_plane_bootstrap.py` with 32 tests, and `git diff --check`; `make bootstrap-check` was skipped because `make` is unavailable in the current Windows shell.
- [x] 2026-06-08: M02.01 Builder complete, awaiting QA.
- [x] 2026-06-08: M02.01 QA passed on branch `m02-01-choose-backend-and-frontend-stack` for PR #38.
- [x] 2026-06-08: M02.01 QA validation passed with `python scripts/validate-control-plane.py`, `python -m pytest tests/test_control_plane_bootstrap.py` with 32 tests, and `git diff --check`; `make bootstrap-check` was skipped because `make` is unavailable in the current Windows shell.
- [x] 2026-06-08: M02.01 marked `QA passed, awaiting PR merge`.
- [x] 2026-06-08: Confirmed M02.01 PR #38 merged into `main` at commit `fb2b901` (`docs: M02.01 choose backend and frontend stack (#38)`).
- [x] 2026-06-08: Created branch `m02-02-create-apps-api` from updated `main`.
- [x] 2026-06-08: M02.02 branch guard passed on `m02-02-create-apps-api`; `git status --short` was clean and `origin` points to `https://github.com/Islem-Rezzag/CausalLedger.git`.
- [x] 2026-06-08: Started M02.02 Builder - Create apps/api.
- [x] 2026-06-08: Created minimal non-domain `apps/api` TypeScript/Fastify scaffold and required pnpm/Turborepo workspace manifests.
- [x] 2026-06-08: Created `pnpm-lock.yaml` after successful dependency installation.
- [x] 2026-06-08: Ran package validation for M02.02: `pnpm typecheck`, `pnpm test`, `pnpm build`, `pnpm lint`, and `pnpm format:check`.
- [x] 2026-06-08: M02.02 Builder complete, awaiting QA.
- [x] 2026-06-09: M02.02 QA branch guard passed on `m02-02-create-apps-api`; `git status --short` was clean and `origin` points to `https://github.com/Islem-Rezzag/CausalLedger.git`.
- [x] 2026-06-09: Verified PR #39 at `https://github.com/Islem-Rezzag/CausalLedger/pull/39`; GitHub API reported it open, non-draft, mergeable clean, and unmerged.
- [x] 2026-06-09: Inspected M02.02 docs, workspace manifests, API scaffold, validator, and bootstrap tests for forbidden scope and status consistency.
- [x] 2026-06-09: M02.02 QA found no scaffold or safety defects.
- [x] 2026-06-09: M02.02 QA validation passed.
- [x] 2026-06-09: M02.02 marked `QA passed, awaiting merge`.
- [x] 2026-06-09: Confirmed M02.02 PR #39 merged into `main` at commit `8ddf5da` (`chore: create M02.02 api scaffold (#39)`).
- [x] 2026-06-09: Created branch `m02-03-create-apps-web` from updated `main`.
- [x] 2026-06-09: M02.03 branch guard passed on `m02-03-create-apps-web`; `git status --short` was clean and `origin` points to `https://github.com/Islem-Rezzag/CausalLedger.git`.
- [x] 2026-06-09: Read the required active docs, status docs, M02 milestone and registry, ADRs, ops workflow docs, root workspace manifests, `pnpm-lock.yaml`, existing `apps/api` scaffold docs, existing `apps/web` README, validator, and bootstrap tests before editing.
- [x] 2026-06-09: Finalized M02.02 as `Completed and merged` and started M02.03 Builder - Create apps/web.
- [x] 2026-06-09: Created minimal non-domain `apps/web` React/Vite scaffold.
- [x] 2026-06-09: Ran package validation for M02.03: `pnpm typecheck`, `pnpm test`, `pnpm build`, `pnpm lint`, and `pnpm format:check`.
- [x] 2026-06-09: M02.03 Builder complete, awaiting QA.
- [x] 2026-06-09: M02.03 QA branch guard passed on `m02-03-create-apps-web`; `git status --short` was clean and `origin` points to `https://github.com/Islem-Rezzag/CausalLedger.git`.
- [x] 2026-06-09: Verified PR #40 at `https://github.com/Islem-Rezzag/CausalLedger/pull/40`; GitHub API reported it open, non-draft, mergeable clean, and unmerged. The `gh` CLI is unavailable in the current Windows shell.
- [x] 2026-06-09: Inspected M02.03 docs, workspace manifests, API scaffold, web scaffold, validator, and bootstrap tests for forbidden scope and status consistency.
- [x] 2026-06-09: M02.03 QA found no scaffold or safety defects.
- [x] 2026-06-09: M02.03 QA validation passed.
- [x] 2026-06-09: M02.03 marked `QA passed, awaiting merge`.
- [x] 2026-06-09: Confirmed M02.03 PR #40 merged into `main` at commit `6ad4b0c` (`chore: create M02.03 web scaffold (#40)`).
- [x] 2026-06-09: Created branch `m02-04-create-apps-worker` from updated `main`.
- [x] 2026-06-09: M02.04 branch guard passed on `m02-04-create-apps-worker`; `git status --short` was clean and `origin` points to `https://github.com/Islem-Rezzag/CausalLedger.git`.
- [x] 2026-06-09: Read the required active docs, status docs, M02 milestone and registry, ADRs, ops workflow docs, root workspace manifests, `pnpm-lock.yaml`, existing `apps/api` and `apps/web` scaffold docs, existing `apps/worker` README, validator, and bootstrap tests before editing.
- [x] 2026-06-09: Finalized M02.03 as `Completed and merged` and started M02.04 Builder - Create apps/worker.
- [x] 2026-06-09: Created minimal non-domain `apps/worker` TypeScript scaffold.
- [x] 2026-06-09: Updated control-plane validation and bootstrap tests for the worker scaffold and M02.04 builder state.
- [x] 2026-06-09: M02.04 Builder complete, awaiting QA.
- [x] 2026-06-11: M02.04 QA recovery preserved unrelated local report/status edits in stash `stash@{0}` with message `wip: local reports and status edits before M02.04 QA`; the stash was not popped, dropped, deleted, or committed.
- [x] 2026-06-11: M02.04 QA inspected PR #41, required docs, workspace manifests, API/web/worker scaffolds, control-plane validator, and bootstrap tests.
- [x] 2026-06-11: M02.04 QA expanded `apps/worker/README.md` with worker check commands and a future-milestone boundary statement.
- [x] 2026-06-11: M02.04 QA passed and marked M02.04 `QA passed, awaiting merge`; M02.05 through M02.20 remain `Not started`, M03 through M21 remain `Not started`, and product domain implementation has not started.
- [x] 2026-06-11: Synced `main`, confirmed PR #41 merged at `f52396558e127e33e02c6e992d8a5f91cfe4dc0f`, and created branch `m02-amendment-process-diet`.
- [x] 2026-06-11: Started `M02 process amendment - tracking fixes, process diet, validator cleanup, and ADR-0008`.
- [x] 2026-06-11: Finalized M02.04 as `Completed and merged`; M02.04 created a minimal non-domain `apps/worker` scaffold and did not create product/domain behavior.
- [x] 2026-06-11: Applied tracking fixes, process diet, validator cleanup, and ADR-0008.
- [x] 2026-06-11: Ran required control-plane, package, and diff validation for the process amendment.
- [x] 2026-06-11: Committed scoped process-amendment changes; push and PR status are recorded in the final handoff.
- [x] 2026-06-24: M02 process amendment QA branch guard passed on `m02-amendment-process-diet`; starting worktree was clean and `origin` points to `https://github.com/Islem-Rezzag/CausalLedger.git`.
- [x] 2026-06-24: Verified PR #42 is open, non-draft, mergeable, targets `main`, and uses head branch `m02-amendment-process-diet`.
- [x] 2026-06-24: QA found the validator remained brittle because it still encoded `EXPECTED_M02_STATUSES`, exact current-status prose checks, and live M02 status assertions in tests.
- [x] 2026-06-24: Replaced brittle validator behavior with structural markdown parsing for the submilestone registry, M02 milestone table, roadmap table, `CURRENT_STATE.md` headings and labels, and `NEXT_RECOMMENDED_THREAD.md` labels.
- [x] 2026-06-24: Added fixture-based parser and validation tests for invalid statuses, duplicate IDs, M02/registry mismatches, active-plan count errors, populated `.env.example` values, forbidden package files, and harmless prose changes.
- [x] 2026-06-24: M02 process amendment QA passed, awaiting PR #42 merge; next thread is `Merge M02 process amendment PR`.
- [x] 2026-06-24: Confirmed PR #42 merged into `main` at `d5c27c4` and created branch `m02-05-package-scaffolds-eslint-ci` from updated `main`.
- [x] 2026-06-24: Read required active docs, status docs, M02 milestone docs, ADRs, ops workflow docs, root manifests, app scaffolds, package placeholders, validator, and bootstrap tests before editing.
- [x] 2026-06-24: Created scaffold-only package boundaries for `packages/core`, `packages/events`, `packages/ledger`, `packages/invariants`, `packages/incidents`, `packages/graph`, `packages/replay`, `packages/repair`, `packages/evidence`, and `packages/evals`.
- [x] 2026-06-24: Added a real flat ESLint baseline and converted app `lint` scripts to use ESLint instead of TypeScript no-emit as lint.
- [x] 2026-06-24: Added baseline `.github/workflows/ci.yml` for install, typecheck, lint, test, build, format check, control-plane validation, and bootstrap pytest.
- [x] 2026-06-24: Updated control-plane validation and bootstrap tests for M02.05 package allowlists, workflow allowlists, and forbidden product/domain package source patterns.
- [x] 2026-06-24: Initial `pnpm typecheck` and `pnpm test` failed before package workspace links were installed; `pnpm install` fixed the local package links and reruns passed.
- [x] 2026-06-24: M02.05 Builder complete, awaiting QA; M02.06 and M02.07 remain `Not started`; M03 through M21 remain `Not started`; product implementation has not started.
- [x] 2026-06-24: M02.05 QA branch guard passed on `m02-05-package-scaffolds-eslint-ci`; starting worktree was clean, local HEAD matched `origin/m02-05-package-scaffolds-eslint-ci`, and builder commit `96a9f89` was confirmed.
- [x] 2026-06-24: Verified PR #43 at `https://github.com/Islem-Rezzag/CausalLedger/pull/43`; it targets `main`, uses head branch `m02-05-package-scaffolds-eslint-ci`, is open and non-draft, and contains builder commit `96a9f89`.
- [x] 2026-06-24: M02.05 QA found two scoped defects: CI invoked pytest without explicitly installing Python dev dependencies, and TypeScript test files outside `apps/web/src` were executed by Vitest but not typechecked by `tsc`.
- [x] 2026-06-24: Added `requirements-dev.txt` and CI installation for Python dev dependencies before control-plane pytest.
- [x] 2026-06-24: Added `tsconfig.test.json` and `typecheck:test` coverage for `apps/api`, `apps/web`, `apps/worker`, and all ten M02.05 packages without adding tests to production build output.
- [x] 2026-06-24: Updated control-plane validation and bootstrap tests for package test tsconfig allowlists, CI Python dependency installation, pytest dependency declaration, package script defects, and scaffold boundary cases.
- [x] 2026-06-24: M02.05 QA passed; M02.05 is `QA passed, awaiting merge`, M02.06 and M02.07 remain `Not started`, M03 through M21 remain `Not started`, and product implementation has not started.
- [x] 2026-06-24: Synced `main`, confirmed PR #43 merged into `main` at commit `6e76045`, and created branch `m02-06-local-infra-postgres-migrations-health`.
- [x] 2026-06-24: M02.06 branch guard passed; starting branch was `m02-05-package-scaffolds-eslint-ci`, the starting worktree was clean, and `origin` points to `https://github.com/Islem-Rezzag/CausalLedger.git`.
- [x] 2026-06-24: Read required active docs, status docs, M02 milestone and registry, ADRs, ops workflow docs, root manifests, existing infra placeholders, API and worker scaffolds, validator, and bootstrap tests before editing.
- [x] 2026-06-24: Completed M02.06 reasoning checkpoint and classified the slice as Tier 1 local infrastructure, not product financial behavior.
- [x] 2026-06-24: Created a local-only Docker Compose/Postgres baseline, empty local env placeholders, `node-pg-migrate` root commands, and local infrastructure documentation.
- [x] 2026-06-24: Added `/infra/ready` as an infrastructure-only Fastify readiness stub that does not check product health, database readiness, financial correctness, evidence availability, or domain behavior.
- [x] 2026-06-24: Updated control-plane validation and bootstrap tests for local Postgres compose structure, migration boundary, empty env values, root infra scripts, and the allowed readiness stub.
- [x] 2026-06-24: M02.06 builder validation passed for control-plane validation, bootstrap pytest, diff check, Node/npm/pnpm version checks, frozen install, typecheck, lint, test, build, and format check; Docker and `make bootstrap-check` were unavailable in this Windows shell.
- [x] 2026-06-24: M02.06 QA branch guard passed on `m02-06-local-infra-postgres-migrations-health`; starting worktree was clean, local HEAD matched origin, and builder commit `b3c9c43` was confirmed.
- [x] 2026-06-24: Verified PR #44 targets `main`, uses head branch `m02-06-local-infra-postgres-migrations-health`, is open and unmerged, and contains builder commit `b3c9c43`.
- [x] 2026-06-24: M02.06 QA found three scoped defects: `/infra/ready` returned ambiguous `status: "ready"` without checking Postgres, `docker-compose.yml` used a fixed `container_name`, and CI lacked real Docker/Postgres/migration smoke validation while local Docker was unavailable.
- [x] 2026-06-24: M02.06 QA changed `/infra/ready` to process-only readiness with `database: "not-checked"` and `migrations: "not-checked"`, removed the fixed Compose container name, and added a remote `infra-smoke` CI job.
- [x] 2026-06-24: Initial remote `infra-smoke` failed in the migration step because `node-pg-migrate` treated `README.md` as a migration candidate; QA fixed the migration scripts to ignore `README.md`.
- [x] 2026-06-24: M02.06 QA validation passed locally and remotely; M02.06 is `QA passed, awaiting merge`, M02.07 remains `Not started`, M03 through M21 remain `Not started`, and product implementation has not started.
- [x] 2026-06-24: Synced `main`, confirmed PR #44 merged into `main` at commit `80ce206`, and created branch `m02-07-qa-development-environment`.
- [x] 2026-06-24: M02.07 branch guard passed; starting branch was `m02-06-local-infra-postgres-migrations-health`, the starting worktree was clean, and `origin` points to `https://github.com/Islem-Rezzag/CausalLedger.git`.
- [x] 2026-06-24: Read required active docs, status docs, M02 milestone and registry, ADRs, ops workflow docs, workspace manifests, CI, infra docs, app scaffolds, package scaffolds, validator, and bootstrap tests before editing.
- [x] 2026-06-24: Completed M02.07 reasoning checkpoint and classified the slice as Tier 1 QA environment validation, not product financial behavior.
- [x] 2026-06-24: Finalized M02.06 as `Completed and merged` and started M02.07 Builder - QA Development Environment.
- [x] 2026-06-24: Created `scripts/qa-dev-environment.py`, root `pnpm qa:dev`, and `docs/ops/qa-development-environment.md`.
- [x] 2026-06-24: Updated control-plane validation and bootstrap tests for the QA development environment script, root command, status labels, Docker opt-in, cleanup path, and documentation boundary.
- [x] 2026-06-24: M02.07 Builder complete, awaiting QA; M03 through M21 remain `Not started`; product implementation has not started.
- [x] 2026-06-24: M02.07 QA branch guard passed on `m02-07-qa-development-environment`; starting worktree was clean, local HEAD matched origin, and builder commit `e231cec` was confirmed.
- [x] 2026-06-24: Verified PR #45 targets `main`, uses head branch `m02-07-qa-development-environment`, is open and unmerged, and contains builder commit `e231cec`.
- [x] 2026-06-24: M02.07 QA found four scoped defects: dirty worktree was reported as PASS, repository-local identity used global-fallback lookup, Docker mode inherited conflicting shell database values, and Docker flow control could continue after failed Compose or migration steps.
- [x] 2026-06-24: M02.07 QA added default dirty-worktree failure with explicit `--allow-dirty`, enforced `git config --local`, isolated QA Docker database/user/password/host/port and `DATABASE_URL`, tightened Docker flow control and diagnostics, added Linux CI proof for `pnpm qa:dev`, and added behavioral QA-orchestrator tests.
- [x] 2026-06-24: M02.07 QA uses existing remote `infra-smoke` as the real Docker/Postgres/migration proof and adds behavioral tests proving the QA script delegates equivalent isolated Docker actions; local Docker remains unavailable in this Windows shell.
- [x] 2026-06-24: M02.07 QA passed; M02.07 is `QA passed, awaiting merge`; M03 through M21 remain `Not started`; product implementation has not started.

## Surprises & Discoveries

- OrbitSoft feedback highlights missing professional engineering evidence: comprehensive error handling, structured logging, CI/CD pipeline, architecture and deployment documentation, authentication and authorization in API projects, and advanced data modeling. M02 planning must map these gaps to the right milestones without implementing them here.
- Product domain implementation has not started. `apps/api` has a minimal non-domain scaffold, `apps/web` has a minimal non-domain scaffold, `apps/worker` has a minimal non-domain scaffold, M02.05 package directories contain scaffold-only TypeScript package boundaries, and deferred future product directories still contain placeholder README files only.
- M02 process amendment QA found that the builder's structural-validation claim was incomplete: the validator still coupled project truth to today's M02 status map and exact current-state prose.
- pnpm emitted a non-blocking warning that `esbuild@0.28.0` build scripts were ignored by the approve-builds policy. Package validation still passed.
- `.github/workflows/ci.yml` now exists as the M02.05 baseline CI workflow. Any additional workflow remains out of scope until explicitly planned.
- M02.05 QA confirmed a fresh Linux runner does not inherit local Python tools; CI needed an explicit pytest dependency installation step.
- M02.05 QA confirmed Vitest execution is not the same as TypeScript test typechecking; API, worker, and package tests needed separate `tsconfig.test.json` coverage.
- M02.06 uses a local placeholder Postgres password in `docker-compose.yml`; it is not a real secret, and `.env.example` values remain empty.
- `node-pg-migrate` supports `up`, `down`, `create`, and `redo`; it does not provide a status command in the installed CLI help, so M02.06 implements `migrate:up` and `migrate:down` only.
- The `/infra/ready` route is intentionally narrower than a product health check and does not verify Postgres or migrations.
- M02.06 QA confirmed the builder's generic readiness word was too broad. `/infra/ready` now reports `process-ready` and explicitly says database and migrations are not checked.
- A fixed Docker Compose `container_name` is unnecessary for this local baseline and can collide across multiple checkouts; Compose namespacing is the safer default.
- Because Docker is unavailable in the local Windows shell, M02.06 QA added remote infrastructure smoke validation to obtain real Postgres and migration evidence.
- `node-pg-migrate` needs explicit ignore handling for documentation-only migration directories; the root migration scripts now ignore `README.md` until real migration files exist.
- M02.07 uses a Python orchestrator rather than a shell script so the QA development environment works across Windows and Linux while still invoking existing pnpm, Python, Git, and Docker commands.
- The QA command reports dirty worktree state without failing solely on it because builder threads run it before commit; QA and merge readiness still require explicit `git status --short` review.

## Decision Log

| Date | Decision | Status | Notes |
| --- | --- | --- | --- |
| 2026-06-02 | M02 planning starts on branch `m02-planning-monorepo-and-local-development-environment`. | Recorded | Branch guard passed and the starting worktree was clean. |
| 2026-06-02 | Keep M02 planning documentation-only. | Recorded | No product code, runtime APIs, databases, CI workflows, logging implementation, auth/authz implementation, or deployment is added. |
| 2026-06-02 | Treat live monitoring and historical replay as the same canonical event engine with different input timing. | Proposed direction | Future milestones must validate this before runtime claims. |
| 2026-06-08 | M02 planning PR #37 merged into `main`. | Recorded | Merge commit `18148f7`; M02.01 is safe to start after post-merge tracking finalization. |
| 2026-06-08 | Choose a TypeScript-first monorepo direction. | Accepted | Future stack: Node.js/Fastify API, React/Vite web, pnpm workspaces, Turborepo, TypeScript shared packages, ESLint/Prettier, Vitest, and Zod or equivalent schema validation later. |
| 2026-06-08 | Keep M02.01 documentation-only. | Accepted | No dependency installation, package manifests, lockfiles, app runtime, package runtime, API behavior, database behavior, CI workflow, or MoneyEvent behavior. |
| 2026-06-08 | M02.01 QA passed. | Accepted | PR #38 was ready for human merge; M02.01 was not completed until PR #38 merged into `main` and post-merge tracking was finalized. |
| 2026-06-08 | M02.01 PR #38 merged into `main`. | Recorded | Merge commit `fb2b901`; M02.01 is completed and merged. |
| 2026-06-08 | M02.02 builder starts from updated `main`. | Recorded | Branch `m02-02-create-apps-api`; scope is a minimal non-domain `apps/api` foundation and required workspace manifests only. |
| 2026-06-08 | M02.02 creates a non-domain API foundation. | Accepted | Fastify app factory, server entrypoint, bootstrap test, workspace manifests, and package scripts only; no product/domain behavior, routes, database, auth/authz, health check, connector, structured logging runtime, CI workflow, or Docker Compose. |
| 2026-06-09 | M02.02 QA passed. | Accepted | PR #39 is safe for human merge after QA validation; M02.02 is not completed until the PR merges into `main` and post-merge tracking is finalized. |
| 2026-06-09 | M02.02 PR #39 merged into `main`. | Recorded | Merge commit `8ddf5da`; M02.02 is completed and merged. |
| 2026-06-09 | M02.03 builder starts from updated `main`. | Recorded | Branch `m02-03-create-apps-web`; scope is a minimal non-domain `apps/web` React/Vite foundation only. |
| 2026-06-09 | M02.03 creates a non-domain web foundation. | Accepted | React/Vite app bootstrap, browser entrypoint, bootstrap test, package scripts, and README only; no product UI, domain behavior, API calls, routing, database, auth/authz, connector, chart, structured logging runtime, CI workflow, health check, or Docker Compose. |
| 2026-06-09 | M02.03 QA passed. | Accepted | PR #40 is safe for human merge after QA validation; M02.03 is not completed until the PR merges into `main` and post-merge tracking is finalized. |
| 2026-06-09 | M02.03 PR #40 merged into `main`. | Recorded | Merge commit `6ad4b0c`; M02.03 is completed and merged. |
| 2026-06-09 | M02.04 builder starts from updated `main`. | Recorded | Branch `m02-04-create-apps-worker`; scope is a minimal non-domain `apps/worker` TypeScript foundation only. |
| 2026-06-09 | M02.04 creates a non-domain worker foundation. | Accepted | Worker bootstrap module, bootstrap test, package scripts, TypeScript config, and README only; no jobs, queues, schedulers, provider connectors, database, MoneyEvent, ledger, invariant, incident, evidence, replay, graph, repair, health check, CI workflow, or Docker Compose. |
| 2026-06-11 | M02.04 QA passed. | Accepted | PR #41 is safe for human merge after QA validation. M02.04 is not completed until PR #41 merges into `main` and post-merge tracking is finalized. |
| 2026-06-11 | M02.04 PR #41 merged into `main`. | Recorded | Merge commit `f52396558e127e33e02c6e992d8a5f91cfe4dc0f`; M02.04 is `Completed and merged`. |
| 2026-06-11 | Run process amendment before M02.05. | Accepted | Scope is tracking fixes, process diet, validator structural cleanup, repo hygiene, and ADR-0008 only; no product/domain behavior. |
| 2026-06-11 | Shrink remaining M02 process overhead. | Accepted | Solo-builder process cost; ceremony scaled to risk; avoid 20 tiny scaffolding PRs before domain implementation. |
| 2026-06-11 | Defer `apps/agent-runtime` to the M10 era. | Accepted | Agent runtime should not exist before deterministic evidence, MoneyEvent, invariant, incident, graph, replay, and repair boundaries exist. |
| 2026-06-11 | Defer Redis until needed. | Accepted | No queue or scheduler should be added before the worker or orchestration design proves the need. |
| 2026-06-24 | M02 process amendment PR #42 merged before M02.05. | Recorded | Merge commit `d5c27c4`; M02.05 started only after sync from updated `main`. |
| 2026-06-24 | M02.05 creates package boundaries without product/domain behavior. | Accepted | Each M02.05 package contains only `package.json`, `tsconfig.json`, `tsconfig.test.json`, `src/index.ts`, `test/bootstrap.test.ts`, and `README.md`; exported values are scaffold metadata only. |
| 2026-06-24 | M02.05 introduces real ESLint and baseline CI. | Accepted | ESLint is separate from typecheck; CI is validation-only and does not deploy, release, seed data, run migrations, or touch money state. |
| 2026-06-24 | M02.05 QA requires clean-runner dependency and test typecheck coverage. | Accepted | CI installs `requirements-dev.txt`; workspace `typecheck` now includes source and test configs without adding tests to production build output. |
| 2026-06-24 | M02.05 PR #43 merged before M02.06. | Recorded | Merge commit `6e76045`; M02.06 started only after sync from updated `main`. |
| 2026-06-24 | M02.06 introduces local Postgres infrastructure without product storage. | Accepted | Docker Compose is local-only and the migration directory contains no schema files. No MoneyEvent, ledger, incident, evidence, graph, replay, repair, agent, connector, queue, scheduler, or product tables exist. |
| 2026-06-24 | M02.06 uses `node-pg-migrate` for future Postgres migration repeatability. | Accepted | Root scripts expose `migrate:up` and `migrate:down`; no migration status command is added because the installed CLI help does not list one. |
| 2026-06-24 | M02.06 readiness is infrastructure-only. | Accepted | `/infra/ready` confirms only that the API process can respond; it does not claim product health, database readiness, evidence availability, or financial correctness. |
| 2026-06-24 | M02.06 QA requires remote infrastructure smoke evidence when local Docker is unavailable. | Accepted | `.github/workflows/ci.yml` now includes `infra-smoke` for Compose config, Postgres health, empty migration execution, public schema inspection, and cleanup. |
| 2026-06-24 | M02.06 readiness wording must be process-only. | Accepted | `/infra/ready` returns `status: "process-ready"`, `database: "not-checked"`, and `migrations: "not-checked"`. |
| 2026-06-24 | M02.06 Compose should not use a fixed container name. | Accepted | `container_name` was removed so Compose can namespace containers per checkout. |
| 2026-06-24 | M02.06 PR #44 merged before M02.07. | Recorded | Merge commit `80ce206`; M02.07 started only after sync from updated `main`. |
| 2026-06-24 | M02.07 uses a Python QA orchestrator with explicit Docker opt-in. | Accepted | `pnpm qa:dev` runs the non-destructive standard checks by default; `--with-docker` runs stateful Compose/Postgres/migration smoke and cleanup. |
| 2026-06-24 | M02.07 final QA requires a clean worktree by default. | Accepted | Dirty worktrees fail unless `--allow-dirty` is explicitly provided for intermediate validation; allowed dirty mode is reported as `SKIPPED`, not clean. |
| 2026-06-24 | M02.07 repository identity must be repository-local. | Accepted | The QA script reads `git config --local --get` for name and email, rejects missing local values, and rejects the forbidden institutional domain. |
| 2026-06-24 | M02.07 Docker proof uses existing `infra-smoke` plus behavioral script tests. | Accepted | This avoids duplicating the full QA command under `--with-docker` in CI while preserving real Docker/Postgres/migration evidence from `infra-smoke` and proving the script isolates Docker env values. |

## Context and Orientation

M00 Repo Operating System is completed and tagged as `v0.1.0`. M01 Domain Model and Scope Freeze is completed and closed. M01.01 through M01.13 are `Completed and merged`, and the completed M01 plan lives at `plans/completed/CLP-0002-m01-domain-model-and-scope-freeze.md`.

M02 planning PR #37 has merged into `main` at commit `18148f7`. M02.01 is `Completed and merged` after PR #38 merged into `main` at commit `fb2b901`. M02.02 Create apps/api is `Completed and merged` after PR #39 merged into `main` at commit `8ddf5da`. M02.03 Create apps/web is `Completed and merged` after PR #40 merged into `main` at commit `6ad4b0c`. M02.04 Create apps/worker is `Completed and merged` after PR #41 merged into `main` at commit `f52396558e127e33e02c6e992d8a5f91cfe4dc0f`. The M02 process amendment PR #42 merged into `main` at commit `d5c27c4`. M02.05 PR #43 merged into `main` at commit `6e76045`.

The current branch is `m02-07-qa-development-environment`. The current slice is `M02.07 QA - QA Development Environment`.

Historical planning marker before M02.01 started: M02.01 through M02.20 remain `Not started`.

## Scope

In scope for this planning thread:

- Create the M02 active plan.
- Align project docs with continuous payment lifecycle observability and living causal timeline language.
- Record live monitoring, historical replay, and progressive incident certainty as future planning boundaries.
- Map OrbitSoft-readiness feedback to future milestones.
- Create lightweight planning ADR placeholders for stack and monorepo direction, local dev and CI baseline, and logging/error handling/observability direction.
- Update status and tracking docs.
- Update control-plane validation for planning artifacts.
- Run control-plane validation.
- Produce a handoff packet.

In scope for M02.01:

- Confirm M02 planning PR #37 merged into `main`.
- Update tracking truthfully from M02 planning to M02.01.
- Choose and document backend/frontend stack direction.
- Choose and document package manager, monorepo task runner, formatting/linting, test framework, and future schema direction.
- Document local developer experience principles and stack implications.
- Keep the slice documentation-only.

In scope for M02.02:

- Finalize M02.01 post-merge tracking after PR #38 merged into `main`.
- Create root workspace manifests required for the API foundation: `package.json`, `pnpm-workspace.yaml`, `turbo.json`, `tsconfig.base.json`, and `pnpm-lock.yaml` after successful install.
- Create a minimal non-domain `apps/api` TypeScript/Fastify scaffold.
- Add API app scripts for `dev`, `build`, `test`, `lint`, `format:check`, and `typecheck`.
- Add a non-domain bootstrap test that verifies app creation without registering product routes.
- Update durable tracking and hand off to M02.02 QA.

In scope for M02.03:

- Finalize M02.02 post-merge tracking after PR #39 merged into `main`.
- Create a minimal non-domain `apps/web` React/Vite scaffold.
- Add web app scripts for `dev`, `build`, `test`, `lint`, `format:check`, and `typecheck`.
- Add a non-domain bootstrap test that verifies minimal React rendering only.
- Update durable tracking and hand off to M02.03 QA.

In scope for M02.04:

- Finalize M02.03 post-merge tracking after PR #40 merged into `main`.
- Create a minimal non-domain `apps/worker` TypeScript scaffold.
- Add worker app scripts for `dev`, `build`, `test`, `lint`, `format:check`, and `typecheck`.
- Add a non-domain bootstrap test that verifies no jobs are registered.
- Update durable tracking and hand off to M02.04 QA.

In scope for the M02 process amendment:

- Finalize M02.04 as `Completed and merged` after PR #41 merged into `main`.
- Fix stale tracking and status claims.
- Add `reports/*.pdf` and `reports/*.xlsx` to `.gitignore` while keeping Markdown reports trackable.
- Restructure remaining M02 into M02.05 package scaffolds plus ESLint plus CI baseline, M02.06 local infrastructure, and M02.07 QA dev environment.
- Defer `apps/agent-runtime` to the M10 era and defer Redis until a queue or scheduler design proves the need.
- Compact `docs/status/CURRENT_STATE.md` and move older detail into `docs/status/WEEKLY_LOG.md` without rewriting historical log lines.
- Replace brittle exact-sentence control-plane validation with structural checks.
- Add ADR-0008 for ID, money, and storage direction as documentation only.
- Update active tracking, status docs, registry, roadmap, milestone docs, changelog, and index files as needed.
- Run required validation and hand off to process-amendment QA.

In scope for M02.05:

- Finalize process-amendment merge tracking after PR #42 merged into `main`.
- Create scaffold-only package boundaries for `packages/core`, `packages/events`, `packages/ledger`, `packages/invariants`, `packages/incidents`, `packages/graph`, `packages/replay`, `packages/repair`, `packages/evidence`, and `packages/evals`.
- Keep each M02.05 package limited to `package.json`, `tsconfig.json`, `tsconfig.test.json`, `src/index.ts`, `test/bootstrap.test.ts`, and `README.md`.
- Add flat ESLint configuration as real linting, separate from typecheck.
- Convert app lint scripts to use ESLint.
- Add `.github/workflows/ci.yml` with the baseline validation command set.
- Add explicit Python dev dependency installation for the CI commands that invoke pytest.
- Add test TypeScript configs and `typecheck:test` scripts without emitting test build output.
- Update control-plane validation and bootstrap tests for package scaffold allowlists, workflow allowlists, and forbidden product/domain package source patterns.
- Update active plan, status docs, registry, roadmap, M02 milestone docs, ADR-0006, changelog, index files, and handoff tracking.
- Run required control-plane, package, format, and diff validation and hand off to M02.05 QA.

Out of scope for this planning thread:

- MoneyEvent runtime logic.
- Ledger runtime logic.
- Settlement runtime logic.
- Reconciliation runtime logic.
- Incident runtime logic.
- Invariants.
- Causal graph runtime logic.
- Replay runtime logic.
- Agent runtime.
- Repair planning runtime logic.
- Human-review runtime logic.
- UI product features.
- Runtime APIs.
- Runtime databases.
- External connectors.
- GitHub Actions or CI workflows.
- Runtime structured logging implementation.
- Runtime auth/authz implementation.
- Production deployment.
- M02.02 or later work.
- Runtime app creation.
- Package implementation.
- Dependency installation.
- Lockfile creation.
- M03 or later milestone work.

Out of scope for M02.02:

- MoneyEvent routes or logic.
- Ledger routes or logic.
- Incident routes or logic.
- Evidence ingestion routes.
- Repair routes or behavior.
- Auth/authz.
- Database connections.
- External connectors.
- Health checks reserved for M02.18.
- Structured logging runtime beyond minimal framework defaults.
- CI workflows.
- Docker Compose.
- M02.03 or later work.

Out of scope for M02.03:

- CausalLedger dashboard or command-center UI.
- MoneyEvent UI or runtime logic.
- Ledger UI or runtime logic.
- Incident UI or runtime logic.
- Evidence UI or ingestion behavior.
- Repair UI or behavior.
- API calls.
- Auth/authz.
- Routing beyond minimal app rendering.
- Charts.
- External connectors.
- Database or storage behavior.
- Health checks.
- Structured logging runtime.
- CI workflows.
- Docker Compose.
- Product/domain behavior or product functionality claims.

Out of scope for M02.04:

- MoneyEvent runtime logic.
- Ledger runtime logic.
- Invariant checks.
- Incident processing.
- Evidence ingestion.
- Replay behavior.
- Causal graph behavior.
- Repair behavior.
- Jobs, queues, schedulers, or job processing.
- Provider connectors or external connectors.
- Databases or storage behavior.
- Auth/authz.
- Structured logging runtime.
- Health checks.
- CI workflows.
- Docker Compose.
- Product/domain behavior or product functionality claims.

Out of scope for M02.05:

- MoneyEvent schema, runtime schema validation, canonical event transforms, ledger entries, balances, invariant logic, incident lifecycle logic, causal graph traversal, replay algorithms, repair proposal logic, repair approval or application, evidence storage, benchmark scoring, context-pack generation, lessons store, knowledge wiki, product-agent memory, agent runtime, product UI, API routes, database, Docker Compose, Redis, queue, scheduler, external connectors, migrations, health checks, deployment, release, secrets, or money-moving behavior.

## M02 Submilestones and Expected Branches

| ID | Name | Status | Expected branch |
| --- | --- | --- | --- |
| M02.01 | Choose backend and frontend stack | Completed and merged | `m02-01-choose-backend-and-frontend-stack` |
| M02.02 | Create apps/api | Completed and merged | `m02-02-create-apps-api` |
| M02.03 | Create apps/web | Completed and merged | `m02-03-create-apps-web` |
| M02.04 | Create apps/worker | Completed and merged | `m02-04-create-apps-worker` |
| M02.05 | Create all remaining package scaffolds + ESLint + CI baseline | Completed and merged | `m02-05-package-scaffolds-eslint-ci` |
| M02.06 | Local infrastructure: Docker Compose + Postgres + migration tool + health-check stubs | Completed and merged | `m02-06-local-infra-postgres-migrations-health` |
| M02.07 | QA dev environment | QA passed, awaiting merge | `m02-07-qa-development-environment` |

Former M02.08 through M02.20 rows are deferred or absorbed in `docs/milestones/SUBMILESTONE_REGISTRY.md`. `apps/agent-runtime` creation is deferred to the M10 era. Redis is deferred until needed.

Historical planning snapshot retained for control-plane validation: M02.01 | Choose backend and frontend stack | Not started.

## Local Development Decisions to Make

M02.01 decided:

- backend language and framework: TypeScript on Node.js with Fastify for the future API;
- frontend framework: React with Vite for the future web app;
- package manager: pnpm workspaces;
- monorepo task runner: Turborepo;
- formatting and linting conventions: ESLint with TypeScript-aware rules plus Prettier;
- test framework conventions: Vitest for package-level and app-level tests when code exists;
- schema definition format for future MoneyEvent contracts: TypeScript types plus Zod or equivalent runtime schema validation later;
- local developer experience direction: explicit scripts, empty `.env.example` values, deterministic validation commands, and no product claim before runtime code and tests exist.

M02.05 implemented:

- package scaffold boundaries for `packages/core`, `packages/events`, `packages/ledger`, `packages/invariants`, `packages/incidents`, `packages/graph`, `packages/replay`, `packages/repair`, `packages/evidence`, and `packages/evals`;
- flat ESLint as the real lint baseline for TypeScript app and package scaffolds;
- CI baseline command set in `.github/workflows/ci.yml`;
- explicit Python dev dependencies for CI pytest;
- separate TypeScript test typecheck configs for apps and M02.05 packages.

M02.06 implemented:

- local-only Docker Compose/Postgres;
- empty local env placeholders;
- root infra and migration scripts;
- an empty migration boundary with no product schema;
- `/infra/ready` as process-only readiness;
- remote `infra-smoke` validation.

M02.07 implemented:

- `scripts/qa-dev-environment.py`;
- root `pnpm qa:dev`;
- `docs/ops/qa-development-environment.md`;
- structural validator and bootstrap-test coverage for the QA environment.

M02.07 QA corrected:

- dirty-worktree default failure and explicit `--allow-dirty` for intermediate validation;
- repository-local Git identity enforcement;
- deterministic Docker QA database environment isolation;
- Docker flow control after Compose, start, health, and migration failures;
- Linux CI proof for the standard QA command;
- behavioral tests for the QA orchestrator.

M02 now has concrete local-development foundations for API, web, worker, package scaffolds, linting, CI, Postgres, migrations, process readiness, and QA validation. `apps/agent-runtime` remains deferred to the M10 era. Redis remains deferred until a queue or scheduler design proves the need.

## Continuous Lifecycle Observer Alignment

The canonical product direction for planning is continuous payment lifecycle observability and incident response.

CausalLedger should eventually observe provider events, webhooks, ledger entries, settlement rows, bank evidence, refunds, chargebacks, and related signals as evidence arrives. These inputs should update a living causal timeline that preserves provenance, ordering uncertainty, evidence gaps, and contradictory evidence.

This is planning language only. No live ingestion, streaming, storage, timeline engine, or incident engine exists yet.

## Live Monitoring and Historical Replay Planning Boundary

Live monitoring and historical replay should use the same future canonical event engine. The difference is input timing:

- live monitoring processes evidence as it arrives;
- historical replay processes stored evidence later;
- both paths should use the same MoneyEvent, invariant, incident, graph, replay, evidence bundle, and repair-safety concepts.

Future implementation must avoid creating separate truth semantics for live mode and replay mode. Replay must remain deterministic, reproducible, and evidence-linked.

## Progressive Incident Certainty Planning Boundary

Future incidents should support progressive certainty instead of claiming final truth too early:

- suspected break: early evidence indicates a possible issue;
- confirmed break: deterministic checks and later evidence support a mismatch;
- dismissed break: later evidence shows the suspected issue was not a true break;
- resolved after later evidence: delayed settlement or bank evidence explains or closes the issue;
- unresolved due to missing evidence: required evidence has not arrived or remains insufficient;
- unresolved pending review: evidence remains contradictory or ambiguous and needs human review.

LLM output can explain uncertainty but cannot promote suspected breaks to confirmed truth.

## OrbitSoft-Readiness Constraints

OrbitSoft feedback is mapped to future work as planning constraints:

| Feedback item | Planning treatment | Future milestone mapping |
| --- | --- | --- |
| Comprehensive error handling | Define error taxonomy expectations and local dev conventions without implementing runtime behavior here. | M02, M17, M19 |
| Structured logging | Plan request IDs, event IDs, trace context, and evidence-safe logs without adding runtime logging here. | M17, M18, M19 |
| CI/CD pipeline | Plan M02.19 CI baseline expectations; do not add GitHub Actions in this planning thread. | M02, M18, M19 |
| Architecture decision records | Create lightweight M02 planning ADR placeholders. | M02, M20 |
| Deployment strategy documentation | Plan docs and local profile boundaries without creating production deployment. | M02, M19, M20 |
| Auth/authz design and future runtime | Record future API, UI, and tool permission design constraints; do not implement auth/authz here. | M18, M19 |
| Advanced data modeling for scalable schemas | Preserve schema and data model questions for MoneyEvent, ledger, incidents, graph, replay, and evidence bundles. | M03, M04, M08, M09, M18, M19 |

## Architecture Decision Records to Create

- `docs/decisions/ADR-0005-m02-stack-and-monorepo-direction.md`
- `docs/decisions/ADR-0006-local-dev-and-ci-baseline.md`
- `docs/decisions/ADR-0007-logging-error-handling-and-observability-direction.md`

These ADRs are placeholders for M02 planning and future implementation decisions. They must not claim runtime implementation.

## CI Baseline Expectations

M02.19 should eventually define a baseline local and CI check set. Expected candidate checks include:

- branch and worktree guard;
- control-plane validation;
- bootstrap tests;
- formatting check;
- lint check;
- package-level tests once product packages exist;
- forbidden-scope checks for agent, money mutation, evidence mutation, and repair approval boundaries.

This planning thread must not create `.github/workflows/` or any CI/CD automation.

## Structured Logging and Error-Handling Expectations

Future runtime work should distinguish:

- deterministic validation errors;
- evidence ingestion errors;
- provenance or idempotency errors;
- replay reproducibility errors;
- repair proposal validation errors;
- agent tool-boundary denials;
- auth/authz denials;
- operator-facing incident uncertainty states.

Future structured logs should avoid leaking secrets or sensitive evidence and should preserve request IDs, event IDs, evidence receipt IDs, incident IDs, trace context, and error category where implementation scope defines them.

No runtime logging or error-handling code is implemented in this planning thread.

## Deployment Documentation Expectations

M02 should decide what local deployment documentation belongs in the repo once apps and local services exist. Production deployment remains future work.

Future docs should distinguish local development, test/sandbox, and production assumptions; record required environment variables without real secrets; describe service startup and health checks; and avoid claims that production deployment exists before M19/M20 validation.

## Data Modeling Expectations

M02 should preserve package boundaries so later data modeling can support:

- immutable raw evidence and evidence receipts;
- canonical MoneyEvent records with provenance and idempotency;
- deterministic ledger transactions and entries;
- invariant results;
- incident certainty states;
- causal graph nodes and edges;
- replay sessions and artifacts;
- repair proposals and review records.

Detailed schemas belong to future scoped milestones, especially M03, M04, M07, M08, M09, M12, M13, M18, and M19.

## Product-Boundary Warnings

- Do not implement product behavior in this planning thread.
- Do not claim live ingestion, streaming, replay, timeline updates, incident creation, repair proposal generation, logging, auth/authz, CI/CD, deployment, or databases exist.
- Do not use LLM output as financial truth.
- Do not mutate money, ledger state, raw events, evidence, deterministic invariant results, repair approval, or external communications.
- Do not start M02 closeout until M02.07 QA passes, the M02.07 PR merges, and post-merge tracking is finalized.

Historical planning gate now satisfied: Do not start M02.01 Builder until M02 planning QA passes and the planning PR merges.

## Plan of Work

1. Create M02 active plan.
2. Add continuous lifecycle observer alignment to selected docs.
3. Add progressive certainty and live/replay planning boundaries.
4. Create ADR placeholders.
5. Update roadmap, M02 milestone doc, registry, status docs, capability matrix, risk register, tech debt, and open questions.
6. Add control-plane validation for M02 planning artifacts.
7. Run validation.
8. Produce handoff and next-thread recommendation.

## Concrete Steps

- Update only docs and control-plane validation files.
- Keep all M02 implementation submilestones `Not started`.
- Keep M03 through M21 `Not started`.
- Preserve the no-product-implementation statement.
- Record validation commands and results after running them.

## Validation and Acceptance

Validation ladder for this planning slice:

- Level 0: branch and worktree guard.
- Level 1: file and forbidden-scope inspection.
- Level 2: control-plane validation with `python scripts/validate-control-plane.py`.
- Level 3: bootstrap tests with `python -m pytest tests/test_control_plane_bootstrap.py`.
- Level 4: whitespace/diff validation with `git diff --check`.
- Level 7: forbidden-scope checks for no product implementation, no CI workflow, no APIs, no databases, no runtime logging, no runtime auth/authz, no deployment, no evidence mutation, no ledger mutation, no repair approval, and no product behavior.

Acceptance criteria for M02.01:

- M02 active plan exists.
- M02 planning PR #37 is confirmed merged into `main`.
- M02.01 status is recorded as `Builder complete, awaiting QA`.
- ADR-0005 records the backend/frontend stack and monorepo direction.
- ADR-0006 records local development implications without adding CI automation or runtime manifests.
- M02.02 through M02.20 remain `Not started`.
- M03 through M21 remain `Not started`.
- Product implementation has not started.
- Validation passes or skipped validation is recorded with a reason.
- Next recommended thread is `M02.01 QA - Choose Backend and Frontend Stack`.

Historical M02 planning acceptance marker retained for validation: M02.01 through M02.20 remain `Not started`; next recommended thread was `M02 Planning QA - Monorepo and Local Development Environment`.

M02.01 QA acceptance criteria:

- ADR-0005 and ADR-0006 remain documentation-only stack decisions.
- No product runtime, package manifests, dependency installation, lockfiles, app runtime, database behavior, API behavior, MoneyEvent behavior, CI workflow, or M02.02 work exists.
- M02.01 status is recorded as `QA passed, awaiting PR merge`.
- M02.02 through M02.20 remain `Not started`.
- M03 through M21 remain `Not started`.
- Product implementation has not started.
- Next recommended thread is `Merge M02.01 PR - Choose Backend and Frontend Stack`.

M02.02 builder acceptance criteria:

- M02.01 PR #38 is confirmed merged into `main` at commit `fb2b901`.
- M02.01 status is recorded as `Completed and merged`.
- M02.02 status is recorded as `Builder complete, awaiting QA`.
- Root workspace manifests exist only as needed for the API foundation.
- `apps/api` contains a minimal TypeScript/Fastify scaffold with app factory, server entrypoint, package scripts, README, and non-domain bootstrap test.
- No MoneyEvent routes, ledger routes, incident routes, evidence ingestion routes, repair routes, auth/authz, database connections, external connectors, health checks, structured logging runtime, CI workflows, Docker Compose, or product/domain behavior exists.
- M02.03 through M02.20 remain `Not started`.
- M03 through M21 remain `Not started`.
- Product domain implementation has not started.
- Validation passes or skipped validation is recorded with a reason.
- Next recommended thread is `M02.02 QA - Create apps/api`.

M02.02 QA acceptance criteria:

- M02.02 status is recorded as `QA passed, awaiting merge`.
- PR #39 is identified as the M02.02 PR.
- Required docs, manifests, API scaffold, validator, and bootstrap tests are inspected.
- QA defects and fixes are recorded.
- No product/domain behavior, future submilestone work, CI workflow, Docker Compose, health check, auth/authz, database, connector, structured logging runtime, or product tests are added.
- M02.03 through M02.20 remain `Not started`.
- M03 through M21 remain `Not started`.
- Product domain implementation has not started.
- Required control-plane and package validation pass or skipped validation is recorded with a reason.
- Next recommended thread is `Merge M02.02 PR - Create apps/api`.

M02.03 builder acceptance criteria:

- M02.02 PR #39 is confirmed merged into `main` at commit `8ddf5da`.
- M02.02 status is recorded as `Completed and merged`.
- M02.03 status is recorded as `Builder complete, awaiting QA`.
- `apps/web` contains a minimal React/Vite scaffold with Vite config, TypeScript configs, HTML entrypoint, React bootstrap component, browser render entrypoint, package scripts, README, and non-domain bootstrap test.
- No CausalLedger dashboard, MoneyEvent UI or logic, ledger UI or logic, incident UI or logic, evidence UI or ingestion behavior, repair UI or behavior, API calls, auth/authz, routing, charts, external connectors, database behavior, health checks, structured logging runtime, CI workflows, Docker Compose, or product/domain behavior exists.
- M02.04 through M02.20 remain `Not started`.
- M03 through M21 remain `Not started`.
- Product domain implementation has not started.
- Validation passes or skipped validation is recorded with a reason.
- Next recommended thread is `M02.03 QA - Create apps/web`.

M02.03 QA acceptance criteria:

- M02.03 status is recorded as `QA passed, awaiting merge`.
- PR #40 is identified as the M02.03 PR.
- Required docs, manifests, API scaffold, web scaffold, validator, and bootstrap tests are inspected.
- QA defects and fixes are recorded.
- No product/domain behavior, future submilestone work, CI workflow, Docker Compose, health check, auth/authz, database, connector, structured logging runtime, product UI, API call, routing, chart, or product tests are added.
- M02.04 through M02.20 remain `Not started`.
- M03 through M21 remain `Not started`.
- Product domain implementation has not started.
- Required control-plane and package validation pass or skipped validation is recorded with a reason.
- Next recommended thread is `Merge M02.03 PR - Create apps/web`.

M02.04 builder acceptance criteria:

- M02.03 PR #40 is confirmed merged into `main` at commit `6ad4b0c`.
- M02.03 status is recorded as `Completed and merged`.
- M02.04 status is recorded as `Builder complete, awaiting QA`.
- `apps/worker` contains a minimal TypeScript scaffold with package scripts, TypeScript config, README, bootstrap module, and non-domain bootstrap test.
- No jobs, queues, schedulers, provider connectors, databases, MoneyEvent logic, ledger logic, invariant checks, incident processing, evidence ingestion, replay behavior, graph behavior, repair behavior, health checks, structured logging runtime, auth/authz, CI workflow, Docker Compose, or product/domain behavior exists.
- M02.05 through M02.20 remain `Not started`.
- M03 through M21 remain `Not started`.
- Product domain implementation has not started.
- Required control-plane and package validation pass or skipped validation is recorded with a reason.
- Next recommended thread is `M02.04 QA - Create apps/worker`.

M02 process amendment acceptance criteria:

- M02.04 PR #41 is confirmed merged into `main` and recorded with merge commit `f52396558e127e33e02c6e992d8a5f91cfe4dc0f`.
- M02.04 status is recorded as `Completed and merged`.
- Stale M02 status claims are fixed in active docs, roadmap, milestone docs, registry, status docs, and entry-point docs.
- `docs/status/CURRENT_STATE.md` stays under 80 lines and older detail remains preserved in `docs/status/WEEKLY_LOG.md` and historical active-plan records.
- Remaining active M02 work is restructured as M02.05 package scaffolds plus ESLint plus CI baseline, M02.06 local infrastructure, and M02.07 QA dev environment.
- `apps/agent-runtime` and Redis are explicitly deferred with rationale.
- `.gitignore` ignores generated report PDF/XLSX artifacts while keeping Markdown reports trackable.
- `scripts/validate-control-plane.py` and `tests/test_control_plane_bootstrap.py` use structural checks rather than brittle exact-sentence checks.
- ADR-0008 documents ID, money, and storage direction without implementing runtime behavior.
- No product/domain behavior, CI workflow, ESLint implementation, package scaffold creation, database, Docker, Redis, queue, scheduler, route, or runtime is implemented by this amendment.
- Required control-plane, package, and diff validation pass or skipped validation is recorded with a reason.
- Next recommended thread is `Merge M02 process amendment PR`.

M02.05 builder acceptance criteria:

- M02 process amendment PR #42 is confirmed merged into `main` at commit `d5c27c4`.
- M02.05 status is recorded as `Builder complete, awaiting QA`.
- `packages/core`, `packages/events`, `packages/ledger`, `packages/invariants`, `packages/incidents`, `packages/graph`, `packages/replay`, `packages/repair`, `packages/evidence`, and `packages/evals` each contain only `package.json`, `tsconfig.json`, `src/index.ts`, `test/bootstrap.test.ts`, and `README.md`.
- Package source and tests expose scaffold metadata only; they do not implement MoneyEvent schemas, ledger behavior, invariants, incident lifecycle, graph traversal, replay, repair, evidence storage, benchmarks, agents, product features, or financial behavior.
- A flat `eslint.config.js` exists and app lint scripts use ESLint rather than TypeScript no-emit as lint.
- `.github/workflows/ci.yml` exists and is validation-only.
- Control-plane validation rejects unexpected workflow files, package files outside the allowlist, and forbidden package source patterns.
- M02.06 and M02.07 remain `Not started`.
- M03 through M21 remain `Not started`.
- Product domain implementation has not started.
- Required control-plane, package, format, and diff validation pass or skipped validation is recorded with a reason.
- Next recommended thread is `M02.05 QA - Package Scaffolds, ESLint, and CI Baseline`.

M02.07 builder acceptance criteria:

- M02.06 PR #44 is confirmed merged into `main` at commit `80ce206`.
- M02.06 status is recorded as `Completed and merged`.
- M02.07 status is recorded as `QA passed, awaiting merge`.
- A repeatable QA development environment script exists at `scripts/qa-dev-environment.py`.
- Root `pnpm qa:dev` runs the default non-destructive QA environment command.
- Docker Compose/Postgres/migration smoke validation requires explicit `--with-docker` opt-in and includes cleanup.
- `docs/ops/qa-development-environment.md` documents prerequisites, setup, default validation, Docker validation, what each check proves, what it does not prove, common failures, CI relation, and the no-product boundary.
- Control-plane validation and bootstrap tests cover the QA environment artifacts structurally.
- QA behavioral tests cover clean, dirty, `--allow-dirty`, repository-local identity, Docker environment isolation, Docker default skip, Docker opt-in flow control, cleanup, missing commands, and timeouts.
- No MoneyEvent schemas or transformations, ledger primitives, financial invariants, incidents, evidence ingestion or storage, causal graph behavior, replay, repair behavior, agent runtime, product UI, domain API routes, auth/authz, product database schema, Redis, queues, schedulers, connectors, deployment, real secrets, or product/domain behavior exists.
- M03 through M21 remain `Not started`.
- Product domain implementation has not started.
- Required control-plane, package, QA command, Docker availability check, and diff validation pass or skipped validation is recorded with a reason.
- Next recommended thread is `Merge M02.07 PR - QA Development Environment`.

## M02 Planning QA Record

QA date: 2026-06-08.

Files inspected:

- `docs/ACTIVE_DOCS.md`
- `README.md`
- `START_HERE.md`
- `AGENTS.md`
- `PLANS.md`
- `WORKFLOW.md`
- `docs/INDEX.md`
- `docs/ARCHITECTURE.md`
- `docs/DOMAIN_MODEL.md`
- `docs/PRODUCT_VISION.md`
- `docs/RELIABILITY.md`
- `docs/THREAT_MODEL.md`
- `docs/TOKEN_COST_STRATEGY.md`
- `plans/ROADMAP.md`
- `docs/status/CURRENT_STATE.md`
- `docs/status/NEXT_RECOMMENDED_THREAD.md`
- `docs/status/WEEKLY_LOG.md`
- `docs/status/RISK_REGISTER.md`
- `docs/status/TECH_DEBT.md`
- `docs/status/CAPABILITY_MATRIX.md`
- `docs/milestones/M02.md`
- `docs/milestones/SUBMILESTONE_REGISTRY.md`
- `plans/active/CLP-0003-m02-monorepo-and-local-development-environment.md`
- `docs/decisions/ADR-0005-m02-stack-and-monorepo-direction.md`
- `docs/decisions/ADR-0006-local-dev-and-ci-baseline.md`
- `docs/decisions/ADR-0007-logging-error-handling-and-observability-direction.md`
- `.github/PULL_REQUEST_TEMPLATE.md`
- `tests/test_control_plane_bootstrap.py`
- `scripts/validate-control-plane.py`

QA findings:

- Active M02 planning plan exists.
- `PLANS.md` references the active M02 plan and no longer says the active plan is none.
- M02 planning remains documentation/control-plane only.
- M02.01 through M02.20 remain `Not started`.
- M03 through M21 remain `Not started`.
- Product implementation has not started.
- `apps/` and `packages/` contain placeholder documentation only.
- `.github/workflows/` does not exist.
- Continuous lifecycle observer language is future planning language only.
- Live monitoring and historical replay are described as future paths using the same future canonical event engine with different input timing.
- Progressive incident certainty keeps LLM output out of confirmed financial truth.
- OrbitSoft-readiness feedback is mapped to future milestones without implementation in this planning PR.
- ADR-0005, ADR-0006, and ADR-0007 are planning placeholders and do not claim final implementation.
- Validation tests cover the M02 planning artifacts without claiming product behavior.

Defects found:

- No new formal PR QA defects were found.
- The prior stale `PLANS.md` active-plan reference was already fixed in commit `64b1f7b` and was verified in this QA.

Validation commands:

- `python scripts/validate-control-plane.py`
- `python -m pytest tests/test_control_plane_bootstrap.py`
- `git diff --check`
- `make bootstrap-check`, only if `make` is available

Validation results:

- `python scripts/validate-control-plane.py` passed.
- `python -m pytest tests/test_control_plane_bootstrap.py` passed with 32 tests.
- `git diff --check` passed.
- `make bootstrap-check` was skipped because `make` is unavailable in the current Windows shell. Equivalent Python validation commands were run directly.

QA decision: PASS.

Safe-to-merge statement: safe to merge the M02 planning PR after human review. M02 planning is not completed and merged until the PR actually merges into `main` and post-merge tracking is finalized. Do not start M02.01 until after that merge and finalization.

## M02.01 QA Record

QA date: 2026-06-08.

PR: #38, `https://github.com/Islem-Rezzag/CausalLedger/pull/38`.

Branch: `m02-01-choose-backend-and-frontend-stack`.

Files inspected:

- `docs/ACTIVE_DOCS.md`
- `README.md`
- `START_HERE.md`
- `AGENTS.md`
- `PLANS.md`
- `WORKFLOW.md`
- `docs/INDEX.md`
- `plans/ROADMAP.md`
- `docs/status/CURRENT_STATE.md`
- `docs/status/NEXT_RECOMMENDED_THREAD.md`
- `docs/status/WEEKLY_LOG.md`
- `docs/status/RISK_REGISTER.md`
- `docs/status/TECH_DEBT.md`
- `docs/status/CAPABILITY_MATRIX.md`
- `docs/milestones/M02.md`
- `docs/milestones/SUBMILESTONE_REGISTRY.md`
- `plans/active/CLP-0003-m02-monorepo-and-local-development-environment.md`
- `docs/decisions/ADR-0005-m02-stack-and-monorepo-direction.md`
- `docs/decisions/ADR-0006-local-dev-and-ci-baseline.md`
- `docs/decisions/ADR-0007-logging-error-handling-and-observability-direction.md`
- `docs/ops/planning-and-tracking-system.md`
- `docs/ops/builder-qa-prompt-protocol.md`
- `docs/ops/validation-and-handoff-workflow.md`
- `docs/ops/github-pr-and-issue-workflow.md`
- `.github/PULL_REQUEST_TEMPLATE.md`
- `tests/test_control_plane_bootstrap.py`
- `scripts/validate-control-plane.py`

QA findings:

- ADR-0005 records the TypeScript-first stack direction: Node.js/Fastify backend, React/Vite frontend, pnpm workspaces, Turborepo, ESLint/Prettier, Vitest, and Zod or equivalent future schema validation.
- ADR-0006 records local development implications without adding package manifests, lockfiles, runtime services, Docker Compose, migrations, health checks, or CI workflows.
- ADR-0007 remains planning-only and untouched by M02.01.
- No product implementation, dependency installation, app runtime, package runtime, API behavior, database behavior, MoneyEvent behavior, CI workflow, or M02.02 work exists.
- `apps/`, `packages/`, `scenarios/`, `data/`, and `infra/` contain placeholder README files only.
- `.github/workflows/` does not exist.
- M02.02 through M02.20 remain `Not started`.
- M03 through M21 remain `Not started`.

Defects found:

- `README.md` still reported the pre-M02.01 planning state where M02.01 through M02.20 remained `Not started`.
- The GitHub API reports PR #38 as open and non-draft, while the QA prompt expected an open draft PR.
- The `gh` CLI is unavailable in this Windows shell, so PR status was checked with the GitHub API instead.

Fixes applied:

- Updated `README.md` current status to reflect M02.01 QA passed, awaiting PR merge.
- Updated durable tracking in current state, next recommended thread, weekly log, roadmap, M02 milestone doc, registry, and this active plan.
- Set the exact next recommended thread to `Merge M02.01 PR - Choose Backend and Frontend Stack`.

Validation commands:

- `python scripts/validate-control-plane.py`
- `python -m pytest tests/test_control_plane_bootstrap.py`
- `git diff --check`
- `make bootstrap-check`, only if `make` is available

Validation results:

- `python scripts/validate-control-plane.py` passed.
- `python -m pytest tests/test_control_plane_bootstrap.py` passed with 32 tests.
- `git diff --check` passed.
- `make bootstrap-check` was skipped because `make` is unavailable in the current Windows shell. Equivalent direct Python validation commands were run.

QA decision: PASS.

Safe-to-merge statement: safe to merge PR #38 after human review. M02.01 is not `Completed and merged` until PR #38 actually merges into `main` and post-merge tracking is finalized. Do not start M02.02 until after that merge and finalization.

## M02.02 QA Record

QA date: 2026-06-09.

PR: #39, `https://github.com/Islem-Rezzag/CausalLedger/pull/39`.

Branch: `m02-02-create-apps-api`.

Branch and PR guard:

- `git branch --show-current` returned `m02-02-create-apps-api`.
- `git status --short` was clean before QA edits.
- `git remote -v` showed `origin` at `https://github.com/Islem-Rezzag/CausalLedger.git`.
- `git log --oneline main..HEAD` showed one builder commit before QA changes: `d3e6b4f chore: create M02.02 api scaffold`.
- `git diff --name-status main...HEAD` matched the M02.02 builder scope.
- `gh` is unavailable in the current Windows shell.
- GitHub API reported PR #39 open, non-draft, mergeable clean, and unmerged.

Files inspected:

- `docs/ACTIVE_DOCS.md`
- `README.md`
- `START_HERE.md`
- `AGENTS.md`
- `PLANS.md`
- `WORKFLOW.md`
- `docs/INDEX.md`
- `plans/ROADMAP.md`
- `docs/status/CURRENT_STATE.md`
- `docs/status/NEXT_RECOMMENDED_THREAD.md`
- `docs/status/WEEKLY_LOG.md`
- `docs/status/RISK_REGISTER.md`
- `docs/status/TECH_DEBT.md`
- `docs/status/CAPABILITY_MATRIX.md`
- `docs/milestones/M02.md`
- `docs/milestones/SUBMILESTONE_REGISTRY.md`
- `plans/active/CLP-0003-m02-monorepo-and-local-development-environment.md`
- `docs/decisions/ADR-0005-m02-stack-and-monorepo-direction.md`
- `docs/decisions/ADR-0006-local-dev-and-ci-baseline.md`
- `docs/decisions/ADR-0007-logging-error-handling-and-observability-direction.md`
- `docs/ops/planning-and-tracking-system.md`
- `docs/ops/builder-qa-prompt-protocol.md`
- `docs/ops/validation-and-handoff-workflow.md`
- `docs/ops/github-pr-and-issue-workflow.md`
- `.github/PULL_REQUEST_TEMPLATE.md`
- `scripts/validate-control-plane.py`
- `tests/test_control_plane_bootstrap.py`
- `package.json`
- `pnpm-workspace.yaml`
- `turbo.json`
- `tsconfig.base.json`
- `pnpm-lock.yaml`
- `apps/api/package.json`
- `apps/api/tsconfig.json`
- `apps/api/src/app.ts`
- `apps/api/src/index.ts`
- `apps/api/test/bootstrap.test.ts`
- `apps/api/README.md`

QA findings:

- M02.01 is finalized as `Completed and merged` after PR #38 merged into `main` at commit `fb2b901`.
- M02.02 is the current submilestone and was `Builder complete, awaiting QA` before QA updates.
- M02.03 through M02.20 remain `Not started`.
- M03 through M21 remain `Not started`.
- Product domain implementation has not started.
- The branch contained exactly one M02.02 builder commit beyond `main` before QA changes.
- Root `package.json` is private and contains workspace-level scripts only.
- `pnpm-workspace.yaml` includes only `apps/*` and `packages/*`.
- `turbo.json` defines local workspace tasks without CI or deployment behavior.
- `tsconfig.base.json` is a shared TypeScript config and does not define product schemas.
- `pnpm-lock.yaml` exists.
- `apps/api/package.json` is private, scoped as `@causalledger/api`, and contains minimal scripts plus Fastify, TypeScript, tsx, Vitest, Prettier, and Node types.
- `apps/api/src/app.ts` creates a minimal Fastify app factory only.
- `apps/api/src/index.ts` is a minimal local server entrypoint only.
- `apps/api/test/bootstrap.test.ts` is a non-domain bootstrap test only.
- `apps/api/README.md` clearly states that no product/domain behavior is implemented.
- No MoneyEvent, ledger, invariant, incident, evidence ingestion, repair, auth/authz, database, external connector, health-check endpoint, structured logging runtime, GitHub Actions or CI workflow, Docker Compose, UI, product/domain test, M02.03, or M03 work was added.
- `scripts/validate-control-plane.py` and `tests/test_control_plane_bootstrap.py` were updated to validate the new M02.02 scaffold and did not remove important existing checks.
- The non-blocking pnpm approve-builds warning for `esbuild@0.28.0` remains recorded from the builder dependency installation.

Files changed by QA:

- `docs/ACTIVE_DOCS.md`
- `README.md`
- `START_HERE.md`
- `PLANS.md`
- `WORKFLOW.md`
- `docs/INDEX.md`
- `plans/ROADMAP.md`
- `docs/status/CURRENT_STATE.md`
- `docs/status/NEXT_RECOMMENDED_THREAD.md`
- `docs/status/WEEKLY_LOG.md`
- `docs/status/CAPABILITY_MATRIX.md`
- `docs/milestones/M02.md`
- `docs/milestones/SUBMILESTONE_REGISTRY.md`
- `plans/active/CLP-0003-m02-monorepo-and-local-development-environment.md`
- `scripts/validate-control-plane.py`
- `tests/test_control_plane_bootstrap.py`

Defects found:

- No scaffold, package, validator, or safety defects were found.

Fixes applied:

- Updated durable tracking from `Builder complete, awaiting QA` to `QA passed, awaiting merge`.
- Set the exact next recommended thread to `Merge M02.02 PR - Create apps/api`.
- Updated control-plane validation expectations to validate the post-QA state.

Validation ladder:

- Level 0: branch and worktree guard.
- Level 1: file, diff, status, and forbidden-scope inspection.
- Level 2: control-plane validation.
- Level 3: bootstrap tests and API bootstrap test.
- Level 4: diff and whitespace checks.
- Level 7: forbidden-scope checks for product/domain behavior and safety boundaries.
- Level 8: QA merge-readiness review.

Validation commands:

- `python scripts/validate-control-plane.py`
- `python -m pytest tests/test_control_plane_bootstrap.py`
- `git diff --check`
- `node --version`
- `npm --version`
- `pnpm --version`
- `pnpm install`
- `pnpm typecheck`
- `pnpm test`
- `pnpm build`
- `pnpm lint`
- `pnpm format:check`
- `make bootstrap-check`, only if `make` is available

Validation results:

- `python scripts/validate-control-plane.py` passed.
- `python -m pytest tests/test_control_plane_bootstrap.py` passed with 32 tests.
- `git diff --check` passed.
- `node --version` returned `v22.16.0`.
- `npm --version` returned `10.9.2`.
- `pnpm --version` returned `10.32.1`.
- Initial `python scripts/validate-control-plane.py` failed because `docs/status/NEXT_RECOMMENDED_THREAD.md` lacked the required M01 completion context after the QA next-thread rewrite; the scoped next-thread context was restored and validation was rerun successfully.
- `pnpm install` passed, reported the lockfile was up to date, and emitted the non-blocking approve-builds warning for `esbuild@0.28.0`.
- `pnpm typecheck` passed.
- `pnpm test` passed with 1 Vitest test.
- `pnpm build` passed.
- `pnpm lint` passed.
- `pnpm format:check` passed.
- `make bootstrap-check` was skipped because `make` is unavailable in the current Windows shell. Equivalent direct Python validation commands were run.

Skipped validation and reason:

- `make bootstrap-check` was skipped because `make` is unavailable in the current Windows shell.
- GitHub PR body update via `gh` was skipped because `gh` is unavailable in the current Windows shell.

pnpm approve-builds warning status:

- The builder dependency installation recorded a non-blocking warning that `esbuild@0.28.0` build scripts were ignored by pnpm approve-builds policy.
- QA `pnpm install` emitted the same non-blocking warning: `Ignored build scripts: esbuild@0.28.0. Run "pnpm approve-builds" to pick which dependencies should be allowed to run scripts.`
- The warning does not block validation because all TypeScript/package checks passed.

QA decision: PASS.

Safe-to-merge statement: safe to merge PR #39 after human review. M02.02 is not `Completed and merged` until PR #39 actually merges into `main` and post-merge tracking is finalized. Do not start M02.03 until after that merge and finalization.

## M02.03 Builder Record

Builder date: 2026-06-09.

Branch: `m02-03-create-apps-web`.

Starting branch and merge confirmation:

- `git switch main` succeeded.
- `git pull --ff-only origin main` fast-forwarded `main` to `8ddf5da`.
- `git log --oneline -12` confirmed PR #39 merged into `main` at commit `8ddf5da` (`chore: create M02.02 api scaffold (#39)`).
- `git status --short` was clean before the M02.03 branch was created.
- `git branch --list m02-03-create-apps-web` and `git ls-remote --heads origin m02-03-create-apps-web` found no existing branch.
- `git switch -c m02-03-create-apps-web` created the expected branch.

Branch guard:

- `git branch --show-current` returned `m02-03-create-apps-web`.
- `git status --short` was clean before edits.
- `git remote -v` showed `origin` at `https://github.com/Islem-Rezzag/CausalLedger.git`.
- `git log --oneline -5` showed `8ddf5da` as the latest commit.

Files inspected:

- `docs/ACTIVE_DOCS.md`
- `README.md`
- `START_HERE.md`
- `AGENTS.md`
- `PLANS.md`
- `WORKFLOW.md`
- `docs/INDEX.md`
- `plans/ROADMAP.md`
- `docs/status/CURRENT_STATE.md`
- `docs/status/NEXT_RECOMMENDED_THREAD.md`
- `docs/status/WEEKLY_LOG.md`
- `docs/status/RISK_REGISTER.md`
- `docs/status/TECH_DEBT.md`
- `docs/status/CAPABILITY_MATRIX.md`
- `docs/milestones/M02.md`
- `docs/milestones/SUBMILESTONE_REGISTRY.md`
- `plans/active/CLP-0003-m02-monorepo-and-local-development-environment.md`
- `docs/decisions/ADR-0005-m02-stack-and-monorepo-direction.md`
- `docs/decisions/ADR-0006-local-dev-and-ci-baseline.md`
- `docs/decisions/ADR-0007-logging-error-handling-and-observability-direction.md`
- `docs/ops/planning-and-tracking-system.md`
- `docs/ops/builder-qa-prompt-protocol.md`
- `docs/ops/validation-and-handoff-workflow.md`
- `docs/ops/github-pr-and-issue-workflow.md`
- `.github/PULL_REQUEST_TEMPLATE.md`
- `scripts/validate-control-plane.py`
- `tests/test_control_plane_bootstrap.py`
- `package.json`
- `pnpm-workspace.yaml`
- `turbo.json`
- `tsconfig.base.json`
- `pnpm-lock.yaml`
- `apps/api/package.json`
- `apps/api/README.md`
- `apps/web/README.md`

Files created:

- `apps/web/package.json`
- `apps/web/tsconfig.json`
- `apps/web/tsconfig.node.json`
- `apps/web/vite.config.ts`
- `apps/web/index.html`
- `apps/web/src/App.tsx`
- `apps/web/src/main.tsx`
- `apps/web/src/App.test.tsx`

Files changed:

- `apps/web/README.md`
- `pnpm-lock.yaml`
- `README.md`
- `START_HERE.md`
- `PLANS.md`
- `WORKFLOW.md`
- `docs/ACTIVE_DOCS.md`
- `docs/INDEX.md`
- `plans/ROADMAP.md`
- `docs/status/CURRENT_STATE.md`
- `docs/status/NEXT_RECOMMENDED_THREAD.md`
- `docs/status/WEEKLY_LOG.md`
- `docs/status/CAPABILITY_MATRIX.md`
- `docs/milestones/M02.md`
- `docs/milestones/SUBMILESTONE_REGISTRY.md`
- `plans/active/CLP-0003-m02-monorepo-and-local-development-environment.md`
- `scripts/validate-control-plane.py`
- `tests/test_control_plane_bootstrap.py`

Builder findings:

- M02.02 is finalized as `Completed and merged` after PR #39 merged into `main` at commit `8ddf5da`.
- M02.03 creates a minimal non-domain React/Vite app foundation only.
- `apps/web/package.json` is private, scoped as `@causalledger/web`, and contains minimal scripts plus React, React DOM, Vite, TypeScript, Vitest, Prettier, React type packages, Node types, and the Vite React plugin.
- `apps/web/src/App.tsx` renders a minimal bootstrap component only.
- `apps/web/src/main.tsx` mounts the React app to the Vite root element only.
- `apps/web/src/App.test.tsx` is a non-domain bootstrap render test only.
- No CausalLedger dashboard, MoneyEvent UI or logic, ledger UI or logic, incident UI or logic, evidence UI or ingestion behavior, repair UI or behavior, API calls, auth/authz, routing, charts, external connectors, database behavior, health checks, structured logging runtime, GitHub Actions or CI workflows, Docker Compose, or product/domain behavior was added.
- M02.04 through M02.20 remain `Not started`.
- M03 through M21 remain `Not started`.
- Product domain implementation has not started.

Validation ladder:

- Level 0: branch and worktree guard.
- Level 1: file, diff, status, and forbidden-scope inspection.
- Level 2: control-plane validation.
- Level 3: bootstrap tests and app bootstrap tests.
- Level 4: diff and whitespace checks.
- Level 7: forbidden-scope checks for product/domain behavior and safety boundaries.
- Level 8: PR and QA readiness handoff.

Package validation results:

- `node --version` returned `v22.16.0`.
- `npm --version` returned `10.9.2`.
- `pnpm --version` returned `10.32.1`.
- `pnpm install` passed and updated `pnpm-lock.yaml`.
- `pnpm typecheck` initially failed because `apps/web/tsconfig.json` lacked DOM libs for `document`; adding `DOM` and `DOM.Iterable` fixed the scoped issue, and rerun passed.
- `pnpm test` passed with 2 Vitest tests total.
- `pnpm build` passed.
- `pnpm lint` passed.
- `pnpm format:check` initially failed because `apps/web/package.json` included a nonexistent `src/**/*.ts` Prettier glob; removing the glob fixed the scoped issue, and rerun passed.

Control-plane validation results:

- `python scripts/validate-control-plane.py` passed.
- `python -m pytest tests/test_control_plane_bootstrap.py` passed with 32 tests.
- `git diff --check` passed.
- `Get-Command make -ErrorAction SilentlyContinue` found no `make` command in the current Windows shell.
- Optional dev-server smoke: started `pnpm --filter @causalledger/web dev -- --host 127.0.0.1 --port 5173 --strictPort`; Vite served the scaffold at `http://localhost:5173`, and `Invoke-WebRequest -UseBasicParsing http://localhost:5173` returned HTTP 200 with `CausalLedger Web` in the response. The server is listening on `::1:5173`; use `http://localhost:5173`.

Skipped validation and reason:

- `make bootstrap-check` was skipped because `make` is unavailable in the current Windows shell. Equivalent direct Python validation commands were run.

pnpm approve-builds warning status:

- `pnpm install` emitted the non-blocking warning: `Ignored build scripts: esbuild@0.28.0. Run "pnpm approve-builds" to pick which dependencies should be allowed to run scripts.`
- The warning does not block validation because package validation passed.

Historical M02.03 builder decision: M02.03 was builder complete and ready for QA at this point. M02.04 was blocked until M02.03 QA passed and PR #40 merged.

## M02.03 QA Record

QA date: 2026-06-09.

Branch: `m02-03-create-apps-web`.

PR: `https://github.com/Islem-Rezzag/CausalLedger/pull/40`.

Branch and PR guard:

- `git branch --show-current` returned `m02-03-create-apps-web`.
- `git status --short` was clean before QA edits.
- `git remote -v` showed `origin` at `https://github.com/Islem-Rezzag/CausalLedger.git`.
- `git log --oneline -10` showed M02.03 builder commit `d7904c3` on top of M02.02 merge commit `8ddf5da`.
- `git fetch origin` completed.
- `git log --oneline main..HEAD` showed exactly one M02.03 builder commit: `d7904c3 chore: create M02.03 web scaffold`.
- `git diff --name-status main...HEAD` showed only M02.03 scaffold, control-plane validation, lockfile, and tracking/status files.
- `gh pr list --head m02-03-create-apps-web --base main` could not run because `gh` is unavailable in the current Windows shell.
- GitHub API verified PR #40 is open, non-draft, mergeable clean, unmerged, on head `m02-03-create-apps-web` at SHA `d7904c3b56d6d7df4c98d3103fe86e0c0fd045d2`.

Files inspected:

- `docs/ACTIVE_DOCS.md`
- `README.md`
- `START_HERE.md`
- `AGENTS.md`
- `PLANS.md`
- `WORKFLOW.md`
- `docs/INDEX.md`
- `plans/ROADMAP.md`
- `docs/status/CURRENT_STATE.md`
- `docs/status/NEXT_RECOMMENDED_THREAD.md`
- `docs/status/WEEKLY_LOG.md`
- `docs/status/RISK_REGISTER.md`
- `docs/status/TECH_DEBT.md`
- `docs/status/CAPABILITY_MATRIX.md`
- `docs/milestones/M02.md`
- `docs/milestones/SUBMILESTONE_REGISTRY.md`
- `plans/active/CLP-0003-m02-monorepo-and-local-development-environment.md`
- `docs/decisions/ADR-0005-m02-stack-and-monorepo-direction.md`
- `docs/decisions/ADR-0006-local-dev-and-ci-baseline.md`
- `docs/decisions/ADR-0007-logging-error-handling-and-observability-direction.md`
- `docs/ops/planning-and-tracking-system.md`
- `docs/ops/builder-qa-prompt-protocol.md`
- `docs/ops/validation-and-handoff-workflow.md`
- `docs/ops/github-pr-and-issue-workflow.md`
- `.github/PULL_REQUEST_TEMPLATE.md`
- `scripts/validate-control-plane.py`
- `tests/test_control_plane_bootstrap.py`
- `package.json`
- `pnpm-workspace.yaml`
- `turbo.json`
- `tsconfig.base.json`
- `pnpm-lock.yaml`
- `apps/api/package.json`
- `apps/api/tsconfig.json`
- `apps/api/src/app.ts`
- `apps/api/src/index.ts`
- `apps/api/test/bootstrap.test.ts`
- `apps/api/README.md`
- `apps/web/package.json`
- `apps/web/tsconfig.json`
- `apps/web/tsconfig.node.json`
- `apps/web/vite.config.ts`
- `apps/web/index.html`
- `apps/web/src/App.tsx`
- `apps/web/src/main.tsx`
- `apps/web/src/App.test.tsx`
- `apps/web/README.md`

QA findings:

- M02.02 is finalized as `Completed and merged` after PR #39 merged into `main` at commit `8ddf5da`.
- M02.03 was the current submilestone and was `Builder complete, awaiting QA` before QA updates.
- The branch contained exactly one M02.03 builder commit beyond `main` before QA tracking changes.
- Root `package.json` remains private and contains workspace-level scripts only.
- `pnpm-workspace.yaml` still includes only `apps/*` and `packages/*`.
- `turbo.json` still defines workspace tasks without CI or deployment behavior.
- `tsconfig.base.json` remains a shared TypeScript base config and does not define product schemas.
- `pnpm-lock.yaml` update is consistent with minimal web dependencies: React, React DOM, Vite, Vite React plugin, Vitest, TypeScript, Prettier, Node/React type packages, and transitive tooling dependencies only.
- `apps/api` remains a minimal non-domain API scaffold and was not changed into product behavior.
- `apps/web/package.json` is private, scoped as `@causalledger/web`, and contains minimal scripts plus React/Vite dependencies only.
- `apps/web/tsconfig.json` includes DOM typing while preserving shared TypeScript strictness.
- `apps/web/tsconfig.node.json` is only for Vite config typing.
- `apps/web/vite.config.ts` is minimal and does not add product behavior, proxying, deployment, or API integration.
- `apps/web/index.html` is minimal and does not claim product functionality.
- `apps/web/src/App.tsx` is a minimal bootstrap component only.
- `apps/web/src/main.tsx` is a minimal render entrypoint only.
- `apps/web/src/App.test.tsx` is a non-domain bootstrap test only.
- `apps/web/README.md` clearly states scaffold scope and that no dashboard or product/domain behavior is implemented.
- No dashboard UI, MoneyEvent UI or logic, ledger UI or logic, invariant logic, incident UI or logic, evidence UI or ingestion behavior, repair UI or behavior, API calls, routing beyond minimal app rendering, auth/authz, database/storage behavior, charts, external connectors, health-check UI or endpoint, structured logging runtime, GitHub Actions or CI workflow, Docker Compose, product/domain tests, M02.04 work, or M03 work was added.
- `scripts/validate-control-plane.py` and `tests/test_control_plane_bootstrap.py` were updated honestly to validate the M02.03 scaffold and post-QA tracking state without removing important existing checks.
- M02.04 through M02.20 remain `Not started`.
- M03 through M21 remain `Not started`.
- Product domain implementation has not started.

Defects found:

- No scaffold, safety-boundary, or forbidden-scope defects were found.
- The `gh` CLI is unavailable in this Windows shell, so PR status was checked with the GitHub API instead.

Files changed by QA:

- `README.md`
- `START_HERE.md`
- `PLANS.md`
- `WORKFLOW.md`
- `docs/ACTIVE_DOCS.md`
- `docs/INDEX.md`
- `plans/ROADMAP.md`
- `docs/status/CURRENT_STATE.md`
- `docs/status/NEXT_RECOMMENDED_THREAD.md`
- `docs/status/WEEKLY_LOG.md`
- `docs/status/CAPABILITY_MATRIX.md`
- `docs/milestones/M02.md`
- `docs/milestones/SUBMILESTONE_REGISTRY.md`
- `plans/active/CLP-0003-m02-monorepo-and-local-development-environment.md`
- `scripts/validate-control-plane.py`
- `tests/test_control_plane_bootstrap.py`

Files intentionally not touched by QA:

- `apps/web/package.json`
- `apps/web/tsconfig.json`
- `apps/web/tsconfig.node.json`
- `apps/web/vite.config.ts`
- `apps/web/index.html`
- `apps/web/src/App.tsx`
- `apps/web/src/main.tsx`
- `apps/web/src/App.test.tsx`
- `apps/web/README.md`
- `apps/api` scaffold files
- `package.json`
- `pnpm-workspace.yaml`
- `turbo.json`
- `tsconfig.base.json`
- `pnpm-lock.yaml`
- Future M02.04 through M02.20 files and all M03 through M21 product areas

Fixes applied:

- Updated durable tracking from `Builder complete, awaiting QA` to `QA passed, awaiting merge`.
- Set the exact next recommended thread to `Merge M02.03 PR - Create apps/web`.
- Updated control-plane validation expectations to validate the post-QA state.

Validation ladder:

- Level 0: branch and worktree guard.
- Level 1: file, diff, status, and forbidden-scope inspection.
- Level 2: control-plane validation.
- Level 3: bootstrap tests and app bootstrap tests.
- Level 4: diff and whitespace checks.
- Level 7: forbidden-scope checks for product/domain behavior and safety boundaries.
- Level 8: QA merge-readiness review.

Validation commands:

- `python scripts/validate-control-plane.py`
- `python -m pytest tests/test_control_plane_bootstrap.py`
- `git diff --check`
- `node --version`
- `npm --version`
- `pnpm --version`
- `pnpm install`
- `pnpm typecheck`
- `pnpm test`
- `pnpm build`
- `pnpm lint`
- `pnpm format:check`
- Optional dev-server smoke with `pnpm --filter @causalledger/web dev -- --host 127.0.0.1 --port 5173 --strictPort`
- `make bootstrap-check`, only if `make` is available

Validation results:

- `python scripts/validate-control-plane.py` passed.
- `python -m pytest tests/test_control_plane_bootstrap.py` passed with 32 tests.
- `git diff --check` passed.
- `node --version` returned `v22.16.0`.
- `npm --version` returned `10.9.2`.
- `pnpm --version` returned `10.32.1`.
- `pnpm install` passed, reported the lockfile was up to date, and emitted the non-blocking approve-builds warning for `esbuild@0.28.0`.
- `pnpm typecheck` passed.
- `pnpm test` passed with 2 Vitest tests.
- `pnpm build` passed.
- `pnpm lint` passed.
- `pnpm format:check` passed.
- Optional dev-server smoke passed at `http://localhost:5173` with HTTP 200 and `CausalLedger Web` in the response.

Skipped validation and reason:

- `make bootstrap-check` was skipped because `make` is unavailable in the current Windows shell. Equivalent direct Python validation commands were run.
- GitHub PR body update via `gh` was skipped because `gh` is unavailable in the current Windows shell.

pnpm approve-builds warning status:

- QA `pnpm install` emitted the non-blocking warning: `Ignored build scripts: esbuild@0.28.0. Run "pnpm approve-builds" to pick which dependencies should be allowed to run scripts.`
- The warning does not block validation because all package validation passed.

Optional dev-server smoke status:

- QA started a clean Vite dev server for `@causalledger/web`, requested `http://localhost:5173`, verified HTTP 200 and `CausalLedger Web` in the response, then stopped the process.
- This smoke check confirms only the minimal scaffold serves; it does not create or validate product functionality.

QA decision: PASS.

Historical M02.03 QA safe-to-merge statement: PR #40 was safe to merge after human review. PR #40 has since merged into `main` at commit `6ad4b0c`, and M02.03 is now `Completed and merged`.

## M02.04 Builder Record

Builder date: 2026-06-09.

Branch: `m02-04-create-apps-worker`.

Branch guard:

- `git switch main` succeeded before builder work.
- `git pull --ff-only origin main` fast-forwarded `main` to `6ad4b0c`.
- `git log --oneline --grep="#40" -20` confirmed PR #40 merged at `6ad4b0c` (`chore: create M02.03 web scaffold (#40)`).
- `git branch --list m02-04-create-apps-worker` found no existing local branch.
- `git ls-remote --heads origin m02-04-create-apps-worker` found no existing remote branch.
- `git switch -c m02-04-create-apps-worker` created the branch from updated `main`.
- `git branch --show-current` returned `m02-04-create-apps-worker`.
- `git status --short` was clean before edits.
- `git remote -v` showed `origin` at `https://github.com/Islem-Rezzag/CausalLedger.git`.

Files inspected:

- `docs/ACTIVE_DOCS.md`
- `README.md`
- `START_HERE.md`
- `AGENTS.md`
- `PLANS.md`
- `WORKFLOW.md`
- `docs/INDEX.md`
- `plans/ROADMAP.md`
- `docs/status/CURRENT_STATE.md`
- `docs/status/NEXT_RECOMMENDED_THREAD.md`
- `docs/status/WEEKLY_LOG.md`
- `docs/status/RISK_REGISTER.md`
- `docs/status/TECH_DEBT.md`
- `docs/status/CAPABILITY_MATRIX.md`
- `docs/milestones/M02.md`
- `docs/milestones/SUBMILESTONE_REGISTRY.md`
- `plans/active/CLP-0003-m02-monorepo-and-local-development-environment.md`
- `docs/decisions/ADR-0005-m02-stack-and-monorepo-direction.md`
- `docs/decisions/ADR-0006-local-dev-and-ci-baseline.md`
- `docs/decisions/ADR-0007-logging-error-handling-and-observability-direction.md`
- `docs/ops/planning-and-tracking-system.md`
- `docs/ops/builder-qa-prompt-protocol.md`
- `docs/ops/validation-and-handoff-workflow.md`
- `docs/ops/github-pr-and-issue-workflow.md`
- `.github/PULL_REQUEST_TEMPLATE.md`
- `scripts/validate-control-plane.py`
- `tests/test_control_plane_bootstrap.py`
- `package.json`
- `pnpm-workspace.yaml`
- `turbo.json`
- `tsconfig.base.json`
- `pnpm-lock.yaml`
- `apps/api/package.json`
- `apps/api/README.md`
- `apps/api/tsconfig.json`
- `apps/api/src/app.ts`
- `apps/api/src/index.ts`
- `apps/api/test/bootstrap.test.ts`
- `apps/web/package.json`
- `apps/web/README.md`
- `apps/web/tsconfig.json`
- `apps/web/tsconfig.node.json`
- `apps/web/vite.config.ts`
- `apps/web/index.html`
- `apps/web/src/App.tsx`
- `apps/web/src/main.tsx`
- `apps/web/src/App.test.tsx`
- `apps/worker/README.md`

Builder findings:

- M02.03 PR #40 is merged into `main` at commit `6ad4b0c`.
- M02.04 was the current submilestone after post-merge finalization.
- `apps/worker` contained only a placeholder README before this builder.
- The root workspace already includes `apps/*`, so no workspace globs changed.
- The worker scaffold adds no runtime dependencies and no jobs, queues, schedulers, connectors, database behavior, health checks, CI workflow, Docker Compose, or product/domain behavior.
- M02.05 through M02.20 remain `Not started`.
- M03 through M21 remain `Not started`.
- Product domain implementation has not started.

Files created by builder:

- `apps/worker/package.json`
- `apps/worker/tsconfig.json`
- `apps/worker/src/index.ts`
- `apps/worker/test/bootstrap.test.ts`

Files changed by builder:

- `README.md`
- `START_HERE.md`
- `PLANS.md`
- `WORKFLOW.md`
- `docs/ACTIVE_DOCS.md`
- `docs/INDEX.md`
- `plans/ROADMAP.md`
- `docs/status/CURRENT_STATE.md`
- `docs/status/NEXT_RECOMMENDED_THREAD.md`
- `docs/status/WEEKLY_LOG.md`
- `docs/status/CAPABILITY_MATRIX.md`
- `docs/milestones/M02.md`
- `docs/milestones/SUBMILESTONE_REGISTRY.md`
- `plans/active/CLP-0003-m02-monorepo-and-local-development-environment.md`
- `scripts/validate-control-plane.py`
- `tests/test_control_plane_bootstrap.py`
- `apps/worker/README.md`
- `pnpm-lock.yaml` after `pnpm install`

Files intentionally not touched by builder:

- `apps/api` scaffold files
- `apps/web` scaffold files
- `packages/` future package placeholders
- `.github/workflows/`
- Future M02.05 through M02.20 app, package, database, Redis, Docker Compose, migration, health-check, and CI work
- All M03 through M21 product areas

Validation ladder:

- Level 0: branch and worktree guard.
- Level 1: file, diff, status, and forbidden-scope inspection.
- Level 2: control-plane validation.
- Level 3: bootstrap tests and worker bootstrap test.
- Level 4: diff and whitespace checks.
- Level 7: forbidden-scope checks for product/domain behavior and safety boundaries.
- Level 8: PR and QA readiness handoff.

Validation commands:

- `python scripts/validate-control-plane.py`
- `python -m pytest tests/test_control_plane_bootstrap.py`
- `git diff --check`
- `node --version`
- `npm --version`
- `pnpm --version`
- `pnpm install`
- `pnpm typecheck`
- `pnpm test`
- `pnpm build`
- `pnpm lint`
- `pnpm format:check`
- `make bootstrap-check`, only if `make` is available

Validation results:

- `python scripts/validate-control-plane.py` passed.
- `python -m pytest tests/test_control_plane_bootstrap.py` passed with 32 tests.
- `git diff --check` passed.
- `node --version` returned `v22.16.0`.
- `npm --version` returned `10.9.2`.
- `pnpm --version` returned `10.32.1`.
- `pnpm install` passed across all 4 workspace projects and updated `pnpm-lock.yaml`.
- `pnpm typecheck` passed across `@causalledger/api`, `@causalledger/web`, and `@causalledger/worker`.
- `pnpm test` passed with 3 Vitest tests total.
- `pnpm build` passed across `@causalledger/api`, `@causalledger/web`, and `@causalledger/worker`.
- `pnpm lint` passed across `@causalledger/api`, `@causalledger/web`, and `@causalledger/worker`.
- `pnpm format:check` passed across `@causalledger/api`, `@causalledger/web`, and `@causalledger/worker`.

Skipped validation and reason:

- `make bootstrap-check` was skipped because `Get-Command make -ErrorAction SilentlyContinue` found no `make` command in the current Windows shell. Equivalent direct Python validation commands were run.

pnpm approve-builds warning status:

- M02.04 `pnpm install` did not emit the `esbuild@0.28.0` approve-builds warning. The prior M02.02 and M02.03 warning remains historical only.

Current builder decision: M02.04 is builder complete and ready for QA. Do not start M02.05.

## M02.04 QA Record

QA date: 2026-06-11.

PR: `https://github.com/Islem-Rezzag/CausalLedger/pull/41`.

Branch: `m02-04-create-apps-worker`.

Stash note:

- Previous unrelated local report/status edits were preserved with `git stash push -u -m "wip: local reports and status edits before M02.04 QA"`.
- `git stash list --max-count=3` showed `stash@{0}: On m02-04-create-apps-worker: wip: local reports and status edits before M02.04 QA`.
- The stash was not popped, dropped, deleted, or committed during QA.

Branch and PR guard:

- `git branch --show-current` returned `m02-04-create-apps-worker`.
- `git status --short` was clean after the recovery stash.
- `git remote -v` showed `origin` at `https://github.com/Islem-Rezzag/CausalLedger.git`.
- `git fetch origin` succeeded.
- Local `HEAD` and `origin/m02-04-create-apps-worker` both resolved to `9b9df8d1886b55495322150aa27e2bba32da89a9` before QA edits.
- `git log --oneline main..HEAD` showed one builder commit before QA edits: `9b9df8d chore: create M02.04 worker scaffold`.
- `git diff --name-status main...HEAD` showed only M02.04 builder files and tracking updates.
- `gh pr list --head m02-04-create-apps-worker --base main` could not run because `gh` is unavailable in the current Windows shell.
- The GitHub PR page showed PR #41 open from `m02-04-create-apps-worker` into `main` with builder commit `9b9df8d`.

Files inspected:

- `docs/ACTIVE_DOCS.md`
- `README.md`
- `START_HERE.md`
- `AGENTS.md`
- `PLANS.md`
- `WORKFLOW.md`
- `docs/INDEX.md`
- `plans/ROADMAP.md`
- `docs/status/CURRENT_STATE.md`
- `docs/status/NEXT_RECOMMENDED_THREAD.md`
- `docs/status/WEEKLY_LOG.md`
- `docs/status/RISK_REGISTER.md`
- `docs/status/TECH_DEBT.md`
- `docs/status/CAPABILITY_MATRIX.md`
- `docs/milestones/M02.md`
- `docs/milestones/SUBMILESTONE_REGISTRY.md`
- `plans/active/CLP-0003-m02-monorepo-and-local-development-environment.md`
- `docs/decisions/ADR-0005-m02-stack-and-monorepo-direction.md`
- `docs/decisions/ADR-0006-local-dev-and-ci-baseline.md`
- `docs/decisions/ADR-0007-logging-error-handling-and-observability-direction.md`
- `docs/ops/planning-and-tracking-system.md`
- `docs/ops/builder-qa-prompt-protocol.md`
- `docs/ops/validation-and-handoff-workflow.md`
- `docs/ops/github-pr-and-issue-workflow.md`
- `.github/PULL_REQUEST_TEMPLATE.md`
- `scripts/validate-control-plane.py`
- `tests/test_control_plane_bootstrap.py`
- `package.json`
- `pnpm-workspace.yaml`
- `turbo.json`
- `tsconfig.base.json`
- `pnpm-lock.yaml`
- `apps/api/package.json`
- `apps/api/README.md`
- `apps/web/package.json`
- `apps/web/README.md`
- `apps/worker/package.json`
- `apps/worker/tsconfig.json`
- `apps/worker/src/index.ts`
- `apps/worker/test/bootstrap.test.ts`
- `apps/worker/README.md`

QA findings:

- M02.03 is finalized as `Completed and merged` after PR #40 merged into `main` at commit `6ad4b0c`.
- M02.04 is the current submilestone.
- M02.04 was `Builder complete, awaiting QA` before QA updates.
- PR #41 contains the M02.04 builder commit `9b9df8d`.
- `apps/api` remains a minimal non-domain API scaffold.
- `apps/web` remains a minimal non-domain web scaffold.
- `apps/worker/package.json` is private, scoped as `@causalledger/worker`, and contains only minimal scripts and development dependencies.
- `apps/worker/tsconfig.json` extends the root TypeScript base config and stays minimal.
- `apps/worker/src/index.ts` is a minimal bootstrap module only.
- `apps/worker/test/bootstrap.test.ts` is a non-domain bootstrap test only.
- `apps/worker/README.md` needed modest expansion to include concrete worker check commands and an explicit future-milestone statement.
- No MoneyEvent processing, ledger processing, invariant processing, incident processing, evidence ingestion, replay jobs, repair jobs, queues, schedulers, database connections, external connectors, agent runtime, auth/authz, health checks, structured logging runtime, GitHub Actions, CI workflow, Docker Compose, product/domain tests, M02.05 work, or M03 work was added.
- `scripts/validate-control-plane.py` and `tests/test_control_plane_bootstrap.py` were updated honestly to validate the M02.04 QA-passed state and did not remove existing important checks.
- M02.05 through M02.20 remain `Not started`.
- M03 through M21 remain `Not started`.
- Product domain implementation has not started.

Defects found:

- `apps/worker/README.md` was too terse for the QA prompt because it did not list concrete worker check commands or state that future product worker behavior belongs to later milestones.

Fixes applied:

- Expanded `apps/worker/README.md` with `pnpm --filter @causalledger/worker` build, test, typecheck, lint, and format-check commands.
- Added an explicit statement that future product worker behavior belongs to later scoped milestones.
- Updated durable tracking from `Builder complete, awaiting QA` to `QA passed, awaiting merge`.
- Set the exact next recommended thread to `Merge M02.04 PR - Create apps/worker`.
- Updated control-plane validation expectations to validate the post-QA state.

Files changed by QA:

- `README.md`
- `START_HERE.md`
- `PLANS.md`
- `WORKFLOW.md`
- `docs/ACTIVE_DOCS.md`
- `docs/INDEX.md`
- `plans/ROADMAP.md`
- `docs/status/CURRENT_STATE.md`
- `docs/status/NEXT_RECOMMENDED_THREAD.md`
- `docs/status/WEEKLY_LOG.md`
- `docs/status/CAPABILITY_MATRIX.md`
- `docs/milestones/M02.md`
- `docs/milestones/SUBMILESTONE_REGISTRY.md`
- `plans/active/CLP-0003-m02-monorepo-and-local-development-environment.md`
- `scripts/validate-control-plane.py`
- `tests/test_control_plane_bootstrap.py`
- `apps/worker/README.md`

Files intentionally not touched by QA:

- `apps/worker/package.json`
- `apps/worker/tsconfig.json`
- `apps/worker/src/index.ts`
- `apps/worker/test/bootstrap.test.ts`
- `apps/api` scaffold files
- `apps/web` scaffold files
- `package.json`
- `pnpm-workspace.yaml`
- `turbo.json`
- `tsconfig.base.json`
- `pnpm-lock.yaml`
- `.github/workflows/`
- Docker Compose files
- Future M02.05 through M02.20 files and all M03 through M21 product areas
- Stashed unrelated report/status files

Validation ladder:

- Level 0: branch and worktree guard.
- Level 1: file, diff, status, and forbidden-scope inspection.
- Level 2: control-plane validation.
- Level 3: bootstrap tests and worker bootstrap test.
- Level 4: diff and whitespace checks.
- Level 7: forbidden-scope checks for product/domain behavior and safety boundaries.
- Level 8: QA merge-readiness review.

Validation commands:

- `python scripts/validate-control-plane.py`
- `python -m pytest tests/test_control_plane_bootstrap.py`
- `git diff --check`
- `node --version`
- `npm --version`
- `pnpm --version`
- `pnpm install`
- `pnpm typecheck`
- `pnpm test`
- `pnpm build`
- `pnpm lint`
- `pnpm format:check`
- `make bootstrap-check`, only if `make` is available

Validation results:

- `python scripts/validate-control-plane.py` passed.
- `python -m pytest tests/test_control_plane_bootstrap.py` passed with 32 tests.
- `git diff --check` passed.
- `node --version` returned `v22.16.0`.
- `npm --version` returned `10.9.2`.
- `pnpm --version` returned `10.32.1`.
- `pnpm install` passed across all 4 workspace projects.
- `pnpm typecheck` passed across `@causalledger/api`, `@causalledger/web`, and `@causalledger/worker`.
- `pnpm test` passed with 3 Vitest tests total.
- `pnpm build` passed across `@causalledger/api`, `@causalledger/web`, and `@causalledger/worker`.
- `pnpm lint` passed across `@causalledger/api`, `@causalledger/web`, and `@causalledger/worker`.
- `pnpm format:check` passed across `@causalledger/api`, `@causalledger/web`, and `@causalledger/worker`.

Skipped validation and reason:

- `make bootstrap-check` was skipped because `Get-Command make -ErrorAction SilentlyContinue` found no `make` command in the current Windows shell. Equivalent direct Python validation commands were run.

pnpm approve-builds warning status:

- M02.04 QA `pnpm install` did not emit the `esbuild@0.28.0` approve-builds warning. The prior M02.02 and M02.03 warning remains historical only.

QA decision: PASS.

Safe-to-merge statement: PR #41 is safe to merge after human review. M02.04 is not `Completed and merged` until PR #41 actually merges into `main` and post-merge tracking is finalized. Do not start M02.05 or the process amendment until after that merge and finalization.

## Completed Detail Archived

Completed M02 planning, M02.01, M02.02, M02.03, and M02.04 builder/QA detail is retained in this plan as historical records below and in `docs/status/WEEKLY_LOG.md`. Current live state should be read from the Progress, Decision Log, Context and Orientation, Scope, M02 Submilestones and Expected Branches, and Outcomes sections rather than from older completed-submilestone records.

The current process-amendment slice supersedes older "next thread" statements that pointed to merging PR #41 or starting the former 20-slice M02 sequence.

## Validation Results

2026-06-02 validation results:

- `python scripts/validate-control-plane.py` passed.
- `python -m pytest tests/test_control_plane_bootstrap.py` passed with 32 tests.
- `git diff --check` passed.
- `make bootstrap-check` was skipped because `make` is unavailable in the current Windows shell.

2026-06-08 M02.01 builder validation results:

- `python scripts/validate-control-plane.py` passed.
- `python -m pytest tests/test_control_plane_bootstrap.py` passed with 32 tests.
- `git diff --check` passed.
- `make bootstrap-check` was skipped because `make` is unavailable in the current Windows shell. Equivalent direct Python validation commands were run.

2026-06-08 M02.01 QA validation results:

- `python scripts/validate-control-plane.py` passed.
- `python -m pytest tests/test_control_plane_bootstrap.py` passed with 32 tests.
- `git diff --check` passed.
- `make bootstrap-check` was skipped because `make` is unavailable in the current Windows shell. Equivalent direct Python validation commands were run.

2026-06-08 M02.02 package validation results:

- `node --version` returned `v22.16.0`.
- `npm --version` returned `10.9.2`.
- `pnpm --version` returned `10.32.1`.
- `pnpm install` passed; lockfile was up to date.
- `pnpm typecheck` passed.
- `pnpm test` passed with 1 Vitest test.
- `pnpm build` passed.
- `pnpm lint` passed.
- Initial `pnpm format:check` failed on Prettier formatting for `apps/api/src/app.ts` and `apps/api/src/index.ts`.
- Scoped `pnpm --filter @causalledger/api exec prettier --write "src/**/*.ts" "test/**/*.ts" "README.md" "package.json" "tsconfig.json"` rewrote the two source files only.
- Rerun `pnpm format:check` passed.
- `pnpm add --filter @causalledger/api -D typescript@latest tsx@latest vitest@latest prettier@latest @types/node@latest` emitted a non-blocking warning that `esbuild@0.28.0` build scripts were ignored by pnpm approve-builds policy; package validation still passed.

2026-06-08 M02.02 control-plane validation results:

- `python scripts/validate-control-plane.py` passed.
- `python -m pytest tests/test_control_plane_bootstrap.py` passed with 32 tests.
- `git diff --check` passed.
- `make bootstrap-check` was skipped because `make` is unavailable in the current Windows shell. Equivalent direct Python validation commands were run.

2026-06-09 M02.02 QA validation results:

- `python scripts/validate-control-plane.py` passed.
- `python -m pytest tests/test_control_plane_bootstrap.py` passed with 32 tests.
- `git diff --check` passed.
- `node --version` returned `v22.16.0`.
- `npm --version` returned `10.9.2`.
- `pnpm --version` returned `10.32.1`.
- Initial `python scripts/validate-control-plane.py` failed because `docs/status/NEXT_RECOMMENDED_THREAD.md` lacked the required M01 completion context after the QA next-thread rewrite; the scoped next-thread context was restored and validation was rerun successfully.
- `pnpm install` passed, reported the lockfile was up to date, and emitted the non-blocking approve-builds warning for `esbuild@0.28.0`.
- `pnpm typecheck` passed.
- `pnpm test` passed with 1 Vitest test.
- `pnpm build` passed.
- `pnpm lint` passed.
- `pnpm format:check` passed.
- `make bootstrap-check` was skipped because `make` is unavailable in the current Windows shell. Equivalent direct Python validation commands were run.

2026-06-09 M02.03 package validation results:

- Initial `pnpm typecheck` failed because `apps/web/tsconfig.json` lacked DOM libs for `document`.
- Scoped fix: added `DOM` and `DOM.Iterable` to the web tsconfig `lib` setting.
- Rerun `pnpm typecheck` passed.
- `pnpm test` passed with 2 Vitest tests total.
- `pnpm build` passed.
- `pnpm lint` passed.
- Initial `pnpm format:check` failed because `apps/web/package.json` included a nonexistent `src/**/*.ts` Prettier glob.
- Scoped fix: removed the nonexistent glob from the web `format:check` script.
- Rerun `pnpm format:check` passed.
- `pnpm install` passed and emitted the non-blocking approve-builds warning for `esbuild@0.28.0`.

2026-06-09 M02.03 control-plane validation results:

- `python scripts/validate-control-plane.py` passed.
- `python -m pytest tests/test_control_plane_bootstrap.py` passed with 32 tests.
- `git diff --check` passed.
- `make bootstrap-check` was skipped because `make` is unavailable in the current Windows shell. Equivalent direct Python validation commands were run.
- Optional dev-server smoke passed at `http://localhost:5173` with HTTP 200 and `CausalLedger Web` in the response.

2026-06-09 M02.03 QA validation results:

- `python scripts/validate-control-plane.py` passed.
- `python -m pytest tests/test_control_plane_bootstrap.py` passed with 32 tests.
- `git diff --check` passed.
- `node --version` returned `v22.16.0`.
- `npm --version` returned `10.9.2`.
- `pnpm --version` returned `10.32.1`.
- `pnpm install` passed, reported the lockfile was up to date, and emitted the non-blocking approve-builds warning for `esbuild@0.28.0`.
- `pnpm typecheck` passed.
- `pnpm test` passed with 2 Vitest tests.
- `pnpm build` passed.
- `pnpm lint` passed.
- `pnpm format:check` passed.
- `make bootstrap-check` was skipped because `make` is unavailable in the current Windows shell. Equivalent direct Python validation commands were run.
- Optional dev-server smoke passed at `http://localhost:5173` with HTTP 200 and `CausalLedger Web` in the response.

2026-06-09 M02.04 builder validation results:

- `python scripts/validate-control-plane.py` passed.
- `python -m pytest tests/test_control_plane_bootstrap.py` passed with 32 tests.
- `git diff --check` passed.
- `node --version` returned `v22.16.0`.
- `npm --version` returned `10.9.2`.
- `pnpm --version` returned `10.32.1`.
- `pnpm install` passed across all 4 workspace projects and updated `pnpm-lock.yaml`.
- `pnpm typecheck` passed.
- `pnpm test` passed with 3 Vitest tests.
- `pnpm build` passed.
- `pnpm lint` passed.
- `pnpm format:check` passed.
- `make bootstrap-check` was skipped because `make` is unavailable in the current Windows shell. Equivalent direct Python validation commands were run.
- M02.04 `pnpm install` did not emit the `esbuild@0.28.0` approve-builds warning.

2026-06-11 M02.04 QA validation results:

- `python scripts/validate-control-plane.py` passed.
- `python -m pytest tests/test_control_plane_bootstrap.py` passed with 32 tests.
- `git diff --check` passed.
- `node --version` returned `v22.16.0`.
- `npm --version` returned `10.9.2`.
- `pnpm --version` returned `10.32.1`.
- `pnpm install` passed across all 4 workspace projects.
- `pnpm typecheck` passed.
- `pnpm test` passed with 3 Vitest tests.
- `pnpm build` passed.
- `pnpm lint` passed.
- `pnpm format:check` passed.
- `make bootstrap-check` was skipped because `make` is unavailable in the current Windows shell. Equivalent direct Python validation commands were run.
- M02.04 QA `pnpm install` did not emit the `esbuild@0.28.0` approve-builds warning.

2026-06-11 M02 process amendment builder validation results:

- `python scripts/validate-control-plane.py` passed.
- `python -m pytest tests/test_control_plane_bootstrap.py` passed with 32 tests.
- `git diff --check` passed.
- `node --version` returned `v22.16.0`.
- `npm --version` returned `10.9.2`.
- `pnpm --version` returned `10.32.1`.
- `pnpm install` passed across all 4 workspace projects and reported the lockfile was up to date.
- `pnpm install` emitted the non-blocking `esbuild@0.28.0` ignored-build-scripts warning; package validation still passed.
- `pnpm typecheck` passed across `@causalledger/api`, `@causalledger/web`, and `@causalledger/worker`.
- `pnpm test` passed with 3 Vitest tests.
- `pnpm build` passed across `@causalledger/api`, `@causalledger/web`, and `@causalledger/worker`.
- `pnpm lint` passed across `@causalledger/api`, `@causalledger/web`, and `@causalledger/worker`.
- `pnpm format:check` passed across `@causalledger/api`, `@causalledger/web`, and `@causalledger/worker`.
- `make bootstrap-check` was skipped because `make` is unavailable in the current Windows shell. Equivalent direct Python validation commands were run.
- Process-amendment `pnpm install` did not emit the `esbuild@0.28.0` approve-builds warning.

2026-06-24 M02 process amendment QA validation results:

- `python scripts/validate-control-plane.py` passed.
- `python -m pytest tests/test_control_plane_bootstrap.py` passed with 38 tests.
- `git diff --check` passed.
- `node --version` returned `v22.16.0`.
- `npm --version` returned `10.9.2`.
- `pnpm --version` returned `10.32.1`.
- `pnpm install` passed across all 4 workspace projects and reported the lockfile was up to date.
- `pnpm typecheck` passed across `@causalledger/api`, `@causalledger/web`, and `@causalledger/worker`.
- `pnpm lint` passed across `@causalledger/api`, `@causalledger/web`, and `@causalledger/worker`.
- `pnpm test` passed with 3 Vitest tests.
- `pnpm build` passed across `@causalledger/api`, `@causalledger/web`, and `@causalledger/worker`.
- `pnpm format:check` passed across `@causalledger/api`, `@causalledger/web`, and `@causalledger/worker`.
- `make bootstrap-check` was skipped because `make` is unavailable in the current Windows shell. Equivalent direct Python validation commands were run.

2026-06-24 M02.05 builder validation results:

- `python scripts/validate-control-plane.py` passed.
- `python -m pytest tests/test_control_plane_bootstrap.py` passed with 40 tests.
- `git diff --check` passed.
- `node --version` returned `v22.16.0`.
- `npm --version` returned `10.9.2`.
- `pnpm --version` returned `10.32.1`.
- `pnpm install` passed across all 14 workspace projects after adding package workspaces and updating `pnpm-lock.yaml`.
- `pnpm typecheck` initially failed before package workspace links were installed, then passed after `pnpm install`.
- `pnpm test` initially failed before package workspace links were installed, then passed after `pnpm install`.
- `pnpm exec turbo lint --force` and `pnpm lint` passed with real ESLint.
- `pnpm build` passed.
- `pnpm format:check` passed.
- `.github/workflows/ci.yml` parsed as YAML, and root config formatting passed through package-local Prettier.
- `actionlint` was unavailable in the current Windows shell, so CI validation was limited to structural validator checks, YAML parsing, and formatting.
- `make bootstrap-check` was skipped because `make` is unavailable in the current Windows shell. Equivalent direct Python validation commands were run.
- `pnpm install` emitted the non-blocking `esbuild@0.28.0` ignored-build-scripts warning; validation still passed.

2026-06-24 M02.05 QA validation results:

- `git branch --show-current` returned `m02-05-package-scaffolds-eslint-ci`.
- `git status --short` was clean before QA edits.
- `git remote -v` showed `origin` as `https://github.com/Islem-Rezzag/CausalLedger.git`.
- `git stash list --max-count=5` returned no stashes.
- `git log --oneline -10` showed builder commit `96a9f89`.
- `git rev-parse HEAD` matched `origin/m02-05-package-scaffolds-eslint-ci` before QA edits.
- GitHub REST API verified PR #43 is open, non-draft, targets `main`, and uses head branch `m02-05-package-scaffolds-eslint-ci`.
- Initial remote CI for builder commit `96a9f89` failed in `Run control-plane tests`; GitHub public page annotations showed `Process completed with exit code 1`.
- Scoped QA fixes added explicit pytest installation through `requirements-dev.txt` and test TypeScript configs.
- `python scripts/validate-control-plane.py` passed.
- `python -m pytest tests/test_control_plane_bootstrap.py` passed with 48 tests.
- `pnpm typecheck` passed and invoked both source and test TypeScript configs across all 13 workspaces.
- Full QA validation passed: `git diff --check`, Node/npm/pnpm version checks, `python -m pip install -r requirements-dev.txt --dry-run`, `pnpm install --frozen-lockfile`, `pnpm lint`, `pnpm test`, `pnpm build`, and `pnpm format:check`.
- ESLint proof passed with `pnpm exec eslint --print-config packages/events/src/index.ts`.
- Post-push GitHub Actions CI passed for the QA commit.
- `gh`, `actionlint`, and `make bootstrap-check` were unavailable in the current Windows shell; GitHub REST/API page inspection and direct Python validation were used where applicable.
- GitHub Actions emitted a non-blocking warning that Node.js 20 actions internals are deprecated and forced to Node.js 24 for `actions/checkout@v4`, `actions/setup-node@v4`, and `actions/setup-python@v5`.

2026-06-24 M02.06 builder validation results:

- `git branch --show-current` returned `m02-06-local-infra-postgres-migrations-health` after branch creation.
- `git status --short` was clean before M02.06 edits.
- `git remote -v` showed `origin` as `https://github.com/Islem-Rezzag/CausalLedger.git`.
- `git log --oneline -20` confirmed PR #43 merged into `main` at commit `6e76045` (`chore: create M02.05 package ESLint and CI baseline (#43)`).
- `git stash list --max-count=5` returned no stashes.
- `pnpm exec node-pg-migrate --help` passed and showed supported commands `up`, `down`, `create`, and `redo`.
- `python scripts/validate-control-plane.py` passed.
- `python -m pytest tests/test_control_plane_bootstrap.py` passed with 54 tests.
- `git diff --check` passed.
- `node --version` returned `v22.16.0`.
- `npm --version` returned `10.9.2`.
- `pnpm --version` returned `10.32.1`.
- `pnpm install --frozen-lockfile` passed across all 14 workspace projects and reported the lockfile was up to date.
- `pnpm typecheck` passed across all 13 workspaces.
- `pnpm lint` passed across all 13 workspaces.
- `pnpm test` passed across all 13 workspaces; `apps/api` covers `/infra/ready`.
- `pnpm build` passed across all 13 workspaces.
- `pnpm format:check` passed across all 13 workspaces.
- Docker validation did not run because `docker --version` and `docker compose version` both failed with `docker` not recognized in the current Windows shell. `docker compose config`, `docker compose up -d`, `docker compose ps`, `pnpm migrate:up` against local Postgres, and `docker compose down -v` were skipped for that reason.
- `make bootstrap-check` was skipped because `Get-Command make -ErrorAction SilentlyContinue` found no `make` command in the current Windows shell. Equivalent direct Python validation commands passed.
- `pnpm add -D node-pg-migrate -w` emitted a non-blocking deprecated subdependency warning for `glob@11.1.0`.
- `pnpm add -D node-pg-migrate -w` and `pnpm install --frozen-lockfile` emitted the non-blocking `esbuild@0.28.0` ignored-build-scripts warning; validation still passed.

2026-06-24 M02.06 QA validation results:

- `git branch --show-current` returned `m02-06-local-infra-postgres-migrations-health`.
- `git status --short` was clean before QA edits.
- `git remote -v` showed `origin` as `https://github.com/Islem-Rezzag/CausalLedger.git`.
- `git stash list --max-count=5` returned no stashes.
- `git log --oneline -10` showed builder commit `b3c9c43`.
- `git rev-parse HEAD` matched `origin/m02-06-local-infra-postgres-migrations-health` before QA edits.
- GitHub REST API verified PR #44 targets `main`, uses head branch `m02-06-local-infra-postgres-migrations-health`, is open and unmerged, and contains builder commit `b3c9c43`.
- Initial remote CI for builder commit `b3c9c43` passed the standard `validate` job but had no infrastructure smoke job.
- Local Docker validation was unavailable because `docker --version`, `docker compose version`, and `docker compose config` failed with `docker` not recognized in this Windows shell.
- Scoped QA fixes added a remote `infra-smoke` CI job, removed the fixed Compose `container_name`, and changed `/infra/ready` to explicit process-only readiness.
- First post-push `infra-smoke` failed in `Run empty migration boundary`; the migration scripts were corrected to ignore `README.md` in the documentation-only migration directory.
- `python scripts/validate-control-plane.py` passed.
- `python -m pytest tests/test_control_plane_bootstrap.py` passed with 57 tests.
- `pnpm --filter @causalledger/api test` passed with 1 Vitest test.
- `pnpm --filter @causalledger/api typecheck` passed.
- Full QA validation passed: `git diff --check`, Node/npm/pnpm version checks, `pnpm install --frozen-lockfile`, `pnpm typecheck`, `pnpm lint`, `pnpm test`, `pnpm build`, and `pnpm format:check`.
- Post-push GitHub Actions passed for the latest QA commit: standard `validate` and infrastructure `infra-smoke`.
- Remote `infra-smoke` validated `docker compose config`, started Postgres, waited for healthy status, ran `pnpm migrate:up`, inspected the public schema, allowed only no tables or `pgmigrations`, and ran `docker compose down -v` cleanup.
- `gh`, local Docker, and `make bootstrap-check` were unavailable in the current Windows shell; GitHub REST/API inspection, remote GitHub Actions Docker evidence, and direct Python validation were used where applicable.
- GitHub Actions emitted a non-blocking warning that Node.js 20 actions internals are deprecated and forced to Node.js 24 for `actions/checkout@v4`, `actions/setup-node@v4`, and `actions/setup-python@v5`.

2026-06-24 M02.07 builder validation results:

- `git branch --show-current` returned `m02-07-qa-development-environment` after branch creation.
- `git status --short` was clean before M02.07 edits.
- `git remote -v` showed `origin` as `https://github.com/Islem-Rezzag/CausalLedger.git`.
- `git log --oneline -20` confirmed PR #44 merged into `main` at commit `80ce206` (`chore: create M02.06 local infra baseline (#44)`).
- `git stash list --max-count=5` returned no stashes.
- `python scripts/validate-control-plane.py` passed.
- `python -m pytest tests/test_control_plane_bootstrap.py` passed with 62 tests.
- `git diff --check` passed.
- `node --version` returned `v22.16.0`.
- `npm --version` returned `10.9.2`.
- `pnpm --version` returned `10.32.1`.
- `pnpm install --frozen-lockfile` passed across all 14 workspace projects and reported the lockfile was up to date.
- `pnpm typecheck` passed across all 13 workspaces.
- `pnpm lint` passed across all 13 workspaces.
- `pnpm test` passed across all 13 workspaces.
- `pnpm build` passed across all 13 workspaces.
- `pnpm format:check` passed across all 13 workspaces.
- `pnpm qa:dev` passed with 18 `PASS`, 0 `FAIL`, and 1 `SKIPPED`; Docker validation was skipped in default mode by design.
- Local Docker validation did not run because `docker --version` and `docker compose version` both failed with `docker` not recognized in the current Windows shell. Existing M02.06 remote `infra-smoke` evidence remains the available Docker/Postgres/migration smoke record.
- `make bootstrap-check` was skipped because `Get-Command make -ErrorAction SilentlyContinue` found no `make` command in the current Windows shell. Equivalent direct Python validation commands passed.
- `pnpm install --frozen-lockfile` emitted the known non-blocking `esbuild@0.28.0` ignored-build-scripts warning; validation still passed.

2026-06-24 M02.07 QA validation results:

- `git branch --show-current` returned `m02-07-qa-development-environment`.
- `git status --short` was clean before QA edits.
- `git remote -v` showed `origin` as `https://github.com/Islem-Rezzag/CausalLedger.git`.
- `git stash list --max-count=5` returned no stashes.
- `git log --oneline -10` showed builder commit `e231cec`.
- `git rev-parse HEAD` matched `origin/m02-07-qa-development-environment` before QA edits.
- GitHub API verified PR #45 is open, draft, unmerged, targets `main`, uses head branch `m02-07-qa-development-environment`, and contains builder commit `e231cec`.
- Scoped QA fixes corrected dirty-worktree failure semantics, repository-local identity lookup, deterministic Docker env isolation, Docker flow control, standard `pnpm qa:dev` CI proof, and behavioral tests.
- `python scripts/validate-control-plane.py` passed.
- `python -m pytest tests/test_control_plane_bootstrap.py` passed with 76 tests.
- `git diff --check` passed.
- `node --version` returned `v22.16.0`.
- `npm --version` returned `10.9.2`.
- `pnpm --version` returned `10.32.1`.
- `pnpm install --frozen-lockfile` passed across all 14 workspace projects and emitted the known non-blocking `esbuild@0.28.0` ignored-build-scripts warning.
- `pnpm typecheck` passed across all 13 workspaces.
- `pnpm lint` passed across all 13 workspaces.
- `pnpm test` passed across all 13 workspaces.
- `pnpm build` passed across all 13 workspaces.
- `pnpm format:check` passed across all 13 workspaces.
- `pnpm qa:dev -- --allow-dirty` passed during uncommitted QA work with 17 `PASS`, 0 `FAIL`, and 2 `SKIPPED`; the clean-worktree requirement was skipped only because `--allow-dirty` was explicit, and Docker validation was skipped in default mode by design.
- After committing the scoped QA fixes and confirming a clean worktree, final `pnpm qa:dev` passed with 18 `PASS`, 0 `FAIL`, and 1 `SKIPPED`; Docker validation was skipped in default mode by design.
- Local Docker validation did not run because `docker --version` and `docker compose version` both failed with `docker` not recognized in the current Windows shell. The accepted equivalent proof is the existing remote `infra-smoke` Docker/Postgres/migration job plus behavioral tests proving the QA script constructs isolated Docker actions.
- `make bootstrap-check` was skipped because `make` is unavailable in the current Windows shell. Equivalent direct Python validation commands passed.

## Idempotence and Recovery

If validation fails, do not widen scope. Fix only planning/control-plane defects introduced by this thread, rerun validation, and record results. If an unexpected dirty worktree appears, inspect it, preserve user changes, and report any conflict before proceeding.

If the M02.04 merge/finalization thread is not on updated `main` after PR #41 merges, stop immediately before post-merge tracking edits.

## Artifacts and Notes

Created or expected planning artifacts:

- `plans/active/CLP-0003-m02-monorepo-and-local-development-environment.md`
- `docs/decisions/ADR-0005-m02-stack-and-monorepo-direction.md`
- `docs/decisions/ADR-0006-local-dev-and-ci-baseline.md`
- `docs/decisions/ADR-0007-logging-error-handling-and-observability-direction.md`

Created M02.02 API foundation artifacts:

- `package.json`
- `pnpm-workspace.yaml`
- `turbo.json`
- `tsconfig.base.json`
- `pnpm-lock.yaml`
- `apps/api/package.json`
- `apps/api/tsconfig.json`
- `apps/api/src/app.ts`
- `apps/api/src/index.ts`
- `apps/api/test/bootstrap.test.ts`
- `apps/api/README.md`

Created M02.03 web foundation artifacts:

- `apps/web/package.json`
- `apps/web/tsconfig.json`
- `apps/web/tsconfig.node.json`
- `apps/web/vite.config.ts`
- `apps/web/index.html`
- `apps/web/src/App.tsx`
- `apps/web/src/main.tsx`
- `apps/web/src/App.test.tsx`
- `apps/web/README.md`

Created M02.04 worker foundation artifacts:

- `apps/worker/package.json`
- `apps/worker/tsconfig.json`
- `apps/worker/src/index.ts`
- `apps/worker/test/bootstrap.test.ts`
- `apps/worker/README.md`

Created M02.05 package, ESLint, CI, and validation artifacts:

- `.github/workflows/ci.yml`
- `requirements-dev.txt`
- `eslint.config.js`
- updated root `package.json` and `pnpm-lock.yaml`
- updated `apps/api/package.json`, `apps/web/package.json`, and `apps/worker/package.json` lint and typecheck scripts
- added `apps/api/tsconfig.test.json`, `apps/web/tsconfig.test.json`, and `apps/worker/tsconfig.test.json`
- updated `scripts/validate-control-plane.py`
- updated `tests/test_control_plane_bootstrap.py`
- package scaffold files under each M02.05 package: `package.json`, `tsconfig.json`, `tsconfig.test.json`, `src/index.ts`, `test/bootstrap.test.ts`, and `README.md`

Created M02.06 local infrastructure artifacts:

- `docker-compose.yml`
- `.github/workflows/ci.yml` updated with `infra-smoke`
- `infra/README.md`
- updated `infra/docker/README.md`
- updated `infra/migrations/README.md`
- updated `.env.example` with empty local Postgres override keys
- updated root `package.json` and `pnpm-lock.yaml` with `node-pg-migrate` and local infra scripts
- updated `apps/api/src/app.ts` with `/infra/ready`
- updated `apps/api/test/bootstrap.test.ts`
- updated `apps/api/README.md`
- updated `scripts/validate-control-plane.py`
- updated `tests/test_control_plane_bootstrap.py`

Created M02.07 QA development environment artifacts:

- `scripts/qa-dev-environment.py`
- `docs/ops/qa-development-environment.md`
- root `package.json` updated with `qa:dev`
- updated `scripts/validate-control-plane.py`
- updated `tests/test_control_plane_bootstrap.py`
- updated active docs, roadmap, M02 milestone docs, registry, status docs, ADR-0006, changelog, and active plan tracking

## Interfaces and Dependencies

Future M02 implementation dependencies:

- app layout: `apps/api`, `apps/web`, and `apps/worker`; `apps/agent-runtime` remains deferred to the M10 era.
- package layout: `packages/core`, `packages/events`, `packages/ledger`, `packages/invariants`, `packages/incidents`, `packages/graph`, `packages/replay`, `packages/repair`, `packages/evidence`, and `packages/evals`.
- local services: M02.06 adds local-only Postgres, Docker Compose, migration tooling, and a process readiness stub; Redis remains deferred until needed.
- validation: local checks, M02.05 baseline CI workflow, M02.06 local infrastructure structural validation, a remote `infra-smoke` job for Compose/Postgres/migration evidence, and the M02.07 `pnpm qa:dev` orchestration command with explicit Docker opt-in.

Deterministic truth layers must stay separate from agent proposal layers. Evidence handling remains append-only by design. Repair proposal work must not become repair application work.

## Outcomes & Retrospective

M02 planning builder work completed as documentation/control-plane work only. At that planning-builder handoff, product implementation had not started and M02.01 through M02.20 remained `Not started`.

Exact next recommended thread after this planning builder is complete: `M02 Planning QA - Monorepo and Local Development Environment`.

M02.01 builder and QA work completed as documentation/control-plane work only. M02.01 is `Completed and merged` after PR #38 merged into `main` at commit `fb2b901`.

Stack decision summary:

- TypeScript-first monorepo.
- Node.js/Fastify future API.
- React/Vite future web app.
- pnpm workspaces.
- Turborepo.
- ESLint/Prettier.
- Vitest.
- TypeScript types plus Zod or equivalent future runtime schema validation for MoneyEvent contracts.

M02.02 builder work created a minimal non-domain `apps/api` TypeScript/Fastify foundation and required pnpm/Turborepo workspace manifests. M02.02 QA passed for PR #39, and PR #39 merged into `main` at commit `8ddf5da`.

M02.03 builder work created a minimal non-domain `apps/web` React/Vite foundation. M02.03 QA passed for PR #40, and PR #40 merged into `main` at commit `6ad4b0c`.

M02.04 builder work created a minimal non-domain `apps/worker` TypeScript foundation. M02.04 QA passed for PR #41 after a scoped README documentation fix, and PR #41 merged into `main` at commit `f52396558e127e33e02c6e992d8a5f91cfe4dc0f`. Product domain implementation has not started. M02.05 through M02.07 remain `Not started`; former M02.08 through M02.20 rows are deferred or absorbed; M03 through M21 remain `Not started`.

M02 process amendment QA passed for PR #42 after replacing brittle live-status validation with structural registry, milestone, roadmap, current-state, and next-thread parsing. PR #42 merged into `main` at commit `d5c27c4`.

M02.05 builder work created scaffold-only package boundaries, introduced real flat ESLint, added baseline validation-only CI, and updated control-plane validation for those boundaries. M02.05 QA found and fixed missing clean-runner pytest installation and missing test typecheck coverage, then passed local and remote validation. M02.05 PR #43 merged into `main` at commit `6e76045`.

M02.06 builder work created local-only Docker Compose/Postgres, `node-pg-migrate` root commands, empty env placeholders, migration boundary documentation, and `/infra/ready` as an infrastructure readiness stub. M02.06 QA corrected the readiness stub to process-only semantics, removed the fixed Compose container name, and added remote infrastructure smoke validation. M02.06 is `Completed and merged` after PR #44 merged into `main` at commit `80ce206`.

M02.07 builder work created a repeatable QA development environment with `scripts/qa-dev-environment.py`, root `pnpm qa:dev`, explicit Docker opt-in, documentation, validator coverage, and bootstrap tests. M02.07 QA corrected truthful dirty-worktree behavior, repository-local identity enforcement, Docker environment isolation, Docker flow control, Linux QA-command proof, and behavioral tests. Product domain implementation has not started. M02.07 is `QA passed, awaiting merge`; former M02.08 through M02.20 rows are deferred or absorbed; M03 through M21 remain `Not started`.

Exact next recommended thread after this M02.07 QA is complete: `Merge M02.07 PR - QA Development Environment`.
