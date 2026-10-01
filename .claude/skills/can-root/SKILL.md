---
name: can-root
description: Work on the CAN superproject wiring: submodules, .gitmodules, pointer bumps, bare sibling remotes, root README and contributor docs, scripts/verify-all.sh, and the proposed night-run settings. Use when adding or bumping a submodule or editing root-level files.
---

# CAN superproject (root)

Only the root owner writes `.gitmodules` and pointer bumps. Area agents commit inside their own submodule and never touch the gitlink.

## Layout
- Submodules `can_server`, `can_app`, `can_gallery`, with relative URLs `../<name>.git` in `.gitmodules`.
- Each URL resolves to a bare repo that is a sibling of the superproject directory: `<parent>/<name>.git`.
- Root files: `README.md`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`, `scripts/verify-all.sh`, `.claude/settings.proposed.json` (+ README). There is no LICENSE (D-27) and no active `settings.json`.

## Adding a submodule over an existing repo
1. `git init --bare -b main <parent>/<name>.git`
2. Inside the submodule working tree, `git remote add origin ../../<name>.git` (a relative remote resolves from the working tree, so it needs two `..`; `../<name>.git` is wrong there), then `git push origin main`.
3. From the root: `git submodule add ../<name>.git <name>`. It adds the existing repo in place and does not clone over it.
4. Commit `.gitmodules`, the gitlink and the area skill in only-mode.

## Pointer bump
```sh
git -C <root> add -- <submodule>
git -C <root> commit -m "<prefix>: bump <submodule>" -- <submodule>
```
Push the submodule's main to its bare repo first (`git -C <root>/<submodule> push origin main`) so the pointer is resolvable by clones. Pushes to network remotes are never done by agents.

## Fresh-clone check
```sh
git clone --recurse-submodules <parent>/community_action_network_oss <scratch>/clonetest
git -C <root> submodule foreach git status --porcelain   # must be empty
```
The clone path works because submodule URLs are relative to the superproject URL.

## Verify
`scripts/verify-all.sh` runs `npm run verify` in each submodule that has `node_modules`, plus the plans, spec, constitution and design checkers. Exit is non-zero on any failure.

## Rules
- Do not edit `DECISIONS.md`, `docs/**`, `plans/**` from here.
- Commit in only-mode with explicit paths. No `git add -A`.
- No em or en dashes in user-facing copy.
