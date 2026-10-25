---
title: esm-import-transformer
description: >-
  Change import URLs in JavaScript code using import maps. e.g. `import * from
  "before"` to `import * from "after"`
authors:
  - name: zachleat
    url: https://github.com/zachleat
    avatarUrl: 39355-BYqDKnzPAH8O.png
date: 2022-06-03T19:01:52.000Z
metadata:
  name: zachleat/esm-import-transformer
  language: JavaScript
  uuid: 11ty/import::github::zachleat/esm-import-transformer
  type: github
  url: https://github.com/zachleat/esm-import-transformer
  importHash: 771f248f51537dfa
---
# esm-import-transformer

Can transform any ESM source code `import` URLs using an import maps object. This package works in ESM or CJS.

```
// Input source code:
import {html, css, LitElement} from "lit";

// Transform with an import map:
import {html, css, LitElement} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";

// Or transform to a dynamic import:
const {html, css, LitElement} = await import("lit");

// Or transform to CommonJS require:
const {html, css, LitElement} = require("lit");
```

## Usage

```
// ESM
import { ImportTransformer } from "esm-import-transformer";

// or CJS
const { ImportTransformer } = await import("esm-import-transformer");
```

### Transform with an import map

Pass in a source code string and an [import maps](https://github.com/WICG/import-maps) object.

```
let sourceCode = `import {html, css, LitElement} from "lit";`;
let it = new ImportTransformer(sourceCode);

let importMap = {
  imports: {
    lit: "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js"
  }
};
let outputCode = it.transformWithImportMap(importMap);
// returns: `import {html, css, LitElement} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";`
```

### Transform to dynamic `import()`

```
let sourceCode = `import {html, css, LitElement} from "lit";`;
let it = new ImportTransformer(sourceCode);

let outputCode = it.transformToDynamicImport();
// returns: `const {html, css, LitElement} = await import("lit");`
```

### Transform to `require()`

_Added in v3.0.1_: This method does _not_ require that the downstream package is CommonJS, but remember that _running_ the resulting code will fail if you try to `require` an ESM package (in some JavaScript environments, e.g. Node < 20).

```
let sourceCode = `import {html, css, LitElement} from "lit";`;
let it = new ImportTransformer(sourceCode);

let outputCode = it.transformToRequire();
// returns: `const {html, css, LitElement} = require("lit");`
```

### Has imports?

_Added in v3.0.2_ Returns true if the code has any top level `import`.

```
let sourceCode = `import {html, css, LitElement} from "lit";`;
let it = new ImportTransformer(sourceCode);
it.hasImports(); // true
```

```
let sourceCode = `const {html, css, LitElement} = require("lit");`;
let it = new ImportTransformer(sourceCode);
it.hasImports(); // false
```

## Installation

Available on [npm](https://www.npmjs.com/package/esm-import-transformer)

```
npm install esm-import-transformer
```
