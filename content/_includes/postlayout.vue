<template>
	<span v-for="p in group.posts" hidden data-pagefind-filter="source">{{ p.data.sectionTitle }}</span>
	<span hidden data-pagefind-sort="date">{{ page.date.toISOString() }}</span>
	<span hidden data-pagefind-meta="title">{{ readableDate(page.date) }}</span>
	<Post :post="post" :group="group" :index-body="indexBody" :post-content="content" />
	<nav class="pager" aria-label="Posts">
		<a v-if="nextPost" :href="nextPost.url" rel="next">← Newer</a><span v-else></span>
		<a v-if="previousPost" :href="previousPost.url" rel="prev">Older →</a>
	</nav>
</template>
<script>
import Post from "./Post.vue";

export default {
	components: { Post },
	data() {
		return {
			layout: "layout.vue",
		};
	},
	computed: {
		post() {
			return this.getCollectionItem(this.collections.all, this.page);
		},
		previousPost() {
			return this.getPreviousCollectionItem(this.collections.all, this.page);
		},
		nextPost() {
			return this.getNextCollectionItem(this.collections.all, this.page);
		},
		// Cross-posts are indexed once
		indexBody() {
			return this.group.primary.url === this.page.url;
		},
		group() {
			return this.getPostGroup(this.collections.postGroups, this.page.url);
		},
	},
};
</script>
