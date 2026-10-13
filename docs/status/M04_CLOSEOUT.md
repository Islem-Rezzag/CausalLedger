# M04 Milestone Closeout

## Milestone ID and name

M04 Double-entry ledger core.

## Closeout result

Closeout disposition: COMPLETED_AND_MERGED

Current closeout review: Completed and merged

Human PR #80 merged at 07ae89701eca3f0ee669265c99a3a180b31724ca on 2026-10-12T14:58:48Z by nonbot Islem-Rezzag. Reviewed edf6a873ffb7d9d46097f4646d960369f5d3c937 and merged contents share tree c0a4573497f2a38cdbf65ad6334fd0a542abf30d; full diff empty and fetched-main reachability verified. Final independent closeout QA/354 lifecycle/full2055 controls/rootclean18/0/1 and bothCI38239309974 passed; actual1785 ledger/32 files and14 PostgreSQL suites1227, THREE recovery/both populated preservation upgrades/exact schema/DEMO/cleanup passed. Published body/advisory6123224889/reviewer SHA256 bindings were read back. No unchanged M04 QA was repeated for merge verification.

All eighteen original M04 rows are Completed and merged. M04 is Completed after the actual human closeout merge and provenance verification. Plan movement is authorized; M05 planning may proceed, while simulator implementation waits for its separate planning QA/human merge.

## Completed submilestones

