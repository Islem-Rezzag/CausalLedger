import Fastify, { type FastifyInstance } from "fastify";

const infrastructureReadyResponse = {
  service: "api",
  status: "ready",
  scope: "infrastructure",
  productImplementation: "not-started",
} as const;

export type InfrastructureReadyResponse = typeof infrastructureReadyResponse;

export function buildApiApp(): FastifyInstance {
  const app = Fastify({
    logger: false,
  });

  app.get(
    "/infra/ready",
    async (): Promise<InfrastructureReadyResponse> =>
      infrastructureReadyResponse,
  );

  return app;
}
