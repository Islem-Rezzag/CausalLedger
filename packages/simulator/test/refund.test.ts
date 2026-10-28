import { createHash } from "node:crypto";
import { expect, it } from "vitest";
import {
  generatePaymentAuthorized,
  generatePaymentCaptured,
  generateRefundCreated,
  generateRefundPaid,
  PAYMENT_AUTHORIZED_REQUEST_VERSION,
  PAYMENT_CAPTURED_REQUEST_VERSION,
  REFUND_CREATED_REQUEST_VERSION,
  REFUND_PAID_REQUEST_VERSION,
  validateSimulatorManifest,
} from "../src/index.js";
import type {
  SimulatorManifest,
  RefundResult,
  RefundCreatedRequest,
  RefundPaidRequest,
} from "../src/index.js";
const time = "2026-01-02T03:04:05Z";
function value(r: RefundResult): SimulatorManifest {
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
function reject(r: RefundResult, code?: string, path?: string) {
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

function request(
  amount = "500",
  contextManifest = member(),
  n = 1,
): RefundCreatedRequest {
  return {
    schemaVersion: REFUND_CREATED_REQUEST_VERSION,
    synthetic: true,
    scenarioId: "sim_scenario_demo",
    observationCutoff: time,
    sourceId: "sim_source_demo",
    sourceOccurrenceId: "sim_occ_refund" + n,
    sourceRecordId: "sim_record_refund" + n,
    eventTime: time,
    deliveryId: "sim_delivery_refund" + n,
    receiptDescriptorId: "sim_receipt_refund" + n,
    observedAt: time,
    deliveryOrder: 2 * n,
    providerId: "sim_provider_demo",
    merchantId: "sim_merchant_1",
    payerId: "sim_payer_1",
    paymentId: "sim_payment_1",
    authorizationId: "sim_auth_1",
    captureId: "sim_capture_1",
    refundId: "sim_refund_" + n,
    amountMinorUnits: amount,
    currency: "GBP",
    contextManifest,
  };
}
function created(r: unknown = request()) {
  return value(generateRefundCreated(r));
}
function body(
  m: SimulatorManifest,
  index = m.sourceRecords.length - 1,
): Record<string, unknown> {
  return JSON.parse(m.sourceRecords[index]!.payload.text) as Record<
    string,
    unknown
  >;
}
function forged(
  m: SimulatorManifest,
  index: number,
  patch: Record<string, unknown>,
): SimulatorManifest {
  const x = clone(m),
    b = { ...body(x, index), ...patch };
  const text = JSON.stringify(b);
  const source = x.sourceRecords[index]!;
  return {
    ...x,
    sourceRecords: x.sourceRecords.map((s, i) =>
      i === index
        ? {
            ...source,
            payload: {
              ...source.payload,
              text,
              sha256: createHash("sha256").update(text).digest("hex"),
            },
          }
        : s,
    ),
  };
}
it.each(["1", "500", "1250"])(
  "created: full or partial %s preserves exact capture evidence",
  (amount) => {
    const r = request(amount),
      before = JSON.stringify(r),
      m = created(r);
    expect(m.sourceRecords).toHaveLength(3);
    expect(m.deliveries).toHaveLength(3);
    expect(m.sourceRecords.slice(0, 2)).toEqual(
      r.contextManifest.sourceRecords,
    );
    expect(m.deliveries.slice(0, 2)).toEqual(r.contextManifest.deliveries);
    expect(m.sourceRecords[0]).not.toBe(r.contextManifest.sourceRecords[0]);
    expect(body(m)).toMatchObject({
      eventType: "refund_created",
      refundPolicy: "bounded_capture_refunds.v1",
      amount: { minorUnits: amount, currency: "GBP" },
      captureReference: {
        payloadSha256: r.contextManifest.sourceRecords[1]!.payload.sha256,
      },
    });
    frozen(m);
    expect(JSON.stringify(r)).toBe(before);
    expect(created(r)).toEqual(m);
  },
);
it("created: multiple refunds reserve supplied budget including pending refunds", () => {
  const first = created(),
    second = created(request("750", first, 2));
  expect(second.sourceRecords).toHaveLength(4);
  expect(second.sourceRecords.slice(0, 3)).toEqual(first.sourceRecords);
  reject(
    generateRefundCreated(request("1", second, 3)),
    "invalid_amount",
    "$.amountMinorUnits",
  );
  reject(
    generateRefundCreated(request("751", first, 2)),
    "invalid_amount",
    "$.amountMinorUnits",
  );
  // Separate calls with the same context make no claim of shared consumption.
  expect(created(request("1250"))).toEqual(created(request("1250")));
});
it("created: exact128digit arithmetic and16-refund bound", () => {
  const cap = member(1, "9".repeat(128));
  const big = (BigInt("9".repeat(128)) - 1n).toString();
  const a = created(request(big, cap));
  expect(created(request("1", a, 2)).sourceRecords).toHaveLength(4);
  reject(
    generateRefundCreated(request("2", a, 2)),
    "invalid_amount",
    "$.amountMinorUnits",
  );
  let m = member();
  for (let i = 1; i <= 16; i++) m = created(request("1", m, i));
  expect(m.sourceRecords).toHaveLength(18);
  reject(
    generateRefundCreated(request("1", m, 17)),
    "invalid_value",
    "$.contextManifest",
  );
});
it.each([
  "0",
  "-1",
  "+1",
  "1.0",
  "01",
  " 1",
  "1 ",
  "1e3",
  "1\n",
  1,
  1n,
  NaN,
  null,
  "9".repeat(129),
  "1251",
])("created: rejects invalid or excessive money %s", (amount) =>
  reject(
    generateRefundCreated({ ...request(), amountMinorUnits: amount }),
    "invalid_amount",
    "$.amountMinorUnits",
  ),
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
  "currency",
])("created: refuses conflicting %s", (key) => {
  const r = request() as unknown as Record<string, unknown>;
  r[key] = key === "currency" ? "USD" : String(r[key]) + "other";
  reject(generateRefundCreated(r), "invalid_reference", "$." + key);
});
it("created: rejects repeated stable refund even with fresh occurrence IDs", () => {
  const first = created();
  reject(
    generateRefundCreated({
      ...request("1", first, 2),
      refundId: "sim_refund_1",
    }),
    "duplicate_identity",
    "$.refundId",
  );
});
it.each([undefined, null, {}, [], member().sourceRecords, created()])(
  "created: wrong or duplicate context is refused without partial output",
  (context) => {
    if (context && typeof context === "object" && "generatorVersion" in context)
      reject(
        generateRefundCreated(request("500", context as SimulatorManifest)),
      );
    else
      reject(
        generateRefundCreated({ ...request(), contextManifest: context }),
        "invalid_payload",
        "$.contextManifest",
      );
  },
);
it("created: detects forged hash-valid capture and prior refund", () => {
  for (const [m, index, patch] of [
    [member(), 1, { eventType: "capture_failed" }],
    [created(), 2, { refundPolicy: "invented" }],
    [created(), 2, { eventType: "refund_failed" }],
    [
      created(),
      2,
      {
        amount: {
          minorUnits: "1500",
          currency: "GBP",
          representation: "integer_minor_units",
        },
      },
    ],
  ] as const) {
    const bad = forged(m, index, patch);
    expect(validateSimulatorManifest(bad).ok).toBe(true);
    reject(
      generateRefundCreated(request("1", bad, 2)),
      "invalid_payload",
      "$.contextManifest",
    );
  }
});
it("created: known event floor with independent observation clocks", () => {
  reject(
    generateRefundCreated({
      ...request(),
      eventTime: "2026-01-02T03:04:04.999Z",
    }),
    "invalid_value",
    "$.eventTime",
  );
  const m = created({
    ...request(),
    eventTime: "2026-01-02T03:04:05.000Z",
    observedAt: "2025-01-01T00:00:00Z",
    observationCutoff: "2024-01-01T00:00:00Z",
    deliveryOrder: 999,
  });
  expect(m.deliveries.at(-1)?.observedAt).toBe("2025-01-01T00:00:00Z");
});

function paidRequest(
  contextManifest = created(),
  n = 1,
  amount = "500",
): RefundPaidRequest {
  return {
    ...request(amount, contextManifest, n),
    schemaVersion: REFUND_PAID_REQUEST_VERSION,
    sourceOccurrenceId: "sim_occ_paid" + n,
    sourceRecordId: "sim_record_paid" + n,
    deliveryId: "sim_delivery_paid" + n,
    receiptDescriptorId: "sim_receipt_paid" + n,
    deliveryOrder: 2 * n + 1,
  };
}
function paid(r: unknown = paidRequest()) {
  return value(generateRefundPaid(r));
}
it("paid: distinct report keeps exact original records and binds creation", () => {
  const r = paidRequest(),
    before = JSON.stringify(r),
    m = paid(r);
  expect(m.sourceRecords).toHaveLength(4);
  expect(m.deliveries).toHaveLength(4);
  expect(m.sourceRecords.slice(0, 3)).toEqual(r.contextManifest.sourceRecords);
  expect(m.deliveries.slice(0, 3)).toEqual(r.contextManifest.deliveries);
  expect(body(m)).toMatchObject({
    eventType: "refund_paid",
    refundId: "sim_refund_1",
    creationReference: {
      sourceId: "sim_source_demo",
      sourceOccurrenceId: "sim_occ_refund1",
      payloadSha256: r.contextManifest.sourceRecords[2]!.payload.sha256,
    },
  });
  expect(body(m).captureReference).toEqual(
    body(r.contextManifest).captureReference,
  );
  expect(paid(r)).toEqual(m);
  expect(JSON.stringify(r)).toBe(before);
  frozen(m);
  expect(m.sourceRecords[2]).not.toBe(r.contextManifest.sourceRecords[2]);
});
it("paid: interleaved refunds select exact target and never double-count paid", () => {
  const first = created(),
    second = created({
      ...request("750", first, 2),
      eventTime: "2026-02-01T00:00:00Z",
    });
  const paidFirst = paid(paidRequest(second));
  expect(body(paidFirst).creationReference).toEqual(
    body(paid()).creationReference,
  );
  const done = paid({
    ...paidRequest(paidFirst, 2, "750"),
    eventTime: "2026-02-01T00:00:00Z",
  });
  expect(done.sourceRecords).toHaveLength(6);
  reject(
    generateRefundCreated(request("1", done, 3)),
    "invalid_amount",
    "$.amountMinorUnits",
  );
  expect(created(request("750", paid(), 2)).sourceRecords).toHaveLength(5);
  reject(
    generateRefundPaid(paidRequest(done)),
    "duplicate_identity",
    "$.refundId",
  );
});
it("paid: maximum16 creations and16 paid reports; exact full128digit paid", () => {
  let m = member();
  for (let n = 1; n <= 16; n++) m = created(request("1", m, n));
  for (let n = 16; n >= 1; n--) m = paid(paidRequest(m, n, "1"));
  expect(m.sourceRecords).toHaveLength(34);
  expect(m.deliveries).toHaveLength(34);
  reject(
    generateRefundCreated(request("1", m, 17)),
    "invalid_value",
    "$.contextManifest",
  );
  reject(
    generateRefundPaid(paidRequest(m, 1, "1")),
    "duplicate_identity",
    "$.refundId",
  );
  const amount = "9".repeat(128);
  expect(
    paid(paidRequest(created(request(amount, member(1, amount))), 1, amount))
      .sourceRecords,
  ).toHaveLength(4);
});
it.each(["499", "501", "1251"])("paid: refuses changed amount %s", (amount) =>
  reject(
    generateRefundPaid({ ...paidRequest(), amountMinorUnits: amount }),
    "invalid_amount",
    "$.amountMinorUnits",
  ),
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
  "currency",
  "refundId",
])("paid: refuses changed %s", (key) => {
  const r = paidRequest() as unknown as Record<string, unknown>;
  r[key] = key === "currency" ? "USD" : String(r[key]) + "other";
  reject(generateRefundPaid(r), "invalid_reference", "$." + key);
});
it("paid: missing creation, repeated paid, earlier event time are refused", () => {
  reject(
    generateRefundPaid(paidRequest(member())),
    "invalid_reference",
    "$.refundId",
  );
  reject(
    generateRefundPaid(paidRequest(paid())),
    "duplicate_identity",
    "$.refundId",
  );
  reject(
    generateRefundPaid({
      ...paidRequest(),
      eventTime: "2026-01-02T03:04:04.999Z",
    }),
    "invalid_value",
    "$.eventTime",
  );
  expect(
    paid({ ...paidRequest(), eventTime: "2026-01-02T03:04:05.000Z" })
      .sourceRecords,
  ).toHaveLength(4);
});
it.each(["refund_failed", "refund_created", "payout_paid"])(
  "paid: refuses forged hash-valid prior kind %s",
  (eventType) => {
    const bad = forged(paid(), 3, { eventType });
    expect(validateSimulatorManifest(bad).ok).toBe(true);
    reject(
      generateRefundCreated(request("1", bad, 2)),
      "invalid_payload",
      "$.contextManifest",
    );
  },
);
it.each([
  { schemaVersion: "m05.08-refund-paid-record.v999" },
  { synthetic: false },
  { refundId: "sim_refund_unknown" },
  {
    creationReference: {
      sourceId: "sim_source_demo",
      sourceOccurrenceId: "sim_occ_unknown",
      payloadSha256: "0".repeat(64),
    },
  },
  {
    captureReference: {
      sourceId: "sim_source_demo",
      sourceOccurrenceId: "sim_occ_capture1",
      payloadSha256: "0".repeat(64),
    },
  },
  {
    amount: {
      minorUnits: "499",
      currency: "GBP",
      representation: "integer_minor_units",
    },
  },
  { eventTime: "2026-01-01T00:00:00Z" },
  { approved: true },
])("paid: rejects forged canonical-looking record %j", (patch) => {
  const bad = forged(paid(), 3, patch);
  expect(validateSimulatorManifest(bad).ok).toBe(true);
  reject(
    generateRefundCreated(request("1", bad, 2)),
    "invalid_payload",
    "$.contextManifest",
  );
});
for (const [name, make, generate] of [
  ["created", request, generateRefundCreated],
  ["paid", paidRequest, generateRefundPaid],
] as const) {
  it.each([null, undefined, true, [], "text", 1, new Date()])(
    `${name}: rejects malformed root %s`,
    (input) => reject(generate(input)),
  );
  it.each(["schemaVersion", "synthetic", "refundId", "contextManifest"])(
    `${name}: requires explicit %s`,
    (key) => {
      const r = { ...make() } as Record<string, unknown>;
      delete r[key];
      reject(generate(r), "missing_field", "$." + key);
    },
  );
  it.each([
    "sourceRecordId",
    "sourceOccurrenceId",
    "deliveryId",
    "receiptDescriptorId",
    "deliveryOrder",
  ])(`${name}: rejects combined identity collision %s`, (key) => {
    const r = make(),
      s = r.contextManifest.sourceRecords[0]!,
      d = r.contextManifest.deliveries[0]!;
    reject(
      generate({
        ...r,
        [key]: key in s ? s[key as keyof typeof s] : d[key as keyof typeof d],
      }),
    );
  });
  it.each([
    "2026-02-30T00:00:00Z",
    "2026-01-02T03:04:05+00:00",
    "2026-01-02T03:04:05.1234Z",
    null,
  ])(`${name}: rejects malformed time %s`, (eventTime) =>
    reject(generate({ ...make(), eventTime })),
  );
  it(`${name}: strict data snapshot refuses hidden/symbol/getter/prototype authority`, () => {
    let calls = 0;
    const getter = { ...make() };
    Object.defineProperty(getter, "refundId", {
      get() {
        calls++;
        throw new Error("getter");
      },
      enumerable: true,
    });
    reject(generate(getter));
    expect(calls).toBe(0);
    const hidden = { ...make() };
    Object.defineProperty(hidden, "approved", { value: true });
    reject(generate(hidden));
    reject(generate({ ...make(), [Symbol("authority")]: true }));
    reject(
      generate({ ...make(), approved: true }),
      "unknown_field",
      "$.approved",
    );
    reject(generate(Object.assign(Object.create({ approved: true }), make())));
    expect(generate(Object.assign(Object.create(null), make())).ok).toBe(true);
  });
  it(`${name}: captures actual root scalars before context traps and detaches input`, () => {
    const r = clone(make()) as unknown as Record<string, unknown>;
    const before = generate(r);
    r.contextManifest = new Proxy(r.contextManifest as object, {
      getPrototypeOf(target) {
        r.amountMinorUnits = "1251";
        r.refundId = "sim_refund_changed";
        return Reflect.getPrototypeOf(target);
      },
    });
    const output = generate(r);
    expect(output).toEqual(before);
    expect(r.amountMinorUnits).toBe("1251");
    frozen(output);
  });
  it(`${name}: metadata-only changes preserve payload bytes/hash`, () => {
    const a = value(generate(make())),
      b = value(
        generate({
          ...make(),
          observedAt: "2025-01-01T00:00:00Z",
          observationCutoff: "2024-01-01T00:00:00Z",
          deliveryOrder: 999,
          sourceRecordId: "sim_record_other",
          deliveryId: "sim_delivery_other",
          receiptDescriptorId: "sim_receipt_other",
        }),
      );
    expect(b.sourceRecords.at(-1)?.payload).toEqual(
      a.sourceRecords.at(-1)?.payload,
    );
    expect(b.deliveries.at(-1)?.observedAt).toBe("2025-01-01T00:00:00Z");
  });
  it(`${name}: rejects decorated/sparse/accessor history and extra records`, () => {
    const r = make();
    const sparse = clone(r.contextManifest);
    delete (sparse.sourceRecords as unknown[])[0];
    reject(generate({ ...r, contextManifest: sparse }));
    const decorated = clone(r.contextManifest);
    Object.defineProperty(decorated.sourceRecords, "extra", { value: true });
    reject(generate({ ...r, contextManifest: decorated }));
    let calls = 0;
    const accessor = clone(r.contextManifest);
    Object.defineProperty(accessor.sourceRecords, "0", {
      get() {
        calls++;
        throw new Error("source getter");
      },
      enumerable: true,
    });
    reject(generate({ ...r, contextManifest: accessor }));
    expect(calls).toBe(0);
    reject(
      generate({
        ...r,
        contextManifest: {
          ...r.contextManifest,
          generatorVersion: "m05.08-refund-paid.v999",
        },
      }),
    );
  });
}
it("demonstration:1250 capture,500+750 refunds, paid reports preserve evidence, extra1 refused", () => {
  const original = member(),
    a = created(request("500", original)),
    b = paid(paidRequest(a)),
    c = created(request("750", b, 2)),
    d = paid(paidRequest(c, 2, "750"));
  expect([original, a, b, c, d].map((m) => m.sourceRecords.length)).toEqual([
    2, 3, 4, 5, 6,
  ]);
  expect(d.sourceRecords.slice(0, 2)).toEqual(original.sourceRecords);
  expect(d.deliveries.slice(0, 2)).toEqual(original.deliveries);
  expect(
    d.sourceRecords
      .slice(2)
      .map(
        (s) => (JSON.parse(s.payload.text) as { eventType: string }).eventType,
      ),
  ).toEqual(["refund_created", "refund_paid", "refund_created", "refund_paid"]);
  reject(
    generateRefundCreated(request("1", d, 3)),
    "invalid_amount",
    "$.amountMinorUnits",
  );
});

