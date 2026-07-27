# Open Questions

- Should a later version replace or complement the dependency-free M03.04 validator with a runtime schema framework, and what migration/versioning proof would justify that dependency?
- What error taxonomy, structured logging fields, and observability IDs should future runtime work standardize on?
- What auth/authz design assumptions should API and agent-runtime skeletons preserve for future M18 hardening?
- Which provider simulators should be prioritized first?
- What evidence retention guarantees should be enforced in v1?
- What is the first benchmark scenario set for MoneyFlowBench?
- Which MoneyFlowBench or duplicate-webhook demo scenario should provide the first public ablation table for v1.0.0?

## Answered in M02

- M02 standardized on TypeScript, Node.js, React/Vite, pnpm workspaces, and Turborepo.
- M02 established the app and package layout for the development foundation.
- M02.05 established the initial validation-only CI baseline without claiming deployment, release, or production maturity.

## Answered in M03.04

- The first source-neutral candidate uses ordinary JSON-safe values, including a canonical base-10 integer string for minor units, and successful normalization converts money exactly to branded `bigint`.
- M03.04 uses a strict dependency-free validator with stable issues; it does not claim full JSON parsing or source-specific mapping.
- Negative amount signs are preserved without accounting interpretation, and three-letter uppercase currency validation does not claim authoritative ISO 4217 registry membership.
