# ESLint Configuration

## Configuration File

**IMPORTANT**: The project uses ESLint 9 flat config format.

- **File location**: `eslint.config.mjs` (NOT `.eslintrc.js`)
- **Format**: ESLint 9 flat config (modern format)

## Plugins

- `@typescript-eslint` - TypeScript linting
- `simple-import-sort` - Automatic import sorting
- `tsdoc` - TSDoc syntax validation
- `prettier` - Code formatting integration

## Rules

```javascript
{
  'prettier/prettier': 'error',
  'simple-import-sort/imports': 'error',
  'simple-import-sort/exports': 'error',
  'tsdoc/syntax': 'warn',
}
```

## Parser Configuration

- Parser: `typescript-eslint`
- Project reference: `./tsconfig.json`
- Globals: Node.js + ES2021

## Running ESLint

```bash
pnpm lint                    # Check for errors
pnpm exec eslint --fix src/  # Auto-fix issues
```

## Pre-commit Hook

Husky pre-commit hook automatically runs:
- ESLint with `--fix` flag
- Prettier with `--write` flag

This ensures all committed code follows project standards.
