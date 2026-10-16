# M05.01 Simulator Package Foundation

Owner: packages/simulator. Contract version: m05.01-simulator-manifest.v1. Active plan: plans/active/CLP-0006-m05-provider-and-bank-simulator.md.

The implementation exports readonly source occurrence/raw-record, delivery/receipt-descriptor, manifest and discriminated validation-result types. The public validator receives unknown input and validates strict structural consistency and exact UTF-8 SHA256 integrity. It does not create provider events or evidence receipts. Read packages/simulator/README.md for the frozen field, identity, time, resource-limit and failure rules.

## Input and output

Input is a caller-supplied synthetic manifest containing literal version/synthetic metadata, scenario/generator labels, a supplied cutoff and complete source/delivery descriptions. Source eventTime explicitly permits null; no date-only source acquires an invented midnight. Payload text remains opaque and byte-preserved.

Output is either ok:true with a detached deeply frozen copy and empty issues, or ok:false with frozen ordered code/path issues and no value. Unknown fields are reported in lexical field order; required-field checks use fixed contract order, followed by source/delivery checks in supplied array order. No trimming, financial coercion, raw-text rewrite, array sorting, deduplication or cutoff projection occurs.

## Deterministic boundaries

Hash checks prove only correspondence between declared digest and supplied text. A caller can provide both; this does not authenticate a provider, establish an actual economic occurrence or verify receipt persistence. The synthetic label is mandatory. Source record, declared occurrence, delivery, receipt descriptor and later canonical event/posting identity remain distinct.

No generic money field is imposed on raw source evidence. Later feature generators must explicitly validate their own exact amounts/currency/identity context before claiming that behavior. Existing source-neutral MoneyEvent and financial ledger logic are neither imported nor modified.

Only deterministic node:crypto createHash and owned modules are permitted in runtime source. No filesystem/network/process/environment/host-clock/random access, financial-write API, external communications, credentials, database, connector, evidence-store, repair approval or agent tool is implemented.

## Validation and learning

The executable generic abc example validates with a fixed independent digest. Changed abd bytes with the old digest fail hash_mismatch/no partial value. The test command is:

    pnpm --filter @causalledger/simulator test -- test/contract.test.ts

The coordinator runs it. Package typecheck/test/lint/build/format, strict contract negative tests, independent hash/calendar/reference/immutability tests and import/host-API checks accompany full repository control/workspace QA. Unchanged mandatory PostgreSQL CI is regression evidence for existing ledger behavior; it does not prove an unimplemented provider/bank generator.

M05.02–M05.19 remain unstarted. Seed execution, event generators, delayed/missing scenario policy, CSV output, CLI, ingestion, canonical mapping, financial state and integrated V1/production behavior are not implemented by this slice.
