---
id: RPT-003
title: Release workflow masks npm publish failures as success
type: finding
severity: medium
status: triaged
created: 2026-10-31
triaged: 2026-10-31
task-id: TSK-003
---

## Observed

`.github/workflows/release.yml:49`:

```yaml
run: npm publish --provenance --access public || echo "Publish skipped (no new version or already published)"
```

Any non-zero exit from `npm publish` — expired/revoked `NPM_TOKEN`, provenance/OIDC failure, registry 5xx, a `package.json` validation error — is swallowed and the step goes green. semantic-release has already created the git tag and GitHub release in the previous step, so the result is a GitHub release with no matching npm version and no failed run to alert anyone. The `docs` job then also deploys as if the release shipped.

## Reproduction

Static: the `|| echo ...` makes the step's exit code always 0 regardless of what `npm publish` returns. Locally: `sh -c 'false || echo "Publish skipped"'; echo $?` prints `0`.

## Fix direction

Only tolerate the "already published" case: e.g. compare `npm view mochila-ts@$(node -p "require('./package.json').version") version` before publishing and skip only when it exists, otherwise let `npm publish` fail the job. (Alternatively let `@semantic-release/npm` publish.) Touches `.github/workflows/*`, so it needs maintainer sign-off.
