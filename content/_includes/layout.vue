<template>
	<html lang="en">
		<head>
			<meta charset="utf-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>{{ fullTitle }}</title>
			<style v-html="getBundle('css')"></style>
			<link rel="stylesheet" href="/pagefind/pagefind-ui.css">
			<script src="/pagefind/pagefind-ui.js" defer></script>
			<script type="module" v-html="searchScript"></script>
		</head>
		<body>
			<header class="site-header">
				<div class="wrap">
					<div class="site-nav">
						<a href="/" class="site-title">{{ pageTitle }}</a>
						<nav aria-label="Site"><a href="/popular/" :aria-current="page.url === '/popular/' ? 'page' : null">Popular</a></nav>
					</div>
					<p class="site-tagline">A versioned archive of posts from Bluesky, Mastodon, GitHub, npm, YouTube, and Letterboxd.</p>
					<div v-if="siteStats" class="site-stats-wrap">
						<table class="site-stats">
							<thead>
								<tr><td></td><th v-for="{ key, plural, icon } in statLabels" scope="col" :title="plural"><i :class="icon"></i><span class="visually-hidden">{{ plural }}</span></th><th scope="col" title="Since"><i class="fa-regular fa-calendar"></i><span class="visually-hidden">Since</span></th></tr>
							</thead>
							<tbody>
								<tr v-for="{ key, label, icon } in statSources.filter(source => siteStats[source.key])" :class="`site-stats--${key}`">
									<th v-if="icon" scope="row" :title="label"><i :class="icon"></i><span class="visually-hidden">{{ label }}</span></th>
									<th v-else scope="row">{{ label }}</th>
									<td v-for="stat in statLabels"><template v-if="siteStats[key][stat.key]"><i v-if="key === 'github' && stat.key === 'likes'" class="fa-regular fa-star" title="Stars"></i> {{ siteStats[key][stat.key].toLocaleString("en-US") }}</template></td>
									<td><time :datetime="siteStats[key].oldest.toISOString()">{{ shortDate(siteStats[key].oldest) }}</time></td>
								</tr>
							</tbody>
						</table>
					</div>
					<div id="search" role="search"></div>
				</div>
			</header>
			<main class="wrap" v-html="content"></main>
			<footer class="site-footer wrap">
				<p>Built with <a href="https://www.11ty.dev/">11ty</a>, <a href="https://github.com/11ty/eleventy-import">11ty/import</a>, and <a href="https://pagefind.app/">Pagefind</a>. <a href="https://github.com/zachleat/nexodus">Source code</a></p>
			</footer>
			<div v-html="getBundle('fontawesome')"></div>
		</body>
	</html>
</template>
<style>
:root {
	color-scheme: light dark;
	--bg: #f6f5f2;
	--surface: #ffffff;
	--text: #1c1b19;
	--muted: #6b6862;
	--border: #e4e1da;
	--link: #2d5bd7;
	--bluesky: #1185fe;
	--fediverse: #a033c4;
	--github: #59636e;
	--npm: #cb3837;
	--youtube: #e00000;
	--letterboxd: #00a85a;
	--codepen: #47484a;
	--radius: 12px;
}
@media (prefers-color-scheme: dark) {
	:root {
		--bg: #141413;
		--surface: #1d1c1a;
		--text: #ecebe8;
		--muted: #9c9890;
		--border: #2e2c29;
		--link: #8eaaff;
		--fediverse: #c97ee6;
		--github: #9198a1;
		--npm: #e5605f;
		--youtube: #ff4e45;
		--letterboxd: #40bcf4;
		--codepen: #b7b7b7;
	}
}
* { box-sizing: border-box; }
body {
	margin: 0;
	background: var(--bg);
	color: var(--text);
	font: 17px/1.55 system-ui, -apple-system, "Segoe UI", sans-serif;
	-webkit-font-smoothing: antialiased;
}
a { color: var(--link); text-underline-offset: .15em; }
img, video { max-width: 100%; height: auto; border-radius: 8px; }
.wrap { max-width: 40rem; margin-inline: auto; padding-inline: 16px; }

