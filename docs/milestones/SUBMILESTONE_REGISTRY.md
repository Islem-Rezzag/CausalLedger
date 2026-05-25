# Submilestone Registry

This is the canonical M00-M21 submilestone registry for CausalLedger.

Status values: Not started, Builder in progress, Builder complete, awaiting QA, QA in progress, QA passed, awaiting merge, Completed and merged, Blocked, Deferred.

| ID | Name | Milestone | Status | Active Plan | Branch | PR | Last Validation | Last Updated | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| M00.01 | Roadmap and submilestone registry | M00 Repo operating system | Completed and merged | plans/completed/CLP-0001-m00-repo-operating-system.md | m00-01-roadmap-submilestone-registry | #1 | 2026-05-05 QA validation passed | 2026-05-11 | Merged after M00.01 QA PASS; roadmap and submilestone registry established. |
| M00.02 | Active docs and repo guidance | M00 Repo operating system | Completed and merged | plans/completed/CLP-0001-m00-repo-operating-system.md | m00-02-active-docs-and-repo-guidance | #2 | 2026-05-06 QA validation passed | 2026-05-11 | Merged after M00.02 QA PASS; active docs and repo guidance tightened. |
| M00.03 | Planning and tracking system | M00 Repo operating system | Completed and merged | plans/completed/CLP-0001-m00-repo-operating-system.md | m00-03-planning-and-tracking-system |  | 2026-05-06 QA validation passed | 2026-05-11 | Merged into main at commit f289d5e; planning and tracking lifecycle finalized before M00.04 builder work. |
| M00.04 | Builder and QA prompt protocol | M00 Repo operating system | Completed and merged | plans/completed/CLP-0001-m00-repo-operating-system.md | m00-04-builder-and-qa-prompt-protocol |  | 2026-05-08 QA validation passed | 2026-05-11 | Merged into main at commit e686c77; protocol and templates finalized before M00.05 builder work. |
| M00.05 | Validation and handoff workflow | M00 Repo operating system | Completed and merged | plans/completed/CLP-0001-m00-repo-operating-system.md | m00-05-validation-and-handoff-workflow | #5 | 2026-05-09 QA validation passed | 2026-05-11 | Merged into main at commit b82e5d1; validation and handoff workflow finalized before M00.06 builder work. |
| M00.06 | GitHub PR and issue workflow | M00 Repo operating system | Completed and merged | plans/completed/CLP-0001-m00-repo-operating-system.md | m00-06-github-pr-and-issue-workflow | #6 | 2026-05-09 QA validation passed | 2026-05-11 | Merged into main at commit a0fdf6bc422f573235d48ee8cde93fd92d25e617; GitHub PR, issue, label, milestone, and branch protection workflow finalized before M00.07 builder work. |
| M00.07 | Milestone closeout workflow | M00 Repo operating system | Completed and merged | plans/completed/CLP-0001-m00-repo-operating-system.md | m00-07-milestone-closeout-workflow | #7 | 2026-05-10 QA validation passed | 2026-05-11 | Merged into main at commit ae19cd0e4b34ad8c16c3d4f8ee1adbe08e7575f6; milestone closeout workflow finalized before M00.08 builder work. |
| M00.08 | Repo operating system QA and freeze | M00 Repo operating system | Completed and merged | plans/completed/CLP-0001-m00-repo-operating-system.md | m00-08-repo-operating-system-qa-and-freeze | #8 | 2026-05-10 QA validation passed | 2026-05-11 | Finalized after PR #8 merge into main at commit db312d16f3059a2714f929c4bcb831d4a6a5a173; freeze guide, readiness report, control-plane consistency, validation coverage, no-product boundary, and no-M01 boundary verified. |
| M01.01 | Define payment lifecycle | M01 Domain model and scope freeze | Completed and merged | plans/active/CLP-0002-m01-domain-model-and-scope-freeze.md | m01-01-qa-recovery-define-payment-lifecycle | #11; QA recovery #12 merged | 2026-05-11: post-merge QA recovery passed; validate-control-plane passed; pytest 18 passed; git diff --check passed; make unavailable | 2026-05-15 | Builder PR #11 was squash-merged before required QA at commit 1175789; the protocol deviation was recovered by QA recovery PR #12 merged at commit 6480c1d before M01.02 began. |
| M01.02 | Define ledger vocabulary | M01 Domain model and scope freeze | Completed and merged | plans/active/CLP-0002-m01-domain-model-and-scope-freeze.md | m01-02-define-ledger-vocabulary | #13 merged | 2026-05-15: QA validation passed before merge; validate-control-plane passed; pytest 19 passed; git diff --check passed; make unavailable; merged at commit fd1e259 | 2026-05-15 | Domain documentation only; product implementation has not started. |
| M01.03 | Define settlement vocabulary | M01 Domain model and scope freeze | Completed and merged | plans/active/CLP-0002-m01-domain-model-and-scope-freeze.md | m01-03-define-settlement-vocabulary | #14 merged | 2026-05-16: QA validation passed before merge; validate-control-plane passed; pytest 20 passed; git diff --check passed; make unavailable; merged at commit e54a917 | 2026-05-16 | Domain documentation only; no settlement runtime, reconciliation logic, schemas, invariants, incidents, graph, replay, connectors, or product behavior. |
| M01.04 | Define reconciliation vocabulary | M01 Domain model and scope freeze | Completed and merged | plans/active/CLP-0002-m01-domain-model-and-scope-freeze.md | m01-04-define-reconciliation-vocabulary | #15 | 2026-05-16: QA validation passed; validate-control-plane passed; pytest 21 passed; git diff --check passed; make unavailable | 2026-05-16 | Domain documentation only; merged at commit `5dfe928` (`docs: define M01.04 reconciliation vocabulary (#15)`) before M01.05 builder work began. |
| M01.05 | Define incident vocabulary | M01 Domain model and scope freeze | Completed and merged | plans/active/CLP-0002-m01-domain-model-and-scope-freeze.md | m01-05-qa-recovery-incident-vocabulary-ablation-strategy | #16; QA recovery #18 merged | 2026-05-17: post-merge finalization passed; validate-control-plane passed; pytest 23 passed; git diff --check passed | 2026-05-17 | Builder PR #16 was squash-merged before required QA at commit 5c3943b; protocol deviation was recovered by post-merge QA recovery PR #18 merged at commit 3bdedeb; domain vocabulary documentation plus explicitly scoped ablation roadmap/evaluation planning only; no product implementation or runtime behavior. |
| M01.06 | Define safe and unsafe repairs | M01 Domain model and scope freeze | Completed and merged | plans/active/CLP-0002-m01-domain-model-and-scope-freeze.md | m01-06-define-safe-and-unsafe-repairs | #21 merged | 2026-05-18: post-merge finalization passed; PR #21 merged at commit 7adc96d; validate-control-plane passed; pytest 24 passed; git diff --check passed; make unavailable | 2026-05-18 | Domain documentation only; defined safe and unsafe repair vocabulary, proposal-only repair boundaries, repair evidence requirements, deterministic validation expectations, replay-before-apply, idempotency, rollback, human approval, escalation, repair categories, and forbidden autonomous repair actions. No product implementation or runtime repair behavior. |
| M01.07 | Define evidence receipt model | M01 Domain model and scope freeze | Completed and merged | plans/active/CLP-0002-m01-domain-model-and-scope-freeze.md | m01-07-define-evidence-receipt-model | #23 merged | 2026-05-18: post-merge finalization passed; PR #23 merged at commit a88b5ff; main confirmed at 0313f4e; validate-control-plane passed; pytest 25 passed; git diff --check passed; make unavailable | 2026-05-18 | Domain documentation only; completed and merged after PR #23 squash commit a88b5ff (`docs: define M01.07 evidence receipt model (#23)`) with latest main confirmed at 0313f4e (`docs: define M01.07 evidence receipt model`). Defined evidence receipt vocabulary, provenance, chain of custody, timestamps, freshness, retention, redaction, confidentiality, uncertainty, confidence, limitations, conflicts, coverage, gaps, evidence bundles, receipt statuses, rejection reasons, append-only handling, immutable raw evidence boundaries, derived evidence boundaries, audit trails, safety boundaries, and moat rationale. No product implementation or runtime evidence behavior. |
| M01.08 | Define human review states | M01 Domain model and scope freeze | Completed and merged | plans/active/CLP-0002-m01-domain-model-and-scope-freeze.md | m01-08-define-human-review-states | #26 merged | 2026-05-21: post-merge finalization recorded during M01.09 builder; PR #26 merged at commit 1fde07a; validate-control-plane passed; pytest 27 passed; git diff --check passed; make unavailable | 2026-05-21 | Domain documentation only; completed and merged after PR #26 (`docs: define M01.08 human review states (#26)`) at git commit 1fde07a. Defines human review vocabulary, review actors, review statuses, decision states, escalation, approval and rejection boundaries, repair-review states, AI review boundaries, evidence expectations, correctness questions, failure patterns, validation coverage, and forbidden-scope boundaries. No product implementation or runtime human-review behavior. |
| M01.09 | Define out-of-scope domains | M01 Domain model and scope freeze | Completed and merged | plans/active/CLP-0002-m01-domain-model-and-scope-freeze.md | m01-09-define-out-of-scope-domains | #27 merged | 2026-05-21: post-merge finalization recorded during M01.10 builder; PR #27 merged at commit 1b40773; validate-control-plane passed; pytest 27 passed; git diff --check passed; make unavailable | 2026-05-21 | Domain documentation only; completed and merged after PR #27 (`docs: define M01.09 out-of-scope domains (#27)`) at git commit 1b40773. Defines hard out-of-scope domains, adjacent-but-not-core domains, forbidden product claims, LLM forbidden actions, future-extension rules, interview and product positioning boundaries, examples, tracking, and validation coverage. No product implementation or runtime out-of-scope behavior. |
| M01.10 | Write DOMAIN_MODEL.md | M01 Domain model and scope freeze | Completed and merged | plans/active/CLP-0002-m01-domain-model-and-scope-freeze.md | m01-10-qa-recovery-domain-model | Builder #28 merged; recovery PR #29 merged | 2026-05-21: post-merge finalization recorded during M01.11 builder; QA recovery PR #29 merged at commit a878d55; validate-control-plane passed; pytest 27 passed; git diff --check passed; make unavailable | 2026-05-21 | Builder PR #28 was squash-merged before required QA at commit dc6800b; post-merge QA recovery PR #29 merged at commit a878d55 (`test: QA recovery M01.10 domain model summary (#29)`). Documentation-only DOMAIN_MODEL.md canonical M01 domain model summary; No product implementation or runtime behavior. |
| M01.11 | Write RELIABILITY.md | M01 Domain model and scope freeze | Completed and merged | plans/active/CLP-0002-m01-domain-model-and-scope-freeze.md | m01-11-write-reliability | #30 merged | 2026-05-21: post-merge finalization recorded during M01.12 builder; PR #30 merged at commit a424924; builder and QA validation previously passed; validate-control-plane passed; pytest 28 passed; git diff --check passed; make unavailable | 2026-05-21 | Documentation-only RELIABILITY.md canonical reliability model; covers financial truth model, deterministic-first reliability, evidence reliability, ledger and accounting reliability, settlement and reconciliation reliability, incident reliability, replay reliability, repair reliability, human review reliability, agentic AI reliability, model routing and cost reliability, observability and auditability, evaluation and ablation reliability, failure modes, metrics, future dependencies, and guardrails. No product implementation or runtime reliability behavior. |
| M01.12 | Write THREAT_MODEL.md | M01 Domain model and scope freeze | Completed and merged | plans/active/CLP-0002-m01-domain-model-and-scope-freeze.md | m01-12-write-threat-model | #31 merged; duplicate #32 and #33 process deviation | 2026-05-23: Post-merge finalization recorded after PR #31 merged; duplicate PR merges #32 and #33 were also created from the same M01.12 branch; no revert; corrective action is tracking consistency plus stricter PR discipline; initial next-thread precondition wording failure fixed; QA validation passed previously; builder validation passed previously; validate-control-plane passed; pytest 29 passed; git diff --check passed; make unavailable | 2026-05-23 | Documentation-only THREAT_MODEL.md canonical threat model; covers protected assets, trust boundaries, actors/adversaries, evidence threats, ledger and financial truth threats, settlement and reconciliation threats, incident and replay threats, repair and human review threats, agentic AI threats, prompt injection threats, tool and permission threats, privacy, secrets, supply chain, model routing and cost threats, ablation threats, operational/governance threats, mitigation matrix, future dependencies, and guardrails. No product implementation or runtime security behavior. |
| M01.13 | QA domain consistency | M01 Domain model and scope freeze | Builder complete, awaiting QA | plans/active/CLP-0002-m01-domain-model-and-scope-freeze.md | m01-13-qa-domain-consistency | not opened | 2026-05-23: Builder validation passed; created docs/status/M01_DOMAIN_CONSISTENCY.md; verified M01 domain vocabulary, DOMAIN_MODEL.md, RELIABILITY.md, THREAT_MODEL.md, eval docs, spec placeholders, roadmap, registry, active plan, and status docs are consistent; confirmed M01.12 completed and merged after PR #31, duplicate #32 and #33 process deviation recorded, M01 active, M02-M21 Not started, product implementation not started; validate-control-plane passed; pytest passed; git diff --check passed; make unavailable | 2026-05-23 | Documentation/control-plane consistency QA only. No product implementation, runtime schema, API, database, UI, connector, GitHub Action, CI workflow, deployment, auth/authz runtime, or product behavior. M01 closeout still required after QA PASS and merge. |
| M02.01 | Choose backend and frontend stack | M02 Monorepo and local development | Not started |  |  |  |  |  |  |
| M02.02 | Create apps/api | M02 Monorepo and local development | Not started |  |  |  |  |  |  |
| M02.03 | Create apps/web | M02 Monorepo and local development | Not started |  |  |  |  |  |  |
| M02.04 | Create apps/worker | M02 Monorepo and local development | Not started |  |  |  |  |  |  |
| M02.05 | Create apps/agent-runtime | M02 Monorepo and local development | Not started |  |  |  |  |  |  |
| M02.06 | Create packages/core | M02 Monorepo and local development | Not started |  |  |  |  |  |  |
| M02.07 | Create packages/events | M02 Monorepo and local development | Not started |  |  |  |  |  |  |
| M02.08 | Create packages/ledger | M02 Monorepo and local development | Not started |  |  |  |  |  |  |
| M02.09 | Create packages/invariants | M02 Monorepo and local development | Not started |  |  |  |  |  |  |
| M02.10 | Create packages/incidents | M02 Monorepo and local development | Not started |  |  |  |  |  |  |
| M02.11 | Create packages/graph | M02 Monorepo and local development | Not started |  |  |  |  |  |  |
| M02.12 | Create packages/replay | M02 Monorepo and local development | Not started |  |  |  |  |  |  |
| M02.13 | Create packages/repair | M02 Monorepo and local development | Not started |  |  |  |  |  |  |
| M02.14 | Add Postgres | M02 Monorepo and local development | Not started |  |  |  |  |  |  |
| M02.15 | Add Redis | M02 Monorepo and local development | Not started |  |  |  |  |  |  |
| M02.16 | Add Docker Compose | M02 Monorepo and local development | Not started |  |  |  |  |  |  |
| M02.17 | Add migrations | M02 Monorepo and local development | Not started |  |  |  |  |  |  |
| M02.18 | Add health checks | M02 Monorepo and local development | Not started |  |  |  |  |  |  |
| M02.19 | Add CI baseline | M02 Monorepo and local development | Not started |  |  |  |  |  |  |
| M02.20 | QA dev environment | M02 Monorepo and local development | Not started |  |  |  |  |  |  |
| M03.01 | Define MoneyEvent schema | M03 Canonical MoneyEvent engine | Not started |  |  |  |  |  |  |
| M03.02 | Define amount model | M03 Canonical MoneyEvent engine | Not started |  |  |  |  |  |  |
| M03.03 | Define actor model | M03 Canonical MoneyEvent engine | Not started |  |  |  |  |  |  |
| M03.04 | Define references model | M03 Canonical MoneyEvent engine | Not started |  |  |  |  |  |  |
| M03.05 | Define provenance model | M03 Canonical MoneyEvent engine | Not started |  |  |  |  |  |  |
| M03.06 | Define lifecycle stage enum | M03 Canonical MoneyEvent engine | Not started |  |  |  |  |  |  |
| M03.07 | Define event type enum | M03 Canonical MoneyEvent engine | Not started |  |  |  |  |  |  |
| M03.08 | Store raw payload hash | M03 Canonical MoneyEvent engine | Not started |  |  |  |  |  |  |
| M03.09 | Add database migration | M03 Canonical MoneyEvent engine | Not started |  |  |  |  |  |  |
| M03.10 | Add event validation | M03 Canonical MoneyEvent engine | Not started |  |  |  |  |  |  |
| M03.11 | Add POST /events/ingest | M03 Canonical MoneyEvent engine | Not started |  |  |  |  |  |  |
| M03.12 | Add idempotency handling | M03 Canonical MoneyEvent engine | Not started |  |  |  |  |  |  |
| M03.13 | Add duplicate event behavior | M03 Canonical MoneyEvent engine | Not started |  |  |  |  |  |  |
| M03.14 | Add GET /events/{id} | M03 Canonical MoneyEvent engine | Not started |  |  |  |  |  |  |
| M03.15 | Add timeline query | M03 Canonical MoneyEvent engine | Not started |  |  |  |  |  |  |
| M03.16 | Add fixtures | M03 Canonical MoneyEvent engine | Not started |  |  |  |  |  |  |
| M03.17 | Add tests | M03 Canonical MoneyEvent engine | Not started |  |  |  |  |  |  |
| M03.18 | Update specs | M03 Canonical MoneyEvent engine | Not started |  |  |  |  |  |  |
| M03.19 | QA MoneyEvent engine | M03 Canonical MoneyEvent engine | Not started |  |  |  |  |  |  |
| M04.01 | Define Account schema | M04 Double-entry ledger core | Not started |  |  |  |  |  |  |
| M04.02 | Define LedgerTransaction schema | M04 Double-entry ledger core | Not started |  |  |  |  |  |  |
| M04.03 | Define LedgerEntry schema | M04 Double-entry ledger core | Not started |  |  |  |  |  |  |
| M04.04 | Enforce debit equals credit | M04 Double-entry ledger core | Not started |  |  |  |  |  |  |
| M04.05 | Add immutable transaction storage | M04 Double-entry ledger core | Not started |  |  |  |  |  |  |
| M04.06 | Add account balance query | M04 Double-entry ledger core | Not started |  |  |  |  |  |  |
| M04.07 | Add transaction query | M04 Double-entry ledger core | Not started |  |  |  |  |  |  |
| M04.08 | Add idempotency keys | M04 Double-entry ledger core | Not started |  |  |  |  |  |  |
| M04.09 | Add reversal transaction type | M04 Double-entry ledger core | Not started |  |  |  |  |  |  |
| M04.10 | Add cash clearing account | M04 Double-entry ledger core | Not started |  |  |  |  |  |  |
| M04.11 | Add provider clearing account | M04 Double-entry ledger core | Not started |  |  |  |  |  |  |
| M04.12 | Add customer liability account | M04 Double-entry ledger core | Not started |  |  |  |  |  |  |
| M04.13 | Add fee expense account | M04 Double-entry ledger core | Not started |  |  |  |  |  |  |
| M04.14 | Add revenue account | M04 Double-entry ledger core | Not started |  |  |  |  |  |  |
| M04.15 | Add tests for balanced posting | M04 Double-entry ledger core | Not started |  |  |  |  |  |  |
| M04.16 | Add tests for invalid posting | M04 Double-entry ledger core | Not started |  |  |  |  |  |  |
| M04.17 | Add reversal tests | M04 Double-entry ledger core | Not started |  |  |  |  |  |  |
| M04.18 | QA ledger core | M04 Double-entry ledger core | Not started |  |  |  |  |  |  |
| M05.01 | Create simulator package | M05 Provider and bank simulator | Not started |  |  |  |  |  |  |
| M05.02 | Simulate payment authorized | M05 Provider and bank simulator | Not started |  |  |  |  |  |  |
| M05.03 | Simulate payment captured | M05 Provider and bank simulator | Not started |  |  |  |  |  |  |
| M05.04 | Simulate payout created | M05 Provider and bank simulator | Not started |  |  |  |  |  |  |
| M05.05 | Simulate payout paid | M05 Provider and bank simulator | Not started |  |  |  |  |  |  |
| M05.06 | Simulate payout failed | M05 Provider and bank simulator | Not started |  |  |  |  |  |  |
| M05.07 | Simulate refund created | M05 Provider and bank simulator | Not started |  |  |  |  |  |  |
| M05.08 | Simulate refund paid | M05 Provider and bank simulator | Not started |  |  |  |  |  |  |
| M05.09 | Simulate dispute opened | M05 Provider and bank simulator | Not started |  |  |  |  |  |  |
| M05.10 | Simulate chargeback fee | M05 Provider and bank simulator | Not started |  |  |  |  |  |  |
| M05.11 | Simulate duplicate webhook | M05 Provider and bank simulator | Not started |  |  |  |  |  |  |
| M05.12 | Simulate delayed webhook | M05 Provider and bank simulator | Not started |  |  |  |  |  |  |
| M05.13 | Simulate missing webhook | M05 Provider and bank simulator | Not started |  |  |  |  |  |  |
| M05.14 | Simulate settlement CSV | M05 Provider and bank simulator | Not started |  |  |  |  |  |  |
| M05.15 | Simulate bank statement CSV | M05 Provider and bank simulator | Not started |  |  |  |  |  |  |
| M05.16 | Add deterministic seed support | M05 Provider and bank simulator | Not started |  |  |  |  |  |  |
| M05.17 | Add simulator CLI | M05 Provider and bank simulator | Not started |  |  |  |  |  |  |
| M05.18 | Add fixture tests | M05 Provider and bank simulator | Not started |  |  |  |  |  |  |
| M05.19 | QA simulator | M05 Provider and bank simulator | Not started |  |  |  |  |  |  |
| M06.01 | Define invariant interface | M06 Invariant engine | Not started |  |  |  |  |  |  |
| M06.02 | Define invariant result schema | M06 Invariant engine | Not started |  |  |  |  |  |  |
| M06.03 | Add ledger transaction balances invariant | M06 Invariant engine | Not started |  |  |  |  |  |  |
| M06.04 | Add duplicate provider event invariant | M06 Invariant engine | Not started |  |  |  |  |  |  |
| M06.05 | Add missing ledger posting invariant | M06 Invariant engine | Not started |  |  |  |  |  |  |
| M06.06 | Add captured payment eventual outcome invariant | M06 Invariant engine | Not started |  |  |  |  |  |  |
| M06.07 | Add payout-to-bank invariant | M06 Invariant engine | Not started |  |  |  |  |  |  |
| M06.08 | Add provider payout total invariant | M06 Invariant engine | Not started |  |  |  |  |  |  |
| M06.09 | Add refund lifecycle invariant | M06 Invariant engine | Not started |  |  |  |  |  |  |
| M06.10 | Add chargeback fee invariant | M06 Invariant engine | Not started |  |  |  |  |  |  |
| M06.11 | Add failed payout balance restoration invariant | M06 Invariant engine | Not started |  |  |  |  |  |  |
| M06.12 | Add orphan bank line invariant | M06 Invariant engine | Not started |  |  |  |  |  |  |
| M06.13 | Add invalid state transition invariant | M06 Invariant engine | Not started |  |  |  |  |  |  |
| M06.14 | Add severity scoring | M06 Invariant engine | Not started |  |  |  |  |  |  |
| M06.15 | Add invariant runner API | M06 Invariant engine | Not started |  |  |  |  |  |  |
| M06.16 | Add invariant CLI | M06 Invariant engine | Not started |  |  |  |  |  |  |
| M06.17 | Add invariant tests | M06 Invariant engine | Not started |  |  |  |  |  |  |
| M06.18 | QA invariant engine | M06 Invariant engine | Not started |  |  |  |  |  |  |
| M07.01 | Define Incident schema | M07 Incident engine | Not started |  |  |  |  |  |  |
| M07.02 | Define incident type enum | M07 Incident engine | Not started |  |  |  |  |  |  |
| M07.03 | Define severity rules | M07 Incident engine | Not started |  |  |  |  |  |  |
| M07.04 | Define incident status machine | M07 Incident engine | Not started |  |  |  |  |  |  |
| M07.05 | Calculate affected amount | M07 Incident engine | Not started |  |  |  |  |  |  |
| M07.06 | Calculate affected users | M07 Incident engine | Not started |  |  |  |  |  |  |
| M07.07 | Create incident from invariant failure | M07 Incident engine | Not started |  |  |  |  |  |  |
| M07.08 | Deduplicate incidents | M07 Incident engine | Not started |  |  |  |  |  |  |
| M07.09 | Link incident to evidence IDs | M07 Incident engine | Not started |  |  |  |  |  |  |
| M07.10 | Link incident to graph references | M07 Incident engine | Not started |  |  |  |  |  |  |
| M07.11 | Add incident list endpoint | M07 Incident engine | Not started |  |  |  |  |  |  |
| M07.12 | Add incident detail endpoint | M07 Incident engine | Not started |  |  |  |  |  |  |
| M07.13 | Add status transition endpoint | M07 Incident engine | Not started |  |  |  |  |  |  |
| M07.14 | Add comments | M07 Incident engine | Not started |  |  |  |  |  |  |
| M07.15 | Add incident tests | M07 Incident engine | Not started |  |  |  |  |  |  |
| M07.16 | QA incident engine | M07 Incident engine | Not started |  |  |  |  |  |  |
| M08.01 | Define graph node types | M08 Causal graph | Not started |  |  |  |  |  |  |
| M08.02 | Define graph edge types | M08 Causal graph | Not started |  |  |  |  |  |  |
| M08.03 | Add event nodes | M08 Causal graph | Not started |  |  |  |  |  |  |
| M08.04 | Add ledger nodes | M08 Causal graph | Not started |  |  |  |  |  |  |
| M08.05 | Add account nodes | M08 Causal graph | Not started |  |  |  |  |  |  |
| M08.06 | Add payout nodes | M08 Causal graph | Not started |  |  |  |  |  |  |
| M08.07 | Add bank statement nodes | M08 Causal graph | Not started |  |  |  |  |  |  |
| M08.08 | Add settlement row nodes | M08 Causal graph | Not started |  |  |  |  |  |  |
| M08.09 | Add posted_as edges | M08 Causal graph | Not started |  |  |  |  |  |  |
| M08.10 | Add matched_to edges | M08 Causal graph | Not started |  |  |  |  |  |  |
| M08.11 | Add settles_to edges | M08 Causal graph | Not started |  |  |  |  |  |  |
| M08.12 | Add caused_by edges | M08 Causal graph | Not started |  |  |  |  |  |  |
| M08.13 | Add reversed_by edges | M08 Causal graph | Not started |  |  |  |  |  |  |
| M08.14 | Add missing_expected_edge marker | M08 Causal graph | Not started |  |  |  |  |  |  |
| M08.15 | Add graph traversal endpoint | M08 Causal graph | Not started |  |  |  |  |  |  |
| M08.16 | Add graph serialization | M08 Causal graph | Not started |  |  |  |  |  |  |
| M08.17 | Add graph tests | M08 Causal graph | Not started |  |  |  |  |  |  |
| M08.18 | QA causal graph | M08 Causal graph | Not started |  |  |  |  |  |  |
| M09.01 | Define replay session schema | M09 Replay engine and digital twin | Not started |  |  |  |  |  |  |
| M09.02 | Snapshot event state | M09 Replay engine and digital twin | Not started |  |  |  |  |  |  |
| M09.03 | Snapshot ledger state | M09 Replay engine and digital twin | Not started |  |  |  |  |  |  |
| M09.04 | Snapshot settlement state | M09 Replay engine and digital twin | Not started |  |  |  |  |  |  |
| M09.05 | Snapshot bank statement state | M09 Replay engine and digital twin | Not started |  |  |  |  |  |  |
| M09.06 | Replay event sequence | M09 Replay engine and digital twin | Not started |  |  |  |  |  |  |
| M09.07 | Replay duplicate event | M09 Replay engine and digital twin | Not started |  |  |  |  |  |  |
| M09.08 | Replay missing event | M09 Replay engine and digital twin | Not started |  |  |  |  |  |  |
| M09.09 | Replay delayed event | M09 Replay engine and digital twin | Not started |  |  |  |  |  |  |
| M09.10 | Replay failed payout | M09 Replay engine and digital twin | Not started |  |  |  |  |  |  |
| M09.11 | Compare before and after invariants | M09 Replay engine and digital twin | Not started |  |  |  |  |  |  |
| M09.12 | Compare before and after balances | M09 Replay engine and digital twin | Not started |  |  |  |  |  |  |
| M09.13 | Add replay API | M09 Replay engine and digital twin | Not started |  |  |  |  |  |  |
| M09.14 | Add replay CLI | M09 Replay engine and digital twin | Not started |  |  |  |  |  |  |
| M09.15 | Add replay artifact output | M09 Replay engine and digital twin | Not started |  |  |  |  |  |  |
| M09.16 | Add replay tests | M09 Replay engine and digital twin | Not started |  |  |  |  |  |  |
| M09.17 | QA replay engine | M09 Replay engine and digital twin | Not started |  |  |  |  |  |  |
| M10.01 | Define read-only event tool | M10 Agent tool contracts | Not started |  |  |  |  |  |  |
| M10.02 | Define read-only ledger tool | M10 Agent tool contracts | Not started |  |  |  |  |  |  |
| M10.03 | Define read-only graph tool | M10 Agent tool contracts | Not started |  |  |  |  |  |  |
| M10.04 | Define read-only invariant tool | M10 Agent tool contracts | Not started |  |  |  |  |  |  |
| M10.05 | Define read-only incident tool | M10 Agent tool contracts | Not started |  |  |  |  |  |  |
| M10.06 | Define replay-read tool | M10 Agent tool contracts | Not started |  |  |  |  |  |  |
| M10.07 | Define repair-simulation tool | M10 Agent tool contracts | Not started |  |  |  |  |  |  |
| M10.08 | Forbid write tools | M10 Agent tool contracts | Not started |  |  |  |  |  |  |
| M10.09 | Forbid ledger mutation | M10 Agent tool contracts | Not started |  |  |  |  |  |  |
| M10.10 | Forbid event deletion | M10 Agent tool contracts | Not started |  |  |  |  |  |  |
| M10.11 | Forbid repair approval | M10 Agent tool contracts | Not started |  |  |  |  |  |  |
| M10.12 | Add JSON schema validation | M10 Agent tool contracts | Not started |  |  |  |  |  |  |
| M10.13 | Add tool audit logging | M10 Agent tool contracts | Not started |  |  |  |  |  |  |
| M10.14 | Add permission tests | M10 Agent tool contracts | Not started |  |  |  |  |  |  |
| M10.15 | QA agent tool contracts | M10 Agent tool contracts | Not started |  |  |  |  |  |  |
| M11.01 | Build evidence pack generator | M11 Agentic investigator v1 | Not started |  |  |  |  |  |  |
| M11.02 | Build triage agent | M11 Agentic investigator v1 | Not started |  |  |  |  |  |  |
| M11.03 | Build trace agent | M11 Agentic investigator v1 | Not started |  |  |  |  |  |  |
| M11.04 | Build SQL/query agent with read-only guard | M11 Agentic investigator v1 | Not started |  |  |  |  |  |  |
| M11.05 | Build hypothesis agent | M11 Agentic investigator v1 | Not started |  |  |  |  |  |  |
| M11.06 | Build critic agent | M11 Agentic investigator v1 | Not started |  |  |  |  |  |  |
| M11.07 | Build memo agent | M11 Agentic investigator v1 | Not started |  |  |  |  |  |  |
| M11.08 | Add structured output schemas | M11 Agentic investigator v1 | Not started |  |  |  |  |  |  |
| M11.09 | Require evidence IDs | M11 Agentic investigator v1 | Not started |  |  |  |  |  |  |
| M11.10 | Add hallucination checks | M11 Agentic investigator v1 | Not started |  |  |  |  |  |  |
| M11.11 | Add model routing | M11 Agentic investigator v1 | Not started |  |  |  |  |  |  |
| M11.12 | Add token tracking | M11 Agentic investigator v1 | Not started |  |  |  |  |  |  |
| M11.13 | Add agent run logs | M11 Agentic investigator v1 | Not started |  |  |  |  |  |  |
| M11.14 | Add duplicate webhook investigation test | M11 Agentic investigator v1 | Not started |  |  |  |  |  |  |
| M11.15 | QA agentic investigator | M11 Agentic investigator v1 | Not started |  |  |  |  |  |  |
| M12.01 | Define RepairPlan schema | M12 Repair planner v1 | Not started |  |  |  |  |  |  |
| M12.02 | Define repair types | M12 Repair planner v1 | Not started |  |  |  |  |  |  |
| M12.03 | Define unsafe repair types | M12 Repair planner v1 | Not started |  |  |  |  |  |  |
| M12.04 | Add compensating journal proposal | M12 Repair planner v1 | Not started |  |  |  |  |  |  |
| M12.05 | Add suspense account proposal | M12 Repair planner v1 | Not started |  |  |  |  |  |  |
| M12.06 | Add retry provider sync proposal | M12 Repair planner v1 | Not started |  |  |  |  |  |  |
| M12.07 | Add manual hold proposal | M12 Repair planner v1 | Not started |  |  |  |  |  |  |
| M12.08 | Require rollback plan | M12 Repair planner v1 | Not started |  |  |  |  |  |  |
| M12.09 | Require idempotency key | M12 Repair planner v1 | Not started |  |  |  |  |  |  |
| M12.10 | Require evidence IDs | M12 Repair planner v1 | Not started |  |  |  |  |  |  |
| M12.11 | Add deterministic repair validator | M12 Repair planner v1 | Not started |  |  |  |  |  |  |
| M12.12 | Add balanced journal validator | M12 Repair planner v1 | Not started |  |  |  |  |  |  |
| M12.13 | Add account existence validator | M12 Repair planner v1 | Not started |  |  |  |  |  |  |
| M12.14 | Add repair simulation | M12 Repair planner v1 | Not started |  |  |  |  |  |  |
| M12.15 | Add unsafe repair rejection | M12 Repair planner v1 | Not started |  |  |  |  |  |  |
| M12.16 | Add repair tests | M12 Repair planner v1 | Not started |  |  |  |  |  |  |
| M12.17 | QA repair planner | M12 Repair planner v1 | Not started |  |  |  |  |  |  |
| M13.01 | Define review states | M13 Human review workbench | Not started |  |  |  |  |  |  |
| M13.02 | Create review queue | M13 Human review workbench | Not started |  |  |  |  |  |  |
| M13.03 | Create approve action | M13 Human review workbench | Not started |  |  |  |  |  |  |
| M13.04 | Create reject action | M13 Human review workbench | Not started |  |  |  |  |  |  |
| M13.05 | Create request-more-evidence action | M13 Human review workbench | Not started |  |  |  |  |  |  |
| M13.06 | Record reviewer identity | M13 Human review workbench | Not started |  |  |  |  |  |  |
| M13.07 | Record reviewer reason | M13 Human review workbench | Not started |  |  |  |  |  |  |
| M13.08 | Add approval audit log | M13 Human review workbench | Not started |  |  |  |  |  |  |
| M13.09 | Apply sandbox repair only after approval | M13 Human review workbench | Not started |  |  |  |  |  |  |
| M13.10 | Add repair rollback display | M13 Human review workbench | Not started |  |  |  |  |  |  |
| M13.11 | Add review API tests | M13 Human review workbench | Not started |  |  |  |  |  |  |
| M13.12 | QA human review workbench | M13 Human review workbench | Not started |  |  |  |  |  |  |
| M14.01 | Define scenario format | M14 MoneyFlowBench v1 | Not started |  |  |  |  |  |  |
| M14.02 | Define expected root cause format | M14 MoneyFlowBench v1 | Not started |  |  |  |  |  |  |
| M14.03 | Define expected evidence format | M14 MoneyFlowBench v1 | Not started |  |  |  |  |  |  |
| M14.04 | Define acceptable repair format | M14 MoneyFlowBench v1 | Not started |  |  |  |  |  |  |
| M14.05 | Define unsafe repair format | M14 MoneyFlowBench v1 | Not started |  |  |  |  |  |  |
| M14.06 | Add duplicate webhook scenario | M14 MoneyFlowBench v1 | Not started |  |  |  |  |  |  |
| M14.07 | Add missing settlement scenario | M14 MoneyFlowBench v1 | Not started |  |  |  |  |  |  |
| M14.08 | Add refund race scenario | M14 MoneyFlowBench v1 | Not started |  |  |  |  |  |  |
| M14.09 | Add failed payout scenario | M14 MoneyFlowBench v1 | Not started |  |  |  |  |  |  |
| M14.10 | Add chargeback delay scenario | M14 MoneyFlowBench v1 | Not started |  |  |  |  |  |  |
| M14.11 | Add FX drift scenario | M14 MoneyFlowBench v1 | Not started |  |  |  |  |  |  |
| M14.12 | Add orphan bank credit scenario | M14 MoneyFlowBench v1 | Not started |  |  |  |  |  |  |
| M14.13 | Add delayed provider event scenario | M14 MoneyFlowBench v1 | Not started |  |  |  |  |  |  |
| M14.14 | Add poisoned evidence scenario | M14 MoneyFlowBench v1 | Not started |  |  |  |  |  |  |
| M14.15 | Add unsafe repair attempt scenario | M14 MoneyFlowBench v1 | Not started |  |  |  |  |  |  |
| M14.16 | Add benchmark and ablation runner | M14 MoneyFlowBench v1 | Not started |  |  |  |  |  |  |
| M14.17 | Add root-cause scoring | M14 MoneyFlowBench v1 | Not started |  |  |  |  |  |  |
| M14.18 | Add evidence precision scoring | M14 MoneyFlowBench v1 | Not started |  |  |  |  |  |  |
| M14.19 | Add repair safety scoring | M14 MoneyFlowBench v1 | Not started |  |  |  |  |  |  |
| M14.20 | Add hallucination scoring | M14 MoneyFlowBench v1 | Not started |  |  |  |  |  |  |
| M14.21 | Add token-cost scoring | M14 MoneyFlowBench v1 | Not started |  |  |  |  |  |  |
| M14.22 | Add latency scoring | M14 MoneyFlowBench v1 | Not started |  |  |  |  |  |  |
| M14.23 | Add benchmark and ablation report | M14 MoneyFlowBench v1 | Not started |  |  |  |  |  |  |
| M14.24 | QA MoneyFlowBench and ablation suite | M14 MoneyFlowBench v1 | Not started |  |  |  |  |  |  |
| M15.01 | Create web app shell | M15 UI command center | Not started |  |  |  |  |  |  |
| M15.02 | Build incident command center | M15 UI command center | Not started |  |  |  |  |  |  |
| M15.03 | Build incident detail page | M15 UI command center | Not started |  |  |  |  |  |  |
| M15.04 | Build transaction timeline component | M15 UI command center | Not started |  |  |  |  |  |  |
| M15.05 | Build causal graph component | M15 UI command center | Not started |  |  |  |  |  |  |
| M15.06 | Build invariant failure panel | M15 UI command center | Not started |  |  |  |  |  |  |
| M15.07 | Build evidence panel | M15 UI command center | Not started |  |  |  |  |  |  |
| M15.08 | Build agent notebook panel | M15 UI command center | Not started |  |  |  |  |  |  |
| M15.09 | Build repair review panel | M15 UI command center | Not started |  |  |  |  |  |  |
| M15.10 | Build replay result panel | M15 UI command center | Not started |  |  |  |  |  |  |
| M15.11 | Build scenario selector | M15 UI command center | Not started |  |  |  |  |  |  |
| M15.12 | Build demo reset button | M15 UI command center | Not started |  |  |  |  |  |  |
| M15.13 | Add UI tests | M15 UI command center | Not started |  |  |  |  |  |  |
| M15.14 | Add screenshots | M15 UI command center | Not started |  |  |  |  |  |  |
| M15.15 | QA UI command center | M15 UI command center | Not started |  |  |  |  |  |  |
| M16.01 | Define connector interface | M16 Sandbox and external connectors | Not started |  |  |  |  |  |  |
| M16.02 | Add CSV settlement importer | M16 Sandbox and external connectors | Not started |  |  |  |  |  |  |
| M16.03 | Add CSV bank statement importer | M16 Sandbox and external connectors | Not started |  |  |  |  |  |  |
| M16.04 | Add Stripe test connector | M16 Sandbox and external connectors | Not started |  |  |  |  |  |  |
| M16.05 | Add Adyen mock connector | M16 Sandbox and external connectors | Not started |  |  |  |  |  |  |
| M16.06 | Add Plaid sandbox importer | M16 Sandbox and external connectors | Not started |  |  |  |  |  |  |
| M16.07 | Add Wise mock connector | M16 Sandbox and external connectors | Not started |  |  |  |  |  |  |
| M16.08 | Add connector health checks | M16 Sandbox and external connectors | Not started |  |  |  |  |  |  |
| M16.09 | Add credentials pattern | M16 Sandbox and external connectors | Not started |  |  |  |  |  |  |
| M16.10 | Add secrets handling | M16 Sandbox and external connectors | Not started |  |  |  |  |  |  |
| M16.11 | Add connector fixtures | M16 Sandbox and external connectors | Not started |  |  |  |  |  |  |
| M16.12 | Add connector integration tests | M16 Sandbox and external connectors | Not started |  |  |  |  |  |  |
| M16.13 | Add connector docs | M16 Sandbox and external connectors | Not started |  |  |  |  |  |  |
| M16.14 | QA connectors | M16 Sandbox and external connectors | Not started |  |  |  |  |  |  |
| M17.01 | Add structured logs | M17 Observability, costs, and model routing | Not started |  |  |  |  |  |  |
| M17.02 | Add request IDs | M17 Observability, costs, and model routing | Not started |  |  |  |  |  |  |
| M17.03 | Add event IDs in logs | M17 Observability, costs, and model routing | Not started |  |  |  |  |  |  |
| M17.04 | Add OpenTelemetry traces | M17 Observability, costs, and model routing | Not started |  |  |  |  |  |  |
| M17.05 | Add Prometheus metrics | M17 Observability, costs, and model routing | Not started |  |  |  |  |  |  |
| M17.06 | Add Grafana dashboard | M17 Observability, costs, and model routing | Not started |  |  |  |  |  |  |
| M17.07 | Track incident detection latency | M17 Observability, costs, and model routing | Not started |  |  |  |  |  |  |
| M17.08 | Track agent investigation latency | M17 Observability, costs, and model routing | Not started |  |  |  |  |  |  |
| M17.09 | Track repair validation latency | M17 Observability, costs, and model routing | Not started |  |  |  |  |  |  |
| M17.10 | Track model selection | M17 Observability, costs, and model routing | Not started |  |  |  |  |  |  |
| M17.11 | Track input tokens | M17 Observability, costs, and model routing | Not started |  |  |  |  |  |  |
| M17.12 | Track output tokens | M17 Observability, costs, and model routing | Not started |  |  |  |  |  |  |
| M17.13 | Track cost per incident | M17 Observability, costs, and model routing | Not started |  |  |  |  |  |  |
| M17.14 | Add model router | M17 Observability, costs, and model routing | Not started |  |  |  |  |  |  |
| M17.15 | Add evidence cache | M17 Observability, costs, and model routing | Not started |  |  |  |  |  |  |
| M17.16 | Add context compression | M17 Observability, costs, and model routing | Not started |  |  |  |  |  |  |
| M17.17 | Add cost benchmark report | M17 Observability, costs, and model routing | Not started |  |  |  |  |  |  |
| M17.18 | QA observability and costs | M17 Observability, costs, and model routing | Not started |  |  |  |  |  |  |
| M18.01 | Finalize threat model | M18 Security hardening | Not started |  |  |  |  |  |  |
| M18.02 | Add read-only SQL enforcement | M18 Security hardening | Not started |  |  |  |  |  |  |
| M18.03 | Add write API exclusion tests | M18 Security hardening | Not started |  |  |  |  |  |  |
| M18.04 | Add prompt injection tests | M18 Security hardening | Not started |  |  |  |  |  |  |
| M18.05 | Add poisoned evidence tests | M18 Security hardening | Not started |  |  |  |  |  |  |
| M18.06 | Add unsafe repair tests | M18 Security hardening | Not started |  |  |  |  |  |  |
| M18.07 | Add secrets scanning | M18 Security hardening | Not started |  |  |  |  |  |  |
| M18.08 | Add dependency scanning | M18 Security hardening | Not started |  |  |  |  |  |  |
| M18.09 | Add audit log | M18 Security hardening | Not started |  |  |  |  |  |  |
| M18.10 | Add event hash chain | M18 Security hardening | Not started |  |  |  |  |  |  |
| M18.11 | Add evidence receipt signing | M18 Security hardening | Not started |  |  |  |  |  |  |
| M18.12 | Add reviewer approval log | M18 Security hardening | Not started |  |  |  |  |  |  |
| M18.13 | Add RBAC skeleton | M18 Security hardening | Not started |  |  |  |  |  |  |
| M18.14 | Add destructive action protection | M18 Security hardening | Not started |  |  |  |  |  |  |
| M18.15 | Add security CI | M18 Security hardening | Not started |  |  |  |  |  |  |
| M18.16 | QA security hardening | M18 Security hardening | Not started |  |  |  |  |  |  |
| M19.01 | Add API versioning | M19 Production polish | Not started |  |  |  |  |  |  |
| M19.02 | Add pagination | M19 Production polish | Not started |  |  |  |  |  |  |
| M19.03 | Add rate limiting | M19 Production polish | Not started |  |  |  |  |  |  |
| M19.04 | Add database indexes | M19 Production polish | Not started |  |  |  |  |  |  |
| M19.05 | Add migration rollback pattern | M19 Production polish | Not started |  |  |  |  |  |  |
| M19.06 | Add seed reset command | M19 Production polish | Not started |  |  |  |  |  |  |
| M19.07 | Add load tests | M19 Production polish | Not started |  |  |  |  |  |  |
| M19.08 | Add p95 latency dashboard | M19 Production polish | Not started |  |  |  |  |  |  |
| M19.09 | Add backup and restore notes | M19 Production polish | Not started |  |  |  |  |  |  |
| M19.10 | Add deployment docs | M19 Production polish | Not started |  |  |  |  |  |  |
| M19.11 | Add production Docker profile | M19 Production polish | Not started |  |  |  |  |  |  |
| M19.12 | Add environment validation | M19 Production polish | Not started |  |  |  |  |  |  |
| M19.13 | Add error taxonomy | M19 Production polish | Not started |  |  |  |  |  |  |
| M19.14 | Add support bundle export | M19 Production polish | Not started |  |  |  |  |  |  |
| M19.15 | Add evidence bundle export | M19 Production polish | Not started |  |  |  |  |  |  |
| M19.16 | Add API docs | M19 Production polish | Not started |  |  |  |  |  |  |
| M19.17 | QA production polish | M19 Production polish | Not started |  |  |  |  |  |  |
| M20.01 | Rewrite README for public launch | M20 Public launch | Not started |  |  |  |  |  |  |
| M20.02 | Add one-command demo | M20 Public launch | Not started |  |  |  |  |  |  |
| M20.03 | Add architecture diagram | M20 Public launch | Not started |  |  |  |  |  |  |
| M20.04 | Add benchmark table | M20 Public launch | Not started |  |  |  |  |  |  |
| M20.05 | Add scenario catalog | M20 Public launch | Not started |  |  |  |  |  |  |
| M20.06 | Add demo GIF or video | M20 Public launch | Not started |  |  |  |  |  |  |
| M20.07 | Add "why this exists" section | M20 Public launch | Not started |  |  |  |  |  |  |
| M20.08 | Add "why not just reconciliation" section | M20 Public launch | Not started |  |  |  |  |  |  |
| M20.09 | Add "why the LLM cannot mutate money" section | M20 Public launch | Not started |  |  |  |  |  |  |
| M20.10 | Add contribution guide | M20 Public launch | Not started |  |  |  |  |  |  |
| M20.11 | Add changelog | M20 Public launch | Not started |  |  |  |  |  |  |
| M20.12 | Prepare v1.0.0 public release | M20 Public launch | Not started |  |  |  |  |  |  |
| M20.13 | Add blog post draft | M20 Public launch | Not started |  |  |  |  |  |  |
| M20.14 | Add interview demo script | M20 Public launch | Not started |  |  |  |  |  |  |
| M20.15 | Add recruiter-facing summary | M20 Public launch | Not started |  |  |  |  |  |  |
| M20.16 | QA public launch | M20 Public launch | Not started |  |  |  |  |  |  |
| M21.01 | Define ideal customer profile | M21 Company version | Not started |  |  |  |  |  |  |
| M21.02 | Define first buyer persona | M21 Company version | Not started |  |  |  |  |  |  |
| M21.03 | Define strongest painkiller use case | M21 Company version | Not started |  |  |  |  |  |  |
| M21.04 | Define open-source wedge | M21 Company version | Not started |  |  |  |  |  |  |
| M21.05 | Define hosted SaaS version | M21 Company version | Not started |  |  |  |  |  |  |
| M21.06 | Define enterprise features | M21 Company version | Not started |  |  |  |  |  |  |
| M21.07 | Define pricing hypothesis | M21 Company version | Not started |  |  |  |  |  |  |
| M21.08 | Define pilot checklist | M21 Company version | Not started |  |  |  |  |  |  |
| M21.09 | Define customer discovery questions | M21 Company version | Not started |  |  |  |  |  |  |
| M21.10 | Define compliance export roadmap | M21 Company version | Not started |  |  |  |  |  |  |
| M21.11 | Define SOC 2 path | M21 Company version | Not started |  |  |  |  |  |  |
| M21.12 | Define sales narrative | M21 Company version | Not started |  |  |  |  |  |  |
| M21.13 | Define YC application narrative | M21 Company version | Not started |  |  |  |  |  |  |
| M21.14 | Define final company memo | M21 Company version | Not started |  |  |  |  |  |  |
| M21.15 | QA company version | M21 Company version | Not started |  |  |  |  |  |  |
