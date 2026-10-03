---
id: "04-u08"
plan: "04"
title: "Contribution form shell (WF-CONTRIB-2) and the shared contribution list grouped by type"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 1.5
priority: 77
depends_on: ["04-u02", "02-u20", "02-u14", "02-u24", "02-u25", "10-u05", "10-u29"]
writes: ["app/problems/**","src/contributions/**","src/problems/**","src/i18n/en.json","__tests__/contrib-*.test.tsx","src/api/schema.d.ts"]
reads: ["src/**","app/**"]
spec: ["docs/design/ux/wireframes/participate.md#WF-CONTRIB-2", "docs/design/ux/wireframes/stages.md#WF-STAGE-1", "docs/design/ux/wireframes/stages.md#WF-STAGE-3", "docs/design/ux/wireframes/forms.md#WF-FORM-1", "docs/design/ux/wireframes/forms.md#WF-FORM-3", "docs/spec/01-slice-1-brief.md#6-contributions", "docs/spec/01b-stages.md", "docs/design/ux/copy-deck.md", "docs/design/ux/ui-unit-template.md"]
needs: []
verify: ["npm run verify","npx jest --ci __tests__/contributions-screens.test.tsx"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
WF-CONTRIB-1 (the old Contributions tab) is retired by D-72: per-type contributions live in stages (options in WF-STAGE-1, ahead of time in WF-STAGE-3). What stays is WF-CONTRIB-2, the add-contribution screen, a shell that hosts the schema renderer (10-u05) and contains no field list, plus a shared `ContributionList` component (grouped by type, never ranked, no counts) that the stage workspace (12-u18, 12-u20) and the problem-level "Questions and notes for the whole problem" section of the Overview reuse. Delays and the awaiting-review state are shown calmly.

## Steps
1. Run `npm run gen:api` (reads ../can_server/openapi/openapi.json) and commit `src/api/schema.d.ts` with this unit. The dependent server unit is already done, so the contract exists.
2. `src/contributions/ContributionList.tsx`: group by type with section headings (h2) using plain names from copy; order inside a group as given by the API; show the author handle, date and evidence links (open in a new tab with rel noopener and a visible external-link text), an "Awaiting review" label for the viewer's own items still in the moderation run, a "For a later stage" label (`forLaterStage`) and "Added ahead of time" once the stage runs, tombstone placeholders (WF-DETAIL-2 pattern), a short notice on items re-reviewed under a new policy version (09-u50), and no counts, likes or sorting controls. Slots for the Guest badge (WF-GUEST-1, 12-u22) and the Impacted only filter (WF-FILTER-1, 12-u23) are props, empty until those units land. Mount the list in the Overview of the detail screen for problem-level contributions (`problemLevel=true`).
3. app/problems/[id]/add.tsx (RequireAuth, member): accepts an optional `stageId` query; the type select is limited to the types in `allowedContributionTypes` of the stage response (or the problem response for problem level), never a client-side matrix; on selection load the schema with useContentSchema("contribution.<type>") (a `proposed_solution` aimed at a stage uses the `stage_option` schema) and render it with SchemaForm (10-u05), stamping schema id, version and hash on submit (10-u29). No field, counter or per-type widget is written here (D-58, SCHEMA-1); hints from a needs_revision run are passed through the renderer's hints prop (10-u36 wires the rest). 10-u34 completes the per-type forms. The optional attestation object is attached by the location client (14-u04 and 12-u24) and not built here.
4. Cooldown: when the API returns cooldown_active show "You can add another contribution in about {minutes} minutes" using retryAfterSeconds, keep the text, and disable submit until then without a ticking live region. Hard privacy flags map to the field with the highlighted span. A disallowed pair (`not_allowed_in_state`) shows a calm message naming the stage state.
4a. Reply allowance (D-85, copy ids `reply.*` in copy-deck-lifecycle.md, WF-CONTRIB-2): before the person writes, load `GET /v1/me/problems/{id}/reply-allowance` and show `reply.left` and the nudge `reply.count` above the type choice, plus `reply.next` with `resetsAt` as local time when 1 or 0 are left. At 0 left disable Post with the reason in text (`reply.limit.title`, `reply.limit.body`, `reply.limit.draft`), keep the form editable and the draft saveable. Handle 429 `reply_limit_reached` the same way from `resetsAt`. Drafts and edits do not change the count; refresh it after each post. Accessibility: plain paragraph labelled `reply.a11y.left`, blocked description `reply.a11y.blocked`, one polite announcement on change, no ticking live region. Show the later time when a cooldown also applies. Add the strings to `src/i18n/en.json`.
5. Not permitted for guests shows sign-in prompt with returnTo; tombstone, empty ("No contributions yet. Add the first.") and error states.
6. Tests: allowance shown before writing, Post disabled at 0 with reset time text, 429 `reply_limit_reached` handled, grouping by type, pending label for own item, "For a later stage" label, no count elements exist (query assertion), cooldown message, the add screen renders the fixture schema through SchemaForm and contains no field names (grep test over src/contributions), flag mapping, guest prompt, type choices equal the stage response array.

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6; mark items not applicable with a reason in the commit message).
- No popularity data is rendered anywhere (test asserts absence of counts).
- The remaining replies show before writing, and Post is blocked at 0 with the reset time in words.
- Type choices come only from the API `allowedContributionTypes`.
- `npm run verify` is green (tsc, lint, prettier, logical-properties check, jest, web export).

## Out of scope
- Options, choice, steps and evidence UI (12-u18) and contributing ahead (12-u20).
- Review of contributions (the moderation run, 09-u40; auditor screens 09-u53).
- The Guest badge and the filter (12-u22, 12-u23).
