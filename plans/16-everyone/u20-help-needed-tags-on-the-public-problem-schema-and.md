---
id: "16-u20"
plan: "16"
title: "help_needed tags on the public problem schema and list"
repo: "can_server"
area: "can-server"
model: sonnet
est_hours: 1.5
priority: 9
depends_on: ["16-u01", "10-u69"]
writes: ["src/**", "openapi/**", "drizzle/**", "test/**"]
spec: ["DECISIONS.md", "docs/spec/10-data-model.md", "docs/spec/constitution/rules.md"]
verify: ["npm run verify"]
founder_gate: false
defaults: "D-80 is binding; if a step is blocked, take the most private and plainest option and report it for the morning review."
status: done
attempts: 0
commits: ["65d9e01"]
actual_hours: 0.1
---
## Objective
Publish a `help_needed` set on every public problem so devices can match locally (spec 26, D-80). No user data is involved.

## Steps
1. Read spec 26 sections 4 and 5 and the problem schema from 10-u08 and 10-u69.
2. Add `help_needed` {skill_groups[], languages[], coarse_place, topics[]} to the problem schema and the public list and detail responses; poster proposes it in preparation, volunteer review may suggest changes.
3. Expose the public list without sign-in in a form a device can fetch whole or by coarse region shard; no endpoint accepts profile fields (PROFILE-LOCAL-1 contract test).
4. Update OpenAPI and regenerate clients as the repo does.

## Acceptance
- help_needed on list and detail.
- Contract test: no request schema carries profile fields.
- verify passes.

## Out of scope
- App matching.
