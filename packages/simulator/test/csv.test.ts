import { expect, it } from "vitest";
import {
  generateBankStatementCsv,
  BANK_STATEMENT_CSV_REQUEST_VERSION,
  validateSimulatorManifest,
} from "../src/index.js";
import {
  generateSettlementCsv,
  SETTLEMENT_CSV_REQUEST_VERSION,
} from "../src/index.js";
function request() {
  return {
    schemaVersion: SETTLEMENT_CSV_REQUEST_VERSION,
    synthetic: true as const,
    scenarioId: "sim_scenario_csv",
    observationCutoff: "2026-01-02T12:00:00Z",
    sourceId: "sim_source_provider",
    sourceOccurrenceId: "sim_occ_file",
    sourceRecordId: "sim_record_file",
    eventTime: "2026-01-02T12:00:00Z",
    deliveryId: "sim_delivery_file",
    receiptDescriptorId: "sim_receipt_file",
    observedAt: "2026-01-02T12:01:00Z",
    deliveryOrder: 2,
    fileId: "sim_settlement_one",
    providerId: "sim_provider_one",
    merchantId: "sim_merchant_one",
    rows: [
      {
        rowId: "sim_settlementrow_one",
        payoutId: "sim_payout_one",
        currency: "GBP",
        amountMinorUnits: "1250",
        settledAt: "2026-01-01T12:00:00Z",
        description: 'café, "ok"\r\nnext',
      },
    ],
  };
}
const golden =
  'schema_version,synthetic,file_id,row_id,provider_id,merchant_id,payout_id,currency,amount_minor_units,settled_at,description\r\nm05.14-settlement-csv.v1,true,sim_settlement_one,sim_settlementrow_one,sim_provider_one,sim_merchant_one,sim_payout_one,GBP,1250,2026-01-01T12:00:00Z,"café, ""ok""\r\nnext"\r\n';
it("14 stable literal CSV bytes and detached immutable rows", () => {
  const input = request();
  const out = generateSettlementCsv(input);
  expect(out.ok).toBe(true);
  if (!out.ok) return;
  expect(out.value.manifest.sourceRecords[0]!.payload.text).toBe(golden);
  expect(out.value.manifest.sourceRecords[0]!.payload.sha256).toBe(
    "d087cbc01eced50c35c5c64c68eb4b5917eacb58ae411cab8316eef3bba18c67",
  );
  expect(out.value.rows).toEqual(input.rows);
  expect(Object.isFrozen(out.value.rows[0])).toBe(true);
  expect(generateSettlementCsv(input)).toEqual(out);
  input.rows[0]!.description = "changed";
  expect(out.value.rows[0]!.description).toBe('café, "ok"\r\nnext');
});

