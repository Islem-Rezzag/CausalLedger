import {
  MONEY_EVENT_EVIDENCE_ROLES,
  MONEY_EVENT_KINDS,
  MONEY_EVENT_LIFECYCLE_STATES,
  MONEY_EVENT_OBJECT_TYPES,
  MONEY_EVENT_PARTY_ROLES,
  MONEY_EVENT_RELATIONSHIP_TYPES,
  MONEY_EVENT_RUNTIME_BOUNDARY_VERSION,
  MONEY_EVENT_SOURCE_TYPES,
  MONEY_EVENT_TRANSFORMATION_BOUNDARY,
  MONEY_EVENT_UNCERTAINTY_STATES,
  type EvidenceReceiptId,
  type FinancialObjectReferenceId,
  type Iso4217CurrencyCode,
  type IsoDateTimeString,
  type MoneyAmountMinorUnits,
  type MoneyEvent,
  type MoneyEventAmount,
  type MoneyEventEvidenceReference,
  type MoneyEventEvidenceRole,
  type MoneyEventId,
  type MoneyEventIdempotencyKey,
  type MoneyEventKind,
  type MoneyEventLifecycleState,
  type MoneyEventObjectReference,
  type MoneyEventObjectType,
  type MoneyEventPartyReference,
  type MoneyEventPartyRole,
  type MoneyEventProvenance,
  type MoneyEventRelationshipReference,
  type MoneyEventRelationshipType,
  type MoneyEventSourceIdentity,
  type MoneyEventSourceType,
  type MoneyEventUncertainty,
  type MoneyEventUncertaintyState,
  type PartyReferenceId,
  type RawEvidenceLocator,
  type Sha256ContentHash,
  type SourceId,
  type SourceRecordId,
} from "./money-event.js";

export interface MoneyEventSourceIdentityCandidate {
  readonly sourceId: string;
  readonly sourceType: string;
  readonly sourceRecordId?: string;
  readonly sourceSystemName?: string;
}

export interface MoneyEventEvidenceReferenceCandidate {
  readonly receiptId?: string;
  readonly rawLocator?: string;
  readonly sourceRecordId?: string;
  readonly contentHash?: string;
  readonly role: string;
}

export interface MoneyEventProvenanceCandidate {
  readonly source: MoneyEventSourceIdentityCandidate;
  readonly evidence: readonly MoneyEventEvidenceReferenceCandidate[];
  readonly observedAt: string;
  readonly derivedBy: string;
}

export interface MoneyEventAmountCandidate {
  readonly minorUnits: string;
  readonly currency: string;
  readonly representation: string;
}

export interface MoneyEventPartyReferenceCandidate {
  readonly partyId: string;
  readonly role: string;
}

export interface MoneyEventObjectReferenceCandidate {
  readonly objectId: string;
  readonly objectType: string;
}

export interface MoneyEventRelationshipReferenceCandidate {
  readonly relationship: string;
  readonly eventId?: string;
  readonly object?: MoneyEventObjectReferenceCandidate;
}

export interface MoneyEventUncertaintyCandidate {
  readonly state: string;
  readonly reasons: readonly string[];
  readonly evidence: readonly MoneyEventEvidenceReferenceCandidate[];
}

export interface MoneyEventCandidate {
  readonly id: string;
  readonly contractVersion: string;
  readonly kind: string;
  readonly source: MoneyEventSourceIdentityCandidate;
  readonly evidence: readonly MoneyEventEvidenceReferenceCandidate[];
  readonly provenance: MoneyEventProvenanceCandidate;
  readonly amount: MoneyEventAmountCandidate;
  readonly primaryParty: MoneyEventPartyReferenceCandidate;
  readonly relatedParties: readonly MoneyEventPartyReferenceCandidate[];
  readonly object: MoneyEventObjectReferenceCandidate;
  readonly eventTime: string | null;
  readonly observedTime: string;
  readonly idempotencyKey: string;
  readonly relationships: readonly MoneyEventRelationshipReferenceCandidate[];
  readonly lifecycleState: string;
  readonly uncertainty: MoneyEventUncertaintyCandidate;
}

export type MoneyEventValidationIssueCode =
  | "currency_required"
  | "evidence_locator_required"
  | "evidence_required"
  | "invalid_currency"
  | "invalid_hash"
  | "invalid_identifier"
  | "invalid_minor_units"
  | "invalid_object"
  | "invalid_reason"
  | "invalid_timestamp"
  | "invalid_type"
  | "invalid_uncertainty"
  | "provenance_mismatch"
  | "relationship_target_required"
  | "required_field"
  | "uncertainty_reason_required"
  | "unknown_field"
  | "unsupported_contract_version"
  | "unsupported_transformation_boundary"
  | "unsupported_value";

