<template>
	<p class="summary">Page {{ pagination.pageNumber + 1 }} of {{ pagination.pages.length }}</p>
	<div class="feed">
		<Post v-for="group in groups" :post="group.primary" :group="group" />
	</div>
	<nav class="pager" aria-label="Pages">
		<a v-if="pagination.href.previous" :href="pagination.href.previous">← Newer</a><span v-else></span>
		<a v-if="pagination.href.next" :href="pagination.href.next">Older →</a>
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
				data: "collections.postGroups",
				size: 50,
				alias: "groups",
			},
			permalink: data => data.pagination.pageNumber > 0 ? `/page/${data.pagination.pageNumber + 1}/` : "/",
		};
	},
};
</script>
