---
id: "02-u12"
plan: "02"
title: "Fictional seed data and npm run seed"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.2
priority: 20
depends_on: ["02-u11"]
writes: ["src/seed.ts","src/seed/**","package.json","test/seed.e2e-spec.ts",".env.example"]
reads: ["src/**"]
spec: ["docs/spec/01-slice-1-brief.md#10-minimal-entity-list","docs/spec/01-slice-1-brief.md#2-slice-1-defaults","docs/open-questions/OQ-launch-jurisdiction-language.md","docs/design/system-design.md#9-test-strategy"]
needs: ["docker","db"]
verify: ["npm run verify","npx vitest run --config ./vitest.config.e2e.ts test/seed.e2e-spec.ts"]
founder_gate: false
defaults: "Use example.test addresses (reserved TLD). Revert by editing src/seed/fixtures.ts."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Provide deterministic, clearly fictional data so developers, the app and Playwright all start from the same world. Later plans extend src/seed/ with contributions, proposals and so on.

## Steps
1. src/seed.ts (built to dist/seed.js like openapi.ts; scripts: "seed": "nest build && node dist/seed.js", "seed:reset": "nest build && node dist/seed.js --reset"). --reset truncates all slice-1 tables in dependency order (as the owner role) before seeding; running seed twice without --reset is idempotent (upserts by fixed ids).
2. Fixed fictional jurisdiction: "Eastvale Region (fictional)" with child "Eastvale Harbour District (fictional)", is_fictional true, emergency notice text "If someone is in danger, contact your local emergency number. This is a fictional demonstration." rule_set_version "slice1-0".
3. Accounts through the real auth use cases and crypto (never raw inserts of emails): two moderators (mod-one@example.test, mod-two@example.test), two members (member-one@example.test, member-two@example.test). Print their emails and generated handles to stdout (these are fictional dev addresses). Print three unused invite codes (fixed values like CAN-DEV-INVITE-1..3, stored only as hashes).
4. Eight published fictional problems, each prefixed in title with "Fictional example:", in states eligible, eligible (investigation_needed true), solution_development, implementation, stuck, paused, solved, withdrawn-after-publication (tombstoned), with plausible problem_event rows and ids fixed via a seeded generator. Add one never-published draft and one submitted problem owned by member-one for plan 03 and 07 tests.
5. src/seed/fixtures.ts holds the text as data (no generation at runtime). All text passes the privacy rules: no personal names, only office-and-jurisdiction phrasing.
6. test/seed.e2e-spec.ts: seed twice, assert counts, GET /v1/problems returns the 8 public items, none of the private ones leak, and every account row has no plaintext email column.

## Acceptance
- npm run seed:reset && npm run seed produces the same ids and handles every time except generated handles (assert stable ids, not handles).
- All seeded text is labelled fictional.
- The seed never connects to anything but local compose.
- `npm run verify` is green.

## Out of scope
- Contributions, proposals, tasks seed data (later plans extend).
- Production data of any kind.
