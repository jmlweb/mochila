# Type System

## Shared Types in `src/types/`

- `array/` - Array constraints and helpers
- `extends.ts` - Type constraint utilities
- `function.ts` - Function types (AnyFn, Constant)
- `helpers.ts` - Generic helpers

## Type Guard Patterns (for `is/` Utilities)

```typescript
export const isArray = (x: unknown): x is unknown[] => Array.isArray(x);
```

## Generic Constraints (Common Pattern)

```typescript
<T extends Record<string, unknown>>  // Object with any keys
<K extends string | number>          // String or numeric keys
<T extends readonly unknown[]>       // ReadonlyArray
```

## Type Inference Requirements

- Type inference must work correctly in generic functions
- Use proper type inference in function signatures
- Use `extends` constraints appropriately
- Test with different type combinations
