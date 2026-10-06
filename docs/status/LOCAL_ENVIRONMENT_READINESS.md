# Local Environment Readiness

Current delivery (2026-10-06): M00-M03 are closed and V1_PUBLIC_PRODUCT is approved. M04.01-M04.09 are Completed and merged; human PR70 merge78cc3d6 matches reviewed963c11f/tree238a44e and exact final independent QA/cleanQA18/0/1/CI37481790910 real192 verified. M04.10 Add cash clearing account is **Builder complete, awaiting QA** on `m04-10-add-cash-clearing-account`, no current PR yet, under active `plans/active/CLP-0005-m04-double-entry-ledger-core.md`. Fresh ledger834/21files and control923 PASS; ledger type/lint/build/format PASS; root intermediate fullQA17/0/2 PASS (dirty override and optional Docker skips). Actual PostgreSQL composition acceptance and existing overall independent QA pending; pure tests are not database evidence. Final actual-head independent confirmation/cleanQA/CI and human merge remain required; exact final proof stays in the sole PR. M04.11-M04.18 and M05-M21 remain Not started. Current evidence is in `docs/status/CURRENT_STATE.md`. Original authorized CLI/owned17 CI route; earlier dated checkpoints historical.

## Audit scope

This 2026-08-18 audit inspected the actual local Windows checkout without installing system software, printing secret values, making live-model requests, starting production providers, or mutating product, ledger, evidence, repair, or money state.

Repository root: `C:/Users/moham/Desktop/CausalLedger`

Audited synchronized commit: `9c2df34fd1da1a4f893a5b16cb05fa1177f23cce`

## Historical tool inventory (2026-08-18)

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

## Frozen-lockfile installation and local validation (2026-08-18)

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

## Historical environment verdict (2026-08-18)

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

## Current QA recheck (2026-09-24)

This dated addendum supersedes current interpretations of the earlier tool inventory without rewriting its historical observations.

- Authenticated GitHub CLI `2.97.0` is available at `C:/Program Files/GitHub CLI/gh.exe`; `gh pr view 59`, `gh pr view 60`, and `gh run view 32160971074` succeeded. The earlier unavailable-CLI observation is not a current blocker.
- Installed Codex is `0.155.0-alpha.9.2`. Native Goals are callable and the current goal is active; a separate-context read-only reviewer subagent was successfully launched. GitHub CLI availability was checked independently from those Codex capabilities.
- Node `22.16.0`, pinned pnpm `10.32.1`, Python `3.13.1`, and Git remain available. Docker/Compose and `make` were not found. No software was installed. Python CI still uses 3.12.
- Free memory was approximately 0.87 GiB of 15.7 GiB at this recheck, so checks run sequentially with one coordinator and one reviewer.
- Clean initial PR #60 candidate `941fe1984eb418db19cda9a4e2be861dacbf79e2` passed `corepack pnpm qa:dev`: 18 PASS, 0 FAIL, 1 optional Docker SKIPPED. Its exact-head remote run `32160971074` passed both jobs.
- The earlier detached worktree used starting `main` at `9c2df34fd1da1a4f893a5b16cb05fa1177f23cce` and a warm pnpm store. It was not a cold installation of PR #60. Final corrected-head clean-worktree evidence is recorded separately in the PR review record with its SHA and cache limitation.
- Docker was not tested locally. Remote `infra-smoke` is evidence only for the CI environment. Future Postgres-dependent work retains its local remediation gate; pure planning/deterministic work may proceed after the human gates where infrastructure is not required.
- No live-model key was read during this QA recheck and no live-model request was made. Key-presence observations above remain dated 2026-08-18; budget/provider/model/call-count approval is still absent.

Current verdict: ready with limitations for this documentation/control-plane review. Scaffold startup is not a usable product or end-to-end demonstration.

## Current M04.05 recheck (2026-10-02)

Windows and the existing Ubuntu24.04 WSL lack PostgreSQL/Docker/Podman; no listener on local5432 or configured local database target was found. Existing Node22.16.0/pnpm10.32.1/Python3.13.1 and authenticated GitHub CLI remain available. No system software installed, secrets printed, credentials/configuration changed or live-model calls made. Earlier CLI/native-goal/key-presence observations are dated history, not current permission or budget grants.

The existing approved GitHub Actions isolated Postgres17 job can supply mandatory storage acceptance without local installation. However, GitHub rejected the M04.05 push because the existing Git OAuth credential lacks `workflow` permission. Both Git's existing credential manager and the available CLI lack the needed workflow authority; no alternate route was attempted. No remote M04.05 branch, PR or current CI exists. Explicit user authorization to reauthorize the existing connection and actual GitHub consent are required before resuming.

Root and independent reviewer fresh ledger469/11files, control451 and local package/static checks PASS on implementation candidate8e5c05b03fc903fd09ee15d737b49f9e29314811. Root intermediate workspace QA17/0/2 PASS with warm caches; dirty-worktree and optional unavailable Docker skips. Real storage tests/migrations have NOT RUN and no storage guarantee or overall QA PASS is established. Local readiness is limited to deterministic unit/type/control/workspace checks; current delivery is Blocked on workflow permission. Root will execute database tests once the authorized CI route can run; the user need not run tests. No accepted end-to-end product or live-model capability.

