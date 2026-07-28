import { describe, expect, it } from "vitest";

import {
  MONEY_EVENT_RUNTIME_BOUNDARY_VERSION,
  MONEY_EVENT_TRANSFORMATION_BOUNDARY,
  MONEY_EVENT_UNCERTAINTY_STATES,
  normalizeMoneyEventCandidate,
  validateAndNormalizeMoneyEventCandidate,
  validateMoneyEventCandidate,
  type MoneyEventCandidate,
  type MoneyEventNormalizationResult,
  type MoneyEventValidationIssueCode,
  type MoneyEventValidationResult,
} from "../src/index.js";

const primaryEvidence = {
  receiptId: "rcpt_primary",
  rawLocator: "raw://provider/events/capture-1",
  sourceRecordId: "capture-1",
  contentHash: `sha256:${"a".repeat(64)}`,
  role: "primary",
} as const;

function validCandidate(): MoneyEventCandidate {
  return {
    id: "evt_capture_1",
    contractVersion: MONEY_EVENT_RUNTIME_BOUNDARY_VERSION,
    kind: "payment.captured",
    source: {
      sourceId: "provider-test",
      sourceType: "provider.webhook",
      sourceRecordId: "capture-1",
      sourceSystemName: "Provider Test",
    },
    evidence: [primaryEvidence],
    provenance: {
      source: {
        sourceId: "provider-test",
        sourceType: "provider.webhook",
        sourceRecordId: "capture-1",
        sourceSystemName: "Provider Test",
      },
      evidence: [primaryEvidence],
      observedAt: "2026-07-27T10:00:00Z",
      derivedBy: MONEY_EVENT_TRANSFORMATION_BOUNDARY,
    },
    amount: {
      minorUnits: "1250",
      currency: "GBP",
      representation: "integer_minor_units",
    },
    primaryParty: { partyId: "merchant-1", role: "merchant" },
    relatedParties: [{ partyId: "customer-1", role: "customer" }],
    object: { objectId: "payment-1", objectType: "payment" },
    eventTime: "2026-07-27T09:59:00Z",
    observedTime: "2026-07-27T10:00:00Z",
    idempotencyKey: "provider.webhook:capture-1",
    relationships: [],
    lifecycleState: "observed",
    uncertainty: {
      state: "provider_only",
      reasons: ["Settlement and bank evidence are not yet represented."],
      evidence: [primaryEvidence],
    },
  };
}

function expectIssue(
  result: MoneyEventValidationResult | MoneyEventNormalizationResult,
  code: MoneyEventValidationIssueCode,
  path: string,
): void {
  expect(result.ok).toBe(false);
  expect(result.issues).toContainEqual(expect.objectContaining({ code, path }));
}

function withEvidence(
  candidate: MoneyEventCandidate,
  evidence: readonly (typeof primaryEvidence)[],
): MoneyEventCandidate {
  return {
    ...candidate,
    evidence,
    provenance: { ...candidate.provenance, evidence },
  };
}

function toNullPrototypeValue(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(toNullPrototypeValue);
  if (typeof value !== "object" || value === null) return value;
  const result = Object.create(null) as Record<string, unknown>;
  for (const [key, item] of Object.entries(value)) {
    result[key] = toNullPrototypeValue(item);
  }
  return result;
}

