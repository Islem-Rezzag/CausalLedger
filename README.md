# CausalLedger

CausalLedger is an agentic financial incident-response and money-movement digital twin for fintech systems.

It helps fintech teams answer five operational questions:

1. Where did the money go?
2. What broke?
3. Why did it break?
4. What evidence proves it?
5. What is the safest repair?

CausalLedger ingests payment events, ledger entries, settlement files, bank statements, refunds, chargebacks, webhooks, and provider failure signals. It normalizes them into canonical money events, builds a causal graph, checks deterministic financial invariants, creates incidents, supports agentic root-cause investigation, proposes safe repair plans, and verifies outcomes through replay and evidence bundles.

## What CausalLedger is

CausalLedger is:

- a financial incident-response system
- a money-movement digital twin
- a causal debugging layer for payment operations
- a deterministic financial correctness engine
- an agentic investigation workbench
- a replay and repair-safety system
- an open-source benchmark foundation for agentic financial operations

## What CausalLedger is not

CausalLedger is not:

- a payment processor
- a bank operating system
- a generic reconciliation tool
- a ledger replacement
- a fraud platform
- an AML platform
- an accounting close platform
- a generic finance chatbot
- an autonomous finance agent

## Core safety principle

The LLM never owns financial truth.

LLM agents may:

- investigate incidents
- summarize evidence
- generate hypotheses
- explain uncertainty
- draft case memos
- propose repair plans

LLM agents may not:

- mutate money
- post ledger entries
- approve repairs
- delete evidence
- modify raw events
- override invariants
- release external communications
- claim unsupported financial facts

Financial truth comes from:

- raw evidence
- canonical money events
- deterministic invariants
- double-entry ledger checks
- causal graph relationships
- replay results
- evidence bundles
- human approval

## Product thesis

Fintech companies can move money faster than they can always prove where money went when systems disagree.

CausalLedger focuses on the expensive operational gap between payment providers, internal ledgers, settlement files, bank statements, refunds, chargebacks, support tickets, and provider webhooks.

The product goal is to reduce manual investigation time, prevent unsafe repairs, improve audit evidence, and make money-movement incidents replayable and explainable.

## High-level architecture

```text
External sources
  payment providers, ledger entries, settlement files, bank statements, webhooks
        |
        v
Ingestion and canonicalization
  raw payload archive, source identity, checksums, provenance, idempotency
        |
        v
Canonical Money Event Store
  normalized lifecycle events, references, actors, amounts, timestamps
        |
        v
Financial Truth Layer
  double-entry ledger, state machines, deterministic invariants
        |
        v
Causal Graph
  events, ledger entries, payouts, bank lines, settlements, repairs
        |
        v
Incident Engine
  failed invariants, severity, affected value, affected customers, evidence IDs
        |
        v
Agentic Investigation
  triage, trace, query, hypothesis, critic, memo
        |
        v
Repair Safety
  repair proposal, validation, idempotency, rollback plan, simulation
        |
        v
Human Review
  approve, reject, request more evidence
        |
        v
Replay and Evidence Bundle
  reproducible incident record, benchmark result, exportable proof
```

## Target users

- fintech payment operations teams
- ledger and reconciliation engineers
- incident commanders for money-movement failures
- finance platform and infrastructure teams
- audit, risk, and compliance partners reviewing evidence

## Repo map

- `docs/`: active docs, milestone skeletons, specs, evals, decisions, ops notes, and references.
- `plans/`: active, completed, archived, and template CausalLedger Plans.
- `prompts/`: reusable Codex thread prompt templates.
- `.agents/`: local CausalLedger skills and Codex control-plane guidance.
- `apps/`: future deployable services; currently placeholders only.
- `packages/`: future domain packages; currently placeholders only.
- `scenarios/`: future incident scenarios and benchmark cases.
- `tests/`: control-plane tests now; product tests later.
- `scripts/`: validation scaffolding.
- `reports/`, `artifacts/`, `data/`, `infra/`: future outputs, fixtures, and local infrastructure scaffolding.

## Current status

CausalLedger is in control-plane bootstrap. This repository currently contains architecture, planning, prompt, skill, milestone, and validation scaffolding only. No product functionality, MoneyEvent logic, ledger logic, invariants, agent runtime, or UI features exist yet.

## How to work with Codex

Start with `START_HERE.md`. Codex should read active docs in the required order, continue an existing active plan if one exists, and create a plan before coding if no active plan exists. Every meaningful slice must update the active plan, status files, validation evidence, and handoff packet.

## Milestone overview

- M00 Repo operating system
- M01 Domain model and scope freeze
- M02 Monorepo and local development
- M03 Canonical MoneyEvent engine
- M04 Double-entry ledger core
- M05 Provider and bank simulator
- M06 Invariant engine
- M07 Incident engine
- M08 Causal graph
- M09 Replay engine and digital twin
- M10 Agent tool contracts
- M11 Agentic investigator v1
- M12 Repair planner v1
- M13 Human review workbench
- M14 MoneyFlowBench v1
- M15 UI command center
- M16 Sandbox and external connectors
- M17 Observability, costs, and model routing
- M18 Security hardening
- M19 Production polish
- M20 Public launch
- M21 Company version

## First success condition

Codex understands the repo and can continue from the active docs without relying on chat memory.
