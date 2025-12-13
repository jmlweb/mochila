# Import Sorting

## Requirements

- **Imports alphabetical**: ESLint enforces `simple-import-sort`
- Example: `import { a } from 'x'` before `import { b } from 'y'`

## ESLint Rules

- `simple-import-sort/imports`: error
- `simple-import-sort/exports`: error

## Auto-Fix Command

If you have unsorted imports, run:

```bash
pnpm exec eslint --fix src/
```

This will automatically sort all imports alphabetically.
