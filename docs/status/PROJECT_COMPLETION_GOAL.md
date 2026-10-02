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

M04.04 Enforce debit equals credit under `plans/active/CLP-0005-m04-double-entry-ledger-core.md`, branch `m04-04-enforce-debit-equals-credit`. The generated brief and implementation provide exact bigint totals independently per currency, strict contextual validation, duplicate refusal and detached frozen success or issues without partial output. No posting, account balance queries, storage or financial authority; M04.05 and later stay unstarted. Builder validation PASS: ledger432/control380, fresh events97, measured workspace581 and intermediate QA17/0/2 with warm caches. Separate-context overall reviewer `m04_02_qa` PASS with no findings on `b66f5fa23021f2cd4b2722402d0ac6fd1da99a61`; fresh independent ledger432/control380/static/scope and supplemental runtime192/lifecycle182 PASS. PR #65 is the sole review container; Builder clean QA18/0/1 and CI36997409686 PASS. Final handoff-head review/clean QA/CI remain required.

## Authority and safety

Agents inspect, explain and propose; deterministic code owns financial correctness. Agents cannot approve repairs, post ledger entries, mutate money, delete evidence, modify raw events or override deterministic invariants. Future controlled synthetic tests of deterministic ledger code are distinct from giving an LLM financial write authority.

V1 selection does not approve paid calls/budgets, system installs, material scope/architecture changes, deployment, tags or publication. Use one coordinator/editor and one separate reviewer at a time. Preserve milestone IDs, dependencies, acceptance, small branches and human merges; the five workstreams remain only a grouping proposal. Stop after three unsuccessful repairs of a specific defect, on unexplained local changes/divergence, missing authority or the human merge gate.

## Environment and validation

Use pinned tools and documented commands. Docker/Compose and make remain locally unavailable at the last recheck; direct Python checks substitute for make. Planning and pure schema work can proceed without Docker; storage-dependent acceptance requires approved Postgres setup, migration/atomicity/concurrency tests and local remediation. No database substitution or installation is authorized. Tests use controlled synthetic data; no paid model is needed. Public claims must distinguish mocked/live, synthetic/production and implemented/planned behavior.

Current-slice validation and QA status live in the active plan and current state. Final-head CI belongs in the PR review record, bound to its SHA, rather than a chain of commits recording preceding CI passes.

## Next gate

M04.04 QA passed, awaiting merge in PR #65. Final actual-head re-review/clean QA/CI must PASS and be recorded against its SHA before human review/squash merge. Reply “Merged #65. Continue.” after actual merge; verify GitHub/tree/main and finalize tracking before M04.05. Preserve V1/all18 and the approved disposable Postgres requirement for storage-dependent acceptance.
