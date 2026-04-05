# chris-eslint-config

Shared ESLint and Prettier configuration for TypeScript, Vue, and Nuxt projects.

## Install

```bash
# From GitHub
npm i -D github:rebz/chris-eslint-config

# Peer dependencies
npm i -D eslint prettier typescript
```

## Presets

| Preset | Import path | Use for |
|--------|-------------|---------|
| **base** | `chris-eslint-config/base` | Any TypeScript project |
| **vue** | `chris-eslint-config/vue` | Vue 3 projects (addon, use with base) |
| **nuxt** | `chris-eslint-config/nuxt` | Nuxt projects (all-in-one: base + vue + Nuxt) |
| **prettier** | `chris-eslint-config/prettier` | Shared Prettier formatting config |

## Usage

### TypeScript project

```js
// eslint.config.mjs
import base from 'chris-eslint-config/base';

export default [...base];
```

### Vue project

```js
// eslint.config.mjs
import base from 'chris-eslint-config/base';
import vue from 'chris-eslint-config/vue';

export default [...base, ...vue];
```

### Nuxt project

Install the `@nuxt/eslint` module first — it handles auto-import globals (`ref`, `computed`, `useFetch`, etc.).

```bash
npm i -D @nuxt/eslint
```

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxt/eslint'],
});
```

```js
// eslint.config.mjs
import withNuxt from './.nuxt/eslint.config.mjs';
import config from 'chris-eslint-config/nuxt';

export default withNuxt(...config);
```

### Prettier

Reference the shared config in `package.json`:

```json
{
  "prettier": "chris-eslint-config/prettier"
}
```

Or in a standalone config file:

```js
// prettier.config.mjs
export { default } from 'chris-eslint-config/prettier';
```

### Overriding rules

Append a config object after the preset to override specific rules:

```js
// eslint.config.mjs
import base from 'chris-eslint-config/base';

export default [
  ...base,
  {
    rules: {
      'no-console': 'off',
    },
  },
];
```

## What's included

### Base preset

| Rule | Setting | Reason |
|------|---------|--------|
| `semi` | always | Consistent statement termination |
| `quotes` | single | Cleaner, less visual noise |
| `trailingComma` | all | Cleaner diffs |
| `arrowParens` | avoid | `x => x` over `(x) => x` |
| `printWidth` | 120 | Avoids excessive wrapping |
| `eqeqeq` | always | Strict equality only |
| `no-var` | error | `const`/`let` only |
| `prefer-const` | error | Immutable by default |
| `prefer-template` | warn | Template literals over concatenation |
| `object-shorthand` | always | `{ foo }` over `{ foo: foo }` |
| `no-console` | warn (allow error/warn/info) | Flag debug leftovers |
| `no-empty` | allowEmptyCatch | Fire-and-forget patterns are intentional |
| `no-explicit-any` | off | `any` used pragmatically |
| `no-unused-vars` | error, ignore `_` prefix | Underscore prefix for intentionally unused |
| `consistent-type-imports` | separate-type-imports | `import type { X }` style |

### Vue preset (additive)

| Rule | Setting |
|------|---------|
| `multi-word-component-names` | off |
| `html-self-closing` | always (all element types) |
| `component-name-in-template-casing` | PascalCase |
| `define-macros-order` | defineProps, defineEmits, defineModel, defineSlots |
| `block-order` | template, script, style |
| `v-on-event-hyphenation` | always |
| `attribute-hyphenation` | always |
| `no-v-html` | off |
| `require-default-prop` | off |
| `no-unused-refs` | warn |

### Nuxt preset

Everything from base + vue, plus `ignoreRestSiblings: true` on `no-unused-vars` for Nuxt's auto-import patterns.
