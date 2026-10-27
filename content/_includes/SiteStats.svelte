<script>
	import { getContext } from "svelte";
	import { statSources } from "./sources.js";

	const { collections } = getContext("data");
	const { getSiteStats, shortDate } = getContext("functions");

	const statLabels = [
		{ key: "posts", label: "post", plural: "posts", icon: "fa-regular fa-message" },
		{ key: "replies", label: "reply", plural: "replies", icon: "fa-regular fa-comment" },
		{ key: "likes", label: "like", plural: "likes", icon: "fa-regular fa-heart" },
		{ key: "reposts", label: "repost", plural: "reposts and quotes", icon: ["fa-solid fa-retweet", "fa-solid fa-quote-left"] },
		{ key: "views", label: "view", plural: "views", icon: "fa-regular fa-eye" },
	];

	let siteStats = collections?.postGroups?.length ? getSiteStats(collections.postGroups) : undefined;
	let sources = statSources.filter(({ key }) => siteStats?.[key]);

	// GitHub, npm (including downloads as views), Hacker News, and YouTube use their own icons or repurpose columns for their own stats, and reposts include quotes
	function getStatCell(key, stat) {
		let stats = siteStats[key];
		let defaults = {
			reposts: [{ value: stats.reposts + stats.quotes }],
		};
		let cells = {
			github: {
				replies: [
					{ icon: "fa-regular fa-circle-dot", title: "Issues", value: stats.issues },
					{ icon: "fa-solid fa-code-pull-request", title: "Pull requests", value: stats.pullRequests },
				],
				likes: [{ icon: "fa-regular fa-star", title: "Stars", value: stats.likes }],
				reposts: [{ icon: "fa-solid fa-code-fork", title: "Forks", value: stats.reposts }],
			},
			npm: {
				posts: [{ icon: "fa-solid fa-box", title: "Projects", value: stats.packages }],
				replies: [{ icon: "fa-solid fa-tag", title: "Releases", value: stats.posts }],
				views: [{ icon: "fa-solid fa-download", title: "Downloads (past year)", value: stats.downloads }],
			},
			hackernews: {
				likes: [{ icon: "fa-solid fa-arrow-up", title: "Upvotes", value: stats.likes }],
			},
			youtube: {
				likes: [{ icon: "fa-regular fa-thumbs-up", title: "Likes", value: stats.likes }],
			},
		}[key]?.[stat] ?? defaults[stat] ?? [{ value: stats[stat] }];
		return cells.filter(({ value }) => value);
	}
</script>
{#snippet row({ key, label, icon })}
	<tr class="site-stats--{key}">
		{#if icon}<th scope="row" title={label}><a href="/{key}/"><i class={icon}></i><span class="visually-hidden">{label}</span></a></th>{:else}<th scope="row">{label}</th>{/if}
		<td><time datetime={siteStats[key].oldest.toISOString()}>{shortDate(siteStats[key].oldest)}</time></td>
		{#each statLabels as stat}<td class="site-stats-col--{stat.key}">{#each getStatCell(key, stat.key) as { icon, title, value }, index}{#if index}<br>{/if}<span class="site-stats-value">{#if icon}<i class={icon} {title}></i> {/if}{value.toLocaleString("en-US")}</span>{/each}</td>{/each}
	</tr>
{/snippet}
{#if siteStats}
	<div class="site-stats-wrap">
		<table class="site-stats">
			<thead>
				<tr><td></td><th scope="col" title="Since"><i class="fa-regular fa-calendar"></i><span class="visually-hidden">Since</span></th>{#each statLabels as { key, plural, icon }}<th scope="col" class="site-stats-col--{key}" title={plural}>{#each [icon].flat() as iconClass, index}{#if index}<span class="site-stats-icon-separator" aria-hidden="true">/</span>{/if}<i class={iconClass}></i>{/each}<span class="visually-hidden">{plural}</span></th>{/each}</tr>
			</thead>
			<!-- Per-source rows, with the All row in the table footer -->
			<tbody>
				{#each sources.filter(({ key }) => key !== "total") as source}{@render row(source)}{/each}
			</tbody>
			<tfoot>
				{#each sources.filter(({ key }) => key === "total") as source}{@render row(source)}{/each}
			</tfoot>
		</table>
	</div>
{/if}
