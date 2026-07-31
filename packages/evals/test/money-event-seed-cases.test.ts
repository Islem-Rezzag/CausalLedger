import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

type FixtureCase = {
  readonly fixtureId: string;
  readonly rawEvidenceReferences: readonly string[];
  readonly candidate: {
    readonly uncertainty: { readonly state: string };
  };
  readonly expectation:
    | { readonly outcome: "valid" }
    | {
        readonly outcome: "invalid";
        readonly issues: readonly {
          readonly code: string;
          readonly path: string;
        }[];
      };
};

type FixtureManifest = {
  readonly cases: readonly FixtureCase[];
};

type SeedCase = {
  readonly seedId: string;
  readonly fixtureIds: readonly string[];
  readonly task: string;
  readonly expectedOutcome: string;
  readonly expectedEvidenceReceiptIds: readonly string[];
  readonly expectedUncertaintyStates: readonly string[];
  readonly expectedValidationIssues?: readonly {
    readonly code: string;
    readonly path: string;
  }[];
  readonly requiredFindings: readonly string[];
  readonly prohibitedClaims: readonly string[];
  readonly evaluationPolicy: {
    readonly evidenceCitationRequired: boolean;
    readonly hallucinatedFactOutcome: string;
    readonly unsupportedCertaintyOutcome: string;
    readonly unsafeActionOutcome: string;
    readonly repeatability: string;
    readonly costCapture: {
      readonly requiredWhenRunnerExists: boolean;
      readonly status: string;
    };
  };
};

type SeedManifest = {
  readonly schemaVersion: string;
  readonly status: string;
  readonly scoringImplemented: boolean;
  readonly benchmarkResults: readonly unknown[];
  readonly cases: readonly SeedCase[];
};

const fixturesUrl = new URL(
  "../../../data/fixtures/money-events/candidates.json",
  import.meta.url,
);
const seedsUrl = new URL(
  "../../../scenarios/moneyflowbench/money-event-seeds.json",
  import.meta.url,
);

function loadJson<TValue>(url: URL): TValue {
  return JSON.parse(readFileSync(url, "utf8")) as TValue;
}

describe("M03.05 MoneyFlowBench seed cases", () => {
  it("is a versioned seed-only dataset with no scoring or benchmark results", () => {
    const seeds = loadJson<SeedManifest>(seedsUrl);
    expect(seeds).toMatchObject({
      schemaVersion: "m03.05-moneyflowbench-seeds.v1",
      status: "seed-cases-only",
      scoringImplemented: false,
      benchmarkResults: [],
    });
    expect(seeds.cases.length).toBeGreaterThanOrEqual(7);
  });

  it("uses unique IDs and references only reviewed fixture cases", () => {
    const fixtures = loadJson<FixtureManifest>(fixturesUrl).cases;
    const seeds = loadJson<SeedManifest>(seedsUrl).cases;
    const fixtureIds = new Set(fixtures.map((fixture) => fixture.fixtureId));
    expect(new Set(seeds.map((seed) => seed.seedId)).size).toBe(seeds.length);

    for (const seed of seeds) {
      expect(seed.fixtureIds.length).toBeGreaterThan(0);
      for (const fixtureId of seed.fixtureIds) {
        expect(fixtureIds.has(fixtureId)).toBe(true);
      }
    }
  });

  it("grounds every expected evidence and uncertainty value in its fixtures", () => {
    const fixtures = loadJson<FixtureManifest>(fixturesUrl).cases;
    const byId = new Map(
      fixtures.map((fixture) => [fixture.fixtureId, fixture]),
    );
    const seeds = loadJson<SeedManifest>(seedsUrl).cases;

    for (const seed of seeds) {
      const referenced = seed.fixtureIds.map((fixtureId) =>
        byId.get(fixtureId),
      );
      expect(referenced).not.toContain(undefined);
      const evidence = new Set(
        referenced.flatMap((fixture) => fixture?.rawEvidenceReferences ?? []),
      );
      const uncertainty = new Set(
        referenced.map((fixture) => fixture?.candidate.uncertainty.state),
      );
      for (const evidenceId of seed.expectedEvidenceReceiptIds) {
        expect(evidence.has(evidenceId)).toBe(true);
      }
      for (const state of seed.expectedUncertaintyStates) {
        expect(uncertainty.has(state)).toBe(true);
      }

      if (seed.expectedValidationIssues) {
        const fixtureIssues = referenced.flatMap((fixture) =>
          fixture?.expectation.outcome === "invalid"
            ? fixture.expectation.issues
            : [],
        );
        expect(fixtureIssues).toEqual(
          expect.arrayContaining([...seed.expectedValidationIssues]),
        );
      }
    }
  });

  it("requires citations, calibrated uncertainty, hallucination rejection, repeatability, and future cost capture", () => {
    const seeds = loadJson<SeedManifest>(seedsUrl).cases;
    for (const seed of seeds) {
      expect(seed.task.trim()).not.toBe("");
      expect(seed.expectedOutcome).toMatch(
        /^(?:evidence_grounded_summary|deterministic_rejection)$/u,
      );
      expect(seed.expectedEvidenceReceiptIds.length).toBeGreaterThan(0);
      expect(seed.expectedUncertaintyStates.length).toBeGreaterThan(0);
      expect(seed.requiredFindings.length).toBeGreaterThan(0);
      expect(seed.prohibitedClaims.length).toBeGreaterThan(0);
      expect(seed.evaluationPolicy).toEqual({
        evidenceCitationRequired: true,
        hallucinatedFactOutcome: "fail",
        unsupportedCertaintyOutcome: "fail",
        unsafeActionOutcome: "fail",
        repeatability: "deterministic_fixture",
        costCapture: {
          requiredWhenRunnerExists: true,
          status: "deferred_until_m14_runner",
        },
      });
    }
  });
});
