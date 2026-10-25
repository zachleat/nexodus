---
title: eleventy-plugin-vue
description: Use Vue.js templates and Vue.js single file components in Eleventy.
authors:
  - name: 11ty
    url: https://github.com/11ty
    avatarUrl: 35147177-vF4d9OMhxrvg.png
date: 2020-03-19T18:02:30.000Z
metadata:
  name: 11ty/eleventy-plugin-vue
  language: JavaScript
  archived: true
  tags:
    - eleventy
    - eleventy-plugin
    - vue
    - vuejs
  uuid: 11ty/import::github::11ty/eleventy-plugin-vue
  type: github
  url: https://github.com/11ty/eleventy-plugin-vue
  importHash: c385128673ed1c6f
tags:
  - eleventy
  - eleventy-plugin
  - vue
  - vuejs
---
> \[!IMPORTANT\] This repository is archived. `@11ty/eleventy-plugin-vue` now lives at [`11ty/eleventy-plugin-template-languages/vue`](https://github.com/11ty/eleventy-plugin-template-languages/tree/main/vue). Please file issues on [the new repository](https://github.com/11ty/eleventy-plugin-template-languages/issues).

![eleventy Logo](logo-github-gW5pow8pImUR.svg)

# eleventy-plugin-vue for Vue 3 🕚⚡️🎈🐀

Adds Vue Single File Component (SFC) support to Eleventy. Eleventy processes `.vue` SFC files as Eleventy templates and outputs zero-bundle size server rendered components.

Read more about the goals of this plugin (and a full tutorial!) at [Eleventy and Vue, a match made to power Netlify.com](https://www.netlify.com/blog/2020/09/18/eleventy-and-vue-a-match-made-to-power-netlify.com/)

## Installation

```
npm install @11ty/eleventy-plugin-vue
```

-   `1.x` requires Eleventy `1.0.0` or newer
-   `0.2.x` encouraged to use Eleventy `0.11.1` or newer (for incremental Vue component builds)
-   `0.1.x` requires Eleventy `0.11.0` or newer

### Changelog

-   `1.0.0` ([Milestone](https://github.com/11ty/eleventy-plugin-vue/milestone/6?closed=1)) Works with Vue 3. Adds Windows support.
-   `0.6.x` ([Milestone](https://github.com/11ty/eleventy-plugin-vue/milestone/5?closed=1))
-   `0.3.1` ([Milestone](https://github.com/11ty/eleventy-plugin-vue/milestone/4?closed=1))
-   `0.3.0` ([Milestone](https://github.com/11ty/eleventy-plugin-vue/milestone/3?closed=1)) More consistent incremental builds. Performance improvements.
-   `0.2.1` ([Milestone](https://github.com/11ty/eleventy-plugin-vue/milestone/2?closed=1)) adds incremental builds for Eleventy Vue components to avoid unnecessary repeat work. Fixes bug with `permalink` strings returned from Vue Single File Component data.
-   `0.1.x` converted to use a Single File Components for everything (templates, components, etc), instead of `0.0.x`’s string templates with front matter.

## Features

-   Builds `*.vue`’s Single File Components, both in the input directory and in Eleventy’s includes directory. `.vue` files in the includes directory are available for import. Same as any Eleventy template syntax, includes do not write files to your output directory.
-   Works with Vue’s Single File Components, including with `scoped` CSS.
-   Data from SFC files feeds into the data cascade (similar to front matter)
-   All JavaScript Template Functions (see [https://www.11ty.dev/docs/languages/javascript/#javascript-template-functions](https://www.11ty.dev/docs/languages/javascript/#javascript-template-functions)), Universal Filters, Universal Shortcodes, Universal Paired Shortcodes are available as Vue `methods` (global functions to use in templates and child components).
    -   For example, you can use the [`url` Universal Filter](https://www.11ty.dev/docs/filters/url/) like `url("/my-url/")` in your Vue templates.
-   `page` Eleventy supplied data is also available globally in all components.

### Not Yet Available

-   Using `.vue` templates as Eleventy layouts is not yet supported. Subscribe to this issue at [#5](https://github.com/11ty/eleventy-plugin-vue/issues/5).
-   Does not yet embed any client-side JavaScript from inside single file components into the output for use on the client.
-   `lang` on `<template>`, `<style>`, or `<script>` is not yet supported.

## Usage

### Add to Configuration File

Usually `.eleventy.js`:

```
const eleventyVue = require("@11ty/eleventy-plugin-vue");

module.exports = function(eleventyConfig) {
  // Use Defaults
  eleventyConfig.addPlugin(eleventyVue);
};
```

#### Customize with Options

```
const eleventyVue = require("@11ty/eleventy-plugin-vue");

module.exports = function(eleventyConfig) {
  // OR, Use your own options
  eleventyConfig.addPlugin(eleventyVue, {
    // Directory to store compiled Vue single file components
    cacheDirectory: ".cache/vue/",

    // Pass in a file or multiple .vue files to limit compilation
    // If this is empty, the plugin will search for all *.vue files
    input: [],

    // Use postcss in the single file components
    rollupPluginVueOptions: {
      style: {
        postcssPlugins: [
          require("autoprefixer"),
          require("postcss-nested")
        ]
      }
    },

    // Passed to rollup.rollup
    rollupOptions: {
      // Declare your own external dependencies
      external: [],

      // Use your own Rollup plugins
      plugins: [],
    },
  });
};
```

For a full list of `rollupPluginVueOptions`, see [`rollup-plugin-vue`’s Options](https://rollup-plugin-vue.vuejs.org/options.html#include).

#### Advanced: Use with `eleventy-assets`

_Compatible with @11ty/eleventy-plugin-vue 0.0.5 and newer._

[Eleventy’s Assets plugin](https://github.com/11ty/eleventy-assets) lets you manage your own Inline CSS or JavaScript. For the first version of the Eleventy Vue plugin, you can reuse an existing CSS code manager from `eleventy-assets` add CSS from your Vue.js Single File Components too.

```
const eleventyVue = require("@11ty/eleventy-plugin-vue");
const { InlineCodeManager } = require("@11ty/eleventy-assets");

module.exports = function(eleventyConfig) {
  let myCssManager = new InlineCodeManager();

  eleventyConfig.addPlugin(eleventyVue, {
    // Re-use an existing `eleventy-assets` Manager
    assets: {
      css: myCssManager
    }
  });
};
```

#### Advanced: Run async things before component render

_Available with Eleventy 1.0+ and Eleventy Vue Plugin 0.6+_

Use [`serverPrefetch`](https://ssr.vuejs.org/guide/data.html) to tell the component to do a few async things before it renders the component.

Below is an example of a Vue template that uses [the Eleventy Render Plugin](https://11ty.dev/docs/plugins/render/) to render Markdown (either in an external file or a string).

```
<template>
  <header v-html="content"/>
</template>
<script>
export default {
  async serverPrefetch() {
    // let content = await this.renderFile("./_includes/blogpost.md", "md");
    this.content = await this.renderTemplate("# Title", "md");
  }
}
</script>
```
