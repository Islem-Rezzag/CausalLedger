# CLP-0002 M01 Domain Model and Scope Freeze

## Purpose / Big Picture

M01 freezes CausalLedger domain language, boundaries, and non-goals before any domain-model implementation begins. It is a domain and scope planning milestone, not a product runtime implementation milestone.

M01 may update docs, specifications, milestone tracking, and status files. M01 must not implement APIs, databases, ledger logic, MoneyEvent runtime code, invariants, agent runtime, repair planner, UI, external connectors, GitHub Actions, CI workflows, or product behavior.

The safety boundary is non-negotiable: LLM agents may investigate, summarize, and propose, but they do not mutate money, approve repairs, delete evidence, post ledger entries, modify raw events, or override deterministic invariants. Financial truth must come from raw evidence, canonical events, deterministic invariants, replay outputs, evidence bundles, and explicit human approval.

The first M01 implementation submilestone after this planning thread is `M01.01 Define payment lifecycle`.

Current M01 execution status: M01 planning is complete and merged at git commit `2cfd75a` (`docs: plan M01 domain model and scope freeze (#10)`). M01 is the active milestone, M01.01 Define payment lifecycle is completed and merged after post-merge QA recovery, M01.02 Define ledger vocabulary is completed and merged at git commit `fd1e259` (`docs: define M01.02 ledger vocabulary (#13)`), M01.03 Define settlement vocabulary is completed and merged at git commit `e54a917` (`docs: define M01.03 settlement vocabulary (#14)`), M01.04 Define reconciliation vocabulary is completed and merged at git commit `5dfe928` (`docs: define M01.04 reconciliation vocabulary (#15)`), M01.05 Define incident vocabulary is completed and merged after QA recovery PR #18 merged at git commit `3bdedeb`, M01.06 Define safe and unsafe repairs is completed and merged after PR #21 merged at git commit `7adc96d` (`docs: define M01.06 safe and unsafe repairs (#21)`), M01.07 Define evidence receipt model is completed and merged after PR #23 merged at git commit `a88b5ff` (`docs: define M01.07 evidence receipt model (#23)`), M01.08 Define human review states is completed and merged after PR #26 merged at git commit `1fde07a` (`docs: define M01.08 human review states (#26)`), M01.09 Define out-of-scope domains is completed and merged after PR #27 merged at git commit `1b40773` (`docs: define M01.09 out-of-scope domains (#27)`), and M01.10 Write DOMAIN_MODEL.md is `QA recovery passed, awaiting recovery PR merge` after builder PR #28 was squash-merged before required QA at commit `dc6800b`.

## Progress

