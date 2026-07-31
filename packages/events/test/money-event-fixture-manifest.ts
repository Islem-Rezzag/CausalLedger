import type { MoneyEventValidationIssueCode } from "../src/index.js";

type UnknownRecord = Record<string, unknown>;

export type ExpectedIssue = {
  readonly code: MoneyEventValidationIssueCode;
  readonly path: string;
};

export type JsonMoneyEventEvidenceReference = {
  readonly receiptId?: string;
  readonly rawLocator?: string;
  readonly sourceRecordId?: string;
  readonly contentHash?: string;
  readonly role: string;
};

export type JsonMoneyEventSourceIdentity = {
  readonly sourceId: string;
  readonly sourceType: string;
  readonly sourceRecordId?: string;
  readonly sourceSystemName?: string;
};

export type JsonMoneyEvent = {
  readonly id: string;
  readonly contractVersion: string;
  readonly kind: string;
  readonly source: JsonMoneyEventSourceIdentity;
  readonly evidence: readonly JsonMoneyEventEvidenceReference[];
  readonly provenance: {
    readonly source: JsonMoneyEventSourceIdentity;
    readonly evidence: readonly JsonMoneyEventEvidenceReference[];
    readonly observedAt: string;
    readonly derivedBy: string;
  };
  readonly amount: {
    readonly minorUnits: string;
    readonly currency: string;
    readonly representation: string;
  };
  readonly primaryParty: { readonly partyId: string; readonly role: string };
  readonly relatedParties: readonly {
    readonly partyId: string;
    readonly role: string;
  }[];
  readonly object: { readonly objectId: string; readonly objectType: string };
  readonly eventTime: string | null;
  readonly observedTime: string;
  readonly idempotencyKey: string;
  readonly relationships: readonly {
    readonly relationship: string;
    readonly eventId?: string;
    readonly object?: {
      readonly objectId: string;
      readonly objectType: string;
    };
  }[];
  readonly lifecycleState: string;
  readonly uncertainty: {
    readonly state: string;
    readonly reasons: readonly string[];
    readonly evidence: readonly JsonMoneyEventEvidenceReference[];
  };
};

export type ValidFixtureCase = FixtureCaseBase & {
  readonly expectation: {
    readonly outcome: "valid";
    readonly normalized: JsonMoneyEvent;
  };
};

export type InvalidFixtureCase = FixtureCaseBase & {
  readonly expectation: {
    readonly outcome: "invalid";
    readonly issues: readonly ExpectedIssue[];
  };
};

type FixtureCaseBase = {
  readonly fixtureId: string;
  readonly category: string;
  readonly coverageTags: readonly string[];
  readonly evidenceType: string;
  readonly sourceSystem: string;
  readonly rawEvidenceReferences: readonly string[];
  readonly candidate: UnknownRecord;
};

export type FixtureCase = ValidFixtureCase | InvalidFixtureCase;

export type FixtureManifest = {
  readonly schemaVersion: "m03.05-money-event-fixtures.v1";
  readonly status: "controlled-synthetic-fixtures";
  readonly description: string;
  readonly deterministic: true;
  readonly financialTruth: false;
  readonly cases: readonly FixtureCase[];
};

const ISSUE_CODES = new Set<MoneyEventValidationIssueCode>([
  "currency_required",
  "evidence_locator_required",
  "evidence_required",
  "invalid_currency",
  "invalid_hash",
  "invalid_identifier",
  "invalid_minor_units",
  "invalid_object",
  "invalid_reason",
  "invalid_timestamp",
  "invalid_type",
  "invalid_uncertainty",
  "provenance_mismatch",
  "relationship_target_required",
  "required_field",
  "uncertainty_reason_required",
  "unknown_field",
  "unsupported_contract_version",
  "unsupported_transformation_boundary",
  "unsupported_value",
]);

