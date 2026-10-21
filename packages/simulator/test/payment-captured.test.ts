import { createHash } from "node:crypto";
import { expect, it } from "vitest";
import {
  generatePaymentAuthorized,
  generatePaymentCaptured,
  PAYMENT_AUTHORIZED_REQUEST_VERSION,
  PAYMENT_CAPTURED_REQUEST_VERSION,
  PAYMENT_CAPTURED_GENERATOR_VERSION,
  validateSimulatorManifest,
} from "../src/index.js";
import type {
  PaymentAuthorizedRequest,
  PaymentCapturedRequest,
  SimulatorManifest,
} from "../src/index.js";
function authorizationRequest(): PaymentAuthorizedRequest {
  return {
    schemaVersion: PAYMENT_AUTHORIZED_REQUEST_VERSION,
    synthetic: true,
    scenarioId: "sim_scenario_demo",
    observationCutoff: "2026-01-02T03:05:00Z",
    sourceId: "sim_source_demo",
    sourceOccurrenceId: "sim_occ_auth1",
    sourceRecordId: "sim_record_auth1",
    eventTime: "2026-01-02T03:04:05Z",
    deliveryId: "sim_delivery_auth1",
    receiptDescriptorId: "sim_receipt_auth1",
    observedAt: "2026-01-02T03:04:06Z",
    deliveryOrder: 0,
    providerId: "sim_provider_demo",
    merchantId: "sim_merchant_1",
    payerId: "sim_payer_1",
    paymentId: "sim_payment_1",
    authorizationId: "sim_auth_1",
    amountMinorUnits: "1250",
    currency: "USD",
    context: {
      sourceId: "sim_source_demo",
      providerId: "sim_provider_demo",
      merchantId: "sim_merchant_1",
      payerId: "sim_payer_1",
      paymentId: "sim_payment_1",
      currency: "USD",
    },
  };
}
const authorizationGolden =
  '{"schemaVersion":"m05.02-payment-authorized-record.v1","synthetic":true,"eventType":"payment_authorized","sourceId":"sim_source_demo","sourceOccurrenceId":"sim_occ_auth1","providerId":"sim_provider_demo","paymentId":"sim_payment_1","authorizationId":"sim_auth_1","merchantId":"sim_merchant_1","payerId":"sim_payer_1","amount":{"minorUnits":"1250","currency":"USD","representation":"integer_minor_units"},"eventTime":"2026-01-02T03:04:05Z"}';
const captureGolden =
  '{"schemaVersion":"m05.03-payment-captured-record.v1","synthetic":true,"eventType":"payment_captured","sourceId":"sim_source_demo","sourceOccurrenceId":"sim_occ_capture1","providerId":"sim_provider_demo","paymentId":"sim_payment_1","authorizationId":"sim_auth_1","captureId":"sim_capture_1","merchantId":"sim_merchant_1","payerId":"sim_payer_1","amount":{"minorUnits":"1000","currency":"USD","representation":"integer_minor_units"},"authorizationReference":{"sourceId":"sim_source_demo","sourceOccurrenceId":"sim_occ_auth1","payloadSha256":"1eaa6962d958447514dbe57268cbe72389d394316f5382e2aef39236a34b4ab0"},"eventTime":"2026-01-02T03:04:07Z"}';
const captureHash =
  "a225f39ab7800699ca190719ddb606e1f879b6d00e708dc2dc83122cd122a6a5";
