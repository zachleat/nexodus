---
title: noop
description: A minimal module to test importing in other tools.
authors:
  - name: zachleat
    url: https://github.com/zachleat
    avatarUrl: 39355-BYqDKnzPAH8O.png
date: 2023-02-21T16:36:12.000Z
metadata:
  name: zachleat/noop
  language: JavaScript
  uuid: 11ty/import::github::zachleat/noop
  type: github
  url: https://github.com/zachleat/noop
  importHash: f73334c6f010f3cc
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
