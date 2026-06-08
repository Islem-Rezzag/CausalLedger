# ADR-0006: Local Development and CI Baseline

## Status

Planning placeholder.

## Context

M02 must define local development commands, local services, health checks, migrations, and a baseline validation path before future product packages depend on them.

## Decision to make

Choose the local development and CI baseline expectations for M02 without adding CI automation in the planning thread.

## Planning constraints

- Do not create `.github/workflows/` in this planning thread.
- Do not claim CI/CD exists before M02.19 implements and validates its scope.
- Keep validation commands explicit and reproducible.
- Keep future product directories as placeholders until their scoped M02 submilestones begin.

## Next step

Resolve this ADR across M02.14 through M02.20 as local services, migrations, health checks, and CI baseline scope become active.
