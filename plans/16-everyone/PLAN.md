---
id: "16"
title: "CAN for everyone: gallery anyone can read, gradual unfolding, private capability profile"
approved: true
status: "todo"
depends_on_plans: ["06", "10"]
spec: ["DECISIONS.md","docs/spec/18-phases-gates.md","docs/design/ux/visual-direction.md","docs/spec/constitution/ch02-privacy-participation.md","docs/spec/constitution/ch07-expertise-reputation.md","docs/adr/0016-private-location-attestation.md"]
---
# Plan 16: CAN for everyone

## Goal

Founder decision D-80. Anyone with any expertise (a nurse, a hotel worker, a civil servant) understands CAN on first visit and believes they belong. The gallery is rebuilt in its own Public Pictograms (Isotype) world on customised gluestack, with gradual unfolding on every page: nothing removed, detail on request. The spec gains the private capability profile: a structured registration with no personal data, kept and matched only on the person's device, so each person is shown the few public problems they can move. One person, maybe five problems, solved properly. Runs first: priorities 1 to 11.

## Acceptance

- Spec 26, constitution II.10 (verbatim from D-80), PROFILE-LOCAL-1, four open questions and the profile wireframes exist and pass the checks.
- Every gallery route is in the new world, plain first with detail in Unfold, and passes `npm run verify`; all previous information is still in the exported HTML.
- /where-you-fit/ explains the vision, labelled Planned, with no form.
- The finish review and DESIGN.md close the gallery work (16-u16).
- Server and app units keep every profile field off the network (PROFILE-LOCAL-1).

## Units
| Unit | Title | Lane | Hours | Pri | Depends on | Founder gate |
|---|---|---|---|---|---|---|
| [16-u01](u01-spec-26-the-capability-profile-written-vision-firs.md) | Spec 26: the capability profile, written vision first | . | 1.5 | 1 | - | - |
| [16-u02](u02-constitution-article-ii-10-ch07-notes-profile-loca.md) | Constitution article II.10, ch07 notes, PROFILE-LOCAL-1 and the manifesto paragraph | . | 1.0 | 2 | 16-u01 | - |
| [16-u03](u03-open-questions-for-the-capability-profile.md) | Open questions for the capability profile | . | 1.0 | 3 | 16-u01 | - |
| [16-u04](u04-wireframes-wf-profile-1-to-6-and-wf-match-1-journe.md) | Wireframes WF-PROFILE-1 to 6 and WF-MATCH-1, journey J-PROFILE and copy deck | . | 1.5 | 4 | 16-u01 | - |
| [16-u05](u05-visual-direction-md-the-gallery-identity-paragraph.md) | visual-direction.md: the gallery identity paragraph | . | 0.5 | 5 | - | - |
| [16-u10](u10-gallery-identity-and-shell-on-customised-gluestack.md) | Gallery identity and shell on customised gluestack, plus the Unfold primitive | can_gallery | 1.5 | 2 | 06-u15 | - |
| [16-u11](u11-home-page-in-three-layers-plain-first-detail-on-re.md) | Home page in three layers: plain first, detail on request | can_gallery | 1.0 | 3 | 16-u10 | - |
| [16-u12](u12-new-page-where-you-fit-come-as-you-are.md) | New page /where-you-fit/: come as you are | can_gallery | 0.8 | 4 | 16-u11 | - |
| [16-u13](u13-how-it-works-and-principles-summary-first-tables-b.md) | How it works and Principles: summary first, tables behind Unfold | can_gallery | 1.5 | 5 | 16-u12 | - |
| [16-u14](u14-contribute-every-profession-first-builder-detail-b.md) | Contribute: every profession first, builder detail behind Unfold | can_gallery | 1.0 | 6 | 16-u12 | - |
| [16-u15](u15-open-questions-roadmap-and-read-everything-plain-i.md) | Open questions, Roadmap and Read everything: plain intro, grouped Unfolds | can_gallery | 1.0 | 7 | 16-u12 | - |
| [16-u16](u16-impeccable-finish-review-detector-design-md.md) | Impeccable finish: review, detector, DESIGN.md | can_gallery | 1.5 | 8 | 16-u13, 16-u14, 16-u15 | - |
| [16-u20](u20-help-needed-tags-on-the-public-problem-schema-and.md) | help_needed tags on the public problem schema and list | can_server | 1.5 | 9 | 16-u01, 10-u69 | - |
| [16-u21](u21-on-device-capability-profile-store-and-registratio.md) | On-device capability profile store and registration screens | can_app | 1.5 | 10 | 16-u04, 16-u01 | - |
| [16-u22](u22-on-device-matcher-and-problems-you-can-move.md) | On-device matcher and 'Problems you can move' | can_app | 1.5 | 11 | 16-u21, 16-u20 | - |

## Conventions

- Gallery units: PRODUCT.md and the Direction contract in can_gallery/.impeccable are settled; never rerun init, concept-seed or a direction round. Unfold is native details/summary.
- 06-u16 is skipped, superseded by 16-u10; its dependants now depend on 16-u10.
- Copy describes the vision, never "a feed".

## Risks

- Gallery units run in sequence on one lane; 16-u12 fits tonight only if 06-u15 and 16-u10 finish within estimate.
- The pictogram set is hand-authored SVG; keep each figure small and on one grid.
- A plan 15 (news watch) is being written in parallel; both touch DECISIONS.md and 00-ROOT.md.
