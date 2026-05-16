# MoneyFlowBench Spec

Placeholder for the future MoneyFlowBench benchmark specification.

## Ablation support

Future MoneyFlowBench work should run scenario variants under named ablation configurations, such as `full_system`, `deterministic_only`, `no_causal_graph`, `no_replay`, `no_critic_agent`, and offline negative controls.

Ablations are offline benchmark experiments, not production toggles. Dangerous variants that disable safety components must never be enabled in production. This document does not implement a runner, scenario variants, toggles, benchmark code, or product behavior.
