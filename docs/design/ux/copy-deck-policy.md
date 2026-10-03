# Copy deck: policy screens

Continuation of `copy-deck.md` (same rules: ICU MessageFormat, calm and plain, no exclamation marks, no em or en dashes, no concatenation). Text mirrors `can_app/src/i18n/en.json`.

## Added ids: policy.* (copy-deck-sync)
| id | English |
|---|---|
| policy.new.cap | You have reached the limit for policy proposals for now. Please try again later. |
| policy.new.protectedCore.title | This change cannot be proposed here |
| policy.new.protectedCore.body | Protected rules change only through a constitutional amendment. Your answers are kept. |
| policy.view.title | Policy proposal |
| policy.view.loading | Loading the policy proposal |
| policy.view.notFound.title | Proposal not found |
| policy.view.notFound.body | We could not find this policy proposal. |
| policy.view.back | All policy proposals |
| policy.view.summary | What is proposed |
| policy.view.pr | Read the change in detail |
| policy.view.blocked | Why it went back: {reason} |
| policy.stage.line | Stage: {stage} |
| policy.stage.submitted | Submitted |
| policy.stage.eval | Automated tests |
| policy.stage.replay | Replay |
| policy.stage.ratification | Ratification |
| policy.stage.shadow | Shadow |
| policy.stage.canary | Canary |
| policy.stage.full | Full |
| policy.stage.rejected | Not accepted |
| policy.stage.withdrawn | Withdrawn |
| policy.eval.none | No test results yet. They appear here once the automated tests have run. |
| policy.eval.recorded | These results come from test recordings, not a live model. They show the checks run, not how a real model would behave. |
| policy.eval.row.pass | {name}: Passed |
| policy.eval.row.fail | {name}: Did not pass. This blocks the change. |
| policy.replay.none | No replay yet. It runs after the automated tests pass. |
| policy.replay.blocked | The replay is blocked. This blocks the change. |
| policy.replay.stricter | {count, number} would become stricter. |
| policy.replay.morePermissive | {count, number} would become more permissive. |
| policy.ratify.dissentNone | No dissent recorded yet. |
| policy.rollout.title | Rollout |
| policy.rollout.reached | {stage}: {date, date, medium} |
| policy.rollout.pending | {stage}: not yet |
| policy.rollout.current | Current |
