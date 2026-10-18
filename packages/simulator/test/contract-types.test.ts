import { expect, it } from "vitest";
import type {
  SimulatorManifest,
  SimulatorValidationResult,
} from "../src/index.js";
import { simulatorPackageBoundary } from "../src/index.js";
function readonlyTypes(
  manifest: SimulatorManifest,
  result: SimulatorValidationResult,
) {
  // @ts-expect-error Versioned manifests are readonly.
  manifest.synthetic = false;
  // @ts-expect-error Source arrays are readonly.
  manifest.sourceRecords.push({});
  // @ts-expect-error Payload text is readonly.
  manifest.sourceRecords[0]!.payload.text = "changed";
  // @ts-expect-error Source time explicitly includes unknown null.
  const known: string = manifest.sourceRecords[0]!.eventTime;
  // @ts-expect-error Generic source descriptors do not expose financial amount policy.
  void manifest.sourceRecords[0]!.amountMinorUnits;
  if (!result.ok) {
    // @ts-expect-error A failure has no partially accepted manifest.
    const partial: SimulatorManifest = result.value;
    void partial;
  }
  void known;
}
void readonlyTypes;
it("exports precise foundation, authorization and capture boundaries", () => {
  expect(simulatorPackageBoundary).toMatchObject({
    manifestValidationImplemented: true,
    exactUtf8IntegrityValidationImplemented: true,
    providerGenerationImplemented: true,
    paymentAuthorizedGenerationImplemented: true,
    paymentCapturedGenerationImplemented: true,
    bankGenerationImplemented: false,
    evidenceStorageImplemented: false,
    ledgerWritesImplemented: false,
    financialTruthEstablished: false,
    agentToolImplemented: false,
  });
  expect(Object.isFrozen(simulatorPackageBoundary)).toBe(true);
});
