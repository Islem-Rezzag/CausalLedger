# Scenarios

`moneyflowbench/money-event-seeds.json` contains seven M03.05 early MoneyFlowBench seed cases tied exactly to the controlled MoneyEvent fixture corpus. `expectedEvidenceReferences` deliberately covers receipt IDs and source-record or missing-expected references without mislabelling all evidence as receipts.

The seeds define evidence, uncertainty, prohibited-claim, repeatability, and future cost-capture expectations only. A strict test-only parser rejects ungrounded references, malformed metadata, embedded outputs, scores, or results. No benchmark runner, scoring, model execution, result, incident behavior, replay claim, repair claim, or product-readiness claim exists.
