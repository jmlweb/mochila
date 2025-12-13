# Adding a Utility (Step-by-Step)

## 1. Create Structure

```bash
mkdir -p src/{name}
touch src/{name}/{name}.ts src/{name}/{name}.test.ts src/{name}/index.ts
```

## 2. Implement with Proper Typing

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

## 3. Write Tests (85%+ Coverage Required)

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

## 4. Export from Module & Main

```typescript
// src/{name}/index.ts
export * from './{name}';

// src/index.ts (add in alphabetical order)
export * from './{name}';
```

## 5. Verify

```bash
pnpm test:coverage  # Must reach 85%
pnpm lint           # Must pass
pnpm build          # Must produce ESM/CJS/DTS
```
