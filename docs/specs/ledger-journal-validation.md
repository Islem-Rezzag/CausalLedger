# Journal equality validation: M04.04

`packages/ledger` owns pure `validateLedgerJournalCandidate(input: unknown, suppliedAccounts: unknown)`. It checks a supplied journal group against supplied Account snapshots. Success returns a detached frozen journal with exact totals; failure exposes only deterministic issues. It does not post, store, approve or mutate a record.

## Wire input and context

The input is exactly `{ contractVersion, transaction, entries }`, with all fields required. Version is `m04.04-ledger-journal.v1`. `transaction` is the complete M04.02 wire header; `entries` is a nonempty ordinary dense array of M04.03 wire entries. The separate mandatory `suppliedAccounts` parameter is a complete ordinary dense Account catalog. No default catalog, generated ID, inferred amount, converted currency or supplied totals are accepted. The validated header's transaction ID identifies the group; no journal ID domain is invented.

Merged header/catalog validators run first; each line is revalidated using the checked supplied header/catalog snapshots. Header errors use `invalid_transaction` under `$.transaction`; catalog errors use `invalid_context` under `$.context.accounts`. Entry errors retain their codes under `$.entries[index]`; shared catalog reference-encoding errors retain the catalog path and identical issues are deduplicated. Entry/reference checks require a structurally valid header and catalog. No totals are computed from invalid or repeated lines.

All identifiers, header evidence/time/retry metadata and line money policies remain unchanged. Line amounts are canonical positive decimal strings, 1 through 9223372036854775807 inclusive, converted only to exact bigint. Internal bigint line snapshots are not wire inputs. Root records support plain/null-prototype enumerable own data; unknown/hidden/inherited/symbol/accessor fields and class instances reject. Arrays refuse holes, extra keys, hidden/accessor elements and subclasses without executing getters. This parsed-data boundary is not a sandbox for arbitrary Proxy traps.

## Deterministic conservation

- Require a nonempty group and reject repeated validated entry IDs, including identical duplicates and conflicts across sides/accounts/currencies. This is local group identity consistency, not durable posting idempotency.
- For every represented currency, require both debit and credit lines and exact equality of debit and credit totals. A single-sided currency rejects as `missing_side`; two-sided unequal totals reject as `unbalanced_currency`. These group failures point to `$.entries` and identify the currency in the message.
- Mixed-currency groups succeed only when each currency independently balances. USD debits cannot offset EUR credits or an opposite discrepancy in another currency. No FX conversion, tolerance or rounding policy exists.
- Aggregate with bigint; totals can exceed the per-line bound. For example two maximum debit lines and two maximum credit lines yield exact 18446744073709551614n on each side. The distinct aggregate brand does not assert a signed-64-bit storage range. M04.05 must separately define and test durable encoding/range/atomicity in disposable Postgres.

Each line must reference the supplied transaction/ledger and an existing supplied same-ledger/currency account. Account normal side does not restrict every entry side. Same-account offsetting lines and supplied closed-account/posted/rejected/voided metadata can be structurally and arithmetically valid; this function does not determine posting eligibility or economic meaning.

## Output, ordering and safety

Success is `{ ok: true, value, issues: [] }`. `value` contains the journal version, validated header, validated entries sorted by canonical entry ID and totals sorted by currency code. Each total is `{ currency, debitMinorUnits, creditMinorUnits }` with readonly branded bigint values. All nested header/entry/amount/total records and arrays are detached and frozen; inputs are unchanged. Successful output is independent of valid entry and catalog order; supplied header evidence ordering is retained.

Failure is `{ ok: false, issues }`, with no partial journal, entries or totals. Issues are frozen and sorted by code-unit path, code, then message; entry indices refer to original input positions. Identical issue triples are deduplicated. Brands/readonly aid compile-time correctness and confer no authority. Internal bigint snapshots have no implemented JSON serializer or durable encoding.

Equality proves internal arithmetic consistency of caller-supplied metadata. It does not prove economic occurrence, evidence authenticity, ownership, permission, exactly-once occurrence, durable uniqueness or approval. This slice introduces no posting/storage/account balance query/transaction query/reversal/idempotency action, invariant engine or agent financial-write/approval tool. M04.05 and later remain separate gated slices.

## Executable synthetic demonstration

Run `corepack pnpm --filter @causalledger/ledger test` and `corepack pnpm --filter @causalledger/ledger typecheck` in VS Code. The test **demonstrates exact synthetic conservation and rejects a one-minor-unit mismatch** supplies a pending header, USD asset accounts and USD debit/credit lines of 1250 minor units. It returns exact 1250n on each side. A credit of 1249 rejects the entire group as `unbalanced_currency`, without partial output. Controlled identities create no persisted or financial records.