describe("MoneyEvent candidate validation", () => {
  it("accepts a fully valid source-neutral candidate", () => {
    expect(validateMoneyEventCandidate(validCandidate())).toEqual({
      ok: true,
      issues: [],
    });
  });

  it("returns deterministic repeated validation results", () => {
    const candidate = { ...validCandidate(), unexpected: true };
    expect(validateMoneyEventCandidate(candidate)).toEqual(
      validateMoneyEventCandidate(candidate),
    );
  });

  it("rejects invalid root values, arrays, dates, and class instances", () => {
    expectIssue(validateMoneyEventCandidate(null), "invalid_object", "$");
    for (const primitive of [undefined, true, 42, "candidate"]) {
      expectIssue(
        validateMoneyEventCandidate(primitive),
        "invalid_object",
        "$",
      );
    }
    expectIssue(validateMoneyEventCandidate([]), "invalid_object", "$");
    expectIssue(
      validateMoneyEventCandidate(new Date("2026-07-27T10:00:00Z")),
      "invalid_object",
      "$",
    );
    class CandidateInstance {}
    expectIssue(
      validateMoneyEventCandidate(new CandidateInstance()),
      "invalid_object",
      "$",
    );
  });

  it("accepts null-prototype objects at every structured boundary", () => {
    expect(
      validateMoneyEventCandidate(toNullPrototypeValue(validCandidate())),
    ).toEqual({ ok: true, issues: [] });
  });

  it("rejects unknown root fields under the strict policy", () => {
    expectIssue(
      validateMoneyEventCandidate({ ...validCandidate(), unexpected: true }),
      "unknown_field",
      "$.unexpected",
    );
  });

  it("rejects nested unknown fields and nested class instances", () => {
    expectIssue(
      validateMoneyEventCandidate({
        ...validCandidate(),
        source: { ...validCandidate().source, unexpected: true },
      }),
      "unknown_field",
      "$.source.unexpected",
    );

    class SourceInstance {
      sourceId = "provider-test";
      sourceType = "provider.webhook";
    }
    expectIssue(
      validateMoneyEventCandidate({
        ...validCandidate(),
        source: new SourceInstance(),
      }),
      "invalid_object",
      "$.source",
    );
  });

  it("rejects missing required fields", () => {
    const candidate = { ...validCandidate() } as Record<string, unknown>;
    delete candidate.kind;
    expectIssue(
      validateMoneyEventCandidate(candidate),
      "required_field",
      "$.kind",
    );
    const result = validateMoneyEventCandidate(candidate);
    expect(result.issues).not.toContainEqual(
      expect.objectContaining({
        code: "invalid_object",
        path: "$",
        message: "Candidate could not be normalized.",
      }),
    );
  });

  it("keeps issue ordering stable across property insertion order", () => {
    const first = {
      ...validCandidate(),
      zUnknown: true,
      aUnknown: true,
      id: "bad",
    };
    const second = {
      ...validCandidate(),
      aUnknown: true,
      zUnknown: true,
      id: "bad",
    };
    expect(validateMoneyEventCandidate(first)).toEqual(
      validateMoneyEventCandidate(second),
    );
  });

  it("returns issues in stable path, code, and message order", () => {
    const result = validateMoneyEventCandidate({
      ...validCandidate(),
      zUnknown: true,
      aUnknown: true,
      id: "bad",
    });
    expect(result.ok).toBe(false);
    expect(result.issues.map((issue) => issue.path)).toEqual([
      "$.aUnknown",
      "$.id",
      "$.zUnknown",
    ]);
  });

  it("rejects invalid MoneyEvent IDs without generating one", () => {
    expectIssue(
      normalizeMoneyEventCandidate({ ...validCandidate(), id: "evt_" }),
      "invalid_identifier",
      "$.id",
    );
    expectIssue(
      validateMoneyEventCandidate({
        ...validCandidate(),
        id: "evt_internal space",
      }),
      "invalid_identifier",
      "$.id",
    );
  });

  it("rejects unsupported contract versions without coercion", () => {
    expectIssue(
      validateMoneyEventCandidate({
        ...validCandidate(),
        contractVersion: "m03.02-type-boundary.v1",
      }),
      "unsupported_contract_version",
      "$.contractVersion",
    );
  });

  it("rejects unsupported event kinds", () => {
    expectIssue(
      validateMoneyEventCandidate({
        ...validCandidate(),
        kind: "payment.magic",
      }),
      "unsupported_value",
      "$.kind",
    );
  });

  it("rejects unsupported source types and empty source IDs", () => {
    expectIssue(
      validateMoneyEventCandidate({
        ...validCandidate(),
        source: { sourceId: "provider", sourceType: "provider.unknown" },
      }),
      "unsupported_value",
      "$.source.sourceType",
    );
    expectIssue(
      validateMoneyEventCandidate({
        ...validCandidate(),
        source: { sourceId: "   ", sourceType: "provider.webhook" },
      }),
      "invalid_identifier",
      "$.source.sourceId",
    );
  });

  it("rejects missing root evidence", () => {
    expectIssue(
      validateMoneyEventCandidate({ ...validCandidate(), evidence: [] }),
      "evidence_required",
      "$.evidence",
    );
    const candidate = { ...validCandidate() } as Record<string, unknown>;
    delete candidate.evidence;
    expectIssue(
      validateMoneyEventCandidate(candidate),
      "required_field",
      "$.evidence",
    );
  });

  it("requires primary or supporting evidence at the root boundary", () => {
    const missingExpected = {
      sourceRecordId: "expected-bank-line",
      role: "missing_expected",
    } as const;
    const result = validateMoneyEventCandidate({
      ...validCandidate(),
      evidence: [missingExpected],
      provenance: {
        ...validCandidate().provenance,
        evidence: [missingExpected],
      },
    });
    expectIssue(result, "evidence_required", "$.evidence");
  });

  it("rejects invalid evidence receipt IDs", () => {
    const invalidEvidence = { ...primaryEvidence, receiptId: "receipt-1" };
    const candidate = withEvidence(validCandidate(), [
      invalidEvidence,
    ] as readonly (typeof primaryEvidence)[]);
    expectIssue(
      validateMoneyEventCandidate(candidate),
      "invalid_identifier",
      "$.evidence[0].receiptId",
    );
    const whitespaceEvidence = {
      ...primaryEvidence,
      receiptId: "rcpt_internal space",
    };
    expectIssue(
      validateMoneyEventCandidate({
        ...validCandidate(),
        evidence: [whitespaceEvidence],
        provenance: {
          ...validCandidate().provenance,
          evidence: [whitespaceEvidence],
        },
      }),
      "invalid_identifier",
      "$.evidence[0].receiptId",
    );
  });

  it("rejects non-canonical SHA-256 references", () => {
    const invalidEvidence = {
      ...primaryEvidence,
      contentHash: `sha256:${"A".repeat(64)}`,
    };
    const result = validateMoneyEventCandidate({
      ...validCandidate(),
      evidence: [invalidEvidence],
      provenance: {
        ...validCandidate().provenance,
        evidence: [invalidEvidence],
      },
    });
    expectIssue(result, "invalid_hash", "$.evidence[0].contentHash");
  });

  it("rejects evidence references with no locator", () => {
    const reference = { role: "primary" };
    const result = validateMoneyEventCandidate({
      ...validCandidate(),
      evidence: [reference],
      provenance: { ...validCandidate().provenance, evidence: [reference] },
    });
    expectIssue(result, "evidence_locator_required", "$.evidence[0]");
  });

  it("rejects provenance source, evidence, and observed-time mismatches", () => {
    const sourceMismatch = validCandidate();
    expectIssue(
      validateMoneyEventCandidate({
        ...sourceMismatch,
        provenance: {
          ...sourceMismatch.provenance,
          source: { ...sourceMismatch.source, sourceId: "other-provider" },
        },
      }),
      "provenance_mismatch",
      "$.provenance.source",
    );

    const evidenceMismatch = validCandidate();
    expectIssue(
      validateMoneyEventCandidate({
        ...evidenceMismatch,
        provenance: {
          ...evidenceMismatch.provenance,
          evidence: [{ ...primaryEvidence, sourceRecordId: "other" }],
        },
      }),
      "provenance_mismatch",
      "$.provenance.evidence",
    );

    const timeMismatch = validCandidate();
    expectIssue(
      validateMoneyEventCandidate({
        ...timeMismatch,
        provenance: {
          ...timeMismatch.provenance,
          observedAt: "2026-07-27T10:00:01Z",
        },
      }),
      "provenance_mismatch",
      "$.provenance.observedAt",
    );
  });

  it("rejects unsupported provenance transformation boundaries", () => {
    const candidate = validCandidate();
    expectIssue(
      validateMoneyEventCandidate({
        ...candidate,
        provenance: { ...candidate.provenance, derivedBy: "unknown-boundary" },
      }),
      "unsupported_transformation_boundary",
      "$.provenance.derivedBy",
    );
  });

  it.each(["1.25", "1e3", "01", "+1", "-0", "NaN", "Infinity"])(
    "rejects non-canonical minor units %s",
    (minorUnits) => {
      expectIssue(
        validateMoneyEventCandidate({
          ...validCandidate(),
          amount: { ...validCandidate().amount, minorUnits },
        }),
        "invalid_minor_units",
        "$.amount.minorUnits",
      );
    },
  );

  it("rejects JavaScript numbers for money without rounding", () => {
    const candidate = {
      ...validCandidate(),
      amount: { ...validCandidate().amount, minorUnits: 12.5 },
    };
    expectIssue(
      validateMoneyEventCandidate(candidate),
      "invalid_type",
      "$.amount.minorUnits",
    );
  });

  it("requires currency and rejects invalid currency formats", () => {
    const amountWithoutCurrency = {
      minorUnits: "100",
      representation: "integer_minor_units",
    };
    expectIssue(
      validateMoneyEventCandidate({
        ...validCandidate(),
        amount: amountWithoutCurrency,
      }),
      "currency_required",
      "$.amount.currency",
    );
    expectIssue(
      validateMoneyEventCandidate({
        ...validCandidate(),
        amount: { ...validCandidate().amount, currency: "US12" },
      }),
      "invalid_currency",
      "$.amount.currency",
    );
  });

  it("rejects invalid party roles and object types", () => {
    expectIssue(
      validateMoneyEventCandidate({
        ...validCandidate(),
        primaryParty: { partyId: "merchant", role: "owner" },
      }),
      "unsupported_value",
      "$.primaryParty.role",
    );
    expectIssue(
      validateMoneyEventCandidate({
        ...validCandidate(),
        object: { objectId: "payment", objectType: "invoice" },
      }),
      "unsupported_value",
      "$.object.objectType",
    );
  });

  it("rejects source, source-record, party, and object identifiers that trim empty", () => {
    const candidate = validCandidate();
    const cases: readonly [unknown, string][] = [
      [
        { ...candidate, source: { ...candidate.source, sourceRecordId: "  " } },
        "$.source.sourceRecordId",
      ],
      [
        {
          ...candidate,
          primaryParty: { ...candidate.primaryParty, partyId: "  " },
        },
        "$.primaryParty.partyId",
      ],
      [
        { ...candidate, object: { ...candidate.object, objectId: "  " } },
        "$.object.objectId",
      ],
    ];
    for (const [input, path] of cases) {
      expectIssue(
        validateMoneyEventCandidate(input),
        "invalid_identifier",
        path,
      );
    }
  });

  it("rejects empty relationships and unsupported relationship types", () => {
    expectIssue(
      validateMoneyEventCandidate({
        ...validCandidate(),
        relationships: [{ relationship: "caused_by" }],
      }),
      "relationship_target_required",
      "$.relationships[0]",
    );
    expectIssue(
      validateMoneyEventCandidate({
        ...validCandidate(),
        relationships: [{ relationship: "invented", eventId: "evt_related" }],
      }),
      "unsupported_value",
      "$.relationships[0].relationship",
    );
  });

  it("rejects invalid timestamps but accepts null event time", () => {
    expectIssue(
      validateMoneyEventCandidate({
        ...validCandidate(),
        observedTime: "2026-02-30T10:00:00Z",
      }),
      "invalid_timestamp",
      "$.observedTime",
    );
    expect(
      validateMoneyEventCandidate({ ...validCandidate(), eventTime: null }),
    ).toEqual({ ok: true, issues: [] });
    expectIssue(
      validateMoneyEventCandidate({ ...validCandidate(), observedTime: null }),
      "invalid_timestamp",
      "$.observedTime",
    );
  });

  it("covers leap years and rejects invalid day, hour, minute, and offset boundaries", () => {
    expect(
      validateMoneyEventCandidate({
        ...validCandidate(),
        eventTime: "2000-02-29T23:59:59Z",
      }).ok,
    ).toBe(true);
    for (const eventTime of [
      "1900-02-29T00:00:00Z",
      "2026-04-31T00:00:00Z",
      "2026-07-27T24:00:00Z",
      "2026-07-27T23:60:00Z",
      "2026-07-27T23:59:00+24:00",
      "2026-07-27T23:59:00+00:60",
    ]) {
      expectIssue(
        validateMoneyEventCandidate({ ...validCandidate(), eventTime }),
        "invalid_timestamp",
        "$.eventTime",
      );
    }
  });

  it("rejects timestamp normalization outside the four-digit RFC 3339 year range", () => {
    for (const eventTime of [
      "0000-01-01T00:00:00+00:01",
      "9999-12-31T23:59:59-00:01",
    ]) {
      expectIssue(
        validateMoneyEventCandidate({ ...validCandidate(), eventTime }),
        "invalid_timestamp",
        "$.eventTime",
      );
    }
  });

  it("enforces the documented millisecond-precision timestamp profile", () => {
    expect(
      validateMoneyEventCandidate({
        ...validCandidate(),
        eventTime: "2026-07-27T09:59:00.123Z",
      }).ok,
    ).toBe(true);
    expectIssue(
      validateMoneyEventCandidate({
        ...validCandidate(),
        eventTime: "2026-07-27T09:59:00.1234Z",
      }),
      "invalid_timestamp",
      "$.eventTime",
    );
  });

  it("accepts delayed and out-of-order event times", () => {
    expect(
      validateMoneyEventCandidate({
        ...validCandidate(),
        eventTime: "2025-01-01T00:00:00Z",
      }).ok,
    ).toBe(true);
    expect(
      validateMoneyEventCandidate({
        ...validCandidate(),
        eventTime: "2027-01-01T00:00:00Z",
      }).ok,
    ).toBe(true);
  });

  it("rejects empty idempotency keys and invalid lifecycle states", () => {
    expectIssue(
      validateMoneyEventCandidate({ ...validCandidate(), idempotencyKey: " " }),
      "invalid_identifier",
      "$.idempotencyKey",
    );
    expectIssue(
      validateMoneyEventCandidate({
        ...validCandidate(),
        lifecycleState: "posted",
      }),
      "unsupported_value",
      "$.lifecycleState",
    );
  });

  it("enforces the none_known uncertainty rule", () => {
    const candidate = validCandidate();
    expect(
      validateMoneyEventCandidate({
        ...candidate,
        uncertainty: { state: "none_known", reasons: [], evidence: [] },
      }).ok,
    ).toBe(true);
    expectIssue(
      validateMoneyEventCandidate({
        ...candidate,
        uncertainty: {
          state: "none_known",
          reasons: ["A contradiction would be invalid here."],
          evidence: [primaryEvidence],
        },
      }),
      "invalid_uncertainty",
      "$.uncertainty",
    );
  });

  it("requires useful reasons for non-none uncertainty", () => {
    const candidate = validCandidate();
    expectIssue(
      validateMoneyEventCandidate({
        ...candidate,
        uncertainty: { state: "missing_evidence", reasons: [], evidence: [] },
      }),
      "uncertainty_reason_required",
      "$.uncertainty.reasons",
    );
    expectIssue(
      validateMoneyEventCandidate({
        ...candidate,
        uncertainty: {
          state: "missing_evidence",
          reasons: ["   "],
          evidence: [],
        },
      }),
      "invalid_reason",
      "$.uncertainty.reasons[0]",
    );
  });

  it.each(
    MONEY_EVENT_UNCERTAINTY_STATES.filter((state) => state !== "none_known"),
  )("accepts explicit %s uncertainty without resolving it", (state) => {
    const candidate = validCandidate();
    expect(
      validateMoneyEventCandidate({
        ...candidate,
        uncertainty: {
          state,
          reasons: [`${state} remains explicit.`],
          evidence: [primaryEvidence],
        },
      }).ok,
    ).toBe(true);
  });

  it("requires uncertainty evidence to come from root evidence", () => {
    const candidate = validCandidate();
    expectIssue(
      validateMoneyEventCandidate({
        ...candidate,
        uncertainty: {
          state: "conflicting_evidence",
          reasons: ["A conflicting reference is not present at the root."],
          evidence: [
            {
              receiptId: "rcpt_outside_root",
              role: "conflicting",
            },
          ],
        },
      }),
      "provenance_mismatch",
      "$.uncertainty.evidence",
    );
  });

  it("does not copy invalid secret-bearing values into issues", () => {
    const secret = "super-secret-token-value";
    const invalidEvidence = { ...primaryEvidence, contentHash: secret };
    const result = validateMoneyEventCandidate({
      ...validCandidate(),
      evidence: [invalidEvidence],
      provenance: {
        ...validCandidate().provenance,
        evidence: [invalidEvidence],
      },
    });
    expect(JSON.stringify(result.issues)).not.toContain(secret);
  });
});

