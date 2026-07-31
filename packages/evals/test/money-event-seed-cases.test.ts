import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

import {
  parseMoneyEventSeedManifest,
  type SeedManifest,
} from "./money-event-seed-manifest.js";

const fixturesUrl = new URL(
  "../../../data/fixtures/money-events/candidates.json",
  import.meta.url,
);
const seedsUrl = new URL(
  "../../../scenarios/moneyflowbench/money-event-seeds.json",
  import.meta.url,
);

function loadJson(url: URL): unknown {
  return JSON.parse(readFileSync(url, "utf8")) as unknown;
}

function loadSeedManifest(): SeedManifest {
  return parseMoneyEventSeedManifest(loadJson(seedsUrl), loadJson(fixturesUrl));
}

function clone<TValue>(value: TValue): TValue {
  return JSON.parse(JSON.stringify(value)) as TValue;
}

function mutate(
  change: (manifest: Record<string, unknown>) => void,
): Record<string, unknown> {
  const manifest = clone(loadJson(seedsUrl)) as Record<string, unknown>;
  change(manifest);
  return manifest;
}

function seedAt(
  manifest: Record<string, unknown>,
  index = 0,
): Record<string, unknown> {
  const seed = (manifest.cases as Record<string, unknown>[])[index];
  if (seed === undefined) throw new Error(`seed ${index} not found`);
  return seed;
}

function rejectionSeedIndex(manifest: Record<string, unknown>): number {
  const index = (manifest.cases as Record<string, unknown>[]).findIndex(
    (seed) => seed.expectedOutcome === "deterministic_rejection",
  );
  if (index < 0) throw new Error("rejection seed not found");
  return index;
}

