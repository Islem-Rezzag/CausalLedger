# Local Environment Readiness

## Audit scope

This 2026-08-18 audit inspected the actual local Windows checkout without installing system software, printing secret values, making live-model requests, starting production providers, or mutating product, ledger, evidence, repair, or money state.

Repository root: `C:/Users/moham/Desktop/CausalLedger`

Audited synchronized commit: `9c2df34fd1da1a4f893a5b16cb05fa1177f23cce`

## Tool inventory

| Area | Detected | Verdict |
| --- | --- | --- |
| Operating system | Microsoft Windows 11 Home `10.0.26200`, AMD64 | Ready |
| Shell | Windows PowerShell `5.1.26100.8875` | Ready |
| Git | `2.49.0.windows.1` | Ready |
| Node.js | `22.16.0`; repository CI uses Node 22 | Ready |
| Corepack | `0.32.0` | Ready |
| pnpm | `10.32.1`; matches `packageManager` and CI | Ready |
| npm | `10.9.2` | Ready |
| Python | `3.13.1`; CI uses 3.12 | Ready with limitations |
| pip | `24.3.1` for Python 3.13 | Ready |
| Docker | unavailable | Blocked for local infrastructure validation |
| Docker Compose | unavailable | Blocked for local infrastructure validation |
| GitHub CLI | unavailable | Ready with limitations; connected GitHub integration and Git remote remain usable |
| `make` | unavailable | Not applicable; direct Python checks are the documented Windows equivalent |
| Disk | approximately 523.3 GiB free on the repository drive | Ready |
| Memory | approximately 15.7 GiB total and 1.6 GiB free at inspection time | Ready with limitations |
| Relevant ports | no listener detected on 3000, 3001, 5173, 5432, 6379, 8000, or 8080 | Ready |
| Repository Git identity | `Mohamed Islem Rezzag Baara <Islem-Rezzag@users.noreply.github.com>` | Ready |

Python 3.13 is newer than CI's 3.12 baseline. All current Python checks pass, but future dependency changes should continue to prove both local 3.13 and CI 3.12 compatibility.

## Secret and live-model readiness

Presence-only inspection found no value for `OPENAI_API_KEY`, `AZURE_OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, `GOOGLE_API_KEY`, `GEMINI_API_KEY`, `MISTRAL_API_KEY`, or `COHERE_API_KEY`. Values were never printed.

- No live model request was made.
- The current deterministic implementation requires no model key.
- A future agent runtime does not exist yet. Its default tests must use mocks or recorded synthetic responses and must run without a paid key.
- Live-model evaluation remains blocked until a human approves the provider, model, expected call count, and maximum budget.

## Clean installation and local validation

The active checkout was clean before the audit. `corepack pnpm install --frozen-lockfile` passed across all 14 workspace projects. pnpm emitted one non-blocking warning: the `esbuild@0.28.0` dependency build script was ignored under the pinned package-manager policy. No approval or lockfile change was made.

Pre-edit baseline results:

| Command | Result |
| --- | --- |
| `python scripts/validate-control-plane.py` | PASS |
| `python -m pytest tests/test_control_plane_bootstrap.py` | PASS, 117 final Phase A tests (116 at pre-edit baseline) |
| `git diff --check` | PASS |
| `corepack pnpm install --frozen-lockfile` | PASS, 14 workspace projects |
| `corepack pnpm typecheck` | PASS, 13 packages |
| `corepack pnpm lint` | PASS, 13 packages |
| `corepack pnpm test` | PASS, 13 packages and 150 tests total |
| `corepack pnpm build` | PASS, 13 packages |
| `corepack pnpm format:check` | PASS, 13 packages |
| `corepack pnpm qa:dev` | PASS, 18 PASS / 0 FAIL / 1 optional Docker SKIPPED |

The 150 workspace tests comprise 97 events tests, 42 evals tests, and 11 scaffold bootstrap tests. These checks prove the current MoneyEvent and scaffold boundaries; they do not prove unimplemented ledger, invariant, incident, graph, replay, agent, benchmark, UI, connector, or production behavior.

Final dirty Phase A validation also passed control-plane validation, 117 bootstrap tests, whitespace checks, frozen install, all 13-package typecheck/lint/test/build/format checks, and `qa:dev --allow-dirty` with 17 PASS, 0 FAIL, and two expected skips for the dirty-worktree gate and optional Docker validation.

## Clean-worktree reproducibility

A detached temporary worktree outside the active repository was created at the exact synchronized `main` commit. It had no local `node_modules`, build output, or untracked project file.

- Fresh lockfile install: PASS; 276 packages linked from the package store.
- Full `corepack pnpm qa:dev`: PASS; 18 PASS / 0 FAIL / 1 Docker SKIPPED.
- Git status after install and validation: clean.
- Hidden local file required: none found.
- Untracked generated artifact required: none found.
- Temporary test location: removed after results were recorded.

This is clean-worktree reproducibility evidence rather than an independent network-download audit because the pnpm content-addressed store reused cached packages. The public Git remote and lockfile were still authoritative.

## Application smoke audit

All three current apps are scaffolds, not meaningful product surfaces.

| App | Build/test | Bounded start result | Honest classification |
| --- | --- | --- | --- |
| `apps/api` | PASS | `GET http://127.0.0.1:3000/infra/ready` returned `process-ready`, with database and migrations `not-checked` and product implementation `not-started`; process terminated after the probe | Infrastructure-only Fastify scaffold |
| `apps/web` | PASS | Vite served HTTP 200 on `127.0.0.1:5173` with the expected root mount; process terminated after the probe | Minimal React shell with no product workflow |
| `apps/worker` | PASS | Built module executed with exit code 0 | Bootstrap module with an empty job list and no long-running worker |

