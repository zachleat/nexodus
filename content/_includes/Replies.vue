<template>
	<section v-if="count" class="replies" aria-labelledby="replies-title">
		<h2 id="replies-title" class="replies-title">{{ count }} {{ count === 1 ? "reply" : "replies" }}</h2>
		<ReplyList :replies="replies" :show-source="posts.length > 1" :owner-urls="ownerUrls" :start-date="startDate" />
	</section>
</template>
<script>
import ReplyList from "./ReplyList.vue";
import { getComments } from "./replies.js";

function byDate(a, b) {
	return a.date.localeCompare(b.date);
}

export default {
	components: { ReplyList },
	props: {
		posts: Array,
	},
	computed: {
		// Threads the comments from every post in a cross-post group
		replies() {
			let byId = new Map(getComments(this.posts).map(comment => [comment.id, { ...comment, children: [] }]));
			let roots = [];
			for(let reply of byId.values()) {
				let parent = reply.parentId && byId.get(reply.parentId);
				(parent ? parent.children : roots).push(reply);
			}
			for(let reply of byId.values()) {
				reply.children.sort(byDate);
			}
			return roots.sort(byDate);
		},
		startDate() {
			return new Date(Math.min(...this.posts.map(post => post.date)));
		},
		ownerUrls() {
			return this.posts.flatMap(post => (post.data.authors || []).map(author => author.url));
		},
		count() {
			return getComments(this.posts).length;
		},
	},
};
</script>
<style>
.replies { margin-top: 2rem; }
.replies-title { font-size: 1rem; margin: 0 0 1rem; color: var(--muted); }
</style>
