import { describe, expect, it } from "vitest";

import { createWorkerBootstrap } from "../src/index.js";

describe("worker bootstrap", () => {
  it("creates a non-domain worker bootstrap without registered jobs", () => {
    const worker = createWorkerBootstrap();

    expect(worker.app).toBe("worker");
    expect(worker.jobs).toHaveLength(0);
  });
});
