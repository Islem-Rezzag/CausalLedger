import { describe, expect, it } from "vitest";

import { packageScaffold } from "../src/index.js";

describe("@causalledger/core scaffold", () => {
  it("exposes scaffold metadata only", () => {
    expect(packageScaffold).toEqual({
      packageName: "@causalledger/core",
      status: "scaffold-only",
      productBehaviorImplemented: false,
    });
  });
});