- [x] Branch guard passed on `m01-planning-domain-model-and-scope-freeze`.
- [x] Starting worktree was clean.
- [x] Confirmed tag `v0.1.0` exists for the M00 repo operating system foundation.
- [x] Confirmed M00 is complete and the completed plan lives at `plans/completed/CLP-0001-m00-repo-operating-system.md`.
- [x] Confirmed `plans/active/` contained no active milestone plan before this M01 planning thread.
- [x] Confirmed product directories contain placeholder README files only.
- [x] Created this active M01 plan.
- [x] Added release and versioning documentation.
- [x] Cleaned stale current-state M00 closeout wording.
- [x] Updated roadmap, milestone, status, active docs, and index links for M01 planning.
- [x] Updated control-plane validation and bootstrap tests for the active M01 plan and versioning docs.
- [x] Run required validation commands.
- [x] Record final validation results and handoff.
- [x] 2026-05-11: M01 planning QA branch guard passed on `m01-planning-domain-model-and-scope-freeze`; starting worktree was clean.
- [x] 2026-05-11: QA found and fixed scoped planning defects: missing required concise references in `START_HERE.md` and `WORKFLOW.md`, incomplete exact M01.01-M01.13 submilestone enumeration in this active plan, and stale project brief current-status wording.
- [x] 2026-05-11: QA updated control-plane validation coverage so the missing entry-doc references and exact M01 submilestone list are checked.
- [x] 2026-05-11: QA verified M00 is completed, `v0.1.0` exists, M01 planning is active, M01.01 through M01.13 remain `Not started`, M02 through M21 remain `Not started`, and product implementation has not started.
- [x] 2026-05-11: QA validation passed after scoped fixes.
- [x] 2026-05-11: Finalized M01 planning merge tracking from git commit `2cfd75a` before starting M01.01 work.
- [x] 2026-05-11: Started M01.01 builder on branch `m01-01-define-payment-lifecycle`; branch guard passed, the starting worktree was clean, and M01.01 was marked `Builder in progress`.
- [x] 2026-05-11: Created `docs/domain/README.md` and `docs/domain/payment-lifecycle.md` as documentation-only M01.01 domain artifacts.
- [x] 2026-05-11: Updated `docs/DOMAIN_MODEL.md` into an M01 domain index and added lightweight domain-dependency notes to related spec placeholders.
- [x] 2026-05-11: Updated M01.01 tracking to `Builder complete, awaiting QA`.
- [x] 2026-05-11: First M01.01 control-plane validation run failed because `docs/status/CURRENT_STATE.md` lacked the exact M00.01-through-M00.08 summary phrase required by validation; fixed the scoped tracking wording and reran successfully.
- [x] 2026-05-11: M01.01 validation passed with `python scripts/validate-control-plane.py`, `python -m pytest tests/test_control_plane_bootstrap.py` with 18 tests, and `git diff --check`.
- [x] 2026-05-11: `make bootstrap-check` was skipped because `make` is unavailable in the current Windows shell.
- [x] 2026-05-11: Started M01.01 post-merge QA recovery on branch `m01-01-qa-recovery-define-payment-lifecycle` after builder PR #11 was squash-merged before the required QA thread; branch guard passed, starting worktree was clean, and latest commit was `1175789`.
- [x] 2026-05-11: Audited merged M01.01 docs, tracking, validation coverage, and forbidden-scope boundaries; found no payment-lifecycle content defects and no product implementation.
- [x] 2026-05-11: Recorded the M01.01 protocol deviation and post-merge QA recovery in tracking/status files.
- [x] 2026-05-11: M01.01 post-merge QA recovery validation passed with `python scripts/validate-control-plane.py`, `python -m pytest tests/test_control_plane_bootstrap.py` with 18 tests, and `git diff --check`.
- [x] 2026-05-11: `make bootstrap-check` was skipped for M01.01 post-merge QA recovery because `make` is unavailable in the current Windows shell.
- [x] 2026-05-15: Finalized M01.01 as completed and merged after post-merge QA recovery before starting M01.02; latest git history shows commit `6480c1d` (`test: QA recovery M01.01 payment lifecycle (#12)`).
- [x] 2026-05-15: Started M01.02 builder on branch `m01-02-define-ledger-vocabulary`; branch guard passed, the starting worktree was clean, and M01.02 was marked `Builder in progress`.
- [x] 2026-05-15: Created `docs/domain/ledger-vocabulary.md` as documentation-only M01.02 domain vocabulary.
- [x] 2026-05-15: Updated the M01 domain index, domain README, README, docs index, and lightweight spec dependency notes to reference ledger vocabulary without defining runtime schemas or behavior.
- [x] 2026-05-15: Updated control-plane validation and bootstrap tests for ledger vocabulary documentation coverage.
- [x] 2026-05-15: Updated M01.02 tracking to `Builder complete, awaiting QA`.
- [x] 2026-05-15: Completed M01.02 QA review on branch `m01-02-define-ledger-vocabulary`; branch guard passed and the starting worktree was clean.
- [x] 2026-05-15: QA verified ledger vocabulary content, tracking, validation coverage, and forbidden-scope boundaries with no product implementation.
- [x] 2026-05-15: Updated M01.02 tracking to `QA passed, awaiting merge`.
- [x] 2026-05-15: Finalized M01.02 as completed and merged before starting M01.03; latest git history shows commit `fd1e259` (`docs: define M01.02 ledger vocabulary (#13)`).
- [x] 2026-05-15: Started M01.03 builder on branch `m01-03-define-settlement-vocabulary`; branch guard passed, the starting worktree was clean, `v0.1.0` exists, M01.03 was not started before this builder, and M01.03 was marked `Builder in progress`.
- [x] 2026-05-15: Created `docs/domain/settlement-vocabulary.md` as documentation-only M01.03 domain vocabulary.
- [x] 2026-05-15: Updated the M01 domain index, domain README, active docs, README, docs index, and lightweight spec dependency notes to reference settlement vocabulary without defining runtime schemas or behavior.
- [x] 2026-05-15: Updated control-plane validation and bootstrap tests for settlement vocabulary documentation coverage.
- [x] 2026-05-15: M01.03 validation passed with `python scripts/validate-control-plane.py`, `python -m pytest tests/test_control_plane_bootstrap.py` with 20 tests, and `git diff --check`.
- [x] 2026-05-15: `make bootstrap-check` could not run for M01.03 builder because `make` is unavailable in the current Windows shell.
- [x] 2026-05-15: Updated M01.03 tracking to `Builder complete, awaiting QA`.
- [x] 2026-05-16: Completed M01.03 QA review on branch `m01-03-define-settlement-vocabulary`; branch guard passed, starting worktree was clean, latest commit was `08ebdb5`, and `v0.1.0` exists.
- [x] 2026-05-16: QA verified settlement vocabulary content, domain links, lightweight spec dependency notes, tracking/status files, validation coverage, and forbidden-scope boundaries with no product implementation.
- [x] 2026-05-16: Updated M01.03 tracking to `QA passed, awaiting merge` while leaving M01.04 through M01.13 and M02 through M21 `Not started`.
- [x] 2026-05-16: Finalized M01.03 as completed and merged before starting M01.04; local `main` and `origin/main` point to commit `e54a917` (`docs: define M01.03 settlement vocabulary (#14)`).
- [x] 2026-05-16: Started M01.04 builder on branch `m01-04-define-reconciliation-vocabulary`; branch guard passed, the starting worktree was clean, and M01.04 was marked `Builder in progress`.
- [x] 2026-05-16: Created `docs/domain/reconciliation-vocabulary.md` as documentation-only M01.04 domain vocabulary.
- [x] 2026-05-16: Updated the M01 domain index, domain README, active docs, README, docs index, and lightweight spec dependency notes to reference reconciliation vocabulary without defining runtime schemas or behavior.
- [x] 2026-05-16: Updated control-plane validation and bootstrap tests for reconciliation vocabulary documentation coverage.
- [x] 2026-05-16: M01.04 validation passed with `python scripts/validate-control-plane.py`, `python -m pytest tests/test_control_plane_bootstrap.py` with 21 tests, and `git diff --check`.
- [x] 2026-05-16: `make bootstrap-check` could not run for M01.04 builder because `make` is unavailable in the current Windows shell.
- [x] 2026-05-16: Updated M01.04 tracking to `Builder complete, awaiting QA` while leaving M01.05 through M01.13 and M02 through M21 `Not started`.
- [x] 2026-05-16: QA reviewed M01.04 reconciliation vocabulary, domain links, lightweight spec dependency notes, tracking, validation coverage, and forbidden-scope boundaries.
- [x] 2026-05-16: M01.04 QA validation passed with `python scripts/validate-control-plane.py`, `python -m pytest tests/test_control_plane_bootstrap.py` with 21 tests, and `git diff --check`.
- [x] 2026-05-16: `make bootstrap-check` could not run for M01.04 QA because `make` is unavailable in the current Windows shell.
- [x] 2026-05-16: Updated M01.04 tracking to `QA passed, awaiting merge` while leaving M01.05 through M01.13 and M02 through M21 `Not started`.
- [x] 2026-05-16: Set the next recommended thread to `Merge M01.04 PR - Define Reconciliation Vocabulary`.
- [x] 2026-05-16: Finalized M01.04 as completed and merged before starting M01.05; latest git history shows commit `5dfe928` (`docs: define M01.04 reconciliation vocabulary (#15)`).
- [x] 2026-05-16: Started M01.05 builder on branch `m01-05-define-incident-vocabulary`; branch guard passed, the starting worktree was clean, and M01.05 was marked `Builder in progress`.
- [x] 2026-05-16: Created `docs/domain/incident-vocabulary.md` as documentation-only M01.05 domain vocabulary.
- [x] 2026-05-16: Created `docs/evals/ABLATION_STRATEGY.md` and `docs/evals/ABLATION_MATRIX.md` as documentation-only offline benchmark planning artifacts.
- [x] 2026-05-16: Updated MoneyFlowBench evaluation placeholders, M14 wording, concise future milestone notes for M11, M12, M17, M18, and M20, V1 scope, domain links, entry docs, lightweight spec dependency notes, and control-plane validation coverage.
- [x] 2026-05-16: Initial M01.05 `python scripts/validate-control-plane.py` run failed because two incident severity dimensions appeared only with initial capitals while validation expected lower-case phrases; lower-cased the scoped bullets and reran successfully.
- [x] 2026-05-16: M01.05 validation passed with `python scripts/validate-control-plane.py`, `python -m pytest tests/test_control_plane_bootstrap.py` with 23 tests, and `git diff --check`.
- [x] 2026-05-16: `make bootstrap-check` could not run for M01.05 builder because `make` is unavailable in the current Windows shell.
- [x] 2026-05-16: Updated M01.05 tracking to `Builder complete, awaiting QA` while leaving M01.06 through M01.13 and M02 through M21 `Not started`.
- [x] 2026-05-16: Started M01.05 post-merge QA recovery on branch `m01-05-qa-recovery-incident-vocabulary-ablation-strategy` after builder PR #16 was squash-merged before the required QA thread; branch guard passed, starting worktree was clean, latest commit was `5c3943b`, and tag `v0.1.0` exists.
- [x] 2026-05-16: Audited merged M01.05 incident vocabulary, ablation planning docs, MoneyFlowBench/eval notes, future milestone ablation notes, tracking/status files, validation coverage, and forbidden-scope boundaries; found no product implementation, runtime logic, ablation runner, benchmark code, runtime toggles, or future milestone start.
- [x] 2026-05-16: Applied scoped M01.05 QA recovery clarifications to incident vocabulary wording, tracking/status files, and control-plane validation expectations.
- [x] 2026-05-16: M01.05 post-merge QA recovery validation passed with `python scripts/validate-control-plane.py`, `python -m pytest tests/test_control_plane_bootstrap.py` with 23 tests, and `git diff --check`.
- [x] 2026-05-16: `make bootstrap-check` could not run for M01.05 QA recovery because `make` is unavailable in the current Windows shell.
- [x] 2026-05-16: Updated M01.05 tracking to the pre-finalization QA recovery state while leaving M01.06 through M01.13 and M02 through M21 `Not started`.
- [x] 2026-05-17: Finalized M01.05 as `Completed and merged` after local git history confirmed `main`, `origin/main`, and the current branch at commit `3bdedeb` (`test: QA recovery M01.05 incident vocabulary and ablation strategy (#18)`), while leaving M01.06 through M01.13 and M02 through M21 `Not started`.
- [x] 2026-05-17: M01.05 post-merge finalization validation passed with `python scripts/validate-control-plane.py`, `python -m pytest tests/test_control_plane_bootstrap.py -q` with 23 tests, and `git diff --check`.
- [x] 2026-05-17: Started M01.06 builder on branch `m01-06-define-safe-and-unsafe-repairs`; branch setup aligned the existing branch to updated `origin/main`, the starting worktree was clean, and M01.06 was marked `Builder in progress`.
- [x] 2026-05-17: Created `docs/domain/repair-vocabulary.md` as documentation-only M01.06 domain vocabulary for repair proposals, candidates, safe repairs, unsafe repairs, forbidden autonomous repairs, destructive actions, rollback plans, replay-before-apply, deterministic validation, idempotency, human approval, escalation, evidence requirements, uncertainty, blast radius, preconditions, postconditions, audit trails, compensation versus reversal, dry-run simulation, evidence-backed plans, and rejection reasons.
- [x] 2026-05-17: Updated domain links, status docs, milestone tracking, roadmap, capability and risk notes, weekly log, and control-plane validation coverage for M01.06.
- [x] 2026-05-17: Initial M01.06 `python scripts/validate-control-plane.py` failed because `docs/status/NEXT_RECOMMENDED_THREAD.md` blocked M01.07 and M02 in combined wording while validation expected the exact `Do not start M02` phrase; fixed the scoped wording and reran validation successfully.
- [x] 2026-05-17: M01.06 builder validation passed with `python scripts/validate-control-plane.py`, `python -m pytest tests/test_control_plane_bootstrap.py -q` with 24 tests, and `git diff --check`.
- [x] 2026-05-17: Updated M01.06 tracking to `Builder complete, awaiting QA` while leaving M01.07 through M01.13 and M02 through M21 `Not started`.
- [x] 2026-05-18: Completed M01.06 QA on branch `m01-06-define-safe-and-unsafe-repairs`; branch guard passed, the branch fast-forwarded cleanly, and PR #21 matches the expected branch and title.
- [x] 2026-05-18: QA confirmed repair vocabulary is complete, precise, documentation-only, safe-to-propose rather than safe-to-apply, and clear that LLM agents remain proposal-only.
- [x] 2026-05-18: QA confirmed M01.07 through M01.13 and M02 through M21 remain `Not started`, product implementation has not started, product directories contain placeholder README files only, and `.github/workflows/` does not exist.
- [x] 2026-05-18: At QA time, PR #21 body still contained default template placeholders; `gh` was unavailable, so this was recorded as a pre-merge accuracy note.
- [x] 2026-05-18: M01.06 QA validation passed with `python scripts/validate-control-plane.py`, `python -m pytest tests/test_control_plane_bootstrap.py -q` with 24 tests, and `git diff --check`; `make bootstrap-check` was skipped because `make` is unavailable in the current Windows shell.
- [x] 2026-05-18: Updated M01.06 tracking to `QA passed, awaiting merge` while leaving M01.07 through M01.13 and M02 through M21 `Not started`.
- [x] 2026-05-18: Finalized M01.06 after PR #21 merged into `main` at git commit `7adc96d` (`docs: define M01.06 safe and unsafe repairs (#21)`).
- [x] 2026-05-18: Updated M01.06 tracking to `Completed and merged` while leaving M01.07 through M01.13 and M02 through M21 `Not started`.
- [x] 2026-05-18: Updated the exact next recommended thread to `M01.07 Builder - Define Evidence Receipt Model`.
- [x] 2026-05-18: M01.06 post-merge finalization validation passed with `python scripts/validate-control-plane.py`, `python -m pytest tests/test_control_plane_bootstrap.py -q` with 24 tests, and `git diff --check`; `make bootstrap-check` was skipped because `make` is unavailable in the current Windows shell.
- [x] 2026-05-18: Started M01.07 builder on branch `m01-07-define-evidence-receipt-model`; branch setup passed after fetching `origin`, fast-forwarding `main` to `5cd675c`, confirming M01.06 is completed and merged, confirming M01.07 is the next recommended thread, and confirming the starting worktree was clean.
- [x] 2026-05-18: Marked M01.07 `Builder in progress` for documentation-only evidence receipt model work; validation expectation is docs-only ladder Levels 0, 1, 2, 4, and 7, with QA Level 8 later.
- [x] 2026-05-18: Created `docs/domain/evidence-receipt-model.md` as documentation-only M01.07 evidence receipt vocabulary for evidence receipts, sources, source identity, providers, raw and normalized evidence references, provenance, chain of custody, checksums or hashes, timestamps, freshness, retention, redaction, confidentiality, uncertainty, confidence, limitations, conflicts, coverage, gaps, bundles, statuses, rejection reasons, append-only handling, immutable raw evidence boundaries, derived evidence boundaries, and audit trails.
- [x] 2026-05-18: Updated domain links, documentation maps, status docs, milestone tracking, roadmap, capability and risk notes, weekly log, changelog, and control-plane validation coverage for M01.07 while leaving M01.08 through M01.13 and M02 through M21 `Not started`.
- [x] 2026-05-18: M01.07 builder validation passed with `python scripts/validate-control-plane.py`, `python -m pytest tests/test_control_plane_bootstrap.py -q` with 25 tests, and `git diff --check`; `make bootstrap-check` was skipped because `make` is unavailable in the current Windows shell.
- [x] 2026-05-18: Updated M01.07 tracking to `Builder complete, awaiting QA`; product implementation has not started, and no evidence ingestion runtime, storage layer, database, schema, API, parser, connector, MoneyEvent runtime, ledger runtime, incident runtime, repair runtime, agent runtime, GitHub Actions, CI workflow, deployment, auth/authz implementation, structured logging implementation, or product behavior was added.
- [x] 2026-05-18: Completed M01.07 QA on branch `m01-07-define-evidence-receipt-model`; branch setup passed, the branch was up to date, PR #23 matched the expected branch and title, and builder commit `509738d` was present.
- [x] 2026-05-18: QA confirmed the evidence receipt model covers required vocabulary, source evidence separation from summaries, provenance, chain of custody, timestamp distinctions, redaction and confidentiality boundaries, uncertainty, conflicts, gaps, bundles, append-only handling, immutable raw evidence boundaries, derived evidence boundaries, relationships to M01.01 through M01.06, and moat rationale.
- [x] 2026-05-18: QA applied scoped wording clarifications so missing evidence explicitly includes gap outcomes and evidence receipts explicitly do not mutate financial truth.
- [x] 2026-05-18: QA found a UTF-8 BOM in `docs/milestones/SUBMILESTONE_REGISTRY.md`; the same BOM exists on `origin/main`, so it is benign and pre-existing. No risky bidirectional, isolate, or zero-width characters were introduced by M01.07.
- [x] 2026-05-18: M01.07 QA validation passed with `python scripts/validate-control-plane.py`, `python -m pytest tests/test_control_plane_bootstrap.py -q` with 25 tests, and `git diff --check`; `make bootstrap-check` was skipped because `make` is unavailable in the current Windows shell.
- [x] 2026-05-18: Updated M01.07 tracking to `QA passed, awaiting merge`; product implementation has not started, and no evidence ingestion runtime, storage layer, database, schema, API, parser, connector, MoneyEvent runtime, ledger runtime, incident runtime, repair runtime, agent runtime, GitHub Actions, CI workflow, deployment, auth/authz implementation, structured logging implementation, or product behavior was added.
- [x] 2026-05-18: Started M01.07 post-merge finalization on branch `m01-07-post-merge-finalization`; setup fetched `origin`, fast-forwarded local `main`, confirmed the pre-finalization worktree was clean, and created the branch from updated `main`.
- [x] 2026-05-18: Finalized M01.07 after PR #23 merged into `main` at git commit `a88b5ff` (`docs: define M01.07 evidence receipt model (#23)`), with local `main` and `origin/main` confirmed at `0313f4e` (`docs: define M01.07 evidence receipt model`).
- [x] 2026-05-18: Updated M01.07 tracking to `Completed and merged` while leaving M01.08 through M01.13 and M02 through M21 `Not started`.
- [x] 2026-05-18: Updated the exact next recommended thread to `M01.08 Builder - Define Human Review States`.
- [x] 2026-05-18: M01.07 post-merge finalization validation passed with `python scripts/validate-control-plane.py`, `python -m pytest tests/test_control_plane_bootstrap.py -q` with 25 tests, and `git diff --check`; `make bootstrap-check` was skipped because `make` is unavailable in the current Windows shell.
- [x] 2026-05-21: Started M01.08 builder on branch `m01-08-define-human-review-states`; branch guard passed, the starting worktree was clean, latest commit was `6ff0cfa` (`docs: finalize M01.07 after merge (#25)`), and tag `v0.1.0` exists.
- [x] 2026-05-21: Marked M01.08 `Builder in progress` for documentation-only human review state vocabulary work; validation expectation is docs-only control-plane validation with no product runtime behavior.
- [x] 2026-05-21: Created `docs/domain/human-review-states.md` as documentation-only M01.08 vocabulary for human review concepts, actors, statuses, decision states, repair-review states, approval boundaries, AI boundaries, evidence expectations, correctness questions, and failure patterns.
- [x] 2026-05-21: Updated domain links, entry docs, lightweight spec dependency notes, status docs, milestone tracking, roadmap, capability and risk notes, weekly log, and control-plane validation coverage for M01.08 while leaving M01.09 through M01.13 and M02 through M21 `Not started`.
- [x] 2026-05-21: M01.08 builder validation passed with `python scripts/validate-control-plane.py`, `python -m pytest tests/test_control_plane_bootstrap.py` with 26 tests, and `git diff --check`; `make bootstrap-check` was skipped because `make` is unavailable in the current Windows shell.
- [x] 2026-05-21: Updated M01.08 tracking to `Builder complete, awaiting QA`; product implementation has not started, and no human-review runtime, review queue, state machine, approval engine, API, database, UI, repair execution, agent runtime, GitHub Actions, CI workflow, deployment, auth/authz implementation, structured logging implementation, or product behavior was added.
- [x] 2026-05-21: Completed M01.08 QA on branch `m01-08-define-human-review-states`; branch guard passed, the starting worktree was clean, latest commit was `3ed6b7a` (`docs: define M01.08 human review states`), and tag `v0.1.0` exists.
- [x] 2026-05-21: QA verified human review vocabulary content, domain links, lightweight spec dependency notes, tracking/status files, validation coverage, and forbidden-scope boundaries.
- [x] 2026-05-21: QA found no human-review content defects and made only tracking/status/control-plane validation updates.
- [x] 2026-05-21: M01.08 QA validation passed with `python scripts/validate-control-plane.py`, `python -m pytest tests/test_control_plane_bootstrap.py` with 26 tests, and `git diff --check`; `make bootstrap-check` was skipped because `make` is unavailable in the current Windows shell.
- [x] 2026-05-21: Updated M01.08 tracking to `QA passed, awaiting merge` while leaving M01.09 through M01.13 and M02 through M21 `Not started`; product implementation has not started, and no human-review runtime, review queue, state machine, approval engine, API, database, UI, repair execution, agent runtime, GitHub Actions, CI workflow, deployment, auth/authz implementation, structured logging implementation, or product behavior was added.
- [x] 2026-05-21: Finalized M01.08 as `Completed and merged` after PR #26 merged at git commit `1fde07a` (`docs: define M01.08 human review states (#26)`) before starting M01.09.
- [x] 2026-05-21: Started M01.09 builder on branch `m01-09-define-out-of-scope-domains`; branch guard passed, the starting worktree was clean, latest commit was `1fde07a`, and tag `v0.1.0` exists.
- [x] 2026-05-21: Marked M01.09 `Builder in progress` for documentation-only out-of-scope domain boundary work.
- [x] 2026-05-21: Created `docs/domain/out-of-scope-domains.md` as documentation-only scope-boundary vocabulary for hard out-of-scope domains, adjacent-but-not-core domains, forbidden claims, LLM forbidden actions, future-extension rules, positioning boundaries, and examples.
- [x] 2026-05-21: Updated domain links, entry docs, high-level positioning docs, lightweight spec dependency notes, status docs, milestone tracking, roadmap, capability, risk and tech-debt notes, active plan, and control-plane validation coverage for M01.09 while leaving M01.10 through M01.13 and M02 through M21 `Not started`.
- [x] 2026-05-21: Finalized M01.09 as `Completed and merged` after PR #27 merged at git commit `1b40773` (`docs: define M01.09 out-of-scope domains (#27)`) before starting M01.10.
- [x] 2026-05-21: Started M01.10 builder on branch `m01-10-write-domain-model`; branch guard passed, the starting worktree was clean, latest commit was `1b40773`, remote `origin` points to GitHub, and tag `v0.1.0` exists.
- [x] 2026-05-21: Marked M01.10 `Builder in progress` for documentation-only `docs/DOMAIN_MODEL.md` summary work while leaving M01.11 through M01.13 and M02 through M21 `Not started`.
- [x] 2026-05-21: Rewrote `docs/DOMAIN_MODEL.md` as the canonical M01 domain model summary and updated concise entry-doc, tracking, status, and validation coverage.
- [x] 2026-05-21: M01.10 builder validation passed with `python scripts/validate-control-plane.py`, `python -m pytest tests/test_control_plane_bootstrap.py` with 27 tests, and `git diff --check`; `make bootstrap-check` was skipped because `make` is unavailable in the current Windows shell.
- [x] 2026-05-21: Updated M01.10 tracking to `Builder complete, awaiting QA`; product implementation has not started, and no MoneyEvent runtime, ledger runtime, settlement runtime, reconciliation runtime, incident runtime, invariant engine, causal graph runtime, replay runtime, agent runtime, repair planner runtime, human-review runtime, UI, external connector, database schema, API route, GitHub Action, CI workflow, or product behavior was added.
- [x] 2026-05-21: Started M01.10 post-merge QA recovery on branch `m01-10-qa-recovery-domain-model` after builder PR #28 was squash-merged before required QA at commit `dc6800b`; branch guard passed, the starting worktree was clean, remote `origin` points to GitHub, and tag `v0.1.0` exists.
- [x] 2026-05-21: Audited the already-merged M01.10 DOMAIN_MODEL.md work, tracking/status files, validation coverage, and forbidden-scope boundaries; found no domain model content defects and no product implementation.
- [x] 2026-05-21: Recorded the M01.10 merge-before-QA protocol deviation and QA recovery in tracking/status files.
- [x] 2026-05-21: M01.10 QA recovery validation passed with `python scripts/validate-control-plane.py`, `python -m pytest tests/test_control_plane_bootstrap.py` with 27 tests, and `git diff --check`; `make bootstrap-check` was skipped because `make` is unavailable in the current Windows shell.
- [x] 2026-05-21: Updated M01.10 tracking to `QA recovery passed, awaiting recovery PR merge`; M01.11 through M01.13 and M02 through M21 remain `Not started`, and product implementation has not started.

