import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

import {
  normalizeMoneyEventCandidate,
  validateMoneyEventCandidate,
  type MoneyEventValidationIssueCode,
} from "../src/index.js";

type ExpectedIssue = {
  readonly code: MoneyEventValidationIssueCode;
  readonly path: string;
};

type ValidExpectation = {
  readonly outcome: "valid";
  readonly normalized: {
    readonly minorUnits: string;
    readonly currency: string;
    readonly eventTime: string | null;
    readonly observedTime: string;
    readonly evidenceCount: number;
    readonly evidenceRoles: readonly string[];
    readonly uncertaintyState: string;
    readonly idempotencyKey: string;
  };
};

type InvalidExpectation = {
  readonly outcome: "invalid";
  readonly issues: readonly ExpectedIssue[];
};

type FixtureCase = {
  readonly fixtureId: string;
  readonly category: string;
  readonly coverageTags: readonly string[];
  readonly evidenceType: string;
  readonly sourceSystem: string;
  readonly rawEvidenceReferences: readonly string[];
  readonly candidate: Record<string, unknown>;
  readonly expectation: ValidExpectation | InvalidExpectation;
};

type FixtureManifest = {
  readonly schemaVersion: string;
  readonly status: string;
  readonly deterministic: boolean;
  readonly financialTruth: boolean;
  readonly cases: readonly FixtureCase[];
};

const fixtureUrl = new URL(
  "../../../data/fixtures/money-events/candidates.json",
  import.meta.url,
);

function loadFixtureManifest(): FixtureManifest {
  return JSON.parse(readFileSync(fixtureUrl, "utf8")) as FixtureManifest;
}

function collectKeys(value: unknown): readonly string[] {
  if (Array.isArray(value)) return value.flatMap(collectKeys);
  if (typeof value !== "object" || value === null) return [];
  return Object.entries(value).flatMap(([key, item]) => [
    key,
    ...collectKeys(item),
  ]);
}

describe("M03.05 MoneyEvent fixture corpus", () => {
  it("is versioned, deterministic, synthetic, and explicit that it is not financial truth", () => {
    const manifest = loadFixtureManifest();
    expect(manifest).toMatchObject({
      schemaVersion: "m03.05-money-event-fixtures.v1",
      status: "controlled-synthetic-fixtures",
      deterministic: true,
      financialTruth: false,
    });
    expect(manifest.cases.length).toBeGreaterThanOrEqual(8);
  });

  it("uses unique stable IDs and covers the reviewed evidence and uncertainty categories", () => {
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
        "conflicting_amount",
        "missing_currency",
      ]),
    );
    expect(fixtures.flatMap((fixture) => fixture.coverageTags)).toEqual(
      expect.arrayContaining([
        "partial_evidence_chain",
        "delayed_settlement",
        "idempotency",
        "conflicting_evidence",
        "no_default_currency",
      ]),
    );
  });

  it("normalizes every valid fixture deterministically without mutating fixture input", () => {
    const fixtures = loadFixtureManifest().cases.filter(
      (fixture) => fixture.expectation.outcome === "valid",
    );
    expect(fixtures.length).toBeGreaterThan(0);

    for (const fixture of fixtures) {
      if (fixture.expectation.outcome !== "valid") continue;
      const before = JSON.stringify(fixture.candidate);
      expect(validateMoneyEventCandidate(fixture.candidate)).toEqual({
        ok: true,
        issues: [],
      });

      const first = normalizeMoneyEventCandidate(fixture.candidate);
      const second = normalizeMoneyEventCandidate(fixture.candidate);
      expect(first).toEqual(second);
      expect(JSON.stringify(fixture.candidate)).toBe(before);
      expect(first.ok).toBe(true);
      if (!first.ok) continue;

      const expected = fixture.expectation.normalized;
      expect(String(first.value.amount.minorUnits)).toBe(expected.minorUnits);
      expect(first.value.amount.currency).toBe(expected.currency);
      expect(first.value.eventTime).toBe(expected.eventTime);
      expect(first.value.observedTime).toBe(expected.observedTime);
      expect(first.value.evidence).toHaveLength(expected.evidenceCount);
      expect(first.value.evidence.map((reference) => reference.role)).toEqual(
        expected.evidenceRoles,
      );
      expect(first.value.uncertainty.state).toBe(expected.uncertaintyState);
      expect(first.value.idempotencyKey).toBe(expected.idempotencyKey);
    }
  });

  it("rejects every invalid fixture with its stable expected issues and no partial value", () => {
    const fixtures = loadFixtureManifest().cases.filter(
      (fixture) => fixture.expectation.outcome === "invalid",
    );
    expect(fixtures.length).toBeGreaterThan(0);

    for (const fixture of fixtures) {
      if (fixture.expectation.outcome !== "invalid") continue;
      const validation = validateMoneyEventCandidate(fixture.candidate);
      const normalization = normalizeMoneyEventCandidate(fixture.candidate);
      expect(validation.ok).toBe(false);
      expect(normalization.ok).toBe(false);
      expect(normalization).not.toHaveProperty("value");
      for (const issue of fixture.expectation.issues) {
        expect(validation.issues).toContainEqual(
          expect.objectContaining(issue),
        );
        expect(normalization.issues).toContainEqual(
          expect.objectContaining(issue),
        );
      }
    }
  });

  it("contains only controlled references and no secret-bearing or raw-payload fields", () => {
    const manifest = loadFixtureManifest();
    const serialized = JSON.stringify(manifest);
    expect(serialized).not.toMatch(/https?:\/\//u);
    expect(collectKeys(manifest)).not.toEqual(
      expect.arrayContaining([
        "password",
        "secret",
        "token",
        "authorization",
        "rawPayload",
      ]),
    );

    for (const fixture of manifest.cases) {
      expect(fixture.sourceSystem).toMatch(/^controlled-/u);
      expect(fixture.rawEvidenceReferences.length).toBeGreaterThan(0);
      expect(fixture.candidate.source).toEqual(
        expect.objectContaining({ sourceId: fixture.sourceSystem }),
      );
      const locators = JSON.stringify(fixture.candidate).match(
        /fixture:\/\/[a-z0-9_./-]+/giu,
      );
      expect(locators?.length ?? 0).toBeGreaterThan(0);
    }
  });
});