const ROOT_FIELDS = [
  "schemaVersion",
  "status",
  "description",
  "deterministic",
  "financialTruth",
  "cases",
] as const;
const CASE_FIELDS = [
  "fixtureId",
  "category",
  "coverageTags",
  "evidenceType",
  "sourceSystem",
  "rawEvidenceReferences",
  "candidate",
  "expectation",
] as const;
const MONEY_EVENT_FIELDS = [
  "id",
  "contractVersion",
  "kind",
  "source",
  "evidence",
  "provenance",
  "amount",
  "primaryParty",
  "relatedParties",
  "object",
  "eventTime",
  "observedTime",
  "idempotencyKey",
  "relationships",
  "lifecycleState",
  "uncertainty",
] as const;
const SOURCE_FIELDS = [
  "sourceId",
  "sourceType",
  "sourceRecordId",
  "sourceSystemName",
] as const;
const EVIDENCE_FIELDS = [
  "receiptId",
  "rawLocator",
  "sourceRecordId",
  "contentHash",
  "role",
] as const;
const PROVENANCE_FIELDS = [
  "source",
  "evidence",
  "observedAt",
  "derivedBy",
] as const;
const AMOUNT_FIELDS = ["minorUnits", "currency", "representation"] as const;
const PARTY_FIELDS = ["partyId", "role"] as const;
const OBJECT_FIELDS = ["objectId", "objectType"] as const;
const RELATIONSHIP_FIELDS = ["relationship", "eventId", "object"] as const;
const UNCERTAINTY_FIELDS = ["state", "reasons", "evidence"] as const;

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
  if (unknown.length > 0) {
    fail(`${path}.${unknown[0]}`, "unknown field");
  }
}

