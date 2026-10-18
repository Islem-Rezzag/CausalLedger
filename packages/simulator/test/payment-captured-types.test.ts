import { expect, it } from "vitest";
import type {
  PaymentCapturedRequest,
  PaymentCapturedResult,
  SimulatorManifest,
} from "../src/index.js";
import { PAYMENT_CAPTURED_REQUEST_VERSION } from "../src/index.js";
function types(request: PaymentCapturedRequest, result: PaymentCapturedResult) {
  const wrong: PaymentCapturedRequest = {
    ...request,
    // @ts-expect-error The request uses its fixed03 version.
    schemaVersion: "m05.02-payment-authorized-request.v1",
  };
  const { captureId: _captureId, ...withoutCapture } = request;
  void _captureId;
  // @ts-expect-error Capture identity is required even when every other field is present.
  const missing: PaymentCapturedRequest = withoutCapture;
  const numeric: PaymentCapturedRequest = {
    ...request,
    // @ts-expect-error Exact money uses strings independently of readonly assignment.
    amountMinorUnits: 1000,
  };
  void numeric;
  // @ts-expect-error Capture requests are readonly.
  request.captureId = "sim_capture_changed";
  // @ts-expect-error The supplied authorization is readonly.
  request.authorizationManifest.sourceRecords[0]!.payload.text = "changed";
  // @ts-expect-error Capture has prior provenance instead of a caller context.
  void request.context;
  if (!result.ok) {
    // @ts-expect-error Failure never returns a partial accepted manifest.
    const partial: SimulatorManifest = result.value;
    void partial;
  }
  void wrong;
  void missing;
}
void types;
it("exports the versioned capture request contract", () =>
  expect(PAYMENT_CAPTURED_REQUEST_VERSION).toBe(
    "m05.03-payment-captured-request.v1",
  ));
