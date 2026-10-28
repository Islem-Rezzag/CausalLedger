import { createHash } from "node:crypto";
import { expect, it } from "vitest";
import {
  generatePaymentAuthorized,
  generatePaymentCaptured,
  generateDisputeOpened,
  generateChargebackFee,
  CHARGEBACK_FEE_REQUEST_VERSION,
  PAYMENT_AUTHORIZED_REQUEST_VERSION,
  PAYMENT_CAPTURED_REQUEST_VERSION,
  DISPUTE_OPENED_REQUEST_VERSION,
  validateSimulatorManifest,
} from "../src/index.js";
import type {
  SimulatorManifest,
  DisputeResult,
  DisputeOpenedRequest,
  ChargebackFeeRequest,
} from "../src/index.js";
const time = "2026-01-02T03:04:05Z";
function value(r: DisputeResult): SimulatorManifest {
  expect(r.ok, JSON.stringify(r.issues)).toBe(true);
  if (!r.ok) throw new Error("rejected");
  return r.value;
}
function clone<T>(x: T): T {
  return JSON.parse(JSON.stringify(x)) as T;
}
function frozen(x: unknown) {
  if (x && typeof x === "object") {
    expect(Object.isFrozen(x)).toBe(true);
    for (const c of Object.values(x)) frozen(c);
  }
}
function reject(r: DisputeResult, code?: string, path?: string) {
  expect(r.ok).toBe(false);
  expect(r).not.toHaveProperty("value");
  frozen(r);
  if (code) expect(r.issues).toContainEqual({ code, path });
}
function member(
  n = 1,
  amount = "1250",
  currency = "GBP",
  provider = "sim_provider_demo",
  merchant = "sim_merchant_1",
): SimulatorManifest {
  const context = {
    sourceId: "sim_source_demo",
    providerId: provider,
    merchantId: merchant,
    payerId: "sim_payer_" + n,
    paymentId: "sim_payment_" + n,
    currency,
  };
  const auth = {
    schemaVersion: PAYMENT_AUTHORIZED_REQUEST_VERSION,
    synthetic: true as const,
    scenarioId: "sim_scenario_demo",
    observationCutoff: time,
    ...context,
    sourceOccurrenceId: "sim_occ_auth" + n,
    sourceRecordId: "sim_record_auth" + n,
    eventTime: time,
    deliveryId: "sim_delivery_auth" + n,
    receiptDescriptorId: "sim_receipt_auth" + n,
    observedAt: time,
    deliveryOrder: 2 * n - 2,
    authorizationId: "sim_auth_" + n,
    amountMinorUnits: amount,
    context,
  };
  const a = value(generatePaymentAuthorized(auth));
  const { context: _context, ...base } = auth;
  void _context;
  return value(
    generatePaymentCaptured({
      ...base,
      schemaVersion: PAYMENT_CAPTURED_REQUEST_VERSION,
      sourceOccurrenceId: "sim_occ_capture" + n,
      sourceRecordId: "sim_record_capture" + n,
      deliveryId: "sim_delivery_capture" + n,
      receiptDescriptorId: "sim_receipt_capture" + n,
      deliveryOrder: 2 * n - 1,
      captureId: "sim_capture_" + n,
      authorizationManifest: a,
    }),
  );
}
function request(contextManifest = member()): DisputeOpenedRequest {
  return {
    schemaVersion: DISPUTE_OPENED_REQUEST_VERSION,
    synthetic: true,
    scenarioId: "sim_scenario_demo",
    observationCutoff: time,
    sourceId: "sim_source_demo",
    sourceOccurrenceId: "sim_occ_dispute1",
    sourceRecordId: "sim_record_dispute1",
    eventTime: time,
    deliveryId: "sim_delivery_dispute1",
    receiptDescriptorId: "sim_receipt_dispute1",
    observedAt: time,
    deliveryOrder: 2,
    providerId: "sim_provider_demo",
    merchantId: "sim_merchant_1",
    payerId: "sim_payer_1",
    paymentId: "sim_payment_1",
    authorizationId: "sim_auth_1",
    captureId: "sim_capture_1",
    disputeId: "sim_dispute_1",
    currency: "GBP",
    reason: "goods_not_received",
    contextManifest,
  };
}
function opened(r: unknown = request()) {
  return value(generateDisputeOpened(r));
}
function body(
  m: SimulatorManifest,
  i = m.sourceRecords.length - 1,
): Record<string, unknown> {
  return JSON.parse(m.sourceRecords[i]!.payload.text) as Record<
    string,
    unknown
  >;
}
it("opened: preserves capture and records only the supplied challenge", () => {
  const r = request(),
    before = JSON.stringify(r),
    m = opened(r);
  expect(JSON.stringify(r)).toBe(before);
  frozen(m);
  expect(m.sourceRecords.slice(0, 2)).toEqual(r.contextManifest.sourceRecords);
  expect(m.deliveries.slice(0, 2)).toEqual(r.contextManifest.deliveries);
  expect(body(m)).toMatchObject({
    eventType: "dispute_opened",
    reason: "goods_not_received",
    disputeId: "sim_dispute_1",
  });
  for (const k of [
    "amount",
    "fee",
    "chargebackId",
    "status",
    "outcome",
    "approved",
  ])
    expect(body(m)).not.toHaveProperty(k);
  expect(m.sourceRecords).toHaveLength(3);
  expect(m.deliveries).toHaveLength(3);
  expect(generateDisputeOpened(r)).toEqual(generateDisputeOpened(r));
});
it.each([
  "",
  " ",
  " x",
  "x ",
  "x".repeat(257),
  "x\n",
  "x\r",
  "x\t",
  "x\u007f",
  "ÃƒÂ©",
  "x\u2028",
  "x\u2029",
])("opened: rejects invalid reason %j", (reason) =>
  reject(
    generateDisputeOpened({ ...request(), reason }),
    "invalid_value",
    "$.reason",
  ),
);
it.each(["x", "x".repeat(256), 'goods "missing" \\ item'])(
  "opened: preserves accepted reason %j",
  (reason) =>
    expect(body(opened({ ...request(), reason })).reason).toBe(reason),
);
it.each([
  "sourceId",
  "providerId",
  "merchantId",
  "payerId",
  "paymentId",
  "authorizationId",
  "captureId",
  "scenarioId",
])("opened: rejects conflicting %s", (key) => {
  const r = request();
  reject(
    generateDisputeOpened({
      ...r,
      [key]: String(r[key as keyof DisputeOpenedRequest]) + "other",
    }),
    "invalid_reference",
    "$." + key,
  );
});
it("opened: missing or altered capture is refused even with a recomputed hash", () => {
  reject(generateDisputeOpened({ ...request(), contextManifest: undefined }));
  const m = member(),
    s = m.sourceRecords[1]!,
    text = JSON.stringify({ ...body(m), eventType: "chargeback_created" });
  const changed = {
    ...m,
    sourceRecords: [
      m.sourceRecords[0]!,
      {
        ...s,
        payload: {
          ...s.payload,
          text,
          sha256: createHash("sha256").update(text).digest("hex"),
        },
      },
    ],
  };
  expect(validateSimulatorManifest(changed).ok).toBe(true);
  reject(
    generateDisputeOpened(request(changed)),
    "invalid_payload",
    "$.contextManifest",
  );
});
it("opened: root snapshots precede caller-owned context traps", () => {
  const r: {
    -readonly [K in keyof DisputeOpenedRequest]: DisputeOpenedRequest[K];
  } = clone(request());
  const original = JSON.stringify(r);
  r.contextManifest = new Proxy(r.contextManifest, {
    getPrototypeOf(t) {
      r.reason = "tampered";
      r.disputeId = "sim_dispute_other";
      return Reflect.getPrototypeOf(t);
    },
  });
  const m = opened(r);
  expect(JSON.stringify(r)).not.toBe(original);
  expect(body(m).reason).toBe("goods_not_received");
  expect(body(m).disputeId).toBe("sim_dispute_1");
});
it.each([null, [], true, 1, "x"])(
  "opened: refuses malformed root %j",
  (input) => reject(generateDisputeOpened(input)),
);
it("opened: validates time floor and keeps observation metadata independent", () => {
  reject(
    generateDisputeOpened({
      ...request(),
      eventTime: "2026-01-02T03:04:04.999Z",
    }),
    "invalid_value",
    "$.eventTime",
  );
  const m = opened({
    ...request(),
    eventTime: "2026-01-02T03:04:05.000Z",
    observedAt: "2025-01-01T00:00:00Z",
    observationCutoff: "2024-01-01T00:00:00Z",
    deliveryOrder: 99,
  });
  expect(body(m).eventTime).toBe("2026-01-02T03:04:05.000Z");
  expect(m.deliveries.at(-1)?.deliveryOrder).toBe(99);
});

