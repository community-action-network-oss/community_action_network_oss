---
id: "03-u08"
plan: "03"
title: "Checks endpoint, preview and T01/T03 synchronous gate (draft to in_review)"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 45
depends_on: ["03-u02","03-u03","03-u04","03-u07"]
writes: ["src/problems/app/**","src/problems/http/**","src/problems/infra/**","src/db/schema.ts","drizzle/**","test/checks.e2e-spec.ts","openapi/openapi.json"]
reads: ["src/**"]
spec: ["docs/spec/01-slice-1-brief.md#4-lifecycle","docs/spec/01-slice-1-brief.md#9-drafts-fingerprints-and-the-pending-screen","docs/design/system-design.md#6-api-surface-v1","docs/spec/constitution/rules.md#PRIV-GATE-1","docs/spec/constitution/rules.md#PUB-FAILCLOSED-1","docs/design/ux/wireframes/submit.md#WF-SUBMIT-3","docs/design/ux/wireframes/submit.md#WF-SUBMIT-4"]
needs: ["docker","db"]
verify: ["npm run verify","npx vitest run --config ./vitest.config.e2e.ts test/checks.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: done
attempts: 0
commits: ["e003d20"]
actual_hours: 0.2
---
## Objective
Connect the deterministic checks to the API: POST /v1/problems/{id}/checks returns flags with spans, GET /v1/problems/{id}/preview returns the exact public rendering, and T01 and T03 run the checks synchronously (a hard failure keeps the draft in draft, or in needs_revision for T03, with field hints and creates no moderation run or decision). T01 also runs DP-PRIVACY so personal data is masked before any volunteer sees the problem (REVIEW-1); if that run cannot complete the problem goes to held (T08, fail closed). These are the deterministic first layer only: the publication decision (DP-PUBLISH) runs after volunteer review (12-u08), not at T01. Completeness against the pinned schema is validated by 10-u29, not here.

## Steps
1. Migration: add privacy_check_id and privacy_check_at to problem; table or jsonb problem.kept_flags for flags the author chose to keep (PRIV-GATE-1 evidence).
2. src/problems/app/run-checks.ts combines detectPrivacyFlags, classifyStatement, detectScript, checkEvidenceUrl for each intake evidence URL, findSecrets and checkLimits over each text field and returns {flags: [{field, kind, ruleId, start, end, suggestion, severity: "hard" | "review"}], emergency: boolean, languageLabel: string | null, repostMatch: boolean}. Hard: phone, email, government id, secret, javascript or credentialed URL, over length. Review (author may keep with an explicit "Keep as is"): person name candidates, street address candidates.
3. POST /v1/problems/{id}/checks (initiator): runs and stores privacy_check_id, returns flags. POST /v1/problems/{id}/checks/keep {flagIds}: records kept review-severity flags (the moderation run later receives "kept by author" as an input). GET /v1/problems/{id}/preview (initiator): returns the exact public fields as the public detail would render, the publishing explanation ids (text lives in the app copy), the handle that will be shown, and the deletion and appeal timings that apply.
4. T01 (draft to in_review) and T03 (needs_revision to in_review) call run-checks first, then the CRITERIA-1, sources and stage-plan guards of 12-u04: any hard flag, any unkept review flag, or emergency without acknowledgement fails with validation_failed and per-field fieldErrors and the state does not change (PUB-FAILCLOSED-1: any internal error also leaves the state unchanged). On success store the fingerprint check result (repostMatch advisory note on the problem, passed to the run as an input), take a version snapshot (copy the text fields into a problem_version table or jsonb snapshot with version number), and mark T03 hints addressed.
5. Remove the SUBMIT_CHECKS_WIRED guard introduced by the transitions endpoint unit so T01 and T03 now work.
6. Tests: clean draft submits; each hard flag blocks with the right field; a kept review flag lets submit pass and is passed to the run as an input, never shown publicly; emergency language is flagged not rejected; preview equals the public detail shape once published (compare keys); a failure injected into run-checks leaves state unchanged; T03 requires at least one flagged field to have changed (compare snapshot).
7. Run `npm run openapi`, then `git add -- openapi/openapi.json` so the verify diff gate passes. Never hand-edit the file.

## Acceptance
- PRIV-GATE-1: no hard flag can reach in_review.
- Flags carry span offsets that the app can highlight.
- Preview is exactly what would be public.
- Internal check failure leaves the problem in draft or needs_revision.
- openapi/openapi.json regenerated and committed in the same commit.
- `npm run verify` is green.

## Out of scope
- App screens (plan 03 app units).
- Re-running checks at T04 (the outcome applier 09-u23 re-checks).
- The CRITERIA-1, sources and plan guards (12-u04) and the review queue (12-u03).
