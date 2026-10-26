<script>
	import { getContext } from "svelte";
	import { statSources } from "./sources.js";

	const { collections } = getContext("data");
	const { getSiteStats, shortDate } = getContext("functions");

	const statLabels = [
		{ key: "posts", label: "post", plural: "posts", icon: "fa-regular fa-message" },
		{ key: "replies", label: "reply", plural: "replies", icon: "fa-regular fa-comment" },
		{ key: "likes", label: "like", plural: "likes", icon: "fa-regular fa-heart" },
		{ key: "reposts", label: "repost", plural: "reposts", icon: "fa-solid fa-retweet" },
		{ key: "quotes", label: "quote", plural: "quotes", icon: "fa-solid fa-quote-left" },
		{ key: "views", label: "view", plural: "views", icon: "fa-regular fa-eye" },
	];

	let siteStats = collections?.postGroups?.length ? getSiteStats(collections.postGroups) : undefined;
	let sources = statSources.filter(({ key }) => siteStats?.[key]);

	// GitHub and npm repurpose columns for their own stats
	function getStatCell(key, stat) {
		let stats = siteStats[key];
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
				posts: [{ value: stats.packages }],
				replies: [{ value: stats.posts }],
			},
		}[key]?.[stat] ?? [{ value: stats[stat] }];
		return cells.filter(({ value }) => value);
	}
</script>
{#snippet row({ key, label, icon })}
	<tr class="site-stats--{key}">
		{#if icon}<th scope="row" title={label}><a href="/{key}/"><i class={icon}></i><span class="visually-hidden">{label}</span></a></th>{:else}<th scope="row">{label}</th>{/if}
		{#each statLabels as stat}<td>{#each getStatCell(key, stat.key) as { icon, title, value }, index}{#if index}<br>{/if} {#if icon}<i class={icon} {title}></i>{/if} {value.toLocaleString("en-US")}{/each}</td>{/each}
		<td><time datetime={siteStats[key].oldest.toISOString()}>{shortDate(siteStats[key].oldest)}</time></td>
	</tr>
{/snippet}
{#if siteStats}
	<div class="site-stats-wrap">
		<table class="site-stats">
			<thead>
				<tr><td></td>{#each statLabels as { plural, icon }}<th scope="col" title={plural}><i class={icon}></i><span class="visually-hidden">{plural}</span></th>{/each}<th scope="col" title="Since"><i class="fa-regular fa-calendar"></i><span class="visually-hidden">Since</span></th></tr>
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
