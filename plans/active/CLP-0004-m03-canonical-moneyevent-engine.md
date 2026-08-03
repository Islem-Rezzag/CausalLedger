# CLP-0004 M03 Canonical MoneyEvent Engine

## Purpose / Big Picture

Plan and execute M03 as a sequence of narrow, evidence-grounded MoneyEvent slices.

M03 will define the canonical MoneyEvent engine boundary for future deterministic money-movement processing. The milestone should turn M01 domain language and M02 package scaffolding into a carefully scoped implementation path for canonical event contracts, source mapping, validation, fixtures, and QA.

M03 planning PR #47 merged into `main` at commit `0606d3b21c05f2cf98397c9f5b0f1eddfa104a74`. M03.01 PR #48 merged into `main` at commit `babadf52762c407fc4d49c6e1d1b0b6cc0542b8e`. M03.02 PR #49 merged into `main` at commit `f7e3b54ba6a533a70d34810564be1b8828eec952`. M03.03 PR #51 merged into `main` at commit `03b0b55d988a224a96c2bcd3c30601c6100ab091`, and the merge finalization landed at `737710592544203e039ceee44a732e289c373bb6`. M03.04 PR #53 merged into `main` at commit `572dc150e38782620416350004630b690c00e687` after QA passed at source commit `d8d13d588bd6471178b4d815556fe1ba7fff570c`; M03.04 finalization merged at `4afa9e94bc3938e3138ce2045afc380582b24c71`. M03.05 PR #55 merged into `main` at `89874bca2525a423d773548c61f9655f09642575`, and M03.06 remains `Not started`.

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
- [x] 2026-06-30: Confirmed PR #47 merged into `main` at `0606d3b21c05f2cf98397c9f5b0f1eddfa104a74`.
- [x] 2026-06-30: Created branch `m03-01-moneyevent-concept-contract` from updated `main`.
- [x] 2026-06-30: M03.01 branch guard passed on `m03-01-moneyevent-concept-contract`; starting worktree was clean and `origin` points to `https://github.com/Islem-Rezzag/CausalLedger.git`.
- [x] 2026-06-30: Configured repository-local Git identity as `Mohamed Islem Rezzag Baara <Islem-Rezzag@users.noreply.github.com>`.
- [x] 2026-06-30: Read the required active docs, status docs, active M03 plan, M02 closeout docs, M03 milestone docs, architecture/domain/reliability/threat docs, ADR-0008, package boundaries, validator, bootstrap tests, and ops validation workflow before editing.
- [x] 2026-06-30: Completed the M03.01 reasoning checkpoint and classified the slice as Tier 2 because MoneyEvent semantics are foundational and expensive to reverse later.
- [x] 2026-06-30: Created `docs/MONEYEVENT_CONTRACT.md` as documentation-only conceptual contract.
- [x] 2026-06-30: Updated M03.01 tracking, status docs, active docs, package boundary docs, validator, and bootstrap tests.
- [x] 2026-06-30: M03.01 builder validation passed with accepted local-environment limitations recorded.
- [x] 2026-06-30: M03.01 QA verified PR #48 is open, unmerged, targets `main`, uses head branch `m03-01-moneyevent-concept-contract`, contains builder commit `c3acbec`, and changes only scoped documentation/control-plane files.
- [x] 2026-06-30: M03.01 QA verified the MoneyEvent conceptual contract is documentation-only, conceptually coherent, aligned with ADR-0008 money semantics, and explicit about raw evidence, provenance, idempotency, time, uncertainty, and future-layer boundaries.
- [x] 2026-06-30: M03.01 QA found no MoneyEvent runtime, TypeScript type, runtime schema, parser, validator, normalizer, storage, fixture, simulator data, migration, API route, UI, ledger, invariant, incident, replay, repair, connector, agent runtime, raw evidence mutation, or product/domain behavior.
- [x] 2026-06-30: M03.01 QA applied scoped tracking and handoff updates only.
- [x] 2026-06-30: M03.01 QA validation passed with accepted local-environment limitations recorded.
- [x] 2026-06-30: Synced `main`, confirmed PR #48 merged into `main` at `babadf52762c407fc4d49c6e1d1b0b6cc0542b8e`, and created branch `m03-02-moneyevent-types-schema-boundary`.
- [x] 2026-06-30: M03.02 branch guard passed on `m03-02-moneyevent-types-schema-boundary`; starting worktree was clean and `origin` points to `https://github.com/Islem-Rezzag/CausalLedger.git`.
- [x] 2026-06-30: Configured repository-local Git identity as `Mohamed Islem Rezzag Baara <Islem-Rezzag@users.noreply.github.com>`.
- [x] 2026-06-30: Read required active docs, status docs, active M03 plan, M02 closeout docs, M03 milestone docs, architecture/domain/reliability/threat docs, ADR-0008, package boundaries, validator, bootstrap tests, and ops workflow before editing.
- [x] 2026-06-30: Completed the M03.02 Tier 2 reasoning checkpoint before editing.
- [x] 2026-06-30: Added the scoped `packages/events` MoneyEvent TypeScript type boundary, package exports, README documentation, and compile-time-oriented package tests.
- [x] 2026-06-30: Updated validator and bootstrap tests to allow only the scoped M03.02 type-boundary files while continuing to reject parser, validator, normalizer, storage, migration, API, fixture, simulator, benchmark, and product behavior.
- [x] 2026-06-30: Updated durable tracking so M03.01 is completed and merged, M03.02 Builder is complete and awaiting QA, M03.03 through M03.06 remain `Not started`, and M04 through M21 remain `Not started`.
- [x] 2026-07-02: M03.02 QA verified PR #49 is open, unmerged, non-draft, targets `main`, uses head branch `m03-02-moneyevent-types-schema-boundary`, contains builder commit `8abb7403cefb4653eacf151466f31119eef39726`, and changes only scoped type-boundary and tracking files.
- [x] 2026-07-02: M03.02 QA verified the `packages/events` MoneyEvent TypeScript type boundary is coherent, follows `docs/MONEYEVENT_CONTRACT.md`, keeps ADR-0008 integer minor-unit money and ID direction, and exports no parser, validator, normalizer, ingester, or storage function.
- [x] 2026-07-02: M03.02 QA found no MoneyEvent runtime schema, parser, validator, normalizer, storage, fixture, simulator data, migration, API route, UI, ledger posting, invariant behavior, incident behavior, replay, repair behavior, connector, agent runtime, raw evidence mutation, repair approval, or money mutation.
- [x] 2026-07-02: M03.02 QA validation passed locally and remote GitHub Actions `validate` and `infra-smoke` passed on the QA-reviewed head with non-blocking Node.js 20 deprecation warnings from upstream actions.
- [x] 2026-07-02: Updated durable tracking so M03.02 is QA passed and awaiting merge, M03.03 through M03.06 remain `Not started`, M04 through M21 remain `Not started`, and the exact next thread is `Merge M03.02 PR - MoneyEvent TypeScript types and schema boundary`.
- [x] 2026-07-02: M03.02 merge finalization synced `main`, confirmed PR #49 merged into `main` at `f7e3b54ba6a533a70d34810564be1b8828eec952`, and created branch `m03-02-finalize-moneyevent-type-boundary-merge`.
- [x] 2026-07-02: Updated durable tracking so M03.02 is `Completed and merged`, M03.03 through M03.06 remain `Not started`, M04 through M21 remain `Not started`, and the exact next thread after this finalization PR merges is `M03.03 Builder - Evidence-to-MoneyEvent mapping fixtures and simulator planning`.
- [x] 2026-07-02: M03.03 builder synced `main`, confirmed M03.02 merge finalization PR #50 merged into `main` at `052aafc`, and created branch `m03-03-evidence-to-moneyevent-fixtures-simulator-planning`.
- [x] 2026-07-02: Completed the M03.03 Tier 2 reasoning checkpoint before editing.
- [x] 2026-07-02: Created `docs/MONEYEVENT_MAPPING_FIXTURES.md` as documentation-only evidence-to-MoneyEvent mapping fixture and simulator planning.
- [x] 2026-07-02: Updated status, roadmap, milestone, package boundary docs, validator, and bootstrap tests for M03.03 planning scope.
- [x] 2026-07-02: Updated durable tracking so M03.03 is `Builder complete, awaiting QA`, M03.04 through M03.06 remain `Not started`, M04 through M21 remain `Not started`, and the exact next thread is `M03.03 QA - Evidence-to-MoneyEvent mapping fixtures and simulator planning`.
- [x] 2026-07-05: Amended M03.03 documentation to add verifier-driven loop strategy planning. The amendment remains documentation/control-plane only and does not implement loop automation, autonomous agents, fixtures, simulator code, ingestion, storage, ledger posting, repair execution, or product behavior.
- [x] 2026-07-08: M03.03 QA verified PR #51 is open, non-draft, unmerged, targets `main`, uses head branch `m03-03-evidence-to-moneyevent-fixtures-simulator-planning`, and contains the mapping fixture planning commit plus the verifier-driven loop strategy amendment.
- [x] 2026-07-08: M03.03 QA verified `docs/MONEYEVENT_MAPPING_FIXTURES.md`, verifier-driven loop strategy docs, package boundaries, validator and bootstrap test coverage, tracking state, and forbidden-scope boundaries.
- [x] 2026-07-08: M03.03 QA found no fixture data, simulator data, parser, validator, normalizer, ingestion, storage, database table, migration, API route, UI, ledger posting, invariant behavior, incident behavior, graph behavior, replay, repair behavior, connector, agent runtime, autonomous loop, production write tool, raw evidence mutation, repair approval, or money mutation.
- [x] 2026-07-08: Updated durable tracking so M03.03 is `QA passed, awaiting merge`, M03.04 through M03.06 remain `Not started`, M04 through M21 remain `Not started`, and the exact next thread is `Merge M03.03 PR - Evidence-to-MoneyEvent mapping fixtures and simulator planning`.
- [x] 2026-07-26: M03.03 merge finalization confirmed local `main`, `origin/main`, the finalization branch, and `HEAD` at PR #51 squash-merge commit `03b0b55d988a224a96c2bcd3c30601c6100ab091`.
- [x] 2026-07-26: Updated durable tracking so M03.03 is `Completed and merged`, M03.04 through M03.06 remain `Not started`, M04 through M21 remain `Not started`, product runtime behavior remains unstarted, and the next thread after finalization merge is `M03.04 Builder - MoneyEvent Validation and Normalization Rules`.
- [x] 2026-07-27: M03.04 branch guard passed on `m03-04-moneyevent-validation-normalization-rules`; the starting worktree was clean, `origin` was confirmed, and local `main` contains M03.03 finalization commit `737710592544203e039ceee44a732e289c373bb6`.
- [x] 2026-07-27: Read the required active docs, status docs, active M03 plan, MoneyEvent and evidence contracts, package code and tests, workspace configuration, CI, control-plane validation, validation workflow, and ADR-0008 before editing.
- [x] 2026-07-27: Completed the M03.04 Tier 2 reasoning checkpoint and marked M03.04 `Builder in progress`; M03.05 and M03.06 remain `Not started`.
- [x] 2026-07-27: Added the dependency-free JSON-safe candidate boundary, deterministic validation and normalization APIs, runtime version and transformation boundary, truthful metadata, specification, and 42 focused runtime tests.
- [x] 2026-07-27: Updated control-plane allowlists and structural checks, bootstrap tests, project/package docs, and durable tracking without adding M03.05 fixtures or downstream runtime scope.
- [x] 2026-07-27: Required Builder validation passed: control plane, 100 bootstrap tests, diff check, frozen install, all events package checks, all workspace checks, and dirty-mode QA with 17 PASS, 0 FAIL, and 2 SKIPPED.
- [x] 2026-07-27: Marked M03.04 `Builder complete, awaiting QA`; M03.05 and M03.06 and M04 through M21 remain `Not started`; exact next thread is `M03.04 QA - MoneyEvent Validation and Normalization Rules`.
- [x] 2026-07-28: M03.04 QA verified the expected branch, clean starting worktree, builder commit `8f3e20fc9729510a5884571901c0311a361dc469`, M03.03-finalization ancestry, and open non-draft PR #53 targeting `main`.
- [x] 2026-07-28: QA fixed a four-digit RFC 3339 UTC normalization boundary, expanded the events-package suite from 45 to 66 tests, clarified the specification, and corrected stale current implementation status documentation.
- [x] 2026-07-28: Required QA validation passed: control plane, 101 bootstrap tests, diff check, frozen install, all events-package checks, all 13-package workspace checks, and dirty-mode QA with 17 PASS, 0 FAIL, and 2 SKIPPED.
- [x] 2026-07-28: Marked M03.04 `QA passed, awaiting merge` on PR #53; M03.05 and M03.06 and M04 through M21 remain `Not started`; exact next thread is `Merge M03.04 PR - MoneyEvent Validation and Normalization Rules`.
- [x] 2026-07-28: M03.04 merge finalization passed the exact branch and clean-worktree guard, confirmed PR #53 squash commit `572dc150e38782620416350004630b690c00e687` is an ancestor of local `main`, and confirmed it has the same Git tree as QA source commit `d8d13d588bd6471178b4d815556fe1ba7fff570c`.
- [x] 2026-07-28: Read and inspected the required tracking, MoneyEvent contract, runtime, tests, control-plane, validation, and handoff files before finalization edits.
- [x] 2026-07-28: Updated durable tracking so M03.04 is `Completed and merged`; M03.05 and M03.06 and M04 through M21 remain `Not started`; no M03.05 or runtime implementation work began.
- [x] 2026-07-30: M03.04 Finalization QA passed the exact branch and clean-worktree guard, verified finalization commit `af6bebb19ba6c314ca3ec20c6f27fee29cc46d87`, verified PR #53 merge commit `572dc150e38782620416350004630b690c00e687` and QA source commit `d8d13d588bd6471178b4d815556fe1ba7fff570c` have the same tree, and confirmed PR #54 is open, non-draft, cleanly mergeable, and targets `main` from the expected branch.
- [x] 2026-07-30: Finalization QA found and fixed two documentation/tracking defects: the validation specification still said independent QA was pending, and current-state tracking still said to open a finalization PR after PR #54 was already open. No runtime, package test, manifest, lockfile, application, infrastructure, migration, or workflow file changed.
- [x] 2026-07-30: Required finalization QA validation passed locally: control plane, 101 bootstrap tests, diff check, frozen install, all events-package checks with 66 tests, all 13-package workspace checks, and dirty-mode QA with 17 PASS, 0 FAIL, and 2 SKIPPED. Docker, GitHub CLI, and `make` remain unavailable; GitHub API metadata showed the original PR #54 head had successful `validate` and `infra-smoke` checks before the scoped QA fix commit.
- [x] 2026-07-31: M03.05 repository discovery and branch preparation passed. Repository root is `C:/Users/moham/Desktop/CausalLedger`; origin fetch and push URLs are `https://github.com/Islem-Rezzag/CausalLedger.git`; updated `main` is `4afa9e94bc3938e3138ce2045afc380582b24c71`; M03.04 finalization ancestry passed; and the clean existing `m03-05-moneyevent-test-fixtures-benchmark-seeds` branch was safely reused because it had no commits unique from `main` and pointed to the same commit.
- [x] 2026-07-31: Verified the active branch is exactly `m03-05-moneyevent-test-fixtures-benchmark-seeds`, the worktree is clean, `main` is an ancestor of `HEAD`, and repository-local identity is `Mohamed Islem Rezzag Baara <Islem-Rezzag@users.noreply.github.com>`.
- [x] 2026-07-31: Read the required active docs, M03 plan and milestone tracking, MoneyEvent contract/mapping/validation specifications, package code and tests, validation/handoff workflow, and PR protocol before implementation edits.
- [x] 2026-07-31: Classified M03.05 as Tier 2 and marked it `Builder in progress`. The slice is limited to controlled deterministic JSON fixtures, early benchmark seed metadata, fixture/seed verification tests, documentation, control-plane guards, and durable tracking. M03.06 and M04 through M21 remain `Not started`.
- [x] 2026-07-31: Added eight controlled synthetic MoneyEvent candidate fixtures and seven early MoneyFlowBench seed cases with deterministic normalization or typed-rejection expectations, evidence and uncertainty grounding, hallucination/unsupported-certainty/unsafe-action policies, repeatability requirements, and explicit absence of scoring and results.
- [x] 2026-07-31: Added test-only fixture and seed verification, Node test typings, package/data/scenario documentation, the canonical M03.05 boundary specification, exact control-plane allowlists, structural JSON validation, bootstrap coverage, and durable status updates without changing events or evals runtime source.
- [x] 2026-07-31: Resolved focused-validation findings for missing Node test types, one invalid Unicode regular-expression escape, and two stale bootstrap assertions; then passed the complete required builder validation ladder.
- [x] 2026-07-31: Marked M03.05 `Builder complete, awaiting QA`. M03.06 and M04 through M21 remain `Not started`; the exact next thread is `M03.05 QA - MoneyEvent Test Fixtures and Benchmark Seed Cases` on the same branch and draft PR.
- [x] 2026-07-31: Committed builder scope at `397ac47756f6cb25f919a1cee7b58adbabe29d4f`, passed post-commit clean QA with 18 `PASS`, 0 `FAIL`, and 1 `SKIPPED`, pushed the branch without force, and opened draft PR #55 against `main`.
- [x] 2026-07-31: Verified draft PR #55 is open, unmerged, mergeable, based on `main` at `4afa9e94bc3938e3138ce2045afc380582b24c71`, and uses the exact branch containing the builder commit. Independent QA remains required.
- [x] 2026-07-31: Independent M03.05 QA verified the exact branch, clean starting tree, origin, M03.04-finalization ancestry, builder commit `397ac47756f6cb25f919a1cee7b58adbabe29d4f`, the only PR for the branch, and successful starting-head CI before inspecting the full diff.
- [x] 2026-07-31: QA found and fixed scoped data-contract defects: type casts instead of strict manifest parsing, partial valid snapshots, non-exact invalid issue assertions, insufficient canonical invalid families, and a misleading receipt-only seed evidence field. The reviewed corpus now has 21 fixtures and seven exact-grounded seeds with strict test-only parsers.
- [x] 2026-07-31: Required QA validation passed: control plane, 102 bootstrap tests, frozen install, 97 events tests, 42 evals tests, all package and 13-package workspace checks including `format:check`, diff and data-hygiene inspection, and dirty-mode QA with 17 PASS, 0 FAIL, and 2 SKIPPED.
- [x] 2026-07-31: Marked M03.05 `QA passed, awaiting merge` on PR #55. M03.06 and M04 through M21 remain `Not started`; the exact next thread is `Merge M03.05 PR - MoneyEvent Test Fixtures and Benchmark Seed Cases`.
- [x] 2026-08-03: Synced `main`, verified PR #55 merged at `89874bca2525a423d773548c61f9655f09642575`, confirmed the merge commit is an ancestor of `main`, and confirmed its tree matches final reviewed head `869af913b781a9706a93d561c256c4077f30361d`.
- [x] 2026-08-03: Recorded builder commit `397ac47756f6cb25f919a1cee7b58adbabe29d4f`, independent QA commit `f7a1f3c8ae13be60ff8f8154acb81965d2237b9d`, final reviewed head `869af913b781a9706a93d561c256c4077f30361d`, and PR #55 merge commit `89874bca2525a423d773548c61f9655f09642575`.
- [x] 2026-08-03: Updated durable tracking so M03.05 is `Completed and merged`, M03.06 and M04 through M21 remain `Not started`, M03 remains active, and the exact next thread after this finalization PR merges is `M03.06 Builder - MoneyEvent QA and Closeout`.