export interface MoneyEventValidationIssue {
  readonly code: MoneyEventValidationIssueCode;
  readonly path: string;
  readonly message: string;
}

export type MoneyEventValidationResult =
  | {
      readonly ok: true;
      readonly issues: readonly [];
    }
  | {
      readonly ok: false;
      readonly issues: readonly MoneyEventValidationIssue[];
    };

export type MoneyEventNormalizationResult =
  | {
      readonly ok: true;
      readonly value: MoneyEvent;
      readonly issues: readonly [];
    }
  | {
      readonly ok: false;
      readonly issues: readonly MoneyEventValidationIssue[];
    };

type UnknownRecord = Record<string, unknown>;

interface InternalNormalizationResult {
  readonly issues: readonly MoneyEventValidationIssue[];
  readonly value?: MoneyEvent;
}

const ROOT_FIELDS = [
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

const CANONICAL_INTEGER_PATTERN = /^(?:0|-?[1-9][0-9]*)$/;
const SHA_256_PATTERN = /^sha256:[0-9a-f]{64}$/;
const RFC_3339_PATTERN =
  /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d{1,3}))?(Z|([+-])(\d{2}):(\d{2}))$/;

function addIssue(
  issues: MoneyEventValidationIssue[],
  code: MoneyEventValidationIssueCode,
  path: string,
  message: string,
): void {
  issues.push({ code, path, message });
}

function sortIssues(
  issues: readonly MoneyEventValidationIssue[],
): readonly MoneyEventValidationIssue[] {
  return [...issues].sort(
    (left, right) =>
      compareStrings(left.path, right.path) ||
      compareStrings(left.code, right.code) ||
      compareStrings(left.message, right.message),
  );
}

function compareStrings(left: string, right: string): number {
  return left < right ? -1 : left > right ? 1 : 0;
}

function isPlainObject(value: unknown): value is UnknownRecord {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return false;
  }
  const prototype = Object.getPrototypeOf(value) as object | null;
  return prototype === Object.prototype || prototype === null;
}

function hasOwn(record: UnknownRecord, key: string): boolean {
  return Object.prototype.hasOwnProperty.call(record, key);
}

function inspectObject(
  value: unknown,
  path: string,
  allowedFields: readonly string[],
  requiredFields: readonly string[],
  issues: MoneyEventValidationIssue[],
): UnknownRecord | undefined {
  if (!isPlainObject(value)) {
    addIssue(issues, "invalid_object", path, "Expected a plain object.");
    return undefined;
  }

  const allowed = new Set(allowedFields);
  for (const key of Object.keys(value).sort()) {
    if (!allowed.has(key)) {
      addIssue(
        issues,
        "unknown_field",
        `${path}.${key}`,
        "Unknown fields are not allowed.",
      );
    }
  }
  for (const key of requiredFields) {
    if (!hasOwn(value, key)) {
      addIssue(
        issues,
        "required_field",
        `${path}.${key}`,
        "Required field is missing.",
      );
    }
  }
  return value;
}

function readString(
  record: UnknownRecord,
  key: string,
  path: string,
  issues: MoneyEventValidationIssue[],
  options: { readonly trim: boolean; readonly nonEmpty: boolean },
): string | undefined {
  if (!hasOwn(record, key)) {
    return undefined;
  }
  const value = record[key];
  if (typeof value !== "string") {
    addIssue(issues, "invalid_type", path, "Expected a string.");
    return undefined;
  }
  const normalized = options.trim ? value.trim() : value;
  if (options.nonEmpty && normalized.length === 0) {
    addIssue(issues, "invalid_identifier", path, "Value must not be empty.");
    return undefined;
  }
  return normalized;
}

function isAllowed<TValue extends string>(
  value: string,
  values: readonly TValue[],
): value is TValue {
  return (values as readonly string[]).includes(value);
}

