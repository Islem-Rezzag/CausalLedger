import { expect, it } from "vitest";
import type {
  LedgerTransactionQuerySelection,
  LedgerTransactionQueryOutput,
  LedgerTransactionReader,
} from "../src/index.js";
function boundaries(
  value: LedgerTransactionQueryOutput,
  reader: LedgerTransactionReader,
): void {
  // @ts-expect-error immutable selection
  value.query.ledgerId = "changed";
  // @ts-expect-error immutable result array
  value.transactions.push(value.transactions[0]);
  // @ts-expect-error money stays exact bigint
  const amount: number =
    value.transactions[0]?.journal.entries[0]?.amount.minorUnits;
  // @ts-expect-error no append authority
  reader.append({});
  // @ts-expect-error no SQL escape hatch
  reader.querySql("DELETE");
  const identity: LedgerTransactionQuerySelection = {
    kind: "transaction_id",
    transactionId: "txn",
    // @ts-expect-error identity has no page
    page: { size: 1, afterTransactionId: null },
  };
  // @ts-expect-error list page mandatory
  const source: LedgerTransactionQuerySelection = {
    kind: "source_reference",
    source: { namespace: "synthetic", id: "1" },
  };
  void amount;
  void identity;
  void source;
}
it("compile-time query contract forbids write/projection shortcuts", () => {
  expect(typeof boundaries).toBe("function");
});
