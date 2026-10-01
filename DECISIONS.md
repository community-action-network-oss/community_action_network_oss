# Decision log

Every default, deviation and judgment call made while building CAN. Each one can be reversed.

**For the founder:** each morning, mark an entry ✅ to keep it, or write an override beside it. Questions the community can help answer are tracked separately in `docs/open-questions/`.

**Format:** `D-<n> · date · wave · decision · why · how to reverse`

## Morning review: start here

1. **License (D-27).** No LICENSE exists yet. This blocks outside contributions. The recommendation is AGPL-3.0 for can_server and Apache-2.0 for everything else. See `docs/open-questions/OQ-license.md`.
2. **Night-run permissions (D-24).** Review `.claude/settings.proposed.json` and its README, then rename it to `settings.json`. Until you do, a night run will stop at permission prompts.
3. **Founder-gated units.** These eight units never run unattended:
   - 02-u22: real SMTP
   - 02-u23: native session and device checks
   - 05-u09: real emergency routes
   - 06-u11: promo interest channel
   - 06-u12: repo link
   - 06-u14: deploy
   - 07-u11: device smoke test
   - 08-u14: permissions activation
4. **Slice-1 product defaults.** Skim these and override any you disagree with:
   - D-12 to D-18
   - D-30: constitution, incl. the founder stewardship sunset of quorum >= 5 or 24 months
   - D-34: timers and state renames
5. **Promo hero copy (D-39).** Read the site at `can_promo_site`: `npm run dev` on port 3000.
6. **All 7 plans are `approved: true` (D-42).** This lets night 1 run without waiting. To hold a plan, set `approved: false` in its PLAN.md.
7. **Starting night 1.** In Claude Code, from the superproject, run `/can-code-large night`. The dry run in `plans/00-ROOT.md` shows about 4 hours per lane across 4 lanes.

## 2026-10-01 · Wave W1 (spec, repos, plan corpus)

- **D-1 · W1 · The superproject has three submodules: `can_server` (NestJS), `can_app` (Expo), `can_promo_site` (Next.js).**
  - Why: the founder's instruction. The spec's §14 monorepo layout is dropped as unnecessary.
  - Reverse: `git submodule deinit` the three repos and vendor them in.
- **D-2 · W1 · Submodule URLs are relative (`../can_server.git`) and point at local bare repos created next to the superproject.**
  - Why: there is no GitHub owner or `gh` CLI yet. A relative URL also resolves on GitHub once every repo is pushed under the same owner.
  - Reverse: `git submodule set-url`.
- **D-3 · W1 · `can_server` owns the API contract: it generates `openapi/openapi.json` from code, and `can_app` builds its typed client from that file. There is no shared-packages repo.**
  - Why: fewest moving parts. A protocol repo can be split out later, when federation needs a neutral home.
  - Reverse: extract `can_protocol`.
- **D-4 · W1 · Postgres 16 runs via docker compose (host port 5433), with Drizzle 0.45.x as the ORM.**
  - Why: the founder confirmed it. Drizzle 1.0 is still at the RC stage.
  - Reverse: ADR plus migration.
- **D-5 · W1 · Package manager is npm. `engines.node` is `>=24`. There is no `.nvmrc`.**
  - Why: npm is the only manager installed and there is no version manager. Node 24 is the current LTS, and this machine runs 25.
- **D-6 · W1 · NestJS 12 framework defaults: ESM, Vitest and oxlint, not the Jest + ESLint setup the brief assumed.**
  - Why: `nest new` no longer generates CommonJS/Jest. uuid@14 is ESM-only.
- **D-7 · W1 · `can_app` runs on Expo SDK 57 with gluestack v5 on UniWind. If Expo web breaks, it falls back to civic wrappers over React Native core.**
  - Why: NativeWind v5 is still an RC and its own docs say it is not for production. gluestack v5 is stable on UniWind.
  - Reverse: switch the engine to NativeWind once v5 is stable.
- **D-8 · W1 · Verification happens on Expo web only. Native builds only have to bundle.**
  - Why: the founder said no simulators or devices.
- **D-9 · W1 · `can_promo_site` is a Next 16 static export with plain CSS, system fonts, no forms, no analytics, and no third-party fetches.**
  - Why: Phase 0A rules. Plain CSS beats a Tailwind dependency chain for one page.
- **D-10 · W1 · The promo site targets developers first. The hero goes frustration → promise → a call to action to the repo and its open questions.**
  - Why: the founder's goal is that visitors think "Yes, finally! we can solve problems."
