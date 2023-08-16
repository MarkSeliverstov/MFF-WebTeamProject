<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	$: ({ websiteRecords } = data);
</script>

{#each websiteRecords as websiteRecord (websiteRecord.id)}
	<li>
		<h2>{websiteRecord.label}</h2>
		<p>URL: {websiteRecord.url}</p>
		<p>
			Periodicity: every {websiteRecord.periodicity.interval}
			{websiteRecord.periodicity.unit}
		</p>
		<p>Regex: {websiteRecord.regexp}</p>
		<p>Active: {websiteRecord.active ? 'Yes' : 'No'}</p>
		<p>Tags: {websiteRecord.tags.join(', ')}</p>
	</li>
{/each}
