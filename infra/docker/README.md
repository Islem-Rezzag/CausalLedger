# Docker Infra

The M02.06 local Docker baseline is defined in the root `docker-compose.yml`.

It currently contains one local-only Postgres service for development repeatability. It does not define production deployment, cloud infrastructure, Redis, queues, schedulers, external connectors, or product services.

Use the root scripts:

```powershell
pnpm infra:up
pnpm infra:down
pnpm infra:reset
```
