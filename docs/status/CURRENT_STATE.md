# Current State

## Current phase

M00-M03 are closed and V1_PUBLIC_PRODUCT is approved. M04.01-M04.14 are Completed and merged; Human PR75 mergeb7999fb matches final reviewed d4daa779/tree2c521171, independent QA/rootcleanQA18/0/1/CI37766171659 real392 verified. M04.15 Add tests for balanced posting is **Builder complete, awaiting QA** on `m04-15-add-tests-for-balanced-posting`, no current PR yet, under active `plans/active/CLP-0005-m04-double-entry-ledger-core.md`. Fresh ledger1300/30 files and full control1488 PASS; ledger type/lint/build/format PASS; root corrected intermediate fullQA17/0/2 PASS (dirty override and optional Docker skips). Database corpus/overall QA pending. Exact final proof belongs in the sole PR. M04.16-M04.18 and M05-M21 remain Not started. Current evidence is in `docs/status/CURRENT_STATE.md`.

## Current submilestone and branch

Current slice: M04.15 Add tests for balanced posting, Builder complete, awaiting QA.
Current branch: `m04-15-add-tests-for-balanced-posting`.
Active milestone plan: `plans/active/CLP-0005-m04-double-entry-ledger-core.md`.
no current PR yet.

## Environment and validation

Fresh ledger1300/30 files and full control1488 PASS; ledger type/lint/build/format PASS; root corrected intermediate fullQA17/0/2 PASS (dirty override and optional Docker skips).

Current15 mandatory real balanced-posting corpus and existing independent overall QA pending; unit tests alone are not database evidence.

Local no Docker/Postgres/make; approved owned17 CI, pinned tools/warm caches/no installs/paid calls/cold-install or localDB claim. Root runs main tests; user runs none.

## Next action

Required balanced-posting database acceptance and existing overall QA; final actual-head cleanQA/CI before sole PR human merge. No16 before verified15 merge.

## Product implementation status

Source-neutral MoneyEvent and ledger runtime through14 are merged. Current15 is test-only coverage of all5 categories/3 currencies/separate pending/posted inputs, literal per-currency conservation, multiline/large-bigint aggregates, declaration permutations/fresh-ID balanced duplication, existing role10–14 single-currency contexts, separate04 multicurrency, immutable exact durable readback/both inclusive cutoffs/repeated reads and existing08 semantic retry. Raw stored rows are ordered exact SQL text; financial readback expectations come from supplied declarations/literal oracles, not validator output. No runtime/exports/flags/DDL/public API changes or status promotion. ALL prior feature tests/helper/specs preserved.16 invalid/rollback/concurrency and17 reversal corpora unstarted. No inferred recognition policy/authenticity/posting eligibility or agent financial authority.