function normalizeSourceIdentity(
  value: unknown,
  path: string,
  issues: MoneyEventValidationIssue[],
): MoneyEventSourceIdentity | undefined {
  const record = inspectObject(
    value,
    path,
    SOURCE_FIELDS,
    ["sourceId", "sourceType"],
    issues,
  );
  if (record === undefined) return undefined;

  const sourceId = readString(record, "sourceId", `${path}.sourceId`, issues, {
    trim: true,
    nonEmpty: true,
  });
  const sourceTypeValue = readString(
    record,
    "sourceType",
    `${path}.sourceType`,
    issues,
    { trim: false, nonEmpty: true },
  );
  let sourceType: MoneyEventSourceType | undefined;
  if (
    sourceTypeValue !== undefined &&
    isAllowed(sourceTypeValue, MONEY_EVENT_SOURCE_TYPES)
  ) {
    sourceType = sourceTypeValue;
  } else if (sourceTypeValue !== undefined) {
    addIssue(
      issues,
      "unsupported_value",
      `${path}.sourceType`,
      "Unsupported MoneyEvent source type.",
    );
  }

  const sourceRecordId = hasOwn(record, "sourceRecordId")
    ? readString(record, "sourceRecordId", `${path}.sourceRecordId`, issues, {
        trim: true,
        nonEmpty: true,
      })
    : undefined;
  const sourceSystemName = hasOwn(record, "sourceSystemName")
    ? readString(
        record,
        "sourceSystemName",
        `${path}.sourceSystemName`,
        issues,
        { trim: true, nonEmpty: true },
      )
    : undefined;

  if (sourceId === undefined || sourceType === undefined) return undefined;
  return {
    sourceId: sourceId as SourceId,
    sourceType,
    ...(sourceRecordId === undefined
      ? {}
      : { sourceRecordId: sourceRecordId as SourceRecordId }),
    ...(sourceSystemName === undefined ? {} : { sourceSystemName }),
  };
}

function normalizePrefixedId(
  value: unknown,
  path: string,
  prefix: "evt_" | "rcpt_",
  issues: MoneyEventValidationIssue[],
): string | undefined {
  if (typeof value !== "string") {
    addIssue(issues, "invalid_type", path, "Expected a string identifier.");
    return undefined;
  }
  const normalized = value.trim();
  if (!normalized.startsWith(prefix) || normalized.length === prefix.length) {
    addIssue(
      issues,
      "invalid_identifier",
      path,
      `Identifier must use the ${prefix} prefix with a non-empty suffix.`,
    );
    return undefined;
  }
  if (/\s/.test(normalized)) {
    addIssue(
      issues,
      "invalid_identifier",
      path,
      "Identifier must not contain whitespace.",
    );
    return undefined;
  }
  return normalized;
}

function evidenceReferenceKey(reference: MoneyEventEvidenceReference): string {
  return JSON.stringify([
    reference.role,
    reference.receiptId ?? null,
    reference.rawLocator ?? null,
    reference.sourceRecordId ?? null,
    reference.contentHash ?? null,
  ]);
}

function canonicalizeEvidenceReferences(
  references: readonly MoneyEventEvidenceReference[],
): readonly MoneyEventEvidenceReference[] {
  const unique = new Map<string, MoneyEventEvidenceReference>();
  for (const reference of references) {
    const key = evidenceReferenceKey(reference);
    if (!unique.has(key)) unique.set(key, reference);
  }
  return [...unique.entries()]
    .sort(([left], [right]) => compareStrings(left, right))
    .map(([, reference]) => reference);
}

function normalizeEvidenceReference(
  value: unknown,
  path: string,
  issues: MoneyEventValidationIssue[],
): MoneyEventEvidenceReference | undefined {
  const record = inspectObject(value, path, EVIDENCE_FIELDS, ["role"], issues);
  if (record === undefined) return undefined;

  const roleValue = readString(record, "role", `${path}.role`, issues, {
    trim: false,
    nonEmpty: true,
  });
  let role: MoneyEventEvidenceRole | undefined;
  if (
    roleValue !== undefined &&
    isAllowed(roleValue, MONEY_EVENT_EVIDENCE_ROLES)
  ) {
    role = roleValue;
  } else if (roleValue !== undefined) {
    addIssue(
      issues,
      "unsupported_value",
      `${path}.role`,
      "Unsupported evidence-reference role.",
    );
  }

  let receiptId: string | undefined;
  if (hasOwn(record, "receiptId")) {
    receiptId = normalizePrefixedId(
      record.receiptId,
      `${path}.receiptId`,
      "rcpt_",
      issues,
    );
  }
  const rawLocator = hasOwn(record, "rawLocator")
    ? readString(record, "rawLocator", `${path}.rawLocator`, issues, {
        trim: true,
        nonEmpty: true,
      })
    : undefined;
  const sourceRecordId = hasOwn(record, "sourceRecordId")
    ? readString(record, "sourceRecordId", `${path}.sourceRecordId`, issues, {
        trim: true,
        nonEmpty: true,
      })
    : undefined;

  let contentHash: string | undefined;
  if (hasOwn(record, "contentHash")) {
    const hashValue = readString(
      record,
      "contentHash",
      `${path}.contentHash`,
      issues,
      { trim: false, nonEmpty: true },
    );
    if (hashValue !== undefined && SHA_256_PATTERN.test(hashValue)) {
      contentHash = hashValue;
    } else if (hashValue !== undefined) {
      addIssue(
        issues,
        "invalid_hash",
        `${path}.contentHash`,
        "SHA-256 references must use sha256: followed by 64 lowercase hexadecimal characters.",
      );
    }
  }

  if (
    receiptId === undefined &&
    rawLocator === undefined &&
    sourceRecordId === undefined &&
    contentHash === undefined
  ) {
    addIssue(
      issues,
      "evidence_locator_required",
      path,
      "Evidence reference requires at least one usable identifier or locator.",
    );
  }

  if (
    role === undefined ||
    (receiptId === undefined &&
      rawLocator === undefined &&
      sourceRecordId === undefined &&
      contentHash === undefined)
  ) {
    return undefined;
  }

  return {
    role,
    ...(receiptId === undefined
      ? {}
      : { receiptId: receiptId as EvidenceReceiptId }),
    ...(rawLocator === undefined
      ? {}
      : { rawLocator: rawLocator as RawEvidenceLocator }),
    ...(sourceRecordId === undefined
      ? {}
      : { sourceRecordId: sourceRecordId as SourceRecordId }),
    ...(contentHash === undefined
      ? {}
      : { contentHash: contentHash as Sha256ContentHash }),
  };
}

