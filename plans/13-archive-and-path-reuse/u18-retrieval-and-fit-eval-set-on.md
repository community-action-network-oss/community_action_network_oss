---
id: "13-u18"
plan: "13"
title: "Retrieval and fit eval set on the simulation archive: pairs, paraphrases, translations, distractors"
repo: can_policy
area: can-policy
model: sonnet
est_hours: 1.5
priority: 417
depends_on: ["10-u61","10-u20","10-u67","10-u23"]
writes: ["evals/archive/**","schemas/eval-archive.schema.json","test/eval-archive.test.mjs","docs/eval-archive.md"]
reads: ["src/**"]
spec: ["docs/design/ai/archive-reuse.md#10-evaluation","docs/design/ai/archive-reuse.md#11-cold-start","docs/design/ai/evaluation.md","docs/design/ai/simulation.md","docs/design/ai/policy-pack.md"]
verify: ["npm run verify"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
The labelled data that gates the embedding model choice and the fit checks: synthetic archive records and query problems, with expected relevant records, expected differences and planted legality and budget faults. All data is synthetic and says so.

## Steps
1. `evals/archive/records/*.json` valid against the archive_record schema of 10-u61: at least 24 synthetic records derived from seeds 1 and 2 variants (happy, revise, stuck, blocked stage, redirected) across the jurisdictions fiktiva-city, fiktiva-north and the unreviewed Amsterdam skeleton, each with `source: simulation`.
2. `evals/archive/queries/*.json`: at least 30 query problems (draft text plus context_profile) with `relevant_record_ids` and graded relevance (0 to 2); paraphrases of each seed condition; translations of the core queries into Dutch and English plus two non-European languages (Swahili and Hindi, machine produced and marked as such, reviewed by the maintainer later); near-miss distractors (same words, different problem type; same type, incompatible legal stack).
3. `evals/archive/fit/*.json`: planted illegal-at-L1..L6 steps with the expected layer and article, planted over-budget paths with expected `exceeds` and gap, planted stale corpus versions, planted missing-corpus holds, and expected context differences per query-record pair (for explanation accuracy: is the stated difference true).
4. `evals/archive/thresholds.yaml` (pack values with the defaults of the design doc): recall at 5 at least 0.8, nDCG at 10 at least 0.7, cross-language recall gap at most 0.15, explanation accuracy at least 0.95, fit recall for planted illegality 1.0, over-budget detection 1.0. Values are defaults the founder may change; the file documents why each default.
5. Schema `eval-archive.schema.json`, lint wired into `npm run verify` of can_policy (10-u23 runner conventions), and a test that every query refers to existing record ids, every language tag is valid BCP 47, and no real person or real incident appears (a deny-list check in the lint).
6. Docs: `docs/eval-archive.md` explaining how to add a record or query and the no-real-people rule.

## Acceptance
- The set lints clean and meets its minimum sizes (24 records, 30 queries, planted-fault coverage for L1 to L6).
- Every item is marked synthetic.
- `npm run verify` is green in can_policy.

## Out of scope
- The runner and register gate (13-u19).
- Real archive data.
