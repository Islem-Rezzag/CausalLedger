import { validateAccountCatalog } from "./account.js";
import type { AccountCandidate, AccountCurrency } from "./account.js";
import { validateLedgerEntryCandidate } from "./ledger-entry.js";
import type {
  LedgerEntry,
  LedgerEntryCandidate,
  LedgerEntryIssueCode,
} from "./ledger-entry.js";
import { validateLedgerTransactionCandidate } from "./ledger-transaction.js";
import type {
  LedgerTransaction,
  LedgerTransactionCandidate,
} from "./ledger-transaction.js";

declare const journalBrand: unique symbol;
/** Exact positive aggregate; deliberately not the bounded per-line money brand. */
export type LedgerJournalMinorUnits = bigint & {
  readonly [journalBrand]: "LedgerJournalMinorUnits";
};
export const LEDGER_JOURNAL_CONTRACT_VERSION =
  "m04.04-ledger-journal.v1" as const;
export interface LedgerJournalCandidate {
  readonly contractVersion: typeof LEDGER_JOURNAL_CONTRACT_VERSION;
  readonly transaction: LedgerTransactionCandidate;
  readonly entries: readonly LedgerEntryCandidate[];
}
export interface LedgerJournalCurrencyTotals {
  readonly currency: AccountCurrency;
  readonly debitMinorUnits: LedgerJournalMinorUnits;
  readonly creditMinorUnits: LedgerJournalMinorUnits;
}
/** Checked arithmetic and supplied metadata, never a posted or persisted record. */
export interface LedgerJournal {
  readonly contractVersion: typeof LEDGER_JOURNAL_CONTRACT_VERSION;
  readonly transaction: LedgerTransaction;
  readonly entries: readonly LedgerEntry[];
  readonly totals: readonly LedgerJournalCurrencyTotals[];
}
export type LedgerJournalIssueCode =
  | LedgerEntryIssueCode
  | "invalid_array"
  | "invalid_transaction"
  | "empty_entries"
  | "duplicate_entry_id"
  | "missing_side"
  | "unbalanced_currency";
export interface LedgerJournalValidationIssue {
  readonly code: LedgerJournalIssueCode;
  readonly path: string;
  readonly message: string;
}
export type LedgerJournalValidationResult =
  | {
      readonly ok: true;
      readonly value: LedgerJournal;
      readonly issues: readonly [];
    }
  | {
      readonly ok: false;
      readonly issues: readonly LedgerJournalValidationIssue[];
    };

