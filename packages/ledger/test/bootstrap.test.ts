import { describe, expect, it } from "vitest";

import * as ledger from "../src/index.js";

describe("@causalledger/ledger account boundary", () => {
  it("exposes only the account validation runtime boundary", () => {
    expect(ledger.ledgerPackageBoundary).toEqual({
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
    });
    expect(Object.keys(ledger).sort()).toEqual([
      "ACCOUNT_CATEGORIES",
      "ACCOUNT_CONTRACT_VERSION",
      "ACCOUNT_CURRENCIES",
      "ACCOUNT_NORMAL_BALANCES",
      "ACCOUNT_STATUSES",
      "ledgerPackageBoundary",
      "validateAccountCandidate",
      "validateAccountCatalog",
    ]);
  });
});
