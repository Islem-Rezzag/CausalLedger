# Project Brief

## Product thesis

CausalLedger is a planned continuous payment lifecycle observability and incident-response system for fintech money movement. It is designed to build a living causal timeline from provider events, webhooks, ledger entries, settlement files, bank evidence, refunds, chargebacks, and provider failures so teams can find, prove, replay, and safely review repairs for money-movement breaks.

CausalLedger is not a bank, payment processor, ledger replacement, AML/KYC platform, fraud scoring engine, credit risk engine, tax or legal advisor, investment advisor, ERP replacement, treasury management system, or autonomous finance agent.

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

The planned incident lifecycle should support progressive certainty. CausalLedger may flag a suspected break when early provider, ledger, webhook, settlement, bank, refund, or chargeback evidence looks inconsistent; later evidence can confirm the break, dismiss it as a false positive, resolve it after delayed settlement or bank evidence arrives, keep it unresolved due to missing evidence, or support post-settlement confirmation. This is product direction only and is not implemented yet.

## What it refuses to do

CausalLedger refuses to let LLM agents mutate money, approve repairs, delete evidence, post ledger entries, modify raw events, override deterministic invariants, or become the source of financial truth.

CausalLedger also refuses to make AML/KYC, sanctions, fraud, credit, legal, tax, investment, regulatory-reporting, accounting-close, treasury, banking, or payment-processing decisions. M01.09 records these boundaries in `docs/domain/out-of-scope-domains.md`.

## Why CausalLedger is not just reconciliation

Traditional reconciliation focuses on matching records and explaining differences. CausalLedger is scoped as incident response and a money-movement digital twin: it connects continuous lifecycle evidence, ledger behavior, causal graph traversal, replay, repair safety, and human approval into a provable workflow.

## Current status

CausalLedger has completed M00 Repo Operating System and tagged it as `v0.1.0`. M01 Domain Model and Scope Freeze is completed and closed after M01.01 through M01.13 completed and merged. The M01.01, M01.05, and M01.10 protocol deviations were recovered before later submilestones proceeded; duplicate PR merges #32 and #33 from the same M01.12 branch are recorded as a process deviation. The repository contains planning, safety, milestone, prompt, skill, versioning, domain vocabulary, reliability model, threat model, domain consistency QA, closeout documentation, ablation planning, and validation scaffolding only. Product implementation has not started.
