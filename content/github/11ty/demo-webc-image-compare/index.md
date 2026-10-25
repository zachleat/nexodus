---
title: demo-webc-image-compare
description: Server rendered image comparison web components built using WebC
authors:
  - name: 11ty
    url: https://github.com/11ty
    avatarUrl: 35147177-vF4d9OMhxrvg.png
date: 2022-10-21T17:02:40.000Z
metadata:
  name: 11ty/demo-webc-image-compare
  language: JavaScript
  license: MIT
  homepage: https://demo-webc-image-compare.netlify.app/
  uuid: 11ty/import::github::11ty/demo-webc-image-compare
  type: github
  url: https://github.com/11ty/demo-webc-image-compare
  importHash: 90ac53e617dcc361
---
# Progressive Enhancement Recipes using Eleventy WebC Image Comparison Components

A bunch of examples of progressively enhanced server-rendered image comparison web components using WebC.

This component expects two images to be nested inside and will produce a input type range to let the user compare the two images by dragging the range slider.

-   [Live demo on Netlify](https://demo-webc-image-compare.netlify.app/)
-   [Deploy to Netlify](https://app.netlify.com/start/deploy?repository=https://github.com/11ty/demo-webc-image-compare)
-   [Learn more about WebC](https://www.11ty.dev/docs/languages/webc/)
-   Originally a demo for a talk given at the [Eleventy Meetup: Adding Components to WebC with Eleventy](https://www.zachleat.com/web/webc-in-eleventy/)

## Examples

1.  [Always Enabled](https://demo-webc-image-compare.netlify.app/#enabled): form control is interactive pre-JS and synchronizes post-JS.
2.  [Disabled until JavaScript](https://demo-webc-image-compare.netlify.app/#disabled): uses JS to toggle the range input from disabled to enabled.
3.  [Hidden via `:not(:defined)` CSS](https://demo-webc-image-compare.netlify.app/#hidden-css)
4.  [Hidden via JS `<template>`](https://demo-webc-image-compare.netlify.app/#hidden-tmpl)
5.  [Declarative Shadow DOM](https://demo-webc-image-compare.netlify.app/#dsd)
6.  [`:has()` and Radios](https://demo-webc-image-compare.netlify.app/#has-radios)
7.  [Bonus: `opacity` Slider](https://demo-webc-image-compare.netlify.app/#opacity)
