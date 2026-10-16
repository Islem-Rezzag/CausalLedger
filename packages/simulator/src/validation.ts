import { createHash } from "node:crypto";
import { SIMULATOR_LIMITS, SIMULATOR_MANIFEST_VERSION } from "./contract.js";
import type {
  SimulatorIssueCode,
  SimulatorValidationIssue,
  SimulatorValidationResult,
  SyntheticDelivery,
  SyntheticSourceRecord,
} from "./contract.js";
type Data = Record<string, unknown>;
type Issue = (code: SimulatorIssueCode, path: string) => void;
const ROOT_FIELDS = [
  "schemaVersion",
  "synthetic",
  "scenarioId",
  "generatorVersion",
  "observationCutoff",
  "sourceRecords",
  "deliveries",
] as const;
const SOURCE_FIELDS = [
  "sourceId",
  "sourceType",
  "sourceOccurrenceId",
  "sourceRecordId",
  "eventTime",
  "payload",
] as const;
const PAYLOAD_FIELDS = ["encoding", "mediaType", "text", "sha256"] as const;
const DELIVERY_FIELDS = [
  "deliveryId",
  "receiptDescriptorId",
  "sourceId",
  "sourceOccurrenceId",
  "sourceRecordId",
  "observedAt",
  "deliveryOrder",
] as const;

// Read own data descriptors without evaluating supplied getters.
function object(
  input: unknown,
  fields: readonly string[],
  path: string,
  issue: Issue,
): Data | undefined {
  if (
    typeof input !== "object" ||
    input === null ||
    ![Object.prototype, null].includes(Object.getPrototypeOf(input))
  ) {
    issue("invalid_object", path);
    return;
  }
  const descriptors = Object.getOwnPropertyDescriptors(input);
  const data: Data = Object.create(null) as Data;
  const keys = Reflect.ownKeys(descriptors);
  if (keys.some((key) => typeof key !== "string")) {
    issue("invalid_object", path);
    return;
  }
  for (const key of (keys as string[]).sort()) {
    const descriptor = descriptors[key];
    if (!descriptor || !("value" in descriptor) || !descriptor.enumerable) {
      issue("invalid_object", path);
      return;
    }
    if (!fields.includes(key)) issue("unknown_field", path + "." + key);
    data[key] = descriptor.value;
  }
  for (const key of fields)
    if (!Object.hasOwn(data, key)) issue("missing_field", path + "." + key);
  return data;
}

function array(
  input: unknown,
  limit: number,
  path: string,
  issue: Issue,
): readonly unknown[] | undefined {
  if (
    !Array.isArray(input) ||
    Object.getPrototypeOf(input) !== Array.prototype
  ) {
    issue("invalid_array", path);
    return;
  }
  const descriptors = Object.getOwnPropertyDescriptors(
    input,
  ) as unknown as Record<string, PropertyDescriptor>;
  const length = descriptors.length?.value as unknown;
  if (
    typeof length !== "number" ||
    !Number.isSafeInteger(length) ||
    length < 0 ||
    length > limit
  ) {
    issue("invalid_array", path);
    return;
  }
  if (
    Reflect.ownKeys(descriptors).some(
      (key) =>
        typeof key !== "string" ||
        (key !== "length" &&
          (!Number.isSafeInteger(Number(key)) ||
            Number(key) < 0 ||
            Number(key) >= length ||
            String(Number(key)) !== key)),
    )
  ) {
    issue("invalid_array", path);
    return;
  }
  const values: unknown[] = [];
  for (let i = 0; i < length; i++) {
    const entry = descriptors[String(i)];
    if (!entry || !("value" in entry) || !entry.enumerable) {
      issue("invalid_array", path);
      return;
    }
    values.push(entry.value);
  }
  return values;
}

function identity(value: unknown, prefix: string, path: string, issue: Issue) {
  if (
    typeof value !== "string" ||
    new RegExp("^sim_" + prefix + "_[A-Za-z0-9][A-Za-z0-9_-]{0,63}$").exec(
      value,
    )?.[0] !== value
  ) {
    issue("invalid_identity", path);
    return false;
  }
  return true;
}

