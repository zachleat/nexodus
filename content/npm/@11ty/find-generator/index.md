---
title: '@11ty/find-generator'
description: Find the <meta name='generator'> value from a web site URL.
authors:
  - name: Zach Leatherman
    url: https://zachleat.com/
date: 2025-03-26T16:50:38.151Z
metadata:
  name: '@11ty/find-generator'
  version: 2.0.0
  license: MIT
  homepage: https://github.com/11ty/api-generator#readme
  repository: https://github.com/11ty/api-generator
  uuid: 11ty/import::npm::@11ty/find-generator
  type: npm
  url: https://www.npmjs.com/package/@11ty/find-generator
  importHash: 1a18a5a89acf3286
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
