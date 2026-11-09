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

- `docs/specs/simulator-refund-lifecycle.md` - human-merged07–08 bounded refund contract.
- `docs/specs/simulator-dispute-and-fee.md` - current09–10 bounded dispute and explicit fee contract.
- `docs/specs/simulator-payment-authorized.md` - human-merged02 synthetic authorization contract.
- `docs/specs/simulator-payment-captured.md` - human-merged03 synthetic capture request/output/error/byte contract and optional VS Code demonstration.
- `docs/specs/simulator-payout-lifecycle.md` - human-merged04–06 payout composition contract.
Project direction:

- `docs/INDEX.md`
- `docs/PROJECT_BRIEF.md`
- `docs/PRODUCT_VISION.md`
- `docs/ARCHITECTURE.md`
- `docs/DOMAIN_MODEL.md`
- `docs/MONEYEVENT_CONTRACT.md`
- `docs/MONEYEVENT_MAPPING_FIXTURES.md`
- `docs/MONEYEVENT_VALIDATION_NORMALIZATION.md`
- `docs/MONEYEVENT_FIXTURES_BENCHMARK_SEEDS.md`
- `docs/domain/README.md`
- `docs/domain/payment-lifecycle.md`
- `docs/specs/account-schema.md` - implemented M04.01 Account metadata contract and validation boundaries.
- `docs/specs/ledger-transaction-schema.md` - M04.02 transaction header metadata, provenance, time and retry-key boundaries.
- `docs/specs/ledger-entry-schema.md` - M04.03 exact wire money, side and supplied account/header references.
- `docs/specs/ledger-journal-validation.md` - M04.04 exact per-currency journal equality and whole-group refusal, without posting.
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
- `docs/decisions/ADR-0008-identity-money-and-storage.md`
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
- `docs/ops/qa-development-environment.md`
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
- `docs/status/M02_CLOSEOUT.md`
- `docs/status/M03_CLOSEOUT_READINESS.md`
- `docs/status/M03_CLOSEOUT.md`
- `docs/status/PROJECT_COMPLETION_GOAL.md`
- `docs/status/PROJECT_COMPLETION_GOAL.json`
- `docs/status/LOCAL_ENVIRONMENT_READINESS.md`
- `docs/status/PROJECT_COMPLETION_AUDIT.md`
- `docs/public/PUBLIC_RELEASE_EVIDENCE_PLAN.md`

Completed execution:

- `plans/completed/CLP-0001-m00-repo-operating-system.md`
- `plans/completed/CLP-0002-m01-domain-model-and-scope-freeze.md`
- `plans/completed/CLP-0003-m02-monorepo-and-local-development-environment.md`
- `plans/completed/CLP-0004-m03-canonical-moneyevent-engine.md`
- `plans/completed/CLP-0005-m04-double-entry-ledger-core.md`
- `plans/proposals/CLP-PROJECT-COMPLETION-GOAL.md`

Active execution:

- M00–M04 are closed; V1_PUBLIC_PRODUCT remains approved. M05.01–M05.08 are Completed and merged, including verified human PR87. M05.09–M05.10 synthetic dispute and fee is QA passed, awaiting merge for sole draft PR #88 on codex/m05-dispute-and-fee under plans/active/CLP-0006-m05-provider-and-bank-simulator.md. Independent candidate919 simulator/172 API cases and affected90 controls passed; root2815 controls and clean QA18/0/1 passed. Final tracking confirmation, current CI, learning and human merge remain. M05.11–M05.19 and M06–M21 remain Not started/unbound.

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

- M04.06 balance contract: `docs/specs/ledger-account-balance-query.md`; human PR67 merge and final acceptance proof verified in completed CLP-0005.
- M04.07 transaction query contract: `docs/specs/ledger-transaction-query.md`; complete journal readback and explicit pagination boundaries, accepted evidence in completed CLP-0005.


Current formal-closeout packet: `docs/status/M04_CLOSEOUT.md`; M04 is completed; current planning uses plans/active/CLP-0006-m05-provider-and-bank-simulator.md.


