# Code Review - Improvement Points

## Executive Summary

This review identifies areas for improvement in the `mochila-ts` library, a collection of TypeScript utilities focused on functional composition and "data-last" design. The project follows good general practices, but there are significant opportunities for improvement in critical areas such as error handling, input validation, and bug fixes.

---

## 🔴 Critical (Require immediate attention)

### 1. Bug in Subscription.unsubscribe()

**Location:** `src/subscription/subscription.ts:27-28`

**Problem:**
The `unsubscribe` method doesn't work correctly. It uses `rejectValues` which returns a new array but doesn't modify the original `subscribers` array.

```typescript
const unsubscribe = (subscriber: Subscriber<V>) =>
  rejectValues([subscriber])(subscribers);
```

**Impact:** Subscribers are never actually removed, causing memory leaks and unexpected behavior.

**Suggested solution:**
```typescript
const unsubscribe = (subscriber: Subscriber<V>) => {
  const index = subscribers.indexOf(subscriber);
  if (index > -1) {
    subscribers.splice(index, 1);
  }
};
```

### 2. Division by zero without validation

**Location:** `src/divide/divide.ts:12`

**Problem:**
The `divide` function doesn't validate division by zero, which silently returns `Infinity` or `-Infinity`.

```typescript
export const divide = (a: number) => (b: number) => a / b;
```

**Impact:** Silent errors that are difficult to debug in production.

**Suggested solution:**
```typescript
export const divide = (a: number) => (b: number) => {
  if (b === 0) {
    throw new Error('Division by zero is not allowed');
  }
  return a / b;
};
```

**Alternative:** Offer a `divideSafe` variant that returns `undefined` or use the Result pattern from the `protect` module.

### 3. Throttle returns potentially undefined value

**Location:** `src/throttle/throttle.ts:26-35`

**Problem:**
The throttle function can return `undefined` on the first call if execution flow is very fast, since `latestResult` has no initial value.

```typescript
export const throttle = <Fn extends AnyFn>(duration: number, fn: Fn) => {
  let isBlocked = false;
  let latestResult: ReturnType<Fn>; // ⚠️ No initial value

  return (...args: Parameters<Fn>) => {
    if (!isBlocked) {
      latestResult = fn(...args);
      isBlocked = true;
      setTimeout(() => {
        isBlocked = false;
      }, duration);
    }
    return latestResult; // ⚠️ Can be undefined
  };
};
```

**Impact:** Unexpected behavior on first invocation.

**Suggested solution:**
```typescript
return (...args: Parameters<Fn>): ReturnType<Fn> => {
  if (!isBlocked) {
    latestResult = fn(...args);
    isBlocked = true;
    setTimeout(() => {
      isBlocked = false;
    }, duration);
  }
  if (latestResult === undefined) {
    return fn(...args);
  }
  return latestResult;
};
```

---

## 🟠 High Priority

### 4. Incorrect documentation in throttle

**Location:** `src/throttle/throttle.ts:1-21`

**Problem:**
The JSDoc documentation for `throttle` is a copy of `debounce` and doesn't correctly describe throttle behavior.

```typescript
/**
 * Limits the rate at which a function can be called.
 *
 * @category Function
 * @category Promise
 * @category Cache
 *
 * @typeParam Fn - The type of the function to be debounced. // ⚠️ says "debounced"
```

**Impact:** Confusion for developers using the library.

**Solution:** Update documentation to reflect actual throttle behavior.

### 5. LRUCache: Inefficient cleanup of expired items

**Location:** `src/lruCache/lruCache.ts:57-64`

**Problem:**
The `deleteExpiredItems` method iterates over all items on every `get`, `set`, and `has` operation, which is unnecessarily O(n).

```typescript
const deleteExpiredItems = () => {
  const now = Date.now();
  for (const [key, item] of items.entries()) {
    if (item.expiration && item.expiration < now) {
      deleteItem(key);
    }
  }
};
```

**Impact:** Performance degradation with large caches.

**Suggested solution:**
- Use a heap/priority queue for items with TTL
- Or implement lazy deletion only in `get` for the specific item
- Or run periodic cleanup instead of on every operation

### 6. Modulo with confusing behavior for negative numbers

**Location:** `src/modulo/modulo.ts:14`

