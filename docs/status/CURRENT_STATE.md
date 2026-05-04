# Current State

## Current phase

Control-plane bootstrap.

## What exists

- Root repo guidance files.
- Planning system and roadmap skeleton.
- Status tracking files.
- Milestone skeleton files.
- Prompt templates.
- Local CausalLedger skill files.
- Control-plane validation script and test.
- Placeholder directories and short README files.

## What does not exist

- Product functionality.
- MoneyEvent logic.
- Ledger logic.
- Invariant engine.
- Agent runtime.
- UI features.
- External connectors.
- Scenario benchmark implementation.

## Active plan

None yet.

## Product code status

No product code exists yet.

## Next action

Create the first active plan for M00 only.

## Implementation warning

Do not start M00 until the user explicitly asks.

## Validation limitations

- `make bootstrap-check` could not be run on 2026-05-04 because `make` is not available in the current Windows shell.
- Equivalent underlying checks were run directly with Python:
  - `python scripts/validate-control-plane.py`
  - `python -m pytest tests/test_control_plane_bootstrap.py`