Historical M05.03 capture snapshot (superseded by current dispute/fee state above): M00–M04 are closed; V1_PUBLIC_PRODUCT remains approved. M05.01 and M05.02 are Completed and merged in verified PR82/PR83. M05.03 Simulate payment captured is QA passed, awaiting merge for sole PR #84 on m05-03-simulate-payment-captured under plans/active/CLP-0006-m05-provider-and-bank-simulator.md. Synthetic capture composition is implemented; M05.04–M05.19 and M06–M21 remain Not started/unbound.


## M05.02 current checkpoint (2026-10-16)

M00–M04 are closed; V1_PUBLIC_PRODUCT remains approved. M05.01 is Completed and merged in verified human PR82. M05.02 Simulate payment authorized is QA passed, awaiting merge for sole PR #83 on m05-02-simulate-payment-authorized under plans/active/CLP-0006-m05-provider-and-bank-simulator.md. Only the synthetic authorization generator is implemented. Independent candidate acceptance passed; final tracking-head gates and human merge remain. M05.03–M05.19 and M06–M21 remain Not started/unbound.

Human PR82 merged ac092fcb7b0ee16459b1ca1177d4b9b10e0df5ce at 2026-10-16T14:20:14Z by nonbot Islem-Rezzag. Reviewed b0c0e32daf91d95cd9bff555a766dadc0cfc7501 and squash have identical tree 0d2f821264fc0c55ae6ed77eb4ebc65729776014, full diff EMPTY and fetched-main reachability PASS. Root and existing independent reviewer verified primary merge/CI/body/advisory6153826833/canonical reviewer hash bindings. Final simulator107, lifecycle540, controls2397, root clean18/0/1 and both CI38455025292 PASS; ledger1785 and all14 real PostgreSQL suites1227/no skips, recovery/upgrades/schema/DEMO/cleanup PASS. Prior candidate309 behavior probes were carried through356 byte-identical nontracking files, not rerun as fresh final probes. No unchanged01 tests rerun merely to verify merge.

Current02 generator validation is recorded in CURRENT_STATE.md and active CLP0006. Root runs tests; user none. No future feature or financial authority.


## M05.03 current checkpoint (2026-10-18)

M00–M04 are closed; V1_PUBLIC_PRODUCT remains approved. M05.01 and M05.02 are Completed and merged in verified PR82/PR83. M05.03 Simulate payment captured is QA passed, awaiting merge for sole PR #84 on m05-03-simulate-payment-captured under plans/active/CLP-0006-m05-provider-and-bank-simulator.md. Synthetic capture composition is implemented; M05.04–M05.19 and M06–M21 remain Not started/unbound.

Candidate independent QA PASS on e8aa4daa4a824b8d18b80046912a7695f89f1f4a/tree3f2e7ee7aa1fb6a12df5da107dd69c108164bb5a: fresh470 simulator/7files,366 behavior,702 lifecycle and2727 controls in353.77s, package type/lint/build/format/validator/whitespace PASS; no findings. Canonical reviewer SHA2567569ac2ccb622e8f8030df7b5ee8ea1bf8ab4e7981575ace142e221536061b7d. Root clean candidate QA18 PASS/0 FAIL/1 optional localDocker skip, no dirtyoverride. Root primary CI39134527410 both jobs SUCCESS:470 simulator/1785 ledger/2727 controls and all14 realPostgreSQL1227/no skips; THREE migrations recovery, both populated upgrades, exactschema/DEMO and owned+Composecleanup PASS. Actual tested d106060952e6da93321f6b66014ddbc3ba5ea4a4 parentsb41+e8aa/tree3f2/full localdiffEMPTY independently checked locally. Source/control/tests/spec remain byte-identical through361 nontracking paths; only22 legitimate handoff/navigation/status files change. Final-head clean QA/currentCI/independent local acceptance/publication/readback are required external gates after this handoff commit, with no further CI-copy-only commit. Warm dependencies/Turbocache; no cold-cache, systeminstall, live-model or localPostgreSQL claim. Reviewer primary-network denial remains respected; actual current GitHub/CI evidence is root-verified and explicitly attributed.

Complete exact-final-head clean QA, actual CI and independent local acceptance; publish canonical report/body/advisory and verify readiness, then PAUSED: HUMAN MERGE REQUIRED for sole PR84. Human alone Squash and merges. Verify actual84 merge before M05.04 Simulate payout created; later16 rows/M06–M21 remain closed. Root runs tests; user none. Native goal remains user-paused.
