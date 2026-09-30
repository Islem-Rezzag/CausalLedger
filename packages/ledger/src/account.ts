declare const accountBrand: unique symbol;
type Brand<T, Name extends string> = T & { readonly [accountBrand]: Name };

export const ACCOUNT_CONTRACT_VERSION = "m04.01-account.v1" as const;
export const ACCOUNT_CATEGORIES = Object.freeze([
  "asset",
  "liability",
  "equity",
  "revenue",
  "expense",
] as const);
export const ACCOUNT_CURRENCIES = Object.freeze(["USD", "EUR", "GBP"] as const);
export const ACCOUNT_STATUSES = Object.freeze(["active", "closed"] as const);
export const ACCOUNT_NORMAL_BALANCES = Object.freeze({
  asset: "debit",
  liability: "credit",
  equity: "credit",
  revenue: "credit",
  expense: "debit",
} as const);

export type AccountId = Brand<`acct_${string}`, "AccountId">;
export type LedgerId = Brand<`ldg_${string}`, "LedgerId">;
export type AccountCategory = (typeof ACCOUNT_CATEGORIES)[number];
export type AccountCurrency = (typeof ACCOUNT_CURRENCIES)[number];
export type AccountStatus = (typeof ACCOUNT_STATUSES)[number];

/** An opaque caller-supplied reference, never an authentication or ownership proof. */
export interface AccountOwnerReference {
  readonly namespace: string;
  readonly id: string;
}

type AccountClassification =
  | { readonly category: "asset" | "expense"; readonly normalBalance: "debit" }
  | {
      readonly category: "liability" | "equity" | "revenue";
      readonly normalBalance: "credit";
    };

export type AccountCandidate = AccountClassification & {
  readonly contractVersion: typeof ACCOUNT_CONTRACT_VERSION;
  readonly id: string;
  readonly ledgerId: string;
  readonly name: string;
  readonly currency: AccountCurrency;
  readonly owner: AccountOwnerReference;
  readonly status: AccountStatus;
};

/** A validated immutable metadata snapshot; no account has been created or stored. */
export type Account = Omit<
  AccountCandidate,
  "id" | "ledgerId" | "category" | "normalBalance"
> &
  AccountClassification & {
    readonly id: AccountId;
    readonly ledgerId: LedgerId;
  };

export type AccountIssueCode =
  | "invalid_object"
  | "invalid_array"
  | "required_field"
  | "unknown_field"
  | "invalid_type"
  | "invalid_identifier"
  | "invalid_name"
  | "unsupported_value"
  | "normal_balance_mismatch"
  | "duplicate_account_id";

export interface AccountValidationIssue {
  readonly code: AccountIssueCode;
  readonly path: string;
  readonly message: string;
}

export type AccountValidationResult =
  | { readonly ok: true; readonly value: Account; readonly issues: readonly [] }
  | { readonly ok: false; readonly issues: readonly AccountValidationIssue[] };

export type AccountCatalogValidationResult =
  | {
      readonly ok: true;
      readonly value: readonly Account[];
      readonly issues: readonly [];
    }
  | { readonly ok: false; readonly issues: readonly AccountValidationIssue[] };

const ROOT_FIELDS = [
  "contractVersion",
  "id",
  "ledgerId",
  "name",
  "category",
  "currency",
  "owner",
  "status",
  "normalBalance",
] as const;
const OWNER_FIELDS = ["namespace", "id"] as const;
const ACCOUNT_ID = /^acct_[0-7][0-9A-HJKMNP-TV-Z]{25}$/;
const LEDGER_ID = /^ldg_[0-7][0-9A-HJKMNP-TV-Z]{25}$/;
const OWNER_NAMESPACE = /^[a-z][a-z0-9.-]{0,63}$/;
const OWNER_ID = /^[A-Za-z0-9][A-Za-z0-9._:-]{0,127}$/;
const NO_ISSUES = Object.freeze([]) as readonly [];

function issue(
  issues: AccountValidationIssue[],
  code: AccountIssueCode,
  path: string,
  message: string,
): void {
  issues.push({ code, path, message });
}

