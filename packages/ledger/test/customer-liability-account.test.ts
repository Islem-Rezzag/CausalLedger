import { describe, expect, it, vi } from "vitest";
import {
  CUSTOMER_LIABILITY_ACCOUNT_CONTRACT_VERSION,
  validateCustomerLiabilityAccountCandidate,
  validateCustomerLiabilityJournalCandidate,
} from "../src/index.js";
import type {
  AccountCandidate,
  CustomerLiabilityAccountCandidate,
} from "../src/index.js";
import { balanceAccounts, balanceJournal } from "./balance-synthetic.js";
import { storageAccounts, syntheticId } from "./storage-synthetic.js";
const catalog = () => {
  const a = balanceAccounts(7000000, "liability");
  a[1] = {
    ...a[1],
    category: "asset",
    normalBalance: "debit",
    owner: { namespace: "synthetic.treasury", id: "system-counter" },
  };
  return a;
};
const wrapper = (
  account: AccountCandidate = catalog()[0],
): CustomerLiabilityAccountCandidate => ({
  contractVersion: CUSTOMER_LIABILITY_ACCOUNT_CONTRACT_VERSION,
  role: "customer_liability",
  account,
});
const journal = () => balanceJournal(7000000, catalog(), "1250", "credit");
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
) =>
  validateCustomerLiabilityJournalCandidate(input, role, {
    owner: catalog()[0].owner,
    accounts,
  });
