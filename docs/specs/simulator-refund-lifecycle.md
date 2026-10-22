# Synthetic refund lifecycle (M05.07–M05.08)

This private simulator produces deterministic synthetic provider evidence. The original captured payment, each refund creation and each paid report remain separate records. It executes no refund, ledger reversal, repair approval, bank action or evidence-store write.

## Public requests and result

`generateRefundCreated(unknown)` and `generateRefundPaid(unknown)` return the existing frozen manifest result: `{ok:true,value,issues:[]}` or `{ok:false,issues}` with no partial value. See the exported readonly `RefundCreatedRequest`, `RefundPaidRequest`, `RefundResult` and `RefundIssue` in `packages/simulator/src/refund.ts`.

Both requests require exactly22 own enumerable data fields: `schemaVersion`, `synthetic`, `scenarioId`, `observationCutoff`, `sourceId`, `sourceOccurrenceId`, `sourceRecordId`, `eventTime`, `deliveryId`, `receiptDescriptorId`, `observedAt`, `deliveryOrder`, `providerId`, `merchantId`, `payerId`, `paymentId`, `authorizationId`, `captureId`, `refundId`, `amountMinorUnits`, `currency`, `contextManifest`. Unknown/hidden/symbol/accessor fields and non-plain prototypes are refused; null-prototype objects are allowed. Root scalar data is snapshotted before context inspection. No getter authority is evaluated.

Request versions are `m05.07-refund-created-request.v1` and `m05.08-refund-paid-request.v1`; raw records use the corresponding `-record.v1`, generator versions `m05.07-refund-created.v1` and `m05.08-refund-paid.v1`. `synthetic` must be literal true. Existing role-specific IDs retain their grammar; `refundId` has `sim_refund_` plus1–64 ASCII alphanumeric/underscore/hyphen characters, first alphanumeric. Source/scenario/delivery identities and known UTC timestamps retain generic rules. Currency is three uppercase ASCII letters matched exactly, not a registry or FX lookup.

## Explicit refund policy

`bounded_capture_refunds.v1` accepts one exact owned M05.03 capture manifest or a canonically reconstructed refund history rooted in it. Full and partial refunds are allowed; at most16 distinct refund IDs and one paid report per ID. Context holds2–34 source records and the same number of deliveries, preserved in supplied order. All created amounts, including pending refunds, count once against the capture. The sum may equal but never exceed that capture; a paid report adds no second consumption. Money uses positive canonical1–128digit decimal strings and BigInt arithmetic; floating-point inputs, signs, leading zeros, zero, whitespace and exponents are refused.

This bound covers only the explicitly supplied history. It does not establish global available funds, completeness, external provider authenticity or shared consumption between calls. Reusing the same input deterministically reproduces the same output. There is no persistent balance, cancellation, failed-refund generator, payout netting, fee or FX behavior.

## Identity, provenance and time

The source, scenario, provider, merchant, payer, payment, authorization, capture and currency must match the supplied original capture. Creation requires a new refundId. Paid targets an existing refundId and must match its amount. The stable refund object is distinct from source occurrences: created and paid each need their own occurrence, source descriptor, delivery, receipt and order identities. Repeated paid reports are refused; future delivery-duplication scenarios are separate milestone work.

Every new raw record cites the original capture's source tuple/hash. Paid also cites the exact selected creation tuple/hash. Input validation first snapshots/detaches the generic manifest, then reconstructs the owned authorization/capture and each refund record iteratively under the same rules. A recomputed SHA256 alone does not make forged status, references, money, time or extra fields valid. Existing source payload bytes/hashes and delivery metadata are preserved exactly; returned objects are detached and deeply frozen.

Created eventTime must be at/after capture eventTime; paid eventTime must be at/after its selected creation. Equivalent second and `.000` timestamps compare equally while retaining original wire spelling. Other refund event times need not be globally ordered: an earlier refund can be paid after another creation is present in supplied history. `observedAt`, `observationCutoff` and `deliveryOrder` remain separate declarations with no sorting/filtering, host clock or inferred chronology. Provider-paid does not prove customer or bank receipt. Missing paid/bank evidence stays incomplete.

## Wire and refusal rules

Compact UTF8 JSON has stable key order: schemaVersion, synthetic, eventType, sourceId, sourceOccurrenceId, providerId, merchantId, payerId, paymentId, authorizationId, captureId, refundId, amount, refundPolicy, captureReference, creationReference (paid only), eventTime. Amount contains minorUnits/currency/representation; references contain sourceId/sourceOccurrenceId/payloadSha256. Lowercase SHA256 is calculated over exact UTF8 bytes. Scenario, observation and delivery metadata stay outside payload bytes.

Refusals use frozen stable code/path issues: invalid/missing root fields and metadata, invalid_amount for noncanonical/excessive creation or mismatched paid money, invalid_reference for wrong context identities or unknown refund, duplicate_identity for repeated refund/paid or colliding source/delivery identity, invalid_value for exceeded16-refund bound or event-time floor, invalid_payload at `$.contextManifest` for non-owned history. Generic validation can report nested source/delivery paths. No partial accepted output is returned.

## Demonstration and review

The named deterministic test uses1250 GBP minor units (£12.50) captured, creates/pays500 (£5.00), then creates/pays750 (£7.50). Source counts are2→3→4→5→6; the original two records remain unchanged. A further1p creation is refused. Neither successful paid report moves real money or establishes customer receipt.

From the repository terminal:

```powershell
& "$env:APPDATA\npm\pnpm.cmd" --filter @causalledger/simulator exec vitest run test/refund.test.ts -t demonstration
```

Expect one passing demonstration and other cases skipped because of the name filter. The full suite runs separately in validation. If pnpm is unavailable, return to the configured project terminal/tool path; do not install or change committed expectations. All inputs are disposable; rerunning needs no data cleanup. No Docker, credentials or paid model call is needed for this exercise.

Reading path: the `run`/`history`/`append` functions in refund.ts, this contract and the named test in refund.test.ts. The tests cover exact bounds, interleaved refunds, pending-versus-paid accounting,128digit arithmetic, hostile inputs, preserved evidence, independent literal wires/hashes and the real demonstration. Technical QA/CI and the user's learning checkpoint are recorded separately in the active plan and sole PR.
