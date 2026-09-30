import { describe, expect, it } from "vitest";

import * as ledger from "../src/index.js";

describe("@causalledger/ledger schema boundary", () => {
  it("exposes only account and transaction metadata validation", () => {
    expect(ledger.ledgerPackageBoundary).toEqual({
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
    });
    expect(Object.keys(ledger).sort()).toEqual([
      "ACCOUNT_CATEGORIES",
      "ACCOUNT_CONTRACT_VERSION",
      "ACCOUNT_CURRENCIES",
      "ACCOUNT_NORMAL_BALANCES",
      "ACCOUNT_STATUSES",
      "LEDGER_TRANSACTION_CONTRACT_VERSION",
      "LEDGER_TRANSACTION_STATUSES",
      "ledgerPackageBoundary",
      "validateAccountCandidate",
      "validateAccountCatalog",
      "validateLedgerTransactionCandidate",
    ]);
  });
});
