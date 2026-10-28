# Simulator Package

M05.01 implements a private package foundation with readonly synthetic source, delivery, validation-result and versioned manifest contracts. validateSimulatorManifest checks unknown caller input, references and exact UTF-8 integrity and returns a detached, deeply frozen manifest or stable issues with no partial value.

M05.02 adds only generatePaymentAuthorized: one labelled synthetic payment_authorized occurrence and declared delivery from explicit validated inputs. M05.03 adds generatePaymentCaptured: one full or partial capture backed by an exact generated authorization, preserving its source/delivery. M05.04–06 add generatePayoutCreated/Paid/Failed with full gross capture membership and preserved contradictory provider reports. M05.07–08 add generateRefundCreated/Paid for bounded full/partial/multiple refund histories against one supplied capture. M05.09–10 add generateDisputeOpened/ChargebackFee for one explicit dispute and separate fee against a captured payment. Other provider/bank generators, seed execution, delivery scheduling, CSV and CLI remain unimplemented. This package does not connect to a provider, ingest receipts or store evidence. It has no financial-write API, ledger dependency or agent tool. The generic validator treats payloads as opaque; authorization/capture generators validate their owned wire and exact amount/currency relations. Neither establishes source authenticity or economic truth.

## Contract

Version: m05.01-simulator-manifest.v1. Every manifest declares synthetic:true, a caller-supplied scenarioId, generatorVersion, UTC observationCutoff, sourceRecords and deliveries. Empty lists are valid and do not invent missing observations. The entire checked manifest is returned; no cutoff filtering, deduplication, chronology correction or missing-evidence verdict is performed.

Identifiers use a simulator-local prefix and a 1–64 character ASCII token starting with a letter/digit, then letters/digits/underscores/hyphens:

| Field               | Prefix          | Meaning                                                                  |
| ------------------- | --------------- | ------------------------------------------------------------------------ |
| scenarioId          | `sim_scenario_` | Supplied scenario description identity                                   |
| sourceId            | `sim_source_`   | Supplied synthetic source; one provider/bank type per source             |
| sourceOccurrenceId  | `sim_occ_`      | Declared source occurrence, possibly represented by multiple raw records |
| sourceRecordId      | `sim_record_`   | Unique raw record descriptor within the manifest                         |
| deliveryId          | `sim_delivery_` | Unique delivery description                                              |
| receiptDescriptorId | `sim_receipt_`  | Unique synthetic receipt description; no actual durable receipt          |

The generic validator generates no IDs, clocks or source events; the authorization and capture generators create their declared synthetic raw occurrences only. These local descriptors do not allocate ADR-0008 durable `rcpt_`/`evt_` IDs and do not establish actual evidence receipt ingestion.

Each source has sourceType provider/bank, eventTime (UTC string or null for explicitly unknown time), and payload: encoding utf-8; mediaType application/json, text/csv or text/plain; text; lowercase 64-character SHA256. Hashing covers exact supplied UTF-8 bytes. BOM, CRLF, whitespace, composed/decomposed Unicode and empty text are preserved. Lone UTF-16 surrogates are refused rather than silently replaced. Payload text is not parsed or reserialized.

Delivery descriptions cite a complete matching source/occurrence/record tuple, supplied observedAt and deliveryOrder. Orders are unique nonnegative safe integers through 9007199254740991; negative zero is refused. Noncontiguous orders are valid; arrays are retained without sorting. Repeated delivery descriptions can reference one source record; distinct records can share an occurrence. This is identity consistency, not duplicate economic occurrence detection.

UTC strings use real calendar dates in years 0001–9999 and either whole seconds or exactly three fractional digits, ending in Z. Offsets, leap seconds and trailing whitespace are refused. Source event time is independent of observed time. Declared delivery times may precede source time or exceed cutoff; they remain synthetic declarations in the full manifest, with no claim that a future delivery is visible or actually received.

Limits: 256 source records, 1024 deliveries and 65536 UTF-16 code units per payload. generatorVersion is a 1–64 character lowercase ASCII token starting with a letter, then letters/digits/dot/hyphen; it is declared metadata, not a compatibility/authenticity verdict.

Inputs must use plain or null-prototype own-data objects and dense ordinary arrays. Unknown/missing fields, accessors, hidden/symbol fields, classes, decorated arrays, bad identities/references/hash/version/time and duplicate record/delivery/receipt/order identities are refused. Ordinary getters are not evaluated. This is a data contract, not an isolation sandbox for arbitrary JavaScript Proxy code. Unexpected descriptor/prototype traps return invalid_object.

