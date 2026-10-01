---
id: "10-u33"
plan: "10"
title: "Problem submit flow rebuilt on the schema renderer (replaces hard-coded steps)"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 1.5
priority: 33
depends_on: ["10-u05","10-u29","03-u16","03-u08"]
writes: ["src/features/submit/**","app/submit/**","src/forms/schema/**","src/i18n/en.json","__tests__/submit/**","src/api/schema.d.ts"]
reads: ["src/**","app/**"]
spec: ["docs/design/ux/wireframes/forms.md#WF-FORM-1","docs/design/ux/wireframes/submit.md#WF-SUBMIT-1","docs/design/flows/structured-submission.md","docs/spec/constitution/rules.md#SCHEMA-1","docs/spec/constitution/rules.md#STRUCT-ONLY-1"]
verify: ["npm run gen:api","npm run verify"]
founder_gate: false
defaults: "Keep the route paths, the local draft store (03-u16) and the pending and decision screens untouched. If a 03-u17 to 03-u19 behaviour (privacy review step, preview, submit) has no schema counterpart, keep it as a step around the renderer, not inside it."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Delete the hard-coded fields of submit steps 1 to 7 (03-u17 to 03-u19) and drive the whole problem draft from the `problem` schema through `SchemaForm`: sections are the schema's groups, the draft pins its schema version, autosave keeps working offline, and preview and submit use the same schema.

## Steps
1. Read 03-u16 to 03-u19 results in `src/features/submit/**`. Replace each hard-coded step with a section of `SchemaForm` fed by `useContentSchema("problem")`; keep the step chrome (WF-SUBMIT-1 to 4 shell, privacy review, preview, submit confirmation) as wrappers.
2. The local draft (03-u16) stores `{schema_id, schema_version, schema_hash, body}`; autosave and restore after reload or session expiry keep the pinned version; if the stored version is no longer served, show the WF-FORM-5 message and keep the draft read-only until 10-u37 lands (no silent migration).
3. Submit calls the draft and transition endpoints from 03-u06 to 03-u08 with the stamped fields; server errors `schema_*` map to messages (`form.version.newer` or reload prompt). `needs_revision` hints are passed to `SchemaForm` `hints` when the check endpoint returns them (the hint display itself is 10-u36).
4. Remove all problem field names from `src/features/submit/**` except the route glue (test greps for the 14 field names).
5. Tests: whole form renders from a fixture schema; a new optional field added to the fixture appears with no code change; draft restore pinned to its version; offline autosave; submit payload carries schema stamps; a11y and RTL checks on the first section; strings through `useT()` or schema messages.
6. Lifecycle v2 (W13): the form now ends at "Send for volunteer review" (T01 to `in_review`), not at a direct submission, and the sections include sources (`source_ref_list`, WF-SUBMIT-2), final acceptance criteria (`criteria_list`, WF-PREP-2) and the `context_profile` confirmation section. The preparation workspace shell (WF-PREP-1), the area editor and the stage plan editor (WF-PREP-3) belong to plan 12 and 14; this unit mounts the typed slots of `stage_plan` and `area_picker` where those editors are provided, and renders a calm "not available yet" row when they are absent. Gate T01 on CRITERIA-1 client-side (the server enforces).

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6; mark items not applicable with a reason in the commit message). First screen re-checked: WF-SUBMIT-1.
- The problem form is built only from the schema (grep test finds no field names).
- Draft survives reload and session expiry pinned to its version.
- Submit payload includes schema id, version and hash.
- `npm run verify` is green on web.

## Out of scope
- Hints and assist (10-u36).
- Migration screen (10-u37).
- Other content types (10-u34, 10-u35).
