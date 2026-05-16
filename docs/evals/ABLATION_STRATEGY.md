# Ablation Strategy

## Purpose

Ablation strategy defines how CausalLedger should eventually compare system variants in offline benchmarks without weakening production safety boundaries.

This document is roadmap and evaluation planning only. It does not implement benchmark runners, toggles, product behavior, agent behavior, repair behavior, security tests, or production configuration.

## What an ablation is

An ablation is an offline experiment that disables, removes, weakens, replaces, or changes one component of a system to measure what that component contributes.

In CausalLedger, a future ablation may compare a full deterministic-first system against variants without graph evidence, replay evidence, critic review, evidence ID requirements, caching, routing, or repair validators. The purpose is to quantify value and failure modes, not to create production shortcuts.

## Core principle

Ablations may disable safety components only inside offline benchmark scenarios. Production runtime must keep safety boundaries enforced.

Unsafe ablations must never be enabled in production. They are offline negative controls only.

## Why ablations matter for CausalLedger

CausalLedger is designed around deterministic financial truth, evidence grounding, replay, repair safety, human review, and advisory agents. Ablations help show which parts of that design reduce hallucinations, improve root-cause accuracy, improve evidence precision and recall, reduce unsafe repair proposals, lower latency, control token cost, and withstand hostile evidence.

Without ablations, a benchmark can show that a system works but not which design decisions are responsible.

## Why ablations are high-value in fintech AI

Fintech AI claims need stronger proof than generic assistant demos. Teams evaluating incident-response tooling need to see that the system can:

- Preserve deterministic financial truth.
- Avoid unsupported root-cause claims.
- Refuse unsafe repair paths.
- Cite evidence instead of relying on narrative confidence.
- Escalate when evidence is missing or contradictory.
- Stay within safe tool boundaries.
- Control cost and latency under realistic investigation load.

Ablation tables make these properties inspectable by showing what fails when a safety or evidence component is removed.

## Offline benchmarks, not production toggles

Ablations are offline benchmark experiments, not production toggles. They should run against synthetic or controlled scenario fixtures, deterministic expected outputs, and recorded metrics.

Ablations are not production toggles. A future production runtime must not allow operators, agents, environment variables, feature flags, or hidden configuration to disable required financial truth, evidence, repair, human review, or tool safety controls.

## Company-readiness value

Ablation results support interviews, trust, and company-readiness by making claims concrete. A public report can show why deterministic invariants, evidence IDs, graph/replay context, critic review, repair validators, rollback requirements, idempotency requirements, human review, cost controls, and security tests matter.

## Connection to MoneyFlowBench

MoneyFlowBench should eventually run the same scenario under named ablation configurations, such as `full_system`, `deterministic_only`, `no_causal_graph`, or `no_repair_validator_negative_control`.

The benchmark should report root-cause accuracy, evidence precision, evidence recall, unsafe repair rate, hallucination rate, escalation quality, latency, and token cost by variant. M14 remains `Not started`; this document only plans that evaluation discipline.

## Connection to deterministic-first design

Deterministic-first ablations should measure what happens when future invariant, replay, or graph support is removed. The expected lesson is that LLM-only investigation is not a financial truth source and should perform worse on evidence precision, hallucination resistance, and unsafe repair prevention.

## Connection to agent safety

Agent safety ablations should measure the value of read-only tool boundaries, evidence ID requirements, critic review, model routing, and explicit escalation. Variants that remove evidence IDs or critic review are benchmark-only and may expose hallucination or unsupported explanation risk.

## Connection to cost and latency

Cost and latency ablations should compare small models, strong models, model routers, evidence caches, context compression, and scoped evidence packs. The goal is to understand when stronger models are justified and when deterministic prefilters or cached evidence can reduce cost without weakening truth boundaries.

## Connection to repair safety

Repair-safety ablations should be treated as dangerous offline negative controls when they remove validators, rollback requirements, idempotency requirements, evidence requirements, or human review. These variants are useful because they reveal unsafe repair failure modes, but they must never become production behavior.

## Connection to security testing

Security ablations should cover prompt injection, poisoned evidence, forbidden tool access attempts, and unsafe repair attempts. These tests should demonstrate that untrusted evidence text cannot override deterministic controls or tool permissions.

## Non-implementation statement

This document does not implement ablation runners, runtime switches, benchmark toggles, product configuration, agent code, repair code, security code, or scenario fixtures. It defines planning vocabulary only.
