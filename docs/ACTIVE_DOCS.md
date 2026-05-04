# Active Docs

## Active docs boundary

Active docs define current project direction, workflow, milestone sequence, safety boundary, and implementation expectations. Reference docs can inform work but cannot override active docs.

## Read order

1. `docs/ACTIVE_DOCS.md`
2. `README.md`
3. `AGENTS.md`
4. `PLANS.md`
5. `WORKFLOW.md`
6. `plans/ROADMAP.md`
7. `docs/status/CURRENT_STATE.md`
8. Active plan in `plans/active/`, if one exists

## Conflict rule

- Active docs win for project direction.
- Current code wins for implemented behavior.
- The active plan decides how to close gaps.

## Update rule

If direction, workflow, milestone sequence, safety boundary, or implementation behavior changes, update the active docs in the same slice.

## Archive rule

Stale docs must be moved to archived locations or clearly marked reference-only.
