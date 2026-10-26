<script>
	import { getContext } from "svelte";
	import { getComments, getCounts } from "./replies.js";

	let { post, group, indexBody = false, postContent } = $props();
	const { collections } = getContext("data");
	const { readableDate, friendlyDate, resolveAssets, getReplyParent, getAvatarUrl, renderAuthors } = getContext("functions");

	const sourceIcons = {
		bluesky: "fa-brands fa-bluesky",
		fediverse: "fa-brands fa-mastodon",
		github: "fa-brands fa-github",
		npm: "fa-brands fa-npm",
		youtube: "fa-brands fa-youtube",
		letterboxd: "fa-brands fa-letterboxd",
		blog: "fa-regular fa-newspaper",
		hackernews: "fa-brands fa-hacker-news",
	};
	const countLabels = [
		{ key: "likes", label: "like", icon: "fa-regular fa-heart" },
		{ key: "reposts", label: "repost", icon: "fa-solid fa-retweet" },
		{ key: "quotes", label: "quote", icon: "fa-solid fa-quote-left" },
		{ key: "points", label: "point", icon: "fa-solid fa-arrow-up" },
		{ key: "comments", label: "comment", icon: "fa-regular fa-comments" },
	];

	// Posts without content (e.g. npm releases) show their description instead
	let html = $derived(resolveAssets(postContent || post.content, post));
	let replyParent = $derived(group.posts.map(p => getReplyParent(collections.all, p.data.metadata.url)).find(Boolean));
	let counts = $derived(getCounts(group.posts));
	let avatarUrl = $derived(getAvatarUrl(collections.all, post.data.authors?.[0]?.url));
	let replyCount = $derived(getComments(group.posts).length);
	// Blog posts link to their Open Graph image instead of showing the full post
	let openGraphImage = $derived(post.data.metadata.type === "blog" ? `https://v1.opengraph.11ty.dev/${encodeURIComponent(post.data.metadata.url)}/medium/` : undefined);

	function plural(count, singular, pluralForm = `${singular}s`) {
		return `${count} ${count === 1 ? singular : pluralForm}`;
	}
</script>
<article class={["post", `post--${post.data.metadata.type}`, { "post--crosspost": group.posts.length > 1 }]}>
	<div class="post-meta">
		{#each group.posts as p}<a href={p.url} class={["post-source", `post-source--${p.data.metadata.type}`]}>{p.data.sectionTitle}</a>{/each}
		<a href={post.url}><time datetime={post.date.toISOString()} title={readableDate(post.date)}>{friendlyDate(post.date)}</time></a>
		{#if replyParent}<span>In reply to <a href={replyParent.url}>{replyParent.data.sectionTitle} post</a></span>{/if}
	</div>
	{#if post.data.showTitle}<h2 class="post-title"><a href={post.url}>{post.data.title}</a></h2>{/if}
	{#if post.data.metadata.media?.featuredImage}<img src={post.data.metadata.media.featuredImage} class="post-image" alt="" loading="lazy" decoding="async">{/if}
	<div class="post-content" data-pagefind-body={indexBody ? "" : null}>{#if openGraphImage}<a href={post.data.metadata.url}><img src={openGraphImage} class="post-image" width="1200" height="630" alt={post.data.title} loading="lazy" decoding="async"></a>{:else if html?.trim() || !post.data.description}{@html html}{:else}<p>{post.data.description}</p>{/if}</div>
	<div class="post-footer">
		<span class="post-author">
			{#if avatarUrl}<img src={avatarUrl} class="post-avatar" width="24" height="24" alt="" loading="lazy" decoding="async">{/if}
			<span>{@html renderAuthors(post.data.authors)}</span>
		</span>
		<span class="post-links">
			<span class="post-counts">
				{#if replyCount}<a href="{post.url}#replies-title" title={plural(replyCount, "reply", "replies")}><i class="fa-regular fa-comment"></i><span aria-hidden="true">{replyCount}</span><span class="visually-hidden">{plural(replyCount, "reply", "replies")}</span></a>{/if}
				{#each countLabels as { key, label, icon }}{#if counts[key] && !(key === "comments" && replyCount)}<span title={plural(counts[key], label)}><i class={icon}></i><span aria-hidden="true">{counts[key]}</span><span class="visually-hidden">{plural(counts[key], label)}</span></span>{/if}{/each}
			</span>
			{#each group.posts as p}<a href={p.data.metadata.url} title="View on {p.data.sectionTitle}"><i class={sourceIcons[p.data.metadata.type]}></i>Original<span class="visually-hidden">{" "}on {p.data.sectionTitle}</span></a>{/each}
		</span>
	</div>
</article>
<style>
:global {
	.post-counts { display: inline-flex; flex-wrap: wrap; gap: .25rem .75rem; }
	.post-links > a { display: inline-flex; align-items: center; gap: .35em; }
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
}
</style>
