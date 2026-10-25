---
title: eleventy-plugin-inclusive-language
description: A linter plugin to check for inclusive language in markdown files.
authors:
  - name: 11ty
    url: https://github.com/11ty
    avatarUrl: 35147177-vF4d9OMhxrvg.png
date: 2018-10-05T13:24:18.000Z
metadata:
  name: 11ty/eleventy-plugin-inclusive-language
  language: JavaScript
  license: MIT
  homepage: https://www.11ty.dev/docs/plugins/inclusive-language/
  tags:
    - eleventy
    - eleventy-plugin
  uuid: 11ty/import::github::11ty/eleventy-plugin-inclusive-language
  type: github
  url: https://github.com/11ty/eleventy-plugin-inclusive-language
  importHash: d1dbe0e8d03e646c
tags:
  - eleventy
  - eleventy-plugin
---
# eleventy-plugin-inclusive-language

An [Eleventy](https://github.com/11ty/eleventy) linter plugin to check for inclusive language in markdown files. Inspired by [_CSS Tricks’ Words to Avoid in Educational Writing_](https://css-tricks.com/words-avoid-educational-writing/). No browser/client JavaScript here—everything is this plugin is done at build-time.

![Sample screenshot of eleventy-plugin-inclusive-language in action](sample-screenshot-2x9uReoypoYM.png)

## Installation

Available on [npm](https://www.npmjs.com/package/@11ty/eleventy-plugin-inclusive-language).

```
npm install @11ty/eleventy-plugin-inclusive-language --save-dev
```

Open up your Eleventy config file (probably `.eleventy.js`) and use `addPlugin`:

```
const inclusiveLangPlugin = require("@11ty/eleventy-plugin-inclusive-language");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(inclusiveLangPlugin);
};
```

Read more about [Eleventy plugins.](https://www.11ty.io/docs/plugins/)

### Options

Optionally pass in an options object as the second argument to `addPlugin` to further customize this plugin.

```
const inclusiveLangPlugin = require("@11ty/eleventy-plugin-inclusive-language");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(inclusiveLangPlugin, {
    templateFormats: ["md"], // default, add more file extensions here

    // accepts an array or a comma-delimited string
    words: "simply,obviously,basically,of course,clearly,just,everyone knows,however,easy"
  });
};
```
