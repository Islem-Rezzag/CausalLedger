import { describe, expect, it } from "vitest";

import * as ledger from "../src/index.js";

describe("@causalledger/ledger schema boundary", () => {
  it("exposes schema, journal arithmetic and isolated storage without posting", () => {
    expect(ledger.ledgerPackageBoundary).toEqual({
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
      storageImplemented: true,
      agentWriteAuthority: false,
      financialTruthEstablishedByValidation: false,
    });
    expect(Object.keys(ledger).sort()).toEqual([
      "ACCOUNT_CATEGORIES",
      "ACCOUNT_CONTRACT_VERSION",
      "ACCOUNT_CURRENCIES",
      "ACCOUNT_NORMAL_BALANCES",
      "ACCOUNT_STATUSES",
      "LEDGER_ENTRY_CONTRACT_VERSION",
      "LEDGER_ENTRY_MAX_MINOR_UNITS",
      "LEDGER_ENTRY_SIDES",
      "LEDGER_JOURNAL_CONTRACT_VERSION",
      "LEDGER_STORAGE_CONTRACT_VERSION",
      "LEDGER_TRANSACTION_CONTRACT_VERSION",
      "LEDGER_TRANSACTION_STATUSES",
      "LedgerJournalStorageError",
      "createLedgerJournalStore",
      "ledgerPackageBoundary",
      "validateAccountCandidate",
      "validateAccountCatalog",
      "validateLedgerEntryCandidate",
      "validateLedgerJournalCandidate",
      "validateLedgerTransactionCandidate",
    ]);
  });
});
