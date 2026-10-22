import { createHash } from "node:crypto";
import { expect, it } from "vitest";
import {
  generatePaymentAuthorized,
  generatePaymentCaptured,
  generatePayoutCreated,
  generatePayoutPaid,
  generatePayoutFailed,
  PAYMENT_AUTHORIZED_REQUEST_VERSION,
  PAYMENT_CAPTURED_REQUEST_VERSION,
  PAYOUT_CREATED_REQUEST_VERSION,
  PAYOUT_PAID_REQUEST_VERSION,
  PAYOUT_FAILED_REQUEST_VERSION,
  validateSimulatorManifest,
} from "../src/index.js";
import type {
  SimulatorManifest,
  PayoutCreatedRequest,
  PayoutPaidRequest,
  PayoutFailedRequest,
  PayoutResult,
} from "../src/index.js";
const time = "2026-01-02T03:04:05Z";
function value(r: PayoutResult): SimulatorManifest {
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
function reject(r: PayoutResult, code?: string, path?: string) {
  expect(r.ok).toBe(false);
  expect(r).not.toHaveProperty("value");
  frozen(r);
  if (code) expect(r.issues).toContainEqual({ code, path });
}
function member(
  n = 1,
  amount = "1000",
  currency = "USD",
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
function request(): PayoutCreatedRequest {
  return {
    schemaVersion: PAYOUT_CREATED_REQUEST_VERSION,
    synthetic: true,
    scenarioId: "sim_scenario_demo",
    observationCutoff: time,
    sourceId: "sim_source_demo",
    sourceOccurrenceId: "sim_occ_created",
    sourceRecordId: "sim_record_created",
    eventTime: time,
    deliveryId: "sim_delivery_created",
    receiptDescriptorId: "sim_receipt_created",
    observedAt: time,
    deliveryOrder: 32,
    providerId: "sim_provider_demo",
    merchantId: "sim_merchant_1",
    payoutId: "sim_payout_1",
    amountMinorUnits: "1250",
    currency: "USD",
    captureManifests: [member(), member(2, "250")],
  };
}
function created(r: unknown = request()) {
  return value(generatePayoutCreated(r));
}
function paidRequest(prior: SimulatorManifest = created()): PayoutPaidRequest {
  const { captureManifests: _members, ...base } = request();
  void _members;
  return {
    ...base,
    schemaVersion: PAYOUT_PAID_REQUEST_VERSION,
    sourceOccurrenceId: "sim_occ_paid",
    sourceRecordId: "sim_record_paid",
    deliveryId: "sim_delivery_paid",
    receiptDescriptorId: "sim_receipt_paid",
    deliveryOrder: 33,
    payoutManifest: prior,
  };
}
function failedRequest(
  prior: SimulatorManifest = created(),
): PayoutFailedRequest {
  const p = paidRequest(prior);
  return {
    ...p,
    schemaVersion: PAYOUT_FAILED_REQUEST_VERSION,
    sourceOccurrenceId: "sim_occ_failed",
    sourceRecordId: "sim_record_failed",
    deliveryId: "sim_delivery_failed",
    receiptDescriptorId: "sim_receipt_failed",
    deliveryOrder: 34,
    failureReason: "ACCOUNT_CLOSED",
  };
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
function rehash(m: SimulatorManifest, index: number, text: string) {
  Object.assign(m.sourceRecords[index]!.payload, {
    text,
    sha256: createHash("sha256").update(text, "utf8").digest("hex"),
  });
  expect(validateSimulatorManifest(m).ok).toBe(true);
}
it("created: sums two captures exactly and preserves all original evidence", () => {
  const r = request(),
    before = JSON.stringify(r),
    m = created(r);
  expect(m.sourceRecords).toHaveLength(5);
  expect(m.deliveries).toHaveLength(5);
  expect(m.sourceRecords.slice(0, 4)).toEqual(
    r.captureManifests.flatMap((x) => x.sourceRecords),
  );
  expect(m.deliveries.slice(0, 4)).toEqual(
    r.captureManifests.flatMap((x) => x.deliveries),
  );
  expect(body(m).amount).toEqual({
    minorUnits: "1250",
    currency: "USD",
    representation: "integer_minor_units",
  });
  expect(body(m).membershipPolicy).toBe("full_gross_captures.v1");
  expect(JSON.stringify(r)).toBe(before);
  expect(created(r)).toEqual(m);
  frozen(m);
  expect(m.sourceRecords[0]).not.toBe(r.captureManifests[0]!.sourceRecords[0]);
});
it("created: one and16 members, totals beyond128 digits, numeric sum and no shared consumption", () => {
  for (const n of [1, 16]) {
    const ms = Array.from({ length: n }, (_, i) =>
      member(i + 1, "9".repeat(128)),
    );
    const r = {
      ...request(),
      captureManifests: ms,
      amountMinorUnits: (BigInt("9".repeat(128)) * BigInt(n)).toString(),
    };
    const m = created(r);
    expect(m.sourceRecords).toHaveLength(2 * n + 1);
    expect(created(r)).toEqual(m);
  }
  expect(
    created({
      ...request(),
      captureManifests: [member(1, "9"), member(2, "10")],
      amountMinorUnits: "19",
    }).sourceRecords,
  ).toHaveLength(5);
});
it.each(["1251", "1249", "9007199254740993"])(
  "created: refuses a valid but wrong total %s",
  (amount) =>
    reject(
      generatePayoutCreated({ ...request(), amountMinorUnits: amount }),
      "invalid_amount",
      "$.amountMinorUnits",
    ),
);
it.each([
  [],
  new Array(1),
  Array.from({ length: 17 }, () => member()),
  {},
  null,
])("created: rejects malformed/bounded members %j", (ms) =>
  reject(
    generatePayoutCreated({ ...request(), captureManifests: ms }),
    "invalid_array",
    "$.captureManifests",
  ),
);
it.each(["provider", "merchant", "currency"])(
  "created: refuses mixed %s",
  (which) => {
    const m = member(
      2,
      "250",
      which === "currency" ? "EUR" : "USD",
      which === "provider" ? "sim_provider_other" : "sim_provider_demo",
      which === "merchant" ? "sim_merchant_other" : "sim_merchant_1",
    );
    reject(
      generatePayoutCreated({ ...request(), captureManifests: [member(), m] }),
      "invalid_reference",
      "$.captureManifests[1]." +
        (which === "currency" ? "currency" : which + "Id"),
    );
  },
);
it("created: refuses overlapping captures instead of double counting", () =>
  reject(
    generatePayoutCreated({
      ...request(),
      captureManifests: [member(), member()],
      amountMinorUnits: "2000",
    }),
    "duplicate_identity",
    "$.captureManifests[1].captureId",
  ));
it.each(["paymentId", "authorizationId", "captureId"])(
  "created: rejects duplicate economic %s despite individually canonical members",
  (key) => {
    const first = member(),
      second = clone(member(2, "250"));
    const original = body(first, 1),
      auth = body(second, 0),
      cap = body(second, 1);
    if (key !== "captureId") {
      auth[key] = original[key];
      rehash(second, 0, JSON.stringify(auth));
    }
    cap[key] = original[key];
    (cap.authorizationReference as Record<string, unknown>).payloadSha256 =
      second.sourceRecords[0]!.payload.sha256;
    rehash(second, 1, JSON.stringify(cap));
    // A standalone one-member payout proves owned03 reconstruction accepts each changed member.
    created({
      ...request(),
      captureManifests: [second],
      amountMinorUnits: "250",
    });
    reject(
      generatePayoutCreated({
        ...request(),
        captureManifests: [first, second],
      }),
      "duplicate_identity",
      "$.captureManifests[1]." + key,
    );
  },
);
it.each([0, 1])(
  "created: rejects changed member%d owned wire with recomputed hash",
  (i) => {
    const m = clone(member());
    const b = body(m, i);
    b.synthetic = false;
    rehash(m, i, JSON.stringify(b));
    reject(
      generatePayoutCreated({
        ...request(),
        captureManifests: [m],
        amountMinorUnits: "1000",
      }),
      "invalid_payload",
      "$.captureManifests[0]",
    );
  },
);
it.each(["whitespace", "unknown", "duplicate", "kind"])(
  "created: rejects hash-valid canonical wire attack %s",
  (attack) => {
    const m = clone(member());
    const s = m.sourceRecords[1]!.payload.text;
    const changed =
      attack === "whitespace"
        ? s + "\n"
        : attack === "unknown"
          ? s.replace("{", '{"extra":1,')
          : attack === "duplicate"
            ? s.replace("{", '{"synthetic":true,')
            : s.replace("payment_captured", "payment_authorized");
    rehash(m, 1, changed);
    reject(
      generatePayoutCreated({
        ...request(),
        captureManifests: [m],
        amountMinorUnits: "1000",
      }),
    );
  },
);
it("paid: retains creation and cites its exact raw hash", () => {
  const prior = created(),
    m = value(generatePayoutPaid(paidRequest(prior)));
  expect(m.sourceRecords).toHaveLength(6);
  expect(m.sourceRecords.slice(0, 5)).toEqual(prior.sourceRecords);
  expect(m.deliveries.slice(0, 5)).toEqual(prior.deliveries);
  expect(body(m).creationReference).toEqual({
    sourceId: prior.sourceRecords[4]!.sourceId,
    sourceOccurrenceId: prior.sourceRecords[4]!.sourceOccurrenceId,
    payloadSha256: prior.sourceRecords[4]!.payload.sha256,
  });
  expect(body(m).eventType).toBe("payout_paid");
  frozen(m);
});
it("failed: requires explicit reason and retains creation without inferring failure", () => {
  const prior = created(),
    m = value(generatePayoutFailed(failedRequest(prior)));
  expect(body(prior).eventType).toBe("payout_created");
  expect(body(m).failureReason).toBe("ACCOUNT_CLOSED");
  expect(m.sourceRecords.slice(0, 5)).toEqual(prior.sourceRecords);
});
it.each(["paid-first", "failed-first"])(
  "failed: preserves contradictory evidence %s without resolution",
  (order) => {
    const first =
      order === "paid-first"
        ? value(generatePayoutPaid(paidRequest()))
        : value(generatePayoutFailed(failedRequest()));
    const r =
      order === "paid-first"
        ? generatePayoutFailed(failedRequest(first))
        : generatePayoutPaid(paidRequest(first));
    const m = value(r);
    expect(m.sourceRecords).toHaveLength(7);
    expect(m.sourceRecords.slice(0, 6)).toEqual(first.sourceRecords);
    expect(
      m.sourceRecords
        .slice(5)
        .map(
          (s) =>
            (JSON.parse(s.payload.text) as { eventType: string }).eventType,
        )
        .sort(),
    ).toEqual(["payout_failed", "payout_paid"]);
    expect(m).not.toHaveProperty("resolvedStatus");
  },
);
it.each(["paid", "failed"])(
  "outcome: refuses a repeated %s assertion",
  (kind) => {
    const p =
      kind === "paid"
        ? value(generatePayoutPaid(paidRequest()))
        : value(generatePayoutFailed(failedRequest()));
    reject(
      kind === "paid"
        ? generatePayoutPaid(paidRequest(p))
        : generatePayoutFailed(failedRequest(p)),
      "duplicate_identity",
      "$.payoutManifest",
    );
  },
);
it.each([
  "sourceId",
  "providerId",
  "merchantId",
  "payoutId",
  "currency",
  "amountMinorUnits",
])("outcome: refuses mismatching %s", (key) => {
  const r = paidRequest();
  const changed =
    key === "currency"
      ? "EUR"
      : key === "amountMinorUnits"
        ? "1251"
        : String(r[key as keyof PayoutPaidRequest]) + "x";
  reject(
    generatePayoutPaid({ ...r, [key]: changed }),
    key === "amountMinorUnits" ? "invalid_amount" : "invalid_reference",
    "$." + key,
  );
});
it.each(["created", "paid", "failed"])(
  "outcome: rejects prior %s tampering even with valid SHA",
  (kind) => {
    const p =
      kind === "created"
        ? created()
        : kind === "paid"
          ? value(generatePayoutPaid(paidRequest()))
          : value(generatePayoutFailed(failedRequest()));
    const m = clone(p),
      i = m.sourceRecords.length - 1,
      b = body(m);
    b.extra = "forged";
    rehash(m, i, JSON.stringify(b));
    reject(
      kind === "failed"
        ? generatePayoutPaid(paidRequest(m))
        : generatePayoutFailed(failedRequest(m)),
      "invalid_payload",
      "$.payoutManifest",
    );
  },
);
it.each([null, {}, member(), { ...created(), generatorVersion: "forged" }])(
  "outcome: incomplete/non-owned prior fails without partial result",
  (p) =>
    reject(
      generatePayoutPaid({ ...paidRequest(), payoutManifest: p }),
      "invalid_payload",
      "$.payoutManifest",
    ),
);
it.each([
  "",
  " ",
  " padded",
  "padded ",
  "line\nfeed",
  "tab\t",
  "é",
  "x".repeat(257),
])("failed: rejects absent/unsafe reason %j", (reason) =>
  reject(
    generatePayoutFailed({ ...failedRequest(), failureReason: reason }),
    "invalid_value",
    "$.failureReason",
  ),
);
it.each(["x", "x".repeat(256), "Provider explicitly reports account closed"])(
  "failed: accepts bounded supplied reason",
  (reason) =>
    expect(
      body(
        value(
          generatePayoutFailed({ ...failedRequest(), failureReason: reason }),
        ),
      ).failureReason,
    ).toBe(reason),
);
const apis = [
  { name: "created", fn: generatePayoutCreated, request },
  { name: "paid", fn: generatePayoutPaid, request: paidRequest },
  { name: "failed", fn: generatePayoutFailed, request: failedRequest },
];
for (const api of apis) {
  it.each([
    "0",
    "01",
    "+1",
    "-1",
    "1.0",
    "1e3",
    " 1250",
    "1250\n",
    "9".repeat(131),
    1250,
    null,
  ])(`${api.name}: rejects noncanonical/bounded money %j`, (amount) =>
    reject(
      api.fn({ ...api.request(), amountMinorUnits: amount }),
      "invalid_amount",
      "$.amountMinorUnits",
    ),
  );
  it.each(["usd", "US", "USDX", "USD\n", null])(
    `${api.name}: rejects invalid currency %j`,
    (currency) =>
      reject(
        api.fn({ ...api.request(), currency }),
        "invalid_currency",
        "$.currency",
      ),
  );
  it.each([null, {}, [], true])(`${api.name}: rejects malformed root %j`, (r) =>
    reject(api.fn(r)),
  );
  it("root snapshot rejects getters and ignores no hidden authority", () => {
    let called = 0;
    const r = { ...api.request() };
    Object.defineProperty(r, "amountMinorUnits", {
      enumerable: true,
      get() {
        called++;
        return "1250";
      },
    });
    reject(api.fn(r), "invalid_object", "$");
    expect(called).toBe(0);
    reject(
      api.fn({ ...api.request(), bankConfirmed: true }),
      "unknown_field",
      "$.bankConfirmed",
    );
    const missing = clone(api.request()) as unknown as Record<string, unknown>;
    delete missing.payoutId;
    reject(api.fn(missing), "missing_field", "$.payoutId");
  });
  it.each(["2026-02-30T03:04:05Z", "2026-01-02T03:04:05+00:00", null])(
    `${api.name}: rejects malformed time`,
    (eventTime) =>
      reject(
        api.fn({ ...api.request(), eventTime }),
        "invalid_timestamp",
        "$.eventTime",
      ),
  );
  it("time floor accepts .000 equality, rejects earlier, independent observation metadata", () => {
    value(api.fn({ ...api.request(), eventTime: "2026-01-02T03:04:05.000Z" }));
    reject(
      api.fn({ ...api.request(), eventTime: "2026-01-02T03:04:04.999Z" }),
      "invalid_value",
      "$.eventTime",
    );
    const a = value(api.fn(api.request())),
      b = value(
        api.fn({
          ...api.request(),
          scenarioId: "sim_scenario_other",
          observationCutoff: "0001-01-01T00:00:00Z",
          observedAt: "9999-12-31T23:59:59Z",
          deliveryOrder: 99,
          sourceRecordId: "sim_record_other",
          deliveryId: "sim_delivery_other",
          receiptDescriptorId: "sim_receipt_other",
        }),
      );
    expect(b.sourceRecords.map((s) => s.payload)).toEqual(
      a.sourceRecords.map((s) => s.payload),
    );
  });
  it.each([
    "sourceRecordId",
    "sourceOccurrenceId",
    "deliveryId",
    "receiptDescriptorId",
    "deliveryOrder",
  ])(`${api.name}: refuses combined identity collision %s`, (key) => {
    const r = api.request();
    const prior =
      "captureManifests" in r ? r.captureManifests[0]! : r.payoutManifest;
    const d = prior.deliveries[0]!,
      s = prior.sourceRecords[0]!;
    reject(
      api.fn({
        ...r,
        [key]: key in d ? d[key as keyof typeof d] : s[key as keyof typeof s],
      }),
      "duplicate_identity",
      expect.any(String) as unknown as string,
    );
  });
}
it("created: hostile arrays and caller mutation cannot reread root snapshots", () => {
  let calls = 0;
  const ms = [member()];
  Object.defineProperty(ms, "0", {
    get() {
      calls++;
      return member();
    },
    enumerable: true,
  });
  reject(generatePayoutCreated({ ...request(), captureManifests: ms }));
  expect(calls).toBe(0);
  const r = {
    ...request(),
    captureManifests: [] as SimulatorManifest[],
    amountMinorUnits: "1000",
  };
  const m = member();
  let trapped = false;
  const hostile = new Proxy(m, {
    getPrototypeOf(target) {
      trapped = true;
      Object.assign(r, { amountMinorUnits: "9999" });
      return Reflect.getPrototypeOf(target);
    },
  });
  r.captureManifests = [hostile];
  const result = value(generatePayoutCreated(r));
  expect(trapped).toBe(true);
  expect(r.amountMinorUnits).toBe("9999");
  expect((body(result).amount as { minorUnits: string }).minorUnits).toBe(
    "1000",
  );
});
it("outcome: opposite report event times need not follow each other", () => {
  const p = value(
    generatePayoutPaid({ ...paidRequest(), eventTime: "2026-01-03T00:00:00Z" }),
  );
  value(generatePayoutFailed(failedRequest(p)));
});

// Independent literal wire/hash expectations authored from the frozen spec using Python.
const createdGolden =
  '{"schemaVersion":"m05.04-payout-created-record.v1","synthetic":true,"eventType":"payout_created","sourceId":"sim_source_demo","sourceOccurrenceId":"sim_occ_created","providerId":"sim_provider_demo","merchantId":"sim_merchant_1","payoutId":"sim_payout_1","amount":{"minorUnits":"1250","currency":"USD","representation":"integer_minor_units"},"membershipPolicy":"full_gross_captures.v1","captureReferences":[{"sourceId":"sim_source_demo","sourceOccurrenceId":"sim_occ_capture1","payloadSha256":"473f9feea74a9689948cda004f3b458135fdcc6b5bf93b11620c31a73f3ab2b6","captureId":"sim_capture_1","paymentId":"sim_payment_1"},{"sourceId":"sim_source_demo","sourceOccurrenceId":"sim_occ_capture2","payloadSha256":"9a0168008ba58083fb1663ed2b6a7bcbbdbcaa1028a43266605785ee714d3dcf","captureId":"sim_capture_2","paymentId":"sim_payment_2"}],"eventTime":"2026-01-02T03:04:05Z"}';
const createdHash =
  "bede91a2197814ef0a12542b762713d8b46a48380c958b6c35a9d74cf8628b4f";
const paidGolden =
  '{"schemaVersion":"m05.05-payout-paid-record.v1","synthetic":true,"eventType":"payout_paid","sourceId":"sim_source_demo","sourceOccurrenceId":"sim_occ_paid","providerId":"sim_provider_demo","merchantId":"sim_merchant_1","payoutId":"sim_payout_1","amount":{"minorUnits":"1250","currency":"USD","representation":"integer_minor_units"},"creationReference":{"sourceId":"sim_source_demo","sourceOccurrenceId":"sim_occ_created","payloadSha256":"bede91a2197814ef0a12542b762713d8b46a48380c958b6c35a9d74cf8628b4f"},"eventTime":"2026-01-02T03:04:05Z"}';
const paidHash =
  "03a3b45f681fe391ed0a571a8666488b16cd6056c4355355961eac0d39c34a1d";
const failedGolden =
  '{"schemaVersion":"m05.06-payout-failed-record.v1","synthetic":true,"eventType":"payout_failed","sourceId":"sim_source_demo","sourceOccurrenceId":"sim_occ_failed","providerId":"sim_provider_demo","merchantId":"sim_merchant_1","payoutId":"sim_payout_1","amount":{"minorUnits":"1250","currency":"USD","representation":"integer_minor_units"},"creationReference":{"sourceId":"sim_source_demo","sourceOccurrenceId":"sim_occ_created","payloadSha256":"bede91a2197814ef0a12542b762713d8b46a48380c958b6c35a9d74cf8628b4f"},"failureReason":"ACCOUNT_CLOSED","eventTime":"2026-01-02T03:04:05Z"}';
const failedHash =
  "aaf93421a8659fc3549ad184f0d0bde9a36e98ecd616e64355cc5455c43f9fc6";
it("matches independent literal created/paid/failed wire bytes and SHA256", () => {
  for (const [m, text, hash] of [
    [created(), createdGolden, createdHash],
    [value(generatePayoutPaid(paidRequest())), paidGolden, paidHash],
    [value(generatePayoutFailed(failedRequest())), failedGolden, failedHash],
  ] as const) {
    expect(m.sourceRecords.at(-1)!.payload.text).toBe(text);
    expect(m.sourceRecords.at(-1)!.payload.sha256).toBe(hash);
  }
});
it("demonstration:1250 creation, provider paid, explicit failed conflict,1251 refusal", () => {
  const c = created(),
    p = value(generatePayoutPaid(paidRequest(c))),
    f = value(generatePayoutFailed(failedRequest(p)));
  const refused = generatePayoutCreated({
    ...request(),
    amountMinorUnits: "1251",
  });
  console.log(
    JSON.stringify({
      inputCaptureMinorUnits: ["1000", "250"],
      currency: "USD",
      createdMinorUnits: (body(c).amount as { minorUnits: string }).minorUnits,
      sourceRecords: f.sourceRecords.length,
      deliveries: f.deliveries.length,
      outcomes: f.sourceRecords
        .slice(4)
        .map(
          (s) =>
            (JSON.parse(s.payload.text) as { eventType: string }).eventType,
        ),
      originalRecordsPreserved:
        JSON.stringify(f.sourceRecords.slice(0, 5)) ===
        JSON.stringify(c.sourceRecords),
      refused,
    }),
  );
  reject(refused, "invalid_amount", "$.amountMinorUnits");
});

it.each(["paid", "failed"])(
  "outcome snapshots actual caller scalars before prior traps: %s",
  (kind) => {
    const prior = created();
    const r = kind === "paid" ? paidRequest(prior) : failedRequest(prior);
    let trapped = false;
    const proxy = new Proxy(prior, {
      getPrototypeOf(target) {
        trapped = true;
        Object.assign(r, {
          amountMinorUnits: "9999",
          ...(kind === "failed" ? { failureReason: "changed" } : {}),
        });
        return Reflect.getPrototypeOf(target);
      },
    });
    Object.assign(r, { payoutManifest: proxy });
    const result = value(
      kind === "paid" ? generatePayoutPaid(r) : generatePayoutFailed(r),
    );
    expect(trapped).toBe(true);
    expect(r.amountMinorUnits).toBe("9999");
    expect((body(result).amount as { minorUnits: string }).minorUnits).toBe(
      "1250",
    );
    if (kind === "failed")
      expect(body(result).failureReason).toBe("ACCOUNT_CLOSED");
  },
);
it.each(["\n", "\r", "\r\n", "\u2028", "\u2029"])(
  "failed reason rejects terminal line separator",
  (end) =>
    reject(
      generatePayoutFailed({
        ...failedRequest(),
        failureReason: "declined" + end,
      }),
      "invalid_value",
      "$.failureReason",
    ),
);
it("creation rejects decorated/hidden/symbol/sparse/accessor member arrays", () => {
  for (const decorate of [
    (a: unknown[]) => Object.assign(a, { extra: true }),
    (a: unknown[]) => Object.defineProperty(a, "extra", { value: true }),
    (a: unknown[]) => Object.assign(a, { [Symbol()]: true }),
    (a: unknown[]) => delete a[0],
  ]) {
    const a = [member()];
    decorate(a);
    reject(
      generatePayoutCreated({ ...request(), captureManifests: a }),
      "invalid_array",
      "$.captureManifests",
    );
  }
});