.site-header { padding-block: 2.5rem 1.5rem; }
.site-title { color: var(--text); font-size: 1.6rem; font-weight: 700; letter-spacing: -.02em; text-decoration: none; }
.site-nav { display: flex; flex-wrap: wrap; align-items: baseline; justify-content: space-between; gap: .5rem 1rem; }
.site-nav nav a { font-weight: 600; }
.site-nav nav a[aria-current] { color: var(--text); text-decoration: none; }
.page-title { margin: 0 0 .25rem; font-size: 1.3rem; letter-spacing: -.01em; }
ol.feed { margin: 0; padding: 0; list-style: none; }
.site-tagline { margin: .25rem 0 1.25rem; color: var(--muted); }
.site-stats-wrap { margin: -.5rem 0 1.25rem; overflow-x: auto; }
.site-stats { width: 100%; border-collapse: collapse; color: var(--muted); font-size: .85rem; font-variant-numeric: tabular-nums; }
.site-stats :is(th, td) { padding: .1rem 0 .1rem 1rem; text-align: right; font-weight: 400; }
.site-stats :is(th, td):first-child { padding-left: 0; text-align: left; }
.site-stats tbody th { font-weight: 600; }
.site-stats--total th { color: var(--text); }
.site-stats--bluesky th { color: var(--bluesky); }
.site-stats--fediverse th { color: var(--fediverse); }
.site-stats--github th { color: var(--github); }
.site-stats--npm th { color: var(--npm); }
.site-stats--youtube th { color: var(--youtube); }
.site-stats--letterboxd th { color: var(--letterboxd); }
.site-stats--codepen th { color: var(--codepen); }
.site-stats time { white-space: nowrap; }
@media (max-width: 40em) {
	.site-stats { font-size: .75rem; }
	.site-stats :is(th, td) { padding-left: .5rem; }
}
.site-stats svg { height: 1em; overflow: visible; vertical-align: -.125em; }
.summary { color: var(--muted); font-size: .9rem; margin: 0 0 1rem; }

.feed { display: grid; gap: 1rem; }
.post {
	background: var(--surface);
	border: 1px solid var(--border);
	border-radius: var(--radius);
	padding: 1rem 1.25rem;
	overflow-wrap: anywhere;
}
.post-meta, .post-footer {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: .5rem 1rem;
	font-size: .85rem;
	color: var(--muted);
}
.post-meta a:not(.post-source), .post-footer a { color: inherit; }
.post-footer { justify-content: space-between; margin-top: .75rem; }
.post-source {
	--accent: var(--fediverse);
	color: var(--accent);
	font-weight: 600;
	text-decoration: none;
}
.post-source--bluesky { --accent: var(--bluesky); }
.post-source--github { --accent: var(--github); }
.post-source--npm { --accent: var(--npm); }
.post-source--youtube { --accent: var(--youtube); }
.post-source--letterboxd { --accent: var(--letterboxd); }
.post-source--codepen { --accent: var(--codepen); }
.post.post--crosspost {
	border-left: 3px solid transparent;
	background: linear-gradient(var(--surface), var(--surface)) padding-box, linear-gradient(var(--bluesky), var(--fediverse)) border-box;
}
.post-links { display: flex; flex-wrap: wrap; gap: .25rem 1rem; }
.post.post--bluesky { border-left: 3px solid var(--bluesky); }
.post.post--fediverse { border-left: 3px solid var(--fediverse); }
.post.post--github { border-left: 3px solid var(--github); }
.post.post--npm { border-left: 3px solid var(--npm); }
.post.post--youtube { border-left: 3px solid var(--youtube); }
.post.post--letterboxd { border-left: 3px solid var(--letterboxd); }
.post.post--codepen { border-left: 3px solid var(--codepen); }
.post-title { margin: .5rem 0 0; font-size: 1.1rem; }
.post-title a { color: inherit; text-decoration: none; }
.post-image { display: block; margin-top: .75rem; }
.post--letterboxd .post-image { width: 6rem; border-radius: 4px; }
.post { min-width: 0; }
.post-content :is(pre, table) { display: block; max-width: 100%; overflow-x: auto; }
.post-content pre { padding: .75rem 1rem; background: var(--bg); border-radius: calc(var(--radius) - 4px); font-size: .85rem; }
.post-content > :first-child { margin-top: .5rem; }
.post-content > :last-child { margin-bottom: 0; }
.post-content p { margin: .6rem 0; }

