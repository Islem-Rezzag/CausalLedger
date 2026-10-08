import { describe, expect, it, vi } from "vitest";
import {
  REVENUE_ACCOUNT_CONTRACT_VERSION,
  validateRevenueAccountCandidate,
  validateRevenueJournalCandidate,
  validateLedgerReversalCandidate,
  LEDGER_REVERSAL_CONTRACT_VERSION,
} from "../src/index.js";
import type {
  AccountCandidate,
  LedgerJournalCandidate,
  LedgerReversalCandidate,
  RevenueAccountCandidate,
} from "../src/index.js";
import { balanceAccounts, balanceJournal } from "./balance-synthetic.js";
import { storageAccounts, syntheticId } from "./storage-synthetic.js";
const REVENUE_SOURCE = Object.freeze({
  namespace: "synthetic.revenue",
  id: "revenue-A",
});
function revenueJournal(
  n: number,
  a: readonly [AccountCandidate, AccountCandidate],
  amount = "1250",
  side: "credit" | "debit" = "credit",
): LedgerJournalCandidate {
  const j = balanceJournal(n, a, amount, side);
  return {
    ...j,
    transaction: {
      ...j.transaction,
      provenance: {
        ...j.transaction.provenance,
        source: REVENUE_SOURCE,
        moneyEventIds: [`evt_${syntheticId(n)}`],
      },
    },
  };
}
const catalog = () => {
  const a = balanceAccounts(9000000, "revenue");
  a[1] = { ...a[1], category: "asset", normalBalance: "debit" };
  return a;
};
const wrapper = (
  account: AccountCandidate = catalog()[0],
): RevenueAccountCandidate => ({
  contractVersion: REVENUE_ACCOUNT_CONTRACT_VERSION,
  role: "revenue",
  account,
});
const journal = () => revenueJournal(9000000, catalog());
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
  validateRevenueJournalCandidate(input, role, {
    source: REVENUE_SOURCE,
    accounts,
  });
