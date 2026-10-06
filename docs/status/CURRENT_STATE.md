# Current State

## Current phase

M00-M03 are closed and V1_PUBLIC_PRODUCT is approved. M04.01-M04.07 are Completed and merged; human PR68 merge584a452 matches reviewed e3190fb/tree5c0338e and exact final QA/clean QA18/0/1/CI37468260697 real113 verified. M04.08 Add idempotency keys is **QA passed, awaiting merge** on `m04-08-add-idempotency-keys`, sole [PR #69](https://github.com/Islem-Rezzag/CausalLedger/pull/69), under active `plans/active/CLP-0005-m04-double-entry-ledger-core.md`. Fresh ledger728/17files, control716, ledger type/lint/build/format PASS; root pre-repair intermediate full QA17/0/2 PASS (dirty override and optional Docker skips). Actual CI37473167737 both jobs and real Postgres17 storage64/balance22/transaction-query27/idempotency39 (152), both-migration recovery, populated legacy preservation, exact schema/functions and owned/Compose cleanup PASS. Existing overall m04_02_qa PASS, both P2 repairs verified, no remaining finding. Final actual-head confirmation/clean QA/CI and human merge remain required; exact final proof stays in this sole PR. M04.09-M04.18 and M05-M21 remain Not started. Current evidence is in `docs/status/CURRENT_STATE.md`.

## Current submilestone and branch

Current slice: M04.08 Add idempotency keys, QA passed, awaiting merge.
Current branch: `m04-08-add-idempotency-keys`.
Active milestone plan: `plans/active/CLP-0005-m04-double-entry-ledger-core.md`.
sole [PR #69](https://github.com/Islem-Rezzag/CausalLedger/pull/69).

## Environment and validation

Fresh ledger728/17files, control716, ledger type/lint/build/format PASS; root pre-repair intermediate full QA17/0/2 PASS (dirty override and optional Docker skips). Actual CI37473167737 both jobs and real Postgres17 storage64/balance22/transaction-query27/idempotency39 (152), both-migration recovery, populated legacy preservation, exact schema/functions and owned/Compose cleanup PASS. Existing overall m04_02_qa PASS, both P2 repairs verified, no remaining finding. Local no Docker/Postgres/make; approved owned17 CI, warm caches, no installs/paid calls. Root runs all tests.

## Next action

Human review/merge sole PR after final actual-head confirmation/clean QA/CI and ready state; agents never merge. After verified merge only09.

## Product implementation status

Source-neutral MoneyEvent and merged ledger schema/journal/storage/read-only queries exist. Current08 exact scope/canonical intent/atomic retry has local validation PASS; database/overall QA PASS. No posting eligibility, reversal, global Account registry or agent authority. Legacy API remains outside scoped key guarantees; synthetic stored arithmetic is not authenticated evidence.
