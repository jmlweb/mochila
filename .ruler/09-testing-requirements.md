# Testing Requirements

## Coverage Minimum

- **85%+ test coverage** required (lines, functions, statements)
- **50% minimum** for branches
- Run `pnpm test:coverage` before commit

## Test Pattern

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

## Edge Cases to Test

- Empty arrays
- Null/undefined values
- Type narrowing
- Boundary conditions

## Verification

```bash
pnpm test           # Run all tests
pnpm test:watch     # Watch mode
pnpm test:coverage  # Coverage report (must pass 85% threshold)
```
