import pg from "pg";
import { validateAccountCandidate } from "./account.js";
import type { Account, AccountCandidate, AccountIssueCode } from "./account.js";

export const LEDGER_ACCOUNT_BALANCE_CONTRACT_VERSION =
  "m04.06-account-balance.v1" as const;
export interface LedgerAccountBalanceQueryCandidate {
  readonly contractVersion: typeof LEDGER_ACCOUNT_BALANCE_CONTRACT_VERSION;
  readonly account: AccountCandidate;
  readonly signConvention: "account_normal_positive";
  readonly cutoffs: {
    readonly effectiveThrough: string;
    readonly recordedThrough: string;
  };
}
export type LedgerAccountBalanceQuery = Omit<
  LedgerAccountBalanceQueryCandidate,
  "account"
> & { readonly account: Account };
declare const balanceBrand: unique symbol;
/** Signed aggregate, with no per-entry int64 limit. Not a positive entry amount. */
export type LedgerAccountBalanceMinorUnits = bigint & {
  readonly [balanceBrand]: "LedgerAccountBalanceMinorUnits";
};
export interface LedgerAccountBalance {
  readonly contractVersion: typeof LEDGER_ACCOUNT_BALANCE_CONTRACT_VERSION;
  readonly query: LedgerAccountBalanceQuery;
  readonly debitMinorUnits: bigint;
  readonly creditMinorUnits: bigint;
  readonly balanceMinorUnits: LedgerAccountBalanceMinorUnits;
  readonly entryCount: bigint;
  readonly transactionCount: bigint;
  readonly databaseSnapshot: string;
  readonly statusScope: "all_stored_headers";
}
export type LedgerAccountBalanceIssueCode =
  | AccountIssueCode
  | "invalid_timestamp"
  | "conflicting_account_snapshot";
export interface LedgerAccountBalanceIssue {
  readonly code: LedgerAccountBalanceIssueCode;
  readonly path: string;
  readonly message: string;
}
export type LedgerAccountBalanceQueryValidationResult =
  | {
      readonly ok: true;
      readonly value: LedgerAccountBalanceQuery;
      readonly issues: readonly [];
    }
  | {
      readonly ok: false;
      readonly issues: readonly LedgerAccountBalanceIssue[];
    };
export type LedgerAccountBalanceResult =
  | {
      readonly ok: true;
      readonly value: LedgerAccountBalance;
      readonly issues: readonly [];
    }
  | {
      readonly ok: false;
      readonly issues: readonly LedgerAccountBalanceIssue[];
    };
