---
title: demo-eleventy-js-front-matter
description: Demo of free-form JavaScript in front matter to populate the Data Cascade.
authors:
  - name: 11ty
    url: https://github.com/11ty
    avatarUrl: 35147177-vF4d9OMhxrvg.png
date: 2023-02-21T19:37:11.000Z
metadata:
  name: 11ty/demo-eleventy-js-front-matter
  language: Nunjucks
  archived: true
  uuid: 11ty/import::github::11ty/demo-eleventy-js-front-matter
  type: github
  url: https://github.com/11ty/demo-eleventy-js-front-matter
  importHash: 4d2f7c9d1f238d40
---
# demo-eleventy-javascript-front-matter

_✅ This functionality is [now available in Eleventy v3 core](https://www.11ty.dev/docs/data-frontmatter/#java-script-front-matter) and doesn’t require any additional configuration — just use the `js` or `javascript` front matter type! This repo is specifically for Eleventy v2._

A demo showing how to use free-form JavaScript in front matter to populate the data cascade.

This makes use of [Eleventy’s custom front matter format configuration API](https://www.11ty.dev/docs/data-frontmatter-customize/#example-use-javascript-in-your-front-matter).

Uses the [`node-retrieve-globals` package](https://github.com/zachleat/node-retrieve-globals/).

Check out `page.njk` for a Nunjucks example but this will work in any Eleventy template type (including Custom ones).

## Example

```
---javascript
const myString = "Hi";

// export a function
function myFunction() {}
---
<!-- The template content goes here -->
<div>{{ myString }}</div>
<div>{{ myFunction() }}</div>
```

### More Advanced Examples

```
---javascript
// async-friendly
const myAsyncString = await Promise.resolve("HELLO FROM THE OTHER SIDE");

// export via destructuring assignment
const { myKey } = { myKey: "myValue" };
const [ first, second ] = [ "first", "second" ];

// export via dynamic import
const { noop } = await import("@zachleat/noop");

// access Node.js globals like console.log
console.log({ noop });
---
<!-- The template content goes here -->
```
