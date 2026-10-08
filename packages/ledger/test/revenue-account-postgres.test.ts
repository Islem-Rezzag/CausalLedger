import pg from "pg";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import {
  REVENUE_ACCOUNT_CONTRACT_VERSION,
  LEDGER_TRANSACTION_QUERY_CONTRACT_VERSION,
  createLedgerAccountBalanceReader,
  createLedgerJournalStore,
  createLedgerReversalStore,
  validateLedgerReversalCandidate,
  LEDGER_REVERSAL_CONTRACT_VERSION,
  createLedgerTransactionReader,
  validateRevenueJournalCandidate,
} from "../src/index.js";
import type {
  AccountCandidate,
  RevenueAccountCandidate,
  LedgerJournalCandidate,
  LedgerJournalStore,
  LedgerReversalStore,
  LedgerReversalCandidate,
  LedgerTransactionSourceReference,
  LedgerAccountBalanceReader,
  LedgerTransactionReader,
} from "../src/index.js";
import {
  balanceAccounts,
  balanceJournal,
  balanceQuery,
} from "./balance-synthetic.js";
import { syntheticId } from "./storage-synthetic.js";
const FEE_SOURCE = Object.freeze({
  namespace: "synthetic.revenue",
  id: "revenue-A",
});
const REVERSE_SOURCE = Object.freeze({
  namespace: "synthetic.revenue-reversal",
  id: "reverse-A",
});
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
  reversalStore: LedgerReversalStore,
  balance: LedgerAccountBalanceReader,
  reader: LedgerTransactionReader,
  serial = 9_000_000,
  namespace = 9_000_000;