function feeRequest(
  contextManifest = opened(),
  amount = "150",
): ChargebackFeeRequest {
  const { reason: _reason, ...r } = request();
  void _reason;
  return {
    ...r,
    schemaVersion: CHARGEBACK_FEE_REQUEST_VERSION,
    sourceOccurrenceId: "sim_occ_fee1",
    sourceRecordId: "sim_record_fee1",
    deliveryId: "sim_delivery_fee1",
    receiptDescriptorId: "sim_receipt_fee1",
    deliveryOrder: 3,
    feeId: "sim_fee_1",
    feeAmountMinorUnits: amount,
    contextManifest,
  };
}
function fee(r: unknown = feeRequest()) {
  return value(generateChargebackFee(r));
}
function forge(
  m: SimulatorManifest,
  index: number,
  patch: Record<string, unknown>,
): SimulatorManifest {
  const text = JSON.stringify({ ...body(m, index), ...patch });
  return {
    ...m,
    sourceRecords: m.sourceRecords.map((s, i) =>
      i === index
        ? {
            ...s,
            payload: {
              ...s.payload,
              text,
              sha256: createHash("sha256").update(text).digest("hex"),
            },
          }
        : s,
    ),
  };
}
it("fee: explicit amount is independent of capture and no inferred principal movement", () => {
  for (const amount of ["1", "150", "1250", "1500", "9".repeat(128)]) {
    const r = feeRequest(opened(), amount),
      before = JSON.stringify(r),
      m = fee(r);
    expect(JSON.stringify(r)).toBe(before);
    frozen(m);
    expect(m.sourceRecords.slice(0, 3)).toEqual(
      r.contextManifest.sourceRecords,
    );
    expect(m.deliveries.slice(0, 3)).toEqual(r.contextManifest.deliveries);
    expect(body(m)).toMatchObject({
      eventType: "chargeback_fee",
      feeId: "sim_fee_1",
      fee: {
        minorUnits: amount,
        currency: "GBP",
        representation: "integer_minor_units",
      },
    });
    for (const key of [
      "amount",
      "chargebackId",
      "outcome",
      "posted",
      "approved",
      "settled",
    ])
      expect(body(m)).not.toHaveProperty(key);
    expect(m.sourceRecords).toHaveLength(4);
    expect(m.deliveries).toHaveLength(4);
    expect(generateChargebackFee(r)).toEqual(generateChargebackFee(r));
  }
});
it.each([
  "",
  "0",
  "00",
  "01",
  "+1",
  "-1",
  "1.5",
  "1e2",
  " 1",
  "1 ",
  "1\n",
  "Ù¡",
  "9".repeat(129),
  150,
  150n,
  NaN,
  Infinity,
  null,
])("fee: refuses noncanonical amount %s", (amount) =>
  reject(
    generateChargebackFee({ ...feeRequest(), feeAmountMinorUnits: amount }),
    "invalid_amount",
    "$.feeAmountMinorUnits",
  ),
);
it("fee: explicit dispute/capture references bind exact earlier evidence", () => {
  const m = fee(),
    p = body(m);
  expect(p.captureReference).toEqual({
    sourceId: m.sourceRecords[1]!.sourceId,
    sourceOccurrenceId: m.sourceRecords[1]!.sourceOccurrenceId,
    payloadSha256: m.sourceRecords[1]!.payload.sha256,
  });
  expect(p.disputeReference).toEqual({
    sourceId: m.sourceRecords[2]!.sourceId,
    sourceOccurrenceId: m.sourceRecords[2]!.sourceOccurrenceId,
    payloadSha256: m.sourceRecords[2]!.payload.sha256,
  });
  reject(
    generateChargebackFee({ ...feeRequest(), disputeId: "sim_dispute_other" }),
    "invalid_reference",
    "$.disputeId",
  );
  reject(
    generateChargebackFee(feeRequest(member())),
    "invalid_payload",
    "$.contextManifest",
  );
});
it("fee: parent time floor uses opened dispute, not just capture", () => {
  const m = opened({ ...request(), eventTime: "2026-01-03T00:00:00Z" });
  reject(generateChargebackFee(feeRequest(m)), "invalid_value", "$.eventTime");
  expect(
    body(fee({ ...feeRequest(m), eventTime: "2026-01-03T00:00:00.000Z" }))
      .eventTime,
  ).toBe("2026-01-03T00:00:00.000Z");
});
it("fee: does not reread actual caller scalars during context inspection", () => {
  const r: {
    -readonly [K in keyof ChargebackFeeRequest]: ChargebackFeeRequest[K];
  } = clone(feeRequest());
  r.contextManifest = new Proxy(r.contextManifest, {
    getPrototypeOf(t) {
      r.feeAmountMinorUnits = "999";
      r.feeId = "sim_fee_changed";
      r.disputeId = "sim_dispute_other";
      return Reflect.getPrototypeOf(t);
    },
  });
  const m = fee(r);
  expect(r.feeAmountMinorUnits).toBe("999");
  expect(body(m).fee).toMatchObject({ minorUnits: "150" });
  expect(body(m).feeId).toBe("sim_fee_1");
});
it.each([
  { eventType: "chargeback_created" },
  { schemaVersion: "m05.09-dispute-opened-record.v2" },
  { amount: { minorUnits: "1250", currency: "GBP" } },
  {
    captureReference: {
      sourceId: "sim_source_demo",
      sourceOccurrenceId: "sim_occ_capture1",
      payloadSha256: "0".repeat(64),
    },
  },
  { currency: "USD" },
  { reason: "bad\n" },
  { eventTime: "2025-01-01T00:00:00Z" },
  { unknown: true },
])("fee: refuses hash-valid forged opened wire %j", (patch) => {
  const m = forge(opened(), 2, patch);
  expect(validateSimulatorManifest(m).ok).toBe(true);
  reject(
    generateChargebackFee(feeRequest(m)),
    "invalid_payload",
    "$.contextManifest",
  );
});
for (const [kind, generate, make] of [
  ["opened", generateDisputeOpened, request],
  ["fee", generateChargebackFee, feeRequest],
] as const) {
  it.each(Object.keys(make()))(kind + ": requires %s", (key) => {
    const r = { ...make() } as Record<string, unknown>;
    delete r[key];
    reject(generate(r), "missing_field", "$." + key);
  });
  it.each([
    "providerId",
    "merchantId",
    "payerId",
    "paymentId",
    "authorizationId",
    "captureId",
    "sourceId",
    "scenarioId",
  ])(kind + ": identity mismatch %s", (key) => {
    const r = { ...make() } as Record<string, unknown>;
    r[key] += "other";
    reject(generate(r), "invalid_reference", "$." + key);
  });
  it.each([
    "sourceRecordId",
    "sourceOccurrenceId",
    "deliveryId",
    "receiptDescriptorId",
    "deliveryOrder",
  ])(kind + ": refuses combined collision %s", (key) => {
    const r = make(),
      m = r.contextManifest,
      source = m.sourceRecords[0]!,
      delivery = m.deliveries[0]!;
    reject(
      generate({
        ...r,
        [key]:
          key in source
            ? source[key as keyof typeof source]
            : delivery[key as keyof typeof delivery],
      }),
    );
  });
  it.each([null, [], true, "", 1])(kind + ": malformed root %j", (v) =>
    reject(generate(v)),
  );
  it.each(["usd", "GB", "GBP\n", 1])(
    kind + ": invalid currency %j",
    (currency) =>
      reject(
        generate({ ...make(), currency }),
        "invalid_currency",
        "$.currency",
      ),
  );
  it(kind + ": refuses wrong currency without inferring exchange", () =>
    reject(
      generate({ ...make(), currency: "USD" }),
      "invalid_reference",
      "$.currency",
    ),
  );
  it.each([
    "2026-02-30T00:00:00Z",
    "2026-01-01T00:00:00+00:00",
    "2026-01-01T00:00:00Z\n",
    null,
  ])(kind + ": malformed event time %j", (eventTime) =>
    reject(generate({ ...make(), eventTime })),
  );
  it(
    kind +
      ": rejects getters, hidden, symbol, class and unknown root authority",
    () => {
      let calls = 0;
      const accessor = { ...make() };
      Object.defineProperty(accessor, "eventTime", {
        enumerable: true,
        get() {
          calls++;
          return time;
        },
      });
      reject(generate(accessor));
      expect(calls).toBe(0);
      const hidden = { ...make() };
      Object.defineProperty(hidden, "hidden", { value: true });
      reject(generate(hidden));
      reject(generate({ ...make(), [Symbol("hidden")]: true }));
      reject(
        generate(
          Object.assign(Object.create({ inherited: true }) as object, make()),
        ),
      );
      reject(
        generate({ ...make(), approved: true }),
        "unknown_field",
        "$.approved",
      );
      expect(
        generate(Object.assign(Object.create(null) as object, make())).ok,
      ).toBe(true);
    },
  );
  it(kind + ": detached output and no cross-call consumption", () => {
    const r = clone(make()),
      a = generate(r),
      b = generate(r);
    expect(a).toEqual(b);
    expect(a.ok).toBe(true);
    if (!a.ok) throw new Error("rejected");
    const before = JSON.stringify(a);
    (r.contextManifest as unknown as { scenarioId: string }).scenarioId =
      "sim_scenario_changed";
    expect(JSON.stringify(a)).toBe(before);
    frozen(a);
    expect(a.value.sourceRecords).not.toBe(r.contextManifest.sourceRecords);
  });
  it(
    kind +
      ": rejects an extra generic-valid source and delivery in owned context",
    () => {
      const r = make(),
        m = r.contextManifest;
      const extra = {
        ...m.sourceRecords[0]!,
        sourceRecordId: "sim_record_extra",
        sourceOccurrenceId: "sim_occ_extra",
      };
      const contextManifest = {
        ...m,
        sourceRecords: [...m.sourceRecords, extra],
        deliveries: [
          ...m.deliveries,
          {
            ...m.deliveries[0]!,
            sourceRecordId: extra.sourceRecordId,
            sourceOccurrenceId: extra.sourceOccurrenceId,
            deliveryId: "sim_delivery_extra",
            receiptDescriptorId: "sim_receipt_extra",
            deliveryOrder: 100,
          },
        ],
      };
      expect(validateSimulatorManifest(contextManifest).ok).toBe(true);
      reject(
        generate({ ...r, contextManifest }),
        "invalid_payload",
        "$.contextManifest",
      );
    },
  );
  it(
    kind + ": refuses excessive or hostile context arrays without getter calls",
    () => {
      const r = clone(make()),
        m = r.contextManifest;
      let calls = 0;
      const sources = [...m.sourceRecords];
      Object.defineProperty(sources, "0", {
        enumerable: true,
        get() {
          calls++;
          return m.sourceRecords[0];
        },
      });
      reject(
        generate({ ...r, contextManifest: { ...m, sourceRecords: sources } }),
      );
      expect(calls).toBe(0);
      reject(
        generate({
          ...r,
          contextManifest: {
            ...m,
            sourceRecords: [...m.sourceRecords, ...m.sourceRecords],
          },
        }),
      );
      const sparse = [...m.sourceRecords];
      delete sparse[0];
      reject(
        generate({ ...r, contextManifest: { ...m, sourceRecords: sparse } }),
      );
      reject(
        generate({
          ...r,
          contextManifest: { ...m, generatorVersion: "wrong.v1" },
        }),
      );
    },
  );
  it(
    kind +
      ": preserves supplied delivery order and independent observation clocks",
    () => {
      const m = value(
        generate({
          ...make(),
          observedAt: "2025-01-01T00:00:00Z",
          observationCutoff: "2024-01-01T00:00:00Z",
          deliveryOrder: 99,
        }),
      );
      expect(m.deliveries.at(-1)?.observedAt).toBe("2025-01-01T00:00:00Z");
      expect(m.deliveries.at(-1)?.deliveryOrder).toBe(99);
      expect(m.observationCutoff).toBe("2024-01-01T00:00:00Z");
    },
  );
}
it("fixed-depth boundary refuses second dispute, second fee and unrelated refund context", () => {
  reject(
    generateDisputeOpened(request(opened())),
    "invalid_payload",
    "$.contextManifest",
  );
  reject(
    generateChargebackFee(feeRequest(fee())),
    "invalid_payload",
    "$.contextManifest",
  );
  const m = { ...opened(), generatorVersion: "m05.07-refund-created.v1" };
  reject(
    generateChargebackFee(feeRequest(m)),
    "invalid_payload",
    "$.contextManifest",
  );
});
it("demonstration:1250 capture, opened dispute, explicit150 fee, no inferred principal, missing dispute refused", () => {
  const original = member(),
    a = opened(request(original)),
    b = fee(feeRequest(a));
  expect([original, a, b].map((x) => x.sourceRecords.length)).toEqual([
    2, 3, 4,
  ]);
  expect(body(a)).not.toHaveProperty("amount");
  expect(body(a)).not.toHaveProperty("fee");
  expect(body(b).fee).toEqual({
    minorUnits: "150",
    currency: "GBP",
    representation: "integer_minor_units",
  });
  expect(b.sourceRecords.slice(0, 2)).toEqual(original.sourceRecords);
  expect(b.deliveries.slice(0, 2)).toEqual(original.deliveries);
  expect(body(fee(feeRequest(a, "1500"))).fee).toMatchObject({
    minorUnits: "1500",
  });
  reject(
    generateChargebackFee(feeRequest(original)),
    "invalid_payload",
    "$.contextManifest",
  );
});

