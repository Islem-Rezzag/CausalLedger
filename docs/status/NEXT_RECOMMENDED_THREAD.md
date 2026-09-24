# Next Recommended Thread

Thread name:
M04 Planning QA - Double-entry Ledger Core

Precondition:
Builder validation passes on `m04-planning-double-entry-ledger-core`; the same planning PR and exact candidate are supplied to a separate-context read-only reviewer. The existing M04 plan is authoritative; target V1 and PR #60 merge are verified.

Scope:
Review the full planning/control-plane diff, approval and merge guards, all 18 preserved submilestones, deterministic edge cases, environment gates and forbidden runtime scope. Coordinator fixes confirmed findings; reviewer checks the final revision. After PASS and exact-head CI, stop for human merge. M04.01 Account schema starts only after verified planning merge, with a coordinator-generated brief and its own branch/PR.