function timestamp(value: unknown, path: string, issue: Issue) {
  const match =
    typeof value === "string"
      ? /^([0-9]{4})-([0-9]{2})-([0-9]{2})T([0-9]{2}):([0-9]{2}):([0-9]{2})(?:\.[0-9]{3})?Z$/.exec(
          value,
        )
      : null;
  if (!match || match[0] !== value) {
    issue("invalid_timestamp", path);
    return false;
  }
  const [year, month, day, hour, minute, second] = match
    .slice(1, 7)
    .map((part) => Number(part));
  const leap = year! % 4 === 0 && (year! % 100 !== 0 || year! % 400 === 0);
  const days = [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (
    year! < 1 ||
    month! < 1 ||
    month! > 12 ||
    day! < 1 ||
    day! > days[month! - 1]! ||
    hour! > 23 ||
    minute! > 59 ||
    second! > 59
  ) {
    issue("invalid_timestamp", path);
    return false;
  }
  return true;
}

function wellFormedUtf16(text: string) {
  for (let i = 0; i < text.length; i++) {
    const unit = text.charCodeAt(i);
    if (unit >= 0xd800 && unit <= 0xdbff) {
      const low = text.charCodeAt(++i);
      if (!(low >= 0xdc00 && low <= 0xdfff)) return false;
    } else if (unit >= 0xdc00 && unit <= 0xdfff) return false;
  }
  return true;
}

function payload(input: unknown, path: string, issue: Issue) {
  const data = object(input, PAYLOAD_FIELDS, path, issue);
  if (!data) return;
  if (
    data.encoding !== "utf-8" ||
    !["application/json", "text/csv", "text/plain"].includes(
      data.mediaType as string,
    )
  )
    issue("invalid_payload", path);
  const text = data.text,
    hash = data.sha256;
  if (
    typeof text !== "string" ||
    text.length > SIMULATOR_LIMITS.payloadCodeUnits ||
    !wellFormedUtf16(text)
  ) {
    issue("invalid_payload", path + ".text");
    return;
  }
  if (
    typeof hash !== "string" ||
    !/^[0-9a-f]{64}$/.test(hash) ||
    hash.length !== 64
  ) {
    issue("invalid_payload", path + ".sha256");
    return;
  }
  if (createHash("sha256").update(text, "utf8").digest("hex") !== hash) {
    issue("hash_mismatch", path + ".sha256");
    return;
  }
  return Object.freeze({
    encoding: "utf-8" as const,
    mediaType: data.mediaType as "application/json" | "text/csv" | "text/plain",
    text,
    sha256: hash,
  });
}

function validate(input: unknown): SimulatorValidationResult {
  const issues: SimulatorValidationIssue[] = [];
  const issue: Issue = (code, path) =>
    issues.push(Object.freeze({ code, path }));
  const root = object(input, ROOT_FIELDS, "$", issue);
  if (!root) return Object.freeze({ ok: false, issues: Object.freeze(issues) });
  if (root.schemaVersion !== SIMULATOR_MANIFEST_VERSION)
    issue("invalid_value", "$.schemaVersion");
  if (root.synthetic !== true) issue("invalid_value", "$.synthetic");
  identity(root.scenarioId, "scenario", "$.scenarioId", issue);
  if (
    typeof root.generatorVersion !== "string" ||
    /^[a-z][a-z0-9.-]{0,63}$/.exec(root.generatorVersion)?.[0] !==
      root.generatorVersion
  )
    issue("invalid_value", "$.generatorVersion");
  timestamp(root.observationCutoff, "$.observationCutoff", issue);
  const sources = array(
    root.sourceRecords,
    SIMULATOR_LIMITS.sourceRecords,
    "$.sourceRecords",
    issue,
  );
  const deliveries = array(
    root.deliveries,
    SIMULATOR_LIMITS.deliveries,
    "$.deliveries",
    issue,
  );
  const outputSources: SyntheticSourceRecord[] = [];
  const outputDeliveries: SyntheticDelivery[] = [];
  const records = new Map<string, Data>(),
    sourceTypes = new Map<string, unknown>();
  for (const [index, candidate] of (sources ?? []).entries()) {
    const path = "$.sourceRecords[" + index + "]";
    const data = object(candidate, SOURCE_FIELDS, path, issue);
    if (!data) continue;
    identity(data.sourceId, "source", path + ".sourceId", issue);
    identity(
      data.sourceOccurrenceId,
      "occ",
      path + ".sourceOccurrenceId",
      issue,
    );
    const recordValid = identity(
      data.sourceRecordId,
      "record",
      path + ".sourceRecordId",
      issue,
    );
    if (data.sourceType !== "provider" && data.sourceType !== "bank")
      issue("invalid_value", path + ".sourceType");
    if (typeof data.sourceId === "string") {
      if (
        sourceTypes.has(data.sourceId) &&
        sourceTypes.get(data.sourceId) !== data.sourceType
      )
        issue("invalid_reference", path + ".sourceId");
      sourceTypes.set(data.sourceId, data.sourceType);
    }
    if (data.eventTime !== null)
      timestamp(data.eventTime, path + ".eventTime", issue);
    const checkedPayload = payload(data.payload, path + ".payload", issue);
    if (recordValid) {
      const id = data.sourceRecordId as string;
      if (records.has(id))
        issue("duplicate_identity", path + ".sourceRecordId");
      else records.set(id, data);
    }
    if (checkedPayload)
      outputSources.push(
        Object.freeze({
          sourceId: data.sourceId as string,
          sourceType: data.sourceType as "provider" | "bank",
          sourceOccurrenceId: data.sourceOccurrenceId as string,
          sourceRecordId: data.sourceRecordId as string,
          eventTime: data.eventTime as string | null,
          payload: checkedPayload,
        }),
      );
  }
  const deliveryIds = new Set<string>(),
    receiptIds = new Set<string>(),
    orders = new Set<number>();
  for (const [index, candidate] of (deliveries ?? []).entries()) {
    const path = "$.deliveries[" + index + "]",
      data = object(candidate, DELIVERY_FIELDS, path, issue);
    if (!data) continue;
    for (const [key, prefix] of [
      ["deliveryId", "delivery"],
      ["receiptDescriptorId", "receipt"],
      ["sourceId", "source"],
      ["sourceOccurrenceId", "occ"],
      ["sourceRecordId", "record"],
    ])
      identity(data[key!], prefix!, path + "." + key, issue);
    timestamp(data.observedAt, path + ".observedAt", issue);
    const order = data.deliveryOrder;
    if (
      typeof order !== "number" ||
      !Number.isSafeInteger(order) ||
      order < 0 ||
      Object.is(order, -0)
    )
      issue("invalid_value", path + ".deliveryOrder");
    else {
      if (orders.has(order))
        issue("duplicate_identity", path + ".deliveryOrder");
      orders.add(order);
    }
    for (const [key, set] of [
      ["deliveryId", deliveryIds],
      ["receiptDescriptorId", receiptIds],
    ] as const) {
      const id = data[key];
      if (typeof id === "string") {
        if (set.has(id)) issue("duplicate_identity", path + "." + key);
        set.add(id);
      }
    }
    const record = records.get(data.sourceRecordId as string);
    if (
      !record ||
      record.sourceId !== data.sourceId ||
      record.sourceOccurrenceId !== data.sourceOccurrenceId
    )
      issue("invalid_reference", path + ".sourceRecordId");
    outputDeliveries.push(
      Object.freeze({
        deliveryId: data.deliveryId as string,
        receiptDescriptorId: data.receiptDescriptorId as string,
        sourceId: data.sourceId as string,
        sourceOccurrenceId: data.sourceOccurrenceId as string,
        sourceRecordId: data.sourceRecordId as string,
        observedAt: data.observedAt as string,
        deliveryOrder: data.deliveryOrder as number,
      }),
    );
  }
  if (issues.length)
    return Object.freeze({ ok: false, issues: Object.freeze(issues) });
  return Object.freeze({
    ok: true,
    value: Object.freeze({
      schemaVersion: SIMULATOR_MANIFEST_VERSION,
      synthetic: true,
      scenarioId: root.scenarioId as string,
      generatorVersion: root.generatorVersion as string,
      observationCutoff: root.observationCutoff as string,
      sourceRecords: Object.freeze(outputSources),
      deliveries: Object.freeze(outputDeliveries),
    }),
    issues: Object.freeze([]) as readonly [],
  });
}

/** Checks descriptions and byte integrity; never generates or ingests evidence. */
export function validateSimulatorManifest(
  input: unknown,
): SimulatorValidationResult {
  try {
    return validate(input);
  } catch {
    // Descriptor/prototype traps from a hostile non-JSON input cannot escape.
    return Object.freeze({
      ok: false,
      issues: Object.freeze([
        Object.freeze({ code: "invalid_object" as const, path: "$" }),
      ]),
    });
  }
}
