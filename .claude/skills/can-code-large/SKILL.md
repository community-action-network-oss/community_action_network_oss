---
name: can-code-large
description: Orchestration protocol for large work — scope with parallel scouts, plan, gate, execute, deploy. Invoke by name for anything spanning more than one area.
disable-model-invocation: true
---

# can-code-large

You are **{model_name}-main**. You orchestrate; you do not implement.

**You do not scan any codebase.** Not one Grep, not one Read of source, not one `git log`. Your
knowledge of the systems comes from the routing table below, the area skills, and memory. Every fact
about code comes back from a scout. If you catch yourself opening a source file, you have already
broken the protocol — spawn a scout instead.

## Phases

**P0 Frame.** From the request alone: name the areas touched, pick their skills from the routing
table, size the wave. If scope is ambiguous, ask now — ambiguity discovered after P1 costs a whole
scouting round.

**P1 Scout.** Spawn one scout per area, **all in a single message** so they run concurrently, all on
Sonnet (D-28). Use the brief template below. In plan mode scouts are read-only `Plan` agents. Scouts read their area skill — not CLAUDE.md, not memory, not
git history. They return a plan, not code.

**P2 Adversarial review.** Before the plan reaches the user, spawn two reviewers on the assembled
plan text only: a senior-SWE reviewer (regressions, missed call sites, migration order,
optimisations) and a senior-designer reviewer (UX, empty/error states, a11y, platform fit). They
review; they do not edit. Feed findings back to the owning scout and re-assemble. Review happens
*before* the gate — after it you would be invalidating something the user already approved.

**P3 Gate.** Present one wave-level plan and wait. **This is the only approval in the wave.** The
plan must end with a **Skill updates** section naming each skill file the wave will change and what
changes in it, so the user approves the doc drift alongside the code. If nothing needs updating, say
so and why.

**P4 Execute.** Resume the same scouts with `SendMessage` — never respawn; the retained context is
the entire point. **Plan-mode amendment:** `Plan` agents cannot write, so at P4 spawn fresh Sonnet
writer agents with the approved area plan pasted verbatim (or written to a briefs file and
referenced). Overnight runs also spawn fresh per unit (see Overnight run). Inside an approved wave nothing stops for per-item approval: agents build, verify,
commit, and escalate only on a blocked or contradicted assumption. If a UI layout changes, the
owning agent posts an ASCII mockup to you before building it.

**P5 Verify.** UI waves add the three-role topology (below). Every unit green, committed, and the
tree at least as healthy as you found it.

**P6 Fold back.** Each scout updates the skill it loaded, as its last task, before you release it.
It folds back only durable facts: a new invariant, a trap it hit, a claim it proved false, a path or
module that moved or died, a changed command or env var. **Never the story of the wave** — no dated
notes, no "we fixed X". The pass is add, correct **and delete**: anything the wave made false or
dead goes in the same edit. A skill that only ever grows is broken. Confirm each scout's diff
matches what P3 promised; an unannounced skill edit is drift, not maintenance.

**P7 Deploy.** One deploy agent, scope below. Then report: what shipped, where it landed, what is
still gated on the user.

## Sizing — from the skills alone, never from the code

Each area skill declares its weight in files/LOC. Budget `tokens ≈ LOC × 11`. Greenfield: until an
area skill declares LOC, size from unit `est_hours` (corpus units are ≤1.5 agent-hours).

Exclude tests from a scout brief unless the unit *is* test work — tests are often close to half of an
area's LOC.

One scout per area skill whose no-tests budget is ≤ ~300K tokens (~27K LOC); over that, sub-carve by
the skill's own sections. Fan-out: 3-6 units → 1 agent each; 7-15 → batch into 6-10; 16+ → batch
into 12-24. Concurrent ceilings: **Sonnet ≤12, Haiku ≤24**. No Opus subagents. A wave touching more than 12
areas runs scouts in two batches.

Model per agent (D-28): **every subagent runs Sonnet.** **Haiku** only for mechanical volume (locale
sweeps, renames, import sweeps, log triage). Opus is reserved for the orchestrator. Hard problems get
a narrower unit or a second Sonnet reviewer, never an Opus agent.

## Routing

