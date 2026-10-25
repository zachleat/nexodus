---
title: March 18, 2024 at 3:04:18 PM UTC
authors:
  - name: Zach Leatherman
    url: https://fediverse.zachleat.com/@zachleat
date: 2024-03-18T15:04:18.447Z
metadata:
  slug: '112117301801565699'
  uuid: 11ty/import::rss::https://fediverse.zachleat.com/@zachleat/112117301801565699
  type: fediverse
  url: https://fediverse.zachleat.com/@zachleat/112117301801565699
  importHash: 5dbdb2c1e890dce6
---
Framing this Twitter exchange on my wall

(sorry for the Twitter link, but it’s worth it [https://twitter.com/karrisaarinen/status/1769101933480911033](https://twitter.com/karrisaarinen/status/1769101933480911033))

![Karri Saarinen: “Been wanting to update my personal site for a long time. Is there any extremely simple tool, kind of like Jekyll that has templates and then can churn .html pages to S3. Or do I just need go back to notepad.exe and hand code each page.” Lee Robinson replies: “Here's React → HTML in 20 LOC. $ mkdir site && cd site $ npm init -y && npm i next $ mkdir app && touch app/layout.js export default function RootLayout({ children }) { return ( \<html lang="en"> \<body>{children}\</body> \</html> ); } $ touch app/page.js export default function Page() { return 'Hello, Karri!'; } $ touch next.config.mjs export default { output: 'export' }; Add a couple \`package.json\` scripts... "scripts": { "dev": "next --turbo", "build": "next build" } $ npm run build $ cat out/index.html 🎉 Can upload the \`out\` folder to S3. Or if you want... $ npm i -g vercel && vercel --prod” Kaari: “Nice! Will try this” Kaari: “This doesn’t look good” with an image attachment of the output HTML.](7e5fb69672f7f929-eBqUILP1zOSy.png)
