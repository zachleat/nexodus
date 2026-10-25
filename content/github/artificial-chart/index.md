---
title: artificial-chart
description: An SVG charting library based on D3.js
authors:
  - name: zachleat
    url: https://github.com/zachleat
    avatarUrl: 39355-BYqDKnzPAH8O.png
date: 2021-11-01T15:33:32.000Z
metadata:
  name: zachleat/artificial-chart
  language: JavaScript
  uuid: 11ty/import::github::zachleat/artificial-chart
  type: github
  url: https://github.com/zachleat/artificial-chart
  importHash: ac8bd0e797ce57bd
---
# artificial-chart

The SVG D3.js based charting solution used for the Jamstack Community Survey.

## [Demo](https://zachleat.github.io/artificial-chart/demo.html)

All of the charts are viewable on [https://jamstack.org/survey/2021/](https://jamstack.org/survey/2021/)

## Features

-   Responsive Web Design friendly charts
-   Progressive-enhancement friendly, draws data from HTML tables. Warning: does not include a No-JS visual view.
-   Horizontal and vertical bar chart type
    -   Supports grouped data visualized side by side or stacked.
    -   Supports proportional data (scaling to 100%)
    -   Option to show inline labels inside or outside of the bars.
-   Bubble chart type
-   Styles nicely with gradients
-   Customizable margins
-   Wrapping on axis labels
-   Supports customized label precision
-   Supports auto-generated HTML legends (outside of the SVG).
-   Uses IntersectionObserver and ResizeObserver (when available) for better performance on initialization and resize.

## Changelog

-   `v2.0.0` swap to ESM

## Usage

```
import "https://d3js.org/d3.v7.min.js";

import { HorizontalBar, VerticalBar, Bubble } from "./artificial-chart.js";

new VerticalBar("chart-id", "source-table-id", {
  showInlineBarValues: "outside",
});
```
