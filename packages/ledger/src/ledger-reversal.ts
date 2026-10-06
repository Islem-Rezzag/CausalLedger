import pg from "pg";
import { validateAccountCatalog } from "./account.js";
import { validateLedgerJournalCandidate } from "./ledger-journal.js";
import type {
  LedgerJournalCandidate,
  LedgerJournalValidationIssue,
} from "./ledger-journal.js";
import type { LedgerTransactionId } from "./ledger-transaction.js";
import type { LedgerIdempotencyIdentity } from "./ledger-idempotency.js";

export const LEDGER_REVERSAL_CONTRACT_VERSION =
  "m04.09-ledger-reversal.v1" as const;
export interface LedgerReversalCandidate {
  readonly contractVersion: typeof LEDGER_REVERSAL_CONTRACT_VERSION;
  readonly kind: "full";
  readonly originalTransactionId: string;
  readonly journal: LedgerJournalCandidate;
}
export interface LedgerReversalIdentity extends LedgerIdempotencyIdentity {
  readonly contractVersion: typeof LEDGER_REVERSAL_CONTRACT_VERSION;
  readonly kind: "full";
  readonly originalTransactionId: LedgerTransactionId;
}
export type LedgerReversalValidationResult =
  | { readonly ok: true; readonly value: LedgerReversalIdentity }
  | {
      readonly ok: false;
      readonly issues: readonly LedgerJournalValidationIssue[];
    };
export interface LedgerReversalReceipt {
  readonly contractVersion: typeof LEDGER_REVERSAL_CONTRACT_VERSION;
  readonly kind: "full";
  readonly originalTransactionId: LedgerTransactionId;
  readonly transactionId: LedgerTransactionId;
  readonly entryCount: number;
}
export type LedgerReversalResult =
  | { readonly ok: true; readonly receipt: LedgerReversalReceipt }
  | {
      readonly ok: false;
      readonly issues: readonly LedgerJournalValidationIssue[];
    };
