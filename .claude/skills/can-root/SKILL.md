---
name: can-root
description: Work on the CAN superproject wiring: submodules, .gitmodules, pointer bumps, bare sibling remotes, root README and contributor docs, scripts/verify-all.sh, and the proposed night-run settings. Use when adding or bumping a submodule or editing root-level files.
---

# CAN superproject (root)

Only the root owner writes `.gitmodules` and pointer bumps. Area agents commit inside their own submodule and never touch the gitlink.

## Layout
- Four submodules, `can_server`, `can_app`, `can_gallery`, `can_policy` (five repos with the superproject), with relative URLs `../<name>.git` in `.gitmodules`.
- Each URL resolves to a bare repo that is a sibling of the superproject directory: `<parent>/<name>.git`.
- Root files: `README.md`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`, `scripts/verify-all.sh`, `scripts/bootstrap.sh`, `.claude/settings.json` (+ README). LICENSE is MIT in all repos (D-49). `settings.json` is active (founder approved, D-64): it denies `git push`, so pushing is a human step.

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
Remotes: `origin` is GitHub (org `community-action-network-oss`); submodules also keep `local`, the old bare mirror. `can_policy` has no GitHub `origin` yet (only `local`), so its pointer is not resolvable by remote clones until one is added. Push the submodule's main first (`git -C <root>/<submodule> push origin main`), then the superproject, so the pointer is resolvable by clones. Pushing main is a human or morning step; night runs never push.

## Fresh-clone check
```sh
git clone --recurse-submodules git@github.com:community-action-network-oss/community_action_network_oss.git <scratch>/clonetest   # local mirror clones need -c protocol.file.allow=always
git -C <root> submodule foreach git status --porcelain   # must be empty
```
The clone path works because submodule URLs are relative to the superproject URL.

## Dev
`npm start` at the root runs `scripts/dev.mjs` (Node stdlib only): Docker DB, then server, gallery and app with prefixed logs.

## Setup
`scripts/bootstrap.sh` is the one-command setup; `--check` only reports tool versions and what would run, changing nothing. Other flags: `--no-docker`, `--verify`.

## Verify
`scripts/verify-all.sh` runs `npm run verify` in each submodule that has `node_modules` (can_policy runs whenever it has a `package.json`, and needs `node_modules` only if it declares dependencies), plus the plans, spec, constitution and design checkers. Flags: `--docs-only` (no docker or npm, doc and plan checks only), `--skip-server` (skip can_server and its docker), `--e2e`. Exit is non-zero on any failure.

## Tips
- `node plans/tools/corpus.mjs catalog` gives a machine-readable corpus view. `corpus.mjs set ... commits=` needs an inline JSON array: `commits=["sha"]`.
- Night branches stack on the newest unmerged night branch.
- The machine may be offline: add no npm deps (see the nodemailer DNS trap in the server skill).
- zsh does not word-split path variables: hold several paths in an array (`paths=(a b)`, `"${paths[@]}"`).

## Rules
- Do not edit `DECISIONS.md`, `docs/**`, `plans/**` from here.
- Commit in only-mode with explicit paths. No `git add -A`.
- No em or en dashes in user-facing copy.