export interface LedgerAccountBalanceReader {
  query(input: unknown): Promise<LedgerAccountBalanceResult>;
  close(): Promise<void>;
}
export class LedgerAccountBalanceReadError extends Error {
  readonly sqlState: string | null;
  constructor(sqlState: string | null = null) {
    super("Unable to read a complete account balance snapshot.");
    this.name = "LedgerAccountBalanceReadError";
    this.sqlState = sqlState;
  }
}
const EMPTY = Object.freeze([]) as readonly [];
type Issues = LedgerAccountBalanceIssue[];
function issue(
  issues: Issues,
  code: LedgerAccountBalanceIssueCode,
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
    const data: Record<string, unknown> = Object.create(null) as Record<
      string,
      unknown
    >;
    for (const key of Reflect.ownKeys(descriptors)) {
      if (typeof key !== "string" || !fields.includes(key)) {
        issue(
          issues,
          "unknown_field",
          typeof key === "string" ? `${path}.${key}` : path,
          "Unknown field.",
        );
      } else {
        const descriptor = descriptors[key];
        if (!descriptor || !("value" in descriptor) || !descriptor.enumerable)
          issue(
            issues,
            "invalid_type",
            `${path}.${key}`,
            "Expected an own enumerable data field.",
          );
        else data[key] = descriptor.value as unknown;
      }
    }
    for (const field of fields)
      if (!Object.hasOwn(descriptors, field))
        issue(
          issues,
          "required_field",
          `${path}.${field}`,
          "Required field is missing.",
        );
    return data;
  } catch {
    issue(issues, "invalid_object", path, "Unable to inspect data object.");
    return undefined;
  }
}
function failure(issues: Issues): LedgerAccountBalanceQueryValidationResult & {
  readonly ok: false;
} {
  const compare = (a: string, b: string): number =>
    a < b ? -1 : a > b ? 1 : 0;
  return Object.freeze({
    ok: false as const,
    issues: Object.freeze(
      issues
        .sort((a, b) => compare(a.path, b.path) || compare(a.code, b.code))
        .map((value) => Object.freeze(value)),
    ),
  });
}
function instant(
  value: unknown,
  path: string,
  issues: Issues,
): value is string {
  if (typeof value !== "string") {
    issue(
      issues,
      "invalid_type",
      path,
      "Expected a canonical UTC instant string.",
    );
    return false;
  }
  const format =
    /^(?!0000)[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]{3}Z$/;
  const milliseconds = format.test(value) ? Date.parse(value) : NaN;
  if (
    !Number.isFinite(milliseconds) ||
    new Date(milliseconds).toISOString() !== value
  ) {
    issue(
      issues,
      "invalid_timestamp",
      path,
      "Expected a real UTC instant with milliseconds, years 0001-9999.",
    );
    return false;
  }
  return true;
}
export function validateLedgerAccountBalanceQueryCandidate(
  input: unknown,
): LedgerAccountBalanceQueryValidationResult {
  const issues: Issues = [];
  const data = record(
    input,
    ["contractVersion", "account", "signConvention", "cutoffs"],
    "$",
    issues,
  );
  if (!data) return failure(issues);
  for (const [field, expected] of [
    ["contractVersion", LEDGER_ACCOUNT_BALANCE_CONTRACT_VERSION],
    ["signConvention", "account_normal_positive"],
  ] as const)
    if (Object.hasOwn(data, field) && data[field] !== expected)
      issue(
        issues,
        "unsupported_value",
        `$.${field}`,
        "Unsupported explicit contract value.",
      );
  const account = Object.hasOwn(data, "account")
    ? validateAccountCandidate(data.account)
    : undefined;
  if (account && !account.ok)
    for (const value of account.issues)
      issue(
        issues,
        value.code,
        "$.account" + value.path.slice(1),
        value.message,
      );
  const cutoffs = Object.hasOwn(data, "cutoffs")
    ? record(
        data.cutoffs,
        ["effectiveThrough", "recordedThrough"],
        "$.cutoffs",
        issues,
      )
    : undefined;
  if (cutoffs)
    for (const field of ["effectiveThrough", "recordedThrough"] as const)
      if (Object.hasOwn(cutoffs, field))
        instant(cutoffs[field], `$.cutoffs.${field}`, issues);
  if (issues.length || !account?.ok || !cutoffs) return failure(issues);
  return Object.freeze({
    ok: true as const,
    value: Object.freeze({
      contractVersion: LEDGER_ACCOUNT_BALANCE_CONTRACT_VERSION,
      account: account.value,
      signConvention: "account_normal_positive" as const,
      cutoffs: Object.freeze({
        effectiveThrough: cutoffs.effectiveThrough as string,
        recordedThrough: cutoffs.recordedThrough as string,
      }),
    }),
    issues: EMPTY,
  });
}
const AGGREGATE = `SELECT
  COALESCE(sum(e.minor_units::numeric) FILTER (WHERE e.side = 'debit'), 0)::text AS debit_minor_units,
  COALESCE(sum(e.minor_units::numeric) FILTER (WHERE e.side = 'credit'), 0)::text AS credit_minor_units,
  count(*)::text AS entry_count,
  count(DISTINCT e.transaction_id)::text AS transaction_count,
  count(*) FILTER (WHERE s.snapshot->'account'->>'normalBalance' IS DISTINCT FROM $6::text
    OR s.snapshot->'account'->>'category' IS DISTINCT FROM $7::text)::text AS conflicts,
  pg_catalog.pg_current_snapshot()::text AS database_snapshot
FROM public.ledger_entries AS e
JOIN public.ledger_transactions AS t ON t.id = e.transaction_id AND t.ledger_id = e.ledger_id
JOIN public.ledger_account_snapshots AS s ON s.transaction_id = e.transaction_id
  AND s.account_id = e.account_id AND s.ledger_id = e.ledger_id AND s.currency = e.currency
WHERE e.ledger_id = $1 AND e.account_id = $2 AND e.currency = $3
  AND (t.header->>'effectiveAt') COLLATE "C" <= $4::text COLLATE "C"
  AND (t.header->>'recordedAt') COLLATE "C" <= $5::text COLLATE "C"`;
