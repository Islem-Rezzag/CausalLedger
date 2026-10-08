# Current State

## Current phase

M00-M03 are closed and V1_PUBLIC_PRODUCT is approved. M04.01-M04.14 are Completed and merged; Human PR75 mergeb7999fb matches final reviewed d4daa779/tree2c521171, independent QA/rootcleanQA18/0/1/CI37766171659 real392 verified. M04.15 Add tests for balanced posting is **QA passed, awaiting merge** on `m04-15-add-tests-for-balanced-posting`, sole [PR #76](https://github.com/Islem-Rezzag/CausalLedger/pull/76), under active `plans/active/CLP-0005-m04-double-entry-ledger-core.md`. Fresh ledger1300/30 files and full control1488 PASS; ledger type/lint/build/format PASS; root candidate cleanQA18/0/1 PASS (optional localDocker skip). Candidate database corpus/overall QA PASS; final actual-head gates and human merge remain. Exact final proof belongs in the sole PR. M04.16-M04.18 and M05-M21 remain Not started. Current evidence is in `docs/status/CURRENT_STATE.md`.

## Current submilestone and branch

Current slice: M04.15 Add tests for balanced posting, QA passed, awaiting merge.
Current branch: `m04-15-add-tests-for-balanced-posting`.
Active milestone plan: `plans/active/CLP-0005-m04-double-entry-ledger-core.md`.
sole [PR #76](https://github.com/Islem-Rezzag/CausalLedger/pull/76).

## Environment and validation

Fresh ledger1300/30 files and full control1488 PASS; ledger type/lint/build/format PASS; root candidate cleanQA18/0/1 PASS (optional localDocker skip).

Candidate d763224d1f3bc5a70254c71219e039aaf3c3ae02/treeacad250e2d99dfb3d2d83db9b681282877918fcf, existing overall m04_02_qa independent PASS with no remaining findings; 473 runtime/67 lifecycle probes and fresh full1488 control PASS; root cleanQA18/0/1 PASS. Actual both CI37776616731 jobs SUCCESS; both checkout3eee043cee0730da023e052bd302fa54ebd64709 has exact base+head parents/identical tree/full empty diff independently verified. Actual real64storage+22balances+27lookup+39idempotency+40reversal+23cash+31provider+34customer+56fee+56revenue+169balanced-posting=561 mandatory no-skip PASS; THREE UP/DOWN/UP, separate populated05-to08 and08-to09 exact-preservation/no-backfill upgrades, exact6tables/10functions and owned/Compose cleanup PASS. Full26/root163/reviewer326protected/all18rawrows/V1/history PASS. Final tracking actual-head independent confirmation/cleanQA/bothCI and human merge remain required; exact final proof in sole PR76.

Local no Docker/Postgres/make; approved owned17 CI, pinned tools/warm caches/no installs/paid calls/cold-install or localDB claim. Root runs main tests; user runs none.

## Next action

Human review/merge sole PR after final actual-head independent confirmation/cleanQA/bothCI and ready state; agents never merge. After verified merge only16.

## Product implementation status

Source-neutral MoneyEvent and ledger runtime through14 are merged. Current15 is test-only coverage of all5 categories/3 currencies/separate pending/posted inputs, literal per-currency conservation, multiline/large-bigint aggregates, declaration permutations/fresh-ID balanced duplication, existing role10–14 single-currency contexts, separate04 multicurrency, immutable exact durable readback/both inclusive cutoffs/repeated reads and existing08 semantic retry. Raw stored rows are ordered exact SQL text; financial readback expectations come from supplied declarations/literal oracles, not validator output. No runtime/exports/flags/DDL/public API changes or status promotion. ALL prior feature tests/helper/specs preserved.16 invalid/rollback/concurrency and17 reversal corpora unstarted. No inferred recognition policy/authenticity/posting eligibility or agent financial authority.
