# CLP-0005 M04 Double-entry Ledger Core

## Purpose / Big Picture

Plan M04's deterministic ledger primitives using the approved MoneyEvent boundary, M01 ledger vocabulary, and ADR-0008. The human explicitly approved `V1_PUBLIC_PRODUCT` on 2026-09-24: “Merged #60. I approve V1_PUBLIC_PRODUCT. Continue.” v0.6 is an intermediate checkpoint, not a replacement target. This approval authorizes the existing roadmap and routine delivery; it does not authorize live financial writes, repair approval, paid calls, system installation, material architecture changes, release tags, deployment, or publication.

Current slice: M04.01 Define Account schema, on `m04-01-account-schema`. Planning PR #61 is verified merged at `17a6e85e81cdddc36381defbffc80a7636cee151`; its tree equals reviewed head `a2ff0ea9176c9ee37b5f851968b7f79fa8017be9` (`edde0f85a215bb7c664f47bb29eb961f7a76d02b`). Independent review and CI run `36016966738` passed before human merge. M04.01 is QA passed, awaiting merge in PR #62; M04.02-M04.18 and M05-M21 remain Not started. Earlier planning records below are dated history.

## Progress

- [x] 2026-09-24: Verified PR #60 human merge at `3df6f88b1b64b5456554654b7e27adcfa99c3ff6` and reviewed head `f160a7d2bc0d6163ee73b36c1546419134f11ca3` have identical tree `0c14f73280c8b15ab93e0f697edc33738946c7ef`; source-to-merge diff is empty and merge is on origin/main.
- [x] 2026-09-24: Prior independent QA PASS and exact-head CI run `36011283395` (`validate`, `infra-smoke`) verified. PR #60's stale body and absent posted model-review comment reflect the previously blocked external update; the actual review record is preserved in the existing closeout addendum and this task's reviewed evidence.
- [x] 2026-09-24: Recorded the user's explicit V1 selection and its provenance in the existing goal state; no generated instruction is treated as approval.
- [x] 2026-09-24: Fast-forwarded clean main to the verified merge, created the planning branch, and passed branch/status/origin guard before editing. Existing user branches and temporary files were preserved.
- [x] 2026-09-24: Defined the 18-row sequence, dependencies, acceptance, tests, safety boundaries, and environment gates below.
- [x] Run planning validation and initial independent review; fix the confirmed malformed-phase diagnostic finding with list/object regression tests.
- [x] Open one planning PR: #61. Initial clean QA and both CI jobs pass.
- [x] PR #61 final-SHA independent QA PASS, clean QA 18/0/1 and both CI jobs PASS; human merge verified on 2026-09-24.
- [x] M04.01 branch guard passed on clean `m04-01-account-schema`, based on the verified merge; expected origin confirmed.
- [x] Implement and validate M04.01; separate-context QA PASS on candidate `29113462eb7c709acff2efc020c1c9b2f95f3408`, no findings.
- [ ] Final handoff revision re-review/clean QA/CI in PR #62, then human merge. M04.02 remains Not started.

## Surprises & Discoveries

- PR #60's reviewed and merged contents match despite squash history; source-commit ancestry is not required.
- The previous validator deliberately froze the pending-approval/zero-active-plan state. This slice must add a tested transition using the real approval and merge evidence, while retaining regression coverage for that earlier state. Selecting a target string alone must fail.
- Docker/Compose is unavailable locally. This does not prevent documentation planning or later pure schema tests. M04.05 storage and database-backed query/idempotency/reversal validation cannot close without the documented Postgres environment gate. No alternate database may silently stand in for Postgres.
- Existing M03 candidate validation is structural. It does not authorize accounting entries or map payment events to debits/credits.

## Decision Log

