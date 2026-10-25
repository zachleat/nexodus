---
title: fetch-links
description: Utility to fetch hyperlinks from a URL.
authors:
  - name: zachleat
    url: https://github.com/zachleat
    avatarUrl: 39355-BYqDKnzPAH8O.png
date: 2026-03-25T22:10:32.000Z
metadata:
  name: zachleat/fetch-links
  language: JavaScript
  uuid: 11ty/import::github::zachleat/fetch-links
  type: github
  url: https://github.com/zachleat/fetch-links
  importHash: 848764774e15d3a9
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
