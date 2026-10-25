---
title: api-screenshot
description: A service to add web page screenshots to your Eleventy sites.
authors:
  - name: 11ty
    url: https://github.com/11ty
    avatarUrl: 35147177-vF4d9OMhxrvg.png
date: 2021-07-21T02:13:11.000Z
metadata:
  name: 11ty/api-screenshot
  language: JavaScript
  homepage: https://v1.screenshot.11ty.dev
  tags:
    - eleventy
    - eleventy-api
  uuid: 11ty/import::github::11ty/api-screenshot
  type: github
  url: https://github.com/11ty/api-screenshot
  importHash: 570d4410f17bbec3
tags:
  - eleventy
  - eleventy-api
---
![11ty Logo](logo-github-gW5pow8pImUR.svg)

# Screenshot API

A runtime service to use live website screenshots on your site.

Read the [Blog post: Building an Automated Screenshot Service on Netlify in ~140 Lines of Code](https://www.zachleat.com/web/screenshots/).

## Usage

Image URLs have the formats:

```
/:url/
/:url/:size/
/:url/:size/x.jpg
/:url/:size/:aspectratio/
/:url/:size/:aspectratio/:zoom/
```

-   `url` must be URI encoded.
-   Valid `size` values:
    -   `small`: 375×\_\_\_ (default)
    -   `medium`: 650×\_\_\_
    -   `large`: 1024×\_\_\_
        -   `aspectratio` of `9:16` is not supported (throws an error)
    -   `opengraph`: always 1200×630, works with `zoom`
        -   `aspectratio` is ignored (no errors thrown)
-   Valid `aspectratio` values:
    -   `1:1` (default)
    -   `9:16`
-   Valid `zoom` values:
    -   `bigger` (1.4 `devicePixelRatio`)
    -   `smaller` (0.71 `devicePixelRatio`)

### Advanced Options

#### Custom Wait Conditions

You can customize the conditions with which the headless browser will wait to take the screenshot. At a low level, this controls the [`waitUntil` property in Puppeteer’s `goto` call](https://pptr.dev/#?product=Puppeteer&version=v13.3.1&show=api-pagegotourl-options). The options are:

-   DOMContentLoaded `wait:0`
-   Load event `wait:1` (default)
-   Load event and there have been no network connections for 500ms: `wait:2`
-   Load event and there are fewer than two network connections for 500ms: `wait:3`

```
/:url/_wait:0/
/:url/_wait:1/
/:url/_wait:2/
/:url/_wait:3/
```

#### Custom Timeout

Number of seconds to wait before the request times out. We will attempt to simulate the stop button and return the screenshot that exists up to that point. Worst case, a default Eleventy logo is returned.

-   Minimum: `3`
-   Maximum: `9`

```
/:url/_timeout:3/
/:url/_timeout:9/
```

#### Combine these options

You can use any of these advanced options together, like `/:url/_wait:0_timeout:2/`. Order only matters to the uniqueness of the URL caching on the CDN: `/:url/_wait:0/` and `/:url/_wait:0/` will be functionally equivalent but make two different screenshot requests.
