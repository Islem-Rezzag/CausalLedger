# MoneyEvent Test Fixtures and Benchmark Seed Cases

## Status

M03.05 provides a reviewed controlled MoneyEvent candidate corpus and early MoneyFlowBench seed metadata. The artifacts are deterministic synthetic test inputs. They are not raw evidence, production events, or benchmark results, and they are not financial truth.

M03.05 is `Builder complete, awaiting QA` on `m03-05-moneyevent-test-fixtures-benchmark-seeds` and draft PR #55. Independent QA and PR merge remain required before M03.05 can be called completed.

## Purpose

The fixture corpus turns the M03.03 mapping categories and M03.04 validation rules into reusable deterministic test cases. The seed cases capture evidence-grounding and uncertainty expectations that later MoneyFlowBench work can use without implementing an evaluation runner early.

## Artifacts

- `data/fixtures/money-events/candidates.json` contains the versioned source-neutral candidate corpus.
- `scenarios/moneyflowbench/money-event-seeds.json` contains versioned benchmark seed metadata that references fixture IDs.
- `packages/events/test/money-event-fixtures.test.ts` verifies candidates against the existing public validator and normalizer.
- `packages/evals/test/money-event-seed-cases.test.ts` verifies seed-to-fixture references and evaluation-safety metadata.

## Fixture manifest boundary

The fixture manifest version is `m03.05-money-event-fixtures.v1`. Each case has a stable fixture ID, reviewed category and coverage tags, a controlled source identity, explicit evidence references, one source-neutral candidate, and either a valid normalization expectation or invalid typed-issue expectation.

Valid expectations use JSON-safe strings for normalized minor units because JSON cannot encode `bigint`. Tests compare those strings with the exact `bigint` returned by the existing normalizer. Invalid expectations cite stable issue codes and paths.

The corpus covers:

| Fixture category                         | Deterministic boundary                                                                       |
| ---------------------------------------- | -------------------------------------------------------------------------------------------- |
| Simple provider capture                  | Preserves provider-only uncertainty and does not claim settlement or bank confirmation.      |
| Provider refund / partial chain          | Preserves the original-payment relationship and missing settlement evidence.                 |
| Chargeback opened                        | Keeps outcome, fee, settlement, and bank impact unresolved.                                  |
| Settlement payout row / delayed evidence | Keeps source time separate from observed time and preserves missing bank evidence.           |
| Bank deposit line                        | Preserves an ambiguous payout relationship rather than forcing a match.                      |
| Duplicate provider webhook               | Exercises exact evidence deduplication while preserving the caller-supplied idempotency key. |
| Conflicting amount                       | Preserves both provider and bank references and explicit conflicting-evidence uncertainty.   |
| Missing currency                         | Expects deterministic rejection with `currency_required`; no default currency is inferred.   |

## Evidence and provenance rules

All source systems are controlled fixture identities. Raw locators use the `fixture://` scheme and contain no payload body, credential, token, secret, or live endpoint. Receipt IDs and source-record IDs are synthetic references.

The fixture corpus does not replace raw evidence. It is test data used to verify structural validation and normalization. A passing fixture does not prove that a movement occurred, settled, matched cash, belongs on a ledger, or is financially correct.

## Benchmark seed boundary

The seed manifest version is `m03.05-moneyflowbench-seeds.v1`. Each seed references one or more fixture IDs and records:

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

The seed manifest explicitly records `scoringImplemented: false` and an empty benchmark-results list. M03.05 does not choose models, run prompts, assign numeric weights, calculate scores, publish leaderboards, compare systems, or claim benchmark performance.

## Hallucination and unsafe-action resistance

Every seed requires cited controlled evidence. Unsupported facts, unsupported certainty, and unsafe actions are failure conditions for a future runner. Prohibited claims include invented settlement or bank confirmation, forced evidence matches, guessed currencies, selected conflict truth, ledger-posting instructions, and repair approval or application.

These policies are evaluation intent only. No LLM is executed in M03.05, and no seed output can become financial truth.

## Cost and repeatability

Fixture and seed files are static and deterministic. Repeated validation uses identical inputs and expected outputs. Every seed says cost capture will be required when the M14 runner exists, but M03.05 records no token count, latency, price, model choice, or benchmark cost because no model run occurs.

## Package ownership

`packages/events` remains the owner of canonical MoneyEvent validation and normalization. M03.05 adds only tests that consume its public boundary; it adds no parser, mapper, ingester, storage layer, or runtime dependency.

`packages/evals` remains runtime scaffold-only. M03.05 adds test-only seed verification and no runner, scorer, model integration, report, or product behavior.

## Non-goals and safety boundary

M03.05 does not implement source-specific mapping, simulator code or execution, live evidence ingestion, evidence storage, database persistence, APIs, UI, ledger posting, invariants, incidents, graph construction, replay, repair proposals or execution, human approval, agent tools, external communications, or money mutation.

Fixtures do not modify raw events or delete evidence. Seed cases cannot approve repairs, post ledger entries, override deterministic invariants, or authorize production writes.

## Relationship to M03.06 and M14

M03.06 must independently QA the fixture corpus, seed metadata, deterministic tests, documentation alignment, and forbidden scope before M03 closeout. M14 may later design a real MoneyFlowBench runner and scoring model, but it must retain evidence grounding, calibrated uncertainty, hallucination penalties, repeatability, cost capture, and the CausalLedger safety boundary.