function normalizeEvidenceArray(
  value: unknown,
  path: string,
  issues: MoneyEventValidationIssue[],
  requireNonEmpty: boolean,
): readonly MoneyEventEvidenceReference[] | undefined {
  if (!Array.isArray(value)) {
    addIssue(issues, "invalid_type", path, "Expected an array.");
    return undefined;
  }
  const references: MoneyEventEvidenceReference[] = [];
  value.forEach((item, index) => {
    const reference = normalizeEvidenceReference(
      item,
      `${path}[${index}]`,
      issues,
    );
    if (reference !== undefined) references.push(reference);
  });
  const canonicalReferences = canonicalizeEvidenceReferences(references);
  if (
    requireNonEmpty &&
    !canonicalReferences.some(
      (reference) =>
        reference.role === "primary" || reference.role === "supporting",
    )
  ) {
    addIssue(
      issues,
      "evidence_required",
      path,
      "At least one primary or supporting evidence reference is required.",
    );
  }
  return canonicalReferences;
}

function sourceIdentityKey(source: MoneyEventSourceIdentity): string {
  return JSON.stringify([
    source.sourceId,
    source.sourceType,
    source.sourceRecordId ?? null,
    source.sourceSystemName ?? null,
  ]);
}

function normalizeMoneyAmount(
  value: unknown,
  path: string,
  issues: MoneyEventValidationIssue[],
): MoneyEventAmount | undefined {
  const record = inspectObject(
    value,
    path,
    AMOUNT_FIELDS,
    ["minorUnits", "representation"],
    issues,
  );
  if (record === undefined) return undefined;

  const minorUnitsValue = readString(
    record,
    "minorUnits",
    `${path}.minorUnits`,
    issues,
    { trim: false, nonEmpty: true },
  );
  let minorUnits: bigint | undefined;
  if (
    minorUnitsValue !== undefined &&
    CANONICAL_INTEGER_PATTERN.test(minorUnitsValue)
  ) {
    minorUnits = BigInt(minorUnitsValue);
  } else if (minorUnitsValue !== undefined) {
    addIssue(
      issues,
      "invalid_minor_units",
      `${path}.minorUnits`,
      "Minor units must be a canonical base-10 integer string.",
    );
  }

  let currency: string | undefined;
  if (!hasOwn(record, "currency")) {
    addIssue(
      issues,
      "currency_required",
      `${path}.currency`,
      "Currency is required whenever an amount is present.",
    );
  } else {
    const currencyValue = readString(
      record,
      "currency",
      `${path}.currency`,
      issues,
      { trim: true, nonEmpty: true },
    );
    if (currencyValue !== undefined) {
      const upperCurrency = currencyValue.toUpperCase();
      if (/^[A-Z]{3}$/.test(upperCurrency)) {
        currency = upperCurrency;
      } else {
        addIssue(
          issues,
          "invalid_currency",
          `${path}.currency`,
          "Currency must contain exactly three ASCII letters.",
        );
      }
    }
  }

  const representation = readString(
    record,
    "representation",
    `${path}.representation`,
    issues,
    { trim: false, nonEmpty: true },
  );
  if (
    representation !== undefined &&
    representation !== "integer_minor_units"
  ) {
    addIssue(
      issues,
      "unsupported_value",
      `${path}.representation`,
      "Money representation must be integer_minor_units.",
    );
  }

  if (
    minorUnits === undefined ||
    currency === undefined ||
    representation !== "integer_minor_units"
  ) {
    return undefined;
  }
  return {
    minorUnits: minorUnits as MoneyAmountMinorUnits,
    currency: currency as Iso4217CurrencyCode,
    representation,
  };
}

