# Active Docs

## Active docs boundary

Active docs define current project direction, workflow, milestone sequence, safety boundary, active execution state, and implementation expectations. CausalLedger is file-first: durable project state lives in repository docs, plans, validation evidence, and handoff packets. Reference docs can inform work but cannot override active docs.

## Read order

1. `docs/ACTIVE_DOCS.md`
2. `README.md`
3. `START_HERE.md`
4. `AGENTS.md`
5. `PLANS.md`
6. `WORKFLOW.md`
7. `docs/INDEX.md`
8. `plans/ROADMAP.md`
9. `docs/status/CURRENT_STATE.md`
10. `docs/status/NEXT_RECOMMENDED_THREAD.md`
11. Active plan in `plans/active/`, if one exists

## Canonical files

Project direction:

- `docs/INDEX.md`
- `docs/PROJECT_BRIEF.md`
- `docs/PRODUCT_VISION.md`
- `docs/ARCHITECTURE.md`
- `docs/DOMAIN_MODEL.md`
- `docs/domain/README.md`
- `docs/domain/payment-lifecycle.md`
- `docs/domain/ledger-vocabulary.md`
- `docs/domain/settlement-vocabulary.md`
- `docs/domain/reconciliation-vocabulary.md`
- `docs/domain/incident-vocabulary.md`
- `docs/domain/repair-vocabulary.md`
- `docs/domain/evidence-receipt-model.md`
- `docs/domain/human-review-states.md`
- `docs/domain/out-of-scope-domains.md`
- `docs/RELIABILITY.md`
- `docs/THREAT_MODEL.md`
- `docs/TOKEN_COST_STRATEGY.md`
- `docs/evals/ABLATION_STRATEGY.md`
- `docs/evals/ABLATION_MATRIX.md`
- `docs/VERSIONING.md`
- `docs/releases/RELEASE_LADDER.md`
- `docs/releases/V1_SCOPE.md`
- `CHANGELOG.md`

Roadmap and submilestones:

- `docs/milestones/SUBMILESTONE_REGISTRY.md`
- `docs/milestones/M00.md` through `docs/milestones/M21.md`
- `plans/ROADMAP.md`
- `docs/ops/planning-and-tracking-system.md`
- `docs/ops/builder-qa-prompt-protocol.md`
- `docs/ops/validation-and-handoff-workflow.md`
- `docs/ops/github-pr-and-issue-workflow.md`
- `docs/ops/github-labels-and-milestones.md`
- `docs/ops/branch-protection.md`
- `docs/ops/milestone-closeout-workflow.md`
- `docs/ops/repo-operating-system-freeze.md`

Prompt protocol:

- `prompts/template_builder_submilestone.md`
- `prompts/template_qa_submilestone.md`
- `prompts/template_handoff_packet.md`
- `prompts/template_milestone_closeout.md`
- `plans/templates/milestone-closeout-template.md`
- `.github/PULL_REQUEST_TEMPLATE.md`
- `.github/ISSUE_TEMPLATE/`

Current status:

- `docs/status/CURRENT_STATE.md`
- `docs/status/WEEKLY_LOG.md`
- `docs/status/NEXT_RECOMMENDED_THREAD.md`
- `docs/status/TECH_DEBT.md`
- `docs/status/RISK_REGISTER.md`
- `docs/status/OPEN_QUESTIONS.md`
- `docs/status/M00_FREEZE_READINESS.md`
- `docs/status/M00_CLOSEOUT.md`
- `docs/status/M01_DOMAIN_CONSISTENCY.md`
- `docs/status/M01_CLOSEOUT.md`

Completed execution:

- `plans/completed/CLP-0001-m00-repo-operating-system.md`
- `plans/completed/CLP-0002-m01-domain-model-and-scope-freeze.md`

Active execution:

- `plans/active/CLP-0003-m02-monorepo-and-local-development-environment.md` - active M02 planning plan. M02.01 through M02.20 remain `Not started`.

Plan state:

- Active plans live in `plans/active/`.
- Completed plans move to `plans/completed/`.
- Archived or stale plans move to `plans/archived/`.

## Core workflow rules

One submilestone uses:

- one branch
- one PR
- one builder thread
- one QA thread

QA must record PASS before merge. The PR must merge before the next submilestone starts.

Codex may stage, commit, and push scoped changes only when explicitly authorized by the prompt or human operator. Codex must not merge PRs into `main`; humans merge PRs after QA PASS and normal merge readiness checks.

Every builder and QA thread must run the branch guard before editing:

- `git branch --show-current`
- `git status --short`
- `git remote -v`

If the current branch does not match the expected submilestone branch, stop without editing. If the worktree is unexpectedly dirty, report the dirty files and stop unless those files are explicitly part of the requested submilestone.

## Conflict rule

- Active docs define intended direction.
- Current code defines implemented behavior.
- The active plan decides how to close gaps between intended direction and implemented behavior.
- `docs/milestones/SUBMILESTONE_REGISTRY.md` is the canonical detailed submilestone registry.

## Update rule

Every meaningful slice must update the active plan and relevant status docs in the same slice. If direction, workflow, milestone sequence, safety boundary, or implementation behavior changes, update the active docs in the same slice.

Update `README.md` when entry-point claims, repo map, safety summary, or major links change.

Update `docs/INDEX.md` when documentation structure, canonical links, or read order changes.

Update `docs/status/CURRENT_STATE.md` whenever current phase, active submilestone, active plan or completed plan, product code status, next action, or latest validation changes.

Update `docs/milestones/SUBMILESTONE_REGISTRY.md` whenever any submilestone status, branch, PR, active plan, or completion note changes.

Use `docs/ops/planning-and-tracking-system.md` for canonical submilestone status states, builder updates, QA updates, PR merge updates, blocked slices, failed QA, follow-up fixes, and synchronization rules.

Use `docs/ops/builder-qa-prompt-protocol.md` and the prompt templates in `prompts/` for reusable builder prompts, QA prompts, validation sections, forbidden-scope sections, same-branch same-PR rules, and handoff packet fields.

Use `docs/ops/validation-and-handoff-workflow.md` for validation ladder levels, required and optional commands, unavailable-command handling, validation failure handling, skipped-validation records, readiness criteria, and handoff packet expectations.

Use `docs/ops/github-pr-and-issue-workflow.md`, `docs/ops/github-labels-and-milestones.md`, `docs/ops/branch-protection.md`, `.github/PULL_REQUEST_TEMPLATE.md`, and `.github/ISSUE_TEMPLATE/` for remote PR review containers, issue structure, labels guidance, branch protection guidance, and merge-readiness discipline.

Use `docs/ops/milestone-closeout-workflow.md`, `prompts/template_milestone_closeout.md`, `plans/templates/milestone-closeout-template.md`, and `docs/status/M00_CLOSEOUT.md` for milestone closeout preconditions, packets, plan movement, deferrals, follow-up work, and next milestone readiness.

Use `docs/ops/repo-operating-system-freeze.md` and `docs/status/M00_FREEZE_READINESS.md` for M00 freeze readiness checks, control-plane coherence checks, no-product/no-M01 verification, and preparation for the M00 closeout thread.

## Archive rule

Stale docs must be moved to archived locations or clearly marked reference-only. If a stale doc cannot be updated in the current slice, record the limitation in status docs or tech debt and do not let it override active docs.
