---
title: '@11ty/eleventy-server-browsersync'
description: An Eleventy server plugin to use Browsersync with Eleventy 2.0+.
authors:
  - name: Zach Leatherman
    url: https://zachleat.com/
date: 2022-03-10T23:44:38.000Z
metadata:
  name: '@11ty/eleventy-server-browsersync'
  version: 2.0.0
  license: MIT
  homepage: https://github.com/11ty/eleventy-server-browsersync/
  repository: https://github.com/11ty/eleventy-server-browsersync
  tags:
    - eleventy
    - server
  uuid: 11ty/import::npm::@11ty/eleventy-server-browsersync
  type: npm
  url: https://www.npmjs.com/package/@11ty/eleventy-server-browsersync
  importHash: 8e45522eaf1686c3
tags:
  - eleventy
  - server
---
![11ty Logo](logo-github-gW5pow8pImUR.svg)

# eleventy-server-browsersync 🕚⚡️🎈🐀

A server plugin to use [Browsersync](https://browsersync.io/) with Eleventy 2.0+.

## ➡ [Documentation: Swap back to Browsersync](https://www.11ty.dev/docs/watch-serve/#swap-back-to-browsersync)

-   Please star [Eleventy on GitHub](https://github.com/11ty/eleventy/)!
-   Follow us on Twitter [@eleven\_ty](https://twitter.com/eleven_ty)
-   Support [11ty on Open Collective](https://opencollective.com/11ty)
-   [11ty on npm](https://www.npmjs.com/org/11ty)
-   [11ty on GitHub](https://github.com/11ty)

[![npm Version](eleventy-server-browsersync-2saLlUjJZpCv.svg)](https://www.npmjs.com/package/@11ty/eleventy-server-browsersync)

## Installation

```
npm install @11ty/eleventy-server-browsersync
```

```
module.exports = function(eleventyConfig) {
  eleventyConfig.setServerOptions({
    module: "@11ty/eleventy-server-browsersync",

    // Default options shown:
    port: 8080,
    ignore: ["node_modules"],
    watch: false,
    open: false,
    notify: false,
    ui: false,
    ghostMode: false,
    index: "index.html",
  })
};
```

View the [full list of Browsersync options](https://browsersync.io/docs/options).
