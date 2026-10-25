---
title: '@zachleat/noop'
description: A minimal module to test importing in other tools.
authors:
  - name: Zach Leatherman
    url: https://zachleat.com/
date: 2023-02-21T16:41:57.501Z
metadata:
  name: '@zachleat/noop'
  version: 1.0.7
  license: MIT
  homepage: https://github.com/zachleat/noop#readme
  repository: https://github.com/zachleat/noop
  uuid: 11ty/import::npm::@zachleat/noop
  type: npm
  url: https://www.npmjs.com/package/@zachleat/noop
  importHash: aaa74460a2f17694
---
# @zachleat/noop

A minimal ESM package to test module importing in other tools.

Install from [npm](https://www.npmjs.com/package/@zachleat/noop):

```
npm install @zachleat/noop
```

Usage:

```
// ESM
import { noop, noopSync } from "@zachleat/noop";

// Dynamic Import
const { noop, noopSync } = await import("@zachleat/noop");

// CommonJS
const { noop, noopSync } = require("@zachleat/noop");

// Explicit ESM
import { noop, noopSync } from "@zachleat/noop/esm";

// Explicit CommonJS
const { noop, noopSync } = require("@zachleat/noop/cjs");

// Throws an error on import/require (use for npm `overrides`)
import "@zachleat/noop/error";
require("@zachleat/noop/error");
```
