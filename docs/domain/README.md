# Domain Documentation

`docs/domain/` contains CausalLedger domain vocabulary, scope definitions, and boundary notes.

These documents define language for future implementation work. They do not implement runtime behavior, schemas, APIs, databases, ledgers, invariants, incident workflows, causal graph traversal, replay, agent tools, repair application, UI behavior, connectors, or CI workflows.

Domain documents may describe future concepts, expected evidence, and correctness questions. They are not financial truth, they do not replace deterministic checks, and they do not authorize LLM agents to mutate money, approve repairs, delete evidence, post ledger entries, modify raw events, or override invariants.

Current domain documents:

- [Payment lifecycle](payment-lifecycle.md) - M01.01 payment lifecycle vocabulary and boundaries.
- [Ledger vocabulary](ledger-vocabulary.md) - M01.02 ledger vocabulary, double-entry language, account categories, and boundaries.
- [Settlement vocabulary](settlement-vocabulary.md) - M01.03 settlement vocabulary, statuses, paths, evidence examples, and boundaries.
- [Reconciliation vocabulary](reconciliation-vocabulary.md) - M01.04 reconciliation vocabulary, sources, targets, statuses, paths, evidence examples, and boundaries.
