## Task - Atlan Frontend Engineer

Create, design and implement a web-based application capable of running SQL queries...

<img src="./src/assets/imgs/dummy-sql-runnner.png" alt="Dummy SQL runner" />
<p align='center'><em>Simple Dummy SQL runner</em></p>
<h6 align='center'><a href="https://dummy-sql-runner.netlify.app/">Live Demo</a></h6>


## Features

- ⚡️ [Vue 3](https://github.com/vuejs/core), [Vite 3](https://github.com/vitejs/vite), [pnpm](https://pnpm.io/), [ESBuild](https://github.com/evanw/esbuild) - born with fastness
- 🗂 [File based routing](./src/pages)
- 📦 [Components auto importing](./src/components)
- 🎨 [UnoCSS](https://github.com/antfu/unocss) - The instant on-demand atomic CSS engine.
- 😃 Use icons from any icon sets in [Pure CSS](https://github.com/antfu/unocss/tree/main/packages/preset-icons)
- 🔥 Use the [new `<script setup>` style](https://github.com/vuejs/rfcs/pull/227)
- 🕸️ Editor with [Vue-codemirror](https://github.com/surmon-china/vue-codemirror) (without auto-theme and code checker)
- 🎉 Make as PWA with [vite-plugin-pwa](https://github.com/antfu/vite-plugin-pwa)
- 🦾 TypeScript, of course
- ☁️ Deploy on Netlify, zero-config


## Pre-packed

### UI Frameworks

- [UnoCSS](https://github.com/antfu/unocss) - The instant on-demand atomic CSS engine.

### Icons

- [Iconify](https://iconify.design) - use icons from any icon sets [🔍Icônes](https://icones.netlify.app/)
- [Pure CSS Icons via UnoCSS](https://github.com/antfu/unocss/tree/main/packages/preset-icons)

### Plugins

- [Vue Router](https://github.com/vuejs/vue-router)
  - [`vite-plugin-pages`](https://github.com/hannoeru/vite-plugin-pages) - file system based routing
- [`unplugin-auto-import`](https://github.com/antfu/unplugin-auto-import) - Directly use Vue Composition API and others without importing
- [`unplugin-vue-components`](https://github.com/antfu/unplugin-vue-components) - components auto import
- [VueUse](https://github.com/antfu/vueuse) - collection of useful composition APIs

### Additional Features

- Dark/Light mode
- Multiple view for output & current tables
- Editor history with ```undo``` and ```redo```
- Clear current editor content

## Future features (maybe)

- Save current query
- Download (export as SQL)
- Upload (SQL / CSV file)
- Add terminal
- Full screen mode
