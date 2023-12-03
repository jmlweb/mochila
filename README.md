# Mochila

Your travel companion for (light) functional programming in TypeScript.

## Philosophy

The main goal of this project is to provide a set of utilities that can be used in any project, with a focus on Light Functional TypeScript support.

The functions are written with a "data last" philosophy, so they can be easily composed with other functions using the internal `pipe` utility.

For the same reason, the functions are curried when needed, so they can be partially applied.

```typescript
import { length, multiply, pipe } from '@jmlweb/mochila';

const doubleLength = pipe(length, multiply(2));

doubleLength([1, 2, 3]); // 6
doubleLength('abc'); // 6
```

