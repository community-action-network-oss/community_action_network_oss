---
id: "08-u10"
plan: "08"
title: "docs/onboarding tour for new contributors"
repo: "."
area: "can-root"
model: sonnet
est_hours: 1.5
priority: 100
depends_on: ["08-u02","08-u03","08-u08"]
writes: ["docs/onboarding/**","scripts/check-doc-links.mjs"]
spec: ["docs/spec/21-open-source-governance.md","docs/spec/22-ai-contribution-policy.md","docs/spec/00-index.md","docs/spec/20-participation-nonmonetary.md","CONTRIBUTING.md"]
verify: ["node scripts/check-doc-links.mjs docs/onboarding"]
founder_gate: false
defaults: "Do not promise review turnaround times; the project has no stated capacity."
status: "todo"
attempts: 0
commits: []
actual_hours: null
---

## Objective

A short tour that answers: what is this, what can I run, where is the work, how does my change get reviewed. Aimed at a developer first, with paths for non-coders.

## Steps

1. Write docs/onboarding/README.md (index and 30 minute path) and short pages: 01-what-and-why (concept stage, what does not exist, link manifesto and spec index), 02-run-it (bootstrap, verify-all, what each repo runs), 03-pick-work (good-first index, plans units, open questions, how to claim), 04-make-a-change (branch, verify, commit conventions, submodule pointer rule, PR template, AI disclosure), 05-without-code (design, accessibility, research, policy, translation paths and the open questions README), 06-review-and-decisions (what maintainers check, decision table, escalation, security reports go to SECURITY.md).
2. Use only commands and paths that exist. Link, do not copy, spec text. No em or en dashes; fictional examples only.
3. Write scripts/check-doc-links.mjs `<dir>`: every relative markdown link and anchor-less path in the folder resolves to a file; fail otherwise.
4. Two main goals (D-76): page 01-what-and-why states both goals in two sentences each: problem, evidence, lawful solution, tracked outcome; and the Archive of every ended problem with suggested paths from what worked or failed elsewhere. Link docs/spec/24-archive-reuse.md and the stage plan spec (docs/spec/01b-stages.md). Page 03-pick-work notes that spike units (zk location proof) and units that need real devices are founder-gated and are not good-first.

## Acceptance

- Each page is under 8 KB; the tour is readable in 30 minutes.
- check-doc-links passes.
- Every command in the tour was run or is marked as an example.

## Out of scope

- Video or interactive content.
- Role pages (plan 06 owns the public site).
- Rewriting CONTRIBUTING.md.
