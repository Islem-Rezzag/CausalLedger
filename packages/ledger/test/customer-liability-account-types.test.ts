import { expectTypeOf, it } from "vitest";
import {
  validateCustomerLiabilityAccountCandidate,
  validateCustomerLiabilityJournalCandidate,
} from "../src/index.js";
import type {
  CustomerLiabilityAccountCandidate,
  CustomerLiabilityAccountValidationResult,
  CustomerLiabilityJournalContextCandidate,
  LedgerJournalValidationResult,
} from "../src/index.js";
it("returns metadata/journal validation without a write API or widened accounting class", () => {
  expectTypeOf(
    validateCustomerLiabilityAccountCandidate,
  ).returns.toEqualTypeOf<CustomerLiabilityAccountValidationResult>();
  expectTypeOf(
    validateCustomerLiabilityJournalCandidate,
  ).returns.toEqualTypeOf<LedgerJournalValidationResult>();
  expectTypeOf<
    CustomerLiabilityAccountCandidate["role"]
  >().toEqualTypeOf<"customer_liability">();
  // @ts-expect-error Provider role is not authorized by this contract.
  const role: CustomerLiabilityAccountCandidate["role"] = "provider_clearing";
  void role;
  // @ts-expect-error Customer liability is a business role, not a new01 accounting class.
  const category: CustomerLiabilityAccountCandidate["account"]["category"] =
    "customer_liability";
  void category;
});

it("requires an explicit owner/catalog context at the typed boundary", () => {
  // @ts-expect-error No inferred owner or bare catalog is accepted by the context type.
  const context: CustomerLiabilityJournalContextCandidate = { accounts: [] };
  void context;
});
