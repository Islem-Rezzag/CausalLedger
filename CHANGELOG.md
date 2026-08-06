# Changelog

All notable CausalLedger release changes are recorded here.

## Unreleased

- M03.06 independent QA passed on PR #59 after a full MoneyEvent and branch-diff audit. QA bound closeout-readiness claims to their required sections, mutation-tested filesystem/lifecycle/later-milestone/capability failure paths, and tightened the existing fixture tests to assert exactly 21 cases, eight valid snapshots, and 13 invalid issue contracts. No MoneyEvent runtime, fixture, seed, dependency, lockfile, financial-truth, or forbidden-scope defect was found; M03 remains active and M04 through M21 remain `Not started` pending human PR merge and formal M03 closeout.
- Started M01 planning for domain model and scope freeze.
- Added versioning and release-scope documentation.
- Added and completed the M01 plan at `plans/completed/CLP-0002-m01-domain-model-and-scope-freeze.md`.
- Added M01 domain vocabulary and boundary documents for payment lifecycle, ledger, settlement, reconciliation, incidents, safe and unsafe repairs, evidence receipts, human review states, and out-of-scope domains.
- Added canonical M01 domain, reliability, threat-model, and domain consistency QA documentation.
- Added `docs/status/M01_CLOSEOUT.md` and closed M01 as documentation/control-plane work.
- Started M02 planning with active plan `plans/active/CLP-0003-m02-monorepo-and-local-development-environment.md`, continuous lifecycle observer alignment, and lightweight M02 planning ADR placeholders.
- Completed M02.01 stack ADRs for TypeScript-first monorepo direction, local development implications, and deferred CI/runtime boundaries.
- Completed M02.02 minimal non-domain `apps/api` TypeScript/Fastify scaffold.
- Completed M02.03 minimal non-domain `apps/web` React/Vite scaffold.
- Completed M02.04 minimal non-domain `apps/worker` TypeScript scaffold.
- Added M02 process-amendment tracking fixes, M02 process diet, structural control-plane validation direction, and ADR-0008 identity, money, and storage direction.
- Completed and merged M02.05 package scaffolds, ESLint baseline, CI baseline, test typecheck coverage, and explicit Python CI dependencies after PR #43 merged at `6e76045`.
- Completed and merged M02.06 local-only Docker Compose/Postgres, migration tooling, env placeholders, infrastructure readiness stubs, and remote infrastructure smoke validation after PR #44 merged at `80ce206`.
- M02.07 Builder created a repeatable QA development environment with `pnpm qa:dev`, `scripts/qa-dev-environment.py`, explicit Docker opt-in, documentation, validator coverage, and bootstrap tests.
- M02.07 QA corrected truthful dirty-worktree, repository-local identity, deterministic Docker environment, flow-control, CI proof, and behavioral-test coverage.
- Completed and merged M02.07 after PR #45 merged into `main` at `4a4f381adb7ed263fb26d0373f00043f2fe6a6bc`.
- Closed M02 with `docs/status/M02_CLOSEOUT.md`; the completed M02 plan moved to `plans/completed/CLP-0003-m02-monorepo-and-local-development-environment.md`, no active milestone plan remains, and M03 remains `Not started`.
- Started M03 planning with active plan `plans/active/CLP-0004-m03-canonical-moneyevent-engine.md` and a lean six-submilestone Canonical MoneyEvent Engine plan; no MoneyEvent behavior, runtime schema, database table, API route, UI, storage, or product/domain implementation was added.
- M03 Planning QA passed locally for PR #47 as planning/control-plane QA only; M03.01 through M03.06 remain `Not started`, and no MoneyEvent behavior, runtime schema, parser, validator, storage, database table, API route, UI, fixture, simulator, benchmark data, or product/domain implementation was added.
- Completed M03 planning after PR #47 merged into `main` at commit `0606d3b21c05f2cf98397c9f5b0f1eddfa104a74`.
- M03.01 Builder created `docs/MONEYEVENT_CONTRACT.md` as a conceptual MoneyEvent contract covering purpose, non-goals, semantic fields, lifecycle meaning, evidence, idempotency, time, money, uncertainty, future-layer relationships, and explanatory examples; no MoneyEvent runtime behavior, TypeScript type, schema, parser, validator, normalizer, storage, fixture, simulator data, migration, API route, UI, or product behavior was added.
- M03.01 QA passed for PR #48 as documentation/control-plane QA only; the MoneyEvent conceptual contract is coherent and documentation-only, M03.02 through M03.06 remain `Not started`, and no MoneyEvent runtime behavior, TypeScript type, schema, parser, validator, normalizer, storage, fixture, simulator data, migration, API route, UI, or product behavior was added.
- M03.01 completed after PR #48 merged into `main` at `babadf52762c407fc4d49c6e1d1b0b6cc0542b8e`.
- M03.02 Builder added a TypeScript-only MoneyEvent type boundary in `packages/events` with branded IDs, integer minor-unit `bigint` amount, ISO 4217 currency branding, evidence/provenance/idempotency/time/uncertainty/lifecycle fields, package exports, compile-time-oriented tests, and validator allowlists; no parser, validator, normalizer, runtime schema, storage, fixture, simulator data, migration, API route, UI, ledger posting, repair behavior, agent runtime, or product behavior was added.
- M03.02 QA passed for PR #49; the MoneyEvent TypeScript type boundary is coherent and scoped, remote checks passed, M03.03 through M03.06 remain `Not started`, and no parser, validator, normalizer, runtime schema, storage, fixture, simulator data, migration, API route, UI, ledger posting, repair behavior, agent runtime, or product behavior was added.
- M03.02 completed after PR #49 merged into `main` at `f7e3b54ba6a533a70d34810564be1b8828eec952`; M03.03 through M03.06 remain `Not started`, and product runtime behavior remains unstarted beyond the compile-time MoneyEvent TypeScript type boundary.
- M03.03 Builder created `docs/MONEYEVENT_MAPPING_FIXTURES.md` as documentation-only evidence-to-MoneyEvent mapping fixture and simulator planning, updated status tracking and control-plane validation, and kept M03.04 through M03.06 `Not started`; no fixture data, simulator data, parser, validator, normalizer, storage, connector, API route, UI, ledger posting, repair behavior, agent runtime, or product behavior was added.
- M03.03 QA passed for PR #51; mapping fixture planning and verifier-driven loop strategy remain documentation/control-plane only, M03.04 through M03.06 remain `Not started`, and no fixture data, simulator data, parser, validator, normalizer, storage, connector, API route, UI, ledger posting, repair behavior, agent runtime, autonomous loop, or product behavior was added.
- M03.03 completed after PR #51 merged into `main` at `03b0b55d988a224a96c2bcd3c30601c6100ab091`; `docs/MONEYEVENT_MAPPING_FIXTURES.md` and the verifier-driven loop strategy remain planning/documentation only, M03.04 through M03.06 remain `Not started`, M04 through M21 remain `Not started`, and product runtime behavior has not started.
- M03.03 merge finalization merged at `737710592544203e039ceee44a732e289c373bb6`.
- M03.04 Builder implemented deterministic source-neutral MoneyEvent candidate validation and normalization in `packages/events`, including stable typed issues, canonical integer-string-to-`bigint` money conversion, evidence/provenance consistency, timestamp canonicalization, explicit uncertainty, strict unknown fields, deterministic ordering, and input immutability. No dependency, source-specific parser, ingestion, storage, database, API, ledger, invariant, incident, graph, replay, repair, agent, connector, fixture corpus, benchmark, or money mutation was added.
- M03.04 QA passed for PR #53 after fixing a four-digit RFC 3339 UTC normalization boundary, expanding events-package coverage from 45 to 66 tests, correcting current status documentation, and passing the full required local validation ladder. M03.05 and M03.06 remain `Not started`.
- M03.04 completed after PR #53 merged into `main` at `572dc150e38782620416350004630b690c00e687`; the QA-reviewed source commit was `d8d13d588bd6471178b4d815556fe1ba7fff570c`, and both commits have the same tree. The source-neutral structural validator and deterministic normalizer remain the only MoneyEvent runtime behavior; M03.05 and M03.06 and M04 through M21 remain `Not started`.
- M03.04 merge finalization completed at `4afa9e94bc3938e3138ce2045afc380582b24c71`.
- M03.05 Builder added a versioned controlled synthetic MoneyEvent candidate corpus, early MoneyFlowBench seed metadata, deterministic events/evals test verification, and explicit evidence, uncertainty, hallucination-resistance, repeatability, future cost-capture, and safety boundaries. No source-specific mapper, simulator execution, benchmark runner or scoring, ingestion, storage, downstream financial behavior, or money mutation was added.
- M03.05 independent QA passed for PR #55 after adding strict test-only fixture and seed manifest parsers, expanding the corpus to 21 cases, replacing partial expectations with complete JSON-safe snapshots, enforcing exact invalid issues and seed grounding, and renaming receipt-only evidence metadata truthfully. M03.06 remains `Not started` until human merge and post-merge finalization.
- M03.05 completed after PR #55 merged into `main` at `89874bca2525a423d773548c61f9655f09642575`; builder commit `397ac47756f6cb25f919a1cee7b58adbabe29d4f`, independent QA commit `f7a1f3c8ae13be60ff8f8154acb81965d2237b9d`, and final reviewed head `869af913b781a9706a93d561c256c4077f30361d` are recorded. M03 remains active and M03.06 remains `Not started`.
- M03.05 recovery QA PR #58 squash-merged at `721bd60eba04cdf71765660727132d0d6aed97bc`; reviewed source `0b71c214e6463a7bc462fc37a2071e7f578a0799` and the merge commit share tree `266c357b2973d4b64dffc1523c700ce05e1f595d` with zero changed files. Source ancestry is not applicable to the squash merge.
- M03.06 Builder completed the milestone-wide MoneyEvent artifact, merge, acceptance, implementation, fixture, seed, determinism, immutability, API, package, security, financial-truth, forbidden-scope, and M04-readiness audits; added `docs/status/M03_CLOSEOUT_READINESS.md` plus control-plane guards; and found no MoneyEvent runtime, fixture, seed, dependency, or lockfile defect. M03 remains active and M04 through M21 remain `Not started`; independent M03.06 QA is next.

## v0.1.0 - Repo Operating System Foundation

M00 Repo Operating System established the repository control plane:

- active docs and repo guidance;
- roadmap and canonical submilestone registry;
- milestone docs for M00-M21;
- planning, builder, QA, validation, GitHub PR, issue, and closeout workflows;
- prompt templates and local CausalLedger skills;
- GitHub PR and issue templates;
- control-plane validation script and bootstrap tests;
- M00 freeze readiness and closeout records.

No product functionality is implemented in `v0.1.0`. There is no MoneyEvent runtime, ledger runtime, invariant runtime, incident runtime, causal graph runtime, replay runtime, agent runtime, repair planner, UI, API, database, connector, GitHub Actions workflow, CI workflow, or real secret handling.
