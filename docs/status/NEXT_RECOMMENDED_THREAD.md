# Next Recommended Thread

Thread name: `M00.07 QA - Milestone Closeout Workflow`

Precondition: M00.07 builder work is complete on `m00-07-milestone-closeout-workflow`, required builder validation passed, `make bootstrap-check` is recorded as unavailable, forbidden-scope checks found no product implementation, and tracking is updated to `Builder complete, awaiting QA`.

Goal: Run the M00.07 QA review on the same branch and PR, inspect the milestone closeout workflow docs and templates, verify tracking/status synchronization, run validation, and record PASS or FAIL.

Next thread after QA PASS: merge the M00.07 PR and finalize post-merge tracking only after merge is confirmed.

Do not start product implementation, MoneyEvent logic, ledger logic, invariants, incidents, graph, replay, agent runtime, repair planning, UI, external connectors, M00.08, or M01 work.