function authorization(
  input: unknown = authorizationRequest(),
): SimulatorManifest {
  const result = generatePaymentAuthorized(input);
  if (!result.ok) throw new Error(JSON.stringify(result.issues));
  return result.value;
}
function request(): PaymentCapturedRequest {
  const { context: _context, ...base } = authorizationRequest();
  void _context;
  return {
    ...base,
    schemaVersion: PAYMENT_CAPTURED_REQUEST_VERSION,
    sourceOccurrenceId: "sim_occ_capture1",
    sourceRecordId: "sim_record_capture1",
    eventTime: "2026-01-02T03:04:07Z",
    deliveryId: "sim_delivery_capture1",
    receiptDescriptorId: "sim_receipt_capture1",
    deliveryOrder: 1,
    captureId: "sim_capture_1",
    amountMinorUnits: "1000",
    authorizationManifest: authorization(),
  };
}
function manifest(input: unknown = request()): SimulatorManifest {
  const result = generatePaymentCaptured(input);
  expect(result.ok, JSON.stringify(result.issues)).toBe(true);
  if (!result.ok) throw new Error("rejected");
  return result.value;
}
function frozen(value: unknown) {
  if (value && typeof value === "object") {
    expect(Object.isFrozen(value)).toBe(true);
    for (const child of Object.values(value)) frozen(child);
  }
}
function rejected(input: unknown, code?: string, path?: string) {
  const result = generatePaymentCaptured(input);
  expect(result.ok).toBe(false);
  expect(result).not.toHaveProperty("value");
  frozen(result);
  if (code) expect(result.issues).toContainEqual({ code, path });
  return;
}
function clone<T>(input: T): T {
  return JSON.parse(JSON.stringify(input)) as T;
}
function rawPrior(text: string): SimulatorManifest {
  const prior = clone(authorization());
  Object.assign(prior.sourceRecords[0]!.payload, {
    text,
    sha256: createHash("sha256").update(text, "utf8").digest("hex"),
  });
  expect(validateSimulatorManifest(prior).ok).toBe(true);
  return prior;
}
it("matches independently authored authorization/capture bytes and Python SHA256", () => {
  const value = manifest();
  expect(value.generatorVersion).toBe(PAYMENT_CAPTURED_GENERATOR_VERSION);
  expect(value.sourceRecords).toHaveLength(2);
  expect(value.deliveries).toHaveLength(2);
  expect(value.sourceRecords[0]!.payload.text).toBe(authorizationGolden);
  expect(value.sourceRecords[1]!.payload).toEqual({
    encoding: "utf-8",
    mediaType: "application/json",
    text: captureGolden,
    sha256: captureHash,
  });
  expect(validateSimulatorManifest(value).ok).toBe(true);
});
it("preserves each original descriptor/raw byte/hash/delivery exactly, detached and frozen", () => {
  const input = clone(request());
  const before = JSON.stringify(input);
  const result = generatePaymentCaptured(input);
  expect(result.ok).toBe(true);
  if (!result.ok) return;
  expect(JSON.stringify(input)).toBe(before);
  expect(Object.isFrozen(input)).toBe(false);
  frozen(result);
  expect(result.value.sourceRecords[0]).toEqual(
    input.authorizationManifest.sourceRecords[0],
  );
  expect(result.value.deliveries[0]).toEqual(
    input.authorizationManifest.deliveries[0],
  );
  expect(result.value.sourceRecords[0]).not.toBe(
    input.authorizationManifest.sourceRecords[0],
  );
  Object.assign(input.authorizationManifest.sourceRecords[0]!.payload, {
    text: "changed",
  });
  Object.assign(input, { amountMinorUnits: "2" });
  expect(result.value.sourceRecords[0]!.payload.text).toBe(authorizationGolden);
  expect(result.value.sourceRecords[1]!.payload.text).toBe(captureGolden);
});
it("uses original authorization hash instead of different amount/time capture probe", () => {
  const body = JSON.parse(manifest().sourceRecords[1]!.payload.text);
  expect(body.authorizationReference).toEqual({
    sourceId: "sim_source_demo",
    sourceOccurrenceId: "sim_occ_auth1",
    payloadSha256:
      "1eaa6962d958447514dbe57268cbe72389d394316f5382e2aef39236a34b4ab0",
  });
});
it("repeated calls do not consume a global or cumulative authorization budget", () => {
  const input = { ...request(), amountMinorUnits: "1250" };
  expect(manifest(input)).toEqual(manifest(input));
  expect(manifest(Object.fromEntries(Object.entries(input).reverse()))).toEqual(
    manifest(input),
  );
  expect(manifest(Object.assign(Object.create(null) as object, input))).toEqual(
    manifest(input),
  );
});
it.each(["1", "1000", "1250"])(
  "accepts full/partial capture %s",
  (amountMinorUnits) => {
    expect(
      JSON.parse(
        manifest({ ...request(), amountMinorUnits }).sourceRecords[1]!.payload
          .text,
      ).amount.minorUnits,
    ).toBe(amountMinorUnits);
  },
);
it.each([
  ["9", "10"],
  ["10", "100"],
  ["9007199254740993", "9007199254740994"],
  ["9223372036854775808", "9223372036854775809"],
  ["9".repeat(128), "9".repeat(128)],
])("uses exact integer comparison %s <= %s", (amountMinorUnits, authorized) => {
  manifest({
    ...request(),
    amountMinorUnits,
    authorizationManifest: authorization({
      ...authorizationRequest(),
      amountMinorUnits: authorized,
    }),
  });
});
it.each([
  ["1251", "1250"],
  ["10", "9"],
  ["100", "10"],
  ["9007199254740994", "9007199254740993"],
  ["9223372036854775809", "9223372036854775808"],
  ["9".repeat(128), "8".repeat(128)],
])("rejects overcapture %s > %s", (amountMinorUnits, authorized) => {
  rejected(
    {
      ...request(),
      amountMinorUnits,
      authorizationManifest: authorization({
        ...authorizationRequest(),
        amountMinorUnits: authorized,
      }),
    },
    "invalid_amount",
    "$.amountMinorUnits",
  );
});
it.each([
  "0",
  "00",
  "01",
  "-1",
  "+1",
  "1.0",
  "12.50",
  "1e3",
  " 1",
  "1 ",
  "1\n",
  "",
  "9".repeat(129),
  1250,
  1n,
  null,
  {},
  NaN,
  Infinity,
])("rejects malformed amount %s", (amountMinorUnits) =>
  rejected(
    { ...request(), amountMinorUnits },
    "invalid_amount",
    "$.amountMinorUnits",
  ),
);
it.each([
  "usd",
  " USD",
  "USD ",
  "US",
  "USDD",
  "US\n",
  "€UR",
  "123",
  "",
  null,
  123,
])("rejects malformed currency %s", (currency) =>
  rejected({ ...request(), currency }, "invalid_currency", "$.currency"),
);
it.each([
  "sourceId",
  "providerId",
  "merchantId",
  "payerId",
  "paymentId",
  "authorizationId",
  "currency",
])("rejects conflicting declaration %s", (key) => {
  const input = request();
  rejected(
    {
      ...input,
      [key]:
        key === "currency"
          ? "EUR"
          : String(input[key as keyof PaymentCapturedRequest]) + "_other",
    },
    "invalid_reference",
    "$." + key,
  );
});
it.each([
  "",
  "capture_1",
  "sim_capture_",
  "sim_capture__x",
  "sim_capture_é",
  "sim_capture_a\n",
  "sim_capture_" + "a".repeat(65),
  null,
  1,
  {},
])("rejects capture identity %s", (captureId) =>
  rejected({ ...request(), captureId }, "invalid_identity", "$.captureId"),
);
it.each(["sim_capture_a", "sim_capture_0", "sim_capture_" + "a".repeat(64)])(
  "accepts scoped capture identity %s",
  (captureId) => void manifest({ ...request(), captureId }),
);
it.each([
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
])("requires own data field %s", (key) => {
  const input: Record<string, unknown> = { ...request() };
  delete input[key];
  rejected(input, "missing_field", "$." + key);
});
it.each(["context", "extra", "toJSON"])(
  "rejects extra root key without invoking %s",
  (key) => {
    let calls = 0;
    rejected(
      {
        ...request(),
        [key]: () => {
          calls++;
        },
      },
      "unknown_field",
      "$." + key,
    );
    expect(calls).toBe(0);
  },
);
it.each([null, [], 42, "text", new (class Request {})()])(
  "rejects nonplain root %s",
  (value) => rejected(value, "invalid_object", "$"),
);
it.each(["getter", "hidden", "symbol", "throwingProxy"])(
  "never evaluates malformed root %s",
  (mode) => {
    let calls = 0;
    const input = { ...request() };
    let value: unknown = input;
    if (mode === "getter")
      Object.defineProperty(input, "amountMinorUnits", {
        enumerable: true,
        get() {
          calls++;
          return "1000";
        },
      });
    if (mode === "hidden")
      Object.defineProperty(input, "amountMinorUnits", {
        enumerable: false,
        value: "1000",
      });
    if (mode === "symbol") Object.assign(input, { [Symbol("secret")]: 1 });
    if (mode === "throwingProxy")
      value = new Proxy(input, {
        ownKeys() {
          throw new Error("trap");
        },
      });
    rejected(value, "invalid_object", "$");
    expect(calls).toBe(0);
  },
);
it.each([false, 1, null, "true"])("requires synthetic true %s", (synthetic) =>
  rejected({ ...request(), synthetic }, "invalid_value", "$.synthetic"),
);
it.each(["m05.02-payment-authorized-request.v1", "", null, 1])(
  "requires fixed03 request version %s",
  (schemaVersion) =>
    rejected(
      { ...request(), schemaVersion },
      "invalid_value",
      "$.schemaVersion",
    ),
);
it.each([null, [], {}, new (class Prior {})()])(
  "rejects invalid prior %s",
  (authorizationManifest) => rejected({ ...request(), authorizationManifest }),
);
it("rejects accessor prior without invoking getters", () => {
  let calls = 0;
  const prior = clone(authorization());
  Object.defineProperty(prior, "sourceRecords", {
    enumerable: true,
    get() {
      calls++;
      return [];
    },
  });
  rejected({ ...request(), authorizationManifest: prior });
  expect(calls).toBe(0);
});
it("snapshots actual caller scalars before a prior descriptor trap mutates them", () => {
  const input = clone(request());
  const prior = input.authorizationManifest;
  Object.assign(input, {
    authorizationManifest: new Proxy(prior, {
      getPrototypeOf(target) {
        Object.assign(input, {
          amountMinorUnits: "9999",
          eventTime: "invalid",
          providerId: "bad",
        });
        return Object.getPrototypeOf(target) as object | null;
      },
    }),
  });
  const value = manifest(input);
  expect(input.amountMinorUnits).toBe("9999");
  expect(value.sourceRecords[1]!.payload.text).toBe(captureGolden);
});
it.each(["text/plain", "text/csv"])(
  "rejects wrong prior media type %s even with correct raw hash",
  (mediaType) => {
    const prior = clone(authorization());
    Object.assign(prior.sourceRecords[0]!.payload, { mediaType });
    expect(validateSimulatorManifest(prior).ok).toBe(true);
    rejected(
      { ...request(), authorizationManifest: prior },
      "invalid_payload",
      "$.authorizationManifest.sourceRecords[0].payload",
    );
  },
);
it.each([
  "generatorVersion",
  "sourceType",
  "eventTime",
  "sourceOccurrenceId",
  "sourceId",
])("rejects prior metadata inconsistent with owned02 %s", (field) => {
  const prior = clone(authorization());
  if (field === "generatorVersion")
    Object.assign(prior, { generatorVersion: "other" });
  else {
    Object.assign(prior.sourceRecords[0]!, {
      [field]:
        field === "sourceType"
          ? "bank"
          : field === "eventTime"
            ? null
            : String(
                (prior.sourceRecords[0] as unknown as Record<string, unknown>)[
                  field
                ],
              ) + "_changed",
    });
    if (field === "sourceId" || field === "sourceOccurrenceId")
      Object.assign(prior.deliveries[0]!, {
        [field]: prior.sourceRecords[0]![field],
      });
  }
  rejected({ ...request(), authorizationManifest: prior });
});
it.each([
  "schemaVersion",
  "synthetic",
  "eventType",
  "sourceId",
  "sourceOccurrenceId",
  "providerId",
  "paymentId",
  "authorizationId",
  "merchantId",
  "payerId",
  "amount",
  "eventTime",
])("rejects recomputed-hash semantic/shape tampering of %s", (field) => {
  const body = JSON.parse(authorizationGolden) as Record<string, unknown>;
  body[field] =
    field === "synthetic"
      ? false
      : field === "amount"
        ? {
            minorUnits: "0",
            currency: "USD",
            representation: "integer_minor_units",
          }
        : "wrong";
  rejected(
    { ...request(), authorizationManifest: rawPrior(JSON.stringify(body)) },
    "invalid_payload",
    "$.authorizationManifest.sourceRecords[0].payload",
  );
});
it.each([
  "whitespace",
  "reordered",
  "duplicate",
  "extra",
  "array",
  "null",
  "invalidJSON",
  "amountExtra",
  "representation",
])("rejects noncanonical owned02 %s with valid SHA", (mode) => {
  const body = JSON.parse(authorizationGolden);
  let text = authorizationGolden;
  if (mode === "whitespace") text = " " + text;
  if (mode === "reordered")
    text = JSON.stringify(Object.fromEntries(Object.entries(body).reverse()));
  if (mode === "duplicate") text = text.replace("{", '{"synthetic":true,');
  if (mode === "extra") text = JSON.stringify({ ...body, extra: true });
  if (mode === "array") text = "[]";
  if (mode === "null") text = "null";
  if (mode === "invalidJSON") text = "{";
  if (mode === "amountExtra") {
    body.amount.extra = true;
    text = JSON.stringify(body);
  }
  if (mode === "representation") {
    body.amount.representation = "decimal";
    text = JSON.stringify(body);
  }
  rejected(
    { ...request(), authorizationManifest: rawPrior(text) },
    "invalid_payload",
    "$.authorizationManifest.sourceRecords[0].payload",
  );
});
it.each(["sourceRecords", "deliveries"])(
  "requires exactly one prior %s",
  (field) => {
    const prior = clone(authorization());
    Object.assign(prior, { [field]: [] });
    rejected({ ...request(), authorizationManifest: prior });
  },
);
it.each([
  "sourceRecordId",
  "deliveryId",
  "receiptDescriptorId",
  "deliveryOrder",
])("rejects composed identity/order collision %s", (key) => {
  const input = request();
  const original =
    key === "sourceRecordId"
      ? input.authorizationManifest.sourceRecords[0]!
      : input.authorizationManifest.deliveries[0]!;
  rejected(
    { ...input, [key]: (original as unknown as Record<string, unknown>)[key] },
    "duplicate_identity",
    "$." + key,
  );
});
it("requires a distinct source occurrence", () =>
  rejected(
    { ...request(), sourceOccurrenceId: "sim_occ_auth1" },
    "invalid_reference",
    "$.sourceOccurrenceId",
  ));
