# CausalLedger Project Completion Goal

## Goal

Take CausalLedger from its QA-reviewed M03 foundation to an honest, reproducible, publicly presentable portfolio release without allowing an LLM to become financial truth or bypass deterministic checks, independent QA, remote CI, or human merge gates.

Goal ID: `CLG-COMPLETION-001`

Approved release target: `PENDING_HUMAN_APPROVAL`

## Current durable state

- Current phase: Phase A closeout, environment audit, and release-gap analysis.
- Current workstream: M03 closeout and completion-goal definition.
- Current milestone: M03 formal closeout on branch `m03-closeout-canonical-moneyevent-engine`.
- Starting synchronized `main`: `9c2df34fd1da1a4f893a5b16cb05fa1177f23cce`.
- Latest merged PR: #59.
- Latest merge commit: `9c2df34fd1da1a4f893a5b16cb05fa1177f23cce`.
- Environment readiness: Ready with limitations.
- Local deterministic baseline: PASS.
- Clean-worktree reproducibility: PASS.
- Local Docker: unavailable.
- Live model access: no supported provider key detected; no live call was made.
- Phase A draft PR: pending creation after final validation and push.

## Recommendation awaiting approval

- Immediate portfolio target: `V0_6_BENCHMARK_DEMO`.
- Long-term target: `V1_PUBLIC_PRODUCT`.
- Publishable interim artifact: M03 technical-preview article after the closeout PR merges; this is a technical foundation, not a finished product or AI demo.

The v0.6 recommendation is the smallest existing release-ladder target that combines deterministic financial truth, incident reconstruction, bounded advisory AI, benchmark evidence, and a usable demonstration surface. The recommendation does not activate M04 and does not alter the release ladder.

## Permitted target values

- `M03_TECHNICAL_PREVIEW`
- `V0_3_FINANCIAL_TRUTH_CORE`
- `V0_4_INCIDENT_DIGITAL_TWIN`
- `V0_5_SAFE_AGENTIC_LAYER`
- `V0_6_BENCHMARK_DEMO`
- `V1_PUBLIC_PRODUCT`

## Stop condition

Do not start M04 or any later implementation while target approval is pending. After the Phase A PR is reviewed and human-merged, resume only with:

`APPROVE_TARGET=<PERMITTED_TARGET> MERGED_CLOSEOUT_PR=<PR_NUMBER> MERGE_SHA=<ACTUAL_SHA> CONTINUE_COMPLETION_GOAL`

The resumed thread must verify closeout-PR ancestry and tree equivalence, load `docs/status/PROJECT_COMPLETION_GOAL.json`, activate only the first approved workstream, and stop at the next human merge gate.

## Safety and execution rules

- Agents investigate, summarize, explain, and propose only.
- Agents do not mutate money, post ledger entries, approve repairs, delete evidence, modify raw events, override invariants, or merge PRs.
- One implementation branch and one PR may be active at a time.
- Every implementation workstream uses PLAN, IMPLEMENT, VERIFY, ADVERSARIAL REVIEW, INDEPENDENT QA, REMOTE CI, HUMAN MERGE GATE, and durable-state update.
- Automated repair loops stop after at most three iterations.
- Deterministic tests and fixtures work without a paid model.
- Live-model calls require separate human approval, named provider/model, call count, and cost cap.
- Public claims must distinguish planned, documented, scaffolded, implemented, demonstrated, and production-ready behavior.

## Exact next action

Complete Phase A validation, push the single closeout branch, open one draft PR, wait for exact-head CI evidence, and stop for human PR review and target approval. No M04 plan or implementation may be created in this phase.
