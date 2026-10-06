import pg from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import {
  createLedgerTransactionReader,
  createLedgerJournalStore,
  LEDGER_TRANSACTION_QUERY_CONTRACT_VERSION,
  LEDGER_TRANSACTION_STATUSES,
} from "../src/index.js";
import type {
  LedgerTransactionReader,
  LedgerJournalStore,
  LedgerTransactionQueryCandidate,
  LedgerTransactionQuerySelection,
  LedgerJournalCandidate,
  AccountCandidate,
} from "../src/index.js";
import { balanceAccounts, balanceJournal } from "./balance-synthetic.js";
import {
  syntheticId,
  storageJournal,
  storageAccounts,
} from "./storage-synthetic.js";
const database = "causalledger_m04_05_disposable";
function explicitUrl(name: string, role: string): string {
  const value = process.env[name];
  if (
    !value ||
    process.env.LEDGER_STORAGE_TEST_DISPOSABLE !==
      "YES_M04_05_SYNTHETIC_ONLY" ||
    process.env.LEDGER_STORAGE_TEST_DATABASE !== database
  )
    throw new Error(
      "Mandatory disposable PostgreSQL configuration absent; integration never skips.",
    );
  const url = new URL(value);
  if (
    !["postgres:", "postgresql:"].includes(url.protocol) ||
    url.hostname !== "127.0.0.1" ||
    url.pathname !== "/" + database ||
    url.username !== role ||
    !url.password ||
    !/^[1-9][0-9]*$/.test(url.port) ||
    Number(url.port) > 65535 ||
    url.search ||
    url.hash
  )
    throw new Error("Refusing unrecognized disposable target/role.");
  return value;
}
const owner = new pg.Client({
  connectionString: explicitUrl(
    "LEDGER_STORAGE_TEST_OWNER_URL",
    "causalledger_storage_owner",
  ),
});
const appUrl = explicitUrl(
  "LEDGER_STORAGE_TEST_APP_URL",
  "causalledger_storage_app",
);
const writer = new pg.Client({ connectionString: appUrl });
let reader: LedgerTransactionReader, store: LedgerJournalStore;
let serial = 2_000_000,
  namespace = 2_000_000;
const accounts = () => balanceAccounts(++namespace);
const fresh = (
  a: readonly [AccountCandidate, AccountCandidate],
  amount = "1250",
) => balanceJournal(++serial, a, amount);
function query(
  a: readonly [AccountCandidate, AccountCandidate],
  selection: LedgerTransactionQuerySelection,
): LedgerTransactionQueryCandidate {
  return {
    contractVersion: LEDGER_TRANSACTION_QUERY_CONTRACT_VERSION,
    ledgerId: a[0].ledgerId,
    selection,
    cutoffs: {
      effectiveThrough: "9999-12-31T23:59:59.999Z",
      recordedThrough: "9999-12-31T23:59:59.999Z",
    },
  };
}
const identity = (
  a: readonly [AccountCandidate, AccountCandidate],
  j: LedgerJournalCandidate,
) => query(a, { kind: "transaction_id", transactionId: j.transaction.id });
const list = (
  a: readonly [AccountCandidate, AccountCandidate],
  size = 50,
  afterTransactionId: string | null = null,
) =>
  query(a, {
    kind: "account_currency",
    accountId: a[0].id,
    currency: a[0].currency,
    page: { size, afterTransactionId },
  });