## Surprises & Discoveries

- `docs/milestones/M03.md` and the registry already contained a broad 19-row M03 outline with database and API work. The requested planning scope is leaner and explicitly forbids database schema, API routes, and product UI in planning.
- M02 closeout is merged on `main`, and `plans/active/` contained no active CLP plan before this branch.
- The package layer remains scaffold-only; no MoneyEvent runtime files exist at planning start.
- No suitable conceptual MoneyEvent contract document existed before M03.01, so `docs/MONEYEVENT_CONTRACT.md` is the canonical location for the contract. It is under `docs/` because this slice defines cross-layer semantics, not package runtime behavior.

## Decision Log

- Use `CLP-0004-m03-canonical-moneyevent-engine.md` as the active M03 plan because `CLP-0004` was unused.
- Treat M03 planning as completed and merged while keeping M03.01 active and M03.02 through M03.06 `Not started`.
- Reshape M03 into six lean submilestones to avoid database/API/UI work before the canonical event contract is ready.
- Keep database schema, API routes, product UI, agent runtime, repair behavior, ledger posting, and storage behavior out of M03 planning.
- Treat M03 planning as completed after PR #47 merged into `main`.
- Use `docs/MONEYEVENT_CONTRACT.md` for the M03.01 conceptual MoneyEvent contract because the contract spans evidence, events, ledger, invariants, incidents, graph, replay, repair, human review, and agent investigation semantics.
- Keep M03.01 documentation-only: no TypeScript MoneyEvent type, runtime schema, parser, validator, normalizer, storage, fixture, simulator data, migration, API route, UI, or product behavior.
- Record PR #48 merge commit `babadf52762c407fc4d49c6e1d1b0b6cc0542b8e` as M03.01 completion.
- Treat M03.02 as compile-time type-boundary work only. TypeScript types and exported literal metadata are allowed; parser, validator, normalizer, runtime schema, storage, fixtures, routes, UI, ledger, repair, replay, and agent behavior remain forbidden.
- Use branded `bigint` for MoneyEvent amount minor units. This avoids floating-point drift while leaving JSON serialization and runtime-schema representation to later M03 work.
- Document schema boundary as future runtime-schema direction, not a runtime schema implementation.
- Record PR #49 merge commit `f7e3b54ba6a533a70d34810564be1b8828eec952` as M03.02 completion, while keeping M03.03 through M03.06 `Not started` until the finalization PR merges.
- Use `docs/MONEYEVENT_MAPPING_FIXTURES.md` for M03.03 because evidence-to-MoneyEvent mapping crosses events, evidence, eval, simulator planning, and future validation boundaries without belonging to runtime package code yet.
- Keep M03.03 documentation-only: no actual fixture data, simulator data, parser, validator, normalizer, storage, connector, API route, UI, ledger, replay, repair, agent runtime, or product behavior.
- Treat verifier-driven loops as a planning-only M03.03 architecture concept. Future loops require an external verifier, persistent state, explicit stop conditions, and deterministic or human boundaries; M03.03 does not implement autonomous loops.
- Record PR #51 squash-merge commit `03b0b55d988a224a96c2bcd3c30601c6100ab091` as M03.03 completion while keeping its mapping fixture and verifier-driven loop artifacts documentation/planning only.
- Classify M03.04 as Tier 2 because its validation and normalization semantics become foundational inputs to later fixtures, ledger mapping, invariants, incidents, graph, replay, repair, and evaluation work.
- Use a JSON-safe source-neutral candidate made only from ordinary strings, arrays, objects, and `null`; accept `unknown` at the public validation boundary so untrusted input is never treated as branded `MoneyEvent` before validation.
- Represent candidate money as a canonical base-10 integer string, reject numbers, decimals, exponent notation, leading-zero forms, `NaN`, `Infinity`, and silent rounding, then convert successful input to branded `bigint`. Preserve negative signs without assigning debit, credit, asset, liability, revenue, or accounting direction semantics; those remain deferred to M04.
- Normalize only documented safe transformations: outer whitespace trimming for supported free-form identifiers and names, three-letter currency uppercasing, timestamps to UTC ISO strings, exact evidence-reference deduplication plus stable ordering, and integer strings to `bigint`.
- Require strict plain objects and reject unknown fields at every structured candidate boundary. Return stable typed issues ordered by field path, code, and message. Ordinary invalid input returns failure results rather than throwing.
- Require at least one root evidence reference, exact normalized provenance/root source and evidence consistency, canonical equality between provenance and root observed time, a versioned transformation boundary, and explicit uncertainty reasons for every state other than `none_known`.
- Preserve delayed and out-of-order event times, conflicting evidence references, relationship order, and uncertainty. Do not generate IDs, timestamps, evidence, currency, parties, objects, relationships, or idempotency keys.
- Keep the implementation dependency-free and package-local. No runtime dependency is justified because deterministic structural checks, timestamp canonicalization, sorting, cloning, and `bigint` conversion are available in the language runtime.

