# M05.04–M05.06 Synthetic payout lifecycle

This private offline simulator composes provider evidence only. It makes no payment, bank receipt, settlement, canonical MoneyEvent, ledger entry, evidence-store write, incident verdict or financial approval. The1–16 member full gross capture policy is a controlled fixture contract, not a universal provider rule.

## Requests and ownership

Public unknown-input functions: `generatePayoutCreated`, `generatePayoutPaid`, `generatePayoutFailed`. All return the existing frozen discriminated manifest result or frozen stable issues with no partial value. Owner: `packages/simulator/src/payout.ts`; unchanged generic validation and owned02/03 regeneration enforce adjacent contracts. No new dependencies or app routes.

All requests require exactly these17 own enumerable data fields: schemaVersion, synthetic, scenarioId, observationCutoff, sourceId, sourceOccurrenceId, sourceRecordId, eventTime, deliveryId, receiptDescriptorId, observedAt, deliveryOrder, providerId, merchantId, payoutId, amountMinorUnits, currency. Created adds captureManifests (18fields); paid adds payoutManifest (18); failed adds payoutManifest and failureReason (19).

| Kind / original ID | Request schemaVersion | Raw schemaVersion | Generator version |
| --- | --- | --- | --- |
| created / M05.04 | m05.04-payout-created-request.v1 | m05.04-payout-created-record.v1 | m05.04-payout-created.v1 |
| paid / M05.05 | m05.05-payout-paid-request.v1 | m05.05-payout-paid-record.v1 | m05.05-payout-paid.v1 |
| failed / M05.06 | m05.06-payout-failed-request.v1 | m05.06-payout-failed-record.v1 | m05.06-payout-failed.v1 |

synthetic is literal true. Existing generic simulator identity/UTC/calendar/order rules apply. providerId/merchantId/payoutId use sim_provider_/sim_merchant_/sim_payout_ plus1–64ASCII suffix, first alphanumeric then alphanumeric/underscore/hyphen. Currency is exactly3 uppercase ASCII letters with exact member equality, not a currency registry or conversion. Amount is a positive canonical decimal string of1–130digits; no sign, fraction, exponent, leading zero, whitespace, Number conversion or rounding.

Root fields are snapshotted once before nested input inspection. Plain/null-prototype own-data objects only; no accessors, hidden/symbol/unknown fields or class instances. captureManifests must be a dense ordinary own-data array with1–16 members and no decorations. Ordinary getters/toJSON are never invoked. Unexpected Proxy traps are caught; arbitrary Proxy code is not isolated by these data validators. Outputs are detached and deeply frozen. No input mutation, clock, randomness, network, database or shared consumption state.

## M05.04 membership and exact total

Each member must be an exact owned03 manifest with precisely one authorization/capture and their two deliveries. Reconstruct the authorization with unchanged02 and capture with unchanged03; require exact complete manifest equality. Recomputed SHA256 alone cannot legitimize changed versions, event kinds, references, money, key ordering, unknown/duplicate JSON keys or whitespace. The entire member is validated before using its captured amount.

Freeze policy `full_gross_captures.v1`: retain supplied member order, concatenate each original authorization/capture source and delivery pair, and append creation. All members match supplied source/provider/merchant/currency. Reject repeated paymentId, authorizationId or captureId even across distinct occurrence descriptors; reject overlapping source/occurrence tuples and generic record/delivery/receipt/order identities. Allocation is the full capture amount. Sum with BigInt after validation of original1–128digit captures;16 maximum members fit the130digit payout request bound. Exact declared payout amount must equal the sum. No fees, refunds, reserves, FX, netting, partial membership allocation, global uniqueness, available funds or cross-call budget is implemented.

Known created eventTime must be at/after every capture eventTime. The padded `.000` comparison key is internal; raw supplied timestamps remain unchanged. Arrays are never sorted by eventTime, observedAt or deliveryOrder. Independent observedAt/cutoff declarations may lie before/after event times; no visibility filtering, receipt inference or sleeping.

## M05.05 and M05.06 provider outcome evidence

An outcome accepts an exact owned creation composition, optionally followed by one opposite outcome. Rebuild member pairs, creation and the prior outcome; require the entire supplied composition's canonical sources, deliveries, version and metadata to match. This rejects modified owned payloads even with recomputed valid hashes.

