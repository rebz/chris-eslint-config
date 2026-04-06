import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import { baseRules } from './base.mjs';
import { vueRules } from './vue.mjs';

/**
 * All-in-one config for Nuxt projects.
 *
 * Uses rules-only imports from base.mjs and vue.mjs to avoid duplicate
 * plugin registrations — withNuxt from @nuxt/eslint already registers
 * eslint-plugin-vue, @typescript-eslint, and vue-eslint-parser.
 *
 * Usage:
 *   import withNuxt from './.nuxt/eslint.config.mjs';
 *   import config from 'chris-eslint-config/nuxt';
 *   export default withNuxt(...config);
 */

/** @type {import('eslint').Linter.Config[]} */
export default [
  // Core ESLint recommended rules (no plugin — safe to include)
  eslint.configs.recommended,
  // Prettier plugin + eslint-config-prettier (Nuxt does not provide this)
  eslintPluginPrettierRecommended,
  // Custom rules from base (TS/JS conventions, Prettier config override)
  baseRules,
  // Custom Vue template rules (formatting, naming, etc.)
  vueRules,
  {
    rules: {
      // Nuxt override: add ignoreRestSiblings for auto-imported composables
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
    },
  },
];
