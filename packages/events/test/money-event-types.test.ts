import { describe, expect, expectTypeOf, it } from "vitest";

import * as events from "../src/index.js";
import {
  MONEY_EVENT_KINDS,
  MONEY_EVENT_SOURCE_TYPES,
  MONEY_EVENT_TYPE_BOUNDARY_VERSION,
  type EvidenceReceiptId,
  type FinancialObjectReferenceId,
  type Iso4217CurrencyCode,
  type IsoDateTimeString,
  type MoneyAmountMinorUnits,
  type MoneyEvent,
  type MoneyEventKind,
  type MoneyEventSourceType,
  type PartyReferenceId,
  type RawEvidenceLocator,
  type SourceId,
  type SourceRecordId,
} from "../src/index.js";

const representativeMoneyEvent = {
  id: "evt_01JTYPEBOUNDARY000000000000" as MoneyEvent["id"],
  contractVersion: MONEY_EVENT_TYPE_BOUNDARY_VERSION,
  kind: "payment.captured",
  source: {
    sourceId: "stripe-test" as SourceId,
    sourceType: "provider.webhook",
    sourceRecordId: "evt_provider_capture" as SourceRecordId,
    sourceSystemName: "provider-test",
  },
  evidence: [
    {
      receiptId: "rcpt_01JTYPEBOUNDARY000000000" as EvidenceReceiptId,
      rawLocator:
        "raw://provider/webhook/evt_provider_capture" as RawEvidenceLocator,
      sourceRecordId: "evt_provider_capture" as SourceRecordId,
      role: "primary",
    },
  ],
  provenance: {
    source: {
      sourceId: "stripe-test" as SourceId,
      sourceType: "provider.webhook",
      sourceRecordId: "evt_provider_capture" as SourceRecordId,
    },
    evidence: [
      {
        receiptId: "rcpt_01JTYPEBOUNDARY000000000" as EvidenceReceiptId,
        role: "primary",
      },
    ],
    observedAt: "2026-06-30T10:00:00.000Z" as IsoDateTimeString,
    derivedBy: "m03.02-type-boundary",
  },
  amount: {
    minorUnits: 1250n as MoneyAmountMinorUnits,
    currency: "GBP" as Iso4217CurrencyCode,
    representation: "integer_minor_units",
  },
  primaryParty: {
    partyId: "merchant_123" as PartyReferenceId,
    role: "merchant",
  },
  relatedParties: [],
  object: {
    objectId: "pay_123" as FinancialObjectReferenceId,
    objectType: "payment",
  },
  eventTime: "2026-06-30T09:59:00.000Z" as IsoDateTimeString,
  observedTime: "2026-06-30T10:00:00.000Z" as IsoDateTimeString,
  idempotencyKey:
    "provider.webhook:evt_provider_capture" as MoneyEvent["idempotencyKey"],
  relationships: [],
  lifecycleState: "observed",
  uncertainty: {
    state: "provider_only",
    reasons: [
      "settlement and bank evidence are not represented in this type-only example",
    ],
    evidence: [],
  },
} satisfies MoneyEvent;

describe("MoneyEvent TypeScript type boundary", () => {
  it("typechecks a representative MoneyEvent shape", () => {
    expect(representativeMoneyEvent.contractVersion).toBe(
      MONEY_EVENT_TYPE_BOUNDARY_VERSION,
    );
    expect(representativeMoneyEvent.amount.representation).toBe(
      "integer_minor_units",
    );
    expectTypeOf(representativeMoneyEvent.kind).toMatchTypeOf<MoneyEventKind>();
    expectTypeOf(
      representativeMoneyEvent.source.sourceType,
    ).toMatchTypeOf<MoneyEventSourceType>();
    expectTypeOf(
      representativeMoneyEvent.amount.minorUnits,
    ).toEqualTypeOf<MoneyAmountMinorUnits>();
    expectTypeOf<
      MoneyEvent["amount"]["minorUnits"]
    >().not.toEqualTypeOf<number>();
  });

  it("exports only boundary constants and no parser or validator functions", () => {
    expect(MONEY_EVENT_KINDS).toContain("payment.captured");
    expect(MONEY_EVENT_SOURCE_TYPES).toContain("provider.webhook");
    expect(events).not.toHaveProperty("parseMoneyEvent");
    expect(events).not.toHaveProperty("validateMoneyEvent");
    expect(events).not.toHaveProperty("normalizeMoneyEvent");
    expect(events).not.toHaveProperty("ingestMoneyEvent");
    expect(events).not.toHaveProperty("storeMoneyEvent");
  });
});
