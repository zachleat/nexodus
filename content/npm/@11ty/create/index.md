---
title: '@11ty/create'
description: A little command line utility to create files in a cross-platform way.
authors:
  - name: Zach Leatherman
    url: https://zachleat.com/
date: 2024-06-14T20:02:35.660Z
metadata:
  name: '@11ty/create'
  version: 1.0.9
  license: MIT
  homepage: https://www.11ty.dev/
  repository: https://github.com/11ty/create
  uuid: 11ty/import::npm::@11ty/create
  type: npm
  url: https://www.npmjs.com/package/@11ty/create
  importHash: 1cba3789f588f2f2
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
