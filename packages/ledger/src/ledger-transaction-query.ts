import pg from "pg";
import { validateAccountCatalog } from "./account.js";
import type { Account, AccountCurrency, AccountIssueCode } from "./account.js";
import { validateLedgerJournalCandidate } from "./ledger-journal.js";
import type { LedgerJournal } from "./ledger-journal.js";

export const LEDGER_TRANSACTION_QUERY_CONTRACT_VERSION =
  "m04.07-transaction-query.v1" as const;
export interface LedgerTransactionQueryPage {
  readonly size: number;
  readonly afterTransactionId: string | null;
}
export type LedgerTransactionQuerySelection =
  | { readonly kind: "transaction_id"; readonly transactionId: string }
  | {
      readonly kind: "source_reference";
      readonly source: { readonly namespace: string; readonly id: string };
      readonly page: LedgerTransactionQueryPage;
    }
  | {
      readonly kind: "account_currency";
      readonly accountId: string;
      readonly currency: AccountCurrency;
      readonly page: LedgerTransactionQueryPage;
    };
export interface LedgerTransactionQueryCandidate {
  readonly contractVersion: typeof LEDGER_TRANSACTION_QUERY_CONTRACT_VERSION;
  readonly ledgerId: string;
  readonly selection: LedgerTransactionQuerySelection;
  readonly cutoffs: {
    readonly effectiveThrough: string;
    readonly recordedThrough: string;
  };
}
export type LedgerTransactionQuery = LedgerTransactionQueryCandidate;
export type LedgerTransactionQueryIssueCode =
  | AccountIssueCode
  | "invalid_timestamp"
  | "invalid_page";
export interface LedgerTransactionQueryIssue {
  readonly code: LedgerTransactionQueryIssueCode;
  readonly path: string;
  readonly message: string;
}
export type LedgerTransactionQueryValidationResult =
  | {
      readonly ok: true;
      readonly value: LedgerTransactionQuery;
      readonly issues: readonly [];
    }
  | {
      readonly ok: false;
      readonly issues: readonly LedgerTransactionQueryIssue[];
    };
export interface LedgerTransactionQueryRecord {
  readonly journal: LedgerJournal;
  readonly accounts: readonly Account[];
  readonly entryCount: bigint;
  readonly accountCount: bigint;
}
export interface LedgerTransactionQueryOutput {
  readonly contractVersion: typeof LEDGER_TRANSACTION_QUERY_CONTRACT_VERSION;
  readonly query: LedgerTransactionQuery;
  readonly transactions: readonly LedgerTransactionQueryRecord[];
  readonly nextAfterTransactionId: string | null;
  readonly databaseSnapshot: string;
  readonly statusScope: "all_stored_headers";
}
export type LedgerTransactionQueryResult =
  | {
      readonly ok: true;
      readonly value: LedgerTransactionQueryOutput;
      readonly issues: readonly [];
    }
  | {
      readonly ok: false;
      readonly issues: readonly LedgerTransactionQueryIssue[];
    };
