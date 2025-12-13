# File Structure Conventions

## Module Structure

Each utility has this structure:

```
src/{utilityName}/
├── {utilityName}.ts      # Implementation (data-last curried function)
├── {utilityName}.test.ts # Unit tests (85%+ coverage required)
└── index.ts              # Exports
```

## Module Exports

Module exports can use either pattern:

- `export * from './{utilityName}'` - Export all
- `export { name } from './{utilityName}'` - Named exports only

## Main Exports

All utilities must be exported from `src/index.ts` in **alphabetical order**:

```typescript
// src/index.ts (add in alphabetical order)
export * from './{name}';
```

## Shared Types

Shared types in `src/types/`:

- `array/` - Array constraints and helpers
- `extends.ts` - Type constraint utilities
- `function.ts` - Function types (AnyFn, Constant)
- `helpers.ts` - Generic helpers
- `string.ts`, `number.ts`, `boolean.ts`, `object.ts` - Domain-specific types
