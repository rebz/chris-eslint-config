import base from './base.mjs';
import vue from './vue.mjs';

/**
 * All-in-one config for Nuxt projects.
 *
 * Combines base (TypeScript) + Vue rules + Nuxt-specific overrides.
 * Designed to pair with @nuxt/eslint module which handles auto-import globals.
 *
 * Usage:
 *   import withNuxt from './.nuxt/eslint.config.mjs';
 *   import config from 'chris-eslint-config/nuxt';
 *   export default withNuxt(...config);
 */

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...base,
  ...vue,
  {
    rules: {
      // Nuxt auto-imports Vue composables (ref, computed, watch, etc.)
      // and Nuxt composables (useFetch, useRoute, etc.), so the
      // @nuxt/eslint module handles no-undef for those. These rules
      // complement that setup.

      // In Nuxt, components are auto-imported — no unused import warnings
      // for components that appear only in templates.
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          destructuredArrayPattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
    },
  },
];
