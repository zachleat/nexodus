---
title: list-all-tabs
description: Firefox extension to list tabs, find duplicates, and close them.
authors:
  - name: zachleat
    url: https://github.com/zachleat
    avatarUrl: 39355-BYqDKnzPAH8O.png
date: 2026-10-02T22:11:03.000Z
metadata:
  name: zachleat/list-all-tabs
  language: JavaScript
  uuid: 11ty/import::github::zachleat/list-all-tabs
  type: github
  url: https://github.com/zachleat/list-all-tabs
  importHash: 69bccd143e0fc365
---
# List All Tabs

A Firefox extension that lists every open tab across all windows, groups duplicates and busy sites (respecting Multi-Account Containers), and lets you jump to or close tabs individually or by site. Forked from [David Lazar’s original](https://addons.mozilla.org/en-US/firefox/addon/list-all-tabs/).

-   Download from Mozilla Add-ons: [https://addons.mozilla.org/en-US/firefox/addon/list-all-tabs-updated/](https://addons.mozilla.org/en-US/firefox/addon/list-all-tabs-updated/)

## Notes for me, the developer

-   Source code: [https://github.com/zachleat/list-all-tabs](https://github.com/zachleat/list-all-tabs)
-   For local dev: `about:debugging#/runtime/this-firefox` and choose the `manifest.json`
-   For publish: `npx web-ext build --overwrite-dest` will build a zip file to upload
    -   Manage addons here: [https://addons.mozilla.org/en-US/developers/addons](https://addons.mozilla.org/en-US/developers/addons)
