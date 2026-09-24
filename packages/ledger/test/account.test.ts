import { describe, expect, it } from "vitest";
import {
  ACCOUNT_CONTRACT_VERSION,
  ACCOUNT_CATEGORIES,
  ACCOUNT_CURRENCIES,
  ACCOUNT_NORMAL_BALANCES,
  ACCOUNT_STATUSES,
  validateAccountCandidate,
  validateAccountCatalog,
  type AccountCandidate,
  type AccountIssueCode,
} from "../src/index.js";

// Controlled synthetic metadata only; these IDs refer to no persisted accounts.
function candidate(): AccountCandidate {
  return {
    contractVersion: ACCOUNT_CONTRACT_VERSION,
    id: "acct_01ARZ3NDEKTSV4RRFFQ69G5FAV",
    ledgerId: "ldg_01ARZ3NDEKTSV4RRFFQ69G5FAW",
    name: "Synthetic asset",
    category: "asset",
    normalBalance: "debit",
    currency: "GBP",
    owner: { namespace: "synthetic.platform", id: "platform_001" },
    status: "active",
  };
}

function refuses(input: unknown, path: string, code: AccountIssueCode): void {
  const result = validateAccountCandidate(input);
  expect(result.ok).toBe(false);
  expect(result).not.toHaveProperty("value");
  expect(result.issues).toEqual(
    expect.arrayContaining([expect.objectContaining({ path, code })]),
  );
}

