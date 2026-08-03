# MoneyEvent Test Fixtures and Benchmark Seed Cases

## Status

M03.05 provides a reviewed controlled MoneyEvent candidate corpus and early MoneyFlowBench seed metadata. The artifacts are deterministic synthetic test inputs. They are not raw evidence, production events, or benchmark results, and they are not financial truth.

M03.05 is `Completed and merged`. PR #55 merged the reviewed scope into `main` at `89874bca2525a423d773548c61f9655f09642575`; builder commit `397ac47756f6cb25f919a1cee7b58adbabe29d4f`, independent QA commit `f7a1f3c8ae13be60ff8f8154acb81965d2237b9d`, and final reviewed head `869af913b781a9706a93d561c256c4077f30361d` are recorded. This completion claim covers the controlled artifacts and deterministic test verification only; it does not establish financial truth or broader product readiness.

## Purpose

The fixture corpus turns the M03.03 mapping categories and M03.04 validation rules into reusable deterministic test cases. The seed cases capture evidence-grounding and uncertainty expectations that later MoneyFlowBench work can use without implementing an evaluation runner early.

## Artifacts

- `data/fixtures/money-events/candidates.json` contains the versioned source-neutral candidate corpus.
- `scenarios/moneyflowbench/money-event-seeds.json` contains versioned benchmark seed metadata that references fixture IDs.
- `packages/events/test/money-event-fixture-manifest.ts` strictly parses the fixture manifest as test data before any candidate assertion runs.
- `packages/events/test/money-event-fixtures.test.ts` verifies candidates against the existing public validator and normalizer.
- `packages/evals/test/money-event-seed-manifest.ts` strictly parses and grounds the seed manifest against reviewed fixtures.
- `packages/evals/test/money-event-seed-cases.test.ts` verifies seed-to-fixture references and evaluation-safety metadata.

## Fixture manifest boundary

The fixture manifest version is `m03.05-money-event-fixtures.v1`. Each case has a stable fixture ID, reviewed category and coverage tags, a controlled source identity, explicit evidence references, one source-neutral candidate, and either a valid normalization expectation or invalid typed-issue expectation.

The reviewed corpus contains 21 cases: eight valid candidates and 13 invalid candidates. Valid expectations contain an independently stored, complete JSON-safe normalized `MoneyEvent` snapshot. The only representation change is `amount.minorUnits`, which is stored as a decimal string because JSON cannot encode `bigint`; the test converts the actual normalized event to JSON-safe data only after normalization and compares the whole object. Expected snapshots are static fixture data and are not generated from the implementation during a test run.

Invalid expectations contain the complete ordered list of stable issue-code and path pairs. Validation and normalization must return exactly that list, with no extra or duplicate issue, and normalization must not expose a partial value. Test-only manifest parsers reject missing or unknown manifest fields, malformed cases, duplicate IDs or tags, incomplete snapshots, unsupported outcomes, malformed issue codes or paths, and duplicate issue expectations before domain validation starts.

The corpus covers:

| Fixture category                         | Deterministic boundary                                                                                                       |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Simple provider capture                  | Preserves provider-only uncertainty and does not claim settlement or bank confirmation.                                      |
| Provider refund / partial chain          | Preserves the original-payment relationship and missing settlement evidence.                                                 |
| Chargeback opened                        | Keeps outcome, fee, settlement, and bank impact unresolved.                                                                  |
| Settlement payout row / delayed evidence | Keeps source time separate from observed time and preserves missing bank evidence.                                           |
| Bank deposit line                        | Preserves an ambiguous payout relationship rather than forcing a match.                                                      |
| Duplicate provider webhook               | Exercises exact evidence deduplication while preserving the caller-supplied idempotency key.                                 |
| Distinct evidence and relationships      | Preserves materially distinct evidence, nullable event time, and event-only, object-only, and combined relationship targets. |
| Conflicting amount                       | Preserves both provider and bank references and explicit conflicting-evidence uncertainty.                                   |
| Missing currency                         | Expects deterministic rejection with `currency_required`; no default currency is inferred.                                   |

The invalid fixture families separately cover missing root fields, unsupported contract versions, invalid event IDs, missing primary/supporting evidence, provenance disagreement, missing currency, non-canonical minor units, invalid timestamps, empty idempotency keys, missing relationship targets, unsupported lifecycle states, missing uncertainty reasons, and unsupported transformation boundaries.

## JSON coverage and TypeScript-only edge cases

