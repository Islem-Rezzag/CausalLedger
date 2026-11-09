import { expect, it } from "vitest";
import { simulatorPackageBoundary } from "../src/index.js";
import type {
  DisputeOpenedRequest,
  ChargebackFeeRequest,
  DisputeResult,
  SimulatorManifest,
} from "../src/index.js";
function types(
  d: DisputeOpenedRequest,
  f: ChargebackFeeRequest,
  r: DisputeResult,
) {
  // @ts-expect-error No implicit disputed principal.
  d.amountMinorUnits = "1250";
  // @ts-expect-error Exact fee representation is a string.
  const numericFee: ChargebackFeeRequest = { ...f, feeAmountMinorUnits: 150 };
  // @ts-expect-error Fee input remains readonly independently of its representation.
  f.feeAmountMinorUnits = "150";
  // @ts-expect-error Readonly explicit reason.
  d.reason = "changed";
  // @ts-expect-error No approval authority.
  f.approved = true;
  // @ts-expect-error Different request kinds.
  const bad: ChargebackFeeRequest = d;
  if (!r.ok) {
    // @ts-expect-error No partial value on refusal.
    const partial: SimulatorManifest = r.value;
    void partial;
  }
  void bad;
  void numericFee;
}
void types;
it("exports synthetic dispute/fee generation without financial authority", () =>
  expect(simulatorPackageBoundary).toMatchObject({
    disputeOpenedGenerationImplemented: true,
    chargebackFeeGenerationImplemented: true,
    financialTruthEstablished: false,
    ledgerWritesImplemented: false,
    evidenceStorageImplemented: false,
  }));