## Context and Orientation

M00 established the repo operating system. M01 froze domain language and safety boundaries. M02 established the runnable monorepo, non-domain app scaffolds, scaffold-only packages, CI, local infrastructure baseline, and repeatable QA command.

M03 is the first product/domain milestone because later ledger, invariant, incident, graph, replay, repair, and benchmark work need a stable canonical representation of money-movement evidence. That representation must be deterministic, evidence-linked, provenance-aware, idempotent, and explicit about uncertainty.

The LLM remains advisory. Financial truth comes from raw evidence, canonical events, deterministic invariants, replay, evidence bundles, and human approval. Planning text and the M03.01 conceptual contract cannot establish MoneyEvent runtime behavior.

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

M03.01 specifically includes:

- post-merge finalization for M03 planning PR #47;
- `docs/MONEYEVENT_CONTRACT.md` as conceptual MoneyEvent contract documentation;
- targeted links from entry, architecture, domain, and package-boundary docs;
- tracking updates that mark M03.01 Builder complete, awaiting QA, followed by QA status updates to `QA passed, awaiting merge`;
- validator and bootstrap test coverage for the conceptual contract and forbidden runtime scope.

M03.02 specifically includes:

- post-merge finalization for M03.01 PR #48;
- TypeScript-only MoneyEvent type definitions in `packages/events`;
- package exports and boundary metadata that state runtime schemas, parsers, and validators are not implemented;
- compile-time-oriented tests that typecheck representative MoneyEvent objects and assert no parser or validator export exists;
- package README documentation explaining bigint minor units, JSON serialization implications, schema-boundary deferral, and future M03 dependencies;
- validator and bootstrap test coverage that allows only M03.02 type-boundary files while continuing to block parser, validator, normalizer, storage, migration, API, fixture, simulator, benchmark, and product behavior.

M03.03 specifically includes:

- post-merge finalization confirmation for M03.02 merge finalization PR #50;
- `docs/MONEYEVENT_MAPPING_FIXTURES.md` as documentation-only mapping fixture and simulator planning;
- controlled evidence family, mapping principle, planned fixture shape, fixture category, and simulator boundary definitions;
- verifier-driven loop strategy documentation that treats mapping fixtures and simulator planning as future verifier inputs only, with no loop automation;
- targeted links from entry, active, index, contract, events, evidence, and eval docs;
- validator and bootstrap test coverage that requires the M03.03 planning artifact while continuing to block fixture data, simulator data, parser, validator, normalizer, storage, connector, API, UI, ledger, replay, repair, agent runtime, and product behavior.

M03.05 specifically includes:

- a versioned controlled JSON MoneyEvent candidate corpus under `data/fixtures/` covering valid normalization, invalid validation, evidence grounding, duplicate evidence, delayed evidence, conflicting evidence, missing currency, and partial evidence;
- versioned early MoneyFlowBench seed metadata under `scenarios/` that references fixture IDs and records expected evidence, uncertainty, hallucination/unsupported-claim rejection, repeatability, and future cost-capture requirements;
- deterministic test-only verification in `packages/events/test/` and `packages/evals/test/` against the existing public source-neutral MoneyEvent boundary;
- documentation and control-plane validation that distinguish fixture and seed readiness from benchmark scoring, benchmark results, product readiness, financial truth, incident detection, replay correctness, or repair safety.

## Forbidden Scope

M03.01 must not:

- implement MoneyEvent behavior;
- create runtime schemas;
- create database tables or migrations;
- create product/domain package implementation files;
- create API routes;
- create product UI;
- create parser, validator, normalizer, storage, connector, ledger, invariant, incident, replay, repair, or agent runtime behavior;
- create fixtures or simulator data;
- start M03.02 builder work;
- mutate money, post ledger entries, approve repairs, delete evidence, modify raw events, or override deterministic invariants.

M03.02 must not:

- implement a MoneyEvent parser, validator, normalizer, transformer, ingester, or storage layer;
- create runtime schemas, database tables, migrations, product/domain API routes, UI, fixtures, simulator data, benchmark data, ledger posting, invariant logic, incidents, graph behavior, replay, repair behavior, connectors, or agent runtime;
- mutate money, post ledger entries, approve repairs, delete evidence, modify raw events, or override deterministic invariants.

M03.03 must not:

- implement real connectors, live ingestion, evidence storage, parser behavior, validator behavior, normalizer behavior, runtime schemas, database tables, migrations, API routes, product UI, ledger posting, incidents, graph behavior, replay behavior, repair behavior, agent runtime, Redis, queues, schedulers, auth/authz, deployment, or real secrets;
- create JSON, YAML, CSV, or executable fixture data;
- create simulator source code, simulator output, provider mocks, bank mocks, connector mocks, benchmark data, or scenario data;
- add autonomous loops, self-grading AI loops, production write loops, or loop-driven production money mutation;
- mutate money, post ledger entries, approve repairs, delete evidence, modify raw events, or override deterministic invariants;
- start M03.04.

M03.05 must not:

- implement source-specific parsing or mapping, live evidence ingestion, evidence storage, database tables, migrations, API routes, product UI, ledger posting, invariants, incidents, graph behavior, replay, repair behavior, human approval, agent runtime, connectors, simulator source code, simulator execution, or external I/O;
- implement a benchmark runner, numeric scoring, leaderboards, benchmark result claims, model calls, cost measurement, or autonomous evaluation loops;
- treat synthetic fixture content, structural validation, seed metadata, or LLM output as financial truth;
- mutate money, post ledger entries, approve repairs, delete evidence, modify raw events, or override deterministic invariants;
- start M03.06 or any M04 work.

## Plan of Work

