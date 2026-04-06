import eslintPluginVue from 'eslint-plugin-vue';

/**
 * Custom Vue template rules (no plugin registration).
 * Disables prettier/prettier for .vue files so these formatting rules
 * don't conflict with Prettier's HTML formatter.
 *
 * @type {import('eslint').Linter.Config}
 */
export const vueRules = {
  files: ['**/*.vue'],
  rules: {
    // Disable Prettier for Vue files — Vue formatting rules handle templates,
    // and Prettier's HTML formatter conflicts with them (garbled class attrs,
    // duplicate tags, etc.).
    'prettier/prettier': 'off',

    // Component naming — allow single-word names (e.g., Button, Input)
    'vue/multi-word-component-names': 'off',

    // Self-closing tags for all elements
    'vue/html-self-closing': [
      'error',
      {
        html: { void: 'always', normal: 'always', component: 'always' },
        svg: 'always',
        math: 'always',
      },
    ],

    // PascalCase component names in templates
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],

    // Macro ordering: props before emits before model before slots
    'vue/define-macros-order': [
      'error',
      {
        order: ['defineProps', 'defineEmits', 'defineModel', 'defineSlots'],
      },
    ],

    // Block ordering: template > script > style
    'vue/block-order': [
      'error',
      {
        order: ['template', 'script', 'style'],
      },
    ],

    // Attribute conventions
    'vue/v-on-event-hyphenation': ['error', 'always'],
    'vue/attribute-hyphenation': ['error', 'always'],

    // Allow v-html (used for markdown rendering)
    'vue/no-v-html': 'off',

    // Don't require default values for optional props
    'vue/require-default-prop': 'off',

    // Catch unused template refs
    'vue/no-unused-refs': 'warn',

    // Match project-preferred multiline attribute formatting in templates.
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 2,
        multiline: { max: 1 },
      },
    ],
    'vue/first-attribute-linebreak': [
      'error',
      {
        singleline: 'beside',
        multiline: 'beside',
      },
    ],
    'vue/html-closing-bracket-newline': [
      'error',
      {
        singleline: 'never',
        multiline: 'always',
      },
    ],
    'vue/html-indent': [
      'error',
      2,
      {
        attribute: 1,
        baseIndent: 1,
        closeBracket: 0,
        alignAttributesVertically: true,
      },
    ],
  },
};

/**
 * Full Vue config with plugin + recommended rules + custom rules.
 * Use this for standalone Vue projects (not Nuxt).
 *
 * @type {import('eslint').Linter.Config[]}
 */
export default [
  ...eslintPluginVue.configs['flat/recommended'],
  vueRules,
];
