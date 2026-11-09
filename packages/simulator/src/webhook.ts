import type {
  SimulatorManifest,
  SimulatorValidationIssue,
  SyntheticDelivery,
  SyntheticSourceRecord,
} from "./contract.js";
import { validateSimulatorManifest } from "./validation.js";

export const WEBHOOK_SCENARIO_VERSION =
  "m05.11-13-webhook-scenario.v1" as const;
export const DUPLICATE_WEBHOOK_REQUEST_VERSION =
  "m05.11-duplicate-webhook-request.v1" as const;
export const FAULTY_DUPLICATE_WEBHOOK_REQUEST_VERSION =
  "m05.11-faulty-duplicate-webhook-request.v1" as const;
type Base = {
  readonly contextManifest: SimulatorManifest;
  readonly synthetic: true;
};
export type DuplicateWebhookRequest = Base & {
  readonly schemaVersion: typeof DUPLICATE_WEBHOOK_REQUEST_VERSION;
  readonly originalDeliveryId: string;
  readonly delivery: SyntheticDelivery;
};
export type FaultyDuplicateWebhookRequest = Base & {
  readonly schemaVersion: typeof FAULTY_DUPLICATE_WEBHOOK_REQUEST_VERSION;
  readonly originalDeliveryId: string;
  readonly sourceRecord: SyntheticSourceRecord;
  readonly delivery: SyntheticDelivery;
};
export type WebhookScenario = {
  readonly schemaVersion: typeof WEBHOOK_SCENARIO_VERSION;
  readonly synthetic: true;
  readonly kind: "duplicate_delivery" | "declared_faulty_occurrence";
  readonly manifest: SimulatorManifest;
  readonly reference: Readonly<{
    sourceId: string;
    sourceOccurrenceId: string;
    sourceRecordId: string;
    payloadSha256: string;
  }>;
  readonly originalDeliveryId: string;
  readonly appendedDeliveryId: string;
};
export type WebhookResult =
  | { readonly ok: true; readonly value: WebhookScenario }
  | {
      readonly ok: false;
      readonly issues: readonly SimulatorValidationIssue[];
      readonly value?: never;
    };
