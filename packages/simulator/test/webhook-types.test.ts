import { expect, it } from "vitest";
import { simulatorPackageBoundary } from "../src/index.js";
import type {
  DuplicateWebhookRequest,
  MissingWebhookScenario,
} from "../src/index.js";
function boundaries(
  request: DuplicateWebhookRequest,
  scenario: MissingWebhookScenario,
) {
  // @ts-expect-error input metadata is readonly
  request.delivery.deliveryOrder = 2;
  // @ts-expect-error synthetic flag cannot declare real evidence
  const real: DuplicateWebhookRequest = { ...request, synthetic: false };
  // @ts-expect-error result cannot mutate source evidence
  scenario.manifest.sourceRecords.push(scenario.manifest.sourceRecords[0]!);
  void real;
}
it("exports readonly synthetic scenario contracts", () => {
  void boundaries;
  expect(simulatorPackageBoundary.duplicateWebhookGenerationImplemented).toBe(
    true,
  );
  expect(simulatorPackageBoundary.delayedWebhookGenerationImplemented).toBe(
    true,
  );
  expect(simulatorPackageBoundary.missingWebhookGenerationImplemented).toBe(
    true,
  );
  expect(simulatorPackageBoundary.ledgerWritesImplemented).toBe(false);
});
