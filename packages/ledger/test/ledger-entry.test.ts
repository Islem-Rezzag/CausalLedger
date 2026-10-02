import { describe, expect, it } from "vitest";
import {
  ACCOUNT_CONTRACT_VERSION,
  LEDGER_TRANSACTION_CONTRACT_VERSION,
  LEDGER_ENTRY_CONTRACT_VERSION,
  LEDGER_ENTRY_MAX_MINOR_UNITS,
  LEDGER_ENTRY_SIDES,
  validateLedgerEntryCandidate,
} from "../src/index.js";
import type {
  LedgerEntryCandidate,
  LedgerEntryContextCandidate,
  LedgerEntryIssueCode,
} from "../src/index.js";

const ID = "01ARZ3NDEKTSV4RRFFQ69G5FAV";
const OTHER = "01ARZ3NDEKTSV4RRFFQ69G5FAW";
function entry(): LedgerEntryCandidate {
  return {
    contractVersion: LEDGER_ENTRY_CONTRACT_VERSION,
    id: `ent_${ID}`,
    transactionId: `txn_${ID}`,
    ledgerId: `ldg_${ID}`,
    accountId: `acct_${ID}`,
    side: "debit",
    amount: {
      representation: "integer_minor_units",
      minorUnits: "1250",
      currency: "USD",
    },
  };
}
function context(): LedgerEntryContextCandidate {
  return {
    transaction: {
      contractVersion: LEDGER_TRANSACTION_CONTRACT_VERSION,
      id: `txn_${ID}`,
      ledgerId: `ldg_${ID}`,
      status: "pending",
      effectiveAt: "2026-09-30T20:00:00.000Z",
      recordedAt: "2026-09-30T20:01:00.000Z",
      idempotencyKey: "synthetic.capture-001",
      provenance: {
        source: { namespace: "synthetic.provider", id: "capture-001" },
        moneyEventIds: [],
        evidence: [
          { receiptId: `rcpt_${ID}`, contentHash: `sha256:${"a".repeat(64)}` },
        ],
      },
    },
    accounts: [
      {
        contractVersion: ACCOUNT_CONTRACT_VERSION,
        id: `acct_${ID}`,
        ledgerId: `ldg_${ID}`,
        name: "Synthetic asset",
        category: "asset",
        normalBalance: "debit",
        currency: "USD",
        owner: { namespace: "synthetic.owner", id: "owner-001" },
        status: "active",
      },
    ],
  };
}
function rejects(
  candidate: unknown,
  code: LedgerEntryIssueCode,
  path: string,
  ...supplied: [] | [unknown]
): void {
  const result = validateLedgerEntryCandidate(
    candidate,
    supplied.length ? supplied[0] : context(),
  );
  expect(result.ok).toBe(false);
  expect(Object.hasOwn(result, "value")).toBe(false);
  expect(result.issues).toEqual(
    expect.arrayContaining([expect.objectContaining({ code, path })]),
  );
}

