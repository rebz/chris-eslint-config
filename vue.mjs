import eslintPluginVue from 'eslint-plugin-vue';

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...eslintPluginVue.configs['flat/recommended'],
  {
    files: ['**/*.vue'],
    rules: {
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
          singleline: 1,
          multiline: 1,
        },
      ],
      'vue/html-closing-bracket-newline': [
        'error',
        {
          singleline: 'never',
          multiline: 'always',
        },
      ],
      
    },
  },
];