- Preserve M04.01-M04.18 IDs, names and acceptance criteria. No consolidation, deferral or omission is approved. One branch/PR and independent QA/human merge per slice remain required.
- Use `packages/ledger` as the owner. Keep `packages/events` canonical/source-neutral; no repair, agent, incident, graph, replay or invariant-engine implementation belongs in M04 planning.
- ADR-0008 remains authoritative: integer minor-unit money, prefixed durable IDs, Postgres as planned system of record and append-only history. New identifiers and exact field contracts will be decided and tested in their owning schema slices, not implemented here.
- Plan deterministic ledger functionality separately from LLM authority. Future controlled synthetic tests may exercise deterministic posting code; no agent tool or production posting authority is introduced or approved.
- Preserve the completion JSON's existing fields; add only `releaseTargetApproval` and `closeoutMergeEvidence` to carry the newly available approval/provenance. Validation checks local record consistency; it cannot authenticate a forged repository edit or replace the real user message, independent review or human merge.

## Context and Orientation

Read `docs/ACTIVE_DOCS.md`, `AGENTS.md`, `PLANS.md`, `WORKFLOW.md`, `docs/status/CURRENT_STATE.md`, the existing goal MD/JSON, `docs/milestones/M04.md`, the registry, M03 closeout, `docs/domain/ledger-vocabulary.md`, `docs/MONEYEVENT_CONTRACT.md`, and ADR-0008. M03 is closed. Ledger now has the M04.01 Account metadata boundary on this branch; no transaction/entry, posting, balance or storage behavior exists. V1 scope is unchanged: M01-M15 plus minimum M17/M18/M20, a simulated lifecycle and public ablation evidence.

## Scope

The merged planning slice created this active plan and verified M03/target tracking. Current M04.01 scope is Account metadata types, pure validation and tests in `packages/ledger`, the account contract, and necessary lifecycle/status tracking. Its generated brief below is authoritative. Other product packages, fixtures/seeds, manifests/lockfile, CI, infrastructure and migrations remain forbidden changes.

M04 implementation will cover account/transaction/entry contracts, deterministic balance validation, immutable storage, read queries, idempotency, linked reversals, the five required account categories and test/QA closeout. No source-specific event-to-posting mapper, financial invariant engine, external connector, live-money workflow, repair execution or agent write tool is implied.

## Plan of Work

Each row requires its own compact brief before implementation, scoped behavioral and negative tests, independent QA, exact-head CI and human merge before the next row starts. Tests begin with the feature; later M04.15-M04.17 add the promised cross-feature coverage rather than postponing correctness checks.

