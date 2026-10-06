import { beforeEach, describe, expect, it, vi } from "vitest";
const driver = vi.hoisted(() => ({
  connect: vi.fn(),
  query: vi.fn(),
  release: vi.fn(),
  end: vi.fn(),
  options: vi.fn(),
}));
vi.mock("pg", () => ({
  default: {
    Pool: class {
      constructor(options: unknown) {
        driver.options(options);
      }
      connect = driver.connect;
      end = driver.end;
      on = vi.fn();
    },
  },
}));
import {
  createLedgerReversalStore,
  LEDGER_REVERSAL_CONTRACT_VERSION,
  LedgerReversalStorageError,
  validateLedgerReversalCandidate,
} from "../src/index.js";
import type {
  LedgerJournalCandidate,
  LedgerReversalCandidate,
} from "../src/index.js";
import {
  storageAccounts,
  storageJournal,
  syntheticId,
} from "./storage-synthetic.js";
const url = "postgres://synthetic:synthetic@127.0.0.1:5432/synthetic";
function original(
  n = 1,
  amounts: readonly string[] = ["1250"],
  currencies: readonly ("USD" | "EUR" | "GBP")[] = ["USD"],
): LedgerJournalCandidate {
  const j = storageJournal(n, amounts, currencies);
  return { ...j, transaction: { ...j.transaction, status: "posted" } };
}
function reversal(j = original(), n = 2): LedgerReversalCandidate {
  const next = storageJournal(n);
  return {
    contractVersion: LEDGER_REVERSAL_CONTRACT_VERSION,
    kind: "full",
    originalTransactionId: j.transaction.id,
    journal: {
      ...j,
      transaction: {
        ...j.transaction,
        id: next.transaction.id,
        idempotencyKey: "synthetic.reversal",
        provenance: {
          ...j.transaction.provenance,
          source: { namespace: "synthetic.reversal", id: "reverse-1" },
        },
      },
      entries: j.entries.map((e, i) => ({
        ...e,
        id: `ent_${syntheticId(n * 100 + i + 1)}`,
        transactionId: next.transaction.id,
        side: e.side === "debit" ? "credit" : "debit",
      })),
    },
  };
}
function change<T>(input: T, path: string[], value: unknown): T {
  const result = structuredClone(input);
  let object = result as Record<string, unknown>;
  for (const key of path.slice(0, -1))
    object = object[key] as Record<string, unknown>;
  object[path[path.length - 1] as string] = value;
  return result;
}
function check(
  input: unknown = reversal(),
  j: unknown = original(),
  a: unknown = storageAccounts(),
  next: unknown = a,
) {
  return validateLedgerReversalCandidate(input, j, a, next);
}
const receipt = {
  contractVersion: LEDGER_REVERSAL_CONTRACT_VERSION,
  kind: "full",
  originalTransactionId: original().transaction.id,
  transactionId: reversal().journal.transaction.id,
  entryCount: 2,
};
beforeEach(() => {
  vi.resetAllMocks();
  driver.connect.mockResolvedValue({
    query: driver.query,
    release: driver.release,
  });
  driver.query.mockImplementation((sql: string) =>
    Promise.resolve(
      sql.startsWith("SET ") ? { rows: [] } : { rows: [{ receipt }] },
    ),
  );
});
describe("full reversal pure comparison", () => {
  it("validates the inverse, separate source, original link and frozen scoped identity without persistence", () => {
    const result = check();
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value.originalTransactionId).toBe(original().transaction.id);
    expect(result.value.scope.key).toBe("synthetic.reversal");
    expect(Object.isFrozen(result.value)).toBe(true);
    expect(Object.isFrozen(result.value.scope)).toBe(true);
    expect(driver.connect).not.toHaveBeenCalled();
  });
  it("retains arbitrary-size totals, per-line maximum, multicurrency and exact multiplicity", () => {
    const j = original(
      1,
      ["9223372036854775807", "9223372036854775807"],
      ["USD", "EUR", "GBP"],
    );
    expect(check(reversal(j), j).ok).toBe(true);
  });
  it("new attempt IDs/order and unreferenced valid catalog order do not change retry identity", () => {
    const j = original(1, ["1250", "2500"], ["USD", "EUR"]),
      a = reversal(j),
      b = reversal(j, 3);
    const reordered = {
      ...b,
      journal: { ...b.journal, entries: [...b.journal.entries].reverse() },
    };
    expect(check(a, j)).toEqual(
      check(reordered, j, storageAccounts(), [...storageAccounts()].reverse()),
    );
  });
  it("accepts lossless UTF16 Account names and extra explicit provenance", () => {
    const j = original(),
      a = storageAccounts().map((account) => ({
        ...account,
        name: "Synthetic \ud800",
      }));
    const next = change(
      reversal(j),
      ["journal", "transaction", "provenance", "evidence"],
      [
        ...j.transaction.provenance.evidence,
        {
          receiptId: `rcpt_${syntheticId(2)}`,
          contentHash: `sha256:${"b".repeat(64)}`,
        },
      ],
    );
    expect(check(next, j, a).ok).toBe(true);
  });
  it("requires original event IDs, permitting reordered supersets", () => {
    const j = change(
      original(),
      ["transaction", "provenance", "moneyEventIds"],
      [`evt_${syntheticId(1)}`],
    );
    expect(
      check(
        change(
          reversal(j),
          ["journal", "transaction", "provenance", "moneyEventIds"],
          [`evt_${syntheticId(2)}`, `evt_${syntheticId(1)}`],
        ),
        j,
      ).ok,
    ).toBe(true);
    expect(
      check(
        change(
          reversal(j),
          ["journal", "transaction", "provenance", "moneyEventIds"],
          [],
        ),
        j,
      ).ok,
    ).toBe(false);
  });
  it.each([
    [["kind"], "partial"],
    [["contractVersion"], "m04.09-ledger-reversal.v2"],
    [["originalTransactionId"], "bad"],
    [["originalTransactionId"], reversal().journal.transaction.id],
    [["journal", "transaction", "status"], "pending"],
    [["journal", "entries", "0", "side"], "debit"],
    [["journal", "entries", "0", "amount", "minorUnits"], "0"],
    [
      ["journal", "transaction", "provenance", "evidence", "0", "contentHash"],
      `sha256:${"b".repeat(64)}`,
    ],
  ] as const)("refuses malformed metadata/provenance %s", (path, value) => {
    expect(check(change(reversal(), [...path], value)).ok).toBe(false);
  });
  it.each(["pending", "reversed", "voided"])(
    "refuses non-posted original %s",
    (status) => {
      expect(
        check(reversal(), change(original(), ["transaction", "status"], status))
          .ok,
      ).toBe(false);
    },
  );
  it("refuses a different original, missing original and invalid original catalog", () => {
    expect(check(reversal(), original(3)).ok).toBe(false);
    expect(check(reversal(), null).ok).toBe(false);
    expect(check(reversal(), original(), []).ok).toBe(false);
  });
  it("requires fresh entry IDs in pure comparison", () => {
    expect(
      check(
        change(
          reversal(),
          ["journal", "entries", "0", "id"],
          original().entries[0]!.id,
        ),
      ).ok,
    ).toBe(false);
  });
  it.each(["1251", "625"])(
    "refuses balanced changed/partial amount %s",
    (amount) => {
      const request = reversal();
      expect(
        check({
          ...request,
          journal: {
            ...request.journal,
            entries: request.journal.entries.map((e) => ({
              ...e,
              amount: { ...e.amount, minorUnits: amount },
            })),
          },
        }).ok,
      ).toBe(false);
    },
  );
  it("refuses line splits/merges while totals still balance", () => {
    const request = reversal();
    const split = {
      ...request,
      journal: {
        ...request.journal,
        entries: request.journal.entries.flatMap((e, i) =>
          [625, 625].map((n, k) => ({
            ...e,
            id: `ent_${syntheticId(1000 + i * 2 + k)}`,
            amount: { ...e.amount, minorUnits: String(n) },
          })),
        ),
      },
    };
    expect(check(split).ok).toBe(false);
    const j = original(1, ["625", "625"]);
    expect(check(reversal(original()), j).ok).toBe(false);
  });
  it("refuses balanced account drift and currency drift", () => {
    const request = reversal(),
      catalog = storageAccounts();
    const extra = { ...catalog[0]!, id: `acct_${syntheticId(10)}` };
    const moved = {
      ...request,
      journal: {
        ...request.journal,
        entries: request.journal.entries.map((e) => ({
          ...e,
          accountId: extra.id,
        })),
      },
    };
    expect(check(moved, original(), catalog, [...catalog, extra]).ok).toBe(
      false,
    );
    expect(check(reversal(original(1, ["1250"], ["EUR"])), original()).ok).toBe(
      false,
    );
  });
  it.each(
    [["name"], ["owner", "id"], ["status"], ["category"]].map((path) => ({
      path,
    })),
  )("refuses referenced Account snapshot drift $path", ({ path }) => {
    const values: Record<string, string> = {
      name: "different",
      id: "other",
      status: "inactive",
      category: "liability",
    };
    const a = storageAccounts();
    expect(
      check(
        reversal(),
        original(),
        a,
        change(a, ["0", ...path], values[path.at(-1)!]),
      ).ok,
    ).toBe(false);
  });
  it("binds wrapper original ID and new clocks/source/provenance in canonical retry identity", () => {
    const first = check();
    const next = check(
      change(
        reversal(),
        ["journal", "transaction", "recordedAt"],
        "2026-10-03T00:00:00.000Z",
      ),
    );
    expect(
      first.ok &&
        next.ok &&
        first.value.canonicalPayload !== next.value.canonicalPayload,
    ).toBe(true);
    const j = original(4);
    const other = check(reversal(j, 2), j);
    expect(
      other.ok &&
        first.ok &&
        other.value.canonicalPayload !== first.value.canonicalPayload,
    ).toBe(true);
  });
  it.each([null, [], {}, Object.create({}), new Date()])(
    "refuses non-strict wrappers %s",
    (input) => {
      expect(check(input).ok).toBe(false);
    },
  );
  it("refuses unknown/hidden/symbol/accessor wrapper fields without reading getters", () => {
    const getter = vi.fn(() => {
      throw new Error("sensitive");
    });
    const request = reversal();
    for (const value of [
      { ...request, extra: true },
      Object.defineProperty({ ...request }, "extra", { value: true }),
      { ...request, [Symbol("x")]: 1 },
      Object.defineProperty({ ...request }, "journal", {
        get: getter,
        enumerable: true,
      }),
    ])
      expect(check(value).ok).toBe(false);
    expect(getter).not.toHaveBeenCalled();
    expect(
      check(
        new Proxy(request, {
          ownKeys() {
            throw new Error("sensitive");
          },
        }),
      ).ok,
    ).toBe(false);
  });
});
describe("separate narrow store", () => {
  it("uses one explicit isolated READ COMMITTED call and returns detached original receipt", async () => {
    const store = createLedgerReversalStore(url);
    const result = await store.append(reversal(), storageAccounts());
    expect(result).toEqual({ ok: true, receipt });
    expect(Object.keys(store).sort()).toEqual(["append", "close"]);
    expect(driver.options).toHaveBeenCalledWith({
      connectionString: url,
      max: 1,
      connectionTimeoutMillis: 5000,
    });
    expect(driver.query.mock.calls[0]?.[0]).toContain("READ COMMITTED");
    const call = driver.query.mock.calls[1]!;
    expect(call[0]).toContain("append_ledger_reversal");
    const params = call[1] as string[];
    expect(JSON.parse(params[0]!)).toEqual(reversal());
    expect(JSON.parse(params[1]!).length).toBe(1);
    expect(driver.release).toHaveBeenCalledWith(false);
    await store.close();
    expect(driver.end).toHaveBeenCalledOnce();
  });
  it("invalid local request never connects", async () => {
    const result = await createLedgerReversalStore(url).append(
      change(reversal(), ["kind"], "partial"),
      storageAccounts(),
    );
    expect(result.ok).toBe(false);
    expect(driver.connect).not.toHaveBeenCalled();
  });
  it("allows receipt ID different from retry attempt ID", async () => {
    const result = await createLedgerReversalStore(url).append(
      reversal(original(), 3),
      storageAccounts(),
    );
    expect(result).toEqual({ ok: true, receipt });
  });
  it.each([
    "23505",
    "23514",
    "22023",
    "42501",
    "55000",
    "40001",
    "40P01",
    "57014",
  ])("sanitizes confirmed rollback %s", async (code) => {
    driver.query.mockRejectedValueOnce({ code, message: "sensitive" });
    await expect(
      createLedgerReversalStore(url).append(reversal(), storageAccounts()),
    ).rejects.toMatchObject({
      name: "LedgerReversalStorageError",
      outcome: "not_stored",
      sqlState: code,
    });
  });
  it("acknowledgement loss is unknown and never automatically retried", async () => {
    driver.query
      .mockResolvedValueOnce({ rows: [] })
      .mockRejectedValueOnce({ code: "08006", message: "sensitive" });
    const store = createLedgerReversalStore(url);
    await expect(
      store.append(reversal(), storageAccounts()),
    ).rejects.toMatchObject({ outcome: "unknown", sqlState: "08006" });
    expect(driver.query).toHaveBeenCalledTimes(2);
    expect(driver.release).toHaveBeenCalledWith(true);
  });
  it("never evaluates inherited/accessor/hostile driver error metadata", async () => {
    const getter = vi.fn(() => {
      throw new Error("sensitive");
    });
    for (const error of [
      Object.create({ code: "23505" }),
      Object.defineProperty({}, "code", { get: getter }),
      new Proxy(
        {},
        {
          getOwnPropertyDescriptor() {
            throw new Error("sensitive");
          },
        },
      ),
    ]) {
      driver.query
        .mockResolvedValueOnce({ rows: [] })
        .mockRejectedValueOnce(error);
      await expect(
        createLedgerReversalStore(url).append(reversal(), storageAccounts()),
      ).rejects.toMatchObject({ outcome: "unknown", sqlState: null });
    }
    expect(getter).not.toHaveBeenCalled();
  });
  it.each([
    { ...receipt, kind: "partial" },
    { ...receipt, originalTransactionId: `txn_${syntheticId(9)}` },
    { ...receipt, transactionId: receipt.originalTransactionId },
    { ...receipt, contractVersion: "other" },
    { ...receipt, entryCount: 3 },
    { ...receipt, extra: true },
    null,
  ])("refuses inconsistent acknowledgement %s", async (bad) => {
    driver.query
      .mockResolvedValueOnce({ rows: [] })
      .mockResolvedValueOnce({ rows: [{ receipt: bad }] });
    await expect(
      createLedgerReversalStore(url).append(reversal(), storageAccounts()),
    ).rejects.toBeInstanceOf(LedgerReversalStorageError);
    expect(driver.release).toHaveBeenCalledWith(true);
  });
  it("refuses hidden/accessor receipt data without executing getters", async () => {
    const getter = vi.fn(() => "sensitive");
    for (const bad of [
      Object.defineProperty({ ...receipt }, "hidden", { value: 1 }),
      Object.defineProperty({ ...receipt }, "transactionId", {
        get: getter,
        enumerable: true,
      }),
    ]) {
      driver.query
        .mockResolvedValueOnce({ rows: [] })
        .mockResolvedValueOnce({ rows: [{ receipt: bad }] });
      await expect(
        createLedgerReversalStore(url).append(reversal(), storageAccounts()),
      ).rejects.toMatchObject({ outcome: "unknown" });
    }
    expect(getter).not.toHaveBeenCalled();
  });
  it.each([
    "",
    "postgres://u:p@127.0.0.1/db",
    "postgres://u@127.0.0.1:5432/db",
    url + "?options=x",
    url + "#x",
    "http://u:p@127.0.0.1:5432/db",
  ])("refuses ambient/unsafe URL %s", (value) => {
    expect(() => createLedgerReversalStore(value)).toThrow(TypeError);
  });
});
