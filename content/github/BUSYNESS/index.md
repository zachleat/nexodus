---
title: BUSYNESS
description: This project is retired.
authors:
  - name: zachleat
    url: https://github.com/zachleat
    avatarUrl: 39355-BYqDKnzPAH8O.png
date: 2013-01-23T01:51:44.000Z
metadata:
  name: zachleat/BUSYNESS
  language: JavaScript
  homepage: https://www.zachleat.com/web/busyness/
  uuid: 11ty/import::github::zachleat/busyness
  type: github
  url: https://github.com/zachleat/BUSYNESS
  importHash: 0af83e2562ef2210
---
_This project is Retired._ This was a project to see a list of your noisiest twitter friends.

-   [busyness.io (if it’s still up)](http://busyness.io)
-   [Read the blog post](https://www.zachleat.com/web/busyness/)
-   [Sample output](https://www.zachleat.com/busyness-sample/)

# Development

Install

```
npm install
```

Configure

-   Rename `twitter_config.sample.json` to `twitter_config.json` and add your own twitter keys obtained from [dev.twitter.com](https://dev.twitter.com/).

Run

```
node app.js
```

Browse

```
http://localhost:3000
```

# Production

Heroku Environment Variables

-   `NODE_ENV = 'production'`
-   `consumerKey = ''`
-   `consumerSecret = ''`
-   `NODEFLY_ID = ''`
-   `SESSION_SECRET = ''` (optional)

# Sources

-   [Briefcase Icon](http://www.iconfinder.com/icondetails/61690/128/briefcase_carreer_suitcase_icon)