function normalizePartyReference(
  value: unknown,
  path: string,
  issues: MoneyEventValidationIssue[],
): MoneyEventPartyReference | undefined {
  const record = inspectObject(value, path, PARTY_FIELDS, PARTY_FIELDS, issues);
  if (record === undefined) return undefined;
  const partyId = readString(record, "partyId", `${path}.partyId`, issues, {
    trim: true,
    nonEmpty: true,
  });
  const roleValue = readString(record, "role", `${path}.role`, issues, {
    trim: false,
    nonEmpty: true,
  });
  let role: MoneyEventPartyRole | undefined;
  if (
    roleValue !== undefined &&
    isAllowed(roleValue, MONEY_EVENT_PARTY_ROLES)
  ) {
    role = roleValue;
  } else if (roleValue !== undefined) {
    addIssue(
      issues,
      "unsupported_value",
      `${path}.role`,
      "Unsupported party role.",
    );
  }
  if (partyId === undefined || role === undefined) return undefined;
  return { partyId: partyId as PartyReferenceId, role };
}

function normalizeObjectReference(
  value: unknown,
  path: string,
  issues: MoneyEventValidationIssue[],
): MoneyEventObjectReference | undefined {
  const record = inspectObject(
    value,
    path,
    OBJECT_FIELDS,
    OBJECT_FIELDS,
    issues,
  );
  if (record === undefined) return undefined;
  const objectId = readString(record, "objectId", `${path}.objectId`, issues, {
    trim: true,
    nonEmpty: true,
  });
  const objectTypeValue = readString(
    record,
    "objectType",
    `${path}.objectType`,
    issues,
    { trim: false, nonEmpty: true },
  );
  let objectType: MoneyEventObjectType | undefined;
  if (
    objectTypeValue !== undefined &&
    isAllowed(objectTypeValue, MONEY_EVENT_OBJECT_TYPES)
  ) {
    objectType = objectTypeValue;
  } else if (objectTypeValue !== undefined) {
    addIssue(
      issues,
      "unsupported_value",
      `${path}.objectType`,
      "Unsupported financial object type.",
    );
  }
  if (objectId === undefined || objectType === undefined) return undefined;
  return { objectId: objectId as FinancialObjectReferenceId, objectType };
}

