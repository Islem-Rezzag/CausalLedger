export const SIMULATOR_MANIFEST_VERSION =
  "m05.01-simulator-manifest.v1" as const;
export const SIMULATOR_LIMITS = Object.freeze({
  sourceRecords: 256,
  deliveries: 1024,
  payloadCodeUnits: 65536,
});
export type SyntheticPayload = {
  readonly encoding: "utf-8";
  readonly mediaType: "application/json" | "text/csv" | "text/plain";
  readonly text: string;
  readonly sha256: string;
};
export type SyntheticSourceRecord = {
  readonly sourceId: string;
  readonly sourceType: "provider" | "bank";
  readonly sourceOccurrenceId: string;
  readonly sourceRecordId: string;
  readonly eventTime: string | null;
  readonly payload: SyntheticPayload;
};
/** Caller-declared synthetic receipt metadata, never an ingested durable receipt. */
export type SyntheticDelivery = {
  readonly deliveryId: string;
  readonly receiptDescriptorId: string;
  readonly sourceId: string;
  readonly sourceOccurrenceId: string;
  readonly sourceRecordId: string;
  readonly observedAt: string;
  readonly deliveryOrder: number;
};
export type SimulatorManifest = {
  readonly schemaVersion: typeof SIMULATOR_MANIFEST_VERSION;
  readonly synthetic: true;
  readonly scenarioId: string;
  readonly generatorVersion: string;
  readonly observationCutoff: string;
  readonly sourceRecords: readonly SyntheticSourceRecord[];
  readonly deliveries: readonly SyntheticDelivery[];
};
export type SimulatorIssueCode =
  | "invalid_object"
  | "invalid_array"
  | "unknown_field"
  | "missing_field"
  | "invalid_value"
  | "invalid_identity"
  | "invalid_timestamp"
  | "invalid_payload"
  | "hash_mismatch"
  | "duplicate_identity"
  | "invalid_reference";
export type SimulatorValidationIssue = {
  readonly code: SimulatorIssueCode;
  readonly path: string;
};
export type SimulatorValidationResult =
  | {
      readonly ok: true;
      readonly value: SimulatorManifest;
      readonly issues: readonly [];
    }
  | {
      readonly ok: false;
      readonly issues: readonly SimulatorValidationIssue[];
      readonly value?: never;
    };
export const simulatorPackageBoundary = Object.freeze({
  packageName: "@causalledger/simulator",
  contractVersion: SIMULATOR_MANIFEST_VERSION,
  manifestValidationImplemented: true,
  exactUtf8IntegrityValidationImplemented: true,
  providerGenerationImplemented: true,
  paymentAuthorizedGenerationImplemented: true,
  paymentCapturedGenerationImplemented: true,
  payoutCreatedGenerationImplemented: true,
  payoutPaidGenerationImplemented: true,
  payoutFailedGenerationImplemented: true,
  refundCreatedGenerationImplemented: true,
  refundPaidGenerationImplemented: true,
  disputeOpenedGenerationImplemented: true,
  chargebackFeeGenerationImplemented: true,
  bankGenerationImplemented: false,
  seedExecutionImplemented: false,
  cliImplemented: false,
  evidenceIngestionImplemented: false,
  evidenceStorageImplemented: false,
  financialTruthEstablished: false,
  ledgerWritesImplemented: false,
  agentToolImplemented: false,
} as const);
