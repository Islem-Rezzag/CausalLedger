import { expectTypeOf, it } from "vitest";
import {
  createLedgerReversalStore,
  validateLedgerReversalCandidate,
} from "../src/index.js";
import type {
  LedgerReversalCandidate,
  LedgerReversalResult,
  LedgerReversalStore,
  LedgerReversalValidationResult,
} from "../src/index.js";
it("keeps candidate wire money separate from receipt and exposes no approval/apply method", () => {
  expectTypeOf(
    createLedgerReversalStore,
  ).returns.toEqualTypeOf<LedgerReversalStore>();
  expectTypeOf(
    validateLedgerReversalCandidate,
  ).returns.toEqualTypeOf<LedgerReversalValidationResult>();
  expectTypeOf<LedgerReversalStore["append"]>().returns.toEqualTypeOf<
    Promise<LedgerReversalResult>
  >();
  expectTypeOf<LedgerReversalCandidate["kind"]>().toEqualTypeOf<"full">();
  expectTypeOf<keyof LedgerReversalStore>().toEqualTypeOf<"append" | "close">();
  // @ts-expect-error Partial reversals are outside09's contract.
  const partial: LedgerReversalCandidate["kind"] = "partial";
  void partial;
});