Supplied source/provider/merchant/payout, amount and currency must match creation exactly. Append a distinct occurrence and delivery with a creationReference containing original sourceId, sourceOccurrenceId and payloadSha256. Outcome eventTime must be at/after creation, but opposite outcomes need not follow each other's event times. Paid does not establish bank receipt or settlement. Failed requires an explicit1–256 printable ASCII failureReason with no surrounding whitespace; it never derives failure from missing bank evidence.

Both paid→failed and failed→paid are representable as separate raw reports for one payout. Neither overwrites earlier evidence or selects a final/winning status. A second same-kind outcome is refused. A composition already containing both outcomes is not accepted for further extension. Created alone is incomplete provider evidence; absent or unrelated creation/member context is refused with no partial value. No bank evidence is fabricated or required to describe a supplied provider failure.

## Canonical raw bytes and references

Compact UTF-8 JSON, no BOM/newline, fixed common key order: schemaVersion, synthetic, eventType, sourceId, sourceOccurrenceId, providerId, merchantId, payoutId, amount. eventType is payout_created/payout_paid/payout_failed. Amount key order: minorUnits, currency, representation; representation is integer_minor_units.

Created then adds membershipPolicy, captureReferences, eventTime. Each ordered capture reference has sourceId, sourceOccurrenceId, payloadSha256, captureId, paymentId, citing the original capture bytes. Paid adds creationReference, eventTime. Failed adds creationReference, failureReason, eventTime. Creation reference keys are sourceId, sourceOccurrenceId, payloadSha256. Hashes are exact lowercase SHA256 over raw UTF-8 bytes.

Descriptors, delivery/receipt IDs, observations/order and top-level scenario/cutoff stay outside raw occurrence bytes. Changing only this metadata preserves payloads and hashes. The returned new manifest has the current generator/scenario/cutoff, and preserves every prior source/delivery exactly; prior top-level generator/scenario/cutoff are not claimed to be retained as top-level metadata.

## Errors and safe exercise

Validation order: strict root shape, scalar/version/money/reason checks, current generic metadata, member array and owned member/aggregate checks or owned prior payout and relational checks, occurrence tuple uniqueness, combined generic validation. Unknown root keys are sorted; missing keys follow declared field order. No accepted value accompanies any error.

Existing generic issue codes plus invalid_amount/invalid_currency apply. Malformed member arrays: invalid_array at $.captureManifests. Non-owned member: invalid_payload at $.captureManifests[index]. Non-owned/incomplete payout: invalid_payload at $.payoutManifest. Wrong aggregate/outcome amount: invalid_amount at $.amountMinorUnits. Conflicting valid identities/currency: invalid_reference at the corresponding root field, or $.captureManifests[index].field for member conflicts. Duplicate economic member IDs: duplicate_identity at member.field. Repeated same-kind outcome: duplicate_identity at $.payoutManifest. Overlapping source/occurrence: duplicate_identity at $.sourceOccurrenceId. Earlier valid eventTime: invalid_value at $.eventTime; malformed UTC/calendar: invalid_timestamp. Invalid explicit failureReason: invalid_value at $.failureReason. Generic current metadata errors map index0 fields to root; final combined record/delivery/receipt/order collision paths retain their explicit manifest indexes.

Run the existing safe exercise from the repository terminal:

    pnpm --filter @causalledger/simulator exec vitest run test/payout.test.ts -t demonstration --silent=false

The synthetic example supplies1000+250 USD minor units, creates1250, appends paid and explicit failed reports, returns7 sources/7 deliveries, preserves original evidence and refuses1251 as invalid_amount. It changes no committed expectations or external state. If pnpm is unavailable on Windows use the existing installed wrapper `& "$env:APPDATA\npm\pnpm.cmd"` with the same arguments. Do not install or change machine settings as exercise recovery; report a missing tool. Existing build/type/lint/format/full tests plus independent QA and actual final CI are required review evidence, separately from this learning exercise.

Success cannot establish real funds, provider authenticity, available balance, bank settlement, economic finality or global deduplication. Original04/05/06 remain individually mapped in CLP0006;07+ and formal19/closeout are not completed by this unit.
