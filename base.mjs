import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import tseslint from 'typescript-eslint';
import prettierConfig from './prettier.mjs';

/**
 * Custom rules only (no plugin registrations).
 * Use this when the consuming config already registers the TypeScript and
 * Prettier plugins (e.g. via @nuxt/eslint's withNuxt).
 *
 * @type {import('eslint').Linter.Config}
 */
export const baseRules = {
  rules: {
    // Prettier — delegate formatting, just enforce integration
    'prettier/prettier': ['error', { ...prettierConfig, endOfLine: 'auto' }],

    // Equality
    'eqeqeq': ['error', 'always'],

    // Variables
    'no-var': 'error',
    'prefer-const': 'error',

    // Modern syntax
    'prefer-template': 'warn',
    'object-shorthand': ['error', 'always'],
    'prefer-destructuring': ['warn', { object: true, array: false }],

    // Console — allow error/warn/info, flag debug leftovers
    'no-console': ['warn', { allow: ['error', 'warn', 'info'] }],

    // Allow intentional empty catch blocks (fire-and-forget patterns)
    'no-empty': ['error', { allowEmptyCatch: true }],

    // Disable base rule in favor of TypeScript version
    'no-unused-vars': 'off',

    // TypeScript
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-empty-object-type': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/consistent-type-imports': [
      'warn',
      {
        prefer: 'type-imports',
        fixStyle: 'separate-type-imports',
      },
    ],
  },
};

/**
 * Full config with plugins for standalone use (non-Nuxt projects).
 *
 * @type {import('eslint').Linter.Config[]}
 */
export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginPrettierRecommended,
  baseRules,
];
