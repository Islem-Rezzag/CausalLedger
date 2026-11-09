# Synthetic settlement and bank CSV reports

M05.14 `generateSettlementCsv(unknown)` and M05.15 `generateBankStatementCsv(unknown)` are pure explicit-input builders. They return a frozen report envelope with a generic manifest containing one file source record and one declared delivery, plus exact detached row snapshots. They do not write files, parse CSV, connect to a bank/provider, ingest receipts, reconcile declarations, calculate totals or post money.

## Requests and identity

Both roots require exactly: schemaVersion,synthetic,scenarioId,observationCutoff,sourceId,sourceOccurrenceId,sourceRecordId,eventTime,deliveryId,receiptDescriptorId,observedAt,deliveryOrder,fileId,rows and the two actor fields below. Synthetic is literal true. Roots/rows must be plain or null-prototype own enumerable data objects; arrays must be dense ordinary arrays without extra/hidden/symbol/accessor members. Root scalars and each row are snapshotted; getters are not invoked. Proxy code itself is not sandboxed; inspection exceptions become frozen refusals. Array length is bounded before descriptor enumeration and rechecked afterward.

Settlement request version: `m05.14-settlement-csv-request.v1`; output/generator/wire version: `m05.14-settlement-csv.v1`. Actor fields are providerId,merchantId. Each row has rowId,payoutId,currency,amountMinorUnits,settledAt,description. File ID prefix is sim_settlement_; row ID sim_settlementrow_. Provider/merchant/payout use existing simulator prefixes.

Bank request version: `m05.15-bank-statement-csv-request.v1`; output/generator/wire version: `m05.15-bank-statement-csv.v1`. Actor fields are bankId,accountId with prefixes sim_bank_ and sim_bankaccount_. The root fileId is the **statement identity**, prefix sim_statement_. Each row has lineId,payoutReference,currency,direction,amountMinorUnits,postedAt,description. Line ID uses sim_bankline_. Direction is exactly credit or debit. Payout reference is either empty (undeclared) or a structurally valid sim_payout_ ID. No referenced payout object or cross-file match is inferred.

All role suffixes use existing1–64ASCII token rules. There are1–64 rows per file, with unique row/line IDs. Repeated payout references are allowed; amounts, currencies and references in independent files can disagree. Source type is provider for settlement and bank for statements. File source IDs/occurrence/record/delivery IDs follow the unchanged generic contract.

## Money, text and time

`amountMinorUnits` is positive canonical base-10 integer text,1–128 digits. Zero, signs, leading zeros, numeric/BigInt inputs, fractions, exponents and whitespace are refused. The CSV header **amount_minor_units** makes the representation explicit. This implements exact decimal integer money; it does not infer major-unit scale or convert through floating point. Currency is exactly three uppercase ASCII letters, without catalogue validation, FX or cross-row summing. Bank direction stays separate from its positive amount.

Description length is0–256 UTF-16 code units. Empty text, Unicode, commas, double quotes, CR and LF are preserved exactly, without normalization. Reject code points0–31 except CR13/LF10,127–159, and unpaired surrogates. Valid surrogate pairs are preserved. Text such as `=1+1` remains literal raw fixture content: CSV escaping is not spreadsheet formula sanitization. No spreadsheet execution/export is performed.

File eventTime and each settledAt/postedAt must be known UTC using the generic calendar rules. Each row time must be <= file eventTime; whole seconds and .000 compare equally while preserving wire spelling. observedAt,observationCutoff,deliveryOrder and supplied row order are independent declarations. No host clock, sorting, filtering, timezone conversion, economic chronology correction or real-world settlement claim.

## Frozen wire format

UTF-8 without BOM; comma delimiter; CRLF records including final CRLF. Quote a cell only if it contains comma,double quote,CR or LF; double embedded double quotes. Empty description/reference is an empty cell. Preserve embedded CR/LF exactly. No delimiter,quote,header,encoding or dialect overrides are accepted. Malformed override tests exercise request validation, not a CSV parser.

Settlement header, in exact order:

```text
schema_version,synthetic,file_id,row_id,provider_id,merchant_id,payout_id,currency,amount_minor_units,settled_at,description
```

Bank header, in exact order:

```text
schema_version,synthetic,statement_id,line_id,bank_id,account_id,payout_reference,currency,direction,amount_minor_units,posted_at,description
```

Every data row repeats its wire version and literal true synthetic label, file/statement identity and relevant actor IDs. The final manifest SHA256 covers exact UTF-8 CSV, mediaType text/csv. The existing65536 payload-code-unit cap is applied after escaping; exceeding it refuses the entire result, even with otherwise valid64 rows. Success contains immutable rows and manifest; failure contains frozen code/path issues and no partial value. Generic metadata/payload issues retain manifest-relative paths. Reusing inputs is deterministic and consumes no IDs/balances.

## Demonstration and validation

The test demonstration generates a provider row of1250 GBP minor units and an independent bank line of1250 GBP, then a bank declaration of1249 USD and repeated/empty references. Each declaration is retained; no matched/settled verdict is returned. Literal golden CSV and SHA256 expectations were independently composed with Python csv.writer, including accented text, doubled quotes, embedded CRLF and empty trailing cells. Additional cases cover exact large amounts, escaping, time equality, limits, hostile descriptors and actual caller mutation.

```powershell
pnpm --filter @causalledger/simulator exec vitest run test/csv.test.ts -t demonstration
```

Expected one selected demonstration passes; other cases are intentionally filtered. Inputs are disposable in-memory values and need no cleanup. If pnpm is unavailable, report the error rather than changing expectations/installing tools. Root runs the full package and control suites plus independent review and required CI separately. Rollback is a human-reviewed revert. Seeds, CLI, scenarios/evaluation harness, ingestion and reconciliation remain later work; M05.16 onward is unstarted.
