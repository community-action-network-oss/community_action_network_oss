---
id: "06-u19"
plan: "06"
title: "Replace the old human-only moderation copy and re-sync manifesto-derived copy"
repo: "can_gallery"
area: can-gallery
model: sonnet
est_hours: 1.5
priority: 152
depends_on: ["06-u18"]
writes: ["src/app/**", "src/content/**", "scripts/sync-manifesto.mjs", "scripts/check-copy.mjs", "docs/claims.md", "README.md", "package.json"]
spec: ["manifesto.md", "DECISIONS.md", "docs/adr/0008-ai-executed-community-policy.md", "docs/spec/constitution/rules.md"]
verify: ["npm run sync:check", "npm run verify"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: done
attempts: 0
commits: ["a5fa6be"]
actual_hours: 0.1
---
## Objective
Remove every statement that people make and answer for every decision, or that moderation is human review with AI "planned", and re-sync the copy that derives from the manifesto so the site matches D-51, D-59, D-60 and D-61.

## Steps
1. Known places (read the real files first): home page 'How it works' step 2 and the closing paragraph, how-it-works page paragraph, principles page "Let AI decide alone" (rewrite: the AI executes rules the community wrote; it never makes policy; appeals are independent; humans handle emergencies and legal process only), role pages and docs/claims.md entries that repeat the old model. Rewrite each to the AI-executed model and link /community-policy/.
2. `scripts/sync-manifesto.mjs` (follows the sync convention: reads `../manifesto.md` when present, otherwise keeps the committed output and exits 0): extracts the sections "Core promise", "Core principles", "Moderation model" and "Open source, and how to contribute" into `src/content/manifesto.json` (dashes converted to commas as the open-questions sync does). Pages that quote them render from this file instead of hand copy; `sync:check` fails on drift.
3. `scripts/check-copy.mjs`: a banned-phrase list failing the build in `src/` and rendered `out/` ("people make and answer for every decision", "Nothing is published until a person has said yes", "AI assistance is planned", "rules-based checks and human review", and the case-insensitive variants); wire into verify as `check:copy`.
4. Update the README line about the synced files and the can-gallery single-owner list in the README (not the skill file).
5. Copy rules: no em dashes or en dashes in any user-facing text; github.com is the only external host; no forms, cookies, analytics or third-party requests; label unbuilt things `Planned`; nothing implies the platform is live or handling real problems; no emergency, legal, medical or government service claims; calm, warm, no hype.
6. Lifecycle v2 (W13): the old fixed sequence copy (gathering facts, developing solutions, choosing a solution, in progress, checking the result) is also replaced wherever it appears outside src/content/stages.ts: it is now "the optional default stage template, classic-5"; the lifecycle states in copy follow docs/spec/01a-lifecycle.md (draft, in volunteer review, active with a stage plan, solved and the rest). Add the retired phrases "Resolution records" and "Awaiting review" to the banned-phrase list of check-copy (the archive is called the Archive).

## Acceptance
- `rg` for the banned phrases in src and out finds nothing; check:copy passes.
- src/content/manifesto.json is generated and sync:check passes.
- Home and how-it-works describe pre, during and post publication AI runs with explanations and appeals.

## Out of scope
- Editing the manifesto (owned by the spec side).
- New pages (06-u20 to 06-u22).
