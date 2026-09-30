import { ACCOUNT_CURRENCIES, validateAccountCatalog } from "./account.js";
import type {
  Account,
  AccountCandidate,
  AccountCurrency,
  AccountId,
  LedgerId,
} from "./account.js";
import { validateLedgerTransactionCandidate } from "./ledger-transaction.js";
import type {
  LedgerTransaction,
  LedgerTransactionCandidate,
  LedgerTransactionId,
} from "./ledger-transaction.js";

declare const entryBrand: unique symbol;
export type LedgerEntryId = `ent_${string}` & {
  readonly [entryBrand]: "LedgerEntryId";
};
export type LedgerEntryMinorUnits = bigint & {
  readonly [entryBrand]: "LedgerEntryMinorUnits";
};

export const LEDGER_ENTRY_CONTRACT_VERSION = "m04.03-ledger-entry.v1" as const;
export const LEDGER_ENTRY_SIDES = Object.freeze(["debit", "credit"] as const);
/** Per-line bound compatible with a future signed 64-bit store; no storage exists. */
export const LEDGER_ENTRY_MAX_MINOR_UNITS = 9223372036854775807n;
export type LedgerEntrySide = (typeof LEDGER_ENTRY_SIDES)[number];
export interface LedgerEntryWireAmount {
  readonly representation: "integer_minor_units";
  readonly minorUnits: string;
  readonly currency: AccountCurrency;
}
export interface LedgerEntryCandidate {
  readonly contractVersion: typeof LEDGER_ENTRY_CONTRACT_VERSION;
  readonly id: string;
  readonly transactionId: string;
  readonly ledgerId: string;
  readonly accountId: string;
  readonly side: LedgerEntrySide;
  readonly amount: LedgerEntryWireAmount;
}
/** Explicit caller-supplied snapshots, never durable references or authority. */
export interface LedgerEntryContextCandidate {
  readonly transaction: LedgerTransactionCandidate;
  readonly accounts: readonly AccountCandidate[];
}
export interface LedgerEntryAmount {
  readonly representation: "integer_minor_units";
  readonly minorUnits: LedgerEntryMinorUnits;
  readonly currency: AccountCurrency;
}
/** One checked line, not a balanced journal or a posted ledger record. */
export type LedgerEntry = Omit<
  LedgerEntryCandidate,
  "id" | "transactionId" | "ledgerId" | "accountId" | "amount"
> & {
  readonly id: LedgerEntryId;
  readonly transactionId: LedgerTransactionId;
  readonly ledgerId: LedgerId;
  readonly accountId: AccountId;
  readonly amount: LedgerEntryAmount;
};
export type LedgerEntryIssueCode =
  | "invalid_object"
  | "required_field"
  | "unknown_field"
  | "invalid_type"
  | "invalid_identifier"
  | "unsupported_value"
  | "invalid_amount"
  | "amount_out_of_range"
  | "invalid_context"
  | "unknown_account"
  | "transaction_mismatch"
  | "ledger_mismatch"
  | "currency_mismatch";
export interface LedgerEntryValidationIssue {
  readonly code: LedgerEntryIssueCode;
  readonly path: string;
  readonly message: string;
}
export type LedgerEntryValidationResult =
  | {
      readonly ok: true;
      readonly value: LedgerEntry;
      readonly issues: readonly [];
    }
  | {
      readonly ok: false;
      readonly issues: readonly LedgerEntryValidationIssue[];
    };

