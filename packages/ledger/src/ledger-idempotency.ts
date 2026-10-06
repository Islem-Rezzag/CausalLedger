import pg from "pg";
import { validateAccountCatalog } from "./account.js";
import { validateLedgerJournalCandidate } from "./ledger-journal.js";
import type { LedgerJournalValidationIssue } from "./ledger-journal.js";
import type { LedgerTransactionId } from "./ledger-transaction.js";
import type { LedgerId } from "./account.js";

export const LEDGER_IDEMPOTENCY_CONTRACT_VERSION =
  "m04.08-idempotency.v1" as const;
export interface LedgerIdempotencyIdentity {
  readonly scope: {
    readonly ledgerId: LedgerId;
    readonly sourceNamespace: string;
    readonly key: string;
  };
  /** Exact canonical JSON, not a hash. Attempt IDs are excluded; line multiplicity is retained. */
  readonly canonicalPayload: string;
}
export type LedgerIdempotencyValidationResult =
  | { readonly ok: true; readonly value: LedgerIdempotencyIdentity }
  | {
      readonly ok: false;
      readonly issues: readonly LedgerJournalValidationIssue[];
    };
export interface IdempotentLedgerJournalReceipt {
  readonly contractVersion: typeof LEDGER_IDEMPOTENCY_CONTRACT_VERSION;
  /** Always the original committed identity, which may differ from the attempted ID. */
  readonly transactionId: LedgerTransactionId;
  readonly entryCount: number;
}
export type IdempotentLedgerJournalResult =
  | { readonly ok: true; readonly receipt: IdempotentLedgerJournalReceipt }
  | {
      readonly ok: false;
      readonly issues: readonly LedgerJournalValidationIssue[];
    };
