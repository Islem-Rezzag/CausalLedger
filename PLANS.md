# CausalLedger Plans

## When a plan is required

A CausalLedger Plan is required before any complex change, milestone work, product implementation, architecture change, workflow change, or safety-boundary change. If no active plan exists, create one before coding.

Plans are part of the file-first workflow. Durable execution state lives in repo files, not prior chat memory.

No active plans should exist for future milestones unless that milestone has been explicitly started by the user.

Submilestone tracking lifecycle, canonical status states, registry fields, builder updates, QA updates, PR merge updates, blocked slices, failed QA, and follow-up fixes are defined in `docs/ops/planning-and-tracking-system.md`.

Reusable builder and QA prompt structure is defined in `docs/ops/builder-qa-prompt-protocol.md` and the templates `prompts/template_builder_submilestone.md`, `prompts/template_qa_submilestone.md`, and `prompts/template_handoff_packet.md`.

Validation ladders, command expectations, failure handling, skipped-validation records, readiness criteria, and handoff packet requirements are defined in `docs/ops/validation-and-handoff-workflow.md`.

GitHub PR and issue workflow, PR body expectations, issue template usage, labels guidance, branch protection guidance, and merge-readiness discipline are defined in `docs/ops/github-pr-and-issue-workflow.md`, `docs/ops/github-labels-and-milestones.md`, `docs/ops/branch-protection.md`, `.github/PULL_REQUEST_TEMPLATE.md`, and `.github/ISSUE_TEMPLATE/`.

Milestone closeout preconditions, packets, deferrals, plan movement, and next milestone readiness are defined in `docs/ops/milestone-closeout-workflow.md`, `prompts/template_milestone_closeout.md`, and `plans/templates/milestone-closeout-template.md`.

M00 repo operating system freeze checks and closeout preparation are defined in `docs/ops/repo-operating-system-freeze.md` and `docs/status/M00_FREEZE_READINESS.md`.

Versioning and release-scope documentation is defined in `docs/VERSIONING.md`, `docs/releases/RELEASE_LADDER.md`, `docs/releases/V1_SCOPE.md`, and `CHANGELOG.md`.

## Naming convention

Use `CLP-0001-short-name.md`. Increment the number monotonically and keep the short name action-oriented.

## Plan locations

- Active plans live in `plans/active/`.
- Completed plans move to `plans/completed/`.
- Archived or stale plans move to `plans/archived/`.

Current active milestone planning plan: `plans/active/CLP-0003-m02-monorepo-and-local-development-environment.md`.

The completed M01 plan lives at `plans/completed/CLP-0002-m01-domain-model-and-scope-freeze.md`.

M02 is active under `plans/active/CLP-0003-m02-monorepo-and-local-development-environment.md`. M02 planning PR #37 merged into `main` at commit `18148f7`; M02.01 is `Completed and merged` after PR #38 merged into `main` at commit `fb2b901`; M02.02 is `Completed and merged` after PR #39 merged into `main` at commit `8ddf5da`; M02.03 is `Builder complete, awaiting QA` on branch `m02-03-create-apps-web`; M02.04 through M02.20 remain `Not started`.

Progress is recorded in the active plan during the slice. Submilestone status is recorded in `docs/milestones/SUBMILESTONE_REGISTRY.md`, reflected in the relevant milestone doc, and summarized in `docs/status/CURRENT_STATE.md` and `docs/status/NEXT_RECOMMENDED_THREAD.md`.

## Required sections for every plan

1. Purpose / Big Picture
2. Progress
3. Surprises & Discoveries
4. Decision Log
5. Context and Orientation
6. Scope
7. Plan of Work
8. Concrete Steps
9. Validation and Acceptance
10. Idempotence and Recovery
11. Artifacts and Notes
12. Interfaces and Dependencies
13. Outcomes & Retrospective

## Formatting rules

Use Markdown. Keep checklists concrete. Record dates in ISO format. Include command outputs as summaries, not noisy transcripts.

## Implementation rules

Implement only the current planned slice. Do not advance into the next submilestone without a new instruction. Update the plan as discoveries happen.

Builder threads must:

- run the branch guard before editing;
- work on the submilestone branch named by the prompt;
- keep scope inside the active plan;
- use the same branch and PR that QA will inspect;
- update the active plan at every meaningful stopping point;
- avoid product implementation unless explicitly scoped.

If the branch guard reports a branch mismatch, stop without editing and report the current branch, expected branch, and safest human recovery step. If the worktree is unexpectedly dirty, report the dirty files and stop unless those files are explicitly part of the requested submilestone.

Codex may stage, commit, and push scoped changes only when explicitly authorized. Codex must not merge PRs into `main`; humans merge PRs after QA PASS and merge readiness checks.

## QA rules

QA must inspect the target submilestone, run validation, record defects, and produce PASS or FAIL with a safe-to-proceed decision.

QA threads must use the same branch and PR as the builder thread. Every submilestone requires one builder thread and one separate QA thread. The next submilestone must not start until QA records PASS and the PR is merged.

QA PASS moves a submilestone to `QA passed, awaiting merge`; it does not make the submilestone fully complete. Only PR merge into `main` moves a submilestone to `Completed and merged`.

If QA fails, keep the same branch and PR, record the defects in the active plan and status docs, set the registry to the appropriate blocked or builder state, and point `docs/status/NEXT_RECOMMENDED_THREAD.md` to the fix or QA retry thread.

## Milestone closeout rules

Closeout must summarize completed submilestones, validation evidence, changed docs, changed code, remaining gaps, risks, and readiness for the next milestone.

Use `docs/ops/milestone-closeout-workflow.md` to distinguish submilestone closeout from milestone closeout, verify merged PRs and status synchronization, handle deferred submilestones, and decide whether the next milestone is safe to start.

Do not move an active plan to `plans/completed/` until milestone closeout is complete and the closeout packet says the plan can move.

## Plan truthfulness rules

Plans must describe only implemented or explicitly planned work. Do not mark a submilestone fully complete until required validation has passed, QA has recorded PASS, and the PR has merged. Do not claim placeholder directories, future modules, or roadmap items as working features.
