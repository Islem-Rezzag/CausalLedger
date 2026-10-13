import { describe, expect, it, vi } from "vitest";
import {
  validateSimulatorManifest,
  SIMULATOR_MANIFEST_VERSION,
} from "../src/index.js";
const ABC = "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad";
function manifest() {
  return {
    schemaVersion: SIMULATOR_MANIFEST_VERSION,
    synthetic: true as const,
    scenarioId: "sim_scenario_foundation",
    generatorVersion: "foundation.v1",
    observationCutoff: "2026-01-01T12:00:00Z",
    sourceRecords: [
      {
        sourceId: "sim_source_example",
        sourceType: "provider" as "provider" | "bank",
        sourceOccurrenceId: "sim_occ_one",
        sourceRecordId: "sim_record_one",
        eventTime: null as string | null,
        payload: {
          encoding: "utf-8",
          mediaType: "text/plain",
          text: "abc",
          sha256: ABC,
        },
      },
    ],
    deliveries: [
      {
        deliveryId: "sim_delivery_one",
        receiptDescriptorId: "sim_receipt_one",
        sourceId: "sim_source_example",
        sourceOccurrenceId: "sim_occ_one",
        sourceRecordId: "sim_record_one",
        observedAt: "2026-01-01T12:00:00Z",
        deliveryOrder: 0,
      },
    ],
  };
}
function reject(input: unknown, code: string, path?: string) {
  const result = validateSimulatorManifest(input);
  expect(result.ok).toBe(false);
  expect(result).not.toHaveProperty("value");
  expect(result.issues).toContainEqual(
    expect.objectContaining(path ? { code, path } : { code }),
  );
  expect(Object.isFrozen(result)).toBe(true);
  expect(Object.isFrozen(result.issues)).toBe(true);
  for (const issue of result.issues) expect(Object.isFrozen(issue)).toBe(true);
}
describe("M05.01 executable foundation demonstration", () => {
  it("accepts supplied generic abc bytes and rejects changed bytes with the original hash", () => {
    const input = manifest();
    const result = validateSimulatorManifest(input);
    expect(result).toEqual({ ok: true, value: input, issues: [] });
    input.sourceRecords[0]!.payload.text = "abd";
    reject(input, "hash_mismatch", "$.sourceRecords[0].payload.sha256");
  });
  it("checks an empty manifest without inventing a source or delivery", () => {
    const input = { ...manifest(), sourceRecords: [], deliveries: [] };
    expect(validateSimulatorManifest(input)).toEqual({
      ok: true,
      value: input,
      issues: [],
    });
  });
});
describe("exact opaque UTF8 bytes (independent SHA256 golden literals)", () => {
  it.each([
    ["", "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"],
    ["abc", ABC],
    [
      "a\r\nb",
      "18745f36a05e29072709042d6062ce54f1b08ff36c27ba80c39f81fb010c8ce2",
    ],
    [
      "\ufeffabc",
      "1c28dc3f1f804a1ad9c9b4b4cf5e2658d16ad4ed08e3020d04a8d2865018947c",
    ],
    ["é", "4a99557e4033c3539de2eb65472017cad5f9557f7a0625a09f1c3f6e2ba69c4c"],
    [
      "e\u0301",
      "bf12767b0f2a56b2190075bae8169f656e3ce8d6357d4aff184bc6c7ea48f9f6",
    ],
    ["💳", "95e289299a9f81177e2c118c2c94ada307ceeb7c1c224a10567247e6cbc17322"],
  ])("preserves text %j without normalization", (text, sha256) => {
    const input = manifest();
    input.sourceRecords[0]!.payload = {
      ...input.sourceRecords[0]!.payload,
      text,
      sha256,
    };
    const result = validateSimulatorManifest(input);
    expect(result.ok).toBe(true);
    if (result.ok)
      expect(result.value.sourceRecords[0]!.payload).toEqual(
        input.sourceRecords[0]!.payload,
      );
  });
  it.each(["\ud800", "\udfff", "a\ud800b", "\ud800\ud800"])(
    "rejects malformed UTF16 %j",
    (text) => {
      const input = manifest();
      input.sourceRecords[0]!.payload.text = text;
      reject(input, "invalid_payload");
    },
  );
  it.each([
    " " + ABC,
    ABC.toUpperCase(),
    ABC + "\n",
    "a".repeat(63),
    123,
    null,
  ])("rejects noncanonical digest %j", (hash) => {
    const input = manifest();
    Object.assign(input.sourceRecords[0]!.payload, { sha256: hash });
    reject(input, "invalid_payload");
  });
  it.each(["utf8", "base64", null])(
    "rejects unsupported encoding %j",
    (encoding) => {
      const input = manifest();
      Object.assign(input.sourceRecords[0]!.payload, { encoding });
      reject(input, "invalid_payload");
    },
  );
  it("does not parse or repair payload semantics", () => {
    const input = manifest();
    input.sourceRecords[0]!.payload.mediaType = "application/json";
    expect(validateSimulatorManifest(input).ok).toBe(true);
    expect(input.sourceRecords[0]!.payload.text).toBe("abc");
  });
});
describe("explicit UTC clocks and unknown source event time", () => {
  it.each([
    "0001-01-01T00:00:00Z",
    "2000-02-29T23:59:59.999Z",
    "2024-02-29T00:00:00Z",
    "9999-12-31T23:59:59Z",
  ])("accepts real calendar instant %s", (time) => {
    const input = manifest();
    input.observationCutoff = time;
    input.sourceRecords[0]!.eventTime = time;
    input.deliveries[0]!.observedAt = time;
    expect(validateSimulatorManifest(input).ok).toBe(true);
  });
  it.each([
    "0000-01-01T00:00:00Z",
    "1900-02-29T00:00:00Z",
    "2023-02-29T00:00:00Z",
    "2024-04-31T00:00:00Z",
    "2024-00-01T00:00:00Z",
    "2024-13-01T00:00:00Z",
    "2024-01-00T00:00:00Z",
    "2024-01-01T24:00:00Z",
    "2024-01-01T23:60:00Z",
    "2024-01-01T23:59:60Z",
    "2024-01-01T00:00:00+00:00",
    "2024-01-01T00:00:00.1Z",
    "2024-01-01T00:00:00.0000Z",
    "2024-01-01T00:00:00Z\r",
    "2024-01-01T00:00:00Z\n",
    "2024-01-01",
    null,
    42,
  ])("rejects invalid instant %j in every clock", (time) => {
    const input = manifest();
    Object.assign(input, { observationCutoff: time });
    reject(input, "invalid_timestamp", "$.observationCutoff");
    const other = manifest();
    Object.assign(other.deliveries[0]!, { observedAt: time });
    reject(other, "invalid_timestamp", "$.deliveries[0].observedAt");
    if (time !== null) {
      const source = manifest();
      Object.assign(source.sourceRecords[0]!, { eventTime: time });
      reject(source, "invalid_timestamp", "$.sourceRecords[0].eventTime");
    }
  });
  it("retains null source time, future and pre-event observations without projection", () => {
    const input = manifest();
    input.sourceRecords.push({
      ...input.sourceRecords[0]!,
      sourceRecordId: "sim_record_two",
      eventTime: "2026-01-04T00:00:00Z",
    });
    input.deliveries.push({
      ...input.deliveries[0]!,
      deliveryId: "sim_delivery_two",
      receiptDescriptorId: "sim_receipt_two",
      sourceRecordId: "sim_record_two",
      observedAt: "2026-01-03T00:00:00Z",
      deliveryOrder: 7,
    });
    const result = validateSimulatorManifest(input);
    expect(result).toEqual({ ok: true, value: input, issues: [] });
    if (result.ok) {
      expect(result.value.sourceRecords[0]!.eventTime).toBeNull();
      expect(result.value.deliveries).toHaveLength(2);
    }
  });
});
describe("distinct source, occurrence, record and delivery identity", () => {
  it("keeps one occurrence across two raw records and two deliveries of the original", () => {
    const input = manifest();
    input.sourceRecords.push({
      ...input.sourceRecords[0]!,
      sourceRecordId: "sim_record_two",
    });
    input.deliveries.push({
      ...input.deliveries[0]!,
      deliveryId: "sim_delivery_two",
      receiptDescriptorId: "sim_receipt_two",
      deliveryOrder: 1,
    });
    expect(validateSimulatorManifest(input)).toEqual({
      ok: true,
      value: input,
      issues: [],
    });
  });
  it.each(["sourceRecordId", "sourceId", "sourceOccurrenceId"])(
    "refuses inconsistent delivery reference %s",
    (key) => {
      const input = manifest();
      Object.assign(input.deliveries[0]!, {
        [key]:
          "sim_" +
          {
            sourceId: "source",
            sourceRecordId: "record",
            sourceOccurrenceId: "occ",
          }[key] +
          "_other",
      });
      reject(input, "invalid_reference", "$.deliveries[0].sourceRecordId");
    },
  );
  it.each(["deliveryId", "receiptDescriptorId", "deliveryOrder"])(
    "refuses reused %s",
    (key) => {
      const input = manifest();
      const second = {
        ...input.deliveries[0]!,
        deliveryId: "sim_delivery_two",
        receiptDescriptorId: "sim_receipt_two",
        deliveryOrder: 1,
      };
      Object.assign(second, {
        [key]: (input.deliveries[0]! as unknown as Record<string, unknown>)[
          key
        ],
      });
      input.deliveries.push(second);
      reject(input, "duplicate_identity");
    },
  );
  it("refuses duplicate record IDs and inconsistent source types", () => {
    const input = manifest();
    input.sourceRecords.push({ ...input.sourceRecords[0]! });
    reject(input, "duplicate_identity");
    const other = manifest();
    other.sourceRecords.push({
      ...other.sourceRecords[0]!,
      sourceRecordId: "sim_record_two",
      sourceType: "bank",
    });
    reject(other, "invalid_reference", "$.sourceRecords[1].sourceId");
  });
  it.each([
    "",
    "rcpt_01ARZ3NDEKTSV4RRFFQ69G5FAV",
    "sim_delivery_one\n",
    "sim_delivery_one\r",
    " sim_delivery_one",
    "sim_delivery_" + "a".repeat(65),
    42,
    null,
  ])("refuses invalid scoped delivery ID %j", (deliveryId) => {
    const input = manifest();
    Object.assign(input.deliveries[0]!, { deliveryId });
    reject(input, "invalid_identity");
  });
  it.each([-1, -0, 1.5, NaN, Infinity, Number.MAX_SAFE_INTEGER + 1, "1", null])(
    "refuses invalid order %j",
    (deliveryOrder) => {
      const input = manifest();
      Object.assign(input.deliveries[0]!, { deliveryOrder });
      reject(input, "invalid_value");
    },
  );
  it("accepts noncontiguous ordinals through max safe integer without sorting", () => {
    const input = manifest();
    input.deliveries[0]!.deliveryOrder = Number.MAX_SAFE_INTEGER;
    input.deliveries.push({
      ...input.deliveries[0]!,
      deliveryId: "sim_delivery_two",
      receiptDescriptorId: "sim_receipt_two",
      deliveryOrder: 0,
    });
    expect(validateSimulatorManifest(input)).toEqual({
      ok: true,
      value: input,
      issues: [],
    });
  });
});
describe("strict unknown input, bounds and immutable detached output", () => {
  it.each([
    null,
    [],
    42,
    "manifest",
    new Date(0),
    new Map(),
    Object.create({ inherited: true }),
  ])("rejects non-JSON root %j", (input) => {
    reject(input, "invalid_object");
  });
  it.each([
    "schemaVersion",
    "synthetic",
    "scenarioId",
    "generatorVersion",
    "observationCutoff",
    "sourceRecords",
    "deliveries",
  ])("refuses missing root field %s", (key) => {
    const input = manifest();
    delete (input as unknown as Record<string, unknown>)[key];
    reject(input, "missing_field");
  });
  it.each(["synthetic", "schemaVersion", "generatorVersion", "scenarioId"])(
    "refuses invalid declaration %s",
    (key) => {
      const input = manifest();
      Object.assign(input, {
        [key]: key === "generatorVersion" ? "foundation.v1\n" : false,
      });
      reject(
        input,
        key === "scenarioId" ? "invalid_identity" : "invalid_value",
      );
    },
  );
  it("refuses unknown fields at every level and orders issues independently of key insertion", () => {
    for (const where of ["root", "source", "payload", "delivery"]) {
      const input = manifest();
      const target =
        where === "root"
          ? input
          : where === "source"
            ? input.sourceRecords[0]!
            : where === "payload"
              ? input.sourceRecords[0]!.payload
              : input.deliveries[0]!;
      Object.assign(target, { unexpected: true });
      reject(input, "unknown_field");
    }
    const left = { ...manifest(), z: 1, a: 2 },
      right = { a: 2, z: 1, ...manifest() };
    expect(validateSimulatorManifest(left)).toEqual(
      validateSimulatorManifest(right),
    );
  });
  it("does not evaluate getters or accept hidden/symbol data", () => {
    let read = 0;
    const input = manifest();
    Object.defineProperty(input, "generatorVersion", {
      enumerable: true,
      get: () => {
        read++;
        return "foundation.v1";
      },
    });
    reject(input, "invalid_object");
    expect(read).toBe(0);
    const hidden = manifest();
    Object.defineProperty(hidden, "hidden", { value: 1 });
    reject(hidden, "invalid_object");
    const symbol = manifest();
    Object.assign(symbol, { [Symbol("hidden")]: 1 });
    reject(symbol, "invalid_object");
  });
  it("turns a throwing prototype proxy into an ordinary refusal", () => {
    reject(
      new Proxy(
        {},
        {
          getPrototypeOf() {
            throw new Error("trap");
          },
        },
      ),
      "invalid_object",
    );
  });
  it("accepts own-data objects with null prototypes", () => {
    const input = Object.assign(Object.create(null), manifest()) as unknown;
    expect(validateSimulatorManifest(input).ok).toBe(true);
  });
  it("refuses sparse, accessor and decorated arrays without evaluating getters", () => {
    const sparse = manifest();
    sparse.sourceRecords.length = 2;
    reject(sparse, "invalid_array");
    const accessor = manifest();
    let calls = 0;
    Object.defineProperty(accessor.sourceRecords, "0", {
      enumerable: true,
      get: () => {
        calls++;
        throw new Error("getter");
      },
    });
    reject(accessor, "invalid_array");
    expect(calls).toBe(0);
    const decorated = manifest();
    Object.assign(decorated.deliveries, { extra: true });
    reject(decorated, "invalid_array");
  });
  it("refuses oversized arrays and payload text", () => {
    reject(
      {
        ...manifest(),
        sourceRecords: Array.from(
          { length: 257 },
          () => manifest().sourceRecords[0],
        ),
      },
      "invalid_array",
    );
    reject(
      {
        ...manifest(),
        deliveries: Array.from(
          { length: 1025 },
          () => manifest().deliveries[0],
        ),
      },
      "invalid_array",
    );
    const input = manifest();
    input.sourceRecords[0]!.payload.text = "x".repeat(65537);
    reject(input, "invalid_payload");
  });
  it.each(["4294967295", "9007199254740991", "0\n", "0\r", "01", "-0"])(
    "refuses numeric-shaped array decoration %j without reading it",
    (key) => {
      for (const field of ["sourceRecords", "deliveries"] as const) {
        for (const kind of ["enumerable", "hidden", "accessor"]) {
          const input = manifest();
          let calls = 0;
          Object.defineProperty(
            input[field],
            key,
            kind === "accessor"
              ? {
                  enumerable: true,
                  get() {
                    calls++;
                    throw new Error("decorated getter");
                  },
                }
              : { value: 1, enumerable: kind === "enumerable" },
          );
          reject(input, "invalid_array");
          expect(calls).toBe(0);
        }
      }
    },
  );
  it("accepts the documented maximum source and delivery counts", () => {
    const input = manifest();
    const source = input.sourceRecords[0]!,
      delivery = input.deliveries[0]!;
    input.sourceRecords = Array.from({ length: 256 }, (_, i) => ({
      ...source,
      sourceRecordId: "sim_record_" + i,
    }));
    input.deliveries = Array.from({ length: 1024 }, (_, i) => ({
      ...delivery,
      sourceRecordId: "sim_record_0",
      deliveryId: "sim_delivery_" + i,
      receiptDescriptorId: "sim_receipt_" + i,
      deliveryOrder: i,
    }));
    expect(validateSimulatorManifest(input).ok).toBe(true);
  });
  it("deeply freezes detached output and leaves the entire caller input unchanged", () => {
    const input = manifest(),
      before = structuredClone(input);
    const result = validateSimulatorManifest(input);
    expect(result.ok).toBe(true);
    expect(input).toEqual(before);
    expect(Object.isFrozen(input)).toBe(false);
    if (!result.ok) return;
    const output = result.value;
    for (const obj of [
      output,
      output.sourceRecords,
      output.deliveries,
      output.sourceRecords[0]!,
      output.sourceRecords[0]!.payload,
      output.deliveries[0]!,
    ])
      expect(Object.isFrozen(obj)).toBe(true);
    expect(output).not.toBe(input);
    expect(output.sourceRecords[0]!.payload).not.toBe(
      input.sourceRecords[0]!.payload,
    );
    input.sourceRecords[0]!.payload.text = "caller changed";
    input.deliveries[0]!.observedAt = "2027-01-01T00:00:00Z";
    expect(output.sourceRecords[0]!.payload.text).toBe("abc");
    expect(output.deliveries[0]!.observedAt).toBe("2026-01-01T12:00:00Z");
  });
  it("has no dependency on the host clock, randomness or network", () => {
    const clock = vi.spyOn(Date, "now").mockImplementation(() => {
      throw new Error("clock");
    });
    const random = vi.spyOn(Math, "random").mockImplementation(() => {
      throw new Error("random");
    });
    vi.stubGlobal("fetch", () => {
      throw new Error("network");
    });
    try {
      expect(validateSimulatorManifest(manifest()).ok).toBe(true);
    } finally {
      clock.mockRestore();
      random.mockRestore();
      vi.unstubAllGlobals();
    }
  });
});
