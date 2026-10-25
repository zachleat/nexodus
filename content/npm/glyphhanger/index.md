---
title: glyphhanger
description: A tool to ease webfont subsetting.
authors:
  - name: Zach Leatherman
    url: https://zachleat.com/
date: 2017-01-11T03:12:58.300Z
metadata:
  name: glyphhanger
  version: 6.0.0
  license: MIT
  homepage: https://github.com/zachleat/glyphhanger#readme
  repository: https://github.com/zachleat/glyphhanger
  uuid: 11ty/import::npm::glyphhanger
  type: npm
  url: https://www.npmjs.com/package/glyphhanger
  importHash: a2259d545afb715a
---
# glyphhanger

Your web font utility belt. It can subset web fonts. It can show you what unicode-ranges are used on a web site (optionally per font-family). It can also subset web fonts automatically using the unicode-ranges it found. It makes julienne fries.

## Installation

Available on [npm](https://www.npmjs.com/package/glyphhanger).

```
npm install -g glyphhanger
```

### Prerequisite: `pyftsubset`

See [https://github.com/fonttools/fonttools](https://github.com/fonttools/fonttools).

```
# Use Homebrew
brew install python fonttools

# Or use pip3
pip3 install fonttools

# Alternative command for WSL
sudo apt install fonttools
```

```
# Additional installation for --flavor=woff2
pip3 install brotli
```

If you want to read an in-depth tutorial on the installation steps above, please read [How I set up Glyphhanger on macOS for optimizing and converting font files for the Web](https://www.sarasoueidan.com/blog/glyphhanger/) by Sara Soueidan.

## Usage

_Related: operate on existing `unicode-range` values with [Unicode Range Interchange](https://www.zachleat.com/unicode-range-interchange/) ([read the blog post](https://www.zachleat.com/web/unicode-range-interchange/))._

### Find the glyphs in a local file or url

```
# local file
glyphhanger ./test.html
glyphhanger ./test.txt

# output characters instead of Unicode code points
glyphhanger ./test.html --string

# remote URL
glyphhanger http://example.com

# multiple URLs, optionally using HTTPS
glyphhanger https://google.com https://www.zachleat.com

# show results for each font-family on the page
glyphhanger ./test.html --json

# show results only for one or more font-family names
glyphhanger ./test.html --family='Open Sans, Roboto'

# Show version
glyphhanger --version

# See more usage
glyphhanger --help
```

### Debug Mode

Replaces `--verbose` in `v3.0.0`.

```
> DEBUG=glyphhanger* glyphhanger http://example.com
```

### Subset font files automatically

Use `--subset="*.ttf"` to select some font files for subsetting. Note that you can also [subset yourself manually with `pyftsubset`](https://github.com/zachleat/glyphhanger/blob/HEAD/docs/manual-subset.md) (but glyphhanger is easier).

_Note that the `DEBUG` output documented above will log the specific `pyftsubset` command that `glyphhanger` used. Read more [about `pyftsubset` defaults](https://github.com/filamentgroup/glyphhanger/issues/49)._

#### Just make optimized TTF/WOFF/WOFF2 files

```
> glyphhanger --subset="*.ttf"

Subsetting LatoLatin-Regular.ttf to LatoLatin-Regular-subset.ttf (was 145.06 KB, now 70.25 KB)
Subsetting LatoLatin-Regular.ttf to LatoLatin-Regular-subset.woff2 (was 145.06 KB, now 28.73 KB)
```

#### Subset to specific characters only (no URLs)

```
> glyphhanger --whitelist=ABCD --subset="*.ttf"

Subsetting LatoLatin-Regular.ttf to LatoLatin-Regular-subset.ttf (was 145.06 KB, now 4.42 KB)
Subsetting LatoLatin-Regular.ttf to LatoLatin-Regular-subset.woff2 (was 145.06 KB, now 2.24 KB)
```

#### Subset to the glyphs at a URL

```
> glyphhanger ./test.html --subset="*.ttf"

Subsetting LatoLatin-Regular.ttf to LatoLatin-Regular-subset.ttf (was 145.06 KB, now 24 KB)
Subsetting LatoLatin-Regular.ttf to LatoLatin-Regular-subset.woff2 (was 145.06 KB, now 11.37 KB)
```

#### Subset to the glyphs at a URL only using content that matches a specific font-family

```
> glyphhanger ./test.html --subset="*.ttf" --family='Lato,sans-serif'

Subsetting LatoLatin-Regular.ttf to LatoLatin-Regular-subset.ttf (was 145.06 KB, now 24 KB)
Subsetting LatoLatin-Regular.ttf to LatoLatin-Regular-subset.woff2 (was 145.06 KB, now 11.37 KB)
```

#### Specify the formats to output

Available formats: `ttf,woff,woff2`.

```
> glyphhanger --whitelist=ABCD --formats=woff2,woff --subset="*.ttf"

Subsetting LatoLatin-Regular.ttf to LatoLatin-Regular-subset.woff (was 145.06 KB, now 2.88 KB)
Subsetting LatoLatin-Regular.ttf to LatoLatin-Regular-subset.woff2 (was 145.06 KB, now 2.24 KB)
```

#### Output a @font-face block with `--css`

Because we’re not parsing URLs for glyphs, we can optionally use `--family='My Family Name'` to set the name used in the `@font-face` block. Normally `--family` would tell GlyphHanger to only parse text data from nodes using one of the fonts listed in `--family`. Using `--subset` and `--css` together will write a CSS file, too.

```
> glyphhanger --whitelist=ABCD --formats=woff2,woff --subset="*.ttf" --css

Subsetting LatoLatin-Regular.ttf to LatoLatin-Regular-subset.woff (was 145.06 KB, now 2.88 KB)
Subsetting LatoLatin-Regular.ttf to LatoLatin-Regular-subset.woff2 (was 145.06 KB, now 2.24 KB)
Writing CSS file: LatoLatin-Regular.css

@font-face {
  font-family: LatoLatin;
  src: url(sourcesanspro-regular-subset.woff2) format("woff2"), url(sourcesanspro-regular-subset.woff) format("woff");
  unicode-range: U+41-44;
}
```

#### Specify output directory for any files created with `--output`

```
> glyphhanger --subset="*.ttf" --output=some/other/path

Subsetting LatoLatin-Regular.ttf to LatoLatin-Regular-subset.woff (was 145.06 KB, now 2.88 KB)
Subsetting LatoLatin-Regular.ttf to LatoLatin-Regular-subset.woff2 (was 145.06 KB, now 2.24 KB)
```

### Whitelist Characters

```
# Add in a whitelist of specific characters
glyphhanger https://google.com --whitelist=abcdefgh

# Add in a whitelist as a unicode range
glyphhanger https://google.com --whitelist=U+26

# shortcut to add in a whitelist of all of US-ASCII (with an optional whitelist)
glyphhanger https://google.com --US_ASCII --whitelist=™

# shortcut to add in a whitelist of all Latin characters (with an optional whitelist)
glyphhanger https://google.com --LATIN --whitelist=™
```

#### Manual subsetting

```
glyphhanger --whitelist=ABCD --subset="*.ttf"
```

#### Converting unicode ranges and back again

```
# Convert a string to a unicode-range
glyphhanger --whitelist=ABCD
glyphhanger --US_ASCII
glyphhanger --US_ASCII --whitelist=ABCD

# Convert a unicode-range to a string
glyphhanger --whitelist=U+41-44 --string
```

### Use the spider to gather URLs from links

Finds all the `<a href>` elements on the page with _local_ (not external) links and adds those to the glyphhanger URLs. If you specify `--spider-limit`, `--spider` is assumed.

```
glyphhanger ./test.html --spider
glyphhanger ./test.html --spider-limit
glyphhanger ./test.html --spider-limit=10

# No limit
glyphhanger ./test.html --spider-limit=0
```

Default `--spider-limit` is 10. Set to `0` for no limit. This will greatly affect how long the task takes.

### Only search your page for visible text

Make your output even smaller by only subsetting characters that are visible on the page.

```
glyphhanger ./test.html --onlyVisible
```

### Only search your page for text matching a CSS selector

Limit results to text inside of elements that match a CSS selector

```
glyphhanger ./test.html --cssSelector="pre, #header, .popUp"
```

If paired with `--onlyVisible`, it will only return elements that are both visible and match the selector

### Advanced: `jsdom` Mode ⚠️

JSDOM mode can be useful running against static pages that don’t use a lot of JavaScript generated content. While JSDOM mode can handle some JavaScript generated content, Puppeteer mode should be the safest method for most use cases.

JSDOM mode will also be much faster when running against files on a local filesystem rather than URL targets.

Read more about [the difference between JSDOM and a full headless browser](https://github.com/jsdom/jsdom/wiki/jsdom-vs.-PhantomJS) (like the default mode that glyphhanger uses: Puppeteer/headless Chrome).

```
# use faster jsdom mode instead of headless Chrome
glyphhanger ./test.html --jsdom

# jsdom mode works with standard input too
echo "this is a test" | glyphhanger --jsdom
```

## Troubleshooting

-   `glyphhanger` uses Puppeteer, the headless Chrome browser. Check out the [Puppeteer Troubleshooting documentation](https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md#chrome-headless-doesnt-launch).

## Testing

`npm test` will run the tests.

Or, alternatively `npx mocha`.

## Enhancement Queue

-   [Top Voted Issues 👍](https://github.com/zachleat/glyphhanger/issues?q=label%3Aneeds-votes+sort%3Areactions-%2B1-desc)
-   Archived: [Voted Issues from `filamentgroup/glyphhanger`](https://github.com/filamentgroup/glyphhanger/issues?q=label%3Aneeds-votes+sort%3Areactions-%2B1-desc)

## Alternatives to GlyphHanger

-   [unicode-ranger from Jeremy Wagner](https://github.com/malchata/unicode-ranger)
-   [subfont from Peter Müller](https://www.npmjs.com/package/subfont)
