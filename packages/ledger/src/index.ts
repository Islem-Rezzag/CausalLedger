export {
  ACCOUNT_CONTRACT_VERSION,
  ACCOUNT_CATEGORIES,
  ACCOUNT_CURRENCIES,
  ACCOUNT_STATUSES,
  ACCOUNT_NORMAL_BALANCES,
  validateAccountCandidate,
  validateAccountCatalog,
} from "./account.js";
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
  status: "account-schema-boundary",
  accountSchemaImplemented: true,
  deterministicAccountValidationImplemented: true,
  transactionSchemaImplemented: false,
  entrySchemaImplemented: false,
  postingImplemented: false,
  balanceQueriesImplemented: false,
  storageImplemented: false,
  agentWriteAuthority: false,
  financialTruthEstablishedByValidation: false,
} as const);
