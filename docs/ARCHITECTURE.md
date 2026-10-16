# Architecture

## Product thesis

CausalLedger is a planned continuous payment lifecycle observability and incident-response system for fintech money movement. It is designed to build a living causal timeline from provider events, webhooks, ledger entries, settlement files, bank evidence, refunds, chargebacks, and provider failures so teams can find, prove, replay, and safely review repairs for money-movement breaks.

CausalLedger is not a bank, payment processor, ledger replacement, AML/KYC platform, fraud scoring engine, credit risk engine, tax or legal advisor, investment advisor, ERP replacement, treasury management system, or autonomous finance agent.

The LLM never owns financial truth. LLM agents may investigate, summarize, and propose. LLM agents may not mutate money, approve repairs, delete evidence, post ledger entries, modify raw events, or override deterministic invariants.

## Current implementation status

Architecture combines implemented source-neutral MoneyEvent and human-merged M04 ledger primitives with planned later layers. M05.01 generic manifest foundation is human-merged in verified PR82. M05.02 adds one synthetic authorization generator with candidate workspace/independent acceptance and actual CI passed; final tracking-head gates and human merge remain. Other provider/bank generators and the integrated public product remain unimplemented.

## High-level architecture

```text
Live or replayed source evidence and simulators
  provider events, webhooks, ledger records, settlement files, bank statements, refunds, chargebacks
        |
        v
Evidence and ingestion boundary
  raw payload archive, source identity, checksums, provenance, idempotency
        |
        v
Canonical event layer
  MoneyEvent schema, lifecycle stages, references, actors, amounts
        |
        v
Deterministic truth layer
  double-entry ledger checks, invariant engine, state machines
        |
        v
Incident and causal layer
  incidents, severity, graph nodes, graph edges, evidence links
        |
        v
Replay and repair-safety layer
  replay sessions, repair simulations, rollback plans, validation
        |
        v
Agentic investigation boundary
  read-only tools, evidence packs, hypotheses, memos, critic checks
        |
        v
Human review and evidence bundles
  approval workflow, audit log, exportable proof
```

## Core layers

- Evidence capture: future append-only raw evidence, provenance, source identity, and checksums.
- Canonical events: `packages/events` contains the M03.02 TypeScript type boundary plus M03.04 source-neutral deterministic validation and normalization. The conceptual boundary is documented in `docs/MONEYEVENT_CONTRACT.md`, and `docs/MONEYEVENT_MAPPING_FIXTURES.md` remains M03.03 planning only. Source-specific parsing, ingestion, storage, and downstream MoneyEvent-engine behavior do not exist yet.
- Ledger primitives: packages/ledger implements deterministic schemas/journal equality, immutable SQL storage, exact balances/readback, scoped durable retry identity, full linked reversals and explicit account-role validation. Structural software checks do not establish economic truth or investigator posting authority.
- Invariants: future deterministic financial correctness checks.
- Incidents: future incident records created from failed deterministic checks.
- Causal graph: future traceable relationships between events, ledger entries, payouts, bank lines, settlements, and repairs.
- Replay: future deterministic reconstruction of incident state.
- Repair safety: future repair proposals, simulations, rollback plans, and validators.
- Agent tools: future read-only investigation tools and proposal-only repair simulation tools.
- Human review: future approval, rejection, and audit workflow.

## Live event stream and historical replay inputs

Live monitoring and historical replay are planned to use the same canonical event engine. The difference is input timing, not product mode: live monitoring would process evidence as it arrives, while historical replay would process stored evidence later.

Both paths should preserve the same MoneyEvent, evidence receipt, invariant, incident, causal graph, replay, repair proposal, and human review concepts. A live event stream may flag a suspected break early, while later settlement and bank evidence may confirm, dismiss, resolve, or keep the break unresolved.

This repository does not implement event streaming, historical replay, canonical event processing, or timeline updates yet.

## Verifier-driven loop strategy

A loop in CausalLedger is a bounded process that repeatedly compares an input, plan, mapping, validation result, replay, proposal, benchmark variant, or operational signal against an external verifier until it reaches a recorded pass, fail, uncertain, deferred, or stop result. Loops are architecture concepts for future implementation and do not create automation in M03.03.

Loops require external verifiers such as deterministic validators, tests, replay outputs, evidence references, benchmark expectations, policy boundaries, or human review. A loop must not rely on the agent grading its own work to establish financial truth.

Loops require persistent state so each iteration leaves durable inputs, outputs, verifier results, costs, uncertainty, and stop reasons. They require explicit stop conditions, including max iterations, max cost, timeout, unchanged result, verifier pass/fail, uncertainty threshold, or human escalation. Production money mutation must never be loop-driven; no loop may post ledger entries, apply repairs, alter raw evidence, move money, or override deterministic invariants.

For the continuous payment lifecycle observer, future loops may re-check living evidence as provider, settlement, bank, replay, and human-review signals arrive. Live evidence loops should preserve progressive certainty, while historical replay loops should reproduce from stored inputs and compare deterministic outputs. Future MoneyFlowBench and ablations may run controlled offline loops to compare architecture variants, cost, hallucination rate, evidence grounding, and uncertainty handling; those results are benchmark evidence, not production truth.

Allowed future loop categories:

- control-plane validation loop;
- local development and CI loop;
- evidence-to-MoneyEvent mapping loop;
- deterministic validation loop;
- incident lifecycle loop;
- replay loop;
- read-only agent investigation loop;
- repair proposal validation loop;
- benchmark and ablation loop;
- model routing and cost loop;
- security regression loop.

Forbidden loops:

- autonomous production money movement;
- autonomous repair execution;
- LLM-only financial truth;
- self-grading loop with no external verifier;
- production write tools exposed to AI;
- unsafe ablations outside offline benchmark mode;
- unbounded loops without cost or iteration limits.

## Agent safety boundary

Agents may inspect, summarize, explain, and propose. They may not mutate money, approve repairs, delete evidence, post ledger entries, modify raw events, override deterministic invariants, or release external communications.

## Future UI screens

- Incident command center.
- Incident detail page.
- Transaction timeline.
- Causal graph view.
- Invariant failure panel.
- Evidence panel.
- Agent notebook panel.
- Repair review panel.
- Replay result panel.
- Scenario selector.

## Future data sources

- Payment provider events and webhooks.
- Internal ledger entries.
- Settlement files.
- Bank statements.
- Refund and chargeback records.
- Provider failure signals.
- Synthetic simulator outputs.
- Sandbox connector imports.

## Non-claims

Implemented runtime includes source-neutral MoneyEvent candidate validation/normalization and reviewed deterministic M04 ledger schemas, exact journal checks, immutable PostgreSQL storage, read-only queries, scoped retry identity, full linked reversals and account-role validators. Simulator generation remains planning only. Source-specific ingestion/mapping/evidence persistence, general invariant/incident/graph/replay/repair/agent engines, product UI and external connectors are unimplemented. Structural software validation is not external financial truth or agent posting authority.

It also does not implement AML/KYC, sanctions screening, fraud scoring, credit decisions, legal or tax advice, investment advice, accounting close, ERP, treasury, banking, payment processing, autonomous repair execution, or autonomous money movement. See `docs/domain/out-of-scope-domains.md` for the M01.09 domain boundary.


## Historical M05 synthetic source planning ownership (2026-10-12)

Proposed dedicated packages/simulator owns offline deterministic synthetic provider/webhook/settlement/bank generation, distinct source-occurrence and delivery identities, explicit clocks, versioned manifests/seed/CSV output. This planning slice creates no package, output, parser, connector, evidence store or financial-write API. Connectors retain external source adapters; evidence retains append-only capture/receipt/storage; events retains source-neutral canonical validation; ledger retains deterministic financial primitives. No direct ledger write or agent authority is introduced. Active plan: plans/active/CLP-0006-m05-provider-and-bank-simulator.md.


## M05.01 foundation checkpoint (2026-10-13)

M00–M04 are closed; V1_PUBLIC_PRODUCT remains approved. M05 planning PR81 is human-merged and verified. M05.01 Create simulator package is QA passed, awaiting merge for sole PR #82 on m05-01-create-simulator-package under active plans/active/CLP-0006-m05-provider-and-bank-simulator.md. Candidate independent QA and both CI passed; final tracking-head gates remain pending. Generic manifest foundation is implemented; provider/bank generation remains unimplemented. M05.02–M05.19 and M06–M21 remain Not started/unbound.

Human PR81 merged at 6b755d57bf0f03f1618aea1096cc99e1876e4bed on 2026-10-13T17:25:57Z by nonbot Islem-Rezzag. Reviewed b18b047fe87ed8eafa6d9756ca7db5c9d569291f and actual merge have tree 4f45bfdfbc063966766f9a347a1fccd3f4d237ca, full diff EMPTY and fetched-main reachability PASS. Root and existing independent reviewer verified primary merge/CI/body/advisory6128785198/reviewer hash bindings. Final planning QA441 lifecycle/2252 controls/rootclean18/0/1/bothCI38273448464 passed;1785 ledger/32files/all14 PostgreSQL1227/THREE recovery/both populated upgrades/schema/DEMO/cleanup passed. No unchanged planning tests rerun to verify merge.

Generic structural/hash validation is not financial payload validation, source authenticity or actual receipt ingestion. Exact UTF8 preservation and explicit unknown source time are required. Future amount/currency/seed/CLI/CSV behavior stays with its owning slice. No material scope expansion or financial-write authority.
## M05.02 current checkpoint (2026-10-16)

M00–M04 are closed; V1_PUBLIC_PRODUCT remains approved. M05.01 is Completed and merged in verified human PR82. M05.02 Simulate payment authorized is QA passed, awaiting merge for sole PR #83 on m05-02-simulate-payment-authorized under plans/active/CLP-0006-m05-provider-and-bank-simulator.md. Only the synthetic authorization generator is implemented. Independent candidate acceptance passed; final tracking-head gates and human merge remain. M05.03–M05.19 and M06–M21 remain Not started/unbound.

Human PR82 merged ac092fcb7b0ee16459b1ca1177d4b9b10e0df5ce at 2026-10-16T14:20:14Z by nonbot Islem-Rezzag. Reviewed b0c0e32daf91d95cd9bff555a766dadc0cfc7501 and squash have identical tree 0d2f821264fc0c55ae6ed77eb4ebc65729776014, full diff EMPTY and fetched-main reachability PASS. Root and existing independent reviewer verified primary merge/CI/body/advisory6153826833/canonical reviewer hash bindings. Final simulator107, lifecycle540, controls2397, root clean18/0/1 and both CI38455025292 PASS; ledger1785 and all14 real PostgreSQL suites1227/no skips, recovery/upgrades/schema/DEMO/cleanup PASS. Prior candidate309 behavior probes were carried through356 byte-identical nontracking files, not rerun as fresh final probes. No unchanged01 tests rerun merely to verify merge.

Current02 generator validation is recorded in CURRENT_STATE.md and active CLP0006. Root runs tests; user none. No future feature or financial authority.
