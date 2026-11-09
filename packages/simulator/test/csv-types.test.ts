import { expect, it } from "vitest";
import { simulatorPackageBoundary } from "../src/index.js";
import type {
  BankStatementCsvRequest,
  CsvReport,
  BankStatementCsvRow,
} from "../src/index.js";
function boundary(
  r: BankStatementCsvRequest,
  out: CsvReport<BankStatementCsvRow>,
) {
  const numeric: BankStatementCsvRow = {
    ...r.rows[0]!,
    // @ts-expect-error Amounts must retain exact string representation.
    amountMinorUnits: 1250,
  };
  // @ts-expect-error Rows cannot be appended by callers.
  out.rows.push(out.rows[0]!);
  // @ts-expect-error Raw output bytes cannot be edited.
  out.manifest.sourceRecords[0]!.payload.text = "changed";
  void numeric;
}
void boundary;
it("exports synthetic CSV capabilities without financial write authority", () => {
  expect(simulatorPackageBoundary.bankStatementCsvGenerationImplemented).toBe(
    true,
  );
  expect(simulatorPackageBoundary.settlementCsvGenerationImplemented).toBe(
    true,
  );
  expect(simulatorPackageBoundary.ledgerWritesImplemented).toBe(false);
});