function finishIssues(
  issues: AccountValidationIssue[],
): readonly AccountValidationIssue[] {
  const compare = (a: string, b: string): number =>
    a < b ? -1 : a > b ? 1 : 0;
  return Object.freeze(
    issues
      .sort((a, b) => compare(a.path, b.path) || compare(a.code, b.code))
      .map((entry) => Object.freeze(entry)),
  );
}

/** Read only enumerable own data properties: do not execute input getters. */
function record(
  input: unknown,
  fields: readonly string[],
  path: string,
  issues: AccountValidationIssue[],
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
        continue;
      }
      const descriptor = descriptors[key];
      if (!fields.includes(key)) {
        issue(issues, "unknown_field", `${path}.${key}`, "Unknown field.");
      } else if (
        !descriptor ||
        !("value" in descriptor) ||
        !descriptor.enumerable
      ) {
        issue(
          issues,
          "invalid_type",
          `${path}.${key}`,
          "Expected an enumerable own data field.",
        );
      } else {
        output[key] = descriptor.value as unknown;
      }
    }
    for (const key of fields) {
      if (!Object.hasOwn(descriptors, key))
        issue(
          issues,
          "required_field",
          `${path}.${key}`,
          "Required field is missing.",
        );
    }
    return output;
  } catch {
    issue(issues, "invalid_object", path, "Unable to inspect data object.");
    return undefined;
  }
}

function stringField(
  data: Record<string, unknown>,
  key: string,
  path: string,
  issues: AccountValidationIssue[],
): string | undefined {
  if (!Object.hasOwn(data, key)) return undefined;
  const value = data[key];
  if (typeof value !== "string") {
    issue(
      issues,
      "invalid_type",
      `${path}.${key}`,
      "Expected a string without coercion.",
    );
    return undefined;
  }
  return value;
}

function member<T extends string>(
  value: string | undefined,
  allowed: readonly T[],
  path: string,
  issues: AccountValidationIssue[],
): value is T {
  if (value === undefined) return false;
  if (!allowed.includes(value as T)) {
    issue(issues, "unsupported_value", path, "Unsupported canonical value.");
    return false;
  }
  return true;
}

function parseAccount(
  input: unknown,
  path: string,
  issues: AccountValidationIssue[],
): Account | undefined {
  const before = issues.length;
  const data = record(input, ROOT_FIELDS, path, issues);
  if (!data) return undefined;
  const version = stringField(data, "contractVersion", path, issues);
  member(
    version,
    [ACCOUNT_CONTRACT_VERSION],
    `${path}.contractVersion`,
    issues,
  );
  const id = stringField(data, "id", path, issues);
  const ledgerId = stringField(data, "ledgerId", path, issues);
  if (id !== undefined && !ACCOUNT_ID.test(id))
    issue(
      issues,
      "invalid_identifier",
      `${path}.id`,
      "Expected acct_ followed by a canonical 128-bit ULID.",
    );
  if (ledgerId !== undefined && !LEDGER_ID.test(ledgerId))
    issue(
      issues,
      "invalid_identifier",
      `${path}.ledgerId`,
      "Expected ldg_ followed by a canonical 128-bit ULID.",
    );
  const name = stringField(data, "name", path, issues);
  if (
    name !== undefined &&
    (name.length === 0 ||
      name.length > 120 ||
      name.trim() !== name ||
      [...name].some(
        (char) => char.charCodeAt(0) < 32 || char.charCodeAt(0) === 127,
      ))
  ) {
    issue(
      issues,
      "invalid_name",
      `${path}.name`,
      "Expected 1-120 characters without surrounding whitespace or ASCII controls.",
    );
  }
  const category = stringField(data, "category", path, issues);
  const currency = stringField(data, "currency", path, issues);
  const status = stringField(data, "status", path, issues);
  const normalBalance = stringField(data, "normalBalance", path, issues);
  const validCategory = member(
    category,
    ACCOUNT_CATEGORIES,
    `${path}.category`,
    issues,
  );
  const validCurrency = member(
    currency,
    ACCOUNT_CURRENCIES,
    `${path}.currency`,
    issues,
  );
  const validStatus = member(
    status,
    ACCOUNT_STATUSES,
    `${path}.status`,
    issues,
  );
  const validSide = member(
    normalBalance,
    ["debit", "credit"],
    `${path}.normalBalance`,
    issues,
  );
  if (
    validCategory &&
    validSide &&
    ACCOUNT_NORMAL_BALANCES[category] !== normalBalance
  ) {
    issue(
      issues,
      "normal_balance_mismatch",
      `${path}.normalBalance`,
      "Normal side conflicts with account category.",
    );
  }
  const owner = Object.hasOwn(data, "owner")
    ? record(data.owner, OWNER_FIELDS, `${path}.owner`, issues)
    : undefined;
  const namespace = owner
    ? stringField(owner, "namespace", `${path}.owner`, issues)
    : undefined;
  const ownerId = owner
    ? stringField(owner, "id", `${path}.owner`, issues)
    : undefined;
  if (namespace !== undefined && !OWNER_NAMESPACE.test(namespace))
    issue(
      issues,
      "invalid_identifier",
      `${path}.owner.namespace`,
      "Expected a canonical lowercase owner namespace, at most 64 characters.",
    );
  if (ownerId !== undefined && !OWNER_ID.test(ownerId))
    issue(
      issues,
      "invalid_identifier",
      `${path}.owner.id`,
      "Expected an opaque owner reference of 1-128 identifier characters.",
    );
  if (
    issues.length !== before ||
    version !== ACCOUNT_CONTRACT_VERSION ||
    id === undefined ||
    ledgerId === undefined ||
    name === undefined ||
    !validCategory ||
    !validCurrency ||
    !validStatus ||
    !validSide ||
    namespace === undefined ||
    ownerId === undefined
  )
    return undefined;
  // The category/side relationship was validated above. Copy only checked fields.
  return Object.freeze({
    contractVersion: version,
    id: id as AccountId,
    ledgerId: ledgerId as LedgerId,
    name,
    category,
    currency,
    status,
    normalBalance,
    owner: Object.freeze({ namespace, id: ownerId }),
  }) as Account;
}

