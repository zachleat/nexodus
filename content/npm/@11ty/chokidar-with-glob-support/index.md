---
title: '@11ty/chokidar-with-glob-support'
description: chokidar 5 with chokidar 3 glob support.
authors:
  - name: Zach Leatherman
    url: https://zachleat.com/
date: 2026-10-15T15:41:44.143Z
metadata:
  name: '@11ty/chokidar-with-glob-support'
  version: 2.1.0
  license: MIT
  homepage: https://www.11ty.dev/
  repository: https://github.com/11ty/eleventy-utils
  tags:
    - eleventy
    - chokidar
    - glob
    - watch
  uuid: 11ty/import::npm::@11ty/chokidar-with-glob-support
  type: npm
  url: https://www.npmjs.com/package/@11ty/chokidar-with-glob-support
  importHash: fa32fa37a4eb8624
tags:
  - eleventy
  - chokidar
  - glob
  - watch
---
# @11ty/chokidar-with-glob-support

A drop-in for `chokidar@3` built on `chokidar@5`, restoring glob support for watch targets and `ignored`.

```
const chokidar = require("@11ty/chokidar-with-glob-support");
// or: import chokidar from "@11ty/chokidar-with-glob-support";

chokidar.watch(["src/**/*.css", "!src/vendor/**"], {
  ignored: ["**/node_modules/**", ".git"],
}).on("change", path => console.log(path));
```

-   Globs and `!negations` in `watch()`, `add()`, and `unwatch()` (matched with `picomatch`, `dot: true`).
-   `ignored` accepts globs, paths (including their contents), RegExps, and functions.
-   Relative globs resolve against `cwd`; `disableGlobbing: true` treats all entries as literal paths.
-   `nocase: true` matches globs, paths, and `ignored` case-insensitively (default `false`, same as `picomatch`).
-   Directories that cannot contain matches are not traversed.
-   On macOS, `watch()` uses one recursive `fs.watch` (FSEvents) per folder instead of a file descriptor per file; opt out with `useFsEvents: false`, `usePolling`, or `depth`.

Requires Node 20.19 or newer.
