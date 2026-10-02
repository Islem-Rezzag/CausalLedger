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
  createLedgerJournalStore,
  LedgerJournalStorageError,
  LEDGER_STORAGE_CONTRACT_VERSION,
} from "../src/index.js";
import { storageAccounts, storageJournal } from "./storage-synthetic.js";
const url = "postgres://synthetic:synthetic@127.0.0.1:5432/synthetic";
beforeEach(() => {
  vi.resetAllMocks();
  driver.connect.mockResolvedValue({
    query: driver.query,
    release: driver.release,
  });
  driver.query.mockResolvedValue({
    rows: [
      {
        receipt: {
          contractVersion: LEDGER_STORAGE_CONTRACT_VERSION,
          transactionId: storageJournal().transaction.id,
          entryCount: 2,
        },
      },
    ],
  });
});
describe("explicit storage boundary (driver doubles, not PostgreSQL evidence)", () => {
  it.each([
    "",
    "postgres://127.0.0.1/db",
    "postgres://a:b@127.0.0.1/db",
    "postgres://a:b@127.0.0.1:5432/",
    "http://a:b@127.0.0.1:5432/db",
    "postgres://a:b@127.0.0.1:5432/db?options=unsafe",
  ])("refuses incomplete or ambient connection configuration %s", (config) => {
    expect(() => createLedgerJournalStore(config)).toThrow();
    expect(driver.connect).not.toHaveBeenCalled();
  });
  it("demonstrates synthetic USD1250 persisted together and USD1249 refused before I/O", async () => {
    const store = createLedgerJournalStore(url);
    const success = await store.append(storageJournal(), storageAccounts());
    expect(success).toEqual({
      ok: true,
      receipt: {
        contractVersion: LEDGER_STORAGE_CONTRACT_VERSION,
        transactionId: storageJournal().transaction.id,
        entryCount: 2,
      },
    });
    expect(Object.isFrozen(success)).toBe(true);
    if (success.ok) expect(Object.isFrozen(success.receipt)).toBe(true);
    const bad = structuredClone(storageJournal());
    const entry = bad.entries[1];
    if (!entry) throw new Error("test fixture");
    const failure = await store.append(
      {
        ...bad,
        entries: [
          bad.entries[0],
          { ...entry, amount: { ...entry.amount, minorUnits: "1249" } },
        ],
      },
      storageAccounts(),
    );
    expect(failure.ok).toBe(false);
    expect(Object.hasOwn(failure, "receipt")).toBe(false);
    expect(driver.connect).toHaveBeenCalledTimes(1);
    expect(driver.release).toHaveBeenCalledTimes(1);
    await store.close();
    expect(driver.end).toHaveBeenCalledTimes(1);
  });
  it.each([
    undefined,
    {},
    null,
    { ...storageJournal(), entries: [] },
    { ...storageJournal(), entries: [storageJournal().entries[0]] },
    {
      ...storageJournal(),
      entries: [storageJournal().entries[0], storageJournal().entries[0]],
    },
  ])(
    "refuses malformed, empty, one-sided and duplicate candidates without connection",
    async (input) => {
      const store = createLedgerJournalStore(url);
      expect((await store.append(input, storageAccounts())).ok).toBe(false);
      expect(driver.connect).not.toHaveBeenCalled();
      await store.close();
    },
  );
  it.each(
    [
      [],
      null,
      [storageAccounts()[0], storageAccounts()[0]],
      [{ ...storageAccounts()[0], currency: "JPY" }],
    ].map((catalog) => ({ catalog })),
  )(
    "refuses missing or invalid catalog without connection",
    async ({ catalog }) => {
      const store = createLedgerJournalStore(url);
      expect((await store.append(storageJournal(), catalog)).ok).toBe(false);
      expect(driver.connect).not.toHaveBeenCalled();
      await store.close();
    },
  );
  it("serializes detached exact money and versioned referenced names, preserving source inputs", async () => {
    const journal = storageJournal(
      1,
      ["9223372036854775807", "9007199254740993"],
      ["USD", "EUR"],
    );
    driver.query.mockResolvedValue({
      rows: [
        {
          receipt: {
            contractVersion: LEDGER_STORAGE_CONTRACT_VERSION,
            transactionId: journal.transaction.id,
            entryCount: 8,
          },
        },
      ],
    });
    const accounts = storageAccounts().map((a) => ({
      ...a,
      name: "Synthetic 😀\ud800",
    }));
    const before = structuredClone({ journal, accounts });
    const store = createLedgerJournalStore(url);
    expect((await store.append(journal, accounts)).ok).toBe(true);
    expect({ journal, accounts }).toEqual(before);
    expect(driver.query).toHaveBeenCalledTimes(1);
    const call = driver.query.mock.calls[0];
    if (!call) throw new Error("test fixture");
    expect(call[0]).toBe(
      "SELECT public.append_ledger_journal($1::jsonb, $2::jsonb) AS receipt",
    );
    const params = call[1] as string[];
    const encoded = JSON.parse(params[0] ?? "null") as {
      entries: { amount: { minorUnits: unknown } }[];
    };
    expect(encoded.entries.map((e) => e.amount.minorUnits)).toEqual(
      journal.entries.map((e) => e.amount.minorUnits),
    );
    const stored = JSON.parse(params[1] ?? "null") as {
      storageVersion: string;
      account: { id: string; name: { units: number[] } };
    }[];
    expect(stored).toHaveLength(2);
    expect(stored[0]?.storageVersion).toBe("m04.05-account-snapshot.v1");
    expect(String.fromCharCode(...(stored[0]?.account.name.units ?? []))).toBe(
      accounts[0]?.name,
    );
    await store.close();
  });
  it.each(["22023", "22003", "23503", "23505", "23514", "42501", "55000"])(
    "reports atomic server refusal %s without retry",
    async (code) => {
      driver.query.mockRejectedValue({
        code,
        message: "untrusted raw diagnostics",
      });
      const store = createLedgerJournalStore(url);
      await expect(
        store.append(storageJournal(), storageAccounts()),
      ).rejects.toMatchObject({ outcome: "not_stored", sqlState: code });
      expect(driver.query).toHaveBeenCalledTimes(1);
      expect(driver.release).toHaveBeenCalledTimes(1);
      await store.close();
    },
  );
  it.each([
    {},
    { code: "ECONNRESET" },
    { code: "08006" },
    { code: "57P01" },
    { code: "XX000" },
  ])(
    "keeps possible lost acknowledgement unknown without automatic retry",
    async (error) => {
      driver.query.mockRejectedValue(error);
      const store = createLedgerJournalStore(url);
      await expect(
        store.append(storageJournal(), storageAccounts()),
      ).rejects.toMatchObject({ outcome: "unknown" });
      expect(driver.query).toHaveBeenCalledTimes(1);
      expect(driver.release).toHaveBeenCalledTimes(1);
      await store.close();
    },
  );
  it("reports connection failure before any statement as not stored", async () => {
    driver.connect.mockRejectedValue({ code: "ECONNREFUSED" });
    const store = createLedgerJournalStore(url);
    await expect(
      store.append(storageJournal(), storageAccounts()),
    ).rejects.toBeInstanceOf(LedgerJournalStorageError);
    await expect(
      store.append(storageJournal(), storageAccounts()),
    ).rejects.toMatchObject({ outcome: "not_stored" });
    expect(driver.query).not.toHaveBeenCalled();
    expect(driver.release).not.toHaveBeenCalled();
    await store.close();
  });
  it.each(
    [
      [],
      [{ receipt: null }],
      [{ receipt: {} }],
      [
        {
          receipt: {
            contractVersion: LEDGER_STORAGE_CONTRACT_VERSION,
            transactionId: "txn_wrong",
            entryCount: 2,
          },
        },
      ],
      [
        {
          receipt: {
            contractVersion: LEDGER_STORAGE_CONTRACT_VERSION,
            transactionId: storageJournal().transaction.id,
            entryCount: 3,
          },
        },
      ],
    ].map((rows) => ({ rows })),
  )(
    "refuses malformed acknowledgement without claiming rollback",
    async ({ rows }) => {
      driver.query.mockResolvedValue({ rows });
      const store = createLedgerJournalStore(url);
      await expect(
        store.append(storageJournal(), storageAccounts()),
      ).rejects.toMatchObject({ outcome: "unknown" });
      expect(driver.release).toHaveBeenCalledTimes(1);
      await store.close();
    },
  );
});
