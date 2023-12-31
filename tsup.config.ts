import { defineConfig } from 'tsup';

export default defineConfig({
  clean: true,
  dts: true,
  entry: ['./src'],
  format: ['esm', 'cjs'],
  sourcemap: true,
  splitting: false,
  target: 'es2020',
});
