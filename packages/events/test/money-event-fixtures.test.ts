import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

import {
  normalizeMoneyEventCandidate,
  validateMoneyEventCandidate,
} from "../src/index.js";
import {
  parseMoneyEventFixtureManifest,
  toJsonSafeMoneyEvent,
  type FixtureManifest,
} from "./money-event-fixture-manifest.js";

const fixtureUrl = new URL(
  "../../../data/fixtures/money-events/candidates.json",
  import.meta.url,
);

function loadRawFixtureManifest(): unknown {
  return JSON.parse(readFileSync(fixtureUrl, "utf8")) as unknown;
}

function loadFixtureManifest(): FixtureManifest {
  return parseMoneyEventFixtureManifest(loadRawFixtureManifest());
}

function clone<TValue>(value: TValue): TValue {
  return JSON.parse(JSON.stringify(value)) as TValue;
}

function mutate(
  change: (manifest: Record<string, unknown>) => void,
): Record<string, unknown> {
  const value = clone(loadRawFixtureManifest()) as Record<string, unknown>;
  change(value);
  return value;
}

function caseAt(
  manifest: Record<string, unknown>,
  index = 0,
): Record<string, unknown> {
  const fixture = (manifest.cases as Record<string, unknown>[])[index];
  if (fixture === undefined) throw new Error(`fixture ${index} not found`);
  return fixture;
}

function expectationAt(
  manifest: Record<string, unknown>,
  index = 0,
): Record<string, unknown> {
  return caseAt(manifest, index).expectation as Record<string, unknown>;
}

function deepFreeze<TValue>(value: TValue): TValue {
  if (typeof value !== "object" || value === null || Object.isFrozen(value)) {
    return value;
  }
  Object.freeze(value);
  for (const child of Object.values(value)) deepFreeze(child);
  return value;
}

function collectEntries(
  value: unknown,
  path = "$",
): readonly {
  readonly path: string;
  readonly key: string;
  readonly value: unknown;
}[] {
  if (Array.isArray(value)) {
    return value.flatMap((item, index) =>
      collectEntries(item, `${path}[${index}]`),
    );
  }
  if (typeof value !== "object" || value === null) return [];
  return Object.entries(value).flatMap(([key, item]) => [
    { path: `${path}.${key}`, key, value: item },
    ...collectEntries(item, `${path}.${key}`),
  ]);
}

