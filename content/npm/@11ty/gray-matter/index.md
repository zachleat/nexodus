---
title: '@11ty/gray-matter'
description: >-
  Parse front-matter from a string or file. Fast, reliable and easy to use.
  Parses YAML front matter by default, but also has support for YAML, JSON, TOML
  Front-Matter, with options to set custom delimiters. Used by metalsmith,
  assemble, verb and many other
authors:
  - name: Jon Schlinkert
    url: https://github.com/jonschlinkert
date: 2025-05-12T15:10:07.375Z
metadata:
  name: '@11ty/gray-matter'
  version: 3.0.0
  license: MIT
  homepage: https://github.com/11ty/gray-matter
  repository: https://github.com/11ty/gray-matter
  tags:
    - assemble
    - data
    - docs
    - documentation
    - extract
    - extracting
    - front
    - front-matter
    - frontmatter
    - generate
    - generator
    - gh-pages
    - gray
    - javascript
    - jekyll
    - js
    - JSON
    - markdown
    - matter
    - parse
    - parser
    - parsing
    - site
    - static
    - template
    - toml
    - yaml
    - yfm
  uuid: 11ty/import::npm::@11ty/gray-matter
  type: npm
  url: https://www.npmjs.com/package/@11ty/gray-matter
  importHash: f3f83e6587fc92fa
tags:
  - assemble
  - data
  - docs
  - documentation
  - extract
  - extracting
  - front
  - front-matter
  - frontmatter
  - generate
  - generator
  - gh-pages
  - gray
  - javascript
  - jekyll
  - js
  - json
  - markdown
  - matter
  - parse
  - parser
  - parsing
  - site
  - static
  - template
  - toml
  - yaml
  - yfm
---
# @11ty/gray-matter

