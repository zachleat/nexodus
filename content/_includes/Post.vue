<template>
	<article :class="['post', `post--${post.data.metadata.type}`, { 'post--crosspost': group.posts.length > 1 }]">
		<div class="post-meta">
			<a v-for="p in group.posts" :href="p.url" :class="['post-source', `post-source--${p.data.metadata.type}`]">{{ p.data.sectionTitle }}</a>
			<a :href="post.url"><time :datetime="post.date.toISOString()" :title="readableDate(post.date)">{{ friendlyDate(post.date) }}</time></a>
			<span v-if="replyParent">In reply to <a :href="replyParent.url">{{ replyParent.data.sectionTitle }} post</a></span>
			<span class="post-counts">
				<a v-if="replyCount" :href="`${post.url}#replies-title`" :title="plural(replyCount, 'reply', 'replies')"><i class="fa-regular fa-comment"></i><span aria-hidden="true">{{ replyCount }}</span><span class="visually-hidden">{{ plural(replyCount, "reply", "replies") }}</span></a>
				<template v-for="{ key, label, icon } in countLabels"><span v-if="counts[key]" :title="plural(counts[key], label)"><i :class="icon"></i><span aria-hidden="true">{{ counts[key] }}</span><span class="visually-hidden">{{ plural(counts[key], label) }}</span></span></template>
			</span>
		</div>
		<h2 v-if="post.data.showTitle" class="post-title"><a :href="post.url">{{ post.data.title }}</a></h2>
		<img v-if="post.data.metadata.media?.featuredImage" :src="post.data.metadata.media.featuredImage" class="post-image" alt="" loading="lazy" decoding="async">
		<div v-if="html?.trim() || !post.data.description" class="post-content" :data-pagefind-body="indexBody ? '' : null" v-html="html"></div>
		<div v-else class="post-content" :data-pagefind-body="indexBody ? '' : null"><p>{{ post.data.description }}</p></div>
		<div class="post-footer">
			<span class="post-author">
				<img v-if="avatarUrl" :src="avatarUrl" class="post-avatar" width="24" height="24" alt="" loading="lazy" decoding="async">
				<span v-html="renderAuthors(post.data.authors)"></span>
			</span>
			<span class="post-links">
				<a v-for="p in group.posts" :href="p.data.metadata.url" :title="`View on ${p.data.sectionTitle}`"><i :class="sourceIcons[p.data.metadata.type]"></i>View original<span class="visually-hidden"> on {{ p.data.sectionTitle }}</span></a>
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
			sourceIcons: {
				bluesky: "fa-brands fa-bluesky",
				fediverse: "fa-brands fa-mastodon",
				github: "fa-brands fa-github",
				npm: "fa-brands fa-npm",
				youtube: "fa-brands fa-youtube",
				letterboxd: "fa-brands fa-letterboxd",
				codepen: "fa-brands fa-codepen",
			},
			countLabels: [
				{ key: "likes", label: "like", icon: "fa-regular fa-heart" },
				{ key: "reposts", label: "repost", icon: "fa-solid fa-retweet" },
				{ key: "quotes", label: "quote", icon: "fa-solid fa-quote-left" },
			],
		};
	},
	computed: {
		// Posts without content (e.g. npm releases) show their description instead
		html() {
			return this.resolveAssets(this.postContent || this.post.content, this.post);
		},
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
.post-links a { display: inline-flex; align-items: center; gap: .35em; }
.post-counts svg, .post-links svg { height: 1em; overflow: visible; vertical-align: -.125em; }
.post-counts svg { margin-right: .35em; }
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
