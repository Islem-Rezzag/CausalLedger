# Next Recommended Thread

Thread name: `Merge M01.08 PR - Define Human Review States`

Precondition: M00.01 through M00.08 are `Completed and merged`, `v0.1.0` tags the M00 repo operating system foundation, M01 planning is complete and merged at git commit `2cfd75a`, the active M01 plan exists at `plans/active/CLP-0002-m01-domain-model-and-scope-freeze.md`, M01.01 Define payment lifecycle is `Completed and merged` after post-merge QA recovery, M01.02 Define ledger vocabulary is `Completed and merged` at git commit `fd1e259` (`docs: define M01.02 ledger vocabulary (#13)`), M01.03 Define settlement vocabulary is `Completed and merged` at git commit `e54a917` (`docs: define M01.03 settlement vocabulary (#14)`), M01.04 Define reconciliation vocabulary is `Completed and merged` at git commit `5dfe928` (`docs: define M01.04 reconciliation vocabulary (#15)`), M01.05 Define incident vocabulary is `Completed and merged` after QA recovery PR #18 merged at git commit `3bdedeb` (`test: QA recovery M01.05 incident vocabulary and ablation strategy (#18)`), M01.06 Define safe and unsafe repairs is `Completed and merged` after PR #21 merged at git commit `7adc96d` (`docs: define M01.06 safe and unsafe repairs (#21)`), M01.07 Define evidence receipt model is `Completed and merged` after PR #23 merged at git commit `a88b5ff` (`docs: define M01.07 evidence receipt model (#23)`), and M01.08 Define human review states is `QA passed, awaiting merge`.

Goal: Merge the M01.08 PR after normal human review, then run a post-merge finalization thread to record M01.08 as `Completed and merged`.

Current boundary: M01 is active. M01.07 is `Completed and merged`. M01.08 is `QA passed, awaiting merge`. M01.09 through M01.13 are `Not started`. M02 through M21 are `Not started`. Product implementation has not started.

The merge thread must not start M01.09. After the PR merges, run post-merge finalization to update tracking from `QA passed, awaiting merge` to `Completed and merged`.

Do not start M02, product implementation, MoneyEvent runtime logic, ledger runtime logic, settlement runtime logic, reconciliation runtime logic, incident runtime logic, invariants, graph, replay, agent runtime, repair planning runtime logic, repair execution, human-review runtime logic, UI, external connectors, APIs, databases, storage layers, file parsers, GitHub Actions, CI workflows, deployment, auth/authz implementation, structured logging implementation, or secrets work from the M01.08 merge thread.
