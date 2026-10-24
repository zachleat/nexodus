<template>
	<span v-for="p in group.posts" hidden data-pagefind-filter="source">{{ p.data.sectionTitle }}</span>
	<span hidden data-pagefind-sort="date">{{ page.date.toISOString() }}</span>
	<span hidden data-pagefind-meta="title">{{ friendlyDate(page.date) }}</span>
	<span v-if="post.data.showTitle" hidden data-pagefind-meta="heading">{{ post.data.title }}</span>
	<Post :post="post" :group="group" :index-body="indexBody" :post-content="content" />
	<nav class="pager" aria-label="Posts">
		<a v-if="nextPost" :href="nextPost.url" rel="next">← Newer</a><span v-else class="pager-disabled" aria-disabled="true">← Newer</span>
		<a v-if="previousPost" :href="previousPost.url" rel="prev">Older →</a><span v-else class="pager-disabled" aria-disabled="true">Older →</span>
	</nav>
	<Replies :posts="group.posts" />
	<nav v-if="replyCount" class="pager" aria-label="More posts">
		<a v-if="nextPost" :href="nextPost.url" rel="next">← Newer</a><span v-else class="pager-disabled" aria-disabled="true">← Newer</span>
		<a v-if="previousPost" :href="previousPost.url" rel="prev">Older →</a><span v-else class="pager-disabled" aria-disabled="true">Older →</span>
	</nav>
</template>
<script>
import Post from "./Post.vue";
import Replies from "./Replies.vue";
import { getComments } from "./replies.js";

export default {
	components: { Post, Replies },
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
		// A second pager after long reply threads
		replyCount() {
			return getComments(this.group.posts).length;
		},
	},
};
</script>
