---
id: "06-u01"
plan: "06"
title: "Factual-claims register and Phase 0A content audit"
repo: "can_gallery"
area: "can-gallery"
model: sonnet
est_hours: 1.5
priority: 10
depends_on: []
writes: ["docs/claims.md","docs/phase-0a-audit.md","scripts/check-claims.mjs","scripts/check-copy.mjs","package.json","src/app/**","src/content/**"]
spec: ["docs/spec/18-phases-gates.md","docs/spec/19-artifacts.md","docs/spec/03-scope.md","manifesto.md"]
verify: ["npm run check:claims","npm run check:copy","npm run verify"]
founder_gate: false
defaults: "If a claim has no source in docs, remove or soften the claim rather than inventing a source, and list it in the audit as removed."
status: "todo"
attempts: 0
commits: []
actual_hours: null
---

## Objective

Make the site honest by construction. Create the factual-claims register named in docs/spec/19-artifacts.md and audit the shipped copy against the five Phase 0A acceptance criteria.

## Steps

1. Read every page under src/app and any copy in src/content. List each factual statement (what exists, what is planned, numbers, names, dates, who decides) as a row in docs/claims.md: id (C-001...), page, exact text, source path in the superproject (docs/spec/... or DECISIONS.md, with anchor if useful), and status (supported, softened, removed).
2. Write scripts/check-claims.mjs: parse the table, fail if a source path does not exist under the superproject root (`..`), if a claim id is duplicated, or if a supported claim text no longer appears verbatim in src. Skip with a message when `..` has no docs folder.
3. Write scripts/check-copy.mjs: fail on U+2014 or U+2013 in src, on phrases that imply liveness (for example "sign up", "join now", "launching", "our users", "report your problem", "get help"), and on any http(s) URL that is not the placeholder repository config or an allowed documented host. Keep the banned list in the script, one line each.
4. Write docs/phase-0a-audit.md: one row per acceptance criterion and per bullet in the Phase 0A list (docs/spec/18-phases-gates.md), with status (met, partly, missing), evidence (page and claim ids) and follow-up unit ids from this plan. Fix small copy defects directly; record larger gaps instead of building them here.
5. Add `check:claims` and `check:copy` to package.json and call them from `verify`.
6. Lifecycle v2, archive and location (W13): extend the factual-claims register with the claims the new pages make and their sources: the stage plan and volunteer review flow (docs/spec/01a-lifecycle.md, 01b-stages.md), the Archive and reuse (docs/spec/24-archive-reuse.md: public, personal data stripped, never automatic, credit always, default license CC BY 4.0 as an open question), and the private location check (docs/design/location/attestation.md: coordinates never leave the device; the first version is self-asserted on web and says so; the zero-knowledge proof is Planned and gated on a spike). A claim the register cannot source is deleted, not softened.

## Acceptance

- docs/claims.md covers every factual sentence in src; check:claims passes.
- docs/phase-0a-audit.md has a verdict and evidence for every criterion and list item.
- The site states its stage plainly and has the non-service disclaimer (emergency, legal, medical, government, individual service).
- verify passes.

## Out of scope

- New pages or features (later units own them).
- Rewriting the visual design.
- Resolving open questions; link to them instead.
