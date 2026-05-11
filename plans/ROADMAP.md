# CausalLedger Roadmap

Current milestone marker: M01 Domain model and scope freeze is active. M01 planning is complete and merged at git commit `2cfd75a`.
Current submilestone status: M00.01 through M00.08 are completed and merged. M00 is tagged as `v0.1.0` for the repo operating system foundation. M01.01 Define payment lifecycle is recorded as `Completed and merged` after post-merge QA recovery on branch `m01-01-qa-recovery-define-payment-lifecycle`; M01.02 through M01.13 are not started.

This roadmap is control-plane state. It records planned milestone sequence and submilestone counts; it does not claim future product functionality is implemented.

| Milestone | Goal | Focus | Exit criteria | Submilestone count | Status |
| --- | --- | --- | --- | --- | --- |
| M00 Repo operating system | Establish the durable repository operating system for CausalLedger. | Control-plane docs, workflow, planning, validation | Codex can continue from repo state without chat memory | 8 | Completed |
| M01 Domain model and scope freeze | Freeze CausalLedger domain language, scope, and non-goals. | Concepts, non-goals, glossary | Domain model and scope are approved | 13 | Active |
| M02 Monorepo and local development | Create the runnable local development foundation. | Tooling, packages, CI shape | Local checks run consistently | 20 | Not started |
| M03 Canonical MoneyEvent engine | Define and implement the canonical event representation. | Event schemas and normalization | MoneyEvent behavior is specified and validated | 19 | Not started |
| M04 Double-entry ledger core | Implement deterministic double-entry ledger primitives. | Transactions, entries, balances | Ledger checks pass deterministic tests | 18 | Not started |
| M05 Provider and bank simulator | Build controlled synthetic providers and bank sources. | Providers, banks, webhooks, failures | Scenarios can generate source evidence | 19 | Not started |
| M06 Invariant engine | Implement deterministic financial invariant checks. | Deterministic correctness rules | Invariants detect defined breaks | 18 | Not started |
| M07 Incident engine | Create the incident lifecycle from deterministic failures. | Severity, evidence, ownership | Incidents are created from failed checks | 16 | Not started |
| M08 Causal graph | Model causal money-movement relationships. | Graph entities and traversal | Events and evidence are traceable | 18 | Not started |
| M09 Replay engine and digital twin | Reconstruct incident state reproducibly. | Replay sessions and state snapshots | Incidents can be replayed deterministically | 17 | Not started |
| M10 Agent tool contracts | Define safe agent interfaces and deny mutation tools. | Read-only tools and contracts | Agents are constrained by tool boundaries | 15 | Not started |
| M11 Agentic investigator v1 | Add investigation workflows that remain advisory. | Triage, hypotheses, memos | Agents can investigate without mutation | 15 | Not started |
| M12 Repair planner v1 | Draft repair proposals safely without approval or application. | Plans, checks, approvals | Repairs are proposals only | 17 | Not started |
| M13 Human review workbench | Support human approval workflow for repair proposals. | Review UX and audit decisions | Humans can approve or reject proposals | 12 | Not started |
| M14 MoneyFlowBench v1 | Create the benchmark suite for agentic financial operations. | Scenarios, scoring, evidence | Benchmarks measure investigation quality | 24 | Not started |
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
- The active M01 plan lives at `plans/active/CLP-0002-m01-domain-model-and-scope-freeze.md`.
- M01 planning is complete and merged at git commit `2cfd75a`.
- M01 is active; M01.01 is `Completed and merged` after post-merge QA recovery, and M01.02 through M01.13 remain `Not started`.
- M02-M21 remain `Not started`.
- Product implementation has not started.
- The first M01 implementation submilestone after planning is `M01.01 Define payment lifecycle`.
- Versioning strategy is documented in `docs/VERSIONING.md`, `docs/releases/RELEASE_LADDER.md`, `docs/releases/V1_SCOPE.md`, and `CHANGELOG.md`.
- `docs/milestones/SUBMILESTONE_REGISTRY.md` is the canonical detailed registry.
