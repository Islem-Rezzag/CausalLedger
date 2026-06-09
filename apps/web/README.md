# Web App

`apps/web` is the future browser app boundary for CausalLedger.

M02.03 creates only a minimal React/Vite application foundation:

- a Vite HTML entrypoint;
- a React bootstrap component;
- a browser render entrypoint;
- non-domain bootstrap validation;
- package scripts for local development, build, test, lint, format checking, and type checking.

No CausalLedger product or domain behavior is implemented here. There is no dashboard, MoneyEvent UI, ledger UI, incident UI, evidence UI, repair UI, API call, routing, auth/authz, database behavior, external connector, chart, or health-check behavior.
