---
title: a11y-tests
description: A series of small atomic tests used to compare accessibility linting tools.
authors:
  - name: zachleat
    url: https://github.com/zachleat
    avatarUrl: 39355-BYqDKnzPAH8O.png
date: 2019-09-05T22:12:40.000Z
metadata:
  name: zachleat/a11y-tests
  language: HTML
  uuid: 11ty/import::github::zachleat/a11y-tests
  type: github
  url: https://github.com/zachleat/a11y-tests
  importHash: 46bfc5a3b66b9e2c
---
# a11y-tests

A series of small atomic tests used to compare accessibility linting tools.

## Installation

```
npm install
```

## Run a test

Note that most accessibility testing tools require a web server.

```
npx pa11y http://HOST/contrast-ratio-45.html
npx axe http://HOST/contrast-ratio-45.html
```
