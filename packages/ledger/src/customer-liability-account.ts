import { validateAccountCandidate, validateAccountCatalog } from "./account.js";
import type {
  Account,
  AccountCandidate,
  AccountIssueCode,
  AccountOwnerReference,
} from "./account.js";
import { validateLedgerJournalCandidate } from "./ledger-journal.js";
import type { LedgerJournalValidationResult } from "./ledger-journal.js";

export const CUSTOMER_LIABILITY_ACCOUNT_CONTRACT_VERSION =
  "m04.12-customer-liability-account.v1" as const;
export interface CustomerLiabilityJournalContextCandidate {
  readonly owner: AccountOwnerReference;
  readonly accounts: readonly AccountCandidate[];
}
export interface CustomerLiabilityAccountCandidate {
  readonly contractVersion: typeof CUSTOMER_LIABILITY_ACCOUNT_CONTRACT_VERSION;
  readonly role: "customer_liability";
  readonly account: AccountCandidate;
}
/** Caller-declared customer role; no owner authentication or durable registry. */
export interface CustomerLiabilityAccount extends Omit<
  CustomerLiabilityAccountCandidate,
  "account"
> {
  readonly account: Account;
}
export interface CustomerLiabilityAccountIssue {
  readonly code:
    | AccountIssueCode
    | "invalid_role"
    | "invalid_shape"
    | "invalid_version";
  readonly path: string;
  readonly message: string;
}
export type CustomerLiabilityAccountValidationResult =
  | {
      readonly ok: true;
      readonly value: CustomerLiabilityAccount;
      readonly issues: readonly [];
    }
  | {
      readonly ok: false;
      readonly issues: readonly CustomerLiabilityAccountIssue[];
    };
function failure(
  code: CustomerLiabilityAccountIssue["code"],
  path: string,
  message: string,
): CustomerLiabilityAccountValidationResult {
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
function ownerReference(input: unknown): AccountOwnerReference | undefined {
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
export function validateCustomerLiabilityAccountCandidate(
  input: unknown,
): CustomerLiabilityAccountValidationResult {
  const data = record(input, ["contractVersion", "role", "account"]);
  if (!data)
    return failure(
      "invalid_shape",
      "$",
      "A strict customer-liability account record is required.",
    );
  if (data.contractVersion !== CUSTOMER_LIABILITY_ACCOUNT_CONTRACT_VERSION)
    return failure(
      "invalid_version",
      "$.contractVersion",
      "Unsupported customer-liability contract version.",
    );
  if (data.role !== "customer_liability")
    return failure(
      "invalid_role",
      "$.role",
      "Explicit customer_liability role is required.",
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
  if (!ownerReference(checked.value.owner))
    return failure(
      "invalid_identifier",
      "$.account.owner",
      "A full-span canonical customer owner reference is required.",
    );
  if (
    checked.value.category !== "liability" ||
    checked.value.normalBalance !== "credit"
  )
    return failure(
      "invalid_role",
      "$.account.category",
      "Customer liability requires explicit liability/credit-normal metadata.",
    );
  return Object.freeze({
    ok: true,
    value: Object.freeze({
      contractVersion: CUSTOMER_LIABILITY_ACCOUNT_CONTRACT_VERSION,
      role: "customer_liability",
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
/** Pure single-currency customer-liability example/context check; not a posting eligibility engine. */
export function validateCustomerLiabilityJournalCandidate(
  input: unknown,
  liability: unknown,
  suppliedContext: unknown,
): LedgerJournalValidationResult {
  const role = validateCustomerLiabilityAccountCandidate(liability);
  if (!role.ok)
    return contextFailure(
      "$.context.customerLiability",
      "A valid explicit customer-liability role snapshot is required.",
    );
  const context = record(suppliedContext, ["owner", "accounts"]);
  if (!context)
    return contextFailure(
      "$.context",
      "A strict owner and Account context is required.",
    );
  const owner = ownerReference(context.owner);
  if (
    !owner ||
    owner.namespace !== role.value.account.owner.namespace ||
    owner.id !== role.value.account.owner.id
  )
    return contextFailure(
      "$.context.owner",
      "Caller owner context must match the configured reference exactly.",
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
      "$.context.customerLiability.account",
      "Customer liability snapshot must match the supplied catalog exactly.",
    );
  if (account.status !== "active")
    return contextFailure(
      "$.context.customerLiability.account.status",
      "New customer-liability candidates require active liability metadata.",
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
      "Customer liability candidates require the explicit account ledger and one currency.",
    );
  if (
    !journal.value.entries.some((entry) => entry.accountId === account.id) ||
    !journal.value.entries.some((entry) => entry.accountId !== account.id)
  )
    return contextFailure(
      "$.entries",
      "Liability participation and a distinct counteraccount are required.",
    );
  if (
    journal.value.entries.some((entry) => {
      const participating = catalog.value.find(
        (candidate) => candidate.id === entry.accountId,
      );
      return (
        participating?.category === "liability" &&
        (participating.owner.namespace !== owner.namespace ||
          participating.owner.id !== owner.id)
      );
    })
  )
    return contextFailure(
      "$.entries",
      "Participating liability accounts must share the declared customer owner.",
    );
  return journal;
}
