# MoneyFlowBench Spec

Placeholder for the future MoneyFlowBench benchmark specification.

## M03.05 seed-data boundary

`scenarios/moneyflowbench/money-event-seeds.json` contains seven deterministic seed cases for future design work. Each seed uses `expectedEvidenceReferences` because controlled grounding may be a receipt ID, source-record ID, or explicit missing-expected reference. The metadata is strictly checked against the referenced M03.05 fixtures for exact evidence, uncertainty, and deterministic-rejection issues.

These are seed cases only. `scoringImplemented` is false and `benchmarkResults` is empty. There is no runner, prompt execution, model or agent output, numeric score, leaderboard, benchmark result, or performance claim.

## Ablation support

Future MoneyFlowBench work should run scenario variants under named ablation configurations, such as `full_system`, `deterministic_only`, `no_causal_graph`, `no_replay`, `no_critic_agent`, and offline negative controls.

Ablations are offline benchmark experiments, not production toggles. Dangerous variants that disable safety components must never be enabled in production. This document does not implement a runner, scenario variants, toggles, benchmark code, or product behavior.
