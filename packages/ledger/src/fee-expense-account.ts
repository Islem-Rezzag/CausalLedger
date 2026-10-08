import { validateAccountCandidate, validateAccountCatalog } from "./account.js";
import type { Account, AccountCandidate, AccountIssueCode } from "./account.js";
import type { LedgerTransactionSourceReference } from "./ledger-transaction.js";
import { validateLedgerJournalCandidate } from "./ledger-journal.js";
import type { LedgerJournalValidationResult } from "./ledger-journal.js";

export const FEE_EXPENSE_ACCOUNT_CONTRACT_VERSION =
  "m04.13-fee-expense-account.v1" as const;
export interface FeeExpenseJournalContextCandidate {
  readonly source: LedgerTransactionSourceReference;
  readonly accounts: readonly AccountCandidate[];
}
export interface FeeExpenseAccountCandidate {
  readonly contractVersion: typeof FEE_EXPENSE_ACCOUNT_CONTRACT_VERSION;
  readonly role: "fee_expense";
  readonly account: AccountCandidate;
}
/** Caller-declared fee role; no source authentication or durable registry. */
export interface FeeExpenseAccount extends Omit<
  FeeExpenseAccountCandidate,
  "account"
> {
  readonly account: Account;
}
export interface FeeExpenseAccountIssue {
  readonly code:
    | AccountIssueCode
    | "invalid_role"
    | "invalid_shape"
    | "invalid_version";
  readonly path: string;
  readonly message: string;
}
export type FeeExpenseAccountValidationResult =
  | {
      readonly ok: true;
      readonly value: FeeExpenseAccount;
      readonly issues: readonly [];
    }
  | {
      readonly ok: false;
      readonly issues: readonly FeeExpenseAccountIssue[];
    };
function failure(
  code: FeeExpenseAccountIssue["code"],
  path: string,
  message: string,
): FeeExpenseAccountValidationResult {
  return Object.freeze({
    ok: false,
    issues: Object.freeze([Object.freeze({ code, path, message })]),
  });
}
function record(
  input: unknown,
  fields: readonly string[],
): Record<string, unknown> | undefined {
  try {
    if (typeof input !== "object" || input === null) return undefined;
    const proto = Object.getPrototypeOf(input);
    if (proto !== Object.prototype && proto !== null) return undefined;
    const descriptors = Object.getOwnPropertyDescriptors(input);
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
function sourceReference(
  input: unknown,
): LedgerTransactionSourceReference | undefined {
  const data = record(input, ["namespace", "id"]);
  if (!data) return undefined;
  const namespace = data.namespace,
    id = data.id;
  if (
    typeof namespace !== "string" ||
    typeof id !== "string" ||
    /^[a-z][a-z0-9.-]{0,63}$/u.exec(namespace)?.[0] !== namespace ||
    /^[A-Za-z0-9][A-Za-z0-9._:-]{0,127}$/u.exec(id)?.[0] !== id
  )
    return undefined;
  return Object.freeze({ namespace, id });
}
/** Pure configuration validation, with no ID generation, persistence or financial authority. */
export function validateFeeExpenseAccountCandidate(
  input: unknown,
): FeeExpenseAccountValidationResult {
  const data = record(input, ["contractVersion", "role", "account"]);
  if (!data)
    return failure(
      "invalid_shape",
      "$",
      "A strict fee-expense account record is required.",
    );
  if (data.contractVersion !== FEE_EXPENSE_ACCOUNT_CONTRACT_VERSION)
    return failure(
      "invalid_version",
      "$.contractVersion",
      "Unsupported fee-expense contract version.",
    );
  if (data.role !== "fee_expense")
    return failure(
      "invalid_role",
      "$.role",
      "Explicit fee_expense role is required.",
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
    checked.value.category !== "expense" ||
    checked.value.normalBalance !== "debit"
  )
    return failure(
      "invalid_role",
      "$.account.category",
      "Fee expense requires explicit expense/debit-normal metadata.",
    );
  return Object.freeze({
    ok: true,
    value: Object.freeze({
      contractVersion: FEE_EXPENSE_ACCOUNT_CONTRACT_VERSION,
      role: "fee_expense",
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
/** Pure single-currency fee-expense example/context check; not a posting eligibility engine. */
export function validateFeeExpenseJournalCandidate(
  input: unknown,
  fee: unknown,
  suppliedContext: unknown,
): LedgerJournalValidationResult {
  const role = validateFeeExpenseAccountCandidate(fee);
  if (!role.ok)
    return contextFailure(
      "$.context.feeExpense",
      "A valid explicit fee-expense role snapshot is required.",
    );
  const context = record(suppliedContext, ["source", "accounts"]);
  if (!context)
    return contextFailure(
      "$.context",
      "A strict source and Account context is required.",
    );
  const source = sourceReference(context.source);
  if (!source)
    return contextFailure(
      "$.context.source",
      "A full-span canonical source reference is required.",
    );
  const catalog = validateAccountCatalog(context.accounts);
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
      "$.context.feeExpense.account",
      "Fee expense snapshot must match the supplied catalog exactly.",
    );
  if (account.status !== "active")
    return contextFailure(
      "$.context.feeExpense.account.status",
      "New fee-expense candidates require active expense metadata.",
    );
  const journal = validateLedgerJournalCandidate(input, catalog.value);
  if (!journal.ok) return journal;
  if (
    journal.value.transaction.provenance.source.namespace !==
      source.namespace ||
    journal.value.transaction.provenance.source.id !== source.id
  )
    return contextFailure(
      "$.transaction.provenance.source",
      "Journal source must match the explicit request context exactly.",
    );
  if (
    journal.value.transaction.ledgerId !== account.ledgerId ||
    journal.value.entries.some(
      (entry) => entry.amount.currency !== account.currency,
    )
  )
    return contextFailure(
      "$.entries",
      "Fee expense candidates require the explicit account ledger and one currency.",
    );
  if (
    !journal.value.entries.some((entry) => entry.accountId === account.id) ||
    !journal.value.entries.some((entry) => entry.accountId !== account.id)
  )
    return contextFailure(
      "$.entries",
      "Fee participation and a distinct counteraccount are required.",
    );
  return journal;
}
