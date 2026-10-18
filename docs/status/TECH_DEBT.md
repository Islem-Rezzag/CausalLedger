# Tech Debt

M03 is closed after PR #60 merged. No product implementation defect is confirmed. The future decisions below are unimplemented roadmap scope, not technical debt merely because they remain unbuilt.

- Local Docker and Docker Compose validation remain unavailable on the audited machine; remote `infra-smoke` is green, but future storage/migration work needs approved local Docker setup or an equivalent deterministic environment.
- Browser-level automation is not installed and should be selected only when a usable M15-era product flow requires it.
- The completion roadmap overlay is a proposal, not an active rewrite; milestone acceptance criteria and one-branch/one-PR traceability remain authoritative.

## Future scope and decisions (not confirmed technical debt)

- Evolve monorepo tooling and task conventions as implementation pressure appears.
- Evolve test framework conventions for product/domain tests once product implementation starts.
- Extend test typecheck conventions as future product packages add non-scaffold test layouts.
- Decide whether a future runtime schema framework is warranted; M03.04 uses dependency-free strict validation over a JSON-safe candidate.
- Extend the reviewed M03.05 MoneyEvent fixtures or benchmark seeds only through a separately scoped future slice that preserves strict manifest validation and evidence grounding.
- Define source-specific parsing and idempotency derivation, authoritative currency-registry validation, storage representation, cross-event deduplication, lifecycle transitions, and accounting direction in separately scoped future work.
- Define professional engineering evidence for future error handling, structured logging, deployment documentation, auth/authz design, and scalable data modeling.

## Accepted local-environment limitations

- Local Docker is unavailable in the current Windows shell unless a later validation run proves otherwise. M02 relies on GitHub Actions `infra-smoke` plus QA script behavioral tests for Docker/Postgres/migration evidence.
- `make bootstrap-check` is unavailable in the current Windows shell unless a later validation run proves otherwise. Direct Python validation commands are the accepted equivalent for this environment.


## M04 closeout debt review (2026-10-09)

M04 has implemented and tested durable exact money encoding, bounded per-entry values with BigInt aggregate sums, atomic append, rollback, immutable SQL guards, ordinary retry identity, full linked reversals and explicit account-role validators/configuration wrappers. Earlier future-storage/accounting notes are historical, not current blockers. No confirmed ledger implementation defect remains after M04.18 independent QA. Source-specific mapping, economic-occurrence deduplication, authoritative currency registry, lifecycle authorization and production operations remain future scope. M02-only infrastructure wording is superseded by fourteen mandatory approved owned PostgreSQL17 suites, migration recovery and populated upgrades; local Docker/make limitations persist. Branches are intentionally retained for audit/recovery; no deletion is authorized.


## Verified M04 closeout and M05 planning (2026-10-12)

M04 closeout/current source claims reconciled and plan moved after verified human merge. M05 simulator ownership/dialects/seed policy remain planning until owning reviewed implementation; existing Docker/make limits and retained branches unchanged.


## M05.01 foundation checkpoint (2026-10-13)

M00–M04 are closed; V1_PUBLIC_PRODUCT remains approved. M05 planning PR81 is human-merged and verified. M05.01 Create simulator package is Builder in progress on m05-01-create-simulator-package under active plans/active/CLP-0006-m05-provider-and-bank-simulator.md. Current validation NOT RUN; no current PR. Only package foundation/contracts/manifest validation are in scope. M05.02–M05.19 and M06–M21 remain Not started/unbound; provider/bank generation remains unimplemented.

Human PR81 merged at 6b755d57bf0f03f1618aea1096cc99e1876e4bed on 2026-10-13T17:25:57Z by nonbot Islem-Rezzag. Reviewed b18b047fe87ed8eafa6d9756ca7db5c9d569291f and actual merge have tree 4f45bfdfbc063966766f9a347a1fccd3f4d237ca, full diff EMPTY and fetched-main reachability PASS. Root and existing independent reviewer verified primary merge/CI/body/advisory6128785198/reviewer hash bindings. Final planning QA441 lifecycle/2252 controls/rootclean18/0/1/bothCI38273448464 passed;1785 ledger/32files/all14 PostgreSQL1227/THREE recovery/both populated upgrades/schema/DEMO/cleanup passed. No unchanged planning tests rerun to verify merge.

