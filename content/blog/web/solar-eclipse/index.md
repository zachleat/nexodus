---
title: Solar Eclipse Toggle Web Component (two state dark/light mode toggle)
authors:
  - name: Zach Leatherman
date: 2026-09-14T05:00:00.000Z
metadata:
  uuid: 11ty/import::atom::https://www.zachleat.com/web/solar-eclipse/
  type: atom
  url: https://www.zachleat.com/web/solar-eclipse/
  importHash: 2bc22996ea3268f1
---
In [Trying out a Two-state Dark Mode Toggle](https://www.zachleat.com/web/two-state-dark-mode-toggle/) I summarized the Two-state Dark and Light mode Toggle discussion as I experimented with a toggle in my personal website footer.

After launch, [Curtis Wilcox left some good feedback to improve the accessibility of the component](https://fediverse.zachleat.com/@cwilcox808@c.im/117259821195055457).

I decided to fold this into a reusable component so that I can benefit from this work on future websites (and you can use it too, I guess!). It’s called `@zachleat/solar-eclipse-toggle` and you can find it [on GitHub](https://github.com/zachleat/solar-eclipse-toggle) or [on npm now](https://www.npmjs.com/package/@zachleat/solar-eclipse-toggle).

-   [**Demo**](https://zachleat.github.io/solar-eclipse-toggle/demo.html)
-   …or in the footer of this website.
-   …also in the footer on [Speedlify](https://www.speedlify.dev/).

My favorite parts about the component are that it shows an inert button pre-JS, incurs no CLS, is still functional when the (separate) CSS doesn’t load successfully (`[hidden]` for the win), and all strings are inserted from light DOM for good internationalization.

Hope it’s useful to others!

## Installation

```
npm install @zachleat/solar-eclipse-toggle
```
