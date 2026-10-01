# OQ-content-schema-design: Who designs the v1 content schemas, and how are they kept sound?

- **ID:** OQ-content-schema-design
- **Status:** open

## Question

Who drafts the version 1 schemas for each content type (problem, contribution, proposal, decision record, task and verification, appeal, policy proposal), which fields are required, and how do the schemas force a poster to cover facts, causes, affected people, scope, lawful options, uncertainty and assumptions without making posting a chore? How does a major schema bump treat in-flight drafts?

## Why it matters

Schemas are the only way anyone can post (D-58, `STRUCT-ONLY-1`). Too few fields lets a poster skip the hard parts; too many drives honest people away or produces filler. Schema v1 shapes every later policy and every simulated and real post.

## Current default (what we built meanwhile)

Founder-stewarded v1 (`INTERIM-1`), drawn from the problem schema in `docs/design/ai/structured-content.md` and the other six types derived the same way. Schemas live in the policy pack and change only through a policy proposal. In-flight drafts keep their schema version until submit; a minor bump auto-migrates; a major bump gives a 30-day grace window and a migration screen (set in the pack). The persona simulation tests every schema before public participation.

## Who can help

UX researchers; plain-language writers; civic practitioners; conflict-resolution and mediation practitioners; accessibility specialists; people who run public consultations.

## What a good answer looks like

For one content type: a field list with a short plain question and a "why we ask" per field, which fields are required, worked good and bad examples, and what each field prevents. Evidence from a usability test that people can finish it in a reasonable time.

## Spec links

- `docs/spec/05-lifecycle-participation.md`
- `docs/spec/17-ux.md`
- `docs/design/ai/structured-content.md`
- `docs/spec/constitution/ch04-resolution-lifecycle.md (IV.1)`
