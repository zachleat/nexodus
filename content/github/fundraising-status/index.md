---
title: fundraising-status
description: Web component to show the current status of a fundraiser.
authors:
  - name: zachleat
    url: https://github.com/zachleat
    avatarUrl: 39355-BYqDKnzPAH8O.png
date: 2024-05-22T14:32:18.000Z
metadata:
  name: zachleat/fundraising-status
  language: HTML
  license: MIT
  uuid: 11ty/import::github::zachleat/fundraising-status
  type: github
  url: https://github.com/zachleat/fundraising-status
  importHash: 2f95380ce62aa475
---
# fundraising-status

A web component to show the current status of a fundraiser, including goal amount and current value.

## Demo

-   [https://zachleat.github.io/fundraising-status/demo.html](https://zachleat.github.io/fundraising-status/demo.html)

## Installation

You can install via `npm` ([`@zachleat/fundraising-status`](https://www.npmjs.com/package/@zachleat/fundraising-status)) or download the `fundraising-status.js` JavaScript file manually.

```
npm install @zachleat/fundraising-status --save
```

Add `fundraising-status.js` to your site’s JavaScript assets.

## Usage

```
<!-- supply values -->
<fundraising-status min="0" max="200" value="100"></fundraising-status>

<!-- specify Intl.NumberFormat currency -->
<fundraising-status min="0" max="200" value="100" currency="USD"></fundraising-status>

<!-- change accent color -->
<fundraising-status style="--fs-color: blue"></fundraising-status>

<!-- scales with font-size -->
<fundraising-status style="font-size: 2em"></fundraising-status>
```