export interface LedgerTransactionReader {
  query(input: unknown): Promise<LedgerTransactionQueryResult>;
  close(): Promise<void>;
}
export class LedgerTransactionReadError extends Error {
  readonly sqlState: string | null;
  constructor(sqlState: string | null = null) {
    super("Unable to read complete transaction journals from one snapshot.");
    this.name = "LedgerTransactionReadError";
    this.sqlState = sqlState;
  }
}
const EMPTY = Object.freeze([]) as readonly [];
type Issues = LedgerTransactionQueryIssue[];
function issue(
  issues: Issues,
  code: LedgerTransactionQueryIssueCode,
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
function failure(issues: Issues): LedgerTransactionQueryValidationResult & {
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

const ULID = "[0-7][0-9A-HJKMNP-TV-Z]{25}";
function matches(value: unknown, format: RegExp): value is string {
  return typeof value === "string" && value.match(format)?.[0] === value;
}
function identifier(
  value: unknown,
  prefix: string,
  path: string,
  issues: Issues,
): void {
  if (!matches(value, new RegExp("^" + prefix + "_" + ULID + "$")))
    issue(
      issues,
      "invalid_identifier",
      path,
      "Expected a canonical prefixed identifier.",
    );
}
export function validateLedgerTransactionQueryCandidate(
  input: unknown,
): LedgerTransactionQueryValidationResult {
  const issues: Issues = [];
  const data = record(
    input,
    ["contractVersion", "ledgerId", "selection", "cutoffs"],
    "$",
    issues,
  );
  if (!data) return failure(issues);
  if (
    Object.hasOwn(data, "contractVersion") &&
    data.contractVersion !== LEDGER_TRANSACTION_QUERY_CONTRACT_VERSION
  )
    issue(
      issues,
      "unsupported_value",
      "$.contractVersion",
      "Unsupported explicit contract version.",
    );
  if (Object.hasOwn(data, "ledgerId"))
    identifier(data.ledgerId, "ldg", "$.ledgerId", issues);
  let kind: unknown;
  try {
    if (typeof data.selection === "object" && data.selection !== null)
      kind = Object.getOwnPropertyDescriptor(data.selection, "kind")
        ?.value as unknown;
  } catch {
    /* record reports malformed data */
  }
  const fields =
    kind === "transaction_id"
      ? ["kind", "transactionId"]
      : kind === "source_reference"
        ? ["kind", "source", "page"]
        : kind === "account_currency"
          ? ["kind", "accountId", "currency", "page"]
          : ["kind"];
  const selection = Object.hasOwn(data, "selection")
    ? record(data.selection, fields, "$.selection", issues)
    : undefined;
  let chosen: LedgerTransactionQuerySelection | undefined;
  if (selection) {
    if (kind === "transaction_id") {
      identifier(
        selection.transactionId,
        "txn",
        "$.selection.transactionId",
        issues,
      );
      chosen = Object.freeze({
        kind,
        transactionId: selection.transactionId as string,
      });
    } else if (kind === "source_reference" || kind === "account_currency") {
      const page = record(
        selection.page,
        ["size", "afterTransactionId"],
        "$.selection.page",
        issues,
      );
      if (page) {
        if (
          typeof page.size !== "number" ||
          !Number.isInteger(page.size) ||
          page.size < 1 ||
          page.size > 50
        )
          issue(
            issues,
            "invalid_page",
            "$.selection.page.size",
            "Expected an integer journal count from 1 through 50.",
          );
        if (page.afterTransactionId !== null)
          identifier(
            page.afterTransactionId,
            "txn",
            "$.selection.page.afterTransactionId",
            issues,
          );
      }
      const frozenPage = Object.freeze({
        size: page?.size as number,
        afterTransactionId: page?.afterTransactionId as string | null,
      });
      if (kind === "source_reference") {
        const source = record(
          selection.source,
          ["namespace", "id"],
          "$.selection.source",
          issues,
        );
        if (source) {
          if (!matches(source.namespace, /^[a-z][a-z0-9.-]{0,63}$/))
            issue(
              issues,
              "invalid_identifier",
              "$.selection.source.namespace",
              "Expected a canonical source namespace.",
            );
          if (!matches(source.id, /^[A-Za-z0-9][A-Za-z0-9._:-]{0,127}$/))
            issue(
              issues,
              "invalid_identifier",
              "$.selection.source.id",
              "Expected a canonical source reference.",
            );
          chosen = Object.freeze({
            kind,
            source: Object.freeze({
              namespace: source.namespace as string,
              id: source.id as string,
            }),
            page: frozenPage,
          });
        }
      } else {
        identifier(
          selection.accountId,
          "acct",
          "$.selection.accountId",
          issues,
        );
        if (
          !["USD", "EUR", "GBP"].includes(selection.currency as string) ||
          typeof selection.currency !== "string"
        )
          issue(
            issues,
            "unsupported_value",
            "$.selection.currency",
            "Unsupported explicit currency.",
          );
        chosen = Object.freeze({
          kind,
          accountId: selection.accountId as string,
          currency: selection.currency as AccountCurrency,
          page: frozenPage,
        });
      }
    } else
      issue(
        issues,
        "unsupported_value",
        "$.selection.kind",
        "Unsupported explicit selection kind.",
      );
  }
  const cutoffs = Object.hasOwn(data, "cutoffs")
    ? record(
        data.cutoffs,
        ["effectiveThrough", "recordedThrough"],
        "$.cutoffs",
        issues,
      )
    : undefined;
  if (cutoffs)
    for (const key of ["effectiveThrough", "recordedThrough"] as const)
      if (Object.hasOwn(cutoffs, key))
        instant(cutoffs[key], `$.cutoffs.${key}`, issues);
  if (issues.length || !chosen || !cutoffs) return failure(issues);
  return Object.freeze({
    ok: true as const,
    issues: EMPTY,
    value: Object.freeze({
      contractVersion: LEDGER_TRANSACTION_QUERY_CONTRACT_VERSION,
      ledgerId: data.ledgerId as string,
      selection: chosen,
      cutoffs: Object.freeze({
        effectiveThrough: cutoffs.effectiveThrough as string,
        recordedThrough: cutoffs.recordedThrough as string,
      }),
    }),
  });
}
const AGGREGATE = `WITH selected AS (
  SELECT t.id, t.ledger_id, t.journal_version, t.header
  FROM public.ledger_transactions AS t
  WHERE t.ledger_id = $1
    AND ($2::text IS NULL OR t.id = $2)
    AND ($3::text IS NULL OR (t.header->'provenance'->'source'->>'namespace' = $3 AND t.header->'provenance'->'source'->>'id' = $4))
    AND ($5::text IS NULL OR EXISTS (SELECT 1 FROM public.ledger_entries AS member
      WHERE member.transaction_id = t.id AND member.ledger_id = t.ledger_id AND member.account_id = $5 AND member.currency = $6))
    AND (t.header->>'effectiveAt') COLLATE "C" <= $7::text COLLATE "C"
    AND (t.header->>'recordedAt') COLLATE "C" <= $8::text COLLATE "C"
    AND ($9::text IS NULL OR t.id COLLATE "C" > $9::text COLLATE "C")
  ORDER BY t.id COLLATE "C" LIMIT $10::integer
)
SELECT pg_catalog.pg_current_snapshot()::text AS database_snapshot,
  COALESCE(jsonb_agg(jsonb_build_object(
    'journal', jsonb_build_object('contractVersion', t.journal_version, 'transaction', t.header, 'entries',
      (SELECT COALESCE(jsonb_agg(jsonb_build_object('contractVersion', e.contract_version, 'id', e.id,
        'transactionId', e.transaction_id, 'ledgerId', e.ledger_id, 'accountId', e.account_id, 'side', e.side,
        'amount', jsonb_build_object('representation', 'integer_minor_units', 'minorUnits', e.minor_units::text, 'currency', e.currency))
        ORDER BY e.id COLLATE "C"), '[]'::jsonb) FROM public.ledger_entries AS e WHERE e.transaction_id = t.id AND e.ledger_id = t.ledger_id)),
    'accounts', (SELECT COALESCE(jsonb_agg(s.snapshot ORDER BY s.account_id COLLATE "C"), '[]'::jsonb)
      FROM public.ledger_account_snapshots AS s WHERE s.transaction_id = t.id AND s.ledger_id = t.ledger_id),
    'entry_count', (SELECT count(*)::text FROM public.ledger_entries AS e WHERE e.transaction_id = t.id AND e.ledger_id = t.ledger_id),
    'account_count', (SELECT count(*)::text FROM public.ledger_account_snapshots AS s WHERE s.transaction_id = t.id AND s.ledger_id = t.ledger_id)
  ) ORDER BY t.id COLLATE "C"), '[]'::jsonb) AS transactions
FROM selected AS t`;
function unsigned(value: unknown): bigint {
  if (
    typeof value !== "string" ||
    value.match(/^(?:0|[1-9][0-9]*)$/)?.[0] !== value
  )
    throw new LedgerTransactionReadError();
  return BigInt(value);
}
function snapshot(value: unknown): string {
  if (
    typeof value !== "string" ||
    value.match(
      /^(?:0|[1-9][0-9]*):(?:0|[1-9][0-9]*):(?:[1-9][0-9]*(?:,[1-9][0-9]*)*)?$/,
    )?.[0] !== value
  )
    throw new LedgerTransactionReadError();
  const [lower, upper, active] = value.split(":");
  if (lower === undefined || upper === undefined || active === undefined)
    throw new LedgerTransactionReadError();
  const xmin = BigInt(lower),
    xmax = BigInt(upper);
  if (xmin > xmax) throw new LedgerTransactionReadError();
  let prior = xmin - 1n;
  for (const id of active ? active.split(",") : []) {
    const next = BigInt(id);
    if (next <= prior || next < xmin || next >= xmax)
      throw new LedgerTransactionReadError();
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

function dataRecord(
  input: unknown,
  fields: readonly string[],
): Record<string, unknown> {
  const issues: Issues = [];
  const value = record(input, fields, "$", issues);
  if (!value || issues.length) throw new LedgerTransactionReadError();
  return value;
}
function array(input: unknown): unknown[] {
  if (!Array.isArray(input) || Object.getPrototypeOf(input) !== Array.prototype)
    throw new LedgerTransactionReadError();
  const descriptors = Object.getOwnPropertyDescriptors(input) as Record<
    string,
    PropertyDescriptor
  >;
  const length = descriptors.length?.value as unknown;
  if (
    typeof length !== "number" ||
    !Number.isSafeInteger(length) ||
    length < 0 ||
    Reflect.ownKeys(descriptors).length !== length + 1
  )
    throw new LedgerTransactionReadError();
  const out: unknown[] = [];
  for (let i = 0; i < length; i++) {
    const d = descriptors[String(i)];
    if (!d || !("value" in d) || !d.enumerable)
      throw new LedgerTransactionReadError();
    out.push(d.value as unknown);
  }
  return out;
}
function account(input: unknown): Record<string, unknown> {
  const wrapper = dataRecord(input, ["storageVersion", "account"]);
  if (wrapper.storageVersion !== "m04.05-account-snapshot.v1")
    throw new LedgerTransactionReadError();
  const data = dataRecord(wrapper.account, [
    "contractVersion",
    "id",
    "ledgerId",
    "name",
    "category",
    "normalBalance",
    "currency",
    "owner",
    "status",
  ]);
  const name = dataRecord(data.name, ["representation", "units"]);
  const units = array(name.units);
  if (
    name.representation !== "utf16_code_units" ||
    units.length < 1 ||
    units.length > 120 ||
    units.some(
      (unit) =>
        typeof unit !== "number" ||
        !Number.isInteger(unit) ||
        unit < 0 ||
        unit > 65535,
    )
  )
    throw new LedgerTransactionReadError();
  return { ...data, name: String.fromCharCode(...(units as number[])) };
}
function decode(
  input: unknown,
  query: LedgerTransactionQuery,
): LedgerTransactionQueryResult {
  const row = dataRecord(input, ["database_snapshot", "transactions"]);
  const databaseSnapshot = snapshot(row.database_snapshot);
  const records = array(row.transactions);
  const selection = query.selection;
  const size = selection.kind === "transaction_id" ? 1 : selection.page.size;
  if (records.length > size + (selection.kind === "transaction_id" ? 0 : 1))
    throw new LedgerTransactionReadError();
  let prior =
    selection.kind === "transaction_id"
      ? ""
      : (selection.page.afterTransactionId ?? "");
  const transactions = records.map((inputRecord) => {
    const data = dataRecord(inputRecord, [
      "journal",
      "accounts",
      "entry_count",
      "account_count",
    ]);
    const catalog = validateAccountCatalog(array(data.accounts).map(account));
    if (!catalog.ok) throw new LedgerTransactionReadError();
    const checked = validateLedgerJournalCandidate(data.journal, catalog.value);
    if (!checked.ok) throw new LedgerTransactionReadError();
    const journal = checked.value,
      header = journal.transaction;
    const entryCount = unsigned(data.entry_count),
      accountCount = unsigned(data.account_count);
    const referenced = new Set(journal.entries.map((entry) => entry.accountId));
    if (
      entryCount !== BigInt(journal.entries.length) ||
      accountCount !== BigInt(catalog.value.length) ||
      referenced.size !== catalog.value.length ||
      catalog.value.some((value) => !referenced.has(value.id)) ||
      header.ledgerId !== query.ledgerId ||
      header.id <= prior ||
      header.effectiveAt > query.cutoffs.effectiveThrough ||
      header.recordedAt > query.cutoffs.recordedThrough ||
      (selection.kind === "transaction_id" &&
        header.id !== selection.transactionId) ||
      (selection.kind === "source_reference" &&
        (header.provenance.source.namespace !== selection.source.namespace ||
          header.provenance.source.id !== selection.source.id)) ||
      (selection.kind === "account_currency" &&
        !journal.entries.some(
          (entry) =>
            entry.accountId === selection.accountId &&
            entry.amount.currency === selection.currency,
        ))
    )
      throw new LedgerTransactionReadError();
    prior = header.id;
    return Object.freeze({
      journal,
      accounts: Object.freeze(
        [...catalog.value].sort((a, b) =>
          a.id < b.id ? -1 : a.id > b.id ? 1 : 0,
        ),
      ),
      entryCount,
      accountCount,
    });
  });
  const page = Object.freeze(transactions.slice(0, size));
  return Object.freeze({
    ok: true as const,
    issues: EMPTY,
    value: Object.freeze({
      contractVersion: LEDGER_TRANSACTION_QUERY_CONTRACT_VERSION,
      query,
      transactions: page,
      nextAfterTransactionId:
        transactions.length > size
          ? (page.at(-1)?.journal.transaction.id ?? null)
          : null,
      databaseSnapshot,
      statusScope: "all_stored_headers" as const,
    }),
  });
}
export function createLedgerTransactionReader(
  explicitConnectionUrl: string,
): Readonly<LedgerTransactionReader> {
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
    async query(input: unknown): Promise<LedgerTransactionQueryResult> {
      const checked = validateLedgerTransactionQueryCandidate(input);
      if (!checked.ok) return checked;
      let client: pg.PoolClient;
      try {
        client = await pool.connect();
      } catch (error) {
        throw new LedgerTransactionReadError(sqlState(error));
      }
      let begun = false,
        failed = false;
      try {
        await client.query(
          "BEGIN TRANSACTION ISOLATION LEVEL REPEATABLE READ READ ONLY",
        );
        begun = true;
        const { ledgerId, selection, cutoffs } = checked.value;
        const response = await client.query(AGGREGATE, [
          ledgerId,
          selection.kind === "transaction_id" ? selection.transactionId : null,
          selection.kind === "source_reference"
            ? selection.source.namespace
            : null,
          selection.kind === "source_reference" ? selection.source.id : null,
          selection.kind === "account_currency" ? selection.accountId : null,
          selection.kind === "account_currency" ? selection.currency : null,
          cutoffs.effectiveThrough,
          cutoffs.recordedThrough,
          selection.kind === "transaction_id"
            ? null
            : selection.page.afterTransactionId,
          selection.kind === "transaction_id" ? 2 : selection.page.size + 1,
        ]);
        if (response.rows.length !== 1) throw new LedgerTransactionReadError();
        const result = decode(response.rows[0], checked.value);
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
        throw error instanceof LedgerTransactionReadError
          ? error
          : new LedgerTransactionReadError(sqlState(error));
      } finally {
        client.release(failed);
      }
    },
    async close(): Promise<void> {
      await pool.end();
    },
  });
}
