# Synthetic webhook delivery scenarios

M05.11–M05.13 are pure, explicit-input scenario builders in `packages/simulator`. They preserve raw source bytes, hashes, prior delivery metadata and array order. They do not contact providers, ingest evidence, post money, deduplicate events or decide incidents. The generic manifest contract remains unchanged.

All roots require own enumerable data fields only, plain or null prototypes, a literal request version, `synthetic: true`, and `contextManifest`. Getters, hidden/symbol/extra fields and malformed nested manifests are refused. Caller scalar metadata is snapshotted before nested context inspection. Arbitrary Proxy code is not sandboxed; inspection exceptions produce frozen refusal results. Context and output are detached and deeply frozen. A failure has stable code/path issues and no partial value. Generic validation issues retain their manifest-relative paths.

## Duplicate delivery and separately declared fault: M05.11

`generateDuplicateWebhook` requires version `m05.11-duplicate-webhook-request.v1`, `originalDeliveryId`, and a complete `delivery` descriptor. The original must exist and refer to a provider source. The appended delivery uses the exact same source ID, occurrence ID and record ID, with new delivery ID, receipt descriptor ID and delivery order. Sources and earlier deliveries remain intact. No economic event is added.

`generateFaultyDuplicateWebhook` uses version `m05.11-faulty-duplicate-webhook-request.v1` and also requires a complete `sourceRecord`. It must be a provider record from the same source with a different occurrence and record identity. The appended delivery must cite this supplied new record. Even identical payload bytes/hashes stay distinct when the occurrences differ. The caller declares that the second occurrence represents an economic fault: the builder checks structure and linkage, never proves duplicate posting by interpreting opaque payloads. It emits no ledger entry.

Both return a versioned `m05.11-13-webhook-scenario.v1` envelope with kind `duplicate_delivery` or `declared_faulty_occurrence`, manifest, the original source tuple/hash reference, original delivery ID and appended delivery ID. There is no automatic deduplication or exactly-once guarantee.

## Delayed delivery: M05.12

`generateDelayedWebhook` requires version `m05.12-delayed-webhook-request.v1` and a complete `delivery`. It appends that explicit descriptor to the preserved manifest. The referenced provider source must have a known event time; observation cannot precede that event time. This is a local scenario rule and does not tighten generic manifest validation.

The sole cutoff authority is `contextManifest.observationCutoff`. The output status classifies the **appended delivery**: `observed_by_cutoff` for observedAt <= cutoff, otherwise `after_cutoff`. Earlier copies may already have been observed. Whole-second and `.000` timestamps compare equally while retaining their supplied spellings. Millisecond, calendar and year boundaries are exact. Event time, delivery order and array order do not substitute for observation time. No sorting, filtering, sleeps or host clock.

## Missing at cutoff: M05.13

`generateMissingWebhook` requires version `m05.13-missing-webhook-request.v1` and `expectedSourceRecordId`. The expected provider source must already exist. No source or delivery is created or removed. The envelope records the exact expected source tuple/hash and cutoff.

If **any** matching delivery is observed at/before cutoff, the missing request is refused. With zero matching declared deliveries, status is `no_declared_delivery` and `omissionDeclared` is true. If all matching deliveries occur after cutoff, status is `declared_after_cutoff` and omissionDeclared is false. All later fixture evidence remains present. This distinction is relative to supplied context; it proves neither permanent absence nor completeness of external evidence. Unknown event time is permitted here: the caller explicitly expects the supplied occurrence; no deadline is inferred from its event time.

## Boundaries and demonstration

Selected occurrence identity `(sourceId, sourceOccurrenceId)` must resolve to exactly one source record. Generic-valid aliases are refused for the selected occurrence, including a sibling with a visible receipt. Unrelated records are preserved. Existing bounds remain256 sources/1024 deliveries; appends beyond them fail atomically. Inputs are synthetic declarations, not authenticated provider evidence.

Scenario metadata and future observations are **test-author information**. These envelopes are not an actor-visible benchmark view, grader implementation or incident verdict. Later benchmark integration must enforce its own visibility boundary.

Run from the repository root:

```powershell
pnpm --filter @causalledger/simulator exec vitest run test/webhook.test.ts -t demonstration
```

The demonstration uses one opaque source record with literal UTF-8 `abc` and its independently known SHA256. It shows one source/two deliveries for a benign repetition, two sources/two deliveries for a declared faulty occurrence, zero receipts for explicit omission, and later receipt evidence becoming visible at the inclusive cutoff. It does not claim those opaque bytes encode a real payment. Expected: one demonstration passes; other named cases are intentionally filtered. Root runs full tests separately. All inputs are disposable in-memory data; rerun requires no cleanup. If pnpm is unavailable, report the error rather than changing expected results or installing tools automatically.

Rollback is a human-reviewed revert of this pure feature. M05.14 settlement CSV and later generators, ingestion, incident investigation, replay and benchmark execution remain unimplemented.