Reduced and maintained fork of [`gray-matter` originally by Jon Schlinkert](https://www.npmjs.com/package/gray-matter).

Current differences:

-   [Upstream package last released in 2019](https://github.com/jonschlinkert/gray-matter/releases/tag/4.0.2).
-   Upgrades `js-yaml` major version to v4
-   Uses Uint8Array internally instead of Node-env specific Buffer for more runtime compatibility.
-   Removes `javascript` front matter type (removing use of `eval`)

> Parse front-matter from a string or file. Fast, reliable and easy to use. Parses YAML front matter by default, but also has support for YAML, JSON, or TOML Front-Matter, with options to set custom delimiters.

## Install

Install with [npm](https://www.npmjs.com/):

```
$ npm install --save @11ty/gray-matter
```

## Heads up!

Please see the [changelog](https://github.com/11ty/gray-matter/blob/HEAD/CHANGELOG.md) to learn about breaking changes that were made in v3.0.

  

## What does this do?

<details><summary><strong>Run this example</strong></summary><p>Add the HTML in the following example to <code>example.html</code>, then add the following code to <code>example.js</code> and run <code>$ node example</code> (without the <code>$</code>):</p><pre><code class="language-js">const fs = require('fs');
const matter = require('@11ty/gray-matter');
const str = fs.readFileSync('example.html', 'utf8');
console.log(matter(str));
</code></pre></details>

Converts a string with front-matter, like this:

```
---
title: Hello
slug: home
---
<h1>Hello world!</h1>
```

Into an object like this:

```
{
  content: '<h1>Hello world!</h1>',
  data: {
    title: 'Hello',
    slug: 'home'
  }
}
```

## Why use gray-matter?

-   **simple**: main function takes a string and returns an object
-   **accurate**: better at catching and handling edge cases than front-matter parsers that rely on regex for parsing
-   **fast**: faster than other front-matter parsers that use regex for parsing
-   **flexible**: By default, gray-matter is capable of parsing [YAML](https://github.com/nodeca/js-yaml), [JSON](http://en.wikipedia.org/wiki/Json) and JavaScript front-matter. But other [engines](#optionsengines) may be added.
-   **extensible**: Use [custom delimiters](#optionsdelimiters), or add support for [any language](#optionsengines), like [TOML](http://github.com/mojombo/toml).
-   **battle-tested**: used by [assemble](https://github.com/assemble/assemble), [metalsmith](https://github.com/segmentio/metalsmith), [phenomic](https://github.com/phenomic/phenomic), [verb](https://github.com/assemble/verb), [generate](https://github.com/generate/generate), [update](https://github.com/update/update) and many others.

<details><summary><strong>Rationale</strong></summary><p><strong>Why did we create gray-matter in the first place?</strong></p><p>We created gray-matter after trying out other libraries that failed to meet our standards and requirements.</p><p>Some libraries met most of the requirements, but <em>none met all of them</em>.</p><p><strong>Here are the most important</strong>:</p><ul><li>Be usable, if not simple</li><li>Use a dependable and well-supported library for parsing YAML</li><li>Support other languages besides YAML</li><li>Support stringifying back to YAML or another language</li><li>Don't fail when no content exists</li><li>Don't fail when no front matter exists</li><li>Don't use regex for parsing. This is a relatively simple parsing operation, and regex is the slowest and most error-prone way to do it.</li><li>Have no problem reading YAML files directly</li><li>Have no problem with complex content, including <strong>non-front-matter</strong> fenced code blocks that contain examples of YAML front matter. Other parsers fail on this.</li><li>Support stringifying back to front-matter. This is useful for linting, updating properties, etc.</li><li>Allow custom delimiters, when it's necessary for avoiding delimiter collision.</li><li>Should return an object with at least these three properties:<ul><li><code>data</code>: the parsed YAML front matter, as a JSON object</li><li><code>content</code>: the contents as a string, without the front matter</li><li><code>orig</code>: the "original" content (for debugging)</li></ul></li></ul></details>

## Usage

Using CommonJS:

```
const matter = require('@11ty/gray-matter');
```

Or ESM:

```
import matter = require('@11ty/gray-matter');
// OR
import * as matter from '@11ty/gray-matter';
```

Pass a string and [options](#options) to gray-matter:

```
console.log(matter('---\ntitle: Front Matter\n---\nThis is content.'));
```

Returns:

```
{
  content: '\nThis is content.',
  data: {
    title: 'Front Matter'
  }
}
```

More about the returned object in the following section.

* * *

## Returned object

gray-matter returns a `file` object with the following properties.

**Enumerable**

-   `file.data` **{Object}**: the object created by parsing front-matter
-   `file.content` **{String}**: the input string, with `matter` stripped
-   `file.excerpt` **{String}**: an excerpt, if [defined on the options](#optionsexcerpt)
-   `file.empty` **{String}**: when the front-matter is "empty" (either all whitespace, nothing at all, or just comments and no data), the original string is set on this property. See [#65](https://github.com/jonschlinkert/gray-matter/issues/65) for details regarding use case.
-   `file.isEmpty` **{Boolean}**: true if front-matter is empty.

**Non-enumerable**

In addition, the following non-enumberable properties are added to the object to help with debugging.

-   `file.orig` **{Uint8Array}**: the original input string (or Uint8Array)
-   `file.language` **{String}**: the front-matter language that was parsed. `yaml` is the default
-   `file.matter` **{String}**: the _raw_, un-parsed front-matter string
-   `file.stringify` **{Function}**: [stringify](#stringify) the file by converting `file.data` to a string in the given language, wrapping it in delimiters and prepending it to `file.content`.

## Run the examples

If you'd like to test-drive the examples, first clone gray-matter into `my-project` (or wherever you want):

```
$ git clone https://github.com/jonschlinkert/gray-matter my-project
```

CD into `my-project` and install dependencies:

```
$ cd my-project && npm install
```

Then run any of the [examples](https://github.com/11ty/gray-matter/blob/HEAD/examples) to see how gray-matter works:

```
$ node examples/<example_name>
```

**Links to examples**

-   [excerpt-separator](https://github.com/11ty/gray-matter/blob/HEAD/examples/excerpt-separator.js)
-   [excerpt-stringify](https://github.com/11ty/gray-matter/blob/HEAD/examples/excerpt-stringify.js)
-   [excerpt](https://github.com/11ty/gray-matter/blob/HEAD/examples/excerpt.js)
-   [javascript](https://github.com/11ty/gray-matter/blob/HEAD/examples/javascript.js)
-   [json-stringify](https://github.com/11ty/gray-matter/blob/HEAD/examples/json-stringify.js)
-   [json](https://github.com/11ty/gray-matter/blob/HEAD/examples/json.js)
-   [restore-empty](https://github.com/11ty/gray-matter/blob/HEAD/examples/restore-empty.js)
-   [sections-excerpt](https://github.com/11ty/gray-matter/blob/HEAD/examples/sections-excerpt.js)
-   [sections](https://github.com/11ty/gray-matter/blob/HEAD/examples/sections.js)
-   [toml](https://github.com/11ty/gray-matter/blob/HEAD/examples/toml.js)
-   [yaml-stringify](https://github.com/11ty/gray-matter/blob/HEAD/examples/yaml-stringify.js)
-   [yaml](https://github.com/11ty/gray-matter/blob/HEAD/examples/yaml.js)

## API

### [matter](https://github.com/11ty/gray-matter/blob/HEAD/index.js#L29)

Takes a string or object with `content` property, extracts and parses front-matter from the string, then returns an object with `data`, `content` and other [useful properties](#returned-object).

**Params**

-   `input` **{Object|String}**: String, or object with `content` string
-   `options` **{Object}**
-   `returns` **{Object}**

**Example**

```
const matter = require('@11ty/gray-matter');
console.log(matter('---\ntitle: Home\n---\nOther stuff'));
//=> { data: { title: 'Home'}, content: 'Other stuff' }
```

### [.stringify](https://github.com/11ty/gray-matter/blob/HEAD/index.js#L160)

Stringify an object to YAML or the specified language, and append it to the given string. By default, only YAML and JSON can be stringified. See the [engines](#engines) section to learn how to stringify other languages.

**Params**

-   `file` **{String|Object}**: The content string to append to stringified front-matter, or a file object with `file.content` string.
-   `data` **{Object}**: Front matter to stringify.
-   `options` **{Object}**: [Options](#options) to pass to gray-matter and [js-yaml](https://github.com/nodeca/js-yaml).
-   `returns` **{String}**: Returns a string created by wrapping stringified yaml with delimiters, and appending that to the given string.

**Example**

```
console.log(matter.stringify('foo bar baz', {title: 'Home'}));
// results in:
// ---
// title: Home
// ---
// foo bar baz
```

### [.read](https://github.com/11ty/gray-matter/blob/HEAD/index.js#L178)

Synchronously read a file from the file system and parse front matter. Returns the same object as the [main function](#matter).

**Params**

-   `filepath` **{String}**: file path of the file to read.
-   `options` **{Object}**: [Options](#options) to pass to gray-matter.
-   `returns` **{Object}**: Returns [an object](#returned-object) with `data` and `content`

**Example**

```
const file = matter.read('./content/blog-post.md');
```

### [.test](https://github.com/11ty/gray-matter/blob/HEAD/index.js#L193)

Returns true if the given `string` has front matter.

**Params**

-   `string` **{String}**
-   `options` **{Object}**
-   `returns` **{Boolean}**: True if front matter exists.

## Options

### options.excerpt

**Type**: `Boolean|Function`

**Default**: `undefined`

Extract an excerpt that directly follows front-matter, or is the first thing in the string if no front-matter exists.

If set to `excerpt: true`, it will look for the frontmatter delimiter, `---` by default and grab everything leading up to it.

**Example**

```
const str = '---\nfoo: bar\n---\nThis is an excerpt.\n---\nThis is content';
const file = matter(str, { excerpt: true });
```

Results in:

```
{
  content: 'This is an excerpt.\n---\nThis is content',
  data: { foo: 'bar' },
  excerpt: 'This is an excerpt.\n'
}
```

You can also set `excerpt` to a function. This function uses the 'file' and 'options' that were initially passed to gray-matter as parameters, so you can control how the excerpt is extracted from the content.

**Example**

```
// returns the first 4 lines of the contents
function firstFourLines(file, options) {
  file.excerpt = file.content.split('\n').slice(0, 4).join(' ');
}

const file =  matter([
  '---',
  'foo: bar',
  '---',
  'Only this',
  'will be',
  'in the',
  'excerpt',
  'but not this...'
].join('\n'), {excerpt: firstFourLines});
```

Results in:

```
{
  content: 'Only this\nwill be\nin the\nexcerpt\nbut not this...',
  data: { foo: 'bar' },
  excerpt: 'Only this will be in the excerpt'
}
```

### options.excerpt\_separator

**Type**: `String`

**Default**: `undefined`

Define a custom separator to use for excerpts.

```
console.log(matter(string, {excerpt_separator: '<!-- end -->'}));
```

**Example**

The following HTML string:

```
---
title: Blog
---
My awesome blog.
<!-- end -->
<h1>Hello world</h1>
```

Results in:

```
{
  data: { title: 'Blog'},
  excerpt: 'My awesome blog.',
  content: 'My awesome blog.\n<!-- end -->\n<h1>Hello world</h1>'
}
```

### options.engines

Define custom engines for parsing and/or stringifying front-matter.

**Type**: `Object` Object of engines

**Default**: `JSON`, `YAML` and `JavaScript` are already handled by default.

**Engine format**

Engines may either be an object with `parse` and (optionally) `stringify` methods, or a function that will be used for parsing only.

**Examples**

```
const toml = require('toml');

/**
 * defined as a function
 */

const file = matter(str, {
  engines: {
    toml: toml.parse.bind(toml),
  }
});

/**
 * Or as an object
 */

const file = matter(str, {
  engines: {
    toml: {
      parse: toml.parse.bind(toml),

      // example of throwing an error to let users know stringifying is
      // not supported (a TOML stringifier might exist, this is just an example)
      stringify: function() {
        throw new Error('cannot stringify to TOML');
      }
    }
  }
});

console.log(file);
```

### options.language

**Type**: `String`

**Default**: `yaml`

Define the engine to use for parsing front-matter.

```
console.log(matter(string, {language: 'toml'}));
```

**Example**

The following HTML string:

```
---
title = "TOML"
description = "Front matter"
categories = "front matter toml"
---
This is content
```

Results in:

```
{ content: 'This is content',
  excerpt: '',
  data:
   { title: 'TOML',
     description: 'Front matter',
     categories: 'front matter toml' } }
```

**Dynamic language detection**

Instead of defining the language on the options, gray-matter will automatically detect the language defined after the first delimiter and select the correct engine to use for parsing.

```
---toml
title = "TOML"
description = "Front matter"
categories = "front matter toml"
---
This is content
```

### options.delimiters

**Type**: `String`

**Default**: `---`

Open and close delimiters can be passed in as an array of strings.

**Example:**

```
// format delims as a string
matter.read('file.md', {delims: '~~~'});
// or an array (open/close)
matter.read('file.md', {delims: ['~~~', '~~~']});
```

would parse:

```
~~~
title: Home
~~~
This is the {{title}} page.
```

## Deprecated options

### options.lang

Decrecated, please use [options.language](#optionslanguage) instead.

### options.delims

Decrecated, please use [options.delimiters](#optionsdelimiters) instead.

### options.parsers

Decrecated, please use [options.engines](#optionsengines) instead.

## About

<details><summary><strong>Contributing</strong></summary><p>Pull requests and stars are always welcome. For bugs and feature requests, <a href="https://github.com/11ty/gray-matter/issues/new">please create an issue</a>.</p></details><details><summary><strong>Running Tests</strong></summary><p>Running and reviewing unit tests is a great way to get familiarized with a library and its API. You can install dependencies and run tests with the following command:</p><pre><code class="language-sh">$ npm install &amp;&amp; npm test
</code></pre></details>

### Contributors

<table><thead><tr><th><strong>Commits</strong></th><th><strong>Contributor</strong></th></tr></thead><tbody><tr><td>179</td><td><a href="https://github.com/jonschlinkert">jonschlinkert</a></td></tr><tr><td>13</td><td><a href="https://github.com/robertmassaioli">robertmassaioli</a></td></tr><tr><td>7</td><td><a href="https://github.com/RobLoach">RobLoach</a></td></tr><tr><td>5</td><td><a href="https://github.com/doowb">doowb</a></td></tr><tr><td>5</td><td><a href="https://github.com/heymind">heymind</a></td></tr><tr><td>3</td><td><a href="https://github.com/aljopro">aljopro</a></td></tr><tr><td>3</td><td><a href="https://github.com/shawnbot">shawnbot</a></td></tr><tr><td>2</td><td><a href="https://github.com/reccanti">reccanti</a></td></tr><tr><td>2</td><td><a href="https://github.com/onokumus">onokumus</a></td></tr><tr><td>2</td><td><a href="https://github.com/moozzyk">moozzyk</a></td></tr><tr><td>2</td><td><a href="https://github.com/ajaymathur">ajaymathur</a></td></tr><tr><td>1</td><td><a href="https://github.com/Ajedi32">Ajedi32</a></td></tr><tr><td>1</td><td><a href="https://github.com/arlair">arlair</a></td></tr><tr><td>1</td><td><a href="https://github.com/caesar">caesar</a></td></tr><tr><td>1</td><td><a href="https://github.com/ianstormtaylor">ianstormtaylor</a></td></tr><tr><td>1</td><td><a href="https://github.com/qm3ster">qm3ster</a></td></tr><tr><td>1</td><td><a href="https://github.com/zachwhaley">zachwhaley</a></td></tr></tbody></table>

### Author

**Jon Schlinkert**

-   [GitHub Profile](https://github.com/jonschlinkert)
-   [Twitter Profile](https://twitter.com/jonschlinkert)
-   [LinkedIn Profile](https://linkedin.com/in/jonschlinkert)

### License

Copyright © 2023, [Jon Schlinkert](https://github.com/jonschlinkert). Released under the [MIT License](https://github.com/11ty/gray-matter/blob/HEAD/LICENSE).