**Problem:**
The `%` operator in JavaScript has confusing behavior with negative numbers (returns `-0` in some cases).

```typescript
modulo(2)(-1) // 0
modulo(-4)(2) // -0
```

**Impact:** Unexpected behavior that can cause subtle bugs.

**Suggested solution:**
Consider implementing true mathematical modulo:
```typescript
export const modulo = (a: number) => (b: number) => ((a % b) + b) % b;
```

### 7. Path: Edge case handling

**Location:** `src/path/path.ts:31-32`

**Problem:**
The case where `keys.length === 0` (empty string) should never occur but is validated. However, cases like paths with double dots (`"a..b"`) are not handled.

```typescript
const keys = key.split('.');
if (keys.length === 0) { // This never happens with split('.')
  return undefined as PathResult<K, O>;
}
```

**Impact:** Unexpected behavior with malformed inputs.

**Suggested solution:**
- Filter empty keys: `const keys = key.split('.').filter(k => k.length > 0);`
- Validate input path

---

## 🟡 Medium Priority

### 8. Missing tests for edge cases

**Test analysis:**
- Total test files: 92
- Configured coverage: 85% (functions, lines, statements), 50% (branches)

**Issues identified:**

#### a) Division (src/divide/divide.test.ts)
```typescript
it('should divide the first argument by the second', () => {
  expect(divide(4)(2)).toEqual(2);
});
```

**Missing cases:**
- Division by zero
- Division of negative numbers
- Division of decimals
- Division resulting in Infinity

#### b) Mathematical operations in general
Missing validation for:
- `NaN` inputs
- `Infinity` inputs
- Overflow/Underflow
- Floating point precision

**Suggested solution:**
Add comprehensive test suites for mathematical edge cases.

### 9. DeepEqual: Circular reference handling

**Location:** `src/deepEqual/makeIsDeepEqual.ts`

**Problem:**
While it optimizes for React (which has circular references in `_owner`), there's no general protection against circular references in arbitrary objects.

```typescript
if (optimizeForReact && key === '_owner' && '$$typeof' in a) {
  // React-specific: avoid traversing React elements' _owner.
  continue;
}
```

**Impact:** Stack overflow with non-React circular objects.

**Suggested solution:**
Implement a `WeakSet` to track visited objects:
```typescript
const internalIsDeepEqual = (
  a: unknown,
  b: unknown,
  depth: number,
  visited = new WeakSet()
): boolean => {
  // ... checks ...
  if (visited.has(a)) return a === b;
  visited.add(a);
  // ... rest of logic
}
```

### 10. Debounce: Potential memory leak

**Location:** `src/debounce/debounce.ts:28-41`

**Problem:**
If `debounce` is called repeatedly without waiting for resolution, the `pending` array can grow indefinitely.

```typescript
return (...args: Parameters<Fn>): Promise<ReturnType<Fn>> => {
  return new Promise((resolve, reject) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      const currentPending = [...pending];
      pending = [];
      // ...
    }, duration);
    pending.push({ resolve, reject }); // ⚠️ Grows unbounded
  });
};
```

**Impact:** Memory leaks in high-usage scenarios.

**Suggested solution:**
Consider a maximum limit of pending promises or implement a cancellation strategy.

### 11. Inconsistencies in exports

**Location:** `src/index.ts:63`

**Problem:**
Missing export for `reduceRight`:
```typescript
export * from './reduce';
export * from './reject';
// export * from './reduceRight'; // ⚠️ Missing this line
```

**Verification:**
```bash
grep -r "reduceRight" src/index.ts
# Not found
```

**Impact:** The `reduceRight` function exists but is not available to library users.

---

## 🟢 Low Priority (Quality improvements)

### 12. Type safety could be improved in some helpers

**Examples:**

#### a) Path type inference
Type inference in `path` is excellent, but could be extended to handle arrays:
```typescript
path('users.0.name')(obj) // Doesn't correctly infer array indices
```

#### b) Flow overloads
The `flow` type has up to 9 overloads, but could benefit from variadic types when they're more mature in TypeScript.

### 13. Missing validation in LRUCache options

**Location:** `src/lruCache/lruCache.ts:44`

**Problem:**
Doesn't validate that `max` is positive or that `ttl` is a valid number.

