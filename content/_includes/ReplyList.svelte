<script>
	import { getContext } from "svelte";
	import ReplyList from "./ReplyList.svelte";

	let { replies, showSource = false, ownerUrls, startDate } = $props();
	const { renderAuthors, readableDate, timeAfter } = getContext("functions");

	const sourceTitles = { bluesky: "Bluesky", fediverse: "Mastodon" };

	function isOwner(reply) {
		return ownerUrls.includes(reply.author?.url);
	}
</script>
<ol class="reply-list">
	{#each replies as reply}
		<li class={["reply", `reply--${reply.via}`]}>
			<div class={["reply-body", { post: isOwner(reply), [`post--${reply.via}`]: isOwner(reply) }]}>
				<div class="reply-meta">
					{#if reply.author?.avatarUrl}<img src={reply.author.avatarUrl} class="reply-avatar" width="24" height="24" alt="" loading="lazy" decoding="async">{/if}
					{#if reply.author}<span class="reply-author">{@html renderAuthors([reply.author])}</span>{:else}<span class="reply-author">Private reply</span>{/if}
					{#if showSource}<span class={["post-source", `post-source--${reply.via}`]}>{sourceTitles[reply.via]}</span>{/if}
					<a href={reply.url}><time datetime={reply.date} title={readableDate(new Date(reply.date))}>{timeAfter(new Date(reply.date), startDate)}</time></a>
				</div>
				{#if reply.content}<div class="reply-content">{@html reply.content}</div>{/if}
			</div>
			{#if reply.children.length}<ReplyList replies={reply.children} {showSource} {ownerUrls} {startDate} />{/if}
		</li>
	{/each}
</ol>
<style>
:global {
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
}
</style>
