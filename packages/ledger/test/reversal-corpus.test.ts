import { describe, expect, it } from "vitest";
import {
  validateLedgerReversalCandidate,
  validateLedgerJournalCandidate,
  createLedgerReversalStore,
} from "../src/index.js";
import {
  CATEGORIES,
  CURRENCIES,
  SHAPES,
  checkRole,
  permute,
} from "./balanced-posting-corpus.js";
import {
  REVERSAL_CASES,
  REVERSAL_ROLES,
  REVERSAL_BASE,
  REVERSAL_CORPUS_VERSION,
  fixture,
  multiFixture,
  retry,
  POLICY_CASES,
} from "./reversal-corpus.js";
import type { ReversalFixture } from "./reversal-corpus.js";
function check(f: ReversalFixture, originalAccounts = f.input.accounts) {
  return validateLedgerReversalCandidate(
    f.request,
    f.input.journal,
    originalAccounts,
    f.input.accounts,
  );
}
function accepted(f: ReversalFixture) {
  const before = structuredClone(f);
  const a = check(f),
    b = check({
      ...f,
      request: retry(f.request, 9999),
      input: { ...f.input, accounts: [...f.input.accounts].reverse() },
    });
  expect(a.ok).toBe(true);
  expect(b.ok).toBe(true);
  if (!a.ok || !b.ok) throw new Error("Declared full inverse refused");
  expect(a.value).toEqual(b.value);
  expect(Object.isFrozen(a)).toBe(true);
  expect(Object.isFrozen(a.value)).toBe(true);
  const original = validateLedgerJournalCandidate(
      f.input.journal,
      f.input.accounts,
    ),
    offset = validateLedgerJournalCandidate(
      f.request.journal,
      f.input.accounts,
    );
  expect(original.ok).toBe(true);
  expect(offset.ok).toBe(true);
  if (!original.ok || !offset.ok)
    throw new Error("Declared valid journal refused");
  expect(original.value.totals).toEqual(f.totals);
  expect(offset.value.totals).toEqual(f.totals);
  for (const oracle of f.accounts) {
    const lines = f.input.journal.entries.filter(
        (e) => e.accountId === oracle.id,
      ),
      inverse = f.request.journal.entries.filter(
        (e) => e.accountId === oracle.id,
      );
    expect(lines).toHaveLength(oracle.lineCount);
    expect(new Set(lines.map((e) => e.side))).toEqual(new Set([oracle.side]));
    expect(
      lines.reduce((n, e) => n + BigInt(e.amount.minorUnits as string), 0n),
    ).toBe(BigInt(oracle.total));
    expect(
      inverse.map((e) => ({
        currency: e.amount.currency,
        amount: e.amount.minorUnits,
        side: e.side,
      })),
    ).toEqual(
      lines.map((e) => ({
        currency: e.amount.currency,
        amount: e.amount.minorUnits,
        side: e.side === "debit" ? "credit" : "debit",
      })),
    );
  }
  expect(f).toEqual(before);
  const reordered = permute(f.input);
  expect(check({ ...f, input: reordered })).toEqual(a);
}
describe("M04.17 cross-feature full reversal corpus", () => {
  it("covers all25 category pairs,3 currencies and4 literal amount shapes with new13m declarations", () => {
    expect(REVERSAL_CORPUS_VERSION).toBe("m04.17-reversal-corpus.v1");
    expect(REVERSAL_BASE).toBe(13_000_000);
    expect(REVERSAL_CASES).toHaveLength(300);
    expect(
      new Set(REVERSAL_CASES.map((r) => `${r.first}/${r.counter}`)).size,
    ).toBe(25);
    expect(new Set(REVERSAL_CASES.map((r) => r.first))).toEqual(
      new Set(CATEGORIES),
    );
    expect(new Set(REVERSAL_CASES.map((r) => r.currency))).toEqual(
      new Set(CURRENCIES),
    );
    for (const shape of SHAPES)
      expect(shape.amounts.reduce((n, a) => n + BigInt(a), 0n)).toBe(
        BigInt(shape.total),
      );
  });
  it.each(REVERSAL_CASES)(
    "$label full inverse/preserved input/order-independent retry",
    (row) => accepted(fixture(row)),
  );
  it.each(REVERSAL_ROLES)(
    "$label composes original and inverse role declarations",
    (row) => {
      const f = fixture(row);
      expect(checkRole(row, f.input).ok).toBe(true);
      expect(
        checkRole(row, {
          journal: f.request.journal,
          accounts: f.input.accounts,
        }).ok,
      ).toBe(true);
      accepted(f);
    },
  );
  it("general04 multicurrency keeps all five categories, repeated max-int64 lines and separate exact totals", () => {
    const f = multiFixture();
    expect(new Set(f.input.accounts.map((a) => a.category))).toEqual(
      new Set(CATEGORIES),
    );
    expect(f.input.journal.entries).toHaveLength(20);
    accepted(f);
  });
  it.each(
    CURRENCIES.flatMap((currency) =>
      POLICY_CASES.map((policy) => ({
        currency,
        policy,
        label: `${currency}/${policy.name}`,
      })),
    ),
  )(
    "$label literal full-only policy refusal without partial identity",
    ({ currency, policy }) => {
      const valid = fixture({ ...REVERSAL_CASES[1]!, currency });
      const originalAccounts = structuredClone(valid.input.accounts);
      const bad = policy.mutate(valid),
        before = structuredClone(bad);
      const result = check(bad, originalAccounts);
      expect(result.ok).toBe(false);
      if (result.ok) throw new Error("Invalid inverse unexpectedly accepted");
      expect(result.issues).toContainEqual(
        expect.objectContaining({ code: "invalid_context", path: policy.path }),
      );
      expect(result).not.toHaveProperty("value");
      expect(Object.isFrozen(result)).toBe(true);
      expect(Object.isFrozen(result.issues)).toBe(true);
      expect(bad).toEqual(before);
    },
  );
  it("strict wrapper preflight refuses partial without connecting or returning a receipt", async () => {
    const f = fixture(),
      store = createLedgerReversalStore(
        "postgres://synthetic:synthetic@127.0.0.1:1/synthetic",
      );
    try {
      const result = await store.append(
        { ...f.request, kind: "partial" },
        f.input.accounts,
      );
      expect(result.ok).toBe(false);
      expect(result).not.toHaveProperty("receipt");
    } finally {
      await store.close();
    }
  });
  it("wrapper getters never run before deterministic refusal", async () => {
    const f = fixture();
    let reads = 0;
    const hostile = { ...f.request };
    Object.defineProperty(hostile, "journal", {
      enumerable: true,
      get() {
        reads++;
        throw new Error("Sensitive getter");
      },
    });
    const result = validateLedgerReversalCandidate(
      hostile,
      f.input.journal,
      f.input.accounts,
      f.input.accounts,
    );
    expect(result.ok).toBe(false);
    expect(result).not.toHaveProperty("value");
    const store = createLedgerReversalStore(
      "postgres://synthetic:synthetic@127.0.0.1:1/synthetic",
    );
    try {
      expect((await store.append(hostile, f.input.accounts)).ok).toBe(false);
      expect(reads).toBe(0);
    } finally {
      await store.close();
    }
  });
});