## M04.05 authorized connection refresh checkpoint (2026-10-02T14:52:01Z)

The user explicitly authorized the existing Git connection refresh on 2026-10-02: "ok you have it". Root restarted the same installed GCM device flow with a console after Windows hid its prompt; no alternate credential/helper/configuration route. GitHub recognizes Islem-Rezzag and existing repo/gist/workflow access, but requires its normal identity verification before completing the refresh. The confirmation page is open in Chrome; the user must complete GitHub Mobile or password verification there, never share credentials in chat. GitHub's first Mobile request expired; the confirmation was retried within the same flow and remains a user identity handoff. No successful credential refresh, new push, remote branch, PR, real PostgreSQL execution or overall QA PASS is claimed. Root prepared the sole draft PR description outside the repository while waiting. Local implementation/driver/tests/migration/CI/control code remains byte-identical to8e5c05b; prior clean checkpointc211fad passed root QA18/0/1 with warm caches and corrected independent partial review. Existing Blocked status remains; next action is GitHub identity verification, then root runs acceptance and prepares the PR. No new native goal, install, paid call, alternate access route or later submilestone.

## M04.05 actual credential source correction (2026-10-02T15:37:39Z)

The user's existing workflow-reauthorization approval remains valid. The GCM sign-in completed, but the subsequent same-branch push was still rejected. Read-only inspection found github.com host-scoped Git helpers in the existing global configuration override the generic manager and use GitHub CLI. Its active Islem-Rezzag credential still has gist/read:org/repo but lacks workflow. The earlier GCM refresh targeted the wrong saved connection; it did not restore Git's publishing credential. No Git helper, configuration, protocol or remote was changed, and no alternate access route was used to bypass the rejected push. Root started the original active GitHub CLI credential's secure refresh with the additional workflow scope. GitHub now displays the exact Workflow approval for GitHub CLI in Chrome; actual approval on that page is pending, not another verbal permission request. GitHub's browser confirmation adds workflow-file access; browser-control policy requires confirmation at that step. The user is asked to click Authorize github on the prepared page. No GitHub CLI refresh completion, new remote branch, PR/CI, real Postgres execution or overall QA PASS is claimed. Source/driver/migration/tests/CI/validator remain unchanged; existing partial code QA and all18/V1/future gates preserved. Exact next thread: M04.05 Resume - Complete GitHub CLI workflow approval and validate storage.

## M04.05 original authorization resolved and Builder handoff (2026-10-06T09:50:21Z)

Actual human GitHub approval completed the original CLI refresh (exit0; same Islem-Rezzag keyring account, original scopes plus workflow). Normal push of clean4c3010d succeeded to the unchanged origin; sole draft PR #66 opened and attached. No alternate credential/configuration/protocol/remote route, system install or paid call. Live main still verified base526bb66dda5d9c8b9aebd85775142e8d22c3a73a; complete all18 requirement rows unchanged.

Actual CI37445358766 on `4c3010d16268d9c5cbff4d791cb4eda5d4ccf37c` PASS: validate and infra-smoke. The mandatory real Postgres17 command executed64 tests without skips, migration UP/DOWN/UP, empty recovery and exact four-table/function inspection, owned database/role cleanup and always Compose container/network/volume removal. This supersedes the earlier unexecuted-storage/permission blocker. Prior root/reviewer ledger469/11files, control451 and local package checks remain source-identical; root clean QA18/0/1 on c211fad is warm-cache/local-only evidence. Reviewer37 supplemental mock probes are separate; no local real database or cold-install claim.

Full slice remains36 paths including8 new files listed in the earlier handoff. This operational update changes only existing scoped documentation/tracking/ledger README; implementation/CI/driver/migration/tests/validator unchanged from8e5c05b. Original Account/header/entry/journal code, other product packages/apps, fixtures/raw evidence, all18 acceptance/dependency rows and V1 remain untouched. Tests cover the brief's exact money, lossless account snapshots, atomic rollback, direct SQL defenses, durable duplicate IDs, concurrency, immutable history, privileges and acknowledgement boundaries; no posting eligibility, balance/general query, semantic retry, reversal or agent financial authority.

Existing sole overall reviewer m04_02_qa is reviewing actual real database evidence; separate transition auditor checks its logs without code edits. Builder complete, awaiting QA; no overall QA PASS or final-head merge readiness yet. Root will validate this tracking checkpoint, obtain corrected-state review and final clean QA/CI, store final SHA-bound evidence in the same PR, and stop for human-only squash merge. Valid synthetic1250 debit/credit persists completely; unequal1249 refuses before connection. Root owns every test; optional VS Code learning command remains `corepack pnpm --filter @causalledger/ledger test`. Exact next thread: **M04.05 QA - Validate immutable transaction storage**. No M04.06 or native-goal completion.

## M04.05 candidate independent QA and final tracking handoff (2026-10-06T09:51:50Z)