| Boundary                     | Canonical JSON fixture coverage                                                                                            | TypeScript-only unit coverage                                             |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| Full valid normalization     | All 16 MoneyEvent root fields, every nested object and array, ordering, timestamps, currency, and `bigint` string snapshot | Branded output typing and compile-time readonly boundaries                |
| Evidence identity            | Exact duplicate collapse and materially distinct reference preservation                                                    | Non-plain objects and prototype-bearing records                           |
| Relationships and time       | Event, object, combined targets, and nullable `eventTime`                                                                  | `undefined` properties that JSON cannot encode                            |
| Invalid scalar values        | Missing fields, empty strings, invalid enums, identifiers, timestamps, and integer strings                                 | `NaN`, positive/negative `Infinity`, and native `bigint` candidate inputs |
| Determinism and immutability | Repeated loads, repeated validation/normalization, full deep comparison, and frozen nested inputs                          | Class instances and other non-JSON runtime values                         |

JSON fixtures intentionally do not pretend to encode JavaScript-only values. Those cases remain in `money-event-validation.test.ts`, where the runtime boundary can receive them as `unknown`.

## Evidence and provenance rules

All source systems are controlled fixture identities. Raw locators use the `fixture://` scheme and contain no payload body, credential, token, secret, personal contact field, live endpoint, or production-looking identifier. Receipt IDs, source-record IDs, and missing-expected references are synthetic. The seed field is therefore named `expectedEvidenceReferences`, not receipt IDs: some truthful evidence references are source-record IDs rather than receipts.

The fixture corpus does not replace raw evidence. It is test data used to verify structural validation and normalization. A passing fixture does not prove that a movement occurred, settled, matched cash, belongs on a ledger, or is financially correct.

## Benchmark seed boundary

The seed manifest version is `m03.05-moneyflowbench-seeds.v1` and contains seven reviewed cases. Each seed references one or more fixture IDs and records:

- the bounded investigation or explanation task;
- expected evidence references;
- expected uncertainty states;
- required evidence-grounded findings;
- prohibited unsupported claims;
- whether deterministic rejection is expected;
- evidence-citation requirements;
- hallucinated-fact, unsupported-certainty, and unsafe-action failure policies;
- deterministic repeatability expectations;
- a requirement to capture cost once a future runner exists.

The strict test-only seed parser rejects unknown or missing fields, malformed records, duplicate seed or fixture IDs, unknown fixture references, empty tasks/findings/prohibited claims, ungrounded evidence or uncertainty, malformed or non-exact rejection issues, embedded fixture payloads, model or agent output, scores, leaderboards, benchmark results, and incorrect evaluation or cost policy. Evidence references, uncertainty states, and rejection issues must exactly equal the referenced fixture grounding in stable order.

The seed manifest explicitly records `scoringImplemented: false` and an empty benchmark-results list. M03.05 does not choose models, run prompts, assign numeric weights, calculate scores, publish leaderboards, compare systems, or claim benchmark performance.

## Hallucination and unsafe-action resistance

Every seed requires cited controlled evidence. Unsupported facts, unsupported certainty, and unsafe actions are failure conditions for a future runner. Prohibited claims include invented settlement or bank confirmation, forced evidence matches, guessed currencies, selected conflict truth, ledger-posting instructions, and repair approval or application.

These policies are evaluation intent only. No LLM is executed in M03.05, and no seed output can become financial truth.

## Cost and repeatability

Fixture and seed files are static and deterministic. Repeated validation uses identical inputs and expected outputs. Every seed says cost capture will be required when the M14 runner exists, but M03.05 records no token count, latency, price, model choice, or benchmark cost because no model run occurs.

## Package ownership

`packages/events` remains the owner of canonical MoneyEvent validation and normalization. M03.05 adds only tests that consume its public boundary; it adds no parser, mapper, ingester, storage layer, or runtime dependency. `@types/node` is a package-local development dependency only so isolated test typechecking can type `node:fs` and `URL`; it does not change runtime resolution or the public package boundary.

`packages/evals` remains runtime scaffold-only. M03.05 adds test-only seed verification and no runner, scorer, model integration, report, or product behavior.

## Non-goals and safety boundary

M03.05 does not implement source-specific mapping, simulator code or execution, live evidence ingestion, evidence storage, database persistence, APIs, UI, ledger posting, invariants, incidents, graph construction, replay, repair proposals or execution, human approval, agent tools, external communications, or money mutation.

Fixtures do not modify raw events or delete evidence. Seed cases cannot approve repairs, post ledger entries, override deterministic invariants, or authorize production writes.

## Relationship to M03.06 and M14

M03.06 must independently QA the fixture corpus, seed metadata, deterministic tests, documentation alignment, and forbidden scope before M03 closeout. M14 may later design a real MoneyFlowBench runner and scoring model, but it must retain evidence grounding, calibrated uncertainty, hallucination penalties, repeatability, cost capture, and the CausalLedger safety boundary.
