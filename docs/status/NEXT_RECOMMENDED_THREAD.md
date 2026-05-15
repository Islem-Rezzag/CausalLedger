# Next Recommended Thread

Thread name: `Merge M01.02 PR - Define Ledger Vocabulary`

Precondition: M00.01 through M00.08 are `Completed and merged`, `v0.1.0` tags the M00 repo operating system foundation, M01 planning is complete and merged at git commit `2cfd75a`, the active M01 plan exists at `plans/active/CLP-0002-m01-domain-model-and-scope-freeze.md`, M01.01 Define payment lifecycle is `Completed and merged` after post-merge QA recovery, and M01.02 Define ledger vocabulary is `QA passed, awaiting merge`. The M01.01 builder PR #11 was squash-merged before the required QA thread at commit `1175789` (`docs: define M01.01 payment lifecycle (#11)`), and the protocol deviation was recovered through the M01.01 QA recovery PR merged at commit `6480c1d` (`test: QA recovery M01.01 payment lifecycle (#12)`).

Goal: Merge the M01.02 PR after human review confirms the QA PASS and normal merge readiness. After the merge, run the post-merge tracking finalization thread before starting M01.03.

Current boundary: M01 is active. M01.02 is `QA passed, awaiting merge`. M01.03 through M01.13 are `Not started`. M02 through M21 are `Not started`. Product implementation has not started.

Do not mark M01.02 as completed and merged until the PR has actually merged and post-merge tracking is finalized. Do not start M01.03, M02, product implementation, MoneyEvent runtime logic, ledger runtime logic, invariants, incidents, graph, replay, agent runtime, repair planning, UI, external connectors, APIs, databases, GitHub Actions, CI workflows, or secrets work from this thread.
