import { describe, expect, it } from "vitest";
import {
  createIdempotentLedgerJournalStore,
  createLedgerJournalStore,
  validateLedgerJournalCandidate,
  validateLedgerIdempotencyCandidate,
} from "../src/index.js";
import {
  INVALID_CASES,
  INVALID_CORPUS_VERSION,
  declarations,
  fixture,
  mutate,
} from "./invalid-posting-corpus.js";

describe("M04.16 adversarial corpus: exact refusal, no partial result and unchanged input", () => {
  it("pins the corpus and literal baseline arithmetic", () => {
    expect(INVALID_CORPUS_VERSION).toBe("m04.16-invalid-posting-corpus.v1");
    expect(new Set(INVALID_CASES.map((c) => c.name)).size).toBe(
      INVALID_CASES.length,
    );
    const f = fixture(1),
      before = structuredClone(f);
    const result = validateLedgerJournalCandidate(f.journal, f.accounts);
    expect(result.ok).toBe(true);
    if (!result.ok) throw new Error("synthetic baseline refused");
    expect(result.value.totals).toEqual([
      { currency: "USD", debitMinorUnits: 1250n, creditMinorUnits: 1250n },
    ]);
    expect(f).toEqual(before);
  });
  for (const currency of ["USD", "EUR", "GBP"] as const) {
    it.each(INVALID_CASES)(`${currency}: $name`, (row) => {
      const f = mutate(row, 10 + INVALID_CASES.indexOf(row), currency),
        before = structuredClone(f);
      for (const validate of [
        validateLedgerJournalCandidate,
        validateLedgerIdempotencyCandidate,
      ]) {
        const result = validate(f.journal, f.accounts);
        expect(result.ok).toBe(false);
        expect(result).not.toHaveProperty("value");
        if (result.ok)
          throw new Error("Adversarial declaration unexpectedly accepted");
        expect(result.issues).toEqual(
          expect.arrayContaining([
            expect.objectContaining({ code: row.code, path: row.path }),
          ]),
        );
        expect(Object.isFrozen(result)).toBe(true);
        expect(Object.isFrozen(result.issues)).toBe(true);
      }
      expect(f).toEqual(before);
    });
  }
  it("an invalid journal is refused before either store can attempt a connection", async () => {
    // Port1 is explicit and deliberately unusable. A driver call would reject rather than produce validation issues.
    const url =
      "postgresql://synthetic:synthetic@127.0.0.1:1/synthetic_no_connection";
    for (const store of [
      createLedgerJournalStore(url),
      createIdempotentLedgerJournalStore(url),
    ]) {
      try {
        for (const row of INVALID_CASES) {
          const f = mutate(row, 500 + INVALID_CASES.indexOf(row));
          const result = await store.append(f.journal, f.accounts);
          expect(result.ok).toBe(false);
          expect(result).not.toHaveProperty("receipt");
        }
      } finally {
        await store.close();
      }
    }
  });
  it("hostile accessors are not evaluated by validation or either pre-I/O store", async () => {
    let reads = 0;
    const f = fixture(601),
      j = declarations(f).journal;
    Object.defineProperty(j, "entries", {
      enumerable: true,
      get() {
        reads++;
        throw new Error("hostile getter");
      },
    });
    const result = validateLedgerJournalCandidate(j, f.accounts);
    expect(result.ok).toBe(false);
    expect(result.issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ code: "invalid_type", path: "$.entries" }),
      ]),
    );
    const url =
      "postgresql://synthetic:synthetic@127.0.0.1:1/synthetic_no_connection";
    for (const store of [
      createLedgerJournalStore(url),
      createIdempotentLedgerJournalStore(url),
    ]) {
      try {
        expect((await store.append(j, f.accounts)).ok).toBe(false);
      } finally {
        await store.close();
      }
    }
    expect(reads).toBe(0);
  });
  it.each(["sparse", "symbol", "prototype", "proxy"])(
    "JS-only %s refuses without a partial result",
    (mode) => {
      const f = fixture(602),
        j = declarations(f).journal;
      if (mode === "sparse") {
        const lines = [...j.entries];
        delete lines[0];
        (j as unknown as Record<string, unknown>).entries = lines;
      }
      if (mode === "symbol")
        Object.defineProperty(j, Symbol("approval"), { value: true });
      if (mode === "prototype") Object.setPrototypeOf(j, { approve: true });
      if (mode === "proxy")
        f.journal = new Proxy(j, {
          ownKeys() {
            throw new Error("hostile inspection");
          },
        });
      const result = validateLedgerJournalCandidate(f.journal, f.accounts);
      expect(result.ok).toBe(false);
      expect(result).not.toHaveProperty("value");
      expect(result.issues.length).toBeGreaterThan(0);
    },
  );
});