describe("explicit pure customer-liability role", () => {
  it("returns frozen detached liability/credit metadata, including explicit ownership and ledger", () => {
    const input = wrapper(),
      before = structuredClone(input),
      result = validateCustomerLiabilityAccountCandidate(input);
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
        validateCustomerLiabilityAccountCandidate(
          wrapper(balanceAccounts(7000000, "liability", currency)[0]),
        ).ok,
      ).toBe(true);
    },
  );
  it("accepts closed metadata for inspection and refuses new journal use", () => {
    const a = change(catalog(), ["0", "status"], "closed"),
      role = wrapper(a[0]);
    expect(validateCustomerLiabilityAccountCandidate(role).ok).toBe(true);
    expect(check(journal(), role, a).ok).toBe(false);
  });
  it.each([
    { path: ["role"], value: "provider_clearing" },
    { path: ["contractVersion"], value: "other" },
    { path: ["account", "currency"], value: "usd" },
    { path: ["account", "normalBalance"], value: "debit" },
    { path: ["account", "category"], value: "clearing" },
    { path: ["account", "id"], value: "bad" },
    { path: ["account", "ledgerId"], value: "bad" },
    { path: ["account", "owner", "namespace"], value: "UNKNOWN" },
    { path: ["account", "status"], value: "inactive" },
  ])("refuses incorrect explicit metadata $path", ({ path, value }) => {
    expect(
      validateCustomerLiabilityAccountCandidate(change(wrapper(), path, value))
        .ok,
    ).toBe(false);
  });
  it.each(["asset", "equity", "revenue", "expense"] as const)(
    "refuses accounting class %s despite valid normal side",
    (category) => {
      expect(
        validateCustomerLiabilityAccountCandidate(
          wrapper(balanceAccounts(7000000, category)[0]),
        ).ok,
      ).toBe(false);
    },
  );
  it("never infers the role/class from a name", () => {
    expect(
      validateCustomerLiabilityAccountCandidate({
        ...wrapper(),
        role: undefined,
      }).ok,
    ).toBe(false);
    expect(
      validateCustomerLiabilityAccountCandidate(
        wrapper({ ...catalog()[0], name: "Provider settlement cash" }),
      ).ok,
    ).toBe(true);
  });
  it.each([null, [], {}, new Date(), Object.create({})])(
    "rejects non-strict input %s",
    (input) => {
      expect(validateCustomerLiabilityAccountCandidate(input).ok).toBe(false);
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
      expect(validateCustomerLiabilityAccountCandidate(value).ok).toBe(false);
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
        validateCustomerLiabilityAccountCandidate({ ...input, account }).ok,
      ).toBe(false);
    }
    expect(
      validateCustomerLiabilityAccountCandidate(
        wrapper({ ...input.account, name: "Cash \ud800" }),
      ).ok,
    ).toBe(true);
  });
});
describe("customer-liability context delegates full journal validation", () => {
  it("executes1250 liability/asset example and explicit offset with exact zero arithmetic", () => {
    const first = check(),
      offset = check(balanceJournal(7000001, catalog(), "1250", "debit"));
    expect(first.ok && offset.ok).toBe(true);
    if (first.ok && offset.ok) {
      expect(first.value.entries[0]!.amount.minorUnits).toBe(1250n);
      const sign = (j: typeof first.value) =>
        j.entries
          .filter((e) => e.accountId === catalog()[0].id)
          .reduce(
            (sum, e) =>
              sum +
              (e.side === "credit"
                ? e.amount.minorUnits
                : -e.amount.minorUnits),
            0n,
          );
      expect(sign(first.value)).toBe(1250n);
      expect(sign(first.value) + sign(offset.value)).toBe(0n);
      expect(Object.isFrozen(first.value.entries)).toBe(true);
    }
  });
  it("preserves per-line int64 maximum and bigint aggregate without rounding", () => {
    const j = balanceJournal(7000000, catalog(), "9223372036854775807");
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
            ? { ...target, category: "asset", normalBalance: "debit" }
            : target,
          key,
        );
      },
    });
    expect(check(journal(), wrapper(), [account, catalog()[1]]).ok).toBe(true);
    expect(reads).toBe(1);
  });
  it("requires liability membership and distinct counteraccount", () => {
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
  it("rejects balanced extra currency legs outside the liability role currency", () => {
    const j = journal(),
      a = storageAccounts().find((x) => x.currency === "EUR")!,
      other = { ...a, ledgerId: j.transaction.ledgerId };
    const id = `ent_${syntheticId(700000000 + 20)}`;
    const entries = (["debit", "credit"] as const).map((side, i) => ({
      ...j.entries[0]!,
      id: i === 0 ? id : `ent_${syntheticId(700000000 + 21)}`,
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

describe("declared customer owner isolation", () => {
  const contextual = (
    owner: unknown,
    accounts: unknown = catalog(),
    input: unknown = journal(),
  ) =>
    validateCustomerLiabilityJournalCandidate(input, wrapper(), {
      owner,
      accounts,
    });
  it.each(["namespace", "id"] as const)(
    "requires exact owner %s independently",
    (field) => {
      expect(contextual({ ...catalog()[0].owner, [field]: "other" }).ok).toBe(
        false,
      );
    },
  );
  it.each([
    { namespace: "synthetic.owner\n", id: "owner-1" },
    { namespace: "synthetic.owner", id: "owner-1\n" },
    { namespace: "UPPER", id: "owner-1" },
    { namespace: "a".repeat(65), id: "owner-1" },
    { namespace: "synthetic.owner", id: "a".repeat(129) },
    { namespace: "synthetic.owner", id: " é" },
    { namespace: "", id: "owner-1" },
    { namespace: "synthetic.owner", id: 0 },
  ])(
    "refuses malformed full-span role and context owner $namespace/$id",
    (owner) => {
      expect(
        validateCustomerLiabilityAccountCandidate(
          wrapper({ ...catalog()[0], owner } as AccountCandidate),
        ).ok,
      ).toBe(false);
      expect(contextual(owner).ok).toBe(false);
    },
  );
  it("accepts canonical length boundaries and punctuation without normalizing", () => {
    const owner = {
      namespace: "a".repeat(64),
      id: "A" + "._:-".repeat(31) + "XYZ",
    };
    const a = catalog();
    a[0] = { ...a[0], owner };
    expect(validateCustomerLiabilityAccountCandidate(wrapper(a[0])).ok).toBe(
      true,
    );
    expect(
      validateCustomerLiabilityJournalCandidate(
        balanceJournal(7000020, a, "1250", "credit"),
        wrapper(a[0]),
        { owner, accounts: a },
      ).ok,
    ).toBe(true);
    expect(
      validateCustomerLiabilityJournalCandidate(
        balanceJournal(7000020, a),
        wrapper(a[0]),
        { owner: { ...owner, id: owner.id.toLowerCase() }, accounts: a },
      ).ok,
    ).toBe(false);
  });
  it.each(["namespace", "id"] as const)(
    "refuses a different participating liability owner %s",
    (field) => {
      const a = catalog();
      a[1] = {
        ...a[1],
        category: "liability",
        normalBalance: "credit",
        owner: { ...a[0].owner, [field]: "other" },
      };
      expect(
        contextual(a[0].owner, a, balanceJournal(7000021, a, "1250", "credit"))
          .ok,
      ).toBe(false);
    },
  );
  it("allows same-owner liability counteraccounts, unrelated asset owners and unused other customers", () => {
    const a = catalog(),
      other = {
        ...a[0],
        id: `acct_${syntheticId(777)}`,
        owner: { namespace: "synthetic.other", id: "other" },
      };
    expect(contextual(a[0].owner, [...a, other]).ok).toBe(true);
    a[1] = {
      ...a[1],
      category: "liability",
      normalBalance: "credit",
      owner: a[0].owner,
    };
    expect(
      contextual(a[0].owner, a, balanceJournal(7000022, a, "1250", "credit"))
        .ok,
    ).toBe(true);
  });
  it("captures detached owner/context once and refuses accessors/unknown/hidden/symbol fields", () => {
    const getter = vi.fn(() => catalog()[0].owner),
      ctx = { owner: catalog()[0].owner, accounts: catalog() };
    for (const malformed of [
      null,
      [],
      {},
      { ...ctx, extra: 1 },
      { ...ctx, [Symbol("extra")]: 1 },
      Object.defineProperty({ ...ctx }, "owner", { get: getter }),
      Object.defineProperty({ ...ctx }, "accounts", { enumerable: false }),
    ])
      expect(
        validateCustomerLiabilityJournalCandidate(
          journal(),
          wrapper(),
          malformed,
        ).ok,
      ).toBe(false);
    expect(getter).not.toHaveBeenCalled();
    let reads = 0;
    const owner = new Proxy(catalog()[0].owner, {
      getOwnPropertyDescriptor(t, k) {
        if (k === "id") reads++;
        return Reflect.getOwnPropertyDescriptor(
          reads > 1 ? { ...t, id: "other" } : t,
          k,
        );
      },
    });
    expect(contextual(owner).ok).toBe(true);
    expect(reads).toBe(1);
    expect(
      contextual(Object.defineProperty({}, "id", { get: getter })).ok,
    ).toBe(false);
    expect(getter).not.toHaveBeenCalled();
  });
  it("retains strict null-prototype data and ordinary frozen journal output", () => {
    const result = validateCustomerLiabilityJournalCandidate(
      journal(),
      Object.assign(Object.create(null), wrapper()),
      Object.assign(Object.create(null), {
        owner: Object.assign(Object.create(null), catalog()[0].owner),
        accounts: catalog(),
      }),
    );
    expect(result.ok).toBe(true);
    if (result.ok) expect(Object.isFrozen(result.value)).toBe(true);
  });
  it.each([false, true])(
    "refuses duplicate/conflicting receipt identities (%s)",
    (conflict) => {
      const j = journal(),
        evidence = j.transaction.provenance.evidence[0]!;
      const result = check(
        change(
          j,
          ["transaction", "provenance", "evidence"],
          [
            evidence,
            conflict
              ? { ...evidence, contentHash: "sha256:" + "b".repeat(64) }
              : evidence,
          ],
        ),
      );
      expect(result.ok).toBe(false);
      expect(result.issues).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            path:
              "$.transaction.provenance.evidence[1]." +
              (conflict ? "contentHash" : "receiptId"),
            message:
              "Invalid supplied transaction: " +
              (conflict
                ? "One receipt identity references different content hashes."
                : "Receipt identity is repeated."),
          }),
        ]),
      );
    },
  );
});
