# Next Recommended Thread

Thread name: `Merge M01.06 PR - Define Safe and Unsafe Repairs`

Precondition: M00.01 through M00.08 are `Completed and merged`, `v0.1.0` tags the M00 repo operating system foundation, M01 planning is complete and merged at git commit `2cfd75a`, the active M01 plan exists at `plans/active/CLP-0002-m01-domain-model-and-scope-freeze.md`, M01.01 Define payment lifecycle is `Completed and merged` after post-merge QA recovery, M01.02 Define ledger vocabulary is `Completed and merged` at git commit `fd1e259` (`docs: define M01.02 ledger vocabulary (#13)`), M01.03 Define settlement vocabulary is `Completed and merged` at git commit `e54a917` (`docs: define M01.03 settlement vocabulary (#14)`), M01.04 Define reconciliation vocabulary is `Completed and merged` at git commit `5dfe928` (`docs: define M01.04 reconciliation vocabulary (#15)`), M01.05 Define incident vocabulary is `Completed and merged` after QA recovery PR #18 merged at git commit `3bdedeb` (`test: QA recovery M01.05 incident vocabulary and ablation strategy (#18)`), and M01.06 Define safe and unsafe repairs is `QA passed, awaiting merge` on branch `m01-06-define-safe-and-unsafe-repairs` for PR #21.

Goal: Merge PR #21 after confirming the QA PASS commit is pushed, the PR body has the corrected QA summary, and normal merge-readiness checks are clean.

Current boundary: M01 is active. M01.05 is `Completed and merged`. M01.06 is `QA passed, awaiting merge`. M01.07 through M01.13 are `Not started`. M02 through M21 are `Not started`. Product implementation has not started.

Merge preparation must confirm PR #21 body no longer contains default template placeholders. Because `gh` was unavailable during QA, use the corrected PR body from the QA handoff before merging.

Do not start M01.07. Do not start M02, product implementation, MoneyEvent runtime logic, ledger runtime logic, settlement runtime logic, reconciliation runtime logic, incident runtime logic, invariants, graph, replay, agent runtime, repair planning runtime logic, repair execution, UI, external connectors, APIs, databases, GitHub Actions, CI workflows, or secrets work from the M01.06 merge thread.
