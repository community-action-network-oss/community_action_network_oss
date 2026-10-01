# Archive and reuse vocabulary (D-76, binding for wave W12)

The archive replaces "Resolution records". Use these exact names. If you need a name that is not here, report it instead of inventing one.

## Entities

- **`archive_record`.** The full journey of an ended problem, with personal data stripped. It holds:
  - a snapshot of the problem
  - `context_profile`
  - the stage plan as executed (`executed_path`)
  - options considered, choices and reasons
  - evidence references
  - a list of `challenge` entries
  - costs and resources
  - the outcome and the final criteria result
  - the terminal state
  - versions: policy, schema and legal corpus
  - license and attribution
- **`context_profile`.** Structured context, used for matching on both new problems and archived ones:
  - problem type and category
  - affected population scale
  - geography and climate class
  - resource and budget band
  - institutions involved (roles, not names)
  - the legal stack layers in force
  - language
  - constraints
- **`executed_path`.** The stage DAG with each stage's outcome, its duration band and its cost band.
- **`challenge`.** Something that failed, was blocked or was rejected along the way: what was tried, why it failed or what blocked it, and how it was resolved, if it was.
- **`path_suggestion`.** A candidate path from one or more archive records, adapted to the new problem. It carries:
  - the source references
  - similarity explained per context dimension
  - the differences and the adaptations needed
  - legality and resource-fit results
  - a draft stage plan
  - confidence
- **`attribution`.** A credit line back to the source archive records. It is shown whenever a suggestion is used.

## Decision points

- **`DP-ARCHIVE`.** Builds and checks the archive record when a problem reaches a terminal state:
  - personal data is stripped (the privacy gateway runs again)
  - the record is complete
  - challenges are captured
- **`DP-REUSE-FIT`.** Checks a path suggestion against the new problem:
  - legality under the new legal stack (L0 to L6)
  - resource and budget fit
  - context differences flagged
  - it never adopts a suggestion automatically
- **`DP-STAGE-DRAFT`.** Drafts a stage plan for a newly published problem from the suggestions the poster accepted. The poster edits it, and it then goes through DP-STAGE-PLAN.

## Rules

| Rule | What it requires |
|---|---|
| `ARCHIVE-1` | Every terminal problem is archived with its full path, including failures and challenges. Personal data is stripped. The record is public. |
| `REUSE-CONTEXT-1` | Every suggestion shows the context differences and the local legality and resource-fit results. A suggestion is never auto-adopted. |
| `REUSE-CREDIT-1` | Attribution to the source cases is always shown and carried into derived stage plans. |
| `REUSE-NOBLOCK-1` | Suggestions and AI drafts speed things up, but the at-least-one-review rule (REVIEW-1) still applies. Community input is invited and is not a blocker. |

## Wireframes

| ID | Screen |
|---|---|
| `WF-SUGGEST-1` | Suggested paths panel during preparation, which updates live as fields are filled in |
| `WF-SUGGEST-2` | Suggestion detail: source cases, similarity, differences, legality and resource fit, "use as starting point" |
| `WF-ARCHIVE-1` | Archive browse and search |
| `WF-ARCHIVE-2` | Archived case view: the full journey, challenges and outcome |
| `WF-STAGEDRAFT-1` | AI-drafted stage plan for the poster to review and edit after publication |

## Open question

`OQ-contribution-license`. The default is CC BY 4.0, which requires attribution. The alternative is CC0. Code stays MIT (D-49).

## Tech notes for the design to settle

- Retrieval is hybrid:
  - structured `context_profile` matching
  - Postgres full-text search
  - vector embeddings using pgvector, with a small embedding model that is free or cheap through OpenRouter (D-65), or run locally
- Retrieval works across languages: match in a shared embedding space or translate first.
- Suggestions run through the privacy gateway and the D-65 model register.
- Archive records are public, and the gallery can show them.