function bankRequest() {
  const { providerId, merchantId, ...base } = request();
  void providerId;
  void merchantId;
  return {
    ...base,
    schemaVersion: BANK_STATEMENT_CSV_REQUEST_VERSION,
    sourceId: "sim_source_bank",
    fileId: "sim_statement_one",
    bankId: "sim_bank_one",
    accountId: "sim_bankaccount_one",
    rows: [
      {
        lineId: "sim_bankline_one",
        payoutReference: "sim_payout_one",
        currency: "GBP",
        direction: "credit" as "credit" | "debit",
        amountMinorUnits: "1250",
        postedAt: "2026-01-01T12:00:00Z",
        description: "",
      },
    ],
  };
}
it("15 independently composed literal bank bytes/hash and source ownership", () => {
  const out = generateBankStatementCsv(bankRequest());
  expect(out.ok).toBe(true);
  if (!out.ok) return;
  const payload = out.value.manifest.sourceRecords[0]!.payload;
  expect(payload.text).toBe(
    "schema_version,synthetic,statement_id,line_id,bank_id,account_id,payout_reference,currency,direction,amount_minor_units,posted_at,description\r\nm05.15-bank-statement-csv.v1,true,sim_statement_one,sim_bankline_one,sim_bank_one,sim_bankaccount_one,sim_payout_one,GBP,credit,1250,2026-01-01T12:00:00Z,\r\n",
  );
  expect(payload.sha256).toBe(
    "d259031de287b76b7204081afe1b30530451c1ff8ae9cf3202e5ceffb3251871",
  );
  expect(out.value.manifest.sourceRecords[0]!.sourceType).toBe("bank");
  expect(validateSimulatorManifest(out.value.manifest).ok).toBe(true);
});
it("demonstration: independent provider/bank amounts, mismatches and ambiguous references", () => {
  const settlement = generateSettlementCsv(request());
  const bank = generateBankStatementCsv(bankRequest());
  expect(settlement.ok && bank.ok).toBe(true);
  const mismatch = bankRequest();
  mismatch.rows[0]!.amountMinorUnits = "1249";
  mismatch.rows[0]!.currency = "USD";
  mismatch.rows.push(
    { ...mismatch.rows[0]!, lineId: "sim_bankline_two", direction: "debit" },
    { ...mismatch.rows[0]!, lineId: "sim_bankline_three", payoutReference: "" },
  );
  const out = generateBankStatementCsv(mismatch);
  expect(out.ok).toBe(true);
  if (!out.ok || !settlement.ok) return;
  expect(out.value.rows.map((r) => r.payoutReference)).toEqual([
    "sim_payout_one",
    "sim_payout_one",
    "",
  ]);
  expect(out.value.rows[0]!.amountMinorUnits).toBe("1249");
  expect(out.value.rows[0]!.currency).toBe("USD");
  expect(settlement.value.rows[0]!.amountMinorUnits).toBe("1250");
  expect(settlement.value.rows[0]!.currency).toBe("GBP");
  expect(out.value).not.toHaveProperty("matched");
  expect(out.value).not.toHaveProperty("settled");
});
it.each(["credit", "debit"] as const)(
  "15 preserves explicit %s direction",
  (direction) => {
    const r = bankRequest();
    r.rows[0]!.direction = direction;
    const out = generateBankStatementCsv(r);
    expect(
      out.ok &&
        out.value.manifest.sourceRecords[0]!.payload.text.includes(
          "," + direction + ",1250,",
        ),
    ).toBe(true);
  },
);
it.each(["Credit", "", "debit\n", null, true])(
  "15 refuses direction %s",
  (direction) => {
    const r = bankRequest();
    Object.assign(r.rows[0]!, { direction });
    expect(generateBankStatementCsv(r).ok).toBe(false);
  },
);
it.each(["sim_payment_one", "sim_payout_", "sim_payout_a\n", null])(
  "15 refuses malformed payout ref %s",
  (payoutReference) => {
    const r = bankRequest();
    Object.assign(r.rows[0]!, { payoutReference });
    expect(generateBankStatementCsv(r).ok).toBe(false);
  },
);
it.each([false, true])("strict roots/rows/arrays bank=%s", (bank) => {
  const r = bank ? bankRequest() : request(),
    fn = bank ? generateBankStatementCsv : generateSettlementCsv;
  expect(fn({ ...r, surprise: true }).ok).toBe(false);
  let calls = 0;
  Object.defineProperty(r.rows[0], "description", {
    enumerable: true,
    get() {
      calls++;
      return "x";
    },
  });
  expect(fn(r).ok).toBe(false);
  expect(calls).toBe(0);
  for (const array of [
    [],
    new Array(2),
    Object.assign([(bank ? bankRequest() : request()).rows[0]], { extra: 1 }),
    Object.assign([(bank ? bankRequest() : request()).rows[0]], {
      [Symbol("x")]: 1,
    }),
  ])
    expect(fn({ ...r, rows: array }).ok).toBe(false);
  const root = bank ? bankRequest() : request();
  Object.defineProperty(root, "hidden", { value: 1 });
  expect(fn(root).ok).toBe(false);
});
it.each([false, true])(
  "row bounds and duplicate identifiers bank=%s",
  (bank) => {
    const r = bank ? bankRequest() : request(),
      fn = bank ? generateBankStatementCsv : generateSettlementCsv,
      key = bank ? "lineId" : "rowId",
      prefix = bank ? "sim_bankline_" : "sim_settlementrow_";
    const rows = Array.from({ length: 64 }, (_, i) => ({
      ...r.rows[0],
      [key]: prefix + i,
    }));
    expect(fn({ ...r, rows }).ok).toBe(true);
    expect(
      fn({ ...r, rows: [...rows, { ...rows[0], [key]: prefix + "over" }] }).ok,
    ).toBe(false);
    expect(fn({ ...r, rows: [rows[0], rows[0]] }).ok).toBe(false);
  },
);
it("post-escaping total cap rejects otherwise valid64 maximum-width rows atomically", () => {
  const r = request();
  r.fileId = "sim_settlement_" + "s".repeat(64);
  r.providerId = "sim_provider_" + "p".repeat(64);
  r.merchantId = "sim_merchant_" + "m".repeat(64);
  r.rows = Array.from({ length: 64 }, (_, i) => ({
    ...r.rows[0]!,
    rowId: "sim_settlementrow_" + String(i).padStart(64, "a"),
    payoutId: "sim_payout_" + "p".repeat(64),
    amountMinorUnits: "9".repeat(128),
    description: '"'.repeat(256),
  }));
  expect(generateSettlementCsv({ ...r, rows: r.rows.slice(0, 1) }).ok).toBe(
    true,
  );
  const out = generateSettlementCsv(r);
  expect(out.ok).toBe(false);
  if (out.ok) return;
  expect(out.issues).toContainEqual({
    code: "invalid_payload",
    path: "$.sourceRecords[0].payload.text",
  });
  expect(out).not.toHaveProperty("value");
});
it.each([
  ["", ",\r\n"],
  ["plain", ",plain\r\n"],
  ["x,y", ',"x,y"\r\n'],
  ['a"b', ',"a""b"\r\n'],
  ["a\rb", ',"a\rb"\r\n'],
  ["a\nb", ',"a\nb"\r\n'],
  ["a\r\nb", ',"a\r\nb"\r\n'],
  ["café 😀", ",café 😀\r\n"],
  ["=1+1", ",=1+1\r\n"],
])("preserves literal description encoding %s", (description, suffix) => {
  const r = bankRequest();
  r.rows[0]!.description = description!;
  const out = generateBankStatementCsv(r);
  expect(out.ok).toBe(true);
  if (!out.ok) return;
  expect(out.value.rows[0]!.description).toBe(description);
  expect(
    out.value.manifest.sourceRecords[0]!.payload.text.endsWith(suffix!),
  ).toBe(true);
});
it("accepts256 codeunits and refuses oversized arrays before key enumeration", () => {
  const r = bankRequest();
  r.rows[0]!.description = "x".repeat(256);
  expect(generateBankStatementCsv(r).ok).toBe(true);
  let enumerations = 0;
  const rows = new Proxy(new Array(65), {
    ownKeys(target) {
      enumerations++;
      return Reflect.ownKeys(target);
    },
  });
  expect(generateBankStatementCsv({ ...r, rows }).ok).toBe(false);
  expect(enumerations).toBe(0);
});

