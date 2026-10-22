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
| Local infrastructure baseline | Completed and merged | M02.06 baseline PR #44 remains preserved. M04.05 PR #66 extends only the approved isolated Postgres17 route with a ledger migration/acceptance runner; actual64 tests and migrations/schema/owned cleanup PASS in CI37446228689 before human merge. M04.06 CI37455036023 adds22 real balance tests without new schema/grants. Local Docker remains unavailable; no production provisioning, Redis, queues, schedulers or deployment. |
| QA development environment | Completed and merged | M02.07 adds `pnpm qa:dev`, `scripts/qa-dev-environment.py`, and `docs/ops/qa-development-environment.md` for repeatable standard validation and explicit Docker opt-in; QA corrected truthful dirty-worktree, repository-local identity, deterministic Docker environment, flow-control, CI proof, and behavioral-test coverage; PR #45 merged at `4a4f381`; no product/domain behavior |
| Continuous lifecycle observer alignment | Planned direction | Documentation-only language for living causal timeline, live/replay input timing, and progressive incident certainty; no runtime implementation |
| MoneyEvent engine | Completed | PR #59 merged after independent QA at `9c2df34fd1da1a4f893a5b16cb05fa1177f23cce`; formal closeout PR #60 is merged and recorded in `docs/status/M03_CLOSEOUT.md`. `packages/events` contains compile-time types plus deterministic source-neutral candidate validation and normalization. M03.05 contains 21 controlled synthetic fixtures, seven early MoneyFlowBench seed metadata records, and strict test-only verification. Structural and fixture success is not financial truth. No source-specific parser or mapper, ingestion, storage, database, API, ledger posting, invariant, incident, graph, replay, repair, agent, connector, UI, benchmark scoring, or money mutation exists. |
| Ledger core | Partial - schemas and pure journal validation, immutable synthetic storage/read-only queries/scoped idempotency/full reversals/account roles | All eighteen M04 rows are human-merged, including whole-ledger QA and the synthetic demonstration. Final PR79 QA/CI37959900408 verified 1785 ledger/1882 control/1227 PostgreSQL tests. Formal closeout PR80 is human-merged and verified; no autonomous financial authority or later features. |
| Simulator manifest foundation | Completed and merged | Human PR82/final QA/CI verified; strict generic synthetic manifest types and deterministic UTF8 hash/reference validation. |
| Synthetic payment authorization | Completed and merged | Human PR83 final QA/CI/merge verified. |
| Synthetic payment capture | Completed and merged | Human PR84 merge/final QA verified; synthetic only. |
| Synthetic payout lifecycle | QA passed, awaiting merge | M05.04–06 full gross capture aggregation and created/paid/failed evidence; Sole PR86 candidate QA/CI PASS; final reviewed-head gates/learning/human merge pending. |
| Invariant engine | Not started | No product logic |
| Incident engine | Not started | No product logic |
| Causal graph | Not started | No product logic |
| Replay engine | Not started | No product logic |
| Agent runtime | Not started | No product logic |
| Repair planner | Not started | No product logic |
| UI command center | Not started | No product logic |


## Verified M04 closeout and M05 planning (2026-10-12)

M04 formal closeout human-merged/verified, all financial behavior unchanged. M05 planning only; packages/simulator and its output/CLI remain unimplemented.


## M05.01 foundation checkpoint (2026-10-13)

M00–M04 are closed; V1_PUBLIC_PRODUCT remains approved. M05 planning PR81 is human-merged and verified. M05.01 Create simulator package is QA passed, awaiting merge for sole PR #82 on m05-01-create-simulator-package under active plans/active/CLP-0006-m05-provider-and-bank-simulator.md. Candidate independent QA and both CI passed; final tracking-head gates remain pending. Generic manifest foundation is implemented; provider/bank generation remains unimplemented. M05.02–M05.19 and M06–M21 remain Not started/unbound.

