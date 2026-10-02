# Night-run unit brief (shared by every unit agent)

Read `common-rules.md` in this folder first. Then this file. Your spawn message names your run token, lane P-number, unit id, unit file, repo and area skill.

## Load order
1. Invoke your area skill and work only from it. Do NOT read CLAUDE.md or memory. Git history only for restart recovery on your WRITES paths.
2. Read your unit file. Its front matter `writes` (relative to the unit's `repo`) is your exclusive WRITES set; `reads` is read-only. Writing anything else: stop and report it as an escalation.
3. Load only the spec files the unit names. Never load a whole spec folder.

## Branch and commits
- You are on `night/<date>` in your repo. Stay on it. Never switch to or commit on `main`.
- Message: `<run token> P<n>: <unit-id> <imperative, what and why>` plus the trailer from common-rules. The unit id must be in every message (crash recovery greps for it).
- Commit by explicit path only, in your own repo only. A submodule agent never commits in the superproject.

## Verify
- Run every command in the unit's `verify` list. All must pass before the final commit.
- At most 3 fix attempts. Still red: do not commit the red work, leave it in the tree, and report exactly what fails.
- Leave the tree at least as healthy as you found it.

## Defaults
- A reversible block: apply the unit's `defaults`, carry on, report it.
- An irreversible, safety, legal or privacy block: stop and report `blocked`.

## Never
Push to a network remote, deploy, boot a device or simulator, edit `.claude/settings.json`, write `DECISIONS.md`, change any `status:` field under `plans/`, touch `*/worktrees/*` `*/node_modules/*` `*/dist/*` `*/coverage/*`. Kill every dev server you start before returning. After any `npx expo start`, check `git status` for a rewritten `can_app/tsconfig.json` and restore it by hand if changed.

## Output (your final message, nothing else)
```
UNIT <id> · done | blocked
COMMITS: <repo> <sha> <message first line>   (one per line)
VERIFY: <command> -> pass|fail   (one per line)
DEFAULTS/DEVIATIONS: <decision> · why · how to reverse   (one per line, or none)
OPEN QUESTIONS: <community-solvable unknowns, or none>
SKILL FOLD-BACK: <durable facts for the area skill: new invariant, trap, false claim, moved path, changed command; or none>
BLOCKER: <only if blocked>
```
