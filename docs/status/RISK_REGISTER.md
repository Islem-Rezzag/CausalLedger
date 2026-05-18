# Risk Register

| Risk | Impact | Mitigation | Status |
| --- | --- | --- | --- |
| Safety boundary drift | Agents or docs imply financial mutation authority | Keep AGENTS.md and active docs explicit; require QA review | Open |
| Placeholder confusion | Readers mistake scaffolding for implemented product behavior | Mark current status and placeholders clearly | Open |
| Scope creep before approved implementation | Product code starts during planning or before scoped validation exists | Require active plan before complex work and keep planning threads docs-only | Open |
| Evidence semantics under-specified | Future incident behavior may lack audit rigor | M01.07 is completed and merged after PR #23 for documentation-only evidence receipt vocabulary, provenance, chain of custody, timestamp, redaction, uncertainty, conflict, gap, append-only, immutable raw evidence, derived evidence, audit-trail, and evidence-backed repair proposal boundaries; future evidence bundle specs and runtime controls remain required before implementation | Open |
| Ablation boundary confusion | Offline negative controls could be mistaken for production-safe toggles | Keep ablation docs explicit that dangerous variants are offline benchmark-only and production safety boundaries remain enforced | Open |
| Repair boundary confusion | Safe-to-propose repair vocabulary could be mistaken for autonomous approval or repair execution | Keep M01.06 explicit that LLM agents may draft repair proposals only; deterministic validation, replay where required, rollback planning, idempotency, and human approval remain required before any future application path; M01.06 QA and post-merge finalization verified this boundary remained documentation-only through PR #21 | Open |
| Tracking drift | Registry, active plan, roadmap, milestone docs, or status docs disagree about submilestone state | Use `docs/ops/planning-and-tracking-system.md` and update canonical tracking files in the same slice | Open |
| QA gate bypass | A submilestone PR merges before the required QA thread records PASS | Record protocol deviation, run a scoped post-merge QA recovery branch before the next submilestone, and confirm recovery merges before the next submilestone begins | Mitigated for M01.01 and M01.05 after recovery merges |
