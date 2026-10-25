---
title: zachleat
description: Meta package for Zach Leatherman
authors:
  - name: Zach Leatherman
date: 2018-01-02T05:34:29.348Z
metadata:
  name: zachleat
  version: 43.1.4
  license: MIT
  homepage: https://github.com/zachleat/package-zachleat#readme
  repository: https://github.com/zachleat/package-zachleat
  uuid: 11ty/import::npm::zachleat
  type: npm
  url: https://www.npmjs.com/package/zachleat
  importHash: b757d986772b8d18
---
# zachleat

Meta package for Zach Leatherman

## Usage

-   [`zachleat` on npm](https://www.npmjs.com/package/zachleat)

### CLI

```
npx zachleat
deno x zachleat
```

### Programmatic

```
import zachleat from "zachleat";

// or in CommonJS
// const zachleat = await import("zachleat");

// or in CommonJS (via require(esm) e.g. Deno 2+, Node 22+)
// const { default: zachleat } = require("zachleat");

zachleat();
```

## Changelog

-   `v43.1` Adds trusted publishers OIDC release process with staged publishing.
-   `v43` Node 20+; Deno instructions
-   `v42` Bump `update-notifier` from v5 to [v6](https://github.com/sindresorhus/update-notifier/releases/tag/v6.0.0) (ESM) to [v7](https://github.com/sindresorhus/update-notifier/releases/tag/v7.0.0); Node 18+
-   `v41` ESM
