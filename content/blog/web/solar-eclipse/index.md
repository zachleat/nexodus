---
title: Solar Eclipse Toggle Web Component (two state dark/light mode toggle)
authors:
  - name: Zach Leatherman
date: 2026-09-14T05:00:00.000Z
metadata:
  uuid: 11ty/import::atom::https://www.zachleat.com/web/solar-eclipse/
  type: atom
  url: https://www.zachleat.com/web/solar-eclipse/
  importHash: 845796f62b72a2a6
---
\<p>In \<a href="https://www.zachleat.com/web/two-state-dark-mode-toggle/">Trying out a Two-state Dark Mode Toggle\</a> I summarized the Two-state Dark and Light mode Toggle discussion as I experimented with a toggle in my personal website footer.\</p> \<p>After launch, \<a href="https://fediverse.zachleat.com/@cwilcox808@c.im/117259821195055457">Curtis Wilcox left some good feedback to improve the accessibility of the component\</a>.\</p> \<p>I decided to fold this into a reusable component so that I can benefit from this work on future websites (and you can use it too, I guess!). It’s called \<code>@zachleat/solar-eclipse-toggle\</code> and you can find it \<a href="https://github.com/zachleat/solar-eclipse-toggle">on GitHub\</a> or \<a href="https://www.npmjs.com/package/@zachleat/solar-eclipse-toggle">on npm now\</a>.\</p> \<ul> \<li>\<a href="https://zachleat.github.io/solar-eclipse-toggle/demo.html">\<strong>Demo\</strong>\</a>\</li> \<li>…or in the footer of this website.\</li> \<li>…also in the footer on \<a href="https://www.speedlify.dev/">Speedlify\</a>.\</li> \</ul> \<p>My favorite parts about the component are that it shows an inert button pre-JS, incurs no CLS, is still functional when the (separate) CSS doesn’t load successfully (\<code>\[hidden\]\</code> for the win), and all strings are inserted from light DOM for good internationalization.\</p> \<p>Hope it’s useful to others!\</p> \<h2 id="installation">Installation\</h2> \<pre tabindex="0">\<code>npm install @zachleat/solar-eclipse-toggle\</code>\</pre>
