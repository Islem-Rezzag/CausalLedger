# Current State

## Current phase

M00-M03 are closed and V1_PUBLIC_PRODUCT is approved. M04.01-M04.17 are Completed and merged. Human PR #78 merge626dbc04 matches reviewed6b4fa5ad/tree d36e7eed, final CI37804064435 (1785 ledger/1742 controls/1224 real PostgreSQL assertions), cleanQA18/0/1 and independent QA PASS; full diff empty and main reachability verified. M04.18 QA ledger core is **QA passed, awaiting merge** on `m04-18-qa-ledger-core`, sole [PR #79](https://github.com/Islem-Rezzag/CausalLedger/pull/79), under active `plans/active/CLP-0005-m04-double-entry-ledger-core.md`. Fresh ledger1785/32files and fullcontrol1882 PASS; candidate cleanQA18/0/1, independent whole-M04 QA and actual PostgreSQL1227 including executable demo PASS. Final exact-head gates and human merge remain; final proof belongs in sole PR. Final actual-head gates and human merge remain. Formal M04 closeout remains separate after all18 rows merge; M05-M21 remain Not started. Current evidence is in `docs/status/CURRENT_STATE.md`.

## Current submilestone and branch

Current slice: M04.18 QA ledger core, QA passed, awaiting merge.
Current branch: `m04-18-qa-ledger-core`.
Active milestone plan: `plans/active/CLP-0005-m04-double-entry-ledger-core.md`.
sole [PR #79](https://github.com/Islem-Rezzag/CausalLedger/pull/79).

## Environment and validation

Fresh ledger1785/32files and fullcontrol1882 PASS; candidate cleanQA18/0/1, independent whole-M04 QA and actual PostgreSQL1227 including executable demo PASS. Final exact-head gates and human merge remain; final proof belongs in sole PR. Human PR #78 merge626dbc04 matches reviewed6b4fa5ad/tree d36e7eed, final CI37804064435 (1785 ledger/1742 controls/1224 real PostgreSQL assertions), cleanQA18/0/1 and independent QA PASS; full diff empty and main reachability verified. Local Docker/Postgres/make unavailable. Local pinned tools and frozen install reuse warm dependencies; clean setup is the existing fresh CI checkout/frozen install/owned disposable PG17 route. No new system installation or credentials. Root runs tests; user none.

## Next action

Finish actual-head independent QA/rootcleanQA/bothCI and human-only18 merge. After verified18 merge, separate formal M04 closeout; M05 unstarted until closeout.

## Product implementation status

Source-neutral MoneyEvent and merged deterministic ledger runtime through14 and15–17 corpora; current18 acceptance report/test-only demonstration. No runtime/API/DDL/financial authority change. Synthetic arithmetic/software QA does not establish external economic truth, repair approval or posting eligibility. See `docs/specs/ledger-core-acceptance.md`.
