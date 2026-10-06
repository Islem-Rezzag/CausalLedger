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
  validateLedgerAccountBalanceQueryCandidate,
  createLedgerAccountBalanceReader,
  LedgerAccountBalanceReadError,
} from "../src/index.js";
import { balanceAccounts, balanceQuery } from "./balance-synthetic.js";
const url = "postgres://synthetic:synthetic@127.0.0.1:5432/synthetic";
const row = () => ({
  debit_minor_units: "1250",
  credit_minor_units: "250",
  entry_count: "2",
  transaction_count: "2",
  conflicts: "0",
  database_snapshot: "100:103:101,102",
});
beforeEach(() => {
  vi.resetAllMocks();
  driver.connect.mockResolvedValue({
    query: driver.query,
    release: driver.release,
  });
  driver.query.mockImplementation(async (sql: string) => ({
    rows: sql.startsWith("SELECT") ? [row()] : [],
  }));
});
describe("explicit balance request validation without I/O", () => {
  it.each(["active", "closed"] as const)(
    "accepts supplied %s metadata and detaches/freezes the selection",
    (status) => {
      const input = balanceQuery({ ...balanceAccounts()[0], status });
      const result = validateLedgerAccountBalanceQueryCandidate(input);
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error("Expected valid query");
      expect(Object.isFrozen(result.value)).toBe(true);
      expect(Object.isFrozen(result.value.account.owner)).toBe(true);
      expect(Object.isFrozen(result.value.cutoffs)).toBe(true);
      expect(result.value.account).not.toBe(input.account);
      expect(result.value.cutoffs).not.toBe(input.cutoffs);
    },
  );
  it.each([undefined, null, false, 42, "query", [], new Date()])(
    "refuses non-record input %s",
    async (input) => {
      const result = await createLedgerAccountBalanceReader(url).query(input);
      expect(result.ok).toBe(false);
      expect(Object.hasOwn(result, "value")).toBe(false);
      expect(driver.connect).not.toHaveBeenCalled();
    },
  );
  it.each(["contractVersion", "account", "signConvention", "cutoffs"])(
    "requires %s without a default",
    async (field) => {
      const input = { ...balanceQuery() } as Record<string, unknown>;
      delete input[field];
      const result = await createLedgerAccountBalanceReader(url).query(input);
      expect(result.ok).toBe(false);
      if (result.ok) throw new Error("Expected refusal");
      expect(result.issues).toContainEqual(
        expect.objectContaining({ code: "required_field", path: `$.${field}` }),
      );
      expect(driver.connect).not.toHaveBeenCalled();
    },
  );
  it.each(["effectiveThrough", "recordedThrough"])(
    "requires cutoff %s",
    (field) => {
      const input = structuredClone(balanceQuery()) as unknown as {
        cutoffs: Record<string, unknown>;
      };
      delete input.cutoffs[field];
      expect(validateLedgerAccountBalanceQueryCandidate(input).ok).toBe(false);
    },
  );
  it.each([
    undefined,
    null,
    0,
    new Date(),
    "",
    "2026-10-06",
    "2026-10-06T10:00:00Z",
    "2026-10-06T10:00:00.000+00:00",
    "0000-01-01T00:00:00.000Z",
    "10000-01-01T00:00:00.000Z",
    "1900-02-29T00:00:00.000Z",
    "2026-02-30T00:00:00.000Z",
    "2026-13-01T00:00:00.000Z",
    "2026-01-01T24:00:00.000Z",
    "2026-01-01T00:00:60.000Z",
    " 2026-01-01T00:00:00.000Z",
    "2026-01-01T00:00:00.000Z\n",
  ])("refuses malformed clock %s without connecting", async (value) => {
    const input = {
      ...balanceQuery(),
      cutoffs: { effectiveThrough: value, recordedThrough: value },
    };
    const result = await createLedgerAccountBalanceReader(url).query(input);
    expect(result.ok).toBe(false);
    expect(driver.connect).not.toHaveBeenCalled();
  });
  it.each([
    "0001-01-01T00:00:00.000Z",
    "9999-12-31T23:59:59.999Z",
    "2000-02-29T23:59:59.999Z",
    "2024-02-29T00:00:00.000Z",
  ])(
    "accepts unchanged calendar domain %s and independently ordered clocks",
    (value) => {
      expect(
        validateLedgerAccountBalanceQueryCandidate({
          ...balanceQuery(),
          cutoffs: {
            effectiveThrough: value,
            recordedThrough: "0001-01-01T00:00:00.000Z",
          },
        }).ok,
      ).toBe(true);
    },
  );
  it.each([
    { ...balanceQuery(), contractVersion: "future" },
    { ...balanceQuery(), signConvention: "debit_positive" },
    { ...balanceQuery(), unsafe: true },
    { ...balanceQuery(), cutoffs: { ...balanceQuery().cutoffs, latest: true } },
    {
      ...balanceQuery(),
      account: { ...balanceAccounts()[0], normalBalance: "credit" },
    },
    {
      ...balanceQuery(),
      account: { ...balanceAccounts()[0], currency: "usd" },
    },
    {
      ...balanceQuery(),
      account: { ...balanceAccounts()[0], ledgerId: "bad" },
    },
    { ...balanceQuery(), account: { ...balanceAccounts()[0], id: "bad" } },
  ])(
    "rejects malformed Account/contract/extra fields before I/O",
    async (input) => {
      expect(
        (await createLedgerAccountBalanceReader(url).query(input)).ok,
      ).toBe(false);
      expect(driver.connect).not.toHaveBeenCalled();
    },
  );
  it("does not invoke accessors, coercions or hidden/inherited fields and supports null-prototype dictionaries", () => {
    let getters = 0;
    const input = Object.defineProperty({ ...balanceQuery() }, "cutoffs", {
      enumerable: true,
      get() {
        getters++;
        throw new Error("Should not execute");
      },
    });
    expect(validateLedgerAccountBalanceQueryCandidate(input).ok).toBe(false);
    expect(getters).toBe(0);
    expect(
      validateLedgerAccountBalanceQueryCandidate(
        Object.assign(Object.create({ inherited: true }), balanceQuery()),
      ).ok,
    ).toBe(false);
    expect(
      validateLedgerAccountBalanceQueryCandidate(
        Object.defineProperty({ ...balanceQuery() }, "signConvention", {
          value: "account_normal_positive",
          enumerable: false,
        }),
      ).ok,
    ).toBe(false);
    expect(
      validateLedgerAccountBalanceQueryCandidate({
        ...balanceQuery(),
        [Symbol("hidden")]: true,
      }).ok,
    ).toBe(false);
    expect(
      validateLedgerAccountBalanceQueryCandidate(
        Object.assign(Object.create(null), balanceQuery()),
      ).ok,
    ).toBe(true);
  });
  it("freezes stable refusal issues without partial totals", () => {
    const input = { ...balanceQuery(), extra: true, signConvention: "bad" };
    const first = validateLedgerAccountBalanceQueryCandidate(input);
    expect(first).toEqual(validateLedgerAccountBalanceQueryCandidate(input));
    expect(Object.isFrozen(first.issues)).toBe(true);
    expect(first.issues.every(Object.isFrozen)).toBe(true);
    expect(Object.hasOwn(first, "value")).toBe(false);
  });
});
describe("read-only aggregate driver boundary (doubles, no database proof)", () => {
  it("refuses non-string connection/coercion and zero port", () => {
    let coerced = false;
    const input = {
      toString() {
        coerced = true;
        return url;
      },
    };
    expect(() =>
      createLedgerAccountBalanceReader(input as unknown as string),
    ).toThrow();
    expect(coerced).toBe(false);
    expect(() =>
      createLedgerAccountBalanceReader("postgres://a:b@127.0.0.1:0/db"),
    ).toThrow();
  });
  it.each([
    "",
    "http://a:b@127.0.0.1:5432/db",
    "postgres://127.0.0.1/db",
    "postgres://a:b@127.0.0.1/db",
    "postgres://a:b@127.0.0.1:5432/",
    "postgres://a:b@127.0.0.1:5432/db?options=unsafe",
    "postgres://a:b@127.0.0.1:5432/db#fragment",
  ])("requires complete explicit connection %s", (config) => {
    expect(() => createLedgerAccountBalanceReader(config)).toThrow();
    expect(driver.connect).not.toHaveBeenCalled();
  });
  it("demonstrates debit1250 credit250 =>1000 with one parameterized SELECT in a read-only snapshot", async () => {
    const input = balanceQuery();
    const reader = createLedgerAccountBalanceReader(url);
    expect(Object.isFrozen(reader)).toBe(true);
    expect(Object.hasOwn(reader, "append")).toBe(false);
    const result = await reader.query(input);
    if (!result.ok) throw new Error("Expected balance");
    expect(result.value).toMatchObject({
      debitMinorUnits: 1250n,
      creditMinorUnits: 250n,
      balanceMinorUnits: 1000n,
      entryCount: 2n,
      transactionCount: 2n,
      databaseSnapshot: "100:103:101,102",
      statusScope: "all_stored_headers",
    });
    expect(Object.isFrozen(result.value)).toBe(true);
    expect(driver.query.mock.calls.map((call) => call[0])).toEqual([
      "BEGIN TRANSACTION ISOLATION LEVEL REPEATABLE READ READ ONLY",
      expect.stringContaining("SELECT"),
      "COMMIT",
    ]);
    expect(driver.query.mock.calls[1]?.[1]).toEqual([
      input.account.ledgerId,
      input.account.id,
      input.account.currency,
      input.cutoffs.effectiveThrough,
      input.cutoffs.recordedThrough,
      "debit",
      "asset",
    ]);
    expect(driver.release).toHaveBeenCalledWith(false);
    await reader.close();
    expect(driver.end).toHaveBeenCalledOnce();
  });
  it.each(["asset", "expense", "liability", "equity", "revenue"] as const)(
    "uses explicit %s normal-positive sign including negative values",
    async (category) => {
      const result = await createLedgerAccountBalanceReader(url).query(
        balanceQuery(balanceAccounts(1_000_000, category)[0]),
      );
      expect(result.ok && result.value.balanceMinorUnits).toBe(
        category === "asset" || category === "expense" ? 1000n : -1000n,
      );
    },
  );
  it("retains totals beyond int64/Number safety and zero net exactly", async () => {
    const huge = "18446744073709551614";
    driver.query.mockImplementation(async (sql: string) => ({
      rows: sql.startsWith("SELECT")
        ? [
            {
              ...row(),
              debit_minor_units: huge,
              credit_minor_units: "1",
              entry_count: "3",
            },
          ]
        : [],
    }));
    const first =
      await createLedgerAccountBalanceReader(url).query(balanceQuery());
    expect(first.ok && first.value.balanceMinorUnits).toBe(
      18446744073709551613n,
    );
    driver.query.mockImplementation(async (sql: string) => ({
      rows: sql.startsWith("SELECT")
        ? [
            {
              ...row(),
              debit_minor_units: huge,
              credit_minor_units: huge,
              entry_count: "4",
            },
          ]
        : [],
    }));
    const second =
      await createLedgerAccountBalanceReader(url).query(balanceQuery());
    expect(second.ok && second.value.balanceMinorUnits).toBe(0n);
  });
  it("returns valid empty selection zeros without claiming existence", async () => {
    driver.query.mockImplementation(async (sql: string) => ({
      rows: sql.startsWith("SELECT")
        ? [
            {
              ...row(),
              debit_minor_units: "0",
              credit_minor_units: "0",
              entry_count: "0",
              transaction_count: "0",
            },
          ]
        : [],
    }));
    const result =
      await createLedgerAccountBalanceReader(url).query(balanceQuery());
    expect(result.ok && result.value.balanceMinorUnits).toBe(0n);
    expect(result.ok && result.value.entryCount).toBe(0n);
  });
  it("refuses contributing metadata conflicts without a partial balance", async () => {
    driver.query.mockImplementation(async (sql: string) => ({
      rows: sql.startsWith("SELECT") ? [{ ...row(), conflicts: "1" }] : [],
    }));
    const result =
      await createLedgerAccountBalanceReader(url).query(balanceQuery());
    expect(result.ok).toBe(false);
    expect(Object.hasOwn(result, "value")).toBe(false);
    if (!result.ok)
      expect(result.issues[0]?.code).toBe("conflicting_account_snapshot");
    expect(driver.query).toHaveBeenLastCalledWith("COMMIT");
  });
  it.each([
    null,
    {},
    { ...row(), extra: true },
    { ...row(), debit_minor_units: "-1" },
    { ...row(), debit_minor_units: "01" },
    { ...row(), debit_minor_units: "1\r" },
    { ...row(), debit_minor_units: "1\n" },
    { ...row(), debit_minor_units: "1e3" },
    { ...row(), debit_minor_units: "1.0" },
    { ...row(), debit_minor_units: 1250 },
    { ...row(), credit_minor_units: 250n },
    { ...row(), transaction_count: "3" },
    { ...row(), conflicts: "3" },
    { ...row(), entry_count: "0" },
    { ...row(), transaction_count: "0" },
    { ...row(), debit_minor_units: "0", credit_minor_units: "0" },
    { ...row(), database_snapshot: "" },
    { ...row(), database_snapshot: "2:1:" },
    { ...row(), database_snapshot: "100:103:102,101" },
    { ...row(), database_snapshot: "100:103:103" },
    { ...row(), database_snapshot: "100:103:\r" },
  ])(
    "sanitizes malformed aggregate %s and discards the session",
    async (aggregate) => {
      driver.query.mockImplementation(async (sql: string) => ({
        rows: sql.startsWith("SELECT") ? [aggregate] : [],
      }));
      await expect(
        createLedgerAccountBalanceReader(url).query(balanceQuery()),
      ).rejects.toBeInstanceOf(LedgerAccountBalanceReadError);
      expect(driver.query).toHaveBeenLastCalledWith("ROLLBACK");
      expect(driver.release).toHaveBeenCalledWith(true);
    },
  );
  it.each([{ rows: [] }, { rows: [row(), row()] }])(
    "refuses missing/extra aggregate rows",
    async ({ rows }) => {
      driver.query.mockImplementation(async (sql: string) => ({
        rows: sql.startsWith("SELECT") ? rows : [],
      }));
      await expect(
        createLedgerAccountBalanceReader(url).query(balanceQuery()),
      ).rejects.toBeInstanceOf(LedgerAccountBalanceReadError);
    },
  );
  it.each(["BEGIN", "SELECT", "COMMIT"])(
    "sanitizes %s failure, releases and never retries",
    async (stage) => {
      driver.query.mockImplementation(async (sql: string) => {
        if (sql.startsWith(stage))
          throw Object.assign(new Error("private password/diagnostic"), {
            code: "42501",
          });
        return { rows: sql.startsWith("SELECT") ? [row()] : [] };
      });
      const result =
        createLedgerAccountBalanceReader(url).query(balanceQuery());
      await expect(result).rejects.toMatchObject({
        name: "LedgerAccountBalanceReadError",
        sqlState: "42501",
      });
      await expect(result).rejects.not.toThrow("private");
      expect(driver.connect).toHaveBeenCalledOnce();
      expect(driver.release).toHaveBeenCalledWith(true);
    },
  );
  it("sanitizes connect/rollback failure without exposing secrets", async () => {
    driver.connect.mockRejectedValue(new Error("private connect secret"));
    await expect(
      createLedgerAccountBalanceReader(url).query(balanceQuery()),
    ).rejects.toMatchObject({ sqlState: null });
    expect(driver.query).not.toHaveBeenCalled();
    expect(driver.release).not.toHaveBeenCalled();
    driver.connect.mockResolvedValue({
      query: driver.query,
      release: driver.release,
    });
    driver.query.mockImplementation(async (sql: string) => {
      if (sql.startsWith("SELECT"))
        throw Object.assign(new Error("private query secret"), {
          code: "secret",
        });
      if (sql === "ROLLBACK") throw new Error("private rollback secret");
      return { rows: [] };
    });
    await expect(
      createLedgerAccountBalanceReader(url).query(balanceQuery()),
    ).rejects.toMatchObject({ sqlState: null });
    expect(driver.query).toHaveBeenLastCalledWith("ROLLBACK");
    expect(driver.release).toHaveBeenCalledWith(true);
  });
});
