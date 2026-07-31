# Evals Package

`@causalledger/evals` is the future evaluation harness package boundary.

M03.03 documents MoneyEvent mapping fixture categories and simulator planning in `docs/MONEYEVENT_MAPPING_FIXTURES.md`. M03.05 adds seven early MoneyFlowBench seed cases under `scenarios/moneyflowbench/` and a strict test-only parser plus verification in `test/`.

The seed metadata references controlled fixture IDs and records exact expected evidence references, uncertainty, rejection issues, prohibited unsupported claims, hallucination and unsafe-action failure policies, deterministic repeatability, and future cost-capture requirements. `expectedEvidenceReferences` includes receipt IDs and truthful non-receipt evidence identifiers. The test-only parser rejects malformed or ungrounded metadata, embedded payloads or outputs, scores, leaderboards, and results. It does not implement a runner, scoring, model execution, reports, benchmark results, simulator behavior, or product readiness.

M02.05 creates only package scaffolding:

- package manifest;
- TypeScript source and test configs extending the root config;
- scaffold metadata export;
- bootstrap test;
- local build, typecheck, test, lint, and format-check scripts.

No CausalLedger runtime product or domain behavior is implemented here. There are no financial schemas, ledger entries, balances, invariants, incident workflows, graph traversal, replay algorithms, repair logic, evidence storage, simulator data, benchmark runner or scoring implementation, external connectors, agents, database behavior, or money mutation.
