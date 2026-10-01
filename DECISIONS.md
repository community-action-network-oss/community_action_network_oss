# Decision log

Every default, deviation and judgment call made while building CAN. Each one can be reversed.

**For the founder:** each morning, mark an entry ✅ to keep it, or write an override beside it. Questions the community can help answer are tracked separately in `docs/open-questions/`.

**Format:** `D-<n> · date · wave · decision · why · how to reverse`

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
