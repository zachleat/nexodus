<script module>
	export const data = {
		layout: "layout.svelte",
		eleventyExcludeFromCollections: true,
		pagination: {
			data: "collections.sourcePages",
			size: 1,
			alias: "sourcePage",
		},
		eleventyComputed: {
			title: data => data.sourcePage.title,
		},
		permalink: data => data.sourcePage.url,
	};
</script>
<script>
	import { getContext } from "svelte";
	import Pager from "./_includes/Pager.svelte";
	import Post from "./_includes/Post.svelte";

	let { sourcePage, collections } = $props();
	const { getPostGroup } = getContext("functions");
</script>
<h1 class="page-title">{sourcePage.title}</h1>
<Pager label="Pages (top)" newer={sourcePage.previousUrl} older={sourcePage.nextUrl} summary="Page {sourcePage.pageNumber} of {sourcePage.pageCount}" />
<div class="feed">
	{#each sourcePage.posts as post}<Post {post} group={getPostGroup(collections.postGroups, post.url)} />{/each}
</div>
<Pager label="Pages" newer={sourcePage.previousUrl} older={sourcePage.nextUrl} />
