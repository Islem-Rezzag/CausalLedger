# Active Docs

## Active docs boundary

Active docs define current project direction, workflow, milestone sequence, safety boundary, active execution state, and implementation expectations. Reference docs can inform work but cannot override active docs.

## Read order

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
11. Active plan in `plans/active/`, if one exists

## Canonical files

Project direction:

- `docs/INDEX.md`
- `docs/PROJECT_BRIEF.md`
- `docs/PRODUCT_VISION.md`
- `docs/ARCHITECTURE.md`
- `docs/DOMAIN_MODEL.md`
- `docs/RELIABILITY.md`
- `docs/THREAT_MODEL.md`
- `docs/TOKEN_COST_STRATEGY.md`

Roadmap and submilestones:

- `docs/milestones/SUBMILESTONE_REGISTRY.md`
- `docs/milestones/M00.md` through `docs/milestones/M21.md`
- `plans/ROADMAP.md`

Current status:

- `docs/status/CURRENT_STATE.md`
- `docs/status/WEEKLY_LOG.md`
- `docs/status/NEXT_RECOMMENDED_THREAD.md`
- `docs/status/TECH_DEBT.md`
- `docs/status/RISK_REGISTER.md`
- `docs/status/OPEN_QUESTIONS.md`

Active execution:

- `plans/active/CLP-0001-m00-repo-operating-system.md`

## Conflict rule

- Active docs define intended direction.
- Current code defines implemented behavior.
- The active plan decides how to close gaps between intended direction and implemented behavior.
- `docs/milestones/SUBMILESTONE_REGISTRY.md` is the canonical detailed submilestone registry.

## Update rule

Every meaningful slice must update the active plan and relevant status docs in the same slice. If direction, workflow, milestone sequence, safety boundary, or implementation behavior changes, update the active docs in the same slice.

Update `README.md` when entry-point claims, repo map, safety summary, or major links change.

Update `docs/INDEX.md` when documentation structure, canonical links, or read order changes.

Update `docs/status/CURRENT_STATE.md` whenever current phase, active submilestone, active plan, product code status, next action, or latest validation changes.

Update `docs/milestones/SUBMILESTONE_REGISTRY.md` whenever any submilestone status, branch, PR, active plan, or completion note changes.

## Archive rule

Stale docs must be moved to archived locations or clearly marked reference-only. If a stale doc cannot be updated in the current slice, record the limitation in status docs or tech debt and do not let it override active docs.
