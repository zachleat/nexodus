<template>
	<article :class="['post', `post--${post.data.metadata.type}`, { 'post--crosspost': group.posts.length > 1 }]">
		<div class="post-meta">
			<a v-for="p in group.posts" :href="p.url" :class="['post-source', `post-source--${p.data.metadata.type}`]">{{ p.data.sectionTitle }}</a>
			<a :href="post.url"><time :datetime="post.date.toISOString()" :title="readableDate(post.date)">{{ friendlyDate(post.date) }}</time></a>
			<span v-if="replyParent">In reply to <a :href="replyParent.url">{{ replyParent.data.sectionTitle }} post</a></span>
			<span class="post-counts">
				<a v-if="replyCount" :href="`${post.url}#replies-title`" :title="plural(replyCount, 'reply', 'replies')"><i class="fa-regular fa-comment"></i> <span aria-hidden="true">{{ replyCount }}</span><span class="visually-hidden">{{ plural(replyCount, "reply", "replies") }}</span></a>
				<template v-for="{ key, label, icon } in countLabels"><span v-if="counts[key]" :title="plural(counts[key], label)"><i :class="icon"></i> <span aria-hidden="true">{{ counts[key] }}</span><span class="visually-hidden">{{ plural(counts[key], label) }}</span></span></template>
			</span>
		</div>
		<div class="post-content" :data-pagefind-body="indexBody ? '' : null" v-html="postContent || post.content"></div>
		<div class="post-footer">
			<span class="post-author">
				<img v-if="avatarUrl" :src="avatarUrl" class="post-avatar" width="24" height="24" alt="" loading="lazy" decoding="async">
				<span v-html="renderAuthors(post.data.authors)"></span>
			</span>
			<span class="post-links">
				<a v-for="p in group.posts" :href="p.data.metadata.url">View on {{ p.data.sectionTitle }}</a>
			</span>
		</div>
	</article>
</template>
<script>
import { getComments, getCounts } from "./replies.js";

export default {
	props: {
		post: Object,
		group: Object,
		indexBody: Boolean,
		postContent: String,
	},
	data() {
		return {
			countLabels: [
				{ key: "likes", label: "like", icon: "fa-regular fa-heart" },
				{ key: "reposts", label: "repost", icon: "fa-solid fa-retweet" },
				{ key: "quotes", label: "quote", icon: "fa-solid fa-quote-left" },
			],
		};
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
		counts() {
			return getCounts(this.group.posts);
		},
		avatarUrl() {
			return this.getAvatarUrl(this.collections.all, this.post.data.authors?.[0]?.url);
		},
		replyCount() {
			return getComments(this.group.posts).length;
		},
	},
	methods: {
		plural(count, singular, pluralForm = `${singular}s`) {
			return `${count} ${count === 1 ? singular : pluralForm}`;
		},
	},
};
</script>
<style>
.post-counts { display: inline-flex; flex-wrap: wrap; gap: .25rem .75rem; }
.post-counts svg { height: 1em; overflow: visible; vertical-align: -.125em; }
symbol { overflow: visible; }
.post-author { display: inline-flex; align-items: center; gap: .5rem; }
.post-avatar { width: 24px; height: 24px; border-radius: 50%; object-fit: cover; background: var(--border); }
.visually-hidden {
	position: absolute;
	width: 1px;
	height: 1px;
	overflow: hidden;
	clip-path: inset(50%);
	white-space: nowrap;
}
</style>
