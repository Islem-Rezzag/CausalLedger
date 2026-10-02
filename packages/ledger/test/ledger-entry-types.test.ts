import { expectTypeOf, it } from "vitest";
import { validateLedgerEntryCandidate } from "../src/index.js";
import type {
  AccountId,
  LedgerTransactionId,
  LedgerEntry,
  LedgerEntryCandidate,
  LedgerEntryId,
  LedgerEntryMinorUnits,
  LedgerEntryValidationResult,
} from "../src/index.js";
function boundaries(
  entry: LedgerEntry,
  wire: LedgerEntryCandidate,
  result: LedgerEntryValidationResult,
): void {
  // @ts-expect-error Unchecked strings are not validated entry identities.
  const id: LedgerEntryId = "ent_unchecked";
  // @ts-expect-error Account and entry identity domains differ.
  const account: AccountId = entry.id;
  // @ts-expect-error Transaction and entry identity domains differ.
  const transaction: LedgerTransactionId = entry.id;
  // @ts-expect-error Ordinary bigint is not a checked positive bounded amount.
  const money: LedgerEntryMinorUnits = 0n;
  // @ts-expect-error Money remains bigint internally.
  const number: number = entry.amount.minorUnits;
  // @ts-expect-error Wire amount strings and checked internal bigint differ.
  const checked: LedgerEntry = wire;
  // @ts-expect-error Validated entries are readonly.
  entry.side = "credit";
  // @ts-expect-error Nested exact money is readonly.
  entry.amount.minorUnits = money;
  const invalid: LedgerEntryCandidate = {
    ...wire,
    amount: {
      ...wire.amount,
      // @ts-expect-error Versioned wire money requires a string, not bigint.
      minorUnits: 1n,
    },
  };
  // @ts-expect-error Context is mandatory even when input is unknown.
  validateLedgerEntryCandidate(wire);
  if (!result.ok) {
    // @ts-expect-error Failure exposes no partial entry.
    void result.value;
  }
  void [id, account, transaction, money, number, checked, invalid];
}
it("keeps wire, exact money, reference brands and readonly entry boundaries distinct", () => {
  expectTypeOf<LedgerEntryMinorUnits>().not.toEqualTypeOf<number>();
  expectTypeOf<LedgerEntryMinorUnits>().not.toEqualTypeOf<bigint>();
  expectTypeOf<LedgerEntryId>().not.toEqualTypeOf<string>();
  expectTypeOf(boundaries).toBeFunction();
});
