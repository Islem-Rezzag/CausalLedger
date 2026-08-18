# CLP Project Completion Goal Proposal

## Proposal status

Proposed only. No active M04 plan exists, no future milestone has started, and `approvedReleaseTarget` remains `PENDING_HUMAN_APPROVAL`.

## Recommended target

Immediate portfolio target: `V0_6_BENCHMARK_DEMO`.

Long-term target: `V1_PUBLIC_PRODUCT`.

Publishable interim output: M03 technical-preview article after the Phase A closeout PR merges, explicitly labeled as a deterministic technical foundation.

## Alternative targets

| Target | Strength | Limitation | Appropriate choice when |
| --- | --- | --- | --- |
| `M03_TECHNICAL_PREVIEW` | Fast, technically rigorous foundation article | No end-to-end product or meaningful AI | Publication is needed before more implementation |
| `V0_3_FINANCIAL_TRUTH_CORE` | Deterministic ledger/simulator/invariant core | No incident reconstruction or AI | Correctness-first checkpoint is the only goal |
| `V0_4_INCIDENT_DIGITAL_TWIN` | Strong replayable incident story | Still no meaningful AI | Deterministic digital twin is enough |
| `V0_5_SAFE_AGENTIC_LAYER` | Meaningful bounded AI and human review | No benchmark-backed command surface | Time does not allow M14-M15 |
| `V0_6_BENCHMARK_DEMO` | End-to-end, measured, explainable portfolio demo | Largest immediate scope | Recommended balance of credibility and value |
| `V1_PUBLIC_PRODUCT` | Repository-defined serious public product | Requires v0.6 plus minimum operations/security/launch | Long-term completion target |

## Proposed vertical workstreams

### Workstream 1: Financial truth core, M04-M06

Entry criteria:

- Phase A PR merged and tree-equivalent to its reviewed head.
- Human approved target includes v0.3.0 or later.
- M03 plan is completed and no active implementation PR exists.
- Local Docker/Compose is available for full storage/migration validation, or a human accepts a temporary remote-only infrastructure limitation with an explicit local remediation gate before workstream exit.

Exit criteria:

- deterministic double-entry ledger primitives, immutable storage, queries, idempotency, reversals, and required accounts;
- seeded provider/bank simulator and source evidence;
- defined deterministic invariants, runner/API/CLI, and edge-case tests;
- M04-M06 acceptance criteria, independent QA, exact-head CI, human merges, clean-clone validation, and release evidence all pass.

Deterministic verifiers: balanced/invalid/reversal/property tests, migration tests, idempotency and ordering tests, simulator seed golden files, invariant fixture expectations, no-float money checks, control-plane validation, clean-clone QA, and remote infra smoke.

### Workstream 2: Incident digital twin, M07-M09

Entry criteria: Workstream 1 merged and finalized with no open implementation PR.

Exit criteria: deterministic incident lifecycle from invariant failures, evidence-linked causal graph with supported relations only, versioned replay snapshots/artifacts, reproducible event replay, before/after balance and invariant comparisons, APIs/CLI, QA, CI, and one integrated synthetic lifecycle.

Deterministic verifiers: state-machine, deduplication, affected-value, edge-semantic, unsupported-relation, traversal, serialization, replay-digest, ordering, missing/delayed/duplicate event, snapshot version, and end-to-end lifecycle tests.

### Workstream 3: Safe agentic layer, M10-M13

Entry criteria: Workstream 2 merged; deterministic evidence packs and replay artifacts exist; no live-model use is required for default tests.

Exit criteria: schema-validated read-only/proposal-only tools, explicit forbidden-tool absence, evidence-grounded advisory investigation, critic and memo outputs, hallucination/refusal checks, repair proposals with deterministic validators/rollback/idempotency/evidence, human-only review, sandbox-only approved application if scoped, audit evidence, QA, and CI.

Deterministic verifiers: tool allowlist and denial tests, write API exclusion, read-only query tests, fixture/recorded model outputs, required evidence IDs, unsupported-claim refusal, prompt injection, unsafe repair rejection, balanced proposal validation, reviewer authority, audit-log, and financial-truth refusal tests.

Live-model policy: default tests use mocks or recorded synthetic responses. Any live comparison requires explicit human approval naming provider, model, expected calls, and maximum budget; it records cost and latency and exposes no money mutation tool.

### Workstream 4: Benchmark and command surface, M14-M15

Entry criteria: Workstream 3 merged; benchmark goldens and UI contracts are defined; browser tooling is explicitly scoped.

Exit criteria: versioned scenarios, deterministic scoring, named ablation variants, token/cost/latency capture, safe negative-control isolation, real report tables, usable command center, accessibility/workflow tests, one-command demo, real screenshots, QA, CI, and clean-clone demo.

Deterministic verifiers: scenario schema and malformed-input tests, scorer goldens, repeatability, metric denominator checks, evidence precision, hallucination and unsafe-repair scoring, offline-only ablation enforcement, UI unit/integration/accessibility tests, browser end-to-end flow, screenshot provenance, and demo reset/idempotency tests.

### Workstream 5: Minimum v1 operations, security, and launch

Entry criteria: Workstream 4 merged and the human confirms continuing from v0.6.0 to `V1_PUBLIC_PRODUCT`.

Exit criteria:

- repository-defined minimum M17 cost and latency tracking;
- repository-defined minimum M18 proof that LLMs cannot mutate money;
- repository-defined minimum M20 public README, demo, diagram, benchmark table, launch docs, blog/interview assets, and QA;
- one complete simulated payment lifecycle and one public ablation table;
- clean-clone demo, exact-head CI, independent QA, human release-PR merge, and separate human tag authorization.

Selected minimum slices must be named in an approved active plan. They must not mark all of M17, M18, or M20 complete unless every milestone criterion actually passes.

## Dependencies

- M04 ledger semantics depend on M03 MoneyEvent money, identity, provenance, time, and idempotency boundaries.
- M05 source evidence enables M06 invariants and all later integrated scenarios.
- M06 failures feed M07 incidents.
- M07 incidents and M08 graph context feed M09 replay and M11 investigation.
- M10 contracts must precede M11 agents and M12 repair simulation.
- M12 proposals must precede M13 human review.
- M14 scoring depends on deterministic truth, incidents, graph, replay, tool contracts, agents, repair validators, and review boundaries.
- M15 must render real M07-M14 behavior rather than mocks presented as product behavior.
- Minimum M17/M18/M20 v1 work depends on the final v0.6 architecture and evidence.

## Independent QA strategy

Every functional branch uses an independent clean reviewer with review-only, no-merge authority. If a clean reviewer is unavailable, the Builder stops and writes the exact QA prompt for a fresh Codex thread. Documentation-only lifecycle corrections may use control-plane validation plus remote CI when repository protocol permits. Builder self-review never counts as independent QA.

## Human gates

- approve the release target;
- merge each QA-passed PR;
- approve live-model provider, model, call count, and budget;
- approve public claims and artifacts;
- authorize release tags.

No Codex thread merges `main`, enables auto-merge, force-pushes, rebases shared branches, or amends a reviewed commit.

## Environment prerequisites

- Current Node 22, pnpm 10.32.1, Python, Git, and deterministic QA baseline are ready.
- Docker/Compose must be installed by the human before local database/storage work can fully pass.
- Future UI work must add deliberate browser/accessibility tooling in scope.
- Live models are optional for implementation and deterministic tests; real model evidence needs a key and budget approval.
- Memory headroom must be checked before running Docker plus all app services.

## Estimated implementation complexity

| Workstream | Relative complexity | Main risk |
| --- | --- | --- |
| 1. Financial truth core | High | Ledger/invariant semantics and migration correctness |
| 2. Incident digital twin | High | Supported causal semantics and replay reproducibility |
| 3. Safe agentic layer | Very high | Evidence grounding, tool denial, repair/human authority |
| 4. Benchmark and command surface | Very high | Valid scoring, ablation isolation, real end-to-end UI |
| 5. Minimum v1 operations/launch | High | Security proof, measured public evidence, claim discipline |

No calendar estimate is asserted before the first approved workstream is decomposed against the user's available time and environment.

## Demo requirements

- one synthetic payment lifecycle that evolves from normal to suspicious and then confirmed, dismissed, resolved, or unresolved;
- deterministic evidence IDs, ledger/invariant outputs, incident, graph, replay, advisory agent memo, safe proposal, and human review boundary;
- a one-command reset and demo path;
- no live-money or production-provider activity;
- a deterministic/mock default and optional separately approved live-model comparison;
- actual screenshots and a short recording from the working system.

## Release requirements

- semantic version and release notes match `docs/VERSIONING.md` and `docs/releases/RELEASE_LADDER.md`;
- current state, capability matrix, known limitations, changelog, and public docs are synchronized;
- local and clean-clone validation pass;
- exact-head CI and independent QA pass;
- benchmark and ablation values are actual recorded results;
- public claims distinguish architecture vision, implemented behavior, synthetic demonstration, and production readiness;
- a human authorizes the tag.

## Risks

- grouping milestones could hide unfinished registry rows;
- UI pressure could bypass deterministic foundations;
- benchmark design could reward narrative confidence instead of evidence;
- live-model evidence could become non-reproducible or costly;
- repair simulation could be confused with approval or application;
- M13 sandbox behavior could be misrepresented as production repair;
- launch language could overstate security or readiness.

Mitigation: retain milestone IDs, small branches, one PR per branch, deterministic verifiers, independent QA, human merge gates, durable goal state, exact public evidence, and no-overclaim review.

## Stop conditions

Stop the active loop when any of the following occurs:

- three automated repair iterations have run without a verifier pass;
- branch or worktree guard fails;
- required deterministic validation fails outside safe scoped repair;
- independent QA is unavailable after Builder completion;
- remote CI fails or is not exact-head;
- the current PR awaits human merge;
- target, live-model, budget, security, or release authority is missing;
- a later workstream would start before the previous PR merges;
- evidence, benchmark, cost, latency, or screenshot data is missing;
- a requested action would mutate money, raw evidence, ledger state, deterministic invariant output, repair approval, or external communication without deterministic control and human approval.

## No-overclaim rules

- M03 is a publishable technical foundation, not the finished product.
- v0.3.0 is a financial truth core, not an incident product or AI demo.
- v0.4.0 is an incident digital twin, not an agentic layer.
- v0.5.0 is a safe agentic layer, not benchmark-backed demo completeness.
- v0.6.0 is a portfolio demo, not automatically production-ready.
- v1.0.0 is the first serious public product, not automatically production-ready or company-grade.
- Production-ready and company-grade claims require separate evidence not currently present.
