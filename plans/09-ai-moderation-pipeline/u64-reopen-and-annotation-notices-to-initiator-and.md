---
id: "09-u64"
plan: "09"
title: "Reopen and annotation notices to initiator and followers: extend the notices read model"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 293
depends_on: ["09-u63", "09-u29", "04-u07"]
writes: ["src/notices/**", "src/db/schema.ts", "drizzle/**", "openapi/openapi.json", "test/notices-reopen.e2e-spec.ts"]
spec: ["docs/design/flows/re-resolution.md#sequence", "docs/spec/constitution/rules.md#RERESOLVE-1", "docs/spec/constitution/rules.md#REMOD-NOTICE-1", "docs/design/ai/triggers.md#re-resolution-d-59", "docs/design/ux/wireframes/submit.md#WF-REMOD-1", "docs/design/components/server.md"]
needs: ["docker", "db"]
verify: ["npm run verify", "npx vitest run --config ./vitest.config.e2e.ts test/notices-reopen.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Extend the 09-u29 notice model so a reopen or an annotation is never silent: the initiator and followers see "Reopened under policy vX" with the rule or law that changed, what it means, the history link and the appeal path.

## Steps
1. Add notice kinds `reopened` and `re_resolution_annotated` to `moderation_notice` (extend the enum migration; unique per (review_id, kind, account_id)). Recipients: the initiator, all followers with consent (04-u07), and the steward when the initiator is unreachable; email through the NotificationPort (04-u07) with rule ids, versions and appeal path, no problem text.
2. Fields on `GET /v1/me/notices`: `kind`, `oldVersion`, `newVersion`, `changedRules[{id, plainText}]`, `changedLegal[{layer, articleId, corpusVersion}]`, `whatChanged`, `historyUrl`, `appealable`, `appealUntil`. Public short form `GET /v1/problems/{id}/notice` gains `reopenedUnderVersion` and a `kind`; no author data.
3. REMOD-NOTICE-1 style invariant: a reopened or annotated problem is never in that state without a notice row and an appeal route (query-level test over public reads).
4. Followers who cannot be emailed still see the in-app notice. The counts-only change log (`GET /v1/policy/changes`) adds reopen and annotate counts per rule, no item ids.
5. Tests: reopen creates one notice per recipient; unreachable initiator falls back to the steward; annotate notice carries the reason code; another account's notice is 404; counts leak nothing. Run `npm run openapi` then `git add -- openapi/openapi.json`.

## Acceptance
- Every reopen has a notice, a history link and an appeal path (invariant test).
- Emails carry no problem text (test).
- openapi regenerated; `npm run verify` is green.

## Out of scope
- App screens (09-u65).
