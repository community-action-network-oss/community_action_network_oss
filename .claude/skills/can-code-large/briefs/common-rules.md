# Common rules for every CAN agent

Every agent the orchestrator spawns reads this file before doing anything else.

## Paths and sources of truth

- **Superproject:** `/Users/abhijeetchakraborty/Code/legacy_projects/community_action_network_oss`
- **Submodules:** `can_server`, `can_app` and `can_gallery`. A fifth, `can_policy`, is planned.
- **Binding decisions:** `DECISIONS.md`. Do not reopen any decision in it.
- **Specification:** `docs/spec/`, entered through `00-index.md`.
- **Design:** `docs/design/`, covering `ai/`, `flows/`, `components/` and `ux/`.
- **Plans:** `plans/`. The unit format is defined in `plans/FORMAT.md`.
- **Notion is input only.** Where Notion and this repo disagree, the repo wins (D-54).
- Do not read `CLAUDE.md` or memory.
- Never open, print, copy or commit `.env` or any secret.

## Git

- Commit in only-mode, naming every path explicitly on both commands:
  - `git -C <repo> add -- <paths>`
  - `git -C <repo> commit -m "<msg>" -- <paths>`
- Start the message with the wave/P prefix from your brief, and end it with this trailer line:
  `Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>`
- Banned: `git add -A`, `git add .`, `git commit -a`, stash, reset, and `cd`. Use absolute paths, `git -C`, or `npm --prefix`.
- **Never push.** `.claude/settings.json` denies it (D-64), and the founder pushes.
- Other agents commit to the same superproject index at the same time. Never stage a path outside your WRITES.
- If git reports `index.lock`, sleep 3 seconds and retry, up to 5 times. Never delete the lock file.
- Commit after each coherent unit, or at roughly 10 files or 400 lines, whichever comes first. Never commit a red build.

## Content

- User-facing copy contains no em dashes (U+2014) and no en dashes (U+2013).
- Every docs file stays at or under 25KB.
- Never write `DECISIONS.md`; only the orchestrator does. Report your decisions in your final output instead.
- If you were stopped and restarted:
  - First inspect `git status` and `git log` for your WRITES paths.
  - Continue from what is already there, and don't redo work that is committed.
  - Never discard uncommitted work without looking at it first.
- When something is reversible, pick a sensible default and report it. Escalate to the orchestrator only when the choice is irreversible.
