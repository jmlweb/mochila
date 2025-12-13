# Common AI Mistakes to Avoid

| Mistake | Fix |
|---------|-----|
| Using `any` type | Use generics: `<T>(x: T) => T` |
| Data-first functions | Always: config → data (curried) |
| Missing JSDoc tags | Include: `@category`, `@example`, `@param`, `@returns` |
| Unsorted imports | Run: `pnpm exec eslint --fix src/` |
| Type inference breaks | Use `extends` constraints: `<T extends V>` |
| Test coverage <85% | Add edge cases: empty arrays, null, type narrowing |
| Wrong ESLint config file | Use `eslint.config.mjs`, NOT `.eslintrc.js` |
| Forgetting data-last pattern | Predicate/config FIRST, data LAST |
| Skipping type parameters | Always include `<T extends V>` for type narrowing |
| Not testing edge cases | Test: empty arrays, null, undefined, boundaries |
