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
  MoneyEventEvidenceRole,
  MoneyEventId,
  MoneyEventIdempotencyKey,
  MoneyEventKind,
  MoneyEventLifecycleState,
  MoneyEventObjectReference,
  MoneyEventObjectType,
  MoneyEventPartyReference,
  MoneyEventPartyRole,
  MoneyEventProvenance,
  MoneyEventRelationshipReference,
  MoneyEventRelationshipType,
  MoneyEventSourceIdentity,
  MoneyEventSourceType,
  MoneyEventUncertainty,
  MoneyEventUncertaintyState,
  MoneyEventTransformationBoundary,
  PartyReferenceId,
  RawEvidenceLocator,
  Sha256ContentHash,
  SourceId,
  SourceRecordId,
} from "./money-event.js";

export type {
  MoneyEventAmountCandidate,
  MoneyEventCandidate,
  MoneyEventEvidenceReferenceCandidate,
  MoneyEventNormalizationResult,
  MoneyEventObjectReferenceCandidate,
  MoneyEventPartyReferenceCandidate,
  MoneyEventProvenanceCandidate,
  MoneyEventRelationshipReferenceCandidate,
  MoneyEventSourceIdentityCandidate,
  MoneyEventUncertaintyCandidate,
  MoneyEventValidationIssue,
  MoneyEventValidationIssueCode,
  MoneyEventValidationResult,
} from "./money-event-validation.js";

export {
  MONEY_EVENT_KINDS,
  MONEY_EVENT_EVIDENCE_ROLES,
  MONEY_EVENT_LIFECYCLE_STATES,
  MONEY_EVENT_OBJECT_TYPES,
  MONEY_EVENT_PARTY_ROLES,
  MONEY_EVENT_RELATIONSHIP_TYPES,
  MONEY_EVENT_RUNTIME_BOUNDARY_VERSION,
  MONEY_EVENT_SOURCE_TYPES,
  MONEY_EVENT_TRANSFORMATION_BOUNDARY,
  MONEY_EVENT_TYPE_BOUNDARY_VERSION,
  MONEY_EVENT_UNCERTAINTY_STATES,
} from "./money-event.js";

export {
  normalizeMoneyEventCandidate,
  validateAndNormalizeMoneyEventCandidate,
  validateMoneyEventCandidate,
} from "./money-event-validation.js";

export type EventsPackageBoundary = {
  readonly packageName: "@causalledger/events";
  readonly status: "source-neutral-runtime-boundary";
  readonly typeBoundaryImplemented: true;
  readonly deterministicValidationImplemented: true;
  readonly deterministicNormalizationImplemented: true;
  readonly productBehaviorImplemented: true;
  readonly runtimeSchemaImplemented: false;
  readonly parserImplemented: false;
  readonly sourceSpecificParserImplemented: false;
  readonly ingestionImplemented: false;
  readonly storageImplemented: false;
  readonly databaseImplemented: false;
  readonly apiImplemented: false;
  readonly ledgerBehaviorImplemented: false;
  readonly financialTruthEstablishedByMetadata: false;
};

export const eventsPackageBoundary: EventsPackageBoundary = {
  packageName: "@causalledger/events",
  status: "source-neutral-runtime-boundary",
  typeBoundaryImplemented: true,
  deterministicValidationImplemented: true,
  deterministicNormalizationImplemented: true,
  productBehaviorImplemented: true,
  runtimeSchemaImplemented: false,
  parserImplemented: false,
  sourceSpecificParserImplemented: false,
  ingestionImplemented: false,
  storageImplemented: false,
  databaseImplemented: false,
  apiImplemented: false,
  ledgerBehaviorImplemented: false,
  financialTruthEstablishedByMetadata: false,
};
