<template>
	<nav class="pager pager--top" aria-label="Pages (top)">
		<a v-if="pagination.href.previous" :href="pagination.href.previous">← Newer</a><span v-else class="pager-disabled" aria-disabled="true">← Newer</span>
		<span class="summary">Page {{ pagination.pageNumber + 1 }} of {{ pagination.pages.length }}</span>
		<a v-if="pagination.href.next" :href="pagination.href.next">Older →</a><span v-else class="pager-disabled" aria-disabled="true">Older →</span>
	</nav>
	<div class="feed">
		<Post v-for="group in groups" :post="group.primary" :group="group" />
	</div>
	<nav class="pager" aria-label="Pages">
		<a v-if="pagination.href.previous" :href="pagination.href.previous">← Newer</a><span v-else class="pager-disabled" aria-disabled="true">← Newer</span>
		<a v-if="pagination.href.next" :href="pagination.href.next">Older →</a><span v-else class="pager-disabled" aria-disabled="true">Older →</span>
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
