---
id: "16-u01"
plan: "16"
title: "Spec 26: the capability profile, written vision first"
repo: "."
area: "can-spec"
model: sonnet
est_hours: 1.5
priority: 1
depends_on: []
writes: ["docs/spec/26-capability-profile.md", "docs/spec/00-index.md", "docs/spec/10-data-model.md", "docs/spec/17-ux.md"]
spec: ["DECISIONS.md", "docs/spec/constitution/ch02-privacy-participation.md", "docs/spec/constitution/ch07-expertise-reputation.md", "docs/adr/0016-private-location-attestation.md", "docs/spec/17-ux.md", "docs/spec/10-data-model.md", "docs/spec/05-lifecycle-participation.md"]
verify: ["node plans/tools/corpus.mjs lint", "python3 docs/design/check.py"]
founder_gate: false
defaults: "D-80 is binding; if a step is blocked, take the most private and plainest option and report it for the morning review."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Write `docs/spec/26-capability-profile.md`, the spec for the private capability profile and on-device matching decided in D-80. Lead with the vision, not the feature: a person is a problem solver who is shown only the few public problems they can move. One person, maybe five problems, solved properly.

## Steps
1. Read D-80 in DECISIONS.md, ch02, ch07 (Art 33, 59, 72), 17-ux, RANK-1 and NOTIFY-CONSENT-1 in rules.md, and ADR 0016 first.
2. Section 1, Why: problem solvers, not consumers. Depth over reach. No engagement algorithm; nothing inferred from behaviour (link 17-ux 'Deliberate, not addictive').
3. Section 2, Structured registration, mirroring problem preparation: what you know (plain-language groups: care and health, hospitality and food, public service and administration, trades and repair, law and rights, teaching and childcare, transport, technology, research, community organising, plus languages); what you can give (time per month, kinds of help: evidence, local knowledge, a skill, translation, review); places you are connected to (coarse, private, reusing the ADR 0016 device check); what affects you; causes you care about; languages you read and speak. Every step skippable, every answer changeable, nothing required to belong.
4. Section 3, No PII: no name, contact, exact location, employer, identifiers. Re-identification guard: a rare skill plus a small place can identify someone, so the profile never leaves the device, even partly.
5. Section 4, On the device: stored encrypted at rest; matching is a deterministic filter on the device against the public problem list (or a coarse region shard) fetched without signing in; the server receives nothing derived from the profile. Each match shows why it matched. A plain chronological view always exists (05-lifecycle-participation).
6. Section 5, What problems publish: a `help_needed` set on each public problem (skill groups, languages, coarse place, topic), proposed by the poster and checked in volunteer review (open question from 16-u03).
7. Section 6, Notices: opt-in only (NOTIFY-CONSENT-1); the server push knows nothing about interests ('new public problems were published'); the device matches and raises its own notice.
8. Section 7, Control: view, edit, export to a file, import, delete; wipe clears the key first then the store. Optional backup only to the person's own cloud drive, encrypted with a device-generated recovery code.
9. Section 8, Limits stated plainly: taking part in a problem is public by nature; the device-only rule covers browsing and matching, not participation. Adapted from the mera protocol rules 1, 4 and 6 (cite D-80).
10. Add the file to `00-index.md`; in `10-data-model.md` note that profile is device-side only and problems gain `help_needed`; in `17-ux.md` rename the Discover idea to 'Problems you can move' with a pointer to spec 26.

## Acceptance
- Spec 26 exists with sections 1 to 8, plain language, no dashes.
- 00-index, 10-data-model and 17-ux point to it.
- corpus lint and design check pass.

## Out of scope
- Constitution text (16-u02), open questions (16-u03), wireframes (16-u04), any code.
