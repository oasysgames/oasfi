module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    project: ['tsconfig.json'],
  },
  rules: {
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
    'prettier/prettier': [
      'error',
      { endOfLine: 'auto', singleQuote: true, trailingComma: 'all' },
    ],
  },
  ignorePatterns: ['**/*.types.ts', '**/*.js'],
};
