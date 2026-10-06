import pg from "pg";
import { validateAccountCatalog } from "./account.js";
import { validateLedgerJournalCandidate } from "./ledger-journal.js";
import type { LedgerJournalValidationIssue } from "./ledger-journal.js";
import type { LedgerTransactionId } from "./ledger-transaction.js";

export const LEDGER_STORAGE_CONTRACT_VERSION =
  "m04.05-ledger-storage.v1" as const;
export interface LedgerJournalStorageReceipt {
  readonly contractVersion: typeof LEDGER_STORAGE_CONTRACT_VERSION;
  readonly transactionId: LedgerTransactionId;
  readonly entryCount: number;
}
export type LedgerJournalStorageResult =
  | { readonly ok: true; readonly receipt: LedgerJournalStorageReceipt }
  | {
      readonly ok: false;
      readonly issues: readonly LedgerJournalValidationIssue[];
    };
export interface LedgerJournalStore {
  append(
    input: unknown,
    suppliedAccounts: unknown,
  ): Promise<LedgerJournalStorageResult>;
  close(): Promise<void>;
}
/** A server refusal is distinct from loss of a commit acknowledgement. Never retry automatically. */
export class LedgerJournalStorageError extends Error {
  constructor(
    readonly outcome: "not_stored" | "unknown",
    readonly sqlState: string | null,
  ) {
    super(
      outcome === "not_stored"
        ? "Storage refused the journal."
        : "Storage outcome is unknown; do not retry automatically.",
    );
    this.name = "LedgerJournalStorageError";
  }
}
function state(error: unknown): string | null {
  if (typeof error !== "object" || error === null || !("code" in error))
    return null;
  return typeof error.code === "string" && /^[0-9A-Z]{5}$/.test(error.code)
    ? error.code
    : null;
}
/** No ambient PG/DATABASE_URL fallback. The caller must supply all connection components. */
export function createLedgerJournalStore(
  connectionString: string,
): LedgerJournalStore {
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
      "Supply an explicit PostgreSQL connection URL with host, port, database, user and password.",
    );
  const pool = new pg.Pool({
    connectionString,
    max: 1,
    connectionTimeoutMillis: 5000,
  });
  // pg removes failed idle clients; keep an idle disconnect from crashing the host.
  // In-flight statement errors remain explicit below; no journal is retried here.
  pool.on("error", () => {});
  return Object.freeze({
    async append(
      input: unknown,
      suppliedAccounts: unknown,
    ): Promise<LedgerJournalStorageResult> {
      const checked = validateLedgerJournalCandidate(input, suppliedAccounts);
      if (!checked.ok)
        return Object.freeze({ ok: false, issues: checked.issues });
      const catalog = validateAccountCatalog(suppliedAccounts);
      if (!catalog.ok) throw new LedgerJournalStorageError("not_stored", null);
      const journal = checked.value;
      const referenced = new Set(
        journal.entries.map((entry) => entry.accountId),
      );
      const accounts = catalog.value
        .filter((account) => referenced.has(account.id))
        .sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0))
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
      // Only detached validated data is encoded; money never travels through Number.
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
      let client: pg.PoolClient;
      try {
        client = await pool.connect();
      } catch (error) {
        throw new LedgerJournalStorageError("not_stored", state(error));
      }
      try {
        // This owned connection is never exposed to callers or an outer transaction.
        // One routine call is one autocommit statement, acknowledged before returning.
        const result = await client.query<{
          receipt: LedgerJournalStorageReceipt;
        }>(
          "SELECT public.append_ledger_journal($1::jsonb, $2::jsonb) AS receipt",
          [JSON.stringify(wire), JSON.stringify(accounts)],
        );
        const receipt = result.rows[0]?.receipt;
        if (
          result.rows.length !== 1 ||
          !receipt ||
          receipt.contractVersion !== LEDGER_STORAGE_CONTRACT_VERSION ||
          receipt.transactionId !== journal.transaction.id ||
          receipt.entryCount !== journal.entries.length
        )
          throw new LedgerJournalStorageError("unknown", null);
        return Object.freeze({
          ok: true,
          receipt: Object.freeze({
            contractVersion: LEDGER_STORAGE_CONTRACT_VERSION,
            transactionId: journal.transaction.id,
            entryCount: journal.entries.length,
          }),
        });
      } catch (error) {
        if (error instanceof LedgerJournalStorageError) throw error;
        const code = state(error);
        const refused =
          code !== null && (/^(22|23|42)/.test(code) || code === "55000");
        throw new LedgerJournalStorageError(
          refused ? "not_stored" : "unknown",
          code,
        );
      } finally {
        client.release();
      }
    },
    async close(): Promise<void> {
      await pool.end();
    },
  });
}
