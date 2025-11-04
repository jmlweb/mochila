# AGENTS.md - AI Guide for mochila-ts

This guide helps AI tools understand how to work effectively with the mochila-ts codebase.

## Project Overview

**mochila-ts** is a lightweight, zero-dependency TypeScript utility library providing 80+ composable functions for common programming tasks. See [README.md](./README.md) for full description.

### Core Philosophy
- **Data-last pattern**: Functions take configuration/predicate first, data last → enables easy composition
- **Currying support**: Functions support partial application for functional programming
- **Type-safe**: Full TypeScript support with proper generics and type inference
- **Composition-friendly**: Designed to work seamlessly with `pipe()` and function composition

## Architecture & Key Patterns

### Data-Last Currying
Every function follows this pattern:
```typescript
// Configuration/predicate FIRST, data LAST
export const filter =
  <V>(fn: (x: V) => boolean) =>     // Step 1: Predicate
  <T extends V>(source: ReadonlyArray<T>) =>  // Step 2: Data
    source.filter(fn) as T[];

// Usage: filter(isEven)([1,2,3,4,5]) ✓ (not filter([1,2,3,4,5], isEven))
```

### Module Structure
Each utility follows this pattern:
```
src/
├── {utilityName}/
│   ├── {utilityName}.ts      # Implementation
│   ├── {utilityName}.test.ts # Tests (85%+ coverage required)
│   └── index.ts              # Exports: export * from './{utilityName}' or export { name } from './{utilityName}'
└── index.ts                  # Main entry: star exports all utilities
```

**Note:** Module index files may use either `export * from` or named `export { } from` patterns depending on the module's needs.

### Type Organization
Shared types live in `src/types/`:
- `function.ts` - Function utilities (AnyFn, Constant)
- `helpers.ts` - Type helpers
- `array/`, `string.ts`, `number.ts`, `boolean.ts`, `object.ts` - Domain-specific types
- `extends.ts` - Type constraint utilities

## Codebase Navigation

### Key Entry Points
| File | Purpose |
|------|---------|
| `src/index.ts` | Main entry - re-exports all 80+ utilities (note: `reduceRight` exists but is currently missing from exports - see CODE_REVIEW.md) |
| `package.json` | Project metadata, scripts, exports config |
| `tsconfig.json` | TypeScript configuration (strict mode, ES2020, noUncheckedIndexedAccess, Bundler resolution) |
| `tsup.config.ts` | Build configuration (ESM + CJS + .d.ts) |
| `jest.config.js` | Test configuration (85% coverage thresholds) |

