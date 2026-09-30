import type { LedgerId } from "./account.js";

declare const transactionBrand: unique symbol;
export type LedgerTransactionId = `txn_${string}` & {
  readonly [transactionBrand]: "LedgerTransactionId";
};

export const LEDGER_TRANSACTION_CONTRACT_VERSION =
  "m04.02-ledger-transaction.v1" as const;
export const LEDGER_TRANSACTION_STATUSES = Object.freeze([
  "pending",
  "posted",
  "rejected",
  "voided",
] as const);
export type LedgerTransactionStatus =
  (typeof LEDGER_TRANSACTION_STATUSES)[number];

export interface LedgerTransactionSourceReference {
  readonly namespace: string;
  readonly id: string;
}
export interface LedgerTransactionEvidenceReference {
  readonly receiptId: string;
  readonly contentHash: string;
}
export interface LedgerTransactionProvenance {
  readonly source: LedgerTransactionSourceReference;
  readonly moneyEventIds: readonly string[];
  readonly evidence: readonly LedgerTransactionEvidenceReference[];
}
export interface LedgerTransactionCandidate {
  readonly contractVersion: typeof LEDGER_TRANSACTION_CONTRACT_VERSION;
  readonly id: string;
  readonly ledgerId: string;
  readonly status: LedgerTransactionStatus;
  readonly effectiveAt: string;
  readonly recordedAt: string;
  readonly idempotencyKey: string;
  readonly provenance: LedgerTransactionProvenance;
}
/** Checked header metadata, not a posted journal or authenticated evidence. */
export type LedgerTransaction = Omit<
  LedgerTransactionCandidate,
  "id" | "ledgerId"
> & {
  readonly id: LedgerTransactionId;
  readonly ledgerId: LedgerId;
};
export type LedgerTransactionIssueCode =
  | "invalid_object"
  | "invalid_array"
  | "required_field"
  | "unknown_field"
  | "invalid_type"
  | "invalid_identifier"
  | "invalid_timestamp"
  | "invalid_hash"
  | "unsupported_value"
  | "empty_evidence"
  | "duplicate_reference"
  | "conflicting_evidence_reference";
export interface LedgerTransactionValidationIssue {
  readonly code: LedgerTransactionIssueCode;
  readonly path: string;
  readonly message: string;
}
export type LedgerTransactionValidationResult =
  | {
      readonly ok: true;
      readonly value: LedgerTransaction;
      readonly issues: readonly [];
    }
  | {
      readonly ok: false;
      readonly issues: readonly LedgerTransactionValidationIssue[];
    };

const ROOT_FIELDS = [
  "contractVersion",
  "id",
  "ledgerId",
  "status",
  "effectiveAt",
  "recordedAt",
  "idempotencyKey",
  "provenance",
] as const;
const ULID = "[0-7][0-9A-HJKMNP-TV-Z]{25}";
const TRANSACTION_ID = new RegExp(`^txn_${ULID}$`);
const LEDGER_ID = new RegExp(`^ldg_${ULID}$`);
const EVENT_ID = new RegExp(`^evt_${ULID}$`);
const RECEIPT_ID = new RegExp(`^rcpt_${ULID}$`);
const NAMESPACE = /^[a-z][a-z0-9.-]{0,63}$/;
const OPAQUE_REFERENCE = /^[A-Za-z0-9][A-Za-z0-9._:-]{0,127}$/;
const HASH = /^sha256:[0-9a-f]{64}$/;
const INSTANT =
  /^(?!0000)[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]{3}Z$/;
const NO_ISSUES = Object.freeze([]) as readonly [];
type Issues = LedgerTransactionValidationIssue[];

