import { createHash } from "node:crypto";
import { SIMULATOR_MANIFEST_VERSION } from "./contract.js";
import type {
  SimulatorManifest,
  SimulatorValidationIssue,
} from "./contract.js";
import { validateSimulatorManifest } from "./validation.js";

export const SETTLEMENT_CSV_REQUEST_VERSION =
  "m05.14-settlement-csv-request.v1" as const;
export const SETTLEMENT_CSV_VERSION = "m05.14-settlement-csv.v1" as const;
export const BANK_STATEMENT_CSV_REQUEST_VERSION =
  "m05.15-bank-statement-csv-request.v1" as const;
export const BANK_STATEMENT_CSV_VERSION =
  "m05.15-bank-statement-csv.v1" as const;
export const BANK_STATEMENT_CSV_HEADER =
  "schema_version,synthetic,statement_id,line_id,bank_id,account_id,payout_reference,currency,direction,amount_minor_units,posted_at,description";
export const CSV_MAX_ROWS = 64;
export const SETTLEMENT_CSV_HEADER =
  "schema_version,synthetic,file_id,row_id,provider_id,merchant_id,payout_id,currency,amount_minor_units,settled_at,description";
type FileRequest = {
  readonly synthetic: true;
  readonly scenarioId: string;
  readonly observationCutoff: string;
  readonly sourceId: string;
  readonly sourceOccurrenceId: string;
  readonly sourceRecordId: string;
  readonly eventTime: string;
  readonly deliveryId: string;
  readonly receiptDescriptorId: string;
  readonly observedAt: string;
  readonly deliveryOrder: number;
  readonly fileId: string;
};
export type SettlementCsvRow = {
  readonly rowId: string;
  readonly payoutId: string;
  readonly currency: string;
  readonly amountMinorUnits: string;
  readonly settledAt: string;
  readonly description: string;
};
export type SettlementCsvRequest = FileRequest & {
  readonly schemaVersion: typeof SETTLEMENT_CSV_REQUEST_VERSION;
  readonly providerId: string;
  readonly merchantId: string;
  readonly rows: readonly SettlementCsvRow[];
};
export type BankStatementCsvRow = {
  readonly lineId: string;
  readonly payoutReference: string;
  readonly currency: string;
  readonly direction: "credit" | "debit";
  readonly amountMinorUnits: string;
  readonly postedAt: string;
  readonly description: string;
};
export type BankStatementCsvRequest = FileRequest & {
  readonly schemaVersion: typeof BANK_STATEMENT_CSV_REQUEST_VERSION;
  readonly bankId: string;
  readonly accountId: string;
  readonly rows: readonly BankStatementCsvRow[];
};
export type CsvReport<Row> = {
  readonly schemaVersion:
    | typeof SETTLEMENT_CSV_VERSION
    | typeof BANK_STATEMENT_CSV_VERSION;
  readonly synthetic: true;
  readonly fileId: string;
  readonly manifest: SimulatorManifest;
  readonly rows: readonly Row[];
};
export type CsvIssue = {
  readonly code:
    | SimulatorValidationIssue["code"]
    | "invalid_amount"
    | "invalid_currency";
  readonly path: string;
};
export type CsvResult<Row> =
  | { readonly ok: true; readonly value: CsvReport<Row> }
  | {
      readonly ok: false;
      readonly issues: readonly CsvIssue[];
      readonly value?: never;
    };
