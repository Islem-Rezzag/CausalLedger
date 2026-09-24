# CausalLedger Project Completion Goal

## Goal

Take CausalLedger from its QA-reviewed M03 foundation to an honest, reproducible, publicly presentable portfolio release without allowing an LLM to become financial truth or bypass deterministic checks, independent QA, remote CI, or human merge gates.

Goal ID: `CLG-COMPLETION-001`

Approved release target: `PENDING_HUMAN_APPROVAL`

## Current task brief: PR #60 independent QA

Objective: review the proposed M03 closeout against base `9c2df34fd1da1a4f893a5b16cb05fa1177f23cce` and initial candidate `941fe1984eb418db19cda9a4e2be861dacbf79e2`, correct confirmed findings on the existing branch, and stop for human merge and target approval. PR #59 merge and reviewed-tree provenance are prerequisites. The coordinator edits; a separate-context read-only reviewer finds defects and rechecks the final candidate.

Allowed scope: closeout, goal, environment and current-state documentation, plus necessary control-plane regression checks. Forbidden scope: product runtime, fixtures, seeds, dependencies, lockfile, infrastructure, workflows, M04 implementation, financial writes, repair approval, paid calls, installation, merge, tags, deployment, or publication.

Acceptance: truthful branch-versus-main lifecycle; valid completed-plan movement with no active milestone plan; rejection of target-string edits as approval; all later milestones unstarted; unchanged release requirements; verified PR #59 provenance; independent QA and final-state CI. Verify with control-plane validation, bootstrap negative tests, frozen installation, workspace typecheck/lint/test/build/format, and clean-worktree QA. Demonstration remains the executable MoneyEvent fixture tests; scaffold startup is not a product demonstration. Review the full diff and the affected lifecycle/safety contracts. Stop for unexpected divergence, unexplained local changes, three failed repairs of one defect, missing authority, or the human merge/target gate.

## Current durable state

- Current phase: PR #60 independent QA and correction of the proposed M03 closeout.
- Current workstream: M03 closeout and completion-goal definition; no M04 plan exists.
- Starting synchronized `main` and latest merge: PR #59 at `9c2df34fd1da1a4f893a5b16cb05fa1177f23cce`.
- Closeout PR: [#60](https://github.com/Islem-Rezzag/CausalLedger/pull/60), not yet human-merged. Its completed-plan movement is proposed on this branch.
- Environment: Ready with limitations; authenticated GitHub CLI and native Codex Goals/reviewer subagents are available. Local Docker/Compose and `make` are unavailable.
- Initial candidate `941fe1984eb418db19cda9a4e2be861dacbf79e2`: clean local `qa:dev` PASS (18/0/1 optional Docker skip), remote run `32160971074` PASS for `validate` and `infra-smoke`.
- Historical clean-worktree evidence used starting `main` and cached package bytes. It does not establish cold installation of the final PR revision.
- Final corrected-state local validation, reviewer verdict, clean-worktree commit and exact-head CI belong in the PR review record, each bound to its SHA. Do not create a status-only commit just to record the preceding CI pass.
- No live-model call, system installation, financial write, release or publication is authorized by this QA task.

## Recommendation awaiting approval

Recommend `V1_PUBLIC_PRODUCT` as the destination requested by the user, with `V0_6_BENCHMARK_DEMO` as an intermediate checkpoint. Both retain the existing release ladder and V1 scope. The recommendation is not approval and does not activate M04. An M03 technical-preview article remains an optional foundation-only artifact requiring separate publication approval.

## Permitted target values

- `M03_TECHNICAL_PREVIEW`
- `V0_3_FINANCIAL_TRUTH_CORE`
- `V0_4_INCIDENT_DIGITAL_TWIN`
- `V0_5_SAFE_AGENTIC_LAYER`
- `V0_6_BENCHMARK_DEMO`
- `V1_PUBLIC_PRODUCT`

## Stop condition and continuation

Stop for human review and merge after independent QA and exact-head CI pass. Do not start M04 while PR #60 is unmerged or target approval is pending. An ordinary-language response is sufficient, for example:

“Merged #60. I approve V1_PUBLIC_PRODUCT. Continue.”

The coordinator discovers the actual merge SHA, verifies GitHub merge metadata and reviewed-content provenance, and records the user's explicit target selection in these existing goal files. For squash merges, compare reviewed changes/trees; the source commit need not be an ancestor of `main`. Never infer approval from an edited target string or a generated task brief. This Phase A validator deliberately rejects all selected targets; a later authorized activation must record real approval evidence and test the lifecycle transition.

After both gates clear, select the first incomplete item within the approved target. For v0.3 or later, this is M04 Double-entry Ledger Core planning, unless live evidence proves a later checkpoint. A selection of `M03_TECHNICAL_PREVIEW` authorizes only technical-preview preparation and does not start M04. Generate a compact brief in the existing goal or active plan, execute it, verify it, obtain separate-context read-only QA, fix confirmed findings, commit/push scoped work, prepare one PR and stop for human merge. The user need not fetch prompts or hashes from another chat.

## Safety and execution rules

- Agents investigate, summarize, explain, and propose only; deterministic code owns financial correctness.
- Agents do not mutate money, post ledger entries, approve repairs, delete evidence, modify raw events, override invariants, or merge PRs.
- One implementation branch and one PR per slice, with one coordinator/editor and one separate reviewer at a time.
- Every slice preserves milestone IDs, dependencies and acceptance criteria; an overlay does not authorize dropping registry rows or combining the project into one PR.
- Deterministic verification, independent QA, remote CI and human merge gates remain required. Reviewer output is not deterministic evidence or human approval.
- Repair loops stop after at most three attempts at one unresolved defect.
- Default tests use controlled synthetic data and no paid model. Live calls require explicit provider/model/call-count/budget approval.
- Scope/architecture changes, system installation, deployment, tags and publication remain human decisions.
- Public claims distinguish planned, scaffolded, implemented, demonstrated, mocked/live, synthetic/production, and production readiness.

## Exact next action

Read the final review record on PR #60 and verify its SHA. Complete any outstanding scoped correction, re-review or final-state check; mark the same PR ready only after QA and CI pass. Stop for human merge and target selection. Next after verified approval of v0.3 or later: M04 planning.
