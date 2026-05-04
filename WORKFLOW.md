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

## Evidence policy

Raw evidence must be preserved, provenance must be explicit, and future evidence bundles must be reproducible. Placeholder files do not implement evidence behavior.

## Acceptance defaults

A slice is acceptable only when scope is contained, active docs stay consistent, validation passes or limitations are recorded, and the handoff packet is clear enough for the next Codex thread.
