---
title: Icon Fall Web Component
authors:
  - name: Zach Leatherman
date: 2026-09-16T05:00:00.000Z
metadata:
  uuid: 11ty/import::atom::https://www.zachleat.com/web/icon-fall/
  type: atom
  url: https://www.zachleat.com/web/icon-fall/
  importHash: e646280d2fbd84cc
---
\<p>I’ve been doing some spring/fall cleaning and found an unpublished follow-up component to \<a href="https://www.zachleat.com/web/snow-fall/">\<code>&lt;snow-fall&gt;\</code>\</a> (a web component to “snow” on your website — which also happens to work with emoji too). Originally it was created as an easter egg for \<a href="https://blog.fontawesome.com/">Blog Awesome\</a> (click on the Font Awesome flag in the very bottom of the footer) but others have wanted to use it for more things!\</p> \<p>Presenting: \<code>&lt;icon-fall&gt;\</code>:\</p> \<ul> \<li>\<a href="https://zachleat.github.io/icon-fall/demo.html">Demo\</a>\</li> \<li>\<a href="https://github.com/zachleat/icon-fall">Source code on GitHub\</a>\</li> \</ul> \<p>It’s in use on this page (if you are on my web site and not in a feed reader). You can also install it with \<code>npm install @zachleat/icon-fall\</code>.\</p> \<p>It has options for \<code>count\</code> (attribute, number of icons) and a comma separated list of colors (via \<code>--icon-fall-colors\</code> custom property).\</p> \<script type="module" src="https://www.zachleat.com/static/icon-fall.js">\</script> \<is-land on:media="(prefers-reduced-motion: no-preference)"> \<icon-fall count="20" style="--icon-fall-colors: #548cd8,#f36945,#00a776"> \<svg class="z-icon" width="1em" height="1em" viewBox="0 0 512 512">\<use href="#fab-fa-font-awesome" xlink:href="#fab-fa-font-awesome">\</use>\</svg> \<svg class="z-icon" width="1em" height="1em" viewBox="0 0 640 512">\<use href="#fab-fa-web-awesome" xlink:href="#fab-fa-web-awesome">\</use>\</svg> \<svg class="z-icon" width="1em" height="1em" viewBox="0 0 448 512">\<use href="#fab-fa-build-awesome" xlink:href="#fab-fa-build-awesome">\</use>\</svg> \</icon-fall> \</is-land>
