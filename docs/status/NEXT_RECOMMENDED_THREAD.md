# Next Recommended Thread

Thread name: `M01.02 QA - Define Ledger Vocabulary`

Precondition: M00.01 through M00.08 are `Completed and merged`, `v0.1.0` tags the M00 repo operating system foundation, M01 planning is complete and merged at git commit `2cfd75a`, the active M01 plan exists at `plans/active/CLP-0002-m01-domain-model-and-scope-freeze.md`, and M01.01 Define payment lifecycle is `Completed and merged` after post-merge QA recovery. The M01.01 builder PR #11 was squash-merged before the required QA thread at commit `1175789` (`docs: define M01.01 payment lifecycle (#11)`), and the protocol deviation was recovered through the M01.01 QA recovery PR merged at commit `6480c1d` (`test: QA recovery M01.01 payment lifecycle (#12)`).

Goal: Review the M01.02 builder work on the same branch and PR, verify the ledger vocabulary domain documentation and tracking updates, rerun required validation, and record PASS or FAIL.

Current boundary: M01 is active. M01.02 is `Builder complete, awaiting QA`. M01.03 through M01.13 are `Not started`. M02 through M21 are `Not started`. Product implementation has not started.

Do not mark M01.02 as completed and merged during QA. Do not start M01.03, M02, product implementation, MoneyEvent runtime logic, ledger runtime logic, invariants, incidents, graph, replay, agent runtime, repair planning, UI, external connectors, APIs, databases, GitHub Actions, CI workflows, or secrets work from this thread.
