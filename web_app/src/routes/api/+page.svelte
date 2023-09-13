<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	$: ({ websiteRecords, createdId, updatedRecord, deleted, executions, deletedExecutions } = data);
</script>

<!-- {#each websiteRecords as websiteRecord (websiteRecord.id)}
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
{/each} -->

<h1>{createdId}</h1>
<!-- <h1>{deleted.success}</h1> -->


<!-- <h2>{updatedRecord.label}</h2>
<p>URL: {updatedRecord.url}</p>
<p>
	Periodicity: every {updatedRecord.periodicity.interval}
	{updatedRecord.periodicity.unit}
</p>
<p>Regex: {updatedRecord.regexp}</p>
<p>Active: {updatedRecord.active ? 'Yes' : 'No'}</p>
<p>Tags: {updatedRecord.tags.join(', ')}</p> -->

{#each executions as execution (execution.id)}
	<li>
		<h2>{execution.executionId}</h2>
		<p>{execution.websiteRecordId}</p>
		<p>{execution.crawlTimeStart}</p>
		<p>{execution.crawlTimeEnd}</p>
		<p>{execution.status}</p>
		<p>{execution.sitesCrawled}</p>
	</li>
{/each}

<h1>{deletedExecutions.success}</h1>
