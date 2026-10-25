---
title: jQuery-Gravatar
description: Retrieve a gravatar image dynamically from any e-mail address.
authors:
  - name: zachleat
    url: https://github.com/zachleat
    avatarUrl: 39355-BYqDKnzPAH8O.png
date: 2010-08-28T15:21:54.000Z
metadata:
  name: zachleat/jQuery-Gravatar
  language: JavaScript
  homepage: http://www.zachleat.com/web/2009/01/08/scare-your-visitors-with-this-javascript-gravatar-plugin/
  archived: true
  uuid: 11ty/import::github::zachleat/jquery-gravatar
  type: github
  url: https://github.com/zachleat/jQuery-Gravatar
  importHash: 036aa0347c1d35b4
---
# jQuery Gravatar

## Usage

Without options:

```
$('body').append($.gravatar('zachleatherman@gmail.com'));
```

With options:

```
$('body').append($.gravatar('zachleatherman@gmail.com', {secure: true,
                                                         rating: 'pg'}));
```

## Options

-   size: size of the gravatar
-   rating: rating of the gravatar g (default), pg, r, x
-   image: default image url
-   secure: serve https gravatar

## License

Licensed under the WTFPL ([http://sam.zoy.org/wtfpl/](http://sam.zoy.org/wtfpl/))
