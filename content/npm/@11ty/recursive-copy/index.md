---
title: '@11ty/recursive-copy'
description: 'A fork of `recursive-copy`: Simple, flexible file copy utility'
authors:
  - name: Tim Kendrick
date: 2024-07-11T15:57:34.252Z
metadata:
  name: '@11ty/recursive-copy'
  version: 5.1.0
  license: ISC
  homepage: https://github.com/11ty/recursive-copy
  repository: https://github.com/11ty/recursive-copy
  tags:
    - copy
    - recursive
    - file
    - directory
    - folder
    - symlink
    - fs
    - rename
    - filter
    - transform
    - glob
    - regex
    - regexp
  uuid: 11ty/import::npm::@11ty/recursive-copy
  type: npm
  url: https://www.npmjs.com/package/@11ty/recursive-copy
  importHash: 9d9d9c9a6cc97bbc
tags:
  - copy
  - recursive
  - file
  - directory
  - folder
  - symlink
  - fs
  - rename
  - filter
  - transform
  - glob
  - regex
  - regexp
---
# `@11ty/recursive-copy`

A temporary fork of [`timkendrick/recursive-copy`](https://github.com/timkendrick/recursive-copy) to satisfy [https://github.com/11ty/eleventy/issues/3299](https://github.com/11ty/eleventy/issues/3299) as Eleventy slowly [moves to use Node native API `fs.cp`](https://github.com/11ty/eleventy/issues/3360).

-   v5.x requires Node 20+
-   v4.x requires Node 18+
-   v3.x requires Node 0.10+
-   v2.x requires Node 0.10+

> Simple, flexible file copy utility

## Features

-   Recursively copy whole directory hierarchies
-   Choose which files are copied by passing a filter function, regular expression or glob
-   Rename files dynamically, including changing the output path
-   Transform file contents using streams
-   Choose whether to overwrite existing files
-   Choose whether to copy system files
-   Filters out [junk](https://www.npmjs.com/package/junk) files by default
-   Emits start, finish and error events for each file that is processed
-   Optional promise-based interface

## Examples

#### Node-style callback interface

```
var copy = require('@11ty/recursive-copy');

copy('src', 'dest', function(error, results) {
	if (error) {
		console.error('Copy failed: ' + error);
	} else {
		console.info('Copied ' + results.length + ' files');
	}
});
```

#### Promise interface

```
var copy = require('@11ty/recursive-copy');

copy('src', 'dest')
	.then(function(results) {
		console.info('Copied ' + results.length + ' files');
	})
	.catch(function(error) {
		console.error('Copy failed: ' + error);
	});
```

#### ES2015+ usage

```
import copy from '@11ty/recursive-copy';

try {
	const results = await copy('src', 'dest');
	console.info('Copied ' + results.length + ' files');
} catch (error) {
	console.error('Copy failed: ' + error);
}
```

#### Advanced options

```
var copy = require('@11ty/recursive-copy');

var path = require('path');
var through = require('through2');

var options = {
	overwrite: true,
	expand: true,
	dot: true,
	junk: true,
	filter: [
		'**/*',
		'!.htpasswd'
	],
	rename: function(filePath) {
		return filePath + '.orig';
	},
	transform: function(src, dest, stats) {
		if (path.extname(src) !== '.txt') { return null; }
		return through(function(chunk, enc, done)  {
			var output = chunk.toString().toUpperCase();
			done(null, output);
		});
	}
};

copy('src', 'dest', options)
	.on(copy.events.COPY_FILE_START, function(copyOperation) {
		console.info('Copying file ' + copyOperation.src + '...');
	})
	.on(copy.events.COPY_FILE_COMPLETE, function(copyOperation) {
		console.info('Copied to ' + copyOperation.dest);
	})
	.on(copy.events.ERROR, function(error, copyOperation) {
		console.error('Unable to copy ' + copyOperation.dest);
	})
	.then(function(results) {
		console.info(results.length + ' file(s) copied');
	})
	.catch(function(error) {
		return console.error('Copy failed: ' + error);
	});
```

## Usage

### `copy(src, dest, [options], [callback])`

Recursively copy files and folders from `src` to `dest`

#### Arguments:

<table><thead><tr><th>Name</th><th>Type</th><th>Required</th><th>Default</th><th>Description</th></tr></thead><tbody><tr><td><code>src</code></td><td><code>string</code></td><td>Yes</td><td>N/A</td><td>Source file/folder path</td></tr><tr><td><code>dest</code></td><td><code>string</code></td><td>Yes</td><td>N/A</td><td>Destination file/folder path</td></tr><tr><td><code>options.overwrite</code></td><td><code>boolean</code></td><td>No</td><td><code>false</code></td><td>Whether to overwrite destination files</td></tr><tr><td><code>options.expand</code></td><td><code>boolean</code></td><td>No</td><td><code>false</code></td><td>Whether to expand symbolic links</td></tr><tr><td><code>options.dot</code></td><td><code>boolean</code></td><td>No</td><td><code>false</code></td><td>Whether to copy files beginning with a <code>.</code></td></tr><tr><td><code>options.junk</code></td><td><code>boolean</code></td><td>No</td><td><code>false</code></td><td>Whether to copy OS junk files (e.g. <code>.DS_Store</code>, <code>Thumbs.db</code>)</td></tr><tr><td><code>options.filter</code></td><td><code>function</code>, <code>RegExp</code>, <code>string</code>, <code>array</code></td><td>No</td><td><code>null</code></td><td>Filter function / regular expression / glob that determines which files to copy (uses <a href="https://www.npmjs.com/package/maximatch">maximatch</a>)</td></tr><tr><td><code>options.rename</code></td><td><code>function</code></td><td>No</td><td><code>null</code></td><td>Function that maps source paths to destination paths</td></tr><tr><td><code>options.transform</code></td><td><code>function</code></td><td>No</td><td><code>null</code></td><td>Function that returns a transform stream used to modify file contents</td></tr><tr><td><code>options.results</code></td><td><code>boolean</code></td><td>No</td><td><code>true</code></td><td>Whether to return an array of copy results</td></tr><tr><td><code>options.concurrency</code></td><td><code>number</code></td><td>No</td><td><code>255</code></td><td>Maximum number of simultaneous copy operations</td></tr><tr><td><code>options.debug</code></td><td><code>boolean</code></td><td>No</td><td><code>false</code></td><td>Whether to log debug information</td></tr><tr><td><code>callback</code></td><td><code>function</code></td><td>No</td><td><code>null</code></td><td>Callback, invoked on success/failure</td></tr></tbody></table>

#### Returns:

`Promise<Array>` Promise, fulfilled with array of copy results:

```
[
	{
		"src": "/path/to/src",
		"dest": "/path/to/dest",
		"stats": <Stats>
	},
	{
		"src": "/path/to/src/file.txt",
		"dest": "/path/to/dest/file.txt",
		"stats": <Stats>
	},
	{
		"src": "/path/to/src/subfolder",
		"dest": "/path/to/dest/subfolder",
		"stats": <Stats>
	},
	{
		"src": "/path/to/src/subfolder/nested.txt",
		"dest": "/path/to/dest/subfolder/nested.txt",
		"stats": <Stats>
	}
]
```

### `copy.shouldCopy(filePath, [options])`

Returns whether the `dot` and `junk` options keep a file, checked against its basename (`filter` is not applied).

```
copy.shouldCopy('src/.DS_Store', { dot: true }); // false
copy.shouldCopy('src/.htaccess', { dot: true }); // true
```

## Events

The value returned by the `copy` function implements the `EventEmitter` interface, and emits the following events:

<table><thead><tr><th>Event</th><th>Handler signature</th></tr></thead><tbody><tr><td><code>copy.events.ERROR</code></td><td><code>function(error, ErrorInfo)</code></td></tr><tr><td><code>copy.events.COMPLETE</code></td><td><code>function(Array&lt;CopyOperation&gt;)</code></td></tr><tr><td><code>copy.events.CREATE_DIRECTORY_START</code></td><td><code>function(CopyOperation)</code></td></tr><tr><td><code>copy.events.CREATE_DIRECTORY_ERROR</code></td><td><code>function(error, CopyOperation)</code></td></tr><tr><td><code>copy.events.CREATE_DIRECTORY_COMPLETE</code></td><td><code>function(CopyOperation)</code></td></tr><tr><td><code>copy.events.CREATE_SYMLINK_START</code></td><td><code>function(CopyOperation)</code></td></tr><tr><td><code>copy.events.CREATE_SYMLINK_ERROR</code></td><td><code>function(error, CopyOperation)</code></td></tr><tr><td><code>copy.events.CREATE_SYMLINK_COMPLETE</code></td><td><code>function(CopyOperation)</code></td></tr><tr><td><code>copy.events.COPY_FILE_START</code></td><td><code>function(CopyOperation)</code></td></tr><tr><td><code>copy.events.COPY_FILE_ERROR</code></td><td><code>function(error, CopyOperation)</code></td></tr><tr><td><code>copy.events.COPY_FILE_COMPLETE</code></td><td><code>function(CopyOperation)</code></td></tr></tbody></table>

...where the types referred to in the handler signature are as follows:

### `ErrorInfo`

<table><thead><tr><th>Property</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td><code>src</code></td><td><code>string</code></td><td>Source path of the file/folder/symlink that failed to copy</td></tr><tr><td><code>dest</code></td><td><code>string</code></td><td>Destination path of the file/folder/symlink that failed to copy</td></tr></tbody></table>

### `CopyOperation`

<table><thead><tr><th>Property</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td><code>src</code></td><td><code>string</code></td><td>Source path of the relevant file/folder/symlink</td></tr><tr><td><code>dest</code></td><td><code>string</code></td><td>Destination path of the relevant file/folder/symlink</td></tr><tr><td><code>stats</code></td><td><code>fs.Stats</code></td><td>Stats for the relevant file/folder/symlink</td></tr></tbody></table>
