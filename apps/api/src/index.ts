import { buildApiApp } from "./app.js";

const DEFAULT_PORT = 3000;
const DEFAULT_HOST = "127.0.0.1";

function readPort(value: string | undefined): number {
  if (!value) {
    return DEFAULT_PORT;
  }

  const parsed = Number.parseInt(value, 10);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new Error("PORT must be a positive integer");
  }

  return parsed;
}

const app = buildApiApp();

try {
  await app.listen({
    host: process.env.HOST ?? DEFAULT_HOST,
    port: readPort(process.env.PORT),
  });
} catch (error) {
  app.log.error(error);
  process.exitCode = 1;
}
