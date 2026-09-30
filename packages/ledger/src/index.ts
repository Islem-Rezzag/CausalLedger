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

export const ledgerPackageBoundary = Object.freeze({
  packageName: "@causalledger/ledger",
  status: "ledger-schema-boundary",
  accountSchemaImplemented: true,
  deterministicAccountValidationImplemented: true,
  transactionSchemaImplemented: true,
  deterministicTransactionValidationImplemented: true,
  entrySchemaImplemented: false,
  postingImplemented: false,
  balanceQueriesImplemented: false,
  storageImplemented: false,
  agentWriteAuthority: false,
  financialTruthEstablishedByValidation: false,
} as const);
