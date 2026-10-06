import type {
  AccountCandidate,
  AccountCurrency,
  LedgerJournalCandidate,
} from "../src/index.js";
import {
  ACCOUNT_CONTRACT_VERSION,
  LEDGER_TRANSACTION_CONTRACT_VERSION,
  LEDGER_ENTRY_CONTRACT_VERSION,
  LEDGER_JOURNAL_CONTRACT_VERSION,
} from "../src/index.js";
export const syntheticId = (n: number): string => String(n).padStart(26, "0");
export function storageAccounts(): AccountCandidate[] {
  return (["USD", "EUR", "GBP"] as const).map((currency, i) => ({
    contractVersion: ACCOUNT_CONTRACT_VERSION,
    id: `acct_${syntheticId(i + 1)}`,
    ledgerId: `ldg_${syntheticId(1)}`,
    name: `Synthetic ${currency}`,
    category: "asset",
    normalBalance: "debit",
    currency,
    owner: { namespace: "synthetic.owner", id: "owner-1" },
    status: "active",
  }));
}
export function storageJournal(
  n = 1,
  amounts: readonly string[] = ["1250"],
  currencies: readonly AccountCurrency[] = ["USD"],
): LedgerJournalCandidate {
  let line = n * 100;
  return {
    contractVersion: LEDGER_JOURNAL_CONTRACT_VERSION,
    transaction: {
      contractVersion: LEDGER_TRANSACTION_CONTRACT_VERSION,
      id: `txn_${syntheticId(n)}`,
      ledgerId: `ldg_${syntheticId(1)}`,
      status: "pending",
      effectiveAt: "2026-10-02T10:00:00.000Z",
      recordedAt: "2026-10-02T10:01:00.000Z",
      idempotencyKey: "synthetic.same-key",
      provenance: {
        source: { namespace: "synthetic.provider", id: "capture-1" },
        moneyEventIds: [],
        evidence: [
          {
            receiptId: `rcpt_${syntheticId(1)}`,
            contentHash: `sha256:${"a".repeat(64)}`,
          },
        ],
      },
    },
    entries: currencies.flatMap((currency) =>
      amounts.flatMap((minorUnits) =>
        (["debit", "credit"] as const).map((side) => ({
          contractVersion: LEDGER_ENTRY_CONTRACT_VERSION,
          id: `ent_${syntheticId(++line)}`,
          transactionId: `txn_${syntheticId(n)}`,
          ledgerId: `ldg_${syntheticId(1)}`,
          accountId: `acct_${syntheticId(["USD", "EUR", "GBP"].indexOf(currency) + 1)}`,
          side,
          amount: {
            representation: "integer_minor_units" as const,
            minorUnits,
            currency,
          },
        })),
      ),
    ),
  };
}
