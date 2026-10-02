---
id: "03-u16"
plan: "03"
title: "Local draft store with autosave"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 1
priority: 24
depends_on: []
writes: ["src/drafts/**","__tests__/draft-store.test.ts","package.json","package-lock.json"]
reads: ["src/**"]
spec: ["docs/design/ux/wireframes/prepare.md#WF-PREP-1","docs/spec/01-slice-1-brief.md#8-accounts-and-sign-in-d-14","docs/design/system-design.md#5-auth-flow","docs/design/ux/ui-unit-template.md"]
needs: []
verify: ["npm run verify","npx jest --ci __tests__/draft-store.test.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: done
attempts: 0
commits: ["59dbace"]
actual_hours: 0.1
---
## Objective
The preparation workspace (WF-PREP-1 to WF-PREP-3) must never lose text: a local draft store that autosaves every field, survives reload and session expiry, works signed out, and later uploads on the first authenticated save. No server dependency.

## Steps
1. Add @react-native-async-storage/async-storage (works on web via localStorage). src/drafts/draftStore.ts: typed Draft {localId, serverId?, schemaId, schemaVersion, schemaHash, body: Record<string, unknown> (keys come from the pinned content schema, never a hard-coded field list, D-58; nested structures such as sources[], finalAcceptanceCriteria[] and the stage plan (stages, edges, criteria) are stored as part of the body so preparation (WF-PREP-1 to WF-PREP-3) never loses text), section, updatedAt, version}; functions load(), save(partial) debounced 400 ms, clear(), listLocal(). Single draft per device in slice 1.
2. src/drafts/useDraft.ts hook: returns draft, setField, savedAt and a status "saved" | "saving" | "unsynced" announced through a polite live region component (src/drafts/SavedIndicator.tsx) that says "Saved on this device" with the time.
3. Storage failures (quota, private mode) are caught: the hook keeps the draft in memory and shows a calm warning "This device could not save your draft" once.
4. Security: only the draft text is stored locally, never tokens or email. Provide purgeLocalDraft() used on logout only if the user chooses ("Delete the draft on this device") to avoid silent loss.
5. Tests with the async-storage jest mock: save then reload returns the same draft; debounced writes coalesce; storage error path; clear works; values survive a simulated session-expired event (the store is independent of session).

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6; mark items not applicable with a reason in the commit message).
- A reload never loses typed text.
- No token, email or session data is stored.
- The status is announced politely, not on every keystroke.
- `npm run verify` is green (tsc, lint, prettier, logical-properties check, jest, web export).

## Out of scope
- Server sync (the preparation screens, 12-u12 to 12-u14).
- Multiple drafts.
