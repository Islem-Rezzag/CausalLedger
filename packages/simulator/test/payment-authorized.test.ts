import { expect, it } from "vitest";
import {
  generatePaymentAuthorized,
  PAYMENT_AUTHORIZED_REQUEST_VERSION,
  PAYMENT_AUTHORIZED_GENERATOR_VERSION,
  validateSimulatorManifest,
} from "../src/index.js";
import type { PaymentAuthorizedRequest } from "../src/index.js";
function request(): PaymentAuthorizedRequest {
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
const golden =
  '{"schemaVersion":"m05.02-payment-authorized-record.v1","synthetic":true,"eventType":"payment_authorized","sourceId":"sim_source_demo","sourceOccurrenceId":"sim_occ_auth1","providerId":"sim_provider_demo","paymentId":"sim_payment_1","authorizationId":"sim_auth_1","merchantId":"sim_merchant_1","payerId":"sim_payer_1","amount":{"minorUnits":"1250","currency":"USD","representation":"integer_minor_units"},"eventTime":"2026-01-02T03:04:05Z"}';
const goldenHash =
  "1eaa6962d958447514dbe57268cbe72389d394316f5382e2aef39236a34b4ab0";
function manifest(input: unknown = request()) {
  const result = generatePaymentAuthorized(input);
  expect(result.ok).toBe(true);
  if (!result.ok) throw new Error(JSON.stringify(result.issues));
  return result.value;
}
function rejected(input: unknown, code?: string, path?: string) {
  const result = generatePaymentAuthorized(input);
  expect(result.ok).toBe(false);
  expect(result).not.toHaveProperty("value");
  expect(Object.isFrozen(result)).toBe(true);
  expect(Object.isFrozen(result.issues)).toBe(true);
  for (const entry of result.issues) expect(Object.isFrozen(entry)).toBe(true);
  if (code) expect(result.issues).toContainEqual({ code, path });
  return result;
}
it("generates the independently pinned 1250 USD authorization bytes and SHA256", () => {
  const value = manifest();
  expect(value.sourceRecords).toHaveLength(1);
  expect(value.deliveries).toHaveLength(1);
  expect(value.generatorVersion).toBe(PAYMENT_AUTHORIZED_GENERATOR_VERSION);
  expect(value.sourceRecords[0]!.sourceType).toBe("provider");
  expect(value.sourceRecords[0]!.payload).toEqual({
    encoding: "utf-8",
    mediaType: "application/json",
    text: golden,
    sha256: goldenHash,
  });
  expect(validateSimulatorManifest(value)).toEqual({
    ok: true,
    value,
    issues: [],
  });
});
it("is deterministic independent of caller property insertion order", () => {
  const input = request();
  const reverse: Record<string, unknown> = Object.fromEntries(
    Object.entries(input).reverse(),
  );
  reverse.context = Object.fromEntries(Object.entries(input.context).reverse());
  expect(manifest(reverse)).toEqual(manifest(input));
  expect(manifest()).toEqual(manifest());
});
it("captures input without changing it and returns deeply frozen detached values", () => {
  const input = request();
  const before = JSON.stringify(input);
  const result = generatePaymentAuthorized(input);
  expect(JSON.stringify(input)).toBe(before);
  expect(Object.isFrozen(input)).toBe(false);
  if (!result.ok) throw new Error("failure");
  function frozen(value: unknown) {
    if (value && typeof value === "object") {
      expect(Object.isFrozen(value)).toBe(true);
      for (const v of Object.values(value)) frozen(v);
    }
  }
  frozen(result);
  Object.assign(input, { eventTime: "changed", amountMinorUnits: "1" });
  Object.assign(input.context, { providerId: "changed" });
  expect(result.value.sourceRecords[0]!.payload.text).toBe(golden);
});
it.each([
  "9007199254740993",
  "9223372036854775808",
  "9".repeat(128),
  "1",
  "1000000000000000000000000000000000000000",
])("preserves exact positive string amount %s", (amountMinorUnits) => {
  const value = manifest({ ...request(), amountMinorUnits });
  expect(
    JSON.parse(value.sourceRecords[0]!.payload.text).amount.minorUnits,
  ).toBe(amountMinorUnits);
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
])(
  "rejects noncanonical/bounded amount %s",
  (amountMinorUnits) =>
    void rejected(
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
])(
  "rejects currency %s",
  (currency) =>
    void rejected({ ...request(), currency }, "invalid_currency", "$.currency"),
);
it.each(["USD", "EUR", "GBP", "JPY", "ZZZ"])(
  "validates currency format and caller equality without registry claim %s",
  (currency) => {
    const input = request();
    expect(
      JSON.parse(
        manifest({
          ...input,
          currency,
          context: { ...input.context, currency },
        }).sourceRecords[0]!.payload.text,
      ).amount.currency,
    ).toBe(currency);
  },
);
it.each([
  "sourceId",
  "providerId",
  "merchantId",
  "payerId",
  "paymentId",
  "currency",
])("rejects mismatched declared context %s", (key) => {
  const input = request();
  rejected(
    { ...input, context: { ...input.context, [key]: "different" } },
    "invalid_reference",
    "$.context." + key,
  );
});
const rolePrefixes = {
  providerId: "sim_provider_",
  merchantId: "sim_merchant_",
  payerId: "sim_payer_",
  paymentId: "sim_payment_",
  authorizationId: "sim_auth_",
};
for (const [key, prefix] of Object.entries(rolePrefixes)) {
  it.each(["", "_x", "-x", "a.b", "a b", "a\n", "é", "a".repeat(65)])(
    "rejects invalid " + key + " suffix %s",
    (tail) =>
      void rejected(
        { ...request(), [key]: prefix + tail },
        "invalid_identity",
        "$." + key,
      ),
  );
  it.each(["A", "9", "a_-9", "a".repeat(64)])(
    "accepts exact " + key + " suffix %s",
    (tail) => {
      const input = request();
      const context = {
        ...input.context,
        ...(key === "authorizationId" ? {} : { [key]: prefix + tail }),
      };
      manifest({ ...input, [key]: prefix + tail, context });
    },
  );
}
it.each([
  null,
  "",
  "2025-02-29T00:00:00Z",
  "2026-01-02T03:04:05+00:00",
  "2026-01-02T03:04:05.1Z",
  "2026-01-02T03:04:05Z\n",
  "0000-01-01T00:00:00Z",
  "2026-01-02T03:04:60Z",
])(
  "requires known canonical UTC event time %s",
  (eventTime) =>
    void rejected(
      { ...request(), eventTime },
      "invalid_timestamp",
      "$.eventTime",
    ),
);
it.each([
  "0001-01-01T00:00:00Z",
  "2000-02-29T00:00:00.000Z",
  "9999-12-31T23:59:59.999Z",
])(
  "accepts UTC calendar boundary %s",
  (eventTime) => void manifest({ ...request(), eventTime }),
);
it.each([
  "sourceRecordId",
  "deliveryId",
  "receiptDescriptorId",
  "observedAt",
  "observationCutoff",
  "deliveryOrder",
  "scenarioId",
])("keeps occurrence bytes independent of %s", (key) => {
  const changes: Record<string, unknown> = {
    sourceRecordId: "sim_record_other",
    deliveryId: "sim_delivery_other",
    receiptDescriptorId: "sim_receipt_other",
    observedAt: "2027-01-01T00:00:00Z",
    observationCutoff: "2025-01-01T00:00:00Z",
    deliveryOrder: 9007199254740991,
    scenarioId: "sim_scenario_other",
  };
  const value = manifest({ ...request(), [key]: changes[key] });
  expect(value.sourceRecords[0]!.payload.text).toBe(golden);
  expect(value.sourceRecords[0]!.payload.sha256).toBe(goldenHash);
});
it.each([
  ["deliveryOrder", -0],
  ["deliveryOrder", -1],
  ["deliveryOrder", 1.1],
  ["deliveryOrder", 9007199254740992],
  ["observedAt", "bad"],
  ["observationCutoff", "bad"],
  ["scenarioId", "other"],
  ["sourceRecordId", "evt_real"],
  ["sourceOccurrenceId", "bad"],
  ["deliveryId", "bad"],
  ["receiptDescriptorId", "rcpt_real"],
])("delegates existing metadata refusal %s %s", (key, value) => {
  const result = rejected({ ...request(), [key as string]: value });
  expect(result.issues.some((x) => x.path === "$." + key)).toBe(true);
});
it("preserves independent declared clocks even beyond cutoff without filtering", () => {
  const value = manifest({
    ...request(),
    eventTime: "2028-01-01T00:00:00Z",
    observedAt: "2027-01-01T00:00:00Z",
    observationCutoff: "2025-01-01T00:00:00Z",
    deliveryOrder: 9,
  });
  expect(value.deliveries[0]!.observedAt).toBe("2027-01-01T00:00:00Z");
  expect(value.sourceRecords[0]!.eventTime).toBe("2028-01-01T00:00:00Z");
});
it.each(Object.keys(request()))("rejects missing own field %s", (key) => {
  const input = { ...request() } as Record<string, unknown>;
  delete input[key];
  rejected(input, "missing_field", "$." + key);
});
it.each(Object.keys(request().context))(
  "rejects missing context field %s",
  (key) => {
    const input = request();
    const context = { ...input.context } as Record<string, unknown>;
    delete context[key];
    rejected({ ...input, context }, "missing_field", "$.context." + key);
  },
);
it("orders unknown fields lexically before missing fields in schema order", () => {
  const input = { ...request(), z: 1, a: 1 } as Record<string, unknown>;
  delete input.synthetic;
  delete input.schemaVersion;
  expect(rejected(input).issues).toEqual([
    { code: "unknown_field", path: "$.a" },
    { code: "unknown_field", path: "$.z" },
    { code: "missing_field", path: "$.schemaVersion" },
    { code: "missing_field", path: "$.synthetic" },
  ]);
});
it.each(["schemaVersion", "synthetic"])(
  "refuses altered fixed %s",
  (key) =>
    void rejected(
      { ...request(), [key]: "other" },
      "invalid_value",
      "$." + key,
    ),
);
it.each(["generatorVersion", "eventType", "rawPayload", "amount", "extra"])(
  "refuses caller override/unknown %s",
  (key) =>
    void rejected(
      { ...request(), [key]: "other" },
      "unknown_field",
      "$." + key,
    ),
);
it.each([null, undefined, [], 1, "input", true, new (class Request {})()])(
  "refuses non-plain request %s",
  (input) => void rejected(input, "invalid_object", "$"),
);
it.each(["root", "context"])(
  "rejects hostile own descriptors without invoking getters in %s",
  (position) => {
    for (const kind of ["accessor", "hidden", "symbol"]) {
      const input = request();
      const target = position === "root" ? input : input.context;
      let calls = 0;
      if (kind === "symbol")
        Object.defineProperty(target, Symbol("extra"), {
          value: "x",
          enumerable: true,
        });
      else
        Object.defineProperty(
          target,
          "extra",
          kind === "hidden"
            ? { value: "x" }
            : {
                get() {
                  calls++;
                  throw new Error("getter");
                },
                enumerable: true,
              },
        );
      rejected(
        input,
        "invalid_object",
        position === "root" ? "$" : "$.context",
      );
      expect(calls).toBe(0);
    }
  },
);
it("does not serialize unknown metadata toJSON or execute getters", () => {
  let calls = 0;
  const malicious = {
    toJSON() {
      calls++;
      throw new Error("toJSON");
    },
  };
  rejected({ ...request(), scenarioId: malicious });
  rejected({ ...request(), observedAt: malicious });
  expect(calls).toBe(0);
});
it("supports plain null-prototype records and rejects throwing Proxy descriptors", () => {
  const input = request();
  manifest(
    Object.assign(Object.create(null), input, {
      context: Object.assign(Object.create(null), input.context),
    }),
  );
  rejected(
    new Proxy(input, {
      ownKeys() {
        throw new Error("trap");
      },
    }),
    "invalid_object",
    "$",
  );
  const revoked = Proxy.revocable(input, {});
  revoked.revoke();
  rejected(revoked.proxy, "invalid_object", "$");
});
it("snapshots captured data before a context trap can mutate caller scalars", () => {
  const input = request();
  const context = new Proxy(input.context, {
    ownKeys(target) {
      Object.assign(input, {
        amountMinorUnits: "1",
        paymentId: "sim_payment_other",
      });
      return Reflect.ownKeys(target);
    },
  });
  Object.assign(input, { context });
  expect(manifest(input).sourceRecords[0]!.payload.text).toBe(golden);
});
