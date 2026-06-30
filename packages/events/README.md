# Events Package

`@causalledger/events` is the canonical event package boundary.

The M03.01 conceptual MoneyEvent contract lives in `docs/MONEYEVENT_CONTRACT.md`. It defines MoneyEvent meaning as documentation only and does not create package behavior.

M03.02 adds a TypeScript-only MoneyEvent type boundary:

- branded identifiers for MoneyEvent, evidence receipt, source, object, party, and idempotency references;
- readonly MoneyEvent field types for source identity, evidence references, provenance, amount, party, object, event time, observed time, lifecycle state, relationships, and uncertainty;
- integer minor-unit money represented as branded `bigint`;
- ISO 4217 currency represented as a branded string pending future runtime validation;
- exported literal-union metadata for event kinds, source types, lifecycle states, and uncertainty states.

This package still does not parse, validate, normalize, ingest, store, or transform MoneyEvents. The `bigint` minor-unit representation is exact at TypeScript runtime but is not JSON serializable without a future runtime-schema decision. Runtime schemas, JSON wire representation, parser behavior, validation rules, normalization rules, fixture data, and deterministic duplicate handling remain deferred to later M03 submilestones.

The type boundary maps to `docs/MONEYEVENT_CONTRACT.md` by making evidence, provenance, idempotency, amount, currency, source identity, actor/object references, time, uncertainty, and lifecycle state explicit in TypeScript. It enables M03.03 and M03.04 by giving future mapping and validation work a stable compile-time target, but it does not create financial truth or product behavior.

No CausalLedger runtime product behavior is implemented here. There are no runtime schemas, parsers, validators, normalizers, financial schemas, ledger entries, balances, invariants, incident workflows, graph traversal, replay algorithms, repair logic, evidence storage, benchmark behavior, external connectors, agents, database behavior, API routes, UI, or money mutation.
