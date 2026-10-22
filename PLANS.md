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

Current active milestone plan: plans/active/CLP-0006-m05-provider-and-bank-simulator.md; M05.04–M05.06 synthetic payout lifecycle. M04 is completed at plans/completed/CLP-0005-m04-double-entry-ledger-core.md.

The completed M01 plan lives at `plans/completed/CLP-0002-m01-domain-model-and-scope-freeze.md`.

M00–M04 are closed; V1_PUBLIC_PRODUCT remains approved. M05.01–M05.03 are Completed and merged in verified PR82/83/84. M05.04–M05.06 synthetic payout lifecycle is Builder complete, awaiting QA on codex/m05-payout-lifecycle under plans/active/CLP-0006-m05-provider-and-bank-simulator.md. Creation/paid/failed compositions are implemented and builder-tested; independent review/current CI/learning/human merge remain pending. M05.07–M05.19 and M06–M21 remain Not started/unbound.

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


Current M05.03 capture: M00–M04 are closed; V1_PUBLIC_PRODUCT remains approved. M05.01 and M05.02 are Completed and merged in verified PR82/PR83. M05.03 Simulate payment captured is QA passed, awaiting merge for sole PR #84 on m05-03-simulate-payment-captured under plans/active/CLP-0006-m05-provider-and-bank-simulator.md. Synthetic capture composition is implemented; M05.04–M05.19 and M06–M21 remain Not started/unbound.


## M05.02 current checkpoint (2026-10-16)

M00–M04 are closed; V1_PUBLIC_PRODUCT remains approved. M05.01 is Completed and merged in verified human PR82. M05.02 Simulate payment authorized is QA passed, awaiting merge for sole PR #83 on m05-02-simulate-payment-authorized under plans/active/CLP-0006-m05-provider-and-bank-simulator.md. Only the synthetic authorization generator is implemented. Independent candidate acceptance passed; final tracking-head gates and human merge remain. M05.03–M05.19 and M06–M21 remain Not started/unbound.

Human PR82 merged ac092fcb7b0ee16459b1ca1177d4b9b10e0df5ce at 2026-10-16T14:20:14Z by nonbot Islem-Rezzag. Reviewed b0c0e32daf91d95cd9bff555a766dadc0cfc7501 and squash have identical tree 0d2f821264fc0c55ae6ed77eb4ebc65729776014, full diff EMPTY and fetched-main reachability PASS. Root and existing independent reviewer verified primary merge/CI/body/advisory6153826833/canonical reviewer hash bindings. Final simulator107, lifecycle540, controls2397, root clean18/0/1 and both CI38455025292 PASS; ledger1785 and all14 real PostgreSQL suites1227/no skips, recovery/upgrades/schema/DEMO/cleanup PASS. Prior candidate309 behavior probes were carried through356 byte-identical nontracking files, not rerun as fresh final probes. No unchanged01 tests rerun merely to verify merge.

Current02 generator validation is recorded in CURRENT_STATE.md and active CLP0006. Root runs tests; user none. No future feature or financial authority.


## M05.03 current checkpoint (2026-10-18)

M00–M04 are closed; V1_PUBLIC_PRODUCT remains approved. M05.01 and M05.02 are Completed and merged in verified PR82/PR83. M05.03 Simulate payment captured is QA passed, awaiting merge for sole PR #84 on m05-03-simulate-payment-captured under plans/active/CLP-0006-m05-provider-and-bank-simulator.md. Synthetic capture composition is implemented; M05.04–M05.19 and M06–M21 remain Not started/unbound.

Candidate independent QA PASS on e8aa4daa4a824b8d18b80046912a7695f89f1f4a/tree3f2e7ee7aa1fb6a12df5da107dd69c108164bb5a: fresh470 simulator/7files,366 behavior,702 lifecycle and2727 controls in353.77s, package type/lint/build/format/validator/whitespace PASS; no findings. Canonical reviewer SHA2567569ac2ccb622e8f8030df7b5ee8ea1bf8ab4e7981575ace142e221536061b7d. Root clean candidate QA18 PASS/0 FAIL/1 optional localDocker skip, no dirtyoverride. Root primary CI39134527410 both jobs SUCCESS:470 simulator/1785 ledger/2727 controls and all14 realPostgreSQL1227/no skips; THREE migrations recovery, both populated upgrades, exactschema/DEMO and owned+Composecleanup PASS. Actual tested d106060952e6da93321f6b66014ddbc3ba5ea4a4 parentsb41+e8aa/tree3f2/full localdiffEMPTY independently checked locally. Source/control/tests/spec remain byte-identical through361 nontracking paths; only22 legitimate handoff/navigation/status files change. Final-head clean QA/currentCI/independent local acceptance/publication/readback are required external gates after this handoff commit, with no further CI-copy-only commit. Warm dependencies/Turbocache; no cold-cache, systeminstall, live-model or localPostgreSQL claim. Reviewer primary-network denial remains respected; actual current GitHub/CI evidence is root-verified and explicitly attributed.

Complete exact-final-head clean QA, actual CI and independent local acceptance; publish canonical report/body/advisory and verify readiness, then PAUSED: HUMAN MERGE REQUIRED for sole PR84. Human alone Squash and merges. Verify actual84 merge before M05.04 Simulate payout created; later16 rows/M06–M21 remain closed. Root runs tests; user none. Native goal remains user-paused.
