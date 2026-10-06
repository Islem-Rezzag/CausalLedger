import { validateAccountCandidate, validateAccountCatalog } from "./account.js";
import type { Account, AccountCandidate, AccountIssueCode } from "./account.js";
import { validateLedgerJournalCandidate } from "./ledger-journal.js";
import type { LedgerJournalValidationResult } from "./ledger-journal.js";

export const PROVIDER_CLEARING_ACCOUNT_CONTRACT_VERSION =
  "m04.11-provider-clearing-account.v1" as const;
export interface ProviderClearingReference {
  readonly namespace: string;
  readonly id: string;
}
export interface ProviderClearingJournalContextCandidate {
  readonly provider: ProviderClearingReference;
  readonly accounts: readonly AccountCandidate[];
}
export interface ProviderClearingAccountCandidate {
  readonly contractVersion: typeof PROVIDER_CLEARING_ACCOUNT_CONTRACT_VERSION;
  readonly role: "provider_clearing";
  readonly provider: ProviderClearingReference;
  readonly account: AccountCandidate;
}
/** Caller-declared provider role; no provider authentication, durable registry or settlement proof. */
export interface ProviderClearingAccount extends Omit<
  ProviderClearingAccountCandidate,
  "account"
> {
  readonly account: Account;
}
export interface ProviderClearingAccountIssue {
  readonly code:
    | AccountIssueCode
    | "invalid_role"
    | "invalid_shape"
    | "invalid_version"
    | "invalid_reference";
  readonly path: string;
  readonly message: string;
}
export type ProviderClearingAccountValidationResult =
  | {
      readonly ok: true;
      readonly value: ProviderClearingAccount;
      readonly issues: readonly [];
    }
  | {
      readonly ok: false;
      readonly issues: readonly ProviderClearingAccountIssue[];
    };
function failure(
  code: ProviderClearingAccountIssue["code"],
  path: string,
  message: string,
): ProviderClearingAccountValidationResult {
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
function providerReference(
  input: unknown,
): ProviderClearingReference | undefined {
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
export function validateProviderClearingAccountCandidate(
  input: unknown,
): ProviderClearingAccountValidationResult {
  const data = record(input, [
    "contractVersion",
    "role",
    "provider",
    "account",
  ]);
  if (!data)
    return failure(
      "invalid_shape",
      "$",
      "A strict provider-clearing account record is required.",
    );
  if (data.contractVersion !== PROVIDER_CLEARING_ACCOUNT_CONTRACT_VERSION)
    return failure(
      "invalid_version",
      "$.contractVersion",
      "Unsupported provider-clearing contract version.",
    );
  if (data.role !== "provider_clearing")
    return failure(
      "invalid_role",
      "$.role",
      "Explicit provider_clearing role is required.",
    );
  const provider = providerReference(data.provider);
  if (!provider)
    return failure(
      "invalid_reference",
      "$.provider",
      "An explicit canonical provider reference is required.",
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
      "Provider clearing requires explicit asset/debit-normal metadata.",
    );
  return Object.freeze({
    ok: true,
    value: Object.freeze({
      contractVersion: PROVIDER_CLEARING_ACCOUNT_CONTRACT_VERSION,
      role: "provider_clearing",
      provider,
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
/** Pure single-currency provider-clearing example/context check; not a posting eligibility engine. */
export function validateProviderClearingJournalCandidate(
  input: unknown,
  clearing: unknown,
  suppliedContext: unknown,
): LedgerJournalValidationResult {
  const role = validateProviderClearingAccountCandidate(clearing);
  if (!role.ok)
    return contextFailure(
      "$.context.providerClearing",
      "A valid explicit provider-clearing role snapshot is required.",
    );
  const context = record(suppliedContext, ["provider", "accounts"]);
  if (!context)
    return contextFailure(
      "$.context",
      "A strict provider and Account context is required.",
    );
  const provider = providerReference(context.provider);
  if (
    !provider ||
    provider.namespace !== role.value.provider.namespace ||
    provider.id !== role.value.provider.id
  )
    return contextFailure(
      "$.context.provider",
      "Caller provider context must match the configured reference exactly.",
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
      "$.context.providerClearing.account",
      "Provider clearing snapshot must match the supplied catalog exactly.",
    );
  if (account.status !== "active")
    return contextFailure(
      "$.context.providerClearing.account.status",
      "New provider-clearing candidates require active clearing metadata.",
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
      "Provider clearing candidates require the explicit account ledger and one currency.",
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
