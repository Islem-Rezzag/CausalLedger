import { expectTypeOf, it } from "vitest";
import { validateLedgerJournalCandidate } from "../src/index.js";
import type {
  LedgerEntryMinorUnits,
  LedgerJournal,
  LedgerJournalCandidate,
  LedgerJournalMinorUnits,
  LedgerJournalValidationResult,
} from "../src/index.js";
function boundaries(
  checked: LedgerJournal,
  wire: LedgerJournalCandidate,
  result: LedgerJournalValidationResult,
): void {
  // @ts-expect-error A wire group does not contain checked bigint entries/totals.
  const journal: LedgerJournal = wire;
  // @ts-expect-error Aggregates are not bounded individual line amounts.
  const line: LedgerEntryMinorUnits = checked.totals[0]!.debitMinorUnits;
  // @ts-expect-error Unchecked bigint is not a validated aggregate.
  const aggregate: LedgerJournalMinorUnits = 0n;
  // @ts-expect-error Money must remain bigint, not Number.
  const money: number = checked.totals[0]!.debitMinorUnits;
  // @ts-expect-error Supplied account catalog is mandatory.
  validateLedgerJournalCandidate(wire);
  // @ts-expect-error Validated journals and nested totals are readonly.
  checked.totals[0]!.debitMinorUnits = aggregate;
  // @ts-expect-error Canonical entries are readonly.
  checked.entries.push(checked.entries[0]!);
  if (!result.ok) {
    // @ts-expect-error Failed validation has no partial journal.
    void result.value;
  }
  void [journal, line, aggregate, money];
}
it("keeps unchecked wire, exact aggregate, per-line money and readonly boundaries distinct", () => {
  expectTypeOf<LedgerJournalMinorUnits>().not.toEqualTypeOf<LedgerEntryMinorUnits>();
  expectTypeOf<LedgerJournalMinorUnits>().not.toEqualTypeOf<number>();
  expectTypeOf(boundaries).toBeFunction();
});
