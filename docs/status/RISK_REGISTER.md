# Risk Register

| Risk | Impact | Mitigation | Status |
| --- | --- | --- | --- |
| Safety boundary drift | Agents or docs imply financial mutation authority | Keep AGENTS.md and active docs explicit; require QA review | Open |
| Placeholder confusion | Readers mistake scaffolding for implemented product behavior | Mark current status and placeholders clearly | Open |
| Scope creep before approved implementation | Product code starts during planning or before scoped validation exists | Require active plan before complex work and keep planning threads docs-only | Open |
| Evidence semantics under-specified | Future incident behavior may lack audit rigor | Require evidence bundle specs before implementation | Open |
| Tracking drift | Registry, active plan, roadmap, milestone docs, or status docs disagree about submilestone state | Use `docs/ops/planning-and-tracking-system.md` and update canonical tracking files in the same slice | Open |
| QA gate bypass | A submilestone PR merges before the required QA thread records PASS | Record protocol deviation, run a scoped post-merge QA recovery branch before the next submilestone, and require the recovery PR to merge before M01.02 starts | Mitigated for M01.01 |
