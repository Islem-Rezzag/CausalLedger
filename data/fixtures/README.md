# Fixtures

`money-events/candidates.json` is the M03.05 controlled synthetic MoneyEvent candidate corpus. It contains 21 versioned deterministic cases: eight full valid-normalization snapshots and 13 exact invalid-issue expectations for the existing source-neutral validator and normalizer.

The corpus contains no live payloads, credentials, personal contact fields, production evidence, simulator output, benchmark results, or financial truth. A strict test-only parser rejects malformed manifests before candidate behavior is asserted. Its normative boundary is documented in `docs/MONEYEVENT_FIXTURES_BENCHMARK_SEEDS.md`.
