---
title: gruntlerplate
description: A default grunt configuration for new projects.
authors:
  - name: zachleat
    url: https://github.com/zachleat
    avatarUrl: 39355-BYqDKnzPAH8O.png
date: 2014-04-17T21:15:14.000Z
metadata:
  name: zachleat/gruntlerplate
  language: JavaScript
  license: MIT
  archived: true
  uuid: 11ty/import::github::zachleat/gruntlerplate
  type: github
  url: https://github.com/zachleat/gruntlerplate
  importHash: bf4abca1ef5255c5
---
# GRUNTLERPLATE

## Using the repo

Run these commands:

-   `npm install`
-   `bower install`
-   `grunt init`
-   `grunt` as normal.

Replace instances of GRUNTLERPLATE with your project name.

You’ll probably want to start by creating a few JS (and/or CSS) source files to `src/` and adding them to grunt via `grunt/config/concat.js`.

Run `grunt` as normal.

## Configuring Grunt

Rather than one giant `Gruntfile.js`, this project is using a modular Grunt setup. Each individual grunt configuration option key has its own file located in `grunt/config-lib/` (readonly upstream configs, do not modify these directly) or `grunt/config/` (project specific configs). You may use the same key in both directories, the objects are smartly combined using [Lo-Dash merge](http://lodash.com/docs#merge).

For concatenation in the previous Gruntfile setup, you’d add another key to the giant object passed into `grunt.initConfig` like this: `grunt.initConfig({ concat: { /* YOUR CONFIG */ } });`. In the new configuration, you’ll create a `grunt/config/concat.js` with `module.exports = { /* YOUR CONFIG */ };`.

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

## TODO

-   Make a yeoman generator to replace GRUNTLERPLATE with the project name.

## Inspiration From

-   [More maintainable Gruntfiles](http://www.thomasboyt.com/2013/09/01/maintainable-grunt.html) by [@thomasboyt](https://github.com/thomasboyt/)
