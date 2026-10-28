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
	// Saved theme applied before first paint
	const themeScript = `try {
	let theme = localStorage.getItem("theme");
	if(theme === "light" || theme === "dark") {
		document.documentElement.setAttribute("data-theme", theme);
	}
} catch(e) {}`;
	// Time since the build, e.g. “3 hours ago”
	const buildTimeScript = `const time = document.querySelector(".build-time");
const seconds = (new Date(time.dateTime) - Date.now()) / 1000;
const units = [["year", 31536000], ["month", 2592000], ["day", 86400], ["hour", 3600], ["minute", 60], ["second", 1]];
const [unit, size] = units.find(([, size]) => Math.abs(seconds) >= size) || units.at(-1);
document.querySelector(".build-time-ago").textContent = \` (\${new Intl.RelativeTimeFormat("en-US", { numeric: "auto" }).format(Math.round(seconds / size), unit)})\`;`;
	// Stacks releases of the same npm package within a run of npm cards, before first paint
	const npmStackScript = `for(let feed of document.querySelectorAll(".feed")) {
	let groups = [];
	let run = new Map();
	for(let card of [...feed.children]) {
		let name = card.dataset.npmPackage;
		if(!name) {
			run = new Map();
		} else if(run.has(name)) {
			run.get(name).push(card);
		} else {
			let group = [card];
			run.set(name, group);
			groups.push(group);
		}
	}
	for(let cards of groups.filter(group => group.length > 1)) {
		let stack = document.createElement("div");
		stack.className = "npm-stack";
		stack.style.setProperty("--npm-stack-peeks", Math.min(cards.length - 1, 3));
		cards[0].before(stack);
		let deck = document.createElement("div");
		deck.className = "npm-stack-cards";
		deck.append(...cards);
		cards.forEach((card, index) => {
			card.style.setProperty("--npm-stack-index", index);
			card.inert = index > 0;
		});
		let toggle = document.createElement("button");
		toggle.type = "button";
		toggle.className = "npm-stack-toggle";
		toggle.setAttribute("aria-expanded", "false");
		let label = \`\${cards.length - 1} more \${cards.length === 2 ? "release" : "releases"}: \${cards.slice(1).map(card => card.dataset.npmVersion).join(", ")}\`;
		toggle.textContent = \`Show \${label}\`;
		let stackId = document.querySelectorAll(".npm-stack").length;
		let update = () => {
			let open = stack.classList.toggle("npm-stack--open");
			toggle.setAttribute("aria-expanded", open);
			toggle.textContent = open ? "Show fewer releases" : \`Show \${label}\`;
			cards.slice(1).forEach(card => card.inert = !open);
		};
		toggle.addEventListener("click", () => {
			if(!document.startViewTransition || matchMedia("(prefers-reduced-motion: reduce)").matches) {
				update();
				return;
			}
			// Named only during the transition so the cards fan out from (or fold into) the stack
			let named = [...cards, toggle];
			named.forEach((el, index) => {
				el.style.viewTransitionName = \`npm-stack-\${stackId}-\${index}\`;
				el.style.viewTransitionClass = "npm-stack";
			});
			document.startViewTransition(update).finished.finally(() => {
				named.forEach(el => el.style.viewTransitionName = el.style.viewTransitionClass = "");
			});
		});
		stack.append(deck, toggle);
	}
}`;
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
		{@html `<script>${themeScript}<\/script>`}
		<link rel="stylesheet" href="/solar-eclipse-toggle/solar-eclipse-toggle.css">
		<script type="module" src="/solar-eclipse-toggle/solar-eclipse-toggle.js"></script>
		{@html `<style>${getBundle("css")}</style>`}
		{@html `<script type="module">${searchScript}<\/script>`}
	</head>
	<body>
		<header class="site-header">
			<div class="wrap">
				<div class="site-nav">
					<a href="/" class="site-title">{pageTitle}</a>
				</div>
				<div class="header-columns">
					<div class="header-browse">
						<p class="site-tagline">A versioned archive of posts from Bluesky, Mastodon, GitHub, npm, YouTube, Letterboxd, Hacker News, and blogs. Browse the <a href="/popular/" aria-current={page.url === "/popular/" ? "page" : null}>most popular posts</a>.</p>
						<p class="site-built">Last built <time class="build-time" datetime={buildTime.toISOString()}>{readableDate(buildTime)}</time><span class="build-time-ago"></span>.</p>
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
					</div>
					<div class="header-stats"><SiteStats /><Activity groups={collections.postGroups} type={sourcePage?.type} /></div>
				</div>
			</div>
		</header>
		<main class="wrap">{@html content}</main>
		{@html `<script>${npmStackScript}<\/script>`}
		<footer class="site-footer wrap">
			<p><a href="https://build.awesome.me/">Built Awesome</a> with <a href="https://github.com/11ty/eleventy-import">11ty/import</a> and <a href="https://pagefind.app/">Pagefind</a>. <a href="https://github.com/zachleat/nexodus">Source code</a></p>
			<solar-eclipse-toggle>
				<button type="button" disabled>
					<span class="se-label-dark" hidden><i class="fa-solid fa-moon"></i>Use dark theme</span>
					<span class="se-label-light" hidden><i class="fa-solid fa-sun"></i>Use light theme</span>
					<span class="se-label-unknown"><i class="fa-solid fa-circle-half-stroke"></i>Theme</span>
					<span class="se-system">System</span>
				</button>
			</solar-eclipse-toggle>
		</footer>
		<div>{@html getBundle("fontawesome")}</div>
		{@html `<script type="module">${buildTimeScript}<\/script>`}
	</body>
