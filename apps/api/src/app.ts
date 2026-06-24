import Fastify, { type FastifyInstance } from "fastify";

const infrastructureReadyResponse = {
  service: "api",
  status: "process-ready",
  scope: "infrastructure",
  database: "not-checked",
  migrations: "not-checked",
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
