import { createHash } from "node:crypto";
import { SIMULATOR_MANIFEST_VERSION } from "./contract.js";
import type { SimulatorManifest, SimulatorIssueCode } from "./contract.js";
import { validateSimulatorManifest } from "./validation.js";

export const PAYMENT_AUTHORIZED_REQUEST_VERSION =
  "m05.02-payment-authorized-request.v1" as const;
export const PAYMENT_AUTHORIZED_RECORD_VERSION =
  "m05.02-payment-authorized-record.v1" as const;
export const PAYMENT_AUTHORIZED_GENERATOR_VERSION =
  "m05.02-payment-authorized.v1" as const;
export const PAYMENT_AUTHORIZED_AMOUNT_DIGITS = 128;
export type PaymentAuthorizedContext = {
  readonly sourceId: string;
  readonly providerId: string;
  readonly merchantId: string;
  readonly payerId: string;
  readonly paymentId: string;
  readonly currency: string;
};
export type PaymentAuthorizedRequest = {
  readonly schemaVersion: typeof PAYMENT_AUTHORIZED_REQUEST_VERSION;
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
  readonly amountMinorUnits: string;
  readonly currency: string;
  readonly context: PaymentAuthorizedContext;
};
export type PaymentAuthorizedIssue = {
  readonly code: SimulatorIssueCode | "invalid_amount" | "invalid_currency";
  readonly path: string;
};
export type PaymentAuthorizedResult =
  | {
      readonly ok: true;
      readonly value: SimulatorManifest;
      readonly issues: readonly [];
    }
  | {
      readonly ok: false;
      readonly issues: readonly PaymentAuthorizedIssue[];
      readonly value?: never;
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
  "amountMinorUnits",
  "currency",
  "context",
] as const;
const contextFields = [
  "sourceId",
  "providerId",
  "merchantId",
  "payerId",
  "paymentId",
  "currency",
] as const;
const roles = [
  "providerId",
  "merchantId",
  "payerId",
  "paymentId",
  "authorizationId",
] as const;
const prefixes = [
  "sim_provider_",
  "sim_merchant_",
  "sim_payer_",
  "sim_payment_",
  "sim_auth_",
] as const;
function issue(
  issues: PaymentAuthorizedIssue[],
  code: PaymentAuthorizedIssue["code"],
  path: string,
) {
  issues.push(Object.freeze({ code, path }));
}
function failure(issues: PaymentAuthorizedIssue[]): PaymentAuthorizedResult {
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
function currency(input: unknown): input is string {
  return (
    typeof input === "string" && input.length === 3 && /^[A-Z]{3}$/.test(input)
  );
}
function requestPath(path: string): string {
  return path.replace(/^\$\.(?:sourceRecords|deliveries)\[0\]\./, "$.");
}
/** Generate labelled synthetic evidence only; no external or financial authority. */
export function generatePaymentAuthorized(
  input: unknown,
): PaymentAuthorizedResult {
  const issues: PaymentAuthorizedIssue[] = [];
  const request = snapshot(input, fields, "$", issues);
  if (!request || issues.length) return failure(issues);
  const context = snapshot(request.context, contextFields, "$.context", issues);
  if (!context || issues.length) return failure(issues);
  if (request.schemaVersion !== PAYMENT_AUTHORIZED_REQUEST_VERSION)
    issue(issues, "invalid_value", "$.schemaVersion");
  if (request.synthetic !== true) issue(issues, "invalid_value", "$.synthetic");
  for (let i = 0; i < roles.length; i++) {
    const key = roles[i]!;
    if (!roleId(request[key], prefixes[i]!))
      issue(issues, "invalid_identity", "$." + key);
  }
  const amount = request.amountMinorUnits;
  if (
    typeof amount !== "string" ||
    amount.length < 1 ||
    amount.length > PAYMENT_AUTHORIZED_AMOUNT_DIGITS ||
    /^[1-9][0-9]*$/.exec(amount)?.[0] !== amount
  )
    issue(issues, "invalid_amount", "$.amountMinorUnits");
  if (!currency(request.currency))
    issue(issues, "invalid_currency", "$.currency");
  if (typeof request.eventTime !== "string")
    issue(issues, "invalid_timestamp", "$.eventTime");
  for (const key of contextFields) {
    if (typeof context[key] !== "string")
      issue(
        issues,
        key === "currency" ? "invalid_currency" : "invalid_identity",
        "$.context." + key,
      );
    else if (context[key] !== request[key])
      issue(issues, "invalid_reference", "$.context." + key);
  }
  if (issues.length) return failure(issues);
  // Delegate existing metadata semantics before serialization can see unknown objects.
  const probe = validateSimulatorManifest({
    schemaVersion: SIMULATOR_MANIFEST_VERSION,
    synthetic: true,
    scenarioId: request.scenarioId,
    generatorVersion: PAYMENT_AUTHORIZED_GENERATOR_VERSION,
    observationCutoff: request.observationCutoff,
    sourceRecords: [
      {
        sourceId: request.sourceId,
        sourceType: "provider",
        sourceOccurrenceId: request.sourceOccurrenceId,
        sourceRecordId: request.sourceRecordId,
        eventTime: request.eventTime,
        payload: {
          encoding: "utf-8",
          mediaType: "application/json",
          text: "",
          sha256:
            "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
        },
      },
    ],
    deliveries: [
      {
        deliveryId: request.deliveryId,
        receiptDescriptorId: request.receiptDescriptorId,
        sourceId: request.sourceId,
        sourceOccurrenceId: request.sourceOccurrenceId,
        sourceRecordId: request.sourceRecordId,
        observedAt: request.observedAt,
        deliveryOrder: request.deliveryOrder,
      },
    ],
  });
  if (!probe.ok) {
    for (const entry of probe.issues)
      issue(issues, entry.code, requestPath(entry.path));
    return failure(issues);
  }
  const source = probe.value.sourceRecords[0]!;
  const text = JSON.stringify({
    schemaVersion: PAYMENT_AUTHORIZED_RECORD_VERSION,
    synthetic: true,
    eventType: "payment_authorized",
    sourceId: source.sourceId,
    sourceOccurrenceId: source.sourceOccurrenceId,
    providerId: request.providerId,
    paymentId: request.paymentId,
    authorizationId: request.authorizationId,
    merchantId: request.merchantId,
    payerId: request.payerId,
    amount: {
      minorUnits: amount,
      currency: request.currency,
      representation: "integer_minor_units",
    },
    eventTime: source.eventTime,
  });
  // All fields in the raw record are now captured, validated primitives.
  return validateSimulatorManifest({
    ...probe.value,
    sourceRecords: [
      {
        ...source,
        payload: {
          encoding: "utf-8",
          mediaType: "application/json",
          text,
          sha256: createHash("sha256").update(text, "utf8").digest("hex"),
        },
      },
    ],
  });
}
