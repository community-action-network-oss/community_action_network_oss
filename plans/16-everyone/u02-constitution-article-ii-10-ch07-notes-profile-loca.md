---
id: "16-u02"
plan: "16"
title: "Constitution article II.10, ch07 notes, PROFILE-LOCAL-1 and the manifesto paragraph"
repo: "."
area: "can-spec"
model: sonnet
est_hours: 1.0
priority: 2
depends_on: ["16-u01"]
writes: ["docs/spec/constitution/ch02-privacy-participation.md", "docs/spec/constitution/ch07-expertise-reputation.md", "docs/spec/constitution/rules.md", "docs/spec/constitution/map.tsv", "manifesto.md"]
spec: ["DECISIONS.md", "docs/spec/constitution/README.md", "docs/spec/constitution/ch08-governance.md"]
verify: ["node plans/tools/corpus.mjs lint", "python3 docs/design/check.py"]
founder_gate: false
defaults: "D-80 is binding; if a step is blocked, take the most private and plainest option and report it for the morning review."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Record the founder's constitutional amendment from D-80 (transitional steward, VIII.2) and say the vision in the manifesto.

## Steps
1. Copy the article II.10 CAPABILITY-PROFILE-LOCAL text from D-80 verbatim into ch02 after II.9, keeping the chapter's heading and status format. Do not reword it.
2. In ch07, add one note under Art 59 and one under Art 72 pointing to II.10: showing a person public problems on their own device is neither private matching nor assignment.
3. Add rule PROFILE-LOCAL-1 to rules.md in the table shape: source II.10; trigger any build or API change; must not accept, store or log any capability profile field or anything derived from it server side; evidence OpenAPI and schema; test a contract scan for profile fields; first phase P2.
4. Add the map.tsv row if the file maps new articles.
5. Add a short manifesto paragraph, 'Come as you are', in the voice of the existing text: everyone already knows something a public problem needs; CAN asks what you know, keeps it on your phone, and shows you the few problems you can move; a few problems solved properly beats a hundred touched. Do not copy sentences from the gallery.

## Acceptance
- II.10 text matches D-80 exactly.
- PROFILE-LOCAL-1 present.
- Manifesto paragraph present.
- Checks pass.

## Out of scope
- Changing any other article.
