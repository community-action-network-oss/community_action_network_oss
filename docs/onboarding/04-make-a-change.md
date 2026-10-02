# 04 Make a change

## Where the change goes

- Specs, plans, docs and root files: the superproject.
- Code: the submodule's own repository (`can_server`, `can_app`, `can_gallery` or `can_policy`). Fork it, work in your fork and open the pull request against that repo.

Full steps are in the Submodule workflow section of [CONTRIBUTING.md](../../CONTRIBUTING.md).

## The loop

```sh
git switch -c my-change-13-u18
# edit, staying inside the unit's `writes` list
npm --prefix can_app run verify        # the repo you touched; or the unit's verify commands
bash scripts/verify-all.sh --docs-only # quick root check for docs changes
git add -- path/one path/two          # name each path
git commit -m "13-u18 add synthetic archive records" -- path/one path/two
```

Fictional examples only. Never commit secrets or real personal data.

## Rules that catch people

- Small, focused commits. Never commit a red build.
- No em dashes or en dashes in user-facing copy.
- Do not hand-edit generated files (`openapi/openapi.json`, `drizzle/`, `src/api/schema.d.ts`). Regenerate them: the server owns the contract, then the app regenerates its client.
- Do not edit a unit's `status`, and do not write `DECISIONS.md`.
- **Submodule pointer rule:** a pointer bump (the superproject recording a new submodule commit) is its own superproject pull request, made by a maintainer after the submodule change has merged. Do not bundle a bump into your change.
- Never push to someone else's branch or to `main`.

## Pull request

The [template](../../.github/PULL_REQUEST_TEMPLATE.md) asks for the unit id, what changed and why, pasted verify output and a short checklist.

## AI disclosure

If an AI tool wrote or shaped any part of your change, say so in the template: tool, model if known, how you used it, what you verified yourself and what you are unsure of. You remain accountable and must be able to explain the change in your own words. AI output is untrusted until you have tested it. Bulk or unreviewed AI pull requests may be closed. The rule is in [the AI contribution policy](../spec/22-ai-contribution-policy.md); paid tools are never required.

Next: [05 Without code](05-without-code.md).
