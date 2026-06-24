import { describe, expect, it } from "vitest";

import { packageScaffold } from "../src/index.js";

describe("@causalledger/events scaffold", () => {
  it("exposes scaffold metadata only", () => {
    expect(packageScaffold).toEqual({
      packageName: "@causalledger/events",
      status: "scaffold-only",
      productBehaviorImplemented: false,
    });
  });
});
