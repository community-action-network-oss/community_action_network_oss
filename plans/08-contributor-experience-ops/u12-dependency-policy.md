---
id: "08-u12"
plan: "08"
title: "Dependency update policy"
repo: "."
area: "can-root"
model: sonnet
est_hours: 1
priority: 120
depends_on: []
writes: ["docs/policy/dependency-updates.md"]
spec: ["docs/spec/22-ai-contribution-policy.md","docs/spec/21-open-source-governance.md","DECISIONS.md","SECURITY.md","docs/spec/16-security-a11y-ops-testing.md"]
verify: ["node -e \"const s=require('fs').statSync('docs/policy/dependency-updates.md').size;if(s>25000)throw new Error(s)\"","node plans/tools/corpus.mjs lint"]
founder_gate: false
defaults: "Monthly routine updates, out-of-band for security advisories, no automated merge ever."
status: "todo"
attempts: 0
commits: []
actual_hours: null
---

## Objective

Say how dependencies change so that pinned decisions (D-5, D-6, D-7, D-33) are not undone by drive-by bumps and so that updates are reviewable.

## Steps

1. Read each repo package.json and the pin decisions in DECISIONS.md. Write a dated snapshot table of current pinned majors per repo and why (Nest 12, TS 6, Drizzle 0.45, Expo 57, ESLint 9, Next 16).
2. Policy sections: cadence (monthly, matching the release rhythm in docs/spec/21), security advisories (weekly npm audit, criticals out of band, reports follow SECURITY.md), major bumps need an ADR or an issue with a plan, lockfiles always committed, new dependency rule (justify, check license against the pending OQ-license, prefer stdlib; the promo site ships no third-party runtime code), grouping (one concern per pull request), AI-generated dependency changes need explicit human review (docs/spec/22), no auto-merge by bots or people, who approves (maintainers), rollback.
3. Mention Dependabot or Renovate configuration as an option left for the founder after the remote exists; do not add config files.

## Acceptance

- Policy is under 25 KB and cites the pin decisions.
- Table matches package.json files at the time of writing.

## Out of scope

- Dependabot or Renovate config.
- Actually updating anything.
