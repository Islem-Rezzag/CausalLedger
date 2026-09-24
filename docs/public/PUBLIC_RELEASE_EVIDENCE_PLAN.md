# Public Release Evidence Plan

## Purpose

Define the evidence that must exist before CausalLedger makes public portfolio, benchmark, safety, release, blog, LinkedIn, or interview claims. This plan does not fabricate or pre-approve results.

## Evidence package by maturity

### M03 technical foundation

Required:

- M03 closeout packet and merged-PR references;
- exact MoneyEvent implementation and non-implementation boundary;
- focused deterministic test command and actual counts;
- example controlled fixture inputs and normalized/refused outputs;
- diagram showing raw evidence references into canonical MoneyEvent validation;
- CI evidence;
- known limitations and explicit statement that no agent, ledger, invariant, incident, replay, UI, benchmark score, or production system exists.

Allowed claim: publishable deterministic MoneyEvent technical foundation.

Prohibited claim: completed CausalLedger product, agentic incident demo, production-ready, enterprise-ready, or financially authoritative AI.

### v0.6.0 portfolio demo

Required:

- one complete simulated lifecycle with stable scenario ID and seed;
- real command-center screenshots generated from the working system;
- short demo recording and shot list;
- deterministic invariant, incident, graph, replay, agent memo, repair-proposal, and human-review evidence for the same scenario;
- benchmark table with scenario count, metric definitions, denominators, versions, seed, run timestamp, and actual results;
- ablation table with named variants and offline-negative-control labeling;
- cost and latency data for any live-model runs, plus mock/default distinction;
- tool-denial and financial-truth refusal evidence;
- clean-clone command/result, exact-head CI, independent QA, and known limitations.

Allowed claim: benchmark-backed synthetic portfolio demo with bounded advisory AI.

Prohibited claim: real customer use, production money processing, autonomous repair, production readiness, enterprise readiness, or human-level financial authority.

### v1.0.0 serious public product

Required:

- all v0.6.0 evidence;
- minimum M17 cost/latency report;
- minimum M18 proof that the LLM cannot mutate money;
- public README, setup guide, architecture walkthrough, safety case, demo script, reproducibility guide, benchmark/ablation reports, limitations, FAQ, release checklist, and release notes;
- human-approved final claims and tag.

Allowed claim: first serious public product release within the documented synthetic/sandbox scope.

Prohibited claim unless separately proven: production-ready, company-grade, compliant, secure against all threats, or used by fintech companies.

## Required screenshots

Capture from the real working release target only:

1. Scenario selector and selected versioned scenario.
2. Incident command center with status and deterministic severity.
3. Incident detail with evidence IDs and uncertainty.
4. Transaction timeline showing late/conflicting evidence.
5. Causal graph with supported edge types and provenance.
6. Invariant failure panel with deterministic result.
7. Replay before/after comparison and reproducibility identifier.
8. Agent notebook with evidence-linked advisory memo and uncertainty.
9. Repair proposal with validator, rollback, idempotency, and non-approval state.
10. Human review boundary and audit record.
11. Benchmark and ablation report views.
12. Passing local/CI validation summary with no secret values.

Do not create screenshots from mockups and present them as runtime output. Each screenshot must record commit, scenario ID, and capture date.

## Required demo recording

The final recording should show:

- clean setup or documented prepared state;
- one reset/replay command;
- normal evidence arrival;
- a suspicious deterministic signal;
- later settlement or bank evidence changing certainty;
- incident, graph, and replay inspection;
- an evidence-grounded advisory agent result;
- an unsafe action or unsupported claim being refused;
- a proposal remaining unapproved until human review;
- benchmark/ablation evidence and limitations.

No live-money account, production provider, personal data, secret, or fabricated metric may appear.

## Required architecture diagrams

- system context and non-goals;
- evidence-to-MoneyEvent-to-ledger/invariant data flow;
- incident/graph/replay digital twin flow;
- agent tool boundary showing read-only and proposal-only contracts;
- repair/human approval boundary;
- benchmark and ablation pipeline;
- deployment/runtime diagram only if actually implemented.

