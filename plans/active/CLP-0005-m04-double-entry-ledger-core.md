# CLP-0005 M04 Double-entry Ledger Core

## Purpose / Big Picture

Plan M04's deterministic ledger primitives using the approved MoneyEvent boundary, M01 ledger vocabulary, and ADR-0008. The human explicitly approved `V1_PUBLIC_PRODUCT` on 2026-09-24: “Merged #60. I approve V1_PUBLIC_PRODUCT. Continue.” v0.6 is an intermediate checkpoint, not a replacement target. This approval authorizes the existing roadmap and routine delivery; it does not authorize live financial writes, repair approval, paid calls, system installation, material architecture changes, release tags, deployment, or publication.

Current slice: M04 planning only, on `m04-planning-double-entry-ledger-core`. All 18 M04 submilestones remain `Not started`; M05-M21 remain `Not started`. Planning must independently pass QA and merge before M04.01 begins. No ledger runtime, schema implementation, migration, fixture or dependency is added in this slice.

## Progress

- [x] 2026-09-24: Verified PR #60 human merge at `3df6f88b1b64b5456554654b7e27adcfa99c3ff6` and reviewed head `f160a7d2bc0d6163ee73b36c1546419134f11ca3` have identical tree `0c14f73280c8b15ab93e0f697edc33738946c7ef`; source-to-merge diff is empty and merge is on origin/main.
- [x] 2026-09-24: Prior independent QA PASS and exact-head CI run `36011283395` (`validate`, `infra-smoke`) verified. PR #60's stale body and absent posted model-review comment reflect the previously blocked external update; the actual review record is preserved in the existing closeout addendum and this task's reviewed evidence.
- [x] 2026-09-24: Recorded the user's explicit V1 selection and its provenance in the existing goal state; no generated instruction is treated as approval.
- [x] 2026-09-24: Fast-forwarded clean main to the verified merge, created the planning branch, and passed branch/status/origin guard before editing. Existing user branches and temporary files were preserved.
- [x] 2026-09-24: Defined the 18-row sequence, dependencies, acceptance, tests, safety boundaries, and environment gates below.
- [x] Run planning validation and initial independent review; fix the confirmed malformed-phase diagnostic finding with list/object regression tests.
- [x] Open one planning PR: #61. Initial clean QA and both CI jobs pass.
- [ ] Confirm the final revision review/clean QA/CI in the SHA-bound PR #61 record, then human review and merge. No new tracking commit is needed solely to copy that external result.

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

Read `docs/ACTIVE_DOCS.md`, `AGENTS.md`, `PLANS.md`, `WORKFLOW.md`, `docs/status/CURRENT_STATE.md`, the existing goal MD/JSON, `docs/milestones/M04.md`, the registry, M03 closeout, `docs/domain/ledger-vocabulary.md`, `docs/MONEYEVENT_CONTRACT.md`, and ADR-0008. M03 is closed. Ledger remains a scaffold with no financial schemas or posting behavior. V1 scope is unchanged: M01-M15 plus minimum M17/M18/M20, a simulated lifecycle and public ablation evidence.

## Scope

This planning slice creates this active plan, finalizes verified M03/target tracking, and updates control-plane validation/tests for authorized planning. Product files, runtime contracts, fixtures/seeds, package manifests/lockfile, CI, infrastructure and migrations are forbidden changes.

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

Current task brief:

- Objective/owner: M04 planning and approved-goal activation; dependencies are verified PR #60, explicit V1 selection, M03 contracts and ADR-0008.
- Allowed/forbidden scope: documentation and necessary control-plane transition guards/tests only, as specified above.
- Acceptance: one active M04 plan, M03 completed plan retained, all 18 implementation rows unstarted, exact registry/milestone mapping, real approval and merge provenance, unchanged V1/safety/product boundary.
- Behavioral/negative tests: valid approved planning; pending target with zero plan remains valid; target-only edits, missing/mismatched approval or merge proof, wrong/missing/extra plan, altered M04 row and premature implementation fail.
- Demonstration: run the existing MoneyEvent fixture and workspace suites as regression evidence. Planning does not supply a ledger demonstration. Each later feature must include an executable synthetic example; M04.18 combines balanced transaction, idempotent retry, linked reversal, immutable original and account-balance readback.
- Reviewer focus: approval cannot be self-generated, merge provenance matches reviewed contents, no requirement is dropped, financial signs/currency/atomicity/concurrency/reversal cases are covered, and unavailable infrastructure stays an explicit gate.
- Stop: wrong branch, unexplained dirty files/divergence, required test failure outside scope, three unsuccessful repairs of one defect, missing human authority, or current PR awaiting human merge. No M04.01 before this planning PR merges.

After planning merge, generate and execute the M04.01 brief in this plan. Read the approved contract and exact merged planning state first. Expected next branch: `m04-01-account-schema`. Never invent merge SHAs or require the user to supply them.

## Validation and Acceptance

Planning ladder: Levels 0-4 branch/scope/control-plane/bootstrap/whitespace; existing package/fixture regressions at Levels 5-6; forbidden-scope and approval checks at Level 7; separate QA and human merge gate at Level 8. This is not implementation-level ledger, benchmark or security proof.

Required commands: `python scripts/validate-control-plane.py`; `python -m pytest tests/test_control_plane_bootstrap.py`; `git diff --check`; `corepack pnpm install --frozen-lockfile`; workspace `typecheck`, `lint`, `test`, `build`, `format:check`; `corepack pnpm qa:dev --allow-dirty` for intermediate work; final clean-worktree `corepack pnpm qa:dev`; required remote `validate` and `infra-smoke` on the final reviewed SHA. Use the existing scripts and pinned tools.

