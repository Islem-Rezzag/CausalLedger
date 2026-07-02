# Evals Package

`@causalledger/evals` is the future evaluation harness package boundary.

M03.03 documents MoneyEvent mapping fixture categories and simulator planning in `docs/MONEYEVENT_MAPPING_FIXTURES.md`. That planning may inform later deterministic fixtures and MoneyFlowBench seed cases, but this package still contains no benchmark implementation or fixture data.

M02.05 creates only package scaffolding:

- package manifest;
- TypeScript source and test configs extending the root config;
- scaffold metadata export;
- bootstrap test;
- local build, typecheck, test, lint, and format-check scripts.

No CausalLedger product or domain behavior is implemented here. There are no financial schemas, ledger entries, balances, invariants, incident workflows, graph traversal, replay algorithms, repair logic, evidence storage, fixture data, simulator data, benchmark implementation, external connectors, agents, database behavior, or money mutation.
