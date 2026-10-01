---
id: "08-u14"
plan: "08"
title: "Activation checklist for .claude/settings.proposed.json"
repo: "."
area: "can-root"
model: sonnet
est_hours: 0.75
priority: 140
depends_on: []
writes: ["docs/ops/activate-agent-settings.md"]
reads: [".claude/settings.proposed.json"]
spec: ["docs/spec/02-agent-rules.md","DECISIONS.md","docs/spec/22-ai-contribution-policy.md"]
verify: ["node -e \"if(require('fs').statSync('docs/ops/activate-agent-settings.md').size>25000)throw new Error(1)\"","node plans/tools/corpus.mjs lint"]
founder_gate: true
defaults: "Until the founder activates it, the file stays proposed (D-24)."
status: "todo"
attempts: 0
commits: []
actual_hours: null
---

## Objective

Founder gate: granting an agent permissions is a security decision. Write the checklist the founder follows to review and activate the proposed settings, and to roll back.

## Steps

1. Read .claude/settings.proposed.json. If it does not exist, write the checklist with a first step saying so and stop.
2. Checklist: read every allow rule and say what it enables; confirm deny rules cover push, force push, reset, stash, clean, rm on repo roots, writes to DECISIONS.md and to files outside the repo, and network tools; confirm only night/* branches get agent commits (D-21) and the founder merges.
3. Dry run: copy the file to a throwaway clone, run one small unit by hand, inspect prompts.
4. Activate: `git mv .claude/settings.proposed.json .claude/settings.json`, commit by the founder, note the date in DECISIONS.md.
5. Rollback: revert the commit; verify no standing allow rules remain.
6. Add a review cadence (monthly, tied to the dependency and release rhythms).

## Acceptance

- Checklist is executable by someone who did not write the settings.
- Every deny and allow rule is listed with a one-line meaning.

## Out of scope

- Activating the settings.
- Editing the proposed file.