/* Mastodon link truncation */
.invisible { display: none; }
.ellipsis::after { content: "…"; }

.pager { display: flex; justify-content: space-between; margin-block: 2rem; font-weight: 600; }
.pager-disabled { color: var(--muted); opacity: .6; cursor: default; }
.pager--top { align-items: baseline; margin-block: 0 1rem; }
.pager--top > * { flex: 1; }
.pager--top > .summary { margin: 0; text-align: center; font-weight: 400; }
.pager--top > :last-child { text-align: right; }
.site-footer { padding-block: 2rem 3rem; color: var(--muted); font-size: .85rem; border-top: 1px solid var(--border); }

#search {
	--pagefind-ui-scale: .85;
	--pagefind-ui-primary: var(--link);
	--pagefind-ui-text: var(--text);
	--pagefind-ui-background: var(--surface);
	--pagefind-ui-border: var(--border);
	--pagefind-ui-tag: var(--bg);
	--pagefind-ui-border-radius: var(--radius);
	--pagefind-ui-font: inherit;
}

/* Pagefind results as post cards */
#search .pagefind-ui__results { display: grid; gap: 1rem; }
#search .pagefind-ui__result {
	--accent: var(--fediverse);
	display: block;
	margin: 0;
	padding: 1rem 1.25rem;
	background: var(--surface);
	border: 1px solid var(--border);
	border-left: 3px solid var(--accent);
	border-radius: var(--radius);
}
#search .pagefind-ui__result:has(a[href*="/bluesky/"]) { --accent: var(--bluesky); }
#search .pagefind-ui__result-thumb { display: none; }
#search .pagefind-ui__result-inner { margin: 0; }
#search .pagefind-ui__result-title { margin: 0; font-size: .85rem; font-weight: 400; }
#search .pagefind-ui__result-title::before { content: "Mastodon"; margin-right: 1rem; color: var(--accent); font-weight: 600; }
#search .pagefind-ui__result:has(a[href*="/bluesky/"]) .pagefind-ui__result-title::before { content: "Bluesky"; }
#search .pagefind-ui__result:has(a[href*="/github/"]) { --accent: var(--github); }
#search .pagefind-ui__result:has(a[href*="/github/"]) .pagefind-ui__result-title::before { content: "GitHub"; }
#search .pagefind-ui__result:has(a[href*="/npm/"]) { --accent: var(--npm); }
#search .pagefind-ui__result:has(a[href*="/npm/"]) .pagefind-ui__result-title::before { content: "npm"; }
#search .pagefind-ui__result:has(a[href*="/youtube/"]) { --accent: var(--youtube); }
#search .pagefind-ui__result:has(a[href*="/youtube/"]) .pagefind-ui__result-title::before { content: "YouTube"; }
#search .pagefind-ui__result:has(a[href*="/letterboxd/"]) { --accent: var(--letterboxd); }
#search .pagefind-ui__result:has(a[href*="/letterboxd/"]) .pagefind-ui__result-title::before { content: "Letterboxd"; }
#search .pagefind-ui__result:has(a[href*="/codepen/"]) { --accent: var(--codepen); }
#search .pagefind-ui__result:has(a[href*="/codepen/"]) .pagefind-ui__result-title::before { content: "CodePen"; }
#search .pagefind-ui__result-link { color: var(--muted); }
#search .pagefind-ui__result-link:hover { text-decoration: underline; }
#search .pagefind-ui__result-excerpt { margin: .5rem 0 0; font-size: 1rem; color: var(--text); }
#search .pagefind-ui__result-excerpt mark { background: color-mix(in srgb, var(--accent) 22%, transparent); color: inherit; border-radius: 3px; padding-inline: 2px; }
#search .pagefind-ui__result-tags { display: none; }
#search .pagefind-ui__message { padding: 0; margin-bottom: 1rem; font-size: .9rem; font-weight: 400; color: var(--muted); }
#search .pagefind-ui__button { margin-top: 1rem; border: 1px solid var(--border); border-radius: var(--radius); background: var(--surface); color: var(--link); font-weight: 600; }
#search .pagefind-ui__drawer:has(.pagefind-ui__results) { margin-bottom: 2rem; }
/* Swap page content for results while searching */
body:has(#search .pagefind-ui__drawer:not(.pagefind-ui__hidden)) main { display: none; }
/* Keep the source filters visible before searching */
#search .pagefind-ui__drawer.pagefind-ui__hidden { display: flex !important; }

/* Pagefind source filter as inline checkboxes */
#search .pagefind-ui__drawer { flex-direction: column; gap: 0; }
#search .pagefind-ui__filter-panel { margin: 1rem 0 0; padding: 0; border: 0; min-width: 0; }
#search .pagefind-ui__filter-block { padding: 0; border: 0; }
#search .pagefind-ui__filter-name { display: none; }
#search .pagefind-ui__filter-group { flex-direction: row; flex-wrap: wrap; gap: .25rem 1.25rem; padding: 0; border: 0; }
#search .pagefind-ui__filter-value { --accent: var(--fediverse); display: flex; align-items: center; gap: .35rem; }
#search .pagefind-ui__filter-value:has(#source-Bluesky) { --accent: var(--bluesky); }
#search .pagefind-ui__filter-value:has(#source-GitHub) { --accent: var(--github); }
#search .pagefind-ui__filter-value:has(#source-npm) { --accent: var(--npm); }
#search .pagefind-ui__filter-value:has(#source-YouTube) { --accent: var(--youtube); }
#search .pagefind-ui__filter-value:has(#source-Letterboxd) { --accent: var(--letterboxd); }
#search .pagefind-ui__filter-value:has(#source-CodePen) { --accent: var(--codepen); }
#search .pagefind-ui__filter-value::before { display: none; }
#search .pagefind-ui__filter-checkbox { position: static; width: auto; height: auto; margin: 0; opacity: 1; accent-color: var(--accent); }
#search .pagefind-ui__filter-label { font-size: .85rem; font-weight: 600; color: var(--accent); cursor: pointer; }
#search .pagefind-ui__results-area { margin-top: 1rem; }

/* Pagefind search input */
#search .pagefind-ui__search-input {
	height: 3rem;
	padding: 0 5rem 0 2.75rem;
	border: 1px solid var(--border);
	font: inherit;
	font-weight: 400;
	color: var(--text);
}
#search .pagefind-ui__search-input::placeholder { color: var(--muted); opacity: 1; }
#search .pagefind-ui__search-input:focus { outline: 2px solid var(--link); outline-offset: 1px; border-color: transparent; }
#search .pagefind-ui__form::before { top: 1rem; left: 1rem; opacity: .5; }
#search .pagefind-ui__search-clear {
	top: 1.5rem;
	right: .5rem;
	height: auto;
	padding: .3rem .7rem;
	transform: translateY(-50%);
	border: 0;
	border-radius: 999px;
	background: var(--bg);
	color: var(--muted);
	font: inherit;
	font-size: .8rem;
	font-weight: 600;
}
#search .pagefind-ui__search-clear:hover { color: var(--text); }
#search .pagefind-ui__search-clear:focus-visible { outline: 2px solid var(--link); outline-offset: 1px; }
#search .pagefind-ui__filter-label { display: inline-flex; align-items: center; gap: .45rem; padding-left: .6rem; }
/* Font Awesome Free 6.7.2 square and square-check icons, CC BY 4.0 https://fontawesome.com/license/free */
#search .pagefind-ui__filter-value { --checkbox: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'%3E%3Cpath d='M384 80c8.8 0 16 7.2 16 16l0 320c0 8.8-7.2 16-16 16L64 432c-8.8 0-16-7.2-16-16L48 96c0-8.8 7.2-16 16-16l320 0zM64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32z'/%3E%3C/svg%3E"); }
#search .pagefind-ui__filter-value--checked { --checkbox: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'%3E%3Cpath d='M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z'/%3E%3C/svg%3E"); }
#search .pagefind-ui__filter-label::before {
	content: "";
	width: .8rem;
	height: .9rem;
	background: currentColor;
	-webkit-mask: var(--checkbox) center / contain no-repeat;
	mask: var(--checkbox) center / contain no-repeat;
}

