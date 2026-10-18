import { expect, it } from "vitest";
import type {
  PaymentAuthorizedRequest,
  PaymentAuthorizedResult,
  SimulatorManifest,
} from "../src/index.js";
import { generatePaymentAuthorized } from "../src/index.js";
function types(
  input: PaymentAuthorizedRequest,
  result: PaymentAuthorizedResult,
) {
  // @ts-expect-error Request amount is an exact readonly string.
  input.amountMinorUnits = 1250;
  // @ts-expect-error Context is readonly.
  input.context.currency = "EUR";
  // @ts-expect-error This feature requires known event time.
  const request: PaymentAuthorizedRequest = { ...input, eventTime: null };
  if (!result.ok) {
    // @ts-expect-error Failure cannot return partial financial or descriptor output.
    const partial: SimulatorManifest = result.value;
    void partial;
  } else {
    // @ts-expect-error Generated payload remains readonly.
    result.value.sourceRecords[0]!.payload.text = "changed";
  }
  void request;
}
void types;
it("accepts unknown at runtime and returns a discriminated result", () => {
  expect(generatePaymentAuthorized(undefined).ok).toBe(false);
});