describe("M03.05 MoneyEvent fixture manifest contract", () => {
  it("strictly parses the reviewed manifest and is stable across repeated loads", () => {
    const first = loadFixtureManifest();
    const second = loadFixtureManifest();
    expect(first).toEqual(second);
    expect(first).not.toBe(second);
    expect(first).toMatchObject({
      schemaVersion: "m03.05-money-event-fixtures.v1",
      status: "controlled-synthetic-fixtures",
      deterministic: true,
      financialTruth: false,
    });
    expect(first.cases.length).toBeGreaterThanOrEqual(16);
    expect(JSON.parse(JSON.stringify(first))).toEqual(first);
  });

  it.each([
    ["non-object root", () => null, /^\$: expected plain object/u],
    [
      "unsupported version",
      () => mutate((value) => void (value.schemaVersion = "v2")),
      /^\$\.schemaVersion:/u,
    ],
    [
      "unknown root field",
      () => mutate((value) => void (value.extra = true)),
      /^\$\.extra: unknown field/u,
    ],
    [
      "missing root field",
      () =>
        mutate((value) => {
          delete value.cases;
        }),
      /^\$\.cases: required field missing/u,
    ],
    [
      "non-array cases",
      () => mutate((value) => void (value.cases = {})),
      /^\$\.cases: expected array/u,
    ],
    [
      "malformed case",
      () => mutate((value) => void ((value.cases as unknown[])[0] = [])),
      /^\$\.cases\[0\]: expected plain object/u,
    ],
    [
      "missing case field",
      () =>
        mutate((value) => {
          delete caseAt(value).fixtureId;
        }),
      /^\$\.cases\[0\]\.fixtureId: required field missing/u,
    ],
    [
      "unknown case field",
      () => mutate((value) => void (caseAt(value).extra = true)),
      /^\$\.cases\[0\]\.extra: unknown field/u,
    ],
    [
      "malformed fixture ID",
      () => mutate((value) => void (caseAt(value).fixtureId = "fixture 1")),
      /^\$\.cases\[0\]\.fixtureId: invalid fixture ID/u,
    ],
    [
      "duplicate fixture IDs",
      () =>
        mutate(
          (value) =>
            void (caseAt(value, 1).fixtureId = caseAt(value).fixtureId),
        ),
      /^\$\.cases: duplicate fixture IDs/u,
    ],
    [
      "non-array coverage tags",
      () => mutate((value) => void (caseAt(value).coverageTags = "tag")),
      /^\$\.cases\[0\]\.coverageTags: expected array/u,
    ],
    [
      "empty coverage tags",
      () => mutate((value) => void (caseAt(value).coverageTags = [])),
      /^\$\.cases\[0\]\.coverageTags: expected non-empty array/u,
    ],
    [
      "duplicate coverage tags",
      () => mutate((value) => void (caseAt(value).coverageTags = ["x", "x"])),
      /^\$\.cases\[0\]\.coverageTags: duplicate values/u,
    ],
    [
      "uncontrolled source",
      () =>
        mutate((value) => void (caseAt(value).sourceSystem = "stripe-live")),
      /^\$\.cases\[0\]\.sourceSystem: source must be controlled/u,
    ],
    [
      "empty evidence references",
      () => mutate((value) => void (caseAt(value).rawEvidenceReferences = [])),
      /^\$\.cases\[0\]\.rawEvidenceReferences: expected non-empty array/u,
    ],
    [
      "malformed candidate",
      () => mutate((value) => void (caseAt(value).candidate = [])),
      /^\$\.cases\[0\]\.candidate: expected plain object/u,
    ],
    [
      "unsupported expectation outcome",
      () => mutate((value) => void (expectationAt(value).outcome = "maybe")),
      /^\$\.cases\[0\]\.expectation\.outcome: unsupported/u,
    ],
    [
      "invalid valid-expectation shape",
      () => mutate((value) => void (expectationAt(value).issues = [])),
      /^\$\.cases\[0\]\.expectation\.issues: unknown field/u,
    ],
    [
      "partial valid snapshot",
      () =>
        mutate((value) => {
          delete (expectationAt(value).normalized as Record<string, unknown>)
            .kind;
        }),
      /^\$\.cases\[0\]\.expectation\.normalized\.kind: required field missing/u,
    ],
    [
      "unknown valid snapshot field",
      () =>
        mutate(
          (value) =>
            void ((
              expectationAt(value).normalized as Record<string, unknown>
            ).extra = true),
        ),
      /^\$\.cases\[0\]\.expectation\.normalized\.extra: unknown field/u,
    ],
    [
      "non-string bigint snapshot",
      () =>
        mutate(
          (value) =>
            void ((
              (expectationAt(value).normalized as Record<string, unknown>)
                .amount as Record<string, unknown>
            ).minorUnits = 100),
        ),
      /amount\.minorUnits: expected non-empty string/u,
    ],
    [
      "empty invalid issue list",
      () => {
        const value = mutate(() => undefined);
        const invalidIndex = (
          value.cases as Record<string, unknown>[]
        ).findIndex(
          (fixture) =>
            (fixture.expectation as Record<string, unknown>).outcome ===
            "invalid",
        );
        expectationAt(value, invalidIndex).issues = [];
        return value;
      },
      /expectation\.issues: expected non-empty issue list/u,
    ],
    [
      "invalid invalid-expectation shape",
      () => {
        const value = mutate(() => undefined);
        const invalidIndex = (
          value.cases as Record<string, unknown>[]
        ).findIndex(
          (fixture) =>
            (fixture.expectation as Record<string, unknown>).outcome ===
            "invalid",
        );
        expectationAt(value, invalidIndex).normalized = {};
        return value;
      },
      /expectation\.normalized: unknown field/u,
    ],
    [
      "unsupported issue code",
      () => {
        const value = mutate(() => undefined);
        const invalid = (value.cases as Record<string, unknown>[]).find(
          (fixture) =>
            (fixture.expectation as Record<string, unknown>).outcome ===
            "invalid",
        );
        const issue = (
          (invalid?.expectation as Record<string, unknown>).issues as Record<
            string,
            unknown
          >[]
        )[0];
        if (issue === undefined)
          throw new Error("expected invalid fixture issue");
        issue.code = "not_a_code";
        return value;
      },
      /\.code: unsupported validation issue code/u,
    ],
    [
      "malformed issue path",
      () => {
        const value = mutate(() => undefined);
        const invalid = (value.cases as Record<string, unknown>[]).find(
          (fixture) =>
            (fixture.expectation as Record<string, unknown>).outcome ===
            "invalid",
        );
        const issue = (
          (invalid?.expectation as Record<string, unknown>).issues as Record<
            string,
            unknown
          >[]
        )[0];
        if (issue === undefined)
          throw new Error("expected invalid fixture issue");
        issue.path = "amount.currency";
        return value;
      },
      /\.path: invalid validation issue path/u,
    ],
    [
      "duplicate expected issues",
      () => {
        const value = mutate(() => undefined);
        const invalid = (value.cases as Record<string, unknown>[]).find(
          (fixture) =>
            (fixture.expectation as Record<string, unknown>).outcome ===
            "invalid",
        );
        const expectation = invalid?.expectation as Record<string, unknown>;
        const issues = expectation.issues as Record<string, unknown>[];
        expectation.issues = [issues[0], clone(issues[0])];
        return value;
      },
      /expectation\.issues: duplicate issues/u,
    ],
  ])("rejects %s", (_name, build, message) => {
    expect(() => parseMoneyEventFixtureManifest(build())).toThrow(message);
  });
});

