# CausalLedger Project Completion Goal

## Goal and approved destination

Goal ID: `CLG-COMPLETION-001`. Deliver the repository-defined public product, then prepare evidence-backed blog and LinkedIn drafts. Approved release target: **V1_PUBLIC_PRODUCT**. v0.6 remains an intermediate checkpoint; `docs/releases/V1_SCOPE.md` and `RELEASE_LADDER.md` remain authoritative.

Human approval received on 2026-09-24 in Codex task `01a0d3ba-f6d3-7322-92b5-8109df0f82d7`: “Merged #60. I approve V1_PUBLIC_PRODUCT. Continue.” This explicit user message, not a generated brief or changed target string, authorizes the selection. The existing JSON now records `releaseTargetApproval` and `closeoutMergeEvidence`; these two additive provenance objects are validated against the observed decision/merge. Local validation checks consistency, not authenticity of arbitrary repository edits or financial truth.

## Verified checkpoint

PR #60 merged at `3df6f88b1b64b5456554654b7e27adcfa99c3ff6` on 2026-09-24. Its reviewed source `f160a7d2bc0d6163ee73b36c1546419134f11ca3` and merge share tree `0c14f73280c8b15ab93e0f697edc33738946c7ef`; source-to-merge diff is empty and merge is on main. Separate-context reviewer `pr60_independent_qa` returned PASS before the human merge. Final source CI run `36011283395` passed both jobs; 132 control-plane and 150 workspace tests passed and detached final-head QA passed 18/0/1 with a warm cache. Local Docker was not tested. The earlier automatic approval rejection prevented posting the final PR body/review; its stale body does not supersede verified source, review and merge evidence. The M03 closeout addendum preserves this record.

## Current task brief

M04.01 human-merged in PR #62 at `44f6a833692326d00ed5a9b7479a52dd761af814`, equal to reviewed head `9d0db74c1349596b579aab510c6f9e7ff00642b0` tree `0c37706283fa90e3455fab4541a0eeb5209fb973` and reachable from fetched main. Final independent QA and CI `36020971358` PASS. Post-merge tracking is finalized within the next legitimate slice.

M04.02 human-merged in PR #63 at `1dcfcbdb6c6f74a1ab6acb7b19e93ef2ddb09d0d`; reviewed head `511ce291eb18538e0a07076287ca0f7c4a24656a` shares tree `6528851abfe1b8e9642b5ddfc225b50d034da50e`, reachable from fetched main. Exact-head independent QA, clean QA 18/0/1 and CI `36785054245` PASS; final advisory record published. No duplicate QA or recovery work needed.

M04.03 human-merged in PR #64 at `4a5637c8eab842b368e046b0994a620ecb08e90b`; reviewed head `7ee673869e48a61f19fd3b8d0d61b1e7a1199a87` shares tree `73632a81652423e9713e808976b1a922dbd71ad5`, reachable from fetched main. Exact-head independent QA, clean QA 18/0/1 and CI `36789436774` PASS.

M04.04 human-merged in PR #65 at `526bb66dda5d9c8b9aebd85775142e8d22c3a73a`; reviewed final head `66f679e9711a0a5f06830eb203119d1dd8e3e04e` shares tree `15c668085da628122ff5601be7d87d8da6b91b35`, with empty diff/main reachability. Exact-head independent QA, clean QA18/0/1 and CI36998201769 both jobs PASS. All prior contracts and 18 approved acceptance rows remain preserved.

M00-M03 are closed and V1_PUBLIC_PRODUCT is approved. M04.01-M04.15 are Completed and merged; Human PR76 merge1c5ad6c matches final reviewedeef72bc/tree83138043/CI37777406231 real561/rootcleanQA18/0/1/independent473 carried-runtime+67 fresh-lifecycle verified. M04.16 Add tests for invalid posting is **Builder complete, awaiting QA** on `m04-16-add-tests-for-invalid-posting`, no current PR yet, under active `plans/active/CLP-0005-m04-double-entry-ledger-core.md`. Fresh ledger1418/31files and full control1613 PASS; ledger type/lint/build/format PASS; corrected root intermediateQA17/0/2 PASS (dirty override/optionalDocker skips). Database corpus/overall QA pending. Exact final proof belongs in the sole PR. M04.17-M04.18 and M05-M21 remain Not started. Current evidence is in `docs/status/CURRENT_STATE.md`.

## Authority and safety

Agents inspect, explain and propose; deterministic code owns financial correctness. Agents cannot approve repairs, post ledger entries, mutate money, delete evidence, modify raw events or override deterministic invariants. Future controlled synthetic tests of deterministic ledger code are distinct from giving an LLM financial write authority.

V1 selection does not approve paid calls/budgets, system installs, material scope/architecture changes, deployment, tags or publication. Use one coordinator/editor and one separate reviewer at a time. Preserve milestone IDs, dependencies, acceptance, small branches and human merges; the five workstreams remain only a grouping proposal. Stop after three unsuccessful repairs of a specific defect, on unexplained local changes/divergence, missing authority or the human merge gate.

## Environment and validation

Pinned tools and approved owned17 CI route. Human PR76 merge1c5ad6c matches final reviewedeef72bc/tree83138043/CI37777406231 real561/rootcleanQA18/0/1/independent473 carried-runtime+67 fresh-lifecycle verified. Fresh ledger1418/31files and full control1613 PASS; ledger type/lint/build/format PASS; corrected root intermediateQA17/0/2 PASS (dirty override/optionalDocker skips). Current16 database/overallQA pending. Local no Docker/Postgres/make; warm caches/no cold-install claim; final proof in sole PR, no CI-copy-only commit.

## Next gate

Next gate: build/validate16 adversarial tests, existing independent QA/mandatory owned17 acceptance/final-head cleanQA/bothCI/human-only merge. No17 before verified16 merge; no repeated15 QA, installs, paid calls, chats or goals.