## Surprises & Discoveries

- `v0.1.0` already exists and should remain the M00 repo operating system foundation release.
- `plans/active/` contained only its README placeholder before this plan was created.
- The only future-launch versioning conflict found was M20.12 using `Add v0.1.0 release`; that wording now refers to the public product release instead.
- Product and future infrastructure directories still contain placeholder README files only.
- M01 planning QA found entry-doc reference coverage gaps that the builder validation did not catch; validation coverage now checks those references and the full active-plan submilestone list.
- M01.01 builder PR #11 was accidentally squash-merged before the required QA thread; this plan records that the post-merge QA recovery path was completed before M01.02 began.
- M01.02 needed ledger vocabulary terms that are precise enough for future ledger, invariant, incident, graph, replay, and repair work while remaining documentation-only.
- M01.03 needs settlement vocabulary precise enough for future MoneyEvent, provider and bank simulator, invariant, incident, graph, replay, and connector work while remaining documentation-only.
- M01.04 needs reconciliation vocabulary precise enough for future provider and bank simulator, invariant, incident, causal graph, replay, repair planner, and MoneyFlowBench work while remaining documentation-only.
- M01.05 needs incident vocabulary precise enough for future invariants, incident engine, causal graph, replay, agentic investigation, repair planner, and MoneyFlowBench work while remaining documentation-only.
- M01.05 builder PR #16 was accidentally squash-merged before the required QA thread; this plan records that the post-merge QA recovery path merged through PR #18 at commit `3bdedeb` before M01.06 begins.
- M01.06 needs repair vocabulary precise enough for future agent tool contracts, repair planner, human review, replay, security hardening, and MoneyFlowBench work while remaining documentation-only and proposal-only.
- M01.07 needs evidence receipt vocabulary precise enough for future evidence bundles, incident timelines, causal graph links, replay, deterministic validation, repair proposals, and enterprise audit boundaries while remaining documentation-only and non-runtime.
- M01.08 needs human review vocabulary precise enough for future repair planner, human review workbench, security hardening, audit logs, public launch, and agentic investigation boundaries while remaining documentation-only and non-runtime.
- M01.09 needs out-of-scope boundaries precise enough to prevent future positioning, agent, repair, legal, tax, AML/KYC, sanctions, fraud, credit, treasury, banking, payment-processing, and autonomous-money-movement scope drift while remaining documentation-only and non-runtime.
- M01.10 needs a canonical domain model summary precise enough for future implementation threads to orient from one file while still following the source domain docs and not duplicating every detail.
- M01.10 builder PR #28 was accidentally squash-merged before the required QA thread; this plan records that post-merge QA recovery passed and must merge before M01.11 begins.

