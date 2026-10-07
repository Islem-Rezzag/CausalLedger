# Current State

## Current phase

M00-M03 are closed and V1_PUBLIC_PRODUCT is approved. M04.01-M04.11 are Completed and merged; human PR72 merge372a057 matches reviewed465ba9c/treeef3cf9b and final independent QA/cleanQA18/0/1/CI37522188067 real246 verified. M04.12 Add customer liability account is **Builder complete, awaiting QA** on `m04-12-add-customer-liability-account`, no current PR yet, under active `plans/active/CLP-0005-m04-double-entry-ledger-core.md`. Fresh ledger964/25files and control1137 PASS; ledger type/lint/build/format PASS; root intermediate fullQA17/0/2 PASS (dirty override and optional Docker skips). Actual PostgreSQL customer composition acceptance and existing overall independent QA pending; pure tests are not database evidence. Final actual-head independent confirmation/cleanQA/CI and human merge remain required; exact final proof stays in the sole PR. M04.13-M04.18 and M05-M21 remain Not started. Current evidence is in `docs/status/CURRENT_STATE.md`.

## Current submilestone and branch

Current slice: M04.12 Add customer liability account, Builder complete, awaiting QA.
Current branch: `m04-12-add-customer-liability-account`.
Active milestone plan: `plans/active/CLP-0005-m04-double-entry-ledger-core.md`.
no current PR yet.

## Environment and validation

Fresh ledger964/25files and control1137 PASS; ledger type/lint/build/format PASS; root intermediate fullQA17/0/2 PASS (dirty override and optional Docker skips). Actual PostgreSQL customer composition acceptance and existing overall independent QA pending; pure tests are not database evidence. Local no Docker/Postgres/make; approved owned17 CI, warm caches, no installs/paid calls. Root runs all tests.

## Next action

Required customer database composition acceptance and existing overall QA; final actual-head cleanQA/CI before sole PR human merge. No13 before verified12 merge.

## Product implementation status

Source-neutral MoneyEvent and merged ledger schema/journal/storage/read-only queries/idempotency/reversals/cash/provider clearing exist. Current12 pure customer liability has local validation PASS; database composition/overall QA pending. Declared owner must match the liability Account and every participating liability. Assetcounter owners may differ; unused foreign catalogs are allowed. Existing account-normal-positive reader computes credit-minus-debit for liabilities. Owner matching checks unauthenticated caller declarations for one call; no global/durable Account-to-customer mapping. The reader selects ledger/account/currency, not owner authentication. The wrapper/context are not persisted or universally enforced by SQL. No general posting eligibility or agent authority. Clearing arithmetic does not prove external settlement.
