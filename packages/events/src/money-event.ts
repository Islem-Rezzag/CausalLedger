declare const brand: unique symbol;

type Brand<TValue, TBrand extends string> = TValue & {
  readonly [brand]: TBrand;
};

export const MONEY_EVENT_TYPE_BOUNDARY_VERSION =
  "m03.02-type-boundary.v1" as const;

export const MONEY_EVENT_KINDS = [
  "payment.authorized",
  "payment.captured",
  "refund.created",
  "chargeback.opened",
  "settlement.row_observed",
  "payout.observed",
  "bank.posting_observed",
  "fee.observed",
  "adjustment.observed",
] as const;

export const MONEY_EVENT_SOURCE_TYPES = [
  "provider.webhook",
  "provider.api_record",
  "settlement.file",
  "bank.statement",
  "internal.record",
  "ledger.reference",
  "controlled.simulator_output",
] as const;

export const MONEY_EVENT_LIFECYCLE_STATES = [
  "observed",
  "normalized",
  "validated",
  "rejected",
  "superseded",
  "reversed",
  "adjusted",
  "unresolved",
] as const;

export const MONEY_EVENT_UNCERTAINTY_STATES = [
  "none_known",
  "missing_evidence",
  "partial_evidence",
  "conflicting_evidence",
  "delayed_evidence",
  "ambiguous_reference",
  "provider_only",
  "unresolved",
] as const;

export type MoneyEventContractVersion =
  typeof MONEY_EVENT_TYPE_BOUNDARY_VERSION;
export type MoneyEventKind = (typeof MONEY_EVENT_KINDS)[number];
export type MoneyEventSourceType = (typeof MONEY_EVENT_SOURCE_TYPES)[number];
export type MoneyEventLifecycleState =
  (typeof MONEY_EVENT_LIFECYCLE_STATES)[number];
export type MoneyEventUncertaintyState =
  (typeof MONEY_EVENT_UNCERTAINTY_STATES)[number];

export type MoneyEventId = Brand<`evt_${string}`, "MoneyEventId">;
export type EvidenceReceiptId = Brand<`rcpt_${string}`, "EvidenceReceiptId">;
export type SourceId = Brand<string, "SourceId">;
export type SourceRecordId = Brand<string, "SourceRecordId">;
export type RawEvidenceLocator = Brand<string, "RawEvidenceLocator">;
export type Sha256ContentHash = Brand<`sha256:${string}`, "Sha256ContentHash">;
export type Iso4217CurrencyCode = Brand<string, "Iso4217CurrencyCode">;
export type IsoDateTimeString = Brand<string, "IsoDateTimeString">;
export type MoneyEventIdempotencyKey = Brand<
  string,
  "MoneyEventIdempotencyKey"
>;
export type PartyReferenceId = Brand<string, "PartyReferenceId">;
export type FinancialObjectReferenceId = Brand<
  string,
  "FinancialObjectReferenceId"
>;

export type MoneyAmountMinorUnits = Brand<bigint, "MoneyAmountMinorUnits">;

export interface MoneyEventSourceIdentity {
  readonly sourceId: SourceId;
  readonly sourceType: MoneyEventSourceType;
  readonly sourceRecordId?: SourceRecordId;
  readonly sourceSystemName?: string;
}

export interface MoneyEventEvidenceReference {
  readonly receiptId?: EvidenceReceiptId;
  readonly rawLocator?: RawEvidenceLocator;
  readonly sourceRecordId?: SourceRecordId;
  readonly contentHash?: Sha256ContentHash;
  readonly role: "primary" | "supporting" | "conflicting" | "missing_expected";
}

export interface MoneyEventProvenance {
  readonly source: MoneyEventSourceIdentity;
  readonly evidence: readonly MoneyEventEvidenceReference[];
  readonly observedAt: IsoDateTimeString;
  readonly derivedBy: "m03.02-type-boundary";
}

export interface MoneyEventAmount {
  readonly minorUnits: MoneyAmountMinorUnits;
  readonly currency: Iso4217CurrencyCode;
  readonly representation: "integer_minor_units";
}

export interface MoneyEventPartyReference {
  readonly partyId: PartyReferenceId;
  readonly role:
    | "merchant"
    | "customer"
    | "platform"
    | "provider"
    | "bank_account"
    | "counterparty"
    | "unknown";
}

export interface MoneyEventObjectReference {
  readonly objectId: FinancialObjectReferenceId;
  readonly objectType:
    | "payment"
    | "authorization"
    | "capture"
    | "refund"
    | "chargeback"
    | "dispute"
    | "payout"
    | "settlement_row"
    | "bank_statement_line"
    | "ledger_reference"
    | "unknown";
}

export interface MoneyEventRelationshipReference {
  readonly relationship:
    | "caused_by"
    | "correlates_with"
    | "supersedes"
    | "reverses"
    | "adjusts"
    | "original_object";
  readonly eventId?: MoneyEventId;
  readonly object?: MoneyEventObjectReference;
}

export interface MoneyEventUncertainty {
  readonly state: MoneyEventUncertaintyState;
  readonly reasons: readonly string[];
  readonly evidence: readonly MoneyEventEvidenceReference[];
}

export interface MoneyEvent {
  readonly id: MoneyEventId;
  readonly contractVersion: MoneyEventContractVersion;
  readonly kind: MoneyEventKind;
  readonly source: MoneyEventSourceIdentity;
  readonly evidence: readonly MoneyEventEvidenceReference[];
  readonly provenance: MoneyEventProvenance;
  readonly amount: MoneyEventAmount;
  readonly primaryParty: MoneyEventPartyReference;
  readonly relatedParties: readonly MoneyEventPartyReference[];
  readonly object: MoneyEventObjectReference;
  readonly eventTime: IsoDateTimeString | null;
  readonly observedTime: IsoDateTimeString;
  readonly idempotencyKey: MoneyEventIdempotencyKey;
  readonly relationships: readonly MoneyEventRelationshipReference[];
  readonly lifecycleState: MoneyEventLifecycleState;
  readonly uncertainty: MoneyEventUncertainty;
}
