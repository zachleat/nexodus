<script module>
	export const data = {
		layout: "layout.svelte",
		eleventyExcludeFromCollections: true,
		pagination: {
			data: "collections.postGroups",
			size: 50,
			alias: "groups",
		},
		permalink: data => data.pagination.pageNumber > 0 ? `/page/${data.pagination.pageNumber + 1}/` : "/",
	};
</script>
<script>
	import Pager from "./_includes/Pager.svelte";
	import Post from "./_includes/Post.svelte";

	let { pagination, groups } = $props();
</script>
<Pager label="Pages (top)" newer={pagination.href.previous} older={pagination.href.next} summary="Page {pagination.pageNumber + 1} of {pagination.pages.length}" />
<div class="feed">
	{#each groups as group}<Post post={group.primary} {group} />{/each}
</div>
<Pager label="Pages" newer={pagination.href.previous} older={pagination.href.next} />