it.each([
  ["2026-01-02T03:04:05Z", "2026-01-02T03:04:05.000Z"],
  ["2026-01-02T03:04:05.000Z", "2026-01-02T03:04:05Z"],
  ["0001-01-01T00:00:00Z", "0001-01-01T00:00:00.001Z"],
  ["9999-12-31T23:59:59.998Z", "9999-12-31T23:59:59.999Z"],
])("compares UTC instants preserving raw %s -> %s", (authTime, eventTime) => {
  const prior = authorization({
    ...authorizationRequest(),
    eventTime: authTime,
  });
  const value = manifest({
    ...request(),
    eventTime,
    authorizationManifest: prior,
  });
  expect(value.sourceRecords.map((x) => x.eventTime)).toEqual([
    authTime,
    eventTime,
  ]);
});
it.each(["2026-01-02T03:04:04.999Z", "0001-01-01T00:00:00Z"])(
  "rejects earlier synthetic capture %s",
  (eventTime) =>
    rejected({ ...request(), eventTime }, "invalid_value", "$.eventTime"),
);
it.each([
  null,
  "2026-02-30T00:00:00Z",
  "2026-01-02T03:04:05+00:00",
  "2026-01-02T03:04:05.00Z",
  "0000-01-01T00:00:00Z",
])("rejects noncanonical eventTime %s", (eventTime) =>
  rejected({ ...request(), eventTime }, "invalid_timestamp", "$.eventTime"),
);
it("preserves out-of-order observations and declared cutoff/order without projection", () => {
  const prior = authorization({
    ...authorizationRequest(),
    deliveryOrder: 9,
    observedAt: "2027-01-01T00:00:00Z",
  });
  const value = manifest({
    ...request(),
    authorizationManifest: prior,
    deliveryOrder: 2,
    observedAt: "0001-01-01T00:00:00Z",
    observationCutoff: "0001-01-01T00:00:00Z",
  });
  expect(value.deliveries.map((x) => x.deliveryOrder)).toEqual([9, 2]);
  expect(value.deliveries[1]!.observedAt).toBe("0001-01-01T00:00:00Z");
  expect(value.observationCutoff).toBe("0001-01-01T00:00:00Z");
});
it.each([
  "scenarioId",
  "observationCutoff",
  "sourceRecordId",
  "deliveryId",
  "receiptDescriptorId",
  "observedAt",
  "deliveryOrder",
])(
  "current metadata-only change %s leaves raw occurrence/hash fixed",
  (key) => {
    const input = request();
    const changes: Record<string, unknown> = {
      scenarioId: "sim_scenario_other",
      observationCutoff: "2030-01-01T00:00:00Z",
      sourceRecordId: "sim_record_other",
      deliveryId: "sim_delivery_other",
      receiptDescriptorId: "sim_receipt_other",
      observedAt: "2030-01-01T00:00:00Z",
      deliveryOrder: 99,
    };
    expect(
      manifest({ ...input, [key]: changes[key] }).sourceRecords[1]!.payload,
    ).toEqual(manifest(input).sourceRecords[1]!.payload);
  },
);
it.each([
  "scenarioId",
  "observationCutoff",
  "sourceRecordId",
  "deliveryId",
  "receiptDescriptorId",
  "observedAt",
  "deliveryOrder",
])(
  "prior metadata-only change %s preserves its raw and new capture raw",
  (key) => {
    const changes: Record<string, unknown> = {
      scenarioId: "sim_scenario_other",
      observationCutoff: "2030-01-01T00:00:00Z",
      sourceRecordId: "sim_record_other",
      deliveryId: "sim_delivery_other",
      receiptDescriptorId: "sim_receipt_other",
      observedAt: "2030-01-01T00:00:00Z",
      deliveryOrder: 99,
    };
    const prior = authorization({
      ...authorizationRequest(),
      [key]: changes[key],
    });
    const value = manifest({ ...request(), authorizationManifest: prior });
    expect(value.sourceRecords[0]).toEqual(prior.sourceRecords[0]);
    expect(value.deliveries[0]).toEqual(prior.deliveries[0]);
    expect(value.sourceRecords[1]!.payload.text).toBe(captureGolden);
  },
);
