# CLP-0006 M05 Provider and Bank Simulator

## Current delivery unit: M05.04–M05.06 synthetic payout lifecycle (2026-10-22)

Expected branch `codex/m05-payout-lifecycle`; base human PR85 squash `9ef19fadb1263a182ed1ccb33c6e07229711fa4b`. Root verified actual nonbot merge, parent55964ee726abc13793ef9c5fe25f058afe81bc94, reviewed treea1d7c4254f34f0fb955947cfbc835fbfa2086fda, full source/merge diff empty and fetched-main reachability. PR84 capture is already human-merged; introductory capture learning is complete from the user's responses. User reports personally running176 tests successfully; that execution is user-reported. M00–M04 closed; V1_PUBLIC_PRODUCT unchanged. Native Goal remains user-paused.

One coherent provider payout capability maps original M05.04 created, M05.05 paid and M05.06 failed to one branch/PR. External03 prerequisite is verified merged; internal04→05→06 is implemented/tested in order. Original19-row acceptance table/history remains untouched. No storage, posting, concurrency, authorization, agent access, ingestion, bank settlement, later simulator rows or other milestone work. One coordinator/editor and existing separate-context delivery_learning_review; reviewer read-only, runtime serialized. Independent initial contract review supports this bounded unit.

### Frozen contract and acceptance map before implementation

- **M05.04:** `generatePayoutCreated(unknown)` composes1–16 exact owned03 capture manifests, preserving their ordered authorization/capture sources and deliveries. Aggregate policy is full gross capture membership only, same source/provider/merchant/currency; no fees/refunds/reserves/FX, partial allocation, shared budget or inferred funds. Reject duplicate payment/authorization/capture IDs and overlapping source/delivery identities. Exact BigInt sum of positive canonical1–128digit captures must equal explicitly supplied payout amount (1–130digits). Created eventTime is known UTC at/after each capture. Raw created record declares stable payout ID, amount/currency, ordered capture source/hash references, supplied time and synthetic label. Independent goldens, exact sum/bounds, missing/conflicting references, hostile arrays and input preservation prove acceptance.
- **M05.05:** `generatePayoutPaid(unknown)` appends one provider-paid record to an exact owned payout composition; amount/currency/source/provider/merchant/payout must equal creation. It cites original creation tuple/hash; supplied eventTime>=createdTime; distinct occurrence/descriptor/delivery/order/receipt identities. Provider paid is only a supplied synthetic assertion, never bank receipt or settlement confirmation. Stable literal bytes/hashes and contradictions/refusals prove acceptance.
- **M05.06:** `generatePayoutFailed(unknown)` appends a failed assertion with explicit1–256printable-ASCII failureReason, no surrounding whitespace. Both outcomes accept created alone or created plus the opposite outcome. Preserve both contradictory records without choosing a winner; refuse a second same-kind outcome. Outcomes need only be at/after creation, not each other; no host clocks or inferred event chronology. Missing creation/member evidence is refused; created-only is incomplete, and missing bank evidence never generates failure. Both orderings, missing/reason/ref/amount/time cases prove acceptance.

Root objects/arrays use strict own enumerable data snapshots; reject accessors/symbols/hidden/extra fields, sparse arrays, malformed known UTC, noncanonical money and changed owned wires even after SHA recomputation. Generic manifest validation remains unchanged. Reconstruct owned02/03 and payout wire before trusting context; bound sizes before parsing. Return detached deeply frozen standard manifest result or frozen stable issues with no partial value. No caller mutation, I/O, global counters, randomness, clocks or financial mutation.

### Work, review, demonstration and recovery

Implement creation then test it, add paid and test, add failed/conflicts and test; share only owned payout helpers. Preserve prior02/03 production/tests unchanged except narrow public boundary flags/import allowlists. Update existing machine current-phase/registry consumers with finite04–06 mapping and behavioral state tests; no wording tests or new learning schema. Update current plan/status/goal/weekly/navigation and one payout spec/package README. Prior proofs/history and V1 remain preserved. No competing branch/PR, force/reset/amend/stash, installs, paid calls, deployment, tags or releases.

Validation Levels0–5/7/8, Level6 N/A: guards, existing validator/full bootstrap, simulator type/lint/build/format and deterministic payout/prior tests, workspace checks, whitespace/scope/history, separate-context QA then required actual final PR CI. Actual PostgreSQL claims rely on existing actual CI suites; no local DB claim. Stop after3 unsuccessful repairs of the same defect. Detailed external exact-final-head review/CI belongs in the PR record, with no CI-copy-only commit.

Demo: two captures1000+250 USD minor units create1250 payout; paid appends provider assertion; explicit failed reason after paid retains both contradictory outcomes.1251 requested payout fails exact-sum validation. Show only actual executed I/O. Safe existing payout test provides repeatable learning exercise. Recovery is rerun pure functions/tests with disposable inputs; rollback is human-reviewed revert of this unit, no DB/data rollback. Final A–F learning checkpoint precedes human review/merge; no07 before verified human merge and required understanding.

### Payout builder validation and handoff (2026-10-22)

Builder complete, awaiting QA. `python scripts/validate-control-plane.py` PASS; full `python -m pytest tests/test_control_plane_bootstrap.py -q --maxfail=8`2751 PASS in520.69s. Existing simulator test626/9files PASS, including155 payout cases plus type boundary test and unchanged prior470. Workspace `pnpm typecheck/lint/test/build/format:check` all PASS,14 tasks each with13 warm cache hits and current simulator execution; no cold-cache or freshly rerun cached-ledger claim. Initial first-run array descriptor typing, frozen attack fixture and occurrence collision failures were repaired; initial lint caught two unused initial values, removed and fresh lint/type/test/build/format passed. Independent static review's two test-quality findings were repaired with individually canonical overlaps and actual passed-root Proxy mutation assertions; its regex concern was withdrawn as a false positive, no production change from that concern.

Fresh built Node stdin demo: captures1000+250 USD =>1250 creation, sources5→6→7 and deliveries7 with created/paid/failed assertions; original first5 source records preserved,1251 refused invalid_amount at $.amountMinorUnits. Existing safe demonstration test1 PASS with154 intentional name-filter skips; full155 payout cases passed separately. No bank/settlement/funds/ledger action. Root guard/scope/whitespace/2 added relative links PASS;21 existing paths changed plus4 new paths,362 prior tracked paths byte-identical. Complete88549-byte merged02 history/SHA1126f2feb3b7e3dd2947087d1b277e2726a4286e370c396d3a02e60f4b067b81/original19 acceptance rows/weekly append-only prefix preserved. Protected V1, earlier financial/payment/generic source/tests/config/dependencies/migrations/CI unchanged.

make and Docker/PostgreSQL unavailable locally; no install attempted. Direct existing checks cover the local builder ladder; unchanged qa:dev wrapper and actual PostgreSQL regression acceptance remain required actual CI checks. Sandbox could not start pinnedpnpm; ordinary exact-command platform permission granted, no policy/configuration workaround. No paid API calls, deployment, tag/release, force/reset/amend/stash, human merge or native Goal change.

Changed-file ownership: new payout owner/test/type-test/spec; narrow simulator public flags/exports/ownership; existing JSON/validator/control state fixtures; active plan, current/next/goal/weekly/registry/milestone/capability/navigation/package README. Root sole editor, delivery_learning_review sole independent reviewer. Safe to commit/push/open one draft PR for independent QA; not yet safe to merge. Reviewer runtime release follows clean candidate commit; final independent QA, actual final PR CI, learning response and human merge remain required. Next unit07 is closed; original19 QA and formal milestone closeout remain distinct.

All amendment setup and03 handoff sections below are retained historical snapshots; the current payout unit above governs this delivery. Original acceptance criteria remain authoritative.

## Delivery-workflow amendment setup (2026-10-22)

Human instruction authorizes only current-state recovery, catch-up and a narrow workflow amendment; no new product implementation. Expected branch `codex/delivery-learning-workflow`, base `55964ee726abc13793ef9c5fe25f058afe81bc94`; one coordinator/editor and one separate-context independent reviewer. Branch/status/remote guard before edits. Preserve all 19 original rows and every acceptance criterion, V1_PUBLIC_PRODUCT, immutable history, machine-readable feature state and all product/test/config/dependency/CI files.

Verified human PR84 squash merge has reviewed tree `b6e9ccfac13c11ec9d0ce979291949bee38375e2`, full diff empty and fetched-main reachability. Primary published body/advisory/canonical QA hashes and successful CI39136007771 were re-read; its 470 simulator/2727 controls/1227 PostgreSQL results are historical, not fresh database execution. No open PR at discovery. Fresh catch-up: existing capture suite176 PASS plus actual synthetic1000-of1250 output and1251 refusal. User learning and personal execution remain unconfirmed.