describe("M03.05 MoneyFlowBench seed manifest contract", () => {
  it("strictly parses the seed-only dataset and is stable across repeated loads", () => {
    const first = loadSeedManifest();
    const second = loadSeedManifest();
    expect(first).toEqual(second);
    expect(first).not.toBe(second);
    expect(first).toMatchObject({
      schemaVersion: "m03.05-moneyflowbench-seeds.v1",
      status: "seed-cases-only",
      scoringImplemented: false,
      benchmarkResults: [],
    });
    expect(first.cases).toHaveLength(7);
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
      "unsupported status",
      () => mutate((value) => void (value.status = "results")),
      /^\$\.status:/u,
    ],
    [
      "scoring enabled",
      () => mutate((value) => void (value.scoringImplemented = true)),
      /^\$\.scoringImplemented:/u,
    ],
    [
      "embedded benchmark result",
      () => mutate((value) => void (value.benchmarkResults = [{ score: 1 }])),
      /^\$\.benchmarkResults: benchmark results are not allowed/u,
    ],
    [
      "unknown root field",
      () => mutate((value) => void (value.leaderboard = [])),
      /^\$\.leaderboard: unknown field/u,
    ],
    [
      "missing cases",
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
      "empty cases",
      () => mutate((value) => void (value.cases = [])),
      /^\$\.cases: expected non-empty array/u,
    ],
    [
      "malformed seed record",
      () => mutate((value) => void ((value.cases as unknown[])[0] = [])),
      /^\$\.cases\[0\]: expected plain object/u,
    ],
    [
      "missing seed field",
      () =>
        mutate((value) => {
          delete seedAt(value).task;
        }),
      /^\$\.cases\[0\]\.task: required field missing/u,
    ],
    [
      "unknown seed field",
      () => mutate((value) => void (seedAt(value).modelOutput = "answer")),
      /^\$\.cases\[0\]\.modelOutput: unknown field/u,
    ],
    [
      "embedded fixture payload",
      () => mutate((value) => void (seedAt(value).candidate = {})),
      /^\$\.cases\[0\]\.candidate: unknown field/u,
    ],
    [
      "numeric score field",
      () => mutate((value) => void (seedAt(value).score = 0.9)),
      /^\$\.cases\[0\]\.score: unknown field/u,
    ],
    [
      "malformed seed ID",
      () => mutate((value) => void (seedAt(value).seedId = "bad id")),
      /^\$\.cases\[0\]\.seedId: invalid seed ID/u,
    ],
    [
      "duplicate seed IDs",
      () =>
        mutate(
          (value) => void (seedAt(value, 1).seedId = seedAt(value).seedId),
        ),
      /^\$\.cases: duplicate seed IDs/u,
    ],
    [
      "empty fixture references",
      () => mutate((value) => void (seedAt(value).fixtureIds = [])),
      /^\$\.cases\[0\]\.fixtureIds: expected non-empty array/u,
    ],
    [
      "duplicate fixture references",
      () =>
        mutate(
          (value) =>
            void (seedAt(value).fixtureIds = [
              "provider-capture-provider-only",
              "provider-capture-provider-only",
            ]),
        ),
      /^\$\.cases\[0\]\.fixtureIds: duplicate values/u,
    ],
    [
      "unknown fixture reference",
      () => mutate((value) => void (seedAt(value).fixtureIds = ["unknown"])),
      /^\$\.cases\[0\]\.fixtureIds\[0\]: unknown fixture reference/u,
    ],
    [
      "empty task",
      () => mutate((value) => void (seedAt(value).task = "   ")),
      /^\$\.cases\[0\]\.task: expected non-empty string/u,
    ],
    [
      "unsupported outcome",
      () => mutate((value) => void (seedAt(value).expectedOutcome = "pass")),
      /^\$\.cases\[0\]\.expectedOutcome: unsupported expected outcome/u,
    ],
    [
      "empty evidence references",
      () =>
        mutate((value) => void (seedAt(value).expectedEvidenceReferences = [])),
      /^\$\.cases\[0\]\.expectedEvidenceReferences: expected non-empty array/u,
    ],
    [
      "duplicate evidence references",
      () =>
        mutate(
          (value) =>
            void (seedAt(value).expectedEvidenceReferences = [
              "rcpt_fixture_capture_primary",
              "rcpt_fixture_capture_primary",
            ]),
        ),
      /^\$\.cases\[0\]\.expectedEvidenceReferences: duplicate values/u,
    ],
    [
      "ungrounded evidence reference",
      () =>
        mutate(
          (value) =>
            void (seedAt(value).expectedEvidenceReferences = ["rcpt_unknown"]),
        ),
      /^\$\.cases\[0\]\.expectedEvidenceReferences: must exactly match/u,
    ],
    [
      "empty uncertainty states",
      () =>
        mutate((value) => void (seedAt(value).expectedUncertaintyStates = [])),
      /^\$\.cases\[0\]\.expectedUncertaintyStates: expected non-empty array/u,
    ],
    [
      "ungrounded uncertainty state",
      () =>
        mutate(
          (value) =>
            void (seedAt(value).expectedUncertaintyStates = ["none_known"]),
        ),
      /^\$\.cases\[0\]\.expectedUncertaintyStates: must exactly match/u,
    ],
    [
      "missing rejection issues",
      () =>
        mutate((value) => {
          delete seedAt(value, rejectionSeedIndex(value))
            .expectedValidationIssues;
        }),
      /expectedValidationIssues: required field missing/u,
    ],
    [
      "malformed rejection issue",
      () =>
        mutate((value) => {
          seedAt(value, rejectionSeedIndex(value)).expectedValidationIssues = [
            { code: "currency_required" },
          ];
        }),
      /expectedValidationIssues\[0\]\.path: required field missing/u,
    ],
    [
      "empty rejection issue code",
      () =>
        mutate((value) => {
          seedAt(value, rejectionSeedIndex(value)).expectedValidationIssues = [
            { code: "", path: "$.amount.currency" },
          ];
        }),
      /expectedValidationIssues\[0\]\.code: expected non-empty string/u,
    ],
    [
      "malformed rejection issue path",
      () =>
        mutate((value) => {
          seedAt(value, rejectionSeedIndex(value)).expectedValidationIssues = [
            { code: "currency_required", path: "amount.currency" },
          ];
        }),
      /expectedValidationIssues\[0\]\.path: invalid issue path/u,
    ],
    [
      "ungrounded rejection issue",
      () =>
        mutate((value) => {
          seedAt(value, rejectionSeedIndex(value)).expectedValidationIssues = [
            { code: "invalid_currency", path: "$.amount.currency" },
          ];
        }),
      /expectedValidationIssues: must exactly match/u,
    ],
    [
      "summary validation issues",
      () =>
        mutate(
          (value) =>
            void (seedAt(value).expectedValidationIssues = [
              { code: "required_field", path: "$.kind" },
            ]),
        ),
      /expectedValidationIssues: not allowed/u,
    ],
    [
      "rejection over valid fixture",
      () =>
        mutate((value) => {
          const seed = seedAt(value);
          seed.expectedOutcome = "deterministic_rejection";
          seed.expectedValidationIssues = [
            { code: "required_field", path: "$.kind" },
          ];
        }),
      /fixtureIds: rejection seed must reference an invalid fixture/u,
    ],
    [
      "empty required findings",
      () => mutate((value) => void (seedAt(value).requiredFindings = [])),
      /requiredFindings: expected non-empty array/u,
    ],
    [
      "empty prohibited claims",
      () => mutate((value) => void (seedAt(value).prohibitedClaims = [])),
      /prohibitedClaims: expected non-empty array/u,
    ],
    [
      "unsafe policy",
      () =>
        mutate(
          (value) =>
            void ((
              seedAt(value).evaluationPolicy as Record<string, unknown>
            ).unsafeActionOutcome = "warn"),
        ),
      /evaluationPolicy\.unsafeActionOutcome:/u,
    ],
    [
      "incorrect cost policy",
      () =>
        mutate(
          (value) =>
            void ((
              (seedAt(value).evaluationPolicy as Record<string, unknown>)
                .costCapture as Record<string, unknown>
            ).requiredWhenRunnerExists = false),
        ),
      /costCapture\.requiredWhenRunnerExists:/u,
    ],
  ])("rejects %s", (_name, build, message) => {
    expect(() =>
      parseMoneyEventSeedManifest(build(), loadJson(fixturesUrl)),
    ).toThrow(message);
  });
});

