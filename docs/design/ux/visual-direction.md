# Visual direction

## Intent
CAN should feel like a **public workspace for working on shared problems**: calm, civic, trustworthy, plain. It is not a social network, a petition feed, a protest platform, a court or a government complaint form. The interface should lower the temperature of a hard topic and make the next step obvious. It is for people on old phones and slow connections as much as for people on large monitors.

## What this rules out
No infinite scroll, no reaction counts or rankings as status, no streaks or badges that reward activity, no urgency colours for ordinary states, no stock photos of crowds, no clenched-fist or megaphone imagery, no dark patterns. Colour never carries meaning alone.

## Colour
Tokens live in `tokens.json` (light and dark, all text pairs at 4.5:1 or better, verified by `tokens.build.mjs`).

- Base: warm off white (`#FAFAF7`) with ink text (`#1D2428`). Warm neutrals feel like paper, which suits records and decisions, and avoid the clinical blue-white of enterprise tools.
- Primary: a deep teal (`#1F5F6B`). Teal reads as steady and municipal without the partisan weight of red or blue.
- Status palette is deliberately neutral and distinct by hue family, not by alarm: Awaiting volunteer review (slate blue), Open and In progress (teal-green), Paused (sand), Stuck (muted violet), Withdrawn and Closed (grey), Solved (soft green), Redirected (indigo), Interim (parchment). **No red for stuck, paused, withdrawn, closed or any disagreement.** Stuck and paused are ordinary parts of real civic work and must not read as failure or blame.
- `urgent` (rust red) exists only for genuine safety or deadline conditions and validation errors that block saving. It always appears with an icon and text.
- Dark mode is a first-class theme, not an inversion: lighter tints for text, desaturated deep backgrounds, same hue families.

## Typography
System font stack only (`system-ui`, Segoe, Roboto, Noto Sans). Reasons: zero font downloads on low bandwidth, best script coverage for future languages, familiar rendering, respects user font settings. Scale (px): caption 13, body 16, label 14 semibold, h3 18, h2 22, h1 28; body line height 1.5. Sentence case everywhere, no all caps blocks. Line length capped near 70 characters via `contentMaxWidth` 720. Numbers use tabular figures in tables.

## Layout and shape
Generous spacing from a 4 px base, 8 px radius for cards and fields, 4 px for badges. One column on mobile, content plus a sticky status panel on desktop. Borders over shadows: a quiet 1 px line, with a stronger control border (3:1) on inputs. Badges are pill shaped with a text label, never a dot only.

## Motion
Little and short: 120 to 200 ms fades or height changes. All motion off under reduced motion. No celebratory animation on solving a problem; a plain confirmation is enough.

## Content tone
Short sentences, concrete verbs, say what happens next. Explain waiting honestly. Never imply the person did something wrong when a rule asks for a change. See `copy-deck.md`.

## Shared use
`tokens.json` is the single source. `can_app` turns it into the gluestack/UniWind theme; `can_gallery` turns it into CSS variables (`--can-color-bg` and so on) with a `prefers-color-scheme` block. Neither repo may introduce a colour outside the tokens. The gallery is a visitor's first impression, so it uses the same calm palette with larger type and more white space, not a separate brand.
