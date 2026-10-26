---
title: Table of Contents Web Component
authors:
  - name: Zach Leatherman
date: 2026-09-15T05:00:00.000Z
metadata:
  uuid: 11ty/import::atom::https://www.zachleat.com/web/table-of-contents/
  type: atom
  url: https://www.zachleat.com/web/table-of-contents/
  importHash: e8f864d1429a5c15
---
\<blockquote> \<p>…and another one.\</p> \</blockquote> \<p>This little (zero CSS) web component has two modes: progressively enhance a hierarchy of server rendered \<code>&lt;ol&gt;\</code> or \<code>&lt;ul&gt;\</code> elements (or conveniently client render them for you if they don’t exist) to highlight which are currently visible in the viewport.\</p> \<p>I pulled this code out of the \<a href="https://github.com/11ty/tugboat/blob/main/\_components/table-of-contents.webc">\<code>table-of-contents.webc\</code>\</a> component from the \<a href="https://tugboat.11ty.dev/">WebC Tugboat starter project\</a> for standalone use.\</p> \<ul> \<li>\<a href="https://zachleat.github.io/table-of-contents/demo.html">\<strong>Demo\</strong>\</a> \<ul> \<li>And a demo in the sidebar of this blog post on my website.\</li> \<li>And a server rendered demo on Blog Awesome, \<em>e.g. \<a href="https://blog.fontawesome.com/font-awesome-7-3-release/">Font Awesome 7.3 Is Here!\</a>\</em>\</li> \</ul> \</li> \<li>\<a href="https://github.com/zachleat/table-of-contents">Source code\</a>\</li> \<li>\<a href="https://www.npmjs.com/package/@zachleat/table-of-contents">\<code>@zachleat/table-of-contents\</code> on npm\</a>\</li> \</ul> \<p>You can configure a \<code>selector\</code> attribute to control the scope of the headings search. My site uses \<code>main :is(h2, h3)\</code> but the default is \<code>main :is(h2, h3, h4, h5, h6)\</code>.\</p> \<p>Again, all styles for this component are application styles. There is no component CSS on this one.\</p> \<h2 id="installation">Installation\</h2> \<pre tabindex="0">\<code>npm install @zachleat/table-of-contents\</code>\</pre> \<h2 id="some-sample-headings">Some sample headings\</h2> \<div class="card card--demo"> \<h3 id="heading-3a">Heading 3a\</h3> \<h4 id="heading-4-via-3a">Heading 4 (via 3a)\</h4> \<h3 id="heading-3b">Heading 3b\</h3> \<h4 id="heading-4-via-3b">Heading 4 (via 3b)\</h4> \<h3 id="heading-3c">Heading 3c\</h3> \</div>