1. Create this active M03 plan.
2. Replace the old broad M03 registry/milestone shape with the lean six-submilestone plan.
3. Update status and entry docs so the repo says M03 planning is active and M03.01 through M03.06 are not started. This step was completed by PR #47 before M03.01 started.
4. Update validation code and tests only for structural planning-state checks and forbidden runtime scope.
5. Run control-plane, bootstrap, diff, package, and QA-development validation.
6. Commit and push the scoped planning branch.
7. Open a draft PR if GitHub CLI is available; otherwise provide the manual PR URL.

M03.01 builder work:

1. Confirm PR #47 merged into `main` at `0606d3b21c05f2cf98397c9f5b0f1eddfa104a74`.
2. Create branch `m03-01-moneyevent-concept-contract`.
3. Finalize M03 planning post-merge tracking and start M03.01.
4. Create the conceptual MoneyEvent contract document.
5. Align existing docs by linking to the contract without duplicating it.
6. Update validator and bootstrap tests only for M03.01 documentation scope.
7. Run validation and mark M03.01 Builder complete, awaiting QA.
8. Commit, push, and open a draft PR if GitHub CLI is available.

M03.02 builder work:

1. Confirm PR #48 merged into `main` and record the actual merge commit.
2. Create branch `m03-02-moneyevent-types-schema-boundary`.
3. Finalize M03.01 post-merge tracking and start M03.02.
4. Implement TypeScript-only MoneyEvent type definitions in `packages/events`.
5. Align package README documentation with the conceptual contract and deferred runtime-schema direction.
6. Update validator and bootstrap tests only for M03.02 type-boundary scope.
7. Run validation and mark M03.02 Builder complete, awaiting QA.
8. Commit, push, and open a draft PR if GitHub CLI is available.

M03.03 builder work:

1. Confirm M03.02 merge finalization PR #50 merged into `main`.
2. Create branch `m03-03-evidence-to-moneyevent-fixtures-simulator-planning`.
3. Finalize M03.02 post-merge tracking and start M03.03.
4. Create the mapping fixture and simulator planning document.
5. Align existing docs by linking to the mapping plan without duplicating it.
6. Update validator and bootstrap tests only for M03.03 planning scope.
7. Run validation and mark M03.03 Builder complete, awaiting QA.
8. Commit, push, and open a draft PR if GitHub CLI is available.

M03.05 builder work:

1. Confirm M03.04 finalization commit `4afa9e94bc3938e3138ce2045afc380582b24c71` is present on updated `main`.
2. Use branch `m03-05-moneyevent-test-fixtures-benchmark-seeds` only after the branch and worktree guards pass.
3. Finalize M03.04 post-merge tracking and mark M03.05 `Builder in progress`.
4. Add the controlled MoneyEvent candidate corpus and early benchmark seed metadata without source payloads, secrets, benchmark scoring, or runtime mapping behavior.
5. Add deterministic fixture and seed verification tests in the owning package test boundaries.
6. Update package/docs boundaries, control-plane validation, bootstrap tests, and durable tracking.
7. Run the M03.05 validation ladder and mark M03.05 `Builder complete, awaiting QA` only after required checks pass.
8. Commit, push, and open the same-branch PR for independent M03.05 QA.

## Concrete Steps

### M03.01 Canonical MoneyEvent Concept and Contract Planning

Defines what MoneyEvent must mean conceptually: identity, source identity, provenance, amount, currency, actors, objects, lifecycle references, timestamps, idempotency, source references, and uncertainty. It does not implement TypeScript types, runtime schemas, parser behavior, validators, or storage.

### M03.02 MoneyEvent TypeScript Types and Schema Boundary

Introduces the TypeScript type boundary and future runtime-schema direction inside `packages/events/` only after planning QA and PR merge. It must not create database tables, API routes, ingestion, storage, ledger posting, repair behavior, or agent tools.

### M03.03 Evidence-to-MoneyEvent Mapping Fixtures and Simulator Planning

Plans controlled mapping fixture categories and future deterministic simulator boundaries from provider-like events, settlement rows, bank lines, refunds, chargebacks, duplicate webhooks, delayed evidence, conflicting evidence, missing currency, and partial evidence chains. It must preserve raw references and must not implement real connectors, evidence storage, live ingestion, external integrations, actual fixture data, simulator data, parser behavior, validator behavior, normalizer behavior, or product behavior.

### M03.04 MoneyEvent Validation and Normalization Rules

Defines deterministic validation and normalization rules for identity, idempotency, money representation, currency, timestamp ordering, provenance, source references, uncertainty, duplicate evidence, missing evidence, and conflicting evidence. It must not use LLM judgment as validation.

### M03.05 MoneyEvent Test Fixtures and Benchmark Seed Cases

Creates deterministic fixtures and early benchmark seed cases that later MoneyFlowBench work can reuse. It must not claim benchmark results, product readiness, incident detection, replay correctness, or repair safety.

### M03.06 MoneyEvent QA and Closeout

Runs QA, verifies forbidden scope, confirms deterministic tests and documentation are aligned, records validation, and prepares M03 closeout. It must not mark M03 complete without QA PASS, merge confirmation, and closeout.

## Validation and Acceptance

Applicable validation ladder for M03.05:

- Level 0: branch and worktree guard.
- Level 1: file and forbidden-scope inspection.
- Level 2: control-plane validation.
- Level 3: bootstrap tests.
- Level 4: diff and whitespace checks.
- Level 5: focused events/evals package checks and full-workspace validation for fixture consumers.
- Level 6: deterministic fixture and seed-case verification, including evidence, uncertainty, hallucination-resistance, repeatability, and deferred cost-capture metadata.
- Level 7: safety and forbidden-scope checks for MoneyEvent, financial truth, evidence immutability, agent boundaries, benchmark incentives, and prohibited mutation.
- Level 8: separate submilestone QA before merge.

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
- M03.01 through M03.06 remained `Not started` during M03 planning QA; M03.01 is now the active builder-complete slice, and M03.02 through M03.06 remain `Not started`.
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

2026-06-30 M03.01 builder validation results:

- `python scripts/validate-control-plane.py` passed.
- `python -m pytest tests/test_control_plane_bootstrap.py` passed with 89 tests.
- `git diff --check` passed.
- `node --version` returned `v22.16.0`.
- `npm --version` returned `10.9.2`.
- `pnpm --version` returned `10.32.1`.
- `pnpm install --frozen-lockfile` passed across all 14 workspace projects with the known non-blocking `esbuild@0.28.0` ignored-build-scripts warning.
- `pnpm typecheck`, `pnpm lint`, `pnpm test`, `pnpm build`, and `pnpm format:check` passed across all 13 workspaces.
- `pnpm qa:dev -- --allow-dirty` passed with 17 `PASS`, 0 `FAIL`, and 2 `SKIPPED`; the clean-worktree requirement was skipped only because builder edits were intentionally uncommitted, and Docker validation was skipped because Docker mode was not requested.
- After commit, clean `pnpm qa:dev` passed with 18 `PASS`, 0 `FAIL`, and 1 `SKIPPED`; Docker validation was skipped because Docker mode was not requested.
- `docker --version` and `docker compose version` failed because Docker is not available in this Windows shell.
- `make bootstrap-check` was skipped because `make` is unavailable in this Windows shell. Direct Python validation and pytest passed.
- GitHub CLI is unavailable in this Windows shell, so draft PR creation must use the manual PR URL unless another environment has `gh`.

2026-06-30 M03.01 QA validation results:

- Branch guard passed on `m03-01-moneyevent-concept-contract`; the starting worktree was clean, local `HEAD` matched `origin/m03-01-moneyevent-concept-contract`, and builder commit `c3acbec167f3f734a806f81d69d46e4337edbbc0` was confirmed.
- Git identity was set and verified as `Mohamed Islem Rezzag Baara <Islem-Rezzag@users.noreply.github.com>` from `.git/config`; no `@qmul.ac.uk` address was used.
- PR #48 was verified open, unmerged, non-draft, mergeable, targeting `main`, using head branch `m03-01-moneyevent-concept-contract`, and containing builder commit `c3acbec`.
- M03 planning PR #47 was verified merged into `main` at `0606d3b21c05f2cf98397c9f5b0f1eddfa104a74`.
- MoneyEvent contract QA passed: `docs/MONEYEVENT_CONTRACT.md` is documentation-only and covers purpose, non-goals, core semantic fields, identity, source identity/type, evidence references, provenance, integer minor-unit amount, ISO 4217 currency, actor/object references, event kind, source event time, observed time, idempotency, causation/correlation references, uncertainty, evidence locator, lifecycle meaning, evidence rules, time semantics, money semantics, delayed/conflicting evidence, future-layer relationships, and conceptual examples.
- Conceptual clarity QA passed: duplicate evidence is distinct from duplicate money movement, source event time is distinct from observed time, signed-versus-directional amount is deferred, uncertainty is explicit, raw evidence remains the source material, and no runtime validation, persistence, ledger posting, incident detection, replay, or repair behavior is implied.
- Documentation alignment QA passed: entry, active docs, roadmap, architecture, domain, package boundary, capability, milestone, registry, status, and changelog docs link or summarize the conceptual contract without claiming implementation.
- Forbidden implementation QA passed: no MoneyEvent runtime, TypeScript type, runtime schema, parser, validator, normalizer, storage, fixture, simulator data, migration, API route, UI, ledger posting, invariant behavior, incident behavior, replay, repair behavior, connector, agent runtime, raw evidence mutation, or product/domain behavior was added.
- Validator/test QA passed: control-plane validation and bootstrap tests enforce the conceptual contract document, documentation-only code-fence boundary, no MoneyEvent runtime files, scaffold-only `packages/events/src`, no fixture/simulator data, no migration/API scope, M03 tracking coherence, and M03.02 through M03.06 not-started state.
- `python scripts/validate-control-plane.py` passed.
- `python -m pytest tests/test_control_plane_bootstrap.py` passed with 89 tests.
- `git diff --check` passed.
- `node --version` returned `v22.16.0`.
- `npm --version` returned `10.9.2`.
- `pnpm --version` returned `10.32.1`.
- `pnpm install --frozen-lockfile` passed across all 14 workspace projects with the known non-blocking `esbuild@0.28.0` ignored-build-scripts warning.
- `pnpm typecheck`, `pnpm lint`, `pnpm test`, `pnpm build`, and `pnpm format:check` passed across all 13 workspaces.
- During uncommitted QA tracking edits, `pnpm qa:dev -- --allow-dirty` passed with 17 `PASS`, 0 `FAIL`, and 2 `SKIPPED`; the clean-worktree requirement was skipped only because QA tracking edits were intentionally uncommitted, and Docker validation was skipped because Docker mode was not requested.
- After commit, clean `pnpm qa:dev` passed with 18 `PASS`, 0 `FAIL`, and 1 `SKIPPED`; Docker validation was skipped because Docker mode was not requested.
- `docker --version` and `docker compose version` failed because Docker is not available in this Windows shell.
- `make bootstrap-check` was skipped because `make` is unavailable in this Windows shell. Direct Python validation and pytest passed.
- GitHub CLI is unavailable in this Windows shell; GitHub connector and public API checks were used for PR and remote validation metadata.
- Remote validation on the latest pushed QA head must be inspected before human merge readiness is claimed.

