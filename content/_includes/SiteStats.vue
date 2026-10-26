<template>
	<div v-if="siteStats" class="site-stats-wrap">
		<table class="site-stats">
			<thead>
				<tr><td></td><th v-for="{ key, plural, icon } in statLabels" scope="col" :title="plural"><i :class="icon"></i><span class="visually-hidden">{{ plural }}</span></th><th scope="col" title="Since"><i class="fa-regular fa-calendar"></i><span class="visually-hidden">Since</span></th></tr>
			</thead>
			<component v-for="{ tag, sources } in statSections" :is="tag">
				<tr v-for="{ key, label, icon } in sources" :class="`site-stats--${key}`">
					<th v-if="icon" scope="row" :title="label"><a :href="`/${key}/`"><i :class="icon"></i><span class="visually-hidden">{{ label }}</span></a></th>
					<th v-else scope="row">{{ label }}</th>
					<td v-for="stat in statLabels"><template v-for="({ icon, title, value }, index) in getStatCell(key, stat.key)"><br v-if="index"> <i v-if="icon" :class="icon" :title="title"></i> {{ value.toLocaleString("en-US") }}</template></td>
					<td><time :datetime="siteStats[key].oldest.toISOString()">{{ shortDate(siteStats[key].oldest) }}</time></td>
				</tr>
			</component>
		</table>
	</div>
</template>
<script>
import { statSources } from "./sources.js";

export default {
	data() {
		return {
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
		siteStats() {
			let groups = this.collections?.postGroups;
			if(groups?.length) {
				return this.getSiteStats(groups);
			}
		},
		// Per-source rows, with the All row in the table footer
		statSections() {
			let sources = statSources.filter(({ key }) => this.siteStats?.[key]);
			return [
				{ tag: "tbody", sources: sources.filter(({ key }) => key !== "total") },
				{ tag: "tfoot", sources: sources.filter(({ key }) => key === "total") },
			];
		},
	},
	methods: {
		// GitHub and npm repurpose columns for their own stats
		getStatCell(key, stat) {
			let stats = this.siteStats[key];
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
		},
	},
};
</script>
