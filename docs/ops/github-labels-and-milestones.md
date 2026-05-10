# GitHub Labels and Milestones

## Purpose

GitHub labels and milestones help sort PRs and issues without replacing the repo's canonical tracking files. The registry, active plan, status docs, validation results, and handoff packets remain the durable source of project state.

This document is guidance only. Labels and milestones may require manual creation in the GitHub UI unless automation is added in a later authorized slice. This guidance does not add GitHub Actions, label automation, or CI workflows.

## Suggested Labels

| Label | Use |
| --- | --- |
| `type:builder` | Builder thread PRs or issues. |
| `type:qa` | QA review PRs or issues. |
| `type:docs` | Documentation-only changes. |
| `type:control-plane` | Repo operating system, planning, prompt, validation, status, or workflow changes. |
| `type:product` | Future product implementation changes. Do not use during M00 unless product work is explicitly scoped. |
| `type:eval` | Future benchmark, scenario, scoring, or eval work. |
| `type:security` | Security-sensitive work or review. |
| `status:blocked` | Work cannot safely continue without a concrete unblock. |
| `status:needs-qa` | Builder work is ready for QA. |
| `status:ready-to-merge` | QA PASS is recorded and the PR can merge when branch rules allow. |
| `scope:no-product-code` | Control-plane-only slices where product code must not change. |
| `risk:financial-correctness` | Work touches or may affect financial correctness boundaries. |
| `risk:agent-boundary` | Work touches or may affect agent authority, tool contracts, or LLM safety boundaries. |

Optional milestone labels may be useful for filtering:

- `milestone:M00`
- `milestone:M01`
- `milestone:M02`
- `milestone:M03`
- `milestone:M04`
- `milestone:M05`
- `milestone:M06`
- `milestone:M07`
- `milestone:M08`
- `milestone:M09`
- `milestone:M10`
- `milestone:M11`
- `milestone:M12`
- `milestone:M13`
- `milestone:M14`
- `milestone:M15`
- `milestone:M16`
- `milestone:M17`
- `milestone:M18`
- `milestone:M19`
- `milestone:M20`
- `milestone:M21`

Do not reference a label in an issue template unless the label has already been created in GitHub or label automation exists.

## Suggested GitHub Milestones

Create one GitHub milestone for each roadmap milestone when GitHub issue/PR grouping becomes useful:

| GitHub milestone | Roadmap milestone |
| --- | --- |
| `M00 Repo operating system` | Control-plane docs, workflow, planning, validation |
| `M01 Domain model and scope freeze` | Concepts, non-goals, glossary |
| `M02 Monorepo and local development` | Tooling, packages, local checks |
| `M03 Canonical MoneyEvent engine` | Event schemas and normalization |
| `M04 Double-entry ledger core` | Transactions, entries, balances |
| `M05 Provider and bank simulator` | Providers, banks, webhooks, failures |
| `M06 Invariant engine` | Deterministic correctness rules |
| `M07 Incident engine` | Severity, evidence, ownership |
| `M08 Causal graph` | Event and evidence relationships |
| `M09 Replay engine and digital twin` | Deterministic reconstruction |
| `M10 Agent tool contracts` | Read-only tools and deny-mutation contracts |
| `M11 Agentic investigator v1` | Advisory investigation workflows |
| `M12 Repair planner v1` | Repair proposals only |
| `M13 Human review workbench` | Human approval workflow |
| `M14 MoneyFlowBench v1` | Scenarios, scoring, evidence |
| `M15 UI command center` | Operational incident command surface |
| `M16 Sandbox and external connectors` | Safe sandbox integrations and importers |
| `M17 Observability, costs, and model routing` | Tracing, metrics, routing |
| `M18 Security hardening` | Trust boundaries and destructive-action protections |
| `M19 Production polish` | Release candidate readiness |
| `M20 Public launch` | Public docs, examples, launch materials |
| `M21 Company version` | Enterprise and commercial scope |

## Manual Setup Guidance

Until automation exists:

1. Create labels manually in the GitHub UI as needed.
2. Create milestones manually in the GitHub UI when PRs or issues need grouping.
3. Keep label names exact and lowercase where shown.
4. Prefer fewer labels over noisy classification.
5. Do not let labels or GitHub milestones override `docs/milestones/SUBMILESTONE_REGISTRY.md`.

## Traceability Expectations

Labels and milestones should make it easier to find work, but every meaningful status transition still needs repo-file evidence:

- registry row status and branch;
- active plan progress and validation record;
- PR body scope and checklist;
- issue link when one exists;
- status docs and weekly log;
- handoff packet.
