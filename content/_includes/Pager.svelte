<script>
	let { label, newer, older, summary, rel = false } = $props();
</script>
<nav class={["pager", { "pager--top": summary }]} aria-label={label}>
	{#if newer}<a href={newer} rel={rel ? "next" : null}>← Newer</a>{:else}<span class="pager-disabled" aria-disabled="true">← Newer</span>{/if}
	{#if summary}<span class="summary">{summary}</span>{/if}
	{#if older}<a href={older} rel={rel ? "prev" : null}>Older →</a>{:else}<span class="pager-disabled" aria-disabled="true">Older →</span>{/if}
</nav>
