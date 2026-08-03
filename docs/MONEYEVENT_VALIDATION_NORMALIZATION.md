# MoneyEvent Validation and Normalization

## Status

M03.04 implements the first scoped deterministic MoneyEvent runtime boundary. It validates and normalizes each source-neutral MoneyEvent candidate inside `packages/events`. Independent QA passed at source commit `d8d13d588bd6471178b4d815556fe1ba7fff570c`, and PR #53 merged the reviewed tree into `main` at `572dc150e38782620416350004630b690c00e687`.

## Purpose

This boundary turns ordinary JSON-safe candidate values into the branded compile-time `MoneyEvent` representation only after deterministic structural checks succeed. It gives M03.05 a stable unit-test and fixture target without making the package a source of financial truth.

## Scope

The implementation covers source-neutral candidate shape, stable validation issues, safe canonical transformations, evidence and provenance consistency, explicit uncertainty, and pure conversion to `MoneyEvent` values.

## Non-goals

M03.04 does not implement provider payload parsing, connectors, live ingestion, evidence storage, database persistence, API routes, ledger posting or accounting semantics, invariant execution, incident creation, graph construction, replay, repair proposal or execution, human review, agent investigation, autonomous loops, or money mutation. It does not parse arbitrary JSON text, webhooks, settlement files, bank files, database rows, or network responses.

## Runtime candidate boundary

`MoneyEventCandidate` and its nested candidate interfaces use unbranded strings, arrays, objects, and `null`; the money wire value is a string. Public functions accept `unknown`, so untrusted values are never treated as branded merely because TypeScript says so. The supported contract is `m03.04-runtime-boundary.v1` and the explicit transformation boundary is `m03.04-source-neutral-normalizer.v1`.

## Validation result model

`MoneyEventValidationResult` and `MoneyEventNormalizationResult` are discriminated by `ok`. Success carries an empty issue tuple; normalization success also carries a new `MoneyEvent`. Ordinary invalid input returns `ok: false` and typed issues rather than throwing.

`validateAndNormalizeMoneyEventCandidate` is the explicit convenience form of `normalizeMoneyEventCandidate`; for the same input, both return the same normalization result and issues.

## Validation issue taxonomy

Each `MoneyEventValidationIssue` has a stable machine-readable `code`, deterministic `$`-rooted `path`, and human-readable `message`. Codes cover required and unknown fields, invalid types and objects, unsupported values or versions, identifiers, money, currency, hashes, timestamps, evidence locators and requirements, provenance mismatches, relationship targets, reasons, and uncertainty. Issues sort by path, then code, then message using code-unit comparison.

The complete machine-readable code set is `currency_required`, `evidence_locator_required`, `evidence_required`, `invalid_currency`, `invalid_hash`, `invalid_identifier`, `invalid_minor_units`, `invalid_object`, `invalid_reason`, `invalid_timestamp`, `invalid_type`, `invalid_uncertainty`, `provenance_mismatch`, `relationship_target_required`, `required_field`, `uncertainty_reason_required`, `unknown_field`, `unsupported_contract_version`, `unsupported_transformation_boundary`, and `unsupported_value`. Messages are explanatory, not the machine contract, and do not copy rejected field values.

## Identifier rules

MoneyEvent IDs are trimmed strings with an `evt_` prefix, a non-empty suffix, and no whitespace. Evidence receipt IDs use the same rules with `rcpt_`. Source, source-record, party, object, and idempotency identifiers must be non-empty after their documented trimming. No ID is generated or inferred.

## Money representation rules

Candidate minor units are canonical base-10 integer strings matching `0` or an optional minus sign followed by a non-zero digit and remaining digits. Decimal strings, exponent notation, leading zeros, `+`, `-0`, locale formatting, `NaN`, `Infinity`, and JavaScript numbers are rejected. Successful normalization converts the string exactly to branded `bigint`.

Negative values are preserved. Their sign is not interpreted as debit, credit, asset, liability, revenue, cash direction, or accounting side; those semantics remain deferred to M04.

## Currency rules

Currency is required with the amount. It is safely trimmed, uppercased, and must contain exactly three ASCII letters. There is no default currency. This format check does not claim authoritative ISO 4217 registry membership because no authoritative registry is bundled in this slice.

## Source identity rules

`sourceId` is required and non-empty. `sourceType` must be one of `MONEY_EVENT_SOURCE_TYPES`. Optional `sourceRecordId` and `sourceSystemName` are trimmed and must remain non-empty. The package never infers source identity.

## Evidence-reference rules

A successful root event and its provenance require at least one primary or supporting evidence reference. Every reference has a supported role and at least one usable receipt ID, raw locator, source-record ID, or canonical `sha256:` plus 64 lowercase hexadecimal digits. Exact normalized duplicate references are collapsed using the ordered tuple of role, receipt ID, raw locator, source-record ID, and content hash. All remaining references are sorted by that same stable canonical key. A reference that differs in any tuple field, including role, remains distinct. Conflicting and `missing_expected` references are preserved; they are never resolved or dropped as contradictions.

