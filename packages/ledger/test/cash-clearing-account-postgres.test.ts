import pg from "pg";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import {
  CASH_CLEARING_ACCOUNT_CONTRACT_VERSION,
  LEDGER_TRANSACTION_QUERY_CONTRACT_VERSION,
  createLedgerAccountBalanceReader,
  createLedgerJournalStore,
  createLedgerTransactionReader,
  validateCashClearingJournalCandidate,
} from "../src/index.js";
import type {
  AccountCandidate,
  CashClearingAccountCandidate,
  LedgerJournalCandidate,
  LedgerJournalStore,
  LedgerAccountBalanceReader,
  LedgerTransactionReader,
} from "../src/index.js";
import {
  balanceAccounts,
  balanceJournal,
  balanceQuery,
} from "./balance-synthetic.js";
import { syntheticId } from "./storage-synthetic.js";
const database = "causalledger_m04_05_disposable";
function explicit(name: string, role: string): string {
  const value = process.env[name];
  if (
    !value ||
    process.env.LEDGER_STORAGE_TEST_DATABASE !== database ||
    process.env.LEDGER_STORAGE_TEST_DISPOSABLE !== "YES_M04_05_SYNTHETIC_ONLY"
  )
    throw new Error(
      "Mandatory owned synthetic17 configuration missing; no skip or ambient fallback.",
    );
  const u = new URL(value);
  if (
    !["postgres:", "postgresql:"].includes(u.protocol) ||
    u.hostname !== "127.0.0.1" ||
    u.pathname !== "/" + database ||
    u.username !== role ||
    !u.password ||
    !/^[1-9][0-9]*$/.test(u.port) ||
    Number(u.port) > 65535 ||
    u.search ||
    u.hash
  )
    throw new Error("Unrecognized owned synthetic target/role.");
  return value;
}
const owner = new pg.Client({
  connectionString: explicit(
    "LEDGER_STORAGE_TEST_OWNER_URL",
    "causalledger_storage_owner",
  ),
});
const appUrl = explicit(
  "LEDGER_STORAGE_TEST_APP_URL",
  "causalledger_storage_app",
);
let store: LedgerJournalStore,
  balance: LedgerAccountBalanceReader,
  reader: LedgerTransactionReader,
  serial = 5_000_000,
  namespace = 5_000_000;
const accounts = (currency: "USD" | "EUR" | "GBP" = "USD") =>
  balanceAccounts(++namespace, "asset", currency);