Docker is optional for this planning slice, unavailable locally at the last verified inventory, and must not be reported tested. Remote infra-smoke remains a distinct CI result. Storage-dependent implementation requires approved Docker/Compose or a documented equivalent Postgres environment, sufficient memory, migrations and behavioral transaction tests; do not substitute SQLite or mocks for Postgres acceptance. Pure schema work can proceed without that infrastructure after its own human gates. `make` is optional; direct Python commands are the documented Windows substitute. No live-model tests or paid budget are needed.

Record measured counts and final SHA in the PR review record; no commit chain just to record each preceding CI pass. Reviewer output is advisory development QA, not financial evidence or human approval.

## Idempotence and Recovery

Reuse this branch/PR for scoped fixes. Preserve user changes; no automatic stash/reset/force-push/branch deletion. Re-running read-only checks must not modify tracked files. Clean-worktree validation must state cache reuse and revision explicitly. Do not operate on existing databases or delete raw evidence. Any future synthetic database test uses an isolated named disposable database and records its boundary before execution.

## Artifacts and Notes

New artifact: this active plan. Updated artifacts: existing goal state/docs, current/next status, weekly log, M03 merge closeout addendum, M04 milestone and registry/roadmap/navigation, control-plane validator and tests. Intentionally untouched: all product packages/apps, evidence/fixtures/seeds, dependencies/lockfile, infra/migrations and workflow files; release acceptance criteria are unchanged.

Handoff must record branch, PR, reviewed SHA, changes, commands/results, skipped checks, warnings and remaining issues. Commit/push/PR readiness requires scoped validation. QA safe-to-merge additionally requires independent PASS and exact-head CI; only the human merges. Builder/QA status and final evidence will be appended here and reflected in current state/next thread.

## Interfaces and Dependencies

- `packages/events`: existing explicit source-neutral contract, provenance, exact money and uncertainty; no inferred accounting direction or eligibility.
- `packages/ledger`: future owner of deterministic schemas, validation, persistence and queries; application role immutability/atomicity must be tested before claims.
- `packages/invariants`: future M06 cross-domain checks, not implemented here or delegated to an LLM.
- `packages/repair` and future agent runtime: separate proposal-only/read-only authority; no approval, posting or write route exported to agents.
- Postgres/ADR-0008 and M01 vocabulary are dependencies, not new architecture decisions. Account/transaction identity details, sign/currency policy, idempotency scope, reversal policy and snapshot isolation must be frozen in their owning slices before runtime behavior.

## Outcomes & Retrospective

Planning and initial independent review are complete. M03 closeout and explicit V1 approval have been verified. Ledger functionality remains unimplemented. The next gate is human merge of PR #61 after the final-SHA review/QA/CI record confirms readiness, followed by M04.01; no user-supplied builder or QA prompt is required.

## Builder validation and handoff (2026-09-24)

Builder status: **Builder complete, awaiting QA**. Control-plane validation PASS; bootstrap suite passes with 167 collected cases after the pending-active-plan regression; whitespace PASS. Full `corepack pnpm qa:dev --allow-dirty` PASS with 17 PASS / 0 FAIL / 2 expected skips (dirty-worktree requirement, optional local Docker). Frozen install and all workspace typecheck/lint/test/build/format checks pass; product sources are unchanged. The final clean-worktree and exact-head CI checks remain required after independent review.

New file: this plan. Other changed files are the goal, current/next/weekly status, registry/milestone/roadmap/navigation, merged-M03 historical addenda, approval transition validator and bootstrap tests. No app/package, fixture/seed, dependency/lockfile, infrastructure/migration or workflow file changes. No new product functionality. Local Docker and make remain unavailable; direct Python substitutes for make; no live-model evaluation is applicable. Safe to commit, push and open a draft planning PR; not safe to merge before independent PASS and final CI. Next: M04 Planning QA - Double-entry Ledger Core.

## Independent review and corrected handoff (2026-09-24)

PR: [#61](https://github.com/Islem-Rezzag/CausalLedger/pull/61). Separate-context read-only reviewer `m04_planning_qa` reviewed builder `045191cf77e40ba169c3659c970e0b7bb4628f97`: planning/safety PASS, with one confirmed diagnostic correction. A malformed list/object `currentPhase` failed closed by raising an exception; membership now returns an explicit unsupported-phase error. Both inputs have regression coverage. No approval bypass or ledger behavior was involved.

Corrected validation: `python scripts/validate-control-plane.py` PASS; `python -m pytest tests/test_control_plane_bootstrap.py -q` 169 PASS; `git diff --check` PASS. Initial builder clean detached `corepack pnpm qa:dev` passed 18/0/1 (optional local Docker skipped), including frozen install, 150 workspace tests and typecheck/lint/build/format; warm dependency store, initially clean task outputs. Initial exact-head CI `36016230003` passed validate and infra-smoke. Final revision re-review, clean QA and CI must be recorded together with its SHA in PR #61 before readiness; those results are not inferred from the initial candidate.

Changed since builder: validator membership handling, two regression cases, and this handoff plus goal/current/next/milestone/weekly tracking. Full slice file list is the PR diff. Unchanged: product packages/apps, fixtures/seeds, dependencies, infrastructure, migrations, CI and release acceptance. Outstanding limitations: local Docker/make unavailable; no ledger implementation or live-model evaluation. Scoped correction is safe to commit/push; merge readiness depends on the final external review record, and only the human merges. Exact next thread: Merge M04 Planning PR - Double-entry Ledger Core; after verified merge, M04.01 Account schema.
