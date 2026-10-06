# CausalLedger Roadmap

Current milestone marker: M00-M03 are closed and V1_PUBLIC_PRODUCT is approved. M04.01-M04.06 are Completed and merged. Human PR67 merge471d76c matches final reviewedee5d6c2/treeda69be5; exact final QA/clean QA18/0/1/CI37455976639 real storage64/balance22 and empty diff/main proof verified. M04.07 Add transaction query is **Builder complete, awaiting QA** on `m04-07-add-transaction-query`, no current PR yet, under active `plans/active/CLP-0005-m04-double-entry-ledger-core.md`. Fresh ledger655/15files and control614/type/lint/build/format PASS; root intermediate full QA17/0/2 PASS. Mandatory real PostgreSQL acceptance and overall independent QA pending; driver tests are not database proof. M04.08-M04.18 and M05-M21 remain Not started. Current evidence is in `docs/status/CURRENT_STATE.md`.
Current submilestone status: M00-M03 closed; M04.01-M04.06 Completed and merged; M04.07 Builder complete, awaiting QA; M04.08-M04.18 and M05-M21 Not started. Prior approved M02 deferrals remain unchanged.

The table status is aggregated from submilestones and active planning. Read-only account balances are human-merged; current07 transaction lookup is pending acceptance. No later implementation is started.

This roadmap is control-plane state. It records planned milestone sequence and submilestone counts; it does not claim future product functionality is implemented.

| Milestone | Goal | Focus | Exit criteria | Submilestone count | Status |
| --- | --- | --- | --- | --- | --- |
| M00 Repo operating system | Establish the durable repository operating system for CausalLedger. | Control-plane docs, workflow, planning, validation | Codex can continue from repo state without chat memory | 8 | Completed |
| M01 Domain model and scope freeze | Freeze CausalLedger domain language, scope, and non-goals. | Concepts, non-goals, glossary | Domain model and scope are approved | 13 | Completed |
| M02 Monorepo and local development | Create the runnable local development foundation. | Tooling, packages, CI shape, planning ADRs | Local checks run consistently | 20 | Completed |
| M03 Canonical MoneyEvent engine | Define and implement the canonical event representation. | Event contracts, source mapping, validation, fixtures, and QA | MoneyEvent behavior is specified and validated | 6 | Completed |
| M04 Double-entry ledger core | Implement deterministic double-entry ledger primitives. | Transactions, entries, balances | Ledger checks pass deterministic tests | 18 | In progress |
| M05 Provider and bank simulator | Build controlled synthetic providers and bank sources. | Providers, banks, webhooks, failures, live event stream simulation | Scenarios can generate source evidence | 19 | Not started |
| M06 Invariant engine | Implement deterministic financial invariant checks. | Deterministic correctness rules | Invariants detect defined breaks | 18 | Not started |
| M07 Incident engine | Create the incident lifecycle from deterministic failures. | Severity, evidence, ownership | Incidents are created from failed checks | 16 | Not started |
| M08 Causal graph | Model causal money-movement relationships. | Graph entities and traversal | Events and evidence are traceable | 18 | Not started |
| M09 Replay engine and digital twin | Reconstruct incident state reproducibly. | Replay sessions, state snapshots, historical replay of live event sequences | Incidents can be replayed deterministically | 17 | Not started |
| M10 Agent tool contracts | Define safe agent interfaces and deny mutation tools. | Read-only tools and contracts | Agents are constrained by tool boundaries | 15 | Not started |
| M11 Agentic investigator v1 | Add investigation workflows that remain advisory. | Triage, hypotheses, memos | Agents can investigate without mutation | 15 | Not started |
| M12 Repair planner v1 | Draft repair proposals safely without approval or application. | Plans, checks, approvals | Repairs are proposals only | 17 | Not started |
| M13 Human review workbench | Support human approval workflow for repair proposals. | Review UX and audit decisions | Humans can approve or reject proposals | 12 | Not started |
| M14 MoneyFlowBench v1 | Create the benchmark suite for agentic financial operations. | Scenarios, scoring, evidence, early detection and final confirmation | Benchmarks measure investigation quality | 24 | Not started |
| M15 UI command center | Build the operational incident command surface. | Incident command surface | Users can inspect incidents and evidence | 15 | Not started |
| M16 Sandbox and external connectors | Add safe sandbox integrations and importers. | Connectors and sandbox isolation | External data can be ingested safely | 14 | Not started |
| M17 Observability, costs, and model routing | Track runtime behavior, latency, and model spend. | Tracing, metrics, routing | Operations are measurable and bounded | 18 | Not started |
| M18 Security hardening | Strengthen trust boundaries and destructive-action protections. | Auth, secrets, permissions | Security review passes | 16 | Not started |
| M19 Production polish | Prepare a stable release candidate. | Reliability, docs, packaging | Release candidate is ready | 17 | Not started |
| M20 Public launch | Publish the open project and launch materials. | Docs, examples, public messaging | Public launch checklist complete | 16 | Not started |
| M21 Company version | Define the commercial-grade version of CausalLedger. | Enterprise controls and roadmap | Company-version scope is clear | 15 | Not started |