function unsigned(value: unknown): bigint {
  if (
    typeof value !== "string" ||
    value.match(/^(?:0|[1-9][0-9]*)$/)?.[0] !== value
  )
    throw new LedgerAccountBalanceReadError();
  return BigInt(value);
}
function snapshot(value: unknown): string {
  if (
    typeof value !== "string" ||
    value.match(
      /^(?:0|[1-9][0-9]*):(?:0|[1-9][0-9]*):(?:[1-9][0-9]*(?:,[1-9][0-9]*)*)?$/,
    )?.[0] !== value
  )
    throw new LedgerAccountBalanceReadError();
  const [lower, upper, active] = value.split(":");
  if (lower === undefined || upper === undefined || active === undefined)
    throw new LedgerAccountBalanceReadError();
  const xmin = BigInt(lower),
    xmax = BigInt(upper);
  if (xmin > xmax) throw new LedgerAccountBalanceReadError();
  let prior = xmin - 1n;
  for (const id of active ? active.split(",") : []) {
    const next = BigInt(id);
    if (next <= prior || next < xmin || next >= xmax)
      throw new LedgerAccountBalanceReadError();
    prior = next;
  }
  return value;
}
function sqlState(error: unknown): string | null {
  if (typeof error !== "object" || error === null) return null;
  try {
    const value = Object.getOwnPropertyDescriptor(error, "code")
      ?.value as unknown;
    return typeof value === "string" &&
      /^[0-9A-Z]{5}$/.test(value) &&
      value.length === 5
      ? value
      : null;
  } catch {
    return null;
  }
}
export function createLedgerAccountBalanceReader(
  explicitConnectionUrl: string,
): Readonly<LedgerAccountBalanceReader> {
  let url: URL;
  if (typeof explicitConnectionUrl !== "string")
    throw new Error(
      "A complete explicit PostgreSQL connection URL is required.",
    );
  try {
    url = new URL(explicitConnectionUrl);
  } catch {
    throw new Error(
      "A complete explicit PostgreSQL connection URL is required.",
    );
  }
  if (
    !["postgres:", "postgresql:"].includes(url.protocol) ||
    !url.hostname ||
    !/^[1-9][0-9]*$/.test(url.port) ||
    Number(url.port) > 65535 ||
    !url.username ||
    !url.password ||
    url.pathname.length < 2 ||
    url.search ||
    url.hash
  )
    throw new Error(
      "A complete explicit PostgreSQL connection URL is required.",
    );
  const pool = new pg.Pool({
    connectionString: url.href,
    max: 1,
    connectionTimeoutMillis: 5000,
  });
  pool.on("error", () => {
    /* Idle connection errors never expose database diagnostics. */
  });
  return Object.freeze({
    async query(input: unknown): Promise<LedgerAccountBalanceResult> {
      const checked = validateLedgerAccountBalanceQueryCandidate(input);
      if (!checked.ok) return checked;
      let client: pg.PoolClient;
      try {
        client = await pool.connect();
      } catch (error) {
        throw new LedgerAccountBalanceReadError(sqlState(error));
      }
      let begun = false,
        failed = false;
      try {
        await client.query(
          "BEGIN TRANSACTION ISOLATION LEVEL REPEATABLE READ READ ONLY",
        );
        begun = true;
        const { account, cutoffs } = checked.value;
        const response = await client.query(AGGREGATE, [
          account.ledgerId,
          account.id,
          account.currency,
          cutoffs.effectiveThrough,
          cutoffs.recordedThrough,
          account.normalBalance,
          account.category,
        ]);
        if (response.rows.length !== 1)
          throw new LedgerAccountBalanceReadError();
        const rowIssues: Issues = [];
        const row = record(
          response.rows[0],
          [
            "debit_minor_units",
            "credit_minor_units",
            "entry_count",
            "transaction_count",
            "conflicts",
            "database_snapshot",
          ],
          "$",
          rowIssues,
        );
        if (!row || rowIssues.length) throw new LedgerAccountBalanceReadError();
        const debit = unsigned(row.debit_minor_units),
          credit = unsigned(row.credit_minor_units);
        const entries = unsigned(row.entry_count),
          transactions = unsigned(row.transaction_count),
          conflicts = unsigned(row.conflicts);
        const databaseSnapshot = snapshot(row.database_snapshot);
        if (
          transactions > entries ||
          conflicts > entries ||
          (entries === 0n
            ? transactions !== 0n || debit !== 0n || credit !== 0n
            : transactions === 0n || debit + credit === 0n)
        )
          throw new LedgerAccountBalanceReadError();
        const result: LedgerAccountBalanceResult =
          conflicts > 0n
            ? failure([
                {
                  code: "conflicting_account_snapshot",
                  path: "$.account",
                  message:
                    "Contributing stored Account category or normal side conflicts with supplied metadata.",
                },
              ])
            : Object.freeze({
                ok: true as const,
                issues: EMPTY,
                value: Object.freeze({
                  contractVersion: LEDGER_ACCOUNT_BALANCE_CONTRACT_VERSION,
                  query: checked.value,
                  debitMinorUnits: debit,
                  creditMinorUnits: credit,
                  balanceMinorUnits: (account.normalBalance === "debit"
                    ? debit - credit
                    : credit - debit) as LedgerAccountBalanceMinorUnits,
                  entryCount: entries,
                  transactionCount: transactions,
                  databaseSnapshot,
                  statusScope: "all_stored_headers" as const,
                }),
              });
        await client.query("COMMIT");
        return result;
      } catch (error) {
        failed = true;
        if (begun) {
          try {
            await client.query("ROLLBACK");
          } catch {
            /* Preserve sanitized original failure and destroy this session. */
          }
        }
        throw error instanceof LedgerAccountBalanceReadError
          ? error
          : new LedgerAccountBalanceReadError(sqlState(error));
      } finally {
        client.release(failed);
      }
    },
    async close(): Promise<void> {
      await pool.end();
    },
  });
}
