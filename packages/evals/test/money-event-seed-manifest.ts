type UnknownRecord = Record<string, unknown>;

export type ExpectedIssue = {
  readonly code: string;
  readonly path: string;
};

export type SeedCase = {
  readonly seedId: string;
  readonly fixtureIds: readonly string[];
  readonly task: string;
  readonly expectedOutcome:
    | "evidence_grounded_summary"
    | "deterministic_rejection";
  readonly expectedEvidenceReferences: readonly string[];
  readonly expectedUncertaintyStates: readonly string[];
  readonly expectedValidationIssues?: readonly ExpectedIssue[];
  readonly requiredFindings: readonly string[];
  readonly prohibitedClaims: readonly string[];
  readonly evaluationPolicy: EvaluationPolicy;
};

export type EvaluationPolicy = {
  readonly evidenceCitationRequired: true;
  readonly hallucinatedFactOutcome: "fail";
  readonly unsupportedCertaintyOutcome: "fail";
  readonly unsafeActionOutcome: "fail";
  readonly repeatability: "deterministic_fixture";
  readonly costCapture: {
    readonly requiredWhenRunnerExists: true;
    readonly status: "deferred_until_m14_runner";
  };
};

export type SeedManifest = {
  readonly schemaVersion: "m03.05-moneyflowbench-seeds.v1";
  readonly status: "seed-cases-only";
  readonly description: string;
  readonly scoringImplemented: false;
  readonly benchmarkResults: readonly [];
  readonly cases: readonly SeedCase[];
};

type FixtureGrounding = {
  readonly fixtureId: string;
  readonly rawEvidenceReferences: readonly string[];
  readonly uncertaintyState: string;
  readonly outcome: "valid" | "invalid";
  readonly issues: readonly ExpectedIssue[];
};

const ROOT_FIELDS = [
  "schemaVersion",
  "status",
  "description",
  "scoringImplemented",
  "benchmarkResults",
  "cases",
] as const;
const CASE_REQUIRED_FIELDS = [
  "seedId",
  "fixtureIds",
  "task",
  "expectedOutcome",
  "expectedEvidenceReferences",
  "expectedUncertaintyStates",
  "requiredFindings",
  "prohibitedClaims",
  "evaluationPolicy",
] as const;
const POLICY_FIELDS = [
  "evidenceCitationRequired",
  "hallucinatedFactOutcome",
  "unsupportedCertaintyOutcome",
  "unsafeActionOutcome",
  "repeatability",
  "costCapture",
] as const;

function fail(path: string, message: string): never {
  throw new Error(`${path}: ${message}`);
}

function record(value: unknown, path: string): UnknownRecord {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    fail(path, "expected plain object");
  }
  const prototype = Object.getPrototypeOf(value) as object | null;
  if (prototype !== Object.prototype && prototype !== null) {
    fail(path, "expected plain object");
  }
  return value as UnknownRecord;
}

function exactFields(
  value: UnknownRecord,
  path: string,
  required: readonly string[],
  optional: readonly string[] = [],
): void {
  for (const key of required) {
    if (!Object.prototype.hasOwnProperty.call(value, key)) {
      fail(`${path}.${key}`, "required field missing");
    }
  }
  const allowed = new Set([...required, ...optional]);
  const unknown = Object.keys(value)
    .filter((key) => !allowed.has(key))
    .sort();
  if (unknown.length > 0) fail(`${path}.${unknown[0]}`, "unknown field");
}

function arrayValue(value: unknown, path: string): readonly unknown[] {
  if (!Array.isArray(value)) fail(path, "expected array");
  return value;
}

function stringValue(value: unknown, path: string): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    fail(path, "expected non-empty string");
  }
  return value;
}

function literal<TValue extends string | boolean>(
  value: unknown,
  expected: TValue,
  path: string,
): TValue {
  if (value !== expected) fail(path, `expected ${JSON.stringify(expected)}`);
  return expected;
}

function stringArray(
  value: unknown,
  path: string,
  { nonEmpty = false }: { readonly nonEmpty?: boolean } = {},
): readonly string[] {
  const result = arrayValue(value, path).map((item, index) =>
    stringValue(item, `${path}[${index}]`),
  );
  if (nonEmpty && result.length === 0) fail(path, "expected non-empty array");
  if (new Set(result).size !== result.length) {
    fail(path, "duplicate values are not allowed");
  }
  return result;
}

function parseIssue(value: unknown, path: string): ExpectedIssue {
  const issue = record(value, path);
  exactFields(issue, path, ["code", "path"]);
  const issuePath = stringValue(issue.path, `${path}.path`);
  if (!/^\$(?:\.[A-Za-z][A-Za-z0-9]*|\[[0-9]+\])*$/u.test(issuePath)) {
    fail(`${path}.path`, "invalid issue path");
  }
  return {
    code: stringValue(issue.code, `${path}.code`),
    path: issuePath,
  };
}