Existing separate-context overall reviewer m04_02_qa returned **provisional overall candidate QA PASS**, no findings, on4c3010d16268d9c5cbff4d791cb4eda5d4ccf37c for PR #66. Independently read actual CI37445358766 bothjobsSUCCESS, real64/64 tests, migration UP/DOWN/UP, exact schema inspection and owned/Compose cleanup; tested merge6ecbd7c has parents verifiedbase+candidate and identical tree4bb00afd83b2dc0cb04044a72aa97879dcf1f1e6. Full36-path scope, previous contracts, all18 requirement rows and V1 preserved. Prior ledger469/control451 and37 mock probes retain byte-identity proof; fresh CI control451/QA18/0/1 PASS. CI's618 default-workspace outputs are cached readback, with64 fresh database tests counted separately.

Root's17 existing scoped documentation/tracking edits record original CLI authorization success, sole PR #66, real database acceptance and candidate QA PASS. Initial control validation caught missing current-slice/current-branch labels, source-neutral MoneyEvent wording, the cumulative capability marker and PR-column format. Corrected on attempt one without changing validator/assertions. Corrected control validator and whitespace PASS; no source/CI/migration/test/manifest/driver change or additional product path. Status **QA passed, awaiting merge** reflects candidate QA; final committed tracking-head re-review, clean QA and exact-head CI are explicitly still required before readiness.

Root will commit/push only these inspected17 scoped paths on this same branch/PR; no history rewrite, merge or next slice. Existing reviewer performs final tracking recheck, root executes clean QA and confirms real Postgres/required CI on the actual final head. Store final SHA-bound review/CI in PR #66 rather than another preceding-CI documentation commit. Safe to merge only after those final gates. Exact next thread: **Merge M04.05 PR - Add immutable transaction storage**; human-only review/squash merge, then verify merge before M04.06. Valid synthetic1250/1250 stores all rows;1250/1249 refuses before connection. No posting eligibility, lookup/balance API, semantic retry, reversal, financial truth or agent financial authority. No local Docker, system install, paid call or production connection.

## 2026-10-06 - M04.05 merged; M04.06 Builder started

Human PR66 mergef5a5e910041611e0bf36184e4bc8fc483228a613 verified by reviewed treee83dc0b/emptydiff/main reachability and exact final independent QA/CI37446228689 with real64 tests. Safely advanced clean main and created m04-06-add-account-balance-query; guard passed. Generated06 Account/sign/cutoff/snapshot/conflict/readonly exact-money brief before coding; status/goal/registry updated, all18/V1 and prior contracts preserved. Validation pending for06; no query guarantee, currentPR, migration/dependency change, later slice or agent financial authority. Existing independent reviewer and actual finalhead CI remain required; root runs every test.

## 2026-10-06 - PR67 verified; M04.07 started

M00-M03 are closed and V1_PUBLIC_PRODUCT is approved. M04.01-M04.06 are Completed and merged. Human PR #67 merge 471d76c6173208d33d7584756a6db0d433c29ec4 matches final reviewed ee5d6c2/tree da69be5; empty diff/main reachability, exact-head independent QA, clean QA18/0/1 and CI37455976639 both jobs with storage64/balance22 real Postgres17 tests PASS verified. M04.07 Add transaction query is Builder in progress on `m04-07-add-transaction-query` under active `plans/active/CLP-0005-m04-double-entry-ledger-core.md`. No current07 validation or PR yet. M04.08-M04.18 and M05-M21 remain Not started. Current evidence is in `docs/status/CURRENT_STATE.md`. Generated scoped complete-journal brief before coding; current validation pending.

## 2026-10-06 - M04.07 builder checkpoint

Builder complete, awaiting QA; no current PR yet. Fresh ledger655/15files and control614/type/lint/build/format PASS; root intermediate full QA17/0/2 PASS. Mandatory real PostgreSQL acceptance and overall independent QA pending; driver tests are not database proof. Scope29/prior127/all18 PASS; exact-head QA/CI and human merge gate remain.

## 2026-10-06 - M04.07 builder checkpoint

Builder complete, awaiting QA; sole [PR #68](https://github.com/Islem-Rezzag/CausalLedger/pull/68). Fresh ledger655/15files and control614/type/lint/build/format PASS; root intermediate full QA17/0/2 PASS. Mandatory real PostgreSQL acceptance and overall independent QA pending; driver tests are not database proof. Scope29/prior127/all18 PASS; exact-head QA/CI and human merge gate remain.

## 2026-10-06 - M04.07 final checkpoint

QA passed, awaiting merge; sole [PR #68](https://github.com/Islem-Rezzag/CausalLedger/pull/68). Fresh ledger655/15files and control614/type/lint/build/format PASS; root intermediate full QA17/0/2 PASS. Actual CI37467329970 both jobs and real Postgres17 storage64/balance22/transaction-query27, migration UP/DOWN/UP, exact schema/functions, owned database/roles and Compose cleanup PASS. Existing separate-context overall m04_02_qa PASS, no remaining findings. Actual final-head re-review/clean QA/CI required; final proof maintained in this sole PR. Scope29/prior127/all18 PASS; exact-head QA/CI and human merge gate remain.
