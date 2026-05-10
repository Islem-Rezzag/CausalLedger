# Repo Operating System Freeze

## Purpose

The M00 freeze proves that the CausalLedger repo operating system is coherent enough for future Codex threads to continue from repository files without chat memory. It is a control-plane audit and preparation pass, not a product implementation milestone.

The freeze does not close M00 by itself. M00 can close only after M00.08 builder work is validated, M00.08 QA records PASS, the M00.08 PR merges, post-merge tracking marks M00.08 `Completed and merged`, and a milestone closeout thread confirms that M00 is ready to close.

## What ready means

The repo operating system is ready when:

- active docs, roadmap, registry, status files, plans, prompt templates, skills, GitHub templates, validation scripts, and bootstrap tests tell the same current-state story;
- every M00 submilestone before M00.08 is `Completed and merged`;
- M00.08 is the only active submilestone until QA and merge complete;
- M00 remains in progress until milestone closeout passes;
- M01 through M21 remain `Not started`;
- no M01 active plan exists;
- no product functionality has started;
- validation can detect the required control-plane docs and templates;
- the next recommended thread is exact and safe.

## Before M00 can close

All of the following must be true before M00 can close:

- M00.01 through M00.08 are `Completed and merged` in `docs/milestones/SUBMILESTONE_REGISTRY.md`.
- `docs/milestones/M00.md`, `plans/ROADMAP.md`, `docs/status/CURRENT_STATE.md`, `docs/status/WEEKLY_LOG.md`, `docs/status/NEXT_RECOMMENDED_THREAD.md`, and the active M00 plan agree with the registry.
- M00.08 QA PASS is recorded before merge.
- The M00.08 merge reference is recorded after merge.
- `docs/status/M00_FREEZE_READINESS.md` records the final readiness state and any limitations.
- Required validation has passed or accepted limitations are recorded.
- A milestone closeout thread has reviewed the complete M00 state.
- The closeout packet says whether the active M00 plan can move to `plans/completed/`.

## What must remain false before M01 starts

Before M01 starts, these statements must remain false:

- M00 is closed without M00.08 QA PASS, PR merge, and milestone closeout.
- `plans/active/` contains an M01 plan.
- M01 through M21 have any status other than `Not started`.
- Product functionality exists or is claimed as implemented.
- MoneyEvent logic, ledger logic, invariants, incident logic, causal graph logic, replay logic, agent runtime, repair planning logic, UI features, or external connectors exist.
- GitHub Actions or CI workflows exist unless a later authorized slice creates them.
- Codex merges a PR into `main`.

## Verify active docs

Check:

- `docs/ACTIVE_DOCS.md`
- `README.md`
- `START_HERE.md`
- `AGENTS.md`
- `PLANS.md`
- `WORKFLOW.md`
- `docs/INDEX.md`

They should agree on:

- file-first repo memory;
- branch guard before edits;
- one branch, one PR, one builder thread, and one QA thread per submilestone;
- Codex may stage, commit, and push only when explicitly authorized;
- Codex must not merge PRs;
- humans merge PRs;
- active plan discipline;
- status tracking discipline;
- validation and handoff discipline;
- milestone closeout discipline;
- no product implementation exists yet.

## Verify roadmap and registry

Check:

- `plans/ROADMAP.md`
- `docs/milestones/SUBMILESTONE_REGISTRY.md`
- `docs/milestones/M00.md`

They should agree that M00 remains in progress until M00.08 is QA-passed, merged, finalized, and closed out. M00.01 through M00.07 should be `Completed and merged` for the M00.08 builder. M00.08 should not be marked QA-passed or completed by the builder. M01 through M21 should remain `Not started`.

## Verify status files

Check:

- `docs/status/CURRENT_STATE.md`
- `docs/status/NEXT_RECOMMENDED_THREAD.md`
- `docs/status/WEEKLY_LOG.md`
- `docs/status/TECH_DEBT.md`
- `docs/status/RISK_REGISTER.md`
- `docs/status/OPEN_QUESTIONS.md`
- `docs/status/CAPABILITY_MATRIX.md`
- `docs/status/M00_FREEZE_READINESS.md`