const accounts = (currency: "USD" | "EUR" | "GBP" = "USD") => {
  const a = balanceAccounts(++namespace, "revenue", currency);
  a[1] = { ...a[1], category: "asset", normalBalance: "debit" };
  return a;
};
const role = (account: AccountCandidate): RevenueAccountCandidate => ({
  contractVersion: REVENUE_ACCOUNT_CONTRACT_VERSION,
  role: "revenue",
  account,
});
const fresh = (
  a: readonly [AccountCandidate, AccountCandidate],
  amount = "1250",
  side: "credit" | "debit" = "credit",
) => {
  const j = balanceJournal(++serial, a, amount, side);
  return {
    ...j,
    transaction: {
      ...j.transaction,
      provenance: {
        ...j.transaction.provenance,
        source: FEE_SOURCE,
        moneyEventIds: [`evt_${syntheticId(serial)}`],
      },
    },
  };
};
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
  source: unknown = FEE_SOURCE,
) {
  const checked = validateRevenueJournalCandidate(j, r, {
    source,
    accounts: a,
  });
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
      "SELECT (SELECT count(*)::text FROM public.ledger_transactions) AS transactions,(SELECT count(*)::text FROM public.ledger_entries) AS entries,(SELECT count(*)::text FROM public.ledger_account_snapshots) AS snapshots,(SELECT count(*)::text FROM public.ledger_idempotency_keys) AS keys,(SELECT count(*)::text FROM public.ledger_reversals) AS reversals",
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
  reversalStore = createLedgerReversalStore(appUrl);
  balance = createLedgerAccountBalanceReader(appUrl);
  reader = createLedgerTransactionReader(appUrl);
});
afterAll(async () => {
  await reader?.close();
  await balance?.close();
  await store?.close();
  await reversalStore?.close();
  await owner.end();
});
describe("M04.14 mandatory real PostgreSQL17 revenue composition", () => {
  it.each(["USD", "EUR", "GBP"] as const)(
    "preserves %s explicit snapshots and 1250 revenue/offset arithmetic",
    async (currency) => {
      const a = accounts(currency),
        j = fresh(a),
        offset = fresh(a, "1250", "debit"),
        before = structuredClone({ a, j, offset });
      expect((await compose(j, role(a[0]), a)).ok).toBe(true);
      expect(await sum(a[0])).toMatchObject({
        debitMinorUnits: 0n,
        creditMinorUnits: 1250n,
        balanceMinorUnits: 1250n,
      });
      expect((await sum(a[1])).balanceMinorUnits).toBe(1250n);
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
          fresh(a, "1250", "debit"),
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
    a[0] = { ...a[0], name: "Synthetic revenue \ud800" };
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
      await owner.query<{ tablename: string }>(
        "SELECT tablename FROM pg_tables WHERE schemaname='public' ORDER BY tablename",
      )
    ).rows.map((row) => row.tablename);
    expect(tables).toEqual([
      "ledger_account_snapshots",
      "ledger_entries",
      "ledger_idempotency_keys",
      "ledger_reversals",
      "ledger_transactions",
      "pgmigrations",
    ]);
  });
  it.each([
    "wrong role",
    "wrong class",
    "wrong normal side",
    "closed revenue",
    "role currency drift",
    "role owner drift",
    "role name drift",
    "wrong ledger",
    "missing revenue",
    "only revenue",
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
          r = change(r, ["account", "normalBalance"], "debit");
          break;
        case "closed revenue":
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
        case "missing revenue":
          j = {
            ...(j as LedgerJournalCandidate),
            entries: (j as LedgerJournalCandidate).entries.map((e) => ({
              ...e,
              accountId: a[1].id,
            })),
          };
          break;
        case "only revenue":
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

function posted(
  a: readonly [AccountCandidate, AccountCandidate],
  amount = "1250",
): LedgerJournalCandidate {
  const j = fresh(a, amount);
  return { ...j, transaction: { ...j.transaction, status: "posted" } };
}
function linked(j: LedgerJournalCandidate): LedgerReversalCandidate {
  const n = ++serial,
    id = `txn_${syntheticId(n)}`;
  return {
    contractVersion: LEDGER_REVERSAL_CONTRACT_VERSION,
    kind: "full",
    originalTransactionId: j.transaction.id,
    journal: {
      ...j,
      transaction: {
        ...j.transaction,
        id,
        idempotencyKey: `synthetic.revenue-reversal.${n}`,
        effectiveAt: "2026-10-08T00:00:00.000Z",
        recordedAt: "2026-10-08T00:00:00.000Z",
        provenance: { ...j.transaction.provenance, source: REVERSE_SOURCE },
      },
      entries: j.entries.map((e, i) => ({
        ...e,
        id: `ent_${syntheticId(n * 100 + i + 1)}`,
        transactionId: id,
        side: e.side === "credit" ? "debit" : "credit",
      })),
    },
  };
}
async function reverseCompose(
  request: LedgerReversalCandidate,
  original: LedgerJournalCandidate,
  a: readonly [AccountCandidate, AccountCandidate],
  append: LedgerReversalStore["append"] = (j, c) => reversalStore.append(j, c),
  source: unknown = REVERSE_SOURCE,
  originalAccounts: unknown = a,
) {
  const revenue = validateRevenueJournalCandidate(request.journal, role(a[0]), {
    source,
    accounts: a,
  });
  if (!revenue.ok) return revenue;
  const checked = validateLedgerReversalCandidate(
    request,
    original,
    originalAccounts,
    a,
  );
  return checked.ok ? append(request, a) : checked;
}
const invalidSources = [
  { namespace: "Synthetic.revenue", id: "revenue-A" },
  { namespace: "synthetic.revenue\n", id: "revenue-A" },
  { namespace: "synthetic.revenue", id: "revenue-A\n" },
  { namespace: "a".repeat(65), id: "revenue-A" },
  { namespace: "synthetic.revenue", id: "x".repeat(129) },
  { namespace: "synthetic.revenue", id: "" },
  { namespace: "synthetic.revenue", id: " revenue-A" },
  { namespace: "synthetic.revenue", id: 1250 },
];
describe("mandatory real explicit revenue source and malformed-wire composition", () => {
  it.each(["namespace", "id"] as const)(
    "refuses mismatched source %s before storage",
    async (field) => {
      const a = accounts(),
        before = await counts(),
        append = vi.fn((j: unknown, c: unknown) => store.append(j, c));
      expect(
        (
          await compose(fresh(a), role(a[0]), a, append, {
            ...FEE_SOURCE,
            [field]: "other",
          })
        ).ok,
      ).toBe(false);
      expect(append).not.toHaveBeenCalled();
      expect(await counts()).toEqual(before);
    },
  );
  it.each(invalidSources)(
    "refuses complete malformed source %s before storage",
    async (source) => {
      const a = accounts(),
        before = await counts(),
        append = vi.fn((j: unknown, c: unknown) => store.append(j, c));
      expect((await compose(fresh(a), role(a[0]), a, append, source)).ok).toBe(
        false,
      );
      expect(
        (
          await compose(
            change(fresh(a), ["transaction", "provenance", "source"], source),
            role(a[0]),
            a,
            append,
            source,
          )
        ).ok,
      ).toBe(false);
      expect(append).not.toHaveBeenCalled();
      expect(await counts()).toEqual(before);
    },
  );
  it.each(["0", "-1", "1.0", "01", "9223372036854775808", 1250])(
    "refuses malformed exact minor units %s without I/O",
    async (amount) => {
      const a = accounts(),
        before = await counts(),
        append = vi.fn((j: unknown, c: unknown) => store.append(j, c)),
        j = fresh(a);
      const bad = {
        ...j,
        entries: j.entries.map((e) => ({
          ...e,
          amount: { ...e.amount, minorUnits: amount },
        })),
      };
      expect((await compose(bad, role(a[0]), a, append)).ok).toBe(false);
      expect(append).not.toHaveBeenCalled();
      expect(await counts()).toEqual(before);
    },
  );
  it.each(["usd", "JPY", "USD\n"])(
    "refuses malformed currency %s before I/O",
    async (currency) => {
      const a = accounts(),
        before = await counts(),
        append = vi.fn((j: unknown, c: unknown) => store.append(j, c));
      expect(
        (
          await compose(
            change(fresh(a), ["entries", "0", "amount", "currency"], currency),
            role(a[0]),
            a,
            append,
          )
        ).ok,
      ).toBe(false);
      expect(append).not.toHaveBeenCalled();
      expect(await counts()).toEqual(before);
    },
  );
  it.each([false, true])(
    "refuses duplicate/conflicting receipts %s through exact delegated path/message",
    async (conflict) => {
      const a = accounts(),
        j = fresh(a),
        e = j.transaction.provenance.evidence[0]!,
        before = await counts(),
        append = vi.fn((j: unknown, c: unknown) => store.append(j, c));
      const result = await compose(
        change(
          j,
          ["transaction", "provenance", "evidence"],
          [e, conflict ? { ...e, contentHash: "sha256:" + "b".repeat(64) } : e],
        ),
        role(a[0]),
        a,
        append,
      );
      expect(result.ok).toBe(false);
      if (!result.ok)
        expect(result.issues).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              path:
                "$.transaction.provenance.evidence[1]." +
                (conflict ? "contentHash" : "receiptId"),
              message: conflict
                ? "Invalid supplied transaction: One receipt identity references different content hashes."
                : "Invalid supplied transaction: Receipt identity is repeated.",
            }),
          ]),
        );
      expect(append).not.toHaveBeenCalled();
      expect(await counts()).toEqual(before);
    },
  );
  it("permits different explicitly supplied revenue sources for the same Account without binding a registry", async () => {
    const a = accounts(),
      source: LedgerTransactionSourceReference = {
        namespace: "synthetic.other-revenue",
        id: "revenue-B",
      },
      j = change(fresh(a), ["transaction", "provenance", "source"], source);
    expect((await compose(fresh(a), role(a[0]), a)).ok).toBe(true);
    expect((await compose(j, role(a[0]), a, undefined, source)).ok).toBe(true);
    expect((await sum(a[0])).balanceMinorUnits).toBe(2500n);
    expect(
      (await read(a, j))[0]!.journal.transaction.provenance.source,
    ).toEqual(source);
  });
  it("keeps negative revenue balances exact without a clamp", async () => {
    const a = accounts();
    expect((await compose(fresh(a, "2500", "debit"), role(a[0]), a)).ok).toBe(
      true,
    );
    expect((await sum(a[0])).balanceMinorUnits).toBe(-2500n);
  });
});
describe("mandatory real revenue full linked reversal composition", () => {
  it.each(["USD", "EUR", "GBP"] as const)(
    "links %s1250 reversal, retains original evidence/history and offsets exact balances",
    async (currency) => {
      const a = accounts(currency),
        j = posted(a),
        request = linked(j),
        before = structuredClone({ a, j, request });
      expect((await compose(j, role(a[0]), a)).ok).toBe(true);
      expect((await sum(a[0])).balanceMinorUnits).toBe(1250n);
      const original = await read(a, j);
      const result = await reverseCompose(request, j, a);
      expect(result.ok).toBe(true);
      if (result.ok)
        expect(result.receipt).toMatchObject({
          originalTransactionId: j.transaction.id,
          transactionId: request.journal.transaction.id,
          kind: "full",
          entryCount: 2,
        });
      for (const account of a)
        expect(await sum(account)).toMatchObject({
          debitMinorUnits: 1250n,
          creditMinorUnits: 1250n,
          balanceMinorUnits: 0n,
          transactionCount: 2n,
          entryCount: 2n,
        });
      const rows = (
        await owner.query(
          "SELECT original_transaction_id,reversal_transaction_id FROM public.ledger_reversals WHERE original_transaction_id=$1",
          [j.transaction.id],
        )
      ).rows;
      expect(rows).toEqual([
        {
          original_transaction_id: j.transaction.id,
          reversal_transaction_id: request.journal.transaction.id,
        },
      ]);
      const offset = (await read(a, request.journal))[0]!.journal;
      expect(offset.transaction.provenance.source).toEqual(REVERSE_SOURCE);
      expect(offset.transaction.provenance.moneyEventIds).toEqual(
        j.transaction.provenance.moneyEventIds,
      );
      expect(offset.transaction.provenance.evidence).toEqual(
        j.transaction.provenance.evidence,
      );
      expect(await read(a, j)).toEqual(original);
      expect({ a, j, request }).toEqual(before);
    },
  );
  it.each(["effectiveThrough", "recordedThrough"] as const)(
    "respects inclusive %s before/at linked reversal",
    async (clock) => {
      const a = accounts(),
        j = posted(a),
        request = linked(j);
      expect((await compose(j, role(a[0]), a)).ok).toBe(true);
      expect((await reverseCompose(request, j, a)).ok).toBe(true);
      expect(
        (
          await sum(a[0], {
            ...balanceQuery(a[0]).cutoffs,
            [clock]: "2026-10-07T23:59:59.999Z",
          })
        ).balanceMinorUnits,
      ).toBe(1250n);
      expect(
        (
          await sum(a[0], {
            ...balanceQuery(a[0]).cutoffs,
            [clock]: "2026-10-08T00:00:00.000Z",
          })
        ).balanceMinorUnits,
      ).toBe(0n);
    },
  );
  it.each(["partial", "event", "receipt", "snapshot"])(
    "refuses linked %s before I/O and preserves the posted original",
    async (kind) => {
      const a = accounts(),
        j = posted(a);
      let request = linked(j);
      expect((await compose(j, role(a[0]), a)).ok).toBe(true);
      const original = await read(a, j),
        before = await counts(),
        append = vi.fn((j: unknown, c: unknown) => reversalStore.append(j, c));
      if (kind === "partial")
        request = {
          ...request,
          journal: {
            ...request.journal,
            entries: request.journal.entries.map((e) => ({
              ...e,
              amount: { ...e.amount, minorUnits: "1000" },
            })),
          },
        };
      if (kind === "event")
        request = change(
          request,
          ["journal", "transaction", "provenance", "moneyEventIds"],
          [`evt_${syntheticId(++serial)}`],
        );
      if (kind === "receipt")
        request = change(
          request,
          [
            "journal",
            "transaction",
            "provenance",
            "evidence",
            "0",
            "contentHash",
          ],
          "sha256:" + "b".repeat(64),
        );
      const supplied =
        kind === "snapshot" ? change(a, ["0", "name"], "Drifted revenue") : a;
      const checked = await reverseCompose(
        request,
        j,
        supplied,
        append,
        REVERSE_SOURCE,
        a,
      );
      expect(checked.ok).toBe(false);
      expect(append).not.toHaveBeenCalled();
      expect(await counts()).toEqual(before);
      expect(await read(a, j)).toEqual(original);
    },
  );
  it("recovers the same linked outcome on exact retry and refuses a second key without changing history", async () => {
    const a = accounts(),
      j = posted(a),
      request = linked(j);
    expect((await compose(j, role(a[0]), a)).ok).toBe(true);
    const first = await reverseCompose(request, j, a);
    expect(first.ok).toBe(true);
    const before = await counts();
    expect(await reverseCompose(request, j, a)).toEqual(first);
    expect(await counts()).toEqual(before);
    const second = linked(j);
    await expect(reverseCompose(second, j, a)).rejects.toMatchObject({
      outcome: "not_stored",
    });
    expect(await counts()).toEqual(before);
    expect((await sum(a[0])).balanceMinorUnits).toBe(0n);
  });
});