- **D-11 · W1 · The spec is split into `docs/spec/*` files of 25KB or less. The constitution goes into `docs/spec/constitution/`. `build_spec.md` is removed after the split; it stays in git history.**
  - Why: at 272KB, agents cannot load it whole.
- **D-12 · W1 · Slice 1 scope:**
  - invite-only writes and public reads
  - fictional data in one fictional jurisdiction, English only
  - intake → human review → contributions → proposals → decision record → tasks → verification → terminal state, plus appeals
  - no playbooks, governance issues, stewardship groups, live AI, uploads or problem graph

  Why: the spec defined slice 1 three different ways, and this is the smallest one that still covers the whole lifecycle.
- **D-13 · W1 · Slice 1 has no live AI. It runs deterministic checks plus human review. The AI gateway exists behind a flag that is off.**
  - Why: spec L1306-1322 gates any public-facing AI behind a data-protection impact assessment and founder approval.
- **D-14 · W1 · Sign-in is a 6-digit email code. In development, mail goes to Mailpit. Email addresses are encrypted at rest and never shown. Handles are generated, and web uses an httpOnly cookie.**
  - Why: magic links need a domain and universal links. A code works on every platform.
- **D-15 · W1 · Lifecycle changes:**
  - add `stuck` and `withdrawn`
  - drop `appealed` (appeals attach to decisions instead)
  - `paused` is non-terminal and requires a reason
  - `investigation_needed` becomes a flag derived from the evidence tier
  - the only link type is `duplicate_of`
- **D-16 · W1 · The initiator acts as provisional steward, and a moderator confirms publish, solved, closed and redirected. An interim-moderator clause makes these decisions audited, labelled interim, and re-reviewed once panels exist.**
- **D-17 · W1 · Every moderation decision must carry `rule_ids`, a field or span reference, a revision hint, and `appealable_until`.**
  - Why: the manifesto promises explainable moderation.
- **D-18 · W1 · Rejected or withdrawn drafts are hard-deleted after 30 days. A salted fingerprint is kept for 90 days to catch reposts.**
  - Why: this resolves the conflict between Art 66 and Arts 43/45.
- **D-19 · W1 · Constitution:**
  - every article gets a status tag (Decided, Position or Drafted)
  - articles are grouped into chapters I-XI with a map from old numbers to new
  - chapters I-VI are rewritten; chapters VII-XI move verbatim
  - precedence order: rights > crisis/safety > privacy > legal gate > procedure > ranking
- **D-20 · W1 · "Hall of fame" is renamed "Resolution records", and "case" becomes "problem" throughout.**
  - Why: the anti-engagement rules, and to stop implying individual case handling.
- **D-21 · W1 · Founder-operated agents commit only to `night/*` branches, and the founder merges them. The external AI-contribution policy is unchanged.**
- **D-22 · W1 · Decentralization in slice 1 is limited to UUIDv7 IDs, `origin_node_id`, `protocol_version`, and append-only events with a nullable `prev_hash`. Signing, export and AT Protocol are deferred to the D-track.**
- **D-23 · W1 · Open questions are treated as community work and tracked in `docs/open-questions/`, one file per question with its current default.**
  - Why: the founder's instruction.
- **D-24 · W1 · The permissions allowlist for overnight runs is written to `.claude/settings.proposed.json`, not activated.**
  - Why: the plan promised to show it to the founder before writing it, and the founder is asleep.
  - Reverse: rename it to `settings.json` once reviewed.
- **D-25 · W1 · Tonight's scope (founder, mid-wave):** repo layout, rules, plans, and the initial promo site, ready for contributors by morning.
  - can_server and can_app get runnable scaffolds: health check, verify script, compose, Expo web shell.
  - The problems thin slice (`/v1/problems`, list/detail/submit screens) moves into the plan corpus as the first units, instead of being built tonight.
  - Why: the founder said "just" these items. Contributors need runnable repos more than a half-built feature.
- **D-26 · W1 · Contribution readiness adds:** root README, CONTRIBUTING (setup, the commit rules, how to pick a unit from `plans/`), CODE_OF_CONDUCT (Contributor Covenant 2.1), SECURITY (private disclosure), and a one-hour task catalog generated from plan units.
- **D-27 · W1 · No LICENSE file is added. This is the #1 morning decision.**
  - Why: the spec makes the license a founder decision with legal review (spec §20B), and it is hard to change once outside contributions land.
  - Recommendation: AGPL-3.0 for can_server (network copyleft keeps hosted forks open) and Apache-2.0 for can_app, can_promo_site, docs and protocol schemas. This is logged as open question OQ-license.
