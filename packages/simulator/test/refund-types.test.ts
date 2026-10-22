import { it, expect } from "vitest";
import { simulatorPackageBoundary } from "../src/index.js";
import type {
  RefundCreatedRequest,
  RefundPaidRequest,
  RefundResult,
  SimulatorManifest,
} from "../src/index.js";
function types(c: RefundCreatedRequest, p: RefundPaidRequest, r: RefundResult) {
  // @ts-expect-error Literal readonly schema.
  c.schemaVersion = "wrong";
  // @ts-expect-error Exact money is a string.
  c.amountMinorUnits = 500;
  // @ts-expect-error No repair/financial approval authority.
  p.approved = true;
  // @ts-expect-error Distinct request kinds.
  const bad: RefundPaidRequest = c;
  if (!r.ok) {
    // @ts-expect-error Refusal has no partial value.
    const partial: SimulatorManifest = r.value;
    void partial;
  }
  void bad;
}
void types;
it("exports bounded refund generation without financial authority", () =>
  expect(simulatorPackageBoundary).toMatchObject({
    refundCreatedGenerationImplemented: true,
    refundPaidGenerationImplemented: true,
    ledgerWritesImplemented: false,
    evidenceStorageImplemented: false,
    financialTruthEstablished: false,
  }));
