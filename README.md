# 🎒 Mochila

Your Lightweight Travel Companion for TypeScript Programming

[Documentation](https://jmlweb.github.io/mochila/modules.html)

## Philosophy

At the core of Mochila's philosophy is the commitment to a "data last" approach in writing functions. This design choice enables easy composition of functions using our internal `pipe` utility.

Additionally, Mochila embraces currying when necessary, allowing functions to be conveniently partially applied. This flexibility enhances the overall usability of the toolkit.

```typescript
import { length, multiply, pipe } from 'mochila-ts';

const doubleLength = pipe(length, multiply(2));

doubleLength([1, 2, 3]); // 6
doubleLength('abc'); // 6
```

Mochila not only provides robust support for TypeScript but also comes equipped with handy utilities for seamlessly handling tasks such as caching and backpressuring.

```typescript
import { LRUCache } from 'mochila-ts';

const cache = LRUCache({
  max: 100,
  ttl: 1000 * 60 * 60 * 24,
});
```

All the utilities are exposed as named exports from the `mochila-ts` package.

## Installation

```bash
npm install mochila-ts
# or
yarn add mochila-ts
# or
pnpm add mochila-ts
```


