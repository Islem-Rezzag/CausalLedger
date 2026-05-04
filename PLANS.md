# CausalLedger Plans

## When a plan is required

A CausalLedger Plan is required before any complex change, milestone work, product implementation, architecture change, workflow change, or safety-boundary change. If no active plan exists, create one before coding.

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

## QA rules

QA must inspect the target submilestone, run validation, record defects, and produce PASS or FAIL with a safe-to-proceed decision.

## Milestone closeout rules

Closeout must summarize completed submilestones, validation evidence, changed docs, changed code, remaining gaps, risks, and readiness for the next milestone.
