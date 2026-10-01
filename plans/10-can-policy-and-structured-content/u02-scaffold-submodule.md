---
id: "10-u02"
plan: "10"
title: "Scaffold can_policy and add it as the fifth submodule"
repo: "."
area: can-root
model: sonnet
est_hours: 1.2
priority: 2
depends_on: ["10-u01"]
writes: ["can_policy/**",".gitmodules","scripts/verify-all.sh",".claude/skills/can-root/SKILL.md",".claude/skills/can-policy/SKILL.md"]
reads: [".gitmodules","scripts/verify-all.sh"]
spec: ["docs/design/components/can-policy.md","docs/design/ai/policy-pack.md","docs/adr/0009-can-policy-repo.md","docs/design/components/server.md"]
verify: ["git submodule status can_policy","bash scripts/verify-all.sh","node plans/tools/corpus.mjs lint"]
founder_gate: false
defaults: "If the bare sibling or the GitHub remote is unreachable, build everything locally with the sibling bare repo only, record `origin` as a TODO in the commit message, and do not block."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
A cloneable `can_policy` repository with license, README and the planned layout, registered as the fifth submodule with a relative URL, wired into `scripts/verify-all.sh`, and covered by a new area skill so later can-policy units can be briefed from the unit file plus that skill.

## Steps
1. Follow the "Adding a submodule over an existing repo" procedure in `.claude/skills/can-root/SKILL.md`: `git init --bare -b main <parent>/can_policy.git`; create the working tree `can_policy/` in the superproject with `git init -b main`, add remote `origin` (GitHub, from 10-u01) and `local` (`../../can_policy.git`).
2. Inside `can_policy/` create: `LICENSE` (MIT, `Copyright (c) 2026 Community Action Network contributors`), `README.md` (what a policy pack is, the layout table copied in short form from docs/design/components/can-policy.md, how to propose a change as a PR, link to docs/design/ai/amendment-loop.md, statement that all examples are fictional or synthetic and contain no real people), `CHANGELOG.md` (Keep-a-changelog header, `Unreleased` only), `.gitignore` (node_modules, dist, .tmp), `.editorconfig`.
3. Create the empty layout directories with a `.gitkeep` each, exactly: `packs/base`, `packs/constitution`, `packs/jurisdictions`, `content-schemas`, `decision-points`, `simulation/personas`, `simulation/seeds`, `ratifications`, `ci`, `tools`.
4. Add a minimal `package.json` (name `can_policy`, `private: true`, `type: module`, engines node >=24, script `verify` that exits 0 with the line "no checks yet"; 10-u03 replaces it). Commit in can_policy and push `main` to both remotes (push is allowed here because this is repo bootstrap, same as the other submodules); if GitHub is unreachable push to `local` only.
5. From the superproject: `git submodule add ../can_policy.git can_policy`, so `.gitmodules` gains `[submodule "can_policy"]` with `url = ../can_policy.git`. Commit `.gitmodules` and the gitlink in only-mode.
6. Update `scripts/verify-all.sh`: add `can_policy` to the submodule loop. The existing rule skips a submodule without `node_modules`; for can_policy run `npm run verify` when `package.json` exists and require `node_modules` only when `package.json` declares dependencies or devDependencies (check with `node -e`), so a stdlib-only phase is never skipped silently. Keep the rest of the script unchanged.
7. Edit `.claude/skills/can-root/SKILL.md`: layout section now lists five submodules (add can_policy and its relative URL), and verify section mentions can_policy. Keep the file under its current style.
8. Create `.claude/skills/can-policy/SKILL.md` (front matter `name: can-policy`, `description: Work on can_policy, the community-legislated policy pack repo of CAN ...`). Sections: Layout (table from the README), Commands (`npm run verify`, later `npm run eval`, `npm run replay`, `npm run build:pack`), Invariants (every example fictional or synthetic and containing no real person, no live URLs to real incident data; no em or en dashes in user-facing copy; stdlib plus pinned `ajv` and `yaml` only once 10-u03 lands; pack hashes only via `tools/pack-hash.mjs`; `manifest.json` and `release.json` are generated, never hand-edited; ratification records are append-only; protected-core rules are never edited from here), Single-owner paths (`manifest.json`, `release.json`, `ratifications/**`), Traps (CRLF is normalised before hashing, sort order is byte order, tests that read `../docs` skip with an explicit reason when the superproject is absent).
9. Run `bash scripts/verify-all.sh` and confirm can_policy appears as PASS and the plans lint is green.

## Acceptance
- `git clone --recurse-submodules` of the superproject checks out `can_policy` (fresh-clone check from the can-root skill).
- `scripts/verify-all.sh` runs can_policy verify and reports it; a can_policy without dependencies is not reported as SKIP.
- `LICENSE` text is MIT with the exact holder string `Community Action Network contributors`.
- The can-policy skill exists and lists the single-owner paths.

## Out of scope
- Pack format, schemas and CI (10-u03).
- Any content: rules, schemas, prompts (later units).
- Pointer bumps after later can_policy commits (the orchestrator does those).
