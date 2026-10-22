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

## Delivery and learning policy

This amendment becomes effective only after its independent review and human merge. Product progression is paused during setup and while the learning prerequisite is unresolved. Preserve V1_PUBLIC_PRODUCT, architecture, original milestone acceptance criteria and deterministic financial controls. This is a delivery-policy amendment, not a scope or sequencing approval.

### Delivery unit and explicit precedence

A delivery unit may contain related original subtasks within one existing milestone when external dependencies are verified human-merged, internal technical dependencies are implemented and tested in order, every original acceptance criterion maps to evidence, and implementation, demonstration, rollback and failure boundaries remain reasonably reviewable. Keep each original ID and its individual completion evidence; shared branch/PR references do not complete unfinished requirements.

Use one active implementation branch, one PR, one coordinator/editor and one separate-context independent reviewer for the current unit, unless a separately approved exception exists. Split a bundle when its combined risk cannot be reasonably reviewed. Storage migrations, posting semantics, concurrency, authorization and agent financial-access boundaries must remain independently reviewable. Do not combine unrelated features, place an entire milestone or multiple milestones into an uncontrolled PR, remove independent review, or skip formal QA and milestone closeouts.

This explicitly replaces the one-PR/branch/builder/QA-per-microtask requirement and the need for a human merge between internal subtasks of an approved unit in:

- this file's workspace/thread rules;
- `docs/ops/builder-qa-prompt-protocol.md` and existing builder/QA templates;
- `docs/ops/github-pr-and-issue-workflow.md` branch/PR naming and next-submilestone clauses;
- `docs/ops/planning-and-tracking-system.md` per-row progression/finalization clauses;
- the active M05 plan's delivery-container wording, as identified in its workflow-amendment section.

For those clauses, the unit boundary replaces the microtask interruption boundary; original IDs remain acceptance traceability. Human-merged prerequisites between units, financial correctness, formal milestone gates and human-only merging remain mandatory. No future bundle is selected by this amendment: its mapped IDs, dependencies, tests, demonstration and rollback must first be recorded in the existing active plan within authorized scope.

### Normal implementation cycle

1. Read the current goal, actual Git/PR state and approved requirements. Resolve stale handoffs before editing.
2. Briefly explain the intended outcome, scope and demonstration; generate the unit brief in the existing active plan, including all mapped IDs and criteria.
3. Implement and run relevant deterministic checks. Obtain separate-context independent review, fix confirmed findings and re-review the corrected state. Stop after three unsuccessful repairs of the same unresolved defect and report the blocker.
4. Commit and push scoped work; verify required CI on the final reviewed PR state. If behavior materially changes after review or walkthrough, refresh affected review, tests and explanation.
5. Present the learning and human-review checkpoint. Wait for the user's response and actual human merge; do not start the next dependent unit while this PR awaits merge or a required prerequisite explanation remains unresolved.
6. Accept natural-language merge reports, discover the actual merge SHA, and verify reviewed contents using squash-aware tree/diff checks and main reachability. Do not require the source commit to be an ancestor of main. If merged early, explain outstanding learning and pause before more product work.

Routine navigation, safe branch operations, scoped edits/commits/pushes, PR preparation, reviewer coordination and CI checks already authorized by the unit do not need repeated approval. Technical readiness, independent review and user understanding are separate: model self-scoring, governance checks and action-permission approvals replace none of them. Codex never merges or enables auto-merge.

### Learning checkpoints

A substantial checkpoint is mandatory for a new core capability; changes to money representation, posting, idempotency, persistence, access control, evidence integrity or agent authority; a major integration; milestone completion or a materially different domain; and whenever the user is lost or asks to catch up. Mechanical changes without behavior or policy changes need only a brief explanation. Consolidate repeated novelty around its capability rather than repeating lessons. Before depending on a capability the user has not understood, pause and explain it.

Use the heading **PAUSED: LEARNING AND REVIEW CHECKPOINT**. Keep a substantial walkthrough to approximately 10–20 minutes:

- **A. Purpose:** the business or engineering problem.
- **B. Real behavior:** one actual synthetic input/output and the short component path; distinguish fresh execution from historical evidence.
- **C. Reading:** at most three current files or selected functions, each with a reason.
- **D. Exercise:** one safe existing test/demo command, expected behavior and setup recovery. Use disposable synthetic inputs; no production/shared data edits or changed committed expectations.
- **E. Failure and limitation:** one detected failure and one thing success does not prove.
- **F. Teach-back:** ask up to three short questions about input/output, the boundary and failure; wait for answers. Explain misunderstandings from the implementation, without artificial grades or an endless exam. Never supply answers on the user's behalf and mark the checkpoint complete.

