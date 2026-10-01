---
id: "10-u06"
plan: "10"
title: "Base and constitution packs: rules.yaml from the registry with parity check"
repo: "can_policy"
area: can-policy
model: sonnet
est_hours: 1.5
priority: 6
depends_on: ["10-u03"]
writes: ["packs/base/**","packs/constitution/**","tools/rules-parity.mjs","test/rules-parity.test.mjs","ci/fixtures/rules-registry.snapshot.json"]
reads: ["tools/**","schemas/**"]
spec: ["docs/spec/constitution/rules.md", "docs/design/ai/policy-pack.md", "docs/design/components/can-policy.md", "docs/spec/constitution/README.md", "docs/spec/constitution/rules-legal-sim.md", "docs/spec/01a-lifecycle.md"]
verify: ["npm run verify"]
founder_gate: false
defaults: "Rule text is copied verbatim from rules.md; if a rule is ambiguous about its DP mapping, set `applies_to: []` and add a `note`, never guess. Protected-core rules (constitution I.2 tier rights, crisis and safety) are flagged `protected_core: true` and listed in `packs/base/pack.yaml`."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Turn the rule registry in `docs/spec/constitution/rules.md` into the machine form of layers 1 and 2: `packs/base/rules.yaml` (platform rules) and `packs/constitution/rules.yaml` (constitution-derived), with tier, applicability to decision points, and a parity check so the two never drift while `rules.md` is the source.

## Steps
1. Create `packs/base/pack.yaml` (name base, layer base, parent null, `status: draft`, `protected_core: [ids]`) and `packs/constitution/pack.yaml` (parent base). Rules that are procedural or platform behaviour (for example ACCT-REQ-1, DRAFT-TTL-1, IDENT-1) go to base; rules that restate constitution chapters (for example NAME-1, PRIV-GATE-1, LEGAL-GATE-1, APPEAL-1) go to constitution. Record the split rule in `packs/README.md`.
2. `rules.yaml` entry shape: `{id, text, tier (rights|crisis_safety|privacy|legal_gate|procedure|ranking per PREC-1), applies_to: [DP ids], source, first_phase, protected_core, status: active|proposed}`. Fill `applies_to` from the Rules enforced column of docs/design/ai/decision-points.md. Copy `text` from the Must and must-not column verbatim.
3. `tools/rules-parity.mjs`: parses `../docs/spec/constitution/rules.md` and `../docs/spec/constitution/rules-legal-sim.md` (the rules file was split in D-74, so the registry is the union of both) when present and compares the set of ids and text with the union of both packs; prints a diff and exits 1 on drift; when `../docs` is absent it exits 0 printing "skipped: superproject not present" (the 03-u02 skip pattern). A committed snapshot `ci/fixtures/rules-registry.snapshot.json` (id to text hash) lets standalone CI still detect accidental edits to a rule's text.
4. Tests: a rule moved between packs keeps parity; a changed word fails parity; a protected-core rule absent from the `protected_core` list fails lint (add this check to `tools/lint.mjs` with a test).
5. Add the new checks to `npm run verify`. Do not generate manifests yet (10-u27).
6. Lifecycle v2 and archive rules (W13): the registry now includes CRITERIA-1, REVIEW-1, RECO-1, SOURCE-1, STAGE-GATE-1, STAGE-PREP-1, STAGE-RESOLVE-1, PLAN-CHANGE-1 (rules.md) and ARCHIVE-1, REUSE-CONTEXT-1, REUSE-CREDIT-1, REUSE-NOBLOCK-1, IMPACT-1, GUEST-LABEL-1, LOC-PRIV-1, LOC-DOUBT-1 plus the legal-stack and simulation rules (rules-legal-sim.md). Fill `applies_to` for them from the Rules enforced column of decision-points.md (CRITERIA-1 to DP-CRITERIA and DP-VERIFICATION; SOURCE-1 to DP-SOURCE-TRUST; STAGE-GATE-1 and PLAN-CHANGE-1 to DP-STAGE-PLAN; STAGE-RESOLVE-1 to DP-STAGE-RESOLUTION; REVIEW-1 and RECO-1 to DP-PUBLISH; ARCHIVE-1 to DP-ARCHIVE; REUSE-* to DP-REUSE-FIT and DP-STAGE-DRAFT). Rules with no DP (STAGE-PREP-1, IMPACT-1, GUEST-LABEL-1, LOC-PRIV-1, LOC-DOUBT-1) get an empty `applies_to` and `enforced_by: server`. The old rule STAGE-1 is retired with DP-STAGE; the parity test must not expect it. LOC-PRIV-1 and IMPACT-1 are `protected_core: true` (attestation never enters moderation inputs).

## Acceptance
- Every rule id in rules.md appears exactly once across the two packs (parity test).
- Edited rule text fails the parity check with the id named.
- The protected-core list matches the rights and crisis tier rules.
- `npm run verify` green.

## Out of scope
- Jurisdiction rules (10-u20, 10-u21).
- Editing `docs/spec/constitution/rules.md` (spec owner).
