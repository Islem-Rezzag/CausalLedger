import { describe, expect, it } from "vitest";
import {
  ACCOUNT_CONTRACT_VERSION,
  LEDGER_TRANSACTION_CONTRACT_VERSION,
  LEDGER_ENTRY_CONTRACT_VERSION,
  LEDGER_JOURNAL_CONTRACT_VERSION,
  LEDGER_ENTRY_MAX_MINOR_UNITS,
  validateLedgerJournalCandidate,
} from "../src/index.js";
import type {
  AccountCandidate,
  AccountCurrency,
  LedgerEntryCandidate,
  LedgerEntrySide,
  LedgerJournalCandidate,
  LedgerJournalIssueCode,
} from "../src/index.js";

const ID = "01ARZ3NDEKTSV4RRFFQ69G5FAV";
const OTHER = "01ARZ3NDEKTSV4RRFFQ69G5FAW";
const CURRENCIES = ["USD", "EUR", "GBP"] as const;
const identity = (n: number): string =>
  "000000000000000000000000" + String(n).padStart(2, "0");
function accounts(): AccountCandidate[] {
  return CURRENCIES.flatMap((currency, i) =>
    [0, 1].map((offset) => ({
      contractVersion: ACCOUNT_CONTRACT_VERSION,
      id: `acct_${identity(i * 2 + offset)}`,
      ledgerId: `ldg_${ID}`,
      name: `Synthetic ${currency} ${offset}`,
      category: "asset" as const,
      normalBalance: "debit" as const,
      currency,
      owner: { namespace: "synthetic.owner", id: "owner-001" },
      status: "active" as const,
    })),
  );
}
function line(
  n: number,
  side: LedgerEntrySide,
  minorUnits = "1250",
  currency: AccountCurrency = "USD",
): LedgerEntryCandidate {
  const offset = CURRENCIES.indexOf(currency) * 2 + (side === "debit" ? 0 : 1);
  return {
    contractVersion: LEDGER_ENTRY_CONTRACT_VERSION,
    id: `ent_${identity(n)}`,
    transactionId: `txn_${ID}`,
    ledgerId: `ldg_${ID}`,
    accountId: `acct_${identity(offset)}`,
    side,
    amount: { representation: "integer_minor_units", minorUnits, currency },
  };
}
function journal(
  entries: readonly LedgerEntryCandidate[] = [
    line(1, "debit"),
    line(2, "credit"),
  ],
): LedgerJournalCandidate {
  return {
    contractVersion: LEDGER_JOURNAL_CONTRACT_VERSION,
    transaction: {
      contractVersion: LEDGER_TRANSACTION_CONTRACT_VERSION,
      id: `txn_${ID}`,
      ledgerId: `ldg_${ID}`,
      status: "pending",
      effectiveAt: "2026-10-02T10:00:00.000Z",
      recordedAt: "2026-10-02T10:01:00.000Z",
      idempotencyKey: "synthetic.journal-001",
      provenance: {
        source: { namespace: "synthetic.provider", id: "capture-001" },
        moneyEventIds: [],
        evidence: [
          { receiptId: `rcpt_${ID}`, contentHash: `sha256:${"a".repeat(64)}` },
        ],
      },
    },
    entries,
  };
}
function refuses(
  input: unknown,
  code: LedgerJournalIssueCode,
  path: string,
  ...catalog: [] | [unknown]
): void {
  const result = validateLedgerJournalCandidate(
    input,
    catalog.length ? catalog[0] : accounts(),
  );
  expect(result.ok).toBe(false);
  expect(Object.hasOwn(result, "value")).toBe(false);
  expect(Object.hasOwn(result, "totals")).toBe(false);
  expect(Object.hasOwn(result, "entries")).toBe(false);
  expect(result.issues).toEqual(
    expect.arrayContaining([expect.objectContaining({ code, path })]),
  );
}
describe("pure journal debit-equals-credit validation", () => {
  it("demonstrates exact synthetic conservation and rejects a one-minor-unit mismatch", () => {
    const candidate = journal();
    const result = validateLedgerJournalCandidate(candidate, accounts());
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.contractVersion).toBe(
        LEDGER_JOURNAL_CONTRACT_VERSION,
      );
      expect(result.value.transaction).toEqual(candidate.transaction);
      expect(
        result.value.entries.map((entry) => entry.amount.minorUnits),
      ).toEqual([1250n, 1250n]);
      expect(result.value.totals).toEqual([
        { currency: "USD", debitMinorUnits: 1250n, creditMinorUnits: 1250n },
      ]);
      expect(result.issues).toEqual([]);
    }
    refuses(
      journal([line(1, "debit"), line(2, "credit", "1249")]),
      "unbalanced_currency",
      "$.entries",
    );
  });
  it.each(["1", "9007199254740993", "9223372036854775807"])(
    "uses exact bigint for amount %s",
    (amount) => {
      const result = validateLedgerJournalCandidate(
        journal([line(1, "debit", amount), line(2, "credit", amount)]),
        accounts(),
      );
      expect(result.ok).toBe(true);
      if (result.ok)
        expect(result.value.totals).toEqual([
          {
            currency: "USD",
            debitMinorUnits: BigInt(amount),
            creditMinorUnits: BigInt(amount),
          },
        ]);
    },
  );
  it("accepts aggregates above the per-line maximum without overflow or a line brand", () => {
    const candidate = journal([
      line(1, "debit", "9223372036854775807"),
      line(2, "debit", "9223372036854775807"),
      line(3, "credit", "9223372036854775807"),
      line(4, "credit", "9223372036854775807"),
    ]);
    const result = validateLedgerJournalCandidate(candidate, accounts());
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.totals).toEqual([
        {
          currency: "USD",
          debitMinorUnits: 18446744073709551614n,
          creditMinorUnits: 18446744073709551614n,
        },
      ]);
      expect(
        result.value.totals[0]!.debitMinorUnits > LEDGER_ENTRY_MAX_MINOR_UNITS,
      ).toBe(true);
    }
  });
  it("rejects unequal totals above the safe Number range", () => {
    refuses(
      journal([
        line(1, "debit", "9007199254740993"),
        line(2, "credit", "9007199254740992"),
      ]),
      "unbalanced_currency",
      "$.entries",
    );
  });
  it("supports multiple currencies only with independent exact equality", () => {
    const candidate = journal([
      line(6, "credit", "7", "GBP"),
      line(1, "debit"),
      line(4, "credit", "3", "EUR"),
      line(3, "debit", "3", "EUR"),
      line(2, "credit"),
      line(5, "debit", "7", "GBP"),
    ]);
    const result = validateLedgerJournalCandidate(candidate, accounts());
    expect(result.ok).toBe(true);
    if (result.ok)
      expect(result.value.totals).toEqual([
        { currency: "EUR", debitMinorUnits: 3n, creditMinorUnits: 3n },
        { currency: "GBP", debitMinorUnits: 7n, creditMinorUnits: 7n },
        { currency: "USD", debitMinorUnits: 1250n, creditMinorUnits: 1250n },
      ]);
  });
  it("refuses cross-currency cancellation and offsetting discrepancies", () => {
    const result = validateLedgerJournalCandidate(
      journal([line(1, "debit", "10", "USD"), line(2, "credit", "10", "EUR")]),
      accounts(),
    );
    expect(result).toEqual({
      ok: false,
      issues: [
        {
          code: "missing_side",
          path: "$.entries",
          message: "EUR requires both debit and credit entries.",
        },
        {
          code: "missing_side",
          path: "$.entries",
          message: "USD requires both debit and credit entries.",
        },
      ],
    });
    refuses(
      journal([
        line(1, "debit", "10"),
        line(2, "credit", "9"),
        line(3, "debit", "9", "EUR"),
        line(4, "credit", "10", "EUR"),
      ]),
      "unbalanced_currency",
      "$.entries",
    );
  });
  it("refuses an empty group", () =>
    refuses(journal([]), "empty_entries", "$.entries"));
  it.each(["debit", "credit"] as const)(
    "refuses a single-sided %s group",
    (side) => {
      refuses(journal([line(1, side)]), "missing_side", "$.entries");
      refuses(
        journal([line(1, side), line(2, side)]),
        "missing_side",
        "$.entries",
      );
    },
  );
  it("refuses duplicate IDs even when totals match or the duplicate changes currency", () => {
    const debit = line(1, "debit");
    refuses(
      journal([debit, debit, line(2, "credit", "2500")]),
      "duplicate_entry_id",
      "$.entries[1].id",
    );
    refuses(
      journal([debit, { ...line(2, "credit"), id: debit.id }]),
      "duplicate_entry_id",
      "$.entries[1].id",
    );
    refuses(
      journal([
        debit,
        line(2, "credit"),
        { ...line(3, "debit", "1", "EUR"), id: debit.id },
        line(4, "credit", "1", "EUR"),
      ]),
      "duplicate_entry_id",
      "$.entries[2].id",
    );
  });
  it.each([
    "0",
    "-1",
    "01",
    "1.0",
    "1e3",
    "1\n",
    "9223372036854775808",
    "1".repeat(100),
  ])("preserves line amount refusal for %s", (minorUnits) => {
    const candidate = journal([
      line(1, "debit", minorUnits),
      line(2, "credit"),
    ]);
    refuses(
      candidate,
      minorUnits.length > 19 || minorUnits === "9223372036854775808"
        ? "amount_out_of_range"
        : "invalid_amount",
      "$.entries[0].amount.minorUnits",
    );
  });
  it.each([1, 1.25, NaN, Infinity, 1n, null, undefined, {}, new String("1")])(
    "refuses non-string line money %s",
    (amount) => {
      const debit = line(1, "debit");
      refuses(
        {
          ...journal(),
          entries: [
            { ...debit, amount: { ...debit.amount, minorUnits: amount } },
            line(2, "credit"),
          ],
        },
        "invalid_type",
        "$.entries[0].amount.minorUnits",
      );
    },
  );
  it.each([
    ["side", "both", "unsupported_value"],
    ["transactionId", `txn_${OTHER}`, "transaction_mismatch"],
    ["ledgerId", `ldg_${OTHER}`, "ledger_mismatch"],
    ["accountId", `acct_${OTHER}`, "unknown_account"],
    ["id", `ent_${ID}\n`, "invalid_identifier"],
  ] as const)("rejects invalid line %s", (field, value, code) =>
    refuses(
      {
        ...journal(),
        entries: [{ ...line(1, "debit"), [field]: value }, line(2, "credit")],
      },
      code,
      `$.entries[0].${field}`,
    ),
  );
  it("revalidates line currency/representation and account ledger consistency", () => {
    const debit = line(1, "debit");
    refuses(
      {
        ...journal(),
        entries: [
          { ...debit, amount: { ...debit.amount, currency: "EUR" } },
          line(2, "credit"),
        ],
      },
      "currency_mismatch",
      "$.entries[0].amount.currency",
    );
    refuses(
      {
        ...journal(),
        entries: [
          { ...debit, amount: { ...debit.amount, representation: "float" } },
          line(2, "credit"),
        ],
      },
      "unsupported_value",
      "$.entries[0].amount.representation",
    );
    refuses(
      journal(),
      "ledger_mismatch",
      "$.entries[0].accountId",
      accounts().map((account, i) =>
        i === 0 ? { ...account, ledgerId: `ldg_${OTHER}` } : account,
      ),
    );
  });
  it.each([null, undefined, 1, "catalog", {}, new Date()])(
    "requires an explicit supplied catalog %s",
    (catalog) =>
      refuses(journal(), "invalid_context", "$.context.accounts", catalog),
  );
  it("refuses missing, duplicate, invalid and noncanonical account metadata", () => {
    const catalog = accounts();
    refuses(journal(), "unknown_account", "$.entries[0].accountId", []);
    refuses(journal(), "invalid_context", "$.context.accounts[6].id", [
      ...catalog,
      catalog[0],
    ]);
    refuses(
      journal(),
      "invalid_context",
      "$.context.accounts[0].currency",
      catalog.map((account, i) =>
        i === 0 ? { ...account, currency: "JPY" } : account,
      ),
    );
    const result = validateLedgerJournalCandidate(
      journal(),
      catalog.map((account, i) =>
        i === 0 ? { ...account, id: account.id + "\n" } : account,
      ),
    );
    expect(result.ok).toBe(false);
    expect(
      result.issues.filter(
        (failure) =>
          failure.code === "invalid_context" &&
          failure.path === "$.context.accounts[0].id",
      ),
    ).toHaveLength(1);
    expect(Object.hasOwn(result, "value")).toBe(false);
  });
  it.each([null, undefined, 1, [], new Date()])(
    "revalidates the supplied transaction %s",
    (transaction) =>
      refuses(
        { ...journal(), transaction },
        "invalid_transaction",
        "$.transaction",
      ),
  );
  it("preserves nested header refusal paths", () => {
    const candidate = journal();
    refuses(
      { ...candidate, transaction: { ...candidate.transaction, id: "bad" } },
      "invalid_transaction",
      "$.transaction.id",
    );
    refuses(
      {
        ...candidate,
        transaction: {
          ...candidate.transaction,
          provenance: { ...candidate.transaction.provenance, evidence: [] },
        },
      },
      "invalid_transaction",
      "$.transaction.provenance.evidence",
    );
  });
  it.each([null, undefined, 1, "journal", [], new Date()])(
    "refuses malformed journal root %s",
    (root) => refuses(root, "invalid_object", "$"),
  );
  it.each(["contractVersion", "transaction", "entries"])(
    "requires root %s",
    (field) => {
      const candidate: Record<string, unknown> = { ...journal() };
      delete candidate[field];
      refuses(candidate, "required_field", `$.${field}`);
    },
  );
  it.each(["id", "totals", "approved", "posted", "balances"])(
    "refuses unknown root %s",
    (field) =>
      refuses({ ...journal(), [field]: true }, "unknown_field", `$.${field}`),
  );
  it("requires the exact group version without coercion", () => {
    refuses(
      { ...journal(), contractVersion: "m04.04-ledger-journal.v2" },
      "unsupported_value",
      "$.contractVersion",
    );
    refuses(
      { ...journal(), contractVersion: 1 },
      "invalid_type",
      "$.contractVersion",
    );
  });
  it.each([null, undefined, 1, "entries", {}, new Date()])(
    "requires a dense entry array %s",
    (entries) =>
      refuses({ ...journal(), entries }, "invalid_array", "$.entries"),
  );
  it("rejects sparse/extended/subclass/hidden/accessor arrays without invoking getters", () => {
    let calls = 0;
    const accessor = [...journal().entries];
    Object.defineProperty(accessor, "0", {
      enumerable: true,
      get() {
        calls++;
        throw new Error("getter");
      },
    });
    const hidden = [...journal().entries];
    Object.defineProperty(hidden, "0", { value: hidden[0], enumerable: false });
    class Lines extends Array<unknown> {}
    const subclass = new Lines();
    subclass.push(...journal().entries);
    for (const entries of [
      new Array(1000),
      Object.assign([...journal().entries], { extra: 1 }),
      accessor,
      hidden,
      subclass,
    ]) {
      const result = validateLedgerJournalCandidate(
        { ...journal(), entries },
        accounts(),
      );
      expect(result.ok).toBe(false);
      expect(Object.hasOwn(result, "value")).toBe(false);
    }
    const symbol = [...journal().entries];
    Object.defineProperty(symbol, Symbol("extra"), { value: true });
    refuses({ ...journal(), entries: symbol }, "invalid_array", "$.entries");
    expect(calls).toBe(0);
  });
  it("rejects root/line/catalog accessors and never coerces money", () => {
    let calls = 0;
    for (const field of [
      "contractVersion",
      "transaction",
      "entries",
    ] as const) {
      const candidate = { ...journal() };
      Object.defineProperty(candidate, field, {
        enumerable: true,
        get() {
          calls++;
          throw new Error("getter");
        },
      });
      refuses(candidate, "invalid_type", `$.${field}`);
    }
    const debit = { ...line(1, "debit") };
    Object.defineProperty(debit, "amount", {
      enumerable: true,
      get() {
        calls++;
        throw new Error("getter");
      },
    });
    refuses(
      { ...journal(), entries: [debit, line(2, "credit")] },
      "invalid_type",
      "$.entries[0].amount",
    );
    const catalog = accounts();
    Object.defineProperty(catalog, "0", {
      enumerable: true,
      get() {
        calls++;
        throw new Error("getter");
      },
    });
    refuses(journal(), "invalid_context", "$.context.accounts[0]", catalog);
    const money = {
      toString() {
        calls++;
        throw new Error("coercion");
      },
      valueOf() {
        calls++;
        throw new Error("coercion");
      },
    };
    refuses(
      {
        ...journal(),
        entries: [
          {
            ...line(1, "debit"),
            amount: { ...line(1, "debit").amount, minorUnits: money },
          },
          line(2, "credit"),
        ],
      },
      "invalid_type",
      "$.entries[0].amount.minorUnits",
    );
    expect(calls).toBe(0);
  });
  it("rejects inherited/class/hidden/symbol journal data", () => {
    refuses(Object.create(journal()), "invalid_object", "$");
    class Candidate {
      constructor() {
        Object.assign(this, journal());
      }
    }
    refuses(new Candidate(), "invalid_object", "$");
    const hidden = { ...journal() };
    Object.defineProperty(hidden, "contractVersion", {
      value: LEDGER_JOURNAL_CONTRACT_VERSION,
      enumerable: false,
    });
    refuses(hidden, "invalid_type", "$.contractVersion");
    refuses({ ...journal(), [Symbol("extra")]: 1 }, "unknown_field", "$");
  });
  it("does not treat lifecycle/normal-side metadata or same-account offsets as posting eligibility", () => {
    for (const status of ["pending", "posted", "rejected", "voided"] as const) {
      const candidate = journal([
        line(1, "debit"),
        { ...line(2, "credit"), accountId: line(1, "debit").accountId },
      ]);
      expect(
        validateLedgerJournalCandidate(
          { ...candidate, transaction: { ...candidate.transaction, status } },
          accounts().map((account) => ({ ...account, status: "closed" })),
        ).ok,
      ).toBe(true);
    }
  });
  it("accepts null-prototype data, freezes every returned structure and leaves inputs unchanged", () => {
    const candidate = journal();
    const catalog = accounts();
    const before = JSON.stringify({ candidate, catalog });
    const result = validateLedgerJournalCandidate(
      Object.assign(Object.create(null) as object, candidate),
      catalog,
    );
    expect(result.ok).toBe(true);
    if (result.ok) {
      const frozen = [
        result,
        result.value,
        result.issues,
        result.value.transaction,
        result.value.transaction.provenance,
        result.value.transaction.provenance.evidence,
        result.value.transaction.provenance.evidence[0],
        result.value.entries,
        ...result.value.entries,
        ...result.value.entries.map((entry) => entry.amount),
        result.value.totals,
        ...result.value.totals,
      ];
      expect(frozen.every(Object.isFrozen)).toBe(true);
      expect(result.value.entries).not.toBe(candidate.entries);
      expect(result.value.transaction).not.toBe(candidate.transaction);
      expect(result.value.entries[0]).not.toBe(candidate.entries[0]);
      expect(Reflect.set(result.value.totals[0]!, "debitMinorUnits", 0n)).toBe(
        false,
      );
      expect(JSON.stringify({ candidate, catalog })).toBe(before);
      (candidate.entries[0]!.amount as { minorUnits: string }).minorUnits = "1";
      (candidate.transaction.provenance.source as { id: string }).id =
        "changed";
      expect(result.value.totals[0]!.debitMinorUnits).toBe(1250n);
      expect(result.value.transaction.provenance.source.id).toBe("capture-001");
    }
  });
  it("has canonical successful output under entry and account permutations", () => {
    const entries = [
      line(4, "credit", "7"),
      line(1, "debit", "3"),
      line(3, "debit", "7"),
      line(2, "credit", "3"),
    ];
    const expected = validateLedgerJournalCandidate(
      journal(entries),
      accounts(),
    );
    expect(expected.ok).toBe(true);
    if (expected.ok)
      expect(expected.value.entries.map((entry) => entry.id)).toEqual(
        [1, 2, 3, 4].map((n) => `ent_${identity(n)}`),
      );
    for (const reordered of [
      entries,
      [...entries].reverse(),
      [entries[1]!, entries[3]!, entries[0]!, entries[2]!],
    ])
      expect(
        validateLedgerJournalCandidate(
          journal(reordered),
          [...accounts()].reverse(),
        ),
      ).toEqual(expected);
  });
  it("checks deterministic generated conservation and off-by-one failures", () => {
    for (let i = 1; i <= 20; i++) {
      const amount = BigInt(i) * 9007199254740993n;
      const result = validateLedgerJournalCandidate(
        journal([
          line(3, "credit", amount.toString()),
          line(2, "debit", amount.toString()),
          line(1, "debit", amount.toString()),
          line(4, "credit", amount.toString()),
        ]),
        accounts(),
      );
      expect(result.ok).toBe(true);
      if (result.ok)
        expect(result.value.totals).toEqual([
          {
            currency: "USD",
            debitMinorUnits: 2n * amount,
            creditMinorUnits: 2n * amount,
          },
        ]);
      refuses(
        journal([
          line(1, "debit", amount.toString()),
          line(2, "credit", (amount - 1n).toString()),
        ]),
        "unbalanced_currency",
        "$.entries",
      );
    }
  });
  it("returns repeatable frozen sorted issues without computing from invalid partial lines", () => {
    const candidate = {
      ...journal(),
      extra: true,
      contractVersion: "bad",
      entries: [
        { ...line(1, "debit"), side: "bad" },
        { ...line(2, "credit"), id: "bad" },
      ],
    };
    const result = validateLedgerJournalCandidate(candidate, accounts());
    expect(result.ok).toBe(false);
    expect(result.issues.map(({ path, code }) => [path, code])).toEqual([
      ["$.contractVersion", "unsupported_value"],
      ["$.entries[0].side", "unsupported_value"],
      ["$.entries[1].id", "invalid_identifier"],
      ["$.extra", "unknown_field"],
    ]);
    expect(
      result.issues.some(
        (failure) =>
          failure.code === "missing_side" ||
          failure.code === "unbalanced_currency",
      ),
    ).toBe(false);
    expect(
      [result, result.issues, ...result.issues].every(Object.isFrozen),
    ).toBe(true);
    for (let i = 0; i < 3; i++)
      expect(validateLedgerJournalCandidate(candidate, accounts())).toEqual(
        result,
      );
  });
});