Human PR81 merged at 6b755d57bf0f03f1618aea1096cc99e1876e4bed on 2026-10-13T17:25:57Z by nonbot Islem-Rezzag. Reviewed b18b047fe87ed8eafa6d9756ca7db5c9d569291f and actual merge have tree 4f45bfdfbc063966766f9a347a1fccd3f4d237ca, full diff EMPTY and fetched-main reachability PASS. Root and existing independent reviewer verified primary merge/CI/body/advisory6128785198/reviewer hash bindings. Final planning QA441 lifecycle/2252 controls/rootclean18/0/1/bothCI38273448464 passed;1785 ledger/32files/all14 PostgreSQL1227/THREE recovery/both populated upgrades/schema/DEMO/cleanup passed. No unchanged planning tests rerun to verify merge.

Generic structural/hash validation is not financial payload validation, source authenticity or actual receipt ingestion. Exact UTF8 preservation and explicit unknown source time are required. Future amount/currency/seed/CLI/CSV behavior stays with its owning slice. No material scope expansion or financial-write authority.


## M05.01 builder validation checkpoint (2026-10-13)

Builder complete, awaiting QA. Builder fresh simulator107/3files/type/lint/build/format and full2397 controls PASS; workspace frozen install/typecheck/lint/test/build/format/validator/whitespace PASS. Intermediate root QA17 PASS/0 FAIL/2 expected skips (own scoped dirty worktree, optional unavailable local Docker). Scope36/protected339/complete29375-byte planning history/raw19/V1/all prior proofs/append-only weekly/unchanged importers+dependency snapshots PASS. Existing independent static review found no remaining confirmed defect; overall clean-candidate/final independent QA and current actual CI remain pending. Cached tools used; no cold-cache claim/system install/credentials/policy change. Existing glob deprecation/esbuild ignored-script warnings recorded.

Exact next: M05.01 QA/solePR/final gates/human merge; verify before M05.02. User runs no tests. Foundation only, no provider/bank generation or financial authority.


## M05.01 independent candidate QA and final handoff (2026-10-13)

M00–M04 are closed; V1_PUBLIC_PRODUCT remains approved. M05 planning PR81 is human-merged and verified. M05.01 Create simulator package is QA passed, awaiting merge for sole PR #82 on m05-01-create-simulator-package under active plans/active/CLP-0006-m05-provider-and-bank-simulator.md. Candidate independent QA and both CI passed; final tracking-head gates remain pending. Generic manifest foundation is implemented; provider/bank generation remains unimplemented. M05.02–M05.19 and M06–M21 remain Not started/unbound.

Candidate f0832c0a53420f7fc48817fb9a648febcbc06a28/tree 8ebb8c5dd0e8aff0b1222e341600ca88ff51e425 independently reviewed PASS: simulator107/3 files/type/lint/build/format,309 behavioral probes,540 lifecycle/provenance probes and full2397 controls. Root clean QA18 PASS/0 FAIL/1 optional Docker skip without dirty override. Both CI38450630391 jobs passed; simulator107, ledger1785/32 files, controls2397, all14 actual mandatory PostgreSQL suites1227/no skips; THREE recovery/both populated preservation upgrades/exact schema/DEMO/owned+Compose cleanup PASS. Both tested checkouts42da634d03ffd9a9e18e07c945c0fcb15afb4334 have expected base/head parents, same tree and full empty diff. Scope36/protected339/complete29375-byte planning history/raw18+19/V1/prior proofs/append-only weekly/old dependency snapshots PASS. Final committed tracking head requires fresh root/independent QA/both actual CI/published SHA-bound readback/readiness before human merge; final proof belongs in sole PR82.
## M05.02 current checkpoint (2026-10-16)

