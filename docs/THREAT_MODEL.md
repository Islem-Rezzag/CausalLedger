# Threat Model

## Product thesis

CausalLedger is an agentic financial incident-response and money-movement digital twin for fintech systems. It helps fintech teams find, prove, replay, and safely repair money-movement breaks across payments, ledgers, settlement files, bank statements, refunds, chargebacks, webhooks, and provider failures.

CausalLedger is not a payment processor, not a ledger replacement, not a generic reconciliation tool, not a fraud platform, not an AML platform, and not an autonomous finance agent.

The LLM never owns financial truth. LLM agents may investigate, summarize, and propose. LLM agents may not mutate money, approve repairs, delete evidence, post ledger entries, modify raw events, or override deterministic invariants.

## Status

Initial threat model for control-plane planning. M18 will finalize and test the full security model.

## Initial threat categories

- Unsafe LLM actions.
- Evidence tampering or deletion.
- Raw event mutation.
- Ledger mutation outside deterministic controls.
- Unsafe repair proposals or repair application without approval.
- Prompt injection through evidence, support notes, provider payloads, or imported files.
- Third-party connector compromise or malformed data.
- Secrets exposure.
- Audit-log gaps.
- Benchmark poisoning or misleading scenario evidence.

## Unsafe LLM actions

Agents must not mutate money, approve repairs, delete evidence, post ledger entries, modify raw events, override deterministic invariants, or release external communications. Future tool contracts must deny write tools and log tool usage.

## Evidence tampering

Future evidence behavior must preserve raw inputs, source identity, checksums or receipts, and provenance. Evidence deletion must require explicit human approval and should be treated as a destructive action.

## Unsafe repairs

Repair behavior must remain proposal-first. Future repair plans must require evidence IDs, idempotency keys, rollback plans, deterministic validators, simulation, and human approval before any application path exists.

## Prompt injection

Future agent workflows must treat imported evidence and external text as untrusted input. Agents should cite evidence IDs, operate through read-only tools, and pass hallucination and prompt-injection tests.

## Third-party connector risk

Future connectors must isolate credentials, validate source payloads, support health checks, record provenance, and avoid letting external provider text bypass deterministic controls.