it.each([
  "\0",
  "\t",
  "\u000b",
  "\u000c",
  "\u001f",
  "\u007f",
  "\u0085",
  "\ud800",
  "\udfff",
  "x".repeat(257),
])("rejects malformed description %s", (description) => {
  const r = bankRequest();
  r.rows[0]!.description = description;
  expect(generateBankStatementCsv(r).ok).toBe(false);
});
it.each(["2026-01-02T12:00:00Z", "2026-01-02T12:00:00.000Z"])(
  "row/file equality preserves %s",
  (postedAt) => {
    const r = bankRequest();
    r.rows[0]!.postedAt = postedAt;
    const out = generateBankStatementCsv(r);
    expect(out.ok && out.value.rows[0]!.postedAt).toBe(postedAt);
  },
);
it.each([
  "2026-02-30T00:00:00Z",
  "0000-01-01T00:00:00Z",
  "2026-01-01T00:00:00Z\n",
  "2026-01-01T00:00:00+00:00",
  null,
])("rejects malformed row/file clocks %s", (time) => {
  const r = bankRequest();
  Object.assign(r.rows[0]!, { postedAt: time });
  expect(generateBankStatementCsv(r).ok).toBe(false);
  expect(
    generateBankStatementCsv({ ...bankRequest(), eventTime: time }).ok,
  ).toBe(false);
});
it("root snapshots survive actual caller mutation during nested row inspection", () => {
  const r = bankRequest();
  const row = r.rows[0]!;
  r.rows[0] = new Proxy(row, {
    getPrototypeOf(target) {
      r.fileId = "sim_statement_changed";
      r.eventTime = "bad";
      r.sourceId = "sim_source_changed";
      return Reflect.getPrototypeOf(target);
    },
  });
  const out = generateBankStatementCsv(r);
  expect(out.ok).toBe(true);
  expect(r.eventTime).toBe("bad");
  if (!out.ok) return;
  expect(out.value.fileId).toBe("sim_statement_one");
  expect(out.value.manifest.sourceRecords[0]!.sourceId).toBe("sim_source_bank");
});
it("row order and independent observation metadata are preserved", () => {
  const r = bankRequest();
  r.rows.push({
    ...r.rows[0]!,
    lineId: "sim_bankline_two",
    postedAt: "2025-01-01T00:00:00Z",
  });
  r.observedAt = "2024-01-01T00:00:00Z";
  const out = generateBankStatementCsv(r);
  expect(out.ok).toBe(true);
  if (!out.ok) return;
  expect(out.value.rows.map((x) => x.lineId)).toEqual([
    "sim_bankline_one",
    "sim_bankline_two",
  ]);
  expect(out.value.manifest.deliveries[0]!.observedAt).toBe(r.observedAt);
});
it.each([
  0,
  1250,
  1250n,
  "0",
  "00",
  "01",
  "-1",
  "+1",
  "1.00",
  "1e3",
  " 1",
  "1 ",
  "1\n",
  "1".repeat(129),
  null,
])("14 refuses malformed minor units %s", (amount) => {
  const r = request();
  Object.assign(r.rows[0]!, { amountMinorUnits: amount });
  const out = generateSettlementCsv(r);
  expect(out.ok).toBe(false);
  expect(out).not.toHaveProperty("value");
});
it.each(["gbp", "GB", "GBPP", "GBP\n", null, 123])(
  "14 refuses currency %s",
  (currency) => {
    const r = request();
    Object.assign(r.rows[0]!, { currency });
    expect(generateSettlementCsv(r).ok).toBe(false);
  },
);
it.each(["delimiter", "quote", "header", "encoding"])(
  "14 refuses dialect override %s",
  (field) =>
    expect(generateSettlementCsv({ ...request(), [field]: ";" }).ok).toBe(
      false,
    ),
);
it("14 preserves largest exact amount without number coercion", () => {
  const r = request();
  r.rows[0]!.amountMinorUnits = "9".repeat(128);
  const out = generateSettlementCsv(r);
  expect(
    out.ok &&
      out.value.manifest.sourceRecords[0]!.payload.text.includes(
        "," + "9".repeat(128) + ",",
      ),
  ).toBe(true);
});
it("14 rejects missing reference, duplicate row identity and future row time", () => {
  const r = request();
  r.rows[0]!.payoutId = "";
  expect(generateSettlementCsv(r).ok).toBe(false);
  const d = request();
  d.rows.push({ ...d.rows[0]! });
  expect(generateSettlementCsv(d).ok).toBe(false);
  const f = request();
  f.rows[0]!.settledAt = "2026-01-02T12:00:00.001Z";
  expect(generateSettlementCsv(f).ok).toBe(false);
});
