# Current State

## Current phase

M00-M03 are closed and V1_PUBLIC_PRODUCT is approved. M04.01-M04.16 are Completed and merged; Human PR77 mergeec29ba3c matches final reviewedb9c9abcb/tree6e65fdf9/CI37785947729 real824/rootcleanQA18/0/1/independent359 carried-runtime+72 fresh-lifecycle/full1613 controls verified. M04.17 Add reversal tests is **Builder complete, awaiting QA** on `m04-17-add-reversal-tests`, no current PR yet, under active `plans/active/CLP-0005-m04-double-entry-ledger-core.md`. Fresh ledger1785/32files and full control1742 PASS; ledger type/lint/build/format PASS; root intermediateQA17/0/2 PASS (dirty override/optionalDocker skips). Database corpus/overall QA pending. Exact final proof belongs in the sole PR. M04.18 and M05-M21 remain Not started; formalM04closeout remains required beforeM05. Current evidence is in `docs/status/CURRENT_STATE.md`.

## Current submilestone and branch

Current slice: M04.17 Add reversal tests, Builder complete, awaiting QA.
Current branch: `m04-17-add-reversal-tests`.
Active milestone plan: `plans/active/CLP-0005-m04-double-entry-ledger-core.md`.
no current PR yet.

## Environment and validation

Fresh ledger1785/32files and full control1742 PASS; ledger type/lint/build/format PASS; root intermediateQA17/0/2 PASS (dirty override/optionalDocker skips).

Current17 mandatory real reversal corpus and independent overall QA pending; unit tests alone do not prove durable linked history, atomicity or concurrency.

Local no Docker/Postgres/make; approved owned17 CI/pinned warm tools/no installs/paid call/cold-install/localDB claim. Root runs main tests; user none.

## Next action

Required owned17 reversal corpus/existing overall QA, final-head cleanQA/CI before sole PR human merge. No18 before verified17 merge; noM05 before separate formalM04closeout.

## Product implementation status

Source-neutral MoneyEvent and ledger runtime through14 plus15/16 corpora are merged. Current17 tests existing full linked inverse across25 category pairs/3currencies/4amount shapes,15 role cases and one five-category/multicurrency repeated-maximum-line journal.367 new pure/pre-I/O checks; literal full-only policy/error paths and separateSQLSTATE, exact original/global five-table ordered-text preservation, nonzero original balances then net-zero, inclusive clocks, semantic/fresh connection retries and observed competing rejection/recovery. Pure comparison cannot establish stored existence or history; durable second key/other stored original/reversal-of-reversal/ordinary08 adoption covered separately. Returned09 receipt/persisted08 key remain distinct. Late stored-ID rollback and observer-invisible staged09 followed by22012/25P02/explicit rollback. Unknown acknowledgement remains unknown; no auto-retry or inferred financial truth. New13m IDs; ALL prior source/tests/helpers/specs and THREE migrations unchanged. No new runtime/API/flag/financial authority, source-specific mapping/ingestion/invariant engine/incident/graph/replay/repair/agent runtime/benchmark/UI.18 unstarted.


## M04.17 candidate database timeout correction (2026-10-08)

Initial draft PR78 candidate80bb63f822c1b944bec61ebee01e76bef02fc14e passed root cleanQA18/0/1 and CI37799726858 validate. Its mandatory database job passed all prior12 suites824 tests, migrations/upgrades/schema and owned cleanup, but the new400-case child reached the fixed180-second deadline without a completed result. This candidate is unaccepted; independent runtime remains on hold.

The existing reviewer identified six repeated complete accumulated five-table reads per successful case. The new17-only test now returns exact ordered SQL row-text triples (transactionID, reversal originalID or empty, full row text), validates each driver tuple, and reuses one post-offset snapshot for both authorized-ID exclusions and accepted history. Fresh pre-original, post-original, post-offset and post-retry snapshots retain all equality assertions and full prior-history coverage; money stays undecoded SQL text. Only the new13th child gets verbose progress reporting. The fixed180-second deadline, all400 cases, prior12 children, production source, schema, permissions and financial boundary are unchanged. Typecheck and runner syntax PASS; corrected clean validation, actual13-suite CI and independent overall QA remain required.


## M04.17 measured suite-budget correction (2026-10-08)

Repair1 candidatea802c6e8b36d9fbe0df98fe52a33dbd396c18f87 passed root cleanQA18/0/1 and CI37800984379 validate. The mandatory job again passed prior824; verbose new-suite output records279 completed cases,279PASS/0FAIL, with continued progress from446ms to912ms per case as accumulated history grows, before the generic180-second timeout. This is partial evidence, not400 acceptance. Candidate remains unaccepted; independent runtime HOLD remains.

The second scoped timeout repair grants only the new13th full-history suite a finite600-second aggregate budget. It uses the same executable/cwd/owned environment/UTF8 output/sanitization/nonzero failure handling. All prior12 child bytes and180-second budgets, all400 cases/assertions, exact global row-text history comparisons, per-case15-second concurrency deadlines,10-second statement deadlines and4-second observed-lock deadlines are unchanged. No financial source/API/DDL/permission/safety change. Root runner syntax/validator/whitespace/scope plus corrected cleanQA, actual13-suite CI and independent overall review are required before acceptance.
