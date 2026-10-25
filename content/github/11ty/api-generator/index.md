---
title: api-generator
description: Find the <meta name="generator"> for a web site
authors:
  - name: 11ty
    url: https://github.com/11ty
    avatarUrl: 35147177-vF4d9OMhxrvg.png
date: 2022-06-04T02:41:48.000Z
metadata:
  name: 11ty/api-generator
  language: JavaScript
  homepage: https://v1.generator.11ty.dev/
  uuid: 11ty/import::github::11ty/api-generator
  type: github
  url: https://github.com/11ty/api-generator
  importHash: 21bc9883162f2540
---
![11ty Logo](logo-github-gW5pow8pImUR.svg)

# api-generator

A runtime service to returns the avatar of the `<meta name="generator">` used on a web site.

This service currently supports:

-   11ty
-   Hugo
-   Gatsby
-   WordPress
-   Silex
-   Jekyll
-   Docusaurus
-   Gridsome
-   VuePress
-   VitePress
-   Hexo
-   Astro
-   Lume
-   Next
-   Nuxt

and I will happily merge PRs for others!

## Usage

URLs have the formats:

```
/json/:url/
/image/:url/
```

-   `url` must be URI encoded.

### Programmatic Usage

```
import FindGenerator from "@11ty/find-generator";

let g = new FindGenerator("https://www.11ty.dev/");
await g.fetch();

let content = g.findData();
// returns "Eleventy v4.0.0"
```

## Examples

-   See the “Built With” column on [https://www.speedlify.dev/ssg/](https://www.speedlify.dev/ssg/)
-   zachleat.com is built with ![Eleventy](-Fa47ZBmcuPwB.png)
-   11ty.dev is built with: ![Eleventy](-swMWS5tKi4hs.png)
-   gatsbyjs.com is built with: ![Gatsby](-8ZHyeYkpZ7wB.png)
-   littlecaesars.com is built with: ![Gatsby](-gsv1cIfiPxZ9.png)
