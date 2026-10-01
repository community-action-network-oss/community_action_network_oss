# Triggers: when the policy runs

The policy runs at every event that could change what is public or what the platform asserts. Three families.

## 1. Pre-publication (blocking)

- **When**: draft submit to review (DP-SOURCE-TRUST, DP-CRITERIA, DP-STAGE-PLAN and the always-on DPs run so volunteers do not spend time on a plainly incomplete draft), then volunteer review, then the review to publish run (D-72); also resubmit after `needs_revision`, contribution submit, proposal and decision record submit, any move that makes something public.
- **Pre-publication of a problem is now two steps.** Volunteer review (private; recommendations accepted or declined by the poster with a reason) and then DP-PUBLISH, which aggregates the blocking DPs plus any recommendations still open (REVIEW-1, RECO-1). `publish` moves the problem to `active` and makes the stage plan live. Contributions to `planned` stages are allowed (STAGE-PREP-1) and run the contribution DPs as usual.
- **What happens**: the synchronous deterministic checks of the brief run first (a hard failure keeps the draft with field hints and creates no decision). Then the selector runs the blocking DPs (`decision-points.md`). Item shows "Awaiting review" (the pending screen).
- **Outcome to state**: `publish` completes the gated transition (for a problem, `in_review` to `active`); `needs_revision` completes T02 with hints beside fields; `reject` completes T05 with rule ids and an appeal window; `route_external` shows the route; `hold` leaves the item where it is and retries with backoff, with a plain "Taking longer than usual" status. `hold` never becomes publish by timeout. Nothing public exists until a complete run says so (PUB-FAILCLOSED-1).
- **Honest wait**: the copy shows the real queue age, not a promise (OQ-review-wait-statement, now a compute queue, not volunteers).

## 2. On every update (blocking if public)

- **Diff-aware**: the selector receives the changed fields. Only DPs bound to changed fields run, plus always DP-CRISIS, DP-LEGAL and DP-PRIVACY on any changed text. Unchanged fields reuse their prior complete run only when `policy_version` is unchanged, otherwise they are re-checked.
- **Stage content** (`stage_option`, `stage_choice`, `stage_evidence`): runs on every submission. Stage evidence always runs DP-STAGE-RESOLUTION (stage state `resolving`) after DP-EVIDENCE-TIER; a plan-change proposal runs DP-STAGE-PLAN and DP-CRITERIA before it applies and is never silent (PLAN-CHANGE-1). A stage choice runs DP-LEGALITY and DP-DECISION-RECORD.
- **Dependencies** widen the set: editing a proposal re-runs DP-LEGALITY; adding evidence re-runs DP-EVIDENCE-TIER and flags DP-VERIFICATION if solved is pending; changing the problem statement re-runs DP-FRAMING, DP-DUPLICATE.
- **Public edits stay live until the new run completes?** No. For a published item the edit is held as a pending version; the previous approved version stays visible with "edit under review". The edit publishes only on `publish`. This is the pre-publication rule applied to each version (OQ-edit-after-publication is the open policy for what edits are allowed at all).
- Edits on private drafts run lighter (no blocking, advisory hints on request), full run on submit.

## 3. Post-publication (async)

| Trigger | Selection | Notes |
|---|---|---|
| **Policy change** | Items whose last run used an older version, filtered by affected DPs and jurisdiction, from the replay set of the amendment (`amendment-loop.md`) | Starts in shadow, then canary, then full. |
| **Rule change on resolved stages** | Resolved stages whose recorded `policy_version` or cited rules are in the rule diff | Re-runs DP-STAGE-RESOLUTION on the stored evidence. An unchanged result stores a note. A flipped result feeds re-resolution below, with the stage reopened (`resolved` to `active`) and its successors returned to `planned` if not yet started. |
| **Context change** | A new related or duplicate problem; a jurisdiction law-pack update; evidence tier change; a new decision record in a related problem | Targeted to the items that reference the changed context. |
| **Periodic sampling** | Stratified random sample per DP and jurisdiction at a set rate, plus all items near a threshold (confidence within a margin) | Feeds auditors and the flip metric, even when the policy did not change. |

Async runs never change a visible state by themselves unless the outcome flips (below).

## Re-resolution (D-59)