Generic structural/hash validation is not financial payload validation, source authenticity or actual receipt ingestion. Exact UTF8 preservation and explicit unknown source time are required. Future amount/currency/seed/CLI/CSV behavior stays with its owning slice. No material scope expansion or financial-write authority.
## M05.02 current checkpoint (2026-10-16)

M00–M04 are closed; V1_PUBLIC_PRODUCT remains approved. M05.01 is Completed and merged in verified human PR82. M05.02 Simulate payment authorized is QA passed, awaiting merge for sole PR #83 on m05-02-simulate-payment-authorized under plans/active/CLP-0006-m05-provider-and-bank-simulator.md. Only the synthetic authorization generator is implemented. Independent candidate acceptance passed; final tracking-head gates and human merge remain. M05.03–M05.19 and M06–M21 remain Not started/unbound.

Human PR82 merged ac092fcb7b0ee16459b1ca1177d4b9b10e0df5ce at 2026-10-16T14:20:14Z by nonbot Islem-Rezzag. Reviewed b0c0e32daf91d95cd9bff555a766dadc0cfc7501 and squash have identical tree 0d2f821264fc0c55ae6ed77eb4ebc65729776014, full diff EMPTY and fetched-main reachability PASS. Root and existing independent reviewer verified primary merge/CI/body/advisory6153826833/canonical reviewer hash bindings. Final simulator107, lifecycle540, controls2397, root clean18/0/1 and both CI38455025292 PASS; ledger1785 and all14 real PostgreSQL suites1227/no skips, recovery/upgrades/schema/DEMO/cleanup PASS. Prior candidate309 behavior probes were carried through356 byte-identical nontracking files, not rerun as fresh final probes. No unchanged01 tests rerun merely to verify merge.

Current02 generator validation is recorded in CURRENT_STATE.md and active CLP0006. Root runs tests; user none. No future feature or financial authority.


## M05.03 current checkpoint (2026-10-18)

M00–M04 are closed; V1_PUBLIC_PRODUCT remains approved. M05.01 and M05.02 are Completed and merged in verified PR82/PR83. M05.03 Simulate payment captured is Builder complete, awaiting QA on m05-03-simulate-payment-captured under plans/active/CLP-0006-m05-provider-and-bank-simulator.md. Synthetic capture composition is implemented; M05.04–M05.19 and M06–M21 remain Not started/unbound.

Builder checks: simulator470/7files and typecheck/lint/build/format PASS; workspace frozen install/typecheck/lint/test/build/format/validator/whitespace PASS using warm dependencies/Turbo cache. Focused historical/current lifecycle475 PASS. Initial full2727 controls:2649 PASS/78 FAIL (dropped completed-M04 navigation link), then all78 failed cases freshly rechecked PASS in69+9 runs after restoring that link, without weakening assertions. Initial intermediate QA15 PASS/2 FAIL/2 skips (format plus navigation regression); both failures repaired and their checks passed. A fresh complete clean-commit QA remains pending; do not label the initial full run PASS. Scope33/protected350, exact88549-byte merged02 and nested histories/raw19/V1/prior proofs/append-only weekly/unchanged financial+02/generic/config/lock/CI PASS. Independent static reviewers found no remaining substantive defect; three test-quality findings repaired. Local Docker/make unavailable; actual PostgreSQL CI/current independent runtime/final gates pending.

Run clean committed candidate QA, existing independent local behavioral/lifecycle/full controls and root actual CI for the sole03 PR, then final exact-head gates and human merge. No04 before verified03 merge. Root runs tests; user none. Native goal remains user-paused.
