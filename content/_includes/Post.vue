<template>
	<article :class="['post', `post--${post.data.metadata.type}`, { 'post--crosspost': group.posts.length > 1 }]">
		<div class="post-meta">
			<a v-for="p in group.posts" :href="p.url" :class="['post-source', `post-source--${p.data.metadata.type}`]">{{ p.data.sectionTitle }}</a>
			<a :href="post.url"><time :datetime="post.date.toISOString()">{{ readableDate(post.date) }}</time></a>
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
export default {
	props: {
		post: Object,
		group: Object,
		indexBody: Boolean,
		postContent: String,
	},
};
</script>
