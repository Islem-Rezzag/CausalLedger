# Next Recommended Thread

Thread name:
Human Review and Target Approval - CausalLedger Completion Goal

Precondition:
The Phase A branch `m03-closeout-canonical-moneyevent-engine` has passed final local validation, been pushed, opened as one draft PR, passed exact-head remote CI, and then been reviewed and human-merged. The merge commit and reviewed source tree must be equivalent.

Scope:
Approve exactly one permitted release target and resume from `docs/status/PROJECT_COMPLETION_GOAL.json`. Do not start M04 until the Phase A PR merge is proved and the approval command is supplied. The resumed thread activates only the first approved workstream, creates its plan and branch, uses deterministic verification and independent QA, opens one PR, and stops for human merge.

Exact resume command:
`APPROVE_TARGET=<PERMITTED_TARGET> MERGED_CLOSEOUT_PR=<PR_NUMBER> MERGE_SHA=<ACTUAL_SHA> CONTINUE_COMPLETION_GOAL`