Browser-level automation was not installed merely for this audit. M15 will need deliberate browser, accessibility, workflow, and screenshot validation when a real UI exists.

## Docker and local infrastructure

Local Docker and Docker Compose are unavailable, so Compose configuration, Postgres startup/health, migrations, public-schema inspection, and cleanup were not run locally. Nothing was installed automatically.

Existing exact-head remote evidence remains valid for PR #59: GitHub Actions CI run `31262860836` passed both `validate` and `infra-smoke` on reviewed source head `bb907dd1b08bb5491e1a63dfa3e572696ed6a6ce`. The remote infrastructure job validated Compose configuration, Postgres health, the empty migration boundary, the expected schema state, and cleanup.

Local Docker is not required to publish the M03 technical foundation. It is required before the user can fully operate and locally validate future storage, database, migration, ledger, incident, replay, or demo work. Later human remediation is to install a supported Docker Desktop/Engine plus Compose plugin, allocate sufficient memory, and rerun `corepack pnpm qa:dev -- --with-docker`.

## Environment verdict

| Area | Verdict | Limitation or remediation |
| --- | --- | --- |
| Repository/toolchain | Ready | Keep pinned Node/pnpm versions authoritative |
| Dependency install | Ready | Non-blocking ignored `esbuild` build-script warning remains |
| Deterministic tests and builds | Ready | Product scope remains M03 only |
| Current app scaffolds | Ready with limitations | They run, but they are not a usable product or demo |
| Clean-worktree reproducibility | Ready | Package bytes were reused from the local pnpm store |
| Local Postgres/migrations | Blocked | Install Docker/Compose later with human approval |
| GitHub operations | Ready with limitations | `gh` is missing; connected integration and Git remote are available |
| Live-model work | Blocked | No key, budget, model, or call count approved |
| Future mock-only agent tests | Ready by policy, not implemented | Agent runtime must make this concrete in M10-M11 |
| User-operated portfolio demo | Not applicable yet | No meaningful product flow exists before later milestones |

Overall verdict: **Ready with limitations** for deterministic M03 work and documentation; **blocked** for full local infrastructure and live-model validation; **not applicable yet** for a genuine end-to-end product demo.