## Provenance rules

Provenance contains source, evidence, observed time, and the supported versioned transformation boundary. After canonicalization, provenance source must equal root source, provenance evidence must equal root evidence, and provenance observed time must equal root observed time. Contradictions return `provenance_mismatch`; the normalizer does not choose between them.

## Time rules

Observed time is required. Event time may be `null`; otherwise both use the supported RFC 3339 profile: a four-digit year, uppercase `T`, seconds, an explicit uppercase `Z` or numeric offset, and an optional one-to-three-digit fractional second. Calendar and offset components must be valid; leap seconds and higher-than-millisecond input precision are rejected. Offset conversion must remain inside the four-digit RFC 3339 year range. Successful normalization produces UTC ISO strings with millisecond precision. No current time is read, no missing time is generated, and delayed or out-of-order evidence is accepted structurally because arrival order does not establish event order.

## Idempotency rules

The caller supplies a required, non-empty deterministic idempotency key. M03.04 validates but does not derive it, generate randomness, deduplicate MoneyEvents, or collapse movements that merely look similar. Source-specific derivation remains a mapping concern.

## Party and object reference rules

A primary party is required; related parties are validated independently. Party IDs are non-empty and roles must use `MONEY_EVENT_PARTY_ROLES`. The object ID is non-empty and its type uses `MONEY_EVENT_OBJECT_TYPES`. No identity is invented or inferred.

## Relationship rules

Relationship types use `MONEY_EVENT_RELATIONSHIP_TYPES`. Each item needs an event reference, object reference, or both; event IDs follow the `evt_` rule. Input order is preserved and relationships are not deduplicated or reconciled, so contradictory-looking references remain explicit.

## Lifecycle-state rules

Lifecycle state must use `MONEY_EVENT_LIFECYCLE_STATES`. This is field validation only, not a transition engine and not ledger, incident, repair, or human-review state.

## Uncertainty rules

Uncertainty state must use `MONEY_EVENT_UNCERTAINTY_STATES`. `none_known` requires empty reasons and evidence. Every other state requires at least one non-empty trimmed reason. Uncertainty evidence is fully validated and must be a subset of root evidence. Missing, delayed, partial, conflicting, ambiguous, provider-only, and unresolved evidence remain explicit. Structural success never means uncertainty or financial truth is resolved.

## Normalization rules

The only transformations are documented string trimming, currency uppercasing, timestamp conversion to UTC ISO form, canonical integer-string conversion to `bigint`, exact evidence deduplication and stable evidence ordering, and creation of fresh branded output values. No missing fact is supplied.

## Determinism and immutability

The implementation is synchronous, side-effect free, and has no runtime dependency. It uses no wall clock, randomness, LLM, network, database, filesystem, environment secret, or external service. Repeated calls with equal input produce equal results, and input objects and arrays are not mutated.

## Unknown-field policy

Every structured candidate object is strict. Own enumerable fields outside the documented boundary produce `unknown_field`. Arrays and class instances are not accepted as plain objects. This prevents silent forward interpretation; future fields require an explicit versioned contract change.

## Failure behavior

All detected ordinary data failures are accumulated, sorted deterministically, and returned. Failed normalization has no partial `MoneyEvent`, writes nothing, and performs no corrective action. Passing this boundary is not financial truth.

## Relationship to M03.05

M03.05 adds the reviewed controlled candidate corpus and early benchmark seed metadata described in `docs/MONEYEVENT_FIXTURES_BENCHMARK_SEEDS.md`. Deterministic tests exercise this boundary using those synthetic inputs. The corpus is not simulator output, production evidence, source-specific mapping, benchmark scoring, or financial truth.

## Relationship to later ledger, invariant, incident, graph, replay, repair, and agent layers

Later deterministic layers may consume validated MoneyEvents, but this package does not post ledger entries, calculate balances, execute invariants, create incidents, build causal graphs, replay systems, approve or apply repairs, or expose agent tools. Agents may eventually explain results but cannot establish them.

## Security and financial-truth boundaries

The validator treats its input as untrusted structure, rejects prototype-based objects and unknown fields, does not access secrets or external state, and retains evidence conflicts and uncertainty. A structurally valid MoneyEvent is not proof that a movement occurred, settled, matched cash, belongs on a ledger, or is financially correct. Financial truth continues to come from raw evidence, canonical events, deterministic invariants, replay, evidence bundles, and explicit human approval—not LLM judgment or package metadata.

## Deferred decisions

Source-specific parsing and idempotency derivation, authoritative currency-registry validation, accounting direction and signed-amount interpretation, storage and migration representation, cross-event duplicate detection, lifecycle transitions, evidence ingestion, financial invariants, and all downstream product behavior remain deferred. Unsupported inputs are rejected and unresolved evidence remains uncertain rather than guessed.
