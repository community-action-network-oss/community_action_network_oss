---
id: "11-u02"
plan: "11"
title: "Submitter personas: wellmeaning-wrong, vague, careful, nonnative, revising"
repo: "can_policy"
area: can-policy
model: sonnet
est_hours: 1.5
priority: 102
depends_on: ["11-u01", "10-u08", "10-u19", "10-u62"]
writes: ["simulation/personas/sub-*/**"]
reads: []
spec: ["docs/design/ai/simulation.md#2-persona-catalog","docs/design/ai/structured-content.md#4-dp-assumptions","docs/design/ai/structured-content.md#5-dp-completeness","docs/design/ai/structured-content.md#7-ai-fill-assist"]
verify: ["npm run verify"]
founder_gate: false
defaults: "If a persona needs a field value the v1 problem schema does not accept, fix the persona, never the schema. Scripts must be deterministic: no randomness inside script.json, only the persona `seed` for harness-level choices."
status: done
attempts: 0
commits: ["a6b715f"]
actual_hours: null
---
## Objective
The five submitter personas from the catalog, each with persona.yaml, a deterministic script and a live-mode prompt, and expected outcomes the report can score. Every persona is synthetic: `synthetic: true`, a handle of the form `sim-<id>`, no real person, no real organization speaking in its own voice (an institution persona uses a role label such as "the municipal department for public space"), no real contact data, evidence only under the fake domain `evidence.sim.test`. Scripts use only field values valid for the v1 content schemas of plan 10.

## Steps
1. `sub-wellmeaning-wrong`: a script submitting a problem whose `causal_hypothesis` is stated as `supported` without evidence, a legal assumption (a power the competent body lacks per the fiktiva-city overlay) and a scope mismatch, expecting `needs_revision` from DP-ASSUMPTIONS with a hint per field, then a second script step that fixes it by marking the assumptions (`assumption_strategy: mark_assumption`) and expects `publish`. Include two more variants (`factual`, `scope`) as separate scripts `script-factual.json`, `script-scope.json`.
2. `sub-vague`: every field thin or filler (one word, repeated sentence, "see above"): expects DP-COMPLETENESS `needs_revision`; a variant that pads with long filler must also not pass.
3. `sub-careful`: complete, sourced, honestly uncertain; expects `publish` on the first or second pass (this persona feeds the false-reject metric).
4. `sub-nonnative`: short, imperfect English fields (invented text), uses fill-assist: a step `assist` with private notes, then confirms suggestions one field at a time (`confirm_each`), expecting `assisted` flags in the record.
5. `sub-revising`: first submission rejected (an eligibility problem, a personal-case framing), revises into a structural framing, publishes, then appeals one outcome (a different persona-written appeal later is `app-appellant`); expects the revise loop and the appeal loop to run end to end.
6. All problem bodies are invented, set in the fictional city (these personas run on `fiktiva-city`), and cover the 16 core problem fields of 10-u08 (including `sources[]` and `final_acceptance_criteria[]`), a `stage_plan` where the seed has one, and the confirmed `context_profile`. Add `expected` entries for every step. Add `prompt.md` for each (live mode: goals, flaws, instructions to produce one structured submission per turn, never tool use).
7. `npm run verify`.
8. Lifecycle v2 (W13): a submitter now prepares privately and sends for volunteer review; every script starts with `prepare` (fields, sources, final criteria, stage plan), then `request_review`, waits for the volunteer personas of 11-u45 (or the seeded reviewer accounts of the bootstrap), resolves recommendations with a reason (`resolve_recommendation`), then `request_publication`. `sub-wellmeaning-wrong` gets its `needs_revision` from the publication run (DP-ASSUMPTIONS, DP-SOURCE-TRUST, DP-CRITERIA) and `sub-vague` from the same run (a vague final criterion or an unsupported source is an extra variant each). `sub-revising`'s first rejection is T05 at publication. Expected outcomes of the steps use the v2 states (`in_review`, `needs_revision`, `active`).

## Acceptance
- Five personas lint clean and each step has an expected outcome.
- sub-wellmeaning-wrong has factual, causal, legal and scope variants (three script files plus the main one).
- `npm run verify` green.

## Out of scope
- Contributor and adversarial personas (11-u03 to 11-u06).
- Running them.