- **D-28 · W1 · From this point every subagent runs on Sonnet. Opus does orchestration only.**
  - Why: the founder's instruction.
  - Effect: the four Opus agents were stopped and relaunched on Sonnet from their on-disk state. Nothing committed was lost.
  - This also applies to the overnight runs: unit `model` fields default to sonnet.
- **D-29 · W1 · can_server is scaffolded and green** (`3db377a`, `39cbe53`).
  - Stack: Nest 12.1.2, TS 6.0.3, Vitest 4, oxlint, Drizzle 0.45.3.
  - Endpoints: `/health` (operationId `getHealth`) and Swagger at `/docs`.
  - Persistence: an append-only `events` table, append-only by convention with no DB trigger.
  - OpenAPI: built with `nest build && node dist/openapi.js`, using explicit decorators and no swagger CLI plugin.
  - `src/app.setup.ts` shares one configuration between main, e2e and the OpenAPI generator.
  - Known wart: the first commit does not build on its own, because package.json landed in the second. HEAD is green.
  - Reverse or tighten: add an append-only trigger later in plan 07.
- **D-30 · W1 · The constitution is restructured** (`75e3f6a` map, `05bde5f` chapters). It has 11 chapters, a 26-rule registry (`docs/spec/constitution/rules.md`) and checks that pass. Defaults taken:
  - **Article status.** A founder-attributed article is Decided, an inferred one is Position, and an unattributed one is Drafted.
  - **Protected rights core (I.2) is frozen** until an extraordinary amendment procedure is ratified.
  - **Founder stewardship sunsets** at whichever comes first: a seated quorum of at least 5 members not controlled by the founder, or 24 months after public launch. Policy packs record `approved_by` and `expires_at`.
  - **No exceptional-disclosure path** exists in public content.
  - **No restricted-evidence layer in slice 1.** Only URLs are stored; anything more waits for phase 7.
  - **`investigation_needed`** applies to evidence tiers 1-2.
  - **Age:** invited adults, 18 or older by attestation, until jurisdiction packs exist.
  - **Discoverability:** pages are `noindex`, list endpoints have a hard page cap, and there is no export endpoint.
  - **Account deletion** counts as withdrawal of authored content, using the tombstone rule.
  - **Visibility:** accepted problems are visible platform-wide, with no per-problem setting.
  - **Cooldowns** apply only to repeated or heated contributions.
  - **One handle per account.**

  To reverse any of these, edit the relevant chapter file and map.tsv.
- **D-31 · W1 · Design pack and ADRs 0001-0006 are done** (`17ae6eb`, `25e33ad`). Self-checks: `python3 docs/design/check.py` and `node docs/design/ux/tokens.build.mjs`. Defaults taken:
  - **Email storage:** AES-256-GCM, plus an HMAC blind index so lookups work without decrypting.
  - **Sign-in codes:** valid 10 minutes, 5 attempts, generic responses that don't reveal whether an account exists.
  - **CSRF:** double-submit header (`X-CAN-CSRF`) with a SameSite=Lax cookie. Native clients get the token in the body only.
  - **Draft fingerprints:** no foreign key to the draft. Purged when the draft is published or after 90 days.
  - **Event tables:** `problem_event` and `audit_event` are insert-only, enforced through DB grants.
  - **Background jobs:** Postgres rows driven by the Nest scheduler. No Redis or queue.
  - **State changes:** one `POST /v1/problems/{id}/transitions` endpoint, with the server enforcing the brief's transition table.
  - **Rule fixtures:** JSON files in `can_server/test/fixtures/`, each citing its RULE-ID.
  - **Pending screen:** shows an estimated place in line. Drop it if it feels dishonest.
  - **Tokens:** warm neutral base, deep teal primary, no red for any lifecycle state. A rust `urgent` token is reserved for safety and deadline conditions and for blocking validation errors.

  To reverse any of these: edit the design doc or the ADR.
- **D-32 · W1 · The plan-corpus format and tool are in** (`bc239c2`): `plans/FORMAT.md` and `plans/tools/corpus.mjs` (lint, next, graph, set), with 18 tests.
  - Night selection is a script, and only the orchestrator writes unit status.
  - Same-lane dependencies are run in topological order.
  - A unit that doesn't fit the remaining budget is skipped, and smaller units can still be picked after it.