const FIELDS = ["contractVersion", "transaction", "entries"] as const;
const NO_ISSUES = Object.freeze([]) as readonly [];
type Issues = LedgerJournalValidationIssue[];
function issue(
  issues: Issues,
  code: LedgerJournalIssueCode,
  path: string,
  message: string,
): void {
  issues.push({ code, path, message });
}
function record(
  input: unknown,
  issues: Issues,
): Record<string, unknown> | undefined {
  if (typeof input !== "object" || input === null) {
    issue(
      issues,
      "invalid_object",
      "$",
      "Expected a plain journal data object.",
    );
    return undefined;
  }
  try {
    const prototype = Object.getPrototypeOf(input);
    if (prototype !== Object.prototype && prototype !== null) {
      issue(
        issues,
        "invalid_object",
        "$",
        "Expected a plain journal data object.",
      );
      return undefined;
    }
    const descriptors = Object.getOwnPropertyDescriptors(input);
    const data = Object.create(null) as Record<string, unknown>;
    for (const key of Reflect.ownKeys(descriptors)) {
      if (typeof key !== "string")
        issue(issues, "unknown_field", "$", "Symbol fields are unsupported.");
      else if (!FIELDS.includes(key as (typeof FIELDS)[number]))
        issue(issues, "unknown_field", `$.${key}`, "Unknown field.");
      else {
        const descriptor = descriptors[key];
        if (!descriptor || !("value" in descriptor) || !descriptor.enumerable)
          issue(
            issues,
            "invalid_type",
            `$.${key}`,
            "Expected an enumerable own data field.",
          );
        else data[key] = descriptor.value as unknown;
      }
    }
    for (const field of FIELDS)
      if (!Object.hasOwn(descriptors, field))
        issue(
          issues,
          "required_field",
          `$.${field}`,
          "Required field is missing.",
        );
    return data;
  } catch {
    issue(
      issues,
      "invalid_object",
      "$",
      "Unable to inspect journal data object.",
    );
    return undefined;
  }
}
function array(input: unknown, issues: Issues): readonly unknown[] | undefined {
  try {
    if (
      !Array.isArray(input) ||
      Object.getPrototypeOf(input) !== Array.prototype
    ) {
      issue(
        issues,
        "invalid_array",
        "$.entries",
        "Expected an ordinary dense data array.",
      );
      return undefined;
    }
    const descriptors = Object.getOwnPropertyDescriptors(input);
    const length = input.length;
    if (Reflect.ownKeys(descriptors).length !== length + 1) {
      issue(
        issues,
        "invalid_array",
        "$.entries",
        "Sparse arrays and extra properties are unsupported.",
      );
      return undefined;
    }
    const values: unknown[] = [];
    const before = issues.length;
    for (let i = 0; i < length; i++) {
      const descriptor = descriptors[String(i)];
      if (!descriptor || !("value" in descriptor) || !descriptor.enumerable)
        issue(
          issues,
          "invalid_array",
          `$.entries[${i}]`,
          "Expected an enumerable own array element.",
        );
      else values.push(descriptor.value as unknown);
    }
    return issues.length === before ? values : undefined;
  } catch {
    issue(
      issues,
      "invalid_array",
      "$.entries",
      "Unable to inspect entry data array.",
    );
    return undefined;
  }
}
const compare = (a: string, b: string): number => (a < b ? -1 : a > b ? 1 : 0);
function finishIssues(issues: Issues): readonly LedgerJournalValidationIssue[] {
  const unique = new Map<string, LedgerJournalValidationIssue>();
  for (const failure of issues)
    unique.set(
      JSON.stringify([failure.code, failure.path, failure.message]),
      failure,
    );
  return Object.freeze(
    [...unique.values()]
      .sort(
        (a, b) =>
          compare(a.path, b.path) ||
          compare(a.code, b.code) ||
          compare(a.message, b.message),
      )
      .map((failure) => Object.freeze(failure)),
  );
}
/** Pure per-currency conservation. No posting, storage, approval or account query. */
export function validateLedgerJournalCandidate(
  input: unknown,
  suppliedAccounts: unknown,
): LedgerJournalValidationResult {
  const issues: Issues = [];
  const data = record(input, issues);
  const catalog = validateAccountCatalog(suppliedAccounts);
  if (!catalog.ok)
    for (const failure of catalog.issues)
      issue(
        issues,
        "invalid_context",
        "$.context.accounts" + failure.path.slice(1),
        `Invalid supplied account catalog: ${failure.message}`,
      );
  let transaction: LedgerTransaction | undefined;
  let raw: readonly unknown[] | undefined;
  if (data) {
    if (Object.hasOwn(data, "contractVersion")) {
      if (typeof data.contractVersion !== "string")
        issue(
          issues,
          "invalid_type",
          "$.contractVersion",
          "Expected a string without coercion.",
        );
      else if (data.contractVersion !== LEDGER_JOURNAL_CONTRACT_VERSION)
        issue(
          issues,
          "unsupported_value",
          "$.contractVersion",
          "Unsupported canonical value.",
        );
    }
    if (Object.hasOwn(data, "transaction")) {
      const result = validateLedgerTransactionCandidate(data.transaction);
      if (result.ok) transaction = result.value;
      else
        for (const failure of result.issues)
          issue(
            issues,
            "invalid_transaction",
            "$.transaction" + failure.path.slice(1),
            `Invalid supplied transaction: ${failure.message}`,
          );
    }
    if (Object.hasOwn(data, "entries")) raw = array(data.entries, issues);
  }
  const entries: LedgerEntry[] = [];
  const seen = new Set<string>();
  if (raw) {
    if (!raw.length)
      issue(
        issues,
        "empty_entries",
        "$.entries",
        "A journal requires entries.",
      );
    if (transaction && catalog.ok)
      for (const [i, candidate] of raw.entries()) {
        const result = validateLedgerEntryCandidate(candidate, {
          transaction,
          accounts: catalog.value,
        });
        if (!result.ok) {
          for (const failure of result.issues) {
            const path =
              failure.code === "invalid_context" &&
              failure.path.startsWith("$.context.accounts")
                ? failure.path
                : `$.entries[${i}]` + failure.path.slice(1);
            issue(issues, failure.code, path, failure.message);
          }
        } else {
          if (seen.has(result.value.id))
            issue(
              issues,
              "duplicate_entry_id",
              `$.entries[${i}].id`,
              "Entry ID is repeated within this supplied journal.",
            );
          seen.add(result.value.id);
          entries.push(result.value);
        }
      }
  }
  const totals: LedgerJournalCurrencyTotals[] = [];
  // Do not compute diagnostics from a partially validated or duplicated entry set.
  if (!issues.length && transaction) {
    const currencies = new Map<
      AccountCurrency,
      { debit: bigint; credit: bigint }
    >();
    for (const entry of entries) {
      const total = currencies.get(entry.amount.currency) ?? {
        debit: 0n,
        credit: 0n,
      };
      total[entry.side] += entry.amount.minorUnits;
      currencies.set(entry.amount.currency, total);
    }
    for (const [currency, total] of [...currencies].sort(([a], [b]) =>
      compare(a, b),
    )) {
      if (total.debit === 0n || total.credit === 0n)
        issue(
          issues,
          "missing_side",
          "$.entries",
          `${currency} requires both debit and credit entries.`,
        );
      else if (total.debit !== total.credit)
        issue(
          issues,
          "unbalanced_currency",
          "$.entries",
          `${currency} debit and credit totals must be equal.`,
        );
      else
        totals.push(
          Object.freeze({
            currency,
            debitMinorUnits: total.debit as LedgerJournalMinorUnits,
            creditMinorUnits: total.credit as LedgerJournalMinorUnits,
          }),
        );
    }
  }
  if (issues.length || !transaction)
    return Object.freeze({ ok: false, issues: finishIssues(issues) });
  return Object.freeze({
    ok: true,
    value: Object.freeze({
      contractVersion: LEDGER_JOURNAL_CONTRACT_VERSION,
      transaction,
      entries: Object.freeze(entries.sort((a, b) => compare(a.id, b.id))),
      totals: Object.freeze(totals),
    }),
    issues: NO_ISSUES,
  });
}

// This import-only annotation documents the public catalog input without accepting brands as authority.
export type LedgerJournalAccountCatalogCandidate = readonly AccountCandidate[];
