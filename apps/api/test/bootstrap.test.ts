import { describe, expect, it } from "vitest";

import { buildApiApp } from "../src/app.js";

describe("API app bootstrap", () => {
  it("registers only the infrastructure readiness stub", async () => {
    const app = buildApiApp();

    try {
      await app.ready();

      expect(app.hasRoute({ method: "GET", url: "/" })).toBe(false);
      expect(app.hasRoute({ method: "GET", url: "/infra/ready" })).toBe(true);

      const response = await app.inject({
        method: "GET",
        url: "/infra/ready",
      });

      expect(response.statusCode).toBe(200);
      expect(response.json()).toEqual({
        service: "api",
        status: "ready",
        scope: "infrastructure",
        productImplementation: "not-started",
      });
    } finally {
      await app.close();
    }
  });
});