```typescript
export const LRUCache = <T>({ max, ttl, onRemove }: CacheOptions<T> = {}) => {
  // No input validation
```

**Suggested solution:**
```typescript
export const LRUCache = <T>({ max, ttl, onRemove }: CacheOptions<T> = {}) => {
  if (max !== undefined && (max <= 0 || !Number.isInteger(max))) {
    throw new Error('max must be a positive integer');
  }
  if (ttl !== undefined && ttl <= 0) {
    throw new Error('ttl must be a positive number');
  }
  // ...
```

### 14. Protect: Type assertion could be improved

**Location:** `src/protect/protect.ts:53, 58, 64`

**Problem:**
Extensive use of `as T` which could mask type issues.

```typescript
return value
  .then((data) => ({ success: true, data }))
  .catch((error) => ({ success: false, error })) as T;
```

**Solution:** While complex, an implementation without type assertions could be explored.

### 15. Category documentation

**Problem:**
Some functions have inconsistent categories or multiple categories that don't add value.

**Example:**
```typescript
/**
 * @category Function
 * @category Promise
 * @category Cache  // ⚠️ Not really Cache
 */
```

**Solution:** Review and normalize categories across the library.

### 16. README: Incorrect LRUCache example

**Location:** `README.md:27`

**Problem:**
The example uses `new LRUCache()` but should be just `LRUCache()` (it's not a constructor).

```typescript
const cache = new LRUCache({ // ⚠️ Incorrect
  max: 100,
  ttl: 1000 * 60 * 60 * 24,
});
```

**Should be:**
```typescript
const cache = LRUCache({
  max: 100,
  ttl: 1000 * 60 * 60 * 24,
});
```

---

## 📊 Metrics and Statistics

- **Total modules:** ~80 utilities
- **Code files:** 212 .ts files (excluding tests)
- **Test files:** 92 .test.ts files
- **Test/code ratio:** ~43% (low, should be closer to 100%)
- **Target coverage:** 85% lines, 50% branches
- **TypeScript configuration:** Strict mode ✅
- **Linting:** ESLint with TypeScript ✅

---

## 🎯 Prioritized Recommendations

### Short Term (1-2 weeks)
1. ✅ Fix bug in `Subscription.unsubscribe()`
2. ✅ Add division by zero validation
3. ✅ Fix bug in `throttle` with initial value
4. ✅ Update `throttle` documentation
5. ✅ Add export of `reduceRight` in index.ts
6. ✅ Fix example in README

### Medium Term (1 month)
1. Improve `LRUCache` performance
2. Add protection against circular references in `deepEqual`
3. Implement tests for mathematical edge cases
4. Review and improve input validation in critical functions

### Long Term (3 months)
1. Complete type audit and inference improvements
2. Implement "safe" variants of functions that can fail
3. Normalize documentation and categories
4. Improve test coverage to >90%
5. Consider adding performance benchmarks

---

## 💡 Additional Considerations

### "data-last" philosophy and error handling
The library's functional "data-last" philosophy is excellent for composition, but makes traditional error handling (try-catch) difficult. Consider:

1. Document recommended patterns for error handling
2. Expand use of the `protect` module as a standard pattern
3. Offer `*Safe` variants of functions that can fail

### Performance
Most utilities are lightweight wrappers, but some (like `deepEqual` and `LRUCache`) could benefit from specific optimizations.

### Tree-shaking
The project uses `tsup` and exports everything from a central index. Verify that tree-shaking works correctly in consuming applications.

---

## 🔍 Suggested Tools

1. **Mutation Testing:** Use Stryker to identify gaps in tests
2. **Type Coverage:** Use `type-coverage` to measure real type safety
3. **Bundle Analysis:** Use `bundlephobia` to monitor bundle size
4. **Benchmarks:** Add benchmarks with `benchmark.js` or `tinybench`

---

## Conclusion

`mochila-ts` is a well-structured library with good general TypeScript and testing practices. However, there are critical bugs (subscription, throttle) and important areas for improvement in validation and edge case handling.

**Maximum priority:** Fix the 3 critical bugs identified before the next release.

**General recommendation:** Implement a stricter input validation policy, especially for mathematical operations and functions with side effects.

---

**Review date:** 2025-11-04
**Reviewer:** Claude Code
**Version analyzed:** 1.9.0