### Finding Things
- **Utilities**: `src/{utilityName}/` (e.g., `src/filter/filter.ts`)
- **Utilities by category**: Check JSDoc `@category` tags in implementation
- **Type definitions**: `src/types/` directory
- **Tests**: `src/**/*.test.ts` files
- **Documentation**: `README.md`, [TypeDoc online](https://jmlweb.github.io/mochila/modules.html)

## Development Workflow

### Available Scripts
```bash
pnpm run build          # Build ESM, CJS, and .d.ts (output: dist/)
pnpm run dev           # Watch mode for development
pnpm run test          # Run Jest tests
pnpm run test:watch    # Watch mode for tests
pnpm run test:coverage # Generate coverage report
pnpm run lint          # ESLint check
pnpm run doc           # Generate TypeDoc documentation
```

### Build Process
Output formats: ESM (`.mjs`), CJS (`.js`), TypeScript (`.d.ts`) with source maps. Build outputs to `dist/` directory. See `tsup.config.ts` for configuration.

### Testing
Coverage thresholds: 85% (lines/functions/statements), 50% (branches). See `src/**/*.test.ts` files for test patterns. Tests must pass before commit with coverage maintained.

## Working with Code

### Adding a New Utility
1. Create directory: `src/{utilityName}/`
2. Implement in `{utilityName}.ts` with JSDoc including `@category`, `@example`, `@param`, `@returns`
3. Create `index.ts` with `export * from './{utilityName}'` or `export { name } from './{utilityName}'` as needed
4. Write tests in `{utilityName}.test.ts` (aim for 85%+ coverage)
5. Add export to `src/index.ts` in alphabetical order
6. Run: `pnpm run test` and `pnpm run build`

### Modifying Existing Utilities
1. Update implementation in `src/{utilityName}/{utilityName}.ts`
2. Update tests in `{utilityName}.test.ts` - ensure coverage maintained
3. Update JSDoc if behavior changed
4. Run: `pnpm run test` and `pnpm run lint`

### Fixing Bugs
- Reference [CODE_REVIEW.md](./CODE_REVIEW.md) for known issues
- Critical bugs: subscription memory leak, division by zero validation, throttle undefined return
- Write test first that reproduces the bug, then fix

## Code Quality Standards

### TypeScript
- **Strict mode**: Required (checked in tsconfig.json)
- **Imports**: Must be sorted alphabetically (enforced by ESLint)
- **No explicit `any`**: Avoid unless absolutely necessary

### Testing
- **Coverage**: 85% minimum for lines, functions, statements
- **Branch coverage**: 50% minimum
- **Test pattern**: Describe functionality, use clear assertions
- **Run before commit**: `pnpm run test:coverage`

### Code Style
- **Formatter**: Prettier with 2-space tabs, single quotes, trailing commas
- **Linter**: ESLint with @typescript-eslint, simple-import-sort, and eslint-plugin-tsdoc
- **Check before commit**: `pnpm run lint`
- See [.eslintrc.js](./.eslintrc.js) and [.prettierrc.json](./.prettierrc.json)

### Documentation
- **JSDoc required** for all functions
- **Required tags**: `@category`, `@example`, `@param`, `@typeParam`, `@returns`
- **Examples**: Show data-last usage pattern
- **Generated by**: TypeDoc (config: `typedoc.json`)

## Known Issues & Gotchas

See [CODE_REVIEW.md](./CODE_REVIEW.md) for comprehensive review. Critical items:

1. **Subscription.unsubscribe()** - Memory leak in unsubscribe implementation
2. **Division by zero** - `divide()` lacks zero validation
3. **Throttle undefined** - `throttle()` may return undefined in edge cases
4. **Missing export** - `reduceRight` exists but is not exported in `src/index.ts` (see CODE_REVIEW.md issue #11)
5. **README example** - LRUCache example uses `new LRUCache()` but should be `LRUCache()` (factory function, not constructor)

## Quick Reference

### Key Configuration Files
| File | Purpose |
|------|---------|
| `tsconfig.json` | TypeScript strict mode configuration |
| `tsup.config.ts` | Build output formats and settings |
| `jest.config.js` | Test framework and coverage settings |
| `.eslintrc.js` | Linting and code quality rules |
| `.prettierrc.json` | Code formatting preferences |
| `package.json` | Project metadata and exports |

### Package Exports
```json
{
  ".": {
    "require": "./dist/index.js",      // CommonJS
    "import": "./dist/index.mjs",      // ES Module
    "types": "./dist/index.d.ts"       // TypeScript
  }
}
```

### Common Issues & Solutions
| Issue | Solution |
|-------|----------|
| Build fails | Check `tsconfig.json` strict mode, no explicit `any` |
| Tests fail coverage | Add test cases for uncovered branches |
| Lint errors | Run `pnpm run lint` and check sorting/formatting |
| Type errors in pipe() | Ensure proper generic type inference in function signatures |
| Missing docs | Add JSDoc with `@category`, `@example`, required tags |

## Release Process

Automated via GitHub Actions using semantic-release:
- **Trigger**: Push to `main` branch
- **Version**: Semantic versioning (MAJOR.MINOR.PATCH)
- **Process**: Test → Build → Release → Deploy docs
- **Artifacts**: npm package, GitHub release, TypeDoc deploy

See `release.config.cjs` for semantic-release configuration.

## Resources

- [README.md](./README.md) - Project overview and philosophy
- [CODE_REVIEW.md](./CODE_REVIEW.md) - Known issues and improvement areas
- [TypeDoc Documentation](https://jmlweb.github.io/mochila/modules.html) - Full API reference
- `package.json` - Dependencies, scripts, exports
- Source code comments - JSDoc and inline explanations
