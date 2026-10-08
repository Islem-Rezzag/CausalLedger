# Current State

## Current phase

M00-M03 are closed and V1_PUBLIC_PRODUCT is approved. M04.01-M04.11 are Completed and merged; human PR72 merge372a057 matches reviewed465ba9c/treeef3cf9b and final independent QA/cleanQA18/0/1/CI37522188067 real246 verified. M04.12 Add customer liability account is **QA passed, awaiting merge** on `m04-12-add-customer-liability-account`, sole [PR #73](https://github.com/Islem-Rezzag/CausalLedger/pull/73), under active `plans/active/CLP-0005-m04-double-entry-ledger-core.md`. Fresh ledger964/25files and control1137 PASS; ledger type/lint/build/format PASS; root candidate cleanQA18/0/1 PASS (optional localDocker skip). Candidate a311152e0c98d06329b0e0a45fe9de68a55d3750/tree4621b92de5bdd072b2d846eea55ac94c2a5897db, existing overall m04_02_qa independent PASS with no remaining findings; 81runtime/60lifecycle probes and full1137control PASS; root cleanQA18/0/1 PASS. Actual both CI37594878875 jobs SUCCESS; actual both checkoutb69b4478cda65437be59e10bba41a4cfaa43992d has base+head parents/identical tree/full empty diff independently verified. Actual real64storage+22balances+27lookup+39idempotency+40reversal+23cash+31provider+34customer=280 mandatory no-skip PASS; THREE UP/DOWN/UP, separate populated05-to08 and08-to09 exact-preservation/no-backfill upgrades, exact6tables/10functions, owned database/roles and Compose cleanup PASS. Full29/root149/reviewer204protected/all18rawrows/V1/history PASS. Final tracking actual-head confirmation/cleanQA/CI and human merge remain required; exact final proof in sole PR73. Final actual-head independent confirmation/cleanQA/CI and human merge remain required; exact final proof stays in the sole PR. M04.13-M04.18 and M05-M21 remain Not started. Current evidence is in `docs/status/CURRENT_STATE.md`.

## Current submilestone and branch

Current slice: M04.12 Add customer liability account, QA passed, awaiting merge.
Current branch: `m04-12-add-customer-liability-account`.
Active milestone plan: `plans/active/CLP-0005-m04-double-entry-ledger-core.md`.
sole [PR #73](https://github.com/Islem-Rezzag/CausalLedger/pull/73).

## Environment and validation

Fresh ledger964/25files and control1137 PASS; ledger type/lint/build/format PASS; root candidate cleanQA18/0/1 PASS (optional localDocker skip). Candidate a311152e0c98d06329b0e0a45fe9de68a55d3750/tree4621b92de5bdd072b2d846eea55ac94c2a5897db, existing overall m04_02_qa independent PASS with no remaining findings; 81runtime/60lifecycle probes and full1137control PASS; root cleanQA18/0/1 PASS. Actual both CI37594878875 jobs SUCCESS; actual both checkoutb69b4478cda65437be59e10bba41a4cfaa43992d has base+head parents/identical tree/full empty diff independently verified. Actual real64storage+22balances+27lookup+39idempotency+40reversal+23cash+31provider+34customer=280 mandatory no-skip PASS; THREE UP/DOWN/UP, separate populated05-to08 and08-to09 exact-preservation/no-backfill upgrades, exact6tables/10functions, owned database/roles and Compose cleanup PASS. Full29/root149/reviewer204protected/all18rawrows/V1/history PASS. Final tracking actual-head confirmation/cleanQA/CI and human merge remain required; exact final proof in sole PR73. Local no Docker/Postgres/make; approved owned17 CI, warm caches, no installs/paid calls. Root runs all tests.

## Next action

Human review/merge sole PR after final actual-head confirmation/cleanQA/CI and ready state; agents never merge. After verified merge only13.

## Product implementation status

Source-neutral MoneyEvent and merged ledger schema/journal/storage/read-only queries/idempotency/reversals/cash/provider clearing exist. Current12 pure customer liability has local validation PASS; database composition/overall QA PASS. Declared owner must match the liability Account and every participating liability. Assetcounter owners may differ; unused foreign catalogs are allowed. Existing account-normal-positive reader computes credit-minus-debit for liabilities. Owner matching checks unauthenticated caller declarations for one call; no global/durable Account-to-customer mapping. The reader selects ledger/account/currency, not owner authentication. The wrapper/context are not persisted or universally enforced by SQL. No general posting eligibility or agent authority. Clearing arithmetic does not prove external settlement.