## Decision Log

- 2026-05-11: Treat `v0.1.0` as a control-plane foundation release, not a product release.
- 2026-05-11: Mark M01 as `Planning in progress` at the milestone level while keeping M01.01 through M01.13 `Not started`.
- 2026-05-11: Use `Prepare v1.0.0 public release` as the consistent M20.12 wording.
- 2026-05-11: Keep M01 planning scoped to docs, specifications, tracking, and validation; no product runtime artifacts are allowed.
- 2026-05-11: QA fixes remain scoped to M01 planning documentation, status clarity, and control-plane validation coverage; no M01.01 or product implementation work is started.
- 2026-05-11: Because M01.01 was merged before QA, record M01.01 as `Completed and merged` only with explicit post-merge QA recovery notes, and do not start M01.02 until the QA recovery PR merges.
- 2026-05-15: M01.01 QA recovery is merged; M01.02 may proceed as documentation-only ledger vocabulary work.
- 2026-05-15: Keep ledger balance, posting, reversal, and adjustment rules deterministic future work; M01.02 defines vocabulary only and does not authorize agents to post ledger entries.
- 2026-05-15: M01.02 is merged at commit `fd1e259`; M01.03 may proceed as documentation-only settlement vocabulary work.
- 2026-05-15: Keep settlement matching, reconciliation, invariant evaluation, incident creation, replay, connector ingestion, and repair behavior deterministic future work; M01.03 defines vocabulary only and does not authorize agents to mutate money or ledger state.
- 2026-05-16: M01.03 QA passed as documentation-only settlement vocabulary work; the submilestone is safe for PR merge but must not be marked `Completed and merged` until merge is confirmed.
- 2026-05-16: M01.03 is merged at commit `e54a917`; M01.04 may proceed as documentation-only reconciliation vocabulary work.
- 2026-05-16: Keep reconciliation matching, tolerance evaluation, exception handling, invariant evaluation, incident creation, replay, repair planning, connectors, and ledger mutation deterministic future work; M01.04 defines vocabulary only and does not authorize agents to mutate money, post ledger entries, or resolve exceptions as financial truth.
- 2026-05-16: M01.04 is merged at commit `5dfe928`; M01.05 may proceed as documentation-only incident vocabulary work plus scoped ablation roadmap/evaluation planning.
- 2026-05-16: Ablation planning belongs to offline benchmark strategy and future roadmap notes only in this slice; dangerous ablations may be described as offline negative controls, not production toggles.
- 2026-05-16: Because M01.05 was merged before QA at commit `5c3943b`, record M01.05 in the pre-finalization QA recovery state and do not start M01.06 until the recovery PR merges and post-merge finalization records M01.05 as completed.
- 2026-05-17: M01.05 QA recovery PR #18 merged at commit `3bdedeb`; record M01.05 as `Completed and merged` and set the next recommended thread to `M01.06 Builder - Define Safe and Unsafe Repairs`.
- 2026-05-17: Existing branch `m01-06-define-safe-and-unsafe-repairs` contained no unique M01.06 work and was behind `origin/main`; align it to updated `origin/main` before starting M01.06 builder work.
- 2026-05-17: Keep M01.06 repair work documentation-only. Safe repair means safe to propose for human review, not safe for autonomous application.
- 2026-05-18: M01.06 QA found no repair-boundary content defect. At QA time, PR-body accuracy was recorded as a pre-merge issue because PR #21 still had default template placeholders and `gh` was unavailable in the current Windows shell.
- 2026-05-18: PR #21 merged into `main` at git commit `7adc96d`; record M01.06 as `Completed and merged` and set the next recommended thread to `M01.07 Builder - Define Evidence Receipt Model`.
- 2026-05-18: Keep M01.07 evidence receipt work documentation-only. Evidence receipts support investigation and repair proposal evidence links, but they do not become financial truth by themselves and do not authorize autonomous evidence mutation, evidence deletion, repair approval, money mutation, or runtime evidence processing.
- 2026-05-21: Keep M01.08 human review work documentation-only. Human review states describe future review vocabulary and boundaries, but they do not create a runtime approval workflow, allow AI approval, bypass deterministic validators, or authorize production repair execution.
- 2026-05-21: PR #26 merged into `main` at git commit `1fde07a`; record M01.08 as `Completed and merged` and start M01.09 only after that finalization.
- 2026-05-21: Keep M01.09 out-of-scope domain work documentation-only. It defines non-goals, adjacent-domain boundaries, forbidden claims, and LLM forbidden actions, but it does not create product features, legal/tax/AML/KYC/fraud/credit/investment decisions, production write tools, or runtime behavior.
- 2026-05-21: PR #27 merged into `main` at git commit `1b40773`; record M01.09 as `Completed and merged` and start M01.10 only after that finalization.
- 2026-05-21: Keep M01.10 DOMAIN_MODEL.md work documentation-only. The canonical domain model summary may synthesize domain vocabulary and future dependencies, but it does not define runtime schemas, validators, state machines, APIs, databases, or product behavior.
- 2026-05-21: Because M01.10 was merged before QA at commit `dc6800b`, record M01.10 as `QA recovery passed, awaiting recovery PR merge` after the recovery audit and do not start M01.11 until the recovery PR merges.

## Context and Orientation

M00 Repo Operating System is complete. M00.01 through M00.08 are `Completed and merged`, `docs/status/M00_CLOSEOUT.md` exists, and `v0.1.0` tags the repo operating system foundation.

M01 is the next milestone. It exists to settle payment, ledger, settlement, reconciliation, incident, repair, evidence, review-state, and out-of-scope language before future implementation milestones create product behavior.

Current source directories under `apps/`, `packages/`, `scenarios/`, `data/`, and `infra/` are placeholders only. Their README files do not implement product behavior.

Current M01 submilestone state:

- `M01.01 Define payment lifecycle` - Completed and merged after post-merge QA recovery.
- `M01.02 Define ledger vocabulary` - Completed and merged.
- `M01.03 Define settlement vocabulary` - Completed and merged.
- `M01.04 Define reconciliation vocabulary` - Completed and merged.
- `M01.05 Define incident vocabulary` - Completed and merged after QA recovery PR #18.
- `M01.06 Define safe and unsafe repairs` - Completed and merged after PR #21.
- `M01.07 Define evidence receipt model` - Completed and merged after PR #23.
- `M01.08 Define human review states` - Completed and merged after PR #26.
- `M01.09 Define out-of-scope domains` - Completed and merged after PR #27.
- `M01.10 Write DOMAIN_MODEL.md` - QA recovery passed, awaiting recovery PR merge.
- `M01.11 Write RELIABILITY.md`
- `M01.12 Write THREAT_MODEL.md`
- `M01.13 QA domain consistency`

M01.09 is `Completed and merged`. M01.10 is `QA recovery passed, awaiting recovery PR merge`. M01.11 through M01.13 remain planned scope only and are not started.

## Scope

Original M01 planning scope completed before M01.01:

- Create `plans/active/CLP-0002-m01-domain-model-and-scope-freeze.md`.
- Update current-state tracking to show M01 planning was active during the planning slice.
- Keep M01.01 through M01.13 `Not started` during the planning slice.
- Keep M02 through M21 `Not started`.
- Add versioning and release-scope documentation.
- Add `CHANGELOG.md`.
- Correct M20.12 release wording so it no longer conflicts with the existing `v0.1.0` foundation tag.
- Update validation so the new control-plane artifacts are required.
- Run control-plane validation, bootstrap tests, diff whitespace checks, and `make bootstrap-check` when available.

Current M01.01 builder scope:

- Create `docs/domain/README.md`.
- Create `docs/domain/payment-lifecycle.md`.
- Update `docs/DOMAIN_MODEL.md` into an M01 domain index.
- Add concise links to the new domain docs from entry docs.
- Add lightweight domain-dependency notes to related spec placeholders.
- Update M01.01 tracking and validation coverage.
- Keep M01.02 through M01.13 `Not started`.
- Keep M02 through M21 `Not started`.

Current M01.01 QA recovery scope:

- Audit the already-merged M01.01 builder work from commit `1175789`.
- Fix only scoped M01.01 documentation, tracking, or validation defects if found.
- Record the post-merge QA recovery clearly in the active plan, milestone docs, registry, status files, and validation coverage.
- Keep M01.02 through M01.13 `Not started`.
- Keep M02 through M21 `Not started`.

Completed M01.02 builder scope:

- Finalize M01.01 recovery state as completed and merged before M01.02 work.
- Create `docs/domain/ledger-vocabulary.md`.
- Define ledger vocabulary, account categories, double-entry language, ledger states, evidence examples, correctness questions, and failure-pattern vocabulary.
- Link the ledger vocabulary doc from `docs/DOMAIN_MODEL.md`, `docs/domain/README.md`, `docs/INDEX.md`, and `README.md`.
- Add lightweight domain-dependency notes to related spec placeholders.
- Update M01.02 tracking and validation coverage.
- Keep M01.03 through M01.13 `Not started`.
- Keep M02 through M21 `Not started`.

Completed M01.02 QA scope:

- Audit `docs/domain/ledger-vocabulary.md`, related domain links, lightweight spec notes, tracking/status files, and validation coverage.
- Fix only scoped M01.02 documentation, tracking, or validation defects if found.
- Mark M01.02 `QA passed, awaiting merge` only after validation passes.
- Keep M01.03 through M01.13 `Not started`.
- Keep M02 through M21 `Not started`.

Completed M01.03 builder scope:

- Finalize M01.02 as completed and merged before M01.03 work.
- Create `docs/domain/settlement-vocabulary.md`.
- Define settlement terms, actors, statuses, paths, evidence examples, correctness questions, and failure-pattern vocabulary.
- Link the settlement vocabulary doc from `docs/DOMAIN_MODEL.md`, `docs/domain/README.md`, `docs/INDEX.md`, and `README.md`.
- Add lightweight domain-dependency notes to related spec placeholders.
- Update M01.03 tracking and validation coverage.
- Keep M01.04 through M01.13 `Not started`.
- Keep M02 through M21 `Not started`.

Completed M01.04 builder scope:

- Finalize M01.03 as completed and merged before M01.04 work.
- Create `docs/domain/reconciliation-vocabulary.md`.
- Define reconciliation terms, sources and targets, statuses, paths, evidence examples, correctness questions, and failure-pattern vocabulary.
- Link the reconciliation vocabulary doc from `docs/DOMAIN_MODEL.md`, `docs/domain/README.md`, `docs/INDEX.md`, and `README.md`.
- Add lightweight domain-dependency notes to related spec placeholders.
- Update M01.04 tracking and validation coverage.
- Keep M01.05 through M01.13 `Not started`.
- Keep M02 through M21 `Not started`.

Completed M01.05 builder scope:

- Finalize M01.04 as completed and merged before M01.05 work.
- Create `docs/domain/incident-vocabulary.md`.
- Define incident terms, actors, statuses, severity, types, paths, evidence examples, correctness questions, failure-pattern vocabulary, and boundaries.
- Add ablation strategy planning in `docs/evals/ABLATION_STRATEGY.md` and `docs/evals/ABLATION_MATRIX.md`.
- Add concise ablation support notes to MoneyFlowBench evaluation docs and future milestone docs without marking future milestones started.
- Link the incident vocabulary doc from `docs/DOMAIN_MODEL.md`, `docs/domain/README.md`, `docs/INDEX.md`, and `README.md`.
- Add lightweight domain-dependency notes to related spec placeholders.
- Update M01.05 tracking and validation coverage.
- Keep M01.06 through M01.13 `Not started`.
- Keep M02 through M21 `Not started`.

Completed M01.06 builder scope:

- Confirm M01.05 is completed and merged after QA recovery PR #18.
- Create `docs/domain/repair-vocabulary.md`.
- Define repair proposal, repair candidate, safe repair, unsafe repair, forbidden autonomous repair, destructive action, rollback plan, replay-before-apply, deterministic validation, idempotency key, human approval, escalation, repair evidence requirements, repair uncertainty, repair blast radius, repair preconditions, repair postconditions, repair audit trail, compensation versus reversal, dry-run repair simulation, evidence-backed repair plan, and repair rejection reason.
- Define repair categories and whether they are safe to propose, require human approval, require replay-before-apply, require deterministic validation, require escalation, or are forbidden for autonomous agents.
- Explain that LLM agents may propose repair plans but may not apply repairs or mutate financial truth.
- Link the repair vocabulary doc from domain and entry docs.
- Update M01.06 tracking and validation coverage.
- Keep M01.07 through M01.13 `Not started`.
- Keep M02 through M21 `Not started`.

Completed M01.07 builder scope:

- Confirm M01.06 is completed and merged after PR #21.
- Create `docs/domain/evidence-receipt-model.md`.
- Define evidence receipt, evidence source, source identity, evidence provider, raw evidence reference, normalized evidence reference, provenance, chain of custody, checksum or hash, evidence timestamp, ingestion timestamp, observation timestamp, received-at timestamp, evidence freshness, evidence retention state, redaction boundary, evidence confidentiality class, evidence uncertainty, evidence confidence, evidence limitation, evidence conflict, evidence coverage, evidence gap, evidence bundle, evidence receipt status, evidence rejection reason, append-only evidence handling, immutable raw evidence boundary, derived evidence boundary, and evidence audit trail.
- Explain evidence safety boundaries, missing-evidence refusal or limitation states, conflict surfacing, redaction without destroyed auditability, and destructive evidence mutation or deletion boundaries.
- Connect evidence receipts to payment lifecycle events, ledger facts, settlement files, reconciliation findings, incident timelines, and repair proposals.
- Link the evidence receipt model doc from domain and entry docs.
- Update M01.07 tracking and validation coverage.
- Keep M01.08 through M01.13 `Not started`.
- Keep M02 through M21 `Not started`.

Out of scope:

- Product functionality.
- MoneyEvent logic or runtime schemas.
- Ledger logic.
- Invariant logic.
- Incident logic.
- Causal graph logic.
- Replay logic.
- Agent runtime.
- Repair planning logic.
- UI features.
- External connectors.
- GitHub Actions or CI workflows.
- Database schemas.
- API routes.
- M01.01 product implementation or runtime behavior.
- M01.02 product implementation or runtime behavior.
- M01.03 product implementation or runtime behavior.
- M01.04 product implementation or runtime behavior.
- M01.05 product implementation or runtime behavior.
- M01.07 runtime implementation or evidence processing behavior.
- M01.08 runtime implementation or human-review behavior.
- M01.11 implementation.
- M02 implementation.
- M02-M21 started-status changes beyond explicit future-planning wording for ablation support in M11, M12, M14, M17, M18, and M20.

## Plan of Work

Original M01 planning work completed:

1. Create the active M01 plan from the exec plan template and make it self-contained.
2. Add versioning docs:
   - `docs/VERSIONING.md`
   - `docs/releases/RELEASE_LADDER.md`
   - `docs/releases/V1_SCOPE.md`
   - `CHANGELOG.md`
3. Update roadmap, M01, current-state, next-thread, capability, active-doc, and index files to reflect M01 planning.
4. Clean stale current-state M00 closeout language without rewriting historical audit records.
5. Correct M20.12 wording in `docs/milestones/M20.md` and `docs/milestones/SUBMILESTONE_REGISTRY.md`.
6. Update control-plane validation and bootstrap tests to require the new M01 planning and versioning artifacts.
7. Run validation and record results.

Current M01.01 builder work:

1. Finalize M01 planning merge tracking from git history.
2. Mark M01.01 as `Builder in progress`.
3. Define payment lifecycle vocabulary in `docs/domain/payment-lifecycle.md`.
4. Link the payment lifecycle doc from `docs/DOMAIN_MODEL.md`, `docs/INDEX.md`, and `README.md`.
5. Add lightweight domain-dependency notes to related spec placeholders.
6. Update M01.01 tracking files.
7. Add documentation-only validation checks.
8. Run validation and record results before marking M01.01 `Builder complete, awaiting QA`.

Current M01.01 QA recovery work:

1. Confirm the recovery branch guard and clean starting worktree.
2. Audit the merged M01.01 payment lifecycle domain docs and related tracking.
3. Verify no product implementation or future submilestone scope was started.
4. Record the accidental pre-QA merge and post-merge QA recovery.
5. Update control-plane validation checks from the stale pre-QA state to the recovery state.
6. Run validation and record results before the recovery PR is opened or merged.

Completed M01.02 builder work:

1. Finalize M01.01 recovery merge tracking from git history.
2. Mark M01.02 as `Builder in progress`.
3. Define ledger vocabulary in `docs/domain/ledger-vocabulary.md`.
4. Link the ledger vocabulary doc from domain and entry docs.
5. Add lightweight domain-dependency notes to related spec placeholders.
6. Update M01.02 tracking files.
7. Add documentation-only validation checks.
8. Run validation and record results before marking M01.02 `Builder complete, awaiting QA`.

Completed M01.03 builder work:

1. Finalize M01.02 merge tracking from git history.
2. Mark M01.03 as `Builder in progress`.
3. Define settlement vocabulary in `docs/domain/settlement-vocabulary.md`.
4. Link the settlement vocabulary doc from domain and entry docs.
5. Add lightweight domain-dependency notes to related spec placeholders.
6. Update M01.03 tracking files.
7. Add documentation-only validation checks.
8. Run validation and record results before marking M01.03 `Builder complete, awaiting QA`.

Completed M01.04 builder work:

1. Finalize M01.03 merge tracking from git history.
2. Mark M01.04 as `Builder in progress`.
3. Define reconciliation vocabulary in `docs/domain/reconciliation-vocabulary.md`.
4. Link the reconciliation vocabulary doc from domain and entry docs.
5. Add lightweight domain-dependency notes to related spec placeholders.
6. Update M01.04 tracking files.
7. Add documentation-only validation checks.
8. Run validation and record results before marking M01.04 `Builder complete, awaiting QA`.

Completed M01.05 builder work:

1. Finalize M01.04 merge tracking from git history.
2. Mark M01.05 as `Builder in progress`.
3. Define incident vocabulary in `docs/domain/incident-vocabulary.md`.
4. Add ablation strategy and ablation matrix planning docs.
5. Link incident and ablation planning docs from domain and entry docs.
6. Add lightweight domain-dependency notes to related spec placeholders.
7. Update M01.05 tracking files.
8. Add documentation-only validation checks.
9. Run validation and record results before marking M01.05 `Builder complete, awaiting QA`.

Completed M01.05 QA recovery work:

1. Confirm the recovery branch guard and clean starting worktree.
2. Audit the merged M01.05 incident vocabulary, ablation planning docs, related tracking, and validation coverage from commit `5c3943b`.
3. Verify no product implementation, ablation runner, benchmark code, runtime toggles, or future milestone start was introduced.
4. Record the accidental pre-QA merge and post-merge QA recovery.
5. Update control-plane validation checks from the stale pre-QA state to the recovery state.
6. Run validation and record results before the recovery PR is opened or merged.

Current M01.05 post-merge finalization work:

1. Confirm local git history shows M01.05 QA recovery merged into `main` at commit `3bdedeb`.
2. Record M01.05 as `Completed and merged`.
3. Record QA recovery PR #18 and merge commit `3bdedeb`.
4. Set the next recommended thread to `M01.06 Builder - Define Safe and Unsafe Repairs`.
5. Keep M01.06 through M01.13 and M02 through M21 `Not started`.
6. Run validation and record results.

