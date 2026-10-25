<template>
	<h1 class="page-title">{{ sourcePage.title }}</h1>
	<nav class="pager pager--top" aria-label="Pages (top)">
		<a v-if="sourcePage.previousUrl" :href="sourcePage.previousUrl">← Newer</a><span v-else class="pager-disabled" aria-disabled="true">← Newer</span>
		<span class="summary">Page {{ sourcePage.pageNumber }} of {{ sourcePage.pageCount }}</span>
		<a v-if="sourcePage.nextUrl" :href="sourcePage.nextUrl">Older →</a><span v-else class="pager-disabled" aria-disabled="true">Older →</span>
	</nav>
	<div class="feed">
		<Post v-for="post in sourcePage.posts" :post="post" :group="getPostGroup(collections.postGroups, post.url)" />
	</div>
	<nav class="pager" aria-label="Pages">
		<a v-if="sourcePage.previousUrl" :href="sourcePage.previousUrl">← Newer</a><span v-else class="pager-disabled" aria-disabled="true">← Newer</span>
		<a v-if="sourcePage.nextUrl" :href="sourcePage.nextUrl">Older →</a><span v-else class="pager-disabled" aria-disabled="true">Older →</span>
	</nav>
</template>
<script>
import Post from "./_includes/Post.vue";

export default {
	components: { Post },
	data() {
		return {
			layout: "layout.vue",
			eleventyExcludeFromCollections: true,
			pagination: {
				data: "collections.sourcePages",
				size: 1,
				alias: "sourcePage",
			},
			eleventyComputed: {
				title: data => data.sourcePage.title,
			},
			permalink: data => data.sourcePage.url,
		};
	},
};
</script>