export interface IdempotentLedgerJournalStore {
  append(
    input: unknown,
    suppliedAccounts: unknown,
  ): Promise<IdempotentLedgerJournalResult>;
  close(): Promise<void>;
}
export class IdempotentLedgerJournalStorageError extends Error {
  constructor(
    readonly outcome: "not_stored" | "unknown",
    readonly sqlState: string | null,
  ) {
    super(
      outcome === "not_stored"
        ? "Idempotent storage refused the journal."
        : "Storage outcome is unknown; explicitly retry the same scope and semantic payload to recover. No automatic retry.",
    );
    this.name = "IdempotentLedgerJournalStorageError";
  }
}
const compare = (a: string, b: string): number => (a < b ? -1 : a > b ? 1 : 0);
/** Only detached validator output reaches this encoder. */
function canonical(value: unknown): string {
  if (Array.isArray(value)) return "[" + value.map(canonical).join(",") + "]";
  if (typeof value === "object" && value !== null) {
    const data = value as Record<string, unknown>;
    return (
      "{" +
      Object.keys(data)
        .sort(compare)
        .map((key) => JSON.stringify(key) + ":" + canonical(data[key]))
        .join(",") +
      "}"
    );
  }
  return JSON.stringify(value) as string;
}
function prepare(input: unknown, suppliedAccounts: unknown) {
  const checked = validateLedgerJournalCandidate(input, suppliedAccounts);
  if (!checked.ok) return checked;
  const catalog = validateAccountCatalog(suppliedAccounts);
  if (!catalog.ok)
    return {
      ok: false as const,
      issues: Object.freeze(
        catalog.issues.map((failure) =>
          Object.freeze({
            code: "invalid_context" as const,
            path: "$.context.accounts" + failure.path.slice(1),
            message: "Invalid supplied account catalog.",
          }),
        ),
      ),
    };
  const journal = checked.value;
  const referenced = new Set(journal.entries.map((entry) => entry.accountId));
  const accounts = catalog.value
    .filter((account) => referenced.has(account.id))
    .sort((a, b) => compare(a.id, b.id))
    .map((account) => ({
      storageVersion: "m04.05-account-snapshot.v1",
      account: {
        ...account,
        name: {
          representation: "utf16_code_units",
          units: Array.from({ length: account.name.length }, (_, i) =>
            account.name.charCodeAt(i),
          ),
        },
      },
    }));
  const wire = {
    contractVersion: journal.contractVersion,
    transaction: journal.transaction,
    entries: journal.entries.map((entry) => ({
      ...entry,
      amount: {
        ...entry.amount,
        minorUnits: entry.amount.minorUnits.toString(),
      },
    })),
  };
  const entries = wire.entries
    .map((entry) => ({
      contractVersion: entry.contractVersion,
      ledgerId: entry.ledgerId,
      accountId: entry.accountId,
      side: entry.side,
      amount: entry.amount,
    }))
    .sort(
      (a, b) =>
        compare(a.accountId, b.accountId) ||
        compare(a.side, b.side) ||
        compare(a.amount.minorUnits, b.amount.minorUnits) ||
        compare(a.amount.currency, b.amount.currency),
    );
  const header = wire.transaction;
  const semanticHeader = {
    contractVersion: header.contractVersion,
    ledgerId: header.ledgerId,
    status: header.status,
    effectiveAt: header.effectiveAt,
    recordedAt: header.recordedAt,
    provenance: {
      ...header.provenance,
      moneyEventIds: [...header.provenance.moneyEventIds].sort(compare),
      evidence: [...header.provenance.evidence].sort((a, b) =>
        compare(a.receiptId, b.receiptId),
      ),
    },
  };
  const identity = Object.freeze({
    scope: Object.freeze({
      ledgerId: header.ledgerId,
      sourceNamespace: header.provenance.source.namespace,
      key: header.idempotencyKey,
    }),
    canonicalPayload: canonical({
      contractVersion: wire.contractVersion,
      transaction: semanticHeader,
      entries,
      accounts,
    }),
  });
  return { ok: true as const, identity, wire, accounts };
}
/** Full existing journal/catalog validation precedes identity, including every attempted ID. */
export function validateLedgerIdempotencyCandidate(
  input: unknown,
  suppliedAccounts: unknown,
): LedgerIdempotencyValidationResult {
  const prepared = prepare(input, suppliedAccounts);
  return prepared.ok
    ? Object.freeze({ ok: true, value: prepared.identity })
    : Object.freeze({ ok: false, issues: prepared.issues });
}
function state(error: unknown): string | null {
  if (typeof error !== "object" || error === null || !("code" in error))
    return null;
  return typeof error.code === "string" && /^[0-9A-Z]{5}$/.test(error.code)
    ? error.code
    : null;
}
/** Separate deterministic storage path; never exposed as an investigator/agent tool. */
export function createIdempotentLedgerJournalStore(
  connectionString: string,
): IdempotentLedgerJournalStore {
  let url: URL;
  try {
    if (typeof connectionString !== "string") throw new TypeError();
    url = new URL(connectionString);
  } catch {
    throw new TypeError("Supply an explicit PostgreSQL connection URL.");
  }
  if (
    !["postgres:", "postgresql:"].includes(url.protocol) ||
    !url.hostname ||
    !url.username ||
    !url.password ||
    !url.port ||
    url.pathname.length < 2 ||
    url.hash ||
    url.search ||
    !/^[1-9][0-9]{0,4}$/.test(url.port) ||
    Number(url.port) > 65535
  )
    throw new TypeError(
      "Supply an explicit PostgreSQL URL with host, port, database, user and password.",
    );
  const pool = new pg.Pool({
    connectionString,
    max: 1,
    connectionTimeoutMillis: 5000,
  });
  pool.on("error", () => {});
  return Object.freeze({
    async append(
      input: unknown,
      suppliedAccounts: unknown,
    ): Promise<IdempotentLedgerJournalResult> {
      const prepared = prepare(input, suppliedAccounts);
      if (!prepared.ok)
        return Object.freeze({ ok: false, issues: prepared.issues });
      let client: pg.PoolClient;
      try {
        client = await pool.connect();
      } catch (error) {
        throw new IdempotentLedgerJournalStorageError(
          "not_stored",
          state(error),
        );
      }
      let attempted = false,
        discard = false;
      try {
        // Private connection, no outer transaction; each call explicitly establishes snapshot rules.
        await client.query(
          "SET SESSION CHARACTERISTICS AS TRANSACTION ISOLATION LEVEL READ COMMITTED",
        );
        attempted = true;
        const result = await client.query<{
          receipt: IdempotentLedgerJournalReceipt;
        }>(
          "SELECT public.append_idempotent_ledger_journal($1::jsonb,$2::jsonb) AS receipt",
          [JSON.stringify(prepared.wire), JSON.stringify(prepared.accounts)],
        );
        const receipt = result.rows[0]?.receipt;
        if (
          result.rows.length !== 1 ||
          !receipt ||
          typeof receipt !== "object" ||
          Object.keys(receipt).sort().join(",") !==
            "contractVersion,entryCount,transactionId" ||
          receipt.contractVersion !== LEDGER_IDEMPOTENCY_CONTRACT_VERSION ||
          typeof receipt.transactionId !== "string" ||
          !/^txn_[0-7][0-9A-HJKMNP-TV-Z]{25}$/.test(receipt.transactionId) ||
          receipt.entryCount !== prepared.wire.entries.length
        )
          throw new IdempotentLedgerJournalStorageError("unknown", null);
        return Object.freeze({
          ok: true,
          receipt: Object.freeze({
            contractVersion: LEDGER_IDEMPOTENCY_CONTRACT_VERSION,
            transactionId: receipt.transactionId,
            entryCount: receipt.entryCount,
          }),
        });
      } catch (error) {
        if (error instanceof IdempotentLedgerJournalStorageError) {
          discard = true;
          throw error;
        }
        const code = state(error);
        const refused =
          !attempted ||
          (code !== null &&
            (/^(22|23|42)/.test(code) ||
              ["55000", "40001", "40P01", "57014"].includes(code)));
        discard = !refused;
        throw new IdempotentLedgerJournalStorageError(
          refused ? "not_stored" : "unknown",
          code,
        );
      } finally {
        client.release(discard);
      }
    },
    async close(): Promise<void> {
      await pool.end();
    },
  });
}
