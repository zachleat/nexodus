<script>
	import ReplyList from "./ReplyList.svelte";
	import { getComments } from "./replies.js";

	let { posts } = $props();

	function byDate(a, b) {
		return a.date.localeCompare(b.date);
	}

	// Threads the comments from every post in a cross-post group
	let replies = $derived.by(() => {
		let byId = new Map(getComments(posts).map(comment => [comment.id, { ...comment, children: [] }]));
		let roots = [];
		for(let reply of byId.values()) {
			let parent = reply.parentId && byId.get(reply.parentId);
			(parent ? parent.children : roots).push(reply);
		}
		for(let reply of byId.values()) {
			reply.children.sort(byDate);
		}
		return roots.sort(byDate);
	});
	let startDate = $derived(new Date(Math.min(...posts.map(post => post.date))));
	let ownerUrls = $derived(posts.flatMap(post => (post.data.authors || []).map(author => author.url)));
	let count = $derived(getComments(posts).length);
</script>
{#if count}
	<section class="replies" aria-labelledby="replies-title">
		<h2 id="replies-title" class="replies-title">{count} {count === 1 ? "reply" : "replies"}</h2>
		<ReplyList {replies} showSource={posts.length > 1} {ownerUrls} {startDate} />
	</section>
{/if}
<style>
:global {
	.replies { margin-top: 2rem; }
	.replies-title { font-size: 1rem; margin: 0 0 1rem; color: var(--muted); }
}
</style>
