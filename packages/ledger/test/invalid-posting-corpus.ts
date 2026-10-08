import type { AccountCandidate, LedgerJournalCandidate } from "../src/index.js";
import {
  storageAccounts,
  storageJournal,
  syntheticId,
} from "./storage-synthetic.js";

export const INVALID_CORPUS_VERSION = "m04.16-invalid-posting-corpus.v1";
export const INVALID_BASE = 12_000_000;
export interface Fixture {
  journal: unknown;
  accounts: unknown;
}
export function fixture(
  n: number,
  currency: "USD" | "EUR" | "GBP" = "USD",
): Fixture {
  const journal = storageJournal(INVALID_BASE + n, ["1000", "250"], [currency]);
  const ledgerId = `ldg_${syntheticId(INVALID_BASE + n)}`;
  return {
    journal: {
      ...journal,
      transaction: {
        ...journal.transaction,
        ledgerId,
        status: "posted",
        idempotencyKey: `synthetic.invalid.${n}`,
        provenance: {
          source: { namespace: "synthetic.invalid-posting", id: `case-${n}` },
          moneyEventIds: [`evt_${syntheticId(INVALID_BASE + n)}`],
          evidence: [
            {
              receiptId: `rcpt_${syntheticId(INVALID_BASE + n)}`,
              contentHash: `sha256:${"a".repeat(64)}`,
            },
          ],
        },
      },
      entries: journal.entries.map((e) => ({ ...e, ledgerId })),
    },
    accounts: storageAccounts().map((a) => ({ ...a, ledgerId })),
  };
}
export function declarations(f: Fixture): {
  journal: LedgerJournalCandidate;
  accounts: AccountCandidate[];
} {
  return f as { journal: LedgerJournalCandidate; accounts: AccountCandidate[] };
}
function put(f: Fixture, path: string, value: unknown): void {
  const keys = path.split(".");
  let target = f as unknown as Record<string, unknown>;
  for (const key of keys.slice(0, -1))
    target = target[key] as Record<string, unknown>;
  target[keys[keys.length - 1]!] = value;
}
export interface InvalidCase {
  name: string;
  code: string;
  path: string;
  sql05: string;
  sql08: string;
  mutate(f: Fixture): void;
}
const change = (
  name: string,
  path: string,
  value: unknown,
  code: string,
  issuePath: string,
  sql05 = "22023",
  sql08 = "22023",
): InvalidCase => ({
  name,
  code,
  path: issuePath,
  sql05,
  sql08,
  mutate: (f) => put(f, path, value),
});
export const INVALID_CASES: readonly InvalidCase[] = [
  change("null journal", "journal", null, "invalid_object", "$"),
  change("array journal", "journal", [], "invalid_object", "$"),
  change(
    "future journal version",
    "journal.contractVersion",
    "future",
    "unsupported_value",
    "$.contractVersion",
  ),
  change(
    "numeric journal version",
    "journal.contractVersion",
    4,
    "invalid_type",
    "$.contractVersion",
  ),
  change(
    "unknown journal field",
    "journal.approve",
    true,
    "unknown_field",
    "$.approve",
  ),
  {
    name: "missing entries",
    code: "required_field",
    path: "$.entries",
    sql05: "22023",
    sql08: "22023",
    mutate: (f) => {
      delete (f.journal as Record<string, unknown>).entries;
    },
  },
  change("null entries", "journal.entries", null, "invalid_array", "$.entries"),
  change("empty entries", "journal.entries", [], "empty_entries", "$.entries"),
  change(
    "null transaction",
    "journal.transaction",
    null,
    "invalid_transaction",
    "$.transaction",
  ),
  change(
    "unsupported transaction status",
    "journal.transaction.status",
    "approved",
    "invalid_transaction",
    "$.transaction.status",
  ),
  change(
    "numeric retry key",
    "journal.transaction.idempotencyKey",
    99,
    "invalid_transaction",
    "$.transaction.idempotencyKey",
  ),
  change(
    "invalid recorded clock",
    "journal.transaction.recordedAt",
    "yesterday",
    "invalid_transaction",
    "$.transaction.recordedAt",
  ),
  change(
    "empty source id",
    "journal.transaction.provenance.source.id",
    "",
    "invalid_transaction",
    "$.transaction.provenance.source.id",
  ),
  change(
    "malformed receipt hash",
    "journal.transaction.provenance.evidence.0.contentHash",
    "sha256:0",
    "invalid_transaction",
    "$.transaction.provenance.evidence[0].contentHash",
  ),
  change(
    "null first entry",
    "journal.entries.0",
    null,
    "invalid_object",
    "$.entries[0]",
  ),
  change(
    "unknown entry field",
    "journal.entries.0.approve",
    true,
    "unknown_field",
    "$.entries[0].approve",
  ),
  change(
    "unsupported entry version",
    "journal.entries.0.contractVersion",
    "future",
    "unsupported_value",
    "$.entries[0].contractVersion",
    "23514",
  ),
  change(
    "unsupported side",
    "journal.entries.0.side",
    "increase",
    "unsupported_value",
    "$.entries[0].side",
    "23514",
  ),
  change(
    "numeric money",
    "journal.entries.0.amount.minorUnits",
    1000,
    "invalid_type",
    "$.entries[0].amount.minorUnits",
  ),
  ...["0", "-1", "01", "1.5", "1e3", " 1000", "9223372036854775808"].map(
    (value) =>
      change(
        `invalid money ${value}`,
        "journal.entries.0.amount.minorUnits",
        value,
        value === "9223372036854775808"
          ? "amount_out_of_range"
          : "invalid_amount",
        "$.entries[0].amount.minorUnits",
        value === "9223372036854775808" ? "22003" : "22023",
      ),
  ),
  change(
    "unsupported representation",
    "journal.entries.0.amount.representation",
    "decimal_major_units",
    "unsupported_value",
    "$.entries[0].amount.representation",
    "23514",
  ),
  change(
    "unsupported currency",
    "journal.entries.0.amount.currency",
    "JPY",
    "unsupported_value",
    "$.entries[0].amount.currency",
    "23514",
  ),
  change(
    "transaction reference drift",
    "journal.entries.0.transactionId",
    `txn_${syntheticId(999)}`,
    "transaction_mismatch",
    "$.entries[0].transactionId",
  ),
  change(
    "ledger reference drift",
    "journal.entries.0.ledgerId",
    `ldg_${syntheticId(999)}`,
    "ledger_mismatch",
    "$.entries[0].ledgerId",
  ),
  change(
    "missing referenced account",
    "journal.entries.0.accountId",
    `acct_${syntheticId(999)}`,
    "unknown_account",
    "$.entries[0].accountId",
    "23503",
  ),
  change(
    "multiline imbalance",
    "journal.entries.1.amount.minorUnits",
    "999",
    "unbalanced_currency",
    "$.entries",
    "23514",
    "23514",
  ),
  {
    name: "single-sided journal",
    code: "missing_side",
    path: "$.entries",
    sql05: "23514",
    sql08: "23514",
    mutate: (f) => {
      const j = f.journal as LedgerJournalCandidate;
      put(
        f,
        "journal.entries",
        j.entries.filter((e) => e.side === "debit"),
      );
    },
  },
  {
    name: "duplicate entry identity",
    code: "duplicate_entry_id",
    path: "$.entries[1].id",
    sql05: "23505",
    sql08: "22023",
    mutate: (f) =>
      put(f, "journal.entries.1.id", declarations(f).journal.entries[0]!.id),
  },
  {
    name: "duplicate account identity",
    code: "invalid_context",
    path: "$.context.accounts[3].id",
    sql05: "23505",
    sql08: "22023",
    mutate: (f) => {
      const { accounts, journal } = declarations(f);
      const a = accounts.find((a) => a.id === journal.entries[0]!.accountId)!;
      put(f, "accounts", [...accounts, structuredClone(a)]);
    },
  },
  {
    name: "unsupported account category",
    code: "invalid_context",
    path: "$.context.accounts[0].category",
    sql05: "22023",
    sql08: "22023",
    mutate: (f) => {
      for (const a of declarations(f).accounts)
        (a as unknown as Record<string, unknown>).category = "suspense";
    },
  },
  {
    name: "wrong account normal side",
    code: "invalid_context",
    path: "$.context.accounts[0].normalBalance",
    sql05: "22023",
    sql08: "22023",
    mutate: (f) => {
      for (const a of declarations(f).accounts)
        (a as unknown as Record<string, unknown>).normalBalance = "credit";
    },
  },
];
export function mutate(
  row: InvalidCase,
  n: number,
  currency: "USD" | "EUR" | "GBP" = "USD",
): Fixture {
  const f = fixture(n, currency);
  row.mutate(f);
  return f;
}
export function snapshots(f: Fixture): unknown[] {
  const { journal, accounts } = declarations(f);
  const references = new Set(
    Array.isArray(journal?.entries)
      ? journal.entries
          .filter((e) => e && typeof e === "object")
          .map((e) => e.accountId)
      : [],
  );
  return accounts
    .filter((a) => references.has(a.id))
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
}
