# Code Standards (Strict Mode)

| Rule | Why | Example |
|------|-----|---------|
| No explicit `any` | Use generics/`unknown` | `<T>(x: T) => T` not `(x: any)` |
| Curried with generics | Type inference must work | Return function types properly constrained |

## Intentional `any` Type Exceptions

The codebase has strict `no explicit any` enforcement, with one documented exception:

- `AnyFn` type in `src/types/function.ts` - Uses `(...args: any[]) => any` as a base utility type for general function composition where strict typing is intentionally relaxed for maximum flexibility in `pipe()` and similar utilities. This is necessary to allow composition of functions with different signatures. Alternative: use `unknown[]` with runtime type guards if stricter typing is needed.