Completed M01.06 builder work:

1. Confirm M01.05 is `Completed and merged` after QA recovery PR #18 and M01.06 is the next recommended thread.
2. Mark M01.06 as `Builder in progress` on branch `m01-06-define-safe-and-unsafe-repairs`.
3. Define safe and unsafe repair vocabulary in `docs/domain/repair-vocabulary.md`.
4. Link the repair vocabulary doc from domain and entry docs.
5. Update M01.06 tracking files.
6. Add documentation-only validation checks.
7. Run validation and record results before marking M01.06 `Builder complete, awaiting QA`.

Completed M01.06 QA work:

1. Confirm the branch guard, fast-forward state, expected branch, and expected PR #21 metadata.
2. Review the repair vocabulary, safe-to-propose boundary, unsafe and forbidden autonomous repair categories, evidence/replay/validation language, domain links, and status tracking.
3. Confirm no product runtime code, APIs, databases, GitHub Actions, CI workflows, deployment, auth/authz, structured logging, runtime error handling, repair execution, or future milestone work was added.
4. Update M01.06 tracking files to `QA passed, awaiting merge`.
5. Record the PR body accuracy note because `gh` is unavailable.
6. Run validation and record results before marking M01.06 `QA passed, awaiting merge`.

Completed M01.06 post-merge finalization work:

1. Confirm PR #21 merged into `main` at git commit `7adc96d` (`docs: define M01.06 safe and unsafe repairs (#21)`).
2. Record M01.06 as `Completed and merged`.
3. Set the next recommended thread to `M01.07 Builder - Define Evidence Receipt Model`.
4. Keep M01.07 through M01.13 and M02 through M21 `Not started`.
5. Run validation and record results.

Completed M01.07 builder work:

1. Confirm M01.06 is `Completed and merged` after PR #21 and M01.07 is the next recommended thread.
2. Mark M01.07 as `Builder in progress` on branch `m01-07-define-evidence-receipt-model`.
3. Define evidence receipt vocabulary in `docs/domain/evidence-receipt-model.md`.
4. Link the evidence receipt model doc from domain and entry docs.
5. Update M01.07 tracking files.
6. Add documentation-only validation checks.
7. Run validation and record results before marking M01.07 `Builder complete, awaiting QA`.

Completed M01.07 QA work:

1. Confirm the branch guard, fast-forward state, expected branch, PR #23 metadata, and builder commit `509738d`.
2. Review the evidence receipt model, domain links, status tracking, validation coverage, hidden-character warning, and forbidden-scope boundaries.
3. Apply scoped documentation wording clarifications for missing evidence gap outcomes and no financial-truth mutation.
4. Update M01.07 tracking files to `QA passed, awaiting merge`.
5. Run validation and record results before merge readiness handoff.

Completed M01.07 post-merge finalization work:

1. Confirm PR #23 merged into `main` at git commit `a88b5ff` (`docs: define M01.07 evidence receipt model (#23)`).
2. Confirm local `main` and `origin/main` were updated to git commit `0313f4e` (`docs: define M01.07 evidence receipt model`).
3. Record M01.07 as `Completed and merged`.
4. Set the next recommended thread to `M01.08 Builder - Define Human Review States`.
5. Keep M01.08 through M01.13 and M02 through M21 `Not started`.
6. Run validation and record results.

Completed M01.08 builder work:

1. Confirm M01.07 is `Completed and merged` after PR #23 and M01.08 is the next recommended thread.
2. Mark M01.08 as `Builder in progress` on branch `m01-08-define-human-review-states`.
3. Define human review states in `docs/domain/human-review-states.md`.
4. Link the human review states doc from domain and entry docs.
5. Add lightweight domain-dependency notes to related spec placeholders.
6. Update M01.08 tracking files.
7. Add documentation-only validation checks.
8. Run validation and record results before marking M01.08 `Builder complete, awaiting QA`.

Completed M01.08 QA work:

1. Confirm branch guard, clean starting worktree, latest commit, and `v0.1.0` tag.
2. Review `docs/domain/human-review-states.md` for required vocabulary, actor, state, repair-review, approval-boundary, AI-boundary, evidence, correctness-question, failure-pattern, and future-M01 boundary coverage.
3. Verify domain links and lightweight spec dependency notes stay documentation-only.
4. Verify tracking/status files keep M01.08 pre-merge, M01.09 through M01.13 not started, M02 through M21 not started, and product implementation not started.
5. Update M01.08 tracking files to `QA passed, awaiting merge`.
6. Set the next recommended thread to `Merge M01.08 PR - Define Human Review States`.
7. Update control-plane validation and bootstrap tests to enforce the post-QA M01.08 state.
8. Run validation and record results.

Completed M01.09 builder work:

1. Finalize M01.08 merge tracking from git history at `1fde07a` (`docs: define M01.08 human review states (#26)`).
2. Mark M01.09 as `Builder in progress` on branch `m01-09-define-out-of-scope-domains`.
3. Define out-of-scope domains in `docs/domain/out-of-scope-domains.md`.
4. Link the out-of-scope domains doc from domain and entry docs.
5. Add lightweight domain-boundary notes to related spec placeholders.
6. Update M01.09 tracking files.
7. Add documentation-only validation checks.
8. Run validation and record results before marking M01.09 `Builder complete, awaiting QA`.

Completed M01.09 QA work:

1. Confirm branch guard, clean starting worktree, latest commit, remote, and `v0.1.0` tag.
2. Review `docs/domain/out-of-scope-domains.md` for required hard out-of-scope domains, adjacent-but-not-core boundaries, forbidden claims, LLM forbidden actions, future-extension rules, positioning boundaries, and examples.
3. Verify domain links, high-level positioning docs, lightweight spec dependency notes, tracking/status files, validation coverage, and forbidden-scope boundaries.
4. Update M01.09 tracking files to `QA passed, awaiting merge`.
5. Set the next recommended thread to `Merge M01.09 PR - Define Out-of-Scope Domains`.
6. Update control-plane validation and bootstrap tests to enforce the post-QA M01.09 state.
7. Run validation and record results.

Completed M01.10 builder work:

1. Finalize M01.09 merge tracking from git history at `1b40773` (`docs: define M01.09 out-of-scope domains (#27)`).
2. Mark M01.10 as `Builder in progress` on branch `m01-10-write-domain-model`.
3. Rewrite `docs/DOMAIN_MODEL.md` as the canonical M01 domain model summary.
4. Update concise entry-doc references and tracking files.
5. Add documentation-only validation checks for the expanded `docs/DOMAIN_MODEL.md`.
6. Run validation and record results.
7. Mark M01.10 `Builder complete, awaiting QA`.

Completed M01.10 QA recovery work:

1. Audit the already-merged M01.10 builder work at commit `dc6800b` after builder PR #28 was squash-merged before required QA.
2. Confirm `docs/DOMAIN_MODEL.md` is the canonical M01 domain model summary and remains documentation-only.
3. Verify tracking/status files, validation coverage, and forbidden-scope boundaries.
4. Record the M01.10 merge-before-QA protocol deviation and QA recovery clearly.
5. Update M01.10 tracking files to `QA recovery passed, awaiting recovery PR merge`.
6. Set the next recommended thread to `Merge M01.10 QA Recovery PR - Write DOMAIN_MODEL.md`.
7. Run validation and record results.

## Concrete Steps

- Confirm branch guard and starting cleanliness.
- Confirm `v0.1.0` is present.
- Confirm no active M01 plan existed before this planning thread.
- Create the active M01 plan.
- Create release and versioning docs.
- Update current status and next-thread guidance so the next implementation thread is `M01.01 Builder - Define Payment Lifecycle`.
- Update milestone status so M01 is planning in progress while all M01 submilestones remain not started.
- Update validation script and tests for the new artifact set.
- Run:
  - `python scripts/validate-control-plane.py`
  - `python -m pytest tests/test_control_plane_bootstrap.py`
  - `git diff --check`
  - `make bootstrap-check` if available

## Validation and Acceptance

Applicable validation ladder:

- Level 0: Branch and worktree guard.
- Level 1: File and scope inspection.
- Level 2: Control-plane validation.
- Level 3: Bootstrap tests.
- Level 4: Diff and whitespace checks.
- Level 7: Forbidden-scope check for no product implementation.

Acceptance criteria:

- Active M01 plan exists at `plans/active/CLP-0002-m01-domain-model-and-scope-freeze.md`.
- M00 remains `Completed`.
- `v0.1.0` is documented as the repo operating system foundation release.
- Versioning docs and `CHANGELOG.md` exist.
- M20.12 no longer says `Add v0.1.0 release`.
- Current-state closeout wording no longer treats the M00 closeout PR as pending.
- M01 is planning in progress where appropriate.
- During the planning slice, M01.01 through M01.13 remained `Not started`.
- After post-merge QA recovery, M01.01 is `Completed and merged` with the protocol deviation recorded in notes.
- M01.02 is `Completed and merged`.
- M01.03 is `Completed and merged` at git commit `e54a917`.
- M01.04 is `Completed and merged` at git commit `5dfe928`.
- M01.05 is `Completed and merged` after QA recovery PR #18 merged at git commit `3bdedeb`.
- M01.06 is `Completed and merged` after PR #21 merged at git commit `7adc96d`.
- M01.07 is `Completed and merged`.
- M01.08 is `Completed and merged` after PR #26 merged at git commit `1fde07a`.
- M01.09 is `Completed and merged` after PR #27 merged at git commit `1b40773`.
- M01.10 is `QA recovery passed, awaiting recovery PR merge`.
- M01.11 through M01.13 remain `Not started`.
- M02 through M21 remain `Not started`.
- Product implementation has not started.
- No forbidden runtime artifacts are added.
- Validation passes or limitations are recorded.
- Next recommended thread after M01.10 QA recovery is `Merge M01.10 QA Recovery PR - Write DOMAIN_MODEL.md`.

## Idempotence and Recovery

This slice is idempotent because it only adds or updates documentation, status tracking, and control-plane validation. Re-running validation should not mutate files.

If validation fails, fix only the scoped control-plane defect and rerun the failed command. Do not implement product behavior to satisfy planning validation. If the branch changes or the worktree gains unrelated dirty files, stop and report the blocker.

## Artifacts and Notes

Created artifacts:

- `plans/active/CLP-0002-m01-domain-model-and-scope-freeze.md`
- `docs/VERSIONING.md`
- `docs/releases/RELEASE_LADDER.md`
- `docs/releases/V1_SCOPE.md`
- `CHANGELOG.md`
- `docs/domain/repair-vocabulary.md`
- `docs/domain/evidence-receipt-model.md`
- `docs/domain/human-review-states.md`
- `docs/domain/out-of-scope-domains.md`

Notes:

- `plans/active/README.md` remains a harmless placeholder.
- `plans/completed/CLP-0001-m00-repo-operating-system.md` remains the completed M00 plan.
- `docs/status/M00_CLOSEOUT.md` remains historical closeout evidence.
- 2026-05-11 validation results:
  - `python scripts/validate-control-plane.py` passed.
  - `python -m pytest tests/test_control_plane_bootstrap.py` passed with 16 tests.
  - `git diff --check` passed.
  - `make bootstrap-check` could not run because `make` is unavailable in the current Windows shell.
- 2026-05-11 QA validation results after scoped fixes:
  - QA scope audit passed.
  - `python scripts/validate-control-plane.py` passed.
  - `python -m pytest tests/test_control_plane_bootstrap.py` passed with 17 tests.
  - `git diff --check` passed.
  - `make bootstrap-check` could not run because `make` is unavailable in the current Windows shell.
- 2026-05-11 M01.01 builder validation results:
  - First `python scripts/validate-control-plane.py` run failed because `docs/status/CURRENT_STATE.md` lacked the exact M00.01-through-M00.08 summary phrase required by validation.
  - Scoped wording fix applied to `docs/status/CURRENT_STATE.md`.
  - `python scripts/validate-control-plane.py` passed after the fix.
  - `python -m pytest tests/test_control_plane_bootstrap.py` passed with 18 tests.
  - `git diff --check` passed.
  - `make bootstrap-check` could not run because `make` is unavailable in the current Windows shell.
- 2026-05-11 M01.01 post-merge QA recovery validation results:
  - Merged builder work at commit `1175789` was audited.
  - `python scripts/validate-control-plane.py` passed.
  - `python -m pytest tests/test_control_plane_bootstrap.py` passed with 18 tests.
  - `git diff --check` passed.
  - `make bootstrap-check` could not run because `make` is unavailable in the current Windows shell.
- 2026-05-15 M01.02 builder validation results:
  - Initial `python scripts/validate-control-plane.py` failed because the ledger vocabulary doc defined some terms only in title-cased table cells while validation expected lower-case phrases.
  - Added scoped lower-case vocabulary-list sentences to `docs/domain/ledger-vocabulary.md`.
  - `python scripts/validate-control-plane.py` passed.
  - `python -m pytest tests/test_control_plane_bootstrap.py` passed with 19 tests.
  - `git diff --check` passed.
  - `make bootstrap-check` could not run because `make` is unavailable in the current Windows shell.
- 2026-05-15 M01.02 QA validation results:
  - QA content and forbidden-scope review passed.
  - `python scripts/validate-control-plane.py` passed.
  - `python -m pytest tests/test_control_plane_bootstrap.py` passed with 19 tests.
  - `git diff --check` passed.
  - `make bootstrap-check` could not run because `make` is unavailable in the current Windows shell.
- 2026-05-15 M01.03 builder validation results:
  - Settlement vocabulary documentation and forbidden-scope review passed.
  - `python scripts/validate-control-plane.py` passed.
  - `python -m pytest tests/test_control_plane_bootstrap.py` passed with 20 tests.
  - `git diff --check` passed.
  - `make bootstrap-check` could not run because `make` is unavailable in the current Windows shell.
- 2026-05-16 M01.03 QA validation results:
  - QA content, tracking, validation coverage, and forbidden-scope review passed.
  - `python scripts/validate-control-plane.py` passed.
  - `python -m pytest tests/test_control_plane_bootstrap.py` passed with 20 tests.
  - `git diff --check` passed.
  - `make bootstrap-check` could not run because `make` is unavailable in the current Windows shell.
- 2026-05-16 M01.04 builder validation results:
  - Reconciliation vocabulary documentation and forbidden-scope review passed.
  - `python scripts/validate-control-plane.py` passed.
  - `python -m pytest tests/test_control_plane_bootstrap.py` passed with 21 tests.
  - `git diff --check` passed.
  - `make bootstrap-check` could not run because `make` is unavailable in the current Windows shell.
- 2026-05-16 M01.04 QA validation results:
  - QA content, tracking, validation coverage, and forbidden-scope review passed.
  - `python scripts/validate-control-plane.py` passed.
  - `python -m pytest tests/test_control_plane_bootstrap.py` passed with 21 tests.
  - `git diff --check` passed.
  - `make bootstrap-check` could not run because `make` is unavailable in the current Windows shell.
- 2026-05-16 M01.05 builder validation results:
  - Incident vocabulary documentation, ablation planning, tracking, validation coverage, and forbidden-scope review passed.
  - Initial `python scripts/validate-control-plane.py` failed because the incident vocabulary doc used initial-capital severity dimension bullets while validation expected lower-case phrases.
  - Lower-cased the scoped incident severity dimension bullets and reran validation successfully.
  - `python scripts/validate-control-plane.py` passed.
  - `python -m pytest tests/test_control_plane_bootstrap.py` passed with 23 tests.
  - `git diff --check` passed.
  - `make bootstrap-check` could not run because `make` is unavailable in the current Windows shell.
- 2026-05-16 M01.05 post-merge QA recovery validation results:
  - Merged builder work at commit `5c3943b` was audited after PR #16 was squash-merged before required QA.
  - Incident vocabulary documentation, ablation planning, tracking, validation coverage, and forbidden-scope review passed.
  - QA applied scoped documentation/tracking clarifications only.
  - `python scripts/validate-control-plane.py` passed.
  - `python -m pytest tests/test_control_plane_bootstrap.py` passed with 23 tests.
  - `git diff --check` passed.
  - `make bootstrap-check` could not run because `make` is unavailable in the current Windows shell.
- 2026-05-17 M01.05 post-merge finalization validation results:
  - Local git history confirmed `main`, `origin/main`, and the current branch at commit `3bdedeb` (`test: QA recovery M01.05 incident vocabulary and ablation strategy (#18)`).
  - Tracking-only finalization updated M01.05 to `Completed and merged`, recorded QA recovery PR #18 and merge commit `3bdedeb`, and set next thread to `M01.06 Builder - Define Safe and Unsafe Repairs`.
  - `python scripts/validate-control-plane.py` passed.
  - `python -m pytest tests/test_control_plane_bootstrap.py -q` passed with 23 tests.
  - `git diff --check` passed.
  - Product implementation has not started, and M01.06 content was not added.
- 2026-05-17 M01.06 builder validation results:
  - Branch setup confirmed `m01-06-define-safe-and-unsafe-repairs` was clean and aligned to updated `origin/main`.
  - M01.06 safe and unsafe repair vocabulary was added as documentation only.
  - Initial `python scripts/validate-control-plane.py` failed because `docs/status/NEXT_RECOMMENDED_THREAD.md` blocked M01.07 and M02 in combined wording while validation expected the exact `Do not start M02` phrase.
  - The scoped next-thread wording was fixed and validation was rerun successfully.
  - `python scripts/validate-control-plane.py` passed.
  - `python -m pytest tests/test_control_plane_bootstrap.py -q` passed with 24 tests.
  - `git diff --check` passed.
  - Product implementation has not started; no repair runtime logic, repair execution, APIs, databases, GitHub Actions, CI workflows, or product behavior was added.
- 2026-05-18 M01.06 QA validation results:
  - QA reviewed safe and unsafe repair vocabulary, tracking, validation coverage, PR #21 metadata, and forbidden-scope boundaries.
  - QA found the repair vocabulary documentation-only boundary acceptable and found no product implementation or future milestone start.
  - At QA time, PR #21 body still contained default template placeholders; `gh` was unavailable, so this was recorded as a pre-merge accuracy note.
  - `python scripts/validate-control-plane.py` passed.
  - `python -m pytest tests/test_control_plane_bootstrap.py -q` passed with 24 tests.
  - `git diff --check` passed.
  - `make bootstrap-check` was skipped because `make` is unavailable in the current Windows shell.
  - Product implementation has not started; no repair runtime logic, repair execution, APIs, databases, GitHub Actions, CI workflows, or product behavior was added.
- 2026-05-18 M01.06 post-merge finalization validation results:
  - PR #21 was confirmed merged into `main` at git commit `7adc96d` (`docs: define M01.06 safe and unsafe repairs (#21)`).
  - Tracking-only finalization updated M01.06 to `Completed and merged` and set next thread to `M01.07 Builder - Define Evidence Receipt Model`.
  - `python scripts/validate-control-plane.py` passed.
  - `python -m pytest tests/test_control_plane_bootstrap.py -q` passed with 24 tests.
  - `git diff --check` passed.
  - `make bootstrap-check` was skipped because `make` is unavailable in the current Windows shell.
  - Product implementation has not started; no runtime product code, APIs, databases, GitHub Actions, CI workflows, deployment, auth/authz implementation, structured logging implementation, repair runtime logic, repair execution, or product behavior was added.
- 2026-05-18 M01.07 builder validation results:
  - M01.07 evidence receipt model vocabulary was added as documentation only.
  - `python scripts/validate-control-plane.py` passed.
  - `python -m pytest tests/test_control_plane_bootstrap.py -q` passed with 25 tests.
  - `git diff --check` passed.
  - `make bootstrap-check` was skipped because `make` is unavailable in the current Windows shell.
  - Product implementation has not started; no evidence ingestion runtime, evidence storage layer, database, schema, API, file parser, external connector, MoneyEvent runtime, ledger runtime, incident runtime, repair runtime, agent runtime, GitHub Action, CI workflow, deployment, auth/authz implementation, structured logging implementation, or product behavior was added.
- 2026-05-18 M01.07 QA validation results:
  - QA reviewed evidence receipt vocabulary, tracking, PR #23 metadata, hidden-character warning, and forbidden-scope boundaries.
  - QA applied scoped wording clarifications only.
  - Hidden-character scan found a UTF-8 BOM in `docs/milestones/SUBMILESTONE_REGISTRY.md`; the same BOM exists on `origin/main`, so it is benign and pre-existing.
  - `python scripts/validate-control-plane.py` passed.
  - `python -m pytest tests/test_control_plane_bootstrap.py -q` passed with 25 tests.
  - `git diff --check` passed.
  - `make bootstrap-check` was skipped because `make` is unavailable in the current Windows shell.
  - Product implementation has not started; no evidence ingestion runtime, evidence storage layer, database, schema, API, file parser, external connector, MoneyEvent runtime, ledger runtime, incident runtime, repair runtime, agent runtime, GitHub Action, CI workflow, deployment, auth/authz implementation, structured logging implementation, or product behavior was added.