function stringValue(value: unknown, path: string): string {
  if (typeof value !== "string" || value.length === 0) {
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

function arrayValue(value: unknown, path: string): readonly unknown[] {
  if (!Array.isArray(value)) fail(path, "expected array");
  return value;
}

function stringArray(
  value: unknown,
  path: string,
  options: { readonly nonEmpty?: boolean; readonly unique?: boolean } = {},
): readonly string[] {
  const result = arrayValue(value, path).map((item, index) =>
    stringValue(item, `${path}[${index}]`),
  );
  if (options.nonEmpty === true && result.length === 0) {
    fail(path, "expected non-empty array");
  }
  if (options.unique === true && new Set(result).size !== result.length) {
    fail(path, "duplicate values are not allowed");
  }
  return result;
}

function parseSource(
  value: unknown,
  path: string,
): JsonMoneyEventSourceIdentity {
  const source = record(value, path);
  exactFields(source, path, SOURCE_FIELDS.slice(0, 2), SOURCE_FIELDS.slice(2));
  return {
    sourceId: stringValue(source.sourceId, `${path}.sourceId`),
    sourceType: stringValue(source.sourceType, `${path}.sourceType`),
    ...(source.sourceRecordId === undefined
      ? {}
      : {
          sourceRecordId: stringValue(
            source.sourceRecordId,
            `${path}.sourceRecordId`,
          ),
        }),
    ...(source.sourceSystemName === undefined
      ? {}
      : {
          sourceSystemName: stringValue(
            source.sourceSystemName,
            `${path}.sourceSystemName`,
          ),
        }),
  };
}

function parseEvidence(
  value: unknown,
  path: string,
): JsonMoneyEventEvidenceReference {
  const evidence = record(value, path);
  exactFields(evidence, path, ["role"], EVIDENCE_FIELDS.slice(0, 4));
  const optionalString = (key: string): Record<string, string> =>
    evidence[key] === undefined
      ? {}
      : { [key]: stringValue(evidence[key], `${path}.${key}`) };
  return {
    ...optionalString("receiptId"),
    ...optionalString("rawLocator"),
    ...optionalString("sourceRecordId"),
    ...optionalString("contentHash"),
    role: stringValue(evidence.role, `${path}.role`),
  };
}

function parseEvidenceArray(
  value: unknown,
  path: string,
): readonly JsonMoneyEventEvidenceReference[] {
  return arrayValue(value, path).map((item, index) =>
    parseEvidence(item, `${path}[${index}]`),
  );
}

function parseParty(
  value: unknown,
  path: string,
): { readonly partyId: string; readonly role: string } {
  const party = record(value, path);
  exactFields(party, path, PARTY_FIELDS);
  return {
    partyId: stringValue(party.partyId, `${path}.partyId`),
    role: stringValue(party.role, `${path}.role`),
  };
}

function parseObject(
  value: unknown,
  path: string,
): { readonly objectId: string; readonly objectType: string } {
  const object = record(value, path);
  exactFields(object, path, OBJECT_FIELDS);
  return {
    objectId: stringValue(object.objectId, `${path}.objectId`),
    objectType: stringValue(object.objectType, `${path}.objectType`),
  };
}

function parseNormalized(value: unknown, path: string): JsonMoneyEvent {
  const event = record(value, path);
  exactFields(event, path, MONEY_EVENT_FIELDS);

  const provenance = record(event.provenance, `${path}.provenance`);
  exactFields(provenance, `${path}.provenance`, PROVENANCE_FIELDS);
  const amount = record(event.amount, `${path}.amount`);
  exactFields(amount, `${path}.amount`, AMOUNT_FIELDS);
  const uncertainty = record(event.uncertainty, `${path}.uncertainty`);
  exactFields(uncertainty, `${path}.uncertainty`, UNCERTAINTY_FIELDS);

  const eventTime = event.eventTime;
  if (eventTime !== null && typeof eventTime !== "string") {
    fail(`${path}.eventTime`, "expected string or null");
  }

  return {
    id: stringValue(event.id, `${path}.id`),
    contractVersion: stringValue(
      event.contractVersion,
      `${path}.contractVersion`,
    ),
    kind: stringValue(event.kind, `${path}.kind`),
    source: parseSource(event.source, `${path}.source`),
    evidence: parseEvidenceArray(event.evidence, `${path}.evidence`),
    provenance: {
      source: parseSource(provenance.source, `${path}.provenance.source`),
      evidence: parseEvidenceArray(
        provenance.evidence,
        `${path}.provenance.evidence`,
      ),
      observedAt: stringValue(
        provenance.observedAt,
        `${path}.provenance.observedAt`,
      ),
      derivedBy: stringValue(
        provenance.derivedBy,
        `${path}.provenance.derivedBy`,
      ),
    },
    amount: {
      minorUnits: stringValue(amount.minorUnits, `${path}.amount.minorUnits`),
      currency: stringValue(amount.currency, `${path}.amount.currency`),
      representation: stringValue(
        amount.representation,
        `${path}.amount.representation`,
      ),
    },
    primaryParty: parseParty(event.primaryParty, `${path}.primaryParty`),
    relatedParties: arrayValue(
      event.relatedParties,
      `${path}.relatedParties`,
    ).map((party, index) =>
      parseParty(party, `${path}.relatedParties[${index}]`),
    ),
    object: parseObject(event.object, `${path}.object`),
    eventTime,
    observedTime: stringValue(event.observedTime, `${path}.observedTime`),
    idempotencyKey: stringValue(event.idempotencyKey, `${path}.idempotencyKey`),
    relationships: arrayValue(event.relationships, `${path}.relationships`).map(
      (value, index) => {
        const relationshipPath = `${path}.relationships[${index}]`;
        const relationship = record(value, relationshipPath);
        exactFields(
          relationship,
          relationshipPath,
          RELATIONSHIP_FIELDS.slice(0, 1),
          RELATIONSHIP_FIELDS.slice(1),
        );
        return {
          relationship: stringValue(
            relationship.relationship,
            `${relationshipPath}.relationship`,
          ),
          ...(relationship.eventId === undefined
            ? {}
            : {
                eventId: stringValue(
                  relationship.eventId,
                  `${relationshipPath}.eventId`,
                ),
              }),
          ...(relationship.object === undefined
            ? {}
            : {
                object: parseObject(
                  relationship.object,
                  `${relationshipPath}.object`,
                ),
              }),
        };
      },
    ),
    lifecycleState: stringValue(event.lifecycleState, `${path}.lifecycleState`),
    uncertainty: {
      state: stringValue(uncertainty.state, `${path}.uncertainty.state`),
      reasons: stringArray(uncertainty.reasons, `${path}.uncertainty.reasons`),
      evidence: parseEvidenceArray(
        uncertainty.evidence,
        `${path}.uncertainty.evidence`,
      ),
    },
  };
}

function parseIssue(value: unknown, path: string): ExpectedIssue {
  const issue = record(value, path);
  exactFields(issue, path, ["code", "path"]);
  const code = stringValue(issue.code, `${path}.code`);
  if (!ISSUE_CODES.has(code as MoneyEventValidationIssueCode)) {
    fail(`${path}.code`, "unsupported validation issue code");
  }
  const issuePath = stringValue(issue.path, `${path}.path`);
  if (!/^\$(?:\.[A-Za-z][A-Za-z0-9]*|\[[0-9]+\])*$/u.test(issuePath)) {
    fail(`${path}.path`, "invalid validation issue path");
  }
  return { code: code as MoneyEventValidationIssueCode, path: issuePath };
}

function parseCase(value: unknown, index: number): FixtureCase {
  const path = `$.cases[${index}]`;
  const fixture = record(value, path);
  exactFields(fixture, path, CASE_FIELDS);
  const fixtureId = stringValue(fixture.fixtureId, `${path}.fixtureId`);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/u.test(fixtureId)) {
    fail(`${path}.fixtureId`, "invalid fixture ID");
  }
  const sourceSystem = stringValue(
    fixture.sourceSystem,
    `${path}.sourceSystem`,
  );
  if (!/^controlled-[a-z0-9-]+$/u.test(sourceSystem)) {
    fail(`${path}.sourceSystem`, "source must be controlled synthetic data");
  }
  const candidate = record(fixture.candidate, `${path}.candidate`);
  const expectation = record(fixture.expectation, `${path}.expectation`);
  const outcome = stringValue(
    expectation.outcome,
    `${path}.expectation.outcome`,
  );

  const base: FixtureCaseBase = {
    fixtureId,
    category: stringValue(fixture.category, `${path}.category`),
    coverageTags: stringArray(fixture.coverageTags, `${path}.coverageTags`, {
      nonEmpty: true,
      unique: true,
    }),
    evidenceType: stringValue(fixture.evidenceType, `${path}.evidenceType`),
    sourceSystem,
    rawEvidenceReferences: stringArray(
      fixture.rawEvidenceReferences,
      `${path}.rawEvidenceReferences`,
      { nonEmpty: true, unique: true },
    ),
    candidate,
  };

  if (outcome === "valid") {
    exactFields(expectation, `${path}.expectation`, ["outcome", "normalized"]);
    return {
      ...base,
      expectation: {
        outcome,
        normalized: parseNormalized(
          expectation.normalized,
          `${path}.expectation.normalized`,
        ),
      },
    };
  }
  if (outcome === "invalid") {
    exactFields(expectation, `${path}.expectation`, ["outcome", "issues"]);
    const issues = arrayValue(
      expectation.issues,
      `${path}.expectation.issues`,
    ).map((issue, issueIndex) =>
      parseIssue(issue, `${path}.expectation.issues[${issueIndex}]`),
    );
    if (issues.length === 0) {
      fail(`${path}.expectation.issues`, "expected non-empty issue list");
    }
    const keys = issues.map((issue) => `${issue.path}\u0000${issue.code}`);
    if (new Set(keys).size !== keys.length) {
      fail(`${path}.expectation.issues`, "duplicate issues are not allowed");
    }
    return { ...base, expectation: { outcome, issues } };
  }
  fail(`${path}.expectation.outcome`, "unsupported expectation outcome");
}

export function parseMoneyEventFixtureManifest(
  value: unknown,
): FixtureManifest {
  const manifest = record(value, "$");
  exactFields(manifest, "$", ROOT_FIELDS);
  literal(
    manifest.schemaVersion,
    "m03.05-money-event-fixtures.v1",
    "$.schemaVersion",
  );
  literal(manifest.status, "controlled-synthetic-fixtures", "$.status");
  const description = stringValue(manifest.description, "$.description");
  literal(manifest.deterministic, true, "$.deterministic");
  literal(manifest.financialTruth, false, "$.financialTruth");
  const cases = arrayValue(manifest.cases, "$.cases").map(parseCase);
  if (cases.length === 0) fail("$.cases", "expected non-empty array");
  const fixtureIds = cases.map((fixture) => fixture.fixtureId);
  if (new Set(fixtureIds).size !== fixtureIds.length) {
    fail("$.cases", "duplicate fixture IDs are not allowed");
  }
  return {
    schemaVersion: "m03.05-money-event-fixtures.v1",
    status: "controlled-synthetic-fixtures",
    description,
    deterministic: true,
    financialTruth: false,
    cases,
  };
}

export function toJsonSafeMoneyEvent(value: unknown): unknown {
  if (typeof value === "bigint") return value.toString();
  if (Array.isArray(value)) return value.map(toJsonSafeMoneyEvent);
  if (typeof value !== "object" || value === null) return value;
  return Object.fromEntries(
    Object.entries(value).map(([key, item]) => [
      key,
      toJsonSafeMoneyEvent(item),
    ]),
  );
}
