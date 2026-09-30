# LedgerTransaction schema: M04.02

`packages/ledger` owns this transaction **header metadata** boundary. `validateLedgerTransactionCandidate(unknown)` accepts already-parsed data and returns either a detached frozen LedgerTransaction snapshot or deterministic issues without a partial value. It does not create a journal, inspect entries, post money, authenticate evidence, persist records or approve an action.

The contract uses the M01 ledger vocabulary and ADR-0008 identity direction. Settlement, reconciliation, incident and out-of-scope vocabulary remain dependency boundaries from the original specification; no adjacent workflow is implemented here.

## Required contract

All fields below are required. Unknown fields and aliases reject. No identifiers, clocks, retry keys, ownership, money or approval are generated. There is no trimming, case folding, defaulting or coercion.

| Field | Contract and meaning |
| --- | --- |
| `contractVersion` | Exact `m04.02-ledger-transaction.v1`. |
| `id` | `txn_` plus canonical uppercase Crockford ULID: 26 characters, leading digit 0-7, excluding I/L/O/U. Caller-supplied journal identity, distinct from receipt and MoneyEvent identity. |
| `ledgerId` | Same canonical `ldg_` identity convention as Account. A ledger namespace reference; no lookup, owner authentication, account membership or cross-book authorization is proven. |
| `status` | `pending`, `posted`, `rejected` or `voided`, as caller-supplied snapshot metadata. `pending` describes a proposed header; `posted` asserts a source state; `rejected`/`voided` assert refusal/cancellation. None executes or verifies that state, a transition, approval, balanced entries or storage. Reversed/adjusted metadata and original-transaction links require later reviewed schema work. |
| `effectiveAt` | Supplied accounting-effective instant. |
| `recordedAt` | Supplied record instant, not a timestamp assigned by this validator. |
| `idempotencyKey` | Opaque canonical ASCII reference, 1-128 characters: alphanumeric first, then alphanumeric, dot, underscore, colon or hyphen. Intended scope is `(ledgerId, provenance.source.namespace, idempotencyKey)`. No durable key reservation, payload identity, deduplication, concurrency or retry result exists here. |
| `provenance` | Exactly `{ source, moneyEventIds, evidence }`, described below. |

Both clocks must be canonical `YYYY-MM-DDTHH:mm:ss.sssZ` strings with real Gregorian dates in years 0001-9999. UTC offsets, missing milliseconds, leap seconds, invalid calendar dates, whitespace and normalization candidates reject. The clocks have separate meanings: late recording and future accounting-effective instants are both structurally possible, so no relative ordering or wall-clock plausibility is asserted.

## Provenance references

- `source`: exactly `{ namespace, id }`. Namespace is a lowercase ASCII letter followed by up to 63 lowercase letters, digits, dots or hyphens. ID follows the same 1-128 character opaque ASCII rule as the retry key. This identifies a caller-supplied originating system and record; it is not an account owner or authentication identity.
- `moneyEventIds`: explicit dense array of canonical `evt_` ULIDs. An empty array permits direct source records without forcing event-to-posting mapping. Duplicates reject. A structurally valid event reference does not prove event existence, authenticity, posting eligibility or uncertainty resolution.
- `evidence`: nonempty dense array of exactly `{ receiptId, contentHash }`. Receipt IDs are canonical `rcpt_` ULIDs. Hashes use the existing `sha256:` plus 64 lowercase hexadecimal convention. Repeated receipt identity/same hash rejects as `duplicate_reference`; repeated receipt identity/different hash rejects as `conflicting_evidence_reference`. Distinct receipts sharing a hash are accepted: duplicate bytes/delivery need not be duplicate economic occurrences.

Receipt identity, event identity and transaction identity are separate domains. References and hashes are checked as metadata only; this function does not fetch bytes, recompute hashes, verify receipt locators, preserve raw evidence, build quarantine or map source records. Those owning slices must resolve their contracts explicitly. A balanced journal later will still not prove that an economic occurrence happened exactly once.

## Input and output policy

Plain objects (including null-prototype dictionaries) with enumerable own data properties are supported. Arrays must be ordinary dense arrays without extra properties. Class instances, inherited/hidden fields, symbols and accessors reject; getters are not executed. Like Account validation, this is a parsed-data boundary, not a sandbox for hostile JavaScript or Proxy trap execution.

Success: `{ ok: true, value, issues: [] }`. Failure: `{ ok: false, issues }`, without `value`. Issues have stable `code`, `path` and message, ordered by path then code using code-unit order. Results, nested records, arrays and issues are frozen and detached; the input is unchanged. Compile-time identity brands/readonly are aids, not authorization or storage enforcement.

## Demonstration and deferred guarantees

Run `corepack pnpm --filter @causalledger/ledger test` and `corepack pnpm --filter @causalledger/ledger typecheck` in VS Code. The test **demonstrates a synthetic header and rejects conflicting receipt evidence** supplies a pending header for ledger `ldg_01ARZ3NDEKTSV4RRFFQ69G5FAV`, source `synthetic.provider/capture-001`, one event and one receipt/hash reference. It accepts the header; a second reference to that receipt with another hash fails at `$.provenance.evidence[1].contentHash` without partial output. These controlled identifiers/hashes create no records or financial facts.

M04.03 owns entries and amount/currency representation; M04.04 owns balance enforcement; M04.05 owns atomic immutable Postgres storage; M04.08 owns durable retry/payload/concurrency rules; M04.09 owns linked reversals. No amount is introduced or converted to Number here. Storage tests must evolve the existing database guards within their authorized scope, using disposable Postgres. Agents retain no posting, mutation, invariant-override or repair-approval authority. No entry/posting/storage/agent runtime is exported by this slice.
