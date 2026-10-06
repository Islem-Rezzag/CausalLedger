import { expect, it } from "vitest";
import type {
  IdempotentLedgerJournalStore,
  LedgerIdempotencyIdentity,
  IdempotentLedgerJournalReceipt,
} from "../src/index.js";
it("idempotent contracts provide no posting, approval or raw SQL authority", () => {
  const check = (
    store: IdempotentLedgerJournalStore,
    value: LedgerIdempotencyIdentity,
    receipt: IdempotentLedgerJournalReceipt,
  ) => {
    // @ts-expect-error no investigator posting authority
    store.post();
    // @ts-expect-error no approval method
    store.approveRepair();
    // @ts-expect-error no raw SQL escape
    store.query("DELETE");
    // @ts-expect-error immutable key scope
    value.scope.key = "changed";
    // @ts-expect-error immutable original outcome
    receipt.transactionId = "txn_changed";
  };
  expect(typeof check).toBe("function");
});
