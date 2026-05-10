# CausalLedger Agent Guide

## Non-negotiable rules

1. LLM agents can investigate, summarize, and propose.
2. LLM agents cannot mutate money.
3. LLM agents cannot approve repairs.
4. LLM agents cannot delete evidence.
5. LLM agents cannot post ledger entries.
6. LLM agents cannot modify raw events.
7. LLM agents cannot override deterministic invariants.
8. Financial truth comes from raw evidence, canonical events, deterministic invariants, replay, evidence bundles, and human approval.
9. Every meaningful slice must update the active plan and status files.
10. Every meaningful slice must include validation.
11. Do not claim unfinished capabilities as implemented.

## CausalLedger safety boundary

Agents may inspect, summarize, explain, and propose. They must never become the source of financial truth or perform money-moving actions. Any behavior that changes money state, ledger state, raw evidence, external communications, deterministic invariant results, or repair approval requires deterministic controls and human approval.

Deterministic financial truth sources are raw evidence, canonical events, deterministic invariants, replay outputs, evidence bundles, and explicit human approval. LLM output can explain or propose but cannot establish financial truth.

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
- Required builder or QA thread status is recorded.
- Handoff packet states what changed, what did not change, and what remains.

Use `docs/ops/builder-qa-prompt-protocol.md`, `docs/ops/github-pr-and-issue-workflow.md`, and the prompt templates in `prompts/` for reusable builder, QA, PR, and handoff packet structure.

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

## Branch guard

Every builder and QA prompt must require these commands before any file edit:

- `git branch --show-current`
- `git status --short`
- `git remote -v`

If the current branch is not the expected submilestone branch, stop immediately. If the working tree is dirty before the slice starts, report dirty files and stop unless those files are explicitly part of the same requested submilestone.

Codex may stage, commit, and push scoped changes only when explicitly authorized. Codex must not merge PRs into `main`; human operators merge after QA PASS and merge readiness checks.

## Skills list

Use CausalLedger skills when the slice touches their boundary. At minimum, milestone and submilestone work should use:

- `causalledger-plan-orchestrator`
- `validation-ladder-composer`
- `handoff-auditor`

Available local CausalLedger skills:

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
2. `README.md`
3. `START_HERE.md`
4. `AGENTS.md`
5. `PLANS.md`
6. `WORKFLOW.md`
7. `docs/INDEX.md`
8. `plans/ROADMAP.md`
9. `docs/status/CURRENT_STATE.md`
10. `docs/status/NEXT_RECOMMENDED_THREAD.md`
11. Active plan in `plans/active/`, if present

## Forbidden shortcuts

- Do not start coding without an active plan for complex work.
- Do not skip validation.
- Do not treat LLM output as evidence.
- Do not delete or rewrite raw evidence.
- Do not conflate proposal generation with repair approval.
- Do not mark milestones complete without closeout.
- Do not claim placeholder directories contain working features.
- Do not start the next submilestone before QA PASS and PR merge for the current submilestone.

## Progress reporting rules

Report progress in the active plan and status docs. Handoffs must include changed files, validation commands, validation results, risks, and exact next thread recommendation.

## North star

CausalLedger should make money-movement incidents provable, replayable, and safely repairable without allowing agents to become financial truth.