An explicitly deferred lesson remains deferred, not understood. A message saying "continue" does not prove the user ran a demonstration. Attribute personal execution only to the user's report.

### Persistent context and safe settings

Keep one short learning section in `docs/status/PROJECT_COMPLETION_GOAL.md`: current capability/milestone; actual branch/PR state; last capability reviewed by the user; user-reported runs; unresolved/deferred understanding; next checkpoint/reason; next technical action or human gate. Keep detailed execution evidence in existing plans/tests/PRs. Carry conversational learning updates into the next legitimate scoped commit or established review record; no checkbox-only commits or routine finalization-of-finalization PRs. Record verified post-merge facts in that next update, retaining genuine milestone closeouts. Preserve a truthful checkpoint before interruption; a new session reads the goal and actual Git state, not an assumed transferred native Goal.

The front matter is repository workflow metadata, not the installed client's effective permission configuration. Inspect the actual client/configuration before recommending settings changes. Prefer workspace writes and on-request additional permissions; keep sandbox/network restrictions, the selected model and human merge. Do not automatically widen permissions, change global settings, disable the sandbox or bypass denials. Learning pauses belong here, not in an invented client setting. Paid model calls, installations, deployment, release tags and public publication still require explicit approval.

Actual PostgreSQL claims require actual PostgreSQL tests; benchmark actor inputs remain separate from grader-only information. Preserve provenance, uncertainty and distinct delivery/event/posting identity, bounded read-only/proposal-only AI authority and human authorization of consequential actions. Paired benign duplicate delivery, faulty external duplicate posting and delayed evidence remain the approved integration thread where applicable. A thin demo cannot silently complete later UI/benchmark requirements or authorize new sequencing/scope.


## Workspace strategy

Use a file-first workflow. Treat docs, plans, validation evidence, and handoff packets as the durable project state.

Use one active branch and one PR per delivery unit under the activation and eligibility rules above. Builder and independent QA use that same branch and PR; all original subtask IDs remain mapped.

Use `docs/ops/planning-and-tracking-system.md` for canonical submilestone statuses and required tracking updates before builder, after builder, after QA, after PR merge, and when blocked.

Use `docs/ops/builder-qa-prompt-protocol.md` and the prompt templates in `prompts/` for reusable builder prompts, QA prompts, and handoff packets.

Use `docs/ops/validation-and-handoff-workflow.md` for validation ladder levels, unavailable-command handling, validation failures, skipped checks, readiness criteria, and handoff packet requirements.

Use `docs/ops/github-pr-and-issue-workflow.md` for PR naming, issue usage, draft PR guidance, same-branch same-PR discipline, QA fixes, failed QA, merge conflicts, branch deletion, missing GitHub CLI handling, and merge readiness. Use `docs/ops/github-labels-and-milestones.md` and `docs/ops/branch-protection.md` for manual GitHub organization and `main` protection guidance. Use `.github/PULL_REQUEST_TEMPLATE.md` and `.github/ISSUE_TEMPLATE/` for GitHub review containers.

Use `docs/ops/milestone-closeout-workflow.md`, `prompts/template_milestone_closeout.md`, and `plans/templates/milestone-closeout-template.md` for milestone closeout packets, active-plan movement, deferrals, and next milestone readiness.

Use `docs/ops/repo-operating-system-freeze.md` and `docs/status/M00_FREEZE_READINESS.md` for M00 freeze readiness checks and preparation for milestone closeout.

Use `docs/VERSIONING.md`, `docs/releases/RELEASE_LADDER.md`, `docs/releases/V1_SCOPE.md`, and `CHANGELOG.md` for release versioning, release-scope, and overclaim-prevention guidance.

M00–M04 are closed; V1_PUBLIC_PRODUCT remains approved. M05.01 and M05.02 are Completed and merged in verified PR82/PR83. M05.03 Simulate payment captured is QA passed, awaiting merge for sole PR #84 on m05-03-simulate-payment-captured under plans/active/CLP-0006-m05-provider-and-bank-simulator.md. Synthetic capture composition is implemented; M05.04–M05.19 and M06–M21 remain Not started/unbound.

## Sandbox assumptions

Default future work assumes workspace-write sandboxing and restricted network unless explicitly changed by the active environment.

## Approval policy

Financial mutation, repair application, evidence deletion, external release, ledger mutation, and policy override require human approval.

## Validation policy

Every meaningful slice needs validation scaled to risk. Control-plane changes use control-plane validation only. Product behavior must later add deterministic tests before claims are made. Validation ladder levels and readiness criteria are defined in `docs/ops/validation-and-handoff-workflow.md`.

## Safety policies

Agents may investigate, summarize, and propose. Agents may not own financial truth, mutate money, approve repairs, post ledger entries, modify raw events, delete evidence, or override invariants.

