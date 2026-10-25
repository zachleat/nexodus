---
title: eleventy-server-browsersync
description: An Eleventy server plugin to use Browsersync with Eleventy 2.0+.
authors:
  - name: 11ty
    url: https://github.com/11ty
    avatarUrl: 35147177-vF4d9OMhxrvg.png
date: 2022-03-10T23:41:37.000Z
metadata:
  name: 11ty/eleventy-server-browsersync
  language: JavaScript
  uuid: 11ty/import::github::11ty/eleventy-server-browsersync
  type: github
  url: https://github.com/11ty/eleventy-server-browsersync
  importHash: 525b9074bde7a6a5
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
