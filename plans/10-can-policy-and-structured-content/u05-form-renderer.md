---
id: "10-u05"
plan: "10"
title: "Schema-driven form renderer on civic wrappers (WF-FORM-1 to 4)"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 1.5
priority: 5
depends_on: ["10-u04","02-u25","02-u14"]
writes: ["src/forms/schema/**","src/components/civic/**","src/i18n/en.json","__tests__/forms/**","src/api/schema.d.ts","src/api/client.ts"]
reads: ["src/**","app/**"]
spec: ["docs/design/ux/wireframes/forms.md#WF-FORM-1","docs/design/ux/wireframes/forms.md#WF-FORM-4","docs/design/ai/structured-content.md","docs/design/components/app.md","docs/design/ux/ui-unit-template.md","docs/design/flows/structured-submission.md"]
verify: ["npm run gen:api","npm run verify"]
founder_gate: false
defaults: "If a civic wrapper for a widget does not exist, add the smallest wrapper on the matching gluestack primitive in src/components/civic; never import from src/components/ui in feature code. Copy for labels and help comes from the schema messages, not en.json."
status: done
attempts: 0
commits: ["d52036a"]
actual_hours: 0.1
---
## Objective
One renderer that builds any content form from a content schema version: sections, per-field guidance and synthetic examples, answer controls by field type, the basis question, an explicit "I do not know yet" answer, assumption prompts and the "Assisted" marker. Unknown field types fail safe. Nothing in the app names a problem field; later units replace each hard-coded form with this renderer.

## Steps
1. Run `npm run gen:api` after 10-u04 landed to get the `getContentSchema` types. Add `useContentSchema(type, {version?})` in `src/forms/schema/` (TanStack Query, key includes type and version; response holds `schema`, `schema_version`, `schema_hash`, `policy_version`, `messages`).
2. `SchemaForm` component props: `schema`, `messages`, `value`, `onChange`, `hints` (map of `field_ref` to `{text, rule_id, policy_version}`, empty until plan 10 hints land), `assisted` (set of field refs), `onSubmit`, `readOnly`. State shape is a plain typed object keyed by schema property; the form never knows field names.
3. Layout from `x-ui`: group into sections by `x-ui.group`, order by `x-ui.order`, progress as text "Section n of N" plus "x of y needed fields answered" (WF-FORM-1), version line "Form version {schema_version}". Every label visible, each field shows `x-guidance.why` and the synthetic example (labelled "Example, synthetic") under the label.
4. Widget registry (`widgets.ts`): `text`, `textarea`, `choice`, `multichoice`, `list` (add and remove items of an object sub-schema), `evidence_url` (url plus description plus supports), `assumption` (statement, kind fact|cause|legal|scope, how could we check it; WF-FORM-4), `date`, `place`, `source_ref_list` (URI, category select, what it establishes, authenticity note; WF-SUBMIT-2), `criteria_list` (statement, how observed, optional deadline; WF-PREP-2), `context_profile` (a section of per-dimension rows, each showing the mapped or proposed value with a Confirm control and an unknown choice; nothing is confirmed by default, AI-ASSIST-1), `area_picker` and `stage_plan` (placeholders that render a typed slot where the custom editors of plan 12 and 14 mount: WF-PREP-3 and the area editor; the renderer never knows their internals), `basis` (saw it myself | a source reports it | I worked it out | I am assuming it; choosing the last adds an entry to the assumptions list). Each widget is built from civic wrappers, exposes error association and a 44 point target.
5. "I do not know this yet" (WF-FORM-1): offered only where `x-checks.allow_unknown` is true, counts as answered, and then requires the paired "what would help find out" field.
6. Unknown widget or field type: render a read-only placeholder with the label and the messages `form.field.unsupported` and `form.field.unsupportedBlocks`, set `blocksSubmit` for required fields, never throw, never blank. Add a test using a schema with `"x-ui": {"widget": "hologram"}`.
7. `Assisted` marker (`form.assist.marker`, shown when a field ref is in `assisted`): text plus icon, stays in preview, no behaviour to set it here (10-u36 wires assist).
8. Client-side validation derived from the schema only for length bounds, required, enum and URL shape (`min_chars`, `max_chars`, `required`); the server stays authoritative. Focus moves to the first invalid field on submit attempt (reuse 02-u14 form kit).
9. Tests: render the fixture `problem` schema from 10-u04 (copy a trimmed JSON into `__tests__/forms/fixtures/` with a note on its origin), a schema with every widget kind, a schema bumped from 1.0.0 to 1.1.0 (new field appears with no code change), unknown widget, RTL snapshot (`dir=rtl`) and axe-style a11y assertions on labels and error association. New UI strings only for renderer chrome (progress, saved, unsupported) in `src/i18n/en.json` with ids from the copy deck.

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6; mark items not applicable with a reason in the commit message). First screen re-checked: WF-FORM-1.
- Adding a field to the schema JSON in a test shows it in the form with zero code change.
- An unknown widget renders a placeholder, disables submit when required, and does not crash.
- No source file under `src/forms/schema/` contains a problem or contribution field name (test greps).
- Labels, guidance and examples render from schema messages in light, dark and RTL.
- `npm run verify` is green on web.

## Out of scope
- Replacing the existing hard-coded screens (10-u33 to 10-u35).
- Fill-assist calls and server hint display (10-u36).
- Draft migration screen (10-u37).
