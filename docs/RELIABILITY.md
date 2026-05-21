# Reliability

## Product thesis

CausalLedger is an agentic financial incident-response and money-movement digital twin for fintech systems. It helps fintech teams find, prove, replay, and safely repair money-movement breaks across payments, ledgers, settlement files, bank statements, refunds, chargebacks, webhooks, and provider failures.

CausalLedger is not a bank, payment processor, ledger replacement, AML/KYC platform, fraud scoring engine, credit risk engine, tax or legal advisor, investment advisor, ERP replacement, treasury management system, or autonomous finance agent.

The LLM never owns financial truth. LLM agents may investigate, summarize, and propose. LLM agents may not mutate money, approve repairs, delete evidence, post ledger entries, modify raw events, or override deterministic invariants.

## Deterministic-first rule

Financial correctness must come from deterministic logic: raw evidence, canonical events, double-entry ledger checks, invariant results, replay outputs, evidence bundles, and human approval. LLM output may assist investigation but must not determine financial truth.

## LLM cannot mutate money

LLM agents may investigate, summarize, and propose. They may not mutate money, approve repairs, delete evidence, post ledger entries, modify raw events, override deterministic invariants, or release external communications.

LLM agents also may not make AML/KYC, sanctions, fraud, credit, legal, tax, investment, regulatory-reporting, accounting-close, treasury, banking, payment-processing, or autonomous repair decisions. M01.09 records these reliability boundaries in `docs/domain/out-of-scope-domains.md`.

## Evidence expectations

Future evidence handling must be append-only by default, preserve source identity, record hashes or receipts where appropriate, and keep provenance visible in incident and replay artifacts.

## Replay expectations

Future replay must reconstruct incident state deterministically, compare before and after invariants, compare balances where relevant, and produce artifacts that can be reviewed without trusting chat memory.

## Future validation expectations

- Control-plane changes require documentation and bootstrap validation.
- Schema and domain changes require deterministic schema tests.
- Ledger and invariant changes require edge-case financial tests.
- Replay changes require reproducibility tests.
- Agent changes require permission, evidence-grounding, hallucination, cost, and audit-log checks.
- Repair changes require proposal-only validation, rollback plans, idempotency, unsafe repair rejection, and human approval boundaries.