2026-06-30 M03.02 builder validation results:

- `python scripts/validate-control-plane.py` passed.
- `python -m pytest tests/test_control_plane_bootstrap.py` passed with 92 tests.
- `git diff --check` passed.
- `node --version` returned `v22.16.0`.
- `npm --version` returned `10.9.2`.
- `pnpm --version` returned `10.32.1`.
- `pnpm install --frozen-lockfile` passed across all 14 workspace projects with the known non-blocking `esbuild@0.28.0` ignored-build-scripts warning.
- `pnpm --filter @causalledger/events typecheck`, `pnpm --filter @causalledger/events test`, and `pnpm --filter @causalledger/events format:check` passed; the package test run covered 2 files and 3 tests.
- `pnpm typecheck`, `pnpm lint`, `pnpm test`, `pnpm build`, and `pnpm format:check` passed across all 13 workspaces.
- `pnpm qa:dev -- --allow-dirty` passed with 17 `PASS`, 0 `FAIL`, and 2 `SKIPPED`; the clean-worktree requirement was skipped only because builder edits were intentionally uncommitted, and Docker validation was skipped because Docker mode was not requested.
- The first M03.02 full dirty-mode QA run failed because generated TypeScript build output `packages/events/dist/money-event.js` matched the MoneyEvent runtime filename guard. The validator was corrected to ignore generated package directories while still rejecting authored forbidden MoneyEvent runtime files, and a regression test was added.
- `docker --version` and `docker compose version` failed because Docker is not available in this Windows shell.
- `make bootstrap-check` was skipped because `make` is unavailable in this Windows shell. Direct Python validation and pytest passed.
- GitHub CLI is unavailable in this Windows shell, so draft PR creation must use the manual PR URL unless another environment has `gh`.

2026-07-02 M03.02 QA validation results:

- Validation ladder: Level 0 branch and worktree guard, Level 1 file and forbidden-scope inspection, Level 2 control-plane validation, Level 3 bootstrap and package tests, Level 4 diff and whitespace checks, Level 5 package checks for the `packages/events` type boundary only, Level 7 financial-truth and forbidden-scope checks, and Level 8 PR merge-readiness review.
- Branch guard passed after switching from the clean local `main` checkout to `m03-02-moneyevent-types-schema-boundary` before QA edits; the expected branch started clean, local HEAD matched `origin/m03-02-moneyevent-types-schema-boundary`, and builder commit `8abb7403cefb4653eacf151466f31119eef39726` was confirmed.
- Git identity was set and verified as `Mohamed Islem Rezzag Baara <Islem-Rezzag@users.noreply.github.com>` from `.git/config`; no `@qmul.ac.uk` address was used.
- PR #49 was verified open, unmerged, non-draft, mergeable, targeting `main`, using head branch `m03-02-moneyevent-types-schema-boundary`, and containing builder commit `8abb740`.
- M03.01 PR #48 was verified merged into `main` at `babadf52762c407fc4d49c6e1d1b0b6cc0542b8e`.
- Type-boundary QA passed: `packages/events/src/money-event.ts` includes MoneyEvent identity, kind, source identity/type, evidence references, provenance, integer minor-unit `bigint` amount, ISO 4217 currency branding, party/object references, event time, observed time, idempotency key, relationships, lifecycle state, uncertainty state, raw evidence locator or receipt references, and contract versioning.
- Schema-boundary QA passed: no Zod, Valibot, JSON Schema, parser, validator, normalizer, ingester, storage layer, runtime schema constructor, database table, migration, API route, UI, ledger posting, repair behavior, agent runtime, fixture, simulator data, or benchmark data was implemented.
- Type tests QA passed: package tests typecheck a representative MoneyEvent shape and assert parser, validator, normalizer, ingest, and store exports do not exist.
- Documentation alignment QA passed: docs distinguish the conceptual contract, TypeScript type boundary, and deferred runtime validation without claiming runtime schema, parser, validator, storage, fixture, API, UI, or product behavior.
- Forbidden implementation QA passed: product runtime behavior remains not started, raw evidence was not modified, no evidence was deleted, no ledger entries were posted, no money was mutated, and no repair was approved.
- Remote validation before QA tracking edits passed for builder head `8abb740`: GitHub Actions `validate` and `infra-smoke` completed successfully; each emitted a non-blocking Node.js 20 deprecation warning for upstream actions.
- Local QA validation commands are recorded in this plan, status docs, weekly log, registry, and final handoff. If a QA tracking commit is pushed, remote checks must pass on that latest head before human merge.

2026-07-02 M03.02 merge finalization validation results:

- Validation ladder: Level 0 branch, worktree, remote, stash, merge-commit, and PR guard; Level 1 file and forbidden-scope inspection; Level 2 control-plane validation; Level 3 bootstrap and package tests; Level 4 diff and whitespace checks; Level 5 package checks for `@causalledger/events`; Level 7 financial-truth and forbidden-scope checks; Level 8 PR creation readiness for the finalization branch.
- Branch and merge guard passed: synced `main`, confirmed PR #49 is merged through GitHub metadata, confirmed `main` at `f7e3b54ba6a533a70d34810564be1b8828eec952`, confirmed `packages/events/src/money-event.ts` and `packages/events/test/money-event-types.test.ts` exist on `main`, and created branch `m03-02-finalize-moneyevent-type-boundary-merge`.
- Git identity was set and verified as `Mohamed Islem Rezzag Baara <Islem-Rezzag@users.noreply.github.com>` from `.git/config`; no `@qmul.ac.uk` address was used.
- No validator or bootstrap-test changes were required because the post-merge state already accepts M03.02 as `Completed and merged` while keeping M03.03 through M03.06 `Not started`.
- Local validation passed: `python scripts/validate-control-plane.py`, `python -m pytest tests/test_control_plane_bootstrap.py` with 92 tests, `git diff --check`, `pnpm --filter @causalledger/events typecheck`, `pnpm --filter @causalledger/events test` with 2 files and 3 tests, `pnpm --filter @causalledger/events build`, `pnpm --filter @causalledger/events lint`, `pnpm --filter @causalledger/events format:check`, `pnpm install --frozen-lockfile`, `pnpm typecheck`, `pnpm lint`, `pnpm test`, `pnpm build`, `pnpm format:check`, and `pnpm qa:dev -- --allow-dirty`.
- `node --version` returned `v22.16.0`, `npm --version` returned `10.9.2`, and `pnpm --version` returned `10.32.1`.
- `pnpm qa:dev -- --allow-dirty` reported 17 `PASS`, 0 `FAIL`, and 2 `SKIPPED`; the clean-worktree requirement was skipped only because finalization docs were intentionally uncommitted, and Docker validation was skipped because Docker mode was not requested.
- Docker is unavailable in this Windows shell; `docker --version` and `docker compose version` failed with `docker` not recognized. `make bootstrap-check` was skipped because `make` is unavailable. `pnpm install --frozen-lockfile` emitted the known non-blocking ignored-build-scripts warning for `esbuild@0.28.0`.
- Forbidden implementation inspection passed: no MoneyEvent parser, validator, normalizer, runtime schema, storage, fixture, simulator data, migration, API route, UI, ledger posting, invariant behavior, incident behavior, replay, repair behavior, connector, agent runtime, raw evidence mutation, repair approval, or money mutation was added by finalization.

2026-07-02 M03.03 builder validation results:

- Validation ladder: Level 0 branch, worktree, remote, stash, and merge guard; Level 1 file and forbidden-scope inspection; Level 2 control-plane validation; Level 3 bootstrap and package tests; Level 4 diff and whitespace checks; Level 5 package checks for `@causalledger/events`; Level 7 financial-truth, evidence, and forbidden-scope checks; Level 8 QA readiness for a separate M03.03 QA thread.
- Branch and merge guard passed: synced `main`, confirmed M03.02 merge finalization PR #50 merged into `main` at `052aafc`, confirmed M03.02 is `Completed and merged`, confirmed M03.03 was `Not started`, confirmed M03.04 through M03.06 plus M04 through M21 were `Not started`, and created branch `m03-03-evidence-to-moneyevent-fixtures-simulator-planning`.
- Git identity was set and verified as `Mohamed Islem Rezzag Baara <Islem-Rezzag@users.noreply.github.com>` from `.git/config`; no `@qmul.ac.uk` address was used.
- Local validation passed: `python scripts/validate-control-plane.py`, `python -m pytest tests/test_control_plane_bootstrap.py`, `git diff --check`, `pnpm --filter @causalledger/events typecheck`, `pnpm --filter @causalledger/events test`, `pnpm --filter @causalledger/events build`, `pnpm --filter @causalledger/events lint`, `pnpm --filter @causalledger/events format:check`, `pnpm install --frozen-lockfile`, `pnpm typecheck`, `pnpm lint`, `pnpm test`, `pnpm build`, `pnpm format:check`, and `pnpm qa:dev -- --allow-dirty`.
- `node --version` returned `v22.16.0`, `npm --version` returned `10.9.2`, and `pnpm --version` returned `10.32.1`.
- `pnpm qa:dev -- --allow-dirty` passed with 17 `PASS`, 0 `FAIL`, and 2 `SKIPPED`; clean-worktree validation was skipped only because builder edits were intentionally uncommitted, and Docker validation was skipped because Docker mode was not requested.
- After commit, clean `pnpm qa:dev` passed with 18 `PASS`, 0 `FAIL`, and 1 `SKIPPED`; Docker validation was skipped because Docker mode was not requested.
- Docker is unavailable in this Windows shell; `docker --version` and `docker compose version` failed with `docker` not recognized. `make bootstrap-check` was skipped because `make` is unavailable. GitHub CLI is unavailable, so PR creation may require the manual PR URL.
- Forbidden implementation inspection passed: no fixture data, simulator data, real connectors, evidence storage, live ingestion, parser, validator, normalizer, runtime schema, database table, migration, API route, UI, ledger posting, invariant behavior, incident behavior, graph behavior, replay, repair behavior, connector, agent runtime, raw evidence mutation, repair approval, or money mutation was added.

