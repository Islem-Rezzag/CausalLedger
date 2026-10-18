# Open Questions

- Resolved 2026-09-24: the human explicitly approved `V1_PUBLIC_PRODUCT`, with v0.6 as an intermediate checkpoint.
- Resolved 2026-10-09: approved owned disposable PostgreSQL17 CI provides deterministic storage validation; local Docker remains unavailable.
- If live-model evaluation is later approved, which provider/model, maximum call count, and cost cap should govern it? Default and CI validation must remain mock-only.
- Should a later version replace or complement the dependency-free M03.04 validator with a runtime schema framework, and what migration/versioning proof would justify that dependency?
- What error taxonomy, structured logging fields, and observability IDs should future runtime work standardize on?
- What auth/authz design assumptions should API and agent-runtime skeletons preserve for future M18 hardening?
- Which provider simulators should be prioritized first?
- What evidence retention guarantees should be enforced in v1?
- What is the first benchmark scenario set for MoneyFlowBench?
- Which MoneyFlowBench or duplicate-webhook demo scenario should provide the first public ablation table for v1.0.0?

## Answered in M02

- M02 standardized on TypeScript, Node.js, React/Vite, pnpm workspaces, and Turborepo.
- M02 established the app and package layout for the development foundation.
- M02.05 established the initial validation-only CI baseline without claiming deployment, release, or production maturity.

## Answered in M03.04

- The first source-neutral candidate uses ordinary JSON-safe values, including a canonical base-10 integer string for minor units, and successful normalization converts money exactly to branded `bigint`.
- M03.04 uses a strict dependency-free validator with stable issues; it does not claim full JSON parsing or source-specific mapping.
- Negative amount signs are preserved without accounting interpretation, and three-letter uppercase currency validation does not claim authoritative ISO 4217 registry membership.

## M04.01 contract decisions

- Account categories and normal sides, namespaced opaque owners, active/closed metadata and the USD/EUR/GBP support subset are specified in `docs/specs/account-schema.md`. Future currency expansion, contra accounts, durable uniqueness, authorization and lifecycle transitions require their own reviewed scope; metadata validation does not implement them.

## M04.02 contract decisions

- Transaction header identity/status/provenance/clocks/retry-key semantics are specified in `docs/specs/ledger-transaction-schema.md`. Money representations/ranges, durable payload identity, lifecycle enforcement and receipt verification remain with their explicitly authorized owning slices; metadata alone cannot establish them.


## M04.03 money and reference decisions

The versioned entry wire amount is a canonical positive decimal string, parsed exactly to bigint; 1 through 9223372036854775807 per line, zero/negative/Number/bigint input rejected. USD/EUR/GBP match supplied Account metadata. This settles the schema slice's wire/range/side policy; it does not implement storage or posting. M04.04 now sums exact bigint above per-line range where needed; its supplied journal accepts multiple currencies only when each has both sides and equal totals. Per-line limits remain unchanged. Frozen aggregate bigint output has a distinct type from bounded entry amounts; no serializer or database encoding is introduced. M04.05 must specify/test its durable encoding, range, atomicity, rollback and immutable Postgres guards. Serializers, durable reference uniqueness, closed-account eligibility, authorization and economic-occurrence identity remain future owning work; no material scope amendment applied.


## M04 closeout resolutions and remaining questions (2026-10-09)

Resolved: the existing approved disposable owned PostgreSQL17 CI route supports storage acceptance without a local Docker installation. M04.05–09 specified and tested exact durable encoding/range, atomicity, rollback, immutable history, ordinary retry and full reversal linkage. The earlier M04.05 future-tense note is historical. Still open for separately scoped work: source-specific mapping and economic-occurrence identity, authoritative currency registry, ownership/lifecycle authorization, retention, observability, production operations, simulator priority, and future model/evaluation budgets. No new paid calls or release approval is inferred.


## Verified M04 closeout and M05 planning (2026-10-12)

M05 proposes dedicated packages/simulator owner under original package task. Freeze exact raw envelope/IDs, currency/amount policy, CSV dialect and seed/version semantics in owning implementation briefs before dependent rows. No live integration/financial authority/material amendment assumed.


## M05.01 foundation checkpoint (2026-10-13)

M00–M04 are closed; V1_PUBLIC_PRODUCT remains approved. M05 planning PR81 is human-merged and verified. M05.01 Create simulator package is Builder in progress on m05-01-create-simulator-package under active plans/active/CLP-0006-m05-provider-and-bank-simulator.md. Current validation NOT RUN; no current PR. Only package foundation/contracts/manifest validation are in scope. M05.02–M05.19 and M06–M21 remain Not started/unbound; provider/bank generation remains unimplemented.

