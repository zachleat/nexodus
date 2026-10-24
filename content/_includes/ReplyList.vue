<template>
	<ol class="reply-list">
		<li v-for="reply in replies" :class="['reply', `reply--${reply.via}`]">
			<div :class="['reply-body', { post: isOwner(reply), [`post--${reply.via}`]: isOwner(reply) }]">
				<div class="reply-meta">
					<img v-if="reply.author?.avatarUrl" :src="reply.author.avatarUrl" class="reply-avatar" width="24" height="24" alt="" loading="lazy" decoding="async">
					<span v-if="reply.author" class="reply-author" v-html="renderAuthors([reply.author])"></span>
					<span v-else class="reply-author">Private reply</span>
					<span v-if="showSource" :class="['post-source', `post-source--${reply.via}`]">{{ sourceTitles[reply.via] }}</span>
					<a :href="reply.url"><time :datetime="reply.date" :title="readableDate(new Date(reply.date))">{{ timeAfter(new Date(reply.date), startDate) }}</time></a>
				</div>
				<div v-if="reply.content" class="reply-content" v-html="reply.content"></div>
			</div>
			<ReplyList v-if="reply.children.length" :replies="reply.children" :show-source="showSource" :owner-urls="ownerUrls" :start-date="startDate" />
		</li>
	</ol>
</template>
<script>
export default {
	name: "ReplyList",
	props: {
		replies: Array,
		showSource: Boolean,
		ownerUrls: Array,
		startDate: Date,
	},
	methods: {
		isOwner(reply) {
			return this.ownerUrls.includes(reply.author?.url);
		},
	},
	data() {
		return {
			sourceTitles: { bluesky: "Bluesky", fediverse: "Fediverse" },
		};
	},
};
</script>
<style>
.reply-list { list-style: none; margin: 0; padding: 0; display: grid; gap: .75rem; }
.reply-list .reply-list { margin-top: .75rem; padding-left: 1.5rem; }
/* L-shaped connector from the parent to each reply’s avatar row */
.reply-list .reply-list > .reply { position: relative; }
.reply-list .reply-list > .reply::before,
.reply-list .reply-list > .reply:not(:last-child)::after {
	content: "";
	position: absolute;
	left: -.75rem;
	top: -.75rem;
	border-left: 1px solid var(--border);
}
.reply-list .reply-list > .reply::before {
	width: .75rem;
	height: calc(.75rem + 1px + .75rem + 12px);
	border-bottom: 1px solid var(--border);
	border-bottom-left-radius: .5rem;
}
.reply-list .reply-list > .reply:not(:last-child)::after { bottom: -.75rem; }
.reply-meta {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: .25rem 1rem;
	font-size: .85rem;
	color: var(--muted);
}
.reply-meta a:not(.post-source) { color: inherit; }
.reply-avatar { width: 24px; height: 24px; margin-right: -.5rem; border-radius: 50%; object-fit: cover; background: var(--border); }
.reply-author { font-weight: 600; }
.reply-body { padding: .75rem 1rem; border: 1px solid var(--border); border-radius: var(--radius); background: transparent; }
.reply-body.post { padding: .75rem 1rem; }
.reply-content { overflow-wrap: anywhere; }
.reply-content p { margin: .25rem 0; }
</style>