2026-07-05 M03.03 verifier-driven loop amendment validation results:

- Validation ladder: Level 0 branch, worktree, remote, log, and tag guard; Level 1 documentation and forbidden-scope inspection; Level 2 control-plane validation; Level 3 bootstrap tests; Level 4 diff and whitespace checks; Level 5 package/workspace checks for existing scaffold and `@causalledger/events`; Level 7 financial-truth, agent-tool, loop-safety, and forbidden-scope checks; Level 8 QA readiness for the existing PR #51.
- Branch guard passed on `m03-03-evidence-to-moneyevent-fixtures-simulator-planning`; starting worktree was clean before amendment edits, remote was `origin`, latest log included M03.03 builder commit `2757c3e`, and tag list contained `v0.1.0`.
- `python scripts/validate-control-plane.py` passed.
- `python -m pytest tests/test_control_plane_bootstrap.py` passed with 98 tests.
- `git diff --check` passed.
- `corepack pnpm install --frozen-lockfile` passed with pnpm 10.32.1 and the known non-blocking ignored-build-scripts warning for `esbuild@0.28.0`.
- `corepack pnpm --filter @causalledger/events typecheck`, `test`, `build`, `lint`, and `format:check` passed; package tests covered 2 files and 3 tests.
- `corepack pnpm typecheck`, `lint`, `test`, `build`, and `format:check` passed across all 13 workspaces.
- `pnpm qa:dev --allow-dirty` passed after prepending the pnpm 10.32.1 shim to `PATH`; result was 17 `PASS`, 0 `FAIL`, and 2 `SKIPPED`. Clean-worktree validation was skipped only because amendment edits were intentionally uncommitted, and Docker validation was skipped because Docker mode was not requested.
- `pnpm qa:dev -- --allow-dirty` failed before checks because this shell forwarded the literal `--` to Python argparse; the equivalent accepted invocation `pnpm qa:dev --allow-dirty` was used.
- Initial package-check attempts with the Codex-bundled pnpm 11.7.0 failed before running checks because pnpm attempted a non-interactive module purge or failed on the ignored-builds policy. The checks were rerun with the repo-pinned pnpm 10.32.1 and passed.
- Docker is unavailable in this Windows shell; `docker --version` and `docker compose version` failed with `docker` not recognized. `make --version` failed with `make` not recognized, so `make bootstrap-check` was skipped. GitHub CLI is unavailable; `gh --version` failed with `gh` not recognized.
- Forbidden implementation inspection passed: no runtime loops, autonomous agents, production write tools, fixture data, simulator data, ingestion, storage, parser behavior, validator behavior, normalizer behavior, connectors, API routes, UI, ledger behavior, graph behavior, replay behavior, repair behavior, raw evidence mutation, ledger posting, repair approval, or money mutation was added.

2026-07-08 M03.03 QA validation results:

- Validation ladder: Level 0 branch, worktree, remote, log, and tag guard; Level 1 file, PR metadata, package-boundary, and forbidden-scope inspection; Level 2 control-plane validation; Level 3 bootstrap tests and package tests; Level 4 diff and whitespace checks; Level 5 package/workspace checks for existing scaffold and `@causalledger/events`; Level 7 financial-truth, agent-tool, loop-safety, and forbidden-scope checks; Level 8 QA merge readiness for PR #51.
- Branch guard passed on `m03-03-evidence-to-moneyevent-fixtures-simulator-planning`; starting worktree was clean, remote was `origin`, latest log included M03.03 commits `2757c3e` and `dd5e3a3`, and tag list contained `v0.1.0`.
- GitHub CLI is unavailable; `gh --version` failed with `gh` not recognized. Supplemental GitHub REST API inspection verified PR #51 is open, non-draft, unmerged, targets `main`, uses head branch `m03-03-evidence-to-moneyevent-fixtures-simulator-planning`, and includes the two scoped M03.03 commits.
- `python scripts/validate-control-plane.py` passed.
- `python -m pytest tests/test_control_plane_bootstrap.py` passed.
- `git diff --check` passed.
- `corepack pnpm --filter @causalledger/events typecheck`, `test`, `build`, `lint`, and `format:check` passed with repo-pinned pnpm 10.32.1.
- `corepack pnpm install --frozen-lockfile`, `typecheck`, `lint`, `test`, `build`, and `format:check` passed with repo-pinned pnpm 10.32.1.
- `pnpm qa:dev --allow-dirty` passed with 17 `PASS`, 0 `FAIL`, and 2 `SKIPPED` after putting the user npm Corepack shim first in `PATH` so `pnpm` resolves to repo-pinned 10.32.1. The documented separator form `pnpm qa:dev -- --allow-dirty` is not used in this shell because previous M03.03 validation showed the literal `--` is forwarded to Python argparse.
- Plain `pnpm` initially resolved to the Codex-bundled pnpm 11.7.0 and failed before package checks by attempting a non-interactive module purge. The same checks passed with `corepack pnpm` or the repo-pinned pnpm 10.32.1 shim.
- Docker is unavailable in this Windows shell; `docker --version` and `docker compose version` failed with `docker` not recognized. `make bootstrap-check` was skipped because `make` is unavailable. Direct Python validation and workspace checks passed.
- Forbidden implementation inspection passed: no fixture data, simulator data, parser, validator, normalizer, ingestion, storage, database table, migration, API route, UI, ledger posting, invariant behavior, incident behavior, graph behavior, replay, repair behavior, connector, agent runtime, autonomous loop, production write tool, raw evidence mutation, repair approval, or money mutation was added.

2026-07-26 M03.03 merge finalization validation results:

- Validation ladder: Level 0 branch, worktree, remote, log, tag, and merge-commit guard; Level 1 tracking-file and forbidden-scope inspection; Level 2 control-plane validation; Level 3 bootstrap and package tests; Level 4 diff and whitespace checks; Level 5 existing package/workspace checks; Level 6 not applicable because no fixture, scenario, benchmark, or eval implementation changed; Level 7 financial-truth, evidence, loop-safety, and forbidden-scope checks; Level 8 human review remains required for the finalization PR.
- Merge guard passed: local `main`, `origin/main`, branch `m03-03-finalize-mapping-fixtures-merge`, and `HEAD` all resolve to PR #51 squash-merge commit `03b0b55d988a224a96c2bcd3c30601c6100ab091`; the commit subject is `docs: plan M03.03 MoneyEvent mapping fixtures (#51)`.
- `python scripts/validate-control-plane.py` passed.
- `python -m pytest tests/test_control_plane_bootstrap.py` passed with 98 tests.
- `git diff --check` passed.
- `pnpm install --frozen-lockfile` passed across all 14 workspace projects with pnpm 10.32.1; it emitted the known non-blocking ignored-build-scripts warning for `esbuild@0.28.0` and an available pnpm update notice.
- `pnpm --filter @causalledger/events typecheck`, `test`, `build`, `lint`, and `format:check` passed; package tests covered 2 files and 3 tests.
- `pnpm typecheck`, `lint`, `test`, `build`, and `format:check` passed across all 13 workspace packages.
- `pnpm qa:dev --allow-dirty` passed with 17 `PASS`, 0 `FAIL`, and 2 `SKIPPED`; the clean-worktree requirement was intentionally skipped for scoped uncommitted finalization docs, and Docker validation was skipped because Docker mode was not requested.
- Docker, GitHub CLI, and `make` are unavailable in this Windows shell. Docker validation and `make bootstrap-check` could not run; direct Python and workspace validation passed, and PR creation must use the manual GitHub flow.
- Forbidden implementation inspection passed: only documentation/tracking files changed; no runtime schema, parser, validator, normalizer, ingestion, storage, fixture data, simulator code or output, database table, migration, API, UI, ledger behavior, invariant behavior, incident behavior, graph behavior, replay behavior, repair behavior, agent behavior, autonomous loop, production write tool, raw evidence mutation, repair approval, ledger posting, or money mutation was added.

2026-07-27 M03.04 Builder validation results:

- Validation ladder: Level 0 branch/worktree/remote/history/tag/merge-ancestry guard; Level 1 file and forbidden-scope inspection; Level 2 control plane; Level 3 bootstrap and package unit tests; Level 4 diff/whitespace; Level 5 package and workspace checks; Level 6 not applicable because fixture/eval work remains M03.05 scope; Level 7 financial-truth, evidence, dependency, and agent-tool boundaries; Level 8 separate QA readiness.
- `python scripts/validate-control-plane.py` passed.
- `python -m pytest tests/test_control_plane_bootstrap.py` passed with 100 tests.
- `git diff --check` passed.
- `corepack pnpm install --frozen-lockfile` passed across 14 workspace projects with pnpm 10.32.1 and the known non-blocking `esbuild@0.28.0` ignored-build-scripts warning.
- Events-package typecheck, 3-file/45-test run, build, ESLint, and format checks passed after the repository formatter corrected initial style-only drift in the two new TypeScript files.
- Full typecheck, lint, test, build, and format checks passed across all 13 packages.
- `corepack pnpm qa:dev --allow-dirty` passed with 17 PASS, 0 FAIL, and 2 SKIPPED; only the expected dirty-worktree check and optional Docker validation were skipped.
- Docker validation was optional because infrastructure did not change and could not run because Docker is unavailable. GitHub CLI and `make` are also unavailable; all direct required validation passed.
- Forbidden-scope inspection passed: no source-specific parser, connector, ingestion, storage, database table, migration, API route, product UI, ledger entry/posting, balance, invariant, incident, graph, replay, repair, human-review, agent-tool, loop, fixture corpus, benchmark scoring, evidence mutation/deletion, repair approval, or money mutation was added.

