# Troubleshooting

| Issue | Solution |
|-------|----------|
| Tests fail or coverage low | `pnpm test:coverage` → add test cases |
| Lint/format errors | `pnpm exec eslint --fix src/` (auto on commit) |
| Type errors in build | Check `tsconfig.json` strict mode; avoid `any` |
| Test type inference | Ensure `<T extends V>` and proper return types |
| Commit rejected | Message must be: `feat:`, `fix:`, `docs:`, etc. |
| Build fails with type errors | Check TypeScript strict mode, avoid explicit `any` |
| ESLint config not found | Use `eslint.config.mjs`, NOT `.eslintrc.js` |
| Imports not sorting | Run `pnpm exec eslint --fix src/` |
| Coverage threshold not met | Add edge case tests (empty arrays, null, etc.) |
| Type inference breaks | Use generic constraints: `<T extends V>` |

## Key Files Reference

| File | Purpose |
|------|---------|
| `src/index.ts` | Main exports (alphabetical) |
| `tsconfig.json` | TypeScript strict mode (ES2020, bundler resolution) |
| `eslint.config.mjs` | ESLint 9 flat config (linting rules) |
| `.prettierrc.json` | Formatting (2-space, single quotes, trailing commas) |
| `jest.config.js` | Test config (85% coverage threshold) |
| `.husky/` | Pre-commit hooks (format + lint) |
| `commitlint.config.cjs` | Commit message validation |

See [DEVELOPMENT.md](./DEVELOPMENT.md) for architecture details and advanced patterns.