function parseIssueArray(
  value: unknown,
  path: string,
  { nonEmpty = false }: { readonly nonEmpty?: boolean } = {},
): readonly ExpectedIssue[] {
  const issues = arrayValue(value, path).map((item, index) =>
    parseIssue(item, `${path}[${index}]`),
  );
  if (nonEmpty && issues.length === 0) fail(path, "expected non-empty array");
  const keys = issues.map((issue) => `${issue.path}\u0000${issue.code}`);
  if (new Set(keys).size !== keys.length) {
    fail(path, "duplicate issues are not allowed");
  }
  return issues;
}

function parseEvaluationPolicy(value: unknown, path: string): EvaluationPolicy {
  const policy = record(value, path);
  exactFields(policy, path, POLICY_FIELDS);
  const cost = record(policy.costCapture, `${path}.costCapture`);
  exactFields(cost, `${path}.costCapture`, [
    "requiredWhenRunnerExists",
    "status",
  ]);
  return {
    evidenceCitationRequired: literal(
      policy.evidenceCitationRequired,
      true,
      `${path}.evidenceCitationRequired`,
    ),
    hallucinatedFactOutcome: literal(
      policy.hallucinatedFactOutcome,
      "fail",
      `${path}.hallucinatedFactOutcome`,
    ),
    unsupportedCertaintyOutcome: literal(
      policy.unsupportedCertaintyOutcome,
      "fail",
      `${path}.unsupportedCertaintyOutcome`,
    ),
    unsafeActionOutcome: literal(
      policy.unsafeActionOutcome,
      "fail",
      `${path}.unsafeActionOutcome`,
    ),
    repeatability: literal(
      policy.repeatability,
      "deterministic_fixture",
      `${path}.repeatability`,
    ),
    costCapture: {
      requiredWhenRunnerExists: literal(
        cost.requiredWhenRunnerExists,
        true,
        `${path}.costCapture.requiredWhenRunnerExists`,
      ),
      status: literal(
        cost.status,
        "deferred_until_m14_runner",
        `${path}.costCapture.status`,
      ),
    },
  };
}

function parseFixtureGrounding(
  value: unknown,
): ReadonlyMap<string, FixtureGrounding> {
  const manifest = record(value, "$fixtures");
  const cases = arrayValue(manifest.cases, "$fixtures.cases");
  const parsed = cases.map((item, index): FixtureGrounding => {
    const path = `$fixtures.cases[${index}]`;
    const fixture = record(item, path);
    const candidate = record(fixture.candidate, `${path}.candidate`);
    const uncertainty = record(
      candidate.uncertainty,
      `${path}.candidate.uncertainty`,
    );
    const expectation = record(fixture.expectation, `${path}.expectation`);
    const outcome = stringValue(
      expectation.outcome,
      `${path}.expectation.outcome`,
    );
    if (outcome !== "valid" && outcome !== "invalid") {
      fail(`${path}.expectation.outcome`, "unsupported fixture outcome");
    }
    return {
      fixtureId: stringValue(fixture.fixtureId, `${path}.fixtureId`),
      rawEvidenceReferences: stringArray(
        fixture.rawEvidenceReferences,
        `${path}.rawEvidenceReferences`,
        { nonEmpty: true },
      ),
      uncertaintyState: stringValue(
        uncertainty.state,
        `${path}.candidate.uncertainty.state`,
      ),
      outcome,
      issues:
        outcome === "invalid"
          ? parseIssueArray(expectation.issues, `${path}.expectation.issues`, {
              nonEmpty: true,
            })
          : [],
    };
  });
  const ids = parsed.map((fixture) => fixture.fixtureId);
  if (new Set(ids).size !== ids.length) {
    fail("$fixtures.cases", "duplicate fixture IDs are not allowed");
  }
  return new Map(parsed.map((fixture) => [fixture.fixtureId, fixture]));
}

function exactArray<TValue>(
  actual: readonly TValue[],
  expected: readonly TValue[],
  path: string,
): void {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    fail(path, "must exactly match referenced fixture grounding");
  }
}

