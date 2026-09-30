import { describe, expect, it } from "vitest";
import {
  LEDGER_TRANSACTION_CONTRACT_VERSION,
  LEDGER_TRANSACTION_STATUSES,
  validateLedgerTransactionCandidate,
} from "../src/index.js";
import type {
  LedgerTransactionCandidate,
  LedgerTransactionIssueCode,
} from "../src/index.js";

const ULID = "01ARZ3NDEKTSV4RRFFQ69G5FAV";
const SECOND = "01ARZ3NDEKTSV4RRFFQ69G5FAW";
const HASH = `sha256:${"a".repeat(64)}`;
function fixture(): LedgerTransactionCandidate {
  return {
    contractVersion: LEDGER_TRANSACTION_CONTRACT_VERSION,
    id: `txn_${ULID}`,
    ledgerId: `ldg_${ULID}`,
    status: "pending",
    effectiveAt: "2026-09-30T20:00:00.000Z",
    recordedAt: "2026-09-30T20:01:00.000Z",
    idempotencyKey: "synthetic.capture-001",
    provenance: {
      source: { namespace: "synthetic.provider", id: "capture-001" },
      moneyEventIds: [`evt_${ULID}`],
      evidence: [{ receiptId: `rcpt_${ULID}`, contentHash: HASH }],
    },
  };
}
function rejects(
  input: unknown,
  code?: LedgerTransactionIssueCode,
  path?: string,
): void {
  const result = validateLedgerTransactionCandidate(input);
  expect(result.ok).toBe(false);
  expect(Object.hasOwn(result, "value")).toBe(false);
  if (code)
    expect(result.issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ code, ...(path ? { path } : {}) }),
      ]),
    );
}

