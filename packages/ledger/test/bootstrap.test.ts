import { describe, expect, it } from "vitest";

import { packageScaffold } from "../src/index.js";

describe("@causalledger/ledger scaffold", () => {
  it("exposes scaffold metadata only", () => {
    expect(packageScaffold).toEqual({
      packageName: "@causalledger/ledger",
      status: "scaffold-only",
      productBehaviorImplemented: false,
    });
  });
});
