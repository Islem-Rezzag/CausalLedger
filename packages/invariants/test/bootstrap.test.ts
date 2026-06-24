import { describe, expect, it } from "vitest";

import { packageScaffold } from "../src/index.js";

describe("@causalledger/invariants scaffold", () => {
  it("exposes scaffold metadata only", () => {
    expect(packageScaffold).toEqual({
      packageName: "@causalledger/invariants",
      status: "scaffold-only",
      productBehaviorImplemented: false,
    });
  });
});