M00–M04 are closed; V1_PUBLIC_PRODUCT remains approved. M05.01 is Completed and merged in verified human PR82. M05.02 Simulate payment authorized is QA passed, awaiting merge for sole PR #83 on m05-02-simulate-payment-authorized under plans/active/CLP-0006-m05-provider-and-bank-simulator.md. Only the synthetic authorization generator is implemented. Independent candidate acceptance passed; final tracking-head gates and human merge remain. M05.03–M05.19 and M06–M21 remain Not started/unbound.

Human PR82 merged ac092fcb7b0ee16459b1ca1177d4b9b10e0df5ce at 2026-10-16T14:20:14Z by nonbot Islem-Rezzag. Reviewed b0c0e32daf91d95cd9bff555a766dadc0cfc7501 and squash have identical tree 0d2f821264fc0c55ae6ed77eb4ebc65729776014, full diff EMPTY and fetched-main reachability PASS. Root and existing independent reviewer verified primary merge/CI/body/advisory6153826833/canonical reviewer hash bindings. Final simulator107, lifecycle540, controls2397, root clean18/0/1 and both CI38455025292 PASS; ledger1785 and all14 real PostgreSQL suites1227/no skips, recovery/upgrades/schema/DEMO/cleanup PASS. Prior candidate309 behavior probes were carried through356 byte-identical nontracking files, not rerun as fresh final probes. No unchanged01 tests rerun merely to verify merge.

Current02 generator validation is recorded in CURRENT_STATE.md and active CLP0006. Root runs tests; user none. No future feature or financial authority.


## M05.03 current checkpoint (2026-10-18)

M00–M04 are closed; V1_PUBLIC_PRODUCT remains approved. M05.01–M05.03 are Completed and merged in verified PR82/83/84. M05.04–M05.06 synthetic payout lifecycle is QA passed, awaiting merge for sole PR #86 on codex/m05-payout-lifecycle under plans/active/CLP-0006-m05-provider-and-bank-simulator.md. Creation/paid/failed compositions are implemented and builder-tested; Candidate independent QA/CI passed; final reviewed-head confirmation/CI, learning and human merge remain pending. M05.07–M05.19 and M06–M21 remain Not started/unbound.

Candidate independent QA PASS on e8aa4daa4a824b8d18b80046912a7695f89f1f4a/tree3f2e7ee7aa1fb6a12df5da107dd69c108164bb5a: fresh470 simulator/7files,366 behavior,702 lifecycle and2727 controls in353.77s, package type/lint/build/format/validator/whitespace PASS; no findings. Canonical reviewer SHA2567569ac2ccb622e8f8030df7b5ee8ea1bf8ab4e7981575ace142e221536061b7d. Root clean candidate QA18 PASS/0 FAIL/1 optional localDocker skip, no dirtyoverride. Root primary CI39134527410 both jobs SUCCESS:470 simulator/1785 ledger/2727 controls and all14 realPostgreSQL1227/no skips; THREE migrations recovery, both populated upgrades, exactschema/DEMO and owned+Composecleanup PASS. Actual tested d106060952e6da93321f6b66014ddbc3ba5ea4a4 parentsb41+e8aa/tree3f2/full localdiffEMPTY independently checked locally. Source/control/tests/spec remain byte-identical through361 nontracking paths; only22 legitimate handoff/navigation/status files change. Final-head clean QA/currentCI/independent local acceptance/publication/readback are required external gates after this handoff commit, with no further CI-copy-only commit. Warm dependencies/Turbocache; no cold-cache, systeminstall, live-model or localPostgreSQL claim. Reviewer primary-network denial remains respected; actual current GitHub/CI evidence is root-verified and explicitly attributed.

Complete exact-final-head clean QA, actual CI and independent local acceptance; publish canonical report/body/advisory and verify readiness, then PAUSED: HUMAN MERGE REQUIRED for sole PR84. Human alone Squash and merges. Verify actual84 merge before M05.04 Simulate payout created; later16 rows/M06–M21 remain closed. Root runs tests; user none. Native goal remains user-paused.