function normalizeTimestamp(
  value: unknown,
  path: string,
  issues: MoneyEventValidationIssue[],
  allowNull: boolean,
): IsoDateTimeString | null | undefined {
  if (value === null && allowNull) return null;
  if (typeof value !== "string") {
    addIssue(
      issues,
      "invalid_timestamp",
      path,
      allowNull
        ? "Expected an RFC 3339 timestamp or null."
        : "Expected an RFC 3339 timestamp.",
    );
    return undefined;
  }
  const normalized = value.trim();
  const match = RFC_3339_PATTERN.exec(normalized);
  if (match === null) {
    addIssue(
      issues,
      "invalid_timestamp",
      path,
      "Timestamp must be RFC 3339 with an explicit UTC or numeric offset.",
    );
    return undefined;
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const hour = Number(match[4]);
  const minute = Number(match[5]);
  const second = Number(match[6]);
  const millisecond = Number((match[7] ?? "0").padEnd(3, "0"));
  const offsetHour = Number(match[10] ?? "0");
  const offsetMinute = Number(match[11] ?? "0");
  const leapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  const daysInMonth = [
    31,
    leapYear ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];
  const validDate =
    month >= 1 &&
    month <= 12 &&
    day >= 1 &&
    day <= (daysInMonth[month - 1] ?? 0) &&
    hour <= 23 &&
    minute <= 59 &&
    second <= 59 &&
    offsetHour <= 23 &&
    offsetMinute <= 59;
  if (!validDate) {
    addIssue(
      issues,
      "invalid_timestamp",
      path,
      "Timestamp is not a valid date-time.",
    );
    return undefined;
  }

  const utc = new Date(0);
  utc.setUTCFullYear(year, month - 1, day);
  utc.setUTCHours(hour, minute, second, millisecond);
  const offsetSign = match[9] === "-" ? -1 : 1;
  const offsetMilliseconds =
    match[8] === "Z"
      ? 0
      : offsetSign * (offsetHour * 60 + offsetMinute) * 60_000;
  const instant = new Date(utc.getTime() - offsetMilliseconds);
  if (!Number.isFinite(instant.getTime())) {
    addIssue(
      issues,
      "invalid_timestamp",
      path,
      "Timestamp is outside the supported range.",
    );
    return undefined;
  }
  const canonicalTimestamp = instant.toISOString();
  if (!/^\d{4}-/.test(canonicalTimestamp)) {
    addIssue(
      issues,
      "invalid_timestamp",
      path,
      "Timestamp normalizes outside the supported four-digit RFC 3339 year range.",
    );
    return undefined;
  }
  return canonicalTimestamp as IsoDateTimeString;
}

function normalizeProvenance(
  value: unknown,
  path: string,
  issues: MoneyEventValidationIssue[],
): MoneyEventProvenance | undefined {
  const record = inspectObject(
    value,
    path,
    PROVENANCE_FIELDS,
    PROVENANCE_FIELDS,
    issues,
  );
  if (record === undefined) return undefined;
  const source = normalizeSourceIdentity(
    record.source,
    `${path}.source`,
    issues,
  );
  const evidence = normalizeEvidenceArray(
    record.evidence,
    `${path}.evidence`,
    issues,
    true,
  );
  const observedAt = normalizeTimestamp(
    record.observedAt,
    `${path}.observedAt`,
    issues,
    false,
  );
  const derivedBy = readString(
    record,
    "derivedBy",
    `${path}.derivedBy`,
    issues,
    { trim: false, nonEmpty: true },
  );
  if (
    derivedBy !== undefined &&
    derivedBy !== MONEY_EVENT_TRANSFORMATION_BOUNDARY
  ) {
    addIssue(
      issues,
      "unsupported_transformation_boundary",
      `${path}.derivedBy`,
      "Unsupported provenance transformation boundary.",
    );
  }
  if (
    source === undefined ||
    evidence === undefined ||
    observedAt === undefined ||
    observedAt === null ||
    derivedBy !== MONEY_EVENT_TRANSFORMATION_BOUNDARY
  ) {
    return undefined;
  }
  return { source, evidence, observedAt, derivedBy };
}

function normalizePartyArray(
  value: unknown,
  path: string,
  issues: MoneyEventValidationIssue[],
): readonly MoneyEventPartyReference[] | undefined {
  if (!Array.isArray(value)) {
    addIssue(issues, "invalid_type", path, "Expected an array.");
    return undefined;
  }
  const parties: MoneyEventPartyReference[] = [];
  value.forEach((item, index) => {
    const party = normalizePartyReference(item, `${path}[${index}]`, issues);
    if (party !== undefined) parties.push(party);
  });
  return parties;
}

function normalizeRelationshipArray(
  value: unknown,
  path: string,
  issues: MoneyEventValidationIssue[],
): readonly MoneyEventRelationshipReference[] | undefined {
  if (!Array.isArray(value)) {
    addIssue(issues, "invalid_type", path, "Expected an array.");
    return undefined;
  }
  const relationships: MoneyEventRelationshipReference[] = [];
  value.forEach((item, index) => {
    const itemPath = `${path}[${index}]`;
    const record = inspectObject(
      item,
      itemPath,
      RELATIONSHIP_FIELDS,
      ["relationship"],
      issues,
    );
    if (record === undefined) return;
    const relationshipValue = readString(
      record,
      "relationship",
      `${itemPath}.relationship`,
      issues,
      { trim: false, nonEmpty: true },
    );
    let relationship: MoneyEventRelationshipType | undefined;
    if (
      relationshipValue !== undefined &&
      isAllowed(relationshipValue, MONEY_EVENT_RELATIONSHIP_TYPES)
    ) {
      relationship = relationshipValue;
    } else if (relationshipValue !== undefined) {
      addIssue(
        issues,
        "unsupported_value",
        `${itemPath}.relationship`,
        "Unsupported relationship type.",
      );
    }

    let eventId: string | undefined;
    if (hasOwn(record, "eventId")) {
      eventId = normalizePrefixedId(
        record.eventId,
        `${itemPath}.eventId`,
        "evt_",
        issues,
      );
    }
    const object = hasOwn(record, "object")
      ? normalizeObjectReference(record.object, `${itemPath}.object`, issues)
      : undefined;
    if (!hasOwn(record, "eventId") && !hasOwn(record, "object")) {
      addIssue(
        issues,
        "relationship_target_required",
        itemPath,
        "Relationship requires an eventId, an object reference, or both.",
      );
    }
    if (
      relationship !== undefined &&
      (eventId !== undefined || object !== undefined)
    ) {
      relationships.push({
        relationship,
        ...(eventId === undefined ? {} : { eventId: eventId as MoneyEventId }),
        ...(object === undefined ? {} : { object }),
      });
    }
  });
  return relationships;
}

function normalizeReasons(
  value: unknown,
  path: string,
  issues: MoneyEventValidationIssue[],
): readonly string[] | undefined {
  if (!Array.isArray(value)) {
    addIssue(issues, "invalid_type", path, "Expected an array of strings.");
    return undefined;
  }
  const reasons: string[] = [];
  value.forEach((item, index) => {
    const itemPath = `${path}[${index}]`;
    if (typeof item !== "string") {
      addIssue(issues, "invalid_type", itemPath, "Expected a string reason.");
      return;
    }
    const reason = item.trim();
    if (reason.length === 0) {
      addIssue(issues, "invalid_reason", itemPath, "Reason must not be empty.");
      return;
    }
    reasons.push(reason);
  });
  return reasons;
}

function normalizeUncertainty(
  value: unknown,
  path: string,
  issues: MoneyEventValidationIssue[],
): MoneyEventUncertainty | undefined {
  const record = inspectObject(
    value,
    path,
    UNCERTAINTY_FIELDS,
    UNCERTAINTY_FIELDS,
    issues,
  );
  if (record === undefined) return undefined;
  const stateValue = readString(record, "state", `${path}.state`, issues, {
    trim: false,
    nonEmpty: true,
  });
  let state: MoneyEventUncertaintyState | undefined;
  if (
    stateValue !== undefined &&
    isAllowed(stateValue, MONEY_EVENT_UNCERTAINTY_STATES)
  ) {
    state = stateValue;
  } else if (stateValue !== undefined) {
    addIssue(
      issues,
      "unsupported_value",
      `${path}.state`,
      "Unsupported uncertainty state.",
    );
  }
  const reasons = normalizeReasons(record.reasons, `${path}.reasons`, issues);
  const evidence = normalizeEvidenceArray(
    record.evidence,
    `${path}.evidence`,
    issues,
    false,
  );

  if (state === "none_known") {
    if ((reasons?.length ?? 0) !== 0 || (evidence?.length ?? 0) !== 0) {
      addIssue(
        issues,
        "invalid_uncertainty",
        path,
        "none_known uncertainty requires empty reasons and evidence arrays.",
      );
    }
  } else if (state !== undefined && (reasons?.length ?? 0) === 0) {
    addIssue(
      issues,
      "uncertainty_reason_required",
      `${path}.reasons`,
      "Uncertainty states other than none_known require at least one useful reason.",
    );
  }
  if (state === undefined || reasons === undefined || evidence === undefined) {
    return undefined;
  }
  return { state, reasons, evidence };
}

function sameEvidenceSet(
  left: readonly MoneyEventEvidenceReference[],
  right: readonly MoneyEventEvidenceReference[],
): boolean {
  return (
    left.length === right.length &&
    left.every(
      (reference, index) =>
        evidenceReferenceKey(reference) ===
        evidenceReferenceKey(right[index] as MoneyEventEvidenceReference),
    )
  );
}

function normalizeCandidate(input: unknown): InternalNormalizationResult {
  const issues: MoneyEventValidationIssue[] = [];
  const record = inspectObject(input, "$", ROOT_FIELDS, ROOT_FIELDS, issues);
  if (record === undefined) return { issues: sortIssues(issues) };

  const idValue = hasOwn(record, "id")
    ? normalizePrefixedId(record.id, "$.id", "evt_", issues)
    : undefined;

  const contractVersion = readString(
    record,
    "contractVersion",
    "$.contractVersion",
    issues,
    { trim: false, nonEmpty: true },
  );
  if (
    contractVersion !== undefined &&
    contractVersion !== MONEY_EVENT_RUNTIME_BOUNDARY_VERSION
  ) {
    addIssue(
      issues,
      "unsupported_contract_version",
      "$.contractVersion",
      "Unsupported MoneyEvent runtime contract version.",
    );
  }

  const kindValue = readString(record, "kind", "$.kind", issues, {
    trim: false,
    nonEmpty: true,
  });
  let kind: MoneyEventKind | undefined;
  if (kindValue !== undefined && isAllowed(kindValue, MONEY_EVENT_KINDS)) {
    kind = kindValue;
  } else if (kindValue !== undefined) {
    addIssue(
      issues,
      "unsupported_value",
      "$.kind",
      "Unsupported MoneyEvent kind.",
    );
  }

  const source = normalizeSourceIdentity(record.source, "$.source", issues);
  const evidence = normalizeEvidenceArray(
    record.evidence,
    "$.evidence",
    issues,
    true,
  );
  const provenance = normalizeProvenance(
    record.provenance,
    "$.provenance",
    issues,
  );
  const amount = normalizeMoneyAmount(record.amount, "$.amount", issues);
  const primaryParty = normalizePartyReference(
    record.primaryParty,
    "$.primaryParty",
    issues,
  );
  const relatedParties = normalizePartyArray(
    record.relatedParties,
    "$.relatedParties",
    issues,
  );
  const object = normalizeObjectReference(record.object, "$.object", issues);
  const eventTime = normalizeTimestamp(
    record.eventTime,
    "$.eventTime",
    issues,
    true,
  );
  const observedTime = normalizeTimestamp(
    record.observedTime,
    "$.observedTime",
    issues,
    false,
  );
  const idempotencyKey = readString(
    record,
    "idempotencyKey",
    "$.idempotencyKey",
    issues,
    { trim: true, nonEmpty: true },
  );
  const relationships = normalizeRelationshipArray(
    record.relationships,
    "$.relationships",
    issues,
  );

  const lifecycleStateValue = readString(
    record,
    "lifecycleState",
    "$.lifecycleState",
    issues,
    { trim: false, nonEmpty: true },
  );
  let lifecycleState: MoneyEventLifecycleState | undefined;
  if (
    lifecycleStateValue !== undefined &&
    isAllowed(lifecycleStateValue, MONEY_EVENT_LIFECYCLE_STATES)
  ) {
    lifecycleState = lifecycleStateValue;
  } else if (lifecycleStateValue !== undefined) {
    addIssue(
      issues,
      "unsupported_value",
      "$.lifecycleState",
      "Unsupported MoneyEvent lifecycle state.",
    );
  }
  const uncertainty = normalizeUncertainty(
    record.uncertainty,
    "$.uncertainty",
    issues,
  );

  if (
    source !== undefined &&
    provenance !== undefined &&
    sourceIdentityKey(source) !== sourceIdentityKey(provenance.source)
  ) {
    addIssue(
      issues,
      "provenance_mismatch",
      "$.provenance.source",
      "Provenance source must equal the normalized root source.",
    );
  }
  if (
    evidence !== undefined &&
    provenance !== undefined &&
    !sameEvidenceSet(evidence, provenance.evidence)
  ) {
    addIssue(
      issues,
      "provenance_mismatch",
      "$.provenance.evidence",
      "Provenance evidence must equal the normalized root evidence set.",
    );
  }
  if (
    observedTime !== undefined &&
    observedTime !== null &&
    provenance !== undefined &&
    observedTime !== provenance.observedAt
  ) {
    addIssue(
      issues,
      "provenance_mismatch",
      "$.provenance.observedAt",
      "Provenance observedAt must identify the same instant as observedTime.",
    );
  }
  if (evidence !== undefined && uncertainty !== undefined) {
    const rootKeys = new Set(evidence.map(evidenceReferenceKey));
    if (
      uncertainty.evidence.some(
        (reference) => !rootKeys.has(evidenceReferenceKey(reference)),
      )
    ) {
      addIssue(
        issues,
        "provenance_mismatch",
        "$.uncertainty.evidence",
        "Uncertainty evidence must be drawn from the normalized root evidence set.",
      );
    }
  }

  const sortedIssues = sortIssues(issues);
  if (sortedIssues.length > 0) return { issues: sortedIssues };
  if (
    idValue === undefined ||
    contractVersion !== MONEY_EVENT_RUNTIME_BOUNDARY_VERSION ||
    kind === undefined ||
    source === undefined ||
    evidence === undefined ||
    provenance === undefined ||
    amount === undefined ||
    primaryParty === undefined ||
    relatedParties === undefined ||
    object === undefined ||
    eventTime === undefined ||
    observedTime === undefined ||
    observedTime === null ||
    idempotencyKey === undefined ||
    relationships === undefined ||
    lifecycleState === undefined ||
    uncertainty === undefined
  ) {
    return {
      issues: [
        {
          code: "invalid_object",
          path: "$",
          message: "Candidate could not be normalized.",
        },
      ],
    };
  }

  return {
    issues: [],
    value: {
      id: idValue as MoneyEventId,
      contractVersion: MONEY_EVENT_RUNTIME_BOUNDARY_VERSION,
      kind,
      source,
      evidence,
      provenance,
      amount,
      primaryParty,
      relatedParties,
      object,
      eventTime,
      observedTime,
      idempotencyKey: idempotencyKey as MoneyEventIdempotencyKey,
      relationships,
      lifecycleState,
      uncertainty,
    },
  };
}

export function validateMoneyEventCandidate(
  input: unknown,
): MoneyEventValidationResult {
  const result = normalizeCandidate(input);
  return result.issues.length === 0
    ? { ok: true, issues: [] }
    : { ok: false, issues: result.issues };
}

export function normalizeMoneyEventCandidate(
  input: unknown,
): MoneyEventNormalizationResult {
  const result = normalizeCandidate(input);
  return result.value === undefined
    ? { ok: false, issues: result.issues }
    : { ok: true, value: result.value, issues: [] };
}

export function validateAndNormalizeMoneyEventCandidate(
  input: unknown,
): MoneyEventNormalizationResult {
  return normalizeMoneyEventCandidate(input);
}
