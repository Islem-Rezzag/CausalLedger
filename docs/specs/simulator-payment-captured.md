# M05.03 Synthetic payment captured

`generatePaymentCaptured(unknown)` composes one supplied generated02 authorization and one new declared full or partial capture. This is offline synthetic evidence, with no actual funds capture, settlement, ledger posting, evidence ingestion or provider authenticity claim. It does not establish canonical MoneyEvent financial truth.

## Request

Exactly21 required own enumerable data fields, on a plain or null-prototype object:

| Field | Contract |
| --- | --- |
| schemaVersion | `m05.03-payment-captured-request.v1` |
| synthetic | literal true |
| scenarioId, observationCutoff | Declared current composition metadata; existing simulator ID/calendar grammar |
| sourceId, sourceOccurrenceId, sourceRecordId | Explicit current source tuple; source must equal supplied authorization source; occurrence must differ |
| eventTime | Known canonical UTC; capture instant at or after authorization instant |
| deliveryId, receiptDescriptorId, observedAt, deliveryOrder | Explicit current delivery metadata; unique in combined manifest |
| providerId, merchantId, payerId, paymentId, authorizationId | Existing simulator role grammar; exact supplied authorization equality |
| captureId | `sim_capture_` plus1–64ASCII suffix, first alphanumeric then alphanumeric/underscore/hyphen |
| amountMinorUnits | Positive canonical decimal string,1–128digits, no leading zero, fraction/sign/exponent/whitespace |
| currency | Exactly3 uppercase ASCII letters and equal authorization currency; no ISO registry lookup |
| authorizationManifest | Exact single-source/single-delivery generated02 authorization artifact |

The generic manifest/source/delivery IDs retain their01 grammar. Times use real calendar dates, years0001–9999, whole seconds or exactly3fractional digits endingZ. UTC comparison pads an omitted fractional part to `.000` only internally; every supplied raw timestamp is preserved. This ordering is a bounded synthetic fixture policy, not a universal provider invariant. No observedAt/cutoff chronology, visibility, sorting or receipt inference is performed.

The supplied prior artifact first passes the unchanged generic validator, producing a detached frozen snapshot. It must have the fixed02 generator version, exactly1 provider source and1 delivery and application/json media type. Only this owned02 wire is parsed. Reconstructing it with the unchanged02 generator must reproduce the full checked manifest exactly, including canonical raw text/hash, metadata, versions, event kind, source tuple and time. A valid recomputed SHA alone cannot authorize changed semantics, unknown fields, reordered keys, duplicate keys, whitespace or another media type. Arbitrary provider JSON is not accepted or integrated.

Capture amount is compared with BigInt only after both amounts are validated: `0 < capture <= supplied authorization`. There is one capture per invocation/result. Calls do not consume authorizations or share state. There is no cumulative remaining-budget registry, multi-capture accounting, global uniqueness, expiry, account ownership, available-funds or authenticity guarantee.

## Output and exact bytes

Success is the existing frozen discriminated `{ok:true,value:SimulatorManifest,issues:[]}`. The result has the03 generator version `m05.03-payment-captured.v1`, current declared scenario/cutoff, original authorization source/delivery first and new capture source/delivery second. Original descriptors, raw text, hash, tuple, source time and delivery details are preserved exactly and detached. The prior manifest's top-level scenario/cutoff/generator are not returned as unchanged top-level metadata: this is a new composition.

New raw text is compact UTF-8 JSON without BOM or final newline, with this fixed key order:

    schemaVersion, synthetic, eventType, sourceId, sourceOccurrenceId,
    providerId, paymentId, authorizationId, captureId, merchantId, payerId,
    amount, authorizationReference, eventTime

Raw schemaVersion is `m05.03-payment-captured-record.v1`; synthetic is true; eventType is `payment_captured`. Amount keys are minorUnits,currency,representation with literal `integer_minor_units`. Authorization reference keys are sourceId,sourceOccurrenceId,payloadSha256, taken from the validated ORIGINAL authorization source. The reference never cites the temporary capture validation probe. The new source payload has encoding utf-8, mediaType application/json, text and lowercase SHA256 over exact UTF-8 bytes.

Descriptor IDs, deliveries, observedAt/order, scenario and cutoff stay outside raw occurrence bytes. Changing only these metadata fields in either valid request or prior authorization preserves both raw occurrence payloads/hashes. Final generic validation checks the composed record/delivery references and identity/order collisions before accepting anything.

## Failure and input safety

Failure is frozen `{ok:false,issues:[{code,path},...]}` with no partial value. Validation phases short circuit in stable order: root shape;03 version/synthetic/capture identity; prior generic validation; owned02 canonical check; capture probe; relations; combined generic validation. Root unknown keys are sorted, then missing keys follow the request field order. Prior generic paths are prefixed `$.authorizationManifest`. Owned-wire/shape failures use invalid_payload at `$.authorizationManifest.sourceRecords[0].payload`. Probe context paths map to the corresponding current request field; new combined source/delivery index1 paths map to current fields. Other generic paths remain explicit.

Existing simulator issue codes apply, with invalid_amount and invalid_currency. Conflicting valid references/currency and repeated authorization occurrence use invalid_reference. An otherwise valid overcapture uses invalid_amount at `$.amountMinorUnits`; an earlier valid source timestamp uses invalid_value at `$.eventTime`. Invalid syntax/calendar uses invalid_timestamp. Combined unique descriptor/delivery/receipt/order collisions use duplicate_identity. A prior hash mismatch remains hash_mismatch at its prefixed path.

Unknown/missing, accessor, hidden/symbol fields and class instances are rejected; ordinary getters/toJSON are never invoked. Root data descriptors are snapshotted once before inspecting prior objects, so their later mutation cannot change accepted scalar values. Unexpected descriptor/prototype traps return invalid_object. This is not an isolation sandbox for arbitrary JavaScript Proxy code. No caller object or original evidence is mutated; accepted output is deeply frozen and detached.

## Demonstration and verification

A generated authorization for1250 USD plus declared capture1000 USD with matching identities produces preserved authorization plus a new1000 USD capture. Capture1251 USD is rejected as invalid_amount; EUR with prior USD is rejected as invalid_reference. This comparison proves fixture consistency only; it neither captures money nor confirms settlement.

Optional VS Code terminal demonstration (the coordinator already runs validation):

    pnpm --filter @causalledger/simulator test -- test/payment-captured.test.ts

Tests pin independently authored literal authorization/capture bytes and externally computed SHA256, exact full/partial/overcapture arithmetic beyond safe-number/int64 limits, timestamps/equal instants, recomputed-hash tampering, caller mutation traps, metadata-only changes and preserved detached evidence. Type-negative tests cover readonly requests/prior/result; AST checks restrict runtime imports to owned modules plus deterministic node:crypto createHash.

M05.04 Simulate payout created and later original rows remain unstarted and require this03 independent QA, current-head CI and verified human merge. No dependency, generic validator,02 generator, ledger, canonical event, migration, CI or fixture change is part of03.
