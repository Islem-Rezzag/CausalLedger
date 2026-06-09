import Fastify, { type FastifyInstance } from "fastify";

export function buildApiApp(): FastifyInstance {
  return Fastify({
    logger: false,
  });
}
