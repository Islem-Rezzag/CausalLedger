# Events Package

`@causalledger/events` is the future canonical event package boundary.

The M03.01 conceptual MoneyEvent contract lives in `docs/MONEYEVENT_CONTRACT.md`. It defines MoneyEvent meaning as documentation only and does not create package behavior.

M02.05 creates only package scaffolding:

- package manifest;
- TypeScript source and test configs extending the root config;
- scaffold metadata export;
- bootstrap test;
- local build, typecheck, test, lint, and format-check scripts.

No CausalLedger product or domain behavior is implemented here. There are no MoneyEvent TypeScript types, runtime schemas, parsers, validators, normalizers, financial schemas, ledger entries, balances, invariants, incident workflows, graph traversal, replay algorithms, repair logic, evidence storage, benchmark behavior, external connectors, agents, database behavior, or money mutation.
