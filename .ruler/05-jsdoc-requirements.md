# JSDoc Requirements

## Required for All Exports

JSDoc on exports is required for documentation.

## Required Tags

- `@category` - Feature area (Array, String, Function, Guard, etc.)
- `@example` - Usage showing data-last pattern
- `@param` - Parameter descriptions
- `@returns` - Return value description
- `@typeParam` - Generic type parameters

## Template

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

## ESLint Rule

- `tsdoc/syntax`: warn - Validates TSDoc syntax
