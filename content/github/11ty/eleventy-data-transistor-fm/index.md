---
title: eleventy-data-transistor-fm
description: An Eleventy data plugin to source transistor.fm episodes.
authors:
  - name: 11ty
    url: https://github.com/11ty
    avatarUrl: 35147177-vF4d9OMhxrvg.png
date: 2021-11-29T17:50:42.000Z
metadata:
  name: 11ty/eleventy-data-transistor-fm
  language: JavaScript
  archived: true
  tags:
    - eleventy
    - eleventy-plugin
  uuid: 11ty/import::github::11ty/eleventy-data-transistor-fm
  type: github
  url: https://github.com/11ty/eleventy-data-transistor-fm
  importHash: 0bdace671165ba5d
tags:
  - eleventy
  - eleventy-plugin
---
# Eleventy Data Plugin: Transistor.fm

API Docs: [https://developers.transistor.fm/#episodes](https://developers.transistor.fm/#episodes)

## Installation:

```
npm install @11ty/eleventy-data-transistor-fm
```

## Usage

```
const TransistorFmPlugin = require("@11ty/eleventy-data-transistor-fm");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(TransistorFmPlugin);
};
```

### In a template

By default, the episodes are stored in `transistorfm.episodes` (this is configurable).

```
{% for episode in transistorfm.episodes %}
  {{ episode.title }}
{% endfor %}
```

### Use with an API key

By default, a Transistor FM API key is optional. If you want to use one, create a `.env` file and add an entry for `TRANSISTOR_FM_API_KEY`:

```
TRANSISTOR_FM_API_KEY=This is my key
```

You can make the key required or even change the name of the environment variable by passing options to your plugin.

### Pass in options

```
const TransistorFmPlugin = require("@11ty/eleventy-data-transistor-fm");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(TransistorFmPlugin, {
    envApiKey: "TRANSISTOR_FM_API_KEY", // the name of the environment variable for the API key

    envApiKeyRequired: false, // fail if the environment variable is missing?

    data: "transistorfm.episodes", // where in Eleventy to store the return data
  });
};
```
