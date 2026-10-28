import { createHash } from "node:crypto";
import { SIMULATOR_MANIFEST_VERSION } from "./contract.js";
import type { SimulatorManifest, SyntheticSourceRecord } from "./contract.js";
import { validateSimulatorManifest } from "./validation.js";
import {
  generatePaymentCaptured,
  PAYMENT_CAPTURED_REQUEST_VERSION,
  PAYMENT_CAPTURED_GENERATOR_VERSION,
} from "./payment-captured.js";
import { PAYMENT_AUTHORIZED_GENERATOR_VERSION } from "./payment-authorized.js";
import type {
  PaymentAuthorizedIssue,
  PaymentAuthorizedResult,
} from "./payment-authorized.js";

export const DISPUTE_OPENED_REQUEST_VERSION =
  "m05.09-dispute-opened-request.v1" as const;
export const DISPUTE_OPENED_GENERATOR_VERSION =
  "m05.09-dispute-opened.v1" as const;
export const CHARGEBACK_FEE_REQUEST_VERSION =
  "m05.10-chargeback-fee-request.v1" as const;
export const CHARGEBACK_FEE_GENERATOR_VERSION =
  "m05.10-chargeback-fee.v1" as const;
export type DisputeResult = PaymentAuthorizedResult;
export type DisputeIssue = PaymentAuthorizedIssue;
type Common = {
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
  readonly disputeId: string;
  readonly currency: string;
  readonly contextManifest: SimulatorManifest;
};
export type DisputeOpenedRequest = Common & {
  readonly schemaVersion: typeof DISPUTE_OPENED_REQUEST_VERSION;
  readonly reason: string;
};
export type ChargebackFeeRequest = Common & {
  readonly schemaVersion: typeof CHARGEBACK_FEE_REQUEST_VERSION;
  readonly feeId: string;
  readonly feeAmountMinorUnits: string;
};
type Kind = "opened" | "fee";
const versions = {
  opened: [
    DISPUTE_OPENED_REQUEST_VERSION,
    "m05.09-dispute-opened-record.v1",
    DISPUTE_OPENED_GENERATOR_VERSION,
  ],
  fee: [
    CHARGEBACK_FEE_REQUEST_VERSION,
    "m05.10-chargeback-fee-record.v1",
    CHARGEBACK_FEE_GENERATOR_VERSION,
  ],
} as const;
const commonFields = [
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
  "disputeId",
  "currency",
  "contextManifest",
];
function add(issues: DisputeIssue[], code: DisputeIssue["code"], path: string) {
  issues.push(Object.freeze({ code, path }));
}
function failure(issues: DisputeIssue[]): DisputeResult {
  return Object.freeze({ ok: false, issues: Object.freeze(issues) });
}
function snapshot(
  input: unknown,
  keys: readonly string[],
  path: string,
  issues: DisputeIssue[],
): Record<string, unknown> | null {
  try {
    if (
      typeof input !== "object" ||
      input === null ||
      ![Object.prototype, null].includes(Object.getPrototypeOf(input))
    ) {
      add(issues, "invalid_object", path);
      return null;
    }
    const ds = Object.getOwnPropertyDescriptors(input),
      names = Reflect.ownKeys(ds);
    if (
      names.some(
        (k) =>
          typeof k !== "string" || !ds[k]?.enumerable || !("value" in ds[k]),
      )
    ) {
      add(issues, "invalid_object", path);
      return null;
    }
    const out: Record<string, unknown> = Object.create(null) as Record<
      string,
      unknown
    >;
    for (const key of (names as string[])
      .filter((k) => !keys.includes(k))
      .sort())
      add(issues, "unknown_field", path + "." + key);
    for (const key of keys) {
      const d = ds[key];
      if (!d) add(issues, "missing_field", path + "." + key);
      else out[key] = d.value as unknown;
    }
    return out;
  } catch {
    add(issues, "invalid_object", path);
    return null;
  }
}
function role(v: unknown, prefix: string): boolean {
  return (
    typeof v === "string" &&
    v.startsWith(prefix) &&
    /^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$/.exec(v.slice(prefix.length))?.[0] ===
      v.slice(prefix.length)
  );
}
function object(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}
function parse(source: SyntheticSourceRecord): Record<string, unknown> | null {
  try {
    const b: unknown = JSON.parse(source.payload.text);
    return object(b) ? b : null;
  } catch {
    return null;
  }
}
function instant(v: string): string {
  return v.length === 20 ? v.slice(0, -1) + ".000Z" : v;
}
/** Canonical owned03 regeneration, not authenticity of arbitrary provider JSON. */
function capture(input: unknown): SimulatorManifest | null {
  const checked = validateSimulatorManifest(input);
  if (!checked.ok) return null;
  const m = checked.value,
    a = m.sourceRecords[0],
    c = m.sourceRecords[1],
    ad = m.deliveries[0],
    cd = m.deliveries[1];
  if (
    m.generatorVersion !== PAYMENT_CAPTURED_GENERATOR_VERSION ||
    m.sourceRecords.length !== 2 ||
    m.deliveries.length !== 2 ||
    !a ||
    !c ||
    !ad ||
    !cd
  )
    return null;
  const b = parse(c);
  if (!b || !object(b.amount)) return null;
  const rebuilt = generatePaymentCaptured({
    schemaVersion: PAYMENT_CAPTURED_REQUEST_VERSION,
    synthetic: true,
    scenarioId: m.scenarioId,
    observationCutoff: m.observationCutoff,
    sourceId: c.sourceId,
    sourceOccurrenceId: c.sourceOccurrenceId,
    sourceRecordId: c.sourceRecordId,
    eventTime: c.eventTime,
    deliveryId: cd.deliveryId,
    receiptDescriptorId: cd.receiptDescriptorId,
    observedAt: cd.observedAt,
    deliveryOrder: cd.deliveryOrder,
    providerId: b.providerId,
    merchantId: b.merchantId,
    payerId: b.payerId,
    paymentId: b.paymentId,
    authorizationId: b.authorizationId,
    captureId: b.captureId,
    amountMinorUnits: b.amount.minorUnits,
    currency: b.amount.currency,
    authorizationManifest: {
      schemaVersion: SIMULATOR_MANIFEST_VERSION,
      synthetic: true,
      scenarioId: m.scenarioId,
      observationCutoff: m.observationCutoff,
      generatorVersion: PAYMENT_AUTHORIZED_GENERATOR_VERSION,
      sourceRecords: [a],
      deliveries: [ad],
    },
  });
  return rebuilt.ok && JSON.stringify(rebuilt.value) === JSON.stringify(m)
    ? m
    : null;
}
function metadata(r: Record<string, unknown>, kind: Kind): DisputeResult {
  return validateSimulatorManifest({
    schemaVersion: SIMULATOR_MANIFEST_VERSION,
    synthetic: true,
    scenarioId: r.scenarioId,
    generatorVersion: versions[kind][2],
    observationCutoff: r.observationCutoff,
    sourceRecords: [
      {
        sourceId: r.sourceId,
        sourceType: "provider",
        sourceOccurrenceId: r.sourceOccurrenceId,
        sourceRecordId: r.sourceRecordId,
        eventTime: r.eventTime,
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
        deliveryId: r.deliveryId,
        receiptDescriptorId: r.receiptDescriptorId,
        sourceId: r.sourceId,
        sourceOccurrenceId: r.sourceOccurrenceId,
        sourceRecordId: r.sourceRecordId,
        observedAt: r.observedAt,
        deliveryOrder: r.deliveryOrder,
      },
    ],
  });
}
function reference(s: SyntheticSourceRecord) {
  return {
    sourceId: s.sourceId,
    sourceOccurrenceId: s.sourceOccurrenceId,
    payloadSha256: s.payload.sha256,
  };
}
function reason(v: unknown): boolean {
  return (
    typeof v === "string" &&
    v.length >= 1 &&
    v.length <= 256 &&
    /^[\x20-\x7e]+$/.exec(v)?.[0] === v &&
    v.trim() === v
  );
}
function validateRequest(
  kind: Kind,
  r: Record<string, unknown>,
  issues: DisputeIssue[],
): DisputeResult | null {
  if (r.schemaVersion !== versions[kind][0])
    add(issues, "invalid_value", "$.schemaVersion");
  if (r.synthetic !== true) add(issues, "invalid_value", "$.synthetic");
  for (const [key, prefix] of [
    ["providerId", "sim_provider_"],
    ["merchantId", "sim_merchant_"],
    ["payerId", "sim_payer_"],
    ["paymentId", "sim_payment_"],
    ["authorizationId", "sim_auth_"],
    ["captureId", "sim_capture_"],
    ["disputeId", "sim_dispute_"],
  ])
    if (!role(r[key!], prefix!)) add(issues, "invalid_identity", "$." + key);
  if (
    typeof r.currency !== "string" ||
    /^[A-Z]{3}$/.exec(r.currency)?.[0] !== r.currency
  )
    add(issues, "invalid_currency", "$.currency");
  if (typeof r.eventTime !== "string")
    add(issues, "invalid_timestamp", "$.eventTime");
  if (kind === "opened") {
    if (!reason(r.reason)) add(issues, "invalid_value", "$.reason");
  } else {
    if (!role(r.feeId, "sim_fee_")) add(issues, "invalid_identity", "$.feeId");
    const v = r.feeAmountMinorUnits;
    if (
      typeof v !== "string" ||
      v.length > 128 ||
      /^[1-9][0-9]*$/.exec(v)?.[0] !== v
    )
      add(issues, "invalid_amount", "$.feeAmountMinorUnits");
  }
  if (issues.length) return null;
  const probe = metadata(r, kind);
  if (!probe.ok) {
    for (const e of probe.issues)
      add(
        issues,
        e.code,
        e.path.replace(/^\$\.(?:sourceRecords|deliveries)\[0\]\./, "$."),
      );
    return null;
  }
  return probe;
}
function append(
  kind: Kind,
  r: Record<string, unknown>,
  m: SimulatorManifest,
  probe: SimulatorManifest,
): DisputeResult {
  const issues: DisputeIssue[] = [];
  const captured = m.sourceRecords[1]!;
  const b = parse(captured)!;
  const amount = b.amount as Record<string, unknown>;
  for (const key of [
    "sourceId",
    "providerId",
    "merchantId",
    "payerId",
    "paymentId",
    "authorizationId",
    "captureId",
  ])
    if ((key === "sourceId" ? captured.sourceId : b[key]) !== r[key])
      add(issues, "invalid_reference", "$." + key);
  if (m.scenarioId !== r.scenarioId)
    add(issues, "invalid_reference", "$.scenarioId");
  if (amount.currency !== r.currency)
    add(issues, "invalid_reference", "$.currency");
  const parent = kind === "opened" ? captured : m.sourceRecords[2]!;
  if (kind === "fee" && parse(parent)!.disputeId !== r.disputeId)
    add(issues, "invalid_reference", "$.disputeId");
  if (instant(r.eventTime as string) < instant(parent.eventTime!))
    add(issues, "invalid_value", "$.eventTime");
  if (
    m.sourceRecords.some(
      (s) =>
        s.sourceId === r.sourceId &&
        s.sourceOccurrenceId === r.sourceOccurrenceId,
    )
  )
    add(issues, "duplicate_identity", "$.sourceOccurrenceId");
  if (issues.length) return failure(issues);
  const text = JSON.stringify({
    schemaVersion: versions[kind][1],
    synthetic: true,
    eventType: kind === "opened" ? "dispute_opened" : "chargeback_fee",
    sourceId: r.sourceId,
    sourceOccurrenceId: r.sourceOccurrenceId,
    providerId: r.providerId,
    merchantId: r.merchantId,
    payerId: r.payerId,
    paymentId: r.paymentId,
    authorizationId: r.authorizationId,
    captureId: r.captureId,
    disputeId: r.disputeId,
    ...(kind === "opened"
      ? { reason: r.reason, currency: r.currency }
      : {
          feeId: r.feeId,
          fee: {
            minorUnits: r.feeAmountMinorUnits,
            currency: r.currency,
            representation: "integer_minor_units",
          },
        }),
    captureReference: reference(captured),
    ...(kind === "fee" ? { disputeReference: reference(parent) } : {}),
    eventTime: r.eventTime,
  });
  return validateSimulatorManifest({
    ...probe,
    sourceRecords: [
      ...m.sourceRecords,
      {
        ...probe.sourceRecords[0]!,
        payload: {
          encoding: "utf-8",
          mediaType: "application/json",
          text,
          sha256: createHash("sha256").update(text, "utf8").digest("hex"),
        },
      },
    ],
    deliveries: [...m.deliveries, probe.deliveries[0]!],
  });
}
/** Fixed-depth canonical reconstruction of one opened dispute, not authenticity. */
function openedContext(input: unknown): SimulatorManifest | null {
  const checked = validateSimulatorManifest(input);
  if (!checked.ok) return null;
  const m = checked.value;
  if (
    m.generatorVersion !== DISPUTE_OPENED_GENERATOR_VERSION ||
    m.sourceRecords.length !== 3 ||
    m.deliveries.length !== 3
  )
    return null;
  const s = m.sourceRecords[2]!,
    d = m.deliveries[2]!,
    b = parse(s);
  if (!b) return null;
  const result = run("opened", {
    schemaVersion: DISPUTE_OPENED_REQUEST_VERSION,
    synthetic: true,
    scenarioId: m.scenarioId,
    observationCutoff: m.observationCutoff,
    sourceId: s.sourceId,
    sourceOccurrenceId: s.sourceOccurrenceId,
    sourceRecordId: s.sourceRecordId,
    eventTime: s.eventTime,
    deliveryId: d.deliveryId,
    receiptDescriptorId: d.receiptDescriptorId,
    observedAt: d.observedAt,
    deliveryOrder: d.deliveryOrder,
    providerId: b.providerId,
    merchantId: b.merchantId,
    payerId: b.payerId,
    paymentId: b.paymentId,
    authorizationId: b.authorizationId,
    captureId: b.captureId,
    disputeId: b.disputeId,
    reason: b.reason,
    currency: b.currency,
    contextManifest: {
      ...m,
      generatorVersion: PAYMENT_CAPTURED_GENERATOR_VERSION,
      sourceRecords: m.sourceRecords.slice(0, 2),
      deliveries: m.deliveries.slice(0, 2),
    },
  });
  return result.ok && JSON.stringify(result.value) === JSON.stringify(m)
    ? m
    : null;
}
function run(kind: Kind, input: unknown): DisputeResult {
  const issues: DisputeIssue[] = [];
  const r = snapshot(
    input,
    [
      ...commonFields,
      ...(kind === "opened" ? ["reason"] : ["feeId", "feeAmountMinorUnits"]),
    ],
    "$",
    issues,
  );
  if (!r || issues.length) return failure(issues);
  const probe = validateRequest(kind, r, issues);
  if (!probe?.ok || issues.length) return failure(issues);
  const m =
    kind === "opened"
      ? capture(r.contextManifest)
      : openedContext(r.contextManifest);
  if (!m) {
    add(issues, "invalid_payload", "$.contextManifest");
    return failure(issues);
  }
  return append(kind, r, m, probe.value);
}
/** Pure synthetic assertion: no dispute outcome or principal movement is implied. */
export function generateDisputeOpened(input: unknown): DisputeResult {
  return run("opened", input);
}

/** Explicit fee evidence, independent of captured principal; no financial action. */
export function generateChargebackFee(input: unknown): DisputeResult {
  return run("fee", input);
}
