# UI unit acceptance template

Copy this checklist into every plan unit or PR that adds or changes a screen or component in `can_app`. A unit is not done until every line is ticked or marked "not applicable" with a reason. Reviewers use the same list.

Unit: ______  Wireframe IDs: ______  Branch: ______

## 1. Required states
- [ ] Loading: skeleton or text "Loading", no layout jump, announced to screen readers.
- [ ] Empty: says why it is empty and offers the next action (`list.empty.*` pattern).
- [ ] Error: `common.error.*`, retry works, user input is kept, no raw error codes shown.
- [ ] Offline: cached content stays readable; writes queue or are blocked with `common.offline.banner`; local draft intact.
- [ ] Session expired: 401 `session_expired` opens WF-SESSION-1, returns to the same place, keeps unsaved input.
- [ ] Not permitted: 403 shows `common.notPermitted.*` naming who can do it, never a blank screen or a login loop.
- [ ] Tombstone, not 404: withdrawn or removed items show WF-DETAIL-2 with date and reason; 404 only for ids that never existed.
- [ ] Inline validation: errors next to the field, text plus icon (not colour alone), focus moves to the first error on submit, server `fieldErrors` mapped to fields, input not cleared.
- [ ] Rate limited and too-many-attempts states where the API can return them.

## 2. Content and copy
- [ ] Every string is an ICU message id in the copy deck; no concatenation; plurals and dates use ICU.
- [ ] Wording is calm, plain, non-shaming; neutral for stuck, paused, withdrawn.
- [ ] Zero em dashes and en dashes (`npm run lint:copy`).
- [ ] Any example is labelled fictional; anything unbuilt is labelled "planned".
- [ ] Email is never rendered; handles only.
- [ ] Lifecycle labels, explanations and next actions come from the brief's table data, not hardcoded.
- [ ] Decisions show outcome, rule ids, policy version and a plain explanation; a re-review shows `remod.title` and an appeal path; a hold shows `hold.title` and never implies publication.
- [ ] Seed problems show `list.card.seed` and name no person.

## 3. Accessibility
- [ ] Text scales to 200 percent (OS text size and browser zoom) with no clipped or overlapping text and no horizontal scroll at 360 px width.
- [ ] Touch targets 44 by 44 pt minimum, with spacing between neighbours.
- [ ] Contrast: text 4.5:1, large text and control borders and focus rings 3:1, in light and dark; colours only from `ux/tokens.json`.
- [ ] Status is never colour only: label text always present.
- [ ] Focus order matches reading order; visible focus ring (2 px, offset 2); no keyboard traps; Escape closes overlays and returns focus to the trigger; skip link on web.
- [ ] Every interactive element has an accessible name and role through the civic wrapper types (`eslint-plugin-react-native-a11y` clean).
- [ ] Headings form a logical outline; one h1 per screen; lists use list semantics.
- [ ] Errors and status changes are announced (live region); loading is announced once.
- [ ] Reduced motion respected: no motion, or only a fade under 200 ms.
- [ ] Forms: labels always visible (not placeholder only), `autocomplete` and input modes set (`one-time-code`, `email`).
- [ ] axe-core scan on Expo web shows no serious or critical issues.

## 3b. Schema-driven forms (any unit that renders a content form)
- [ ] The form is rendered from the content schema version, with no hard-coded fields; a fixture schema with a different field set renders without code changes.
- [ ] Renders any schema version: a draft stays on the version it started on, moving versions keeps answers and lists what is new.
- [ ] Unknown field types fail safe: a read-only placeholder with the label and `form.field.unsupported`, never a blank gap or crash; submit is disabled if a required field cannot be shown.
- [ ] Per-field guidance (why we ask) and a synthetic example are visible, labels always visible.
- [ ] Basis choice and "I do not know yet" are available where the schema asks; assumptions use the assumption list.
- [ ] AI fill-assist never fills a field alone: per-field confirm, no accept-all, the "Assisted" marker stays and shows in preview and on the public page; the form works when assist is unavailable.
- [ ] Hints from DP-ASSUMPTIONS and DP-COMPLETENESS appear beside their fields as text plus icon, not red, with rule id and policy version; focus moves to the first hinted field.
- [ ] Progress is text, save draft works offline (device first), server re-validates against the stamped schema version.
- [ ] No unstructured free text box: every long answer sits in a schema field.

## 4. Layout and RTL
- [ ] Logical properties only: `start`/`end`, `marginStart`, `paddingEnd`, `textAlign: start`. No `left`, `right`, `marginLeft`, `marginRight` (lint grep `npm run lint:logical`).
- [ ] Icons that imply direction are mirrored in RTL; the layout was viewed with `dir=rtl` once (pseudo-locale is enough in slice 1).
- [ ] Works at 360 px and 1280 px; content max width from tokens.
- [ ] Long words and 40 percent longer translations do not break the layout.

## 5. Behaviour and data
- [ ] Uses the generated API client only; no hand-written fetch to `/v1`.
- [ ] No infinite scroll, no counts as status, no streaks, no urgency language.
- [ ] Optimistic updates only where rollback is safe; the server result is final.
- [ ] Nothing sensitive stored in client storage except the local draft and the native session token (SecureStore).

## 6. Tests and evidence
- [ ] Jest tests with the mocked client cover each state in section 1 that applies.
- [ ] Playwright covers the happy path and keyboard-only operation if the screen is on a journey.
- [ ] Screenshot at 360 px and 1280 px, light and dark, attached to the PR.
- [ ] `npm run verify` is green; the web bundle builds; `expo export -p ios` and `-p android` still bundle.
- [ ] Open questions or deferred items written to `docs/open-questions/`, not left in code comments.
