import { describe, expect, it } from "vitest";

import { buildApiApp } from "../src/app.js";

describe("API app bootstrap", () => {
  it("creates a Fastify app without registering product routes", async () => {
    const app = buildApiApp();

    try {
      await app.ready();

      expect(app.hasRoute({ method: "GET", url: "/" })).toBe(false);
    } finally {
      await app.close();
    }
  });
});
