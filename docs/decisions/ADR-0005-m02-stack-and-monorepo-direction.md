# ADR-0005: M02 Stack and Monorepo Direction

## Status

Planning placeholder.

## Context

M02 must choose the backend stack, frontend stack, package manager, monorepo task runner, and app/package boundaries before product implementation starts.

## Decision to make

Choose a stack and monorepo direction that keeps deterministic financial truth layers separate from agent investigation and repair proposal layers.

## Planning constraints

- Do not implement product code in this ADR.
- Do not create runtime APIs, databases, CI workflows, auth/authz, logging, deployment, or product behavior.
- Preserve package boundaries for future MoneyEvent, ledger, invariants, incidents, graph, replay, repair, evidence, connector, eval, and agent-runtime work.
- Keep LLM output advisory and separate from deterministic truth.

## Next step

Resolve this ADR during M02.01 before creating app or package implementations.
