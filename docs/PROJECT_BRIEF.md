# Project Brief

## Product thesis

CausalLedger is an agentic financial incident-response and money-movement digital twin for fintech systems. It helps fintech teams find, prove, replay, and safely repair money-movement breaks across payments, ledgers, settlement files, bank statements, refunds, chargebacks, webhooks, and provider failures.

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

## What it refuses to do

CausalLedger refuses to let LLM agents mutate money, approve repairs, delete evidence, post ledger entries, modify raw events, override deterministic invariants, or become the source of financial truth.

CausalLedger also refuses to make AML/KYC, sanctions, fraud, credit, legal, tax, investment, regulatory-reporting, accounting-close, treasury, banking, or payment-processing decisions. M01.09 records these boundaries in `docs/domain/out-of-scope-domains.md`.

## Why CausalLedger is not just reconciliation

Traditional reconciliation focuses on matching records and explaining differences. CausalLedger is scoped as incident response and a money-movement digital twin: it connects evidence, event lifecycles, ledger behavior, causal graph traversal, replay, repair safety, and human approval into a provable workflow.

## Current status

CausalLedger has completed M00 Repo Operating System and tagged it as `v0.1.0`. M01 planning is complete and merged, M01 is active, M01.01 Define Payment Lifecycle is recorded as `Completed and merged` after post-merge QA recovery, M01.02 Define Ledger Vocabulary is `Completed and merged`, M01.03 Define Settlement Vocabulary is `Completed and merged` at git commit `e54a917`, M01.04 Define Reconciliation Vocabulary is `Completed and merged` at git commit `5dfe928`, M01.05 Define Incident Vocabulary is `Completed and merged` after QA recovery PR #18 merged at git commit `3bdedeb`, M01.06 Define Safe and Unsafe Repairs is `Completed and merged` after PR #21 merged at git commit `7adc96d`, M01.07 Define Evidence Receipt Model is `Completed and merged` after PR #23 merged at git commit `a88b5ff`, M01.08 Define Human Review States is `Completed and merged` after PR #26 merged at git commit `1fde07a`, M01.09 Define Out-of-Scope Domains is `Completed and merged` after PR #27 merged at git commit `1b40773`, M01.10 Write DOMAIN_MODEL.md is `Completed and merged` after QA recovery PR #29 merged at git commit `a878d55`, M01.11 Write RELIABILITY.md is `Completed and merged` after PR #30 merged at git commit `a424924`, M01.12 Write THREAT_MODEL.md is `Completed and merged` after PR #31 merged, and M01.13 QA Domain Consistency is `Builder complete, awaiting QA`. The M01.01, M01.05, and M01.10 protocol deviations were recovered before later submilestones proceeded; duplicate PR merges #32 and #33 from the same M01.12 branch are recorded as a process deviation. The repository contains planning, safety, milestone, prompt, skill, versioning, domain vocabulary, reliability model, threat model, ablation planning, and validation scaffolding only. Product implementation has not started.