describe("MoneyEvent candidate normalization", () => {
  it("is deterministic across repeated normalization", () => {
    const candidate = validCandidate();
    expect(normalizeMoneyEventCandidate(candidate)).toEqual(
      normalizeMoneyEventCandidate(candidate),
    );
  });

  it("does not mutate the candidate", () => {
    const candidate = validCandidate();
    const before = JSON.stringify(candidate);
    normalizeMoneyEventCandidate(candidate);
    expect(JSON.stringify(candidate)).toBe(before);
  });

  it("converts canonical minor units to bigint and preserves negative signs", () => {
    const result = normalizeMoneyEventCandidate({
      ...validCandidate(),
      amount: { ...validCandidate().amount, minorUnits: "-1250" },
    });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.value.amount.minorUnits).toBe(-1250n);
  });

  it("uppercases three-letter currency without claiming registry membership", () => {
    const result = normalizeMoneyEventCandidate({
      ...validCandidate(),
      amount: { ...validCandidate().amount, currency: "gbp" },
    });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.value.amount.currency).toBe("GBP");
  });

  it("canonicalizes timestamps to UTC", () => {
    const candidate = validCandidate();
    const result = normalizeMoneyEventCandidate({
      ...candidate,
      observedTime: "2026-07-27T11:00:00+01:00",
      provenance: {
        ...candidate.provenance,
        observedAt: "2026-07-27T10:00:00Z",
      },
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.observedTime).toBe("2026-07-27T10:00:00.000Z");
      expect(result.value.provenance.observedAt).toBe(
        "2026-07-27T10:00:00.000Z",
      );
    }
  });

  it("deduplicates exact evidence references deterministically", () => {
    const candidate = validCandidate();
    const result = normalizeMoneyEventCandidate({
      ...candidate,
      evidence: [primaryEvidence, primaryEvidence],
      provenance: {
        ...candidate.provenance,
        evidence: [primaryEvidence, primaryEvidence],
      },
    });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.value.evidence).toHaveLength(1);
  });

  it("produces stable evidence ordering for equivalent input order", () => {
    const supportingEvidence = {
      receiptId: "rcpt_supporting",
      sourceRecordId: "supporting-1",
      role: "supporting",
    } as const;
    const candidate = validCandidate();
    const forward = normalizeMoneyEventCandidate({
      ...candidate,
      evidence: [primaryEvidence, supportingEvidence],
      provenance: {
        ...candidate.provenance,
        evidence: [primaryEvidence, supportingEvidence],
      },
    });
    const reverse = normalizeMoneyEventCandidate({
      ...candidate,
      evidence: [supportingEvidence, primaryEvidence],
      provenance: {
        ...candidate.provenance,
        evidence: [supportingEvidence, primaryEvidence],
      },
    });
    expect(forward).toEqual(reverse);
  });

  it("does not collapse references that differ by evidence role", () => {
    const conflictingEvidence = {
      ...primaryEvidence,
      role: "conflicting",
    } as const;
    const candidate = validCandidate();
    const evidence = [primaryEvidence, conflictingEvidence];
    const result = normalizeMoneyEventCandidate({
      ...candidate,
      evidence,
      provenance: { ...candidate.provenance, evidence },
    });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.value.evidence).toHaveLength(2);
  });

  it("preserves conflicting evidence instead of resolving it", () => {
    const conflictingEvidence = {
      receiptId: "rcpt_conflict",
      rawLocator: "raw://bank/statement/line-9",
      sourceRecordId: "line-9",
      role: "conflicting",
    } as const;
    const candidate = validCandidate();
    const evidence = [primaryEvidence, conflictingEvidence];
    const result = normalizeMoneyEventCandidate({
      ...candidate,
      evidence,
      provenance: { ...candidate.provenance, evidence },
      uncertainty: {
        state: "conflicting_evidence",
        reasons: ["Provider and bank evidence disagree."],
        evidence,
      },
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(
        result.value.evidence.map((reference) => reference.role),
      ).toContain("conflicting");
      expect(result.value.uncertainty.state).toBe("conflicting_evidence");
    }
  });

  it("preserves missing-evidence uncertainty", () => {
    const missingEvidence = {
      sourceRecordId: "expected-bank-line",
      role: "missing_expected",
    } as const;
    const candidate = validCandidate();
    const evidence = [primaryEvidence, missingEvidence];
    const result = normalizeMoneyEventCandidate({
      ...candidate,
      evidence,
      provenance: { ...candidate.provenance, evidence },
      uncertainty: {
        state: "missing_evidence",
        reasons: ["The expected bank confirmation is missing."],
        evidence: [missingEvidence],
      },
    });
    expect(result.ok).toBe(true);
    if (result.ok)
      expect(result.value.uncertainty.state).toBe("missing_evidence");
  });

  it("preserves relationship order and contradictory-looking references", () => {
    const relationships = [
      { relationship: "supersedes", eventId: "evt_related" },
      { relationship: "reverses", eventId: "evt_related" },
    ];
    const result = normalizeMoneyEventCandidate({
      ...validCandidate(),
      relationships,
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(
        result.value.relationships.map((item) => item.relationship),
      ).toEqual(["supersedes", "reverses"]);
    }
  });

  it("does not return a partial relationship when a supplied target is invalid", () => {
    const result = normalizeMoneyEventCandidate({
      ...validCandidate(),
      relationships: [
        {
          relationship: "caused_by",
          object: { objectId: "  ", objectType: "payment" },
        },
      ],
    });
    expect(result.ok).toBe(false);
    expect(result).not.toHaveProperty("value");
  });

  it("keeps the combined API behavior identical to normalization", () => {
    const candidate = validCandidate();
    expect(validateAndNormalizeMoneyEventCandidate(candidate)).toEqual(
      normalizeMoneyEventCandidate(candidate),
    );
    const invalid = { ...candidate, id: "bad" };
    expect(validateAndNormalizeMoneyEventCandidate(invalid)).toEqual(
      normalizeMoneyEventCandidate(invalid),
    );
  });

  it("does not generate missing IDs, timestamps, or idempotency keys", () => {
    const candidate = { ...validCandidate() } as Record<string, unknown>;
    delete candidate.id;
    delete candidate.observedTime;
    delete candidate.idempotencyKey;
    const result = validateAndNormalizeMoneyEventCandidate(candidate);
    expect(result.ok).toBe(false);
    expect(result.issues.map((issue) => issue.path)).toEqual(
      expect.arrayContaining(["$.id", "$.observedTime", "$.idempotencyKey"]),
    );
  });
});
