import { describe, expect, it } from "vitest";
import {
  validateLedgerJournalCandidate,
  validateLedgerIdempotencyCandidate,
} from "../src/index.js";
import {
  CORPUS,
  CATEGORIES,
  CURRENCIES,
  SHAPES,
  ROLE_CASES,
  materialize,
  permute,
  roleInput,
  checkRole,
  multiCurrency,
} from "./balanced-posting-corpus.js";
import { syntheticId } from "./storage-synthetic.js";

describe("M04.15 cross-category balanced-posting corpus", () => {
  it("covers every category pair/currency/status with independent literal amount oracles", () => {
    expect(CORPUS).toHaveLength(150);
    expect(new Set(CORPUS.map((c) => `${c.first}/${c.counter}`)).size).toBe(25);
    expect(new Set(CORPUS.map((c) => c.currency))).toEqual(new Set(CURRENCIES));
    expect(new Set(CORPUS.map((c) => c.first))).toEqual(new Set(CATEGORIES));
    expect(new Set(CORPUS.map((c) => c.status))).toEqual(
      new Set(["pending", "posted"]),
    );
    for (const shape of SHAPES)
      expect(shape.amounts.reduce((n, a) => n + BigInt(a), 0n)).toBe(
        BigInt(shape.total),
      );
  });
  it.each(CORPUS)(
    "$label: exact conservation, frozen metadata and deterministic permutations",
    (row) => {
      const input = materialize(row),
        before = structuredClone(input);
      const a = validateLedgerJournalCandidate(input.journal, input.accounts);
      const p = permute(input);
      const b = validateLedgerJournalCandidate(p.journal, p.accounts);
      expect(a.ok).toBe(true);
      expect(b.ok).toBe(true);
      if (!a.ok || !b.ok) throw new Error("Declared valid corpus refused");
      const expected = [
        {
          currency: row.currency,
          debitMinorUnits: BigInt(row.shape.total),
          creditMinorUnits: BigInt(row.shape.total),
        },
      ];
      expect(a.value.totals).toEqual(expected);
      expect(b.value.totals).toEqual(expected);
      expect(a.value.transaction.status).toBe(row.status);
      expect(a.value.transaction.provenance).toEqual(
        input.journal.transaction.provenance,
      );
      expect(a.value.entries.map((e) => e.amount.minorUnits)).toEqual(
        input.journal.entries.map((e) => BigInt(e.amount.minorUnits as string)),
      );
      expect(Object.isFrozen(a.value)).toBe(true);
      expect(Object.isFrozen(a.value.entries)).toBe(true);
      const identity = validateLedgerIdempotencyCandidate(
        input.journal,
        input.accounts,
      );
      const reordered = validateLedgerIdempotencyCandidate(
        p.journal,
        p.accounts,
      );
      expect(identity.ok).toBe(true);
      expect(reordered.ok).toBe(true);
      if (identity.ok && reordered.ok)
        expect(reordered.value).toEqual(identity.value);
      expect(input).toEqual(before);
      expect(materialize(row)).toEqual(before);
    },
  );
  it.each(ROLE_CASES)(
    "$label composes the existing single-currency role contract",
    (row) => {
      const input = roleInput(row),
        before = structuredClone(input),
        result = checkRole(row, input);
      expect(result.ok).toBe(true);
      if (!result.ok) throw new Error("Declared valid role corpus refused");
      expect(result.value.totals).toEqual([
        {
          currency: row.currency,
          debitMinorUnits: 1250n,
          creditMinorUnits: 1250n,
        },
      ]);
      expect(input).toEqual(before);
    },
  );
  it("keeps three currencies separately conserved in a general04 journal", () => {
    const input = multiCurrency();
    const checked = validateLedgerJournalCandidate(
      input.journal,
      input.accounts,
    );
    expect(checked.ok).toBe(true);
    if (!checked.ok)
      throw new Error("Declared valid multicurrency corpus refused");
    expect(checked.value.totals).toEqual(
      ["EUR", "GBP", "USD"].map((currency) => ({
        currency,
        debitMinorUnits: 1250n,
        creditMinorUnits: 1250n,
      })),
    );
    expect(checked.value.entries).toHaveLength(12);
  });
  it.each([1, 2, 3, 4, 149])(
    "seed%s: balanced duplication preserves conservation with fresh IDs and changes payload identity",
    (seed) => {
      const row = CORPUS[seed - 1]!,
        input = materialize(row);
      const entries = [
        ...input.journal.entries,
        ...input.journal.entries.map((e, i) => ({
          ...e,
          id: `ent_${syntheticId(2_000_000_000 + seed * 100 + i)}`,
        })),
      ];
      const doubled = { ...input.journal, entries };
      const checked = validateLedgerJournalCandidate(doubled, input.accounts);
      expect(checked.ok).toBe(true);
      if (!checked.ok) throw new Error("Balanced duplication refused");
      expect(checked.value.totals[0]).toMatchObject({
        debitMinorUnits: BigInt(row.shape.total) * 2n,
        creditMinorUnits: BigInt(row.shape.total) * 2n,
      });
      const originalKey = validateLedgerIdempotencyCandidate(
        input.journal,
        input.accounts,
      );
      const doubledKey = validateLedgerIdempotencyCandidate(
        doubled,
        input.accounts,
      );
      expect(originalKey.ok).toBe(true);
      expect(doubledKey.ok).toBe(true);
      if (originalKey.ok && doubledKey.ok)
        expect(doubledKey.value.canonicalPayload).not.toBe(
          originalKey.value.canonicalPayload,
        );
    },
  );
});
