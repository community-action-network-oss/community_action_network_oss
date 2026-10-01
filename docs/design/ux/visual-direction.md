# Visual direction

## Intent
CAN should feel like a **public workspace for working on shared problems**: calm, civic, trustworthy, plain. It is not a social network, a petition feed, a protest platform, a court or a government complaint form. The interface should lower the temperature of a hard topic and make the next step obvious. It is for people on old phones and slow connections as much as for people on large monitors.

## What this rules out
No infinite scroll, no reaction counts or rankings as status, no streaks or badges that reward activity, no urgency colours for ordinary states, no stock photos of crowds, no clenched-fist or megaphone imagery, no dark patterns. Colour never carries meaning alone.

## Colour
Tokens live in `tokens.json` (light and dark, all text pairs at 4.5:1 or better, verified by `tokens.build.mjs`).

- Base: warm off white (`#FAFAF7`) with ink text (`#1D2428`). Warm neutrals feel like paper, which suits records and decisions, and avoid the clinical blue-white of enterprise tools.
- Primary: a deep teal (`#1F5F6B`). Teal reads as steady and municipal without the partisan weight of red or blue.
- Status palette is deliberately neutral and distinct by hue family, not by alarm. Chips (exact text from the brief): Awaiting review (slate blue), Changes requested (sand), Open: gathering facts, Open: developing solutions, Open: choosing a solution and In progress (teal-green), Checking the result (teal-green), Paused (sand), Stuck (muted violet), Withdrawn and Closed (grey), Solved (soft green), Redirected (indigo), Not accepted (grey with an icon). Policy badges (parchment): "Decided under policy vX" and "Policy vX, transitional stewardship". Other markers: "Seed problem, synthetic evidence" (parchment outline), "Assisted" (a small outline tag on a field), "Re-reviewed under policy vX" (indigo notice, not an alert). A held item keeps the Awaiting review chip with the text "Taking longer than usual". **No red for any lifecycle state, hold, re-review notice, failed test of a proposal, or disagreement.** Stuck and paused are ordinary parts of real civic work and must not read as failure or blame.
- `urgent` (rust red) exists only for genuine safety or deadline conditions and validation errors that block saving. It always appears with an icon and text. Hints beside form fields (needs_revision) are not errors: they use the neutral note style with an icon and text, not `urgent`.
- Dark mode is a first-class theme, not an inversion: lighter tints for text, desaturated deep backgrounds, same hue families.

Token note: the policy badges use the existing token `status.interim` (parchment). Renaming it to `status.transitional` is a follow-up that must touch the token build and both consumers together.

## Typography
System font stack only (`system-ui`, Segoe, Roboto, Noto Sans). Reasons: zero font downloads on low bandwidth, best script coverage for future languages, familiar rendering, respects user font settings. Scale (px): caption 13, body 16, label 14 semibold, h3 18, h2 22, h1 28; body line height 1.5. Sentence case everywhere, no all caps blocks. Line length capped near 70 characters via `contentMaxWidth` 720. Numbers use tabular figures in tables.

## Layout and shape
Generous spacing from a 4 px base, 8 px radius for cards and fields, 4 px for badges. One column on mobile, content plus a sticky status panel on desktop. Borders over shadows: a quiet 1 px line, with a stronger control border (3:1) on inputs. Badges are pill shaped with a text label, never a dot only.

## Motion
Little and short: 120 to 200 ms fades or height changes. All motion off under reduced motion. No celebratory animation on solving a problem; a plain confirmation is enough.

## Content tone
Short sentences, concrete verbs, say what happens next. Explain waiting honestly. Never imply the person did something wrong when a rule asks for a change. See `copy-deck.md`.

## Shared use
`tokens.json` is the single source. gluestack-ui is the design system for every surface (ADR 0007). `can_app` and `can_gallery` each generate their gluestack theme from it, with light and dark (`prefers-color-scheme`); until the adoption units land (02-u24, 02-u25, 06-u15, 06-u16) the app uses RN-core civic wrappers and the gallery uses CSS variables (`--can-color-bg` and so on). Neither repo may introduce a colour outside the tokens. The gallery is a visitor's first impression, so it uses the same calm palette with larger type and more white space, not a separate brand.
