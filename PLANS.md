# CausalLedger Plans

## When a plan is required

A CausalLedger Plan is required before any complex change, milestone work, product implementation, architecture change, workflow change, or safety-boundary change. If no active plan exists, create one before coding.

No active plans should exist for future milestones unless that milestone has been explicitly started by the user.

## Naming convention

Use `CLP-0001-short-name.md`. Increment the number monotonically and keep the short name action-oriented.

## Plan locations

- Active plans live in `plans/active/`.
- Completed plans move to `plans/completed/`.
- Archived or stale plans move to `plans/archived/`.

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

## QA rules

QA must inspect the target submilestone, run validation, record defects, and produce PASS or FAIL with a safe-to-proceed decision.

QA threads must use the same branch and PR as the builder thread. Every submilestone requires one builder thread and one separate QA thread. The next submilestone must not start until QA records PASS and the PR is merged.

## Milestone closeout rules

Closeout must summarize completed submilestones, validation evidence, changed docs, changed code, remaining gaps, risks, and readiness for the next milestone.

Do not move an active plan to `plans/completed/` until milestone closeout is complete.

## Plan truthfulness rules

Plans must describe only implemented or explicitly planned work. Do not mark a submilestone complete until required validation has passed or the active plan records an explicit accepted limitation. Do not claim placeholder directories, future modules, or roadmap items as working features.
