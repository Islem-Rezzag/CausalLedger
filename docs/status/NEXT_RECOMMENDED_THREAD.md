# Next Recommended Thread

Thread name: `Merge M01.03 PR - Define Settlement Vocabulary`

Precondition: M00.01 through M00.08 are `Completed and merged`, `v0.1.0` tags the M00 repo operating system foundation, M01 planning is complete and merged at git commit `2cfd75a`, the active M01 plan exists at `plans/active/CLP-0002-m01-domain-model-and-scope-freeze.md`, M01.01 Define payment lifecycle is `Completed and merged` after post-merge QA recovery, M01.02 Define ledger vocabulary is `Completed and merged` at git commit `fd1e259` (`docs: define M01.02 ledger vocabulary (#13)`), and M01.03 Define settlement vocabulary is `QA passed, awaiting merge` on branch `m01-03-define-settlement-vocabulary`. The M01.01 builder PR #11 was squash-merged before the required QA thread at commit `1175789` (`docs: define M01.01 payment lifecycle (#11)`), and the protocol deviation was recovered through the M01.01 QA recovery PR merged at commit `6480c1d` (`test: QA recovery M01.01 payment lifecycle (#12)`).

Goal: Merge the M01.03 settlement vocabulary PR after QA PASS, then finalize post-merge tracking without starting M01.04.

Current boundary: M01 is active. M01.03 is `QA passed, awaiting merge`. M01.04 through M01.13 are `Not started`. M02 through M21 are `Not started`. Product implementation has not started.

Do not mark M01.03 as `Completed and merged` until the PR merge is confirmed. Do not start M01.04, M02, product implementation, MoneyEvent runtime logic, ledger runtime logic, settlement runtime logic, reconciliation logic, invariants, incidents, graph, replay, agent runtime, repair planning, UI, external connectors, APIs, databases, GitHub Actions, CI workflows, or secrets work from this thread.