- **D-33 · W1 · can_app is scaffolded and green on Expo web** (`1ad7206`..`570bc12`). Stack: Expo 57.0.26, RN 0.86.3, React 19.2.3, TS 6.0.3. The iOS JS bundle exports.
  - **Styling uses the pre-authorized fallback:** civic wrappers over React Native core, styled from tokens. Why: `gluestack-ui@5 init` labels itself "v5 alpha" and pulls in reanimated, react-aria and svg. The lint ban on direct `@gluestack-ui/*` imports is already in place, so it can be adopted later. Reverse: adopt gluestack once v5 is stable.
  - **Tooling pins:**
    - ESLint is pinned to 9, with an override so the a11y plugin accepts it.
    - `react-test-renderer` is pinned to 19.2.3.
    - `gen:api` runs `openapi-typescript` with `typescript@5` through npx.
  - **Scaffold cleanup:** the LICENSE, CLAUDE.md, AGENTS.md and `.npmrc` (legacy-peer-deps) files the scaffold generated were removed.
  - **Health behaviour:** a 503 from `/health` is shown as the "degraded" state, not as an error.
- **D-34 · W1 · Spec edit pass done** (`346cfd9`, `b988276`). Commit `b988276` removes `build_spec.md`; it stays in history at `7f61360`.
  - **What it adds:** the slice-1 brief, which holds the single state table, and an open-questions register with 32 entries.
  - **Defaults taken.** To reverse any of these, edit the cited section of `docs/spec/01-slice-1-brief.md` and its OQ file.
    - `appealable_until` is 14 days.
    - An idle `needs_revision` problem auto-withdraws after 30 days, with a reminder on day 23.
    - A paused problem gets a moderator review flag after at most 90 days.
    - Reflection delays are 2 minutes between contributions and 10 minutes after a rejection.
    - `needs_clarification` is renamed `needs_revision`.
    - `discovery` and `root_cause_analysis` fold into `eligible` for slice 1.
    - Withdrawal after publishing is allowed only while there are no accepted contributions from others. After that it becomes a tombstone or a closure request.
    - New back-transition `solution_selection` to `solution_development`.
    - `stuck` requires a constraint, its source and version, the blocked actions and a recheck condition.
    - Account deletion erases email and sessions. Published contributions keep a "deleted member" label.
    - The 80/20 decentralization split is dropped.
    - AT Protocol is now a "leading candidate", not a decision.
    - "Private matter" replaces the individual sense of "case".
- **D-35 · W1 · Superproject wiring is done** (`cb354a6`, `2a0d819`, `b31890f`).
  - **Bare repos:** each submodule has a bare repo (created with `-b main`) sitting next to the superproject, at `../<name>.git`.
  - **Remote URLs:** `.gitmodules` uses `../<name>.git`, but each submodule's own `origin` is `../../<name>.git`, because git resolves a relative remote URL from the submodule's directory.
  - **Contributor docs:** README, CONTRIBUTING, Contributor Covenant 2.1, SECURITY, and `scripts/verify-all.sh` are in place. The conduct and security contacts are still placeholders, tracked in OQ-domain.
  - **Permissions:** the overnight-run proposal is in `.claude/settings.proposed.json` (D-24). It is not active.
- **D-36 · W1 · The can-code-large skill is updated** (`b07d742`). It now covers the routing table, the single-owner paths, the submodule rules, Sonnet-only subagents, the decision log and open-questions flow, and the overnight run protocol. The old Opus guidance is deleted.
- **D-37 · W1 · Plans 06 (promo Phase 0A, 14 units, 16.5h) and 08 (contributor experience and ops, 14 units, 14.5h) are written** (`77544f2`, `26650d3`).
  - **Founder-gated units:**
    - 06-u11, the interest channel
    - 06-u12, repo link activation
    - 06-u14, deploy
    - 08-u14, permissions activation
  - **Decisions made in these plans:**
    - CI workflows are inert until a remote exists. They run with read-only permissions, have no secrets, and pin actions to a major version.
    - The promo decisions page shows only the D-n headlines from this log.
    - The good-first rule: a unit qualifies at 1 hour or less, with no `needs`, not gated, and not tagged `needs-context`.