const ROOT_FIELDS = [
  "contractVersion",
  "id",
  "transactionId",
  "ledgerId",
  "accountId",
  "side",
  "amount",
] as const;
const AMOUNT_FIELDS = ["representation", "minorUnits", "currency"] as const;
const CONTEXT_FIELDS = ["transaction", "accounts"] as const;
const ULID = "[0-7][0-9A-HJKMNP-TV-Z]{25}";
const ENTRY_ID = new RegExp(`^ent_${ULID}$`);
const TRANSACTION_ID = new RegExp(`^txn_${ULID}$`);
const LEDGER_ID = new RegExp(`^ldg_${ULID}$`);
const ACCOUNT_ID = new RegExp(`^acct_${ULID}$`);
const POSITIVE_DECIMAL = /^[1-9][0-9]*$/;
const NO_ISSUES = Object.freeze([]) as readonly [];
type Issues = LedgerEntryValidationIssue[];
function issue(
  issues: Issues,
  code: LedgerEntryIssueCode,
  path: string,
  message: string,
): void {
  issues.push({ code, path, message });
}
/** Descriptors prevent getters from executing at the parsed-data boundary. */
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
    const data: Record<string, unknown> = Object.create(null) as Record<
      string,
      unknown
    >;
    for (const key of Reflect.ownKeys(descriptors)) {
      if (typeof key !== "string")
        issue(issues, "unknown_field", path, "Symbol fields are unsupported.");
      else if (!fields.includes(key))
        issue(issues, "unknown_field", `${path}.${key}`, "Unknown field.");
      else {
        const descriptor = descriptors[key];
        if (!descriptor || !("value" in descriptor) || !descriptor.enumerable)
          issue(
            issues,
            "invalid_type",
            `${path}.${key}`,
            "Expected an enumerable own data field.",
          );
        else data[key] = descriptor.value as unknown;
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
    return data;
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
function fullMatch(pattern: RegExp, value: string): boolean {
  return pattern.exec(value)?.[0] === value;
}
function identifier(
  data: Record<string, unknown>,
  field: string,
  pattern: RegExp,
  issues: Issues,
): string | undefined {
  const value = textField(data, field, "$", issues);
  if (value === undefined) return undefined;
  if (!fullMatch(pattern, value)) {
    issue(
      issues,
      "invalid_identifier",
      `$.${field}`,
      "Expected a canonical prefixed ULID.",
    );
    return undefined;
  }
  return value;
}
function member<T extends string>(
  value: string | undefined,
  allowed: readonly T[],
  path: string,
  issues: Issues,
): value is T {
  if (value === undefined) return false;
  if (!allowed.includes(value as T)) {
    issue(issues, "unsupported_value", path, "Unsupported canonical value.");
    return false;
  }
  return true;
}
function amount(input: unknown, issues: Issues): LedgerEntryAmount | undefined {
  const before = issues.length;
  const data = record(input, AMOUNT_FIELDS, "$.amount", issues);
  if (!data) return undefined;
  const representation = textField(data, "representation", "$.amount", issues);
  member(
    representation,
    ["integer_minor_units"],
    "$.amount.representation",
    issues,
  );
  const currency = textField(data, "currency", "$.amount", issues);
  const supported = member(
    currency,
    ACCOUNT_CURRENCIES,
    "$.amount.currency",
    issues,
  );
  const decimal = textField(data, "minorUnits", "$.amount", issues);
  let minorUnits: bigint | undefined;
  if (decimal !== undefined) {
    if (!fullMatch(POSITIVE_DECIMAL, decimal))
      issue(
        issues,
        "invalid_amount",
        "$.amount.minorUnits",
        "Expected canonical positive integer minor units without signs or leading zeros.",
      );
    else if (decimal.length > 19)
      issue(
        issues,
        "amount_out_of_range",
        "$.amount.minorUnits",
        "Amount exceeds 9223372036854775807 minor units.",
      );
    else {
      const exact = BigInt(decimal);
      if (exact > LEDGER_ENTRY_MAX_MINOR_UNITS)
        issue(
          issues,
          "amount_out_of_range",
          "$.amount.minorUnits",
          "Amount exceeds 9223372036854775807 minor units.",
        );
      else minorUnits = exact;
    }
  }
  if (issues.length !== before || minorUnits === undefined || !supported)
    return undefined;
  return Object.freeze({
    representation: "integer_minor_units",
    minorUnits: minorUnits as LedgerEntryMinorUnits,
    currency,
  });
}
function appendContextIssues(
  issues: Issues,
  nested: readonly { readonly path: string; readonly message: string }[],
  prefix: string,
  kind: string,
): void {
  for (const failure of nested)
    issue(
      issues,
      "invalid_context",
      prefix + failure.path.slice(1),
      `Invalid supplied ${kind}: ${failure.message}`,
    );
}
function context(
  input: unknown,
  issues: Issues,
): {
  readonly transaction: LedgerTransaction | undefined;
  readonly accounts: readonly Account[] | undefined;
} {
  const data = record(input, CONTEXT_FIELDS, "$.context", issues);
  if (!data) return { transaction: undefined, accounts: undefined };
  let transaction: LedgerTransaction | undefined;
  let accounts: readonly Account[] | undefined;
  if (Object.hasOwn(data, "transaction")) {
    const result = validateLedgerTransactionCandidate(data.transaction);
    if (result.ok) transaction = result.value;
    else
      appendContextIssues(
        issues,
        result.issues,
        "$.context.transaction",
        "transaction",
      );
  }
  if (Object.hasOwn(data, "accounts")) {
    const result = validateAccountCatalog(data.accounts);
    if (result.ok) {
      accounts = result.value;
      // The entry boundary checks exact reference encoding, including terminal newlines.
      for (const [i, account] of accounts.entries()) {
        if (!fullMatch(ACCOUNT_ID, account.id))
          issue(
            issues,
            "invalid_context",
            `$.context.accounts[${i}].id`,
            "Expected a canonical account reference.",
          );
        if (!fullMatch(LEDGER_ID, account.ledgerId))
          issue(
            issues,
            "invalid_context",
            `$.context.accounts[${i}].ledgerId`,
            "Expected a canonical ledger reference.",
          );
      }
    } else
      appendContextIssues(
        issues,
        result.issues,
        "$.context.accounts",
        "account catalog",
      );
  }
  return { transaction, accounts };
}
function finishIssues(issues: Issues): readonly LedgerEntryValidationIssue[] {
  const compare = (a: string, b: string): number =>
    a < b ? -1 : a > b ? 1 : 0;
  return Object.freeze(
    issues
      .sort((a, b) => compare(a.path, b.path) || compare(a.code, b.code))
      .map((failure) => Object.freeze(failure)),
  );
}
/** Pure wire/snapshot validation. No posting, balancing, storage or approval. */
export function validateLedgerEntryCandidate(
  input: unknown,
  suppliedContext: unknown,
): LedgerEntryValidationResult {
  const issues: Issues = [];
  const data = record(input, ROOT_FIELDS, "$", issues);
  const supplied = context(suppliedContext, issues);
  let value: LedgerEntry | undefined;
  if (data) {
    const version = textField(data, "contractVersion", "$", issues);
    member(
      version,
      [LEDGER_ENTRY_CONTRACT_VERSION],
      "$.contractVersion",
      issues,
    );
    const id = identifier(data, "id", ENTRY_ID, issues);
    const transactionId = identifier(
      data,
      "transactionId",
      TRANSACTION_ID,
      issues,
    );
    const ledgerId = identifier(data, "ledgerId", LEDGER_ID, issues);
    const accountId = identifier(data, "accountId", ACCOUNT_ID, issues);
    const side = textField(data, "side", "$", issues);
    const validSide = member(side, LEDGER_ENTRY_SIDES, "$.side", issues);
    const exactAmount = Object.hasOwn(data, "amount")
      ? amount(data.amount, issues)
      : undefined;
    if (supplied.transaction) {
      if (
        transactionId !== undefined &&
        transactionId !== supplied.transaction.id
      )
        issue(
          issues,
          "transaction_mismatch",
          "$.transactionId",
          "Entry transaction reference differs from the supplied header.",
        );
      if (ledgerId !== undefined && ledgerId !== supplied.transaction.ledgerId)
        issue(
          issues,
          "ledger_mismatch",
          "$.ledgerId",
          "Entry ledger differs from the supplied transaction header.",
        );
    }
    if (accountId !== undefined && supplied.accounts) {
      const account = supplied.accounts.find(
        (candidate) => candidate.id === accountId,
      );
      if (!account)
        issue(
          issues,
          "unknown_account",
          "$.accountId",
          "Account reference is absent from the supplied catalog.",
        );
      else {
        if (ledgerId !== undefined && ledgerId !== account.ledgerId)
          issue(
            issues,
            "ledger_mismatch",
            "$.accountId",
            "Referenced account belongs to another supplied ledger.",
          );
        if (
          exactAmount !== undefined &&
          exactAmount.currency !== account.currency
        )
          issue(
            issues,
            "currency_mismatch",
            "$.amount.currency",
            "Entry currency differs from the referenced supplied account.",
          );
      }
    }
    if (
      !issues.length &&
      id !== undefined &&
      transactionId !== undefined &&
      ledgerId !== undefined &&
      accountId !== undefined &&
      validSide &&
      exactAmount !== undefined
    ) {
      value = Object.freeze({
        contractVersion: LEDGER_ENTRY_CONTRACT_VERSION,
        id: id as LedgerEntryId,
        transactionId: transactionId as LedgerTransactionId,
        ledgerId: ledgerId as LedgerId,
        accountId: accountId as AccountId,
        side,
        amount: exactAmount,
      });
    }
  }
  return value === undefined
    ? Object.freeze({ ok: false, issues: finishIssues(issues) })
    : Object.freeze({ ok: true, value, issues: NO_ISSUES });
}
