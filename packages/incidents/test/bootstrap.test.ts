import { describe, expect, it } from "vitest";

import { packageScaffold } from "../src/index.js";

describe("@causalledger/incidents scaffold", () => {
  it("exposes scaffold metadata only", () => {
    expect(packageScaffold).toEqual({
      packageName: "@causalledger/incidents",
      status: "scaffold-only",
      productBehaviorImplemented: false,
    });
  });
});
