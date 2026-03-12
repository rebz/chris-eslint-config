# chris-eslint-config

Shared ESLint and Prettier configuration package. Installable via npm/GitHub — not a standalone application.

## What This Is

A shareable ESLint flat config with layered presets derived from real coding style across TypeScript, Vue, and Nuxt projects. Also bundles a Prettier config.

## Structure

```
chris-eslint-config/
├── base.mjs        # TypeScript + Prettier rules (foundation layer)
├── vue.mjs         # Vue addon rules (layers on top of base)
├── nuxt.mjs        # All-in-one: base + vue + Nuxt-specific (pairs with @nuxt/eslint)
├── prettier.mjs    # Shared Prettier config (also inlined into base ESLint rules)
└── package.json    # Subpath exports: ./base, ./vue, ./nuxt, ./prettier
```

## Preset Hierarchy

- **base** — standalone. ESLint recommended + typescript-eslint + Prettier integration + code quality rules.
- **vue** — addon. Requires base to be spread before it. Adds eslint-plugin-vue rules.
- **nuxt** — all-in-one. Internally imports base + vue, adds Nuxt overrides. Consumer only needs this single import plus `@nuxt/eslint` module for auto-import support.

## Key Style Decisions

These are intentional and should not be changed without discussion:

- `semi: true` — semicolons enforced
- `singleQuote: true` — single quotes for strings
- `arrowParens: 'avoid'` — omit parens for single-param arrows (`x => x`)
- `printWidth: 120` — wider than default to avoid excessive wrapping
- `@typescript-eslint/no-explicit-any: 'off'` — `any` is used pragmatically
- `no-empty: allowEmptyCatch: true` — fire-and-forget catch blocks are intentional
- `consistent-type-imports: separate-type-imports` — `import type { X }` style, not inline
- `vue/block-order: template > script > style` — template-first for app components
- `vue/multi-word-component-names: 'off'` — single-word names allowed (Button, Input)

## Rules for Modifying

- Plugins are direct dependencies (not peer deps) so consumers don't install them separately. Only `eslint`, `prettier`, and `typescript` are peer deps.
- Each preset file exports a flat config array (`Config[]`). Consumers spread them.
- The Prettier config in `prettier.mjs` is also inlined into the `prettier/prettier` ESLint rule in `base.mjs` — keep them in sync.
- Test changes by running `node -e "import base from './base.mjs'; console.log(base.length)"` to verify exports load.
