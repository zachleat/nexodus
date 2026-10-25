---
title: parity-purchasing-power-price
description: Web Component to show Parity Purchasing Power prices.
authors:
  - name: zachleat
    url: https://github.com/zachleat
    avatarUrl: 39355-BYqDKnzPAH8O.png
date: 2023-10-13T22:08:52.000Z
metadata:
  name: zachleat/parity-purchasing-power-price
  language: JavaScript
  homepage: https://ppp-price.zachleat.dev/
  tags:
    - web-components
  uuid: 11ty/import::github::zachleat/parity-purchasing-power-price
  type: github
  url: https://github.com/zachleat/parity-purchasing-power-price
  importHash: 4d373dd3eab22250
tags:
  - web-components
---
# `<ppp-price>` Web Component

A small structural-only zero-dependency Web Component to show Parity Purchasing Power normalized prices. Inspired by the [Wes Bos blog post](https://wesbos.com/parity-purchasing-power).

Please note that this is **not a currency converter** (you will get the same currency out that you put in). It transforms the number value with a parity purchasing ratio to normalize that cost to a new price for a specified country.

-   [Demo](https://ppp-price.zachleat.dev/)

## Usage

```
<!-- outputs $14.78 -->
<ppp-price from="us" to="gb" currency="usd">$10</ppp-price>
<ppp-price from="us" to="gb">$10 USD</ppp-price>

<!-- outputs €9.76 -->
<ppp-price from="fr" to="de" currency="eur">10€</ppp-price>

<!-- uses CloudCannon geolocation for country -->
<ppp-price from="fr" currency="eur">10€</ppp-price>
```

-   Attempts to look for currency type in text or via `currency` attribute.
-   Outputs use the `Intl.NumberFormat` API to properly format currency values.
    -   Use `currency-display="code"` to output currency code in text. Read more about [`currency-display` options](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#currencydisplay).
-   Leave out the `to` attribute or use `to="auto"` to use [CloudCannon geolocation feature](https://cloudcannon.com/documentation/articles/using-geolocation-to-detect-your-users-country/).

## Installation

You have a few options (choose one of these):

1.  Install via [npm](https://www.npmjs.com/package/@zachleat/parity-purchasing-power-price): `npm install @zachleat/parity-purchasing-power-price` and reference it in your HTML `<script type="module" src="ppp.js"></script>`
2.  [Download the source manually from GitHub](https://github.com/zachleat/parity-purchasing-power-price/tags) into your project and reference it in your HTML `<script type="module" src="ppp.js"></script>`
3.  Skip this step and use the script directly via a 3rd party CDN (not recommended for production use), like: `<script type="module" src="https://www.unpkg.com/@zachleat/parity-purchasing-power-price@1.0.0/ppp.js"></script>` or `<script type="module" src="https://esm.sh/@zachleat/parity-purchasing-power-price@1.0.0"></script>`

## Develop

```
npm install # Only needed once
npm start
```

### Build new data

This step is run with `npm start`. Raw data sourced from World Bank (2021): [https://data.worldbank.org/indicator/PA.NUS.PPP](https://data.worldbank.org/indicator/PA.NUS.PPP)

```
# Pulls from ./data/ppp-worldbank-raw.json local file
npm run data
```

This will create a standalone `ppp-data.json` file for backend implementation and inject the data into the `ppp.js` Web Component file for use on the frontend too.
