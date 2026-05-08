# CausalLedger Roadmap

Current milestone marker: M00 Repo operating system.
Current submilestone status: M00.04 Builder and QA Prompt Protocol builder is complete and awaiting QA. M00.01, M00.02, and M00.03 are completed and merged. M00 remains in progress.

This roadmap is control-plane state. It records planned milestone sequence and submilestone counts; it does not claim future product functionality is implemented.

| Milestone | Goal | Focus | Exit criteria | Submilestone count | Status |
| --- | --- | --- | --- | --- | --- |
| M00 Repo operating system | Establish the durable repository operating system for CausalLedger. | Control-plane docs, workflow, planning, validation | Codex can continue from repo state without chat memory | 8 | In progress |
| M01 Domain model and scope freeze | Freeze CausalLedger domain language, scope, and non-goals. | Concepts, non-goals, glossary | Domain model and scope are approved | 13 | Not started |
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

- M00 is the only active milestone in this plan.
- Current M00 submilestone: M00.04 Builder and QA Prompt Protocol.
- M00.01, M00.02, and M00.03 are completed and merged.
- M00.04 is builder complete and awaiting QA. It must not be marked QA passed or completed until same-branch QA passes and the PR merges.
- M01-M21 must not receive active plans until instructed by a future thread.
- Product implementation must not start during M00 unless explicitly scoped by the active plan. The current active plan scopes control-plane work only.
- `docs/milestones/SUBMILESTONE_REGISTRY.md` is the canonical detailed registry.