</html>
<style>
:global {
	:root {
		color-scheme: light;
		--bg: #f6f5f2;
		--surface: #ffffff;
		--wrap-max: 72rem;
		--card-shadow: 0 1px 3px rgb(0 0 0 / .04), 0 2px 8px rgb(0 0 0 / .03);
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
		:root:not([data-theme="light"]) {
			color-scheme: dark;
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
	:root[data-theme="dark"] {
		color-scheme: dark;
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
	.wrap { max-width: var(--wrap-max); margin-inline: auto; padding-inline: 16px; }

	.site-header { padding-block: 2.5rem 1.5rem; }
	.site-title { color: var(--text); font-size: 1.6rem; font-weight: 700; letter-spacing: -.02em; text-decoration: none; }
	.site-nav { display: flex; flex-wrap: wrap; align-items: baseline; justify-content: space-between; gap: .5rem 1rem; }
	.page-title { max-width: calc(var(--wrap-max) - 32px); margin: 0 auto .25rem; font-size: 1.3rem; letter-spacing: -.01em; }
	ol.feed { margin: 0; padding: 0; list-style: none; }
	.site-tagline { margin: .25rem 0 .5rem; color: var(--muted); }
	.site-built { margin: 0 0 1.25rem; color: var(--muted); font-size: .85rem; }
	.header-columns { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 28rem), 1fr)); gap: 1.5rem 3rem; align-items: start; }
	.header-stats > :last-child { margin-bottom: 0; }
	.site-stats-wrap { margin-bottom: 1.5rem; overflow-x: auto; }
	.site-stats { width: 100%; border-collapse: collapse; font-size: .85rem; color: var(--muted); font-variant-numeric: tabular-nums; }
	.site-stats :is(th, td) { padding: .1rem 0 .1rem 1rem; text-align: right; font-weight: 400; vertical-align: top; }
	.site-stats :is(th, td):first-child { padding-left: .5rem; text-align: left; }
	.site-stats :is(th, td):last-child { padding-right: .5rem; }
	.site-stats :is(tbody, tfoot) th { font-weight: 600; }
	.site-stats th a { color: inherit; }
	.site-stats :is(tbody, tfoot) tr { border-top: 1px solid var(--border); }
	:is(.site-stats thead, .site-stats--total) { background: color-mix(in srgb, var(--text) 3%, transparent); }
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
	.activity { margin: 0 0 1.5rem; color: var(--muted); font-size: .75rem; font-variant-numeric: tabular-nums; }
	.activity-years { display: grid; grid-template-columns: repeat(var(--years), 1fr); gap: 2px; margin: 0; padding: 0; list-style: none; }
	.activity-year { min-width: 0; }
	/* Top padding leaves room for the tallest bar’s count */
	.activity-track { position: relative; display: flex; flex-direction: column; justify-content: flex-end; align-items: center; height: 7rem; padding-top: 1.25rem; }
	.activity-bar { display: flex; flex-direction: column-reverse; flex-shrink: 0; width: 100%; border-radius: 2px 2px 0 0; overflow: hidden; }
	.activity-segment { flex-basis: 0; background: var(--activity); }
	/* Posts from other sources on source pages */
	.activity-segment--other { opacity: .15; }
	.activity-count { position: absolute; inset-inline: 0; bottom: calc((100% - 1.25rem) * var(--level)); font-size: .65rem; line-height: 1.4; text-align: center; white-space: nowrap; }
	.activity-label { display: block; padding-top: .25rem; border-top: 1px solid var(--border); font-size: .625rem; text-align: center; white-space: nowrap; }
	.activity-label-short { display: none; }
	.activity-caption { margin-top: .5rem; }
	@media (max-width: 40em) {
		.activity-count { display: none; }
		.activity-label-full { display: none; }
		.activity-label-short { display: inline; }
	}
	:is(.site-stats, .source-links) svg { height: 1em; overflow: visible; vertical-align: -.125em; }
	.source-links svg { margin-right: .35em; }
	.summary { max-width: calc(var(--wrap-max) - 32px); color: var(--muted); font-size: .9rem; margin: 0 auto 1rem; }

	main.wrap:has(.feed) { max-width: none; }
	.entry { max-width: 40rem; margin-inline: auto; }
	.entry > .pager:first-child { margin-block: 0 1rem; }
	.crossposts { margin: .75rem 0 0; color: var(--muted); font-size: .9rem; }
	.feed { columns: 24rem; column-gap: 1rem; }
	.feed > * { break-inside: avoid; margin-bottom: 1rem; }
	/* Older releases of the same npm package peek out beneath the newest */
	.npm-stack { position: relative; }
	.npm-stack-cards { position: relative; isolation: isolate; display: grid; gap: 1rem; }
	.npm-stack-cards > .post { z-index: calc(10 - var(--npm-stack-index)); }
	.npm-stack:not(.npm-stack--open) .npm-stack-cards { padding-block-end: calc(var(--npm-stack-peeks) * 2rem); }
	.npm-stack:not(.npm-stack--open) .post:not(:first-child) {
		position: absolute;
		inset: 0 0 calc(var(--npm-stack-peeks) * 2rem);
		overflow: hidden;
		translate: 0 calc(var(--npm-stack-index) * 2rem);
		scale: calc(1 - var(--npm-stack-index) * .03) 1;
		transition: translate .2s;
	}
	.npm-stack:not(.npm-stack--open) .post:not(:first-child) > * { visibility: hidden; }
	/* Small title peeking out of each edge */
	.npm-stack:not(.npm-stack--open) .post:not(:first-child) > .post-title {
		visibility: visible;
		position: absolute;
		inset-block-end: .4rem;
		inset-inline: 1.25rem;
		margin: 0;
		color: var(--muted);
		font-size: .8rem;
		font-weight: 600;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.npm-stack:not(.npm-stack--open) .post:nth-child(n + 5) { display: none; }
	.npm-stack:not(.npm-stack--open):has(.npm-stack-toggle:hover) .post:not(:first-child) { translate: 0 calc(var(--npm-stack-index) * 2rem + .15rem); }
	.npm-stack-toggle { padding: 0; border: 0; background: none; color: var(--muted); font: inherit; font-size: .85rem; cursor: pointer; }
	/* Collapsed, the whole peeking area is the button */
	.npm-stack:not(.npm-stack--open) .npm-stack-toggle { position: absolute; inset: auto 0 0; z-index: 1; height: calc(var(--npm-stack-peeks) * 2rem); color: transparent; overflow: hidden; }
	.npm-stack--open .npm-stack-toggle { display: block; margin: .5rem auto 0; }
	.npm-stack--open .npm-stack-toggle:hover { color: var(--text); text-decoration: underline; }
	::view-transition-group(.npm-stack) { animation-duration: .4s; animation-timing-function: cubic-bezier(.2, .8, .2, 1); }
	.post {
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		padding: 1rem 1.25rem;
		overflow-wrap: anywhere;
		box-shadow: var(--card-shadow);
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
	/* Service tint fading to the surface, and a second stripe beside the primary source border for cross-posts */
	.post { background: linear-gradient(to right, color-mix(in srgb, var(--service, var(--surface)) 2%, var(--surface)), var(--surface)); }
	.post.post--crosspost { background: linear-gradient(to right, color-mix(in srgb, var(--service) 2%, var(--surface)), color-mix(in srgb, var(--crosspost-accent) 2%, var(--surface))); box-shadow: inset 1px 0 0 var(--surface), inset 4px 0 0 var(--crosspost-accent), var(--card-shadow); }
	.post-links { display: flex; flex-wrap: wrap; gap: .25rem 1rem; }
	.post.post--bluesky { --service: var(--bluesky); border-left: 3px solid var(--bluesky); }
	.post.post--fediverse { --service: var(--fediverse); border-left: 3px solid var(--fediverse); }
	.post.post--github { --service: var(--github); border-left: 3px solid var(--github); }
	.post.post--npm { --service: var(--npm); border-left: 3px solid var(--npm); }
	.post.post--youtube { --service: var(--youtube); border-left: 3px solid var(--youtube); }
	.post.post--letterboxd { --service: var(--letterboxd); border-left: 3px solid var(--letterboxd); }
	.post.post--hackernews { --service: var(--hackernews); border-left: 3px solid var(--hackernews); }
	.post.post--blog { --service: var(--blog); border-left: 3px solid var(--blog); }
	.post-title { margin: .5rem 0 0; font-size: 1.1rem; }
	.post-title a { color: inherit; text-decoration: none; }
	.post-title svg { height: 1em; overflow: visible; vertical-align: -.125em; margin-right: .35em; }
	.post-image { display: block; margin-top: .75rem; }
	.post--letterboxd .post-image { width: 6rem; border-radius: 4px; }
	.post { min-width: 0; }
	.post-content :is(pre, table) { display: block; max-width: 100%; overflow-x: auto; }
	.post-content pre { padding: .75rem 1rem; background: var(--bg); border-radius: calc(var(--radius) - 4px); font-size: .85rem; }
	.post-content > :first-child { margin-top: .5rem; }
	.post-content > :last-child { margin-bottom: 0; }
	.post > :first-child, .post > .post-content:first-child > :first-child { margin-top: 0; }
	.post-content p { margin: .6rem 0; }
	.feed .post-content { display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 8; line-clamp: 8; overflow: hidden; }
	/* Fade only when clamped, since the scroll timeline is inactive without overflow */
	.feed .post-content { animation: post-content-fade linear both; animation-timeline: scroll(self); }
	@keyframes post-content-fade {
		from { mask-image: linear-gradient(to bottom, #000 calc(100% - 3em), transparent); }
		to { mask-image: none; }
	}

	/* Mastodon link truncation */
	.invisible { display: none; }
	.ellipsis::after { content: "…"; }

	.pager { display: flex; justify-content: space-between; margin-block: 2rem; font-weight: 600; }
	.pager-disabled { color: var(--muted); opacity: .6; cursor: default; }
	.pager--top { align-items: baseline; justify-content: center; gap: 1.5rem; margin-block: 0 1rem; }
	.pager--top > .summary { margin: 0; font-weight: 400; }
	.site-footer { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem; margin-top: 3rem; padding-block: 2rem 3rem; color: var(--muted); font-size: .85rem; }
	.site-footer > p { margin: 0; }

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
