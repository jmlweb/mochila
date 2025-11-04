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

## Data-Last Curried Pattern

All functions follow: **config/predicate FIRST → data LAST**

```typescript
// ✓ Correct pattern
export const filter = <V>(predicate: (x: V) => boolean) =>
  <T extends V>(arr: ReadonlyArray<T>): T[] =>
    arr.filter(predicate) as T[];

// Usage: compose with pipe()
pipe(data, filter(isEven), map(double), sort(ascending))
```

**Benefits:**
- Partial application: `const filterEven = filter(isEven)`
- Composition: Works naturally with `pipe()` and function composition
- Type safety: Generics infer correctly without explicit type annotations

**Common pattern mistakes to avoid:**
- ❌ Data-first: `filter(array, predicate)` - breaks composition
- ❌ Forgetting `<T extends V>` - loses type narrowing
- ❌ `as T[]` without cast - unsafe with covariance

## Code Standards (Strict Mode)

| Rule | Why | Example |
|------|-----|---------|
| No explicit `any` | Use generics/`unknown` | `<T>(x: T) => T` not `(x: any)` |
| Imports alphabetical | ESLint enforces `simple-import-sort` | `import { a } from 'x'` before `import { b } from 'y'` |
| JSDoc on exports | Required for documentation | `/** @category Array */ export const filter...` |
| 85%+ test coverage | Branches min 50% | Run `pnpm test:coverage` before commit |
| Curried with generics | Type inference must work | Return function types properly constrained |

## Adding a Utility (Step-by-Step)

**1. Create structure:**
```bash
mkdir -p src/{name}
touch src/{name}/{name}.ts src/{name}/{name}.test.ts src/{name}/index.ts
```

**2. Implement with proper typing:**
```typescript
/**
 * Brief description of what it does.
 *
 * @category Array|String|Function|etc
 * @example
 * ```
 * myFn(config)(data) // show actual usage
 * ```
 * @param config - First parameter description
 * @param data - Second parameter description
 * @returns Return value type and meaning
 * @typeParam V - Input value type
 * @typeParam T - Output/constrained type
 */
export const myFn = <V>(config: SomeConfig) =>
  <T extends V>(data: ReadonlyArray<T>): T[] => {
    // implementation
  };
```

**3. Write tests (85%+ coverage required):**
```typescript
describe('myFn', () => {
  test('handles basic case', () => {
    expect(myFn(config)([1, 2, 3])).toEqual([...]);
  });
  test('handles edge case: empty array', () => {
    expect(myFn(config)([])).toEqual([]);
  });
  test('maintains type safety', () => {
    const result: number[] = myFn(config)([1, 2]); // ✓ Type checks
  });
});
```

**4. Export from module & main:**
```typescript
// src/{name}/index.ts
export * from './{name}';

// src/index.ts (add in alphabetical order)
export * from './{name}';
```

**5. Verify:**
```bash
pnpm test:coverage  # Must reach 85%
pnpm lint           # Must pass
pnpm build          # Must produce ESM/CJS/DTS
```

## Type System

**Shared types in `src/types/`:**
- `array/` - Array constraints and helpers
- `extends.ts` - Type constraint utilities
- `function.ts` - Function types (AnyFn, Constant)
- `helpers.ts` - Generic helpers

**Type guard patterns (for `is/` utilities):**
```typescript
export const isArray = (x: unknown): x is unknown[] => Array.isArray(x);
```

**Generic constraints (common pattern):**
```typescript
<T extends Record<string, unknown>>  // Object with any keys
<K extends string | number>          // String or numeric keys
<T extends readonly unknown[]>       // ReadonlyArray
```

**Intentional `any` type exceptions:**
The codebase has strict `no explicit any` enforcement, with one documented exception:
- `AnyFn` type in `src/types/function.ts` - Uses `(...args: any[]) => any` as a base utility type for general function composition where strict typing is intentionally relaxed for maximum flexibility in `pipe()` and similar utilities. This is necessary to allow composition of functions with different signatures. Alternative: use `unknown[]` with runtime type guards if stricter typing is needed.

## Before Committing

1. **Tests & lint pass:**
   ```bash
   pnpm test:coverage && pnpm lint
   ```

2. **Commit message format** (conventional commits):
   ```
   feat: add new utility function name
   fix: resolve type inference bug in filter
   docs: clarify data-last pattern in JSDoc
   ```
   - Husky pre-commit hook auto-formats code
   - Commitlint validates message format

3. **What gets committed:**
   - Source files only (no `dist/`, coverage reports)
   - Tests must maintain 85%+ coverage

## Common AI Mistakes to Avoid

| Mistake | Fix |
|---------|-----|
| Using `any` type | Use generics: `<T>(x: T) => T` |
| Data-first functions | Always: config → data (curried) |
| Missing JSDoc tags | Include: `@category`, `@example`, `@param`, `@returns` |
| Unsorted imports | Run: `pnpm exec eslint --fix src/` |
| Type inference breaks | Use `extends` constraints: `<T extends V>` |
| Test coverage <85% | Add edge cases: empty arrays, null, type narrowing |

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Tests fail or coverage low | `pnpm test:coverage` → add test cases |
| Lint/format errors | `pnpm exec eslint --fix src/` (auto on commit) |
| Type errors in build | Check `tsconfig.json` strict mode; avoid `any` |
| Test type inference | Ensure `<T extends V>` and proper return types |
| Commit rejected | Message must be: `feat:`, `fix:`, `docs:`, etc. |

## Key Files Reference

| File | Purpose |
|------|---------|
| `src/index.ts` | Main exports (alphabetical) |
| `tsconfig.json` | TypeScript strict mode (ES2020, bundler resolution) |
| `.eslintrc.js` | Linting (@typescript-eslint, tsdoc, import-sort) |
| `.prettierrc.json` | Formatting (2-space, single quotes, trailing commas) |
| `jest.config.js` | Test config (85% coverage threshold) |
| `.husky/` | Pre-commit hooks (format + lint) |
| `commitlint.config.cjs` | Commit message validation |

See [DEVELOPMENT.md](./DEVELOPMENT.md) for architecture details and advanced patterns.
