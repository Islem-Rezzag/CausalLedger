import { describe, expect, it } from "vitest";

import { eventsPackageBoundary } from "../src/index.js";

describe("@causalledger/events package boundary", () => {
  it("truthfully exposes the scoped source-neutral runtime boundary", () => {
    expect(eventsPackageBoundary).toEqual({
      packageName: "@causalledger/events",
      status: "source-neutral-runtime-boundary",
      typeBoundaryImplemented: true,
      deterministicValidationImplemented: true,
      deterministicNormalizationImplemented: true,
      productBehaviorImplemented: true,
      runtimeSchemaImplemented: false,
      parserImplemented: false,
      sourceSpecificParserImplemented: false,
      ingestionImplemented: false,
      storageImplemented: false,
      databaseImplemented: false,
      apiImplemented: false,
      ledgerBehaviorImplemented: false,
      financialTruthEstablishedByMetadata: false,
    });
  });
});
