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

## Sandbox assumptions

Default future work assumes workspace-write sandboxing and restricted network unless explicitly changed by the active environment.

## Approval policy

Financial mutation, repair application, evidence deletion, external release, ledger mutation, and policy override require human approval.

## Validation policy

Every meaningful slice needs validation scaled to risk. Control-plane changes use control-plane validation only. Product behavior must later add deterministic tests before claims are made.

## Safety policies

Agents may investigate, summarize, and propose. Agents may not own financial truth, mutate money, approve repairs, post ledger entries, modify raw events, delete evidence, or override invariants.

## Thread policy

Use one planning thread per milestone, one builder thread per submilestone, one QA thread per submilestone, and one closeout thread per milestone.

Every builder and QA prompt must include the branch guard:

- `git branch --show-current`
- `git status --short`
- `git remote -v`

If the branch is wrong or the worktree is unexpectedly dirty, stop before editing and report the blocker. Open a draft PR before QA when possible. QA runs in a separate thread on the same branch. Merge only after QA records PASS.

## Validation commands

Control-plane slices must run:

- `python scripts/validate-control-plane.py`
- `python -m pytest tests/test_control_plane_bootstrap.py`
- `git diff --check`

Run `make bootstrap-check` when `make` is available. On Windows, `make` may be unavailable; direct Python validation commands are acceptable and the limitation must be recorded.

## Status and handoff

Every meaningful slice must update the active plan, `docs/status/CURRENT_STATE.md`, `docs/status/WEEKLY_LOG.md`, `docs/status/NEXT_RECOMMENDED_THREAD.md`, and any relevant risk or tech-debt notes.

Handoff packets must include changed files, files intentionally not touched, validation commands, validation results, risks or limitations, completion status, product implementation status, and exact next recommended thread.

## Local shell guidance

Git Bash is preferred for Git workflow where available. PowerShell is acceptable for local reads, validation, and simple Git commands. Keep line endings consistent and use `git diff --check` before handoff.

## Evidence policy

Raw evidence must be preserved, provenance must be explicit, and future evidence bundles must be reproducible. Placeholder files do not implement evidence behavior.

## Acceptance defaults

A slice is acceptable only when scope is contained, active docs stay consistent, validation passes or limitations are recorded, and the handoff packet is clear enough for the next Codex thread.