async function append(
  j: LedgerJournalCandidate,
  a: readonly AccountCandidate[],
) {
  expect((await store.append(j, a)).ok).toBe(true);
}
async function read(q: unknown) {
  const result = await reader.query(q);
  if (!result.ok) throw new Error(JSON.stringify(result.issues));
  return result.value;
}
async function direct(
  j: LedgerJournalCandidate,
  a: readonly AccountCandidate[],
) {
  const snapshots = a.map((account) => ({
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
  return writer.query(
    "SELECT public.append_ledger_journal($1::jsonb,$2::jsonb)",
    [JSON.stringify(j), JSON.stringify(snapshots)],
  );
}
beforeAll(async () => {
  await owner.connect();
  await writer.connect();
  expect(
    (
      await owner.query(
        "SELECT current_database() AS database,current_setting('server_version_num')::integer AS version",
      )
    ).rows[0],
  ).toMatchObject({ database, version: expect.any(Number) });
  const version = (await owner.query("SHOW server_version_num")).rows[0]
    ?.server_version_num as string;
  expect(Number(version)).toBeGreaterThanOrEqual(170000);
  expect(Number(version)).toBeLessThan(180000);
  reader = createLedgerTransactionReader(appUrl);
  store = createLedgerJournalStore(appUrl);
});
afterAll(async () => {
  await writer.query("ROLLBACK");
  await reader?.close();
  await store?.close();
  await writer.end();
  await owner.end();
});
describe("mandatory real PostgreSQL transaction query acceptance", () => {
  it("maximum50 page size bounds journals without truncating a large journal", async () => {
    const a = accounts();
    const raw = storageJournal(
      ++serial,
      Array.from({ length: 100 }, () => "1250"),
      ["USD"],
    );
    const j = {
      ...raw,
      transaction: { ...raw.transaction, ledgerId: a[0].ledgerId },
      entries: raw.entries.map((e) => ({
        ...e,
        ledgerId: a[0].ledgerId,
        accountId: e.side === "debit" ? a[0].id : a[1].id,
      })),
    };
    await append(j, a);
    for (let i = 0; i < 50; i++) await append(fresh(a), a);
    const v = await read(list(a, 50));
    expect(v.transactions).toHaveLength(50);
    expect(v.transactions[0]?.entryCount).toBe(200n);
    expect(v.transactions[0]?.journal.entries).toHaveLength(200);
    expect(v.nextAfterTransactionId).toBe(
      v.transactions.at(-1)?.journal.transaction.id,
    );
    expect(
      (await read(list(a, 50, v.nextAfterTransactionId))).transactions,
    ).toHaveLength(1);
  });
  it("learning: identity returns complete1250 debit/credit and both local accounts", async () => {
    const a = accounts(),
      j = fresh(a);
    await append(j, a);
    const value = await read(identity(a, j));
    expect(value.transactions).toHaveLength(1);
    expect(value.transactions[0]?.entryCount).toBe(2n);
    expect(value.transactions[0]?.accountCount).toBe(2n);
    expect(
      value.transactions[0]?.journal.entries.map((e) => e.amount.minorUnits),
    ).toEqual([1250n, 1250n]);
    expect(value.transactions[0]?.journal.transaction).toEqual(j.transaction);
    expect(value.nextAfterTransactionId).toBeNull();
  });
  it("absent identity and empty list return empty immutable pages", async () => {
    const a = accounts(),
      j = fresh(a);
    for (const q of [identity(a, j), list(a)]) {
      const v = await read(q);
      expect(v.transactions).toEqual([]);
      expect(v.nextAfterTransactionId).toBeNull();
      expect(Object.isFrozen(v.transactions)).toBe(true);
    }
  });
  it("wrong ledger cannot find stored ID", async () => {
    const a = accounts(),
      j = fresh(a);
    await append(j, a);
    expect((await read(identity(accounts(), j))).transactions).toEqual([]);
  });
  it("exact source AND namespace/id can select multiple whole journals", async () => {
    const a = accounts(),
      j1 = fresh(a),
      j2 = fresh(a);
    await append(j2, a);
    await append(j1, a);
    const changed = fresh(a);
    await append(
      {
        ...changed,
        transaction: {
          ...changed.transaction,
          provenance: {
            ...changed.transaction.provenance,
            source: { namespace: "other.provider", id: "capture-1" },
          },
        },
      },
      a,
    );
    const other = fresh(a);
    await append(
      {
        ...other,
        transaction: {
          ...other.transaction,
          provenance: {
            ...other.transaction.provenance,
            source: { namespace: "synthetic.provider", id: "other" },
          },
        },
      },
      a,
    );
    const v = await read(
      query(a, {
        kind: "source_reference",
        source: j1.transaction.provenance.source,
        page: { size: 50, afterTransactionId: null },
      }),
    );
    expect(v.transactions.map((r) => r.journal.transaction.id)).toEqual([
      j1.transaction.id,
      j2.transaction.id,
    ]);
    expect(v.transactions.every((r) => r.entryCount === 2n)).toBe(true);
  });
  it("source selection is scoped to ledger", async () => {
    const a = accounts(),
      other = accounts(),
      j = fresh(a),
      k = fresh(other);
    await append(j, a);
    await append(k, other);
    expect(
      (
        await read(
          query(a, {
            kind: "source_reference",
            source: j.transaction.provenance.source,
            page: { size: 50, afterTransactionId: null },
          }),
        )
      ).transactions.map((r) => r.journal.transaction.id),
    ).toEqual([j.transaction.id]);
  });
  it("account/currency qualification preserves counteraccounts", async () => {
    const a = accounts(),
      j = fresh(a);
    await append(j, a);
    const v = await read(list(a));
    expect(v.transactions[0]?.journal.entries.map((e) => e.accountId)).toEqual([
      a[0].id,
      a[1].id,
    ]);
    expect(
      (
        await read({
          ...list(a),
          selection: {
            kind: "account_currency",
            accountId: a[0].id,
            currency: "EUR",
            page: { size: 50, afterTransactionId: null },
          },
        })
      ).transactions,
    ).toEqual([]);
  });
  it("complete multicurrency journals retain other legs and exact totals", async () => {
    const n = ++serial;
    const raw = storageJournal(
      n,
      ["9223372036854775807", "9007199254740993"],
      ["USD", "EUR"],
    );
    const a = storageAccounts()
      .slice(0, 2)
      .map((v) => ({ ...v, ledgerId: `ldg_${syntheticId(++namespace)}` }));
    const first = a[0];
    if (!first) throw new Error();
    const ledger = first.ledgerId;
    const local = a.map((v) => ({ ...v, ledgerId: ledger }));
    const j = {
      ...raw,
      transaction: { ...raw.transaction, ledgerId: ledger },
      entries: raw.entries.map((e) => ({ ...e, ledgerId: ledger })),
    };
    await append(j, local);
    const v = await read({
      contractVersion: LEDGER_TRANSACTION_QUERY_CONTRACT_VERSION,
      ledgerId: ledger,
      selection: {
        kind: "account_currency",
        accountId: first.id,
        currency: "USD",
        page: { size: 1, afterTransactionId: null },
      },
      cutoffs: {
        effectiveThrough: "9999-12-31T23:59:59.999Z",
        recordedThrough: "9999-12-31T23:59:59.999Z",
      },
    });
    expect(v.transactions[0]?.journal.entries).toHaveLength(8);
    expect(
      v.transactions[0]?.journal.totals.map((t) => t.debitMinorUnits),
    ).toEqual([9232379236109516800n, 9232379236109516800n]);
    expect(v.transactions[0]?.accounts).toHaveLength(2);
  });
  it("keyset pages sort identity independent of insertion and clocks, never split entries", async () => {
    const a = accounts();
    const js = [fresh(a), fresh(a), fresh(a)];
    for (const j of [...js].reverse()) await append(j, a);
    let cursor: string | null = null;
    const seen: string[] = [];
    for (let i = 0; i < 3; i++) {
      const v = await read(list(a, 1, cursor));
      expect(v.transactions).toHaveLength(1);
      expect(v.transactions[0]?.journal.entries).toHaveLength(2);
      seen.push(v.transactions[0]!.journal.transaction.id);
      cursor = v.nextAfterTransactionId;
      if (i < 2) expect(cursor).toBe(seen.at(-1));
      else expect(cursor).toBeNull();
    }
    expect(seen).toEqual(js.map((j) => j.transaction.id));
  });
  it.each([1, 2, 3])(
    "exact-size %s has no false continuation",
    async (size) => {
      const a = accounts();
      for (let i = 0; i < size; i++) await append(fresh(a), a);
      const v = await read(list(a, size));
      expect(v.transactions).toHaveLength(size);
      expect(v.nextAfterTransactionId).toBeNull();
    },
  );
  it("exclusive cursor need not exist and beyond-end is empty", async () => {
    const a = accounts(),
      first = fresh(a);
    serial++;
    const gap = `txn_${syntheticId(serial)}`,
      last = fresh(a);
    await append(last, a);
    await append(first, a);
    expect(
      (await read(list(a, 50, gap))).transactions.map(
        (r) => r.journal.transaction.id,
      ),
    ).toEqual([last.transaction.id]);
    expect(
      (await read(list(a, 50, `txn_${syntheticId(serial + 100)}`)))
        .transactions,
    ).toEqual([]);
  });
  it.each(["effectiveThrough", "recordedThrough"] as const)(
    "inclusive %s boundary and AND filtering",
    async (field) => {
      const a = accounts(),
        j = fresh(a);
      await append(j, a);
      const q = identity(a, j);
      const at =
        field === "effectiveThrough"
          ? j.transaction.effectiveAt
          : j.transaction.recordedAt;
      for (const delta of [-1, 0, 1]) {
        const v = await read({
          ...q,
          cutoffs: {
            ...q.cutoffs,
            [field]: new Date(Date.parse(at) + delta).toISOString(),
          },
        });
        expect(v.transactions).toHaveLength(delta < 0 ? 0 : 1);
      }
    },
  );
  it("clocks independently ordered across IDs", async () => {
    const a = accounts(),
      j1 = fresh(a),
      j2 = fresh(a);
    await append(
      {
        ...j1,
        transaction: {
          ...j1.transaction,
          effectiveAt: "2026-10-03T00:00:00.000Z",
        },
      },
      a,
    );
    await append(
      {
        ...j2,
        transaction: {
          ...j2.transaction,
          effectiveAt: "2026-10-01T00:00:00.000Z",
        },
      },
      a,
    );
    expect(
      (await read(list(a))).transactions.map((r) => r.journal.transaction.id),
    ).toEqual([j1.transaction.id, j2.transaction.id]);
  });
  it.each(LEDGER_TRANSACTION_STATUSES)(
    "returns supplied %s status/provenance without posting inference",
    async (status) => {
      const a = accounts(),
        raw = fresh(a),
        j = { ...raw, transaction: { ...raw.transaction, status } };
      await append(j, a);
      const v = await read(identity(a, j));
      expect(v.statusScope).toBe("all_stored_headers");
      expect(v.transactions[0]?.journal.transaction).toEqual(j.transaction);
    },
  );
  it("journal-local metadata drift across same Account ID remains separate", async () => {
    const a = accounts(),
      j = fresh(a);
    await append(j, a);
    const changed = a.map((v) => ({
      ...v,
      category: "liability" as const,
      normalBalance: "credit" as const,
      name: "historical💰\ud800",
      status: "closed" as const,
    })) as [AccountCandidate, AccountCandidate];
    const k = fresh(changed);
    await append(k, changed);
    const v = await read(list(a));
    expect(v.transactions.map((r) => r.accounts[0]?.category)).toEqual([
      "asset",
      "liability",
    ]);
    expect(v.transactions[1]?.accounts[0]?.name).toBe("historical💰\ud800");
  });
  it("uncommitted append is invisible, later committed journal is complete", async () => {
    const a = accounts(),
      j = fresh(a);
    await writer.query("BEGIN");
    try {
      await direct(j, a);
      expect((await read(identity(a, j))).transactions).toEqual([]);
      await writer.query("COMMIT");
    } catch (e) {
      await writer.query("ROLLBACK");
      throw e;
    }
    expect((await read(identity(a, j))).transactions[0]?.entryCount).toBe(2n);
  });
  it("rolled back append stays absent", async () => {
    const a = accounts(),
      j = fresh(a);
    await writer.query("BEGIN");
    try {
      await direct(j, a);
    } finally {
      await writer.query("ROLLBACK");
    }
    expect((await read(identity(a, j))).transactions).toEqual([]);
  });
  it("queries leave history counts/content unchanged", async () => {
    const a = accounts(),
      j = fresh(a);
    await append(j, a);
    const sql =
      "SELECT (SELECT count(*) FROM public.ledger_transactions)::text AS transactions,(SELECT count(*) FROM public.ledger_entries)::text AS entries,(SELECT count(*) FROM public.ledger_account_snapshots)::text AS accounts";
    const before = (await owner.query(sql)).rows;
    for (const q of [
      identity(a, j),
      list(a),
      query(a, {
        kind: "source_reference",
        source: j.transaction.provenance.source,
        page: { size: 1, afterTransactionId: null },
      }),
    ])
      await read(q);
    expect((await owner.query(sql)).rows).toEqual(before);
  });
  it("concurrent writers/readers never expose partial grouped journals", async () => {
    const a = accounts();
    const writes = (async () => {
      for (let i = 0; i < 8; i++) await append(fresh(a), a);
    })();
    const reads = (async () => {
      for (let i = 0; i < 12; i++) {
        const v = await read(list(a));
        for (const r of v.transactions) {
          expect(r.entryCount).toBe(2n);
          expect(r.accountCount).toBe(2n);
          expect(r.journal.entries).toHaveLength(2);
          expect(r.journal.totals[0]?.debitMinorUnits).toBe(
            r.journal.totals[0]?.creditMinorUnits,
          );
        }
      }
    })();
    await Promise.all([writes, reads]);
    expect((await read(list(a))).transactions).toHaveLength(8);
  });
  it("later lower ID commit can be behind a passed cursor", async () => {
    const a = accounts(),
      lower = fresh(a),
      higher = fresh(a),
      last = fresh(a);
    await append(higher, a);
    await append(last, a);
    const first = await read(list(a, 1));
    expect(first.nextAfterTransactionId).toBe(higher.transaction.id);
    await append(lower, a);
    const next = await read(list(a, 1, first.nextAfterTransactionId));
    expect(next.transactions[0]?.journal.transaction.id).toBe(
      last.transaction.id,
    );
    expect((await read(list(a))).transactions).toHaveLength(3);
  });
  it("refused malformed selection makes no query result/history change", async () => {
    const a = accounts();
    const result = await reader.query({
      ...list(a),
      selection: {
        kind: "account_currency",
        accountId: a[0].id,
        page: { size: 1, afterTransactionId: null },
      },
    });
    expect(result.ok).toBe(false);
    expect(Object.hasOwn(result, "value")).toBe(false);
  });
});
