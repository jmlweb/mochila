module.exports = {
  root: true,
  plugins: ['simple-import-sort'],
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  env: {
    node: true,
    es6: true,
  },
  rules: {
    'prettier/prettier': 'error',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'tsdoc/syntax': 'warn',
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      plugins: [
        '@typescript-eslint',
        'simple-import-sort',
        'eslint-plugin-tsdoc',
      ],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
  ],
};
