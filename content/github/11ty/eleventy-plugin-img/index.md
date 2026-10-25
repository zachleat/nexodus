---
title: eleventy-plugin-img
description: A plugin to perform runtime image transformations.
authors:
  - name: 11ty
    url: https://github.com/11ty
    avatarUrl: 35147177-vF4d9OMhxrvg.png
date: 2020-02-25T13:16:44.000Z
metadata:
  name: 11ty/eleventy-plugin-img
  language: JavaScript
  license: MIT
  archived: true
  uuid: 11ty/import::github::11ty/eleventy-plugin-img
  type: github
  url: https://github.com/11ty/eleventy-plugin-img
  importHash: b08e04c47e98d78d
---
# eleventy-plugin-img

⚠️⚠️⚠️ This plugin has been temporarily superceded by the lower level utility [`eleventy-img`](https://github.com/11ty/eleventy-img). Please use that instead!

-   [https://github.com/11ty/eleventy-img](https://github.com/11ty/eleventy-img)

## Installation

Available on [npm](https://www.npmjs.com/package/@11ty/eleventy-plugin-img).

```
npm install @11ty/eleventy-plugin-img --save-dev
```

Open up your Eleventy config file (probably `.eleventy.js`) and use `addPlugin`:

```
const pluginImg = require("@11ty/eleventy-plugin-img");
module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginImg);
};
```

Read more about [Eleventy plugins.](https://www.11ty.io/docs/plugins/)
