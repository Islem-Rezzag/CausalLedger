# Next Recommended Thread

Thread name:
M04.05 Resume - Restore workflow permission and validate immutable storage

Precondition:
PR #65 human merge526bb66dda5d9c8b9aebd85775142e8d22c3a73a and exact reviewed tree/main proof verified; final-head QA/CI36998201769 PASS. Expected branch `m04-05-add-immutable-transaction-storage`. Current slice is Blocked on GitHub's OAuth workflow permission rejection. Implementation candidate8e5c05b03fc903fd09ee15d737b49f9e29314811 is local; no remote branch or PR. Required next authority: explicit permission to reauthorize the existing Git connection, followed by GitHub consent. Do not use another access route to bypass the denial.

Scope:
Resume the generated M04.05 brief in active `plans/active/CLP-0005-m04-double-entry-ledger-core.md` after restoring the authorized connection. Root local ledger469/control451 and workspace checks passed; independent static/local review found two P3 stale-document passages corrected by the blocked checkpoint. No real Postgres tests, migration execution, overall QA PASS or merge readiness. Push the same branch, create exactly one storage PR and obtain mandatory disposable Postgres17 acceptance logs, existing independent overall review and final-head CI. No system installation; user runs no tests. Human-only review/squash merge remains gated. Preserve V1/all18; M04.06+ unstarted.
