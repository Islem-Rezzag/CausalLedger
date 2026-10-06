import { validateAccountCandidate, validateAccountCatalog } from "./account.js";
import type { Account, AccountCandidate, AccountIssueCode } from "./account.js";
import { validateLedgerJournalCandidate } from "./ledger-journal.js";
import type { LedgerJournalValidationResult } from "./ledger-journal.js";

export const CASH_CLEARING_ACCOUNT_CONTRACT_VERSION =
  "m04.10-cash-clearing-account.v1" as const;
export interface CashClearingAccountCandidate {
  readonly contractVersion: typeof CASH_CLEARING_ACCOUNT_CONTRACT_VERSION;
  readonly role: "cash_clearing";
  readonly account: AccountCandidate;
}
/** Caller-supplied checked business role; no durable registry or settlement proof. */
export interface CashClearingAccount extends Omit<
  CashClearingAccountCandidate,
  "account"
> {
  readonly account: Account;
}
export interface CashClearingAccountIssue {
  readonly code:
    | AccountIssueCode
    | "invalid_role"
    | "invalid_shape"
    | "invalid_version";
  readonly path: string;
  readonly message: string;
}
export type CashClearingAccountValidationResult =
  | {
      readonly ok: true;
      readonly value: CashClearingAccount;
      readonly issues: readonly [];
    }
  | {
      readonly ok: false;
      readonly issues: readonly CashClearingAccountIssue[];
    };
function failure(
  code: CashClearingAccountIssue["code"],
  path: string,
  message: string,
): CashClearingAccountValidationResult {
  return Object.freeze({
    ok: false,
    issues: Object.freeze([Object.freeze({ code, path, message })]),
  });
}
function wrapper(input: unknown): Record<string, unknown> | undefined {
  try {
    if (typeof input !== "object" || input === null) return undefined;
    const proto = Object.getPrototypeOf(input);
    if (proto !== Object.prototype && proto !== null) return undefined;
    const descriptors = Object.getOwnPropertyDescriptors(input),
      fields = ["contractVersion", "role", "account"];
    const keys = Reflect.ownKeys(descriptors);
    if (
      keys.length !== fields.length ||
      keys.some((key) => typeof key !== "string" || !fields.includes(key))
    )
      return undefined;
    const data: Record<string, unknown> = Object.create(null) as Record<
      string,
      unknown
    >;
    for (const field of fields) {
      const d = descriptors[field];
      if (!d || !("value" in d) || !d.enumerable) return undefined;
      data[field] = d.value as unknown;
    }
    return data;
  } catch {
    return undefined;
  }
}
/** Pure configuration validation, with no ID generation, persistence or financial authority. */
export function validateCashClearingAccountCandidate(
  input: unknown,
): CashClearingAccountValidationResult {
  const data = wrapper(input);
  if (!data)
    return failure(
      "invalid_shape",
      "$",
      "A strict cash-clearing account record is required.",
    );
  if (data.contractVersion !== CASH_CLEARING_ACCOUNT_CONTRACT_VERSION)
    return failure(
      "invalid_version",
      "$.contractVersion",
      "Unsupported cash-clearing contract version.",
    );
  if (data.role !== "cash_clearing")
    return failure(
      "invalid_role",
      "$.role",
      "Explicit cash_clearing role is required.",
    );
  const checked = validateAccountCandidate(data.account);
  if (!checked.ok)
    return Object.freeze({
      ok: false,
      issues: Object.freeze(
        checked.issues.map((issue) =>
          Object.freeze({ ...issue, path: "$.account" + issue.path.slice(1) }),
        ),
      ),
    });
  if (
    checked.value.category !== "asset" ||
    checked.value.normalBalance !== "debit"
  )
    return failure(
      "invalid_role",
      "$.account.category",
      "Cash clearing requires explicit asset/debit-normal metadata.",
    );
  return Object.freeze({
    ok: true,
    value: Object.freeze({
      contractVersion: CASH_CLEARING_ACCOUNT_CONTRACT_VERSION,
      role: "cash_clearing",
      account: checked.value,
    }),
    issues: Object.freeze([] as const),
  });
}
function contextFailure(
  path: string,
  message: string,
): LedgerJournalValidationResult {
  return Object.freeze({
    ok: false,
    issues: Object.freeze([
      Object.freeze({ code: "invalid_context", path, message }),
    ]),
  });
}
/** Pure single-currency cash-clearing example/context check; not a posting eligibility engine. */
export function validateCashClearingJournalCandidate(
  input: unknown,
  clearing: unknown,
  suppliedAccounts: unknown,
): LedgerJournalValidationResult {
  const role = validateCashClearingAccountCandidate(clearing);
  if (!role.ok)
    return contextFailure(
      "$.context.cashClearing",
      "A valid explicit cash-clearing role snapshot is required.",
    );
  const catalog = validateAccountCatalog(suppliedAccounts);
  if (!catalog.ok)
    return contextFailure(
      "$.context.accounts",
      "A complete valid Account catalog is required.",
    );
  const account = role.value.account,
    matched = catalog.value.find((candidate) => candidate.id === account.id);
  // Both records are detached strict01 output; stringify preserves lossless UTF16 name units.
  if (!matched || JSON.stringify(matched) !== JSON.stringify(account))
    return contextFailure(
      "$.context.cashClearing.account",
      "Cash-clearing snapshot must match the supplied catalog exactly.",
    );
  if (account.status !== "active")
    return contextFailure(
      "$.context.cashClearing.account.status",
      "New cash-clearing candidates require active clearing metadata.",
    );
  const journal = validateLedgerJournalCandidate(input, catalog.value);
  if (!journal.ok) return journal;
  if (
    journal.value.transaction.ledgerId !== account.ledgerId ||
    journal.value.entries.some(
      (entry) => entry.amount.currency !== account.currency,
    )
  )
    return contextFailure(
      "$.entries",
      "Cash-clearing candidates require the explicit account ledger and one currency.",
    );
  if (
    !journal.value.entries.some((entry) => entry.accountId === account.id) ||
    !journal.value.entries.some((entry) => entry.accountId !== account.id)
  )
    return contextFailure(
      "$.entries",
      "Clearing participation and a distinct counteraccount are required.",
    );
  return journal;
}