## Thread policy

Retain milestone planning and formal closeout gates. Use one coordinator/editor and one separate-context independent reviewer per delivery unit, under the policy above; extra user-owned chats are not required for routine internal subtasks.

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


Current M05.03 capture: M00–M04 are closed; V1_PUBLIC_PRODUCT remains approved. M05.01 and M05.02 are Completed and merged in verified PR82/PR83. M05.03 Simulate payment captured is QA passed, awaiting merge for sole PR #84 on m05-03-simulate-payment-captured under plans/active/CLP-0006-m05-provider-and-bank-simulator.md. Synthetic capture composition is implemented; M05.04–M05.19 and M06–M21 remain Not started/unbound.


## M05.02 current checkpoint (2026-10-16)

M00–M04 are closed; V1_PUBLIC_PRODUCT remains approved. M05.01 is Completed and merged in verified human PR82. M05.02 Simulate payment authorized is QA passed, awaiting merge for sole PR #83 on m05-02-simulate-payment-authorized under plans/active/CLP-0006-m05-provider-and-bank-simulator.md. Only the synthetic authorization generator is implemented. Independent candidate acceptance passed; final tracking-head gates and human merge remain. M05.03–M05.19 and M06–M21 remain Not started/unbound.

Human PR82 merged ac092fcb7b0ee16459b1ca1177d4b9b10e0df5ce at 2026-10-16T14:20:14Z by nonbot Islem-Rezzag. Reviewed b0c0e32daf91d95cd9bff555a766dadc0cfc7501 and squash have identical tree 0d2f821264fc0c55ae6ed77eb4ebc65729776014, full diff EMPTY and fetched-main reachability PASS. Root and existing independent reviewer verified primary merge/CI/body/advisory6153826833/canonical reviewer hash bindings. Final simulator107, lifecycle540, controls2397, root clean18/0/1 and both CI38455025292 PASS; ledger1785 and all14 real PostgreSQL suites1227/no skips, recovery/upgrades/schema/DEMO/cleanup PASS. Prior candidate309 behavior probes were carried through356 byte-identical nontracking files, not rerun as fresh final probes. No unchanged01 tests rerun merely to verify merge.

Current02 generator validation is recorded in CURRENT_STATE.md and active CLP0006. Root runs tests; user none. No future feature or financial authority.


## M05.03 current checkpoint (2026-10-18)

M00–M04 are closed; V1_PUBLIC_PRODUCT remains approved. M05.01 and M05.02 are Completed and merged in verified PR82/PR83. M05.03 Simulate payment captured is QA passed, awaiting merge for sole PR #84 on m05-03-simulate-payment-captured under plans/active/CLP-0006-m05-provider-and-bank-simulator.md. Synthetic capture composition is implemented; M05.04–M05.19 and M06–M21 remain Not started/unbound.

Candidate independent QA PASS on e8aa4daa4a824b8d18b80046912a7695f89f1f4a/tree3f2e7ee7aa1fb6a12df5da107dd69c108164bb5a: fresh470 simulator/7files,366 behavior,702 lifecycle and2727 controls in353.77s, package type/lint/build/format/validator/whitespace PASS; no findings. Canonical reviewer SHA2567569ac2ccb622e8f8030df7b5ee8ea1bf8ab4e7981575ace142e221536061b7d. Root clean candidate QA18 PASS/0 FAIL/1 optional localDocker skip, no dirtyoverride. Root primary CI39134527410 both jobs SUCCESS:470 simulator/1785 ledger/2727 controls and all14 realPostgreSQL1227/no skips; THREE migrations recovery, both populated upgrades, exactschema/DEMO and owned+Composecleanup PASS. Actual tested d106060952e6da93321f6b66014ddbc3ba5ea4a4 parentsb41+e8aa/tree3f2/full localdiffEMPTY independently checked locally. Source/control/tests/spec remain byte-identical through361 nontracking paths; only22 legitimate handoff/navigation/status files change. Final-head clean QA/currentCI/independent local acceptance/publication/readback are required external gates after this handoff commit, with no further CI-copy-only commit. Warm dependencies/Turbocache; no cold-cache, systeminstall, live-model or localPostgreSQL claim. Reviewer primary-network denial remains respected; actual current GitHub/CI evidence is root-verified and explicitly attributed.

Complete exact-final-head clean QA, actual CI and independent local acceptance; publish canonical report/body/advisory and verify readiness, then PAUSED: HUMAN MERGE REQUIRED for sole PR84. Human alone Squash and merges. Verify actual84 merge before M05.04 Simulate payout created; later16 rows/M06–M21 remain closed. Root runs tests; user none. Native goal remains user-paused.