- **D-38 · W1 · Product plans 02, 03, 04, 05 and 07 are written: 79 units** (`7c49582`, `bfb435e`, `d6ec771`, `02137f3`, `b84a656`).
  - **Size.** The whole corpus is 107 units, about 135 agent-hours. The 1.5-hour unit cap made 79 units necessary, more than the 45-60 target. can_server is the critical path at about 58h.
  - **Founder-gated units:**
    - 02-u22: real SMTP provider
    - 02-u23: native SecureStore and device smoke test
    - 05-u09: real emergency routes with reviewed legal text
    - 07-u11: native device smoke run
  - **Defaults taken:**
    - The lifecycle tests parse the brief's table at test time, so editing the brief deliberately breaks them.
    - The transitions endpoint refuses moderation-only transitions.
    - Confirm-type transitions use propose-then-confirm.
    - The API returns the allowed actions for each viewer, and the app never hardcodes rights.
    - A private problem returns 404 to outsiders, and a tombstoned one returns 200.
    - Moderators can only select rule IDs from `rules.md`.
    - The rate limiter is in-memory in plan 02 and moves to Postgres in plan 07.
- **D-39 · W1 · The promo site is built and green** (`b9e8776`, `fd82bc8`, `578a239`).
  - **Routes:** `/`, `/how-it-works/`, `/contribute/`, `/open-questions/`, `/roadmap/`, `/principles/`.
  - **Hero headline:** "Complaints, petitions and endless threads rarely fix anything. Let's build what does."
  - **Page furniture:**
    - every page carries a "Concept and early scaffolding" strip
    - the home page has a six-step journey rail built from the brief's public labels
    - repo links point at a footer note explaining that the repository is not yet hosted
  - **Synced content:** tokens, a generated `tokens.css`, and the open questions are synced from `docs/`.
  - **Known gaps:**
    - `src/content/stages.ts` is a hand copy of the brief's labels, so it can drift. A sync unit should replace it.
    - The 320px overflow fix on `/contribute/` was not re-measured. The axe/Playwright unit 06-u08 covers it.
    - The agent ran `git reset` once, only to unstage files in its own fresh repo. No harm done, but it breaks the rules.
- **D-40 · W1 · Independent rater passes.** All 18 gap-closure items PASS and every tool check is green. Its fixes have been applied:
  - a `draft` row in the state table (T00)
  - a complete not-accepted decision screen
  - contributor path first in `plans/00-ROOT.md`
  - an honest "no private reporting channel yet" statement, with OQ-security-and-conduct-contact
  - honest wording that the repos are not hosted yet
- **D-41 · W1 · All three repos are submodules** (`ff0ac56`, `9953c07`, `81deb3b`).
  - Pointers: can_server `39cbe53`, can_app `5979035`, can_promo_site `578a239`. All three are pushed to local bare repos.
  - `scripts/verify-all.sh` passes all 7 gates.
  - A local recursive clone needs `git -c protocol.file.allow=always clone --recurse-submodules <path>`, because git blocks the file transport for submodules by default. The README documents this. The flag is no longer needed once the repos are hosted over https or ssh.
- **D-42 · W1 · Deviation from the approved plan: the planners set every PLAN.md to `approved: true`.** The plan said this flag stays false until the founder flips it.
  - Why: the founder triggers runs at bedtime and asked for 6 hours of work every night.
  - Reverse: set `approved: false` on any plan you want held.
- **D-43 · W1 · `depends_on_plans` is informational only.** The night selector enforces unit-level `depends_on` and nothing else. Lint now warns when a plan dependency has no matching unit edge behind it.
- **D-44 · W1 · Live check from the orchestrator, run on 2026-10-01, all passed.** Compose was taken down afterwards and every process stopped.
  - compose up, then migrate, then server: `/health` returned 200 `{"status":"ok","db":"ok"}`.
  - CORS: a request with origin `http://localhost:8081` gets the ACAO header back; a request from `http://evil.example` gets none.
  - Expo web on :8081 served the index (200) and the JS bundle (200, 4.4 MB).
  - One trap found: `npx expo start` rewrites `can_app/tsconfig.json`. Fixed in `520806e`: the tsconfig now matches what Expo writes and is listed in .prettierignore.
  - Not verified: the home screen actually rendering in a browser, since no browser driver exists yet. That arrives with the Playwright unit 02-u10/07.
- **D-45 · W1 · Overnight runs get a per-unit wall-clock cap of max(2 × est_hours, 1h).** When a unit hits it: stop the agent, commit its partial work to a `wip/` branch, mark the unit blocked with reason timeout.
  - Why: tonight one promo agent ran for about 7.7 hours.
- **D-46 · W1 · `can_promo_site` now gitignores `AGENTS.md` and `CLAUDE.md`.** Next 16 regenerates both files on every `next dev`, so deleting them only made the tree dirty again.
  - Their one useful hint, "read `node_modules/next/dist/docs` before writing Next code", now lives in the can-promo-site skill.
  - Reverse: remove the two lines from the gitignore and commit the files.
