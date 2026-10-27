<script>
	import { getContext } from "svelte";

	let { groups, type } = $props();
	const { getActivity } = getContext("functions");

	let activity = $derived(getActivity(groups, type));
	let postCount = count => `${count.toLocaleString("en-US")} ${count === 1 ? "post" : "posts"}`;
</script>
<figure class="activity" style:--activity={type ? `var(--${type})` : null}>
	<ol class="activity-years" style:--years={activity.years.length}>
		{#each activity.years as { year, count, typeCount }}<li class="activity-year" title="{postCount(typeCount)} in {year}">
			<span class="activity-track"><span class="activity-count" style:--level={typeCount / activity.max}>{typeCount ? typeCount.toLocaleString("en-US") : ""}</span><span class="activity-bar" style:height="{count / activity.max * 100}%">{#if typeCount}<span class="activity-segment" style:flex-grow={typeCount}></span>{/if}{#if count > typeCount}<span class="activity-segment activity-segment--other" style:flex-grow={count - typeCount} title="{postCount(count - typeCount)} from other sources in {year}"></span>{/if}</span></span>
			<span class="activity-label"><span class="activity-label-full">{year}</span><span class="activity-label-short" aria-hidden="true">’{String(year).slice(-2)}</span></span>
		</li>{/each}
	</ol>
	<figcaption class="activity-caption">{postCount(activity.typeTotal)} by year</figcaption>
</figure>
