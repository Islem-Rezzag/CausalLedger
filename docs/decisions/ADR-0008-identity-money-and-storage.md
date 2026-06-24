# ADR-0008: Identity, Money, and Storage Direction

## Status

Accepted.

## Context

Future CausalLedger milestones need stable identity, money, and storage conventions before runtime schema and persistence work begins.

This ADR is documentation only. It does not implement a database, ID library, storage layer, evidence runtime, MoneyEvent runtime, ledger runtime, invariant runtime, incident runtime, graph runtime, replay runtime, repair runtime, agent runtime, product API, or product UI.

## Decision

### IDs

Use prefixed ULIDs for future durable identifiers.

Suggested prefixes:

- `rcpt_` for evidence receipts
- `evt_` for canonical MoneyEvents
- `txn_` for ledger transactions
- `inc_` for incidents
- `rpl_` for replay runs
- `run_` for agent or workflow runs
- `prop_` for repair proposals
- `rev_` for human review decisions
- `bndl_` for audit bundles

`request_id` is generated at the API edge.

`correlation_id` is propagated to worker jobs.

### Money

Money is stored as integer minor units.

Currencies use ISO 4217 currency codes.

Floats are forbidden for money.

### Storage

Postgres is the planned system of record.

Raw evidence bytes are stored write-once, keyed by SHA-256 content hash.

Evidence receipts store hash and locator, not raw payload bodies.

Future append-only tables should be enforced by revoking `UPDATE` and `DELETE` from the application role where practical.

## Scope Boundary

- Documentation only.
- No database implementation.
- No ID library implementation.
- No storage implementation.
- No evidence runtime.
- No product/domain behavior.

## Rationale

Prefixed ULIDs keep future IDs sortable, locally generated, and recognizable in logs and evidence bundles without letting ID shape imply financial truth.

Integer minor-unit money avoids floating-point rounding drift and keeps future deterministic validators explicit.

Postgres plus write-once evidence storage preserves a clear boundary between metadata records and raw evidence bytes. Future implementation must still add migrations, access controls, runtime validation, audit logging, and deterministic tests before any storage behavior is claimed.

## Consequences

Future schema work should use these conventions unless a later ADR supersedes them.

Future implementation milestones must validate IDs, money representation, evidence hash handling, append-only behavior, and storage permissions with deterministic tests before claiming runtime behavior.