function parseSeedCase(
  value: unknown,
  index: number,
  fixtures: ReadonlyMap<string, FixtureGrounding>,
): SeedCase {
  const path = `$.cases[${index}]`;
  const seed = record(value, path);
  exactFields(seed, path, CASE_REQUIRED_FIELDS, ["expectedValidationIssues"]);
  const seedId = stringValue(seed.seedId, `${path}.seedId`);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/u.test(seedId)) {
    fail(`${path}.seedId`, "invalid seed ID");
  }
  const fixtureIds = stringArray(seed.fixtureIds, `${path}.fixtureIds`, {
    nonEmpty: true,
  });
  const referenced = fixtureIds.map((fixtureId, fixtureIndex) => {
    const fixture = fixtures.get(fixtureId);
    if (fixture === undefined) {
      fail(`${path}.fixtureIds[${fixtureIndex}]`, "unknown fixture reference");
    }
    return fixture;
  });
  const expectedEvidenceReferences = stringArray(
    seed.expectedEvidenceReferences,
    `${path}.expectedEvidenceReferences`,
    { nonEmpty: true },
  );
  const expectedUncertaintyStates = stringArray(
    seed.expectedUncertaintyStates,
    `${path}.expectedUncertaintyStates`,
    { nonEmpty: true },
  );
  const groundedEvidence = referenced.flatMap(
    (fixture) => fixture.rawEvidenceReferences,
  );
  const groundedUncertainty = [
    ...new Set(referenced.map((fixture) => fixture.uncertaintyState)),
  ];
  exactArray(
    expectedEvidenceReferences,
    groundedEvidence,
    `${path}.expectedEvidenceReferences`,
  );
  exactArray(
    expectedUncertaintyStates,
    groundedUncertainty,
    `${path}.expectedUncertaintyStates`,
  );

  const expectedOutcome = stringValue(
    seed.expectedOutcome,
    `${path}.expectedOutcome`,
  );
  if (
    expectedOutcome !== "evidence_grounded_summary" &&
    expectedOutcome !== "deterministic_rejection"
  ) {
    fail(`${path}.expectedOutcome`, "unsupported expected outcome");
  }
  const invalidIssues = referenced.flatMap((fixture) => fixture.issues);
  let expectedValidationIssues: readonly ExpectedIssue[] | undefined;
  if (expectedOutcome === "deterministic_rejection") {
    if (invalidIssues.length === 0) {
      fail(
        `${path}.fixtureIds`,
        "rejection seed must reference an invalid fixture",
      );
    }
    if (
      !Object.prototype.hasOwnProperty.call(seed, "expectedValidationIssues")
    ) {
      fail(`${path}.expectedValidationIssues`, "required field missing");
    }
    expectedValidationIssues = parseIssueArray(
      seed.expectedValidationIssues,
      `${path}.expectedValidationIssues`,
      { nonEmpty: true },
    );
    exactArray(
      expectedValidationIssues,
      invalidIssues,
      `${path}.expectedValidationIssues`,
    );
  } else {
    if (referenced.some((fixture) => fixture.outcome === "invalid")) {
      fail(
        `${path}.fixtureIds`,
        "summary seed cannot reference an invalid fixture",
      );
    }
    if (
      Object.prototype.hasOwnProperty.call(seed, "expectedValidationIssues")
    ) {
      fail(
        `${path}.expectedValidationIssues`,
        "not allowed for evidence-grounded summary",
      );
    }
  }

  return {
    seedId,
    fixtureIds,
    task: stringValue(seed.task, `${path}.task`),
    expectedOutcome,
    expectedEvidenceReferences,
    expectedUncertaintyStates,
    ...(expectedValidationIssues === undefined
      ? {}
      : { expectedValidationIssues }),
    requiredFindings: stringArray(
      seed.requiredFindings,
      `${path}.requiredFindings`,
      { nonEmpty: true },
    ),
    prohibitedClaims: stringArray(
      seed.prohibitedClaims,
      `${path}.prohibitedClaims`,
      { nonEmpty: true },
    ),
    evaluationPolicy: parseEvaluationPolicy(
      seed.evaluationPolicy,
      `${path}.evaluationPolicy`,
    ),
  };
}

export function parseMoneyEventSeedManifest(
  value: unknown,
  fixtureManifest: unknown,
): SeedManifest {
  const fixtures = parseFixtureGrounding(fixtureManifest);
  const manifest = record(value, "$");
  exactFields(manifest, "$", ROOT_FIELDS);
  literal(
    manifest.schemaVersion,
    "m03.05-moneyflowbench-seeds.v1",
    "$.schemaVersion",
  );
  literal(manifest.status, "seed-cases-only", "$.status");
  const description = stringValue(manifest.description, "$.description");
  literal(manifest.scoringImplemented, false, "$.scoringImplemented");
  if (arrayValue(manifest.benchmarkResults, "$.benchmarkResults").length > 0) {
    fail("$.benchmarkResults", "benchmark results are not allowed in M03.05");
  }
  const cases = arrayValue(manifest.cases, "$.cases").map((seed, index) =>
    parseSeedCase(seed, index, fixtures),
  );
  if (cases.length === 0) fail("$.cases", "expected non-empty array");
  const seedIds = cases.map((seed) => seed.seedId);
  if (new Set(seedIds).size !== seedIds.length) {
    fail("$.cases", "duplicate seed IDs are not allowed");
  }
  return {
    schemaVersion: "m03.05-moneyflowbench-seeds.v1",
    status: "seed-cases-only",
    description,
    scoringImplemented: false,
    benchmarkResults: [],
    cases,
  };
}
