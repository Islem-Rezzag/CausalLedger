# Domain Documentation

`docs/domain/` contains CausalLedger domain vocabulary, scope definitions, and boundary notes.

These documents define language for future implementation work. They do not implement runtime behavior, schemas, APIs, databases, ledgers, invariants, incident workflows, causal graph traversal, replay, agent tools, repair application, UI behavior, connectors, or CI workflows.

Domain documents may describe future concepts, expected evidence, and correctness questions. They are not financial truth, they do not replace deterministic checks, and they do not authorize LLM agents to mutate money, approve repairs, delete evidence, post ledger entries, modify raw events, or override invariants.

Current domain documents:

- [Payment lifecycle](payment-lifecycle.md) - M01.01 payment lifecycle vocabulary and boundaries.
- [Ledger vocabulary](ledger-vocabulary.md) - M01.02 ledger vocabulary, double-entry language, account categories, and boundaries.
- [Settlement vocabulary](settlement-vocabulary.md) - M01.03 settlement vocabulary, statuses, paths, evidence examples, and boundaries.
- [Reconciliation vocabulary](reconciliation-vocabulary.md) - M01.04 reconciliation vocabulary, sources, targets, statuses, paths, evidence examples, and boundaries.
- [Incident vocabulary](incident-vocabulary.md) - M01.05 incident vocabulary, actors, statuses, severity, types, paths, evidence examples, questions, failure patterns, and boundaries.
- [Repair vocabulary](repair-vocabulary.md) - M01.06 safe and unsafe repair vocabulary, proposal boundaries, evidence requirements, validation expectations, and forbidden autonomous actions.
- [Evidence receipt model](evidence-receipt-model.md) - M01.07 evidence receipt vocabulary, provenance, timestamps, redaction, uncertainty, conflicts, gaps, append-only handling, and immutable raw evidence boundaries.
- [Human review states](human-review-states.md) - M01.08 human review vocabulary, review actors, statuses, decision boundaries, repair-review states, AI boundaries, evidence expectations, and audit constraints.
- [Out-of-scope domains](out-of-scope-domains.md) - M01.09 explicit non-goals, adjacent-but-not-core domains, forbidden product claims, LLM forbidden actions, future-extension rules, and positioning boundaries.
