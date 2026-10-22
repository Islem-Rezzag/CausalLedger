import { it, expect } from "vitest";
import { simulatorPackageBoundary } from "../src/index.js";
import type {
  PayoutCreatedRequest,
  PayoutPaidRequest,
  PayoutFailedRequest,
  PayoutResult,
  SimulatorManifest,
} from "../src/index.js";
function types(
  c: PayoutCreatedRequest,
  p: PayoutPaidRequest,
  f: PayoutFailedRequest,
  r: PayoutResult,
) {
  // @ts-expect-error Version is literal and readonly.
  c.schemaVersion = "wrong";
  // @ts-expect-error Membership is readonly.
  c.captureManifests.push({});
  // @ts-expect-error No bank confirmation input exists.
  p.bankConfirmed = true;
  // @ts-expect-error Failure reason is required.
  const missing: PayoutFailedRequest = p;
  // @ts-expect-error Reason is readonly.
  f.failureReason = "invented";
  if (!r.ok) {
    // @ts-expect-error Failure does not include a partial accepted manifest.
    const partial: SimulatorManifest = r.value;
    void partial;
  }
  void missing;
}
void types;
it("exports bounded synthetic payout capabilities without financial authority", () =>
  expect(simulatorPackageBoundary).toMatchObject({
    payoutCreatedGenerationImplemented: true,
    payoutPaidGenerationImplemented: true,
    payoutFailedGenerationImplemented: true,
    ledgerWritesImplemented: false,
    evidenceStorageImplemented: false,
    financialTruthEstablished: false,
  }));
