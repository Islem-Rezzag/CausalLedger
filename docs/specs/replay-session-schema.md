# Replay Session Schema

Placeholder for future replay session schema. No replay engine is implemented yet.

## Domain dependency

Future replay work may use the M01.01 payment lifecycle vocabulary in `docs/domain/payment-lifecycle.md`, the M01.02 ledger vocabulary in `docs/domain/ledger-vocabulary.md`, the M01.03 settlement vocabulary in `docs/domain/settlement-vocabulary.md`, the M01.04 reconciliation vocabulary in `docs/domain/reconciliation-vocabulary.md`, the M01.05 incident vocabulary in `docs/domain/incident-vocabulary.md`, and the M01.08 human review states in `docs/domain/human-review-states.md` when reconstructing payment, ledger, settlement, payout, bank-posting, reconciliation, first-divergence, reopening, review, and incident timeline state over time. This note is a dependency pointer only; it does not define replay inputs, ordering, snapshots, or runtime behavior.
