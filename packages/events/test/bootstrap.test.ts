import { describe, expect, it } from "vitest";

import { eventsPackageBoundary } from "../src/index.js";

describe("@causalledger/events package boundary", () => {
  it("exposes type-boundary metadata without runtime behavior", () => {
    expect(eventsPackageBoundary).toEqual({
      packageName: "@causalledger/events",
      status: "type-boundary-only",
      productBehaviorImplemented: false,
      runtimeSchemaImplemented: false,
      parserImplemented: false,
      validatorImplemented: false,
    });
  });
});
