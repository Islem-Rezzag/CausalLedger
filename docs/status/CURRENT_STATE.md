# Current State

## Current phase

M00-M03 are closed and V1_PUBLIC_PRODUCT is approved. M04.01-M04.15 are Completed and merged; Human PR76 merge1c5ad6c matches final reviewedeef72bc/tree83138043/CI37777406231 real561/rootcleanQA18/0/1/independent473 carried-runtime+67 fresh-lifecycle verified. M04.16 Add tests for invalid posting is **QA passed, awaiting merge** on `m04-16-add-tests-for-invalid-posting`, sole [PR #77](https://github.com/Islem-Rezzag/CausalLedger/pull/77), under active `plans/active/CLP-0005-m04-double-entry-ledger-core.md`. Fresh ledger1418/31files and full control1613 PASS; ledger type/lint/build/format PASS; root candidate cleanQA18/0/1 PASS. Candidate real824/overall QA PASS; final-head gates and human merge remain. Exact final proof belongs in the sole PR. M04.17-M04.18 and M05-M21 remain Not started. Current evidence is in `docs/status/CURRENT_STATE.md`.

## Current submilestone and branch

Current slice: M04.16 Add tests for invalid posting, QA passed, awaiting merge.
Current branch: `m04-16-add-tests-for-invalid-posting`.
Active milestone plan: `plans/active/CLP-0005-m04-double-entry-ledger-core.md`.
sole [PR #77](https://github.com/Islem-Rezzag/CausalLedger/pull/77).

## Environment and validation

Fresh ledger1418/31files and full control1613 PASS; ledger type/lint/build/format PASS; root candidate cleanQA18/0/1 PASS.

Candidate 23b8c35f3990e5369421df4a31f548e4a4d72fb1/tree821f0d26dc0c9f2c1582c3aad5c0aa9883073f83, existing overall m04_02_qa independent PASS with no remaining findings; 359 runtime/72 lifecycle probes and fresh full1613 control PASS; root cleanQA18/0/1 PASS. Actual both CI37784859908 jobs SUCCESS; both checkout872d3f5a9c98184ef6b73f8dc26dfe8728600c2d has exact base+head parents/identical tree/full empty diff independently verified. Actual real64storage+22balances+27lookup+39idempotency+40reversal+23cash+31provider+34customer+56fee+56revenue+169balanced+263invalid-posting=824 mandatory no-skip PASS; THREE UP/DOWN/UP, separate populated05-to08 and08-to09 exact-preservation/no-backfill upgrades, exact6tables/10functions and owned/Compose cleanup PASS. Full26/root166/reviewer330protected/all18rawrows/V1/history PASS. Final tracking actual-head independent confirmation/cleanQA/bothCI and human merge remain required; exact final proof in sole PR77.

Local no Docker/Postgres/make; approved owned17 CI/pinned warm tools/no installs/paid call/cold-install or localDB claim. Root runs main tests; user none.

## Next action

Human review/merge sole PR after final exact-head independent confirmation/rootcleanQA/bothCI/ready state; no17 until verified16 merge.

## Product implementation status

Source-neutral MoneyEvent and ledger runtime through14 plus15 balanced corpus are merged. Current16 is tests-only malformed/unsupported/unbalanced/duplicate/conflicting/unauthorized no-write/rollback/concurrency coverage.37 JSON-compatible mutations across3 currencies and both05/08 routines;118 new pure/pre-I/O/hostile-JS unit checks. Direct SQL pins per-routine SQLSTATE and full five-table ordered text history, attempted-ID/key/link absence, app42501/owner55000, late durable-ID rollback, staged22012/25P02 rollback and observed concurrent duplicate/conflict23505 or timeout55P03 rollback. Known rejection/rollback differs from unknown acknowledgement; no automatic retry or uncertainty override. New12m IDs; prior feature tests/helper/specs and THREE DDL unchanged. No runtime/API/flag/posting eligibility/recognition policy/repair approval/agent authority or source-specific mapping/ingestion/invariant engine/incident/graph/replay/repair/agent runtime/benchmark/UI.17/18 unstarted.
