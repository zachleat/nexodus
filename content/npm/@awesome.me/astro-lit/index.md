---
title: '@awesome.me/astro-lit'
description: Use Lit components within Astro
authors:
  - name: Web Awesome
date: 2026-06-17T23:23:58.269Z
metadata:
  name: '@awesome.me/astro-lit'
  version: 5.0.4
  license: MIT
  homepage: https://github.com/shoelace-style/astro-lit
  repository: https://github.com/shoelace-style/astro-lit
  tags:
    - astro-integration
    - astro-component
    - renderer
    - lit
  uuid: 11ty/import::npm::@awesome.me/astro-lit
  type: npm
  url: https://www.npmjs.com/package/@awesome.me/astro-lit
  importHash: 25fdf7851a6f607d
tags:
  - astro-integration
  - astro-component
  - renderer
  - lit
---
# `@awesome.me/astro-lit` 🚀🔥

This Astro integration enables server-side rendering and client-side hydration for your [Lit](https://lit.dev/) custom elements.

## Why?

[https://docs.astro.build/en/guides/integrations-guide/lit/](https://docs.astro.build/en/guides/integrations-guide/lit/) - The official Lit plugin by the Astro team was deprecated. It needed to be revived to work with new Astro versions and new SSR rendering from Lit.

[https://www.npmjs.com/package/@semantic-ui/astro-lit](https://www.npmjs.com/package/@semantic-ui/astro-lit) is a fork I discovered after making this fork, but I noticed it had a few problems around attribute serialization, and head injection felt error prone and I constantly got components rendering multiple times.

## Documentation

### Installation

-   npm

`npm install @awesome.me/astro-lit`

pnpm

`pnpm add @awesome.me/astro-lit`

yarn

`yarn add @awesome.me/astro-lit`

### Configuration

```
// astro.config.mjs
import { defineConfig } from 'astro/config';

import lit from '@awesome.me/astro-lit';

// https://astro.build/config
export default defineConfig({
  // ...
  integrations: [lit()],
});
```

### Using components

Example using Web Awesome:

```
npm install @awesome.me/webawesome
```

```
---
// server imports.
import "@awesome.me/webawesome/dist/components/page/page.js"
import "@awesome.me/webawesome/dist/components/button/button.js"
---


<body>
  <wa-page>
    <wa-button>Click me!</wa-button>
  </wa-page>
  <script>
    // **!! VERY IMPORTANT !!**
    // These 2 imports must come first before importing any components on the client. If not, you will end up with things rendering more than once and things will look very, very broken.
    import "@awesome.me/astro-lit/dsd-polyfill.js"
    import "@awesome.me/astro-lit/hydration-support.js"

    // client imports
    import "@awesome.me/webawesome/dist/components/page/page.js"
    import "@awesome.me/webawesome/dist/components/button/button.js"
  </script>
</body>
```

## License

MIT

Copyright (c) 2023–2026 - Astro Copyright (c) 2026-present - Font Awesome
