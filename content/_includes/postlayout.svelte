<script module>
	export const data = {
		layout: "layout.svelte",
	};
</script>
<script>
	import { getContext } from "svelte";
	import Pager from "./Pager.svelte";
	import Post from "./Post.svelte";
	import Replies from "./Replies.svelte";
	import { getComments } from "./replies.js";

	let { page, collections, content } = $props();
	const { getCollectionItem, getPreviousCollectionItem, getNextCollectionItem, getPostGroup, friendlyDate } = getContext("functions");

	let post = $derived(getCollectionItem(collections.all, page));
	let previousPost = $derived(getPreviousCollectionItem(collections.all, page));
	let nextPost = $derived(getNextCollectionItem(collections.all, page));
	let group = $derived(getPostGroup(collections.postGroups, page.url));
	// Cross-posts are indexed once
	let indexBody = $derived(group.primary.url === page.url);
	let crossposts = $derived(group.posts.filter(p => p.url !== page.url));
	// A second pager after long reply threads
	let replyCount = $derived(getComments(group.posts).length);
</script>
{#each group.posts as p}<span hidden data-pagefind-filter="source">{p.data.sectionTitle}</span>{/each}
<span hidden data-pagefind-sort="date">{page.date.toISOString()}</span>
<span hidden data-pagefind-meta="title">{friendlyDate(page.date)}</span>
{#if post.data.showTitle || post.data.searchTitle}<span hidden data-pagefind-meta="heading">{post.data.showTitle ? post.data.title : post.data.searchTitle}</span>{/if}
<div class="entry">
	<Pager label="Posts" newer={nextPost?.url} older={previousPost?.url} rel />
	<Post {post} {group} {indexBody} postContent={content} />
	{#if crossposts.length}<p class="crossposts">Also posted to {#each crossposts as p, index}{#if index}, {/if}<a href={p.url} class={["post-source", `post-source--${p.data.metadata.type}`]}>{p.data.sectionTitle}</a>{/each}.</p>{/if}
	<Replies posts={group.posts} />
	{#if replyCount}<Pager label="More posts" newer={nextPost?.url} older={previousPost?.url} rel />{/if}
</div>
