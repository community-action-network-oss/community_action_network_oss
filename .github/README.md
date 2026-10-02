# GitHub setup (for the founder)

Nothing in this folder is active until it is pushed, and none of it changes settings or labels by itself.

## Labels
`labels.yml` lists the set. Create them yourself, one at a time, for example:

```
gh label create bug --color d73a4a --description "Something does not work" --repo community-action-network-oss/community_action_network_oss
```

Not run by any agent. Repeat per line of `labels.yml`.

## Branch protection
On `main`: require a pull request, require human approval, require review from Code Owners (after filling in `CODEOWNERS`), require the CI checks from the workflow files once they exist, disallow force pushes.

## Security reporting
`ISSUE_TEMPLATE/config.yml` has no contact links. After you enable private vulnerability reporting, add a link and update `SECURITY.md`.

## Check
`node scripts/check-github.mjs` validates these files. `node scripts/check-github.mjs --self-test` proves it fails on broken input.

New contributors are pointed to [docs/contributing/README.md](../docs/contributing/README.md).