describe("LedgerTransaction metadata contract", () => {
  it("demonstrates a synthetic header and rejects conflicting receipt evidence", () => {
    const candidate = fixture();
    expect(validateLedgerTransactionCandidate(candidate)).toEqual({
      ok: true,
      value: candidate,
      issues: [],
    });
    const conflict = {
      ...candidate,
      provenance: {
        ...candidate.provenance,
        evidence: [
          candidate.provenance.evidence[0],
          {
            receiptId: `rcpt_${ULID}`,
            contentHash: `sha256:${"b".repeat(64)}`,
          },
        ],
      },
    };
    expect(validateLedgerTransactionCandidate(conflict)).toEqual({
      ok: false,
      issues: [
        {
          code: "conflicting_evidence_reference",
          path: "$.provenance.evidence[1].contentHash",
          message: "One receipt identity references different content hashes.",
        },
      ],
    });
  });
  it.each(LEDGER_TRANSACTION_STATUSES)(
    "treats %s as supplied metadata without posting",
    (status) => {
      expect(
        validateLedgerTransactionCandidate({ ...fixture(), status }).ok,
      ).toBe(true);
    },
  );
  it("supports a direct source record without a MoneyEvent mapping", () => {
    const candidate = fixture();
    expect(
      validateLedgerTransactionCandidate({
        ...candidate,
        provenance: { ...candidate.provenance, moneyEventIds: [] },
      }).ok,
    ).toBe(true);
  });
  it("preserves distinct receipt identities with identical hashes", () => {
    const candidate = fixture();
    expect(
      validateLedgerTransactionCandidate({
        ...candidate,
        provenance: {
          ...candidate.provenance,
          evidence: [
            ...candidate.provenance.evidence,
            { receiptId: `rcpt_${SECOND}`, contentHash: HASH },
          ],
        },
      }).ok,
    ).toBe(true);
  });
  it("checks retry-key scope without deduplicating separate calls", () => {
    const candidate = fixture();
    expect(validateLedgerTransactionCandidate(candidate).ok).toBe(true);
    expect(
      validateLedgerTransactionCandidate({ ...candidate, id: `txn_${SECOND}` })
        .ok,
    ).toBe(true);
    expect(
      validateLedgerTransactionCandidate({
        ...candidate,
        ledgerId: `ldg_${SECOND}`,
      }).ok,
    ).toBe(true);
    expect(
      validateLedgerTransactionCandidate({
        ...candidate,
        provenance: {
          ...candidate.provenance,
          source: { namespace: "synthetic.bank", id: "capture-001" },
        },
      }).ok,
    ).toBe(true);
  });
  it.each([null, undefined, [], 1, true, "{}", new Date(), new Map()])(
    "rejects malformed root %s",
    (input) => rejects(input, "invalid_object", "$"),
  );
  it.each(Object.keys(fixture()))("requires root field %s", (field) => {
    const candidate: Record<string, unknown> = { ...fixture() };
    delete candidate[field];
    rejects(candidate, "required_field", `$.${field}`);
  });
  it.each([
    "contractVersion",
    "id",
    "ledgerId",
    "status",
    "effectiveAt",
    "recordedAt",
    "idempotencyKey",
  ])("refuses scalar coercion for %s", (field) =>
    rejects({ ...fixture(), [field]: 1 }, "invalid_type", `$.${field}`),
  );
  it.each(["postedAt", "entries", "amount", "approved", "eventId"])(
    "rejects unknown root field %s",
    (field) =>
      rejects({ ...fixture(), [field]: [] }, "unknown_field", `$.${field}`),
  );
  it.each([
    "",
    `acct_${ULID}`,
    `txn_${ULID.toLowerCase()}`,
    `txn_8${ULID.slice(1)}`,
    `txn_${ULID}\n`,
    ` txn_${ULID}`,
    `txn_${ULID.replace("R", "I")}`,
  ])("rejects noncanonical transaction identity %s", (id) =>
    rejects({ ...fixture(), id }, "invalid_identifier", "$.id"),
  );
  it.each(["", `txn_${ULID}`, `ldg_${ULID}\n`, `ldg_8${ULID.slice(1)}`])(
    "rejects bad ledger namespace %s",
    (ledgerId) =>
      rejects({ ...fixture(), ledgerId }, "invalid_identifier", "$.ledgerId"),
  );
  it.each(["reversed", "adjusted", "POSTED", " posted", "", "approved"])(
    "rejects unsupported lifecycle %s",
    (status) =>
      rejects({ ...fixture(), status }, "unsupported_value", "$.status"),
  );
  it("rejects unsupported versions", () =>
    rejects(
      { ...fixture(), contractVersion: "v2" },
      "unsupported_value",
      "$.contractVersion",
    ));
  it.each(["", " x", "x ", "x\n", "x/y", "é", "x".repeat(129)])(
    "rejects ambiguous retry keys %s",
    (idempotencyKey) =>
      rejects(
        { ...fixture(), idempotencyKey },
        "invalid_identifier",
        "$.idempotencyKey",
      ),
  );
  it("accepts exact reference limits without normalization", () => {
    const candidate = fixture();
    const source = { namespace: "a".repeat(64), id: "A".repeat(128) };
    expect(
      validateLedgerTransactionCandidate({
        ...candidate,
        idempotencyKey: "Z".repeat(128),
        provenance: { ...candidate.provenance, source },
      }).ok,
    ).toBe(true);
  });
  it.each([
    "2026-02-29T00:00:00.000Z",
    "2026-04-31T00:00:00.000Z",
    "2026-13-01T00:00:00.000Z",
    "2026-09-30T24:00:00.000Z",
    "2026-09-30T20:00:60.000Z",
    "2026-09-30T20:00:00Z",
    "2026-09-30T20:00:00.000+00:00",
    "2026-09-30t20:00:00.000z",
    "0000-01-01T00:00:00.000Z",
    "2026-09-30T20:00:00.000Z\n",
  ])("rejects malformed timestamp %s on both clocks", (value) => {
    for (const field of ["effectiveAt", "recordedAt"])
      rejects(
        { ...fixture(), [field]: value },
        "invalid_timestamp",
        `$.${field}`,
      );
  });
  it.each([
    "0001-01-01T00:00:00.000Z",
    "2000-02-29T00:00:00.000Z",
    "9999-12-31T23:59:59.999Z",
  ])("accepts Gregorian boundary %s", (effectiveAt) =>
    expect(
      validateLedgerTransactionCandidate({ ...fixture(), effectiveAt }).ok,
    ).toBe(true),
  );
  it("does not assume accounting-effective and recorded-clock ordering", () =>
    expect(
      validateLedgerTransactionCandidate({
        ...fixture(),
        effectiveAt: "2027-01-01T00:00:00.000Z",
      }).ok,
    ).toBe(true));
  it.each([null, [], "source", 2])(
    "rejects malformed provenance/source/receipt %s",
    (value) => {
      const candidate = fixture();
      rejects(
        { ...candidate, provenance: value },
        "invalid_object",
        "$.provenance",
      );
      rejects(
        {
          ...candidate,
          provenance: { ...candidate.provenance, source: value },
        },
        "invalid_object",
        "$.provenance.source",
      );
      rejects(
        {
          ...candidate,
          provenance: { ...candidate.provenance, evidence: [value] },
        },
        "invalid_object",
        "$.provenance.evidence[0]",
      );
    },
  );
  it("requires every nested field and refuses aliases", () => {
    const candidate = fixture();
    for (const [value, keys, path, reconstruct] of [
      [
        candidate.provenance,
        ["source", "moneyEventIds", "evidence"],
        "$.provenance",
        (value: unknown) => ({ ...candidate, provenance: value }),
      ],
      [
        candidate.provenance.source,
        ["namespace", "id"],
        "$.provenance.source",
        (value: unknown) => ({
          ...candidate,
          provenance: { ...candidate.provenance, source: value },
        }),
      ],
      [
        candidate.provenance.evidence[0],
        ["receiptId", "contentHash"],
        "$.provenance.evidence[0]",
        (value: unknown) => ({
          ...candidate,
          provenance: { ...candidate.provenance, evidence: [value] },
        }),
      ],
    ] as const) {
      for (const key of keys) {
        const missing: Record<string, unknown> = { ...value };
        delete missing[key];
        rejects(reconstruct(missing), "required_field", `${path}.${key}`);
      }
      rejects(
        reconstruct({ ...value, unknown: true }),
        "unknown_field",
        `${path}.unknown`,
      );
    }
  });
  it("refuses coercion of every nested source and evidence string", () => {
    const candidate = fixture();
    for (const field of ["namespace", "id"]) {
      rejects(
        {
          ...candidate,
          provenance: {
            ...candidate.provenance,
            source: { ...candidate.provenance.source, [field]: 123 },
          },
        },
        "invalid_type",
        `$.provenance.source.${field}`,
      );
    }
    for (const field of ["receiptId", "contentHash"]) {
      rejects(
        {
          ...candidate,
          provenance: {
            ...candidate.provenance,
            evidence: [{ ...candidate.provenance.evidence[0], [field]: 123 }],
          },
        },
        "invalid_type",
        `$.provenance.evidence[0].${field}`,
      );
    }
  });
  it.each(["", "UPPER", " a", "a\n", "a".repeat(65)])(
    "rejects invalid source namespace %s",
    (namespace) => {
      const candidate = fixture();
      rejects(
        {
          ...candidate,
          provenance: {
            ...candidate.provenance,
            source: { ...candidate.provenance.source, namespace },
          },
        },
        "invalid_identifier",
        "$.provenance.source.namespace",
      );
    },
  );
  it.each(["", " x", "x/y", "x\n", "x".repeat(129)])(
    "rejects invalid source record %s",
    (id) => {
      const candidate = fixture();
      rejects(
        {
          ...candidate,
          provenance: {
            ...candidate.provenance,
            source: { ...candidate.provenance.source, id },
          },
        },
        "invalid_identifier",
        "$.provenance.source.id",
      );
    },
  );
  it.each([
    `txn_${ULID}`,
    `rcpt_${ULID}`,
    `evt_${ULID}\n`,
    "",
    `evt_8${ULID.slice(1)}`,
  ])("distinguishes malformed event references %s", (id) => {
    const candidate = fixture();
    rejects(
      {
        ...candidate,
        provenance: { ...candidate.provenance, moneyEventIds: [id] },
      },
      "invalid_identifier",
      "$.provenance.moneyEventIds[0]",
    );
  });
  it("rejects duplicate events and receipt references", () => {
    const candidate = fixture();
    rejects(
      {
        ...candidate,
        provenance: {
          ...candidate.provenance,
          moneyEventIds: [`evt_${ULID}`, `evt_${ULID}`],
        },
      },
      "duplicate_reference",
      "$.provenance.moneyEventIds[1]",
    );
    rejects(
      {
        ...candidate,
        provenance: {
          ...candidate.provenance,
          evidence: [
            ...candidate.provenance.evidence,
            ...candidate.provenance.evidence,
          ],
        },
      },
      "duplicate_reference",
      "$.provenance.evidence[1].receiptId",
    );
  });
  it.each([`evt_${ULID}`, `txn_${ULID}`, `rcpt_${ULID}\n`, ""])(
    "refuses mixed receipt identity %s",
    (receiptId) => {
      const candidate = fixture();
      rejects(
        {
          ...candidate,
          provenance: {
            ...candidate.provenance,
            evidence: [{ receiptId, contentHash: HASH }],
          },
        },
        "invalid_identifier",
        "$.provenance.evidence[0].receiptId",
      );
    },
  );
  it.each([
    "a".repeat(64),
    `sha256:${"A".repeat(64)}`,
    `sha256:${"a".repeat(63)}`,
    `${HASH}\n`,
    "sha256:bad",
  ])("refuses invalid hash %s", (contentHash) => {
    const candidate = fixture();
    rejects(
      {
        ...candidate,
        provenance: {
          ...candidate.provenance,
          evidence: [{ receiptId: `rcpt_${ULID}`, contentHash }],
        },
      },
      "invalid_hash",
      "$.provenance.evidence[0].contentHash",
    );
  });
  it("requires evidence and strict data arrays", () => {
    const candidate = fixture();
    rejects(
      { ...candidate, provenance: { ...candidate.provenance, evidence: [] } },
      "empty_evidence",
      "$.provenance.evidence",
    );
    for (const field of ["moneyEventIds", "evidence"]) {
      for (const value of [
        null,
        {},
        "[]",
        new Array(1),
        Object.assign([], { extra: 1 }),
      ])
        rejects(
          {
            ...candidate,
            provenance: { ...candidate.provenance, [field]: value },
          },
          "invalid_array",
        );
    }
    rejects(
      {
        ...candidate,
        provenance: { ...candidate.provenance, moneyEventIds: [123] },
      },
      "invalid_type",
    );
  });
  it("does not execute getters, including nested array elements", () => {
    let calls = 0;
    const getter = {
      enumerable: true,
      get: () => {
        calls += 1;
        throw new Error("must not execute");
      },
    };
    const candidate = fixture();
    rejects(
      Object.defineProperty({ ...candidate }, "id", getter),
      "invalid_type",
      "$.id",
    );
    rejects(
      {
        ...candidate,
        provenance: Object.defineProperty(
          { ...candidate.provenance },
          "source",
          getter,
        ),
      },
      "invalid_type",
      "$.provenance.source",
    );
    rejects(
      {
        ...candidate,
        provenance: {
          ...candidate.provenance,
          evidence: [
            Object.defineProperty(
              { ...candidate.provenance.evidence[0] },
              "contentHash",
              getter,
            ),
          ],
        },
      },
      "invalid_type",
    );
    rejects(
      {
        ...candidate,
        provenance: {
          ...candidate.provenance,
          moneyEventIds: Object.defineProperty([`evt_${ULID}`], "0", getter),
        },
      },
      "invalid_array",
    );
    expect(calls).toBe(0);
  });
  it("refuses hidden/symbol/inherited fields and permits null-prototype data", () => {
    const candidate = fixture();
    rejects(
      Object.defineProperty({ ...candidate }, "id", {
        value: candidate.id,
        enumerable: false,
      }),
      "invalid_type",
      "$.id",
    );
    rejects({ ...candidate, [Symbol("unknown")]: true }, "unknown_field", "$");
    rejects(Object.create(candidate), "invalid_object", "$");
    expect(
      validateLedgerTransactionCandidate(
        Object.assign(
          Object.create(null) as Record<string, unknown>,
          candidate,
        ),
      ).ok,
    ).toBe(true);
  });
  it("returns detached deeply frozen data without mutating the candidate", () => {
    const candidate = fixture();
    const before = JSON.stringify(candidate);
    const result = validateLedgerTransactionCandidate(candidate);
    expect(JSON.stringify(candidate)).toBe(before);
    expect(Object.isFrozen(candidate)).toBe(false);
    expect(result.ok).toBe(true);
    if (!result.ok) throw new Error("expected valid header");
    for (const object of [
      result,
      result.value,
      result.issues,
      result.value.provenance,
      result.value.provenance.source,
      result.value.provenance.moneyEventIds,
      result.value.provenance.evidence,
      result.value.provenance.evidence[0],
    ])
      expect(Object.isFrozen(object)).toBe(true);
    expect(result.value).not.toBe(candidate);
    expect(result.value.provenance).not.toBe(candidate.provenance);
    expect(result.value.provenance.source).not.toBe(
      candidate.provenance.source,
    );
    expect(result.value.provenance.evidence[0]).not.toBe(
      candidate.provenance.evidence[0],
    );
    expect(Reflect.set(candidate.provenance.source, "id", "changed")).toBe(
      true,
    );
    expect(result.value.provenance.source.id).toBe("capture-001");
    expect(Reflect.set(result.value, "status", "posted")).toBe(false);
  });
  it("produces stable sorted failures without partial output or input changes", () => {
    const candidate = {
      ...fixture(),
      id: "bad",
      effectiveAt: "bad",
      extra: true,
    };
    const before = JSON.stringify(candidate);
    const first = validateLedgerTransactionCandidate(candidate);
    expect(validateLedgerTransactionCandidate(candidate)).toEqual(first);
    expect(first.issues.map(({ code, path }) => ({ code, path }))).toEqual([
      { code: "invalid_timestamp", path: "$.effectiveAt" },
      { code: "unknown_field", path: "$.extra" },
      { code: "invalid_identifier", path: "$.id" },
    ]);
    expect(Object.hasOwn(first, "value")).toBe(false);
    expect(Object.isFrozen(first.issues)).toBe(true);
    expect(first.issues.every(Object.isFrozen)).toBe(true);
    expect(JSON.stringify(candidate)).toBe(before);
    expect(
      validateLedgerTransactionCandidate(Object.freeze(candidate)),
    ).toEqual(first);
  });
});
