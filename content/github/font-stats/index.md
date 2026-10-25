---
title: font-stats
description: Generates useful information about a font from a font file.
authors:
  - name: zachleat
    url: https://github.com/zachleat
    avatarUrl: 39355-BYqDKnzPAH8O.png
date: 2017-12-22T03:03:54.000Z
metadata:
  name: zachleat/font-stats
  language: JavaScript
  license: MIT
  archived: true
  uuid: 11ty/import::github::zachleat/font-stats
  type: github
  url: https://github.com/zachleat/font-stats
  importHash: 49e47099829984f3
---
# font-stats

Generates useful information about a font from a font file.

For example:

-   Find all the ligatures contained within a font file (as groups of code points or strings).
-   Generate a unicode-range that directly matches all the code points in a font file.
-   Find all of the available OpenType features (`font-feature-settings` values) in a font file.

## Installation

Available on npm as [`font-stats`](https://www.npmjs.com/package/font-stats):

```
npm install font-stats
```

## Usage

```
let opensans = new FontStats("./fonts/OpenSans-Regular.ttf");
console.log( opensans.stats );
```
