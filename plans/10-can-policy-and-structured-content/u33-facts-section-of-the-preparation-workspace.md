---
id: "10-u33"
plan: "10"
title: "Facts section of the preparation workspace (WF-PREP-1) and the exact preview, on the schema renderer"
repo: can_app
area: can-app
model: sonnet
est_hours: 1.5
priority: 33
depends_on: ["10-u05","10-u29","03-u16","03-u08","10-u08"]
writes: ["app/me/problems/**/facts*","app/me/problems/**/preview*","src/features/submit/**","src/forms/schema/**","src/i18n/en.json","__tests__/submit/**","src/api/schema.d.ts"]
reads: ["src/**","app/**"]
spec: ["docs/design/ux/wireframes/prepare.md#WF-PREP-1","docs/design/ux/wireframes/submit.md#WF-SUBMIT-1","docs/design/ux/wireframes/submit.md#WF-SUBMIT-4","docs/design/ux/wireframes/forms.md#WF-FORM-1","docs/design/ai/structured-content.md#3-the-problem-schema-field-by-field","docs/design/ux/copy-deck.md","docs/design/ux/ui-unit-template.md"]
verify: ["npm run verify"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: done
attempts: 0
commits: ["f64e931"]
actual_hours: 0.2
---
## Objective
Under lifecycle v2 the poster works in the preparation workspace of 12-u12 (WF-PREP-1). This unit is its facts section: the problem fields 1 to 14 plus the `context_profile` confirmation section, driven entirely by the `problem` schema through `SchemaForm`, as route screens the workspace links to, and the exact preview (WF-SUBMIT-4) shown before sending for volunteer review. It replaces the hard-coded submit steps 1 to 7 (03-u17 to 03-u19, skipped). Sources, final criteria, the stage plan and the area are other parts of the workspace (12-u12, 12-u13, 12-u14, 14-u01 clients) and are not written here. 12-u12 links to these routes without a dependency edge on this unit, and this unit must not depend on 12-u12.

## Steps
1. Read 03-u16 (local draft store) and the schema renderer of 10-u05. Routes (file names fixed so 12-u12 can link to them): `app/me/problems/[id]/facts.tsx` (the sections of the `problem` schema except `sources`, `final_acceptance_criteria`, `stage_plan` and `affected_area`, which render as read-only links to their owning screens), and `app/me/problems/[id]/preview.tsx` (the WF-SUBMIT-4 wrapper). Do not write `app/me/problems/[id].tsx` or any other route of 12-u12 or 09-u48.
2. Sections are the schema groups from `x-ui.group`; the draft pins `{schema_id, schema_version, schema_hash, body}`; autosave and restore after reload or session expiry keep the pinned version; if the stored version is no longer served, show the WF-FORM-5 message and keep the draft read-only until 10-u37 lands (no silent migration).
3. The `context_profile` section (D-76) renders per-dimension rows with the mapped or AI-proposed value and a Confirm control (nothing confirmed by default, AI-ASSIST-1); unknown is allowed; it calls the context profile endpoints of 13-u03 only when they exist in the generated client and shows a calm "not available yet" row otherwise (no dependency edge; do not block the form).
4. The preview shows exactly what volunteers will see (fields with personal data masked as the review view shows it, `{prep.sendReview.masked}` copy of 12-u12) and exactly what will become public after publication; sending itself (T01) and the readiness gate belong to 12-u12.
5. Server errors `schema_*` map to messages (`form.version.newer` or the reload prompt); `needs_revision` hints are passed to `SchemaForm` `hints` when the check endpoint returns them (display is 10-u36).
6. Remove every problem field name from `src/features/submit/**` except route glue (a grep test over the 14 core field names).
7. Tests: the facts form renders from a fixture schema; a new optional field added to the fixture appears with no code change; draft restore pinned to its version; offline autosave; payload carries schema stamps; the linked parts render as read-only links; no route file of 12-u12 is touched (path assertion in the commit message); a11y and RTL checks on the first section; strings through `useT()` or schema messages.

## Acceptance
- Meets docs/design/ux/ui-unit-template.md (sections 1 to 6, and 3b where the unit renders a schema form; mark items not applicable with a reason in the commit message).
- The facts and preview routes exist at the fixed paths and work without any 12-u12 code.
- No hard-coded problem field remains in src/features/submit.
- `npm run verify` is green.

## Out of scope
- The workspace shell, sources, criteria, stage plan, send for review (12-u12 to 12-u14).
- Fill-assist and hints display (10-u36).
