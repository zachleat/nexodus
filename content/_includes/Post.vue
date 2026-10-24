<template>
	<article :class="['post', `post--${post.data.metadata.type}`, { 'post--crosspost': group.posts.length > 1 }]">
		<div class="post-meta">
			<a v-for="p in group.posts" :href="p.url" :class="['post-source', `post-source--${p.data.metadata.type}`]">{{ p.data.sectionTitle }}</a>
			<a :href="post.url"><time :datetime="post.date.toISOString()" :title="readableDate(post.date)">{{ friendlyDate(post.date) }}</time></a>
			<span v-if="replyParent">In reply to <a :href="replyParent.url">{{ replyParent.data.sectionTitle }} post from {{ friendlyDate(replyParent.date) }}</a></span>
			<a v-if="replyCount":href="`${post.url}#replies-title`">{{ replyCount }} {{ replyCount === 1 ? "reply" : "replies" }}</a>
		</div>
		<div class="post-content" :data-pagefind-body="indexBody ? '' : null" v-html="postContent || post.content"></div>
		<div class="post-footer">
			<span v-html="renderAuthors(post.data.authors)"></span>
			<span class="post-links">
				<a v-for="p in group.posts" :href="p.data.metadata.url">View on {{ p.data.sectionTitle }}</a>
			</span>
		</div>
	</article>
</template>
<script>
import { getComments } from "./replies.js";

export default {
	props: {
		post: Object,
		group: Object,
		indexBody: Boolean,
		postContent: String,
	},
	computed: {
		replyParent() {
			for(let p of this.group.posts) {
				let parent = this.getReplyParent(this.collections.all, p.data.metadata.url);
				if(parent) {
					return parent;
				}
			}
		},
		replyCount() {
			return getComments(this.group.posts).length;
		},
	},
};
</script>
