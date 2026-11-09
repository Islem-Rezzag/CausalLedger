import { expect, it } from "vitest";
import {
  generateDuplicateWebhook,
  generateFaultyDuplicateWebhook,
  DUPLICATE_WEBHOOK_REQUEST_VERSION,
  FAULTY_DUPLICATE_WEBHOOK_REQUEST_VERSION,
} from "../src/index.js";
import {
  SIMULATOR_MANIFEST_VERSION,
  validateSimulatorManifest,
} from "../src/index.js";
import {
  generateDelayedWebhook,
  DELAYED_WEBHOOK_REQUEST_VERSION,
} from "../src/index.js";
import {
  generateMissingWebhook,
  MISSING_WEBHOOK_REQUEST_VERSION,
} from "../src/index.js";
const hash = "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad";
function context() {
  return {
    schemaVersion: SIMULATOR_MANIFEST_VERSION,
    synthetic: true as const,
    scenarioId: "sim_scenario_webhook",
    generatorVersion: "fixture.v1",
    observationCutoff: "2026-01-01T12:00:00Z",
    sourceRecords: [
      {
        sourceId: "sim_source_provider",
        sourceType: "provider" as "provider" | "bank",
        sourceOccurrenceId: "sim_occ_one",
        sourceRecordId: "sim_record_one",
        eventTime: "2026-01-01T11:00:00Z" as string | null,
        payload: {
          encoding: "utf-8" as const,
          mediaType: "text/plain" as const,
          text: "abc",
          sha256: hash,
        },
      },
    ],
    deliveries: [
      {
        deliveryId: "sim_delivery_one",
        receiptDescriptorId: "sim_receipt_one",
        sourceId: "sim_source_provider",
        sourceOccurrenceId: "sim_occ_one",
        sourceRecordId: "sim_record_one",
        observedAt: "2026-01-01T11:01:00Z",
        deliveryOrder: 7,
      },
    ],
  };
}
function request() {
  const m = context();
  return {
    schemaVersion: DUPLICATE_WEBHOOK_REQUEST_VERSION,
    synthetic: true as const,
    contextManifest: m,
    originalDeliveryId: "sim_delivery_one",
    delivery: {
      ...m.deliveries[0]!,
      deliveryId: "sim_delivery_two",
      receiptDescriptorId: "sim_receipt_two",
      deliveryOrder: 2,
    },
  };
}
function faulty() {
  const r = request();
  return {
    ...r,
    schemaVersion: FAULTY_DUPLICATE_WEBHOOK_REQUEST_VERSION,
    sourceRecord: {
      ...r.contextManifest.sourceRecords[0]!,
      sourceOccurrenceId: "sim_occ_two",
      sourceRecordId: "sim_record_two",
    },
    delivery: {
      ...r.delivery,
      sourceOccurrenceId: "sim_occ_two",
      sourceRecordId: "sim_record_two",
    },
  };
}
it("11 paired benign delivery versus explicitly declared faulty occurrence preserves exact abc golden bytes", () => {
  const r = request(),
    before = structuredClone(r);
  const benign = generateDuplicateWebhook(r);
  const bad = generateFaultyDuplicateWebhook(faulty());
  expect(benign.ok && bad.ok).toBe(true);
  if (!benign.ok || !bad.ok) return;
  expect(benign.value.manifest.sourceRecords).toEqual(
    r.contextManifest.sourceRecords,
  );
  expect(
    benign.value.manifest.deliveries.map((d) => d.sourceOccurrenceId),
  ).toEqual(["sim_occ_one", "sim_occ_one"]);
  expect(
    bad.value.manifest.deliveries.map((d) => d.sourceOccurrenceId),
  ).toEqual(["sim_occ_one", "sim_occ_two"]);
  expect(bad.value.manifest.sourceRecords.map((s) => s.payload)).toEqual([
    before.contextManifest.sourceRecords[0]!.payload,
    before.contextManifest.sourceRecords[0]!.payload,
  ]);
  expect(benign.value.reference.payloadSha256).toBe(hash);
  expect(r).toEqual(before);
  expect(generateDuplicateWebhook(r)).toEqual(benign);
  r.contextManifest.sourceRecords[0]!.payload.text = "changed";
  expect(benign.value.manifest.sourceRecords[0]!.payload.text).toBe("abc");
  expect(Object.isFrozen(benign.value.manifest.sourceRecords[0]!.payload)).toBe(
    true,
  );
});
it.each(["deliveryId", "receiptDescriptorId", "deliveryOrder"] as const)(
  "11 refuses repeated %s",
  (key) => {
    const r = request();
    Object.assign(r.delivery, { [key]: r.contextManifest.deliveries[0]![key] });
    expect(generateDuplicateWebhook(r).ok).toBe(false);
  },
);
it.each([null, false, 2, [], {}, { synthetic: true }])(
  "11 rejects malformed root %s",
  (input) => {
    const r = generateDuplicateWebhook(input);
    expect(r.ok).toBe(false);
    expect(r).not.toHaveProperty("value");
    expect(Object.isFrozen(r)).toBe(true);
  },
);
it("11 rejects bank and ambiguous occurrences even when generic-valid", () => {
  const r = request();
  r.contextManifest.sourceRecords.push({
    ...r.contextManifest.sourceRecords[0]!,
    sourceRecordId: "sim_record_alias",
  });
  expect(validateSimulatorManifest(r.contextManifest).ok).toBe(true);
  expect(generateDuplicateWebhook(r).ok).toBe(false);
  const b = request();
  b.contextManifest.sourceRecords[0]!.sourceType = "bank";
  expect(generateDuplicateWebhook(b).ok).toBe(false);
});
it("11 refuses same-occurrence faulty record and undeclared target", () => {
  const r = faulty();
  r.sourceRecord.sourceOccurrenceId = "sim_occ_one";
  r.delivery.sourceOccurrenceId = "sim_occ_one";
  expect(generateFaultyDuplicateWebhook(r).ok).toBe(false);
  const f = faulty();
  f.delivery.sourceRecordId = "sim_record_one";
  f.delivery.sourceOccurrenceId = "sim_occ_one";
  expect(generateFaultyDuplicateWebhook(f).ok).toBe(false);
});
it("11 refuses unknown fields and getters without evaluating them", () => {
  let calls = 0;
  const r = request();
  Object.defineProperty(r, "originalDeliveryId", {
    enumerable: true,
    get() {
      calls++;
      return "sim_delivery_one";
    },
  });
  expect(generateDuplicateWebhook(r).ok).toBe(false);
  expect(calls).toBe(0);
  expect(generateDuplicateWebhook({ ...request(), surprise: true }).ok).toBe(
    false,
  );
});
function delayedRequest() {
  const r = request();
  return {
    schemaVersion: DELAYED_WEBHOOK_REQUEST_VERSION,
    synthetic: true as const,
    contextManifest: r.contextManifest,
    delivery: { ...r.delivery, observedAt: "2026-01-01T12:00:00.001Z" },
  };
}
it.each([
  "2026-01-01T12:00:00Z",
  "2026-01-01T12:00:00.000Z",
  "2026-01-01T11:59:59.999Z",
])("12 cutoff includes %s", (observedAt) => {
  const r = delayedRequest();
  r.delivery.observedAt = observedAt;
  const out = generateDelayedWebhook(r);
  expect(out.ok && out.value.status).toBe("observed_by_cutoff");
});
it("12 classifies only appended delivery, retains earlier copy and input order", () => {
  const r = delayedRequest();
  const out = generateDelayedWebhook(r);
  expect(out.ok).toBe(true);
  if (!out.ok) return;
  expect(out.value.status).toBe("after_cutoff");
  expect(out.value.manifest.deliveries.map((d) => d.deliveryOrder)).toEqual([
    7, 2,
  ]);
  expect(out.value.manifest.sourceRecords).toEqual(
    r.contextManifest.sourceRecords,
  );
  expect(out.value.manifest.deliveries[0]).toEqual(
    r.contextManifest.deliveries[0],
  );
  r.contextManifest.observationCutoff = r.delivery.observedAt;
  const later = generateDelayedWebhook(r);
  expect(later.ok && later.value.status).toBe("observed_by_cutoff");
});
it.each([null, "2026-01-01T12:00:01Z"])(
  "12 rejects unknown/future event time %s",
  (eventTime) => {
    const r = delayedRequest();
    r.contextManifest.sourceRecords[0]!.eventTime = eventTime;
    expect(generateDelayedWebhook(r).ok).toBe(false);
  },
);
it.each([
  "2026-02-30T12:00:00Z",
  "2026-01-01T12:00:00Z\n",
  "2026-01-01T12:00:00+00:00",
])("12 refuses malformed observedAt %s", (observedAt) => {
  const r = delayedRequest();
  r.delivery.observedAt = observedAt;
  expect(generateDelayedWebhook(r).ok).toBe(false);
});
function missingRequest() {
  const m = context();
  m.deliveries = [];
  return {
    schemaVersion: MISSING_WEBHOOK_REQUEST_VERSION,
    synthetic: true as const,
    contextManifest: m,
    expectedSourceRecordId: "sim_record_one",
  };
}
it("demonstration: duplicate message, separate occurrence, delayed evidence and omission", () => {
  const duplicate = generateDuplicateWebhook(request()),
    fault = generateFaultyDuplicateWebhook(faulty());
  expect(duplicate.ok && duplicate.value.manifest.sourceRecords.length).toBe(1);
  expect(fault.ok && fault.value.manifest.sourceRecords.length).toBe(2);
  const r = missingRequest();
  const omitted = generateMissingWebhook(r);
  expect(omitted.ok && omitted.value.status).toBe("no_declared_delivery");
  const later = generateDelayedWebhook({
    ...delayedRequest(),
    contextManifest: r.contextManifest,
  });
  expect(later.ok).toBe(true);
  if (!later.ok) return;
  const missing = generateMissingWebhook({
    ...r,
    contextManifest: later.value.manifest,
  });
  expect(missing.ok && missing.value.status).toBe("declared_after_cutoff");
  expect(missing.ok && missing.value.omissionDeclared).toBe(false);
  const visible = {
    ...later.value.manifest,
    observationCutoff: "2026-01-01T12:00:00.001Z",
  };
  expect(generateMissingWebhook({ ...r, contextManifest: visible }).ok).toBe(
    false,
  );
  expect(omitted.ok && omitted.value.manifest).toEqual(r.contextManifest);
});
it.each([
  "2026-01-01T12:00:00Z",
  "2026-01-01T12:00:00.000Z",
  "2026-01-01T11:59:59.999Z",
])("13 refuses missing claim when receipt exists at %s", (observedAt) => {
  const r = missingRequest();
  r.contextManifest.deliveries.push({ ...request().delivery, observedAt });
  expect(generateMissingWebhook(r).ok).toBe(false);
});
it("13 detects any visible copy even alongside later copies", () => {
  const r = missingRequest();
  r.contextManifest.deliveries.push(
    delayedRequest().delivery,
    context().deliveries[0]!,
  );
  expect(generateMissingWebhook(r).ok).toBe(false);
});
it("13 refuses ambiguous expected occurrence, unknown record and bank target", () => {
  const r = missingRequest();
  r.contextManifest.sourceRecords.push({
    ...r.contextManifest.sourceRecords[0]!,
    sourceRecordId: "sim_record_alias",
  });
  r.contextManifest.deliveries.push({
    ...context().deliveries[0]!,
    sourceRecordId: "sim_record_alias",
  });
  expect(validateSimulatorManifest(r.contextManifest).ok).toBe(true);
  expect(generateMissingWebhook(r).ok).toBe(false);
  expect(
    generateMissingWebhook({
      ...missingRequest(),
      expectedSourceRecordId: "sim_record_absent",
    }).ok,
  ).toBe(false);
  const b = missingRequest();
  b.contextManifest.sourceRecords[0]!.sourceType = "bank";
  expect(generateMissingWebhook(b).ok).toBe(false);
});
it.each([
  generateDuplicateWebhook,
  generateFaultyDuplicateWebhook,
  generateDelayedWebhook,
  generateMissingWebhook,
])("all builders refuse proxies throwing during inspection", (fn) => {
  const out = fn(
    new Proxy(
      {},
      {
        ownKeys() {
          throw Error("trap");
        },
      },
    ),
  );
  expect(out.ok).toBe(false);
  expect(out).not.toHaveProperty("value");
});
it.each(["hidden", "symbol", "accessor", "extra", "prototype"])(
  "strict root %s",
  (attack) => {
    let getterCalls = 0;
    const r = missingRequest();
    if (attack === "hidden") Object.defineProperty(r, "hidden", { value: 1 });
    if (attack === "symbol") Object.assign(r, { [Symbol("x")]: 1 });
    if (attack === "accessor")
      Object.defineProperty(r, "expectedSourceRecordId", {
        get() {
          getterCalls++;
          return "sim_record_one";
        },
        enumerable: true,
      });
    if (attack === "extra") Object.assign(r, { unexpected: true });
    if (attack === "prototype") Object.setPrototypeOf(r, { inherited: true });
    expect(generateMissingWebhook(r).ok).toBe(false);
    expect(getterCalls).toBe(0);
  },
);
it("accepts null-prototype own-data roots", () => {
  const r = Object.assign(Object.create(null) as object, missingRequest());
  expect(generateMissingWebhook(r).ok).toBe(true);
});
it("snapshot root and appended payload precede hostile context inspection", () => {
  const r = faulty();
  const original = r.contextManifest;
  r.contextManifest = new Proxy(original, {
    getPrototypeOf(target) {
      r.originalDeliveryId = "sim_delivery_changed";
      r.delivery.deliveryId = "sim_delivery_changed";
      r.sourceRecord.payload.text = "changed";
      return Reflect.getPrototypeOf(target);
    },
  });
  // The separately declared source initially shares fixture payload with context; detach context first.
  original.sourceRecords[0]!.payload = {
    ...original.sourceRecords[0]!.payload,
  };
  const out = generateFaultyDuplicateWebhook(r);
  expect(out.ok).toBe(true);
  if (!out.ok) return;
  expect(r.originalDeliveryId).toBe("sim_delivery_changed");
  expect(r.delivery.deliveryId).toBe("sim_delivery_changed");
  expect(r.sourceRecord.payload.text).toBe("changed");
  expect(out.value.originalDeliveryId).toBe("sim_delivery_one");
  expect(out.value.appendedDeliveryId).toBe("sim_delivery_two");
  expect(out.value.manifest.sourceRecords[1]!.payload.text).toBe("abc");
});
it("delivery capacity accepts last slot and refuses overflow without partial result", () => {
  const r = request();
  r.contextManifest.deliveries = Array.from({ length: 1023 }, (_, i) => ({
    ...r.contextManifest.deliveries[0]!,
    deliveryId: "sim_delivery_n" + i,
    receiptDescriptorId: "sim_receipt_n" + i,
    deliveryOrder: i,
  }));
  r.originalDeliveryId = "sim_delivery_n0";
  r.delivery.deliveryOrder = 1023;
  const out = generateDuplicateWebhook(r);
  expect(out.ok).toBe(true);
  if (!out.ok) return;
  const overflow = generateDuplicateWebhook({
    ...r,
    contextManifest: out.value.manifest,
    delivery: {
      ...r.delivery,
      deliveryId: "sim_delivery_overflow",
      receiptDescriptorId: "sim_receipt_overflow",
      deliveryOrder: 1024,
    },
  });
  expect(overflow.ok).toBe(false);
  expect(overflow).not.toHaveProperty("value");
});
it("faulty occurrence capacity accepts256 and refuses257", () => {
  const r = faulty();
  const first = r.contextManifest.sourceRecords[0]!;
  r.contextManifest.sourceRecords.push(
    ...Array.from({ length: 254 }, (_, i) => ({
      ...first,
      sourceRecordId: "sim_record_extra" + i,
      sourceOccurrenceId: "sim_occ_extra" + i,
    })),
  );
  const out = generateFaultyDuplicateWebhook(r);
  expect(out.ok).toBe(true);
  if (!out.ok) return;
  const overflow = generateFaultyDuplicateWebhook({
    ...r,
    contextManifest: out.value.manifest,
    sourceRecord: {
      ...r.sourceRecord,
      sourceRecordId: "sim_record_over",
      sourceOccurrenceId: "sim_occ_over",
    },
    delivery: {
      ...r.delivery,
      deliveryId: "sim_delivery_over",
      receiptDescriptorId: "sim_receipt_over",
      sourceRecordId: "sim_record_over",
      sourceOccurrenceId: "sim_occ_over",
      deliveryOrder: 100,
    },
  });
  expect(overflow.ok).toBe(false);
});
