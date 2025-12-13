# Data-Last Curried Pattern

All functions follow: **config/predicate FIRST → data LAST**

```typescript
// ✓ Correct pattern
export const filter = <V>(predicate: (x: V) => boolean) =>
  <T extends V>(arr: ReadonlyArray<T>): T[] =>
    arr.filter(predicate) as T[];

// Usage: compose with pipe()
pipe(data, filter(isEven), map(double), sort(ascending))
```

## Benefits

- Partial application: `const filterEven = filter(isEven)`
- Composition: Works naturally with `pipe()` and function composition
- Type safety: Generics infer correctly without explicit type annotations

## Common Pattern Mistakes to Avoid

- ❌ Data-first: `filter(array, predicate)` - breaks composition
- ❌ Forgetting `<T extends V>` - loses type narrowing
- ❌ `as T[]` without cast - unsafe with covariance
