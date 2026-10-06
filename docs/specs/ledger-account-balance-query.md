# M04.06 Account balance query

## Status and boundary

Contract `m04.06-account-balance.v1`, owned by `packages/ledger`. Implemented and accepted by local/actual PostgreSQL tests and overall independent QA; final SHA-bound merge-readiness proof is maintained in sole PR #67 and the active plan/current status. Human merge remains required. This is an exact read of selected stored entries, not posting, account creation, repair approval, evidence authentication or financial truth. M04.07 transaction lookup and later rows remain unimplemented until their own merge gates.

## Input and output

`validateLedgerAccountBalanceQueryCandidate(unknown)` validates a plain data object containing exactly `contractVersion`, `account`, `signConvention` and `cutoffs`. `account` is a full explicitly supplied unchanged M04.01 Account candidate. `signConvention` must be `account_normal_positive`. `cutoffs` contains exactly `effectiveThrough` and `recordedThrough`; neither has a default. No getters, hidden/inherited fields, unknown fields or coercion are accepted. Validation detaches and deeply freezes a successful selection and produces stable frozen issues on refusal.

`createLedgerAccountBalanceReader(explicitConnectionUrl)` requires an explicit complete PostgreSQL URL with credentials, host, positive port and database; query/fragment options and ambient database configuration are excluded. The frozen reader exposes only `query(unknown)` and `close()`. It has no append, arbitrary SQL, approval or application method. Use a restricted read-capable identity; network targets and credentials are caller configuration, not inferred by an agent.

Success contains a frozen `LedgerAccountBalance`: the version and validated query, `debitMinorUnits`, `creditMinorUnits`, signed branded `balanceMinorUnits`, `entryCount`, `transactionCount`, diagnostic `databaseSnapshot` and `statusScope: all_stored_headers`. Money and counts are exact bigint. The balance brand differs from the positive per-entry amount brand: zero, negative values and totals above 9223372036854775807 are legitimate aggregates. These snapshots are not directly JSON serializable; callers must use an explicit decimal-text transport if needed. No new transport is implemented here.

Invalid input returns `ok:false` with issues before connecting. A contributing category/normal-side conflict returns `conflicting_account_snapshot` with no partial balance. Connection, SQL, malformed aggregate or commit failure throws sanitized `LedgerAccountBalanceReadError`; only a canonical five-character uppercase/digit SQLSTATE may accompany its fixed message. Failed sessions roll back when begun and are discarded; rollback failure preserves the sanitized original error. There is no automatic retry or partial acknowledgement. A read-only query cannot establish a financial approval.

## Deterministic arithmetic and selection

Selection requires all three exact stored fields: ledger ID, account ID and currency. Account IDs may overlap across ledgers or carry other currencies in different journal snapshots; none may leak into this query. Only entries whose headers satisfy both cutoffs contribute. Every stored header status contributes equally; caller-supplied `posted` metadata does not prove posting eligibility or approval.

For debit-normal asset/expense accounts, balance is debit total minus credit total. For credit-normal liability/equity/revenue accounts, balance is credit total minus debit total. Reuse of the Account validator enforces the category/normal-side mapping. PostgreSQL casts positive int64 entries to numeric before summing and returns canonical decimal text. The reader converts that text to bigint and subtracts exactly, without Number money or rounding.

Every selected stored Account snapshot must agree with the supplied category and normal side. A mismatch refuses the whole result. No latest-snapshot choice, ULID ordering assumption or inferred normal side exists. Name, owner and active/closed fields remain supplied context, not an authoritative account registry or current lifecycle assertion. Valid closed metadata is accepted for historical reads. Empty selections return zeros and a snapshot token; zeros do not prove account existence, membership or authorization.

## Clocks and committed snapshot

Both cutoffs must be real canonical UTC millisecond strings in the unchanged proleptic Gregorian years0001-9999 domain, e.g. `2024-02-29T12:00:00.001Z`. Bounds are inclusive, and comparisons use explicit `COLLATE "C"` on canonical strings. Effective and recorded clocks are independent; there is no inferred ordering between them. A journal is selected only if `effectiveAt <= effectiveThrough` AND `recordedAt <= recordedThrough`.

The reader owns a `REPEATABLE READ READ ONLY` transaction. One parameterized aggregate SELECT computes both sums, both counts, contributing metadata conflicts and `pg_current_snapshot()` from the same committed PostgreSQL MVCC snapshot. In-progress or rolled-back journals do not contribute; concurrent appends are observed only as complete committed groups. The query makes no dependency on insertion or transaction-ID order.

`recordedAt` is caller-supplied header metadata, not a database commit watermark. A later commit with a backdated recorded/effective time can change a later read at the same cutoffs. `databaseSnapshot` is an ephemeral diagnostic token; this API cannot reopen it after the transaction ends and does not implement persistent replay, a stable historical commit boundary, locking writers or a balance cache. An operational as-of-commit/history feature needs a future explicit contract.

## Storage and privileges

No migration, table, function, mutable balance state, index, dependency or grant is added. This reader uses existing M04.05 ledger entries, headers and journal-local Account snapshots and existing SELECT privileges. M04.01-M04.05 schemas, append behavior, tests, provenance and migration are preserved. Aggregation scans eligible durable entries; no performance/SLA claim or global authorization policy is supplied.

## Executable learning and acceptance

Unit and durable tests demonstrate a debit-normal synthetic account with debit1250 and credit250, producing balance1000 and counts2/2. Its counter account has balance-1000. A request with an inferred sign or malformed cutoff rejects without partial totals; selected category/normal-side drift also refuses the entire result. These are owned synthetic amounts, not real money or raw evidence.

`pnpm --filter @causalledger/ledger test` runs pure/unit/driver-double checks; `typecheck` verifies the distinct signed aggregate brand and query-only reader boundary. Doubles do not prove SQL behavior. `pnpm test:ledger-storage` runs the unchanged64 storage tests, then the new balance PostgreSQL suite sequentially in the same explicitly owned disposable PostgreSQL17 database. Missing explicit configuration fails rather than skips or falls back. The runner retains migration up/down/up, exact schema inspection and identity-checked owned cleanup. CI supplies this environment; local Docker is unavailable.

Durable acceptance covers empty selections, all five categories, exact huge/negative/zero totals, ledger/account/currency isolation, all stored statuses, independent inclusive cutoffs and leap/year bounds, conflict selection, supplied context, uncommitted/rolled-back/backdated visibility and consistent totals/counts during concurrent appends. Control tests retain each historical lifecycle refusal, exact PR66 merge provenance, all prior authority, package ownership and the no07-before06-merge gate. Full results and the final SHA are recorded in the sole PR and handoff.
