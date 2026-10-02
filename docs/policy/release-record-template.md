# Release record template

Copy this into the pull request or tag message for each release. All eight fields come from `docs/spec/21-open-source-governance.md`. See [releases.md](releases.md) for the policy. Write "none" for a field that does not apply.

```
Release: <repo> vX.Y.Z   or   superproject status-YYYY-MM
Date:
Cut by (maintainer):
protocol_version: <0.1 or other>
Submodule pointers (superproject only): can_server <sha>, can_app <sha>, can_gallery <sha>, can_policy <sha>

1. What changed
   <plain summary, linked pull requests>

2. Which problem it addresses
   <public problem or issue it serves>

3. Evidence that it works
   <tests, verify output, review, simulation or field evidence>

4. Known limitations
   <what it does not do yet>

5. Security and privacy implications
   <new data, permissions, exposure; "none" only if checked>

6. Migration requirements
   <schema migrations, config changes, client regeneration>

7. Rollback procedure
   <revert pointer bump, redeploy previous tag; down migration path if any>

8. Contributors recognized
   <names or handles, with consent where needed>
```
