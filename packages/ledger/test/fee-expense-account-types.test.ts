import { expectTypeOf, it } from "vitest";
import {
  validateFeeExpenseAccountCandidate,
  validateFeeExpenseJournalCandidate,
} from "../src/index.js";
import type {
  FeeExpenseAccountCandidate,
  FeeExpenseAccountValidationResult,
  LedgerJournalValidationResult,
  FeeExpenseJournalContextCandidate,
} from "../src/index.js";
it("returns metadata/journal validation without a write API or widened accounting class", () => {
  expectTypeOf(
    validateFeeExpenseAccountCandidate,
  ).returns.toEqualTypeOf<FeeExpenseAccountValidationResult>();
  expectTypeOf(
    validateFeeExpenseJournalCandidate,
  ).returns.toEqualTypeOf<LedgerJournalValidationResult>();
  expectTypeOf<
    FeeExpenseAccountCandidate["role"]
  >().toEqualTypeOf<"fee_expense">();
  // @ts-expect-error Provider role is not authorized by this contract.
  const role: FeeExpenseAccountCandidate["role"] = "provider_clearing";
  void role;
  // @ts-expect-error Fee expense is a business role, not a new01 accounting class.
  const category: FeeExpenseAccountCandidate["account"]["category"] =
    "fee_expense";
  void category;
});

it("requires explicit per-journal source context", () => {
  expectTypeOf<FeeExpenseJournalContextCandidate["source"]>().toEqualTypeOf<{
    readonly namespace: string;
    readonly id: string;
  }>();
  // @ts-expect-error The source context is required, not inferred from accounts.
  const missing: FeeExpenseJournalContextCandidate = { accounts: [] };
  void missing;
});
