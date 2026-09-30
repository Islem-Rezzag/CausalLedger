# LedgerEntry schema: M04.03

`packages/ledger` owns one-line wire validation and supplied-reference consistency. `validateLedgerEntryCandidate(unknown, unknown)` receives an already-parsed entry and explicit `{ transaction, accounts }` context, returning a detached frozen internal snapshot with exact bigint money, or sorted deterministic issues without a partial value. It performs no posting, balancing, storage or approval.

## Versioned wire and internal contract

All fields are required. Unknown fields/aliases, getters, hidden/inherited fields, symbols, class instances and coercion reject. No values are generated, defaulted, trimmed or inferred. Plain null-prototype records are supported; this parsed-data boundary is not a sandbox for arbitrary Proxy code.

| Field | Contract |
| --- | --- |
| `contractVersion` | Exact `m04.03-ledger-entry.v1`, including this version's money encoding and range. |
| `id` | Supplied `ent_` plus canonical uppercase Crockford ULID: 26 characters, first 0-7, excluding I/L/O/U. Distinct from transaction, account, ledger, event and receipt identity. |
| `transactionId` | Canonical `txn_` ULID, equal to the supplied validated header ID. |
| `ledgerId` | Canonical `ldg_` ULID, matching the header and referenced account. |
| `accountId` | Canonical `acct_` ULID resolving within the supplied validated Account catalog. |
| `side` | Explicit `debit` or `credit`. Independent of the account's normal balance; neither side is inferred from names, amount signs or MoneyEvents. |
| `amount` | Exactly `{ representation, minorUnits, currency }`. Representation is `integer_minor_units`; currency is exact USD/EUR/GBP, matching the referenced account. |

Wire `minorUnits` is a positive canonical ASCII decimal **string** from `1` through `9223372036854775807` inclusive. Zero, negative, signed, leading-zero, spaced, fractional and exponent strings reject, as do Number (even safe integer), bigint, boxed and coercible values. Strings exceeding the bounded range reject before bigint construction. The internal validated amount is a readonly branded **bigint**; it is never converted to Number. For example `9007199254740993` becomes exact `9007199254740993n`.

This per-line range is compatible with a future signed 64-bit database value; no storage encoding, migration or database guarantee exists now. M04.04 must aggregate with exact bigint, including totals above the per-line bound. M04.05 must implement and test its reviewed durable money representation, range, atomicity and rollback in disposable Postgres. Changing this wire policy requires reviewed versioning. Internal bigint snapshots are not directly JSON serializable; no serializer is implemented here.

## Context and reference boundary

Context is exactly `{ transaction, accounts }`. Existing deterministic validators validate the entire supplied header and Account catalog, rejecting duplicate Account IDs and malformed metadata. Entry validation additionally checks exact account/ledger ID encoding. Catalogs must be ordinary dense data arrays. Nested context failures use `invalid_context` with the original nested path under `$.context`.

The entry transaction/ledger references must match the supplied header. The account must exist in the supplied catalog, belong to that ledger and have the same supported currency as the entry. Other-ledger accounts can exist in the supplied catalog; they cannot satisfy the referenced account check. A transaction header has no currency, so no transaction currency is invented.

These are caller-supplied snapshots. Matching them does not prove durable existence, current membership, ownership, permission, receipt authenticity or source occurrence. Either entry side is valid for any normal-side account. Closed-account and posted-header metadata do not prove posting eligibility or execute lifecycle rules. Source/event/receipt provenance remains in the header; no mapping or duplicated evidence is generated.

## Results and deferred guarantees

Success is `{ ok: true, value, issues: [] }`; failure is `{ ok: false, issues }` without `value`. Issues have stable code/path/message, sorted by path then code with code-unit order. Results, entry amounts, issue arrays and issues are frozen and detached. Inputs and contexts are unchanged. Type brands/readonly aid compile-time consistency and provide no security authority.

A valid line is not a balanced journal, posting, uniqueness check across entries, balance query, durable reference, idempotent outcome or exactly-once economic occurrence. Entry groups and debit-equals-credit enforcement belong to M04.04, immutable atomic storage to M04.05, durable retry to M04.08 and linked reversals to M04.09. Agents receive no write/approval authority.

## Executable synthetic demonstration

Run `corepack pnpm --filter @causalledger/ledger test` and `corepack pnpm --filter @causalledger/ledger typecheck` in VS Code. The test **demonstrates an exact synthetic debit and refuses account currency drift** supplies a pending header, USD asset account and debit entry with wire amount `1250`. The returned amount is exact `1250n`. Changing the entry currency to EUR rejects as `currency_mismatch` at `$.amount.currency`, without a partial value. Controlled test identities create no financial or persisted records.
