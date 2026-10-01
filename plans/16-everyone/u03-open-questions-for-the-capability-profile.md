---
id: "16-u03"
plan: "16"
title: "Open questions for the capability profile"
repo: "."
area: "can-spec"
model: sonnet
est_hours: 1.0
priority: 3
depends_on: ["16-u01"]
writes: ["docs/open-questions/OQ-capability-taxonomy.md", "docs/open-questions/OQ-profile-multi-device.md", "docs/open-questions/OQ-match-notify-channel.md", "docs/open-questions/OQ-help-needed-tags.md", "docs/open-questions/README.md"]
spec: ["DECISIONS.md", "docs/open-questions/README.md"]
verify: ["node plans/tools/corpus.mjs lint", "npm --prefix can_gallery run sync:check || npm --prefix can_gallery run sync:content"]
founder_gate: false
defaults: "D-80 is binding; if a step is blocked, take the most private and plainest option and report it for the morning review."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Log the four undecided parts of the capability profile as open questions with working defaults, so no unit blocks on them.

## Steps
1. Follow the format of existing OQ files (question, why it matters, current default, options, who can help).
2. OQ-capability-taxonomy: default the plain-language groups in spec 26, extended through policy packs; who can help: every profession.
3. OQ-profile-multi-device: default export and import of an encrypted file, no sync server.
4. OQ-match-notify-channel: default an interest-blind opt-in push plus on-device matching (D-80).
5. OQ-help-needed-tags: default the poster proposes, volunteer review checks, the publication run validates the tag set.
6. List them in the README index. Run the gallery content sync so the register picks them up, and commit the synced json in can_gallery only if the orchestrator asks; otherwise report that a sync is due.

## Acceptance
- Four OQ files with defaults.
- README lists them.
- lint passes.

## Out of scope
- Answering them.