describe("M03.05 MoneyEvent fixture corpus", () => {
  it("uses unique IDs and covers the reviewed evidence, normalization, and validation families", () => {
    const fixtures = loadFixtureManifest().cases;
    expect(new Set(fixtures.map((fixture) => fixture.fixtureId)).size).toBe(
      fixtures.length,
    );
    expect(fixtures.map((fixture) => fixture.category)).toEqual(
      expect.arrayContaining([
        "simple_provider_capture",
        "provider_refund",
        "chargeback_opened",
        "settlement_payout_row",
        "bank_deposit_line",
        "duplicate_provider_webhook",
        "distinct_evidence_preserved",
        "conflicting_amount",
        "missing_currency",
        "missing_required_field",
        "unsupported_contract_version",
        "invalid_identifier",
        "missing_primary_evidence",
        "provenance_mismatch",
        "invalid_timestamp",
        "invalid_idempotency_key",
        "missing_relationship_target",
        "invalid_lifecycle_state",
        "missing_uncertainty_reason",
        "unsupported_transformation_boundary",
      ]),
    );
    expect(fixtures.flatMap((fixture) => fixture.coverageTags)).toEqual(
      expect.arrayContaining([
        "provider_only",
        "partial_evidence_chain",
        "delayed_settlement",
        "idempotency",
        "exact_duplicate_evidence",
        "distinct_evidence_preservation",
        "relationship_event_target",
        "relationship_object_target",
        "relationship_combined_target",
        "conflicting_evidence",
        "no_default_currency",
        "nullable_event_time",
        "negative_minor_units",
      ]),
    );
  });

  it("normalizes every valid fixture to its independent full JSON-safe snapshot", () => {
    const fixtures = loadFixtureManifest().cases.filter(
      (fixture) => fixture.expectation.outcome === "valid",
    );
    expect(fixtures.length).toBeGreaterThan(0);

    for (const fixture of fixtures) {
      if (fixture.expectation.outcome !== "valid") continue;
      const candidate = deepFreeze(clone(fixture.candidate));
      const before = clone(candidate);
      expect(validateMoneyEventCandidate(candidate)).toEqual({
        ok: true,
        issues: [],
      });

      const first = normalizeMoneyEventCandidate(candidate);
      const second = normalizeMoneyEventCandidate(candidate);
      expect(first).toEqual(second);
      expect(candidate).toEqual(before);
      expect(first.ok).toBe(true);
      if (!first.ok) continue;

      expect(toJsonSafeMoneyEvent(first.value)).toEqual(
        fixture.expectation.normalized,
      );
      expect(
        JSON.parse(JSON.stringify(fixture.expectation.normalized)),
      ).toEqual(fixture.expectation.normalized);
    }
  });

  it("rejects every invalid fixture with exactly its stable ordered issues and no value", () => {
    const fixtures = loadFixtureManifest().cases.filter(
      (fixture) => fixture.expectation.outcome === "invalid",
    );
    expect(fixtures.length).toBeGreaterThanOrEqual(12);

    for (const fixture of fixtures) {
      if (fixture.expectation.outcome !== "invalid") continue;
      const candidate = deepFreeze(clone(fixture.candidate));
      const before = clone(candidate);
      const expected = fixture.expectation.issues;
      const validation = validateMoneyEventCandidate(candidate);
      const validationAgain = validateMoneyEventCandidate(candidate);
      const normalization = normalizeMoneyEventCandidate(candidate);
      expect(validation.ok).toBe(false);
      expect(normalization.ok).toBe(false);
      expect(normalization).not.toHaveProperty("value");
      expect(validationAgain).toEqual(validation);
      expect(candidate).toEqual(before);

      const validationIssues = validation.issues.map(({ code, path }) => ({
        code,
        path,
      }));
      const normalizationIssues = normalization.issues.map(
        ({ code, path }) => ({
          code,
          path,
        }),
      );
      expect(validationIssues).toEqual(expected);
      expect(normalizationIssues).toEqual(expected);
      expect(
        new Set(expected.map((issue) => `${issue.path}\u0000${issue.code}`))
          .size,
      ).toBe(expected.length);
    }
  });

  it("contains only controlled references and no credential, personal, or raw-payload fields", () => {
    const manifest = loadFixtureManifest();
    const serialized = JSON.stringify(manifest);
    const entries = collectEntries(manifest);
    const sensitiveKey =
      /(?:password|passwd|secret|token|authorization|api.?key|private.?key|client.?secret|cookie|session|email|phone|address|full.?name|raw.?payload)/iu;
    const credentialValue =
      /(?:https?:\/\/|sk_(?:live|test)_|pk_live_|AKIA[0-9A-Z]{16}|-----BEGIN [A-Z ]+PRIVATE KEY-----|Bearer\s+[A-Za-z0-9._~-]+)/u;

    expect(serialized).not.toMatch(credentialValue);
    for (const entry of entries) {
      expect(entry.key, entry.path).not.toMatch(sensitiveKey);
      if (typeof entry.value === "string") {
        expect(entry.value, entry.path).not.toMatch(credentialValue);
      }
    }

    for (const fixture of manifest.cases) {
      expect(fixture.sourceSystem).toMatch(/^controlled-/u);
      expect(fixture.rawEvidenceReferences.length).toBeGreaterThan(0);
      expect(fixture.candidate.source).toEqual(
        expect.objectContaining({ sourceId: fixture.sourceSystem }),
      );
      const locators = JSON.stringify(fixture.candidate).match(
        /fixture:\/\/[a-z0-9_./-]+/giu,
      );
      const intentionallyMissingEvidence =
        fixture.expectation.outcome === "invalid" &&
        fixture.expectation.issues.some(
          (issue) => issue.code === "evidence_required",
        );
      if (!intentionallyMissingEvidence) {
        expect(locators?.length ?? 0).toBeGreaterThan(0);
      }
    }
  });
});
