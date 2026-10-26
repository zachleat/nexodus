<script>
	import { getContext } from "svelte";

	let { groups } = $props();
	const { getActivity } = getContext("functions");

	let activity = $derived(getActivity(groups));
	let postCount = count => `${count.toLocaleString("en-US")} ${count === 1 ? "post" : "posts"}`;
</script>
<figure class="activity">
	<ol class="activity-years" style:--years={activity.years.length}>
		{#each activity.years as { year, count }}<li class="activity-year" title="{postCount(count)} in {year}">
			<span class="activity-track"><span class="activity-count">{count.toLocaleString("en-US")}</span><span class="activity-bar" style:height="{count / activity.max * 100}%"></span></span>
			<span class="activity-label"><span class="activity-label-full">{year}</span><span class="activity-label-short" aria-hidden="true">’{String(year).slice(-2)}</span></span>
		</li>{/each}
	</ol>
	<figcaption class="activity-caption">{postCount(activity.total)} by year</figcaption>
</figure>
