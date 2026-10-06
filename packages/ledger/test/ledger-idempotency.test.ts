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
  createIdempotentLedgerJournalStore,
  IdempotentLedgerJournalStorageError,
  LEDGER_IDEMPOTENCY_CONTRACT_VERSION,
  validateLedgerIdempotencyCandidate,
} from "../src/index.js";
import {
  storageAccounts,
  storageJournal,
  syntheticId,
} from "./storage-synthetic.js";
import type { LedgerJournalCandidate } from "../src/index.js";
const url = "postgres://synthetic:synthetic@127.0.0.1:5432/synthetic";
function identity(
  j: unknown = storageJournal(),
  a: unknown = storageAccounts(),
) {
  const result = validateLedgerIdempotencyCandidate(j, a);
  if (!result.ok) throw new Error("invalid fixture");
  return result.value;
}
function change(
  j: LedgerJournalCandidate,
  path: string[],
  value: unknown,
): LedgerJournalCandidate {
  const output = structuredClone(j);
  let object = output as unknown as Record<string, unknown>;
  for (const key of path.slice(0, -1))
    object = object[key] as Record<string, unknown>;
  object[path[path.length - 1] as string] = value;
  return output;
}
const receipt = {
  contractVersion: LEDGER_IDEMPOTENCY_CONTRACT_VERSION,
  transactionId: storageJournal().transaction.id,
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
describe("pure semantic identity", () => {
  it("defines the exact ledger/source/key scope and canonical bounded bigint string", () => {
    const value = identity(storageJournal(1, ["9223372036854775807"]));
    expect(value.scope).toEqual({
      ledgerId: storageJournal().transaction.ledgerId,
      sourceNamespace: "synthetic.provider",
      key: "synthetic.same-key",
    });
    expect(value.canonicalPayload).toContain(
      '"minorUnits":"9223372036854775807"',
    );
    expect(value.canonicalPayload).not.toContain('"idempotencyKey"');
    expect(value.canonicalPayload).not.toContain('"transactionId"');
    expect(Object.isFrozen(value)).toBe(true);
    expect(Object.isFrozen(value.scope)).toBe(true);
    expect(driver.connect).not.toHaveBeenCalled();
  });
  it("same intent with new attempt IDs, reversed entries/catalog and object order is identical", () => {
    const next = storageJournal(2, ["1250", "2500"], ["USD", "EUR"]);
    const first = storageJournal(1, ["1250", "2500"], ["USD", "EUR"]);
    expect(
      identity(
        { ...next, entries: [...next.entries].reverse() },
        [...storageAccounts()].reverse(),
      ),
    ).toEqual(identity(first));
  });
  it("money-event/evidence set order is immaterial while contents remain exact", () => {
    const j = storageJournal();
    const p = {
      ...j.transaction.provenance,
      moneyEventIds: [`evt_${syntheticId(2)}`, `evt_${syntheticId(1)}`],
      evidence: [
        ...j.transaction.provenance.evidence,
        {
          receiptId: `rcpt_${syntheticId(2)}`,
          contentHash: `sha256:${"b".repeat(64)}`,
        },
      ],
    };
    const a = { ...j, transaction: { ...j.transaction, provenance: p } };
    const b = {
      ...j,
      transaction: {
        ...j.transaction,
        provenance: {
          ...p,
          moneyEventIds: [...p.moneyEventIds].reverse(),
          evidence: [...p.evidence].reverse(),
        },
      },
    };
    expect(identity(a)).toEqual(identity(b));
  });
  it("keeps semantic line multiplicity and refuses splitting/merging equivalence", () => {
    expect(
      identity(storageJournal(1, ["1250", "1250"])).canonicalPayload,
    ).not.toEqual(identity(storageJournal(1, ["2500"])).canonicalPayload);
  });
  it.each([
    [["transaction", "status"], "posted"],
    [["transaction", "effectiveAt"], "2026-10-03T10:00:00.000Z"],
    [["transaction", "recordedAt"], "2026-10-03T10:01:00.000Z"],
    [["transaction", "provenance", "source", "id"], "capture-2"],
    [["transaction", "provenance", "moneyEventIds"], [`evt_${syntheticId(1)}`]],
    [
      ["transaction", "provenance", "evidence", "0", "contentHash"],
      `sha256:${"b".repeat(64)}`,
    ],
    [
      ["transaction", "provenance", "evidence", "0", "receiptId"],
      `rcpt_${syntheticId(2)}`,
    ],
  ] as const)(
    "material header change %j changes exact identity",
    (path, value) =>
      expect(
        identity(change(storageJournal(), [...path], value)).canonicalPayload,
      ).not.toEqual(identity().canonicalPayload),
  );
  it.each(["name", "owner", "status", "category"])(
    "referenced account %s is material",
    (field) => {
      const accounts = storageAccounts().map((a, i) =>
        i === 0
          ? {
              ...a,
              ...(field === "name"
                ? { name: "Changed" }
                : field === "owner"
                  ? { owner: { ...a.owner, id: "other" } }
                  : field === "status"
                    ? { status: "closed" as const }
                    : { category: "expense" as const }),
            }
          : a,
      );
      expect(identity(storageJournal(), accounts).canonicalPayload).not.toEqual(
        identity().canonicalPayload,
      );
    },
  );
  it("excludes unreferenced valid snapshots but validates the full catalog", () => {
    const a = storageAccounts();
    expect(identity(storageJournal(), [a[0]])).toEqual(identity());
    expect(
      identity(
        storageJournal(),
        a.map((x, i) => (i === 1 ? { ...x, name: "Unreferenced changed" } : x)),
      ),
    ).toEqual(identity());
    expect(
      validateLedgerIdempotencyCandidate(storageJournal(), [
        ...a,
        { ...a[1], id: "invalid" },
      ]).ok,
    ).toBe(false);
  });
  it("preserves lone UTF16 surrogates and does not normalize Unicode", () => {
    const a = storageAccounts().map((x, i) =>
      i === 0 ? { ...x, name: "Synthetic \ud800" } : x,
    );
    expect(identity(storageJournal(), a).canonicalPayload).toContain("55296");
    expect(identity(storageJournal(), a).canonicalPayload).not.toEqual(
      identity(
        storageJournal(),
        a.map((x) => ({ ...x, name: "Synthetic \ufffd" })),
      ).canonicalPayload,
    );
  });
  it("scope is case-sensitive and never defaults", () => {
    const j = storageJournal();
    const b = change(
      j,
      ["transaction", "idempotencyKey"],
      "Synthetic.same-key",
    );
    expect(identity(b).scope).not.toEqual(identity().scope);
    expect(identity(b).canonicalPayload).toEqual(identity().canonicalPayload);
  });
});
describe("strict input refusal before replay or I/O", () => {
  it.each([
    null,
    {},
    [],
    { ...storageJournal(), entries: [] },
    change(storageJournal(), ["transaction", "id"], "txn_bad"),
    change(
      storageJournal(),
      ["entries", "1", "id"],
      storageJournal().entries[0]?.id,
    ),
    change(
      storageJournal(),
      ["entries", "1", "transactionId"],
      storageJournal(2).transaction.id,
    ),
    change(storageJournal(), ["entries", "1", "amount", "minorUnits"], "1249"),
    change(storageJournal(), ["entries", "1", "amount", "minorUnits"], 1250),
    change(
      storageJournal(),
      ["entries", "1", "amount", "minorUnits"],
      "9223372036854775808",
    ),
    change(storageJournal(), ["transaction", "idempotencyKey"], ""),
    change(storageJournal(), ["transaction", "extra"], true),
  ])("invalid attempt %j has no authority", async (input) => {
    const value = await createIdempotentLedgerJournalStore(url).append(
      input,
      storageAccounts(),
    );
    expect(value.ok).toBe(false);
    expect(driver.connect).not.toHaveBeenCalled();
    expect(Object.hasOwn(value, "receipt")).toBe(false);
  });
  it("does not invoke getter, toJSON or unsafe array accessors", async () => {
    const getter = vi.fn(() => storageJournal().transaction);
    const j = { ...storageJournal() };
    Object.defineProperty(j, "transaction", { get: getter, enumerable: true });
    expect(
      (
        await createIdempotentLedgerJournalStore(url).append(
          j,
          storageAccounts(),
        )
      ).ok,
    ).toBe(false);
    expect(getter).not.toHaveBeenCalled();
    const encode = vi.fn();
    expect(
      validateLedgerIdempotencyCandidate(
        { ...storageJournal(), toJSON: encode },
        storageAccounts(),
      ).ok,
    ).toBe(false);
    expect(encode).not.toHaveBeenCalled();
    const entries = [...storageJournal().entries];
    Object.defineProperty(entries, "0", { get: getter, enumerable: true });
    expect(
      validateLedgerIdempotencyCandidate(
        { ...storageJournal(), entries },
        storageAccounts(),
      ).ok,
    ).toBe(false);
    expect(getter).not.toHaveBeenCalled();
  });
});
describe("private idempotent driver boundary (doubles, not database evidence)", () => {
  it.each([
    "",
    "postgres://127.0.0.1/db",
    "postgres://a:b@127.0.0.1/db",
    "postgres://a:b@127.0.0.1:5432/",
    "http://a:b@127.0.0.1:5432/db",
    "postgres://a:b@127.0.0.1:5432/db?options=unsafe",
  ])("requires explicit connection %s", (config) =>
    expect(() => createIdempotentLedgerJournalStore(config)).toThrow(),
  );
  it("demo returns original immutable receipt for valid renamed attempt; balanced1251 conflicts", async () => {
    const store = createIdempotentLedgerJournalStore(url);
    const first = await store.append(storageJournal(), storageAccounts());
    const retry = await store.append(storageJournal(2), storageAccounts());
    expect(retry).toEqual(first);
    expect(first).toEqual({ ok: true, receipt });
    expect(Object.isFrozen(first)).toBe(true);
    if (first.ok) expect(Object.isFrozen(first.receipt)).toBe(true);
    driver.query.mockRejectedValueOnce({
      code: "23505",
      message: "secret URL/payload",
    });
    await expect(
      store.append(storageJournal(3, ["1251"]), storageAccounts()),
    ).rejects.toMatchObject({ outcome: "not_stored", sqlState: "23505" });
    await store.close();
    expect(driver.end).toHaveBeenCalledTimes(1);
  });
  it("establishes read committed then sends only two detached JSON parameters, never caller SQL/digest", async () => {
    await createIdempotentLedgerJournalStore(url).append(
      storageJournal(),
      storageAccounts(),
    );
    expect(driver.options).toHaveBeenCalledWith({
      connectionString: url,
      max: 1,
      connectionTimeoutMillis: 5000,
    });
    expect(driver.query.mock.calls[0]?.[0]).toBe(
      "SET SESSION CHARACTERISTICS AS TRANSACTION ISOLATION LEVEL READ COMMITTED",
    );
    expect(driver.query.mock.calls[1]?.[0]).toBe(
      "SELECT public.append_idempotent_ledger_journal($1::jsonb,$2::jsonb) AS receipt",
    );
    const values = driver.query.mock.calls[1]?.[1] as string[];
    expect(values).toHaveLength(2);
    expect(JSON.parse(values[0] as string)).toEqual(storageJournal());
    expect(JSON.parse(values[1] as string)).toHaveLength(1);
    expect(driver.release).toHaveBeenCalledWith(false);
  });
  it("detaches input before awaiting connection", async () => {
    const j = structuredClone(storageJournal());
    driver.connect.mockImplementation(async () => {
      Object.assign(j.transaction, { idempotencyKey: "changed" });
      return { query: driver.query, release: driver.release };
    });
    await createIdempotentLedgerJournalStore(url).append(j, storageAccounts());
    const values = driver.query.mock.calls[1]?.[1] as string[];
    expect(JSON.parse(values[0] as string).transaction.idempotencyKey).toBe(
      "synthetic.same-key",
    );
  });
  it("connection/setup failures are not_stored and perform no append", async () => {
    driver.connect.mockRejectedValueOnce(new Error("secret"));
    await expect(
      createIdempotentLedgerJournalStore(url).append(
        storageJournal(),
        storageAccounts(),
      ),
    ).rejects.toMatchObject({ outcome: "not_stored", sqlState: null });
    expect(driver.query).not.toHaveBeenCalled();
    driver.query.mockRejectedValueOnce(new Error("secret"));
    await expect(
      createIdempotentLedgerJournalStore(url).append(
        storageJournal(),
        storageAccounts(),
      ),
    ).rejects.toMatchObject({ outcome: "not_stored" });
    expect(driver.query).toHaveBeenCalledTimes(1);
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
  ])("server refusal %s is sanitized with no automatic retry", async (code) => {
    driver.query.mockImplementation((sql: string) =>
      sql.startsWith("SET ")
        ? Promise.resolve({ rows: [] })
        : Promise.reject({ code, message: "secret" }),
    );
    const error = await createIdempotentLedgerJournalStore(url)
      .append(storageJournal(), storageAccounts())
      .catch((e: unknown) => e);
    expect(error).toBeInstanceOf(IdempotentLedgerJournalStorageError);
    expect(error).toMatchObject({ outcome: "not_stored", sqlState: code });
    expect(String(error)).not.toContain("secret");
    expect(driver.query).toHaveBeenCalledTimes(2);
  });
  it.each(["08006", "57P01", "40003", "ECONNRESET"])(
    "uncertain acknowledgement %s destroys client, returns unknown, never retries",
    async (code) => {
      driver.query.mockImplementation((sql: string) =>
        sql.startsWith("SET ")
          ? Promise.resolve({ rows: [] })
          : Promise.reject({ code, message: "secret" }),
      );
      await expect(
        createIdempotentLedgerJournalStore(url).append(
          storageJournal(),
          storageAccounts(),
        ),
      ).rejects.toMatchObject({
        outcome: "unknown",
        sqlState: code.length === 5 ? code : null,
      });
      expect(driver.release).toHaveBeenCalledWith(true);
      expect(driver.query).toHaveBeenCalledTimes(2);
    },
  );
  it.each([
    undefined,
    null,
    {},
    { ...receipt, entryCount: 3 },
    { ...receipt, transactionId: "txn_bad" },
    { ...receipt, contractVersion: "bad" },
    { ...receipt, extra: "untrusted" },
  ])("invalid receipt %j leaves outcome unknown", async (receipt) => {
    driver.query.mockImplementation((sql: string) =>
      Promise.resolve(
        sql.startsWith("SET ") ? { rows: [] } : { rows: [{ receipt }] },
      ),
    );
    await expect(
      createIdempotentLedgerJournalStore(url).append(
        storageJournal(),
        storageAccounts(),
      ),
    ).rejects.toMatchObject({ outcome: "unknown" });
    expect(driver.release).toHaveBeenCalledWith(true);
  });
});
