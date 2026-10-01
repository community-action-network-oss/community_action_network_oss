# CAN design pack

The system design, UX pack and decision records that let contributors and overnight agents build slice 1 without inventing architecture or UI. Tonight `can_server` and `can_app` are scaffolds (D-25); this pack specifies the slice they grow into.

## Index

| Path | What it is |
|---|---|
| [system-design.md](system-design.md) | Overview: containers, module boundaries, ERD with sensitivity and retention, `/v1` API, auth flow, event log, contract flow, decentralization seams, test strategy, web-first verification |
| [flows/](flows/README.md) | Execution flows, one file per flow (auth, intake, updates, re-check, appeal, policy amendment, lifecycle, jobs, contract, night run) with status built or planned |
| [components/](components/README.md) | Component view per repo (server modules incl. AI moderation runtime, app, gallery, planned `can_policy`, cross-cutting) with plan units |
| [ai/](ai/README.md) | AI moderation design: policy pack, decision points, runtime, triggers, amendment loop, appeals, safety, evaluation (written in parallel) |
| [ux/journeys.md](ux/journeys.md) | Submitter, contributor, moderator journeys with screen IDs |
| [ux/screens.md](ux/screens.md) | Screen inventory and the lifecycle state to screen map |
| [ux/wireframes/](ux/wireframes/) | ASCII low-fi wireframes, every frame has an ID (`WF-AREA-n`) |
| [ux/copy-deck.md](ux/copy-deck.md) | Every user-facing string with its ICU message id |
| [ux/ui-unit-template.md](ux/ui-unit-template.md) | Acceptance checklist for any UI unit |
| [ux/tokens.json](ux/tokens.json) | Semantic design tokens, light and dark, contrast verified |
| [ux/visual-direction.md](ux/visual-direction.md) | Calm, civic direction and why |
| [../adr/](../adr/README.md) | Architecture decision records 0001 to 0007 |

## Ground rules
- Lifecycle states, transitions, actors, public labels, plain explanations and next actions live **only** in [`docs/spec/01-slice-1-brief.md#4-lifecycle`](../spec/01-slice-1-brief.md#4-lifecycle). Link to it, never copy it.
- Binding decisions are in `DECISIONS.md`. This pack records choices beyond it in ADRs.
- No em or en dashes in user-facing copy. Fictional data only. Anything not built is labelled "planned".

## How to use the pack
1. Pick a plan unit from `plans/`. Read the unit, the brief, then the matching section of `system-design.md`.
2. For UI work find the wireframe IDs the unit names, the strings in `copy-deck.md`, and the colours in `tokens.json`. Copy `ux/ui-unit-template.md` into the PR and tick it.
3. For API work follow the table in section 6 of `system-design.md`; change the table in the same PR as the endpoint.
4. If the pack is wrong or silent, fix the pack in the same PR (or open a question in `docs/open-questions/`). Do not invent silently.

## Checks
`python3 docs/design/check.py` verifies that every message id used in wireframes exists in the copy deck, every referenced wireframe exists, no em or en dashes, the 25KB file cap, and token contrast. `node docs/design/ux/tokens.build.mjs` regenerates `tokens.json` and fails below WCAG AA. Run both before committing.

## How designers can contribute
Start with a bounded challenge, not a redesign. Good first contributions: a revised wireframe for one `WF-` frame, a plain-language rewrite of copy deck strings, an accessibility audit of a frame, RTL review, or a token palette review.

Every design contribution states: the user need; the constitutional or spec constraints it respects; accessibility considerations; privacy and safety implications; mobile and low-bandwidth behaviour; failure and empty states; and evidence from testing or comparable systems. Use the existing frame ID and keep the ASCII format so diffs are reviewable. Popularity does not decide consequential policy: behaviour comes from the spec, and designers explore how approved behaviour is expressed. Changes to status colours must keep the neutral palette (no red for stuck, paused or disagreement) and pass the contrast check.
