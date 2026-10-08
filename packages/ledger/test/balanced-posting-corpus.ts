import type {
  AccountCandidate,
  AccountCategory,
  AccountCurrency,
  LedgerJournalCandidate,
} from "../src/index.js";
import {
  CASH_CLEARING_ACCOUNT_CONTRACT_VERSION,
  PROVIDER_CLEARING_ACCOUNT_CONTRACT_VERSION,
  CUSTOMER_LIABILITY_ACCOUNT_CONTRACT_VERSION,
  FEE_EXPENSE_ACCOUNT_CONTRACT_VERSION,
  REVENUE_ACCOUNT_CONTRACT_VERSION,
  validateCashClearingJournalCandidate,
  validateProviderClearingJournalCandidate,
  validateCustomerLiabilityJournalCandidate,
  validateFeeExpenseJournalCandidate,
  validateRevenueJournalCandidate,
} from "../src/index.js";
import { balanceAccounts } from "./balance-synthetic.js";
import { storageJournal, syntheticId } from "./storage-synthetic.js";

// Test-only declarations and independent literal oracles; no public posting API.
export const CORPUS_VERSION = "m04.15-balanced-posting-corpus.v1" as const;
export const CORPUS_BASE = 11_000_000;
export const CATEGORIES = [
  "asset",
  "liability",
  "equity",
  "revenue",
  "expense",
] as const;
export const CURRENCIES = ["USD", "EUR", "GBP"] as const;
export const NORMAL_SIDE = {
  asset: "debit",
  liability: "credit",
  equity: "credit",
  revenue: "credit",
  expense: "debit",
} as const;
export const SHAPES = [
  { name: "single", amounts: ["1250"], total: "1250" },
  { name: "split", amounts: ["1000", "250"], total: "1250" },
  {
    name: "aggregate-over-int64",
    amounts: ["9223372036854775807", "9223372036854775807"],
    total: "18446744073709551614",
  },
  {
    name: "beyond-number-precision",
    amounts: ["9007199254740993", "7"],
    total: "9007199254741000",
  },
] as const;
export interface CorpusCase {
  readonly number: number;
  readonly label: string;
  readonly first: AccountCategory;
  readonly counter: AccountCategory;
  readonly currency: AccountCurrency;
  readonly status: "pending" | "posted";
  readonly shape: (typeof SHAPES)[number];
}
export const CORPUS: readonly CorpusCase[] = CATEGORIES.flatMap((first, f) =>
  CATEGORIES.flatMap((counter, c) =>
    CURRENCIES.flatMap((currency, u) =>
      (["pending", "posted"] as const).map((status, s) => {
        const number = ((f * 5 + c) * 3 + u) * 2 + s + 1;
        const shape = SHAPES[(number - 1) % SHAPES.length]!;
        return {
          number,
          label: `${first}/${counter}/${currency}/${status}/${shape.name}`,
          first,
          counter,
          currency,
          status,
          shape,
        };
      }),
    ),
  ),
);
export interface CorpusInput {
  readonly journal: LedgerJournalCandidate;
  readonly accounts: readonly AccountCandidate[];
}
export function materialize(caseData: CorpusCase): CorpusInput {
  const n = CORPUS_BASE + caseData.number;
  const pair = balanceAccounts(n, caseData.first, caseData.currency);
  pair[0] = { ...pair[0], name: "Corpus first 💰\ud800" };
  pair[1] = {
    ...pair[1],
    ...(caseData.counter === "asset" || caseData.counter === "expense"
      ? { category: caseData.counter, normalBalance: "debit" as const }
      : { category: caseData.counter, normalBalance: "credit" as const }),
    owner: { namespace: "synthetic.counter", id: "counter-A" },
  };
  const base = storageJournal(n, caseData.shape.amounts, [caseData.currency]);
  const journal: LedgerJournalCandidate = {
    ...base,
    transaction: {
      ...base.transaction,
      ledgerId: pair[0].ledgerId,
      status: caseData.status,
      idempotencyKey: `synthetic.corpus.${n}`,
      effectiveAt: "2026-10-08T12:00:00.000Z",
      recordedAt: "2026-10-08T12:01:00.000Z",
      provenance: {
        source: {
          namespace: "synthetic.balanced-posting",
          id: `case-${caseData.number}`,
        },
        moneyEventIds: [
          `evt_${syntheticId(n)}`,
          `evt_${syntheticId(n + 100_000)}`,
        ],
        evidence: [
          {
            receiptId: `rcpt_${syntheticId(n)}`,
            contentHash: `sha256:${"a".repeat(64)}`,
          },
          {
            receiptId: `rcpt_${syntheticId(n + 100_000)}`,
            contentHash: `sha256:${"b".repeat(64)}`,
          },
        ],
      },
    },
    entries: base.entries.map((entry) => ({
      ...entry,
      ledgerId: pair[0].ledgerId,
      accountId:
        entry.side === NORMAL_SIDE[caseData.first] ? pair[0].id : pair[1].id,
    })),
  };
  return { journal, accounts: pair };
}
export function permute(input: CorpusInput): CorpusInput {
  const { journal, accounts } = structuredClone(input);
  return {
    accounts: [...accounts].reverse(),
    journal: {
      ...journal,
      entries: [...journal.entries].reverse(),
      transaction: {
        ...journal.transaction,
        provenance: {
          ...journal.transaction.provenance,
          moneyEventIds: [
            ...journal.transaction.provenance.moneyEventIds,
          ].reverse(),
          evidence: [...journal.transaction.provenance.evidence].reverse(),
        },
      },
    },
  };
}
export const ROLES = [
  "cash",
  "provider",
  "customer",
  "fee",
  "revenue",
] as const;
export const ROLE_CASES = ROLES.flatMap((role, r) =>
  CURRENCIES.map((currency, u) => ({
    role,
    currency,
    number: 1001 + r * 3 + u,
    label: `${role}/${currency}`,
  })),
);
export function roleInput(row: (typeof ROLE_CASES)[number]): CorpusInput {
  const first =
    row.role === "customer"
      ? "liability"
      : row.role === "fee"
        ? "expense"
        : row.role === "revenue"
          ? "revenue"
          : "asset";
  return materialize({
    ...row,
    first,
    counter: "asset",
    status: "posted",
    shape: SHAPES[1],
  });
}
export function checkRole(
  row: (typeof ROLE_CASES)[number],
  input: CorpusInput,
) {
  const { journal, accounts } = input;
  const account = accounts[0]!;
  switch (row.role) {
    case "cash":
      return validateCashClearingJournalCandidate(
        journal,
        {
          contractVersion: CASH_CLEARING_ACCOUNT_CONTRACT_VERSION,
          role: "cash_clearing",
          account,
        },
        accounts,
      );
    case "provider": {
      const provider = { namespace: "synthetic.directory", id: "provider-A" };
      return validateProviderClearingJournalCandidate(
        journal,
        {
          contractVersion: PROVIDER_CLEARING_ACCOUNT_CONTRACT_VERSION,
          role: "provider_clearing",
          provider,
          account,
        },
        { provider, accounts },
      );
    }
    case "customer":
      return validateCustomerLiabilityJournalCandidate(
        journal,
        {
          contractVersion: CUSTOMER_LIABILITY_ACCOUNT_CONTRACT_VERSION,
          role: "customer_liability",
          account,
        },
        { owner: account.owner, accounts },
      );
    case "fee":
      return validateFeeExpenseJournalCandidate(
        journal,
        {
          contractVersion: FEE_EXPENSE_ACCOUNT_CONTRACT_VERSION,
          role: "fee_expense",
          account,
        },
        { source: journal.transaction.provenance.source, accounts },
      );
    case "revenue":
      return validateRevenueJournalCandidate(
        journal,
        {
          contractVersion: REVENUE_ACCOUNT_CONTRACT_VERSION,
          role: "revenue",
          account,
        },
        { source: journal.transaction.provenance.source, accounts },
      );
  }
}
export function multiCurrency(number = 2001): CorpusInput {
  const parts = CURRENCIES.map((currency, u) =>
    materialize({
      number: number + u,
      label: currency,
      first: CATEGORIES[u]!,
      counter: "revenue",
      currency,
      status: "posted",
      shape: SHAPES[1],
    }),
  );
  const first = parts[0]!;
  const ledgerId = first.accounts[0]!.ledgerId;
  const transactionId = first.journal.transaction.id;
  return {
    journal: {
      ...first.journal,
      entries: parts.flatMap((p) =>
        p.journal.entries.map((e) => ({ ...e, ledgerId, transactionId })),
      ),
    },
    accounts: parts.flatMap((p) => p.accounts.map((a) => ({ ...a, ledgerId }))),
  };
}
