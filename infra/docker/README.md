# Docker Infra

The M02.06 local Docker baseline is defined in the root `docker-compose.yml`.

It currently contains one local-only Postgres service for development repeatability. It does not define production deployment, cloud infrastructure, Redis, queues, schedulers, external connectors, or product services.

Postgres binds to `127.0.0.1` by default. The default password is a public local-development placeholder only; do not reuse it outside local development. The service does not set a fixed `container_name`, so Compose can namespace containers per checkout.

Use the root scripts:

```powershell
pnpm infra:up
pnpm infra:down
pnpm infra:reset
```
