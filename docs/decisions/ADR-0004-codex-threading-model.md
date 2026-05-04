# ADR-0004 Codex Threading Model

## Status

Accepted.

## Decision

Use one planning thread per milestone, one builder thread per submilestone, one QA thread per submilestone, and one closeout thread per milestone.

## Consequences

Plans, status docs, validation evidence, and handoff packets must carry continuity across threads.
