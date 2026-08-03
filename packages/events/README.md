# Events Package

`@causalledger/events` owns the canonical, source-neutral MoneyEvent package boundary.

M03.02 introduced the compile-time types in `src/money-event.ts`: branded identifiers and minor-unit `bigint`, readonly source, evidence, provenance, amount, party, object, relationship, time, lifecycle, and uncertainty fields, plus supported literal unions.

M03.04 adds a small deterministic runtime boundary:

- unbranded, JSON-safe `MoneyEventCandidate` values accepted as `unknown`;
- `validateMoneyEventCandidate` for strict structural validation with stable codes and paths;
- `normalizeMoneyEventCandidate` and `validateAndNormalizeMoneyEventCandidate` for pure conversion to a branded `MoneyEvent`;
- canonical integer-string money input converted exactly to branded `bigint`;
- currency format normalization, RFC 3339 timestamp canonicalization, evidence deduplication and ordering, provenance consistency, and explicit uncertainty rules;
- strict unknown-field handling, deterministic issue ordering, and no input mutation.

The normative rules are in `docs/MONEYEVENT_VALIDATION_NORMALIZATION.md`. The M03.01 conceptual meaning remains in `docs/MONEYEVENT_CONTRACT.md`, and M03.03 fixture planning remains in `docs/MONEYEVENT_MAPPING_FIXTURES.md`.

M03.05 adds a 21-case controlled JSON candidate corpus under `data/fixtures/money-events/` plus a strict test-only manifest parser and verification in `test/`. Eight valid cases compare complete JSON-safe normalized MoneyEvent snapshots; 13 invalid cases compare exact ordered issue lists from validation and normalization. The corpus covers provider-only and partial evidence, delayed evidence, ambiguous references, exact duplicate collapse, distinct evidence preservation, every relationship target form, conflicts, nullable event time, negative minor units, and the major validation families. JavaScript-only inputs such as classes, `undefined`, `NaN`, `Infinity`, and native `bigint` remain in the runtime unit suite because JSON cannot represent them truthfully.

This is source-neutral candidate behavior, not a complete MoneyEvent engine. There is no runtime schema framework, arbitrary JSON-text parser, source-specific parser or mapper, provider connector, ingestion, storage, database, API, UI, ledger behavior, invariant engine, incident workflow, graph, replay, repair, evidence store, benchmark runner or scoring, agent runtime, external I/O, or money mutation. Structural success does not establish financial truth, and fixture success does not change that boundary.

The package has no runtime dependency. Package-local `@types/node` exists only for isolated test typechecking of file loading and `URL`; it does not enter runtime resolution. Product code does not use time, randomness, LLM judgment, network, filesystem, database, environment secrets, or external services.