describe("explicit pure revenue role", () => {
  it("returns frozen detached revenue/credit metadata, including explicit ownership and ledger", () => {
    const input = wrapper(),
      before = structuredClone(input),
      result = validateRevenueAccountCandidate(input);
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
        validateRevenueAccountCandidate(
          wrapper(balanceAccounts(9000000, "revenue", currency)[0]),
        ).ok,
      ).toBe(true);
    },
  );
  it("accepts closed metadata for inspection and refuses new journal use", () => {
    const a = change(catalog(), ["0", "status"], "closed"),
      role = wrapper(a[0]);
    expect(validateRevenueAccountCandidate(role).ok).toBe(true);
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
      validateRevenueAccountCandidate(change(wrapper(), path, value)).ok,
    ).toBe(false);
  });
  it.each(["asset", "liability", "equity", "expense"] as const)(
    "refuses accounting class %s despite valid normal side",
    (category) => {
      expect(
        validateRevenueAccountCandidate(
          wrapper(balanceAccounts(9000000, category)[0]),
        ).ok,
      ).toBe(false);
    },
  );
  it("never infers the role/class from a name", () => {
    expect(
      validateRevenueAccountCandidate({ ...wrapper(), role: undefined }).ok,
    ).toBe(false);
    expect(
      validateRevenueAccountCandidate(
        wrapper({ ...catalog()[0], name: "Provider settlement cash" }),
      ).ok,
    ).toBe(true);
  });
  it.each([null, [], {}, new Date(), Object.create({})])(
    "rejects non-strict input %s",
    (input) => {
      expect(validateRevenueAccountCandidate(input).ok).toBe(false);
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
      expect(validateRevenueAccountCandidate(value).ok).toBe(false);
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
      expect(validateRevenueAccountCandidate({ ...input, account }).ok).toBe(
        false,
      );
    }
    expect(
      validateRevenueAccountCandidate(
        wrapper({ ...input.account, name: "Fee \ud800" }),
      ).ok,
    ).toBe(true);
  });
});
describe("revenue context delegates full journal validation", () => {
  it("executes1250 revenue/asset example and explicit offset with exact zero arithmetic", () => {
    const first = check(),
      offset = check(revenueJournal(9000001, catalog(), "1250", "debit"));
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
    const j = revenueJournal(9000000, catalog(), "9223372036854775807");
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
  it("rejects balanced extra currency legs outside the revenue role currency", () => {
    const j = journal(),
      a = storageAccounts().find((x) => x.currency === "EUR")!,
      other = { ...a, ledgerId: j.transaction.ledgerId };
    const id = `ent_${syntheticId(900000000 + 20)}`;
    const entries = (["credit", "debit"] as const).map((side, i) => ({
      ...j.entries[0]!,
      id: i === 0 ? id : `ent_${syntheticId(900000000 + 21)}`,
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

const sourceCheck = (
  input: unknown = journal(),
  source: unknown = REVENUE_SOURCE,
  accounts: unknown = catalog(),
) => validateRevenueJournalCandidate(input, wrapper(), { source, accounts });
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
describe("explicit per-journal revenue source consistency", () => {
  it.each(["namespace", "id"] as const)(
    "refuses source %s mismatch without deriving it from owner/name",
    (field) => {
      const source = { ...REVENUE_SOURCE, [field]: "other" };
      expect(sourceCheck(journal(), source)).toMatchObject({
        ok: false,
        issues: [{ path: "$.transaction.provenance.source" }],
      });
      expect(
        sourceCheck(
          change(journal(), ["transaction", "provenance", "source"], source),
        ),
      ).toMatchObject({
        ok: false,
        issues: [{ path: "$.transaction.provenance.source" }],
      });
    },
  );
  it.each(invalidSources)(
    "refuses noncanonical complete source %s",
    (source) => {
      expect(sourceCheck(journal(), source)).toMatchObject({
        ok: false,
        issues: [{ path: "$.context.source" }],
      });
      expect(
        sourceCheck(
          change(journal(), ["transaction", "provenance", "source"], source),
          source,
        ).ok,
      ).toBe(false);
    },
  );
  it("allows different explicit sources per transaction on the same revenue Account", () => {
    const source = { namespace: "synthetic.other", id: "revenue-B" },
      j = change(journal(), ["transaction", "provenance", "source"], source);
    expect(sourceCheck(j, source).ok).toBe(true);
    expect(sourceCheck().ok).toBe(true);
    expect(catalog()[0].owner).not.toEqual(REVENUE_SOURCE);
  });
  it("accepts full-span canonical length/punctuation/case exactly without normalization", () => {
    const source = {
      namespace: "a".repeat(64),
      id: "A" + "._:-".repeat(31) + "aB3",
    };
    expect(source.id).toHaveLength(128);
    const j = change(
      journal(),
      ["transaction", "provenance", "source"],
      source,
    );
    expect(sourceCheck(j, source).ok).toBe(true);
    expect(sourceCheck(j, { ...source, id: source.id.toLowerCase() }).ok).toBe(
      false,
    );
  });
  it.each([
    null,
    [],
    {},
    new Date(),
    { source: REVENUE_SOURCE },
    { source: REVENUE_SOURCE, accounts: catalog(), extra: true },
  ])("refuses nonstrict source context %s", (ctx) => {
    expect(validateRevenueJournalCandidate(journal(), wrapper(), ctx).ok).toBe(
      false,
    );
  });
  it.each(["source", "accounts"] as const)(
    "never invokes context %s accessors",
    (field) => {
      const getter = vi.fn(() => {
          throw new Error("private");
        }),
        ctx = Object.defineProperty(
          { source: REVENUE_SOURCE, accounts: catalog() },
          field,
          { get: getter, enumerable: true },
        );
      expect(
        validateRevenueJournalCandidate(journal(), wrapper(), ctx).ok,
      ).toBe(false);
      expect(getter).not.toHaveBeenCalled();
    },
  );
  it.each(["namespace", "id"] as const)(
    "never invokes source %s accessors",
    (field) => {
      const getter = vi.fn(() => {
          throw new Error("private");
        }),
        source = Object.defineProperty({ ...REVENUE_SOURCE }, field, {
          get: getter,
          enumerable: true,
        });
      expect(sourceCheck(journal(), source).ok).toBe(false);
      expect(getter).not.toHaveBeenCalled();
    },
  );
  it.each(["hidden", "symbol", "extra", "class", "trap"])(
    "refuses nondata source %s",
    (kind) => {
      let source: unknown = { ...REVENUE_SOURCE };
      if (kind === "hidden")
        source = Object.defineProperty({ ...REVENUE_SOURCE }, "id", {
          value: REVENUE_SOURCE.id,
          enumerable: false,
        });
      if (kind === "symbol")
        source = { ...REVENUE_SOURCE, [Symbol("extra")]: true };
      if (kind === "extra") source = { ...REVENUE_SOURCE, owner: true };
      if (kind === "class")
        source = Object.assign(Object.create({}), REVENUE_SOURCE);
      if (kind === "trap")
        source = new Proxy(
          {},
          {
            ownKeys() {
              throw new Error("private");
            },
          },
        );
      expect(sourceCheck(journal(), source).ok).toBe(false);
    },
  );
  it("captures a changing source descriptor exactly once and accepts null-prototype data", () => {
    let calls = 0;
    const source = new Proxy(
      { ...REVENUE_SOURCE },
      {
        getOwnPropertyDescriptor(target, key) {
          const d = Reflect.getOwnPropertyDescriptor(target, key);
          if (key === "id") {
            calls++;
            return { ...d, value: calls === 1 ? REVENUE_SOURCE.id : "other" };
          }
          return d;
        },
      },
    );
    const result = sourceCheck(journal(), source);
    expect(result.ok).toBe(true);
    expect(calls).toBe(1);
    expect(
      validateRevenueJournalCandidate(
        journal(),
        wrapper(),
        Object.assign(Object.create(null), {
          source: Object.assign(Object.create(null), REVENUE_SOURCE),
          accounts: catalog(),
        }),
      ).ok,
    ).toBe(true);
  });
  it.each([false, true])(
    "refuses duplicate/conflicting receipt %s through the original contract",
    (conflict) => {
      const j = journal(),
        e = j.transaction.provenance.evidence[0]!,
        result = sourceCheck(
          change(
            j,
            ["transaction", "provenance", "evidence"],
            [
              e,
              conflict ? { ...e, contentHash: "sha256:" + "b".repeat(64) } : e,
            ],
          ),
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
    },
  );
});
function revenueReversal(
  j: LedgerJournalCandidate,
  n = 8_000_100,
): LedgerReversalCandidate {
  const id = `txn_${syntheticId(n)}`;
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
        provenance: {
          ...j.transaction.provenance,
          source: { namespace: "synthetic.revenue-reversal", id: "reverse-A" },
        },
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
describe("revenue composition with unchanged full linked reversal", () => {
  it("checks both explicit sources and exact inverse without mutating original data", () => {
    const j = change(journal(), ["transaction", "status"], "posted"),
      request = revenueReversal(j),
      a = catalog(),
      before = structuredClone({ j, request, a });
    expect(sourceCheck(j).ok).toBe(true);
    expect(
      sourceCheck(
        request.journal,
        request.journal.transaction.provenance.source,
      ).ok,
    ).toBe(true);
    const result = validateLedgerReversalCandidate(request, j, a, a);
    expect(result.ok).toBe(true);
    if (result.ok)
      expect(result.value).toMatchObject({
        kind: "full",
        originalTransactionId: j.transaction.id,
      });
    expect(request.journal.transaction.provenance.moneyEventIds).toEqual(
      j.transaction.provenance.moneyEventIds,
    );
    expect(request.journal.transaction.provenance.evidence).toEqual(
      j.transaction.provenance.evidence,
    );
    expect({ j, request, a }).toEqual(before);
  });
  it.each(["partial", "event", "receipt", "snapshot"])(
    "refuses linked reversal %s even when a standalone journal balances",
    (kind) => {
      const j = change(journal(), ["transaction", "status"], "posted");
      let request = revenueReversal(j),
        a = catalog();
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
          [`evt_${syntheticId(8888)}`],
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
      if (kind === "snapshot") a = change(a, ["0", "name"], "Other revenue");
      expect(validateLedgerReversalCandidate(request, j, catalog(), a).ok).toBe(
        false,
      );
    },
  );
  it("keeps explicit new reversal request source separate from original event and receipt provenance", () => {
    const j = change(journal(), ["transaction", "status"], "posted"),
      request = revenueReversal(j);
    expect(sourceCheck(request.journal).ok).toBe(false);
    expect(
      sourceCheck(
        request.journal,
        request.journal.transaction.provenance.source,
      ).ok,
    ).toBe(true);
    expect(
      validateLedgerReversalCandidate(request, j, catalog(), catalog()).ok,
    ).toBe(true);
  });
});