## Roadmap guardrails

- M00 is completed as a control-plane milestone.
- M00.01 through M00.08 are completed and merged.
- `v0.1.0` is the M00 repo operating system foundation release, not a product release.
- The completed M00 plan lives at `plans/completed/CLP-0001-m00-repo-operating-system.md`.
- The completed M01 plan lives at `plans/completed/CLP-0002-m01-domain-model-and-scope-freeze.md`.
- M01 planning is complete and merged at git commit `2cfd75a`.
- M01 is completed and closed; M01.01 through M01.13 are `Completed and merged`.
- M01.13 merged at git commit `27c39b6` (`docs: run M01.13 domain consistency QA (#35)`).
- M01.12 duplicate PR merges #32 and #33 from the same branch are recorded as a process deviation. No revert was performed; future submilestones should use one PR per branch and delete the branch after merge.
- M02 is completed after closeout. The completed M02 plan lives at `plans/completed/CLP-0003-m02-monorepo-and-local-development-environment.md`; planning PR #37 merged into `main` at commit `18148f7` on 2026-06-08, M02.01 PR #38 merged into `main` at commit `fb2b901` on 2026-06-08, M02.02 PR #39 merged into `main` at commit `8ddf5da` on 2026-06-09, M02.03 PR #40 merged into `main` at commit `6ad4b0c` on 2026-06-09, M02.04 PR #41 merged into `main` at commit `f52396558e127e33e02c6e992d8a5f91cfe4dc0f` on 2026-06-11, M02.05 PR #43 merged into `main` at commit `6e76045` on 2026-06-24, M02.06 PR #44 merged into `main` at commit `80ce206` on 2026-06-24, and M02.07 PR #45 merged into `main` at commit `4a4f381adb7ed263fb26d0373f00043f2fe6a6bc` on 2026-06-25.
- M02.01 through M02.07 are `Completed and merged`; former M02.08 through M02.20 rows are deferred or absorbed by the process amendment.
- M02.05 is now `Create all remaining package scaffolds + ESLint + CI baseline`.
- M02.06 is now `Local infrastructure: Docker Compose + Postgres + migration tool + health-check stubs`.
- M02.07 is now `QA dev environment`.
- `apps/agent-runtime` creation is deferred to the M10 era because agent runtime should not exist before deterministic evidence, MoneyEvent, invariant, incident, graph, replay, and repair boundaries exist.
- Redis is deferred until needed because no queue or scheduler should be added before the worker or orchestration design proves the need.
- M03 planning and M03.01 through M03.06 are completed and merged. PR #55 merged M03.05 at `89874bca2525a423d773548c61f9655f09642575`; PR #56/#57 are the documented identical-tree finalization deviation; PR #58 merged recovery QA at `721bd60eba04cdf71765660727132d0d6aed97bc`. PR #59 merged M03.06 after independent QA at `9c2df34fd1da1a4f893a5b16cb05fa1177f23cce`, sharing reviewed tree `a5f52604955f8a8925728a2cb7b5c8900aefd87a`. Formal M03 closeout merged through PR #60 at `3df6f88b1b64b5456554654b7e27adcfa99c3ff6`.
- M00-M03 are closed and V1_PUBLIC_PRODUCT is approved. M04.01-M04.06 are Completed and merged. Human PR67 merge471d76c matches final reviewedee5d6c2/treeda69be5; exact final QA/clean QA18/0/1/CI37455976639 real storage64/balance22 and empty diff/main proof verified. M04.07 Add transaction query is **Builder complete, awaiting QA** on `m04-07-add-transaction-query`, no current PR yet, under active `plans/active/CLP-0005-m04-double-entry-ledger-core.md`. Fresh ledger655/15files and control614/type/lint/build/format PASS; root intermediate full QA17/0/2 PASS. Mandatory real PostgreSQL acceptance and overall independent QA pending; driver tests are not database proof. M04.08-M04.18 and M05-M21 remain Not started. Current evidence is in `docs/status/CURRENT_STATE.md`.
- Source-neutral MoneyEvent and Account/header/entry/journal/storage/account balances are merged. Current07 complete-journal queries are implemented with local validation PASS; actual database acceptance/overall QA pending. No posting eligibility, semantic retry, reversal or agent financial authority; stored synthetic data does not authenticate evidence.
- M03 closeout remains recorded; V1/all18 requirements are unchanged. Current gate: implement/validate07, existing overall QA, exact final-head CI and human-only sole-PR merge. No08 before verified07 merge.
- Versioning strategy is documented in `docs/VERSIONING.md`, `docs/releases/RELEASE_LADDER.md`, `docs/releases/V1_SCOPE.md`, and `CHANGELOG.md`.
- `docs/milestones/SUBMILESTONE_REGISTRY.md` is the canonical detailed registry.
