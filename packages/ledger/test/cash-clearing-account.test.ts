import { describe, expect, it, vi } from "vitest";
import {
  CASH_CLEARING_ACCOUNT_CONTRACT_VERSION,
  validateCashClearingAccountCandidate,
  validateCashClearingJournalCandidate,
} from "../src/index.js";
import type {
  AccountCandidate,
  CashClearingAccountCandidate,
} from "../src/index.js";
import { balanceAccounts, balanceJournal } from "./balance-synthetic.js";
import { storageAccounts, syntheticId } from "./storage-synthetic.js";
const catalog = () => balanceAccounts(5000000);
const wrapper = (
  account: AccountCandidate = catalog()[0],
): CashClearingAccountCandidate => ({
  contractVersion: CASH_CLEARING_ACCOUNT_CONTRACT_VERSION,
  role: "cash_clearing",
  account,
});
const journal = () => balanceJournal(5000000, catalog());
function change<T>(input: T, path: string[], value: unknown): T {
  const output = structuredClone(input);
  let object = output as Record<string, unknown>;
  for (const key of path.slice(0, -1))
    object = object[key] as Record<string, unknown>;
  object[path.at(-1)!] = value;
  return output;
}
const check = (
  input: unknown = journal(),
  role: unknown = wrapper(),
  accounts: unknown = catalog(),
) => validateCashClearingJournalCandidate(input, role, accounts);
describe("explicit pure cash-clearing role", () => {
  it("returns frozen detached asset/debit metadata, including explicit ownership and ledger", () => {
    const input = wrapper(),
      before = structuredClone(input),
      result = validateCashClearingAccountCandidate(input);
    expect(result.ok).toBe(true);
    expect(input).toEqual(before);
    if (result.ok) {
      expect(result.value).toEqual(input);
      expect(result.value.account).not.toBe(input.account);
      expect(Object.isFrozen(result.value)).toBe(true);
      expect(Object.isFrozen(result.value.account.owner)).toBe(true);
    }
  });
  it.each(["USD", "EUR", "GBP"] as const)(
    "requires explicit supported %s currency",
    (currency) => {
      expect(
        validateCashClearingAccountCandidate(
          wrapper(balanceAccounts(5000000, "asset", currency)[0]),
        ).ok,
      ).toBe(true);
    },
  );
  it("accepts closed metadata for inspection and refuses new journal use", () => {
    const a = change(catalog(), ["0", "status"], "closed"),
      role = wrapper(a[0]);
    expect(validateCashClearingAccountCandidate(role).ok).toBe(true);
    expect(check(journal(), role, a).ok).toBe(false);
  });
  it.each([
    { path: ["role"], value: "provider_clearing" },
    { path: ["contractVersion"], value: "other" },
    { path: ["account", "currency"], value: "usd" },
    { path: ["account", "normalBalance"], value: "credit" },
    { path: ["account", "category"], value: "clearing" },
    { path: ["account", "id"], value: "bad" },
    { path: ["account", "ledgerId"], value: "bad" },
    { path: ["account", "owner", "namespace"], value: "UNKNOWN" },
    { path: ["account", "status"], value: "inactive" },
  ])("refuses incorrect explicit metadata $path", ({ path, value }) => {
    expect(
      validateCashClearingAccountCandidate(change(wrapper(), path, value)).ok,
    ).toBe(false);
  });
  it.each(["liability", "equity", "revenue", "expense"] as const)(
    "refuses accounting class %s despite valid normal side",
    (category) => {
      expect(
        validateCashClearingAccountCandidate(
          wrapper(balanceAccounts(5000000, category)[0]),
        ).ok,
      ).toBe(false);
    },
  );
  it("never infers the role/class from a name", () => {
    expect(
      validateCashClearingAccountCandidate({ ...wrapper(), role: undefined })
        .ok,
    ).toBe(false);
    expect(
      validateCashClearingAccountCandidate(
        wrapper({ ...catalog()[0], name: "Provider settlement cash" }),
      ).ok,
    ).toBe(true);
  });
  it.each([null, [], {}, new Date(), Object.create({})])(
    "rejects non-strict input %s",
    (input) => {
      expect(validateCashClearingAccountCandidate(input).ok).toBe(false);
    },
  );
  it("rejects hidden/unknown/symbol/accessor/proxy wrapper fields without invoking accessors", () => {
    const getter = vi.fn(() => {
      throw new Error("sensitive");
    });
    const input = wrapper();
    for (const value of [
      { ...input, extra: true },
      { ...input, [Symbol("x")]: true },
      Object.defineProperty({ ...input }, "hidden", { value: 1 }),
      Object.defineProperty({ ...input }, "account", {
        get: getter,
        enumerable: true,
      }),
      new Proxy(input, {
        ownKeys() {
          throw new Error("sensitive");
        },
      }),
    ])
      expect(validateCashClearingAccountCandidate(value).ok).toBe(false);
    expect(getter).not.toHaveBeenCalled();
  });
  it("requires every explicit Account field and preserves lone UTF16 names", () => {
    const input = wrapper();
    for (const key of Object.keys(input.account)) {
      const account = { ...input.account } as unknown as Record<
        string,
        unknown
      >;
      delete account[key];
      expect(
        validateCashClearingAccountCandidate({ ...input, account }).ok,
      ).toBe(false);
    }
    expect(
      validateCashClearingAccountCandidate(
        wrapper({ ...input.account, name: "Cash \ud800" }),
      ).ok,
    ).toBe(true);
  });
});
describe("cash-clearing context delegates full journal validation", () => {
  it("executes1250 clearing/cash example and explicit offset with exact zero arithmetic", () => {
    const first = check(),
      offset = check(balanceJournal(5000001, catalog(), "1250", "credit"));
    expect(first.ok && offset.ok).toBe(true);
    if (first.ok && offset.ok) {
      expect(first.value.entries[0]!.amount.minorUnits).toBe(1250n);
      const sign = (j: typeof first.value) =>
        j.entries
          .filter((e) => e.accountId === catalog()[0].id)
          .reduce(
            (sum, e) =>
              sum +
              (e.side === "debit" ? e.amount.minorUnits : -e.amount.minorUnits),
            0n,
          );
      expect(sign(first.value)).toBe(1250n);
      expect(sign(first.value) + sign(offset.value)).toBe(0n);
      expect(Object.isFrozen(first.value.entries)).toBe(true);
    }
  });
  it("preserves per-line int64 maximum and bigint aggregate without rounding", () => {
    const j = balanceJournal(5000000, catalog(), "9223372036854775807");
    expect(check(j).ok).toBe(true);
  });
  it.each(["1251", "0", "-1250", "1.25", "01"])(
    "refuses imbalance/invalid amount %s",
    (amount) => {
      expect(
        check(
          change(journal(), ["entries", "0", "amount", "minorUnits"], amount),
        ).ok,
      ).toBe(false);
    },
  );
  it("requires an exact role snapshot, not only a matching ID", () => {
    for (const [path, value] of [
      ["name", "other"],
      ["currency", "EUR"],
      ["status", "closed"],
    ])
      expect(
        check(journal(), wrapper(change(catalog()[0], [path!], value))).ok,
      ).toBe(false);
    expect(
      check(
        journal(),
        wrapper({
          ...catalog()[0],
          owner: { namespace: "synthetic.other", id: "other" },
        }),
      ).ok,
    ).toBe(false);
  });
  it("uses captured detached catalog metadata without re-reading the caller context", () => {
    let reads = 0;
    const account = new Proxy(catalog()[0], {
      getOwnPropertyDescriptor(target, key) {
        if (key === "category") reads++;
        return Reflect.getOwnPropertyDescriptor(
          reads > 1
            ? { ...target, category: "liability", normalBalance: "credit" }
            : target,
          key,
        );
      },
    });
    expect(check(journal(), wrapper(), [account, catalog()[1]]).ok).toBe(true);
    expect(reads).toBe(1);
  });
  it("requires clearing membership and distinct counteraccount", () => {
    const j = journal();
    expect(
      check({
        ...j,
        entries: j.entries.map((e) => ({ ...e, accountId: catalog()[1].id })),
      }).ok,
    ).toBe(false);
    expect(
      check({
        ...j,
        entries: j.entries.map((e) => ({ ...e, accountId: catalog()[0].id })),
      }).ok,
    ).toBe(false);
  });
  it("rejects missing/duplicate/conflicting catalogs and wrong ledger", () => {
    expect(check(journal(), wrapper(), [catalog()[1]]).ok).toBe(false);
    expect(check(journal(), wrapper(), [...catalog(), catalog()[0]]).ok).toBe(
      false,
    );
    expect(
      check(
        change(journal(), ["transaction", "ledgerId"], `ldg_${syntheticId(9)}`),
      ).ok,
    ).toBe(false);
    expect(check(journal(), wrapper(), null).ok).toBe(false);
  });
  it("rejects balanced extra currency legs outside the cash role currency", () => {
    const j = journal(),
      a = storageAccounts().find((x) => x.currency === "EUR")!,
      other = { ...a, ledgerId: j.transaction.ledgerId };
    const id = `ent_${syntheticId(500000000 + 20)}`;
    const entries = (["debit", "credit"] as const).map((side, i) => ({
      ...j.entries[0]!,
      id: i === 0 ? id : `ent_${syntheticId(500000000 + 21)}`,
      accountId: other.id,
      side,
      amount: {
        representation: "integer_minor_units" as const,
        minorUnits: "1",
        currency: "EUR" as const,
      },
    }));
    expect(
      check({ ...j, entries: [...j.entries, ...entries] }, wrapper(), [
        ...catalog(),
        other,
      ]).ok,
    ).toBe(false);
  });
  it("validates unused catalog metadata and all duplicate/reference/provenance rules", () => {
    expect(
      check(journal(), wrapper(), [
        ...catalog(),
        {
          ...storageAccounts()[0]!,
          id: `acct_${syntheticId(99)}`,
          currency: "BAD",
        },
      ]).ok,
    ).toBe(false);
    expect(
      check(change(journal(), ["entries", "1", "id"], journal().entries[0]!.id))
        .ok,
    ).toBe(false);
    expect(
      check(
        change(
          journal(),
          ["entries", "0", "accountId"],
          `acct_${syntheticId(99)}`,
        ),
      ).ok,
    ).toBe(false);
    expect(
      check(change(journal(), ["transaction", "provenance", "evidence"], []))
        .ok,
    ).toBe(false);
  });
  it("does not mutate inputs and returns ordinary journal output without posting/settlement authority", () => {
    const j = journal(),
      a = catalog(),
      role = wrapper(a[0]),
      before = structuredClone({ j, a, role });
    const result = check(j, role, a);
    expect({ j, a, role }).toEqual(before);
    if (result.ok) {
      expect(Object.keys(result.value).sort()).toEqual([
        "contractVersion",
        "entries",
        "totals",
        "transaction",
      ]);
      expect(result.value.transaction.status).toBe("pending");
      expect(result.value.transaction.id).toBe(j.transaction.id);
    }
  });
  it.each([null, [], {}])("refuses malformed journal %s", (input) => {
    expect(check(input).ok).toBe(false);
  });
  it("refuses journal accessors without invoking them", () => {
    const getter = vi.fn(() => {
      throw new Error("sensitive");
    });
    expect(
      check(Object.defineProperty({}, "transaction", { get: getter })).ok,
    ).toBe(false);
    expect(getter).not.toHaveBeenCalled();
  });
});
