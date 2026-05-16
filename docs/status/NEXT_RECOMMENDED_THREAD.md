# Next Recommended Thread

Thread name: `M01.05 QA - Define Incident Vocabulary`

Precondition: M00.01 through M00.08 are `Completed and merged`, `v0.1.0` tags the M00 repo operating system foundation, M01 planning is complete and merged at git commit `2cfd75a`, the active M01 plan exists at `plans/active/CLP-0002-m01-domain-model-and-scope-freeze.md`, M01.01 Define payment lifecycle is `Completed and merged` after post-merge QA recovery, M01.02 Define ledger vocabulary is `Completed and merged` at git commit `fd1e259` (`docs: define M01.02 ledger vocabulary (#13)`), M01.03 Define settlement vocabulary is `Completed and merged` at git commit `e54a917` (`docs: define M01.03 settlement vocabulary (#14)`), and M01.04 Define reconciliation vocabulary is `Completed and merged` at git commit `5dfe928` (`docs: define M01.04 reconciliation vocabulary (#15)`). The M01.01 builder PR #11 was squash-merged before the required QA thread at commit `1175789` (`docs: define M01.01 payment lifecycle (#11)`), and the protocol deviation was recovered through the M01.01 QA recovery PR merged at commit `6480c1d` (`test: QA recovery M01.01 payment lifecycle (#12)`).

Goal: Audit the M01.05 incident vocabulary and scoped ablation roadmap/evaluation planning builder work on the same branch and PR.

Current boundary: M01 is active. M01.05 is `Builder complete, awaiting QA`. M01.06 through M01.13 are `Not started`. M02 through M21 are `Not started`. Product implementation has not started.

Do not mark M01.05 as completed and merged. Do not start M01.06, M02, product implementation, MoneyEvent runtime logic, ledger runtime logic, settlement runtime logic, reconciliation runtime logic, incident runtime logic, invariants, graph, replay, agent runtime, repair planning runtime logic, UI, external connectors, APIs, databases, GitHub Actions, CI workflows, or secrets work from this thread.
