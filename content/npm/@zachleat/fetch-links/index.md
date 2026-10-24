---
title: '@zachleat/fetch-links'
description: Utility to fetch hyperlinks from a URL.
authors:
  - name: Zach Leatherman
    url: https://zachleat.com/
date: 2026-03-25T22:15:05.081Z
metadata:
  name: '@zachleat/fetch-links'
  version: 2.0.0
  license: MIT
  homepage: https://github.com/zachleat/fetch-links#readme
  repository: https://github.com/zachleat/fetch-links
  uuid: 11ty/import::npm::@zachleat/fetch-links
  type: npm
  url: https://www.npmjs.com/package/@zachleat/fetch-links
  importHash: 29f1a6c98a72b713
---
# Fetch Links

## Install

```
npm install @zachleat/fetch-links
```

## Usage

```
import { Links } from "@zachleat/fetch-links";

// returns <Array>
await Links.find("https://www.zachleat.com/");

/* [
  { url: 'mailto:zach@zachleat.com', via: [ 'link[href][rel="me"]' ] },
  { url: 'https://github.com/zachleat', via: [ 'link[href][rel="me"]' ] },
  // …
] */
```

## Changelog

-   `v2.0.0` Strips hashes from URLs. Filters out social media post URLs (keeping user profile URLs).
