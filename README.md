# 🎒 Mochila

Your Lightweight Travel Companion for TypeScript Programming

[![npm version](https://img.shields.io/npm/v/mochila-ts)](https://www.npmjs.com/package/mochila-ts)
[![CI](https://img.shields.io/github/actions/workflow/status/jmlweb/mochila/test.yml)](https://github.com/jmlweb/mochila)
[![Coverage](https://img.shields.io/badge/coverage-95%25-brightgreen)](./jest.config.js)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0%2B-blue)](https://www.typescriptlang.org/)

**79+ composable TypeScript utilities** using a data-last curried pattern for seamless function composition.

[Documentation](https://jmlweb.github.io/mochila/modules.html) • [GitHub](https://github.com/jmlweb/mochila) • [Contributing](./DEVELOPMENT.md)

## Table of Contents

- [Philosophy](#philosophy)
- [Quick Start](#quick-start)
- [Key Features](#key-features)
- [Utilities Overview](#utilities-overview)
- [Advanced Examples](#advanced-examples)
- [Installation](#installation)
- [Resources](#resources)

## Philosophy

At the core of Mochila's philosophy is the commitment to a **"data last" approach** in writing functions. This design choice enables easy composition of functions using our internal `pipe` utility.

Additionally, Mochila embraces **currying** when necessary, allowing functions to be conveniently partially applied. This flexibility enhances the overall usability of the toolkit.

**Benefits:**
- ✅ **Composable**: Chain operations naturally with `pipe()` and `flow()`
- ✅ **Reusable**: Partial application for configurable function factories
- ✅ **Type-Safe**: Full generic support with proper type inference
- ✅ **Chainable**: Works seamlessly with function composition patterns

```typescript
import { length, multiply, pipe } from 'mochila-ts';

const doubleLength = pipe(length, multiply(2));

doubleLength([1, 2, 3]); // 6
doubleLength('abc'); // 6
```

## Quick Start

```typescript
import { pipe, filter, map, sort, ascending } from 'mochila-ts';

// Compose utilities into a processing pipeline
const processNumbers = pipe(
  filter((x: number) => x > 0),
  map((x: number) => x * 2),
  sort(ascending)
);

processNumbers([-2, 1, 3, -1, 2]); // [2, 4, 6]

// Partial application for reuse
const filterEven = filter((x: number) => x % 2 === 0);
filterEven([1, 2, 3, 4]); // [2, 4]
```

## Key Features

### 🎯 Type-Safe Composition
- Full TypeScript support with 95%+ type coverage
- Type guards with type narrowing (`isArray`, `isString`, etc.)
- Generic constraints maintain type safety in composition chains

### ⚡ Advanced Utilities
- **LRUCache**: Configurable caching with TTL and max size
- **Debounce/Throttle**: Function rate-limiting utilities
- **Deep Equality**: Circular reference protection with WeakMap
- **Array Operations**: 34+ array manipulation utilities
- **Object/String Manipulation**: Pick, omit, split, replace, and more

### 🔧 Function Utilities
- `pipe()`: Compose functions with full type inference (up to 9 overloads)
- `flow()`: Function composition in reverse order
- `protect()`: Safe function execution
- `debounce()` & `throttle()`: Rate-limiting decorators

```typescript
import { LRUCache } from 'mochila-ts';

const cache = LRUCache({
  max: 100,
  ttl: 1000 * 60 * 60 * 24, // 24 hours
});

cache.set('key', 'value');
cache.get('key'); // 'value'
```

## Utilities Overview

**79+ utilities** organized by category:

| Category | Count | Examples |
|----------|-------|----------|
| Array | 34 | `append, at, chunkify` +31 more |
| String | 10 | `capitalize, endsWith, join` +7 more |
| Object | 7 | `keys, mapObject, omit` +4 more |
| Function | 9 | `complement, constant, debounce` +6 more |
| Utility | 7 | `castArray, clone, deepClone` +4 more |
| Logic | 3 | `every, none, some` |
| Number | 4 | `add, clamp, divide` +1 more |
| Assertion | 3 | `assert, deepEqual, equal` |
| Type Guard | 1 | `is` |

All utilities follow the **data-last curried pattern** for maximum composability. See the [full API documentation](https://jmlweb.github.io/mochila/modules.html) for detailed usage.

## Advanced Examples

### Complex Data Transformation Pipeline

```typescript
import { pipe, filter, map, groupBy, mapObject, sort, descending } from 'mochila-ts';

interface User {
  id: number;
  name: string;
  age: number;
  active: boolean;
}

const processUsers = pipe(
  filter((u: User) => u.active),
  map((u: User) => ({ ...u, ageGroup: Math.floor(u.age / 10) * 10 })),
  groupBy((u: User & { ageGroup: number }) => u.ageGroup),
  mapObject((users: (User & { ageGroup: number })[]) => users.length)
);

const users = [
  { id: 1, name: 'Alice', age: 28, active: true },
  { id: 2, name: 'Bob', age: 35, active: false },
  { id: 3, name: 'Charlie', age: 22, active: true },
];

processUsers(users); // { '20': 1, '30': 1 }
```

### Type-Safe Type Guards in Action

```typescript
import { pipe, filter, map } from 'mochila-ts';
import { isString, isNumber } from 'mochila-ts';

const data: unknown[] = [1, 'hello', 2, 'world', null];

const processStrings = pipe(
  filter(isString), // Narrows type to string[]
  map((s: string) => s.toUpperCase()) // ✓ Type-safe
);

processStrings(data); // ['HELLO', 'WORLD']
```

### Caching with TTL

```typescript
import { pipe, map, LRUCache } from 'mochila-ts';

const expensiveComputation = (n: number) => n * n;

const cache = LRUCache({
  max: 50,
  ttl: 5000, // 5 second TTL
});

const cachedCompute = (n: number) => {
  const cached = cache.get(String(n));
  if (cached !== undefined) return cached;

  const result = expensiveComputation(n);
  cache.set(String(n), result);
  return result;
};

// First call: computes
cachedCompute(5); // 25

// Second call: returns from cache
cachedCompute(5); // 25 (cached)
```

## Installation

**Requirements:**
- Node.js 20+
- pnpm 9+

```bash
npm install mochila-ts
# or
yarn add mochila-ts
# or
pnpm add mochila-ts
```

All utilities are exposed as named exports:

```typescript
import { pipe, filter, map } from 'mochila-ts';
```

## Resources

- **[API Documentation](https://jmlweb.github.io/mochila/modules.html)** - Complete API reference with examples
- **[Development Guide](./DEVELOPMENT.md)** - Architecture and contribution guidelines
- **[GitHub Repository](https://github.com/jmlweb/mochila)** - Source code and issue tracker
- **[NPM Package](https://www.npmjs.com/package/mochila-ts)** - Installation and package info

---

Made with ❤️ for TypeScript developers who value composition and type safety.
