---
title: font-family-reunion
description: Compatibility tables for default local fonts.
authors:
  - name: zachleat
    url: https://github.com/zachleat
    avatarUrl: 39355-BYqDKnzPAH8O.png
date: 2014-08-30T23:47:12.000Z
metadata:
  name: zachleat/font-family-reunion
  language: HTML
  license: MIT
  homepage: https://fontfamily.zachleat.dev/
  archived: true
  uuid: 11ty/import::github::zachleat/font-family-reunion
  type: github
  url: https://github.com/zachleat/font-family-reunion
  importHash: 0d5af0d38844803d
---
# font-family-reunion

-   Hosted at [https://fontfamily.zachleat.dev/](https://fontfamily.zachleat.dev/) (formerly fontfamily.io)

## Initializing the repo

`npm install`

## Deploying the site

1.  Add a `fontfamily` host to `.ssh/config`
2.  Run `grunt deploy`

## Running your own test

### Adding new default fonts to the test list

Add your `font-family` name to `test/src/font-families.json`, preferably in alphabetical order.

Use `test/add-fonts.html` to make adding new font families to the list easier.

### Run the test server and save results to a local database

1.  `mongod`
2.  `node test/db/index.js` is the data collection site.
3.  Navigate to `test/test.html` with your browser and confirm the dialog to save to the database.

## Generating the site

`grunt generate`

Or more explicitly, `node results/parse-results.js` will generate the Font Family Reunion web site from the results stored in `font-families-results.json`. The template is in `results/result.ejs`.
