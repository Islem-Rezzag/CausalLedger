# Project Brief

## Product thesis

CausalLedger is an agentic financial incident-response and money-movement digital twin for fintech systems. It helps fintech teams find, prove, replay, and safely repair money-movement breaks across payments, ledgers, settlement files, bank statements, refunds, chargebacks, webhooks, and provider failures.

CausalLedger is not a payment processor, not a ledger replacement, not a generic reconciliation tool, not a fraud platform, not an AML platform, and not an autonomous finance agent.

The LLM never owns financial truth. LLM agents may investigate, summarize, and propose. LLM agents may not mutate money, approve repairs, delete evidence, post ledger entries, modify raw events, or override deterministic invariants.

## One-line pitch

CausalLedger helps fintech teams prove, replay, and safely repair money-movement incidents without letting agents become financial truth.

## Problem

Fintech teams often need to reconcile contradictory signals from payment providers, ledgers, settlement files, bank statements, refunds, chargebacks, webhooks, and provider failures. When money movement breaks, teams need evidence, replayable state, deterministic checks, and safe repair paths instead of chat-driven guesswork.

## Target users

- Payment operations teams.
- Ledger and reconciliation engineers.
- Finance platform and infrastructure engineers.
- Incident commanders for money-movement failures.
- Audit, risk, and compliance partners reviewing evidence.

## What the system does

The planned system will collect raw evidence, normalize canonical events, check deterministic financial invariants, construct causal traces, create incidents, support evidence-grounded investigation, simulate repairs, and produce replayable evidence bundles.

## What it refuses to do

CausalLedger refuses to let LLM agents mutate money, approve repairs, delete evidence, post ledger entries, modify raw events, override deterministic invariants, or become the source of financial truth.

## Why CausalLedger is not just reconciliation

Traditional reconciliation focuses on matching records and explaining differences. CausalLedger is scoped as incident response and a money-movement digital twin: it connects evidence, event lifecycles, ledger behavior, causal graph traversal, replay, repair safety, and human approval into a provable workflow.

## Current status

CausalLedger has completed M00 Repo Operating System and tagged it as `v0.1.0`. M01 planning is complete and merged, M01 is active, and M01.01 Define Payment Lifecycle is `Builder complete, awaiting QA` as a domain-documentation-only submilestone. The repository contains planning, safety, milestone, prompt, skill, versioning, domain vocabulary, and validation scaffolding only. Product implementation has not started.