2026-07-28 M03.04 QA validation results:

- Validation ladder: Level 0 branch/worktree/remote/builder-commit/PR/history/tag/merge-ancestry guard; Level 1 critical file, contract, test, and forbidden-scope inspection; Level 2 control plane; Level 3 bootstrap and package unit tests; Level 4 diff/whitespace; Level 5 package and workspace checks; Level 6 not applicable because fixture/eval work remains M03.05 scope; Level 7 financial-truth, evidence, dependency, and agent-tool boundaries; Level 8 QA handoff and remote CI readiness.
- `python scripts/validate-control-plane.py` passed.
- `python -m pytest tests/test_control_plane_bootstrap.py` passed with 101 tests.
- `git diff --check` passed.
- `corepack pnpm install --frozen-lockfile` passed across 14 workspace projects with pnpm 10.32.1 and the known non-blocking `esbuild@0.28.0` ignored-build-scripts warning.
- Events-package typecheck, 3-file/66-test run, build, ESLint, and format checks passed.
- Full typecheck, lint, test, build, and format checks passed across all 13 packages.
- `corepack pnpm qa:dev --allow-dirty` passed with 17 PASS, 0 FAIL, and 2 SKIPPED; only the expected dirty-worktree check for authorized QA edits and optional Docker validation were skipped.
- Docker validation was optional because infrastructure did not change and could not run because Docker is unavailable. GitHub CLI and `make` are also unavailable; all direct required validation passed.
- Forbidden-scope inspection passed: QA added only the scoped validator guard, tests, specification/tracking truth fixes, and control-plane coverage. No source-specific parser, connector, ingestion, storage, database table, migration, API route, product UI, ledger entry/posting, balance, invariant, incident, graph, replay, repair, human-review, agent-tool, loop, fixture corpus, benchmark scoring, evidence mutation/deletion, repair approval, or money mutation was added.

2026-07-28 M03.04 merge finalization validation results:

- Validation ladder: Level 0 branch/worktree/remote/history/tag/merge-ancestry guard; Level 1 required-file, merged-tree, tracking, test-count, and forbidden-scope inspection; Level 2 control plane; Level 3 bootstrap and existing package tests; Level 4 diff/whitespace and manual diff review; Level 5 existing events-package and full-workspace checks; Level 6 not applicable because M03.05 fixture/eval work remains unimplemented; Level 7 financial-truth, evidence, and forbidden-scope checks; Level 8 human review remains required for the finalization PR.
- `python scripts/validate-control-plane.py` passed.
- `python -m pytest tests/test_control_plane_bootstrap.py` passed with 101 tests.
- `git diff --check` passed.
- `corepack pnpm install --frozen-lockfile` passed across all 14 workspace projects with pnpm 10.32.1 and the known non-blocking `esbuild@0.28.0` ignored-build-scripts warning.
- Events-package typecheck, 3-file/66-test run, build, ESLint, and formatting passed.
- Full typecheck, lint, test, build, and formatting passed across all 13 packages.
- `corepack pnpm qa:dev --allow-dirty` passed with 17 PASS, 0 FAIL, and 2 SKIPPED; only the expected clean-worktree check for authorized uncommitted finalization edits and optional Docker validation were skipped.
- After commit, clean `corepack pnpm qa:dev` passed with 18 PASS, 0 FAIL, and 1 SKIPPED; only optional Docker validation was skipped.
- Docker, GitHub CLI, and `make` are unavailable. Docker validation was optional because infrastructure did not change; direct required validation passed.
- Forbidden-scope inspection passed: only documentation and tracking files changed. No runtime implementation, runtime test, package manifest, lockfile, application, infrastructure, migration, workflow, M03.05 fixture, benchmark, external communication, ledger state, raw evidence, repair approval, or money state changed.

2026-07-30 M03.04 finalization QA validation results:

- Validation ladder: Level 0 exact branch, clean starting worktree, remote, history, tag, finalization-commit, merge-ancestry, and PR guard; Level 1 required-file, full finalization diff, tracking, status, runtime-tree, test-count, and forbidden-scope inspection; Level 2 control-plane validation; Level 3 bootstrap and existing package tests; Level 4 diff and whitespace checks; Level 5 unchanged events-package and full-workspace validation; Level 6 not applicable because M03.05 fixture, scenario, benchmark, and eval work remains unimplemented; Level 7 financial-truth, evidence, immutability, and forbidden-scope checks; Level 8 independent finalization QA and remote PR review.
- `python scripts/validate-control-plane.py` passed.
- `python -m pytest tests/test_control_plane_bootstrap.py` passed with 101 tests.
- `git diff --check` passed.
- `corepack pnpm install --frozen-lockfile` passed across all 14 workspace projects with repo-pinned pnpm 10.32.1 and the known non-blocking `esbuild@0.28.0` ignored-build-scripts warning.
- Events-package typecheck, 3-file/66-test run, build, ESLint, and formatting passed.
- Full typecheck, lint, test, build, and formatting passed across all 13 packages.
- `corepack pnpm qa:dev --allow-dirty` passed with 17 PASS, 0 FAIL, and 2 SKIPPED; only the authorized dirty-worktree gate and optional Docker validation were skipped.
- GitHub API inspection confirmed PR #54 was open, non-draft, cleanly mergeable, based on `main`, and contained only the 15 original documentation/tracking files at finalization commit `af6bebb19ba6c314ca3ec20c6f27fee29cc46d87`; remote `validate` and `infra-smoke` checks passed on that head. Remote checks must pass again on the scoped QA fix commit before human merge.
- Docker, GitHub CLI, and `make` are unavailable. Docker validation was optional because infrastructure did not change; direct required validation passed, GitHub metadata was obtained through the public API, and no `make` equivalent beyond the direct required commands was omitted.
- Forbidden-scope inspection passed: the original finalization diff changed only documentation/tracking, and QA fixes remain documentation/tracking only. No runtime implementation, package test, manifest, lockfile, application, infrastructure, migration, workflow, M03.05 fixture, benchmark, external communication, ledger state, raw evidence, repair approval, or money state changed.

2026-07-31 M03.05 Builder validation results:

- Validation ladder: Level 0 exact repository, remote, clean starting worktree, branch, identity, main synchronization, M03.04-finalization ancestry, and existing-branch guard; Level 1 required-file and forbidden-scope inspection; Level 2 control-plane validation; Level 3 bootstrap plus events/evals unit tests; Level 4 diff and whitespace checks; Level 5 focused package and full-workspace checks; Level 6 deterministic fixture and seed grounding; Level 7 financial-truth, evidence, immutability, dependency, benchmark, and agent-tool boundaries; Level 8 independent QA readiness.
- `python scripts/validate-control-plane.py` passed.
- `python -m pytest tests/test_control_plane_bootstrap.py` passed with 102 tests.
- `git diff --check` passed.
- `corepack pnpm install --frozen-lockfile` passed across all 14 workspace projects with repo-pinned pnpm 10.32.1 and the known non-blocking `esbuild@0.28.0` ignored-build-scripts warning.
- Events-package typecheck, 4-file/71-test run, build, ESLint, and format checks passed.
- Evals-package typecheck, 2-file/5-test run, build, ESLint, and format checks passed.
- Full typecheck, lint, test, build, and format checks passed across all 13 workspace packages.
- `corepack pnpm qa:dev --allow-dirty` passed with 17 `PASS`, 0 `FAIL`, and 2 `SKIPPED`; only the authorized dirty-worktree gate and optional Docker validation were skipped.
- Independent M03.05 QA controlled-data inspection passed for 21 fixture cases and seven seed cases. Eight valid fixtures compare complete independent JSON-safe normalized snapshots; 13 invalid fixtures compare exact ordered issue lists from validation and normalization with no value. Strict test-only parsers reject malformed manifests, duplicate IDs/tags/references/issues, incomplete snapshots, unsupported outcomes, ungrounded seeds, embedded outputs, scores, policies, or results.
- M03.05 QA package validation passed with 97 events tests and 42 evals tests; control-plane and 102 bootstrap tests passed; all 13-package workspace typecheck, lint, test, build, and format checks passed; and dirty-mode QA reported 17 PASS, 0 FAIL, and 2 SKIPPED.
- `corepack pnpm format:check` passed. Docker remained optional and skipped because infrastructure did not change.
- Focused validation initially found missing Node test types, an invalid Unicode regular-expression escape, and two stale bootstrap assertions. All were corrected before the final passing ladder; no known required validation failure remains.
- Docker validation was optional because infrastructure did not change and could not run because Docker is unavailable. `make` and GitHub CLI are also unavailable; direct required checks passed, and the connected GitHub integration is used for PR metadata.
- Forbidden-scope inspection passed: no events/evals runtime source, source-specific mapper, simulator execution, benchmark runner or scoring, model call, ingestion, storage, database, API, ledger, invariant, incident, graph, replay, repair, agent tool, external communication, raw-evidence mutation, repair approval, or money mutation was added.

2026-08-03 M03.05 Merge Finalization validation results:

- Validation ladder: Level 0 exact repository, remote, clean starting worktree, branch, identity, synchronized `main`, PR #55 merge ancestry, and merged-tree guard; Level 1 required-file, current-state, historical-record, and forbidden-scope inspection; Level 2 control-plane validation; Level 3 bootstrap plus events/evals unit tests; Level 4 diff and whitespace checks; Level 5 focused package and full-workspace checks; Level 6 unchanged deterministic fixture and seed grounding; Level 7 financial-truth, evidence, immutability, benchmark, and agent-tool boundaries; Level 8 independent finalization QA and remote PR review remain required.
- `python scripts/validate-control-plane.py`, `python -m pytest tests/test_control_plane_bootstrap.py`, and `git diff --check` passed; pytest reported 102 tests.
- `corepack pnpm install --frozen-lockfile` passed across all 14 workspace projects with repo-pinned pnpm 10.32.1 and the known non-blocking `esbuild@0.28.0` ignored-build-scripts warning.
- Events-package typecheck, 4-file/97-test run, build, ESLint, and format checks passed. Evals-package typecheck, 2-file/42-test run, build, ESLint, and format checks passed.
- Full typecheck, lint, test, build, and format checks passed across all 13 workspace packages.
- `corepack pnpm qa:dev --allow-dirty` passed with 17 `PASS`, 0 `FAIL`, and 2 `SKIPPED`; only the authorized dirty-worktree gate and optional Docker validation were skipped.
- Docker and `make` are unavailable; Docker validation is not applicable because infrastructure did not change. GitHub CLI is unavailable, so the connected GitHub integration is used for PR creation and metadata.
- Finalization scope inspection passed: only 16 documentation, plan, milestone, and status files changed. No fixture, seed, parser, package test, runtime source, manifest, lockfile, application, infrastructure, migration, workflow, external communication, ledger state, raw evidence, repair approval, or money state changed.

Acceptance criteria:

- exactly one active M03 plan exists;
- M02 remains completed in `plans/completed/`;
- M03 milestone and registry rows are coherent;
- M03 planning PR #47 is recorded as completed and merged;
- M03.01 is `Completed and merged`;
- M03.02 is `Completed and merged`;
- M03.03 is `Completed and merged` through PR #51 at `03b0b55d988a224a96c2bcd3c30601c6100ab091`;
- M03.04 is `Completed and merged` through PR #53 at `572dc150e38782620416350004630b690c00e687`; QA passed at source commit `d8d13d588bd6471178b4d815556fe1ba7fff570c`, and finalization merged at `4afa9e94bc3938e3138ce2045afc380582b24c71`;
- M03.05 is `Completed and merged` through PR #55 at `89874bca2525a423d773548c61f9655f09642575`; it contains only the reviewed controlled fixture corpus, early seed metadata, deterministic test verification, documentation, and control-plane/tracking updates, while M03.06 remains `Not started`;
- `docs/MONEYEVENT_CONTRACT.md` exists as documentation-only conceptual contract;
- `packages/events` contains the M03.02 TypeScript types plus the M03.04 source-neutral candidate validator and deterministic normalizer;
- `docs/MONEYEVENT_MAPPING_FIXTURES.md` exists as documentation-only mapping fixture and simulator planning;
- the only product runtime behavior is M03.04 structural validation and normalization, which does not establish financial truth;
- no runtime schema framework, source-specific parser or mapper, ingestion, storage, migration, simulator data or execution, benchmark runner or scoring, route, UI, ledger posting, invariant, incident, graph, replay, repair, or agent behavior is created;
- status docs and handoff point to `M03.06 Builder - MoneyEvent QA and Closeout` only after the M03.05 finalization PR merges.

## Expected Files

Expected created file:

- `plans/active/CLP-0004-m03-canonical-moneyevent-engine.md`
- `docs/MONEYEVENT_CONTRACT.md`
- `docs/MONEYEVENT_MAPPING_FIXTURES.md`
- `docs/MONEYEVENT_VALIDATION_NORMALIZATION.md`
- `docs/MONEYEVENT_FIXTURES_BENCHMARK_SEEDS.md`
- `data/fixtures/money-events/candidates.json`
- `scenarios/moneyflowbench/money-event-seeds.json`
- `packages/events/src/money-event.ts`
- `packages/events/src/money-event-validation.ts`
- `packages/events/test/money-event-types.test.ts`
- `packages/events/test/money-event-validation.test.ts`
- `packages/events/test/money-event-fixtures.test.ts`
- `packages/evals/test/money-event-seed-cases.test.ts`

Expected changed files:

- `README.md`
- `START_HERE.md`
- `PLANS.md`
- `WORKFLOW.md`
- `CHANGELOG.md`
- `docs/ACTIVE_DOCS.md`
- `docs/INDEX.md`
- `docs/ARCHITECTURE.md`
- `docs/DOMAIN_MODEL.md`
- `docs/RELIABILITY.md`
- `docs/THREAT_MODEL.md`
- `plans/ROADMAP.md`
- `docs/milestones/M03.md`
- `docs/milestones/SUBMILESTONE_REGISTRY.md`
- `docs/status/CURRENT_STATE.md`
- `docs/status/NEXT_RECOMMENDED_THREAD.md`
- `docs/status/WEEKLY_LOG.md`
- `docs/status/CAPABILITY_MATRIX.md`
- `packages/events/README.md`
- `packages/events/package.json`
- `packages/events/tsconfig.test.json`
- `packages/evals/package.json`
- `packages/evals/tsconfig.test.json`
- `packages/evidence/README.md`
- `packages/evals/README.md`
- `data/fixtures/README.md`
- `scenarios/README.md`
- `packages/events/src/index.ts`
- `packages/events/test/bootstrap.test.ts`
- `pnpm-lock.yaml`
- `scripts/validate-control-plane.py`
- `tests/test_control_plane_bootstrap.py`

Expected files intentionally not touched:

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

The active M03 branch should leave:

- one active M03 plan;
- six lean M03 submilestones;
- M03 planning PR #47 recorded as completed and merged;
- M03.01 completed and merged;
- M03.02 completed and merged;
- `docs/MONEYEVENT_CONTRACT.md` as documentation-only conceptual contract;
- `docs/MONEYEVENT_MAPPING_FIXTURES.md` as documentation-only mapping fixture and simulator planning;
- `docs/MONEYEVENT_FIXTURES_BENCHMARK_SEEDS.md` as the M03.05 artifact and safety boundary;
- one controlled deterministic candidate corpus and one early seed manifest with no live evidence or benchmark results;
- deterministic events/evals tests for fixture outcomes, seed references, evidence grounding, uncertainty, hallucination resistance, repeatability, and future cost-capture requirements;
- updated status docs;
- validator/test coverage for the active M03.05 state and exact artifact allowlist;
- validation evidence summarized in this plan, status docs, weekly log, registry, and final handoff.

It should not leave any live or production evidence, source-specific mapper, simulator data or runtime, new product/domain runtime artifact, benchmark runner or scoring, storage behavior, connector, API route, UI, ledger behavior, replay behavior, repair behavior, or agent runtime.

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

M03 planning QA passed locally for PR #47 on branch `m03-planning-canonical-moneyevent-engine`, and PR #47 merged into `main` at commit `0606d3b21c05f2cf98397c9f5b0f1eddfa104a74`.

M03.01 Builder created `docs/MONEYEVENT_CONTRACT.md` as a documentation-only conceptual MoneyEvent contract and updated tracking, status docs, and validation guards. M03.01 QA verified the contract and applied scoped QA status and handoff updates only.

M03.01 through M03.05 are `Completed and merged`. PR #55 merged M03.05 into `main` at `89874bca2525a423d773548c61f9655f09642575`; builder commit `397ac47756f6cb25f919a1cee7b58adbabe29d4f`, independent QA commit `f7a1f3c8ae13be60ff8f8154acb81965d2237b9d`, and final reviewed head `869af913b781a9706a93d561c256c4077f30361d` are recorded. M03.06 remains `Not started`.

M03.02 added a TypeScript-only MoneyEvent type boundary in `packages/events`. Product runtime behavior has not started. No MoneyEvent runtime schema, parser, validator, normalizer, storage behavior, database tables, API routes, UI, fixtures, simulator data, connectors, agent runtime, ledger behavior, invariant behavior, incident behavior, replay behavior, repair behavior, raw evidence mutation, ledger posting, repair approval, or money mutation exists from M03.02.

M03.03 added `docs/MONEYEVENT_MAPPING_FIXTURES.md` as documentation-only mapping fixture and simulator planning. It did not add fixture data, simulator data, ingestion, storage, parser behavior, validator behavior, normalizer behavior, connectors, API routes, UI, ledger behavior, graph behavior, replay behavior, repair behavior, agent runtime, raw evidence mutation, ledger posting, repair approval, or money mutation.

M03.03 QA passed for PR #51 after verifying mapping fixture planning, verifier-driven loop strategy, package boundaries, validation coverage, tracking state, and forbidden scope. PR #51 then merged into `main` at `03b0b55d988a224a96c2bcd3c30601c6100ab091`, so M03.03 is `Completed and merged`.

M03.04 implements only the dependency-free source-neutral candidate validator and deterministic normalizer in `packages/events`. It adds stable typed issues, exact integer-string-to-`bigint` conversion, strict unknown fields, evidence/provenance consistency, canonical timestamps, explicit uncertainty, and immutable output. It does not add source-specific parsing, ingestion, storage, database, API, ledger, invariant, incident, graph, replay, repair, agent, fixture corpus, benchmark, or money mutation.

M03.04 QA fixed the four-digit UTC normalization boundary, expanded focused events-package coverage from 45 to 66 tests, corrected stale current documentation, and passed the full local validation ladder. PR #53 then merged into `main` at `572dc150e38782620416350004630b690c00e687`; that squash commit has the same tree as QA source commit `d8d13d588bd6471178b4d815556fe1ba7fff570c`.

M03.05 contains the merged controlled fixture corpus, early seed metadata, deterministic fixture/seed verification, documentation, and control-plane coverage described above. Builder and independent QA validation passed before merge. It adds no runtime mapper, benchmark scoring, simulator execution, downstream financial behavior, or financial-truth claim.

Builder commit `397ac47756f6cb25f919a1cee7b58adbabe29d4f`, independent QA commit `f7a1f3c8ae13be60ff8f8154acb81965d2237b9d`, and final reviewed head `869af913b781a9706a93d561c256c4077f30361d` were merged through PR #55 at `89874bca2525a423d773548c61f9655f09642575`. Exact next thread after this finalization PR merges: `M03.06 Builder - MoneyEvent QA and Closeout`. Do not start M03.06 before human merge of this tracking-only finalization PR.
