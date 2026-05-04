# CausalLedger Agent Guide

## Non-negotiable rules

1. LLM agents can investigate, summarize, and propose.
2. LLM agents cannot mutate money.
3. LLM agents cannot approve repairs.
4. LLM agents cannot delete evidence.
5. LLM agents cannot post ledger entries.
6. LLM agents cannot modify raw events.
7. Financial truth comes from raw evidence, canonical events, deterministic invariants, replay, evidence bundles, and human approval.
8. Every meaningful slice must update the active plan and status files.
9. Every meaningful slice must include validation.
10. Do not claim unfinished capabilities as implemented.

## CausalLedger safety boundary

Agents may inspect, summarize, explain, and propose. They must never become the source of financial truth or perform money-moving actions. Any behavior that changes money state, ledger state, raw evidence, external communications, or repair approval requires deterministic controls and human approval.

## Module boundaries

- `packages/events/`: canonical event schemas and transformations, not repair behavior.
- `packages/ledger/`: future ledger primitives, not autonomous mutation.
- `packages/invariants/`: deterministic checks, not LLM judgment.
- `packages/incidents/`: incident records and lifecycle.
- `packages/graph/`: causal relationships and traversal.
- `packages/replay/`: replay sessions and deterministic reconstruction.
- `packages/repair/`: repair proposals and safety checks, not approval or application.
- `packages/evidence/`: evidence bundle metadata and provenance.
- `packages/connectors/`: source adapters and raw evidence capture.
- `packages/evals/`: benchmark and evaluation harnesses.
- `apps/agent-runtime/`: future agent orchestration under strict tool contracts.

## Definition of done for any slice

- Scope matches the active plan.
- Status docs and active plan are updated.
- Validation is run and results are recorded.
- Safety boundaries are preserved.
- Handoff packet states what changed, what did not change, and what remains.

## Default implementation preferences

- Prefer deterministic logic for financial correctness.
- Prefer explicit schemas and provenance fields over inferred meaning.
- Prefer append-only evidence behavior.
- Prefer small submilestones with strict validation.
- Prefer file-first handoff over relying on chat memory.

## Commands

- `make validate-control-plane`
- `make test-control-plane`
- `make bootstrap-check`
- `python scripts/validate-control-plane.py`
- `python -m pytest tests/test_control_plane_bootstrap.py`

## Skills list

- `causalledger-plan-orchestrator`
- `modular-architecture-guard`
- `financial-correctness-guard`
- `money-event-schema-guard`
- `ledger-invariant-guard`
- `causal-graph-guard`
- `replay-engine-guard`
- `agent-tool-boundary-guard`
- `repair-safety-guard`
- `moneyflowbench-evidence-auditor`
- `validation-ladder-composer`
- `token-cost-guard`
- `handoff-auditor`

## Files to read before large changes

1. `docs/ACTIVE_DOCS.md`
2. `START_HERE.md`
3. `README.md`
4. `AGENTS.md`
5. `PLANS.md`
6. `WORKFLOW.md`
7. `plans/ROADMAP.md`
8. `docs/status/CURRENT_STATE.md`
9. Active plan in `plans/active/`, if present

## Forbidden shortcuts

- Do not start coding without an active plan for complex work.
- Do not skip validation.
- Do not treat LLM output as evidence.
- Do not delete or rewrite raw evidence.
- Do not conflate proposal generation with repair approval.
- Do not mark milestones complete without closeout.
- Do not claim placeholder directories contain working features.

## Progress reporting rules

Report progress in the active plan and status docs. Handoffs must include changed files, validation commands, validation results, risks, and exact next thread recommendation.

## North star

CausalLedger should make money-movement incidents provable, replayable, and safely repairable without allowing agents to become financial truth.
