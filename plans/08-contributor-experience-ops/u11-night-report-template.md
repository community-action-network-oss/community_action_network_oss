---
id: "08-u11"
plan: "08"
title: "Night-run report template"
repo: "."
area: "can-root"
model: sonnet
est_hours: 0.5
priority: 110
depends_on: []
writes: ["plans/runs/TEMPLATE.md"]
spec: ["docs/spec/02-agent-rules.md","plans/FORMAT.md","DECISIONS.md"]
verify: ["node -e \"const t=require('fs').readFileSync('plans/runs/TEMPLATE.md','utf8');for(const h of ['## Selection','## Results','## Blocked','## Open questions filed','## Decisions to log','## Verification','## Calibration','## Morning checklist'])if(!t.includes(h))throw new Error(h)\"","node plans/tools/corpus.mjs lint"]
founder_gate: false
status: "todo"
attempts: 0
commits: []
actual_hours: null
---

## Objective

A fill-in template so every night report has the same sections and the founder can read one in two minutes.

## Steps

1. Write plans/runs/TEMPLATE.md. Frontmatter-free. Header: date, branch night/YYYY-MM-DD, hours budget, orchestrator.
2. Sections in order: Preflight (node, docker, db, mail availability), Selection (paste `corpus.mjs next --json`, with skipped reasons), Results (table: unit id, outcome done or blocked or skipped, attempts, commit shas, est vs actual hours), Blocked (reason and the reversible default taken), Open questions filed (OQ ids, never decisions), Decisions to log (candidate DECISIONS.md lines for the orchestrator), Verification (verify-all and lint output summary), Calibration (est vs actual, units that overran), Morning checklist (branches to merge, founder-gated units waiting, anything needing a decision).
3. State that only the orchestrator edits unit status and DECISIONS.md and that agents report SHAs.

## Acceptance

- All eight sections are present in order.
- Template is under 4 KB and has no dashes of the banned kinds.

## Out of scope

- Tooling that generates reports.
- Writing any real run report.
