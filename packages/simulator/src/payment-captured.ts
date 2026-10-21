import { createHash } from "node:crypto";
import { SIMULATOR_MANIFEST_VERSION } from "./contract.js";
import type { SimulatorManifest } from "./contract.js";
import { validateSimulatorManifest } from "./validation.js";
import {
  generatePaymentAuthorized,
  PAYMENT_AUTHORIZED_REQUEST_VERSION,
  PAYMENT_AUTHORIZED_GENERATOR_VERSION,
} from "./payment-authorized.js";
import type {
  PaymentAuthorizedIssue,
  PaymentAuthorizedResult,
} from "./payment-authorized.js";

export const PAYMENT_CAPTURED_REQUEST_VERSION =
  "m05.03-payment-captured-request.v1" as const;
export const PAYMENT_CAPTURED_RECORD_VERSION =
  "m05.03-payment-captured-record.v1" as const;
export const PAYMENT_CAPTURED_GENERATOR_VERSION =
  "m05.03-payment-captured.v1" as const;
export type PaymentCapturedIssue = PaymentAuthorizedIssue;
export type PaymentCapturedResult = PaymentAuthorizedResult;
export type PaymentCapturedRequest = {
  readonly schemaVersion: typeof PAYMENT_CAPTURED_REQUEST_VERSION;
  readonly synthetic: true;
  readonly scenarioId: string;
  readonly observationCutoff: string;
  readonly sourceId: string;
  readonly sourceOccurrenceId: string;
  readonly sourceRecordId: string;
  readonly eventTime: string;
  readonly deliveryId: string;
  readonly receiptDescriptorId: string;
  readonly observedAt: string;
  readonly deliveryOrder: number;
  readonly providerId: string;
  readonly merchantId: string;
  readonly payerId: string;
  readonly paymentId: string;
  readonly authorizationId: string;
  readonly captureId: string;
  readonly amountMinorUnits: string;
  readonly currency: string;
  readonly authorizationManifest: SimulatorManifest;
};
const fields = [
  "schemaVersion",
  "synthetic",
  "scenarioId",
  "observationCutoff",
  "sourceId",
  "sourceOccurrenceId",
  "sourceRecordId",
  "eventTime",
  "deliveryId",
  "receiptDescriptorId",
  "observedAt",
  "deliveryOrder",
  "providerId",
  "merchantId",
  "payerId",
  "paymentId",
  "authorizationId",
  "captureId",
  "amountMinorUnits",
  "currency",
  "authorizationManifest",
] as const;
function issue(
  issues: PaymentCapturedIssue[],
  code: PaymentCapturedIssue["code"],
  path: string,
) {
  issues.push(Object.freeze({ code, path }));
}
function failure(issues: PaymentCapturedIssue[]): PaymentCapturedResult {
  return Object.freeze({ ok: false, issues: Object.freeze(issues) });
}
/** Snapshot own enumerable data exactly once; accessors are never evaluated. */
function snapshot(
  input: unknown,
  keys: readonly string[],
  path: string,
  issues: PaymentAuthorizedIssue[],
): Record<string, unknown> | null {
  try {
    if (
      typeof input !== "object" ||
      input === null ||
      (Object.getPrototypeOf(input) !== Object.prototype &&
        Object.getPrototypeOf(input) !== null)
    ) {
      issue(issues, "invalid_object", path);
      return null;
    }
    const descriptors = Object.getOwnPropertyDescriptors(input);
    const names = Reflect.ownKeys(descriptors);
    if (
      names.some(
        (key) =>
          typeof key !== "string" ||
          !descriptors[key]?.enumerable ||
          !("value" in descriptors[key]),
      )
    ) {
      issue(issues, "invalid_object", path);
      return null;
    }
    const result: Record<string, unknown> = Object.create(null) as Record<
      string,
      unknown
    >;
    for (const key of (names as string[])
      .filter((key) => !keys.includes(key))
      .sort())
      issue(issues, "unknown_field", path + "." + key);
    for (const key of keys) {
      const descriptor = descriptors[key];
      if (!descriptor) issue(issues, "missing_field", path + "." + key);
      else result[key] = descriptor.value as unknown;
    }
    return result;
  } catch {
    issue(issues, "invalid_object", path);
    return null;
  }
}
function roleId(input: unknown, prefix: string): input is string {
  if (typeof input !== "string" || !input.startsWith(prefix)) return false;
  const suffix = input.slice(prefix.length);
  return (
    suffix.length >= 1 &&
    suffix.length <= 64 &&
    /^[A-Za-z0-9][A-Za-z0-9_-]*$/.exec(suffix)?.[0] === suffix
  );
}

