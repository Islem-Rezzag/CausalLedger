# Account schema: M04.01

This is the implemented `packages/ledger` metadata boundary. `validateAccountCandidate(unknown)` validates one caller-supplied account snapshot; `validateAccountCatalog(unknown)` validates a supplied array and rejects every repeated account ID. Neither function creates accounts, stores records, posts entries, computes balances, authorizes an owner, or establishes financial truth.

## Contract

Every field below is required. Unknown fields, including legacy-looking aliases, reject. No values are trimmed, case-folded, coerced, defaulted, inferred or generated.

| Field | Contract |
| --- | --- |
| `contractVersion` | Exact string `m04.01-account.v1`. |
| `id` | `acct_` followed by a canonical 26-character uppercase Crockford ULID. First character must be 0-7 to fit 128 bits; I/L/O/U are excluded. IDs are supplied, never generated or used as evidence of time/identity. |
| `ledgerId` | `ldg_` followed by the same ULID encoding. Identifies a ledger namespace; no ledger object, tenant, database or access check is implied. |
| `name` | Display text, 1-120 UTF-16 code units, no surrounding whitespace or ASCII control characters. Names never determine category, owner or currency. |
| `category` | `asset`, `liability`, `equity`, `revenue`, or `expense`. These are accounting classes, not the later business account roles or a configured chart of accounts. |
| `normalBalance` | Explicit `debit` for asset/expense; `credit` for liability/equity/revenue. Contradictions reject. Contra-account overrides are unsupported in this version. This identifies the normal side; it does not calculate a signed balance or interpret a MoneyEvent amount. |
| `currency` | Exact uppercase `USD`, `EUR` or `GBP`. This deliberately limited subset of ISO 4217 codes is independent of M03's looser three-letter shape check. Other codes require a reviewed contract extension; no FX or minor-unit conversion exists. |
| `owner` | Exactly `{ namespace, id }`. Namespace: lowercase ASCII letter followed by up to 63 lowercase letters, digits, dots or hyphens. ID: 1-128 ASCII identifier characters, starting alphanumeric and continuing alphanumeric, dot, underscore, colon or hyphen. The pair is an opaque caller-supplied reference, not proof of identity, consent or authorization. |
| `status` | `active` or `closed` metadata. Accepting either value does not create/close an account, authorize a transition, assert a zero balance, or prove an account can receive entries. |

Category and normal-side relationships are also represented as a TypeScript discriminated union. Validated account/ledger IDs have separate brands; brands and `readonly` are compile-time aids, not security controls.

## Identity and lifecycle boundaries

Account IDs are globally unique within any supplied catalog, even across different ledger IDs, owner references or currencies. Identical duplicates also reject; deduplication and posting idempotency are not part of this contract. A failed catalog returns no partial account set. An empty catalog is valid and input order is preserved. Separate calls cannot detect conflicts outside the supplied snapshot: durable uniqueness, referential integrity, concurrency, authorization and immutable storage belong to later reviewed slices.

This schema describes a snapshot, with no lifecycle transition or update API. Future storage must preserve original records and enforce reviewed rules for changes to identity, ownership, category, currency and status. Closed-account metadata alone is insufficient to prove eligibility for closure or posting. No amounts, balances, opening entries, timestamps, approval records or provenance are invented from account metadata.

Cash clearing, provider clearing, customer liability, fee expense and revenue account configuration/examples remain M04.10-M04.14. Their category terms here do not mark those slices implemented. LedgerTransaction and LedgerEntry remain M04.02 and M04.03.

## Validation behavior

Inputs are already-parsed data, not JSON text. Plain objects (including null-prototype dictionaries) and enumerable own data fields are accepted; class instances, accessors, hidden required fields, unknown fields and symbols reject. Catalogs must be ordinary dense arrays without extra properties. Getters are not executed. This is a data-validation boundary, not a sandbox for hostile JavaScript or Proxy trap execution; untrusted serialized bytes must be parsed before calling it.

Success returns `{ ok: true, value, issues: [] }`. The returned snapshot, nested owner and catalog arrays are detached from the input and frozen. Failure returns `{ ok: false, issues }` with no value; issues contain `code`, `path` and a stable message, sorted by path then code using code-unit order. Validation is pure and repeatable, and never writes to the caller's input. Runtime policy constants and returned results are frozen. Freezing metadata is not durable evidence immutability.

## Executable synthetic demonstration and validation

Run `corepack pnpm --filter @causalledger/ledger test` and `corepack pnpm --filter @causalledger/ledger typecheck`. The test named “demonstrates valid synthetic accounts and refuses conflicting ownership” accepts two explicitly defined accounts and rejects a repeated ID with a different owner. All sample identities are controlled test values and create no financial or persisted records.

Tests cover supported class/side/currency/status combinations; missing, contradictory and unknown fields; ULID encoding and overflow; owner and lifecycle limits; invalid/coerced values; duplicate/conflicting identities; atomic catalog failure; deterministic issues; getter refusal; immutable detached snapshots and type-level boundaries. No balanced posting, balance query, reversal, storage or database validation is claimed by this slice.