| ID | Existing submilestone | Dependencies | Acceptance and deterministic evidence |
| --- | --- | --- | --- |
| M04.01 | Define Account schema | Planning PR merged; M03/ADR-0008 | Specify account identity, category, currency and lifecycle/ownership boundaries. Tests refuse invalid/unknown fields, conflicting IDs, unsupported currencies/categories and unsafe coercion; no persistence/posting. Resolve exact category and sign-policy questions explicitly. |
| M04.02 | Define LedgerTransaction schema | M04.01 merged | Explicit transaction identity, references, supplied times, idempotency boundary and status semantics. Test missing/contradictory provenance, invalid references and mutation of input. No implicit posting from a structurally valid MoneyEvent. |
| M04.03 | Define LedgerEntry schema | M04.02 merged | Explicit debit/credit side separate from amount and account/currency references. Freeze exact positive/zero/negative policy in this slice. Test float/string ambiguity, zero/negative policy, invalid side, missing account and cross-currency mismatch. |
| M04.04 | Enforce debit equals credit | M04.03 merged | Exact integer totals, balanced per currency, deterministic rejection with no partial result. Test empty/single-sided/unbalanced groups, mixed currencies, large integers, duplicate line identities, order independence where specified and input immutability. No persisted posting. |
| M04.05 | Add immutable transaction storage | M04.04 merged; Postgres gate cleared | Atomic all-or-nothing storage of validated synthetic transactions/entries with referential constraints and immutable history. Reject application-role update/delete, orphan entries and partial commits; test migrations in isolated disposable Postgres, rollback/failure behavior and replayable readback. No destructive operations on user databases. |
| M04.06 | Add account balance query | M04.05 merged | Deterministic per-account/per-currency totals with explicit sign convention and snapshot/cutoff semantics. Test empty accounts, account/currency isolation, large values, ordering and supplied cutoff boundaries against durable entries. No hidden mutable balance truth. |
| M04.07 | Add transaction query | M04.06 merged | Stable identity/reference lookup and deterministic ordering/pagination boundaries. Test absent IDs, account/currency isolation, complete entry sets and consistent snapshots. Queries cannot mutate history. |
| M04.08 | Add idempotency keys | M04.07 merged | Explicit key scope plus canonical semantic payload identity: same key/same payload returns original outcome; same key/different payload rejects. Test concurrent duplicate attempts, rollback/retry, key collisions and persisted uniqueness; no partial/duplicate journal writes. |
| M04.09 | Add reversal transaction type | M04.08 merged | New linked balanced reversal preserves original, swaps sides under the approved amount policy and retains provenance. Define full/partial/repeated reversal policy explicitly. Reject missing originals, currency/account drift and over-reversal; test retry/race behavior and net balances. No agent approval or repair application. |
| M04.10 | Add cash clearing account | M04.09 merged | Required cash-clearing category uses reviewed account/entry rules; synthetic balanced example and invalid currency/account/refusal tests. No claim that clearing proves external settlement. |
| M04.11 | Add provider clearing account | M04.10 merged | Explicit provider-clearing semantics and isolation; deterministic balanced example, duplicate/reference and currency failure cases. No provider integration. |
| M04.12 | Add customer liability account | M04.11 merged | Reviewed liability sign convention and owner isolation; deterministic debit/credit effects, balanced example and invalid cross-owner/currency cases. No live customer balances. |
| M04.13 | Add fee expense account | M04.12 merged | Explicit fee-expense semantics with exact amounts and source references; balanced example, reversal and malformed currency/amount cases. No fee inference by an LLM. |
| M04.14 | Add revenue account | M04.13 merged | Explicit revenue semantics with exact amounts and source references; balanced example, reversal and invalid input tests. No revenue-recognition advice or inferred accounting policy. |
| M04.15 | Add tests for balanced posting | M04.14 merged | Cross-category synthetic transaction corpus plus exact conservation, durable readback and deterministic repeatability/property coverage; no weakened feature tests. |
| M04.16 | Add tests for invalid posting | M04.15 merged | Adversarial corpus proves malformed, unsupported, unbalanced, duplicate/conflicting and unauthorized mutation attempts leave no ledger writes; include transaction rollback/concurrency failures. |
| M04.17 | Add reversal tests | M04.16 merged | Cross-feature reversal, original preservation, net-zero/full reversal, partial-policy, duplicate retry and concurrent rejection tests with exact linked history. |
| M04.18 | QA ledger core | M04.17 merged | Independent full milestone acceptance/safety audit; exact-head CI, clean setup and executable synthetic ledger demonstration. All rows merged before separate formal M04 closeout; M05 stays unstarted until closeout. |

## Concrete Steps

