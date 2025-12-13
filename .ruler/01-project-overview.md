# mochila-ts AI Guide

80+ composable TypeScript utilities using **data-last curried pattern** for composability.

## Quick Commands

```bash
pnpm install && pnpm test    # Setup & verify
pnpm test:coverage           # Check coverage (85%+ required)
pnpm lint                    # Check formatting & types
pnpm build                   # Build all formats (ESM/CJS/.d.ts)
```

## Project Structure

```
src/
├── {utilityName}/
│   ├── {utilityName}.ts      # Curried function implementation
│   ├── {utilityName}.test.ts # Tests (85%+ lines/functions/statements)
│   └── index.ts              # Re-exports
├── types/                    # Shared types (guards, constraints)
└── index.ts                  # Main exports (alphabetical order)
```
