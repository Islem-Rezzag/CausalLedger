export type {
  EvidenceReceiptId,
  FinancialObjectReferenceId,
  Iso4217CurrencyCode,
  IsoDateTimeString,
  MoneyAmountMinorUnits,
  MoneyEvent,
  MoneyEventAmount,
  MoneyEventContractVersion,
  MoneyEventEvidenceReference,
  MoneyEventId,
  MoneyEventIdempotencyKey,
  MoneyEventKind,
  MoneyEventLifecycleState,
  MoneyEventObjectReference,
  MoneyEventPartyReference,
  MoneyEventProvenance,
  MoneyEventRelationshipReference,
  MoneyEventSourceIdentity,
  MoneyEventSourceType,
  MoneyEventUncertainty,
  MoneyEventUncertaintyState,
  PartyReferenceId,
  RawEvidenceLocator,
  Sha256ContentHash,
  SourceId,
  SourceRecordId,
} from "./money-event.js";

export {
  MONEY_EVENT_KINDS,
  MONEY_EVENT_LIFECYCLE_STATES,
  MONEY_EVENT_SOURCE_TYPES,
  MONEY_EVENT_TYPE_BOUNDARY_VERSION,
  MONEY_EVENT_UNCERTAINTY_STATES,
} from "./money-event.js";

export type EventsPackageBoundary = {
  readonly packageName: "@causalledger/events";
  readonly status: "type-boundary-only";
  readonly productBehaviorImplemented: false;
  readonly runtimeSchemaImplemented: false;
  readonly parserImplemented: false;
  readonly validatorImplemented: false;
};

export const eventsPackageBoundary: EventsPackageBoundary = {
  packageName: "@causalledger/events",
  status: "type-boundary-only",
  productBehaviorImplemented: false,
  runtimeSchemaImplemented: false,
  parserImplemented: false,
  validatorImplemented: false,
};
