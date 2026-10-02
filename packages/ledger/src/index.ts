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
  balanceQueriesImplemented: false,
  storageImplemented: false,
  agentWriteAuthority: false,
  financialTruthEstablishedByValidation: false,
} as const);
