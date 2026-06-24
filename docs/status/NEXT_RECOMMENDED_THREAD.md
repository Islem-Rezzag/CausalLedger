# Next Recommended Thread

Thread name:
M02.06 QA - Local Infrastructure: Docker Compose, Postgres, Migration Tool, and Health-Check Stubs

Precondition:
M02.06 builder completed on branch `m02-06-local-infra-postgres-migrations-health`. The local infrastructure baseline is scoped to Docker Compose/Postgres, migration tooling, env placeholders, and an infrastructure readiness stub only. Product/domain implementation remains unstarted.

Current boundary:
M01 is completed and closed. M02.01 through M02.05 are completed and merged. M02.06 is builder-complete local infrastructure only: local Postgres, migration tooling boundary, local setup docs, validator coverage, and `/infra/ready`.

Next after merge:
M02.07 Builder - QA dev environment

M02.07 must not start until M02.06 QA passes, the M02.06 PR merges into `main`, and post-merge tracking is finalized. M03 through M21 remain `Not started`. Product domain implementation has not started.
