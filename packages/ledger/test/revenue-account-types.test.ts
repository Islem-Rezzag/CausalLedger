import { expectTypeOf, it } from "vitest";
import {
  validateRevenueAccountCandidate,
  validateRevenueJournalCandidate,
} from "../src/index.js";
import type {
  RevenueAccountCandidate,
  RevenueAccountValidationResult,
  LedgerJournalValidationResult,
  RevenueJournalContextCandidate,
} from "../src/index.js";
it("returns metadata/journal validation without a write API or widened accounting class", () => {
  expectTypeOf(
    validateRevenueAccountCandidate,
  ).returns.toEqualTypeOf<RevenueAccountValidationResult>();
  expectTypeOf(
    validateRevenueJournalCandidate,
  ).returns.toEqualTypeOf<LedgerJournalValidationResult>();
  expectTypeOf<RevenueAccountCandidate["role"]>().toEqualTypeOf<"revenue">();
  // @ts-expect-error Provider role is not authorized by this contract.
  const role: RevenueAccountCandidate["role"] = "provider_clearing";
  void role;
  // @ts-expect-error Revenue reuses the existing01 category; no new class is added.
  const category: RevenueAccountCandidate["account"]["category"] =
    "recognized_revenue";
  void category;
});

it("requires explicit per-journal source context", () => {
  expectTypeOf<RevenueJournalContextCandidate["source"]>().toEqualTypeOf<{
    readonly namespace: string;
    readonly id: string;
  }>();
  // @ts-expect-error The source context is required, not inferred from accounts.
  const missing: RevenueJournalContextCandidate = { accounts: [] };
  void missing;
});
