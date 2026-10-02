import { expectTypeOf, it } from "vitest";
import type {
  LedgerJournalStore,
  LedgerJournalStorageReceipt,
  LedgerJournalStorageResult,
  LedgerTransactionId,
} from "../src/index.js";
function boundaries(
  store: LedgerJournalStore,
  receipt: LedgerJournalStorageReceipt,
  result: LedgerJournalStorageResult,
): void {
  // @ts-expect-error Storage needs an explicit supplied account catalog.
  void store.append({});
  // @ts-expect-error Receipt is readonly.
  receipt.entryCount = 1;
  const id: LedgerTransactionId = receipt.transactionId;
  if (!result.ok) {
    // @ts-expect-error Validation refusal has no storage receipt or partial result.
    void result.receipt;
  }
  // @ts-expect-error General lookup belongs to M04.07.
  void store.queryTransaction(id);
  // @ts-expect-error Retry reservation belongs to M04.08.
  void store.reserveIdempotencyKey(id);
  void id;
}
it("keeps explicit input, readonly receipts and later APIs distinct", () => {
  expectTypeOf(boundaries).toBeFunction();
});