function priorPath(path: string): string {
  return "$.authorizationManifest" + path.slice(1);
}
function object(input: unknown): input is Record<string, unknown> {
  return typeof input === "object" && input !== null && !Array.isArray(input);
}
// Validated canonical UTC strings compare as instants after adding omitted .000.
function instant(value: string): string {
  return value.length === 20 ? value.slice(0, -1) + ".000Z" : value;
}
/** Compose synthetic evidence for one capture; no funds, ledger or consumed budget. */
export function generatePaymentCaptured(input: unknown): PaymentCapturedResult {
  const issues: PaymentCapturedIssue[] = [];
  const request = snapshot(input, fields, "$", issues);
  if (!request || issues.length) return failure(issues);
  if (request.schemaVersion !== PAYMENT_CAPTURED_REQUEST_VERSION)
    issue(issues, "invalid_value", "$.schemaVersion");
  if (request.synthetic !== true) issue(issues, "invalid_value", "$.synthetic");
  if (!roleId(request.captureId, "sim_capture_"))
    issue(issues, "invalid_identity", "$.captureId");
  if (issues.length) return failure(issues);
  const prior = validateSimulatorManifest(request.authorizationManifest);
  if (!prior.ok) {
    for (const entry of prior.issues)
      issue(issues, entry.code, priorPath(entry.path));
    return failure(issues);
  }
  const authorization = prior.value;
  const original = authorization.sourceRecords[0];
  const delivery = authorization.deliveries[0];
  const badPrior = (): PaymentCapturedResult =>
    failure(
      [
        {
          code: "invalid_payload",
          path: "$.authorizationManifest.sourceRecords[0].payload",
        },
      ].map((entry) => Object.freeze(entry as PaymentCapturedIssue)),
    );
  if (
    authorization.generatorVersion !== PAYMENT_AUTHORIZED_GENERATOR_VERSION ||
    authorization.sourceRecords.length !== 1 ||
    authorization.deliveries.length !== 1 ||
    !original ||
    !delivery ||
    original.sourceType !== "provider" ||
    original.payload.mediaType !== "application/json"
  )
    return badPrior();
  let body: unknown;
  try {
    body = JSON.parse(original.payload.text) as unknown;
  } catch {
    return badPrior();
  }
  if (!object(body) || !object(body.amount)) return badPrior();
  const context = {
    sourceId: original.sourceId,
    providerId: body.providerId,
    merchantId: body.merchantId,
    payerId: body.payerId,
    paymentId: body.paymentId,
    currency: body.amount.currency,
  };
  // Regeneration pins the complete owned02 wire, not merely its recomputable hash.
  const regenerated = generatePaymentAuthorized({
    schemaVersion: PAYMENT_AUTHORIZED_REQUEST_VERSION,
    synthetic: true,
    scenarioId: authorization.scenarioId,
    observationCutoff: authorization.observationCutoff,
    sourceId: original.sourceId,
    sourceOccurrenceId: original.sourceOccurrenceId,
    sourceRecordId: original.sourceRecordId,
    eventTime: original.eventTime,
    deliveryId: delivery.deliveryId,
    receiptDescriptorId: delivery.receiptDescriptorId,
    observedAt: delivery.observedAt,
    deliveryOrder: delivery.deliveryOrder,
    providerId: body.providerId,
    merchantId: body.merchantId,
    payerId: body.payerId,
    paymentId: body.paymentId,
    authorizationId: body.authorizationId,
    amountMinorUnits: body.amount.minorUnits,
    currency: body.amount.currency,
    context,
  });
  if (
    !regenerated.ok ||
    JSON.stringify(regenerated.value) !== JSON.stringify(authorization)
  )
    return badPrior();
  const probe = generatePaymentAuthorized({
    schemaVersion: PAYMENT_AUTHORIZED_REQUEST_VERSION,
    synthetic: request.synthetic,
    scenarioId: request.scenarioId,
    observationCutoff: request.observationCutoff,
    sourceId: request.sourceId,
    sourceOccurrenceId: request.sourceOccurrenceId,
    sourceRecordId: request.sourceRecordId,
    eventTime: request.eventTime,
    deliveryId: request.deliveryId,
    receiptDescriptorId: request.receiptDescriptorId,
    observedAt: request.observedAt,
    deliveryOrder: request.deliveryOrder,
    providerId: request.providerId,
    merchantId: request.merchantId,
    payerId: request.payerId,
    paymentId: request.paymentId,
    authorizationId: request.authorizationId,
    amountMinorUnits: request.amountMinorUnits,
    currency: request.currency,
    context,
  });
  if (!probe.ok) {
    for (const entry of probe.issues)
      issue(issues, entry.code, entry.path.replace(/^\$\.context\./, "$."));
    return failure(issues);
  }
  if (request.authorizationId !== body.authorizationId)
    issue(issues, "invalid_reference", "$.authorizationId");
  if (request.sourceOccurrenceId === original.sourceOccurrenceId)
    issue(issues, "invalid_reference", "$.sourceOccurrenceId");
  // Probe/regeneration have already validated these positive decimal strings.
  if (
    BigInt(request.amountMinorUnits as string) >
    BigInt(body.amount.minorUnits as string)
  )
    issue(issues, "invalid_amount", "$.amountMinorUnits");
  if (
    instant(request.eventTime as string) < instant(original.eventTime as string)
  )
    issue(issues, "invalid_value", "$.eventTime");
  if (issues.length) return failure(issues);
  const text = JSON.stringify({
    schemaVersion: PAYMENT_CAPTURED_RECORD_VERSION,
    synthetic: true,
    eventType: "payment_captured",
    sourceId: request.sourceId,
    sourceOccurrenceId: request.sourceOccurrenceId,
    providerId: request.providerId,
    paymentId: request.paymentId,
    authorizationId: request.authorizationId,
    captureId: request.captureId,
    merchantId: request.merchantId,
    payerId: request.payerId,
    amount: {
      minorUnits: request.amountMinorUnits,
      currency: request.currency,
      representation: "integer_minor_units",
    },
    authorizationReference: {
      sourceId: original.sourceId,
      sourceOccurrenceId: original.sourceOccurrenceId,
      payloadSha256: original.payload.sha256,
    },
    eventTime: request.eventTime,
  });
  const capture = probe.value.sourceRecords[0]!;
  const combined = validateSimulatorManifest({
    schemaVersion: SIMULATOR_MANIFEST_VERSION,
    synthetic: true,
    scenarioId: request.scenarioId,
    generatorVersion: PAYMENT_CAPTURED_GENERATOR_VERSION,
    observationCutoff: request.observationCutoff,
    sourceRecords: [
      original,
      {
        ...capture,
        payload: {
          encoding: "utf-8",
          mediaType: "application/json",
          text,
          sha256: createHash("sha256").update(text, "utf8").digest("hex"),
        },
      },
    ],
    deliveries: [delivery, probe.value.deliveries[0]!],
  });
  if (!combined.ok) {
    for (const entry of combined.issues)
      issue(
        issues,
        entry.code,
        entry.path.replace(/^\$\.(?:sourceRecords|deliveries)\[1\]\./, "$."),
      );
    return failure(issues);
  }
  return combined;
}
