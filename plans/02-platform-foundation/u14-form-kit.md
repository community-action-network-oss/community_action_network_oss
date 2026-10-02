---
id: "02-u14"
plan: "02"
title: "Form kit: fields, inline validation, focus-first-error"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 1.2
priority: 22
depends_on: ["02-u24", "02-u25"]
writes: ["src/components/civic/**","src/forms/**","src/i18n/en.json","__tests__/form-*.test.tsx"]
reads: ["src/**","app/**"]
spec: ["docs/spec/01-slice-1-brief.md","docs/design/ux/copy-deck.md","docs/design/ux/ui-unit-template.md#1-required-states","docs/design/ux/wireframes/auth.md#WF-SIGNUP-1","docs/design/ux/ui-unit-template.md"]
needs: []
verify: ["npm run verify","npx jest --ci __tests__/form-kit.test.tsx"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: done
attempts: 0
commits: ["7051721"]
actual_hours: 0.1
---
## Objective
Build the shared form components all later screens use, so every form meets the validation, label and focus rules once: labelled fields with inline errors (text plus icon), a character counter, live-region announcements, and mapping of server fieldErrors onto react-hook-form.

## Steps
0. This is the primitive layer. Content forms are rendered from the policy pack by the schema-driven renderer 10-u05, which composes these components; never hard-code a content field list here (D-58).
1. Civic components in src/components/civic: FormField (visible label, hint, error row with icon glyph and text, accessibilityLabel derived from label, required marker as text), TextField (single and multiline, maxLength counter "0 / 300 characters" through an ICU message, inputMode and autoComplete props, textContentType), CheckboxField, FormError summary (role alert), SubmitButton (disabled and busy states, never relies on colour alone). Export from index.ts. Colours and spacing only from src/theme tokens; logical properties only.
2. src/forms/useServerForm.ts: wraps react-hook-form with a zod resolver; applyApiError(error) maps ApiError.fieldErrors to field errors and sets a form-level error for other kinds; on submit failure focuses the first invalid field (web: element.focus; native: ref.focus); never clears input.
3. Add ICU message ids to src/i18n/en.json (typed MessageId) for common.validation.required, common.validation.tooLong ({max, count}), common.error.generic, common.error.retry, common.offline.banner, common.loading, copying wording from docs/design/ux/copy-deck.md when present, otherwise plain calm wording. No dashes.
4. Tests with @testing-library/react-native (await render and fireEvent): error text shown beside the field with an icon, focus moves to the first error, server fieldErrors mapped, input retained after an error, label always rendered (not placeholder only), 200 percent font scale does not truncate the label (snapshot-free: assert no numberOfLines on label text).

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6; mark items not applicable with a reason in the commit message).
- Every field has an accessible name through the civic types (lint a11y clean).
- Status is never colour only: tests assert error text and icon exist.
- Server fieldErrors are shown next to the right field.
- `npm run verify` is green (tsc, lint, prettier, logical-properties check, jest, web export).

## Out of scope
- Any specific screen.
- Date or select pickers (use native web controls later).