// Literal golden wires and hashes independently composed with Python hashlib.
it("matches independent literal refund wires and SHA256", () => {
  const createdWire =
    '{"schemaVersion":"m05.07-refund-created-record.v1","synthetic":true,"eventType":"refund_created","sourceId":"sim_source_demo","sourceOccurrenceId":"sim_occ_refund1","providerId":"sim_provider_demo","merchantId":"sim_merchant_1","payerId":"sim_payer_1","paymentId":"sim_payment_1","authorizationId":"sim_auth_1","captureId":"sim_capture_1","refundId":"sim_refund_1","amount":{"minorUnits":"500","currency":"GBP","representation":"integer_minor_units"},"refundPolicy":"bounded_capture_refunds.v1","captureReference":{"sourceId":"sim_source_demo","sourceOccurrenceId":"sim_occ_capture1","payloadSha256":"7d0caa1183eb9415260a114a03c0cb60793c9fd8e2995f2f5a30a1c3ece9ee53"},"eventTime":"2026-01-02T03:04:05Z"}';
  expect(created().sourceRecords.at(-1)?.payload).toEqual({
    encoding: "utf-8",
    mediaType: "application/json",
    text: createdWire,
    sha256: "97e19c2fd87179445451620e40863ca88731b721f285b1a787663aff0941c240",
  });
  const paidWire =
    '{"schemaVersion":"m05.08-refund-paid-record.v1","synthetic":true,"eventType":"refund_paid","sourceId":"sim_source_demo","sourceOccurrenceId":"sim_occ_paid1","providerId":"sim_provider_demo","merchantId":"sim_merchant_1","payerId":"sim_payer_1","paymentId":"sim_payment_1","authorizationId":"sim_auth_1","captureId":"sim_capture_1","refundId":"sim_refund_1","amount":{"minorUnits":"500","currency":"GBP","representation":"integer_minor_units"},"refundPolicy":"bounded_capture_refunds.v1","captureReference":{"sourceId":"sim_source_demo","sourceOccurrenceId":"sim_occ_capture1","payloadSha256":"7d0caa1183eb9415260a114a03c0cb60793c9fd8e2995f2f5a30a1c3ece9ee53"},"creationReference":{"sourceId":"sim_source_demo","sourceOccurrenceId":"sim_occ_refund1","payloadSha256":"97e19c2fd87179445451620e40863ca88731b721f285b1a787663aff0941c240"},"eventTime":"2026-01-02T03:04:05Z"}';
  expect(paid().sourceRecords.at(-1)?.payload).toEqual({
    encoding: "utf-8",
    mediaType: "application/json",
    text: paidWire,
    sha256: "527577a859ab9b2fc03421b1cfdb8eb6f33c88c7816b578eb21b17316b9141ed",
  });
});

it("uses captured amount rather than the larger authorization as refund budget", () => {
  const smallerCapture = forged(member(), 1, {
    amount: {
      minorUnits: "500",
      currency: "GBP",
      representation: "integer_minor_units",
    },
  });
  expect(created(request("500", smallerCapture)).sourceRecords).toHaveLength(3);
  reject(
    generateRefundCreated(request("501", smallerCapture)),
    "invalid_amount",
    "$.amountMinorUnits",
  );
});
