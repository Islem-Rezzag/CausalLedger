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

export const PAYOUT_CREATED_REQUEST_VERSION =
  "m05.04-payout-created-request.v1" as const;
export const PAYOUT_PAID_REQUEST_VERSION =
  "m05.05-payout-paid-request.v1" as const;
export const PAYOUT_FAILED_REQUEST_VERSION =
  "m05.06-payout-failed-request.v1" as const;
export const PAYOUT_CREATED_GENERATOR_VERSION =
  "m05.04-payout-created.v1" as const;
export const PAYOUT_PAID_GENERATOR_VERSION = "m05.05-payout-paid.v1" as const;
export const PAYOUT_FAILED_GENERATOR_VERSION =
  "m05.06-payout-failed.v1" as const;
export const PAYOUT_MAX_MEMBERS = 16;
export const PAYOUT_AMOUNT_DIGITS = 130;
export type PayoutResult = PaymentAuthorizedResult;
export type PayoutIssue = PaymentAuthorizedIssue;
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
  readonly payoutId: string;
  readonly amountMinorUnits: string;
  readonly currency: string;
};
export type PayoutCreatedRequest = Common & {
  readonly schemaVersion: typeof PAYOUT_CREATED_REQUEST_VERSION;
  readonly captureManifests: readonly SimulatorManifest[];
};
export type PayoutPaidRequest = Common & {
  readonly schemaVersion: typeof PAYOUT_PAID_REQUEST_VERSION;
  readonly payoutManifest: SimulatorManifest;
};
export type PayoutFailedRequest = Common & {
  readonly schemaVersion: typeof PAYOUT_FAILED_REQUEST_VERSION;
  readonly payoutManifest: SimulatorManifest;
  readonly failureReason: string;
};
type Kind = "created" | "paid" | "failed";
const versions = {
  created: [
    PAYOUT_CREATED_REQUEST_VERSION,
    "m05.04-payout-created-record.v1",
    PAYOUT_CREATED_GENERATOR_VERSION,
  ],
  paid: [
    PAYOUT_PAID_REQUEST_VERSION,
    "m05.05-payout-paid-record.v1",
    PAYOUT_PAID_GENERATOR_VERSION,
  ],
  failed: [
    PAYOUT_FAILED_REQUEST_VERSION,
    "m05.06-payout-failed-record.v1",
    PAYOUT_FAILED_GENERATOR_VERSION,
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
  "payoutId",
  "amountMinorUnits",
  "currency",
];
function add(issues: PayoutIssue[], code: PayoutIssue["code"], path: string) {
  issues.push(Object.freeze({ code, path }));
}
function failure(issues: PayoutIssue[]): PayoutResult {
  return Object.freeze({ ok: false, issues: Object.freeze(issues) });
}
function snapshot(
  input: unknown,
  keys: readonly string[],
  path: string,
  issues: PayoutIssue[],
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
function members(input: unknown, issues: PayoutIssue[]): unknown[] | null {
  const path = "$.captureManifests";
  try {
    if (
      !Array.isArray(input) ||
      Object.getPrototypeOf(input) !== Array.prototype
    ) {
      add(issues, "invalid_array", path);
      return null;
    }
    const ds = Object.getOwnPropertyDescriptors(input) as unknown as Record<
        string,
        PropertyDescriptor
      >,
      n = ds.length?.value as unknown;
    if (
      typeof n !== "number" ||
      !Number.isInteger(n) ||
      n < 1 ||
      n > PAYOUT_MAX_MEMBERS ||
      Reflect.ownKeys(ds).length !== n + 1
    ) {
      add(issues, "invalid_array", path);
      return null;
    }
    const out: unknown[] = [];
    for (let i = 0; i < n; i++) {
      const d = ds[String(i)];
      if (!d || !d.enumerable || !("value" in d)) {
        add(issues, "invalid_array", path);
        return null;
      }
      out.push(d.value as unknown);
    }
    return out;
  } catch {
    add(issues, "invalid_array", path);
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
    v.length <= PAYOUT_AMOUNT_DIGITS &&
    /^[1-9][0-9]*$/.exec(v)?.[0] === v
  );
}
function prefix(
  issues: PayoutIssue[],
  entries: readonly PayoutIssue[],
  path: string,
) {
  for (const e of entries) add(issues, e.code, path + e.path.slice(1));
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
function metadata(r: Record<string, unknown>, kind: Kind): PayoutResult {
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
    payoutId: b.payoutId,
    amountMinorUnits: b.amount.minorUnits,
    currency: b.amount.currency,
    ...(kind === "failed" ? { failureReason: b.failureReason } : {}),
  };
}
/** Rebuild at most16 members and one prior outcome; recursion is structurally bounded. */
function payout(
  input: unknown,
): { manifest: SimulatorManifest; createdIndex: number } | null {
  const checked = validateSimulatorManifest(input);
  if (!checked.ok) return null;
  const m = checked.value;
  if (m.sourceRecords.length !== m.deliveries.length) return null;
  const index = m.sourceRecords.findIndex(
    (s) => parse(s)?.eventType === "payout_created",
  );
  if (
    index < 2 ||
    index % 2 !== 0 ||
    index > 2 * PAYOUT_MAX_MEMBERS ||
    m.sourceRecords.length > index + 2
  )
    return null;
  const r = fromRecord(m, index, "created");
  if (!r) return null;
  const chunks = [];
  for (let i = 0; i < index; i += 2)
    chunks.push({
      ...m,
      generatorVersion: PAYMENT_CAPTURED_GENERATOR_VERSION,
      sourceRecords: m.sourceRecords.slice(i, i + 2),
      deliveries: m.deliveries.slice(i, i + 2),
    });
  const created = run("created", { ...r, captureManifests: chunks });
  if (!created.ok) return null;
  let rebuilt = created;
  if (m.sourceRecords.length === index + 2) {
    const b = parse(m.sourceRecords[index + 1]!);
    const kind =
      b?.eventType === "payout_paid"
        ? "paid"
        : b?.eventType === "payout_failed"
          ? "failed"
          : null;
    if (!kind) return null;
    const o = fromRecord(m, index + 1, kind);
    if (!o) return null;
    const result = run(kind, { ...o, payoutManifest: created.value });
    if (!result.ok) return null;
    rebuilt = result;
  }
  return JSON.stringify(rebuilt.value) === JSON.stringify(m)
    ? { manifest: m, createdIndex: index }
    : null;
}
function run(kind: Kind, input: unknown): PayoutResult {
  const issues: PayoutIssue[] = [];
  const r = snapshot(
    input,
    [
      ...commonFields,
      kind === "created" ? "captureManifests" : "payoutManifest",
      ...(kind === "failed" ? ["failureReason"] : []),
    ],
    "$",
    issues,
  );
  if (!r || issues.length) return failure(issues);
  if (r.schemaVersion !== versions[kind][0])
    add(issues, "invalid_value", "$.schemaVersion");
  if (r.synthetic !== true) add(issues, "invalid_value", "$.synthetic");
  for (const [key, p] of [
    ["providerId", "sim_provider_"],
    ["merchantId", "sim_merchant_"],
    ["payoutId", "sim_payout_"],
  ])
    if (!role(r[key!], p!)) add(issues, "invalid_identity", "$." + key);
  if (!money(r.amountMinorUnits))
    add(issues, "invalid_amount", "$.amountMinorUnits");
  if (typeof r.currency !== "string" || !/^[A-Z]{3}$/.test(r.currency))
    add(issues, "invalid_currency", "$.currency");
  if (typeof r.eventTime !== "string")
    add(issues, "invalid_timestamp", "$.eventTime");
  if (
    kind === "failed" &&
    (typeof r.failureReason !== "string" ||
      r.failureReason.length > 256 ||
      !/^[!-~](?:[ -~]*[!-~])?$/.test(r.failureReason))
  )
    add(issues, "invalid_value", "$.failureReason");
  if (issues.length) return failure(issues);
  const probe = metadata(r, kind);
  if (!probe.ok) {
    for (const e of probe.issues)
      add(
        issues,
        e.code,
        e.path.replace(/^\$\.(?:sourceRecords|deliveries)\[0\]\./, "$."),
      );
    return failure(issues);
  }
  let priorSources: readonly SyntheticSourceRecord[];
  let priorDeliveries: SimulatorManifest["deliveries"];
  const references: unknown[] = [];
  let creation: SyntheticSourceRecord | undefined;
  if (kind === "created") {
    const list = members(r.captureManifests, issues);
    if (!list) return failure(issues);
    const ms: SimulatorManifest[] = [];
    const ids = new Set<string>();
    let sum = 0n;
    for (let i = 0; i < list.length; i++) {
      const m = capture(list[i]);
      if (!m) {
        add(issues, "invalid_payload", `$.captureManifests[${i}]`);
        continue;
      }
      const c = m.sourceRecords[1]!,
        b = parse(c)!;
      const amount = b.amount as Record<string, unknown>;
      for (const key of ["sourceId", "providerId", "merchantId"])
        if ((key === "sourceId" ? c.sourceId : b[key]) !== r[key])
          add(issues, "invalid_reference", `$.captureManifests[${i}].${key}`);
      if (amount.currency !== r.currency)
        add(issues, "invalid_reference", `$.captureManifests[${i}].currency`);
      for (const key of ["paymentId", "authorizationId", "captureId"]) {
        const id = key + ":" + String(b[key]);
        if (ids.has(id))
          add(issues, "duplicate_identity", `$.captureManifests[${i}].${key}`);
        ids.add(id);
      }
      if (instant(r.eventTime as string) < instant(c.eventTime!))
        add(issues, "invalid_value", "$.eventTime");
      sum += BigInt(amount.minorUnits as string);
      ms.push(m);
      references.push({
        sourceId: c.sourceId,
        sourceOccurrenceId: c.sourceOccurrenceId,
        payloadSha256: c.payload.sha256,
        captureId: b.captureId,
        paymentId: b.paymentId,
      });
    }
    if (issues.length) return failure(issues);
    if (sum !== BigInt(r.amountMinorUnits as string)) {
      add(issues, "invalid_amount", "$.amountMinorUnits");
      return failure(issues);
    }
    priorSources = ms.flatMap((m) => m.sourceRecords);
    priorDeliveries = ms.flatMap((m) => m.deliveries);
  } else {
    const owned = payout(r.payoutManifest);
    if (!owned) {
      add(issues, "invalid_payload", "$.payoutManifest");
      return failure(issues);
    }
    const m = owned.manifest;
    creation = m.sourceRecords[owned.createdIndex]!;
    const body = parse(creation)!;
    const amount = body.amount as Record<string, unknown>;
    for (const key of ["sourceId", "providerId", "merchantId", "payoutId"])
      if ((key === "sourceId" ? creation.sourceId : body[key]) !== r[key])
        add(issues, "invalid_reference", "$." + key);
    if (amount.currency !== r.currency)
      add(issues, "invalid_reference", "$.currency");
    if (amount.minorUnits !== r.amountMinorUnits)
      add(issues, "invalid_amount", "$.amountMinorUnits");
    if (instant(r.eventTime as string) < instant(creation.eventTime!))
      add(issues, "invalid_value", "$.eventTime");
    if (
      m.sourceRecords
        .slice(owned.createdIndex + 1)
        .some((s) => parse(s)?.eventType === "payout_" + kind)
    )
      add(issues, "duplicate_identity", "$.payoutManifest");
    priorSources = m.sourceRecords;
    priorDeliveries = m.deliveries;
  }
  const occurrences = new Set<string>();
  for (const source of [...priorSources, probe.value.sourceRecords[0]!]) {
    const tuple = source.sourceId + ":" + source.sourceOccurrenceId;
    if (occurrences.has(tuple))
      add(issues, "duplicate_identity", "$.sourceOccurrenceId");
    occurrences.add(tuple);
  }
  if (issues.length) return failure(issues);
  const text = JSON.stringify({
    schemaVersion: versions[kind][1],
    synthetic: true,
    eventType: "payout_" + kind,
    sourceId: r.sourceId,
    sourceOccurrenceId: r.sourceOccurrenceId,
    providerId: r.providerId,
    merchantId: r.merchantId,
    payoutId: r.payoutId,
    amount: {
      minorUnits: r.amountMinorUnits,
      currency: r.currency,
      representation: "integer_minor_units",
    },
    ...(kind === "created"
      ? {
          membershipPolicy: "full_gross_captures.v1",
          captureReferences: references,
        }
      : {
          creationReference: {
            sourceId: creation!.sourceId,
            sourceOccurrenceId: creation!.sourceOccurrenceId,
            payloadSha256: creation!.payload.sha256,
          },
        }),
    ...(kind === "failed" ? { failureReason: r.failureReason } : {}),
    eventTime: r.eventTime,
  });
  const result = validateSimulatorManifest({
    ...probe.value,
    sourceRecords: [
      ...priorSources,
      {
        ...probe.value.sourceRecords[0]!,
        payload: {
          encoding: "utf-8",
          mediaType: "application/json",
          text,
          sha256: createHash("sha256").update(text, "utf8").digest("hex"),
        },
      },
    ],
    deliveries: [...priorDeliveries, probe.value.deliveries[0]!],
  });
  if (!result.ok) {
    prefix(issues, result.issues, "$");
    return failure(issues);
  }
  return result;
}
/** Pure synthetic provider evidence; never pays money or confirms bank settlement. */
export function generatePayoutCreated(input: unknown): PayoutResult {
  return run("created", input);
}
export function generatePayoutPaid(input: unknown): PayoutResult {
  return run("paid", input);
}
export function generatePayoutFailed(input: unknown): PayoutResult {
  return run("failed", input);
}
