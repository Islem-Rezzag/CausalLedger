export {
  ACCOUNT_CONTRACT_VERSION,
  ACCOUNT_CATEGORIES,
  ACCOUNT_CURRENCIES,
  ACCOUNT_STATUSES,
  ACCOUNT_NORMAL_BALANCES,
  validateAccountCandidate,
  validateAccountCatalog,
} from "./account.js";

export {
  LEDGER_TRANSACTION_CONTRACT_VERSION,
  LEDGER_TRANSACTION_STATUSES,
  validateLedgerTransactionCandidate,
} from "./ledger-transaction.js";
export type {
  LedgerTransaction,
  LedgerTransactionCandidate,
  LedgerTransactionId,
  LedgerTransactionStatus,
  LedgerTransactionSourceReference,
  LedgerTransactionEvidenceReference,
  LedgerTransactionProvenance,
  LedgerTransactionIssueCode,
  LedgerTransactionValidationIssue,
  LedgerTransactionValidationResult,
} from "./ledger-transaction.js";
export type {
  Account,
  AccountCandidate,
  AccountCategory,
  AccountCurrency,
  AccountStatus,
  AccountId,
  LedgerId,
  AccountOwnerReference,
  AccountIssueCode,
  AccountValidationIssue,
  AccountValidationResult,
  AccountCatalogValidationResult,
} from "./account.js";

export {
  LEDGER_ENTRY_CONTRACT_VERSION,
  LEDGER_ENTRY_SIDES,
  LEDGER_ENTRY_MAX_MINOR_UNITS,
  validateLedgerEntryCandidate,
} from "./ledger-entry.js";
export type {
  LedgerEntry,
  LedgerEntryCandidate,
  LedgerEntryContextCandidate,
  LedgerEntryId,
  LedgerEntryMinorUnits,
  LedgerEntrySide,
  LedgerEntryWireAmount,
  LedgerEntryAmount,
  LedgerEntryIssueCode,
  LedgerEntryValidationIssue,
  LedgerEntryValidationResult,
} from "./ledger-entry.js";

export {
  LEDGER_JOURNAL_CONTRACT_VERSION,
  validateLedgerJournalCandidate,
} from "./ledger-journal.js";
export type {
  LedgerJournal,
  LedgerJournalCandidate,
  LedgerJournalAccountCatalogCandidate,
  LedgerJournalMinorUnits,
  LedgerJournalCurrencyTotals,
  LedgerJournalIssueCode,
  LedgerJournalValidationIssue,
  LedgerJournalValidationResult,
} from "./ledger-journal.js";

export {
  LEDGER_STORAGE_CONTRACT_VERSION,
  LedgerJournalStorageError,
  createLedgerJournalStore,
} from "./ledger-storage.js";
export type {
  LedgerJournalStore,
  LedgerJournalStorageReceipt,
  LedgerJournalStorageResult,
} from "./ledger-storage.js";

export {
  LEDGER_ACCOUNT_BALANCE_CONTRACT_VERSION,
  LedgerAccountBalanceReadError,
  validateLedgerAccountBalanceQueryCandidate,
  createLedgerAccountBalanceReader,
} from "./ledger-account-balance.js";
export type {
  LedgerAccountBalanceQueryCandidate,
  LedgerAccountBalanceQuery,
  LedgerAccountBalanceMinorUnits,
  LedgerAccountBalance,
  LedgerAccountBalanceIssueCode,
  LedgerAccountBalanceIssue,
  LedgerAccountBalanceQueryValidationResult,
  LedgerAccountBalanceResult,
  LedgerAccountBalanceReader,
} from "./ledger-account-balance.js";

export {
  LEDGER_TRANSACTION_QUERY_CONTRACT_VERSION,
  LedgerTransactionReadError,
  validateLedgerTransactionQueryCandidate,
  createLedgerTransactionReader,
} from "./ledger-transaction-query.js";
export type {
  LedgerTransactionQueryPage,
  LedgerTransactionQuerySelection,
  LedgerTransactionQueryCandidate,
  LedgerTransactionQuery,
  LedgerTransactionQueryIssueCode,
  LedgerTransactionQueryIssue,
  LedgerTransactionQueryValidationResult,
  LedgerTransactionQueryRecord,
  LedgerTransactionQueryOutput,
  LedgerTransactionQueryResult,
  LedgerTransactionReader,
} from "./ledger-transaction-query.js";

export {
  LEDGER_IDEMPOTENCY_CONTRACT_VERSION,
  IdempotentLedgerJournalStorageError,
  validateLedgerIdempotencyCandidate,
  createIdempotentLedgerJournalStore,
} from "./ledger-idempotency.js";
export type {
  LedgerIdempotencyIdentity,
  LedgerIdempotencyValidationResult,
  IdempotentLedgerJournalReceipt,
  IdempotentLedgerJournalResult,
  IdempotentLedgerJournalStore,
} from "./ledger-idempotency.js";

export {
  LEDGER_REVERSAL_CONTRACT_VERSION,
  LedgerReversalStorageError,
  validateLedgerReversalCandidate,
  createLedgerReversalStore,
} from "./ledger-reversal.js";
export type {
  LedgerReversalCandidate,
  LedgerReversalIdentity,
  LedgerReversalValidationResult,
  LedgerReversalReceipt,
  LedgerReversalResult,
  LedgerReversalStore,
} from "./ledger-reversal.js";

export {
  CASH_CLEARING_ACCOUNT_CONTRACT_VERSION,
  validateCashClearingAccountCandidate,
  validateCashClearingJournalCandidate,
} from "./cash-clearing-account.js";
export type {
  CashClearingAccountCandidate,
  CashClearingAccount,
  CashClearingAccountIssue,
  CashClearingAccountValidationResult,
} from "./cash-clearing-account.js";
export {
  PROVIDER_CLEARING_ACCOUNT_CONTRACT_VERSION,
  validateProviderClearingAccountCandidate,
  validateProviderClearingJournalCandidate,
} from "./provider-clearing-account.js";
export type {
  ProviderClearingReference,
  ProviderClearingJournalContextCandidate,
  ProviderClearingAccountCandidate,
  ProviderClearingAccount,
  ProviderClearingAccountIssue,
  ProviderClearingAccountValidationResult,
} from "./provider-clearing-account.js";
export const ledgerPackageBoundary = Object.freeze({
  packageName: "@causalledger/ledger",
  status: "ledger-schema-boundary",
  accountSchemaImplemented: true,
  deterministicAccountValidationImplemented: true,
  transactionSchemaImplemented: true,
  deterministicTransactionValidationImplemented: true,
  entrySchemaImplemented: true,
  deterministicEntryValidationImplemented: true,
  deterministicJournalValidationImplemented: true,
  postingImplemented: false,
  balanceQueriesImplemented: true,
  transactionQueriesImplemented: true,
  storageImplemented: true,
  idempotencyImplemented: true,
  reversalsImplemented: true,
  cashClearingConfigurationImplemented: true,
  providerClearingConfigurationImplemented: true,
  agentWriteAuthority: false,
  financialTruthEstablishedByValidation: false,
} as const);
