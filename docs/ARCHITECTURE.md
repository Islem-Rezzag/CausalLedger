# Architecture

## Product thesis

CausalLedger is a planned continuous payment lifecycle observability and incident-response system for fintech money movement. It is designed to build a living causal timeline from provider events, webhooks, ledger entries, settlement files, bank evidence, refunds, chargebacks, and provider failures so teams can find, prove, replay, and safely review repairs for money-movement breaks.

CausalLedger is not a bank, payment processor, ledger replacement, AML/KYC platform, fraud scoring engine, credit risk engine, tax or legal advisor, investment advisor, ERP replacement, treasury management system, or autonomous finance agent.

The LLM never owns financial truth. LLM agents may investigate, summarize, and propose. LLM agents may not mutate money, approve repairs, delete evidence, post ledger entries, modify raw events, or override deterministic invariants.

## Current implementation status

This document describes planned architecture only. It does not claim product functionality is implemented.

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
- Canonical events: future MoneyEvent schemas and transformations. The current conceptual boundary is documented in `docs/MONEYEVENT_CONTRACT.md`; no runtime MoneyEvent behavior exists yet.
- Ledger primitives: future deterministic double-entry checks, immutable transactions, balances, and reversals.
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

The repository currently does not implement ingestion, MoneyEvent logic, ledger logic, invariants, incidents, graph traversal, replay, repair planning, agent runtime, UI, or external connectors.

It also does not implement AML/KYC, sanctions screening, fraud scoring, credit decisions, legal or tax advice, investment advice, accounting close, ERP, treasury, banking, payment processing, autonomous repair execution, or autonomous money movement. See `docs/domain/out-of-scope-domains.md` for the M01.09 domain boundary.