Diagrams must visually distinguish implemented, planned, and optional components.

## Required benchmark table

Each table must include:

- repository commit and benchmark/schema versions;
- scenario set and count;
- model/provider or deterministic-only variant;
- root-cause metric definition;
- evidence precision and recall definitions;
- unsafe repair and hallucination definitions;
- escalation metric;
- latency and token/cost units;
- seed/repetition policy;
- actual values, denominators, warnings, and failed/skipped runs.

No benchmark value may be written before the runner produces a versioned artifact.

## Required ablation table

At minimum compare `full_system` with one safe or offline negative-control variant on the same scenarios. Record graph/replay/critic/evidence-ID/repair-validator/model-routing configuration as applicable. Dangerous variants must be isolated to offline fixtures and impossible to enable in production paths.

No causal conclusion may be claimed beyond what the controlled comparison supports.

## Required CI and reproducibility evidence

- local pinned tool versions;
- frozen lockfile install;
- deterministic unit, integration, scenario, security, and UI checks applicable to the release;
- clean-clone setup and demo;
- Docker/migration checks when storage exists;
- exact-head GitHub Actions run IDs and job conclusions;
- independent QA record;
- human merge reference;
- no-secret scan results;
- release tag only after separate human authorization.

## Required cost and latency evidence

For deterministic-only and mock runs, state that provider spend is zero and do not present synthetic latency as live-provider latency. For live runs, record provider, model, call count, input/output tokens, per-run and aggregate cost, latency definition, cache state, context size, failures, and budget cap. Never print API keys or sensitive prompts.

## Required safety proof

- no money-mutation tool exists in the agent contract;
- ledger posting, raw-event modification, evidence deletion, invariant override, repair approval, and external communication are denied;
- read-only query enforcement;
- structured tool schemas and audit records;
- prompt-injection and poisoned-evidence tests;
- unsupported claim and missing-evidence escalation;
- repair rollback/idempotency/evidence validators;
- human reviewer identity and decision boundary;
- unsafe ablations confined to offline tests.

## Required setup instructions

- supported OS/tool versions;
- pinned Node/pnpm and Python baseline;
- Docker/Compose requirement when applicable;
- environment-variable presence instructions without values;
- deterministic/mock default path requiring no paid model;
- optional live-model path with explicit cost warning;
- one-command reset/demo;
- troubleshooting and cleanup;
- known resource requirements.

## Required known limitations

State at release time:

- synthetic or sandbox data boundary;
- supported scenario/provider/import formats;
- absence of production-money authority;
- absence or limits of auth/authz, multi-tenancy, retention, backups, load, connectors, deployment, or compliance evidence;
- model variability and live-cost limits;
- benchmark generalization limits;
- repair proposal versus approval/application boundary;
- any skipped validation or environment limitation.

## Blog claim checklist

The blog must explain the fintech incident problem, canonical MoneyEvent, deterministic financial-truth owner, graph/replay contribution if implemented, exact agent inputs and permissions, bounded verification loops, what was built/tested, failures and corrections, actual ablations, and what remains unimplemented. It must label architecture vision, implemented behavior, synthetic demonstration, and production readiness separately.

## LinkedIn claim checklist

The post must be concise and factual: problem, implemented solution, deterministic/AI boundary, one or two measured results, stack, repository/demo link, lessons, and honest limitations. Do not draft the final post until measurements and links exist.

## Prohibited public claims

Unless separately supported by real evidence, do not claim:

- production-grade or production-ready;
- enterprise-ready or company-grade;
- used by fintech companies or customers;
- prevents all financial loss or hallucination;
- autonomous financial repair;
- accounting, legal, compliance, fraud, AML/KYC, banking, payment-processing, or investment authority;
- real-money validation from synthetic scenarios;
- benchmark leadership without comparable public baselines;
- costs, latency, screenshots, user outcomes, or security properties that were not measured.

## Publication gate

Public release evidence is ready only when every required artifact is generated from the actual approved target, all applicable validation and independent QA pass, exact-head CI is green, claims are audited against the implementation boundary, the release PR is human-merged, and a human explicitly authorizes publication/tagging.
