import { expectTypeOf, it } from "vitest";
import type {
  LedgerAccountBalanceReader,
  LedgerAccountBalanceMinorUnits,
  LedgerEntryMinorUnits,
  LedgerAccountBalanceQueryCandidate,
} from "../src/index.js";
import { balanceQuery } from "./balance-synthetic.js";
it("keeps signed balances separate from positive entry amounts and preserves readonly selection", () => {
  expectTypeOf<LedgerAccountBalanceMinorUnits>().toExtend<bigint>();
  expectTypeOf<LedgerAccountBalanceMinorUnits>().not.toExtend<LedgerEntryMinorUnits>();
  expectTypeOf<LedgerAccountBalanceReader>().not.toHaveProperty("append");
  expectTypeOf<LedgerAccountBalanceReader>().not.toHaveProperty("sql");
  expectTypeOf(
    balanceQuery(),
  ).toEqualTypeOf<LedgerAccountBalanceQueryCandidate>();
  if (false as boolean) {
    const request = balanceQuery();
    // @ts-expect-error supplied cutoff is immutable
    request.cutoffs.effectiveThrough = "later";
    // @ts-expect-error normal side is explicit Account context
    request.account.normalBalance = "debit";
    // @ts-expect-error sign convention cannot be inferred or omitted
    const missing: LedgerAccountBalanceQueryCandidate = {
      account: request.account,
    };
    void missing;
  }
});
