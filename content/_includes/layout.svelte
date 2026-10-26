<script>
	import { getContext } from "svelte";
	import Activity from "./Activity.svelte";
	import SiteStats from "./SiteStats.svelte";
	import { statSources } from "./sources.js";

	let { title, sourcePage, page, collections, content, buildTime } = $props();
	const { getBundle, getSiteStats, htmlBaseUrl, readableDate } = getContext("functions");

	const pageTitle = "Nexodus Archive";
	let fullTitle = $derived(title ? `${title} — ${pageTitle}` : pageTitle);
	let siteStats = $derived(collections?.postGroups?.length ? getSiteStats(collections.postGroups) : undefined);
	// Sources with posts, labeled by the Pagefind `source` filter value
	let postSources = $derived(statSources.filter(({ key }) => key !== "total" && siteStats?.[key]));
	// Time since the build, e.g. “3 hours ago”
	const buildTimeScript = `const time = document.querySelector(".build-time");
const seconds = (new Date(time.dateTime) - Date.now()) / 1000;
const units = [["year", 31536000], ["month", 2592000], ["day", 86400], ["hour", 3600], ["minute", 60], ["second", 1]];
const [unit, size] = units.find(([, size]) => Math.abs(seconds) >= size) || units.at(-1);
document.querySelector(".build-time-ago").textContent = \` (\${new Intl.RelativeTimeFormat("en-US", { numeric: "auto" }).format(Math.round(seconds / size), unit)})\`;`;
	let searchScript = $derived.by(() => {
		let keys = Object.fromEntries(postSources.map(({ key, label }) => [label, key]));
		return `const base = ${JSON.stringify(htmlBaseUrl("/"))};
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

async function search() {
	let term = input.value.trim();
	if(!term) {
		await pagefind.debouncedSearch(null, {}, 0);
		results.hidden = true;
		return;
	}
	let response = await pagefind.debouncedSearch(term, {}, 200);
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
	});
</script>
{@html "<!doctype html>"}
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>{fullTitle}</title>
		{@html `<style>${getBundle("css")}</style>`}
		{@html `<script type="module">${searchScript}<\/script>`}
	</head>
	<body>
		<header class="site-header">
			<div class="wrap">
				<div class="site-nav">
					<a href="/" class="site-title">{pageTitle}</a>
					<nav aria-label="Site"><a href="/popular/" aria-current={page.url === "/popular/" ? "page" : null}>Popular</a></nav>
				</div>
				<p class="site-tagline">A versioned archive of posts from Bluesky, Mastodon, GitHub, npm, YouTube, Letterboxd, Hacker News, and blogs.</p>
				<nav class="source-links" aria-label="Sources">
					<a href="/" class="source-link source-link--all" aria-current={page.url === "/" ? "page" : null}><i class="fa-solid fa-layer-group"></i>All <span class="source-link-count">{siteStats.total.posts.toLocaleString("en-US")}</span></a>
					{#each postSources as { key, label, icon }}<a href="/{key}/" class={["source-link", `source-link--${key}`]} aria-current={sourcePage?.type === key ? "page" : null}><i class={icon}></i>{label} <span class="source-link-count">{siteStats[key].posts.toLocaleString("en-US")}</span></a>{/each}
				</nav>
				<form id="search" class="search" role="search" action="javascript:void(0)">
					<input type="search" class="search-input" placeholder="Search" aria-label="Search" autocomplete="off">
					<div class="search-results" hidden>
						<p class="search-message" aria-live="polite"></p>
						<ol class="search-list"></ol>
						<button type="button" class="search-more" hidden>Load more results</button>
					</div>
				</form>
				{#if page.url === "/popular/"}<SiteStats /><Activity groups={collections.postGroups} />{/if}
			</div>
		</header>
		<main class="wrap">{@html content}</main>
		<footer class="site-footer wrap">
			{#if page.url !== "/popular/"}<SiteStats /><Activity groups={collections.postGroups} />{/if}
			<p>Last built <time class="build-time" datetime={buildTime.toISOString()}>{readableDate(buildTime)}</time><span class="build-time-ago"></span>.</p>
			<p>Built with <a href="https://www.11ty.dev/">11ty</a>, <a href="https://github.com/11ty/eleventy-import">11ty/import</a>, and <a href="https://pagefind.app/">Pagefind</a>. <a href="https://github.com/zachleat/nexodus">Source code</a></p>
		</footer>
		<div>{@html getBundle("fontawesome")}</div>
		{@html `<script type="module">${buildTimeScript}<\/script>`}
	</body>
</html>
<style>
:global {
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
		--hackernews: #ff6600;
		--blog: #475569;
		--activity: #2da44e;
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
			--hackernews: #ff8a3d;
			--blog: #94a3b8;
			--activity: #39d353;
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
	.site-stats-wrap { margin-bottom: 1.5rem; overflow-x: auto; }
	.site-header .site-stats-wrap { margin: 1rem 0 0; font-size: .85rem; }
	.site-stats { width: 100%; border-collapse: collapse; color: var(--muted); font-variant-numeric: tabular-nums; }
	.site-stats :is(th, td) { padding: .1rem 0 .1rem 1rem; text-align: right; font-weight: 400; vertical-align: top; }
	.site-stats :is(th, td):first-child { padding-left: .5rem; text-align: left; }
	.site-stats :is(th, td):last-child { padding-right: .5rem; }
	.site-stats :is(tbody, tfoot) th { font-weight: 600; }
	.site-stats th a { color: inherit; }
	.site-stats :is(tbody, tfoot) tr { border-top: 1px solid var(--border); }
	.site-stats--total { background: color-mix(in srgb, var(--text) 3%, transparent); }
	.site-stats--total th { color: var(--text); }
	.site-stats--bluesky th { color: var(--bluesky); }
	.site-stats--fediverse th { color: var(--fediverse); }
	.site-stats--github th { color: var(--github); }
	.site-stats--npm th { color: var(--npm); }
	.site-stats--youtube th { color: var(--youtube); }
	.site-stats--letterboxd th { color: var(--letterboxd); }
	.site-stats--hackernews th { color: var(--hackernews); }
	.site-stats--blog th { color: var(--blog); }
	.site-stats :is(time, .site-stats-value) { white-space: nowrap; }
	.site-stats-value svg { margin-right: .25em; }
	.site-stats-icon-separator { margin-inline: .2em; }
	@media (max-width: 40em) {
		.site-stats { font-size: .75rem; }
		.site-stats :is(th, td) { padding-left: .5rem; }
	}
	@media (max-width: 474.98px) {
		.site-stats-col--views { display: none; }
		.site-stats-col--reposts { padding-right: .5rem; }
	}
	.site-header .activity { margin: 1rem 0 0; }
	.activity { margin: 0 0 1.5rem; color: var(--muted); font-size: .75rem; font-variant-numeric: tabular-nums; }
	.activity-years { display: grid; grid-template-columns: repeat(var(--years), 1fr); gap: 2px; margin: 0; padding: 0; list-style: none; }
	.activity-year { min-width: 0; }
	/* Top padding leaves room for the tallest bar’s count */
	.activity-track { display: flex; flex-direction: column; justify-content: flex-end; align-items: center; height: 7rem; padding-top: 1.25rem; }
	.activity-bar { flex-shrink: 0; width: 100%; border-radius: 2px 2px 0 0; background: var(--activity); }
	.activity-count { font-size: .65rem; white-space: nowrap; }
	.activity-label { display: block; padding-top: .25rem; border-top: 1px solid var(--border); text-align: center; white-space: nowrap; }
	.activity-label-short { display: none; }
	.activity-caption { margin-top: .5rem; }
	@media (max-width: 40em) {
		.activity-count { display: none; }
		.activity-label-full { display: none; }
		.activity-label-short { display: inline; }
	}
	:is(.site-stats, .source-links) svg { height: 1em; overflow: visible; vertical-align: -.125em; }
	.source-links svg { margin-right: .35em; }
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
	.post-source--hackernews { --accent: var(--hackernews); }
	.post-source--blog { --accent: var(--blog); }
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
	.post.post--hackernews { border-left: 3px solid var(--hackernews); }
	.post.post--blog { border-left: 3px solid var(--blog); }
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
	.source-links { display: flex; flex-wrap: wrap; gap: .25rem 1.25rem; margin-bottom: .75rem; font-size: .85rem; font-weight: 600; }
	.source-link { color: var(--accent); text-decoration: none; }
	.source-link:is(:hover, [aria-current]) { text-decoration: underline; }
	.source-link-count { color: var(--muted); font-weight: 400; }
	.source-link, .search-result { --accent: var(--fediverse); }
	.source-link--bluesky, .search-result--bluesky { --accent: var(--bluesky); }
	.source-link--github, .search-result--github { --accent: var(--github); }
	.source-link--npm, .search-result--npm { --accent: var(--npm); }
	.source-link--youtube, .search-result--youtube { --accent: var(--youtube); }
	.source-link--letterboxd, .search-result--letterboxd { --accent: var(--letterboxd); }
	.source-link--hackernews, .search-result--hackernews { --accent: var(--hackernews); }
	.source-link--blog, .search-result--blog { --accent: var(--blog); }
	.source-link--all { --accent: var(--text); }
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
}
</style>
