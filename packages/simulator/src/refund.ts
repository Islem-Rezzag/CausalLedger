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

export const REFUND_CREATED_REQUEST_VERSION =
  "m05.07-refund-created-request.v1" as const;
export const REFUND_PAID_REQUEST_VERSION =
  "m05.08-refund-paid-request.v1" as const;
export const REFUND_CREATED_GENERATOR_VERSION =
  "m05.07-refund-created.v1" as const;
export const REFUND_PAID_GENERATOR_VERSION = "m05.08-refund-paid.v1" as const;
export const REFUND_MAX_REFUNDS = 16;
export type RefundResult = PaymentAuthorizedResult;
export type RefundIssue = PaymentAuthorizedIssue;
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
  readonly refundId: string;
  readonly amountMinorUnits: string;
  readonly currency: string;
  readonly contextManifest: SimulatorManifest;
};
export type RefundCreatedRequest = Common & {
  readonly schemaVersion: typeof REFUND_CREATED_REQUEST_VERSION;
};
export type RefundPaidRequest = Common & {
  readonly schemaVersion: typeof REFUND_PAID_REQUEST_VERSION;
};
type Kind = "created" | "paid";
const versions = {
  created: [
    REFUND_CREATED_REQUEST_VERSION,
    "m05.07-refund-created-record.v1",
    REFUND_CREATED_GENERATOR_VERSION,
  ],
  paid: [
    REFUND_PAID_REQUEST_VERSION,
    "m05.08-refund-paid-record.v1",
    REFUND_PAID_GENERATOR_VERSION,
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
  "refundId",
  "amountMinorUnits",
  "currency",
];
function add(issues: RefundIssue[], code: RefundIssue["code"], path: string) {
  issues.push(Object.freeze({ code, path }));
}
function failure(issues: RefundIssue[]): RefundResult {
  return Object.freeze({ ok: false, issues: Object.freeze(issues) });
}
function snapshot(
  input: unknown,
  keys: readonly string[],
  path: string,
  issues: RefundIssue[],
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
function money(v: unknown): boolean {
  return (
    typeof v === "string" &&
    v.length <= 128 &&
    /^[1-9][0-9]*$/.exec(v)?.[0] === v
  );
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
function metadata(r: Record<string, unknown>, kind: Kind): RefundResult {
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
type Entry = { source: SyntheticSourceRecord; amount: string; paid: boolean };
type History = {
  manifest: SimulatorManifest;
  captured: SyntheticSourceRecord;
  body: Record<string, unknown>;
  refunds: Map<string, Entry>;
  total: bigint;
};
function validateRequest(
  kind: Kind,
  r: Record<string, unknown>,
  issues: RefundIssue[],
): RefundResult | null {
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
    ["refundId", "sim_refund_"],
  ])
    if (!role(r[key!], prefix!)) add(issues, "invalid_identity", "$." + key);
  if (!money(r.amountMinorUnits))
    add(issues, "invalid_amount", "$.amountMinorUnits");
  if (
    typeof r.currency !== "string" ||
    /^[A-Z]{3}$/.exec(r.currency)?.[0] !== r.currency
  )
    add(issues, "invalid_currency", "$.currency");
  if (typeof r.eventTime !== "string")
    add(issues, "invalid_timestamp", "$.eventTime");
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
function reference(s: SyntheticSourceRecord) {
  return {
    sourceId: s.sourceId,
    sourceOccurrenceId: s.sourceOccurrenceId,
    payloadSha256: s.payload.sha256,
  };
}
/** Validated local history only. No shared/global economic balance. */
function append(
  kind: Kind,
  r: Record<string, unknown>,
  h: History,
  probe: SimulatorManifest,
): RefundResult {
  const issues: RefundIssue[] = [];
  const amount = h.body.amount as Record<string, unknown>;
  for (const key of [
    "sourceId",
    "providerId",
    "merchantId",
    "payerId",
    "paymentId",
    "authorizationId",
    "captureId",
  ])
    if ((key === "sourceId" ? h.captured.sourceId : h.body[key]) !== r[key])
      add(issues, "invalid_reference", "$." + key);
  if (h.manifest.scenarioId !== r.scenarioId)
    add(issues, "invalid_reference", "$.scenarioId");
  if (amount.currency !== r.currency)
    add(issues, "invalid_reference", "$.currency");
  const id = r.refundId as string;
  const existing = h.refunds.get(id);
  if (kind === "created") {
    if (existing) add(issues, "duplicate_identity", "$.refundId");
    if (h.refunds.size >= REFUND_MAX_REFUNDS)
      add(issues, "invalid_value", "$.contextManifest");
    if (
      h.total + BigInt(r.amountMinorUnits as string) >
      BigInt(amount.minorUnits as string)
    )
      add(issues, "invalid_amount", "$.amountMinorUnits");
    if (instant(r.eventTime as string) < instant(h.captured.eventTime!))
      add(issues, "invalid_value", "$.eventTime");
  } else {
    if (!existing) add(issues, "invalid_reference", "$.refundId");
    else {
      if (existing.paid) add(issues, "duplicate_identity", "$.refundId");
      if (existing.amount !== r.amountMinorUnits)
        add(issues, "invalid_amount", "$.amountMinorUnits");
      if (instant(r.eventTime as string) < instant(existing.source.eventTime!))
        add(issues, "invalid_value", "$.eventTime");
    }
  }
  if (
    h.manifest.sourceRecords.some(
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
    eventType: "refund_" + kind,
    sourceId: r.sourceId,
    sourceOccurrenceId: r.sourceOccurrenceId,
    providerId: r.providerId,
    merchantId: r.merchantId,
    payerId: r.payerId,
    paymentId: r.paymentId,
    authorizationId: r.authorizationId,
    captureId: r.captureId,
    refundId: r.refundId,
    amount: {
      minorUnits: r.amountMinorUnits,
      currency: r.currency,
      representation: "integer_minor_units",
    },
    refundPolicy: "bounded_capture_refunds.v1",
    captureReference: reference(h.captured),
    ...(kind === "paid"
      ? { creationReference: reference(existing!.source) }
      : {}),
    eventTime: r.eventTime,
  });
  const result = validateSimulatorManifest({
    ...probe,
    sourceRecords: [
      ...h.manifest.sourceRecords,
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
    deliveries: [...h.manifest.deliveries, probe.deliveries[0]!],
  });
  if (result.ok) {
    if (kind === "created") {
      h.refunds.set(id, {
        source: result.value.sourceRecords.at(-1)!,
        amount: r.amountMinorUnits as string,
        paid: false,
      });
      h.total += BigInt(r.amountMinorUnits as string);
    } else existing!.paid = true;
    h.manifest = result.value;
  }
  return result;
}
function fromRecord(
  m: SimulatorManifest,
  index: number,
  kind: Kind,
): Record<string, unknown> | null {
  const s = m.sourceRecords[index],
    d = m.deliveries[index];
  if (!s || !d) return null;
  const b = parse(s);
  if (!b || !object(b.amount)) return null;
  return {
    schemaVersion: versions[kind][0],
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
    refundId: b.refundId,
    amountMinorUnits: b.amount.minorUnits,
    currency: b.amount.currency,
  };
}
/** Bounded iterative reconstruction proves owned wire semantics, not authenticity. */
function history(input: unknown): History | null {
  const checked = validateSimulatorManifest(input);
  if (!checked.ok) return null;
  const m = checked.value;
  if (
    m.sourceRecords.length < 2 ||
    m.sourceRecords.length > 2 + 2 * REFUND_MAX_REFUNDS ||
    m.deliveries.length !== m.sourceRecords.length
  )
    return null;
  const base = capture({
    ...m,
    generatorVersion: PAYMENT_CAPTURED_GENERATOR_VERSION,
    sourceRecords: m.sourceRecords.slice(0, 2),
    deliveries: m.deliveries.slice(0, 2),
  });
  if (!base) return null;
  const h: History = {
    manifest: base,
    captured: base.sourceRecords[1]!,
    body: parse(base.sourceRecords[1]!)!,
    refunds: new Map(),
    total: 0n,
  };
  for (let i = 2; i < m.sourceRecords.length; i++) {
    const b = parse(m.sourceRecords[i]!);
    const kind =
      b?.eventType === "refund_created"
        ? "created"
        : b?.eventType === "refund_paid"
          ? "paid"
          : null;
    if (!kind) return null;
    const r = fromRecord(m, i, kind);
    if (!r) return null;
    const issues: RefundIssue[] = [];
    const probe = validateRequest(kind, r, issues);
    if (!probe?.ok || issues.length || !append(kind, r, h, probe.value).ok)
      return null;
    // Compare each literal source and delivery, including hashes and ordering.
    if (
      JSON.stringify(h.manifest.sourceRecords[i]) !==
        JSON.stringify(m.sourceRecords[i]) ||
      JSON.stringify(h.manifest.deliveries[i]) !==
        JSON.stringify(m.deliveries[i])
    )
      return null;
  }
  return JSON.stringify(h.manifest) === JSON.stringify(m) ? h : null;
}
function run(kind: Kind, input: unknown): RefundResult {
  const issues: RefundIssue[] = [];
  const r = snapshot(input, [...commonFields, "contextManifest"], "$", issues);
  if (!r || issues.length) return failure(issues);
  const probe = validateRequest(kind, r, issues);
  if (!probe?.ok || issues.length) return failure(issues);
  const h = history(r.contextManifest);
  if (!h) {
    add(issues, "invalid_payload", "$.contextManifest");
    return failure(issues);
  }
  return append(kind, r, h, probe.value);
}
/** Pure synthetic evidence, without executing or approving a refund. */
export function generateRefundCreated(input: unknown): RefundResult {
  return run("created", input);
}

export function generateRefundPaid(input: unknown): RefundResult {
  return run("paid", input);
}