// Independent Python-composed literal bytes/hashes; never derived from runtime output.
it("matches independent literal opened and fee wires/SHA256", () => {
  expect(opened().sourceRecords.at(-1)?.payload).toEqual({
    encoding: "utf-8",
    mediaType: "application/json",
    text: '{"schemaVersion":"m05.09-dispute-opened-record.v1","synthetic":true,"eventType":"dispute_opened","sourceId":"sim_source_demo","sourceOccurrenceId":"sim_occ_dispute1","providerId":"sim_provider_demo","merchantId":"sim_merchant_1","payerId":"sim_payer_1","paymentId":"sim_payment_1","authorizationId":"sim_auth_1","captureId":"sim_capture_1","disputeId":"sim_dispute_1","reason":"goods_not_received","currency":"GBP","captureReference":{"sourceId":"sim_source_demo","sourceOccurrenceId":"sim_occ_capture1","payloadSha256":"7d0caa1183eb9415260a114a03c0cb60793c9fd8e2995f2f5a30a1c3ece9ee53"},"eventTime":"2026-01-02T03:04:05Z"}',
    sha256: "a636599cfd7e29f9ee6073f33d0b0defb131e912855c9f1885ff751f9c45e88d",
  });
  expect(fee().sourceRecords.at(-1)?.payload).toEqual({
    encoding: "utf-8",
    mediaType: "application/json",
    text: '{"schemaVersion":"m05.10-chargeback-fee-record.v1","synthetic":true,"eventType":"chargeback_fee","sourceId":"sim_source_demo","sourceOccurrenceId":"sim_occ_fee1","providerId":"sim_provider_demo","merchantId":"sim_merchant_1","payerId":"sim_payer_1","paymentId":"sim_payment_1","authorizationId":"sim_auth_1","captureId":"sim_capture_1","disputeId":"sim_dispute_1","feeId":"sim_fee_1","fee":{"minorUnits":"150","currency":"GBP","representation":"integer_minor_units"},"captureReference":{"sourceId":"sim_source_demo","sourceOccurrenceId":"sim_occ_capture1","payloadSha256":"7d0caa1183eb9415260a114a03c0cb60793c9fd8e2995f2f5a30a1c3ece9ee53"},"disputeReference":{"sourceId":"sim_source_demo","sourceOccurrenceId":"sim_occ_dispute1","payloadSha256":"a636599cfd7e29f9ee6073f33d0b0defb131e912855c9f1885ff751f9c45e88d"},"eventTime":"2026-01-02T03:04:05Z"}',
    sha256: "e7c657cf827038cf802188159ae4304235466f12db968099f39387a7fca7962f",
  });
});