const role = (account: AccountCandidate): CashClearingAccountCandidate => ({
  contractVersion: CASH_CLEARING_ACCOUNT_CONTRACT_VERSION,
  role: "cash_clearing",
  account,
});
const fresh = (
  a: readonly [AccountCandidate, AccountCandidate],
  amount = "1250",
  side: "debit" | "credit" = "debit",
) => balanceJournal(++serial, a, amount, side);
function change<T>(input: T, path: string[], value: unknown): T {
  const output = structuredClone(input);
  let object = output as Record<string, unknown>;
  for (const key of path.slice(0, -1))
    object = object[key] as Record<string, unknown>;
  object[path.at(-1)!] = value;
  return output;
}
// Test-only composition. The public pure validator has no database or append capability.
async function compose(
  j: unknown,
  r: unknown,
  a: unknown,
  append: LedgerJournalStore["append"] = (input, catalog) =>
    store.append(input, catalog),
) {
  const checked = validateCashClearingJournalCandidate(j, r, a);
  return checked.ok ? append(j, a) : checked;
}
async function read(
  a: readonly [AccountCandidate, AccountCandidate],
  j: LedgerJournalCandidate,
) {
  const result = await reader.query({
    contractVersion: LEDGER_TRANSACTION_QUERY_CONTRACT_VERSION,
    ledgerId: a[0].ledgerId,
    selection: { kind: "transaction_id", transactionId: j.transaction.id },
    cutoffs: balanceQuery(a[0]).cutoffs,
  });
  if (!result.ok) throw new Error("Synthetic journal read failed");
  return result.value.transactions;
}
async function sum(a: AccountCandidate, cutoffs = balanceQuery(a).cutoffs) {
  const result = await balance.query({ ...balanceQuery(a), cutoffs });
  if (!result.ok) throw new Error("Synthetic balance read failed");
  return result.value;
}
async function counts() {
  return (
    await owner.query(
      "SELECT (SELECT count(*)::text FROM public.ledger_transactions) AS transactions,(SELECT count(*)::text FROM public.ledger_entries) AS entries,(SELECT count(*)::text FROM public.ledger_account_snapshots) AS snapshots",
    )
  ).rows;
}
beforeAll(async () => {
  await owner.connect();
  const row = (
    await owner.query(
      "SELECT current_database() AS database,current_setting('server_version_num')::integer AS version",
    )
  ).rows[0] as { database: string; version: number };
  expect(row.database).toBe(database);
  expect(row.version).toBeGreaterThanOrEqual(170000);
  expect(row.version).toBeLessThan(180000);
  store = createLedgerJournalStore(appUrl);
  balance = createLedgerAccountBalanceReader(appUrl);
  reader = createLedgerTransactionReader(appUrl);
});
afterAll(async () => {
  await reader?.close();
  await balance?.close();
  await store?.close();
  await owner.end();
});
describe("M04.10 mandatory real PostgreSQL17 cash clearing composition", () => {
  it.each(["USD", "EUR", "GBP"] as const)(
    "preserves %s explicit snapshots and 1250 clearing/offset arithmetic",
    async (currency) => {
      const a = accounts(currency),
        j = fresh(a),
        offset = fresh(a, "1250", "credit"),
        before = structuredClone({ a, j, offset });
      expect((await compose(j, role(a[0]), a)).ok).toBe(true);
      expect(await sum(a[0])).toMatchObject({
        debitMinorUnits: 1250n,
        creditMinorUnits: 0n,
        balanceMinorUnits: 1250n,
      });
      expect((await sum(a[1])).balanceMinorUnits).toBe(-1250n);
      const original = await read(a, j);
      expect(original).toHaveLength(1);
      expect(original[0]!.accounts).toEqual(a);
      expect(
        original[0]!.journal.entries.map((e) => e.amount.minorUnits),
      ).toEqual([1250n, 1250n]);
      expect((await compose(offset, role(a[0]), a)).ok).toBe(true);
      for (const account of a)
        expect(await sum(account)).toMatchObject({
          debitMinorUnits: 1250n,
          creditMinorUnits: 1250n,
          balanceMinorUnits: 0n,
          transactionCount: 2n,
          entryCount: 2n,
        });
      expect(await read(a, j)).toEqual(original);
      expect({ a, j, offset }).toEqual(before);
    },
  );
  it.each(["effectiveThrough", "recordedThrough"] as const)(
    "respects both inclusive clocks (%s) without treating zero as settlement",
    async (clock) => {
      const a = accounts(),
        j = fresh(a),
        offset = change(
          fresh(a, "1250", "credit"),
          [
            "transaction",
            clock === "effectiveThrough" ? "effectiveAt" : "recordedAt",
          ],
          "2026-10-07T00:00:00.000Z",
        );
      expect((await compose(j, role(a[0]), a)).ok).toBe(true);
      expect((await compose(offset, role(a[0]), a)).ok).toBe(true);
      expect(
        (
          await sum(a[0], {
            ...balanceQuery(a[0]).cutoffs,
            [clock]: "2026-10-06T23:59:59.999Z",
          })
        ).balanceMinorUnits,
      ).toBe(1250n);
      const result = await sum(a[0], {
        ...balanceQuery(a[0]).cutoffs,
        [clock]: "2026-10-07T00:00:00.000Z",
      });
      expect(result.balanceMinorUnits).toBe(0n);
      expect(Object.keys(result)).not.toContain("settled");
    },
  );
  it("preserves bigint totals above int64 and lossless UTF16 account names", async () => {
    const a = accounts();
    a[0] = { ...a[0], name: "Synthetic cash \ud800" };
    const j = fresh(a, "9223372036854775807"),
      extra = j.entries.map((e, i) => ({
        ...e,
        id: `ent_${syntheticId(serial * 100 + i + 3)}`,
      })),
      large = { ...j, entries: [...j.entries, ...extra] };
    expect((await compose(large, role(a[0]), a)).ok).toBe(true);
    expect((await sum(a[0])).balanceMinorUnits).toBe(18446744073709551614n);
    expect((await read(a, large))[0]!.accounts[0]!.name).toBe(a[0].name);
  });
  it("does not persist a business-role registry or external settlement status", async () => {
    const a = accounts(),
      j = fresh(a);
    expect((await compose(j, role(a[0]), a)).ok).toBe(true);
    const record = (await read(a, j))[0]!;
    expect(Object.keys(record.accounts[0]!)).not.toContain("role");
    expect(record.journal.transaction.status).toBe("pending");
    expect(Object.keys(record.journal.transaction)).not.toContain("settled");
    const tables = (
      await owner.query(
        "SELECT count(*)::text AS count FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE' AND table_name<>'pgmigrations'",
      )
    ).rows[0] as { count: string };
    expect(tables.count).toBe("6");
  });
  it.each([
    "wrong role",
    "wrong class",
    "wrong normal side",
    "closed clearing",
    "role currency drift",
    "role owner drift",
    "role name drift",
    "wrong ledger",
    "missing clearing",
    "only clearing",
    "unbalanced",
    "invalid money",
    "duplicate entry",
    "missing account",
    "duplicate account",
    "missing evidence",
  ])(
    "refuses %s before database I/O and retains all existing history",
    async (kind) => {
      const a = accounts();
      let j: unknown = fresh(a),
        r: unknown = role(a[0]),
        catalog: unknown = a;
      switch (kind) {
        case "wrong role":
          r = change(r, ["role"], "provider_clearing");
          break;
        case "wrong class":
          r = change(
            change(r, ["account", "category"], "liability"),
            ["account", "normalBalance"],
            "credit",
          );
          break;
        case "wrong normal side":
          r = change(r, ["account", "normalBalance"], "credit");
          break;
        case "closed clearing":
          catalog = change(a, ["0", "status"], "closed");
          r = role((catalog as typeof a)[0]);
          break;
        case "role currency drift":
          r = change(r, ["account", "currency"], "EUR");
          break;
        case "role owner drift":
          r = change(r, ["account", "owner", "id"], "other");
          break;
        case "role name drift":
          r = change(r, ["account", "name"], "other");
          break;
        case "wrong ledger":
          j = change(j, ["transaction", "ledgerId"], `ldg_${syntheticId(99)}`);
          break;
        case "missing clearing":
          j = {
            ...(j as LedgerJournalCandidate),
            entries: (j as LedgerJournalCandidate).entries.map((e) => ({
              ...e,
              accountId: a[1].id,
            })),
          };
          break;
        case "only clearing":
          j = {
            ...(j as LedgerJournalCandidate),
            entries: (j as LedgerJournalCandidate).entries.map((e) => ({
              ...e,
              accountId: a[0].id,
            })),
          };
          break;
        case "unbalanced":
          j = change(j, ["entries", "0", "amount", "minorUnits"], "1251");
          break;
        case "invalid money":
          j = change(j, ["entries", "0", "amount", "minorUnits"], 1.25);
          break;
        case "duplicate entry":
          j = change(
            j,
            ["entries", "1", "id"],
            (j as LedgerJournalCandidate).entries[0]!.id,
          );
          break;
        case "missing account":
          catalog = [a[0]];
          break;
        case "duplicate account":
          catalog = [...a, a[0]];
          break;
        case "missing evidence":
          j = change(j, ["transaction", "provenance", "evidence"], []);
          break;
      }
      const before = await counts(),
        append = vi.fn((input: unknown, context: unknown) =>
          store.append(input, context),
        );
      expect((await compose(j, r, catalog, append)).ok).toBe(false);
      expect(append).not.toHaveBeenCalled();
      expect(await counts()).toEqual(before);
    },
  );
});
