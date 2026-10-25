---
title: Humane-Dates
description: Show the difference between a date and now (4 days ago)
authors:
  - name: zachleat
    url: https://github.com/zachleat
    avatarUrl: 39355-BYqDKnzPAH8O.png
date: 2010-08-29T16:08:25.000Z
metadata:
  name: zachleat/Humane-Dates
  language: JavaScript
  homepage: http://www.zachleat.com/web/2008/03/23/yet-another-pretty-date-javascript/
  archived: true
  uuid: 11ty/import::github::zachleat/humane-dates
  type: github
  url: https://github.com/zachleat/Humane-Dates
  importHash: 133c75c41055555b
---
# Humane-Dates

A better way to display relative dates using JavaScript. Instead of a raw date string, this script will return strings like "2 hours ago" or "5 days".

## Usage

```
humaneDate(new Date);
humaneDate('2008-01-28T20:24:17Z');
```

### jQuery Plugin

```
<span title="2008-01-28T20:24:17Z">January 1, 2008 20:24:17 GMT</span>

$('span').humaneDates();

<time datetime="2008-01-28T20:24:17Z">January 1, 2008 20:24:17 GMT</time>

$('time').humaneDates();
```

## Tests

To run the full test suite:

```
cd test
./test.sh
```

## License

Copyright (c) 2008 Dean Landolt (deanlandolt.com) Re-write by Zach Leatherman (zachleat.com)

Adopted from the John Resig's pretty.js at [http://ejohn.org/blog/javascript-pretty-date](http://ejohn.org/blog/javascript-pretty-date) and henrah's proposed modification at [http://ejohn.org/blog/javascript-pretty-date/#comment-297458](http://ejohn.org/blog/javascript-pretty-date/#comment-297458)

Licensed under the MIT license.

See more at [http://www.zachleat.com/web/2008/03/23/yet-another-pretty-date-javascript/](http://www.zachleat.com/web/2008/03/23/yet-another-pretty-date-javascript/)