They should record the same active plan, active submilestone, product-not-started status, validation state, limitations, and next recommended thread. Historical weekly log entries should be preserved, while current-state summaries should be current.

## Verify prompt templates

Check:

- `prompts/template_builder_submilestone.md`
- `prompts/template_qa_submilestone.md`
- `prompts/template_handoff_packet.md`
- `prompts/template_milestone_closeout.md`
- `plans/templates/execplan-template.md`
- `plans/templates/qa-plan-template.md`
- `plans/templates/milestone-closeout-template.md`

The templates should be reusable, include branch guards where appropriate, include validation expectations where appropriate, distinguish builder, QA, handoff, and milestone closeout responsibilities, and avoid duplicate operational prose that belongs in the ops docs.

## Verify skills

Check that required local skills exist and align with the control-plane workflow:

- `.agents/skills/causalledger-plan-orchestrator/SKILL.md`
- `.agents/skills/validation-ladder-composer/SKILL.md`
- `.agents/skills/handoff-auditor/SKILL.md`

For M00.08, the plan orchestrator should keep work on the active M00 plan, the validation ladder should use the control-plane ladder, and the handoff auditor should require a complete builder handoff.

## Verify GitHub templates

Check:

- `.github/PULL_REQUEST_TEMPLATE.md`
- `.github/ISSUE_TEMPLATE/submilestone-task.yml`
- `.github/ISSUE_TEMPLATE/qa-review.yml`
- `.github/ISSUE_TEMPLATE/blocked-slice.yml`
- `.github/ISSUE_TEMPLATE/research-spike.yml`
- `.github/ISSUE_TEMPLATE/bug.yml`
- `.github/ISSUE_TEMPLATE/config.yml`

The templates should support submilestone PRs, QA, blockers, research, and bugs without claiming GitHub Actions, label automation, milestone automation, or product implementation exists.

## Verify validation coverage

Check:

- `scripts/validate-control-plane.py`
- `tests/test_control_plane_bootstrap.py`

Validation should remain control-plane only and should check that this freeze guide and `docs/status/M00_FREEZE_READINESS.md` exist. It should not add product behavior tests before product behavior exists.

## Verify no product code has started

Inspect future product directories and changed files. During M00.08, `apps/` and `packages/` should remain placeholder-only. No MoneyEvent logic, ledger logic, invariants, incidents, causal graph, replay, agent runtime, repair planning, UI, external connectors, product tests, GitHub Actions, or CI workflows should be introduced.

## Verify M01 has not started

Check:

- no M01 active plan exists in `plans/active/`;
- `plans/ROADMAP.md` still marks M01 through M21 `Not started`;
- `docs/milestones/SUBMILESTONE_REGISTRY.md` still marks M01.01 through M21.15 `Not started`;
- `docs/status/NEXT_RECOMMENDED_THREAD.md` points to M00.08 QA before M00 closeout, or to M00 closeout after M00.08 QA and merge.

## What M01 may do after M00 closeout

After M00 closeout passes, M01 may create an active M01 plan and freeze domain language, scope, non-goals, glossary, and planned MoneyEvent boundaries. M01 may clarify concepts and acceptance criteria for future implementation.

## What M01 may not do without its own active plan

M01 may not start without an explicit M01 active plan. It may not implement MoneyEvent logic, ledger logic, invariants, incidents, causal graph, replay, agent runtime, repair planning, UI, external connectors, or product behavior unless that work is explicitly scoped by the active M01 plan and validated by deterministic tests appropriate to the slice.

## Prepare for M00 closeout

Before the M00 closeout thread:

- finish M00.08 builder validation and handoff;
- run M00.08 QA on the same branch and PR;
- merge the M00.08 PR only after QA PASS;
- finalize M00.08 as `Completed and merged` with the merge reference;
- update the registry, M00 milestone doc, roadmap, current state, weekly log, next recommended thread, freeze readiness report, and active plan;
- keep the active M00 plan in `plans/active/` until closeout says it can move;
- set the next recommended thread to `M00 Closeout - Repo Operating System`.
