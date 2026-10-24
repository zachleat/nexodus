<template>
	<html lang="en">
		<head>
			<meta charset="utf-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>{{ fullTitle }}</title>
			<style v-html="getBundle('css')"></style>
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
					<form id="search" class="search" role="search" action="javascript:void(0)">
						<input type="search" class="search-input" placeholder="Search" aria-label="Search" autocomplete="off">
						<fieldset class="search-sources">
							<legend class="visually-hidden">Sources</legend>
							<label v-for="{ key, label } in searchSources" :class="['search-source', `search-source--${key}`]"><input type="checkbox" name="source" :value="label"> {{ label }}</label>
						</fieldset>
						<div class="search-results" hidden>
							<p class="search-message" aria-live="polite"></p>
							<ol class="search-list"></ol>
							<button type="button" class="search-more" hidden>Load more results</button>
						</div>
					</form>
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

/* Search */
.search { display: grid; gap: .75rem; }
.search-input {
	width: 100%;
	height: 3rem;
	padding: 0 1rem;
	border: 1px solid var(--border);
	border-radius: var(--radius);
	background: var(--surface);
	color: var(--text);
	font: inherit;
}
.search-input::placeholder { color: var(--muted); opacity: 1; }
.search-input:focus { outline: 2px solid var(--link); outline-offset: 1px; border-color: transparent; }
.search-sources { display: flex; flex-wrap: wrap; gap: .25rem 1.25rem; margin: 0; padding: 0; border: 0; min-width: 0; }
.search-source { display: inline-flex; align-items: center; gap: .35rem; font-size: .85rem; font-weight: 600; color: var(--accent); cursor: pointer; }
.search-source input { margin: 0; accent-color: var(--accent); }
.search-source, .search-result { --accent: var(--fediverse); }
.search-source--bluesky, .search-result--bluesky { --accent: var(--bluesky); }
.search-source--github, .search-result--github { --accent: var(--github); }
.search-source--npm, .search-result--npm { --accent: var(--npm); }
.search-source--youtube, .search-result--youtube { --accent: var(--youtube); }
.search-source--letterboxd, .search-result--letterboxd { --accent: var(--letterboxd); }
.search-source--codepen, .search-result--codepen { --accent: var(--codepen); }
.search-results { margin: .25rem 0 1rem; }
.search-message { margin: 0 0 1rem; font-size: .9rem; color: var(--muted); }
.search-list { display: grid; gap: 1.25rem; margin: 0; padding: 0; list-style: none; }
.search-result-meta { display: flex; flex-wrap: wrap; align-items: baseline; gap: .25rem .75rem; margin: 0; }
.search-result-meta a { font-weight: 600; }
.search-result-source { color: var(--accent); font-size: .85rem; font-weight: 600; }
.search-result-date { color: var(--muted); font-size: .85rem; }
.search-result-excerpt { margin: .25rem 0 0; color: var(--muted); }
.search-result-excerpt mark { background: color-mix(in srgb, var(--accent) 22%, transparent); color: var(--text); border-radius: 3px; padding-inline: 2px; }
.search-more { margin-top: 1rem; padding: .5rem 1rem; border: 1px solid var(--border); border-radius: var(--radius); background: var(--surface); color: var(--link); font: inherit; font-weight: 600; cursor: pointer; }
/* Swap page content for results while searching */
body:has(.search-results:not([hidden])) main { display: none; }

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
		// Sources with posts, labeled by the Pagefind `source` filter value
		searchSources() {
			return this.statSources.filter(({ key }) => key !== "total" && this.siteStats?.[key]);
		},
		searchScript() {
			let keys = Object.fromEntries(this.searchSources.map(({ key, label }) => [label, key]));
			return `const base = ${JSON.stringify(this.htmlBaseUrl("/"))};
const keys = ${JSON.stringify(keys)};
const pagefind = await import(\`\${base}pagefind/pagefind.js\`);
await pagefind.options({ baseUrl: base });

const form = document.getElementById("search");
const input = form.querySelector(".search-input");
const results = form.querySelector(".search-results");
const message = form.querySelector(".search-message");
const list = form.querySelector(".search-list");
const more = form.querySelector(".search-more");
const PAGE_SIZE = 20;
let matches = [];
let shown = 0;

function renderResult(data) {
	let source = data.filters.source?.[0];
	let li = document.createElement("li");
	li.className = \`search-result search-result--\${keys[source]}\`;
	let meta = document.createElement("p");
	meta.className = "search-result-meta";
	let label = document.createElement("span");
	label.className = "search-result-source";
	label.textContent = source;
	let link = document.createElement("a");
	link.href = data.url;
	link.textContent = data.meta.heading || data.meta.title;
	meta.append(link, label);
	if(data.meta.heading) {
		let date = document.createElement("span");
		date.className = "search-result-date";
		date.textContent = data.meta.title;
		meta.append(date);
	}
	let excerpt = document.createElement("p");
	excerpt.className = "search-result-excerpt";
	excerpt.innerHTML = data.excerpt;
	li.append(meta, excerpt);
	return li;
}

async function showMore() {
	let page = await Promise.all(matches.slice(shown, shown + PAGE_SIZE).map(match => match.data()));
	shown += page.length;
	list.append(...page.map(renderResult));
	more.hidden = shown >= matches.length;
}

// Checked sources match any (Pagefind UI requires all), and a source alone lists its posts newest first
async function search() {
	let term = input.value.trim();
	let sources = [...form.querySelectorAll("input[name=source]:checked")].map(checkbox => checkbox.value);
	if(!term && !sources.length) {
		await pagefind.debouncedSearch(null, {}, 0);
		results.hidden = true;
		return;
	}
	let options = { filters: sources.length ? { source: { any: sources } } : {} };
	if(!term) {
		options.sort = { date: "desc" };
	}
	let response = await pagefind.debouncedSearch(term || null, options, 200);
	// Superseded by a newer search
	if(!response) {
		return;
	}
	matches = response.results;
	shown = 0;
	list.replaceChildren();
	message.textContent = \`\${matches.length.toLocaleString("en-US")} \${matches.length === 1 ? "result" : "results"}\`;
	results.hidden = false;
	await showMore();
}

form.addEventListener("input", search);
more.addEventListener("click", showMore);`;
		},
	},
};
</script>
