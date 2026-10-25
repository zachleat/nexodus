---
title: create
description: A tiny command line utility to create files in a cross-platform way.
authors:
  - name: 11ty
    url: https://github.com/11ty
    avatarUrl: 35147177-vF4d9OMhxrvg.png
date: 2024-06-14T19:48:48.000Z
metadata:
  name: 11ty/create
  language: JavaScript
  license: MIT
  uuid: 11ty/import::github::11ty/create
  type: github
  url: https://github.com/11ty/create
  importHash: b21cb5002f2e0bf4
---
# `@11ty/create`

A tiny command line utility to create files in a cross-platform way. Requires Node 18 or newer.

Some context about why this exists: [**The Smorgasbord of Windows Terminal… Windows**](https://www.zachleat.com/web/smorgasbord-windows-terminal/).

* * *

In the quick start for Eleventy, there are different commands folks need to use based on their operating system and terminal application.

```
# POSIX and PowerShell Core (Windows)
echo '# Header' > index.md

# Command Prompt (Windows cmd.exe, no quotes allowed)
echo # Header > index.md

# Windows PowerShell (`>` defaults to UTF16)
echo '# Header' | out-file -encoding utf8 'index.md'
```

Now we can tell folks to use this everywhere and we’ll always have a UTF8 encoded file at the end:

```
npx @11ty/create index.md '# Heading'
npx @11ty/create nested/index.md '# Heading'
```

And in v1.0.6+ `stdin` is supported:

```
echo '# Heading' | npx @11ty/create index.md
```

Installation happens on-the-fly via `npx` and we needn’t put this in a package.json.
