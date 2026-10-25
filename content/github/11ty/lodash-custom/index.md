---
title: lodash-custom
description: A custom, focused build of lodash exclusively for use internally in Eleventy.
authors:
  - name: 11ty
    url: https://github.com/11ty
    avatarUrl: 35147177-vF4d9OMhxrvg.png
date: 2023-03-22T15:18:33.000Z
metadata:
  name: 11ty/lodash-custom
  language: JavaScript
  uuid: 11ty/import::github::11ty/lodash-custom
  type: github
  url: https://github.com/11ty/lodash-custom
  importHash: 4c7d2aefe14b9155
---
# @11ty/lodash-custom

Eleventy uses 3 small `lodash` functions:

-   [`get`](https://lodash.com/docs/4#get)
-   [`set`](https://lodash.com/docs/4#set)
-   [`chunk`](https://lodash.com/docs/4#chunk)

## Why?

1.  The top level `lodash` package includes all of `lodash` and is a hefty 5 MB.
2.  Using the individual, modularized `lodash.get`, `lodash.set`, `lodash.chunk` packages are a much smaller 106 KB but do contain duplicated code. More problematically, these are not being maintained/updated with the newest versions of `lodash`.

This package creates one focused custom dependency using the tools that `lodash` provides to do custom builds ([`lodash-cli`](https://lodash.com/custom-builds)) for these three `lodash` functions with updated versions of `lodash`.
