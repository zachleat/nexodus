<template>
	<h1 class="page-title">Popular posts</h1>
	<p class="summary">Top 20 by likes, reposts, quotes, and replies combined across Bluesky and Mastodon.</p>
	<ol class="feed">
		<li v-for="group in getPopularGroups(collections.postGroups, 20)"><Post :post="group.primary" :group="group" /></li>
	</ol>
</template>
<script>
import Post from "./_includes/Post.vue";

export default {
	components: { Post },
	data() {
		return {
			layout: "layout.vue",
			title: "Popular posts",
			eleventyExcludeFromCollections: true,
			permalink: "/popular/",
		};
	},
};
</script>