/* Quote posts and link cards */
.post-content blockquote {
	margin: .75rem 0;
	padding: .75rem 1rem;
	background: var(--bg);
	border: 1px solid var(--border);
	border-radius: calc(var(--radius) - 4px);
	font-size: .95rem;
}
.post-content blockquote > :first-child { margin-top: 0; }
.post-content blockquote > :last-child { margin-bottom: 0; }
.post-content blockquote > p:last-child:not(:only-child) { font-size: .8rem; color: var(--muted); }
.post-content blockquote > p:last-child:not(:only-child) a { color: inherit; }
.post-content blockquote img { display: block; margin-top: .25rem; }
</style>
<script>
export default {
	data() {
		return {
			pageTitle: "Nexodus Archive",
			statSources: [
				{ key: "total", label: "All" },
				{ key: "bluesky", label: "Bluesky", icon: "fa-brands fa-bluesky" },
				{ key: "fediverse", label: "Mastodon", icon: "fa-brands fa-mastodon" },
				{ key: "github", label: "GitHub", icon: "fa-brands fa-github" },
				{ key: "npm", label: "npm", icon: "fa-brands fa-npm" },
				{ key: "youtube", label: "YouTube", icon: "fa-brands fa-youtube" },
				{ key: "letterboxd", label: "Letterboxd", icon: "fa-brands fa-letterboxd" },
				{ key: "codepen", label: "CodePen", icon: "fa-brands fa-codepen" },
			],
			statLabels: [
				{ key: "posts", label: "post", plural: "posts", icon: "fa-regular fa-message" },
				{ key: "replies", label: "reply", plural: "replies", icon: "fa-regular fa-comment" },
				{ key: "likes", label: "like", plural: "likes", icon: "fa-regular fa-heart" },
				{ key: "reposts", label: "repost", plural: "reposts", icon: "fa-solid fa-retweet" },
				{ key: "quotes", label: "quote", plural: "quotes", icon: "fa-solid fa-quote-left" },
				{ key: "views", label: "view", plural: "views", icon: "fa-regular fa-eye" },
			],
		};
	},
	computed: {
		fullTitle() {
			let { title } = this.$data;
			return title ? `${title} — ${this.pageTitle}` : this.pageTitle;
		},
		siteStats() {
			let groups = this.collections?.postGroups;
			if(groups?.length) {
				return this.getSiteStats(groups);
			}
		},
		searchScript() {
			let options = { element: "#search", baseUrl: this.htmlBaseUrl("/"), showSubResults: false, showImages: false, resetStyles: false, openFilters: ["source"], pageSize: 20 };
			// Pagefind loads on input focus, so fake one to fetch the source filters up front
			// Pagefind skips empty queries, so a blank term becomes a filter-only search when a filter is toggled
			return `window.addEventListener("DOMContentLoaded", () => {
	let ui = new PagefindUI({ ...${JSON.stringify(options)}, processTerm: term => term.trim() || null });
	let search = document.querySelector("#search");
	let input = search.querySelector("input");
	input?.dispatchEvent(new Event("focus"));
	search.addEventListener("change", e => {
		if(!e.target.matches(".pagefind-ui__filter-checkbox") || input.value.trim()) return;
		ui.triggerSearch(search.querySelector(".pagefind-ui__filter-checkbox:checked") ? " " : "");
	});
});`;
		},
	},
};
</script>