describe("Account schema", () => {
  it.each(ACCOUNT_CATEGORIES)(
    "accepts %s with its explicit normal side across supported currencies/statuses",
    (category) => {
      for (const currency of ACCOUNT_CURRENCIES)
        for (const status of ACCOUNT_STATUSES) {
          const input = {
            ...candidate(),
            category,
            normalBalance: ACCOUNT_NORMAL_BALANCES[category],
            currency,
            status,
          };
          const result = validateAccountCandidate(input);
          expect(result).toEqual({ ok: true, value: input, issues: [] });
        }
    },
  );

  it.each(ACCOUNT_CATEGORIES)(
    "rejects contradictory side for %s",
    (category) => {
      refuses(
        {
          ...candidate(),
          category,
          normalBalance:
            ACCOUNT_NORMAL_BALANCES[category] === "debit" ? "credit" : "debit",
        },
        "$.normalBalance",
        "normal_balance_mismatch",
      );
    },
  );

  it.each(Object.keys(candidate()))("requires %s", (key) => {
    const input: Record<string, unknown> = { ...candidate() };
    delete input[key];
    refuses(input, `$.${key}`, "required_field");
  });

  it.each([
    null,
    undefined,
    true,
    4,
    "{}",
    [],
    new Date(0),
    Object.create({ inherited: true }) as unknown,
  ])("rejects non-data root %#", (input) => {
    refuses(input, "$", "invalid_object");
  });

  it.each([null, undefined, 1, true, [], {}, Object("GBP") as unknown])(
    "does not coerce scalar value %#",
    (value) => {
      for (const field of Object.keys(candidate()).filter(
        (key) => key !== "owner",
      )) {
        refuses(
          { ...candidate(), [field]: value },
          `$.${field}`,
          "invalid_type",
        );
      }
    },
  );

  it.each([
    ["contractVersion", "future"],
    ["category", "clearing"],
    ["category", "Asset"],
    ["category", "constructor"],
    ["currency", "JPY"],
    ["currency", "XXX"],
    ["currency", "gbp"],
    ["currency", "GBP "],
    ["currency", "GBP\n"],
    ["status", "pending"],
    ["status", "closed "],
    ["normalBalance", "+"],
    ["normalBalance", "credit "],
  ])("rejects unsupported %s=%s", (field, value) => {
    refuses(
      { ...candidate(), [field]: value },
      `$.${field}`,
      "unsupported_value",
    );
  });

  it.each([
    "",
    "acct_01arz3ndektsv4rrffq69g5fav",
    "acct_81ARZ3NDEKTSV4RRFFQ69G5FAV",
    "acct_01ARZ3NDEKTSV4RRFFQ69G5FAI",
    "acct_01ARZ3NDEKTSV4RRFFQ69G5FAU",
    "acct_01ARZ3NDEKTSV4RRFFQ69G5FA",
    "acct_001ARZ3NDEKTSV4RRFFQ69G5FAV",
    "acct_01ARZ3NDEKTSV4RRFFQ69G5FAV\n",
    " acct_01ARZ3NDEKTSV4RRFFQ69G5FAV",
    "ldg_01ARZ3NDEKTSV4RRFFQ69G5FAV",
  ])("rejects malformed account ID %#", (id) => {
    refuses({ ...candidate(), id }, "$.id", "invalid_identifier");
  });

  it.each([
    "",
    "ldg_81ARZ3NDEKTSV4RRFFQ69G5FAW",
    "ldg_01arz3ndektsv4rrffq69g5faw",
    "ldg_01ARZ3NDEKTSV4RRFFQ69G5FAW\n",
    "acct_01ARZ3NDEKTSV4RRFFQ69G5FAV",
  ])("rejects malformed or conflicting ledger ID %#", (ledgerId) => {
    refuses({ ...candidate(), ledgerId }, "$.ledgerId", "invalid_identifier");
  });

  it("accepts ULID lower and upper numeric boundaries without generating IDs", () => {
    for (const suffix of ["0".repeat(26), "7" + "Z".repeat(25)]) {
      const result = validateAccountCandidate({
        ...candidate(),
        id: `acct_${suffix}`,
        ledgerId: `ldg_${suffix}`,
      });
      expect(result.ok).toBe(true);
    }
  });

  it.each([
    "",
    " ",
    "name ",
    " name",
    "bad\nname",
    "bad\u0000name",
    "bad\u007fname",
    "a".repeat(121),
  ])("rejects invalid name %#", (name) => {
    refuses({ ...candidate(), name }, "$.name", "invalid_name");
  });

  it("accepts canonical display names without treating them as account semantics", () => {
    for (const name of [
      "a",
      "a".repeat(120),
      "Synthetic café",
      "revenue liability cash clearing",
    ]) {
      expect(validateAccountCandidate({ ...candidate(), name }).ok).toBe(true);
    }
  });

  it.each([null, [], "owner", 7])("rejects invalid owner %#", (owner) => {
    refuses({ ...candidate(), owner }, "$.owner", "invalid_object");
  });

  it.each(["namespace", "id"])("requires owner %s", (key) => {
    const owner: Record<string, unknown> = { ...candidate().owner };
    delete owner[key];
    refuses({ ...candidate(), owner }, `$.owner.${key}`, "required_field");
    refuses(
      { ...candidate(), owner: { ...candidate().owner, [key]: 42 } },
      `$.owner.${key}`,
      "invalid_type",
    );
  });

  it.each([
    "",
    "Customer",
    "customer ",
    "customer\n",
    "customer/id",
    "a".repeat(65),
  ])("rejects malformed owner namespace %#", (namespace) => {
    refuses(
      { ...candidate(), owner: { ...candidate().owner, namespace } },
      "$.owner.namespace",
      "invalid_identifier",
    );
  });

  it.each(["", " id", "id\n", "customer/id", "customer id", "a".repeat(129)])(
    "rejects malformed owner reference %#",
    (id) => {
      refuses(
        { ...candidate(), owner: { ...candidate().owner, id } },
        "$.owner.id",
        "invalid_identifier",
      );
    },
  );

  it.each([
    "accountId",
    "balance",
    "amount",
    "approved",
    "posting",
    "__proto__",
  ])("rejects unknown/conflicting root field %s", (key) => {
    const input = { ...candidate(), [key]: "untrusted" };
    refuses(input, `$.${key}`, "unknown_field");
  });

  it("rejects unknown owner fields and symbols", () => {
    refuses(
      { ...candidate(), owner: { ...candidate().owner, authorized: true } },
      "$.owner.authorized",
      "unknown_field",
    );
    refuses({ ...candidate(), [Symbol("hidden")]: true }, "$", "unknown_field");
    refuses(
      {
        ...candidate(),
        owner: { ...candidate().owner, [Symbol("hidden")]: true },
      },
      "$.owner",
      "unknown_field",
    );
  });

  it("refuses accessors and non-enumerable fields without invoking getters", () => {
    let calls = 0;
    const input = Object.defineProperty({ ...candidate() }, "currency", {
      get() {
        calls++;
        return "GBP";
      },
      enumerable: true,
    });
    refuses(input, "$.currency", "invalid_type");
    const owner = Object.defineProperty({ ...candidate().owner }, "id", {
      get() {
        calls++;
        return "id";
      },
      enumerable: true,
    });
    refuses({ ...candidate(), owner }, "$.owner.id", "invalid_type");
    refuses(
      Object.defineProperty({ ...candidate() }, "id", { enumerable: false }),
      "$.id",
      "invalid_type",
    );
    expect(calls).toBe(0);
  });

  it("accepts null-prototype data, copies snapshots, and freezes returned metadata", () => {
    const input = { ...candidate(), owner: { ...candidate().owner } };
    const before = { ...input, owner: { ...input.owner } };
    const result = validateAccountCandidate(input);
    expect(input).toEqual(before);
    expect(result.ok).toBe(true);
    if (!result.ok) throw new Error("expected valid synthetic metadata");
    expect(result.value).not.toBe(input);
    expect(result.value.owner).not.toBe(input.owner);
    expect(Object.isFrozen(result)).toBe(true);
    expect(Object.isFrozen(result.value)).toBe(true);
    expect(Object.isFrozen(result.value.owner)).toBe(true);
    expect(Reflect.set(result.value, "currency", "USD")).toBe(false);
    expect(Reflect.set(result.value.owner, "id", "attacker")).toBe(false);
    input.owner.id = "changed";
    expect(result.value.owner.id).toBe(before.owner.id);
    const nullProto: unknown = Object.assign(Object.create(null), before);
    expect(validateAccountCandidate(nullProto)).toEqual(result);
  });

  it("returns deterministic ordered immutable issues independent of property order", () => {
    const input = {
      ...candidate(),
      id: "bad",
      currency: "gbp",
      z: "unknown",
      a: "unknown",
    };
    const reordered = Object.fromEntries(Object.entries(input).reverse());
    const result = validateAccountCandidate(input);
    expect(result).toEqual(validateAccountCandidate(reordered));
    expect(result).toEqual(validateAccountCandidate(input));
    expect(result.issues.map((entry) => entry.path)).toEqual([
      "$.a",
      "$.currency",
      "$.id",
      "$.z",
    ]);
    expect(Object.isFrozen(result.issues)).toBe(true);
    expect(result.issues.every(Object.isFrozen)).toBe(true);
  });

  it("keeps policy exports immutable at runtime", () => {
    for (const value of [
      ACCOUNT_CATEGORIES,
      ACCOUNT_CURRENCIES,
      ACCOUNT_STATUSES,
      ACCOUNT_NORMAL_BALANCES,
    ])
      expect(Object.isFrozen(value)).toBe(true);
    expect(Reflect.set(ACCOUNT_NORMAL_BALANCES, "asset", "credit")).toBe(false);
  });
});