- 2026-05-18 M01.07 post-merge finalization validation results:
  - PR #23 was confirmed merged into `main` at git commit `a88b5ff` (`docs: define M01.07 evidence receipt model (#23)`), and local `main`/`origin/main` were confirmed at git commit `0313f4e` (`docs: define M01.07 evidence receipt model`).
  - Tracking-only finalization updated M01.07 to `Completed and merged` and set next thread to `M01.08 Builder - Define Human Review States`.
  - `python scripts/validate-control-plane.py` passed.
  - `python -m pytest tests/test_control_plane_bootstrap.py -q` passed with 25 tests.
  - `git diff --check` passed.
  - `make bootstrap-check` was skipped because `make` is unavailable in the current Windows shell.
  - Product implementation has not started; no evidence ingestion runtime, evidence storage layer, database, schema, API, file parser, external connector, MoneyEvent runtime, ledger runtime, incident runtime, repair runtime, agent runtime, GitHub Action, CI workflow, deployment, auth/authz implementation, structured logging implementation, or product behavior was added.
- 2026-05-21 M01.08 builder validation results:
  - M01.08 human review states vocabulary was added as documentation only.
  - `python scripts/validate-control-plane.py` passed.
  - `python -m pytest tests/test_control_plane_bootstrap.py` passed with 26 tests.
  - `git diff --check` passed.
  - `make bootstrap-check` was skipped because `make` is unavailable in the current Windows shell.
  - Product implementation has not started; no human-review runtime, review queue, state machine, approval engine, API, database, UI, repair execution, agent runtime, GitHub Action, CI workflow, deployment, auth/authz implementation, structured logging implementation, or product behavior was added.
- 2026-05-21 M01.08 QA validation results:
  - M01.08 human review states vocabulary passed QA as documentation only.
  - No human-review vocabulary content defects were found.
  - QA updates were limited to tracking/status/control-plane validation updates.
  - `python scripts/validate-control-plane.py` passed.
  - `python -m pytest tests/test_control_plane_bootstrap.py` passed with 26 tests.
  - `git diff --check` passed.
  - `make bootstrap-check` was skipped because `make` is unavailable in the current Windows shell.
  - Product implementation has not started; no human-review runtime, review queue, state machine, approval engine, API, database, UI, repair execution, agent runtime, GitHub Action, CI workflow, deployment, auth/authz implementation, structured logging implementation, or product behavior was added.
- 2026-05-21 M01.08 post-merge finalization:
  - PR #26 was confirmed merged at git commit `1fde07a` (`docs: define M01.08 human review states (#26)`) before M01.09 builder work began.
  - Tracking updates in this M01.09 builder slice record M01.08 as `Completed and merged`.
- 2026-05-21 M01.09 builder validation results:
  - M01.09 out-of-scope domains documentation was added as documentation only.
  - Initial `python scripts/validate-control-plane.py` failed because the new M01.09 validation strings expected lower-case phrases while the domain doc used capitalized Markdown bullets and table cells; the scoped validation and bootstrap-test strings were aligned to the documentation and validation was rerun successfully.
  - `python scripts/validate-control-plane.py` passed.
  - `python -m pytest tests/test_control_plane_bootstrap.py` passed with 27 tests.
  - `git diff --check` passed.
  - `make bootstrap-check` was skipped because `make` is unavailable in the current Windows shell.
  - Product implementation has not started; no MoneyEvent runtime, ledger runtime, settlement runtime, reconciliation runtime, incident runtime, invariant engine, causal graph runtime, replay runtime, agent runtime, repair planner runtime, human-review runtime, UI, external connector, database schema, API route, GitHub Action, CI workflow, autonomous repair execution, autonomous money movement, legal/tax/AML/KYC/fraud/credit/investment advice, or product behavior was added.
- 2026-05-21 M01.09 QA validation results:
  - QA reviewed M01.09 out-of-scope domain documentation, links, tracking, validation coverage, and forbidden-scope boundaries.
  - No out-of-scope domain content defects were found.
  - QA changes were limited to tracking/status/control-plane validation updates.
  - `python scripts/validate-control-plane.py` passed.
  - `python -m pytest tests/test_control_plane_bootstrap.py` passed with 27 tests.
  - `git diff --check` passed.
  - `make bootstrap-check` was skipped because `make` is unavailable in the current Windows shell.
  - Product implementation has not started; no MoneyEvent runtime, ledger runtime, settlement runtime, reconciliation runtime, incident runtime, invariant engine, causal graph runtime, replay runtime, agent runtime, repair planner runtime, human-review runtime, UI, external connector, database schema, API route, GitHub Action, CI workflow, autonomous repair execution, autonomous money movement, legal/tax/AML/KYC/fraud/credit/investment advice, or product behavior was added.
- 2026-05-21 M01.09 post-merge finalization:
  - PR #27 was confirmed merged at git commit `1b40773` (`docs: define M01.09 out-of-scope domains (#27)`) before M01.10 builder work began.
  - Tracking updates in this M01.10 builder slice record M01.09 as `Completed and merged`.
- 2026-05-21 M01.10 builder in-progress status:
  - Branch guard passed on `m01-10-write-domain-model`.
  - Starting worktree was clean.
  - Latest commit was `1b40773` (`docs: define M01.09 out-of-scope domains (#27)`).
  - `v0.1.0` exists.
  - M01.10 was marked `Builder in progress`; M01.11 through M01.13 and M02 through M21 remain `Not started`.
- 2026-05-21 M01.10 builder validation results:
  - `docs/DOMAIN_MODEL.md` was rewritten as the canonical M01 domain model summary.
  - README, docs index, active plan, roadmap, milestone doc, registry, status docs, capability matrix, tech debt, validation script, and bootstrap tests were updated for M01.10.
  - Initial `python scripts/validate-control-plane.py` failed because the M01.10 registry row used lower-case `no product implementation or runtime behavior` while validation expected the exact capitalized marker; the scoped registry wording was fixed and validation was rerun successfully.
  - `python scripts/validate-control-plane.py` passed.
  - `python -m pytest tests/test_control_plane_bootstrap.py` passed with 27 tests.
  - `git diff --check` passed.
  - `make bootstrap-check` was skipped because `make` is unavailable in the current Windows shell.
  - Product implementation has not started; no MoneyEvent runtime, ledger runtime, settlement runtime, reconciliation runtime, incident runtime, invariant engine, causal graph runtime, replay runtime, agent runtime, repair planner runtime, human-review runtime, UI, external connector, database schema, API route, GitHub Action, CI workflow, or product behavior was added.
- 2026-05-21 M01.10 post-merge QA recovery validation results:
  - Builder PR #28 was squash-merged before required QA at commit `dc6800b` (`docs: write M01.10 domain model summary (#28)`).
  - QA recovery ran on branch `m01-10-qa-recovery-domain-model`.
  - `docs/DOMAIN_MODEL.md` was audited as a coherent canonical M01 domain model summary.
  - No DOMAIN_MODEL.md content defects and no product implementation were found.
  - QA recovery changes were limited to tracking/status/control-plane validation updates.
  - `python scripts/validate-control-plane.py` passed.
  - `python -m pytest tests/test_control_plane_bootstrap.py` passed with 27 tests.
  - `git diff --check` passed.
  - `make bootstrap-check` was skipped because `make` is unavailable in the current Windows shell.
  - M01.10 is `QA recovery passed, awaiting recovery PR merge`; M01.11 through M01.13 and M02 through M21 remain `Not started`.

## Interfaces and Dependencies

M01 planning depends on:

- `AGENTS.md` for the safety boundary.
- `PLANS.md` for plan structure and truthfulness rules.
- `WORKFLOW.md` and `docs/ops/validation-and-handoff-workflow.md` for validation expectations.
- `docs/milestones/SUBMILESTONE_REGISTRY.md` for submilestone state.
- `docs/status/CURRENT_STATE.md` and `docs/status/NEXT_RECOMMENDED_THREAD.md` for current operational direction.

No product runtime interface is introduced by this M01 planning, M01.01 documentation work, M01.02 documentation work, M01.03 documentation work, M01.04 documentation work, M01.05 documentation and evaluation-planning work, M01.05 QA recovery work, M01.05 post-merge finalization work, M01.06 repair vocabulary work, M01.07 evidence receipt model work, M01.07 post-merge finalization work, M01.08 human review states work, M01.08 post-merge finalization, M01.09 out-of-scope domain builder work, M01.09 QA work, M01.09 post-merge finalization, M01.10 DOMAIN_MODEL.md builder work, or M01.10 QA recovery work.

## Outcomes & Retrospective

Outcome after M01 planning QA validation:

- M01 planning was active during the planning slice and is now complete and merged.
- M01 planning QA passed after scoped control-plane fixes.
- M01 implementation submilestones remained not started during the planning slice.
- Versioning is documented without overclaiming product readiness.
- Product implementation remains not started.
- Required direct validation passed; `make bootstrap-check` was unavailable.
- The next safe thread is `M01.01 Builder - Define Payment Lifecycle` after this planning PR merges.

Current M01.01 builder outcome:

- M01.01 builder work was squash-merged before the required QA thread.
- M01.01 post-merge QA recovery passed as domain documentation only.
- M01.01 is recorded as `Completed and merged` after post-merge QA recovery.
- Product implementation remains not started.
- M01.02 QA passed as documentation-only work and is completed and merged.
- M01.03 is completed and merged as settlement vocabulary documentation only.
- M01.04 is completed and merged as reconciliation vocabulary documentation only.
- M01.05 is completed and merged after QA recovery PR #18 merged at commit `3bdedeb`; incident vocabulary and ablation planning remain documentation only.
- M01.06 is completed and merged after PR #21 as repair vocabulary documentation only.
- M01.07 is completed and merged as evidence receipt model documentation only.
- M01.08 is completed and merged after PR #26 as human review states documentation only.
- M01.09 is completed and merged after PR #27 as out-of-scope domain documentation only.
- M01.10 is QA recovery passed, awaiting recovery PR merge as DOMAIN_MODEL.md summary documentation only.
- M01.11 through M01.13 remain not started.
- The next safe thread is `Merge M01.10 QA Recovery PR - Write DOMAIN_MODEL.md`.
