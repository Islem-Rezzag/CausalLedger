# CLP-0004 M03 Canonical MoneyEvent Engine

## Purpose / Big Picture

Plan M03 before any MoneyEvent implementation begins.

M03 will define the canonical MoneyEvent engine boundary for future deterministic money-movement processing. The milestone should turn M01 domain language and M02 package scaffolding into a carefully scoped implementation path for canonical event contracts, source mapping, validation, fixtures, and QA.

This planning slice is control-plane and documentation work only. It does not implement MoneyEvent behavior, runtime schemas, database tables, product/domain code, API routes, UI, storage, parser behavior, validators, agent runtime, ledger posting, repair approval, or M03.01 builder work.

## Progress

- [x] 2026-06-29: Synced `main` after M02 closeout merged and confirmed `main` is at `24228fd` (`M02 closeout monorepo and local development environment (#46)`).
- [x] 2026-06-29: Configured repository-local Git identity as `Mohamed Islem Rezzag Baara <Islem-Rezzag@users.noreply.github.com>`.
- [x] 2026-06-29: Confirmed no active `CLP-*.md` plan existed before M03 planning and `CLP-0004` was unused.
- [x] 2026-06-29: Created branch `m03-planning-canonical-moneyevent-engine` from updated `main`.
- [x] 2026-06-29: Read required active docs, status docs, M02 closeout docs, M03 milestone docs, architecture/domain/reliability/threat docs, ADR-0008, package placeholders, validator, and bootstrap tests before editing.
- [x] 2026-06-29: Completed the requested M03 reasoning checkpoint before editing.
- [x] Update M03 planning, tracking, status, validator, and test files.
- [x] Run required validation.
- [x] 2026-06-29: Committed and pushed builder commit `9549ec0`; PR #47 opened at `https://github.com/Islem-Rezzag/CausalLedger/pull/47`.
- [x] 2026-06-30: M03 Planning QA verified PR #47 is open, unmerged, targets `main`, uses head branch `m03-planning-canonical-moneyevent-engine`, contains builder commit `9549ec0`, and changes only scoped planning/control-plane files.
- [x] 2026-06-30: M03 Planning QA found no MoneyEvent runtime, schema, parser, validator, storage, database table, API route, UI, fixture, simulator, benchmark data, ledger, invariant, incident, replay, repair, connector, or agent runtime implementation.
- [x] 2026-06-30: M03 Planning QA applied scoped QA tracking updates only.
- [ ] Human merge of PR #47 after QA PASS and green remote checks.

## Surprises & Discoveries

- `docs/milestones/M03.md` and the registry already contained a broad 19-row M03 outline with database and API work. The requested planning scope is leaner and explicitly forbids database schema, API routes, and product UI in planning.
- M02 closeout is merged on `main`, and `plans/active/` contained no active CLP plan before this branch.
- The package layer remains scaffold-only; no MoneyEvent runtime files exist at planning start.

## Decision Log

- Use `CLP-0004-m03-canonical-moneyevent-engine.md` as the active M03 plan because `CLP-0004` was unused.
- Treat M03 planning as active while keeping M03.01 through M03.06 `Not started`.
- Reshape M03 into six lean submilestones to avoid database/API/UI work before the canonical event contract is ready.
- Keep database schema, API routes, product UI, agent runtime, repair behavior, ledger posting, and storage behavior out of M03 planning.

## Context and Orientation

M00 established the repo operating system. M01 froze domain language and safety boundaries. M02 established the runnable monorepo, non-domain app scaffolds, scaffold-only packages, CI, local infrastructure baseline, and repeatable QA command.

M03 is the first product/domain milestone because later ledger, invariant, incident, graph, replay, repair, and benchmark work need a stable canonical representation of money-movement evidence. That representation must be deterministic, evidence-linked, provenance-aware, idempotent, and explicit about uncertainty.

The LLM remains advisory. Financial truth comes from raw evidence, canonical events, deterministic invariants, replay, evidence bundles, and human approval. Planning text cannot establish MoneyEvent behavior.

## Scope

M03 planning includes:

- the active M03 plan;
- M03 milestone scope and lean submilestone structure;
- roadmap, registry, current-state, next-thread, weekly-log, active-doc, index, and capability-matrix updates;
- planning acceptance criteria, validation strategy, risks, data assumptions, evaluation assumptions, open questions, and handoff protocol;
- validator and bootstrap test updates only where needed to recognize the active M03 planning state and preserve forbidden scope.

M03 implementation submilestones may later cover:

- canonical MoneyEvent concept and contract planning;
- TypeScript type and schema boundary work;
- evidence-to-MoneyEvent mapping fixtures and simulator planning;
- deterministic validation and normalization rules;
- test fixtures and benchmark seed cases;
- QA and closeout.

## Forbidden Scope

This planning slice must not:

- implement MoneyEvent behavior;
- create runtime schemas;
- create database tables or migrations;
- create product/domain package implementation files;
- create API routes;
- create product UI;
- create parser, validator, storage, connector, ledger, invariant, incident, replay, repair, or agent runtime behavior;
- start M03.01 builder work;
- mutate money, post ledger entries, approve repairs, delete evidence, modify raw events, or override deterministic invariants.

## Plan of Work

1. Create this active M03 plan.
2. Replace the old broad M03 registry/milestone shape with the lean six-submilestone plan.
3. Update status and entry docs so the repo says M03 planning is active and M03.01 through M03.06 are not started.
4. Update validation code and tests only for structural planning-state checks and forbidden runtime scope.
5. Run control-plane, bootstrap, diff, package, and QA-development validation.
6. Commit and push the scoped planning branch.
7. Open a draft PR if GitHub CLI is available; otherwise provide the manual PR URL.

## Concrete Steps

### M03.01 Canonical MoneyEvent Concept and Contract Planning

Defines what MoneyEvent must mean conceptually: identity, source identity, provenance, amount, currency, actors, objects, lifecycle references, timestamps, idempotency, source references, and uncertainty. It does not implement TypeScript types, runtime schemas, parser behavior, validators, or storage.

### M03.02 MoneyEvent TypeScript Types and Schema Boundary

Introduces the TypeScript type boundary and future runtime-schema direction inside `packages/events/` only after planning QA and PR merge. It must not create database tables, API routes, ingestion, storage, ledger posting, repair behavior, or agent tools.

### M03.03 Evidence-to-MoneyEvent Mapping Fixtures and Simulator Planning

Plans and seeds controlled mapping fixtures from provider-like events, settlement rows, bank lines, refunds, chargebacks, and synthetic simulator outputs. It must preserve raw references and must not implement real connectors, evidence storage, live ingestion, or external integrations.

### M03.04 MoneyEvent Validation and Normalization Rules

Defines deterministic validation and normalization rules for identity, idempotency, money representation, currency, timestamp ordering, provenance, source references, uncertainty, duplicate evidence, missing evidence, and conflicting evidence. It must not use LLM judgment as validation.

### M03.05 MoneyEvent Test Fixtures and Benchmark Seed Cases

Creates deterministic fixtures and early benchmark seed cases that later MoneyFlowBench work can reuse. It must not claim benchmark results, product readiness, incident detection, replay correctness, or repair safety.

### M03.06 MoneyEvent QA and Closeout

Runs QA, verifies forbidden scope, confirms deterministic tests and documentation are aligned, records validation, and prepares M03 closeout. It must not mark M03 complete without QA PASS, merge confirmation, and closeout.

## Validation and Acceptance

Applicable validation ladder for this planning slice:

- Level 0: branch and worktree guard.
- Level 1: file and forbidden-scope inspection.
- Level 2: control-plane validation.
- Level 3: bootstrap tests.
- Level 4: diff and whitespace checks.
- Level 5: package validation because workspace package checks exist, but no product behavior is claimed.
- Level 7: safety and forbidden-scope checks for MoneyEvent, financial truth, evidence, and agent boundaries.
- Level 8: separate M03 planning QA before merge.

Required commands:

- `python scripts/validate-control-plane.py`
- `python -m pytest tests/test_control_plane_bootstrap.py`
- `git diff --check`
- `node --version`
- `npm --version`
- `pnpm --version`
- `pnpm install --frozen-lockfile`
- `pnpm typecheck`
- `pnpm lint`
- `pnpm test`
- `pnpm build`
- `pnpm format:check`
- `pnpm qa:dev`

Run `make bootstrap-check` only if `make` is available. Record Docker limitations truthfully if Docker is unavailable.

2026-06-29 M03 planning builder validation results:

- `python scripts/validate-control-plane.py` passed.
- `python -m pytest tests/test_control_plane_bootstrap.py` passed with 85 tests.
- `git diff --check` passed.
- `node --version` returned `v22.16.0`.
- `npm --version` returned `10.9.2`.
- `pnpm --version` returned `10.32.1`.
- `pnpm install --frozen-lockfile` passed across all 14 workspace projects with the known non-blocking `esbuild@0.28.0` ignored-build-scripts warning.
- `pnpm typecheck`, `pnpm lint`, `pnpm test`, `pnpm build`, and `pnpm format:check` passed across all 13 workspaces.
- `pnpm qa:dev -- --allow-dirty` passed with 17 `PASS`, 0 `FAIL`, and 2 `SKIPPED`; the clean-worktree requirement was skipped only because planning edits were intentionally uncommitted, and Docker validation was skipped because Docker mode was not requested.
- `docker --version` and `docker compose version` failed because Docker is not available in this Windows shell.
- `make bootstrap-check` was skipped because `make` is unavailable in this Windows shell. Direct Python validation and pytest passed.
- GitHub CLI is unavailable in this Windows shell, so draft PR creation must use the manual PR URL unless another environment has `gh`.

2026-06-30 M03 planning QA validation results:

- Branch guard passed on `m03-planning-canonical-moneyevent-engine`; the starting worktree was clean, local `HEAD` matched `origin/m03-planning-canonical-moneyevent-engine`, and builder commit `9549ec0` was confirmed.
- Git identity was set and verified as `Mohamed Islem Rezzag Baara <Islem-Rezzag@users.noreply.github.com>` from `.git/config`.
- PR #47 was verified open, unmerged, draft, mergeable, targeting `main`, and using head branch `m03-planning-canonical-moneyevent-engine`.
- M02 closeout PR #46 was verified merged into `main` at `24228fd19d0077fbdbe1a241fed31a4836bec6b4`; the completed M02 plan remains in `plans/completed/`, and `origin/main` has no active CLP plan.
- M03 planning created exactly one active plan: `plans/active/CLP-0004-m03-canonical-moneyevent-engine.md`.
- M03.01 through M03.06 remain `Not started`; M04 through M21 remain `Not started`.
- Forbidden implementation inspection found no MoneyEvent runtime, schema, parser, validator, storage, database table, API route, UI, fixture, simulator, benchmark data, ledger, invariant, incident, replay, repair, connector, or agent runtime implementation.
- `python scripts/validate-control-plane.py` passed.
- `python -m pytest tests/test_control_plane_bootstrap.py` passed with 85 tests.
- `git diff --check` passed.
- `node --version` returned `v22.16.0`.
- `npm --version` returned `10.9.2`.
- `pnpm --version` returned `10.32.1`.
- `pnpm install --frozen-lockfile` passed across all 14 workspace projects and emitted the known non-blocking pnpm update notice plus ignored `esbuild@0.28.0` build-script warning.
- `pnpm typecheck`, `pnpm lint`, `pnpm test`, `pnpm build`, and `pnpm format:check` passed across all 13 workspaces.
- `pnpm qa:dev -- --allow-dirty` passed with 17 `PASS`, 0 `FAIL`, and 2 `SKIPPED`; the clean-worktree requirement was skipped only because QA tracking edits were intentionally uncommitted, and Docker validation was skipped because Docker mode was not requested.
- `docker --version` and `docker compose version` failed because Docker is not available in this Windows shell.
- `make bootstrap-check` was skipped because `make` is unavailable in this Windows shell. Direct Python validation and pytest passed.
- QA status updates are documentation/control-plane tracking only. Remote GitHub Actions must pass on the pushed QA head before human merge.

Acceptance criteria:

- exactly one active M03 plan exists;
- M02 remains completed in `plans/completed/`;
- M03 milestone and registry rows are coherent;
- M03 planning is active;
- M03.01 through M03.06 remain `Not started`;
- product/domain implementation remains not started;
- no MoneyEvent runtime files, schemas, migrations, routes, UI, or storage behavior are created;
- status docs and handoff point to `M03 Planning QA - Canonical MoneyEvent Engine`.

## Expected Files

Expected created file:

- `plans/active/CLP-0004-m03-canonical-moneyevent-engine.md`

Expected changed files:

- `README.md`
- `START_HERE.md`
- `PLANS.md`
- `WORKFLOW.md`
- `CHANGELOG.md`
- `docs/ACTIVE_DOCS.md`
- `docs/INDEX.md`
- `plans/ROADMAP.md`
- `docs/milestones/M03.md`
- `docs/milestones/SUBMILESTONE_REGISTRY.md`
- `docs/status/CURRENT_STATE.md`
- `docs/status/NEXT_RECOMMENDED_THREAD.md`
- `docs/status/WEEKLY_LOG.md`
- `docs/status/CAPABILITY_MATRIX.md`
- `scripts/validate-control-plane.py`
- `tests/test_control_plane_bootstrap.py`

Expected files intentionally not touched:

