import baseConfig from '@jmlweb/eslint-config-base';
import tsdoc from 'eslint-plugin-tsdoc';

export default [
  ...baseConfig,
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      tsdoc,
    },
    rules: {
      'tsdoc/syntax': 'warn',
      // Relaxed rules for utility library
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/no-unnecessary-type-parameters': 'off',
      '@typescript-eslint/no-redundant-type-constituents': 'off',
      // Utility-specific relaxations
      '@typescript-eslint/no-empty-function': 'off', // noop is intentionally empty
      '@typescript-eslint/no-misused-spread': 'off', // spreading strings is intentional
      '@typescript-eslint/no-dynamic-delete': 'off', // needed for omit
      '@typescript-eslint/no-non-null-assertion': 'warn', // warn instead of error
      '@typescript-eslint/only-throw-error': 'off', // retry throws last error
      '@typescript-eslint/no-base-to-string': 'off', // deepEqual needs this
      '@typescript-eslint/no-unnecessary-condition': 'off', // defensive coding
    },
  },
  {
    files: ['**/*.test.ts'],
    rules: {
      '@typescript-eslint/require-await': 'off',
      '@typescript-eslint/no-confusing-void-expression': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
    },
  },
];
