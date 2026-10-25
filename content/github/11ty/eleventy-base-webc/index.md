---
title: eleventy-base-webc
description: A minimalist bare-bones starter project using Eleventy and WebC.
authors:
  - name: 11ty
    url: https://github.com/11ty
    avatarUrl: 35147177-vF4d9OMhxrvg.png
date: 2023-04-17T19:12:17.000Z
metadata:
  name: 11ty/eleventy-base-webc
  language: JavaScript
  license: MIT
  homepage: https://eleventy-base-webc.pages.dev/
  tags:
    - 11ty
    - eleventy
    - webc
  uuid: 11ty/import::github::11ty/eleventy-base-webc
  type: github
  url: https://github.com/11ty/eleventy-base-webc
  importHash: 1a4eb1af661cd84d
tags:
  - 11ty
  - eleventy
  - webc
---
# eleventy-base-webc

A minimalist bare-bones Eleventy-official starter project useful for demos/experiments with [WebC](https://www.11ty.dev/docs/languages/webc/) and the [Eleventy](https://www.11ty.dev/) site generator (using the [v3.0 release](https://www.11ty.dev/blog/canary-eleventy-v3/)).

## Features

-   [Eleventy WebC plugin](https://www.11ty.dev/docs/languages/webc/) preconfigured:
    -   Includes the [`<is-land>` WebC component](https://www.11ty.dev/docs/plugins/partial-hydration/) ready for use.
    -   Add your own `*.webc` files to the `_components` folder.
-   Using the new [`js` front matter type for arbitrary JavaScript front matter](https://www.11ty.dev/docs/data-frontmatter/#javascript-front-matter)
-   Simple WebC Eleventy Layout file with streamlined critical CSS and JS bundles (see `_includes/layouts/base.webc`)

## Get Started

1.  Make a copy of this code with **one** of these on the command line (both install into the current folder):
    -   `git clone https://github.com/11ty/eleventy-base-webc.git .`
    -   `npx degit 11ty/eleventy-base-webc`
    -   …or you can use the [_"Use this template"_ button on GitHub](https://github.com/11ty/eleventy-base-webc).
2.  Install the dependencies by running `npm install`
3.  Run it with `npm start` (see the other commands in `package.json` or on the [CLI docs](https://www.11ty.dev/docs/usage/))
4.  Navigate to `http://localhost:8080` in your web browser.
5.  Edit `content/index.webc` to change content on the home page.

## Demo

-   [Cloudflare Pages](https://eleventy-base-webc.pages.dev/)
-   [Netlify](https://eleventy-base-webc.netlify.app/)
-   Learn more about [deploying an Eleventy project to the web](https://www.11ty.dev/docs/deployment/).
