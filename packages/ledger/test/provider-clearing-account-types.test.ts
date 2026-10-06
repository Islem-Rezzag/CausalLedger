import { expectTypeOf, it } from "vitest";
import {
  validateProviderClearingAccountCandidate,
  validateProviderClearingJournalCandidate,
} from "../src/index.js";
import type {
  ProviderClearingAccountCandidate,
  ProviderClearingAccountValidationResult,
  ProviderClearingJournalContextCandidate,
  LedgerJournalValidationResult,
} from "../src/index.js";
it("returns metadata/journal validation without a write API or widened accounting class", () => {
  expectTypeOf(
    validateProviderClearingAccountCandidate,
  ).returns.toEqualTypeOf<ProviderClearingAccountValidationResult>();
  expectTypeOf(
    validateProviderClearingJournalCandidate,
  ).returns.toEqualTypeOf<LedgerJournalValidationResult>();
  expectTypeOf<
    ProviderClearingAccountCandidate["role"]
  >().toEqualTypeOf<"provider_clearing">();
  // @ts-expect-error A different cash role is not authorized by this contract.
  const role: ProviderClearingAccountCandidate["role"] = "cash_clearing";
  void role;
  // @ts-expect-error Clearing is a business role, not a new01 accounting class.
  const category: ProviderClearingAccountCandidate["account"]["category"] =
    "provider_clearing";
  void category;
  // @ts-expect-error Provider binding is explicit, never inferred from accounts.
  const context: ProviderClearingJournalContextCandidate = { accounts: [] };
  void context;
});