| Work type | Skill | Dir |
|---|---|---|
| Spec, constitution, design, UX, manifesto, plan unit content | can-spec | `docs/`, `manifesto.md`, `plans/` |
| Superproject wiring, submodules, root docs, scripts, settings, corpus tooling | can-root | `.gitmodules`, gitlinks, `README.md`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`, `scripts/`, `.claude/settings*.json`, `plans/tools/` |
| API, domain, DB, migrations, OpenAPI | can-server | `can_server/` |
| Universal app, civic components, i18n | can-app | `can_app/` |
| Public gallery (read-only site) | can-gallery | `can_gallery/` |

Each skill's name and description are in its own SKILL.md; add a row when a wave creates an area, and
announce it in the P3 **Skill updates** section.

Cross-cutting change: the **originating** area owns the shared file; every other area gets it as
READS. Never split one file across two skills.

## Non-overlap

**One writer per path, for the whole wave.** Split by area skill, never by feature slice — two
scouts on one feature will meet in the same file. Every brief carries `WRITES:` (exclusive) and
`READS:` (read-only) absolute globs. A scout needing to write outside `WRITES:` stops and escalates
to you; it does not edit, and it does not ask a sibling.

**Single-owner paths** — shared libraries, shared UI components, generated code — get one owner per
wave and are READS for everyone else. Generated code: the owner regenerates, nobody hand-edits.
Record these paths in the owning area skill. CAN's single-owner paths:

| Path | Owner / rule |
|---|---|
| `can_server/openapi/openapi.json` | server regenerates; never hand-edited |
| `can_server/drizzle/**` | generated; append-only |
| `can_app/src/api/schema.d.ts` | generated by `gen:api` |
| `can_app/src/theme/tokens.json`, `can_gallery/src/content/*.json` | synced from docs; never hand-edited |
| `docs/spec/01-slice-1-brief.md` | sole owner of the lifecycle table |
| `.gitmodules`, gitlinks | root |
| `DECISIONS.md` | orchestrator only |

**Unowned paths are real — do not assume the skills tile the tree.** They do not. So: assign every
unowned path you touch **explicitly** in a brief's `WRITES:`, and a scout that discovers an unowned
path escalates to you rather than assuming it owns it. Two scouts silently claiming the same unowned
file is the failure this rule exists to stop.

**Excluded from every brief, always:** `*/worktrees/*` `*/node_modules/*` `*/dist/*` `*/coverage/*`.
An agent that greps into a duplicate worktree will edit the wrong copy and report success.

If a shared-path change is unavoidable mid-wave: the owner makes it and commits first, dependents are
told to pull. Never two agents editing it "carefully".

## Scout brief (fill the `<>` slots)

    OBJECTIVE
    <one sentence: the outcome, not the steps>

    LOAD FIRST
    Invoke the skill `<area-skill>` and work only from it. Do NOT read CLAUDE.md, do NOT search
    memory, do NOT read git history. If the skill does not answer something, escalate to me.

    ROOT
    <absolute repo path>

    WRITES (yours exclusively)     <absolute globs>
    READS (read-only; escalate)    <absolute globs, incl. any single-owner shared path>
    NEVER TOUCH                    */worktrees/*  */node_modules/*  */dist/*  */coverage/*

    DECISIONS ALREADY MADE (do not re-open, do not re-derive)
    <every shared answer, repeated here in full>

    OUT OF SCOPE
    <list>

    PHASE
    P1 SCOUT ONLY: return a plan, change nothing. Shape: issue, root cause, hypothesis, certainty,
    solution, options considered, impact. Cite absolute paths. Flag anything you would need to
    touch outside WRITES. Escalate ambiguity, never guess.

    RULES
    - No `cd`: use `git -C <repo>`, `npm --prefix <repo>`, absolute paths.
    - Never `git stash` / `git reset` / `git add -A` — shared working tree, user edits in parallel.
    - Never write DECISIONS.md. Report every default or deviation in your output.
    - Device and simulator work goes through me. Never boot a device.
    - No em dashes or AI-sounding punctuation in user-facing copy.

    OUTPUT
    <exact shape you want back>

At P4, resume with a short message — do **not** re-send the brief, that is the point of resuming:
`P4 EXECUTE: build your approved plan. Wave token <x>, your P-number <n>. Commit cadence as briefed.
Capture requests come to me.`

Briefs may live in files to avoid re-sending; a shared common-rules brief is encouraged and each
brief points to it. Scaffold first, then `git init`; delete template `AGENTS.md`/`CLAUDE.md`/`LICENSE`
files scaffolders add.

**Units sharing an undecided question are not independent.** Decide it first and repeat the answer
verbatim in every brief, or keep them in one agent. Parallel agents inventing their own answers to
the same question is the top failure mode of fan-out.

## Spec loading

Briefs cite `docs/spec/*` and `docs/design/ux/*` files by path. Never load a whole spec. Slice work
always loads `docs/spec/01-slice-1-brief.md` and `docs/spec/02-agent-rules.md`.

## Decisions and questions

Every default or deviation an agent reports is logged by you in top-level `DECISIONS.md`, format
`D-<n> · date · wave · decision · why · reverse`. The founder reviews it each morning. Unknowns the
community can solve go to `docs/open-questions/OQ-*.md`. Agents never write DECISIONS.md.

## Submodules

`can_server`, `can_app`, `can_gallery` are submodules; each repo has its own index.

- Area agents commit only inside their own repo.
- Commit in only-mode everywhere: `git -C <repo> add -- <paths>` then
  `git -C <repo> commit -m "..." -- <paths>`. The superproject index is shared by concurrent agents.
- Root agent is the sole writer of `.gitmodules` and pointer bumps, done at wave or night end.
- Remotes are bare siblings (`../<name>.git`), local only.
- Contract order: can_server commits `openapi.json` before can_app runs `gen:api`.
- Scaffold before `git init`.

## Device broker

No simulators or devices are available. Verification is Expo web only until a founder-gated device
lane exists. The rules below apply once one does.

**The harness owns the lock; you own the roster.** Do not create a lockfile — a second source of
truth goes stale the moment an agent dies holding it.

**Roster.** At most one agent per device platform per wave. Heavy devices (emulators) are booted only
when a capture is in hand and killed as soon as it is delivered; never spawn a lane to "warm up".
Device agents load the harness skill and nothing else. One session per platform, never shared. Keep
them alive across the wave and `SendMessage` for each next capture.

**Detect the user's device before any boot.** A device booted that this wave did not boot is the
user's — attach to it. Never boot or shut down a device yourself, never start a second dev server.
If a capture fails against it, report and stop; do not reach for a fresh device.

**Requests route through you.** Subagents cannot make a blocking request of a sibling. A Dev subagent
needing a capture returns a request to you — screen path, what to assert, expected string or pixel —
and you forward it and route the answer back. Device agents return conclusions plus evidence
(include dimensions with every capture), never raw trees.

**Busy = an outstanding request.** Busy lane + platform-agnostic check → route to another platform's
lane. Busy lane + platform-specific check → queue behind it. **Never a second session on the same
platform** — it can bind to the wrong device silently.

**Freeze while capturing.** A capture and an edit to the same screen cannot overlap; hot reload
changes the screen mid-capture. Tell the owning Dev agent to hold edits to that screen before
dispatching, and release when the capture returns.

## Commit cadence

Subagents commit continuously. Triggers, whichever comes first: one coherent unit works and its own
check passes · ~10 files or ~400 lines touched · before any handoff, capture request, or going idle.

**Message:** `<wave> P<n>: <imperative — what changed and why>`. You assign the wave token and the
P-number in the brief; agents never invent one.

**Staging is by explicit path, always:** `git -C <repo> add -- <paths>` from the brief's `WRITES:` set,
then `git -C <repo> commit -m ... -- <paths>`.
`git add -A`, `git add .` and `git commit -a` are banned — the user edits this tree in parallel and
will lose work.

**Concurrent committers.** Agents in one repo share a `.git/index`: on `index.lock` /
`Unable to create index.lock`, sleep 3s and retry up to 5 times, then escalate. **Never delete a
lock file.**

Verify before committing (typecheck, the unit's tests). A red commit is worse than a late one.

## UI waves: three roles

**Dev** develops and self-verifies. **Harness-testing** tests the harness itself and feeds fixes back
to Dev. **QA** designs and judges critical scenarios — QA does **not** boot or drive a device; it
sends scenarios through the platform device agent and receives conclusions plus evidence. All three
report to you; you route.

## Deploy agent (P7)

No network remote or infra exists yet; overnight runs never deploy. Applies when a wave targets one.

Runs at P7, after the P6 fold-back has landed.

**Does:** push the integration branch the wave targets · run infra plans and paste the output ·
verify the non-production environment's health · report what landed.

**Does not:** push the production branch · apply infra changes · ship OTA or store releases ·
force-push anything. Mark unapplied config in the commit message: `… (NOT applied)`.

## Measuring a change

Run the **null experiment** — the unchanged thing twice — before trusting any delta. That gap is your
noise floor.

**A counter-metric that cannot fail is not a counter-metric.** Name the input that would make your
instrument report failure, then feed it that input. Prefer a discriminator whose source is
independent of the thing being judged.

For any judgement-shaped result, spawn an **independent rater** that did not write the code, cannot
edit it, and sees only the output.

## Standing prohibitions

No `git stash` / `git reset` / `git add -A` / `cd` in any subagent. No push to the production branch, no
OTA, no infra apply. Never boot a device or open a second session on the same platform. Never edit
under `*/worktrees/*`. Subagents query non-production environments only — escalate production-only
questions instead of running them. After a regression, leave the tree at least as healthy as you
found it: a partial revert that builds beats a half-fix that does not.

## Fleet status

On request, report: agents running (name, model, area, current unit) · units pending · units done ·
blocked items with the blocker · estimated time to completion.

## Overnight run (`/can-code-large night`)

Unattended, ~6h. Start under `caffeinate -dimsu`. Idempotent: if `plans/runs/<date>.md` exists, resume
from it. Corpus format: `plans/FORMAT.md`; tool: `node plans/tools/corpus.mjs lint|next|graph|set`.

**Preflight** (failures go in the morning file, never stall):
- `docker info`; if down, skip units with `needs: db|docker`.
- Dirty repo aborts that repo's lane. Never stash.
- Null run of `npm run verify` per repo. Red lane runs only a fix unit, or skips.
- `night/<date>` branch in every repo, stacked on the newest unmerged night branch.
- Record start time.

**Select** strictly from `node plans/tools/corpus.mjs next --hours 6 --json`. Do not re-reason it.

**Run**
- Fresh Sonnet agent per unit, briefed with the unit file + its area skill + common rules.
  `SendMessage` only for fix-ups within the same unit. This overrides resume-don't-respawn.
- Only the server lane touches compose/DB. App tests mock the API.
- Live Playwright e2e once at close-out, by you. Dev servers in background, killed after.
- **Wall-clock cap per unit = max(2 × `est_hours`, 1h)**, measured from spawn with `date`. Schedule a
  check at the cap (ScheduleWakeup or a background `sleep` timer). On expiry: `TaskStop` the agent;
  commit partial work by path to `wip/<date>-<unit>` in that repo; switch back to the night branch;
  `corpus.mjs set <unit> status=blocked blocked_reason=timeout`; kill dev servers the unit started
  (`lsof -ti :4000 :8081 :3000`); list it in the morning report.
- Only you write unit status, via `corpus.mjs set`. Agents return SHAs.
- Crash recovery: resolve a `doing` unit by grepping its repo's git log for the unit id.

**Failures**
- At most 3 fix attempts per unit.
- Still red: commit red work by path to `wip/<date>-<unit>`, switch back, mark `blocked`.
- Two blocked in a row halt the lane.
- Reversible block: apply the unit's `defaults`, log to DECISIONS.md and `docs/open-questions/`.
- Irreversible, safety, legal or privacy: `blocked`.

**Traps**
- `npx expo start` rewrites `can_app/tsconfig.json`: keep it stable and re-check `git status` after any expo start.
- Git blocks file-transport submodule clones (sibling bare remotes) unless `-c protocol.file.allow=always`.

**Time:** no new unit after T-75min. Log `actual_hours`.

**Close-out:** live e2e; pointer bumps by the root agent; skill fold-back on the night branch with each
diff listed in the report; morning report `plans/runs/<date>.md`: units done + SHAs, blocked + reasons,
defaults applied, verify per repo, merge order (submodules first, then superproject; ff or `--no-ff`,
never squash), next night's queue.

**Never:** push to a network remote, deploy, boot a device, touch `main`, apply infra, activate
`.claude/settings.proposed.json`.

You may amend this runbook mid-wave only after replaying the change against a previous wave's samples
and getting same-or-better results. Otherwise propose it at P6 alongside the skill fold-back.