type Data = Record<string, unknown>;
function snapshot(input: unknown, fields: readonly string[]): Data | undefined {
  if (
    typeof input !== "object" ||
    input === null ||
    ![Object.prototype, null].includes(Object.getPrototypeOf(input))
  )
    return;
  const descriptors = Object.getOwnPropertyDescriptors(input);
  if (Reflect.ownKeys(descriptors).length !== fields.length) return;
  const result: Data = Object.create(null) as Data;
  for (const key of fields) {
    const d = descriptors[key];
    if (!d || !("value" in d) || !d.enumerable) return;
    result[key] = d.value;
  }
  return result;
}
function fail(
  code: SimulatorValidationIssue["code"],
  path: string,
): Extract<WebhookResult, { ok: false }> {
  return Object.freeze({
    ok: false,
    issues: Object.freeze([Object.freeze({ code, path })]),
  });
}
function uniqueProvider(manifest: SimulatorManifest, id: unknown) {
  const record = manifest.sourceRecords.find((r) => r.sourceRecordId === id);
  if (!record || record.sourceType !== "provider") return;
  if (
    manifest.sourceRecords.filter(
      (r) =>
        r.sourceId === record.sourceId &&
        r.sourceOccurrenceId === record.sourceOccurrenceId,
    ).length !== 1
  )
    return;
  return record;
}
function duplicate(input: unknown, faulty: boolean): WebhookResult {
  const root = snapshot(input, [
    "schemaVersion",
    "synthetic",
    "contextManifest",
    "originalDeliveryId",
    "delivery",
    ...(faulty ? ["sourceRecord"] : []),
  ]);
  if (!root) return fail("invalid_object", "$");
  if (
    root.synthetic !== true ||
    root.schemaVersion !==
      (faulty
        ? FAULTY_DUPLICATE_WEBHOOK_REQUEST_VERSION
        : DUPLICATE_WEBHOOK_REQUEST_VERSION)
  )
    return fail("invalid_value", "$");
  // Freeze all caller-owned scalar metadata before inspecting nested manifests.
  const delivery = snapshot(root.delivery, [
    "deliveryId",
    "receiptDescriptorId",
    "sourceId",
    "sourceOccurrenceId",
    "sourceRecordId",
    "observedAt",
    "deliveryOrder",
  ]);
  if (!delivery) return fail("invalid_object", "$.delivery");
  const source = faulty
    ? snapshot(root.sourceRecord, [
        "sourceId",
        "sourceType",
        "sourceOccurrenceId",
        "sourceRecordId",
        "eventTime",
        "payload",
      ])
    : undefined;
  if (faulty && !source) return fail("invalid_object", "$.sourceRecord");
  if (source) {
    const payload = snapshot(source.payload, [
      "encoding",
      "mediaType",
      "text",
      "sha256",
    ]);
    if (!payload) return fail("invalid_object", "$.sourceRecord.payload");
    source.payload = payload;
  }
  const context = validateSimulatorManifest(root.contextManifest);
  if (!context.ok) return context;
  const original = context.value.deliveries.find(
    (d) => d.deliveryId === root.originalDeliveryId,
  );
  const target = uniqueProvider(context.value, original?.sourceRecordId);
  if (!original || !target)
    return fail("invalid_reference", "$.originalDeliveryId");
  const additions = source ? [source] : [];
  const next = validateSimulatorManifest({
    ...context.value,
    sourceRecords: [...context.value.sourceRecords, ...additions],
    deliveries: [...context.value.deliveries, delivery],
  });
  if (!next.ok) return next;
  const appended = next.value.deliveries.at(-1)!;
  const selected = uniqueProvider(next.value, appended.sourceRecordId);
  if (!selected || selected.sourceId !== target.sourceId)
    return fail("invalid_reference", "$.delivery");
  if (
    faulty
      ? selected.sourceRecordId !== source!.sourceRecordId ||
        selected.sourceOccurrenceId === target.sourceOccurrenceId
      : selected.sourceRecordId !== target.sourceRecordId
  )
    return fail("invalid_reference", "$.delivery");
  return Object.freeze({
    ok: true,
    value: Object.freeze({
      schemaVersion: WEBHOOK_SCENARIO_VERSION,
      synthetic: true,
      kind: faulty ? "declared_faulty_occurrence" : "duplicate_delivery",
      manifest: next.value,
      reference: Object.freeze({
        sourceId: target.sourceId,
        sourceOccurrenceId: target.sourceOccurrenceId,
        sourceRecordId: target.sourceRecordId,
        payloadSha256: target.payload.sha256,
      }),
      originalDeliveryId: original.deliveryId,
      appendedDeliveryId: appended.deliveryId,
    }),
  });
}
/** Appends a receipt for the same provider occurrence. No deduplication or posting. */
export function generateDuplicateWebhook(input: unknown): WebhookResult {
  try {
    return duplicate(input, false);
  } catch {
    return fail("invalid_object", "$");
  }
}
/** The caller declares the economic fault; opaque source bytes do not prove it. */
export function generateFaultyDuplicateWebhook(input: unknown): WebhookResult {
  try {
    return duplicate(input, true);
  } catch {
    return fail("invalid_object", "$");
  }
}

export const DELAYED_WEBHOOK_REQUEST_VERSION =
  "m05.12-delayed-webhook-request.v1" as const;
export type DelayedWebhookRequest = Base & {
  readonly schemaVersion: typeof DELAYED_WEBHOOK_REQUEST_VERSION;
  readonly delivery: SyntheticDelivery;
};
export type WebhookObservation = {
  readonly schemaVersion: typeof WEBHOOK_SCENARIO_VERSION;
  readonly synthetic: true;
  readonly kind: "delayed_delivery";
  readonly manifest: SimulatorManifest;
  readonly expectedSource: WebhookScenario["reference"];
  readonly observationCutoff: string;
  readonly status: "observed_by_cutoff" | "after_cutoff";
  readonly appendedDeliveryId: string;
};
export type WebhookObservationResult =
  | { readonly ok: true; readonly value: WebhookObservation }
  | Extract<WebhookResult, { ok: false }>;
