import { expectTypeOf, it } from "vitest";
import {
  validateCashClearingAccountCandidate,
  validateCashClearingJournalCandidate,
} from "../src/index.js";
import type {
  CashClearingAccountCandidate,
  CashClearingAccountValidationResult,
  LedgerJournalValidationResult,
} from "../src/index.js";
it("returns metadata/journal validation without a write API or widened accounting class", () => {
  expectTypeOf(
    validateCashClearingAccountCandidate,
  ).returns.toEqualTypeOf<CashClearingAccountValidationResult>();
  expectTypeOf(
    validateCashClearingJournalCandidate,
  ).returns.toEqualTypeOf<LedgerJournalValidationResult>();
  expectTypeOf<
    CashClearingAccountCandidate["role"]
  >().toEqualTypeOf<"cash_clearing">();
  // @ts-expect-error Later provider role is not authorized by this contract.
  const role: CashClearingAccountCandidate["role"] = "provider_clearing";
  void role;
  // @ts-expect-error Clearing is a business role, not a new01 accounting class.
  const category: CashClearingAccountCandidate["account"]["category"] =
    "cash_clearing";
  void category;
});
