# Ablation Matrix

## Purpose

This matrix names planned ablation groups and variants for future MoneyFlowBench work. It is documentation and roadmap planning only. It does not implement runners, toggles, benchmark code, product behavior, or production configuration.

Dangerous ablations are marked as offline negative controls only. They must never be enabled in production.

## Deterministic-first ablations

| Ablation name | Component disabled or changed | Benchmark-only or production-safe | Metrics affected | Expected learning | Related future milestone |
| --- | --- | --- | --- | --- | --- |
| `full_system` | No component disabled; future deterministic checks, evidence grounding, graph/replay support, agent critique, repair validators, and human review boundaries remain enabled. | Production-safe target configuration, once implemented | All benchmark metrics | Baseline for the intended safe system. | M06, M07, M08, M09, M11, M12, M14 |
| `deterministic_only` | LLM investigation disabled; deterministic checks and evidence outputs remain. | Benchmark-only comparison; production may use deterministic-only mode if future scope supports it | Root-cause accuracy, evidence precision, evidence recall, latency, token cost | Measures how far deterministic evidence alone can go without narrative assistance. | M06, M07, M09, M14 |
| `llm_only_negative_control` | Deterministic invariants, evidence enforcement, graph, replay, and repair validators are removed from the investigation path. | Offline negative control only | Hallucination rate, unsafe repair rate, evidence precision, root-cause accuracy | Demonstrates why LLM output cannot be financial truth. | M11, M14, M18 |
| `no_invariant_engine` | Future deterministic invariant support removed from incident detection or scoring context. | Offline negative control only | Root-cause accuracy, escalation quality, unsafe repair rate | Measures how much incident quality depends on deterministic failed checks. | M06, M07, M14 |
| `no_causal_graph` | Future causal graph evidence and traversal removed. | Benchmark-only | Root-cause accuracy, evidence recall, latency, token cost | Measures graph contribution to trace completeness and first-divergence identification. | M08, M11, M14 |
| `no_replay` | Future replay output and replay verification removed. | Benchmark-only | Root-cause accuracy, escalation quality, unsafe repair rate, latency | Measures replay contribution to confirmation, reopening, and repair safety. | M09, M12, M14 |

## Agentic AI ablations

| Ablation name | Component disabled or changed | Benchmark-only or production-safe | Metrics affected | Expected learning | Related future milestone |
| --- | --- | --- | --- | --- | --- |
| `no_critic_agent` | Future critic review disabled. | Benchmark-only | Hallucination rate, evidence precision, escalation quality | Measures how much critic review reduces unsupported claims and weak escalation. | M11, M14 |
| `no_evidence_id_requirement` | Evidence ID citation requirement removed from agent answers. | Offline negative control only | Evidence precision, evidence recall, hallucination rate | Demonstrates why evidence-linked output is required. | M10, M11, M14, M18 |
| `small_model_vs_strong_model` | Model choice changed between smaller and stronger models under the same evidence pack. | Benchmark-only | Root-cause accuracy, hallucination rate, latency, token cost | Measures model quality, cost, and latency tradeoffs. | M11, M17, M14 |
| `no_model_router` | Future model routing disabled; one fixed model is used. | Benchmark-only | Latency, token cost, root-cause accuracy | Measures whether routing improves cost and quality under varied scenario difficulty. | M17, M14 |
| `forbidden_tool_access_attempt` | Scenario includes an attempted use of forbidden mutation, evidence deletion, ledger posting, or repair approval tools. | Offline negative control only | Escalation quality, hallucination rate, unsafe repair rate | Verifies agent tool boundaries and refusal behavior. | M10, M18, M14 |

## Repair-safety ablations

| Ablation name | Component disabled or changed | Benchmark-only or production-safe | Metrics affected | Expected learning | Related future milestone |
| --- | --- | --- | --- | --- | --- |
| `no_repair_validator_negative_control` | Future deterministic repair validator removed. | Offline negative control only | Unsafe repair rate, escalation quality | Shows the value of deterministic repair validation. | M12, M14, M18 |
| `no_rollback_requirement_negative_control` | Future rollback requirement removed from repair proposal evaluation. | Offline negative control only | Unsafe repair rate, escalation quality | Shows how missing rollback planning increases repair risk. | M12, M14 |
| `no_idempotency_requirement_negative_control` | Future idempotency requirement removed from repair proposal evaluation. | Offline negative control only | Unsafe repair rate, evidence precision | Shows how duplicate repair risk appears when idempotency is ignored. | M12, M14 |
| `no_human_review_negative_control` | Future human review boundary removed from repair approval path. | Offline negative control only | Unsafe repair rate, escalation quality, hallucination rate | Demonstrates why agents cannot approve repairs or mutate money. | M12, M13, M14, M18 |