Original planning task brief (completed in PR #61):

- Objective/owner: M04 planning and approved-goal activation; dependencies are verified PR #60, explicit V1 selection, M03 contracts and ADR-0008.
- Allowed/forbidden scope: documentation and necessary control-plane transition guards/tests only, as specified above.
- Acceptance: one active M04 plan, M03 completed plan retained, all 18 implementation rows unstarted, exact registry/milestone mapping, real approval and merge provenance, unchanged V1/safety/product boundary.
- Behavioral/negative tests: valid approved planning; pending target with zero plan remains valid; target-only edits, missing/mismatched approval or merge proof, wrong/missing/extra plan, altered M04 row and premature implementation fail.
- Demonstration: run the existing MoneyEvent fixture and workspace suites as regression evidence. Planning does not supply a ledger demonstration. Each later feature must include an executable synthetic example; M04.18 combines balanced transaction, idempotent retry, linked reversal, immutable original and account-balance readback.
- Reviewer focus: approval cannot be self-generated, merge provenance matches reviewed contents, no requirement is dropped, financial signs/currency/atomicity/concurrency/reversal cases are covered, and unavailable infrastructure stays an explicit gate.
- Stop: wrong branch, unexplained dirty files/divergence, required test failure outside scope, three unsuccessful repairs of one defect, missing human authority, or current PR awaiting human merge. No M04.01 before this planning PR merges.

Planning has merged; the generated M04.01 brief is below. Read the approved contract and exact merged planning state first. Expected next branch: `m04-01-account-schema`. Never invent merge SHAs or require the user to supply them.

## Validation and Acceptance

Completed planning ladder (M04.01 ladder is in its brief below): Levels 0-4 branch/scope/control-plane/bootstrap/whitespace; existing package/fixture regressions at Levels 5-6; forbidden-scope and approval checks at Level 7; separate QA and human merge gate at Level 8. This is not implementation-level ledger, benchmark or security proof.

Required commands: `python scripts/validate-control-plane.py`; `python -m pytest tests/test_control_plane_bootstrap.py`; `git diff --check`; `corepack pnpm install --frozen-lockfile`; workspace `typecheck`, `lint`, `test`, `build`, `format:check`; `corepack pnpm qa:dev --allow-dirty` for intermediate work; final clean-worktree `corepack pnpm qa:dev`; required remote `validate` and `infra-smoke` on the final reviewed SHA. Use the existing scripts and pinned tools.

Docker is optional for this planning slice, unavailable locally at the last verified inventory, and must not be reported tested. Remote infra-smoke remains a distinct CI result. Storage-dependent implementation requires approved Docker/Compose or a documented equivalent Postgres environment, sufficient memory, migrations and behavioral transaction tests; do not substitute SQLite or mocks for Postgres acceptance. Pure schema work can proceed without that infrastructure after its own human gates. `make` is optional; direct Python commands are the documented Windows substitute. No live-model tests or paid budget are needed.

Record measured counts and final SHA in the PR review record; no commit chain just to record each preceding CI pass. Reviewer output is advisory development QA, not financial evidence or human approval.

## Idempotence and Recovery

Reuse this branch/PR for scoped fixes. Preserve user changes; no automatic stash/reset/force-push/branch deletion. Re-running read-only checks must not modify tracked files. Clean-worktree validation must state cache reuse and revision explicitly. Do not operate on existing databases or delete raw evidence. Any future synthetic database test uses an isolated named disposable database and records its boundary before execution.

## Artifacts and Notes

Original planning artifacts: this active plan. Updated planning artifacts: existing goal state/docs, current/next status, weekly log, M03 merge closeout addendum, M04 milestone and registry/roadmap/navigation, control-plane validator and tests. Intentionally untouched: all product packages/apps, evidence/fixtures/seeds, dependencies/lockfile, infra/migrations and workflow files; release acceptance criteria are unchanged.

Handoff must record branch, PR, reviewed SHA, changes, commands/results, skipped checks, warnings and remaining issues. Commit/push/PR readiness requires scoped validation. QA safe-to-merge additionally requires independent PASS and exact-head CI; only the human merges. Builder/QA status and final evidence will be appended here and reflected in current state/next thread.

## Interfaces and Dependencies

- `packages/events`: existing explicit source-neutral contract, provenance, exact money and uncertainty; no inferred accounting direction or eligibility.
- `packages/ledger`: owns current Account metadata validation and future transaction/entry schemas, persistence and queries; application role immutability/atomicity must be tested before claims.
- `packages/invariants`: future M06 cross-domain checks, not implemented here or delegated to an LLM.
- `packages/repair` and future agent runtime: separate proposal-only/read-only authority; no approval, posting or write route exported to agents.
- Postgres/ADR-0008 and M01 vocabulary are dependencies, not new architecture decisions. Account/transaction identity details, sign/currency policy, idempotency scope, reversal policy and snapshot isolation must be frozen in their owning slices before runtime behavior.

## Outcomes & Retrospective

Planning PR #61 is reviewed and merged. M04.01 Account metadata types and pure validation are implemented on this branch, with required Builder and independent QA validation passing, no findings. The final handoff revision must be checked and recorded in PR #62 before merge readiness. Posting, balances, storage and later ledger slices remain unimplemented. The next human gate is M04.01 PR merge after final review and CI; M04.02 stays unstarted.

## Planning builder validation and handoff (2026-09-24)

Builder status: **Builder complete, awaiting QA**. Control-plane validation PASS; bootstrap suite passes with 167 collected cases after the pending-active-plan regression; whitespace PASS. Full `corepack pnpm qa:dev --allow-dirty` PASS with 17 PASS / 0 FAIL / 2 expected skips (dirty-worktree requirement, optional local Docker). Frozen install and all workspace typecheck/lint/test/build/format checks pass; product sources are unchanged. The final clean-worktree and exact-head CI checks remain required after independent review.

New file: this plan. Other changed files are the goal, current/next/weekly status, registry/milestone/roadmap/navigation, merged-M03 historical addenda, approval transition validator and bootstrap tests. No app/package, fixture/seed, dependency/lockfile, infrastructure/migration or workflow file changes. No new product functionality. Local Docker and make remain unavailable; direct Python substitutes for make; no live-model evaluation is applicable. Safe to commit, push and open a draft planning PR; not safe to merge before independent PASS and final CI. Next: M04 Planning QA - Double-entry Ledger Core.

## Planning independent review and corrected handoff (2026-09-24)

PR: [#61](https://github.com/Islem-Rezzag/CausalLedger/pull/61). Separate-context read-only reviewer `m04_planning_qa` reviewed builder `045191cf77e40ba169c3659c970e0b7bb4628f97`: planning/safety PASS, with one confirmed diagnostic correction. A malformed list/object `currentPhase` failed closed by raising an exception; membership now returns an explicit unsupported-phase error. Both inputs have regression coverage. No approval bypass or ledger behavior was involved.

Corrected validation: `python scripts/validate-control-plane.py` PASS; `python -m pytest tests/test_control_plane_bootstrap.py -q` 169 PASS; `git diff --check` PASS. Initial builder clean detached `corepack pnpm qa:dev` passed 18/0/1 (optional local Docker skipped), including frozen install, 150 workspace tests and typecheck/lint/build/format; warm dependency store, initially clean task outputs. Initial exact-head CI `36016230003` passed validate and infra-smoke. Final revision re-review, clean QA and CI must be recorded together with its SHA in PR #61 before readiness; those results are not inferred from the initial candidate.

Changed since builder: validator membership handling, two regression cases, and this handoff plus goal/current/next/milestone/weekly tracking. Full slice file list is the PR diff. Unchanged: product packages/apps, fixtures/seeds, dependencies, infrastructure, migrations, CI and release acceptance. Outstanding limitations: local Docker/make unavailable; no ledger implementation or live-model evaluation. Scoped correction is safe to commit/push; merge readiness depends on the final external review record, and only the human merges. Exact next thread: Merge M04 Planning PR - Double-entry Ledger Core; after verified merge, M04.01 Account schema.

## M04.01 generated builder brief (2026-09-24)

- Thread/target: M04.01 Builder - Define Account schema. Expected branch `m04-01-account-schema`; one same-branch PR and separate read-only QA. Run `git branch --show-current`, `git status --short`, `git remote -v` before edits; stop on wrong branch or unexplained dirty files. Starting guard passed; origin is `https://github.com/Islem-Rezzag/CausalLedger.git`.
- Read first/current state: active docs, this plan, ledger vocabulary, ADR-0008, ledger/events package boundaries, validation/handoff and PR protocols. M03 is closed, V1 approved, planning PR #61 reviewed and human-merged. This is the first ledger implementation slice.
- Objective/owner: explicit Account compile-time contract and pure deterministic candidate validation in `packages/ledger`; a synthetic executable test demonstrates valid account acceptance and conflicting identity rejection.
- Contract choices for this slice: required version, `acct_` ULID account ID, `ldg_` ULID ledger namespace ID, name, category, currency, explicit owner namespace/reference, lifecycle status and normal debit/credit side. Canonical uppercase Crockford ULIDs are supplied, never generated. Supported categories are asset/liability/equity/revenue/expense; debit-normal asset/expense, credit-normal liability/equity/revenue. No contra-account sign override. Clearing and other business roles/account instances remain M04.10-M04.14 work. Currency support is an explicit USD/EUR/GBP subset, not all ISO 4217 codes; never infer from account names or MoneyEvents.
- Ownership/lifecycle: owner references are explicit opaque namespaced references, not authenticated identity or authorization. Account status is active or closed metadata; validation does not authorize creation/closure, prove a zero balance, implement lifecycle transitions or query durable history. Immutable returned snapshots do not imply immutable storage. No timestamps, money amounts, balances or evidence truth are invented.
- Allowed scope: account types/validator, a pure in-memory catalog validation helper to reject repeated IDs (including conflicting ledger/owner/currency definitions), positive/negative/type tests, package documentation and boundary exports, account contract documentation, and necessary control-plane lifecycle/status tracking. Every duplicate ID rejects; this is not posting idempotency or a durable uniqueness guarantee.
- Forbidden scope: LedgerTransaction/Entry schemas; posting/balance/reversal behavior; storage/migrations/DB clients; business account factories; MoneyEvent changes/mapping; other packages/apps; raw data/fixtures/seeds; dependencies, CI and infra; agent tools, repair approval, live money and publication. No system install or paid calls.
- Acceptance/negative tests: exact required/unknown fields, own data properties, invalid roots/nested owner, invalid or overflow ULIDs, case/whitespace/coercion, unsupported category/currency/status, contradictory normal side, alias field conflicts, duplicate IDs, immutable detached outputs and deterministic ordered errors. Typecheck must reject plain ID assignment, mutation and category/sign contradictions. Invalid catalogs return no partial account set.
- Demonstration: synthetic account -> deterministic accepted snapshot; same ID with different ownership -> rejected catalog. Test data exists only under ledger tests; no financial records or persisted account state are created.
- Tracking updates: active plan, registry, M04 milestone, roadmap/current/next/weekly/goal and capability/navigation docs. Extend goal lifecycle validation narrowly for M04.01 with verified planning-merge provenance and negative regressions; preserve planning/pending lifecycle checks.
- Validation: Levels 0-5 and 7-8; Level 6 only existing fixture/eval regressions, no new benchmark claim. `corepack pnpm --filter @causalledger/ledger typecheck`, `test`, `lint`, `build`, `format:check`; `python scripts/validate-control-plane.py`; `python -m pytest tests/test_control_plane_bootstrap.py`; `git diff --check`; full `corepack pnpm qa:dev --allow-dirty`, final clean-worktree `corepack pnpm qa:dev`, and final-SHA remote validate/infra-smoke. Local Docker/make unavailable; direct Python substitutes for make, Docker not required for this pure schema slice.
- Reviewer focus: contract/sign/currency/identity semantics, input rejection without coercion or partial output, ownership/lifecycle truth limits, duplicate conflicts, mutation isolation, no hidden next-slice implementation, and accurate status/provenance gates. Find concrete defects; coordinator fixes and reviewer rechecks.
- Stop/output/handoff: stop at unexplained changes, missing approval, out-of-scope failing checks, three unsuccessful fixes of the same defect, or human PR merge gate. Record files/commands/results/skips/risks and commit/push/PR readiness in this plan and PR; QA alone provides merge-readiness verdict. M04.02 Define LedgerTransaction schema starts only after this slice independently passes and human-merges.

## M04.01 Builder handoff (2026-09-24)

Status: **Builder complete, awaiting QA**. Branch `m04-01-account-schema`; active plan is CLP-0005. Four new files: `packages/ledger/src/account.ts`, `packages/ledger/test/account.test.ts`, `packages/ledger/test/account-types.test.ts`, `docs/specs/account-schema.md`. Changed ledger index/README/bootstrap test, control-plane validator/bootstrap tests, active plan and goal/current/next/weekly/capability/milestone/registry/roadmap/navigation/safety docs. Full paths are in the PR diff. Intentionally untouched: all other product packages/apps, data/fixtures/seeds, manifests/lockfile, infrastructure/migrations/CI and release criteria.

Implemented: pure Account metadata types and candidate/catalog validation, explicit identity/owner/currency/category/normal-side/status policies, frozen detached outputs and deterministic failures; no account creation or storage. Demonstration accepts controlled synthetic metadata and rejects conflicting ownership for a repeated account ID. No transaction/entry/posting/balance/reversal, business account configuration, agent tools or financial authority.

Validation: ledger `typecheck`, `test` (117), `lint`, `build`, `format:check` PASS; `python scripts/validate-control-plane.py` PASS; `python -m pytest tests/test_control_plane_bootstrap.py -q` 191 PASS; `git diff --check` PASS. Full `corepack pnpm qa:dev --allow-dirty` 17 PASS / 0 FAIL / 2 expected skips, including frozen install and all workspace checks (266 tests: 117 ledger, 97 events, 42 evals, 10 other scaffolds). Optional local Docker skipped (unavailable); make unavailable, direct Python equivalent passed. Final clean candidate QA and exact-head CI are still required; no cold-cache or database validation claim.

During Builder validation, a test-only `structuredClone` type error was corrected without dependencies, and historical planning-state fixtures/package allowlists were updated for the new authorized lifecycle. All affected checks now pass. No warnings or unresolved implementation findings. Residual limits: only three currencies and five normal-side categories supported; owner/lifecycle/durable uniqueness are metadata boundaries, not enforced external facts. The merge-provenance record checks consistency, not authenticity of arbitrary repository edits.

Safe to commit: yes. Safe to push: yes. Safe to open one draft PR: yes. Safe to merge: not yet; independent QA and final CI required, and only the human merges. Exact next thread: **M04.01 QA - Define Account schema**. M04.02 remains Not started.

## M04.01 independent QA and merge handoff (2026-09-24)

Status: **QA passed, awaiting merge**. PR [#62](https://github.com/Islem-Rezzag/CausalLedger/pull/62), branch `m04-01-account-schema`. Independent read-only reviewer `m04_01_qa` reviewed base `17a6e85e81cdddc36381defbffc80a7636cee151` through candidate `29113462eb7c709acff2efc020c1c9b2f95f3408` (tree `40e70f2914793c1068eec03a774b38910548ab63`): **PASS, no actionable findings**. Reviewer checked the full 31-file diff and preserved all 18 M04 requirements; no later slice started.

Independent commands: control-plane validation/191 bootstrap tests, ledger typecheck/117 tests/lint/build/format, full-diff whitespace and forbidden-scope checks all PASS. Supplemental in-memory probes: 64 Account/catalog and 54 malformed lifecycle cases passed with no getter execution or validator exception. These probes supplement, and are not added to, the committed test counts. Coordinator clean detached QA on the same SHA: 18 PASS / 0 FAIL / 1 optional local Docker skip, frozen install plus workspace typecheck/lint/266 tests/build/format; warm dependency store, initially clean task outputs. Reviewer independently verified both CI jobs succeeded in run `36020455110` on that SHA.

Changes after the reviewed Builder candidate are QA/PR/current/next/goal/milestone/registry/capability/weekly tracking only; no Account runtime or test correction was needed. Full files-created/changed/untouched list, command details and residual boundaries remain in the Builder handoff above and PR diff. The final handoff commit itself requires reviewer recheck, clean QA and CI, bound to the exact final SHA in PR #62; previous results do not substitute for that final record.

Limitations: local Docker/make unavailable; direct Python substitutes passed. No database, cold-install, live model, posting, money mutation, identity/authentication, lifecycle authorization or durable uniqueness claim. Schema accepts only its documented currencies/categories. No system installation, dependency, raw evidence, MoneyEvent or release-scope changes. Remaining implementation findings: none. Safe to commit/push/update PR: yes. Safe for human merge only after the final-SHA review/QA/CI record passes; agents do not merge. Exact next thread: **Merge M04.01 PR - Define Account schema**. After verified human merge: **M04.02 Builder - Define LedgerTransaction schema**.
