import { defineConfig } from 'tsup';

export default defineConfig({
  clean: true,
  dts: true,
  entry: ['./src/index.ts', '!src/**/*.test.ts'],
  format: ['esm', 'cjs'],
  sourcemap: true,
  splitting: false,
  target: 'es2020',
});