## Evidence-quality ablations

| Ablation name | Component disabled or changed | Benchmark-only or production-safe | Metrics affected | Expected learning | Related future milestone |
| --- | --- | --- | --- | --- | --- |
| `no_evidence_cache` | Future evidence cache disabled; evidence is retrieved or assembled fresh. | Benchmark-only | Latency, token cost, evidence recall | Measures cache contribution to cost and repeatability. | M11, M17, M14 |
| `missing_evidence` | Scenario removes required provider, bank, ledger, settlement, replay, or evidence bundle context. | Benchmark-only | Escalation quality, evidence recall, hallucination rate | Measures whether the system escalates uncertainty instead of inventing facts. | M07, M11, M14 |
| `poisoned_evidence` | Scenario includes hostile or misleading text inside evidence or support notes. | Offline negative control only | Hallucination rate, evidence precision, escalation quality | Measures prompt-injection and evidence-poisoning resistance. | M14, M18 |

## Cost and latency ablations

| Ablation name | Component disabled or changed | Benchmark-only or production-safe | Metrics affected | Expected learning | Related future milestone |
| --- | --- | --- | --- | --- | --- |
| `small_model_vs_strong_model` | Compare small-model and strong-model investigation over the same evidence pack. | Benchmark-only | Token cost, latency, root-cause accuracy, hallucination rate | Identifies when stronger models earn their cost. | M17, M14 |
| `no_model_router` | Disable future model routing. | Benchmark-only | Token cost, latency, root-cause accuracy | Measures whether routing prevents overuse of expensive models. | M17, M14 |
| `no_evidence_cache` | Disable future cached evidence packs or summaries. | Benchmark-only | Token cost, latency, evidence recall | Measures cache impact on bounded context and repeatability. | M17, M14 |
| `full_system` | Run intended configuration with routing, cache, scoped context, and safety controls once implemented. | Production-safe target configuration, once implemented | Token cost, latency, all quality metrics | Baseline for cost-quality comparison. | M17, M14 |

## Security ablations

| Ablation name | Component disabled or changed | Benchmark-only or production-safe | Metrics affected | Expected learning | Related future milestone |
| --- | --- | --- | --- | --- | --- |
| `prompt_injection_attack` | Scenario includes malicious instructions in provider payloads, support notes, imported files, or evidence text. | Offline negative control only | Hallucination rate, escalation quality, forbidden action rate | Verifies untrusted evidence cannot override tool and safety boundaries. | M18, M14 |
| `poisoned_evidence` | Scenario includes contradictory, tampered, or misleading evidence. | Offline negative control only | Evidence precision, evidence recall, hallucination rate | Measures whether evidence conflicts are preserved and escalated. | M18, M14 |
| `forbidden_tool_access_attempt` | Scenario attempts evidence deletion, ledger posting, money mutation, repair approval, raw event modification, or invariant override. | Offline negative control only | Unsafe repair rate, escalation quality, forbidden action rate | Demonstrates that forbidden actions remain blocked. | M10, M18, M14 |
| `no_human_review_negative_control` | Human review boundary removed from repair approval in the benchmark variant. | Offline negative control only | Unsafe repair rate, escalation quality | Shows why human review must remain enforced in production. | M13, M18, M14 |

## Scenario-complexity ablations

| Ablation name | Component disabled or changed | Benchmark-only or production-safe | Metrics affected | Expected learning | Related future milestone |
| --- | --- | --- | --- | --- | --- |
| `full_system` | Run a scenario at intended complexity with all future safety and evidence components enabled. | Production-safe target configuration, once implemented | All benchmark metrics | Baseline for complex scenario performance. | M14 |
| `missing_evidence` | Remove one or more required evidence sources from a scenario. | Benchmark-only | Evidence recall, escalation quality, hallucination rate | Measures uncertainty handling as complexity rises. | M14 |
| `poisoned_evidence` | Add contradictory or hostile evidence to a scenario. | Offline negative control only | Evidence precision, hallucination rate, escalation quality | Measures resilience to misleading context. | M14, M18 |
| `deterministic_only` | Remove agentic investigation from complex scenarios while retaining deterministic outputs. | Benchmark-only | Root-cause accuracy, latency, token cost | Measures where narrative synthesis adds value over deterministic output alone. | M14 |
