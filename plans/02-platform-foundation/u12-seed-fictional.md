---
id: "02-u12"
plan: "02"
title: "Dev seed: accounts, jurisdictions, invites and a tiny fictional test fixture"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.2
priority: 20
depends_on: ["02-u11"]
writes: ["src/seed.ts","src/seed/**","package.json","test/seed.e2e-spec.ts",".env.example"]
reads: ["src/**"]
spec: ["docs/spec/01-slice-1-brief.md#10-minimal-entity-list", "docs/spec/01-slice-1-brief.md#2-slice-1-defaults", "docs/open-questions/OQ-launch-jurisdiction-language.md", "docs/design/system-design.md#9-test-strategy", "docs/design/flows/seed-bootstrap.md"]
needs: ["docker","db"]
verify: ["npm run verify","npx vitest run --config ./vitest.config.e2e.ts test/seed.e2e-spec.ts"]
founder_gate: false
defaults: "Use example.test addresses (reserved TLD). The fictional problems are a unit and UI-development fixture only, behind --fixture, never part of the default seed. Revert by editing src/seed/fixtures.ts."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Give developers, the app and Playwright a deterministic starting world, without inventing public content. Per D-56 the real seed problems (seeds 1 and 2, Amsterdam framings with synthetic evidence) enter only through the normal moderation pipeline via the seed bootstrap loader 11-u18, which this unit does not depend on (11-u18 depends on the pipeline built later). This unit seeds accounts, jurisdictions and invites, and keeps a tiny fictional fixture of already-decided problems for unit tests and UI development before the pipeline exists.

## Steps
1. src/seed.ts (built to dist/seed.js like openapi.ts; scripts: "seed": "nest build && node dist/seed.js", "seed:reset": "nest build && node dist/seed.js --reset"). --reset truncates all slice-1 tables in dependency order (as the owner role) before seeding; running seed twice without --reset is idempotent (upserts by fixed ids). Flags: default seeds accounts, jurisdictions and invites only; --fixture also loads the fictional fixture (step 5). When the bootstrap loader (11-u18) exists, the script prints "run npm run seed:bootstrap -- --seeds 1,2 to load the Amsterdam seed problems through the pipeline" and never inserts those problems itself.
2. Jurisdictions: "Amsterdam (NL)" (is_fictional false, enabled true, the first real overlay id as in 10-u21, emergency notice "If someone is in danger, contact your local emergency number.", rule_set_version from the active pack when loaded else "dev") and "Fiktiva City (fictional test jurisdiction)" (is_fictional true, enabled true, overlay from 10-u20) used only for parity and unit tests.
3. Accounts through the real auth use cases and crypto (never raw inserts of emails): two stewards (steward-one@example.test, steward-two@example.test, role moderator in the table, a steward and maintainer function only: they issue invites and nothing else), two members (member-one@example.test, member-two@example.test). Plan 09 and plan 11 add auditor, labeler, lane_member and the labeled seed account on top. Print their emails and generated handles to stdout (fictional dev addresses). Print three unused invite codes (fixed values like CAN-DEV-INVITE-1..3, stored only as hashes).
4. Real framings: src/seed/framings.ts exports the four D-56 framings verbatim as constants (a test reads docs/spec or the plan 11 FRAMINGS file when available and fails on drift). Nothing here submits them.
5. Fictional fixture (src/seed/fixtures.ts, --fixture only, also exported as seedFictionalFixture() for unit and e2e tests): five published problems whose titles start with "Fictional example:" in states eligible, solution_development, stuck, solved (policy_version "fixture-1", transitional true) and withdrawn-after-publication (tombstoned), with plausible problem_event rows and ids fixed via a seeded generator, plus one never-published draft and one submitted problem owned by member-one for plan 03 and 07 tests. Fixture rows are marked fixture so no public surface can confuse them with seeds, and no decision text implies a person decided anything. All text passes the privacy rules: no personal names, only office-and-jurisdiction phrasing.
6. test/seed.e2e-spec.ts: seed twice, assert counts; with --fixture GET /v1/problems returns the 5 public items and none of the private ones; without --fixture it returns none; every account row has no plaintext email column; Amsterdam is real and enabled, fiktiva-city is fictional.

## Acceptance
- npm run seed:reset && npm run seed produces the same ids and handles every time except generated handles (assert stable ids, not handles).
- The default seed publishes no problem; the fixture is opt-in and labelled fictional.
- The four framings exist as verbatim constants and nothing submits them from this unit.
- The seed never connects to anything but local compose.
- `npm run verify` is green.

## Out of scope
- The Amsterdam seed problems with synthetic evidence (11-u18, 11-u07, 11-u08).
- Contributions, proposals, tasks seed data (later plans extend).
- Production data of any kind.