// Calendar validity is checked by the manifest validator; normalize only for comparison.
function instant(value: string) {
  return value.length === 20 ? value.slice(0, -1) + ".000Z" : value;
}
function delayed(input: unknown): WebhookObservationResult {
  const root = snapshot(input, [
    "schemaVersion",
    "synthetic",
    "contextManifest",
    "delivery",
  ]);
  if (!root) return fail("invalid_object", "$");
  if (
    root.synthetic !== true ||
    root.schemaVersion !== DELAYED_WEBHOOK_REQUEST_VERSION
  )
    return fail("invalid_value", "$");
  const delivery = snapshot(root.delivery, [
    "deliveryId",
    "receiptDescriptorId",
    "sourceId",
    "sourceOccurrenceId",
    "sourceRecordId",
    "observedAt",
    "deliveryOrder",
  ]);
  if (!delivery) return fail("invalid_object", "$.delivery");
  const context = validateSimulatorManifest(root.contextManifest);
  if (!context.ok) return context;
  const next = validateSimulatorManifest({
    ...context.value,
    deliveries: [...context.value.deliveries, delivery],
  });
  if (!next.ok) return next;
  const appended = next.value.deliveries.at(-1)!;
  const target = uniqueProvider(next.value, appended.sourceRecordId);
  if (!target || target.eventTime === null)
    return fail("invalid_reference", "$.delivery.sourceRecordId");
  if (instant(appended.observedAt) < instant(target.eventTime))
    return fail("invalid_timestamp", "$.delivery.observedAt");
  return Object.freeze({
    ok: true,
    value: Object.freeze({
      schemaVersion: WEBHOOK_SCENARIO_VERSION,
      synthetic: true,
      kind: "delayed_delivery",
      manifest: next.value,
      expectedSource: Object.freeze({
        sourceId: target.sourceId,
        sourceOccurrenceId: target.sourceOccurrenceId,
        sourceRecordId: target.sourceRecordId,
        payloadSha256: target.payload.sha256,
      }),
      observationCutoff: next.value.observationCutoff,
      status:
        instant(appended.observedAt) <= instant(next.value.observationCutoff)
          ? "observed_by_cutoff"
          : "after_cutoff",
      appendedDeliveryId: appended.deliveryId,
    }),
  });
}
/** Classifies the appended delivery only; retains earlier and future fixture evidence. */
export function generateDelayedWebhook(
  input: unknown,
): WebhookObservationResult {
  try {
    return delayed(input);
  } catch {
    return fail("invalid_object", "$");
  }
}

export const MISSING_WEBHOOK_REQUEST_VERSION =
  "m05.13-missing-webhook-request.v1" as const;
export type MissingWebhookRequest = Base & {
  readonly schemaVersion: typeof MISSING_WEBHOOK_REQUEST_VERSION;
  readonly expectedSourceRecordId: string;
};
export type MissingWebhookScenario = {
  readonly schemaVersion: typeof WEBHOOK_SCENARIO_VERSION;
  readonly synthetic: true;
  readonly kind: "missing_at_cutoff";
  readonly manifest: SimulatorManifest;
  readonly expectedSource: WebhookScenario["reference"];
  readonly observationCutoff: string;
  readonly status: "no_declared_delivery" | "declared_after_cutoff";
  readonly omissionDeclared: boolean;
};
export type MissingWebhookResult =
  | { readonly ok: true; readonly value: MissingWebhookScenario }
  | Extract<WebhookResult, { ok: false }>;
function missing(input: unknown): MissingWebhookResult {
  const root = snapshot(input, [
    "schemaVersion",
    "synthetic",
    "contextManifest",
    "expectedSourceRecordId",
  ]);
  if (!root) return fail("invalid_object", "$");
  if (
    root.synthetic !== true ||
    root.schemaVersion !== MISSING_WEBHOOK_REQUEST_VERSION
  )
    return fail("invalid_value", "$");
  const context = validateSimulatorManifest(root.contextManifest);
  if (!context.ok) return context;
  const target = uniqueProvider(context.value, root.expectedSourceRecordId);
  if (!target) return fail("invalid_reference", "$.expectedSourceRecordId");
  const deliveries = context.value.deliveries.filter(
    (d) => d.sourceRecordId === target.sourceRecordId,
  );
  if (
    deliveries.some(
      (d) => instant(d.observedAt) <= instant(context.value.observationCutoff),
    )
  )
    return fail("invalid_value", "$.expectedSourceRecordId");
  return Object.freeze({
    ok: true,
    value: Object.freeze({
      schemaVersion: WEBHOOK_SCENARIO_VERSION,
      synthetic: true,
      kind: "missing_at_cutoff",
      manifest: context.value,
      expectedSource: Object.freeze({
        sourceId: target.sourceId,
        sourceOccurrenceId: target.sourceOccurrenceId,
        sourceRecordId: target.sourceRecordId,
        payloadSha256: target.payload.sha256,
      }),
      observationCutoff: context.value.observationCutoff,
      status: deliveries.length
        ? "declared_after_cutoff"
        : "no_declared_delivery",
      omissionDeclared: deliveries.length === 0,
    }),
  });
}
/** Absence is only relative to the supplied fixture at cutoff, not a permanent-loss verdict. */
export function generateMissingWebhook(input: unknown): MissingWebhookResult {
  try {
    return missing(input);
  } catch {
    return fail("invalid_object", "$");
  }
}