Human PR81 merged at 6b755d57bf0f03f1618aea1096cc99e1876e4bed on 2026-10-13T17:25:57Z by nonbot Islem-Rezzag. Reviewed b18b047fe87ed8eafa6d9756ca7db5c9d569291f and actual merge have tree 4f45bfdfbc063966766f9a347a1fccd3f4d237ca, full diff EMPTY and fetched-main reachability PASS. Root and existing independent reviewer verified primary merge/CI/body/advisory6128785198/reviewer hash bindings. Final planning QA441 lifecycle/2252 controls/rootclean18/0/1/bothCI38273448464 passed;1785 ledger/32files/all14 PostgreSQL1227/THREE recovery/both populated upgrades/schema/DEMO/cleanup passed. No unchanged planning tests rerun to verify merge.

Generic structural/hash validation is not financial payload validation, source authenticity or actual receipt ingestion. Exact UTF8 preservation and explicit unknown source time are required. Future amount/currency/seed/CLI/CSV behavior stays with its owning slice. No material scope expansion or financial-write authority.
## M05.02 current checkpoint (2026-10-16)

M00–M04 are closed; V1_PUBLIC_PRODUCT remains approved. M05.01 is Completed and merged in verified human PR82. M05.02 Simulate payment authorized is QA passed, awaiting merge for sole PR #83 on m05-02-simulate-payment-authorized under plans/active/CLP-0006-m05-provider-and-bank-simulator.md. Only the synthetic authorization generator is implemented. Independent candidate acceptance passed; final tracking-head gates and human merge remain. M05.03–M05.19 and M06–M21 remain Not started/unbound.

Human PR82 merged ac092fcb7b0ee16459b1ca1177d4b9b10e0df5ce at 2026-10-16T14:20:14Z by nonbot Islem-Rezzag. Reviewed b0c0e32daf91d95cd9bff555a766dadc0cfc7501 and squash have identical tree 0d2f821264fc0c55ae6ed77eb4ebc65729776014, full diff EMPTY and fetched-main reachability PASS. Root and existing independent reviewer verified primary merge/CI/body/advisory6153826833/canonical reviewer hash bindings. Final simulator107, lifecycle540, controls2397, root clean18/0/1 and both CI38455025292 PASS; ledger1785 and all14 real PostgreSQL suites1227/no skips, recovery/upgrades/schema/DEMO/cleanup PASS. Prior candidate309 behavior probes were carried through356 byte-identical nontracking files, not rerun as fresh final probes. No unchanged01 tests rerun merely to verify merge.

Current02 generator validation is recorded in CURRENT_STATE.md and active CLP0006. Root runs tests; user none. No future feature or financial authority.


## M05.03 current checkpoint (2026-10-18)

M00–M04 are closed; V1_PUBLIC_PRODUCT remains approved. M05.01 and M05.02 are Completed and merged in verified PR82/PR83. M05.03 Simulate payment captured is QA passed, awaiting merge for sole PR #84 on m05-03-simulate-payment-captured under plans/active/CLP-0006-m05-provider-and-bank-simulator.md. Synthetic capture composition is implemented; M05.04–M05.19 and M06–M21 remain Not started/unbound.

Candidate independent QA PASS on e8aa4daa4a824b8d18b80046912a7695f89f1f4a/tree3f2e7ee7aa1fb6a12df5da107dd69c108164bb5a: fresh470 simulator/7files,366 behavior,702 lifecycle and2727 controls in353.77s, package type/lint/build/format/validator/whitespace PASS; no findings. Canonical reviewer SHA2567569ac2ccb622e8f8030df7b5ee8ea1bf8ab4e7981575ace142e221536061b7d. Root clean candidate QA18 PASS/0 FAIL/1 optional localDocker skip, no dirtyoverride. Root primary CI39134527410 both jobs SUCCESS:470 simulator/1785 ledger/2727 controls and all14 realPostgreSQL1227/no skips; THREE migrations recovery, both populated upgrades, exactschema/DEMO and owned+Composecleanup PASS. Actual tested d106060952e6da93321f6b66014ddbc3ba5ea4a4 parentsb41+e8aa/tree3f2/full localdiffEMPTY independently checked locally. Source/control/tests/spec remain byte-identical through361 nontracking paths; only22 legitimate handoff/navigation/status files change. Final-head clean QA/currentCI/independent local acceptance/publication/readback are required external gates after this handoff commit, with no further CI-copy-only commit. Warm dependencies/Turbocache; no cold-cache, systeminstall, live-model or localPostgreSQL claim. Reviewer primary-network denial remains respected; actual current GitHub/CI evidence is root-verified and explicitly attributed.

Complete exact-final-head clean QA, actual CI and independent local acceptance; publish canonical report/body/advisory and verify readiness, then PAUSED: HUMAN MERGE REQUIRED for sole PR84. Human alone Squash and merges. Verify actual84 merge before M05.04 Simulate payout created; later16 rows/M06–M21 remain closed. Root runs tests; user none. Native goal remains user-paused.
