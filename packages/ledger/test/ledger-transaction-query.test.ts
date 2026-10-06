import { beforeEach, describe, expect, it, vi } from "vitest";
const driver = vi.hoisted(() => ({
  connect: vi.fn(),
  query: vi.fn(),
  release: vi.fn(),
  end: vi.fn(),
}));
vi.mock("pg", () => ({
  default: {
    Pool: class {
      connect = driver.connect;
      end = driver.end;
      on = vi.fn();
    },
  },
}));
import {
  createLedgerTransactionReader,
  validateLedgerTransactionQueryCandidate,
  LEDGER_TRANSACTION_QUERY_CONTRACT_VERSION,
  LedgerTransactionReadError,
} from "../src/index.js";
import type {
  AccountCandidate,
  LedgerTransactionQueryCandidate,
  LedgerTransactionQuerySelection,
} from "../src/index.js";
import { balanceAccounts, balanceJournal } from "./balance-synthetic.js";
import {
  storageAccounts,
  storageJournal,
  syntheticId,
} from "./storage-synthetic.js";
const url = "postgres://synthetic:synthetic@127.0.0.1:5432/synthetic";
const catalog = balanceAccounts(2_000_000);
const journal = (n = 2_000_000) => balanceJournal(n, catalog);
const page = { size: 1, afterTransactionId: null } as const;
function request(
  selection: LedgerTransactionQuerySelection = {
    kind: "transaction_id",
    transactionId: journal().transaction.id,
  },
): LedgerTransactionQueryCandidate {
  return {
    contractVersion: LEDGER_TRANSACTION_QUERY_CONTRACT_VERSION,
    ledgerId: catalog[0].ledgerId,
    selection,
    cutoffs: {
      effectiveThrough: "9999-12-31T23:59:59.999Z",
      recordedThrough: "9999-12-31T23:59:59.999Z",
    },
  };
}
const sourceSelection = () => ({
  kind: "source_reference" as const,
  source: journal().transaction.provenance.source,
  page,
});
const accountSelection = () => ({
  kind: "account_currency" as const,
  accountId: catalog[0].id,
  currency: "USD" as const,
  page,
});
function wire(j = journal(), accounts: readonly AccountCandidate[] = catalog) {
  return {
    journal: j,
    accounts: accounts.map((account) => ({
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
    })),
    entry_count: String(j.entries.length),
    account_count: String(accounts.length),
  };
}
const row = (records = [wire()]) => ({
  database_snapshot: "100:103:101,102",
  transactions: records,
});
let response: unknown;
beforeEach(() => {
  vi.resetAllMocks();
  response = row();
  driver.connect.mockResolvedValue({
    query: driver.query,
    release: driver.release,
  });
  driver.query.mockImplementation(async (sql: string) => ({
    rows: sql.startsWith("WITH") ? [response] : [],
  }));
});
async function read(input: unknown = request()) {
  const result = await createLedgerTransactionReader(url).query(input);
  if (!result.ok) throw new Error(JSON.stringify(result.issues));
  return result.value;
}
describe("explicit immutable query selection", () => {
  it.each([request(), request(sourceSelection()), request(accountSelection())])(
    "accepts and detaches each exact mode",
    (input) => {
      const result = validateLedgerTransactionQueryCandidate(input);
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error();
      expect(Object.isFrozen(result.value.selection)).toBe(true);
      expect(Object.isFrozen(result.value.cutoffs)).toBe(true);
      expect(result.value.selection).not.toBe(input.selection);
      if (result.value.selection.kind !== "transaction_id")
        expect(Object.isFrozen(result.value.selection.page)).toBe(true);
    },
  );
  it.each([
    null,
    undefined,
    true,
    1,
    "query",
    [],
    new Date(),
    Object.create({}),
  ])("rejects non-data root %s before connection", async (input) => {
    expect((await createLedgerTransactionReader(url).query(input)).ok).toBe(
      false,
    );
    expect(driver.connect).not.toHaveBeenCalled();
  });
  it.each(["contractVersion", "ledgerId", "selection", "cutoffs"])(
    "requires %s",
    async (field) => {
      const input = { ...request() } as Record<string, unknown>;
      delete input[field];
      expect((await createLedgerTransactionReader(url).query(input)).ok).toBe(
        false,
      );
      expect(driver.connect).not.toHaveBeenCalled();
    },
  );
  it.each([
    { kind: "transaction_id", transactionId: journal().transaction.id, page },
    {
      kind: "source_reference",
      source: journal().transaction.provenance.source,
    },
    { ...sourceSelection(), source: { namespace: "synthetic.provider" } },
    {
      ...sourceSelection(),
      source: { namespace: "synthetic.provider\n", id: "capture-1" },
    },
    {
      ...sourceSelection(),
      source: { namespace: "synthetic.provider", id: "capture-1\r" },
    },
    { ...sourceSelection(), transactionId: journal().transaction.id },
    { kind: "account_currency", accountId: catalog[0].id, page },
    { ...accountSelection(), currency: "usd" },
    { ...accountSelection(), accountId: catalog[0].id + "\n" },
    { ...accountSelection(), source: journal().transaction.provenance.source },
    { kind: "all", page },
    {},
    null,
    [],
  ])("rejects partial/mixed/unsupported selection %j", async (selection) => {
    expect(
      (
        await createLedgerTransactionReader(url).query({
          ...request(),
          selection,
        })
      ).ok,
    ).toBe(false);
    expect(driver.connect).not.toHaveBeenCalled();
  });
  it.each([0, -1, 51, 1.5, NaN, Infinity, "1", new Number(1), undefined, null])(
    "rejects page size %s",
    (size) => {
      expect(
        validateLedgerTransactionQueryCandidate({
          ...request(),
          selection: {
            ...sourceSelection(),
            page: { size, afterTransactionId: null },
          },
        }).ok,
      ).toBe(false);
    },
  );
  it.each([1, 50])("accepts page bound %s", (size) => {
    expect(
      validateLedgerTransactionQueryCandidate(
        request({
          ...sourceSelection(),
          page: { size, afterTransactionId: `txn_${syntheticId(2_000_001)}` },
        }),
      ).ok,
    ).toBe(true);
  });
  it.each([undefined, "", false, 0, journal().transaction.id + "\n"])(
    "rejects nonexplicit cursor %s",
    (afterTransactionId) => {
      expect(
        validateLedgerTransactionQueryCandidate({
          ...request(),
          selection: {
            ...sourceSelection(),
            page: { size: 1, afterTransactionId },
          },
        }).ok,
      ).toBe(false);
    },
  );
  it.each([
    "2026-10-06",
    "2026-01-01T00:00:00Z",
    "1900-02-29T00:00:00.000Z",
    "0000-01-01T00:00:00.000Z",
    "2026-02-30T00:00:00.000Z",
    "2026-01-01T00:00:00.000Z\n",
    new Date(),
    0,
    null,
  ])("rejects cutoff %s", (value) => {
    expect(
      validateLedgerTransactionQueryCandidate({
        ...request(),
        cutoffs: { effectiveThrough: value, recordedThrough: value },
      }).ok,
    ).toBe(false);
  });
  it.each([
    "0001-01-01T00:00:00.000Z",
    "9999-12-31T23:59:59.999Z",
    "2000-02-29T23:59:59.999Z",
  ])("accepts calendar bound %s independently", (value) => {
    expect(
      validateLedgerTransactionQueryCandidate({
        ...request(),
        cutoffs: {
          effectiveThrough: value,
          recordedThrough: "0001-01-01T00:00:00.000Z",
        },
      }).ok,
    ).toBe(true);
  });
  it("rejects getters/symbols/hidden fields/prototypes without invoking them", async () => {
    let calls = 0;
    for (const input of [
      Object.defineProperty({ ...request() }, "ledgerId", {
        get() {
          calls++;
          return catalog[0].ledgerId;
        },
      }),
      { ...request(), [Symbol()]: true },
      Object.defineProperty({ ...request() }, "secret", { value: true }),
      {
        ...request(),
        selection: Object.defineProperty({}, "kind", {
          enumerable: true,
          get() {
            calls++;
            return "transaction_id";
          },
        }),
      },
      { ...request(), cutoffs: Object.create(request().cutoffs) },
    ]) {
      expect((await createLedgerTransactionReader(url).query(input)).ok).toBe(
        false,
      );
    }
    expect(calls).toBe(0);
    expect(driver.connect).not.toHaveBeenCalled();
  });
  it("detaches during a pending connection", async () => {
    const input = structuredClone(request());
    driver.connect.mockImplementation(async () => {
      (input as { ledgerId: string }).ledgerId = "bad";
      return { query: driver.query, release: driver.release };
    });
    expect((await read(input)).query.ledgerId).toBe(catalog[0].ledgerId);
  });
});
describe("complete checked journal readback", () => {
  it("learning:1250 debit/credit returns both entries, local snapshots and exact amounts", async () => {
    const value = await read();
    const record = value.transactions[0];
    expect(record?.entryCount).toBe(2n);
    expect(record?.accountCount).toBe(2n);
    expect(
      record?.journal.entries.map((entry) => entry.amount.minorUnits),
    ).toEqual([1250n, 1250n]);
    expect(record?.journal.transaction.provenance).toEqual(
      journal().transaction.provenance,
    );
    expect(Object.isFrozen(record?.journal.entries)).toBe(true);
    expect(Object.isFrozen(record?.accounts[0]?.owner)).toBe(true);
    expect(value.nextAfterTransactionId).toBeNull();
    expect(value.statusScope).toBe("all_stored_headers");
    expect(driver.query.mock.calls[0]?.[0]).toContain(
      "REPEATABLE READ READ ONLY",
    );
    const [sql, parameters] = driver.query.mock.calls[1] ?? [];
    expect(sql).toContain("EXISTS");
    expect(sql).toContain('COLLATE "C"');
    expect(sql).not.toContain(journal().transaction.id);
    expect(parameters).toEqual([
      catalog[0].ledgerId,
      journal().transaction.id,
      null,
      null,
      null,
      null,
      request().cutoffs.effectiveThrough,
      request().cutoffs.recordedThrough,
      null,
      2,
    ]);
    expect(driver.query.mock.calls.at(-1)?.[0]).toBe("COMMIT");
    expect(driver.release).toHaveBeenCalledWith(false);
  });
  it("absent identity returns empty immutable result", async () => {
    response = row([]);
    expect((await read()).transactions).toEqual([]);
  });
  it("source keyset uses last returned, excludes lookahead, and accepts a cursor gap", async () => {
    response = row([wire(journal(2_000_010)), wire(journal(2_000_020))]);
    const value = await read(
      request({
        ...sourceSelection(),
        page: {
          size: 1,
          afterTransactionId: journal(2_000_005).transaction.id,
        },
      }),
    );
    expect(value.transactions).toHaveLength(1);
    expect(value.nextAfterTransactionId).toBe(
      journal(2_000_010).transaction.id,
    );
    expect(driver.query.mock.calls[1]?.[1]).toEqual([
      catalog[0].ledgerId,
      null,
      "synthetic.provider",
      "capture-1",
      null,
      null,
      request().cutoffs.effectiveThrough,
      request().cutoffs.recordedThrough,
      journal(2_000_005).transaction.id,
      2,
    ]);
  });
  it("validates lookahead and fails whole page on corruption", async () => {
    response = row([
      wire(journal()),
      { ...wire(journal(2_000_001)), entry_count: "3" },
    ]);
    await expect(read(request(sourceSelection()))).rejects.toBeInstanceOf(
      LedgerTransactionReadError,
    );
  });
  it("account/currency membership retains counteraccount and multicurrency legs", async () => {
    const j = storageJournal(
      2_000_000,
      ["9223372036854775807", "9007199254740993"],
      ["USD", "EUR"],
    );
    response = row([wire(j, storageAccounts().slice(0, 2))]);
    const value = await read({
      ...request(),
      ledgerId: j.transaction.ledgerId,
      selection: {
        kind: "account_currency",
        accountId: storageAccounts()[0]?.id,
        currency: "USD",
        page,
      },
    });
    expect(value.transactions[0]?.journal.entries).toHaveLength(8);
    expect(value.transactions[0]?.journal.totals[0]?.debitMinorUnits).toBe(
      9232379236109516800n,
    );
    expect(value.transactions[0]?.accounts).toHaveLength(2);
  });
  it("allows independent historical metadata and lossless UTF16 within each journal", async () => {
    const changed = balanceAccounts(2_000_000, "liability");
    const weird = changed.map((a) => ({ ...a, name: "astral💰 lone\ud800" }));
    response = row([
      wire(journal()),
      wire(balanceJournal(2_000_001, changed), weird),
    ]);
    const value = await read(
      request({
        ...sourceSelection(),
        page: { size: 2, afterTransactionId: null },
      }),
    );
    expect(value.transactions[1]?.accounts[0]?.name).toBe(
      "astral💰 lone\ud800",
    );
    expect(value.transactions[0]?.accounts[0]?.category).toBe("asset");
    expect(value.transactions[1]?.accounts[0]?.category).toBe("liability");
  });
  it("refuses an incomplete still-balanced set using independent count", async () => {
    const j = balanceJournal(2_000_000, catalog);
    response = row([{ ...wire(j), entry_count: "4" }]);
    await expect(read()).rejects.toBeInstanceOf(LedgerTransactionReadError);
  });
  it.each([
    () => null,
    () => ({ ...row(), extra: 1 }),
    () => ({ ...row(), database_snapshot: "103:100:" }),
    () => ({ ...row(), database_snapshot: "100:103:102,101" }),
    () => ({ ...row(), transactions: [{ ...wire(), entry_count: "02" }] }),
    () => ({ ...row(), transactions: [{ ...wire(), account_count: "1" }] }),
    () => ({
      ...row(),
      transactions: [{ ...wire(), journal: { ...journal(), entries: [] } }],
    }),
    () => ({ ...row(), transactions: [wire(journal(2_000_001))] }),
    () => ({ ...row(), transactions: [wire(journal()), wire(journal())] }),
    () => ({
      ...row(),
      transactions: [
        { ...wire(), accounts: [...wire().accounts, wire().accounts[0]] },
      ],
    }),
    () => ({
      ...row(),
      transactions: [
        {
          ...wire(),
          accounts: wire().accounts.map((a) => ({
            ...a,
            storageVersion: "future",
          })),
        },
      ],
    }),
    () => ({
      ...row(),
      transactions: [
        {
          ...wire(),
          accounts: wire().accounts.map((a) => ({
            ...a,
            account: {
              ...a.account,
              name: { representation: "utf16_code_units", units: [65536] },
            },
          })),
        },
      ],
    }),
  ])("refuses malformed aggregate atomically %s", async (make) => {
    response = make();
    await expect(read()).rejects.toMatchObject({
      name: "LedgerTransactionReadError",
      sqlState: null,
    });
    expect(driver.query.mock.calls.at(-1)?.[0]).toBe("ROLLBACK");
    expect(driver.release).toHaveBeenCalledWith(true);
  });
  it("rejects wrong ledger, source, account currency, clocks, order and bound", async () => {
    for (const input of [
      { ...request(), ledgerId: `ldg_${syntheticId(3)}` },
      request({
        ...sourceSelection(),
        source: { namespace: "other", id: "capture-1" },
      }),
      request({ ...accountSelection(), currency: "EUR" }),
      {
        ...request(),
        cutoffs: {
          ...request().cutoffs,
          effectiveThrough: "0001-01-01T00:00:00.000Z",
        },
      },
      request({
        ...sourceSelection(),
        page: { size: 1, afterTransactionId: journal().transaction.id },
      }),
    ])
      await expect(read(input)).rejects.toBeInstanceOf(
        LedgerTransactionReadError,
      );
    response = row([wire(journal(2_000_001)), wire(journal())]);
    await expect(
      read(
        request({
          ...sourceSelection(),
          page: { size: 2, afterTransactionId: null },
        }),
      ),
    ).rejects.toBeInstanceOf(LedgerTransactionReadError);
  });
  it("rejects unused catalog member even when journal arithmetic validates", async () => {
    const unused = { ...catalog[0], id: `acct_${syntheticId(55)}` };
    response = row([wire(journal(), [...catalog, unused])]);
    await expect(read()).rejects.toBeInstanceOf(LedgerTransactionReadError);
  });
  it("rejects sparse/accessor/hidden response arrays without getters", async () => {
    let calls = 0;
    const bad = [] as unknown[];
    bad.length = 1;
    const getter = Object.defineProperty([], "0", {
      enumerable: true,
      get() {
        calls++;
        return wire();
      },
    });
    for (const transactions of [
      bad,
      getter,
      Object.assign([wire()], { extra: true }),
    ]) {
      response = { ...row(), transactions };
      await expect(read()).rejects.toBeInstanceOf(LedgerTransactionReadError);
    }
    expect(calls).toBe(0);
  });
});
describe("explicit connections and failure lifecycle", () => {
  it.each([
    "",
    "postgres://host/db",
    "postgres://a:b@localhost/db",
    "postgres://a:b@localhost:5432/",
    "postgres://a:b@localhost:5432/db?x=y",
    "postgres://a:b@localhost:5432/db#hash",
    "https://a:b@localhost:5432/db",
  ])("rejects incomplete/ambient URL%s", (value) =>
    expect(() => createLedgerTransactionReader(value)).toThrow(),
  );
  it.each(["BEGIN", "WITH", "COMMIT"])(
    "sanitizes %s failure, destroys session and never retries",
    async (point) => {
      driver.query.mockImplementation(async (sql: string) => {
        if (sql.startsWith(point))
          throw { message: "secret password evidence", code: "40001" };
        return { rows: sql.startsWith("WITH") ? [row()] : [] };
      });
      await expect(read()).rejects.toMatchObject({
        message:
          "Unable to read complete transaction journals from one snapshot.",
        sqlState: "40001",
      });
      expect(driver.connect).toHaveBeenCalledTimes(1);
      expect(driver.release).toHaveBeenCalledWith(true);
    },
  );
  it("preserves sanitized error when rollback fails", async () => {
    driver.query.mockImplementation(async (sql: string) => {
      if (!sql.startsWith("BEGIN")) throw new Error("secret");
      return { rows: [] };
    });
    await expect(read()).rejects.toMatchObject({
      name: "LedgerTransactionReadError",
      sqlState: null,
    });
    expect(driver.release).toHaveBeenCalledWith(true);
  });
  it("sanitizes connection failure and closes pool", async () => {
    driver.connect.mockRejectedValue({ code: "28P01", message: "secret" });
    const reader = createLedgerTransactionReader(url);
    await expect(reader.query(request())).rejects.toMatchObject({
      sqlState: "28P01",
    });
    expect(driver.query).not.toHaveBeenCalled();
    await reader.close();
    expect(driver.end).toHaveBeenCalledOnce();
  });
});
