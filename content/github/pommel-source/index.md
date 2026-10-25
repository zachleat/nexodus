---
title: pommel-source
description: A details/summary plugin to expand and show source code.
authors:
  - name: zachleat
    url: https://github.com/zachleat
    avatarUrl: 39355-BYqDKnzPAH8O.png
date: 2020-08-30T03:55:24.000Z
metadata:
  name: zachleat/pommel-source
  language: CSS
  homepage: https://pommel-source.netlify.app/
  archived: true
  uuid: 11ty/import::github::zachleat/pommel-source
  type: github
  url: https://github.com/zachleat/pommel-source
  importHash: 3340b4517e74ab8d
---
# pommel-source

A CSS file to better style a zero-dependency details/summary plugin to expand and show source code.

## Installation

Available on [npm](https://www.npmjs.com/package/pommel-source).

```
npm install pommel-source
```

## Usage

```
<link rel="stylesheet" href="pommel-source.css">
<details class="pommel-source" open>
	<summary>Embed</summary>
	<pre>* { box-sizing: border-box; }</pre>
</details>
```

### Works with @11ty/eleventy-plugin-syntaxhighlight

```
<!-- include Prism theme -->
<link rel="stylesheet" href="prism-theme.css">
<link rel="stylesheet" href="pommel-source.css">

<details class="pommel-source" open>
	<summary>Embed</summary>
	{%- highlight css %}
* { box-sizing: border-box; }
	{%- endhighlight %}
</details>
```
