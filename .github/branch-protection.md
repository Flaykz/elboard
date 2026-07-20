# GitHub branch protection / rulesets

Configure these protections in GitHub repository settings. Workflow files can validate pull requests, but they cannot prevent direct pushes by themselves.

## `main`

- Require a pull request before merging.
- Only allow pull requests from `develop`.
- Require these checks before merge:
  - `Lint, typecheck, build`
  - `Conventional commits`
  - `Validate source branch`
- Block force pushes.
- Block branch deletion.
- Require branches to be up to date before merging.

## `develop`

- Require a pull request before merging.
- Only allow pull requests from work branches:
  - `feature/*`
  - `fix/*`
  - `chore/*`
  - `docs/*`
  - `refactor/*`
  - `test/*`
  - `perf/*`
  - `ci/*`
  - `build/*`
  - `revert/*`
  - `dependabot/*`
- Require these checks before merge:
  - `Lint, typecheck, build`
  - `Conventional commits`
  - `Validate source branch`
- Block force pushes.
- Block branch deletion.
- Require branches to be up to date before merging.
