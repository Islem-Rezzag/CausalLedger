# Synthetic dispute opened and chargeback fee

M05.09–M05.10 add two pure generators to the private simulator package. They create labelled synthetic source records for later test scenarios. They do not establish provider authenticity, a dispute outcome, funds received or lost, a principal reversal, or a fee actually debited. No provider connection, ledger posting, evidence storage or approval is performed.

## Inputs and results

`generateDisputeOpened(unknown)` requires a `DisputeOpenedRequest` with exactly these own enumerable data fields:

- `schemaVersion`: `m05.09-dispute-opened-request.v1`; `synthetic`: literal `true`.
- `scenarioId`, `observationCutoff`, `sourceId`, `sourceOccurrenceId`, `sourceRecordId`, `eventTime`, `deliveryId`, `receiptDescriptorId`, `observedAt`, `deliveryOrder`.
- `providerId`, `merchantId`, `payerId`, `paymentId`, `authorizationId`, `captureId`, `disputeId`, `currency`, `contextManifest`, `reason`.

`generateChargebackFee(unknown)` requires `ChargebackFeeRequest`: the same common fields, `schemaVersion: m05.10-chargeback-fee-request.v1`, and `feeId` plus `feeAmountMinorUnits` instead of `reason`. No disputed-principal amount is accepted or inferred. The shared `DisputeResult` is a frozen `{ok:true,value}` manifest or `{ok:false,issues}` with stable issue codes/paths and no partial value. `DisputeIssue` shares the established authorization issue vocabulary.

Root objects must be plain or null-prototype objects with only the exact listed fields. Hidden, symbol, getter/setter, class and unknown fields are refused. Required descriptors are snapshotted before nested context inspection. Ordinary getters are not called; arbitrary JavaScript Proxy code is not sandboxed. Exceptions from descriptor/prototype inspection are refused. Nested context validation uses the existing strict manifest contract.

## Identity, amount and time

Existing simulator identity prefixes apply. `disputeId` uses `sim_dispute_`; `feeId` uses `sim_fee_`. Each suffix is 1–64 ASCII characters, starts with a letter/digit and continues with letters/digits/underscore/hyphen. All explicit capture identities, provider/merchant/payer/payment/authorization/source/scenario/currency relationships must match the selected capture. A fee must also match the selected dispute ID.

`reason` is 1–256 printable ASCII characters without leading/trailing spaces. Accepted quotes, backslashes and internal spaces are preserved. This is explicit reason text, not a provider reason-code registry or a judgment of fault.

`feeAmountMinorUnits` is a positive canonical decimal string of 1–128 digits: no zero, leading zeros, signs, decimal points, exponent, whitespace or numeric coercion. Currency is exactly three uppercase ASCII letters and must match capture/dispute currency; there is no currency catalogue or FX conversion. A fee is a separate declared amount and may exceed the capture amount. It is not deducted from a global balance, added to a principal loss, or subject to the refund ceiling.

Known UTC `eventTime` uses the existing calendar contract. Dispute event time must be at/after capture; fee event time must be at/after dispute. Whole seconds and `.000` compare as equal while retaining supplied spellings. `observedAt`, `observationCutoff` and `deliveryOrder` remain independent declared metadata: no sorting, filtering, correction or real clock is used.

## Bounded canonical context and output

Opened accepts exactly one canonical M05.03 capture manifest: two sources and two deliveries (authorization, capture). It reconstructs that owned format, including nested authorization, and compares the entire canonical manifest. Opened appends one source/delivery, producing three.

Fee accepts exactly one canonical M05.09 opened manifest: three sources/deliveries. A fixed-depth reconstruction verifies the opened record and original capture, then appends one fee source/delivery, producing four. Recomputed hashes do not make altered noncanonical wires valid. A different fully canonical declaration is still synthetic input; ownership does not prove authenticity or completeness.

Additional disputes, a second fee, refund/payout context, missing context, wrong kind/version/references, collisions and altered canonical bytes are refused. Every previous source payload/hash, metadata, delivery and array order is preserved. Results are detached and deeply frozen; input is not mutated. Reusing the same input is deterministic and does not consume shared funds or IDs.

Opened wire uses fixed compact JSON order: schemaVersion, synthetic, eventType, sourceId, sourceOccurrenceId, providerId, merchantId, payerId, paymentId, authorizationId, captureId, disputeId, reason, currency, captureReference, eventTime. Version is `m05.09-dispute-opened-record.v1`, eventType `dispute_opened`, generator version `m05.09-dispute-opened.v1`.

Fee wire retains the common identity prefix through disputeId, then feeId, fee (`minorUnits`, `currency`, `representation: integer_minor_units`), captureReference, disputeReference, eventTime. Version is `m05.10-chargeback-fee-record.v1`, eventType `chargeback_fee`, generator version `m05.10-chargeback-fee.v1`. Each reference contains exact sourceId, sourceOccurrenceId and payloadSha256. SHA256 covers exact UTF-8 wire bytes. Goldens in the tests were independently composed with Python, not obtained by invoking the implementation.

## Demonstration and acceptance

A supplied capture of1250 GBP minor units (£12.50) gains a `goods_not_received` dispute and a fee of150 GBP minor units (£1.50): source/delivery counts2→3→4. The capture remains unchanged. A fee of1500 (£15) is also valid because it is an independent declaration. Fee creation without an opened dispute or with a different dispute ID is refused.

From the repository root, run the existing safe test:

```powershell
pnpm --filter @causalledger/simulator exec vitest run test/dispute.test.ts -t demonstration
```

The named demonstration should pass; other cases are intentionally filtered. Full validation uses the package test/typecheck/lint/build/format scripts. If pnpm is missing, use the repository's existing environment setup; do not alter expected results or install a different version. All inputs are disposable in-memory synthetic data, so rerunning needs no data recovery. Revert the unit through human review if rollback is needed.

M05.09 evidence covers strict reason/identity/time validation, exact capture ownership, preservation, immutable snapshots and independent literal wire/hash. M05.10 covers fee bounds and independence, exact selected dispute references, fixed-depth canonical reconstruction, refusal of absent or malformed contexts and independent literal wire/hash. Shared tests cover source/delivery collisions, hostile descriptors and arrays, actual caller mutation during context inspection, metadata independence, deterministic reuse and no partial acceptance. Type tests and AST ownership tests retain the financial authority boundary.

M05.11 and later simulator behavior remain unimplemented. Future incident/replay/evaluation consumers may use these synthetic records; those integrations are not claimed by this unit.