describe("Supplied account catalog", () => {
  it("demonstrates valid synthetic accounts and refuses conflicting ownership", () => {
    const first = candidate();
    const second = {
      ...candidate(),
      id: "acct_01ARZ3NDEKTSV4RRFFQ69G5FAX",
      currency: "USD",
    };
    const before = [first, second].map((value) => ({
      ...value,
      owner: { ...value.owner },
    }));
    const accepted = validateAccountCatalog([first, second]);
    expect(accepted).toEqual({ ok: true, value: before, issues: [] });
    expect([first, second]).toEqual(before);
    if (!accepted.ok) throw new Error("expected valid catalog");
    expect(Object.isFrozen(accepted.value)).toBe(true);
    expect(accepted.value[0]).not.toBe(first);
    const conflict = validateAccountCatalog([
      first,
      {
        ...first,
        owner: { namespace: "synthetic.customer", id: "another-owner" },
      },
    ]);
    expect(conflict.ok).toBe(false);
    expect(conflict).not.toHaveProperty("value");
    expect(conflict.issues[0]).toMatchObject({
      code: "duplicate_account_id",
      path: "$[1].id",
    });
  });

  it.each([
    {},
    { currency: "EUR" },
    { name: "Other" },
    { status: "closed" },
    { ledgerId: "ldg_01ARZ3NDEKTSV4RRFFQ69G5FAX" },
  ])(
    "refuses all repeated IDs, including identical definitions %#",
    (changes) => {
      const result = validateAccountCatalog([
        candidate(),
        { ...candidate(), ...changes },
      ]);
      expect(result.ok).toBe(false);
      expect(result).not.toHaveProperty("value");
      expect(result.issues).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ code: "duplicate_account_id" }),
        ]),
      );
    },
  );

  it("never returns partial results and cannot check outside the supplied catalog", () => {
    expect(
      validateAccountCatalog([
        candidate(),
        { ...candidate(), currency: "ZZZ" },
      ]),
    ).not.toHaveProperty("value");
    expect(validateAccountCatalog([candidate()]).ok).toBe(true);
    expect(validateAccountCatalog([candidate()]).ok).toBe(true);
    expect(validateAccountCatalog([])).toEqual({
      ok: true,
      value: [],
      issues: [],
    });
  });

  it.each([
    null,
    {},
    "[]",
    1,
    new Array(2),
    Object.assign([candidate()], { extra: true }),
  ])("refuses non-dense data arrays %#", (input) => {
    const result = validateAccountCatalog(input);
    expect(result.ok).toBe(false);
    expect(result).not.toHaveProperty("value");
    expect(result.issues.some((entry) => entry.code === "invalid_array")).toBe(
      true,
    );
  });

  it("does not execute array element accessors", () => {
    let calls = 0;
    const input = Object.defineProperty([candidate()], "0", {
      get() {
        calls++;
        return candidate();
      },
    });
    expect(validateAccountCatalog(input).ok).toBe(false);
    expect(calls).toBe(0);
  });
});
