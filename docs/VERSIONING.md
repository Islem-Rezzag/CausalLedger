# Versioning

## Strategy

CausalLedger uses semantic versioning for tagged repository releases:

- MAJOR versions indicate public product readiness or incompatible product-level shifts.
- MINOR versions indicate meaningful milestone groups, demo capability, or foundation releases.
- PATCH versions indicate documentation corrections, validation fixes, or scoped release repairs that do not change the release promise.

Version numbers describe the repository state at a tag. They do not imply product capability unless the release notes explicitly say product behavior exists and validation supports that claim.

## v0.1.0 Foundation

`v0.1.0` is the M00 Repo Operating System foundation release. It means the repo control plane exists: active docs, roadmap, submilestone registry, milestone docs, status files, prompt templates, local skills, GitHub templates, validation scaffolding, and handoff discipline.

`v0.1.0` is not a product release. It contains no MoneyEvent runtime, ledger runtime, invariant runtime, incident runtime, causal graph runtime, replay runtime, agent runtime, repair planner, UI, API, database, connector, or CI workflow.

## What Counts As A Release

A release is a tagged repository state with:

- a clear version number;
- release notes or changelog entry;
- validation evidence appropriate to the release promise;
- current-state docs that do not overclaim functionality;
- a human decision to tag the release.

## What Does Not Count As A Product Release

The following are not product releases by themselves:

- control-plane docs;
- placeholder directories;
- milestone plans;
- prompt templates;
- status files;
- specs that describe future behavior;
- validation that only checks documentation and scaffolding.

## Tags

Tags should be annotated or otherwise accompanied by release notes. The tag name should match the semantic version, for example `v0.2.0`.

Before creating a release tag:

- verify the intended milestone or release scope is complete;
- run the validation commands recorded for that scope;
- update `CHANGELOG.md`;
- confirm current-state docs do not claim unfinished product behavior.

Only a human operator or a Codex thread explicitly authorized by a human may create and push release tags. Codex must not create or push tags implicitly.

## Release Notes

Release notes should state:

- what changed;
- what validation ran;
- what is intentionally not implemented;
- any skipped validation and why;
- whether the release is a foundation, preview, demo, or public product release.

For early versions, release notes must be explicit about the absence of product functionality.

## Milestones And Versions

Milestones organize work. Versions communicate a tagged repository state. They are related but not identical.

A version may include one milestone, several milestones, or a curated subset of later milestone work when the release promise is narrower than the full roadmap. A milestone being planned or completed does not automatically create a release tag.

## Why v1.0.0 Is Not All M01-M21

`v1.0.0` is the first serious public product release, not the completion of every roadmap milestone. Requiring all M01-M21 work for `v1.0.0` would delay a public product release until enterprise, observability, connector, security, polish, and company-version work are all complete.

The practical `v1.0.0` target is defined in `docs/releases/V1_SCOPE.md`. It focuses on a coherent public product: domain foundation, financial truth core, incident digital twin core, safe agentic layer, benchmark/demo capability, minimum cost/latency tracking, proof that LLMs cannot mutate money, and launch-quality docs.

## Avoiding Overclaims

Every release must distinguish planned, documented, scaffolded, and implemented behavior. Do not claim product readiness from placeholder files, specs, plans, or control-plane validation.

When uncertain, write release notes conservatively: state what exists, what validation ran, and what remains not implemented.
