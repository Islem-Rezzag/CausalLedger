# Evidence Package

`@causalledger/evidence` is the future evidence package boundary.

M03.03 documents evidence-to-MoneyEvent mapping fixture planning in `docs/MONEYEVENT_MAPPING_FIXTURES.md`. That document depends on future evidence references and provenance concepts, but this package still contains no evidence runtime.

M02.05 creates only package scaffolding:

- package manifest;
- TypeScript source and test configs extending the root config;
- scaffold metadata export;
- bootstrap test;
- local build, typecheck, test, lint, and format-check scripts.

No CausalLedger product or domain behavior is implemented here. There are no financial schemas, ledger entries, balances, invariants, incident workflows, graph traversal, replay algorithms, repair logic, evidence storage, fixture data, simulator data, benchmark behavior, external connectors, agents, database behavior, raw evidence mutation, or money mutation.
