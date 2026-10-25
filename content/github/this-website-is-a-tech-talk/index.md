---
title: this-website-is-a-tech-talk
authors:
  - name: zachleat
    url: https://github.com/zachleat
    avatarUrl: 39355-BYqDKnzPAH8O.png
date: 2020-09-26T03:36:55.000Z
metadata:
  name: zachleat/this-website-is-a-tech-talk
  language: HTML
  license: MIT
  homepage: https://techtalk.zachleat.dev/
  uuid: 11ty/import::github::zachleat/this-website-is-a-tech-talk
  type: github
  url: https://github.com/zachleat/this-website-is-a-tech-talk
  importHash: 4aff1615b7520343
---
# This web site is a tech talk

-   [Watch @zachleat give this talk](https://www.zachleat.com/web/this-website-is-a-tech-talk/)
-   [Go through the slides yourself!](https://techtalk.zachleat.dev/) (Fair warning these are not touchscreen friendly)

## Keyboard commands

-   `Any key` Reveal another character
-   `Delete` (or `Backspace` on Windows) to hide a character
-   `⌘←` Previous slide
-   `⌘→` or `Enter` Next slide
-   `⌘↑` Back to index
-   \` Skip animation

## Run locally

This uses [Eleventy](https://www.11ty.dev/).

```
npm install
npm start
```

All of the slide content is stored in `slides/`. Clear this folder out to create your own presentation!

All of the front matter options for slides are documented in `_includes/slide.njk`.

## Features

-   “Fake” live coding (a la [https://hackertyper.com/](https://hackertyper.com/))
    -   Supports adding to boilerplate pre-populated code sample.
    -   Multiple cursor entry points on the same slide, jumps between them automatically.
    -   Multiple cursors!
    -   Supports “fake” deleting characters
-   Live preview of output in “Fake” browser
    -   Multiple alignment modes (side-by-side, top/bottom)
    -   Supports client-rendered Liquid syntax
-   “Fake” browser can show:
    -   Real web sites (via `<iframe>`)
    -   “Fake” web sites (via image screenshots—more offline friendly)
-   Show “Fake” terminal with “Fake” terminal output (progressively revealed).
    -   Scrolls with the text if it goes longer than a page
-   Benchmark and show Lighthouse scores for slide output (uses `<speedlify-score>`)

## Checklist before giving the talk

-   \[ \] Don’t use development mode (use `npm start` not `npm run dev`)
-   \[ \] Turn off notifications (disable anything that will reveal browser)
-   \[ \] Turn off scrollbars in Mac OS