function issue(
  issues: Issues,
  code: LedgerTransactionIssueCode,
  path: string,
  message: string,
): void {
  issues.push({ code, path, message });
}
function record(
  input: unknown,
  fields: readonly string[],
  path: string,
  issues: Issues,
): Record<string, unknown> | undefined {
  if (typeof input !== "object" || input === null) {
    issue(issues, "invalid_object", path, "Expected a plain data object.");
    return undefined;
  }
  try {
    const prototype = Object.getPrototypeOf(input);
    if (prototype !== Object.prototype && prototype !== null) {
      issue(issues, "invalid_object", path, "Expected a plain data object.");
      return undefined;
    }
    const descriptors = Object.getOwnPropertyDescriptors(input);
    const output: Record<string, unknown> = Object.create(null) as Record<
      string,
      unknown
    >;
    for (const key of Reflect.ownKeys(descriptors)) {
      if (typeof key !== "string") {
        issue(issues, "unknown_field", path, "Symbol fields are unsupported.");
      } else if (!fields.includes(key)) {
        issue(issues, "unknown_field", `${path}.${key}`, "Unknown field.");
      } else {
        const descriptor = descriptors[key];
        if (!descriptor || !("value" in descriptor) || !descriptor.enumerable) {
          issue(
            issues,
            "invalid_type",
            `${path}.${key}`,
            "Expected an enumerable own data field.",
          );
        } else output[key] = descriptor.value as unknown;
      }
    }
    for (const field of fields) {
      if (!Object.hasOwn(descriptors, field))
        issue(
          issues,
          "required_field",
          `${path}.${field}`,
          "Required field is missing.",
        );
    }
    return output;
  } catch {
    issue(issues, "invalid_object", path, "Unable to inspect data object.");
    return undefined;
  }
}
function textField(
  data: Record<string, unknown>,
  field: string,
  path: string,
  issues: Issues,
): string | undefined {
  if (!Object.hasOwn(data, field)) return undefined;
  const value = data[field];
  if (typeof value !== "string") {
    issue(
      issues,
      "invalid_type",
      `${path}.${field}`,
      "Expected a string without coercion.",
    );
    return undefined;
  }
  return value;
}
function checkedText(
  data: Record<string, unknown>,
  field: string,
  pattern: RegExp,
  path: string,
  issues: Issues,
  code: LedgerTransactionIssueCode = "invalid_identifier",
): string | undefined {
  const value = textField(data, field, path, issues);
  if (value !== undefined && pattern.exec(value)?.[0] !== value) {
    issue(
      issues,
      code,
      `${path}.${field}`,
      "Expected the documented canonical representation.",
    );
    return undefined;
  }
  return value;
}
function instant(
  data: Record<string, unknown>,
  field: string,
  issues: Issues,
): string | undefined {
  const value = textField(data, field, "$", issues);
  if (value === undefined) return undefined;
  const milliseconds = INSTANT.test(value) ? Date.parse(value) : NaN;
  if (
    !Number.isFinite(milliseconds) ||
    new Date(milliseconds).toISOString() !== value
  ) {
    issue(
      issues,
      "invalid_timestamp",
      `$.${field}`,
      "Expected a valid UTC millisecond instant in years 0001-9999.",
    );
    return undefined;
  }
  return value;
}
/** Inspect elements by descriptor so accessors, holes and extra properties reject. */
function array(
  input: unknown,
  path: string,
  issues: Issues,
): readonly unknown[] | undefined {
  try {
    if (
      !Array.isArray(input) ||
      Object.getPrototypeOf(input) !== Array.prototype
    ) {
      issue(issues, "invalid_array", path, "Expected a dense data array.");
      return undefined;
    }
    const descriptors = Object.getOwnPropertyDescriptors(input);
    const length = input.length;
    if (Reflect.ownKeys(descriptors).length !== length + 1) {
      issue(
        issues,
        "invalid_array",
        path,
        "Sparse arrays and extra properties are unsupported.",
      );
      return undefined;
    }
    const output: unknown[] = [];
    for (let i = 0; i < length; i += 1) {
      const descriptor = descriptors[String(i)];
      if (!descriptor || !("value" in descriptor) || !descriptor.enumerable) {
        issue(
          issues,
          "invalid_array",
          `${path}[${i}]`,
          "Expected an enumerable own array element.",
        );
        return undefined;
      }
      output.push(descriptor.value as unknown);
    }
    return output;
  } catch {
    issue(issues, "invalid_array", path, "Unable to inspect data array.");
    return undefined;
  }
}
function provenance(
  input: unknown,
  issues: Issues,
): LedgerTransactionProvenance | undefined {
  const path = "$.provenance";
  const before = issues.length;
  const data = record(
    input,
    ["source", "moneyEventIds", "evidence"],
    path,
    issues,
  );
  if (!data) return undefined;
  const source = Object.hasOwn(data, "source")
    ? record(data.source, ["namespace", "id"], `${path}.source`, issues)
    : undefined;
  const namespace = source
    ? checkedText(source, "namespace", NAMESPACE, `${path}.source`, issues)
    : undefined;
  const sourceId = source
    ? checkedText(source, "id", OPAQUE_REFERENCE, `${path}.source`, issues)
    : undefined;
  const eventInput = Object.hasOwn(data, "moneyEventIds")
    ? array(data.moneyEventIds, `${path}.moneyEventIds`, issues)
    : undefined;
  const eventIds: string[] = [];
  const seenEvents = new Set<string>();
  eventInput?.forEach((value, i) => {
    const itemPath = `${path}.moneyEventIds[${i}]`;
    if (typeof value !== "string")
      issue(
        issues,
        "invalid_type",
        itemPath,
        "Expected an event identifier string.",
      );
    else if (EVENT_ID.exec(value)?.[0] !== value)
      issue(
        issues,
        "invalid_identifier",
        itemPath,
        "Expected evt_ followed by a canonical 128-bit ULID.",
      );
    else {
      if (seenEvents.has(value))
        issue(
          issues,
          "duplicate_reference",
          itemPath,
          "MoneyEvent identity is repeated.",
        );
      seenEvents.add(value);
      eventIds.push(value);
    }
  });
  const evidenceInput = Object.hasOwn(data, "evidence")
    ? array(data.evidence, `${path}.evidence`, issues)
    : undefined;
  if (evidenceInput?.length === 0)
    issue(
      issues,
      "empty_evidence",
      `${path}.evidence`,
      "At least one receipt/hash reference is required.",
    );
  const evidence: LedgerTransactionEvidenceReference[] = [];
  const receipts = new Map<string, string>();
  evidenceInput?.forEach((value, i) => {
    const itemPath = `${path}.evidence[${i}]`;
    const ref = record(value, ["receiptId", "contentHash"], itemPath, issues);
    if (!ref) return;
    const receiptId = checkedText(
      ref,
      "receiptId",
      RECEIPT_ID,
      itemPath,
      issues,
    );
    const contentHash = checkedText(
      ref,
      "contentHash",
      HASH,
      itemPath,
      issues,
      "invalid_hash",
    );
    if (receiptId === undefined || contentHash === undefined) return;
    const previous = receipts.get(receiptId);
    if (previous !== undefined) {
      if (previous !== contentHash)
        issue(
          issues,
          "conflicting_evidence_reference",
          `${itemPath}.contentHash`,
          "One receipt identity references different content hashes.",
        );
      else
        issue(
          issues,
          "duplicate_reference",
          `${itemPath}.receiptId`,
          "Receipt identity is repeated.",
        );
    }
    receipts.set(receiptId, contentHash);
    evidence.push(Object.freeze({ receiptId, contentHash }));
  });
  if (
    issues.length !== before ||
    namespace === undefined ||
    sourceId === undefined ||
    eventInput === undefined ||
    evidenceInput === undefined
  )
    return undefined;
  return Object.freeze({
    source: Object.freeze({ namespace, id: sourceId }),
    moneyEventIds: Object.freeze(eventIds),
    evidence: Object.freeze(evidence),
  });
}

