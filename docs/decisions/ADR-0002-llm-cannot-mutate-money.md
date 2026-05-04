# ADR-0002 LLM Cannot Mutate Money

## Status

Accepted.

## Decision

LLM agents cannot mutate money, approve repairs, post ledger entries, modify raw events, delete evidence, or override invariants.

## Consequences

Agent tools must be designed around investigation, summarization, and proposal generation only.
