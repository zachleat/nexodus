---
title: '@11ty/dependency-tree-esm'
description: Finds all JavaScript ES Module dependencies from a filename.
authors:
  - name: Zach Leatherman
    url: https://zachleat.com/
date: 2023-08-25T20:02:10.303Z
metadata:
  name: '@11ty/dependency-tree-esm'
  version: 2.0.4
  license: MIT
  homepage: https://github.com/11ty/eleventy-utils#readme
  repository: https://github.com/11ty/eleventy-utils
  uuid: 11ty/import::npm::@11ty/dependency-tree-esm
  type: npm
  url: https://www.npmjs.com/package/@11ty/dependency-tree-esm
  importHash: 22a82f9c7b60a1b1
---
# `dependency-tree-esm`

Returns an unordered array of local paths to dependencies of a Node ES module JavaScript file.

-   See also: [`dependency-tree`](https://github.com/11ty/eleventy-dependency-tree) for the CommonJS version.

This is used by Eleventy to find dependencies of a JavaScript file to watch for changes to re-run Eleventy’s build.

## Installation

```
npm install --save-dev @11ty/dependency-tree-esm
```

## Features

-   Ignores bare specifiers (e.g. `import "my-package"`)
-   Ignores Node’s built-ins (e.g. `import "path"`)
-   Handles circular dependencies
-   Returns an empty set if the file does not exist.

## Usage

```
// my-file.js

// if my-local-dependency.js has dependencies, it will include those too
import "./my-local-dependency.js";


// ignored, is a built-in
import path from "path";
```

```
import { find } from "@11ty/dependency-tree-esm";
// CommonJS is fine too
// const { find } = require("@11ty/dependency-tree-esm");

await find("./my-file.js");
// returns ["./my-local-dependency.js"]
```

Return a [dependency-graph](https://github.com/jriecken/dependency-graph) instance:

```
import { findGraph } from "@11ty/dependency-tree-esm";
// CommonJS is fine too
// const { find } = require("@11ty/dependency-tree-esm");

(await findGraph("./my-file.js")).overallOrder();
// returns ["./my-local-dependency.js", "./my-file.js"]
```
