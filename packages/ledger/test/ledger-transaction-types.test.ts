import { expectTypeOf, it } from "vitest";
import type {
  AccountId,
  LedgerId,
  LedgerTransaction,
  LedgerTransactionCandidate,
  LedgerTransactionId,
  LedgerTransactionValidationResult,
} from "../src/index.js";

function boundaries(
  transaction: LedgerTransaction,
  result: LedgerTransactionValidationResult,
): void {
  // @ts-expect-error Unchecked strings cannot acquire validated transaction identity.
  const unchecked: LedgerTransactionId = "txn_unchecked";
  // @ts-expect-error Account identities are a different domain.
  const accountId: AccountId = transaction.id;
  // @ts-expect-error Ledger namespace and transaction identity differ.
  const ledgerId: LedgerId = transaction.id;
  // @ts-expect-error A candidate is not a validated header.
  const uncheckedHeader: LedgerTransaction = {} as LedgerTransactionCandidate;
  // @ts-expect-error Validated headers are readonly.
  transaction.status = "posted";
  // @ts-expect-error Nested source metadata is readonly.
  transaction.provenance.source.id = "changed";
  // @ts-expect-error Nested evidence arrays are readonly.
  transaction.provenance.evidence.push({ receiptId: "x", contentHash: "y" });
  const reversal: LedgerTransactionCandidate = {
    ...transaction,
    // @ts-expect-error Reversal lifecycle requires later reviewed work.
    status: "reversed",
  };
  if (!result.ok) {
    // @ts-expect-error Failure exposes no partially validated transaction.
    void result.value;
  }
  void [unchecked, accountId, ledgerId, uncheckedHeader, reversal];
}

it("keeps candidate, validated identities and immutable results distinct", () => {
  expectTypeOf<LedgerTransactionId>().not.toEqualTypeOf<string>();
  expectTypeOf<LedgerTransactionId>().not.toEqualTypeOf<LedgerId>();
  expectTypeOf(boundaries).toBeFunction();
});