describe("LedgerEntry wire and supplied-reference contract", () => {
  it("demonstrates an exact synthetic debit and refuses account currency drift", () => {
    const candidate = entry();
    expect(validateLedgerEntryCandidate(candidate, context())).toEqual({
      ok: true,
      value: {
        ...candidate,
        amount: {
          representation: "integer_minor_units",
          minorUnits: 1250n,
          currency: "USD",
        },
      },
      issues: [],
    });
    expect(
      validateLedgerEntryCandidate(
        { ...candidate, amount: { ...candidate.amount, currency: "EUR" } },
        context(),
      ),
    ).toEqual({
      ok: false,
      issues: [
        {
          code: "currency_mismatch",
          path: "$.amount.currency",
          message:
            "Entry currency differs from the referenced supplied account.",
        },
      ],
    });
  });
  it.each([
    ["1", 1n],
    ["9007199254740993", 9007199254740993n],
    ["9223372036854775807", 9223372036854775807n],
  ] as const)("retains exact amount %s", (wire, exact) => {
    const candidate = entry();
    const result = validateLedgerEntryCandidate(
      { ...candidate, amount: { ...candidate.amount, minorUnits: wire } },
      context(),
    );
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.amount.minorUnits).toBe(exact);
      expect(typeof result.value.amount.minorUnits).toBe("bigint");
    }
  });
  it.each([
    "9223372036854775808",
    "9999999999999999999",
    "10000000000000000000",
    "1".repeat(1000),
  ])("refuses out-of-range canonical amount %s", (minorUnits) => {
    rejects(
      { ...entry(), amount: { ...entry().amount, minorUnits } },
      "amount_out_of_range",
      "$.amount.minorUnits",
    );
  });
  it.each([
    "0",
    "00",
    "01",
    "-0",
    "-1",
    "+1",
    " 1",
    "1 ",
    "1\n",
    "1\r",
    "1\r\n",
    "1.0",
    "0.01",
    "1e3",
    "0x10",
    "1_000",
    "",
    "NaN",
    "Infinity",
    "１２",
    "١٢",
  ])("refuses ambiguous or nonpositive amount %j", (minorUnits) => {
    rejects(
      { ...entry(), amount: { ...entry().amount, minorUnits } },
      "invalid_amount",
      "$.amount.minorUnits",
    );
  });
  it.each([
    0,
    1,
    -1,
    1.25,
    Number.MAX_SAFE_INTEGER,
    Number.MAX_SAFE_INTEGER + 1,
    NaN,
    Infinity,
    1n,
    null,
    undefined,
    true,
    [],
    {},
    new String("1"),
  ])("refuses non-string money %s", (minorUnits) => {
    rejects(
      { ...entry(), amount: { ...entry().amount, minorUnits } },
      "invalid_type",
      "$.amount.minorUnits",
    );
  });
  it("never coerces money", () => {
    let calls = 0;
    const minorUnits = {
      toString() {
        calls++;
        throw new Error("coerced");
      },
      valueOf() {
        calls++;
        throw new Error("coerced");
      },
    };
    rejects(
      { ...entry(), amount: { ...entry().amount, minorUnits } },
      "invalid_type",
      "$.amount.minorUnits",
    );
    expect(calls).toBe(0);
  });
  it.each(LEDGER_ENTRY_SIDES)(
    "accepts explicit %s independently of normal balance",
    (side) => {
      expect(
        validateLedgerEntryCandidate({ ...entry(), side }, context()).ok,
      ).toBe(true);
    },
  );
  it.each(["EUR", "GBP", "USD"] as const)(
    "matches supported %s account currency",
    (currency) => {
      const supplied = context();
      expect(
        validateLedgerEntryCandidate(
          { ...entry(), amount: { ...entry().amount, currency } },
          { ...supplied, accounts: [{ ...supplied.accounts[0], currency }] },
        ).ok,
      ).toBe(true);
    },
  );
  it.each(["pending", "posted", "rejected", "voided"] as const)(
    "treats header %s as metadata",
    (status) => {
      const supplied = context();
      expect(
        validateLedgerEntryCandidate(entry(), {
          ...supplied,
          transaction: { ...supplied.transaction, status },
        }).ok,
      ).toBe(true);
    },
  );
  it("does not infer closed-account eligibility or credit-normal entry direction", () => {
    const supplied = context();
    const account = {
      ...supplied.accounts[0],
      category: "liability",
      normalBalance: "credit",
      status: "closed",
    };
    expect(
      validateLedgerEntryCandidate(entry(), {
        ...supplied,
        accounts: [account],
      }).ok,
    ).toBe(true);
  });
  it.each([
    "contractVersion",
    "id",
    "transactionId",
    "ledgerId",
    "accountId",
    "side",
    "amount",
  ])("requires entry %s", (field) => {
    const candidate: Record<string, unknown> = { ...entry() };
    delete candidate[field];
    rejects(candidate, "required_field", `$.${field}`);
  });
  it.each(["representation", "minorUnits", "currency"])(
    "requires amount %s",
    (field) => {
      const candidate = entry();
      const value: Record<string, unknown> = { ...candidate.amount };
      delete value[field];
      rejects(
        { ...candidate, amount: value },
        "required_field",
        `$.amount.${field}`,
      );
    },
  );
  it.each([null, undefined, 1, "entry", true, [], new Date()])(
    "refuses malformed entry root %j",
    (candidate) => {
      rejects(candidate, "invalid_object", "$");
    },
  );
  it.each([null, undefined, 1, "1250", [], new Date()])(
    "refuses malformed amount %j",
    (amount) => {
      rejects({ ...entry(), amount }, "invalid_object", "$.amount");
    },
  );
  it.each([
    ["contractVersion", "m04.03-ledger-entry.v2"],
    ["side", "Debit"],
    ["side", "credit\n"],
    ["side", "both"],
  ])("refuses unsupported %s=%s", (field, value) => {
    rejects({ ...entry(), [field]: value }, "unsupported_value", `$.${field}`);
  });
  it.each([
    ["representation", "decimal_major_units"],
    ["currency", "JPY"],
    ["currency", "usd"],
    ["currency", "USD\n"],
  ])("refuses unsupported amount %s=%s", (field, value) => {
    rejects(
      { ...entry(), amount: { ...entry().amount, [field]: value } },
      "unsupported_value",
      `$.amount.${field}`,
    );
  });
  it.each(["id", "transactionId", "ledgerId", "accountId"])(
    "refuses malformed %s without inference",
    (field) => {
      const candidate = entry();
      for (const value of [
        "",
        "wrong_" + ID,
        candidate[field as "id"] + "\n",
        candidate[field as "id"].toLowerCase(),
        candidate[field as "id"].replace(ID, "8" + ID.slice(1)),
        candidate[field as "id"].replace(ID, "I" + ID.slice(1)),
      ]) {
        rejects(
          { ...candidate, [field]: value },
          "invalid_identifier",
          `$.${field}`,
        );
      }
    },
  );
  it.each([
    "contractVersion",
    "id",
    "transactionId",
    "ledgerId",
    "accountId",
    "side",
  ])("refuses numeric %s", (field) => {
    rejects({ ...entry(), [field]: 1 }, "invalid_type", `$.${field}`);
  });
  it.each([
    "entries",
    "balance",
    "debit",
    "credit",
    "status",
    "provenance",
    "createdAt",
  ])("refuses unimplemented or alias field %s", (field) => {
    rejects({ ...entry(), [field]: "extra" }, "unknown_field", `$.${field}`);
  });
  it("refuses amount aliases and symbol fields", () => {
    rejects(
      { ...entry(), amount: { ...entry().amount, value: "1250" } },
      "unknown_field",
      "$.amount.value",
    );
    rejects({ ...entry(), [Symbol("extra")]: 1 }, "unknown_field", "$");
  });
  it("matches the supplied transaction and ledger", () => {
    rejects(
      { ...entry(), transactionId: `txn_${OTHER}` },
      "transaction_mismatch",
      "$.transactionId",
    );
    rejects(
      { ...entry(), ledgerId: `ldg_${OTHER}` },
      "ledger_mismatch",
      "$.ledgerId",
    );
  });
  it("refuses an absent account and a cross-ledger account", () => {
    rejects(
      { ...entry(), accountId: `acct_${OTHER}` },
      "unknown_account",
      "$.accountId",
    );
    const supplied = context();
    rejects(entry(), "ledger_mismatch", "$.accountId", {
      ...supplied,
      accounts: [{ ...supplied.accounts[0], ledgerId: `ldg_${OTHER}` }],
    });
    rejects(entry(), "unknown_account", "$.accountId", {
      ...supplied,
      accounts: [],
    });
  });
  it("accepts unrelated other-ledger catalog members without using them", () => {
    const supplied = context();
    expect(
      validateLedgerEntryCandidate(entry(), {
        ...supplied,
        accounts: [
          ...supplied.accounts,
          {
            ...supplied.accounts[0],
            id: `acct_${OTHER}`,
            ledgerId: `ldg_${OTHER}`,
            currency: "EUR",
          },
        ],
      }).ok,
    ).toBe(true);
  });
  it.each([null, undefined, 1, "context", [], new Date()])(
    "requires plain supplied context %j",
    (supplied) => {
      rejects(entry(), "invalid_object", "$.context", supplied);
    },
  );
  it.each(["transaction", "accounts"])("requires context %s", (field) => {
    const supplied: Record<string, unknown> = { ...context() };
    delete supplied[field];
    rejects(entry(), "required_field", `$.context.${field}`, supplied);
  });
  it("refuses extra context and invalid nested header/account metadata", () => {
    const supplied = context();
    rejects(entry(), "unknown_field", "$.context.approved", {
      ...supplied,
      approved: true,
    });
    rejects(
      entry(),
      "invalid_context",
      "$.context.transaction.provenance.evidence",
      {
        ...supplied,
        transaction: {
          ...supplied.transaction,
          provenance: { ...supplied.transaction.provenance, evidence: [] },
        },
      },
    );
    rejects(entry(), "invalid_context", "$.context.accounts[0].currency", {
      ...supplied,
      accounts: [{ ...supplied.accounts[0], currency: "JPY" }],
    });
    rejects(entry(), "invalid_context", "$.context.accounts[1].id", {
      ...supplied,
      accounts: [...supplied.accounts, supplied.accounts[0]],
    });
  });
  it("refuses noncanonical IDs even if the prior Account shape accepts a terminal newline", () => {
    const supplied = context();
    for (const field of ["id", "ledgerId"] as const) {
      rejects(entry(), "invalid_context", `$.context.accounts[0].${field}`, {
        ...supplied,
        accounts: [
          {
            ...supplied.accounts[0],
            [field]: supplied.accounts[0]![field] + "\n",
          },
        ],
      });
    }
  });
  it("refuses sparse, extended, accessor and subclass catalogs without getter execution", () => {
    const supplied = context();
    let calls = 0;
    const accessor = [supplied.accounts[0]];
    Object.defineProperty(accessor, "0", {
      enumerable: true,
      get() {
        calls++;
        throw new Error("getter");
      },
    });
    const extended = Object.assign([...supplied.accounts], { extra: true });
    class Catalog extends Array<unknown> {}
    const subclass = new Catalog();
    subclass.push(...supplied.accounts);
    for (const accounts of [new Array(1), accessor, extended, subclass]) {
      const result = validateLedgerEntryCandidate(entry(), {
        ...supplied,
        accounts,
      });
      expect(result.ok).toBe(false);
      expect(Object.hasOwn(result, "value")).toBe(false);
    }
    expect(calls).toBe(0);
  });
  it("never executes root, amount or context getters", () => {
    let calls = 0;
    for (const [target, field, path] of [
      [{ ...entry() }, "id", "$.id"],
      [{ ...entry().amount }, "minorUnits", "$.amount.minorUnits"],
      [{ ...context() }, "transaction", "$.context.transaction"],
    ] as const) {
      Object.defineProperty(target, field, {
        enumerable: true,
        get() {
          calls++;
          throw new Error("getter");
        },
      });
      if (path.startsWith("$.context"))
        rejects(entry(), "invalid_type", path, target);
      else if (path.startsWith("$.amount"))
        rejects({ ...entry(), amount: target }, "invalid_type", path);
      else rejects(target, "invalid_type", path);
    }
    expect(calls).toBe(0);
  });
  it("refuses hidden, inherited and class entry fields", () => {
    const hidden = { ...entry() };
    Object.defineProperty(hidden, "side", {
      value: "debit",
      enumerable: false,
    });
    rejects(hidden, "invalid_type", "$.side");
    rejects(Object.create(entry()), "invalid_object", "$");
    class Candidate {
      constructor() {
        Object.assign(this, entry());
      }
    }
    rejects(new Candidate(), "invalid_object", "$");
  });
  it("accepts null-prototype data and freezes detached outputs without input mutation", () => {
    const candidate = Object.assign(
      Object.create(null) as Record<string, unknown>,
      entry(),
    );
    const supplied = context();
    const before = JSON.stringify({ candidate, supplied });
    const result = validateLedgerEntryCandidate(
      candidate,
      Object.assign(Object.create(null) as object, supplied),
    );
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value).not.toBe(candidate);
      expect(result.value.amount).not.toBe(candidate.amount);
      expect(Object.isFrozen(result)).toBe(true);
      expect(Object.isFrozen(result.value)).toBe(true);
      expect(Object.isFrozen(result.value.amount)).toBe(true);
      expect(Object.isFrozen(result.issues)).toBe(true);
      expect(Reflect.set(result.value, "side", "credit")).toBe(false);
      expect(Reflect.set(result.value.amount, "minorUnits", 0n)).toBe(false);
      expect(JSON.stringify({ candidate, supplied })).toBe(before);
      (candidate.amount as { minorUnits: string }).minorUnits = "7";
      expect(result.value.amount.minorUnits).toBe(1250n);
    }
  });
  it("returns deterministic complete sorted frozen failures and no partial entry", () => {
    const bad = {
      ...entry(),
      side: "unknown",
      amount: { ...entry().amount, minorUnits: "-1", currency: "JPY" },
    };
    const result = validateLedgerEntryCandidate(bad, context());
    expect(result).toEqual({
      ok: false,
      issues: [
        {
          code: "unsupported_value",
          path: "$.amount.currency",
          message: "Unsupported canonical value.",
        },
        {
          code: "invalid_amount",
          path: "$.amount.minorUnits",
          message:
            "Expected canonical positive integer minor units without signs or leading zeros.",
        },
        {
          code: "unsupported_value",
          path: "$.side",
          message: "Unsupported canonical value.",
        },
      ],
    });
    expect(Object.isFrozen(result)).toBe(true);
    expect(Object.isFrozen(result.issues)).toBe(true);
    expect(result.issues.every(Object.isFrozen)).toBe(true);
    for (let i = 0; i < 3; i++)
      expect(validateLedgerEntryCandidate(bad, context())).toEqual(result);
    expect(Object.hasOwn(result, "value")).toBe(false);
  });
  it("exposes frozen side policy and an exact bigint bound", () => {
    expect(LEDGER_ENTRY_MAX_MINOR_UNITS).toBe(9223372036854775807n);
    expect(LEDGER_ENTRY_SIDES).toEqual(["debit", "credit"]);
    expect(Object.isFrozen(LEDGER_ENTRY_SIDES)).toBe(true);
  });
});
