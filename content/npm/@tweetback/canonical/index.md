---
title: '@tweetback/canonical'
description: A package to resolve twitter URLs to new canonically hosted twitter backups.
authors:
  - name: zachleat
    url: https://www.npmjs.com/~zachleat
date: 2022-11-21T14:48:53.320Z
metadata:
  name: '@tweetback/canonical'
  version: 2.0.49
  license: MIT
  homepage: https://github.com/tweetback/tweetback-canonical#readme
  repository: https://github.com/tweetback/tweetback-canonical
  uuid: 11ty/import::npm::@tweetback/canonical
  type: npm
  url: https://www.npmjs.com/package/@tweetback/canonical
  importHash: cd75f06f7341806e
---
# @tweetback/canonical

A package to resolve twitter URLs to new canonically hosted twitter backups.

## Installation

The package is available on npm: [https://www.npmjs.com/package/@tweetback/canonical](https://www.npmjs.com/package/@tweetback/canonical)

```
npm install @tweetback/canonical
```

## Usage

```
import {transform} from "@tweetback/canonical";

transform("https://twitter.com/zachleat");
// Returns "https://www.zachleat.com/twitter/"

transform("https://twitter.com/eleven_ty");
// Returns "https://twitter.11ty.dev/"
```

Works with status URLs:

```
transform("https://twitter.com/zachleat/status/123");
// Returns "https://www.zachleat.com/twitter/123"
```

Other features:

-   Passthrough any valid URLs as normal.
-   Preserves trailing slashes (trailing slashes are optional)
-   Normalizes duplicate slashes in the pathname

## Add your own Twitter Archive:

You needn’t use tweetback to add your archive here. The only requirement here is that your archive has URL parity and has individually addressable URLs for each status.

Just create a PR with your addition to the `mapping.js` file and we’ll have a look!

Please start your commit message with `mapping:` , it helps speed up the npm package release process.

## The best example

This status [https://twitter.11ty.dev/1559312029340557315](https://twitter.11ty.dev/1559312029340557315) links to @TerribleMia’s archive which links _back_ to the @eleven\_ty archive. Threading across archives 🏆 while allowing each instance to maintain their own data.