A policy or legal-corpus change is also a trigger for a **re-resolution review job** over past resolutions: `solved`, `closed`, `redirected` and `stuck` problems together with their decision records. (Withdrawn and rejected items are not resolutions and go through ordinary re-moderation.)

0. **Stages.** The job also covers resolved stages of any problem, not only terminal problems; a stage re-resolution that flips reactivates that stage as in D-59's reopen semantics.
1. **Selection.** On rollout reaching canary (not shadow), the job selects resolutions whose recorded `policy_version` or corpus versions are older than the new one and whose cited articles or rules are in the rule diff, filtered by jurisdiction. It never re-runs everything, only what the diff touches.
2. **Run.** DP-RERESOLUTION (`decision-points.md`) compares the archive record to the diff and returns `keep`, `annotate`, `reopen` or `hold`.
3. **Reopen** applies only when the conclusion changes and reopening is feasible (defaults: the problem still exists, the jurisdiction is still enabled, the initiator or a steward can be notified, and reopening does not undo a lawful completed implementation without a new proposal). It uses a reopen transition that `docs/spec/01a-lifecycle.md` must define (the spec owner assigns the id and target state; typically back to the affected stage reopened for a changed legal conclusion or evidence rule; a problem that was `solved` returns to `active`). It carries the reason, rule ids and old record reference.
4. **Notice.** Every outcome other than a quiet `keep` shows a visible notice: "Re-reviewed under policy vX" with the rule or law that changed, what it means for the conclusion, the full history link and the appeal path. The initiator or steward and followers are emailed. Where the owner cannot be notified, the problem is annotated, not reopened.
5. **History.** The old archive record stays, linked and readable. Nothing is deleted or rewritten. A completed lawful implementation stays on record as done.
6. **Appeal.** The re-resolution decision is a moderation decision and can be appealed (`appeals.md`).
7. **Throttle.** Batched with the same token bucket as re-moderation, canary then full. Volume and flip counts go in the public policy change log (counts, not content).

## Re-moderation semantics

When a post-publication run produces an outcome that differs from the live one:

1. The new decision record is stored; the old stays in history.
2. The item shows a visible notice: **"Re-reviewed under policy vX"** with the rule ids, a plain explanation and what changed, plus the appeal path. The item is not silently removed.
3. If the new outcome is `needs_revision`, the person gets time-boxed revision with the previous text still visible only if still permitted; if `reject` on public content, visibility is limited pending notice (the notice period default is 7 days, `OQ-reremoderation-grace`, proposed) except privacy or crisis tiers, where content is withdrawn from view at once and the notice says why and how to appeal.
4. The change is shown in the public policy change log with counts, not content.
5. Items that flip to the *more permissive* outcome (previously rejected, now publishable under a better policy) are offered a one-click resubmit that skips the cooldown.
6. A change that affects very many items is rolled out in batches (canary, then full) so the community can see the first results before the rest.

## Ordering and concurrency

- **Per-target serial**: runs for the same `(target_id)` are processed in version order; a newer version supersedes in-flight older runs (`superseded`, never applied).
- **Parallel across DPs** within one event; aggregation waits for all blocking DPs or the timeout (then `hold`).
- **Priority**: DP-CRISIS and DP-LEGAL first; then pre-publication; then updates; then post-publication; sampling last. Starvation guard: async work has a minimum share.
- **Event-order safety**: a transition is applied only if the target version matches the version the run judged (idempotency in `runtime.md`). Appeals and re-moderation lock the target against a second concurrent re-moderation.
- **Policy version pinning**: a run uses the version active when it started, recorded in the run, so a rollout mid-run is not mixed.

## Backpressure

- Queue depth and age are bounded per class. When pre-publication age exceeds the limit: stop accepting async work first, then shed to deferred processing for sampling, then show an honest delay banner; never lower floors or skip DPs.
- Per-account and per-IP rate limits and the cooldowns of the brief apply before runs are queued (they reduce abusive load; they are not a policy bypass).
- Spend caps shed in the same order (sampling, then re-moderation batches, then updates of low-risk fields), and fail to `hold` for anything blocking. See `safety-and-privacy.md`.
- Re-moderation batches throttle by a token bucket so a policy rollout cannot starve new submissions.
