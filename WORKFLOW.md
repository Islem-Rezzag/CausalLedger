---
name: causalledger-repo-workflow
workspace:
  root: .
  strategy: git-worktree
tracker:
  kind: causalledger-plan
  mode: file-first
agent:
  runtime: codex
  default_model: ${CODEX_DEFAULT_MODEL}
  approval_policy: unless_trusted
  sandbox: workspace_write
  network_access: restricted
policies:
  allow_auto_merge: false
  allow_external_writes: false
  require_active_plan_for_complex_work: true
  require_qa_thread: true
  require_evidence_bundle_for_incident_behavior: true
  require_replay_for_financial_state_behavior: true
  require_human_approval_for:
    - repair-application
    - ledger-mutation
    - evidence-deletion
    - external-release
    - policy-override
hooks:
  before_run: |
    test -f README.md && test -f AGENTS.md && echo "CausalLedger repo ready"
  after_run: |
    echo "update active plan, status files, validation evidence, and handoff packet"
---

# Workflow

## Workspace strategy

Use a file-first workflow. Treat docs, plans, validation evidence, and handoff packets as the durable project state.

Use one branch per submilestone. Builder and QA threads for that submilestone must use the same branch and the same PR.

Use `docs/ops/planning-and-tracking-system.md` for canonical submilestone statuses and required tracking updates before builder, after builder, after QA, after PR merge, and when blocked.

Use `docs/ops/builder-qa-prompt-protocol.md` and the prompt templates in `prompts/` for reusable builder prompts, QA prompts, and handoff packets.

Use `docs/ops/validation-and-handoff-workflow.md` for validation ladder levels, unavailable-command handling, validation failures, skipped checks, readiness criteria, and handoff packet requirements.

Use `docs/ops/github-pr-and-issue-workflow.md` for PR naming, issue usage, draft PR guidance, same-branch same-PR discipline, QA fixes, failed QA, merge conflicts, branch deletion, missing GitHub CLI handling, and merge readiness. Use `docs/ops/github-labels-and-milestones.md` and `docs/ops/branch-protection.md` for manual GitHub organization and `main` protection guidance. Use `.github/PULL_REQUEST_TEMPLATE.md` and `.github/ISSUE_TEMPLATE/` for GitHub review containers.

Use `docs/ops/milestone-closeout-workflow.md`, `prompts/template_milestone_closeout.md`, and `plans/templates/milestone-closeout-template.md` for milestone closeout packets, active-plan movement, deferrals, and next milestone readiness.

Use `docs/ops/repo-operating-system-freeze.md` and `docs/status/M00_FREEZE_READINESS.md` for M00 freeze readiness checks and preparation for milestone closeout.

Use `docs/VERSIONING.md`, `docs/releases/RELEASE_LADDER.md`, `docs/releases/V1_SCOPE.md`, and `CHANGELOG.md` for release versioning, release-scope, and overclaim-prevention guidance.

## Sandbox assumptions

Default future work assumes workspace-write sandboxing and restricted network unless explicitly changed by the active environment.

## Approval policy

Financial mutation, repair application, evidence deletion, external release, ledger mutation, and policy override require human approval.

## Validation policy

Every meaningful slice needs validation scaled to risk. Control-plane changes use control-plane validation only. Product behavior must later add deterministic tests before claims are made. Validation ladder levels and readiness criteria are defined in `docs/ops/validation-and-handoff-workflow.md`.

## Safety policies

Agents may investigate, summarize, and propose. Agents may not own financial truth, mutate money, approve repairs, post ledger entries, modify raw events, delete evidence, or override invariants.

## Thread policy

Use one planning thread per milestone, one builder thread per submilestone, one QA thread per submilestone, and one closeout thread per milestone.

Milestone closeout threads must verify all required submilestones are completed and merged or explicitly deferred before recommending the next milestone.

Every builder and QA prompt must include the branch guard:

- `git branch --show-current`
- `git status --short`
- `git remote -v`

If the branch is wrong or the worktree is unexpectedly dirty, stop before editing and report the blocker. Open or update a draft PR before QA when possible. QA runs in a separate thread on the same branch and PR. Merge only after QA records PASS.

Codex may stage, commit, and push scoped changes only when explicitly authorized. Codex must not merge PRs into `main`; humans merge PRs after QA PASS and merge readiness checks.

## Validation commands

Control-plane slices must run:

- `python scripts/validate-control-plane.py`
- `python -m pytest tests/test_control_plane_bootstrap.py`
- `git diff --check`

Run `make bootstrap-check` when `make` is available. On Windows, `make` may be unavailable; direct Python validation commands are acceptable and the limitation must be recorded.

## Status and handoff

Every meaningful slice must update the active plan, `docs/status/CURRENT_STATE.md`, `docs/status/WEEKLY_LOG.md`, `docs/status/NEXT_RECOMMENDED_THREAD.md`, and any relevant risk or tech-debt notes.

Handoff packets must include submilestone ID and name, branch, active plan, changed files, files intentionally not touched, validation commands, command results, skipped validation, warnings, readiness statements, completion status, product implementation status, and exact next recommended thread.

## Local shell guidance

Git Bash is preferred for Git workflow where available. PowerShell is acceptable for local reads, validation, and simple Git commands. Keep line endings consistent and use `git diff --check` before handoff.

## Evidence policy

Raw evidence must be preserved, provenance must be explicit, and future evidence bundles must be reproducible. Placeholder files do not implement evidence behavior.

## Acceptance defaults

A slice is acceptable only when scope is contained, active docs stay consistent, validation passes or limitations are recorded, and the handoff packet is clear enough for the next Codex thread.