export interface LedgerReversalStore {
  append(
    input: unknown,
    suppliedAccounts: unknown,
  ): Promise<LedgerReversalResult>;
  close(): Promise<void>;
}
export class LedgerReversalStorageError extends Error {
  constructor(
    readonly outcome: "not_stored" | "unknown",
    readonly sqlState: string | null,
  ) {
    super(
      outcome === "not_stored"
        ? "Reversal storage refused the request."
        : "Reversal storage outcome is unknown; explicitly retry the same original, scope and semantic payload. No automatic retry.",
    );
    this.name = "LedgerReversalStorageError";
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
function prepareJournal(input: unknown, suppliedAccounts: unknown) {
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
function refused(path: string, message: string) {
  return Object.freeze({
    ok: false as const,
    issues: Object.freeze([
      Object.freeze({ code: "invalid_context" as const, path, message }),
    ]),
  });
}
function readWrapper(input: unknown): Record<string, unknown> | undefined {
  try {
    if (typeof input !== "object" || input === null) return undefined;
    const prototype = Object.getPrototypeOf(input);
    if (prototype !== Object.prototype && prototype !== null) return undefined;
    const descriptors = Object.getOwnPropertyDescriptors(input);
    const fields = [
      "contractVersion",
      "kind",
      "originalTransactionId",
      "journal",
    ];
    const keys = Reflect.ownKeys(descriptors);
    if (
      keys.length !== fields.length ||
      keys.some((key) => typeof key !== "string" || !fields.includes(key))
    )
      return undefined;
    const values: Record<string, unknown> = Object.create(null) as Record<
      string,
      unknown
    >;
    for (const field of fields) {
      const descriptor = descriptors[field];
      if (!descriptor || !("value" in descriptor) || !descriptor.enumerable)
        return undefined;
      values[field] = descriptor.value as unknown;
    }
    return values;
  } catch {
    return undefined;
  }
}
function prepare(input: unknown, suppliedAccounts: unknown) {
  const data = readWrapper(input);
  if (
    !data ||
    data.contractVersion !== LEDGER_REVERSAL_CONTRACT_VERSION ||
    data.kind !== "full" ||
    typeof data.originalTransactionId !== "string" ||
    !/^txn_[0-7][0-9A-HJKMNP-TV-Z]{25}$/.test(data.originalTransactionId)
  )
    return refused(
      "$",
      "A strict full reversal wrapper and valid original transaction ID are required.",
    );
  const journal = prepareJournal(data.journal, suppliedAccounts);
  if (!journal.ok) return journal;
  if (
    journal.wire.transaction.status !== "posted" ||
    journal.wire.transaction.id === data.originalTransactionId
  )
    return refused(
      "$.journal.transaction",
      "A distinct posted reversal transaction is required.",
    );
  const identity: LedgerReversalIdentity = Object.freeze({
    contractVersion: LEDGER_REVERSAL_CONTRACT_VERSION,
    kind: "full",
    originalTransactionId: data.originalTransactionId as LedgerTransactionId,
    scope: journal.identity.scope,
    canonicalPayload: canonical({
      contractVersion: LEDGER_REVERSAL_CONTRACT_VERSION,
      kind: "full",
      originalTransactionId: data.originalTransactionId,
      journal: JSON.parse(journal.identity.canonicalPayload) as unknown,
    }),
  });
  return {
    ok: true as const,
    identity,
    wire: {
      contractVersion: LEDGER_REVERSAL_CONTRACT_VERSION,
      kind: "full",
      originalTransactionId: data.originalTransactionId,
      journal: journal.wire,
    },
    accounts: journal.accounts,
  };
}
/** Pure comparison of supplied metadata. Durable existence/single-reversal checks belong to storage. */
export function validateLedgerReversalCandidate(
  input: unknown,
  originalJournal: unknown,
  originalAccounts: unknown,
  suppliedAccounts: unknown,
): LedgerReversalValidationResult {
  const prepared = prepare(input, suppliedAccounts);
  if (!prepared.ok) return prepared;
  const original = prepareJournal(originalJournal, originalAccounts);
  if (!original.ok)
    return refused(
      "$.original",
      "A valid original journal and original Account snapshots are required.",
    );
  if (
    original.wire.transaction.id !== prepared.identity.originalTransactionId ||
    original.wire.transaction.status !== "posted" ||
    original.identity.scope.ledgerId !== prepared.identity.scope.ledgerId
  )
    return refused(
      "$.original",
      "A matching posted same-ledger original is required.",
    );
  if (
    original.wire.entries.some((entry) =>
      prepared.wire.journal.entries.some((next) => next.id === entry.id),
    )
  )
    return refused(
      "$.journal.entries",
      "Reversal entries require new immutable identities.",
    );
  const lineIdentity = (entries: typeof original.wire.entries, flip: boolean) =>
    entries
      .map((entry) =>
        canonical({
          contractVersion: entry.contractVersion,
          ledgerId: entry.ledgerId,
          accountId: entry.accountId,
          side: flip
            ? entry.side === "debit"
              ? "credit"
              : "debit"
            : entry.side,
          amount: entry.amount,
        }),
      )
      .sort(compare);
  if (
    canonical(lineIdentity(original.wire.entries, true)) !==
      canonical(lineIdentity(prepared.wire.journal.entries, false)) ||
    canonical(original.accounts) !== canonical(prepared.accounts)
  )
    return refused(
      "$.journal.entries",
      "Full inverse line multiset and identical referenced Account snapshots are required.",
    );
  const p = prepared.wire.journal.transaction.provenance,
    o = original.wire.transaction.provenance;
  if (
    o.moneyEventIds.some((id) => !p.moneyEventIds.includes(id)) ||
    o.evidence.some(
      (ref) =>
        !p.evidence.some(
          (next) =>
            next.receiptId === ref.receiptId &&
            next.contentHash === ref.contentHash,
        ),
    )
  )
    return refused(
      "$.journal.transaction.provenance",
      "Every original event ID and receipt/hash must be retained.",
    );
  return Object.freeze({ ok: true, value: prepared.identity });
}
function state(error: unknown): string | null {
  try {
    if (typeof error !== "object" || error === null) return null;
    const descriptor = Object.getOwnPropertyDescriptor(error, "code");
    if (!descriptor || !("value" in descriptor)) return null;
    const code: unknown = descriptor.value;
    return typeof code === "string" && /^[0-9A-Z]{5}$/.test(code) ? code : null;
  } catch {
    return null;
  }
}
function readReceipt(
  input: unknown,
  entryCount: number,
  originalTransactionId: LedgerTransactionId,
): LedgerReversalReceipt | undefined {
  try {
    if (typeof input !== "object" || input === null) return undefined;
    const prototype = Object.getPrototypeOf(input);
    if (prototype !== Object.prototype && prototype !== null) return undefined;
    const fields = [
      "contractVersion",
      "kind",
      "originalTransactionId",
      "transactionId",
      "entryCount",
    ] as const;
    const descriptors = Object.getOwnPropertyDescriptors(input);
    const keys = Reflect.ownKeys(descriptors);
    if (
      keys.length !== fields.length ||
      keys.some(
        (key) =>
          typeof key !== "string" ||
          !fields.includes(key as (typeof fields)[number]),
      )
    )
      return undefined;
    const values: Record<string, unknown> = Object.create(null) as Record<
      string,
      unknown
    >;
    for (const field of fields) {
      const descriptor = descriptors[field];
      if (!descriptor || !("value" in descriptor) || !descriptor.enumerable)
        return undefined;
      values[field] = descriptor.value as unknown;
    }
    if (
      values.contractVersion !== LEDGER_REVERSAL_CONTRACT_VERSION ||
      typeof values.transactionId !== "string" ||
      !/^txn_[0-7][0-9A-HJKMNP-TV-Z]{25}$/.test(values.transactionId) ||
      values.entryCount !== entryCount ||
      values.kind !== "full" ||
      values.originalTransactionId !== originalTransactionId ||
      values.transactionId === originalTransactionId
    )
      return undefined;
    return Object.freeze({
      contractVersion: LEDGER_REVERSAL_CONTRACT_VERSION,
      kind: "full",
      originalTransactionId,
      transactionId: values.transactionId as LedgerTransactionId,
      entryCount,
    });
  } catch {
    return undefined;
  }
}
/** Separate deterministic storage path; never exposed as an investigator/agent tool. */
export function createLedgerReversalStore(
  connectionString: string,
): LedgerReversalStore {
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
    ): Promise<LedgerReversalResult> {
      const prepared = prepare(input, suppliedAccounts);
      if (!prepared.ok)
        return Object.freeze({ ok: false, issues: prepared.issues });
      let client: pg.PoolClient;
      try {
        client = await pool.connect();
      } catch (error) {
        throw new LedgerReversalStorageError("not_stored", state(error));
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
          receipt: LedgerReversalReceipt;
        }>(
          "SELECT public.append_ledger_reversal($1::jsonb,$2::jsonb) AS receipt",
          [JSON.stringify(prepared.wire), JSON.stringify(prepared.accounts)],
        );
        const receipt = readReceipt(
          result.rows[0]?.receipt,
          prepared.wire.journal.entries.length,
          prepared.identity.originalTransactionId,
        );
        if (result.rows.length !== 1 || !receipt)
          throw new LedgerReversalStorageError("unknown", null);
        return Object.freeze({
          ok: true,
          receipt,
        });
      } catch (error) {
        const code = state(error);
        const refused =
          !attempted ||
          (code !== null &&
            (/^(22|23|42)/.test(code) ||
              ["55000", "40001", "40P01", "57014"].includes(code)));
        discard = !refused;
        throw new LedgerReversalStorageError(
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