- `packages/events/src/index.ts`
- `packages/events/test/bootstrap.test.ts`
- `packages/evidence/src/index.ts`
- `packages/ledger/src/index.ts`
- `packages/invariants/src/index.ts`
- `infra/migrations/`
- `apps/api/src/app.ts`
- `apps/web/src/App.tsx`
- `apps/worker/src/index.ts`

## Risks

- MoneyEvent scope can sprawl into storage, API routes, ingestion, ledger, incidents, or replay too early.
- A canonical event contract is expensive to change once later milestones build on it.
- Source timestamp, observed timestamp, idempotency, amount, currency, and provenance semantics can create downstream ambiguity if underspecified.
- Docs can overclaim product behavior before runtime code and deterministic validation exist.
- LLM text can sound authoritative; future implementation must keep LLM output advisory and separate from financial truth.

## Data Assumptions

M03 should plan first around controlled source examples:

- provider events and webhooks;
- internal payment or ledger-like references;
- settlement rows and payout reports;
- bank statement lines;
- refund and chargeback records;
- provider failure signals;
- synthetic simulator outputs.

Raw evidence references must be preserved. Mapping examples must keep uncertainty, missing evidence, delayed evidence, duplicate evidence, and conflicting evidence explicit.

## Evaluation Assumptions

M03 validation should prepare deterministic fixtures that M14 MoneyFlowBench can later reuse, but M03 does not implement benchmark scoring. Seed cases should emphasize evidence grounding, idempotency, unsupported-claim rejection, duplicate handling, missing evidence, delayed evidence, contradiction handling, and unsafe LLM overclaim prevention.

## Open Questions

- Which source timestamps are required versus optional for the first MoneyEvent type boundary?
- How should source-specific event identifiers combine with CausalLedger IDs and idempotency keys?
- Which lifecycle categories are needed in M03 versus deferred to later provider simulator or invariant work?
- How should MoneyEvent preserve uncertainty without becoming an incident or invariant result?
- What is the minimal fixture set for M03.03 and M03.05 without overbuilding MoneyFlowBench early?
- Which decisions need a future ADR before implementation: lifecycle taxonomy, timestamp semantics, or source-reference model?

## Idempotence and Recovery

If validation fails, fix only scoped planning/control-plane defects. Do not add product code to satisfy documentation checks. If a MoneyEvent runtime file, migration, route, UI, storage behavior, or parser/validator implementation appears in this branch, remove the scoped accidental addition before handoff.

If the branch diverges or the worktree becomes unexpectedly dirty, stop and inspect. Preserve user changes and do not rewrite history.

## Artifacts and Notes

This planning branch should leave:

- one active M03 plan;
- six lean M03 submilestones;
- updated status docs;
- validator/test coverage for active M03 planning state;
- validation evidence summarized in this plan, status docs, weekly log, registry, and final handoff.

It should not leave any product/domain runtime artifacts.

## Interfaces and Dependencies

Future M03 implementation depends on:

- `packages/events/` as the owner of canonical event contracts and transformations;
- `packages/evidence/` as the future evidence metadata/provenance boundary;
- `packages/evals/` and `data/fixtures/` for future benchmark and fixture coordination;
- ADR-0008 identity, integer minor-unit money, currency, and storage direction;
- M01 domain docs for payment lifecycle, settlement, evidence, and out-of-scope boundaries;
- M02 validation and workspace commands.

Boundary notes:

- `packages/events/` must not become repair behavior.
- `packages/evidence/` must preserve append-only evidence intent.
- `packages/invariants/` must own deterministic checks later, not LLM judgment.
- `packages/ledger/` must own future ledger primitives later, not autonomous mutation.
- `apps/agent-runtime/` remains deferred to the M10 era.

## Outcomes & Retrospective

M03 planning QA passed locally for PR #47 on branch `m03-planning-canonical-moneyevent-engine`.

M03 planning remains active and awaiting human merge. It must not be marked completed until PR #47 merges into `main` and post-merge tracking finalizes the planning slice.

M03.01 through M03.06 remain `Not started`.

Product/domain implementation has not started. No MoneyEvent runtime behavior, schemas, database tables, API routes, UI, storage behavior, parsers, validators, connectors, agent runtime, ledger behavior, invariant behavior, incident behavior, replay behavior, repair behavior, raw evidence mutation, ledger posting, repair approval, or money mutation exists from this planning slice.

Exact next action after QA PASS: human merges PR #47 after green remote checks and clearing draft state if needed.

Exact next recommended thread after PR #47 merges: `M03.01 Builder - Canonical MoneyEvent concept and contract planning`.
