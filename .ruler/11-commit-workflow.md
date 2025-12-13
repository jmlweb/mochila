# Commit Workflow

## Before Committing

1. **Tests & lint pass:**
   ```bash
   pnpm test:coverage && pnpm lint
   ```

2. **What gets committed:**
   - Source files only (no `dist/`, coverage reports)
   - Tests must maintain 85%+ coverage

## Commit Message Format (Conventional Commits)

```
feat: add new utility function name
fix: resolve type inference bug in filter
docs: clarify data-last pattern in JSDoc
```

### Commit Types

- `feat:` - New feature (MINOR version bump)
- `fix:` - Bug fix (PATCH version bump)
- `docs:` - Documentation
- `style:` - Code style (formatting)
- `refactor:` - Code refactoring
- `perf:` - Performance improvement
- `test:` - Test additions/changes
- `chore:` - Build, dependencies, tooling
- `BREAKING CHANGE:` - Breaking change (MAJOR version bump)

## Pre-commit Hooks

Husky pre-commit hook automatically:
- Runs ESLint fix and Prettier write on staged TypeScript files
- Prevents committing unformatted code
- Validates commit message format (conventional commits)

## Semantic Release

Automated via GitHub Actions:
- Push to `main` triggers release process
- Auto-determines version bump based on commit messages
- Creates GitHub release
- Publishes to npm
- Deploys docs to GitHub Pages
