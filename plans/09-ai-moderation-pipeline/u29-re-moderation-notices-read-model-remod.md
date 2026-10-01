---
id: "09-u29"
plan: "09"
title: "Re-moderation notices read model (REMOD-NOTICE-1) and Decided-under notices"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 258
depends_on: ["09-u27"]
writes: ["src/notices/**","src/db/schema.ts","drizzle/**","src/app.module.ts","openapi/openapi.json","test/notices.e2e-spec.ts"]
reads: ["src/moderation/**","src/problems/**"]
spec: ["docs/design/ai/triggers.md#re-moderation-semantics","docs/spec/constitution/rules.md#REMOD-NOTICE-1","docs/design/flows/post-publication-recheck.md#notices","docs/design/ux/wireframes/submit.md#WF-REMOD-1","docs/open-questions/OQ-reremoderation-grace.md","docs/design/components/server.md"]
needs: ["docker","db"]
verify: ["npm run verify","npx vitest run --config ./vitest.config.e2e.ts test/notices.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Nothing is removed silently. On a flip, create a notice row linked to the old and new decisions, apply the grace-period visibility rules, and serve `GET /v1/me/notices` plus a public short form.

## Steps
1. Table moderation_notice (id, account_id, target_kind, target_id, old_decision_id, new_decision_id, kind remod|decided_under|permissive, visible_until null, immediate bool, created_at, seen_at null). Consumes `moderation.recheck.flipped` and `.permissive` events and also writes `decided_under` notices for completed first decisions. Unique per (new_decision_id, kind).
2. Visibility semantics (triggers.md, OQ-reremoderation-grace is proposed, so grace days are a pack value `remod.grace_days`, default 7): flip to needs_revision gives time-boxed revision with previous text visible only if still permitted; flip to reject on public content limits visibility after `visible_until`; privacy or crisis tier rules withdraw from public view at once (`immediate: true`) and the notice says why and how to appeal. The state change itself goes through the applier or engine, never directly.
3. REMOD-NOTICE-1 invariant test: for a policy-change fixture flip the item is never absent from every surface without a notice row and an appeal route existing (query-level test over all public reads).
4. Permissive flips (previously rejected, now publishable): notice kind permissive with a `resubmitNow` capability that skips the cooldown for that target (flag consumed by the transitions endpoint cooldown check; add the flag and test, the app consumes it later).
5. GET /v1/me/notices (cursor paged): {id, kind, targetId, policyVersion, rules:[{id,plainText}], whatChanged, visibleUntil, immediate, appealable, appealUntil, resubmitNow}. GET /v1/problems/{id}/notice (public short form, no author data): {rereviewedUnderVersion, summary}. Mark-seen endpoint POST /v1/me/notices/{id}/seen.
6. Public change log counts (no content): `GET /v1/policy/changes` returns versions with flip counts per DP; counts only (test that no id of an item appears).
7. Tests: flip creates exactly one notice; immediate for privacy tier; grace window with fake clock; notice for another account is 404; counts endpoint leaks nothing; permissive flag.
8. Run `npm run openapi`, then `git add -- openapi/openapi.json` so the verify diff gate passes. Never hand-edit the file.

## Acceptance
- REMOD-NOTICE-1 invariant test passes over every public read.
- Privacy and crisis tiers withdraw at once with a notice.
- openapi/openapi.json regenerated; `npm run verify` is green.

## Out of scope
- App screens.
- Email delivery of notices (NotificationPort can be added later).
