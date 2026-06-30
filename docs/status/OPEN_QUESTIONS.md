# Open Questions

- What runtime schema format should validate MoneyEvent JSON after the M03.02 TypeScript boundary?
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