/** Pure structural validation; no lookup, clocks, storage, posting or retry effects. */
export function validateLedgerTransactionCandidate(
  input: unknown,
): LedgerTransactionValidationResult {
  const issues: Issues = [];
  const data = record(input, ROOT_FIELDS, "$", issues);
  if (data) {
    const version = textField(data, "contractVersion", "$", issues);
    if (
      version !== undefined &&
      version !== LEDGER_TRANSACTION_CONTRACT_VERSION
    )
      issue(
        issues,
        "unsupported_value",
        "$.contractVersion",
        "Unsupported transaction contract version.",
      );
    const id = checkedText(data, "id", TRANSACTION_ID, "$", issues);
    const ledgerId = checkedText(data, "ledgerId", LEDGER_ID, "$", issues);
    const status = textField(data, "status", "$", issues);
    const validStatus = (
      value: string | undefined,
    ): value is LedgerTransactionStatus =>
      LEDGER_TRANSACTION_STATUSES.some((allowed) => allowed === value);
    if (status !== undefined && !validStatus(status))
      issue(
        issues,
        "unsupported_value",
        "$.status",
        "Unsupported transaction snapshot status.",
      );
    const effectiveAt = instant(data, "effectiveAt", issues);
    const recordedAt = instant(data, "recordedAt", issues);
    const idempotencyKey = checkedText(
      data,
      "idempotencyKey",
      OPAQUE_REFERENCE,
      "$",
      issues,
    );
    const checkedProvenance = Object.hasOwn(data, "provenance")
      ? provenance(data.provenance, issues)
      : undefined;
    if (
      !issues.length &&
      version === LEDGER_TRANSACTION_CONTRACT_VERSION &&
      id !== undefined &&
      ledgerId !== undefined &&
      validStatus(status) &&
      effectiveAt !== undefined &&
      recordedAt !== undefined &&
      idempotencyKey !== undefined &&
      checkedProvenance !== undefined
    ) {
      const value: LedgerTransaction = Object.freeze({
        contractVersion: version,
        id: id as LedgerTransactionId,
        ledgerId: ledgerId as LedgerId,
        status,
        effectiveAt,
        recordedAt,
        idempotencyKey,
        provenance: checkedProvenance,
      });
      return Object.freeze({ ok: true, value, issues: NO_ISSUES });
    }
  }
  const compare = (a: string, b: string): number =>
    a < b ? -1 : a > b ? 1 : 0;
  return Object.freeze({
    ok: false,
    issues: Object.freeze(
      issues
        .sort((a, b) => compare(a.path, b.path) || compare(a.code, b.code))
        .map((entry) => Object.freeze(entry)),
    ),
  });
}
