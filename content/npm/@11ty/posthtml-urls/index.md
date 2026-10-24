---
title: '@11ty/posthtml-urls'
description: PostHTML plugin for transforming URLs. A fork of posthtml/posthtml-urls.
authors:
  - name: Zach Leatherman
    url: https://zachleat.com/
date: 2024-02-09T17:13:14.084Z
metadata:
  name: '@11ty/posthtml-urls'
  version: 2.0.0
  license: MIT
  homepage: https://github.com/11ty/eleventy-posthtml-urls#readme
  repository: https://github.com/11ty/eleventy-posthtml-urls
  tags:
    - posthtml
    - posthtml-plugin
    - url
  uuid: 11ty/import::npm::@11ty/posthtml-urls
  type: npm
  url: https://www.npmjs.com/package/@11ty/posthtml-urls
  importHash: b4ce1d7f13e67389
tags:
  - posthtml
  - posthtml-plugin
  - url
---
# `@11ty/posthtml-urls`

PostHTML plugin for transforming URLs. This is a fork of [`posthtml/posthtml-urls`](https://github.com/posthtml/posthtml-urls).

## Installation

[Node.js](http://nodejs.org) `>= 22.12` is required. To install, type this at the command line:

```
npm install @11ty/posthtml-urls
```

## Usage

```
const posthtml = require('posthtml');
const urls = require('@11ty/posthtml-urls');

const options = {
  // rawNode added in v1.0.3
  eachURL: (url, attr, tagName, rawNode) => `http://domain.com/${url}`
};

posthtml()
  .use( urls(options) )
  .process('<a href="link.html">link</a>')
  .then(result => console.log(result.html));
//-> <a href="http://domain.com/link.html">link</a>
```

## Options

### `eachURL`

Type: `Function` Default value: `undefined` A callback function ran for each URL value found. You can return either a synchronous value or a `Promise`. The `rawNode` argument was added in `v1.0.3`.

### `filter`

Type: `Object` Default value: [`{…}`](https://github.com/posthtml/posthtml-urls/blob/master/lib/defaultOptions.js) The elements and attributes for which to search. An attribute value can optionally be a function, for deeper filtering.

## FAQ

1.  **How can I filter `<style>` elements and `style` attributes?** Use [posthtml-postcss](https://npmjs.com/posthtml-postcss) and [postcss-url](https://npmjs.com/postcss-url).