The proposed [WORKFLOW.md](../../WORKFLOW.md#delivery-and-learning-policy) rule activates only after independent review and human merge. It explicitly amends procedural delivery-container phrases in retained rows: a predecessor's "human-merged" gate is mandatory between delivery units; internal technical dependencies of an eligible mapped unit are implemented and tested in order before its shared review/merge. "All nineteen rows remain separate" preserves separate IDs/acceptance evidence, not nineteen compulsory PRs. "All nineteen human merges" requires all original IDs covered by accepted human-merged units, not a fixed merge count. M05.19 whole-simulator QA and formal milestone closeout remain distinct mandatory gates. The original table/history bytes stay intact; no future bundle is authorized by this setup.

Scope: AGENTS/WORKFLOW, four existing operational guides, two existing builder/QA templates, completion-goal Markdown, this narrow plan section and current/next/weekly records only. No new scheduler, hierarchy, schema, governance wording tests, paid call, installation, deployment, release or settings/model change. Current managed workspace/network/request boundary supports the task; exact desktop build was not readable from the local inventory, so no version-specific reload claim. After merge explicitly reread instructions; startup-only guidance may require a fresh session, but this coordinator follows the read instructions directly.

Validation: Levels0–4/7/8; existing control validator/full bootstrap tests, diff/scope/history/link and independent compatibility review. Capture execution is fresh catch-up evidence, not a claim of new functionality. Root runtime first, reviewer runtime only after clean candidate release; no overlapping suites or interruption of unrelated processes. Validation, findings and exact final head/CI are recorded in this plan and the sole PR review record. Stop at PAUSED: LEARNING AND REVIEW CHECKPOINT; no further product work before human responses and amendment merge.

### Setup builder validation

2026-10-22: existing control validator PASS; complete bootstrap suite2727 PASS in488.01s; existing capture build and176 tests PASS (1.83s); actual stdin input/output and overcapture refusal verified. Scope13 existing Markdown files; other370 tracked paths, original19-row table, complete merged02 history (SHA2561126f2feb3b7e3dd2947087d1b277e2726a4286e370c396d3a02e60f4b067b81), weekly prefix, V1/JSON/source/tests/config/CI unchanged. Whitespace and relative link/anchor checks PASS. make unavailable; direct existing Python commands used. No local PostgreSQL run or changed PostgreSQL guarantee. Native Goal independently read as paused; no goal/config/model change. Pre-candidate separate-context static review found no defect; exact committed-state independent QA and CI remain external PR gates, not claimed complete in this builder record.

## Retained M05.03 feature handoff

The following feature checkpoint predates the verified PR84 merge. Its machine-consumed markers, original rows and immutable history are retained; the amendment setup above governs the current coordinator action.

## Purpose / Big Picture

Generate one declared full or partial capture linked to a supplied synthetic authorization, preserving raw authorization evidence and returning a deterministic two-record/two-delivery composition. No real payment, settlement, ledger or evidence-store action.

## Progress

- [x] Verified human PR83 merge/final evidence and safe clean03 branch.
- [x] M05.03 implementation/builder validation.
- [x] Independent local QA/sole PR/current CI.
- [ ] Final exact-head gates and human03 merge.

Current planning review: Completed and merged

Sole merged M05 planning PR #81

Current package review: Completed and merged

Sole merged M05.01 PR #82

Current authorization review: Completed and merged

Sole merged M05.02 PR #83

Current capture review: QA passed, awaiting merge

Sole proposed M05.03 PR #84

## Surprises & Discoveries

All candidate findings resolved: initial type-test callback/directive errors; precise duplicate-marker/type-negative fixtures; restored completed-M04 navigation link and formatted ledger README. Initial full controls2649/78 and intermediate15/2/2 were failed runs, followed by all78 focused repair rechecks and fresh clean/independent full2727 PASS; history remains recorded honestly. Reviewer plain sandbox could not access pinnedpnpm/pytest; one normal platform approval granted exact existing tools and all required fresh checks passed without install/alternate runner/configuration change. Prior reviewer GitHub automatic-review rejection remains binding; independent review is local and root primary CI separately attributed.

## Decision Log

Freeze one auth-backed full/partial capture per returned scenario; no global consumption/multi-capture, expiry or provider truth. Reuse unchanged02 reconstruction and generic validation. Padded UTC keys compare known event times only; observations remain independent. Keep all original IDs/names/dependencies and V1.

## Context and Orientation

Human PR83 merged b41efac2cad75ef3dda986d3ccdb1d620ebc68c2 at 2026-10-18T13:43:57Z by nonbot Islem-Rezzag. Reviewed0b1676437ffd086730032a1b27ac8b369eda4ca0 and squash share treee5f989f451e918235d407c81ff8b8ef7fbd7f884, parentac092 and full diff EMPTY; fetched-main reachability PASS. Root re-read primary human merge/body/advisory6218664786/canonical reviewer/finalCI38920946457 and exact hashes. Prior final independent fresh293 package/412 behavior/607 lifecycle/2559 controls, root clean18/0/1 and all14 realPostgreSQL1227/ledger1785/recovery/upgrades/schema/DEMO/cleanup PASS. This turn reviewer independently verified local merge/tree/diff/reachability; its live GitHub escalation was auto-review rejected after network denial. Current primary metadata is root-verified, not newly independently fetched; prior independent publication evidence remains historical. No denied route retried or bypassed; no unchanged83 tests rerun merely to verify merge.

Completed M04 plan remains plans/completed/CLP-0005-m04-double-entry-ledger-core.md. Full merged02 history follows the immutable marker.

## Scope

Expected branch m05-03-simulate-payment-captured; base b41efac2cad75ef3dda986d3ccdb1d620ebc68c2; active CLP0006. Before edits run git branch --show-current, git status --short, git remote -v. Stop for wrong branch/unrelated dirt; root owns same-slice scoped dirt. Root sole editor/runtime owner; existing m04_02_qa independent local reviewer and static auditor reused. Serialize Python/pnpm; reviewer runtime HOLD until clean committed candidate release. No new agents/chats/native goals; native goal stays user-paused.

Own generatePaymentCaptured(unknown), strict21-field request: schemaVersion, synthetic, scenarioId, observationCutoff, sourceId, sourceOccurrenceId, sourceRecordId, eventTime, deliveryId, receiptDescriptorId, observedAt, deliveryOrder, providerId, merchantId, payerId, paymentId, authorizationId, captureId, amountMinorUnits, currency, authorizationManifest. Fixed m05.03-payment-captured-request.v1/record.v1 and m05.03-payment-captured.v1 generator. New sim_capture_ identity, prior simulator grammar unchanged. Capture context is the supplied prior generated02 manifest: generic validation/snapshot first, exactly1 provider source/1 delivery, fixed02 generator and application/json; parse only owned02 wire and reconstruct with unchanged generatePaymentAuthorized, require exact full checked manifest/rawtext/hash. Generic hash validity alone is not semantic authorization validation. Input snapshots captured once; no caller rereads, getters/toJSON execution or partial output.

Capture body/metadata uses unchanged02 generator as a safe throwaway probe with context derived from validated ORIGINAL authorization roles/source/currency. Matching authorizationId and all context; distinct capture occurrence and descriptor/delivery/receipt/order identities. Positive canonical1–128digit exact strings, no Number conversion; compare BigInt only after validation, single full or partial capture<=supplied authorized amount. Known canonical UTC capture eventTime must be>=authorization eventTime using padded comparison keys only; original raw timestamps unchanged. This is the bounded fixture policy, not a universal provider rule, authenticity/ownership/funds/expiry/real chronology proof. No cumulative multi-capture budget or consumed authorization across calls. Independent observed clocks/order/cutoff remain supplied declarations, including out-of-order/future observations; no filtering, sorting or inferred receipts.

Success same frozen manifest result shape: NEW composition with original authorized source and delivery first, capture second; source text/hash/IDs/eventTime and delivery metadata preserved exactly. New top scenario/cutoff/generator describe03 composition, not unchanged prior whole manifest. Fixed compact UTF8 raw capture keys: schemaVersion, synthetic, eventType payment_captured, sourceId, sourceOccurrenceId, providerId, paymentId, authorizationId, captureId, merchantId, payerId, amount{minorUnits,currency,representation}, authorizationReference{sourceId,sourceOccurrenceId,payloadSha256}, eventTime. Citation hash comes from validated ORIGINAL prior source, never throwaway probe. Descriptor/scenario/delivery/observed/order/cutoff excluded from raw occurrence bytes; original descriptor references retained in composed manifest. Exact SHA256/no BOM/newline. Stable issues/no partial value. Prior issues prefixed $.authorizationManifest; current context/index1 paths mapped to request fields. Prior shape/owned wire, capture body and relational phases short-circuit with deterministic ordering.

Acceptance: independent literal auth/capture golden bytes+hashes; full/partial/equal/max128digits/overcapture and lexical-vs-numeric boundaries; wrong refs/currency/kind/schema/metadata/payload with recomputed valid hash; noncanonical/duplicate/unknown owned-wire fields; strict root shape/hostile descriptors/actual caller mutation via prior traps; frozen detached input/output; exact original source+delivery preservation; current/prior descriptor and observation-only changes preserve raw bytes; strict UTC equality Z/.000Z,+/-1ms/year boundaries, no observed-order inference; types/import ownership; prior02/generic tests retained unchanged except truthful boundary flag/assertion/import allowlist.

Preserve full merged02 plan including nested01/planning histories; raw18/19 acceptance rows, V1/prior proofs, financial/event sources/tests/specs/fixtures, all14 database children/THREE DDL/CI/root and package manifests/config/lock. No M05.04+ payout/refund/dispute/fee/duplicate/delay/missing/CSV/seed/CLI or financial-write/ingestion/parser integration. Internal02 wire reconstruction is not an external provider adapter or canonical mapping.

Validation Levels0–5/7/8; Level6 N/A. Fresh package type/test/lint/build/format and tracked workspace/frozen install/validator/full controls/whitespace/scope hashes. Clean candidate/final qa-dev without dirty override; exact final actualCI both jobs/all14 real PostgreSQL suites, THREE recovery/both populated upgrades/exact schema/DEMO/owned+Compose cleanup and actual checkout parents/tree/full empty diff. Independent local acceptance/lifecycle/full controls and source/history audit; reviewer live GitHub readback blocked by explicit auto-review rejection, never retry or route around it. Root independently owns its authorized primary GitHub operations; attribute that evidence honestly. Local Docker/PostgreSQL/make unavailable unless fresh inventory proves otherwise; no system install/credentials/policy changes/paid calls.

Record actual results, cache/skips/warnings/findings and safe-to-commit/push/open/QA-only merge readiness. Ordinary scoped commit/push/sole draftPR/body/advisory/readiness authorized by continuing request. Final exact-head local QA/independent local acceptance/root actualCI/publication readback required. Human alone merges, no auto-merge/force/reset/amend/stash/branch deletion/deploy/tag/release. Max3 unsuccessful repairs per same unresolved defect. Root runs tests; user none. Learning objective: distinguish preserved authorization evidence from a newly simulated capture, single-capture arithmetic from a global funds budget, and capture from settlement. Stop HUMAN MERGE REQUIRED; verify actual03 merge before M05.04 Simulate payout created.

Permitted files: PLANS.md, README.md, START_HERE.md, WORKFLOW.md, docs/ACTIVE_DOCS.md, docs/INDEX.md, docs/ARCHITECTURE.md, docs/milestones/M05.md, docs/milestones/SUBMILESTONE_REGISTRY.md, docs/status/CAPABILITY_MATRIX.md, docs/status/CURRENT_STATE.md, docs/status/LOCAL_ENVIRONMENT_READINESS.md, docs/status/NEXT_RECOMMENDED_THREAD.md, docs/status/PROJECT_COMPLETION_GOAL.json, docs/status/PROJECT_COMPLETION_GOAL.md, docs/status/WEEKLY_LOG.md, docs/status/RISK_REGISTER.md, docs/status/TECH_DEBT.md, docs/status/OPEN_QUESTIONS.md, plans/ROADMAP.md, plans/active/CLP-0006-m05-provider-and-bank-simulator.md, packages/ledger/README.md, scripts/validate-control-plane.py, tests/test_control_plane_bootstrap.py, docs/specs/simulator-payment-captured.md, packages/simulator/README.md, packages/simulator/src/index.ts, packages/simulator/src/contract.ts, packages/simulator/src/payment-captured.ts, packages/simulator/test/ownership.test.ts, packages/simulator/test/contract-types.test.ts, packages/simulator/test/payment-captured.test.ts, packages/simulator/test/payment-captured-types.test.ts.

## Plan of Work

| ID | Existing submilestone | Dependencies | Acceptance and deterministic evidence |
| --- | --- | --- | --- |
| M05.01 | Create simulator package | Planning PR human-merged; verified M04 closeout; M03/domain/ADR-0008 | Create dedicated packages/simulator with reviewed ownership; freeze synthetic source/delivery/result interfaces and versioned manifests. Package/build/type/lint tests plus forbidden import/network/ledger-write checks; no connectors or evidence-store implementation. |
| M05.02 | Simulate payment authorized | M05.01 human-merged | Explicit synthetic authorized record, source/object/actor/currency/amount references and supplied event/observed clocks. Stable valid output; reject malformed identity/amount/currency/time without mutating inputs. Authorization metadata cannot establish financial authorization. |
| M05.03 | Simulate payment captured | M05.02 human-merged | Explicit capture referencing supplied authorization/payment identity. Exact minor-unit amount; preserve raw authorized record and references; test conflicting identity/currency and boundary amounts. No ledger posting or invented provider truth. |
| M05.04 | Simulate payout created | M05.03 human-merged | Explicit payout-created record with provider/payout references and supplied chronology. Test deterministic valid output and missing/conflicting references; aggregate membership policy must be frozen before implementation. |
| M05.05 | Simulate payout paid | M05.04 human-merged | Explicit payout-paid source record with stable payout identity and declared status/time. Test exact amounts/currency, stable references and contradictions; provider-paid metadata is not bank receipt or settlement confirmation. |
| M05.06 | Simulate payout failed | M05.05 human-merged | Explicit failed payout with supplied failure reason and retained original reference. Test failed-versus-paid conflict representation and incomplete evidence; never infer that missing bank evidence proves failure. |
| M05.07 | Simulate refund created | M05.06 human-merged | Explicit refund-created record with original captured payment/reference. Freeze full/partial/multiple-refund scenario policy using supplied context; exact amounts and no economic inference; reject malformed contexts without modifying originals. |
| M05.08 | Simulate refund paid | M05.07 human-merged | Explicit refund-paid record with the same declared refund occurrence and source linkage. Test independent raw records, stable amount/currency and contradictory status/time; no ledger reversal or repair approval. |
| M05.09 | Simulate dispute opened | M05.08 human-merged | Explicit dispute-opened record with original payment, reason and supplied clocks. Test missing/conflicting references and stable record output. An opened dispute does not imply a confirmed chargeback or money movement. |
| M05.10 | Simulate chargeback fee | M05.09 human-merged | Explicit chargeback-fee source evidence with exact fee amount/currency and declared dispute/payment references. Test chargeback-versus-fee distinction, malformed/large amounts and provenance; no fee inference or financial posting. |
| M05.11 | Simulate duplicate webhook | M05.10 human-merged | Paired benign and faulty duplicate-delivery scenarios. Distinct delivery/receipt IDs preserve one unchanged source occurrence; a separately declared faulty economic duplicate stays distinct. Test raw-byte/provenance preservation and exact occurrence-versus-delivery identity; no automatic deduplication or exactly-once claim. |
| M05.12 | Simulate delayed webhook | M05.11 human-merged | Delayed deliveries use explicit event time, observed time, delivery order and observation cutoff. Deterministic out-of-order examples and inclusive boundaries; retain original bytes and uncertainty until later evidence arrives; no sleeps or host clock. |
| M05.13 | Simulate missing webhook | M05.12 human-merged | Missing-delivery scenario retains explicit expected source occurrence, omission metadata and cutoff without fabricating a webhook. Test genuinely missing versus delayed-at-cutoff cases and unsupported conclusions; no incident verdict or deletion of existing evidence. |
| M05.14 | Simulate settlement CSV | M05.13 human-merged | Controlled settlement CSV with frozen version/dialect/header/order/encoding/escaping/row identities and exact decimal money. Golden bytes and malformed delimiter/quote/currency/reference/large-amount cases; immutable source rows, no ingestion/parser or bank confirmation. |
| M05.15 | Simulate bank statement CSV | M05.14 human-merged | Controlled bank statement CSV with independent bank/statement/line/payout references and supplied posting/file times. Golden bytes, quoted/newline/empty-field cases and declared mismatch/ambiguity; no bank credentials or inferred match. |
| M05.16 | Add deterministic seed support | M05.15 human-merged | Versioned deterministic seed support extends prior explicit-input deterministic scenarios. Same seed/config/version yields byte-identical manifests and outputs independent of host clock/randomness; test zero/bounds/malformed seeds, namespace collisions and version changes. |
| M05.17 | Add simulator CLI | M05.16 human-merged | Bounded simulator CLI with explicit scenario/version/seed/cutoff/output selection; stdout or newly owned output only. Test help/valid/invalid/unknown/exit codes/path bounds/create-only refusal of existing outputs; no network, credentials, database, ledger or agent tools. |
| M05.18 | Add fixture tests | M05.17 human-merged | Cross-feature fixtures broaden earlier per-feature tests; all nineteen rows remain separate. Golden independent outputs, paired benign/faulty duplicates, delays/omissions, CSV references, large exact amounts/currency isolation, input immutability and seed reproducibility. Existing M03 fixtures/seeds stay untouched. |
| M05.19 | QA simulator | M05.18 human-merged | Independent whole-M05 acceptance and executable controlled provider/webhook/settlement/bank demonstration. Verify all original rows, provenance/version/cutoffs, clean setup and exact-head CI. No source integration, financial truth, incident/invariant/replay/repair/agent/UI claim; separate milestone closeout after all nineteen human merges. |

## Concrete Steps

Implement only03 after verified83 merge; deterministic builder checks, independent local QA, sole PR/current actualCI, final tracking handoff/readback then human merge. No04 before verified03 merge.

## Validation and Acceptance

Candidate independent QA PASS on e8aa4daa4a824b8d18b80046912a7695f89f1f4a/tree3f2e7ee7aa1fb6a12df5da107dd69c108164bb5a: fresh470 simulator/7files,366 behavior,702 lifecycle and2727 controls in353.77s, package type/lint/build/format/validator/whitespace PASS; no findings. Canonical reviewer SHA2567569ac2ccb622e8f8030df7b5ee8ea1bf8ab4e7981575ace142e221536061b7d. Root clean candidate QA18 PASS/0 FAIL/1 optional localDocker skip, no dirtyoverride. Root primary CI39134527410 both jobs SUCCESS:470 simulator/1785 ledger/2727 controls and all14 realPostgreSQL1227/no skips; THREE migrations recovery, both populated upgrades, exactschema/DEMO and owned+Composecleanup PASS. Actual tested d106060952e6da93321f6b66014ddbc3ba5ea4a4 parentsb41+e8aa/tree3f2/full localdiffEMPTY independently checked locally. Source/control/tests/spec remain byte-identical through361 nontracking paths; only22 legitimate handoff/navigation/status files change. Final-head clean QA/currentCI/independent local acceptance/publication/readback are required external gates after this handoff commit, with no further CI-copy-only commit. Warm dependencies/Turbocache; no cold-cache, systeminstall, live-model or localPostgreSQL claim. Reviewer primary-network denial remains respected; actual current GitHub/CI evidence is root-verified and explicitly attributed.

Applicable Levels0–5/7/8; Level6 N/A. Root actual current CI and independent local exact-head QA are separate gates; no local PostgreSQL or cold-cache claim.

## Idempotence and Recovery

Pure deterministic memory-only generator; no input/raw evidence modification, storage, real capture or ledger mutation. Same branch/solePR for bounded fixes; max3 unsuccessful attempts per same unresolved defect. No denied-route retries or alternative credentials.

## Artifacts and Notes

Root-owned ignored base/scope/hash snapshots and verified83 proofs retained. New spec pins request/output/error/byte contracts. Actual final QA/CI evidence belongs in sole PR.

## Interfaces and Dependencies

Private @causalledger/simulator; zero runtime package dependencies. New21-field captured request and same readonly frozen generic manifest result. Only owned modules and deterministic node:crypto createHash. Existing02/generic source behavior unchanged.

## Outcomes & Retrospective

QA passed, awaiting merge. Complete exact-final-head clean QA, actual CI and independent local acceptance; publish canonical report/body/advisory and verify readiness, then PAUSED: HUMAN MERGE REQUIRED for sole PR84. Human alone Squash and merges. Verify actual84 merge before M05.04 Simulate payout created; later16 rows/M06–M21 remain closed. Root runs tests; user none. Native goal remains user-paused.

## Generated M05.03 builder and QA brief (2026-10-18)

Expected branch m05-03-simulate-payment-captured; base b41efac2cad75ef3dda986d3ccdb1d620ebc68c2; active CLP0006. Before edits run git branch --show-current, git status --short, git remote -v. Stop for wrong branch/unrelated dirt; root owns same-slice scoped dirt. Root sole editor/runtime owner; existing m04_02_qa independent local reviewer and static auditor reused. Serialize Python/pnpm; reviewer runtime HOLD until clean committed candidate release. No new agents/chats/native goals; native goal stays user-paused.

Own generatePaymentCaptured(unknown), strict21-field request: schemaVersion, synthetic, scenarioId, observationCutoff, sourceId, sourceOccurrenceId, sourceRecordId, eventTime, deliveryId, receiptDescriptorId, observedAt, deliveryOrder, providerId, merchantId, payerId, paymentId, authorizationId, captureId, amountMinorUnits, currency, authorizationManifest. Fixed m05.03-payment-captured-request.v1/record.v1 and m05.03-payment-captured.v1 generator. New sim_capture_ identity, prior simulator grammar unchanged. Capture context is the supplied prior generated02 manifest: generic validation/snapshot first, exactly1 provider source/1 delivery, fixed02 generator and application/json; parse only owned02 wire and reconstruct with unchanged generatePaymentAuthorized, require exact full checked manifest/rawtext/hash. Generic hash validity alone is not semantic authorization validation. Input snapshots captured once; no caller rereads, getters/toJSON execution or partial output.

Capture body/metadata uses unchanged02 generator as a safe throwaway probe with context derived from validated ORIGINAL authorization roles/source/currency. Matching authorizationId and all context; distinct capture occurrence and descriptor/delivery/receipt/order identities. Positive canonical1–128digit exact strings, no Number conversion; compare BigInt only after validation, single full or partial capture<=supplied authorized amount. Known canonical UTC capture eventTime must be>=authorization eventTime using padded comparison keys only; original raw timestamps unchanged. This is the bounded fixture policy, not a universal provider rule, authenticity/ownership/funds/expiry/real chronology proof. No cumulative multi-capture budget or consumed authorization across calls. Independent observed clocks/order/cutoff remain supplied declarations, including out-of-order/future observations; no filtering, sorting or inferred receipts.

Success same frozen manifest result shape: NEW composition with original authorized source and delivery first, capture second; source text/hash/IDs/eventTime and delivery metadata preserved exactly. New top scenario/cutoff/generator describe03 composition, not unchanged prior whole manifest. Fixed compact UTF8 raw capture keys: schemaVersion, synthetic, eventType payment_captured, sourceId, sourceOccurrenceId, providerId, paymentId, authorizationId, captureId, merchantId, payerId, amount{minorUnits,currency,representation}, authorizationReference{sourceId,sourceOccurrenceId,payloadSha256}, eventTime. Citation hash comes from validated ORIGINAL prior source, never throwaway probe. Descriptor/scenario/delivery/observed/order/cutoff excluded from raw occurrence bytes; original descriptor references retained in composed manifest. Exact SHA256/no BOM/newline. Stable issues/no partial value. Prior issues prefixed $.authorizationManifest; current context/index1 paths mapped to request fields. Prior shape/owned wire, capture body and relational phases short-circuit with deterministic ordering.

Acceptance: independent literal auth/capture golden bytes+hashes; full/partial/equal/max128digits/overcapture and lexical-vs-numeric boundaries; wrong refs/currency/kind/schema/metadata/payload with recomputed valid hash; noncanonical/duplicate/unknown owned-wire fields; strict root shape/hostile descriptors/actual caller mutation via prior traps; frozen detached input/output; exact original source+delivery preservation; current/prior descriptor and observation-only changes preserve raw bytes; strict UTC equality Z/.000Z,+/-1ms/year boundaries, no observed-order inference; types/import ownership; prior02/generic tests retained unchanged except truthful boundary flag/assertion/import allowlist.

Preserve full merged02 plan including nested01/planning histories; raw18/19 acceptance rows, V1/prior proofs, financial/event sources/tests/specs/fixtures, all14 database children/THREE DDL/CI/root and package manifests/config/lock. No M05.04+ payout/refund/dispute/fee/duplicate/delay/missing/CSV/seed/CLI or financial-write/ingestion/parser integration. Internal02 wire reconstruction is not an external provider adapter or canonical mapping.

Validation Levels0–5/7/8; Level6 N/A. Fresh package type/test/lint/build/format and tracked workspace/frozen install/validator/full controls/whitespace/scope hashes. Clean candidate/final qa-dev without dirty override; exact final actualCI both jobs/all14 real PostgreSQL suites, THREE recovery/both populated upgrades/exact schema/DEMO/owned+Compose cleanup and actual checkout parents/tree/full empty diff. Independent local acceptance/lifecycle/full controls and source/history audit; reviewer live GitHub readback blocked by explicit auto-review rejection, never retry or route around it. Root independently owns its authorized primary GitHub operations; attribute that evidence honestly. Local Docker/PostgreSQL/make unavailable unless fresh inventory proves otherwise; no system install/credentials/policy changes/paid calls.

Record actual results, cache/skips/warnings/findings and safe-to-commit/push/open/QA-only merge readiness. Ordinary scoped commit/push/sole draftPR/body/advisory/readiness authorized by continuing request. Final exact-head local QA/independent local acceptance/root actualCI/publication readback required. Human alone merges, no auto-merge/force/reset/amend/stash/branch deletion/deploy/tag/release. Max3 unsuccessful repairs per same unresolved defect. Root runs tests; user none. Learning objective: distinguish preserved authorization evidence from a newly simulated capture, single-capture arithmetic from a global funds budget, and capture from settlement. Stop HUMAN MERGE REQUIRED; verify actual03 merge before M05.04 Simulate payout created.

## M05.03 current checkpoint (2026-10-18)

M00–M04 are closed; V1_PUBLIC_PRODUCT remains approved. M05.01 and M05.02 are Completed and merged in verified PR82/PR83. M05.03 Simulate payment captured is QA passed, awaiting merge for sole PR #84 on m05-03-simulate-payment-captured under plans/active/CLP-0006-m05-provider-and-bank-simulator.md. Synthetic capture composition is implemented; M05.04–M05.19 and M06–M21 remain Not started/unbound.

Candidate independent QA PASS on e8aa4daa4a824b8d18b80046912a7695f89f1f4a/tree3f2e7ee7aa1fb6a12df5da107dd69c108164bb5a: fresh470 simulator/7files,366 behavior,702 lifecycle and2727 controls in353.77s, package type/lint/build/format/validator/whitespace PASS; no findings. Canonical reviewer SHA2567569ac2ccb622e8f8030df7b5ee8ea1bf8ab4e7981575ace142e221536061b7d. Root clean candidate QA18 PASS/0 FAIL/1 optional localDocker skip, no dirtyoverride. Root primary CI39134527410 both jobs SUCCESS:470 simulator/1785 ledger/2727 controls and all14 realPostgreSQL1227/no skips; THREE migrations recovery, both populated upgrades, exactschema/DEMO and owned+Composecleanup PASS. Actual tested d106060952e6da93321f6b66014ddbc3ba5ea4a4 parentsb41+e8aa/tree3f2/full localdiffEMPTY independently checked locally. Source/control/tests/spec remain byte-identical through361 nontracking paths; only22 legitimate handoff/navigation/status files change. Final-head clean QA/currentCI/independent local acceptance/publication/readback are required external gates after this handoff commit, with no further CI-copy-only commit. Warm dependencies/Turbocache; no cold-cache, systeminstall, live-model or localPostgreSQL claim. Reviewer primary-network denial remains respected; actual current GitHub/CI evidence is root-verified and explicitly attributed.

Complete exact-final-head clean QA, actual CI and independent local acceptance; publish canonical report/body/advisory and verify readiness, then PAUSED: HUMAN MERGE REQUIRED for sole PR84. Human alone Squash and merges. Verify actual84 merge before M05.04 Simulate payout created; later16 rows/M06–M21 remain closed. Root runs tests; user none. Native goal remains user-paused.

## Historical merged M05.02 record (immutable)

# CLP-0006 M05 Provider and Bank Simulator

## Purpose / Big Picture

Generate exactly one labelled synthetic payment_authorized occurrence and delivery from explicit validated input. This is offline evidence simulation; it cannot authorize, capture, settle or post money.

## Progress

- [x] Verified human PR82 merge/main/tree and published exact-head bindings.
- [x] M05.02 implementation and builder validation.
- [x] Independent candidate QA, sole PR and actual CI.
- [ ] Final tracking-head gates and human merge.
- [ ] Human02 merge verified before03.

Current planning review: Completed and merged

Sole merged M05 planning PR #81

Current package review: Completed and merged

Sole merged M05.01 PR #82

Current authorization review: QA passed, awaiting merge

Sole proposed M05.02 PR #83

## Surprises & Discoveries

The initial design checkpoint had no runtime results. Builder293 simulator/full2559 controls, clean candidate QA18/0/1, independent412 behavioral/607 lifecycle/full2559 and actual candidate CI now passed. Final tracking-head gates/human merge remain. Capture all own properties once and serialize validated primitives only.

## Decision Log

Preserve all original IDs/names/acceptance and V1 approval. Reuse unchanged generic manifest validator; synthetic role IDs and per-call context equality confer no ownership or financial authorization. Positive canonical amount1–128digits and known UTC event time are explicit02 restrictions.

## Context and Orientation

Human PR82 merged ac092fcb7b0ee16459b1ca1177d4b9b10e0df5ce at 2026-10-16T14:20:14Z by nonbot Islem-Rezzag. Reviewed b0c0e32daf91d95cd9bff555a766dadc0cfc7501 and squash have identical tree 0d2f821264fc0c55ae6ed77eb4ebc65729776014, full diff EMPTY and fetched-main reachability PASS. Root and existing independent reviewer verified primary merge/CI/body/advisory6153826833/canonical reviewer hash bindings. Final simulator107, lifecycle540, controls2397, root clean18/0/1 and both CI38455025292 PASS; ledger1785 and all14 real PostgreSQL suites1227/no skips, recovery/upgrades/schema/DEMO/cleanup PASS. Prior candidate309 behavior probes were carried through356 byte-identical nontracking files, not rerun as fresh final probes. No unchanged01 tests rerun merely to verify merge.

Completed M04 plan remains plans/completed/CLP-0005-m04-double-entry-ledger-core.md. Full merged01 plan and nested original planning history follow the immutable marker.

## Scope

Expected branch m05-02-simulate-payment-authorized; base ac092fcb7b0ee16459b1ca1177d4b9b10e0df5ce; active CLP0006. Before every edit run git branch --show-current, git status --short, git remote -v. Stop for wrong branch/unrelated dirt; own scoped dirt belongs to this slice. Root sole editor/runtime owner; existing m04_02_qa independent reviewer and static auditor reused. Reviewer runtime HOLD until clean committed candidate release; serialize Python/pnpm. No new chats/agents/native goals; native goal remains user-paused.

Implement only generatePaymentAuthorized(unknown): strict 20-field request and6-field declared context, fixed request/record/generator versions, supplied simulator-scoped role IDs and source/occurrence/descriptor/delivery identities, exact positive decimal string1–128digits, uppercase3ASCII currency with exact caller context equality, required known canonical UTC event time and independent declared observed time/cutoff/order. Positive-only/known-time/resource bounds are feature policies, not external financial rules. No normalization, defaulting, Number money conversion, authoritative ISO catalogue or owner/authenticity inference.

Capture own enumerable data once without invoking getters. Validate body primitives/context, delegate source/delivery/clock semantics to unchanged generic validator using safe placeholder payload, then serialize validated primitives only. Fixed compact JSON key order/no newline/BOM, payment_authorized/synthetic marker, exact UTF8 SHA256. Raw occurrence excludes scenario/descriptor/delivery/observed/order/cutoff. One source record and one declared delivery; full manifest returned frozen/detached. Stable ordered code/path issues and no partial output. Metadata-only changes must preserve raw bytes/hash. No host clock/randomness/network/process or financial dependencies.

Acceptance: independent literal golden bytes/hash, repeated calls/key order, huge exact amounts and128/129digit bounds, role/context/currency/identity/full-span UTC failures, hostile own descriptors/classes/symbols/hidden fields/Proxy errors, no getter/toJSON execution, unchanged caller input, frozen detached results, type-negative union/readonly checks and expanded exact-owned import guard. Generic validator behavior and original tests remain intact except truthful provider boundary flags/import ownership allowlist. Narrow lifecycle gate/history/proof/package-footprint controls and positive-before-negative historical fixtures.

Validation applicable Levels0–5/7/8; Level6 N/A (benchmark unimplemented). Fresh package type/test/lint/build/format; full workspace tracked QA/frozen lock install and full controls/whitespace/scope hash audit. Clean candidate/final QA without dirty override; final actual CI bothjobs/all14 unchanged mandatory PostgreSQL suites, migration recovery/populated upgrades/schema/DEMO/owned+Compose cleanup and actual synthetic checkout parent/tree/full diff. Local Docker/PostgreSQL/make unavailable; record actual skips/warm caches and warnings. No installs/policy changes/live model calls. Root runs tests; user none.

Preserve full merged M05.01 active plan including original29375-byte planning record, original18/19 rows, all prior proof/V1, financial/events source/tests/specs/fixtures, runner/THREE migrations/CI/root manifests/config/lock/dependency snapshots. No future captured/payout/refund/dispute/fee/duplicate/delay/missing/CSV/seed/CLI implementation. No ledger/evidence/raw-event mutation, approval, provider call or authenticity claim.

Scoped ordinary commits/push/sole draftPR/body/advisory/readiness authorized by continuing instruction. Root records builder and independent findings/commands/results/skips/risks/current status. Final exact-head root+independent QA/both actual CI and published SHA-bound readback/readiness required. Human alone merges; no auto-merge/force/amend/reset/stash/branch deletion/deploy/tag/release. Max3 unsuccessful repairs per same unresolved defect. Stop HUMAN MERGE REQUIRED; verify actual merge before M05.03 Simulate payment captured.

Permitted files: PLANS.md, README.md, START_HERE.md, WORKFLOW.md, docs/ACTIVE_DOCS.md, docs/INDEX.md, docs/ARCHITECTURE.md, docs/milestones/M05.md, docs/milestones/SUBMILESTONE_REGISTRY.md, docs/status/CAPABILITY_MATRIX.md, docs/status/CURRENT_STATE.md, docs/status/LOCAL_ENVIRONMENT_READINESS.md, docs/status/NEXT_RECOMMENDED_THREAD.md, docs/status/PROJECT_COMPLETION_GOAL.json, docs/status/PROJECT_COMPLETION_GOAL.md, docs/status/WEEKLY_LOG.md, docs/status/RISK_REGISTER.md, docs/status/TECH_DEBT.md, docs/status/OPEN_QUESTIONS.md, plans/ROADMAP.md, plans/active/CLP-0006-m05-provider-and-bank-simulator.md, packages/ledger/README.md, scripts/validate-control-plane.py, tests/test_control_plane_bootstrap.py, docs/specs/simulator-payment-authorized.md, packages/simulator/README.md, packages/simulator/src/index.ts, packages/simulator/src/contract.ts, packages/simulator/src/payment-authorized.ts, packages/simulator/test/ownership.test.ts, packages/simulator/test/contract-types.test.ts, packages/simulator/test/payment-authorized.test.ts, packages/simulator/test/payment-authorized-types.test.ts.

## Plan of Work

| ID | Existing submilestone | Dependencies | Acceptance and deterministic evidence |
| --- | --- | --- | --- |
| M05.01 | Create simulator package | Planning PR human-merged; verified M04 closeout; M03/domain/ADR-0008 | Create dedicated packages/simulator with reviewed ownership; freeze synthetic source/delivery/result interfaces and versioned manifests. Package/build/type/lint tests plus forbidden import/network/ledger-write checks; no connectors or evidence-store implementation. |
| M05.02 | Simulate payment authorized | M05.01 human-merged | Explicit synthetic authorized record, source/object/actor/currency/amount references and supplied event/observed clocks. Stable valid output; reject malformed identity/amount/currency/time without mutating inputs. Authorization metadata cannot establish financial authorization. |
| M05.03 | Simulate payment captured | M05.02 human-merged | Explicit capture referencing supplied authorization/payment identity. Exact minor-unit amount; preserve raw authorized record and references; test conflicting identity/currency and boundary amounts. No ledger posting or invented provider truth. |
| M05.04 | Simulate payout created | M05.03 human-merged | Explicit payout-created record with provider/payout references and supplied chronology. Test deterministic valid output and missing/conflicting references; aggregate membership policy must be frozen before implementation. |
| M05.05 | Simulate payout paid | M05.04 human-merged | Explicit payout-paid source record with stable payout identity and declared status/time. Test exact amounts/currency, stable references and contradictions; provider-paid metadata is not bank receipt or settlement confirmation. |
| M05.06 | Simulate payout failed | M05.05 human-merged | Explicit failed payout with supplied failure reason and retained original reference. Test failed-versus-paid conflict representation and incomplete evidence; never infer that missing bank evidence proves failure. |
| M05.07 | Simulate refund created | M05.06 human-merged | Explicit refund-created record with original captured payment/reference. Freeze full/partial/multiple-refund scenario policy using supplied context; exact amounts and no economic inference; reject malformed contexts without modifying originals. |
| M05.08 | Simulate refund paid | M05.07 human-merged | Explicit refund-paid record with the same declared refund occurrence and source linkage. Test independent raw records, stable amount/currency and contradictory status/time; no ledger reversal or repair approval. |
| M05.09 | Simulate dispute opened | M05.08 human-merged | Explicit dispute-opened record with original payment, reason and supplied clocks. Test missing/conflicting references and stable record output. An opened dispute does not imply a confirmed chargeback or money movement. |
| M05.10 | Simulate chargeback fee | M05.09 human-merged | Explicit chargeback-fee source evidence with exact fee amount/currency and declared dispute/payment references. Test chargeback-versus-fee distinction, malformed/large amounts and provenance; no fee inference or financial posting. |
| M05.11 | Simulate duplicate webhook | M05.10 human-merged | Paired benign and faulty duplicate-delivery scenarios. Distinct delivery/receipt IDs preserve one unchanged source occurrence; a separately declared faulty economic duplicate stays distinct. Test raw-byte/provenance preservation and exact occurrence-versus-delivery identity; no automatic deduplication or exactly-once claim. |
| M05.12 | Simulate delayed webhook | M05.11 human-merged | Delayed deliveries use explicit event time, observed time, delivery order and observation cutoff. Deterministic out-of-order examples and inclusive boundaries; retain original bytes and uncertainty until later evidence arrives; no sleeps or host clock. |
| M05.13 | Simulate missing webhook | M05.12 human-merged | Missing-delivery scenario retains explicit expected source occurrence, omission metadata and cutoff without fabricating a webhook. Test genuinely missing versus delayed-at-cutoff cases and unsupported conclusions; no incident verdict or deletion of existing evidence. |
| M05.14 | Simulate settlement CSV | M05.13 human-merged | Controlled settlement CSV with frozen version/dialect/header/order/encoding/escaping/row identities and exact decimal money. Golden bytes and malformed delimiter/quote/currency/reference/large-amount cases; immutable source rows, no ingestion/parser or bank confirmation. |
| M05.15 | Simulate bank statement CSV | M05.14 human-merged | Controlled bank statement CSV with independent bank/statement/line/payout references and supplied posting/file times. Golden bytes, quoted/newline/empty-field cases and declared mismatch/ambiguity; no bank credentials or inferred match. |
| M05.16 | Add deterministic seed support | M05.15 human-merged | Versioned deterministic seed support extends prior explicit-input deterministic scenarios. Same seed/config/version yields byte-identical manifests and outputs independent of host clock/randomness; test zero/bounds/malformed seeds, namespace collisions and version changes. |
| M05.17 | Add simulator CLI | M05.16 human-merged | Bounded simulator CLI with explicit scenario/version/seed/cutoff/output selection; stdout or newly owned output only. Test help/valid/invalid/unknown/exit codes/path bounds/create-only refusal of existing outputs; no network, credentials, database, ledger or agent tools. |
| M05.18 | Add fixture tests | M05.17 human-merged | Cross-feature fixtures broaden earlier per-feature tests; all nineteen rows remain separate. Golden independent outputs, paired benign/faulty duplicates, delays/omissions, CSV references, large exact amounts/currency isolation, input immutability and seed reproducibility. Existing M03 fixtures/seeds stay untouched. |
| M05.19 | QA simulator | M05.18 human-merged | Independent whole-M05 acceptance and executable controlled provider/webhook/settlement/bank demonstration. Verify all original rows, provenance/version/cutoffs, clean setup and exact-head CI. No source integration, financial truth, incident/invariant/replay/repair/agent/UI claim; separate milestone closeout after all nineteen human merges. |

## Concrete Steps

Implement only02; validate/fix scoped findings, independent QA, sole PR, exact-head CI/readback and human merge. Do not begin03 before verified02 merge.

## Validation and Acceptance

Candidate48268c1b51a7d6a48f51d53eb6315d286af8e19f/treeedf15f43c0de2cff8828285709ac5dea3a1fd1b6 independently reviewed PASS_WITH_TRACKING_FIXES (two bounded P3 current-wording corrections, resolved in this handoff). Fresh simulator293/5files/typecheck/lint/build/format,412 behavioral probes,607 lifecycle/provenance probes and full2559 controls in341.69s PASS. Canonical reviewer JSON SHA25672d69b22d1f6e3ad9d5ffa84fa0d9c16c08e035c371a5c185ac0d6280d337765. Root cleanQA18 PASS/0 FAIL/1 optional Docker skip, no dirty override. Both actual CI38918731251 jobs PASS: simulator293, ledger1785/32files, controls2559 and all14 real PostgreSQL suites1227/no skips; THREE recovery/both populated preservation upgrades/exact schema/DEMO/owned+Compose cleanup PASS. Both tested checkouts1bc248dfc78d4944e16bcc49b71799919bdc23ff have expectedac092+48268parents/sameedf15tree/full localdiff EMPTY. Scope33/protected346/full61000-byte merged01 and nested29375-byte planning history/raw18+19/V1/prior proofs/weekly prefix/generic validator+tests/config/lock PASS. Final actual tracking-head root/independent acceptance/current CI/published SHA-bound readback/readiness still required before human merge. Warm caches; local Docker/PostgreSQL/make unavailable; no install/policy/live-model changes. Root runs tests; user none. Applicable Levels0–5/7/8; Level6 N/A. Clean final exact-head acceptance/readiness remains required.

## Idempotence and Recovery

Pure deterministic function; no writes or side effects. Same branch/sole PR for bounded corrections; max3 unsuccessful repairs per same unresolved defect. Preserve caller input and immutable history.

## Artifacts and Notes

Ignored root-owned scope/base/hash snapshots and primary merge proofs retained. Product spec owns versioned input/output/error examples; actual candidate/final evidence belongs in sole PR.

## Interfaces and Dependencies

Private @causalledger/simulator; zero runtime dependencies. Fixed20-field unknown request and6-field context; frozen manifest result. Only owned modules and node:crypto createHash. Generic manifest version unchanged.

## Outcomes & Retrospective

QA passed, awaiting merge. Candidate48268c1b51a7d6a48f51d53eb6315d286af8e19f/treeedf15f43c0de2cff8828285709ac5dea3a1fd1b6 independently reviewed PASS_WITH_TRACKING_FIXES (two bounded P3 current-wording corrections, resolved in this handoff). Fresh simulator293/5files/typecheck/lint/build/format,412 behavioral probes,607 lifecycle/provenance probes and full2559 controls in341.69s PASS. Canonical reviewer JSON SHA25672d69b22d1f6e3ad9d5ffa84fa0d9c16c08e035c371a5c185ac0d6280d337765. Root cleanQA18 PASS/0 FAIL/1 optional Docker skip, no dirty override. Both actual CI38918731251 jobs PASS: simulator293, ledger1785/32files, controls2559 and all14 real PostgreSQL suites1227/no skips; THREE recovery/both populated preservation upgrades/exact schema/DEMO/owned+Compose cleanup PASS. Both tested checkouts1bc248dfc78d4944e16bcc49b71799919bdc23ff have expectedac092+48268parents/sameedf15tree/full localdiff EMPTY. Scope33/protected346/full61000-byte merged01 and nested29375-byte planning history/raw18+19/V1/prior proofs/weekly prefix/generic validator+tests/config/lock PASS. Final actual tracking-head root/independent acceptance/current CI/published SHA-bound readback/readiness still required before human merge. Warm caches; local Docker/PostgreSQL/make unavailable; no install/policy/live-model changes. Root runs tests; user none. Root runs tests; user none. Native goal remains user-paused.

## Generated M05.02 builder and QA brief (2026-10-16)

Expected branch m05-02-simulate-payment-authorized; base ac092fcb7b0ee16459b1ca1177d4b9b10e0df5ce; active CLP0006. Before every edit run git branch --show-current, git status --short, git remote -v. Stop for wrong branch/unrelated dirt; own scoped dirt belongs to this slice. Root sole editor/runtime owner; existing m04_02_qa independent reviewer and static auditor reused. Reviewer runtime HOLD until clean committed candidate release; serialize Python/pnpm. No new chats/agents/native goals; native goal remains user-paused.

Implement only generatePaymentAuthorized(unknown): strict 20-field request and6-field declared context, fixed request/record/generator versions, supplied simulator-scoped role IDs and source/occurrence/descriptor/delivery identities, exact positive decimal string1–128digits, uppercase3ASCII currency with exact caller context equality, required known canonical UTC event time and independent declared observed time/cutoff/order. Positive-only/known-time/resource bounds are feature policies, not external financial rules. No normalization, defaulting, Number money conversion, authoritative ISO catalogue or owner/authenticity inference.

Capture own enumerable data once without invoking getters. Validate body primitives/context, delegate source/delivery/clock semantics to unchanged generic validator using safe placeholder payload, then serialize validated primitives only. Fixed compact JSON key order/no newline/BOM, payment_authorized/synthetic marker, exact UTF8 SHA256. Raw occurrence excludes scenario/descriptor/delivery/observed/order/cutoff. One source record and one declared delivery; full manifest returned frozen/detached. Stable ordered code/path issues and no partial output. Metadata-only changes must preserve raw bytes/hash. No host clock/randomness/network/process or financial dependencies.

Acceptance: independent literal golden bytes/hash, repeated calls/key order, huge exact amounts and128/129digit bounds, role/context/currency/identity/full-span UTC failures, hostile own descriptors/classes/symbols/hidden fields/Proxy errors, no getter/toJSON execution, unchanged caller input, frozen detached results, type-negative union/readonly checks and expanded exact-owned import guard. Generic validator behavior and original tests remain intact except truthful provider boundary flags/import ownership allowlist. Narrow lifecycle gate/history/proof/package-footprint controls and positive-before-negative historical fixtures.

Validation applicable Levels0–5/7/8; Level6 N/A (benchmark unimplemented). Fresh package type/test/lint/build/format; full workspace tracked QA/frozen lock install and full controls/whitespace/scope hash audit. Clean candidate/final QA without dirty override; final actual CI bothjobs/all14 unchanged mandatory PostgreSQL suites, migration recovery/populated upgrades/schema/DEMO/owned+Compose cleanup and actual synthetic checkout parent/tree/full diff. Local Docker/PostgreSQL/make unavailable; record actual skips/warm caches and warnings. No installs/policy changes/live model calls. Root runs tests; user none.

Preserve full merged M05.01 active plan including original29375-byte planning record, original18/19 rows, all prior proof/V1, financial/events source/tests/specs/fixtures, runner/THREE migrations/CI/root manifests/config/lock/dependency snapshots. No future captured/payout/refund/dispute/fee/duplicate/delay/missing/CSV/seed/CLI implementation. No ledger/evidence/raw-event mutation, approval, provider call or authenticity claim.

Scoped ordinary commits/push/sole draftPR/body/advisory/readiness authorized by continuing instruction. Root records builder and independent findings/commands/results/skips/risks/current status. Final exact-head root+independent QA/both actual CI and published SHA-bound readback/readiness required. Human alone merges; no auto-merge/force/amend/reset/stash/branch deletion/deploy/tag/release. Max3 unsuccessful repairs per same unresolved defect. Stop HUMAN MERGE REQUIRED; verify actual merge before M05.03 Simulate payment captured.


## M05.02 builder corrections (2026-10-16)

Initial generated control constant token replacement caused syntax failure and was corrected before validator PASS. Scoped status vocabulary/current-state active-plan/source-neutral wording were corrected without changing old controls. Simulator293 runtime tests passed; initial test-only callback/record typing was corrected and package type/lint/build passed. Focused lifecycle309PASS/1 failed found a row-mutation test targeted an earlier brief phrase rather than the owning matrix; now mutates the exact row. Static auditor found the capture regression mutated a separate object; it now passes the same caller object changed by the context trap. No contract weakening or financial scope expansion. Full controls/workspace and independent acceptance pending.


## M05.02 builder handoff (2026-10-16)

Builder simulator293/5files/typecheck/lint/build/format PASS; fresh corrected capture regression and executable authorization demonstration PASS. Full2559 controls, validator/whitespace and workspace frozen install/type/lint/tests/build PASS. Intermediate dirty-override root QA16 PASS/1 formatting FAIL/2 expected skips; scoped ledger README formatting then corrected and its full package format check PASS. Clean committed candidate root QA still required. Existing separate-context static reviewer/auditor verified33 scoped/346 protected files/full61000-byte merged01 history/nested29375 planning/raw19/V1/prior proofs/weekly prefix/generic validator+tests/config/lock; no source defect, current GoalMD P3 corrected in this handoff. Independent runtime/current CI pending. Warm caches; optional local Docker/PostgreSQL/make unavailable; existing glob deprecation/esbuild ignored build-script warnings, no policy/install changes. Mandatory real database proof remains in unchanged CI route.

Changed33 scoped files: owned generator/type/unit tests/spec plus narrow lifecycle controls and current metadata. All346 protected tracked files, entire61000-byte merged01 plan/nested29375 planning record/raw18+19/V1/prior proofs and append-only weekly preserved. Generic validator/tests/package manifests/config/lock unchanged. No financial/event/runner/DDL/CI/fixtures/source integration/future03+ work.

Safe-to-commit/push/open sole draftPR after scope/whitespace guard; overall QA/safe-to-merge pending. Verify clean committed candidate root/independent QA, actual CI and sole PR; record final handoff before human merge. Root runs tests; user none.


Learning objective: distinguish an exact synthetic authorization occurrence from a real payment approval, and distinguish stable source bytes from independently declared delivery metadata. Current handoff next-thread labels were restored after validator identified missing Precondition/Scope headings.


## M05.02 independent candidate QA and final handoff (2026-10-16)

Candidate48268c1b51a7d6a48f51d53eb6315d286af8e19f/treeedf15f43c0de2cff8828285709ac5dea3a1fd1b6 independently reviewed PASS_WITH_TRACKING_FIXES (two bounded P3 current-wording corrections, resolved in this handoff). Fresh simulator293/5files/typecheck/lint/build/format,412 behavioral probes,607 lifecycle/provenance probes and full2559 controls in341.69s PASS. Canonical reviewer JSON SHA25672d69b22d1f6e3ad9d5ffa84fa0d9c16c08e035c371a5c185ac0d6280d337765. Root cleanQA18 PASS/0 FAIL/1 optional Docker skip, no dirty override. Both actual CI38918731251 jobs PASS: simulator293, ledger1785/32files, controls2559 and all14 real PostgreSQL suites1227/no skips; THREE recovery/both populated preservation upgrades/exact schema/DEMO/owned+Compose cleanup PASS. Both tested checkouts1bc248dfc78d4944e16bcc49b71799919bdc23ff have expectedac092+48268parents/sameedf15tree/full localdiff EMPTY. Scope33/protected346/full61000-byte merged01 and nested29375-byte planning history/raw18+19/V1/prior proofs/weekly prefix/generic validator+tests/config/lock PASS. Final actual tracking-head root/independent acceptance/current CI/published SHA-bound readback/readiness still required before human merge. Warm caches; local Docker/PostgreSQL/make unavailable; no install/policy/live-model changes. Root runs tests; user none.

Changed33 scoped files: owned generator/type/unit tests/spec plus narrow lifecycle controls and current metadata. All346 protected tracked files, entire61000-byte merged01 plan/nested29375 planning record/raw18+19/V1/prior proofs and append-only weekly preserved. Generic validator/tests/package manifests/config/lock unchanged. No financial/event/runner/DDL/CI/fixtures/source integration/future03+ work.

Candidate independent QA PASS; own PR83 is now bound in tracking. Candidate source/tests/spec/control/config/lock and all protected/history bytes must remain unchanged through this legitimate final metadata handoff. Final actual-head root/independent checks/both CI/published readback/readiness remain required before human merge; final evidence belongs in sole PR, no CI-copy-only commit. Verify final committed tracking-head root/independent QA/both actual CI/published SHA-bound readback/readiness; human Squash and merge PR83; verify actual merge before M05.03 Simulate payment captured. Root runs tests; user none.


## M05.02 bounded final tracking corrections (2026-10-16)

Candidate reviewer PASS_WITH_TRACKING_FIXES identified two P3 current-wording findings: owning Surprises still described initial no-runtime state, and seven current navigation/architecture paragraphs still said full workspace pending. Both corrected in this legitimate final handoff, preserving dated records and complete immutable merged01 history. No source/tests/spec/control/config/lock or protected financial bytes changed. Final root/independent/currentCI/readback required.

## Historical merged M05.01 record (immutable)

# CLP-0006 M05 Provider and Bank Simulator

## Purpose / Big Picture

Create M05.01 simulator package foundation after verified planning merge. Implement only readonly synthetic descriptor contracts, versioned manifests and deterministic structural/integrity validation. Later provider/bank generation remains unimplemented; synthetic metadata cannot establish financial truth.

## Progress

- [x] 2026-10-13: Verified human planning PR81 merge/main/tree/published bindings; safely synchronized main and passed clean m05-01-create-simulator-package guard.
- [x] M05.01 package/contracts/tests and scoped control/tracking updates.
- [x] Builder validation.
- [x] Clean candidate publication: sole draft PR82.
- [x] Independent candidate QA and both actual CI jobs.
- [ ] Final tracking-head QA, actual CI and published readiness.
- [ ] Human M05.01 merge verified before M05.02.

Current planning review: Completed and merged

Sole merged M05 planning PR #81

Current package review: QA passed, awaiting merge

Sole proposed M05.01 PR #82

## Surprises & Discoveries

Planning PR81 is verified merged; row01 now creates the accepted dedicated owner. Existing app fallback pnpm11 lacked offline policy metadata; the already installed repository-pinned pnpm10.32.1 succeeded offline without downloads. No package/dependency upgrade or policy/configuration change. Node production typing and descriptor typing were corrected before behavioral101 tests passed; a type-negative test's bare expression needed a lint-compatible void expression. That initial correction checkpoint preceded completed builder/control/workspace and candidate independent QA; final tracking-head gates remain.

## Decision Log

- Preserve all original IDs/names; no consolidation, deferral, renamed acceptance, scope expansion or new V1 approval.
- Proposed packages/simulator owns offline synthetic source generation; connectors keep external adapters, evidence keeps capture/storage, events keeps canonical validation and ledger keeps financial primitives.
- Source occurrence, canonical event, delivery/receipt and posting identities are distinct. Duplicates preserve deliveries and original source bytes; faulty duplicate occurrences remain explicit. No inferred exactly-once economic claim.
- Rows01–15 use explicit deterministic inputs; row16 adds versioned seed support. row17 owns CLI execution and output controls; row18 broadens tests already present for each feature; row19 whole milestone QA; then separate formal closeout.
- Freeze exact versioned amounts/currencies/IDs/provenance/CSV dialect/supplied clocks and reproducibility in owning implementation briefs. No Number conversion for money, hidden host clock/randomness or ledger/posting dependency.

## Context and Orientation

Human PR81 merged at 6b755d57bf0f03f1618aea1096cc99e1876e4bed on 2026-10-13T17:25:57Z by nonbot Islem-Rezzag. Reviewed b18b047fe87ed8eafa6d9756ca7db5c9d569291f and actual merge have tree 4f45bfdfbc063966766f9a347a1fccd3f4d237ca, full diff EMPTY and fetched-main reachability PASS. Root and existing independent reviewer verified primary merge/CI/body/advisory6128785198/reviewer hash bindings. Final planning QA441 lifecycle/2252 controls/rootclean18/0/1/bothCI38273448464 passed;1785 ledger/32files/all14 PostgreSQL1227/THREE recovery/both populated upgrades/schema/DEMO/cleanup passed. No unchanged planning tests rerun to verify merge.

Completed M04 plan remains plans/completed/CLP-0005-m04-double-entry-ledger-core.md; all18 prior requirements and historical packet are unchanged. One active CLP0006 preserves all19 original M05 rows below.

## Scope

Expected branch m05-01-create-simulator-package; active CLP0006; base 6b755d57bf0f03f1618aea1096cc99e1876e4bed. Before every edit run git branch --show-current; git status --short; git remote -v. Stop for wrong branch/unrelated dirt; own scoped dirt is part of this slice. Root sole editor/main validation owner; existing m04_02_qa independent reviewer and static auditor reused. Reviewer runtime HOLD until root releases a clean committed candidate; never overlap full Python/pnpm. No new chats/agents/native goals; native goal remains user-paused.

Purpose/owner: create private packages/simulator with zero runtime package dependencies. Freeze v1 readonly generic synthetic source/delivery/result/manifest contracts and a strict unknown-input validator; deterministic node:crypto SHA256 is the sole permitted runtime builtin. Supplied simulator-scoped source/occurrence/record/delivery/receipt-descriptor IDs; no durable rcpt/evt allocation. Event time is explicit UTC or null (unknown); supplied observed clocks/cutoff/order, no host clock/randomness. Full checked manifest is returned without cutoff projection, deduplication or missing-evidence verdict.

Raw UTF8 text remains opaque and byte-preserved (BOM/CRLF/Unicode/empty text); reject lone surrogates and hash mismatch. No generic money field: later feature owners validate financial payload values/currencies; current descriptor validation establishes neither payload semantics nor external authenticity. Strict own JSON data fields, exact versions, unique record/delivery/receipt-descriptor IDs, complete source references, independent source-event/observed clocks, bounded arrays/text and stable issues/no partial output. Return detached deeply frozen value/issues. Caller inputs remain unchanged. Repeated occurrence IDs across distinct source records do not establish duplicate economic facts.

Permitted files: PLANS.md, README.md, START_HERE.md, WORKFLOW.md, docs/ACTIVE_DOCS.md, docs/INDEX.md, docs/ARCHITECTURE.md, docs/milestones/M05.md, docs/milestones/SUBMILESTONE_REGISTRY.md, docs/status/CAPABILITY_MATRIX.md, docs/status/CURRENT_STATE.md, docs/status/LOCAL_ENVIRONMENT_READINESS.md, docs/status/NEXT_RECOMMENDED_THREAD.md, docs/status/PROJECT_COMPLETION_GOAL.json, docs/status/PROJECT_COMPLETION_GOAL.md, docs/status/WEEKLY_LOG.md, docs/status/RISK_REGISTER.md, docs/status/TECH_DEBT.md, docs/status/OPEN_QUESTIONS.md, plans/ROADMAP.md, plans/active/CLP-0006-m05-provider-and-bank-simulator.md, scripts/validate-control-plane.py, tests/test_control_plane_bootstrap.py, pnpm-lock.yaml, docs/specs/simulator-package.md, packages/simulator/README.md, packages/simulator/package.json, packages/simulator/tsconfig.json, packages/simulator/tsconfig.test.json, packages/simulator/src/index.ts, packages/simulator/src/contract.ts, packages/simulator/src/validation.ts, packages/simulator/test/contract.test.ts, packages/simulator/test/contract-types.test.ts, packages/simulator/test/ownership.test.ts. Existing financial/event sources/tests/specs/fixtures, completed M04 plan/packet, all14 database runner children/THREE migrations, CI/manifests other than new package+minimal lock importer, existing dependency snapshots and original18/19/V1/proofs/history remain unchanged. No row02+ payment/payout/refund/dispute/fee generators, CSV serialization/parser, seed execution, CLI, connector/evidence-store/database/ingestion/invariant/replay/repair/agent/UI. No money/ledger/raw-event/evidence mutation or approval authority.

Acceptance: exact package scripts/config/export boundary; positive empty and caller-supplied generic descriptors; rejected hash/version/reference/identity/unknown key/class/accessor/sparse input; calendar/leap/UTC precision, UTF8 preservation, future declared deliveries/no projection, no invented event time, repeated occurrence/distinct delivery IDs, immutability/detachment/stable issues. Independent expected bytes/hashes, type-negative tests and runtime import/host API ownership guards. Executable VSCode demonstration: pnpm --filter @causalledger/simulator test -- test/contract.test.ts; root runs for user.

Validation Levels0–5/7/8; Level6 N/A. Package fresh typecheck/test/lint/build/format and workspace frozen install/typecheck/test/lint/build/format; validator/full pytest/whitespace/scope-byteidentity/raw18/raw19/history/V1/cumulative proof audit; clean candidate/final qa-dev without dirty override and actual final CI (all14 unchanged mandatory PostgreSQL suites including recovery/upgrades/schema/cleanup) plus synthetic checkout parents/tree/full diff. Local Docker/PostgreSQL/make unavailable, record actual skips and warm caches; no system installation. New lock importer may reuse repository-pinned dependency resolutions only; frozen install thereafter.

Root updates plan/status before/after builder and QA, records findings/commands/counts/skips/risks/handoff. Existing reviewer inspects complete scoped diff, contracts, prior proof and forbidden scope; independently runs fresh deterministic acceptance/lifecycle/full controls after release. Use same branch/sole draftPR, ordinary scoped commits/push/PR/body/advisory/readiness authorized by continuing instruction. Final actual-head independent PASS/rootclean/bothCI/published SHA-bound readback/readiness required. No force/reset/amend/stash/branch deletion/agent merge/auto-merge/install/paid call/deployment/tag/release. Max3 unsuccessful repairs of same unresolved defect.

Stop at HUMAN MERGE REQUIRED with actual solePR/head/QA/CI/action; user runs no tests. Verify actual merge/main contents before M05.02 Simulate payment authorized.


## Plan of Work

| ID | Existing submilestone | Dependencies | Acceptance and deterministic evidence |
| --- | --- | --- | --- |
| M05.01 | Create simulator package | Planning PR human-merged; verified M04 closeout; M03/domain/ADR-0008 | Create dedicated packages/simulator with reviewed ownership; freeze synthetic source/delivery/result interfaces and versioned manifests. Package/build/type/lint tests plus forbidden import/network/ledger-write checks; no connectors or evidence-store implementation. |
| M05.02 | Simulate payment authorized | M05.01 human-merged | Explicit synthetic authorized record, source/object/actor/currency/amount references and supplied event/observed clocks. Stable valid output; reject malformed identity/amount/currency/time without mutating inputs. Authorization metadata cannot establish financial authorization. |
| M05.03 | Simulate payment captured | M05.02 human-merged | Explicit capture referencing supplied authorization/payment identity. Exact minor-unit amount; preserve raw authorized record and references; test conflicting identity/currency and boundary amounts. No ledger posting or invented provider truth. |
| M05.04 | Simulate payout created | M05.03 human-merged | Explicit payout-created record with provider/payout references and supplied chronology. Test deterministic valid output and missing/conflicting references; aggregate membership policy must be frozen before implementation. |
| M05.05 | Simulate payout paid | M05.04 human-merged | Explicit payout-paid source record with stable payout identity and declared status/time. Test exact amounts/currency, stable references and contradictions; provider-paid metadata is not bank receipt or settlement confirmation. |
| M05.06 | Simulate payout failed | M05.05 human-merged | Explicit failed payout with supplied failure reason and retained original reference. Test failed-versus-paid conflict representation and incomplete evidence; never infer that missing bank evidence proves failure. |
| M05.07 | Simulate refund created | M05.06 human-merged | Explicit refund-created record with original captured payment/reference. Freeze full/partial/multiple-refund scenario policy using supplied context; exact amounts and no economic inference; reject malformed contexts without modifying originals. |
| M05.08 | Simulate refund paid | M05.07 human-merged | Explicit refund-paid record with the same declared refund occurrence and source linkage. Test independent raw records, stable amount/currency and contradictory status/time; no ledger reversal or repair approval. |
| M05.09 | Simulate dispute opened | M05.08 human-merged | Explicit dispute-opened record with original payment, reason and supplied clocks. Test missing/conflicting references and stable record output. An opened dispute does not imply a confirmed chargeback or money movement. |
| M05.10 | Simulate chargeback fee | M05.09 human-merged | Explicit chargeback-fee source evidence with exact fee amount/currency and declared dispute/payment references. Test chargeback-versus-fee distinction, malformed/large amounts and provenance; no fee inference or financial posting. |
| M05.11 | Simulate duplicate webhook | M05.10 human-merged | Paired benign and faulty duplicate-delivery scenarios. Distinct delivery/receipt IDs preserve one unchanged source occurrence; a separately declared faulty economic duplicate stays distinct. Test raw-byte/provenance preservation and exact occurrence-versus-delivery identity; no automatic deduplication or exactly-once claim. |
| M05.12 | Simulate delayed webhook | M05.11 human-merged | Delayed deliveries use explicit event time, observed time, delivery order and observation cutoff. Deterministic out-of-order examples and inclusive boundaries; retain original bytes and uncertainty until later evidence arrives; no sleeps or host clock. |
| M05.13 | Simulate missing webhook | M05.12 human-merged | Missing-delivery scenario retains explicit expected source occurrence, omission metadata and cutoff without fabricating a webhook. Test genuinely missing versus delayed-at-cutoff cases and unsupported conclusions; no incident verdict or deletion of existing evidence. |
| M05.14 | Simulate settlement CSV | M05.13 human-merged | Controlled settlement CSV with frozen version/dialect/header/order/encoding/escaping/row identities and exact decimal money. Golden bytes and malformed delimiter/quote/currency/reference/large-amount cases; immutable source rows, no ingestion/parser or bank confirmation. |
| M05.15 | Simulate bank statement CSV | M05.14 human-merged | Controlled bank statement CSV with independent bank/statement/line/payout references and supplied posting/file times. Golden bytes, quoted/newline/empty-field cases and declared mismatch/ambiguity; no bank credentials or inferred match. |
| M05.16 | Add deterministic seed support | M05.15 human-merged | Versioned deterministic seed support extends prior explicit-input deterministic scenarios. Same seed/config/version yields byte-identical manifests and outputs independent of host clock/randomness; test zero/bounds/malformed seeds, namespace collisions and version changes. |
| M05.17 | Add simulator CLI | M05.16 human-merged | Bounded simulator CLI with explicit scenario/version/seed/cutoff/output selection; stdout or newly owned output only. Test help/valid/invalid/unknown/exit codes/path bounds/create-only refusal of existing outputs; no network, credentials, database, ledger or agent tools. |
| M05.18 | Add fixture tests | M05.17 human-merged | Cross-feature fixtures broaden earlier per-feature tests; all nineteen rows remain separate. Golden independent outputs, paired benign/faulty duplicates, delays/omissions, CSV references, large exact amounts/currency isolation, input immutability and seed reproducibility. Existing M03 fixtures/seeds stay untouched. |
| M05.19 | QA simulator | M05.18 human-merged | Independent whole-M05 acceptance and executable controlled provider/webhook/settlement/bank demonstration. Verify all original rows, provenance/version/cutoffs, clean setup and exact-head CI. No source integration, financial truth, incident/invariant/replay/repair/agent/UI claim; separate milestone closeout after all nineteen human merges. |


## Concrete Steps

Implement only M05.01 after its verified planning dependency. Preserve the original nineteen-row mapping; update only01 lifecycle/branch/PR, run root and independent validation, create solePR and wait for human merge. No M05.02 before actual M05.01 QA PASS/human merge verification.

## Validation and Acceptance

Candidate f0832c0a53420f7fc48817fb9a648febcbc06a28/tree 8ebb8c5dd0e8aff0b1222e341600ca88ff51e425 independently reviewed PASS: simulator107/3 files/type/lint/build/format,309 behavioral probes,540 lifecycle/provenance probes and full2397 controls. Root clean QA18 PASS/0 FAIL/1 optional Docker skip without dirty override. Both CI38450630391 jobs passed; simulator107, ledger1785/32 files, controls2397, all14 actual mandatory PostgreSQL suites1227/no skips; THREE recovery/both populated preservation upgrades/exact schema/DEMO/owned+Compose cleanup PASS. Both tested checkouts42da634d03ffd9a9e18e07c945c0fcb15afb4334 have expected base/head parents, same tree and full empty diff. Scope36/protected339/complete29375-byte planning history/raw18+19/V1/prior proofs/append-only weekly/old dependency snapshots PASS. Final committed tracking head requires fresh root/independent QA/both actual CI/published SHA-bound readback/readiness before human merge; final proof belongs in sole PR82. Applicable Levels0–5/7/8; Level6 N/A. Warm caches; local Docker/make unavailable; mandatory database proof in actual CI.

## Idempotence and Recovery

Reuse same branch/solePR for fixes; max3 unsuccessful repairs per unresolved defect. No automatic stash/reset/force/amend/branch deletion, financial-state mutation or evidence overwrite. Future CLI outputs use explicit newly owned paths/create-only refusal and scoped temp fixtures; never delete or rewrite existing raw evidence. No live keys, network provider, production database or model budget.

## Artifacts and Notes

Created current M05.01 brief and post-planning-merge status; original planning record is retained in full after the immutable history marker. No package behavior is claimed before implementation and validation.

## Interfaces and Dependencies

packages/simulator owns generic synthetic source/delivery/result/versioned manifest interfaces and deterministic validation. Zero runtime package dependencies; node:crypto hashing only. No financial-write API or agent tool, source mapping, canonical event creation, evidence receipt ingestion/persistence, CSV/CLI/seed execution or provider generator.

## Outcomes & Retrospective

QA passed, awaiting merge; solePR82. Candidate f0832c0a53420f7fc48817fb9a648febcbc06a28/tree 8ebb8c5dd0e8aff0b1222e341600ca88ff51e425 independently reviewed PASS: simulator107/3 files/type/lint/build/format,309 behavioral probes,540 lifecycle/provenance probes and full2397 controls. Root clean QA18 PASS/0 FAIL/1 optional Docker skip without dirty override. Both CI38450630391 jobs passed; simulator107, ledger1785/32 files, controls2397, all14 actual mandatory PostgreSQL suites1227/no skips; THREE recovery/both populated preservation upgrades/exact schema/DEMO/owned+Compose cleanup PASS. Both tested checkouts42da634d03ffd9a9e18e07c945c0fcb15afb4334 have expected base/head parents, same tree and full empty diff. Scope36/protected339/complete29375-byte planning history/raw18+19/V1/prior proofs/append-only weekly/old dependency snapshots PASS. Final committed tracking head requires fresh root/independent QA/both actual CI/published SHA-bound readback/readiness before human merge; final proof belongs in sole PR82. Root runs tests; user none. Native goal remains user-paused.

## Generated M05.01 builder and QA brief (2026-10-13)

Expected branch m05-01-create-simulator-package; active CLP0006; base 6b755d57bf0f03f1618aea1096cc99e1876e4bed. Before every edit run git branch --show-current; git status --short; git remote -v. Stop for wrong branch/unrelated dirt; own scoped dirt is part of this slice. Root sole editor/main validation owner; existing m04_02_qa independent reviewer and static auditor reused. Reviewer runtime HOLD until root releases a clean committed candidate; never overlap full Python/pnpm. No new chats/agents/native goals; native goal remains user-paused.

Purpose/owner: create private packages/simulator with zero runtime package dependencies. Freeze v1 readonly generic synthetic source/delivery/result/manifest contracts and a strict unknown-input validator; deterministic node:crypto SHA256 is the sole permitted runtime builtin. Supplied simulator-scoped source/occurrence/record/delivery/receipt-descriptor IDs; no durable rcpt/evt allocation. Event time is explicit UTC or null (unknown); supplied observed clocks/cutoff/order, no host clock/randomness. Full checked manifest is returned without cutoff projection, deduplication or missing-evidence verdict.

Raw UTF8 text remains opaque and byte-preserved (BOM/CRLF/Unicode/empty text); reject lone surrogates and hash mismatch. No generic money field: later feature owners validate financial payload values/currencies; current descriptor validation establishes neither payload semantics nor external authenticity. Strict own JSON data fields, exact versions, unique record/delivery/receipt-descriptor IDs, complete source references, independent source-event/observed clocks, bounded arrays/text and stable issues/no partial output. Return detached deeply frozen value/issues. Caller inputs remain unchanged. Repeated occurrence IDs across distinct source records do not establish duplicate economic facts.

Permitted files: PLANS.md, README.md, START_HERE.md, WORKFLOW.md, docs/ACTIVE_DOCS.md, docs/INDEX.md, docs/ARCHITECTURE.md, docs/milestones/M05.md, docs/milestones/SUBMILESTONE_REGISTRY.md, docs/status/CAPABILITY_MATRIX.md, docs/status/CURRENT_STATE.md, docs/status/LOCAL_ENVIRONMENT_READINESS.md, docs/status/NEXT_RECOMMENDED_THREAD.md, docs/status/PROJECT_COMPLETION_GOAL.json, docs/status/PROJECT_COMPLETION_GOAL.md, docs/status/WEEKLY_LOG.md, docs/status/RISK_REGISTER.md, docs/status/TECH_DEBT.md, docs/status/OPEN_QUESTIONS.md, plans/ROADMAP.md, plans/active/CLP-0006-m05-provider-and-bank-simulator.md, scripts/validate-control-plane.py, tests/test_control_plane_bootstrap.py, pnpm-lock.yaml, docs/specs/simulator-package.md, packages/simulator/README.md, packages/simulator/package.json, packages/simulator/tsconfig.json, packages/simulator/tsconfig.test.json, packages/simulator/src/index.ts, packages/simulator/src/contract.ts, packages/simulator/src/validation.ts, packages/simulator/test/contract.test.ts, packages/simulator/test/contract-types.test.ts, packages/simulator/test/ownership.test.ts. Existing financial/event sources/tests/specs/fixtures, completed M04 plan/packet, all14 database runner children/THREE migrations, CI/manifests other than new package+minimal lock importer, existing dependency snapshots and original18/19/V1/proofs/history remain unchanged. No row02+ payment/payout/refund/dispute/fee generators, CSV serialization/parser, seed execution, CLI, connector/evidence-store/database/ingestion/invariant/replay/repair/agent/UI. No money/ledger/raw-event/evidence mutation or approval authority.

Acceptance: exact package scripts/config/export boundary; positive empty and caller-supplied generic descriptors; rejected hash/version/reference/identity/unknown key/class/accessor/sparse input; calendar/leap/UTC precision, UTF8 preservation, future declared deliveries/no projection, no invented event time, repeated occurrence/distinct delivery IDs, immutability/detachment/stable issues. Independent expected bytes/hashes, type-negative tests and runtime import/host API ownership guards. Executable VSCode demonstration: pnpm --filter @causalledger/simulator test -- test/contract.test.ts; root runs for user.

Validation Levels0–5/7/8; Level6 N/A. Package fresh typecheck/test/lint/build/format and workspace frozen install/typecheck/test/lint/build/format; validator/full pytest/whitespace/scope-byteidentity/raw18/raw19/history/V1/cumulative proof audit; clean candidate/final qa-dev without dirty override and actual final CI (all14 unchanged mandatory PostgreSQL suites including recovery/upgrades/schema/cleanup) plus synthetic checkout parents/tree/full diff. Local Docker/PostgreSQL/make unavailable, record actual skips and warm caches; no system installation. New lock importer may reuse repository-pinned dependency resolutions only; frozen install thereafter.

Root updates plan/status before/after builder and QA, records findings/commands/counts/skips/risks/handoff. Existing reviewer inspects complete scoped diff, contracts, prior proof and forbidden scope; independently runs fresh deterministic acceptance/lifecycle/full controls after release. Use same branch/sole draftPR, ordinary scoped commits/push/PR/body/advisory/readiness authorized by continuing instruction. Final actual-head independent PASS/rootclean/bothCI/published SHA-bound readback/readiness required. No force/reset/amend/stash/branch deletion/agent merge/auto-merge/install/paid call/deployment/tag/release. Max3 unsuccessful repairs of same unresolved defect.

Stop at HUMAN MERGE REQUIRED with actual solePR/head/QA/CI/action; user runs no tests. Verify actual merge/main contents before M05.02 Simulate payment authorized.



Current scope includes packages/ledger/README.md current metadata only; all ledger source/tests/migrations and manifest remain unchanged. Frozen install warned that existing esbuild build scripts were ignored; no approve-builds or installation policy change. Existing glob11.1 deprecation warning is recorded. New lock importer alone changed; dependency snapshots remained unchanged.

## M05.01 builder corrections (2026-10-13)

Initial control helper token replacement and undefined JSON-reader spelling were corrected before validator execution passed; narrow explicit01 authorization was added to the original unopened-future registry gate. First focused run343 PASS/2 failed: historical17Q current-progress assertion needed exactly01 exemption, and current status had omitted the completed M04 plan pointer. Both corrected while retaining positive copied fixtures and strict future-stage refusal tests. Independent static P2 found digit-shaped extra array properties silently dropped; arrays now require exact captured indices and regressions cover both arrays/hidden/enumerable/accessor/numeric-tail cases. P3 prefix literals/current planning footers/old open-blocker labels corrected, preserving dated history and all financial bytes. No acceptance weakening, source payload rewrite, later generator, credential/config/policy change or financial action.

The independent reviewer identified a vacuous new own-progress fixture: its synthetic QA/PR binding left registry/detail at builder state, so unrelated errors could make negatives pass. Rebuilt coherent JSON/plan/registry/detail fixture, proved it valid before every mutation, placed duplicate/conflicting markers in owning Progress and asserted specific errors. Nine focused repaired positive/negative cases passed. Current roadmap and future-row notes now reflect verified planning81 and each original per-row predecessor gate; dated records stay unchanged.

Full control run2395 PASS/1 stale exact-package allowance failure was followed by two focused allowance/rejection PASS cases. Intermediate full QA16/1/2 passed all workspace/package checks but seven Progress fixtures failed under child default Windows encoding, due omitted explicitUTF8 reads. A quoted inline repair command failed before changing files; the file-based repair now makes all new fixture reads explicitlyUTF8. Verify under the actual child encoding instead of masking locale; retain raw history/hash assertions and all historical bytes unchanged.

## M05.01 builder handoff (2026-10-13)

Builder fresh simulator107/3files/type/lint/build/format and full2397 controls PASS; workspace frozen install/typecheck/lint/test/build/format/validator/whitespace PASS. Intermediate root QA17 PASS/0 FAIL/2 expected skips (own scoped dirty worktree, optional unavailable local Docker). Scope36/protected339/complete29375-byte planning history/raw19/V1/all prior proofs/append-only weekly/unchanged importers+dependency snapshots PASS. Existing independent static review found no remaining confirmed defect; overall clean-candidate/final independent QA and current actual CI remain pending. Cached tools used; no cold-cache claim/system install/credentials/policy change. Existing glob deprecation/esbuild ignored-script warnings recorded.

Changed: owned foundation package/spec, narrow lifecycle controls/tests, minimal new lock importer and current metadata. Unchanged: all financial/event code/tests/specs/fixtures,14 PostgreSQL children/3migrations/CI/root manifest/existing dependency snapshots/complete M04+planning history/original requirements/explicitV1. Repaired array shape/UTF8 fixture/current-literal/tracking findings without weakening acceptance. Source hash checks are structural integrity only; no financial payload semantic/authenticity or receipt persistence proof. No provider/bank/CSV/seed/CLI/generator or later slice. Safe-to-commit/push/open sole draftPR after whitespace/scope guard; safe-to-merge is QA-only after final actual-head checks/readback. Exact next M05.01 independent QA, human merge and verification before02. Root runs tests; user none. Native goal stays user-paused.

## M05.01 independent candidate QA and final handoff (2026-10-13)

Candidate f0832c0a53420f7fc48817fb9a648febcbc06a28/tree 8ebb8c5dd0e8aff0b1222e341600ca88ff51e425 independently reviewed PASS: simulator107/3 files/type/lint/build/format,309 behavioral probes,540 lifecycle/provenance probes and full2397 controls. Root clean QA18 PASS/0 FAIL/1 optional Docker skip without dirty override. Both CI38450630391 jobs passed; simulator107, ledger1785/32 files, controls2397, all14 actual mandatory PostgreSQL suites1227/no skips; THREE recovery/both populated preservation upgrades/exact schema/DEMO/owned+Compose cleanup PASS. Both tested checkouts42da634d03ffd9a9e18e07c945c0fcb15afb4334 have expected base/head parents, same tree and full empty diff. Scope36/protected339/complete29375-byte planning history/raw18+19/V1/prior proofs/append-only weekly/old dependency snapshots PASS. Final committed tracking head requires fresh root/independent QA/both actual CI/published SHA-bound readback/readiness before human merge; final proof belongs in sole PR82.

This legitimate final handoff binds own PR82 and records independent candidate acceptance. All candidate simulator/spec/control source/tests/config/lock,339 protected financial/event/prior files and full merged planning history remain unchanged. Only scoped current metadata/handoff changed. Existing separate-context reviewer and static auditor reused; root sole editor and runtime serialized. No new chats/agents/goals, force/reset/amend/stash/deletion/agent merge/auto-merge/system install/paid call/deploy/tag/release.

Final exact-head evidence belongs in solePR82 body/advisory with attributed reviewer artifact hash, primary CI/checkout proof and publication readback; no CI-copy-only commit. CurrentQaEvidence stays None. Human alone Squash and merge then Confirm squash and merge after final gates. Reply Merged #82. Continue. Verify actual merged contents/main provenance before M05.02 Simulate payment authorized. Root runs tests; user none.

## M05.01 final metadata corrections (2026-10-13)

Both existing reviewers identified two stale undated stage phrases after the legitimate handoff: the owning M05 Status paragraph and roadmap current stage. Corrected both in this bounded same-PR metadata repair. All accepted candidate source/tests/spec/config/control/lock and protected/history bytes remain unchanged. Root cleanQA18/0/1 for superseded3b1eb5b is intermediate evidence only; corrected actual-head root/independent QA/CI/readback are required before human merge. No final PASS is inferred from candidate or superseded head. Dated checkpoints remain intact; root runs tests, user none.
## Historical merged M05 planning record (immutable)

# CLP-0006 M05 Provider and Bank Simulator

## Purpose / Big Picture

Plan controlled synthetic provider and bank sources after verified M04 closeout. Preserve approved V1_PUBLIC_PRODUCT, all nineteen original M05 tasks and one reviewed human merge per implementation slice. This planning slice adds no simulator, source mapping or financial behavior. Simulator output is labelled synthetic, versioned and reproducible; it cannot establish external economic truth or agent financial authority.

## Progress

- [x] 2026-10-12: Verified actual human PR80 merge/reviewed tree/main/primary CI/published review bindings; safely synchronized main and passed clean expected branch/status/origin guard.
- [x] Finalize M04 closeout and move its plan with original requirements/history retained.
- [x] Draft all19 original M05 dependencies, deterministic acceptance and learning examples.
- [x] Builder validation and complete scope/history audit.
- [x] Sole draft planning PR, clean candidate QA and independent review.
- [ ] Final exact-head review/rootclean/both CI/publication/readback/readiness.
- [ ] Human planning merge verified before M05.01.

Current planning review: QA passed, awaiting merge

Sole proposed M05 planning PR #81

## Surprises & Discoveries

Canonical milestone title is Provider and bank simulator; earlier recommendation Payment provider simulators was a thread label. M05.01 requires a package but earlier architecture never named its owner. Propose dedicated packages/simulator, separate from connectors/evidence/events/ledger; create no directory now. Earlier architecture ledger non-claims are stale after M04 and are corrected here. Historical M04 controls must keep their original pending/proposed refusal semantics when the plan moves.

## Decision Log

- Preserve all original IDs/names; no consolidation, deferral, renamed acceptance, scope expansion or new V1 approval.
- Proposed packages/simulator owns offline synthetic source generation; connectors keep external adapters, evidence keeps capture/storage, events keeps canonical validation and ledger keeps financial primitives.
- Source occurrence, canonical event, delivery/receipt and posting identities are distinct. Duplicates preserve deliveries and original source bytes; faulty duplicate occurrences remain explicit. No inferred exactly-once economic claim.
- Rows01–15 use explicit deterministic inputs; row16 adds versioned seed support. row17 owns CLI execution and output controls; row18 broadens tests already present for each feature; row19 whole milestone QA; then separate formal closeout.
- Freeze exact versioned amounts/currencies/IDs/provenance/CSV dialect/supplied clocks and reproducibility in owning implementation briefs. No Number conversion for money, hidden host clock/randomness or ledger/posting dependency.

## Context and Orientation

Human PR #80 merged at 07ae89701eca3f0ee669265c99a3a180b31724ca on 2026-10-12T14:58:48Z by nonbot Islem-Rezzag. Reviewed edf6a873ffb7d9d46097f4646d960369f5d3c937 and merged contents share tree c0a4573497f2a38cdbf65ad6334fd0a542abf30d; full diff empty and fetched-main reachability verified. Final independent closeout QA/354 lifecycle/full2055 controls/rootclean18/0/1 and bothCI38239309974 passed; actual1785 ledger/32 files and14 PostgreSQL suites1227, THREE recovery/both populated preservation upgrades/exact schema/DEMO/cleanup passed. Published body/advisory6123224889/reviewer SHA256 bindings were read back. No unchanged M04 QA was repeated for merge verification.

M00–M04 are closed; completed plan plans/completed/CLP-0005-m04-double-entry-ledger-core.md. M05 planning is active; all implementation rows stay Not started. Existing M03 contracts, controlled fixtures and seed metadata remain unchanged. Read AGENTS/PLANS/WORKFLOW, active docs, M05 registry/milestone, M03 mapping-fixture plan, payment/settlement/evidence vocabulary, V1 scope and ADR-0008.

## Scope

Planning and post-merge documentation/control-plane transition only.
Expected branch m05-planning-provider-and-bank-simulator; active plan plans/active/CLP-0006-m05-provider-and-bank-simulator.md; base 07ae89701eca3f0ee669265c99a3a180b31724ca. Before every edit: git branch --show-current; git status --short; git remote -v. Wrong branch or unrelated dirt stops. Root sole editor/main validation owner; existing separate-context m04_02_qa and read-only design auditor reused. Runtime/pnpm/full Python HOLD until root finishes and explicitly releases a clean committed candidate; never overlap. No new chats/agents/native goals; native goal remains user-paused.

Purpose: verify/finalize human M04 closeout, move CLP0005 to completed, create this planning-only milestone contract and narrow cumulative lifecycle guards. Allowed paths: PLANS.md, README.md, START_HERE.md, WORKFLOW.md, docs/ACTIVE_DOCS.md, docs/INDEX.md, docs/ARCHITECTURE.md, docs/milestones/M04.md, docs/milestones/M05.md, docs/milestones/SUBMILESTONE_REGISTRY.md, docs/status/CAPABILITY_MATRIX.md, docs/status/CURRENT_STATE.md, docs/status/LOCAL_ENVIRONMENT_READINESS.md, docs/status/NEXT_RECOMMENDED_THREAD.md, docs/status/PROJECT_COMPLETION_GOAL.json, docs/status/PROJECT_COMPLETION_GOAL.md, docs/status/WEEKLY_LOG.md, docs/status/RISK_REGISTER.md, docs/status/TECH_DEBT.md, docs/status/OPEN_QUESTIONS.md, docs/status/M04_CLOSEOUT.md, packages/ledger/README.md, plans/ROADMAP.md, plans/active/CLP-0005-m04-double-entry-ledger-core.md, plans/completed/CLP-0005-m04-double-entry-ledger-core.md, plans/active/CLP-0006-m05-provider-and-bank-simulator.md, scripts/validate-control-plane.py, tests/test_control_plane_bootstrap.py. Financial source/test/helper/spec, all14 runner children/THREE migrations/manifests/dependencies/locks/CI/other packages/apps/fixtures/raw evidence/V1/prior proofs/history remain unchanged; ledger README is metadata only. No simulator package or output, source mapper/connector/evidence-store/database/ingestion/invariant/incident/replay/repair/agent/UI implementation. No financial authority, install, paid call, deployment/tag/release/publication. Proposed owner packages/simulator is a routine planning decision under original M05.01, not a created package.

Acceptance: exactly one active CLP0006; completed CLP0005 with raw18 requirements/history; typed actual80 merge/final-QA provenance plus all earlier proofs/explicitV1 approval; all19 original M05 IDs/names/dependencies/acceptance separately mapped and unstarted/blank branches+PRs; M06–21 unstarted/unbound; M04 Completed and M05 Planning active. Earlier pending/proposed closeout validation remains strict through historical fixtures. Current planning QA is separate/external/exact-head bound. No M05.01 before this planning PR independently passes and human merge is verified.

Validation Levels0–4/7/8; existing product regressions and unchanged mandatory14-suite CI run, but Level5 is regression evidence, not simulator implementation proof; Level6 N/A. Commands: validator/full pytest/whitespace/scope-byteidentity/raw18/raw19/V1/history audit, frozen install/workspace typecheck/test/lint/build/format, intermediate qa-dev --allow-dirty and clean candidate/final qa-dev without override. Existing approved fresh-owned PostgreSQL17 CI must pass both jobs including migrations/upgrades/schema/cleanup and synthetic merge tree/parents/full-diff checks. Local Docker/PostgreSQL/make unavailable; direct Python alternative and warm local cache explicit; no system installation.

Independent reviewer must inspect complete scoped diff, exact candidate/PR/base and completed M04/historical controls/new19 map/security boundary, run fresh lifecycle/full controls after release, fix-confirmed findings on same branch/PR and verify actual final-head CI/readback. Max3 unsuccessful repairs of one unresolved defect. Routine scoped ordinary stage/commit/push/solePR/body/advisory/readiness authorized by continuing user instruction; no merge/auto-merge/force/reset/amend/stash/deletion. Final PAUSED: HUMAN MERGE REQUIRED with actualPR/head/QA/CI/UI action; root runs tests, user none.


## Plan of Work

| ID | Existing submilestone | Dependencies | Acceptance and deterministic evidence |
| --- | --- | --- | --- |
| M05.01 | Create simulator package | Planning PR human-merged; verified M04 closeout; M03/domain/ADR-0008 | Create dedicated packages/simulator with reviewed ownership; freeze synthetic source/delivery/result interfaces and versioned manifests. Package/build/type/lint tests plus forbidden import/network/ledger-write checks; no connectors or evidence-store implementation. |
| M05.02 | Simulate payment authorized | M05.01 human-merged | Explicit synthetic authorized record, source/object/actor/currency/amount references and supplied event/observed clocks. Stable valid output; reject malformed identity/amount/currency/time without mutating inputs. Authorization metadata cannot establish financial authorization. |
| M05.03 | Simulate payment captured | M05.02 human-merged | Explicit capture referencing supplied authorization/payment identity. Exact minor-unit amount; preserve raw authorized record and references; test conflicting identity/currency and boundary amounts. No ledger posting or invented provider truth. |
| M05.04 | Simulate payout created | M05.03 human-merged | Explicit payout-created record with provider/payout references and supplied chronology. Test deterministic valid output and missing/conflicting references; aggregate membership policy must be frozen before implementation. |
| M05.05 | Simulate payout paid | M05.04 human-merged | Explicit payout-paid source record with stable payout identity and declared status/time. Test exact amounts/currency, stable references and contradictions; provider-paid metadata is not bank receipt or settlement confirmation. |
| M05.06 | Simulate payout failed | M05.05 human-merged | Explicit failed payout with supplied failure reason and retained original reference. Test failed-versus-paid conflict representation and incomplete evidence; never infer that missing bank evidence proves failure. |
| M05.07 | Simulate refund created | M05.06 human-merged | Explicit refund-created record with original captured payment/reference. Freeze full/partial/multiple-refund scenario policy using supplied context; exact amounts and no economic inference; reject malformed contexts without modifying originals. |
| M05.08 | Simulate refund paid | M05.07 human-merged | Explicit refund-paid record with the same declared refund occurrence and source linkage. Test independent raw records, stable amount/currency and contradictory status/time; no ledger reversal or repair approval. |
| M05.09 | Simulate dispute opened | M05.08 human-merged | Explicit dispute-opened record with original payment, reason and supplied clocks. Test missing/conflicting references and stable record output. An opened dispute does not imply a confirmed chargeback or money movement. |
| M05.10 | Simulate chargeback fee | M05.09 human-merged | Explicit chargeback-fee source evidence with exact fee amount/currency and declared dispute/payment references. Test chargeback-versus-fee distinction, malformed/large amounts and provenance; no fee inference or financial posting. |
| M05.11 | Simulate duplicate webhook | M05.10 human-merged | Paired benign and faulty duplicate-delivery scenarios. Distinct delivery/receipt IDs preserve one unchanged source occurrence; a separately declared faulty economic duplicate stays distinct. Test raw-byte/provenance preservation and exact occurrence-versus-delivery identity; no automatic deduplication or exactly-once claim. |
| M05.12 | Simulate delayed webhook | M05.11 human-merged | Delayed deliveries use explicit event time, observed time, delivery order and observation cutoff. Deterministic out-of-order examples and inclusive boundaries; retain original bytes and uncertainty until later evidence arrives; no sleeps or host clock. |
| M05.13 | Simulate missing webhook | M05.12 human-merged | Missing-delivery scenario retains explicit expected source occurrence, omission metadata and cutoff without fabricating a webhook. Test genuinely missing versus delayed-at-cutoff cases and unsupported conclusions; no incident verdict or deletion of existing evidence. |
| M05.14 | Simulate settlement CSV | M05.13 human-merged | Controlled settlement CSV with frozen version/dialect/header/order/encoding/escaping/row identities and exact decimal money. Golden bytes and malformed delimiter/quote/currency/reference/large-amount cases; immutable source rows, no ingestion/parser or bank confirmation. |
| M05.15 | Simulate bank statement CSV | M05.14 human-merged | Controlled bank statement CSV with independent bank/statement/line/payout references and supplied posting/file times. Golden bytes, quoted/newline/empty-field cases and declared mismatch/ambiguity; no bank credentials or inferred match. |
| M05.16 | Add deterministic seed support | M05.15 human-merged | Versioned deterministic seed support extends prior explicit-input deterministic scenarios. Same seed/config/version yields byte-identical manifests and outputs independent of host clock/randomness; test zero/bounds/malformed seeds, namespace collisions and version changes. |
| M05.17 | Add simulator CLI | M05.16 human-merged | Bounded simulator CLI with explicit scenario/version/seed/cutoff/output selection; stdout or newly owned output only. Test help/valid/invalid/unknown/exit codes/path bounds/create-only refusal of existing outputs; no network, credentials, database, ledger or agent tools. |
| M05.18 | Add fixture tests | M05.17 human-merged | Cross-feature fixtures broaden earlier per-feature tests; all nineteen rows remain separate. Golden independent outputs, paired benign/faulty duplicates, delays/omissions, CSV references, large exact amounts/currency isolation, input immutability and seed reproducibility. Existing M03 fixtures/seeds stay untouched. |
| M05.19 | QA simulator | M05.18 human-merged | Independent whole-M05 acceptance and executable controlled provider/webhook/settlement/bank demonstration. Verify all original rows, provenance/version/cutoffs, clean setup and exact-head CI. No source integration, financial truth, incident/invariant/replay/repair/agent/UI claim; separate milestone closeout after all nineteen human merges. |


## Concrete Steps

Verify dependencies and write a compact scope/behavior/negative-test/learning brief before each later task. Work on its exact branch, preserve all earlier evidence, implement only that row, run independent deterministic checks and separate QA, use one PR and wait for verified human merge before advancing. Current task stops at the planning PR's human gate; no M05.01 implementation.

## Validation and Acceptance

Current planning: Level6 N/A because the benchmark is unimplemented. Commands include python scripts/validate-control-plane.py and python -m pytest tests/test_control_plane_bootstrap.py. Branch/scope/control/bootstrap/whitespace/security/human review Levels0–4/7/8; full existing regression/approved CI above. Initial checkpoint was NOT RUN. Validator/expanded411 focused controls and full scope/history audit now passed; Candidate independent/root clean QA and both CI passed for sole PR #81; final tracking-head checks and human merge pending. Earlier M04 counts are prerequisite evidence. Independent new19 mapping, typed provenance, pending-state negative controls and plan/history movement tests are required. Record actual counts/results/skips/warnings and exact candidate/final SHA externally in sole PR; no CI-copy-only commit.

Future functional acceptance: literal synthetic USD1250 authorization/capture/payout records, separate receipts, deterministic source times, settlement CSV and bank CSV references. A benign repeated webhook has the same occurrence and two delivery identities; a separately declared faulty duplicate has a distinct faulty occurrence. Malformed amount/currency/reference refuses without rewriting inputs; missing evidence is not fabricated. These are planned test examples, not implemented outputs or financial truth. Each feature supplies an executable VSCode test/demonstration; root runs it for the user.

## Idempotence and Recovery

Reuse same branch/solePR for fixes; max3 unsuccessful repairs per unresolved defect. No automatic stash/reset/force/amend/branch deletion, financial-state mutation or evidence overwrite. Future CLI outputs use explicit newly owned paths/create-only refusal and scoped temp fixtures; never delete or rewrite existing raw evidence. No live keys, network provider, production database or model budget.

## Artifacts and Notes

Created this plan; moved complete M04 plan with dated verified merge addendum; updated closeout/current status/navigation/roadmap/registry/architecture and narrow controls/tests. Financial code, fixtures, migrations, runner, manifests/locks/CI and V1 remain untouched. Builder/QA outcomes and exact next action recorded here/current status/solePR.

## Interfaces and Dependencies

Future packages/simulator emits synthetic raw provider/webhook/settlement/bank records and versioned manifest descriptions. It has no financial-write API or agent tool. Consumption, evidence persistence/receipt verification, source-specific canonical mapping, incident/invariant/replay/repair and production integration belong to later approved owners; structural MoneyEvent validation is not source authenticity. Existing evidence/domain vocabulary and ADR-0008 remain authoritative.

## Outcomes & Retrospective

QA passed, awaiting merge; planning-only. Sole PR #81 candidate independent/rootclean/both CI passed. Final tracking-head checks and human merge remain. Safe scoped ordinary Git publication follows passing builder checks; QA-only merge readiness requires final actual-head PASS/readback; human merges. Exact next recommended thread: M05 Planning - Provider and bank simulator. After verified planning merge: M05.01 Create simulator package.

## Generated builder and QA brief (2026-10-12)


Expected branch m05-planning-provider-and-bank-simulator; active plan plans/active/CLP-0006-m05-provider-and-bank-simulator.md; base 07ae89701eca3f0ee669265c99a3a180b31724ca. Before every edit: git branch --show-current; git status --short; git remote -v. Wrong branch or unrelated dirt stops. Root sole editor/main validation owner; existing separate-context m04_02_qa and read-only design auditor reused. Runtime/pnpm/full Python HOLD until root finishes and explicitly releases a clean committed candidate; never overlap. No new chats/agents/native goals; native goal remains user-paused.

Purpose: verify/finalize human M04 closeout, move CLP0005 to completed, create this planning-only milestone contract and narrow cumulative lifecycle guards. Allowed paths: PLANS.md, README.md, START_HERE.md, WORKFLOW.md, docs/ACTIVE_DOCS.md, docs/INDEX.md, docs/ARCHITECTURE.md, docs/milestones/M04.md, docs/milestones/M05.md, docs/milestones/SUBMILESTONE_REGISTRY.md, docs/status/CAPABILITY_MATRIX.md, docs/status/CURRENT_STATE.md, docs/status/LOCAL_ENVIRONMENT_READINESS.md, docs/status/NEXT_RECOMMENDED_THREAD.md, docs/status/PROJECT_COMPLETION_GOAL.json, docs/status/PROJECT_COMPLETION_GOAL.md, docs/status/WEEKLY_LOG.md, docs/status/RISK_REGISTER.md, docs/status/TECH_DEBT.md, docs/status/OPEN_QUESTIONS.md, docs/status/M04_CLOSEOUT.md, packages/ledger/README.md, plans/ROADMAP.md, plans/active/CLP-0005-m04-double-entry-ledger-core.md, plans/completed/CLP-0005-m04-double-entry-ledger-core.md, plans/active/CLP-0006-m05-provider-and-bank-simulator.md, scripts/validate-control-plane.py, tests/test_control_plane_bootstrap.py. Financial source/test/helper/spec, all14 runner children/THREE migrations/manifests/dependencies/locks/CI/other packages/apps/fixtures/raw evidence/V1/prior proofs/history remain unchanged; ledger README is metadata only. No simulator package or output, source mapper/connector/evidence-store/database/ingestion/invariant/incident/replay/repair/agent/UI implementation. No financial authority, install, paid call, deployment/tag/release/publication. Proposed owner packages/simulator is a routine planning decision under original M05.01, not a created package.

Acceptance: exactly one active CLP0006; completed CLP0005 with raw18 requirements/history; typed actual80 merge/final-QA provenance plus all earlier proofs/explicitV1 approval; all19 original M05 IDs/names/dependencies/acceptance separately mapped and unstarted/blank branches+PRs; M06–21 unstarted/unbound; M04 Completed and M05 Planning active. Earlier pending/proposed closeout validation remains strict through historical fixtures. Current planning QA is separate/external/exact-head bound. No M05.01 before this planning PR independently passes and human merge is verified.

Validation Levels0–4/7/8; existing product regressions and unchanged mandatory14-suite CI run, but Level5 is regression evidence, not simulator implementation proof; Level6 N/A. Commands: validator/full pytest/whitespace/scope-byteidentity/raw18/raw19/V1/history audit, frozen install/workspace typecheck/test/lint/build/format, intermediate qa-dev --allow-dirty and clean candidate/final qa-dev without override. Existing approved fresh-owned PostgreSQL17 CI must pass both jobs including migrations/upgrades/schema/cleanup and synthetic merge tree/parents/full-diff checks. Local Docker/PostgreSQL/make unavailable; direct Python alternative and warm local cache explicit; no system installation.

Independent reviewer must inspect complete scoped diff, exact candidate/PR/base and completed M04/historical controls/new19 map/security boundary, run fresh lifecycle/full controls after release, fix-confirmed findings on same branch/PR and verify actual final-head CI/readback. Max3 unsuccessful repairs of one unresolved defect. Routine scoped ordinary stage/commit/push/solePR/body/advisory/readiness authorized by continuing user instruction; no merge/auto-merge/force/reset/amend/stash/deletion. Final PAUSED: HUMAN MERGE REQUIRED with actualPR/head/QA/CI/UI action; root runs tests, user none.



## Initial builder validation corrections (2026-10-12)

First validator found three current-document alignment issues: active-plan label, row17 case and missing owning-section Level6 applicability. Corrected those descriptions without changing any financial behavior or original19 acceptance rows. Historical M04 pending/proposed fixtures remain separate from completed M04; full/focused/new controls and independent review still pending.


Independent static preflight identified extra M04 row IndexError and stale current architecture/closeout/navigation clauses. Completed-row indexing is bounded and extra-row refusal is tested; current statements now match verified human closure while original packet history stays unchanged. M05.01 acceptance explicitly creates its package in that later slice, not merely proposing ownership. Root added a positive copied-fixture golden and explicit LF writes so historical-prefix hashing cannot make negative cases pass for incidental line-ending differences. Pre-M05 fixtures clear future M05 plan pointers. Fresh focused/full/independent checks remain required; no financial source or assertion changed.


## Corrected builder preflight (2026-10-12)

Validator/expanded411 M05-and-historical-closeout controls/scope28-protected337/raw18/full318300-byte reviewed M04 history/historical packet/raw19/V1/cumulative proofs/append-only weekly and whitespace PASS. Existing overall reviewer and design auditor independently confirmed reported static findings resolved, no remaining confirmed finding. Full builder2252 controls/workspace/clean candidate/final/independent/actualCI still required. No financial paths or assertions changed.


## M05 planning builder handoff (2026-10-12)

Builder validator/full2,252 controls/expanded411 focused/workspace frozen install/typecheck/test/lint/build/format/whitespace PASS. Intermediate qa-dev --allow-dirty17/0/2 PASS; scoped28/protected337/full318300-byte M04 plan prefix/historical packet/raw18/all19 frozen M05 rows/V1/prior proofs/append-only weekly PASS. Existing independent static reviewers confirmed findings resolved; overall clean-candidate and final independent QA/actual CI remain pending. Local caches warm; Docker/PostgreSQL/make unavailable locally; approved owned17 CI remains mandatory.

Changed: planning-only documentation, current architecture/closeout/navigation, completed M04 plan movement, narrow typed lifecycle/footprint/history guards and197 new control cases. Unchanged: all financial source/tests/helpers/specs,14-child runner, THREE migrations, manifests/dependencies/locks/CI/other packages/apps/fixtures/raw evidence/V1 and original18/19 requirements. No simulator package/output or new financial authority. Earlier doc/indexing/fixture findings and corrections are retained; no unresolved static finding. Root sole editor/main validator; existing separate-context overall reviewer/design auditor reused with runtime HOLD until clean committed candidate release. Routine scoped ordinary stage/commit/push/solePR authorized, human merge only after final actual-head QA/rootclean/bothCI/publication/readback. No force/reset/amend/stash/deletion/new chats/agents/goals/install/paidcall/deploy/release. Exact next: sole draft planning PR/clean candidate review, then final handoff/readiness/human gate. No M05.01 before actual planning human merge is verified; root runs tests, user none.


The staged publication whitespace check caught a trailing space in the new untracked plan that earlier unstaged git diff did not inspect. Fixed before commit; the already inspected scoped index is retained and revalidated. No source or acceptance changes, unstaging/reset/amend/force operation, or financial assertion weakening.

The first publication retry also attempted to re-add the already indexed old plan path after its rename and stopped on that absent pathspec. Retry stages existing scoped paths only, while verifying the complete28-path index including the retained deletion/rename. No history rewrite or unstage/reset operation.

Final handoff metadata correction: corrected the remaining stale ledger README opening M04-proposed/M05-unstarted text, roadmap builder-pending labels and current goal/next-action fields. Existing static auditor confirmed these were current fields; dated initial correction/builder checkpoints remain historical. Completed M04 plan/packet and all candidate controls/financial files stay byte-identical.

The initial standalone formatting check used the root context, where Prettier is not a root dependency, and stopped before inspecting files. Repeated in the ledger package context; the scoped README formatting check passed without edits or installation.


## M05 planning independent candidate QA and final handoff (2026-10-12)

QA passed, awaiting merge; sole [PR #81](https://github.com/Islem-Rezzag/CausalLedger/pull/81). M05 planning candidate e833da8ea7df92fcda30c7bfe90f665f08fc5eab / tree 8583055fdeeb714d3b33620d5abb8533eee7edc3: existing independent reviewer PASS_WITH_TRACKING_FIXES, 441 fresh lifecycle probes and all2252 controls; root cleanQA18/0/1/no dirty override. The two P3 current metadata findings (ledger README opening proposed-closeout text and roadmap builder-pending labels) are corrected in this bounded final handoff; independent committed-head confirmation remains required. Both candidate CI38271340279 jobs passed with1785 ledger/32 files and all14 unchanged mandatory PostgreSQL suites1227/no skips, THREE recovery/both populated preservation upgrades/exact schema/DEMO/owned+Compose cleanup. Actual tested merge has expected base/head parents/same tree/full empty diff. Scope28/protected337/full318300-byte M04 historical prefix/original packet/raw18/raw19/V1/prior proof/weekly preserved. Final tracking-head root clean QA/independent fresh lifecycle+controls/both actual CI/published SHA-bound readback/readiness remain required before human merge. No simulator implementation.

This legitimate final handoff binds the actual own PR, records independent candidate acceptance and updates pending review/next-action tracking. All candidate control source/tests, complete M04 plan/packet history and all financial source/tests/migrations/runner/manifests/dependencies/CI remain unchanged. No commit solely copies CI. Root sole editor/main validation owner; existing separate-context reviewer and static auditor reused, no overlapping runtime/new chats/agents/native goals. Native goal stays user-paused. No force/reset/amend/stash/branch deletion/agent merge/auto-merge/install/paidcall/deploy/publication.

Final actual-head independent PASS/rootclean/both CI/primary log and synthetic-merge proof/publication readback/readiness belong in sole PR's SHA-bound body/advisory. CurrentQaEvidence None; prerequisite M04 and candidate evidence do not substitute for final M05 proof. Exact next: HUMAN review/squash merge only after final gates; reply Merged #81. Continue after actual merge. Verify reviewed contents/main provenance before M05.01 Create simulator package. M04 Completed; active M05 planning; all19 implementation rows and M06–21 unstarted/unbound. Future packages/simulator remains proposed, no package/output/financial-write authority. Root ran tests; user none.
