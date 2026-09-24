import { expectTypeOf, it } from "vitest";
import type {
  Account,
  AccountCandidate,
  AccountId,
  LedgerId,
} from "../src/index.js";

function compileTimeBoundaries(account: Account): void {
  // @ts-expect-error Account identity cannot be an unchecked string.
  const plain: AccountId = "acct_unvalidated";
  // @ts-expect-error Ledger and account identifiers are separate domains.
  const ledger: LedgerId = account.id;
  // @ts-expect-error Validated metadata is readonly.
  account.currency = "USD";
  // @ts-expect-error Nested owner references are readonly.
  account.owner.id = "other";
  // @ts-expect-error Debit-normal categories cannot claim credit-normal behavior.
  const contradictory: AccountCandidate = {
    ...account,
    category: "asset",
    normalBalance: "credit",
  };
  // @ts-expect-error Unsupported currencies need an explicit contract change.
  const unsupported: AccountCandidate = { ...account, currency: "ZZZ" };
  void [plain, ledger, contradictory, unsupported];
}

it("distinguishes validated IDs and preserves category/side narrowing", () => {
  expectTypeOf<AccountId>().not.toEqualTypeOf<string>();
  expectTypeOf<AccountId>().not.toEqualTypeOf<LedgerId>();
  expectTypeOf<
    Extract<Account, { normalBalance: "debit" }>["category"]
  >().toEqualTypeOf<"asset" | "expense">();
  expectTypeOf<
    Extract<Account, { normalBalance: "credit" }>["category"]
  >().toEqualTypeOf<"liability" | "equity" | "revenue">();
  expectTypeOf(compileTimeBoundaries).toBeFunction();
});