type Data = Record<string, unknown>;
const common = [
  "schemaVersion",
  "synthetic",
  "scenarioId",
  "observationCutoff",
  "sourceId",
  "sourceOccurrenceId",
  "sourceRecordId",
  "eventTime",
  "deliveryId",
  "receiptDescriptorId",
  "observedAt",
  "deliveryOrder",
  "fileId",
  "rows",
];
const settlementFields = [
  "rowId",
  "payoutId",
  "currency",
  "amountMinorUnits",
  "settledAt",
  "description",
];
function snapshot(input: unknown, fields: readonly string[]): Data | undefined {
  if (
    typeof input !== "object" ||
    input === null ||
    ![Object.prototype, null].includes(Object.getPrototypeOf(input))
  )
    return;
  const ds = Object.getOwnPropertyDescriptors(input);
  if (Reflect.ownKeys(ds).length !== fields.length) return;
  const out: Data = Object.create(null) as Data;
  for (const k of fields) {
    const d = ds[k];
    if (!d || !("value" in d) || !d.enumerable) return;
    out[k] = d.value;
  }
  return out;
}
function rowsSnapshot(
  input: unknown,
  fields: readonly string[],
): Data[] | undefined {
  if (!Array.isArray(input) || Object.getPrototypeOf(input) !== Array.prototype)
    return;
  const initialLength = Object.getOwnPropertyDescriptor(input, "length")
    ?.value as unknown;
  if (
    typeof initialLength !== "number" ||
    !Number.isSafeInteger(initialLength) ||
    initialLength < 1 ||
    initialLength > CSV_MAX_ROWS
  )
    return;
  const ds = Object.getOwnPropertyDescriptors(input) as unknown as Record<
    string,
    PropertyDescriptor
  >;
  const length = ds.length?.value as unknown;
  if (
    typeof length !== "number" ||
    length < 1 ||
    length > CSV_MAX_ROWS ||
    length !== initialLength ||
    Reflect.ownKeys(ds).length !== length + 1
  )
    return;
  const out: Data[] = [];
  for (let i = 0; i < length; i++) {
    const d = ds[String(i)];
    if (!d || !("value" in d) || !d.enumerable) return;
    const row = snapshot(d.value, fields);
    if (!row) return;
    out.push(row);
  }
  return out;
}
function failure(
  code: CsvIssue["code"],
  path: string,
): { readonly ok: false; readonly issues: readonly CsvIssue[] } {
  return Object.freeze({
    ok: false,
    issues: Object.freeze([Object.freeze({ code, path })]),
  });
}
function id(value: unknown, role: string) {
  return (
    typeof value === "string" &&
    new RegExp("^sim_" + role + "_[A-Za-z0-9][A-Za-z0-9_-]{0,63}$").exec(
      value,
    )?.[0] === value
  );
}
function knownTime(value: unknown) {
  return (
    typeof value === "string" &&
    validateSimulatorManifest({
      schemaVersion: SIMULATOR_MANIFEST_VERSION,
      synthetic: true,
      scenarioId: "sim_scenario_csv_clock",
      generatorVersion: "csv-clock.v1",
      observationCutoff: value,
      sourceRecords: [],
      deliveries: [],
    }).ok
  );
}
function instant(value: string) {
  return value.length === 20 ? value.slice(0, -1) + ".000Z" : value;
}
function quote(value: string) {
  return /[,"\r\n]/.test(value)
    ? '"' + value.replaceAll('"', '""') + '"'
    : value;
}
function descriptionValid(value: unknown) {
  if (typeof value !== "string" || value.length > 256) return false;
  for (const character of value) {
    const code = character.codePointAt(0)!;
    if (
      (code < 32 && code !== 10 && code !== 13) ||
      (code >= 127 && code <= 159) ||
      (code >= 0xd800 && code <= 0xdfff)
    )
      return false;
  }
  return true;
}
function run(
  input: unknown,
  bank: boolean,
): CsvResult<SettlementCsvRow | BankStatementCsvRow> {
  const version = bank ? BANK_STATEMENT_CSV_VERSION : SETTLEMENT_CSV_VERSION;
  const rowId = bank ? "lineId" : "rowId",
    timeKey = bank ? "postedAt" : "settledAt";
  const root = snapshot(input, [
    ...common,
    ...(bank ? ["bankId", "accountId"] : ["providerId", "merchantId"]),
  ]);
  if (!root) return failure("invalid_object", "$");
  if (
    root.synthetic !== true ||
    root.schemaVersion !==
      (bank
        ? BANK_STATEMENT_CSV_REQUEST_VERSION
        : SETTLEMENT_CSV_REQUEST_VERSION)
  )
    return failure("invalid_value", "$");
  for (const [key, role] of bank
    ? [
        ["fileId", "statement"],
        ["bankId", "bank"],
        ["accountId", "bankaccount"],
      ]
    : [
        ["fileId", "settlement"],
        ["providerId", "provider"],
        ["merchantId", "merchant"],
      ])
    if (!id(root[key!], role!)) return failure("invalid_identity", "$." + key);
  if (!knownTime(root.eventTime))
    return failure("invalid_timestamp", "$.eventTime");
  const rows = rowsSnapshot(
    root.rows,
    bank
      ? [
          "lineId",
          "payoutReference",
          "currency",
          "direction",
          "amountMinorUnits",
          "postedAt",
          "description",
        ]
      : settlementFields,
  );
  if (!rows) return failure("invalid_array", "$.rows");
  const seen = new Set<string>();
  for (const [i, row] of rows.entries()) {
    const path = "$.rows[" + i + "]";
    if (!id(row[rowId], bank ? "bankline" : "settlementrow"))
      return failure("invalid_identity", path + "." + rowId);
    const referenceKey = bank ? "payoutReference" : "payoutId";
    if (!(bank && row[referenceKey] === "") && !id(row[referenceKey], "payout"))
      return failure("invalid_identity", path + "." + referenceKey);
    if (bank && row.direction !== "credit" && row.direction !== "debit")
      return failure("invalid_value", path + ".direction");
    if (seen.has(row[rowId] as string))
      return failure("duplicate_identity", path + "." + rowId);
    seen.add(row[rowId] as string);
    if (
      typeof row.amountMinorUnits !== "string" ||
      /^[1-9][0-9]{0,127}$/.exec(row.amountMinorUnits)?.[0] !==
        row.amountMinorUnits
    )
      return failure("invalid_amount", path + ".amountMinorUnits");
    if (
      typeof row.currency !== "string" ||
      row.currency.length !== 3 ||
      !/^[A-Z]{3}$/.test(row.currency)
    )
      return failure("invalid_currency", path + ".currency");
    if (
      !knownTime(row[timeKey]) ||
      instant(row[timeKey] as string) > instant(root.eventTime as string)
    )
      return failure("invalid_timestamp", path + "." + timeKey);
    if (!descriptionValid(row.description))
      return failure("invalid_value", path + ".description");
  }
  const wire =
    (bank ? BANK_STATEMENT_CSV_HEADER : SETTLEMENT_CSV_HEADER) +
    "\r\n" +
    rows
      .map((row) =>
        (bank
          ? [
              version,
              "true",
              root.fileId,
              row.lineId,
              root.bankId,
              root.accountId,
              row.payoutReference,
              row.currency,
              row.direction,
              row.amountMinorUnits,
              row.postedAt,
              row.description,
            ]
          : [
              version,
              "true",
              root.fileId,
              row.rowId,
              root.providerId,
              root.merchantId,
              row.payoutId,
              row.currency,
              row.amountMinorUnits,
              row.settledAt,
              row.description,
            ]
        )
          .map((v) => quote(v as string))
          .join(","),
      )
      .join("\r\n") +
    "\r\n";
  const manifest = validateSimulatorManifest({
    schemaVersion: SIMULATOR_MANIFEST_VERSION,
    synthetic: true,
    scenarioId: root.scenarioId,
    generatorVersion: version,
    observationCutoff: root.observationCutoff,
    sourceRecords: [
      {
        sourceId: root.sourceId,
        sourceType: bank ? "bank" : "provider",
        sourceOccurrenceId: root.sourceOccurrenceId,
        sourceRecordId: root.sourceRecordId,
        eventTime: root.eventTime,
        payload: {
          encoding: "utf-8",
          mediaType: "text/csv",
          text: wire,
          sha256: createHash("sha256").update(wire, "utf8").digest("hex"),
        },
      },
    ],
    deliveries: [
      {
        deliveryId: root.deliveryId,
        receiptDescriptorId: root.receiptDescriptorId,
        sourceId: root.sourceId,
        sourceOccurrenceId: root.sourceOccurrenceId,
        sourceRecordId: root.sourceRecordId,
        observedAt: root.observedAt,
        deliveryOrder: root.deliveryOrder,
      },
    ],
  });
  if (!manifest.ok) return manifest;
  return Object.freeze({
    ok: true,
    value: Object.freeze({
      schemaVersion: version,
      synthetic: true,
      fileId: root.fileId as string,
      manifest: manifest.value,
      rows: Object.freeze(
        rows.map(
          (row) =>
            Object.freeze(row) as unknown as
              | SettlementCsvRow
              | BankStatementCsvRow,
        ),
      ),
    }),
  });
}
/** Generates a synthetic report; does not parse, reconcile, ingest or move money. */
export function generateSettlementCsv(
  input: unknown,
): CsvResult<SettlementCsvRow> {
  try {
    return run(input, false) as CsvResult<SettlementCsvRow>;
  } catch {
    return failure("invalid_object", "$");
  }
}

/** Preserves independent bank declarations without inferring a payout match. */
export function generateBankStatementCsv(
  input: unknown,
): CsvResult<BankStatementCsvRow> {
  try {
    return run(input, true) as CsvResult<BankStatementCsvRow>;
  } catch {
    return failure("invalid_object", "$");
  }
}