## Executable synthetic example

The demonstration supplies opaque text abc with the independently computed SHA256:

    ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad

The supplied generic manifest validates. Changing its text to abd while retaining the original hash is refused as hash_mismatch, with no accepted value. No payment event, evidence store or ledger is involved.

Run from the repository terminal in VS Code:

    pnpm --filter @causalledger/simulator test -- test/contract.test.ts

The coordinator runs this test for the user. Unit tests also check independent Unicode/CRLF/BOM hashes, calendars, strict unknown input, identity/reference errors, count limits, immutable detached results and no host clock/random/network dependence. Type-negative tests enforce readonly contracts; AST ownership tests restrict runtime imports to owned modules and deterministic node:crypto SHA256.

## Ownership and next slice

packages/simulator owns this offline foundation. Connectors, evidence, canonical events and ledger retain their separate boundaries. All previous source/tests/migrations/runner/fixtures are preserved. Later amount/currency/event-kind/seed/CSV/CLI rules belong to their original M05 owners and require versioned compatibility decisions.

Active plan: plans/active/CLP-0006-m05-provider-and-bank-simulator.md. M05.01 human PR82 merge is verified; M05.02 payment authorization is human-merged in PR83; M05.03 adds one synthetic authorization-backed capture. See ../../docs/specs/simulator-payment-authorized.md for complete request/context/error/byte contracts. See ../../docs/specs/simulator-payment-captured.md for the capture contract. M05.03 human PR84 merge is verified. M05.04–06 payout is human-merged in PR86. M05.07–08 refund is human-merged in PR87. Current M05.09–10 dispute/fee unit remains subject to independent review/CI/learning and human merge;11+ is unstarted.

## Payment authorization example

Supply all20 explicit request fields and matching6-field context. amountMinorUnits "1250" with USD produces a synthetic authorization record; "12.50" is rejected as invalid_amount without a partial value. Positive canonical strings through128digits are exact; currency is3 uppercase ASCII letters with per-call equality, not an ISO catalogue lookup. Required known UTC event time and independent declared observation clocks are preserved. The result is frozen and hashed, with no actual payment authorization or ledger action.

    pnpm --filter @causalledger/simulator test -- test/payment-authorized.test.ts

## Payment capture example

Supply the21-field capture request with a valid generated02 authorizationManifest, matching identities/currency, a distinct capture occurrence, known event time at/after authorization and exact positive amount. A1250 USD authorization accepts a1000 USD partial capture and refuses1251 USD. Output preserves the original source/delivery exactly and appends the capture citing the original raw SHA256. It has no cumulative remaining-budget or real money authority. Full contract: ../../docs/specs/simulator-payment-captured.md.

    pnpm --filter @causalledger/simulator test -- test/payment-captured.test.ts

## Synthetic payout exercise

See [the payout contract](../../docs/specs/simulator-payout-lifecycle.md). Explicit captures1000+250 USD minor units create1250;1251 is refused. Provider paid/failed reports preserve creation and contradictory evidence; paid does not prove bank receipt. Capture membership is full gross only,1–16 exact owned03 manifests, with no fees/netting/FX/global consumption. Existing safe demonstration:

    pnpm --filter @causalledger/simulator exec vitest run test/payout.test.ts -t demonstration --silent=false

## Synthetic refund exercise

See [the refund contract](../../docs/specs/simulator-refund-lifecycle.md). A captured1250 GBP minor units (£12.50) supports refunds500 (£5.00) and750 (£7.50); an additional1p is refused. Paid reports preserve source evidence and do not count again against the supplied budget. At most16 refunds in one explicit capture history; no global balance or customer receipt assertion.

    pnpm --filter @causalledger/simulator exec vitest run test/refund.test.ts -t demonstration

## Synthetic dispute and fee exercise

See [the dispute and fee contract](../../docs/specs/simulator-dispute-and-fee.md). A capture of1250 GBP minor units (£12.50) gains one explicit dispute reason and a separate fee of150 (£1.50), preserving2→3→4 sources/deliveries. The fee may exceed the capture because it is independent; no principal chargeback, dispute outcome or actual debit is inferred. Missing dispute context or a mismatched dispute ID is refused.

    pnpm --filter @causalledger/simulator exec vitest run test/dispute.test.ts -t demonstration
