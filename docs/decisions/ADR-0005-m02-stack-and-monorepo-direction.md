# ADR-0005: M02 Stack and Monorepo Direction

## Status

Accepted for M02.01.

Legacy validation marker retained from the original M02 planning placeholder: Planning placeholder.

## Context

M02.01 chooses the backend stack, frontend stack, package manager, monorepo task runner, formatting and linting direction, test framework direction, and future schema-validation direction before any app or package runtime is created.

M02 must choose the backend stack without creating `apps/api`, `apps/web`, product API behavior, database behavior, MoneyEvent runtime behavior, dependency manifests, or lockfiles in this submilestone.

## Decision

CausalLedger will use a TypeScript-first monorepo direction for M02 and later product implementation.

The selected stack direction is:

- Backend: Node.js with Fastify for the future `apps/api` runtime.
- Frontend: React with Vite for the future `apps/web` runtime.
- Package manager: pnpm workspaces.
- Monorepo task runner: Turborepo.
- Shared packages: TypeScript packages under `packages/` for deterministic truth, evidence, replay, repair, graph, incident, connector, eval, and agent boundaries.
- Formatting and linting: ESLint with TypeScript-aware rules plus Prettier.
- Test framework: Vitest for package-level unit tests and future app-level tests where appropriate.
- Type and schema direction: TypeScript types plus Zod or an equivalent runtime schema validator for future MoneyEvent contracts, with later JSON Schema/OpenAPI interop where API contracts need it.

This ADR documents direction only. It does not install dependencies, create `package.json`, create `pnpm-lock.yaml`, scaffold apps, define runtime schemas, or implement product behavior.

## Rationale

TypeScript keeps API, web, shared packages, and future agent tool contracts in one language while still allowing deterministic financial correctness to live in explicit packages rather than LLM output.

Fastify is the initial backend direction because it is small, explicit, schema-friendly, and suitable for a safety-sensitive API where request validation, idempotency, and audit-oriented boundaries need to stay visible. NestJS remains a future option if later milestones need heavier dependency injection or module conventions, but it is not selected for the initial M02 direction.

React with Vite is the initial frontend direction because CausalLedger's future command center can remain a client app backed by the API. It avoids adding a second server framework before the product needs server rendering. Next.js remains deferred unless later milestones need SSR, file-based server routing, or deployment-specific behavior that justifies the extra boundary.

pnpm workspaces and Turborepo fit the planned package layout because they support explicit workspace boundaries, reproducible local commands, and incremental validation without implying product runtime behavior.

Zod or an equivalent schema validator fits future MoneyEvent contract work because CausalLedger needs runtime validation, provenance fields, idempotency fields, and deterministic parse failures. The schema layer must support financial correctness checks but must not delegate truth to LLM judgment.

## Alternatives Considered

- NestJS instead of Fastify: deferred because the initial API should keep framework surface area low and validation boundaries explicit.
- Next.js instead of Vite React: deferred because the planned web app currently needs a command surface, not SSR or full-stack routing.
- npm or Yarn instead of pnpm: not selected because pnpm workspaces provide stricter dependency boundaries and efficient monorepo installs.
- Nx instead of Turborepo: not selected for the initial direction because Turborepo is enough for the expected package/app task graph and keeps M02 simpler.

## Scope Boundary

- Do not implement product code in this ADR.
- Do not create runtime APIs, databases, CI workflows, auth/authz, logging, deployment, or product behavior.
- Do not create app or package runtime scaffolding in M02.01.
- Do not install dependencies or create lockfiles in M02.01.
- Preserve package boundaries for future MoneyEvent, ledger, invariants, incidents, graph, replay, repair, evidence, connector, eval, and agent-runtime work.
- Keep LLM output advisory and separate from deterministic truth.

## Deferred Work

- `apps/api` runtime creation is deferred to M02.02.
- `apps/web` runtime creation is deferred to M02.03.
- `apps/worker` was created in M02.04 as a minimal non-domain scaffold.
- `apps/agent-runtime` is deferred to the M10 era because agent runtime should not exist before deterministic evidence, MoneyEvent, invariant, incident, graph, replay, and repair boundaries exist.
- Package creation under `packages/` is deferred to redefined M02.05.
- ESLint and CI baseline are deferred to redefined M02.05.
- Postgres, Docker Compose, migrations, and health-check stubs are deferred to redefined M02.06.
- Redis is deferred until needed because no queue or scheduler should be added before the worker or orchestration design proves the need.
- MoneyEvent contracts and runtime validation behavior are deferred to M03.
- Ledger, invariants, incidents, graph, replay, repair, human review, observability, security hardening, deployment, and production polish remain future milestones.

## Next Step

Proceed to `M02.01 QA - Choose Backend and Frontend Stack` after builder validation and PR creation. Do not start M02.02 until M02.01 QA passes, the M02.01 PR merges into `main`, and tracking is finalized.
