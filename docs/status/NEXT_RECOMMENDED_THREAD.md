# Next Recommended Thread

Thread name: `M01.06 QA - Define Safe and Unsafe Repairs`

Precondition: M00.01 through M00.08 are `Completed and merged`, `v0.1.0` tags the M00 repo operating system foundation, M01 planning is complete and merged at git commit `2cfd75a`, the active M01 plan exists at `plans/active/CLP-0002-m01-domain-model-and-scope-freeze.md`, M01.01 Define payment lifecycle is `Completed and merged` after post-merge QA recovery, M01.02 Define ledger vocabulary is `Completed and merged` at git commit `fd1e259` (`docs: define M01.02 ledger vocabulary (#13)`), M01.03 Define settlement vocabulary is `Completed and merged` at git commit `e54a917` (`docs: define M01.03 settlement vocabulary (#14)`), M01.04 Define reconciliation vocabulary is `Completed and merged` at git commit `5dfe928` (`docs: define M01.04 reconciliation vocabulary (#15)`), M01.05 Define incident vocabulary is `Completed and merged` after QA recovery PR #18 merged at git commit `3bdedeb` (`test: QA recovery M01.05 incident vocabulary and ablation strategy (#18)`), and M01.06 Define safe and unsafe repairs is `Builder complete, awaiting QA` on branch `m01-06-define-safe-and-unsafe-repairs`.

Goal: Run the separate QA thread for the documentation-only M01.06 safe and unsafe repair vocabulary builder slice.

Current boundary: M01 is active. M01.05 is `Completed and merged`. M01.06 is `Builder complete, awaiting QA` and is the next recommended QA thread. M01.07 through M01.13 are `Not started`. M02 through M21 are `Not started`. Product implementation has not started.

QA should inspect `docs/domain/repair-vocabulary.md`, domain links, status and milestone tracking, active plan updates, validation coverage, and forbidden-scope boundaries. QA must confirm that LLM agents remain proposal-only and cannot mutate money, post ledger entries, approve repairs, apply repairs, delete evidence, modify raw events, override invariants, bypass human review, release external communications, or claim unsupported financial facts.

Do not start M01.07. Do not start M02, product implementation, MoneyEvent runtime logic, ledger runtime logic, settlement runtime logic, reconciliation runtime logic, incident runtime logic, invariants, graph, replay, agent runtime, repair planning runtime logic, repair execution, UI, external connectors, APIs, databases, GitHub Actions, CI workflows, or secrets work from the M01.06 QA thread.