describe("M03.05 MoneyFlowBench seed cases", () => {
  it("uses unique IDs and grounds evidence, uncertainty, outcomes, and issues exactly", () => {
    const seeds = loadSeedManifest().cases;
    expect(new Set(seeds.map((seed) => seed.seedId)).size).toBe(seeds.length);
    for (const seed of seeds) {
      expect(seed.fixtureIds.length).toBeGreaterThan(0);
      expect(seed.expectedEvidenceReferences.length).toBeGreaterThan(0);
      expect(seed.expectedUncertaintyStates.length).toBeGreaterThan(0);
      expect(seed.task.trim()).not.toBe("");
      expect(seed.requiredFindings.length).toBeGreaterThan(0);
      expect(seed.prohibitedClaims.length).toBeGreaterThan(0);
    }
  });

  it("keeps policies deterministic, evidence-grounded, hallucination-sensitive, safe, and cost-aware", () => {
    for (const seed of loadSeedManifest().cases) {
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

  it("contains metadata only, with no payloads, credentials, model output, scores, or results", () => {
    const raw = loadJson(seedsUrl);
    const serialized = JSON.stringify(raw);
    expect(serialized).not.toMatch(
      /(?:https?:\/\/|sk_(?:live|test)_|pk_live_|AKIA[0-9A-Z]{16}|-----BEGIN [A-Z ]+PRIVATE KEY-----|Bearer\s+)/u,
    );
    expect(serialized).not.toMatch(
      /"(?:candidate|fixture|rawPayload|modelOutput|agentOutput|score|leaderboard)"\s*:/u,
    );
  });
});
