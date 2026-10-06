import type {
  AccountCandidate,
  AccountCategory,
  AccountCurrency,
  LedgerJournalCandidate,
  LedgerAccountBalanceQueryCandidate,
} from "../src/index.js";
import { LEDGER_ACCOUNT_BALANCE_CONTRACT_VERSION } from "../src/index.js";
import {
  storageAccounts,
  storageJournal,
  syntheticId,
} from "./storage-synthetic.js";

export function balanceAccounts(
  namespace = 1_000_000,
  category: AccountCategory = "asset",
  currency: AccountCurrency = "USD",
): [AccountCandidate, AccountCandidate] {
  const first = storageAccounts()[0];
  if (!first) throw new Error("Missing synthetic account");
  const account: AccountCandidate = {
    ...first,
    ledgerId: `ldg_${syntheticId(namespace)}`,
    id: `acct_${syntheticId(namespace * 10)}`,
    ...(category === "asset" || category === "expense"
      ? { category, normalBalance: "debit" as const }
      : { category, normalBalance: "credit" as const }),
    currency,
    name: "Synthetic balance account",
  };
  return [
    account,
    {
      ...account,
      id: `acct_${syntheticId(namespace * 10 + 1)}`,
      name: "Synthetic counter account",
    },
  ];
}
export function balanceQuery(
  account = balanceAccounts()[0],
): LedgerAccountBalanceQueryCandidate {
  return {
    contractVersion: LEDGER_ACCOUNT_BALANCE_CONTRACT_VERSION,
    account,
    signConvention: "account_normal_positive",
    cutoffs: {
      effectiveThrough: "9999-12-31T23:59:59.999Z",
      recordedThrough: "9999-12-31T23:59:59.999Z",
    },
  };
}
export function balanceJournal(
  transactionNumber: number,
  accounts: readonly [AccountCandidate, AccountCandidate],
  minorUnits = "1250",
  targetSide: "debit" | "credit" = "debit",
): LedgerJournalCandidate {
  const journal = storageJournal(
    transactionNumber,
    [minorUnits],
    [accounts[0].currency],
  );
  return {
    ...journal,
    transaction: { ...journal.transaction, ledgerId: accounts[0].ledgerId },
    entries: journal.entries.map((entry) => ({
      ...entry,
      ledgerId: accounts[0].ledgerId,
      accountId: entry.side === targetSide ? accounts[0].id : accounts[1].id,
    })),
  };
}