| ID | Original name | Human-merged PR | Result |
| --- | --- | --- | --- |
| M04.01 | Define Account schema | [#62](https://github.com/Islem-Rezzag/CausalLedger/pull/62) | Completed and merged |
| M04.02 | Define LedgerTransaction schema | [#63](https://github.com/Islem-Rezzag/CausalLedger/pull/63) | Completed and merged |
| M04.03 | Define LedgerEntry schema | [#64](https://github.com/Islem-Rezzag/CausalLedger/pull/64) | Completed and merged |
| M04.04 | Enforce debit equals credit | [#65](https://github.com/Islem-Rezzag/CausalLedger/pull/65) | Completed and merged |
| M04.05 | Add immutable transaction storage | [#66](https://github.com/Islem-Rezzag/CausalLedger/pull/66) | Completed and merged |
| M04.06 | Add account balance query | [#67](https://github.com/Islem-Rezzag/CausalLedger/pull/67) | Completed and merged |
| M04.07 | Add transaction query | [#68](https://github.com/Islem-Rezzag/CausalLedger/pull/68) | Completed and merged |
| M04.08 | Add idempotency keys | [#69](https://github.com/Islem-Rezzag/CausalLedger/pull/69) | Completed and merged |
| M04.09 | Add reversal transaction type | [#70](https://github.com/Islem-Rezzag/CausalLedger/pull/70) | Completed and merged |
| M04.10 | Add cash clearing account | [#71](https://github.com/Islem-Rezzag/CausalLedger/pull/71) | Completed and merged |
| M04.11 | Add provider clearing account | [#72](https://github.com/Islem-Rezzag/CausalLedger/pull/72) | Completed and merged |
| M04.12 | Add customer liability account | [#73](https://github.com/Islem-Rezzag/CausalLedger/pull/73) | Completed and merged |
| M04.13 | Add fee expense account | [#74](https://github.com/Islem-Rezzag/CausalLedger/pull/74) | Completed and merged |
| M04.14 | Add revenue account | [#75](https://github.com/Islem-Rezzag/CausalLedger/pull/75) | Completed and merged |
| M04.15 | Add tests for balanced posting | [#76](https://github.com/Islem-Rezzag/CausalLedger/pull/76) | Completed and merged |
| M04.16 | Add tests for invalid posting | [#77](https://github.com/Islem-Rezzag/CausalLedger/pull/77) | Completed and merged |
| M04.17 | Add reversal tests | [#78](https://github.com/Islem-Rezzag/CausalLedger/pull/78) | Completed and merged |
| M04.18 | QA ledger core | [#79](https://github.com/Islem-Rezzag/CausalLedger/pull/79) | Completed and merged |

## Deferred submilestones

None. Every original M04 row remains separately mapped; no requirement was consolidated, renamed or deferred.

## Merged PRs and merge references

Human PR #79 merged at `c039964073fd7b80fdecea34a035a242353261c7` on 2026-10-09T17:14:57Z by Islem-Rezzag. Reviewed head `3f5236f45baa6b77dd0c48ed7119124d249523db` and merged commit have the same tree `e3ab43ed87084dfefb6c2b6a95ac176edc2472dc` and an empty full diff; fetched main reachability passed. Both jobs of CI 37959900408 passed, with 1,785 ledger tests, 1,882 controls and 1,227 actual PostgreSQL tests across fourteen suites. Independent final QA passed; published body/advisory 6085224093 and SHA256 bindings were read back.

| PR | Human merge | Reviewed head | Reviewed and merged tree | Exact-head CI / independent QA |
| --- | --- | --- | --- | --- |
| #62 | `44f6a833692326d00ed5a9b7479a52dd761af814` | `9d0db74c1349596b579aab510c6f9e7ff00642b0` | `0c37706283fa90e3455fab4541a0eeb5209fb973` | 36020971358 / PASS |
| #63 | `1dcfcbdb6c6f74a1ab6acb7b19e93ef2ddb09d0d` | `511ce291eb18538e0a07076287ca0f7c4a24656a` | `6528851abfe1b8e9642b5ddfc225b50d034da50e` | 36785054245 / PASS |
| #64 | `4a5637c8eab842b368e046b0994a620ecb08e90b` | `7ee673869e48a61f19fd3b8d0d61b1e7a1199a87` | `73632a81652423e9713e808976b1a922dbd71ad5` | 36789436774 / PASS |
| #65 | `526bb66dda5d9c8b9aebd85775142e8d22c3a73a` | `66f679e9711a0a5f06830eb203119d1dd8e3e04e` | `15c668085da628122ff5601be7d87d8da6b91b35` | 36998201769 / PASS |
| #66 | `f5a5e910041611e0bf36184e4bc8fc483228a613` | `49ca97cf54e581e4f63ab599562bc0d6bb6b5e4d` | `e83dc0b1748f47a76e72fd12e9332f98e399b17a` | 37446228689 / PASS |
| #67 | `471d76c6173208d33d7584756a6db0d433c29ec4` | `ee5d6c27e351e1b9956ddaa11b992d029e95372e` | `da69be5c9c93630eeacad9be6f8414ae04dc46df` | 37455976639 / PASS |
| #68 | `584a4520311723a9fb6fdf7a29bbf749171345f9` | `e3190fb74c29bbbd80769a021e542ac236c70d72` | `5c0338ef2ba7d69872fef0035376c914853ead41` | 37468260697 / PASS |
| #69 | `3e0832254539140d55094404edec253b1766bc9c` | `00eb3cf627f52c4ab6eb261f064e41056c59b869` | `1260235203a8bd97f144911624b462c08aa0d863` | 37473789250 / PASS |
| #70 | `78cc3d6710689c9a5ae627d64398e25e165a03d1` | `963c11f340b11660e1c78a2dbdd3bc278c3e577a` | `238a44e050a0860560e71335434a3eb08ec34cc4` | 37481790910 / PASS |
| #71 | `c01bf21d4fba413943a7e266b2453f95f33f851b` | `0e5fec533eb3f17d92a86b5fbc796be9ea0c8c6e` | `be1eb4edbdcb96a58aabc5b36fce0e03157c0f69` | 37490025286 / PASS |
| #72 | `372a05784f6a081c698654dd0597009f006ee2a5` | `465ba9c0bfe8f7fc37754f3326dc0d23f3c5658f` | `ef3cf9b48cda0c1d2ad36f5c1d35ac4e820d990e` | 37522188067 / PASS |
| #73 | `6df37f79f2217090fd778f6d8195c294f544aff5` | `a7b024563531ef069c9a7636327f3c8030d7635f` | `1d7bf960860e4440ec6adba593237c033a9d419f` | 37595435305 / PASS |
| #74 | `eee635e6bedcd0018fb7eeebcc098b9a3226deb5` | `68352e3a6aaf89437b75d2a34253cecde1564d62` | `5dbb1593d44b4a2596c58940bf09566d859d4cd5` | 37757996965 / PASS |
| #75 | `b7999fb87668e46937e1f936f5bc1d35a938a09a` | `d4daa7798eefd88f80d58e5ac36b1c5449b4da5e` | `2c521171c2991781d43b439c041ac7cdf8cb1267` | 37766171659 / PASS |
| #76 | `1c5ad6c7cf9be341c92d6787f74748c7812730e3` | `eef72bc39f49e22642b0ccde0badd2d4e06d2b3a` | `831380433717b3cb183a3f2d6c5e44aa55520efe` | 37777406231 / PASS |
| #77 | `ec29ba3c0fefdd80ff8c3c71e10aa3e27642db64` | `b9c9abcb019c60390b99fa735efc7aaebf6582b4` | `6e65fdf91c5eee77670c8bdc4e27bb63926af884` | 37785947729 / PASS |
| #78 | `626dbc04a41929ccfcb67cee0790381f87b0a9cd` | `6b4fa5ad6ce5c3d3034621530e984a3a43313339` | `d36e7eedf8bdfb2d73839b75615469e890616030` | 37804064435 / PASS |
| #79 | `c039964073fd7b80fdecea34a035a242353261c7` | `3f5236f45baa6b77dd0c48ed7119124d249523db` | `e3ab43ed87084dfefb6c2b6a95ac176edc2472dc` | 37959900408 / PASS |

The whole-M04 reviewer independently verified the primary merge/head/tree/CI records for all seventeen preceding rows. Row18's actual merge, published record and main reachability were verified again for this closeout. Squash-aware verification requires the reviewed contents to land, not source-commit ancestry.

## Validation summary

Verified final closeout evidence: independent PASS/354 lifecycle/full2055 controls/root cleanQA18/0/1; bothCI38239309974 with1785 ledger/32 files and all14 actual PostgreSQL suites1227/no mandatory skips, THREE recovery/both populated preservation upgrades/exact schema/DEMO/owned+Compose cleanup. Actual tested41c5b9265c18b141e09045ef156bbf9313ff4eab has c039+edf6 parents, reviewed tree and empty full diff. Published bindings and actual human07ae merge/tree/main proof passed. Current M05 planning checks remain separate and pending; no unchanged closeout QA repeated.

## Changed docs

Closeout packet, active plan brief/outcomes, all18 registry/status/navigation/goal/roadmap metadata, append-only acceptance-guide merge record, current environment/capability handoff and dated risk/debt/question review. Exact paths are in the generated active-plan brief and PR diff.

## Changed code

Only narrow lifecycle validation and control-plane tests. No financial source, tests, helper, manifest, owned runner, migration, dependency, CI, API, app, fixture or raw evidence is changed.

## Implemented product boundary

Deterministic metadata schemas and exact journal equality; immutable atomic PostgreSQL storage; exact read-only balances and transaction readback; durable ordinary retry identity; full linked reversals preserving originals; explicit cash/provider/customer/fee/revenue account-role validators/configuration wrappers; adversarial/property/storage corpora and the combined synthetic ledger demonstration. Evidence maps live in docs/specs/ledger-core-acceptance.md. Synthetic software acceptance is not economic truth, posting eligibility, ownership authorization or repair approval. Unknown acknowledgement remains unknown.

## Unimplemented product boundary

No source-specific ingestion, invariant engine, incident engine, causal graph, replay, repair planner/application, agent runtime, benchmark runner/scoring, product UI or production service is claimed. Agent financial-write authority remains forbidden; postingImplemented:false is unchanged. No raw evidence or money state is mutated by closeout.

## Skipped validation and why

Optional local Docker/make are unavailable; direct Python checks and approved owned PostgreSQL17 CI are the route. Local dependency/task caches are warm. CI uses fresh checkout/frozen pinned installation without a configured dependency cache; no cold registry/offline claim. Benchmark Level6 is not applicable. No system installation, credentials, paid call, deployment, tag or release publication.

## Warnings

Initial builder QA16/1/2 failed only ledger README formatting; all2,045 then-current controls passed. Formatting was corrected and full updated QA17/0/2 passed. Independent static findings on required-key masking, hostile status types, owning-section tables and exact unique PR/status markers were corrected with retained negative regressions; no financial assertion was weakened. Corrections remain in the completed M04 plan. No unresolved static finding remains; candidate and final independent review/root clean QA/actual CI/published readback passed; human closeout merge is verified. Local Docker limits remain explicit.

## Risks

Readers may mistake synthetic arithmetic/storage success for authenticated external truth or grant agents posting authority. Currency membership, occurrence identity, auth/authz, lifecycle eligibility, retention, source integration and production operations need separately reviewed scope. Read-only snapshots have documented cutoffs/isolation limits; unknown acknowledgement is not proof of no write.

## Tech debt

No confirmed financial implementation defect remains in accepted M04.18. docs/status/TECH_DEBT.md records implemented M04 encoding/storage and future boundaries, plus local tool limits and intentionally retained branches. Unbuilt roadmap capabilities are future scope, not finished work or new defects merely because they are unimplemented.

## Open questions

docs/status/OPEN_QUESTIONS.md resolves approved CI storage setup and M04 durable encoding questions; source mapping, currency membership, occurrence identity, auth/authz, retention, observability, simulator priority and future eval/model budgets remain separately scoped questions.

## Deferred work

No M04 row is deferred. M05 planning is now separately active after verified closeout; all19 implementation rows remain Not started with blank branches/PRs. M06–M21 remain Not started. No simulator or later runtime implementation is introduced.

## Branch inventory

Local and remote branches at proposal start: `m02-05-package-scaffolds-eslint-ci`, `m02-06-local-infra-postgres-migrations-health`, `m02-07-qa-development-environment`, `m02-amendment-process-diet`, `m02-closeout-monorepo-and-local-development-environment`, `m03-01-moneyevent-concept-contract`, `m03-02-finalize-moneyevent-type-boundary-merge`, `m03-02-moneyevent-types-schema-boundary`, `m03-05-finalize-fixtures-benchmark-seeds-merge`, `m03-closeout-canonical-moneyevent-engine`, `m03-planning-canonical-moneyevent-engine`, `m04-01-account-schema`, `m04-02-ledger-transaction-schema`, `m04-03-ledger-entry-schema`, `m04-04-enforce-debit-equals-credit`, `m04-05-add-immutable-transaction-storage`, `m04-06-add-account-balance-query`, `m04-07-add-transaction-query`, `m04-08-add-idempotency-keys`, `m04-09-add-reversal-transaction-type`, `m04-10-add-cash-clearing-account`, `m04-11-add-provider-clearing-account`, `m04-12-add-customer-liability-account`, `m04-13-add-fee-expense-account`, `m04-14-add-revenue-account`, `m04-15-add-tests-for-balanced-posting`, `m04-16-add-tests-for-invalid-posting`, `m04-17-add-reversal-tests`, `m04-18-qa-ledger-core`, `m04-closeout-double-entry-ledger-core`, `m04-planning-double-entry-ledger-core`, `main`, `origin`, `origin/m03-closeout-canonical-moneyevent-engine`, `origin/m04-01-account-schema`, `origin/m04-02-ledger-transaction-schema`, `origin/m04-03-ledger-entry-schema`, `origin/m04-04-enforce-debit-equals-credit`, `origin/m04-05-add-immutable-transaction-storage`, `origin/m04-06-add-account-balance-query`, `origin/m04-07-add-transaction-query`, `origin/m04-08-add-idempotency-keys`, `origin/m04-09-add-reversal-transaction-type`, `origin/m04-10-add-cash-clearing-account`, `origin/m04-11-add-provider-clearing-account`, `origin/m04-12-add-customer-liability-account`, `origin/m04-13-add-fee-expense-account`, `origin/m04-14-add-revenue-account`, `origin/m04-15-add-tests-for-balanced-posting`, `origin/m04-16-add-tests-for-invalid-posting`, `origin/m04-17-add-reversal-tests`, `origin/m04-18-qa-ledger-core`, `origin/m04-planning-double-entry-ledger-core`, `origin/main`. Existing milestone branches are intentionally retained for audit/recovery. No branch deletion is authorized. The former closeout branch holds reviewed human-merged contents. The new m05-planning-provider-and-bank-simulator branch alone holds current unmerged planning/tracking changes; every M04 submilestone and formal closeout has landed. Any future cleanup requires a separate explicit instruction.

## Follow-up work

M04 closeout is verified and complete. Move CLP0005 to completed and synchronize current references. Then separately review/merge M05 planning before any M05.01 implementation. Original V1 scope and financial authority boundaries are unchanged.

## Next milestone readiness

M05 planning is authorized after actual PR80 human merge/tree/main verification. M05.01–M05.19 remain Not started with blank branches/PRs until separate planning review and human merge; M06–M21 unstarted. No simulator implementation in the transition.

## Whether active plan can move to completed

Yes. Actual human PR80 closeout merge and reviewed-tree/main provenance are verified; move to plans/completed/CLP-0005-m04-double-entry-ledger-core.md with all18 raw requirements and historical records preserved. Current references synchronize to that completed location; only CLP0006 is active.

## Whether safe to start next milestone

Yes for M05 planning only after this verified human closeout gate. M05 implementation requires its own planning QA/current-head CI/human merge; no financial or agent authority granted.

## Exact next recommended thread

M05 Planning - Provider and bank simulator. After verified planning human merge: M05.01 Create simulator package.

## Release implications

V1_PUBLIC_PRODUCT remains the approved destination. M04 alone is not the integrated public product, benchmark, release, production-readiness claim or publication authorization.


## Historical reviewed proposal (immutable record)

# M04 Milestone Closeout

## Milestone ID and name

M04 Double-entry ledger core.

## Closeout result

Closeout disposition: PROPOSED_PENDING_HUMAN_MERGE

Current closeout review: QA passed, awaiting merge

Sole proposed closeout PR #80

All eighteen original submilestones are Completed and merged. This separate closeout proposal is not yet merged on `main`. Independent closeout QA and exact-head CI must pass before human merge. M04 remains In progress; the existing active plan remains active until actual closeout human merge and reviewed-tree/main verification. No M05 work starts here.

## Completed submilestones

| ID | Original name | Human-merged PR | Result |
| --- | --- | --- | --- |
| M04.01 | Define Account schema | [#62](https://github.com/Islem-Rezzag/CausalLedger/pull/62) | Completed and merged |
| M04.02 | Define LedgerTransaction schema | [#63](https://github.com/Islem-Rezzag/CausalLedger/pull/63) | Completed and merged |
| M04.03 | Define LedgerEntry schema | [#64](https://github.com/Islem-Rezzag/CausalLedger/pull/64) | Completed and merged |
| M04.04 | Enforce debit equals credit | [#65](https://github.com/Islem-Rezzag/CausalLedger/pull/65) | Completed and merged |
| M04.05 | Add immutable transaction storage | [#66](https://github.com/Islem-Rezzag/CausalLedger/pull/66) | Completed and merged |
| M04.06 | Add account balance query | [#67](https://github.com/Islem-Rezzag/CausalLedger/pull/67) | Completed and merged |
| M04.07 | Add transaction query | [#68](https://github.com/Islem-Rezzag/CausalLedger/pull/68) | Completed and merged |
| M04.08 | Add idempotency keys | [#69](https://github.com/Islem-Rezzag/CausalLedger/pull/69) | Completed and merged |
| M04.09 | Add reversal transaction type | [#70](https://github.com/Islem-Rezzag/CausalLedger/pull/70) | Completed and merged |
| M04.10 | Add cash clearing account | [#71](https://github.com/Islem-Rezzag/CausalLedger/pull/71) | Completed and merged |
| M04.11 | Add provider clearing account | [#72](https://github.com/Islem-Rezzag/CausalLedger/pull/72) | Completed and merged |
| M04.12 | Add customer liability account | [#73](https://github.com/Islem-Rezzag/CausalLedger/pull/73) | Completed and merged |
| M04.13 | Add fee expense account | [#74](https://github.com/Islem-Rezzag/CausalLedger/pull/74) | Completed and merged |
| M04.14 | Add revenue account | [#75](https://github.com/Islem-Rezzag/CausalLedger/pull/75) | Completed and merged |
| M04.15 | Add tests for balanced posting | [#76](https://github.com/Islem-Rezzag/CausalLedger/pull/76) | Completed and merged |
| M04.16 | Add tests for invalid posting | [#77](https://github.com/Islem-Rezzag/CausalLedger/pull/77) | Completed and merged |
| M04.17 | Add reversal tests | [#78](https://github.com/Islem-Rezzag/CausalLedger/pull/78) | Completed and merged |
| M04.18 | QA ledger core | [#79](https://github.com/Islem-Rezzag/CausalLedger/pull/79) | Completed and merged |

## Deferred submilestones

None. Every original M04 row remains separately mapped; no requirement was consolidated, renamed or deferred.

## Merged PRs and merge references

Human PR #79 merged at `c039964073fd7b80fdecea34a035a242353261c7` on 2026-10-09T17:14:57Z by Islem-Rezzag. Reviewed head `3f5236f45baa6b77dd0c48ed7119124d249523db` and merged commit have the same tree `e3ab43ed87084dfefb6c2b6a95ac176edc2472dc` and an empty full diff; fetched main reachability passed. Both jobs of CI 37959900408 passed, with 1,785 ledger tests, 1,882 controls and 1,227 actual PostgreSQL tests across fourteen suites. Independent final QA passed; published body/advisory 6085224093 and SHA256 bindings were read back.

| PR | Human merge | Reviewed head | Reviewed and merged tree | Exact-head CI / independent QA |
| --- | --- | --- | --- | --- |
| #62 | `44f6a833692326d00ed5a9b7479a52dd761af814` | `9d0db74c1349596b579aab510c6f9e7ff00642b0` | `0c37706283fa90e3455fab4541a0eeb5209fb973` | 36020971358 / PASS |
| #63 | `1dcfcbdb6c6f74a1ab6acb7b19e93ef2ddb09d0d` | `511ce291eb18538e0a07076287ca0f7c4a24656a` | `6528851abfe1b8e9642b5ddfc225b50d034da50e` | 36785054245 / PASS |
| #64 | `4a5637c8eab842b368e046b0994a620ecb08e90b` | `7ee673869e48a61f19fd3b8d0d61b1e7a1199a87` | `73632a81652423e9713e808976b1a922dbd71ad5` | 36789436774 / PASS |
| #65 | `526bb66dda5d9c8b9aebd85775142e8d22c3a73a` | `66f679e9711a0a5f06830eb203119d1dd8e3e04e` | `15c668085da628122ff5601be7d87d8da6b91b35` | 36998201769 / PASS |
| #66 | `f5a5e910041611e0bf36184e4bc8fc483228a613` | `49ca97cf54e581e4f63ab599562bc0d6bb6b5e4d` | `e83dc0b1748f47a76e72fd12e9332f98e399b17a` | 37446228689 / PASS |
| #67 | `471d76c6173208d33d7584756a6db0d433c29ec4` | `ee5d6c27e351e1b9956ddaa11b992d029e95372e` | `da69be5c9c93630eeacad9be6f8414ae04dc46df` | 37455976639 / PASS |
| #68 | `584a4520311723a9fb6fdf7a29bbf749171345f9` | `e3190fb74c29bbbd80769a021e542ac236c70d72` | `5c0338ef2ba7d69872fef0035376c914853ead41` | 37468260697 / PASS |
| #69 | `3e0832254539140d55094404edec253b1766bc9c` | `00eb3cf627f52c4ab6eb261f064e41056c59b869` | `1260235203a8bd97f144911624b462c08aa0d863` | 37473789250 / PASS |
| #70 | `78cc3d6710689c9a5ae627d64398e25e165a03d1` | `963c11f340b11660e1c78a2dbdd3bc278c3e577a` | `238a44e050a0860560e71335434a3eb08ec34cc4` | 37481790910 / PASS |
| #71 | `c01bf21d4fba413943a7e266b2453f95f33f851b` | `0e5fec533eb3f17d92a86b5fbc796be9ea0c8c6e` | `be1eb4edbdcb96a58aabc5b36fce0e03157c0f69` | 37490025286 / PASS |
| #72 | `372a05784f6a081c698654dd0597009f006ee2a5` | `465ba9c0bfe8f7fc37754f3326dc0d23f3c5658f` | `ef3cf9b48cda0c1d2ad36f5c1d35ac4e820d990e` | 37522188067 / PASS |
| #73 | `6df37f79f2217090fd778f6d8195c294f544aff5` | `a7b024563531ef069c9a7636327f3c8030d7635f` | `1d7bf960860e4440ec6adba593237c033a9d419f` | 37595435305 / PASS |
| #74 | `eee635e6bedcd0018fb7eeebcc098b9a3226deb5` | `68352e3a6aaf89437b75d2a34253cecde1564d62` | `5dbb1593d44b4a2596c58940bf09566d859d4cd5` | 37757996965 / PASS |
| #75 | `b7999fb87668e46937e1f936f5bc1d35a938a09a` | `d4daa7798eefd88f80d58e5ac36b1c5449b4da5e` | `2c521171c2991781d43b439c041ac7cdf8cb1267` | 37766171659 / PASS |
| #76 | `1c5ad6c7cf9be341c92d6787f74748c7812730e3` | `eef72bc39f49e22642b0ccde0badd2d4e06d2b3a` | `831380433717b3cb183a3f2d6c5e44aa55520efe` | 37777406231 / PASS |
| #77 | `ec29ba3c0fefdd80ff8c3c71e10aa3e27642db64` | `b9c9abcb019c60390b99fa735efc7aaebf6582b4` | `6e65fdf91c5eee77670c8bdc4e27bb63926af884` | 37785947729 / PASS |
| #78 | `626dbc04a41929ccfcb67cee0790381f87b0a9cd` | `6b4fa5ad6ce5c3d3034621530e984a3a43313339` | `d36e7eedf8bdfb2d73839b75615469e890616030` | 37804064435 / PASS |
| #79 | `c039964073fd7b80fdecea34a035a242353261c7` | `3f5236f45baa6b77dd0c48ed7119124d249523db` | `e3ab43ed87084dfefb6c2b6a95ac176edc2472dc` | 37959900408 / PASS |

The whole-M04 reviewer independently verified the primary merge/head/tree/CI records for all seventeen preceding rows. Row18's actual merge, published record and main reachability were verified again for this closeout. Squash-aware verification requires the reviewed contents to land, not source-commit ancestry.

## Validation summary

Prerequisite M04.18 evidence: independent PASS, 1,785 ledger tests/32 files, 1,882 controls, 510 accepted-candidate behavior probes carried by 343-file identity, 122 fresh final lifecycle probes, clean QA 18/0/1, and both CI jobs with fourteen PostgreSQL suite counts 64/22/27/39/40/23/31/34/56/56/169/263/400/3 = 1227. All three migration recovery cycles, both populated exact-preservation/no-backfill upgrades, exact five ledger tables plus pgmigrations/ten functions, DEMO PASS and owned/Compose cleanup passed.

Current closeout checks: Accepted closeout candidate 7197af4bee8385406cc5beb32cb4c62358523cff / tree ec97c4ce206c455afb49ade60504ae300e60eeb2: existing independent reviewer PASS with no remaining findings, 354 fresh lifecycle probes and all2,055 controls; root clean QA18/0/1 without dirty override. Both candidate CI jobs 38238151547 passed, including1785 ledger tests/32 files and all1227 actual PostgreSQL tests in14 unchanged suites (64/22/27/39/40/23/31/34/56/56/169/263/400/3), THREE recovery/both populated preservation upgrades/exact schema/owned+Compose cleanup. Actual checkout has expected base/head parents, the same tree and empty full diff. Scope25/protected338/raw18/V1/history/append-only guide+weekly preserved. Final tracking-head root clean QA, independent review, both actual CI jobs and SHA-bound published readback/readiness remain mandatory before human merge. Actual closeout CI must pass both jobs on the final reviewed revision. Commands: python scripts/validate-control-plane.py; python -m pytest tests/test_control_plane_bootstrap.py; git diff --check; scripts/qa-dev-environment.py; independent lifecycle/control/scope audit; primary CI logs/checkout tree/parents/full-diff verification. Current QA stays external and exact-head bound; prerequisite success does not approve this proposal.

## Changed docs

Closeout packet, active plan brief/outcomes, all18 registry/status/navigation/goal/roadmap metadata, append-only acceptance-guide merge record, current environment/capability handoff and dated risk/debt/question review. Exact paths are in the generated active-plan brief and PR diff.

## Changed code

Only narrow lifecycle validation and control-plane tests. No financial source, tests, helper, manifest, owned runner, migration, dependency, CI, API, app, fixture or raw evidence is changed.

## Implemented product boundary

Deterministic metadata schemas and exact journal equality; immutable atomic PostgreSQL storage; exact read-only balances and transaction readback; durable ordinary retry identity; full linked reversals preserving originals; explicit cash/provider/customer/fee/revenue account-role validators/configuration wrappers; adversarial/property/storage corpora and the combined synthetic ledger demonstration. Evidence maps live in docs/specs/ledger-core-acceptance.md. Synthetic software acceptance is not economic truth, posting eligibility, ownership authorization or repair approval. Unknown acknowledgement remains unknown.

## Unimplemented product boundary

No source-specific ingestion, invariant engine, incident engine, causal graph, replay, repair planner/application, agent runtime, benchmark runner/scoring, product UI or production service is claimed. Agent financial-write authority remains forbidden; postingImplemented:false is unchanged. No raw evidence or money state is mutated by closeout.

## Skipped validation and why

Optional local Docker/make are unavailable; direct Python checks and approved owned PostgreSQL17 CI are the route. Local dependency/task caches are warm. CI uses fresh checkout/frozen pinned installation without a configured dependency cache; no cold registry/offline claim. Benchmark Level6 is not applicable. No system installation, credentials, paid call, deployment, tag or release publication.

## Warnings

Initial builder QA16/1/2 failed only ledger README formatting; all2,045 then-current controls passed. Formatting was corrected and full updated QA17/0/2 passed. Independent static findings on required-key masking, hostile status types, owning-section tables and exact unique PR/status markers were corrected with retained negative regressions; no financial assertion was weakened. Corrections remain in the active plan. No unresolved static finding remains; candidate independent review and actual CI passed; final tracking-head checks remain mandatory. Local Docker limits remain explicit.

## Risks

Readers may mistake synthetic arithmetic/storage success for authenticated external truth or grant agents posting authority. Currency membership, occurrence identity, auth/authz, lifecycle eligibility, retention, source integration and production operations need separately reviewed scope. Read-only snapshots have documented cutoffs/isolation limits; unknown acknowledgement is not proof of no write.

## Tech debt

No confirmed financial implementation defect remains in accepted M04.18. docs/status/TECH_DEBT.md records implemented M04 encoding/storage and future boundaries, plus local tool limits and intentionally retained branches. Unbuilt roadmap capabilities are future scope, not finished work or new defects merely because they are unimplemented.

## Open questions

docs/status/OPEN_QUESTIONS.md resolves approved CI storage setup and M04 durable encoding questions; source mapping, currency membership, occurrence identity, auth/authz, retention, observability, simulator priority and future eval/model budgets remain separately scoped questions.

## Deferred work

No M04 row is deferred. M05–M21 remain Not started with blank branch/PR bindings. No later milestone active plan or implementation is introduced.

## Branch inventory

Local and remote branches at proposal start: `m02-05-package-scaffolds-eslint-ci`, `m02-06-local-infra-postgres-migrations-health`, `m02-07-qa-development-environment`, `m02-amendment-process-diet`, `m02-closeout-monorepo-and-local-development-environment`, `m03-01-moneyevent-concept-contract`, `m03-02-finalize-moneyevent-type-boundary-merge`, `m03-02-moneyevent-types-schema-boundary`, `m03-05-finalize-fixtures-benchmark-seeds-merge`, `m03-closeout-canonical-moneyevent-engine`, `m03-planning-canonical-moneyevent-engine`, `m04-01-account-schema`, `m04-02-ledger-transaction-schema`, `m04-03-ledger-entry-schema`, `m04-04-enforce-debit-equals-credit`, `m04-05-add-immutable-transaction-storage`, `m04-06-add-account-balance-query`, `m04-07-add-transaction-query`, `m04-08-add-idempotency-keys`, `m04-09-add-reversal-transaction-type`, `m04-10-add-cash-clearing-account`, `m04-11-add-provider-clearing-account`, `m04-12-add-customer-liability-account`, `m04-13-add-fee-expense-account`, `m04-14-add-revenue-account`, `m04-15-add-tests-for-balanced-posting`, `m04-16-add-tests-for-invalid-posting`, `m04-17-add-reversal-tests`, `m04-18-qa-ledger-core`, `m04-closeout-double-entry-ledger-core`, `m04-planning-double-entry-ledger-core`, `main`, `origin`, `origin/m03-closeout-canonical-moneyevent-engine`, `origin/m04-01-account-schema`, `origin/m04-02-ledger-transaction-schema`, `origin/m04-03-ledger-entry-schema`, `origin/m04-04-enforce-debit-equals-credit`, `origin/m04-05-add-immutable-transaction-storage`, `origin/m04-06-add-account-balance-query`, `origin/m04-07-add-transaction-query`, `origin/m04-08-add-idempotency-keys`, `origin/m04-09-add-reversal-transaction-type`, `origin/m04-10-add-cash-clearing-account`, `origin/m04-11-add-provider-clearing-account`, `origin/m04-12-add-customer-liability-account`, `origin/m04-13-add-fee-expense-account`, `origin/m04-14-add-revenue-account`, `origin/m04-15-add-tests-for-balanced-posting`, `origin/m04-16-add-tests-for-invalid-posting`, `origin/m04-17-add-reversal-tests`, `origin/m04-18-qa-ledger-core`, `origin/m04-planning-double-entry-ledger-core`, `origin/main`. Existing milestone branches are intentionally retained for audit/recovery. No branch deletion is authorized. The closeout branch alone holds this scoped unmerged proposal; every M04 submilestone's reviewed contents has landed. Any future cleanup requires a separate explicit instruction.

## Follow-up work

Human review and merge this closeout only after independent PASS and exact-head CI. The continuation verifies actual merge/tree/main provenance, then moves CLP-0005 to completed and synchronizes references before separately scoped M05 planning. Keep all approved V1 requirements and financial authority boundaries.

## Next milestone readiness

M05–M21 remain Not started. M05 planning is blocked until actual closeout human merge and reviewed-tree/main verification. No M05 plan or branch exists in this proposal. Recommend M05 Planning - Payment provider simulators only after that gate.

## Whether active plan can move to completed

Not in this proposal. Keep plans/active/CLP-0005-m04-double-entry-ledger-core.md active until independent closeout QA, exact-head CI and human merge/provenance are verified. The subsequent continuation may move it to plans/completed and synchronize every reference before M05 planning. Directory location alone is not closeout proof.

## Whether safe to start next milestone

No, while this closeout proposal is unmerged. Actual closeout human merge and provenance verification are required before M05 planning.

## Exact next recommended thread

M04 Closeout - Double-entry ledger core. Finish closeout QA/current-head CI and human-only merge. After verified closeout merge and plan finalization: M05 Planning - Payment provider simulators.

## Release implications

V1_PUBLIC_PRODUCT remains the approved destination. M04 alone is not the integrated public product, benchmark, release, production-readiness claim or publication authorization.