/** Pure shape/consistency validation, not creation, approval, persistence or financial truth. */
export function validateAccountCandidate(
  input: unknown,
): AccountValidationResult {
  const issues: AccountValidationIssue[] = [];
  const value = parseAccount(input, "$", issues);
  return value
    ? Object.freeze({ ok: true, value, issues: NO_ISSUES })
    : Object.freeze({ ok: false, issues: finishIssues(issues) });
}

/** Validate one supplied snapshot atomically; duplicate IDs never establish idempotency. */
export function validateAccountCatalog(
  input: unknown,
): AccountCatalogValidationResult {
  const issues: AccountValidationIssue[] = [];
  const values: Account[] = [];
  const seen = new Set<AccountId>();
  try {
    if (
      !Array.isArray(input) ||
      Object.getPrototypeOf(input) !== Array.prototype
    ) {
      issue(issues, "invalid_array", "$", "Expected a dense data array.");
    } else {
      const descriptors = Object.getOwnPropertyDescriptors(input);
      const length = input.length;
      if (Reflect.ownKeys(descriptors).length !== length + 1) {
        issue(
          issues,
          "invalid_array",
          "$",
          "Sparse arrays and extra properties are unsupported.",
        );
        return Object.freeze({ ok: false, issues: finishIssues(issues) });
      }
      for (let i = 0; i < length; i += 1) {
        const descriptor = descriptors[String(i)];
        if (!descriptor || !("value" in descriptor) || !descriptor.enumerable) {
          issue(
            issues,
            "invalid_array",
            `$[${i}]`,
            "Expected an enumerable own array element.",
          );
          continue;
        }
        const value = parseAccount(
          descriptor.value as unknown,
          `$[${i}]`,
          issues,
        );
        if (value) {
          if (seen.has(value.id))
            issue(
              issues,
              "duplicate_account_id",
              `$[${i}].id`,
              "Account ID is repeated in the supplied catalog.",
            );
          seen.add(value.id);
          values.push(value);
        }
      }
    }
  } catch {
    issue(issues, "invalid_array", "$", "Unable to inspect data array.");
  }
  return issues.length
    ? Object.freeze({ ok: false, issues: finishIssues(issues) })
    : Object.freeze({
        ok: true,
        value: Object.freeze(values),
        issues: NO_ISSUES,
      });
}
