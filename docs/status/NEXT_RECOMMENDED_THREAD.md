# Next Recommended Thread

Thread name:
M04.02 QA - Define LedgerTransaction schema

Precondition:
Builder validation PASS; one PR on `m04-02-ledger-transaction-schema`, base `44f6a833692326d00ed5a9b7479a52dd761af814`. Initial branch/status/origin guard passed clean. Reviewer must rerun guard before any edits and be read-only; coordinator owns scoped fixes.

Scope:
Independently inspect complete diff, the generated M04.02 brief in `plans/active/CLP-0005-m04-double-entry-ledger-core.md`, transaction/Account/domain/evidence contracts and behavioral/type tests. Run ledger and control-plane checks, verify strict provenance/time/status/retry semantics, immutability, no partial output and forbidden scope. Final-head clean QA and CI plus human merge precede M04.03. No extra prompt or renewed V1 approval is required.
