<script lang="ts">
	import { paginate, LightPaginationNav } from 'svelte-paginate';
	import type { Execution, WebsiteRecord } from '$lib/types';
	import type { PageData } from './api/$types';
	import SearchBar from '$components/SearchBar.svelte';
	import NoResults from '$components/NoResults.svelte';
	import RecordModal from '$components/RecordModal.svelte';
	import ExecutionModal from '$components/ExecutionModal.svelte';

	export let data: PageData;

	
	let showModal = false;
	let websiteRecordToEdit: WebsiteRecord | null = null;
	$: if (!showModal) {
		websiteRecordToEdit = null;
	}

	let paginatedItems: any;
	let currentPage = 1;
	let pageSize = 10;

	// fetch website records from db
	$: ({ websiteRecords } = data);
	
	
	// shallow copy of record array fetched from db; is filtered by search bar
	let shownRecords: WebsiteRecord[];
	$: (shownRecords = [...websiteRecords]), searchRecords(), sortRecords();

	let searchTerm = '';
	let searchMethods: string[] = [];
	let searchPlaceholder = '';

	let sortBy = 'URL';

	//reactively search and change the search bar when search methods change
	$: {
		if (!searchMethods.length) {
			searchPlaceholder = 'Select criteria to filter by';
			searchTerm = '';
		} else {
			searchPlaceholder = 'Filter by ' + searchMethods.join(', ');
		}
		searchRecords();
		sortRecords();
	}

	// search function
	const searchRecords = () => {
		return (shownRecords = (websiteRecords as WebsiteRecord[]).filter((record) => {
			// if no filter criteria are selected, show all records
			if (!searchMethods.length) {
				return true;
			} else {
				//defaults to true as criteria not influencing the search should not exclude results
				let urlMatch = false;
				let labelMatch = false;
				let tagsMatch = false;

				let searchTermLowered = searchTerm.toLowerCase();

				if (searchMethods.includes('URL')) {
					// prevent insignificant parts of url to be included in search
					let urlSource = new URL(record.url.toLowerCase());
					let url = urlSource.hostname + urlSource.pathname;

					urlMatch = url.includes(searchTermLowered);
				}

				if (searchMethods.includes('Label')) {
					let label = record.label.toLowerCase();

					labelMatch = label.includes(searchTermLowered);
				}

				if (searchMethods.includes('Tags')) {
					let tags = record.tags.filter((tag) => tag.toLowerCase()).join(' ');

					tagsMatch = tags.includes(searchTermLowered);
				}

				return urlMatch || labelMatch || tagsMatch;
			}
		}));
	};

	//sort function
	function sortRecords() {
		if (sortBy === 'URL') {
			return (shownRecords = shownRecords.sort((a, b) => {
				let aSource = new URL(a.url.toLowerCase());
				let aUrl = aSource.hostname + aSource.pathname;

				let bSource = new URL(b.url.toLowerCase());
				let bUrl = bSource.hostname + bSource.pathname;
				return aUrl < bUrl ? -1 : aUrl > bUrl ? 1 : 0;
			}));
		}

		if (sortBy === 'LastCrawl') {
			// TODO: implement sorting by last crawl time of each record
			//return shownRecords = (websiteRecords as WebsiteRecord[]).sort()
		}

		throw new Error('Error: cannot sort by' + sortBy);
	}	
	
	// refresh view function + state bool (true if loading new data)
	let refreshing: boolean = false;
	function refreshRecords() {
		fetch('/api/records')
		.then((response) => response.json())
		.then((newRecords) => (websiteRecords = newRecords))
		.then(() => {
			refreshing = false;
		})
		.catch((e) => console.log("fetching records encountered an error: " + e));
	}

	
	let loadingExecutions: boolean = false;
	let showExecutions = false;
	let showExecutionsForRecord = false;
	let executions : Execution[] = [];

	let executionParentRecord : WebsiteRecord | null = null; // passed to a record-specific execution showing 

	// fetch executions and save them into a page scoped variable
	function getExecutions() {
		fetch("/api/executions")
		.then((response) => response.json())
		.then((executionJSON) => {
			executions = (executionJSON as Execution[]);

			// map each record's label to its executions and add it as a field
			for (const record of websiteRecords) {

				const url = record.url;
				const currentExecutions = executions.filter((execution) => {
					return (execution.url === url && execution.root)
				})

				for (const execution of currentExecutions) {
					execution.label = record.label;
				}
			}})
		.then(() => {loadingExecutions = false;})
		.catch((e) => {
			console.log("Encountered an error while getting execution data. Error:" + e.type);
		}
		);
	}

	function filterExecutionsForRecord() {
		return executions.filter((execution) => {
			 return execution.url === executionParentRecord!.url && execution.root
		})
	}
	
	$: paginatedItems = paginate({ items: shownRecords, pageSize, currentPage });
</script>

<nav class="list-view-nav">
	<div class="search-bar">
		<SearchBar
			placeholder={searchPlaceholder}
			bind:searchMethods
			bind:searchTerm
			on:input={searchRecords}
		/>
		<button
			on:click={() => {
				loadingExecutions = true;
				getExecutions();
				showExecutions = true;}}
			class="view-buttons show-all-executions-button"
		>
		{#if (loadingExecutions)}
				<span class="loading-spinner" />
		{:else}
			Show all executions
		{/if}
		</button>

		<button
			on:click={() => {
				refreshing = true;
				refreshRecords();
			}}
			class="view-buttons refresh-button"
		>
			{#if refreshing}
				<span class="loading-spinner" />
			{:else}
				Refresh
			{/if}
		</button>
	</div>
</nav>

<body>
	{#if searchTerm && shownRecords.length === 0}
		<div class="no-results-wrapper">
			<NoResults />
		</div>
	{:else}
		<ul class="website-record-list">
			{#each paginatedItems as websiteRecord, i}
				<li class="website-record-li">
					<div class="fields-container">
						<h2 class="li-label">{websiteRecord.label}</h2>
						<p class="li-fields li-url">URL: {websiteRecord.url}</p>
						<p class="li-fields li-periodicity">
							Periodicity:
							{#if websiteRecord.periodicity != null}
								every
								{websiteRecord.periodicity.days} days,
								{websiteRecord.periodicity.hours} hours,
								{websiteRecord.periodicity.minutes} minutes
							{:else}
								No period set
							{/if}
						</p>
						<p class="li-fields li-regex">Regex: {websiteRecord.regexp}</p>
						<p class="li-fields li-active">Active: {websiteRecord.active ? 'Yes' : 'No'}</p>

						<ul class="li-fields li-tags">
							Tags:
							{#each websiteRecord.tags as tag}
								<li>
									{tag}
								</li>
							{/each}
						</ul>
						<!-- TODO: Time+status of last execution goes here -->
					</div>
					
					<div class="record-buttons-container">
						<button
						on:click={() => {fetch("http://crawler:5000/")}}
						class="start-crawling-button view-buttons">
							Start crawling
						</button>
						
						<button class="show-executions-button view-buttons"
						on:click={() => {
							getExecutions();
							executionParentRecord = websiteRecord;
							showExecutionsForRecord = true;
						}}>
							Show executions
						</button>
						
						<button
							on:click={() => {
								websiteRecordToEdit = websiteRecord;
								showModal = true;
							}}
							class="edit-record-button view-buttons">Edit</button
						>
					</div>					
				</li>
			{/each}
		</ul>
	{/if}

	{#if (showExecutionsForRecord)}
		<ExecutionModal bind:showModal={showExecutionsForRecord} executions={filterExecutionsForRecord()} record={executionParentRecord} />
	{/if}

	{#if showExecutions}
		<ExecutionModal bind:showModal={showExecutions} executions={executions}/>
	<!-- TODO: implement execution modal after finishing its component -->
	{/if}

	{#if showModal && websiteRecordToEdit === null}
		<RecordModal bind:showModal />
	{:else if showModal && websiteRecordToEdit != null}
		<RecordModal bind:showModal bind:websiteRecord={websiteRecordToEdit} />
		<!-- TODO: binding of websiteRecord may cause bugs! -->
	{/if}
</body>

<div class="pagination-div">
	<LightPaginationNav
		totalItems={shownRecords.length}
		{pageSize}
		{currentPage}
		limit={1}
		showStepOptions={false}
		on:setPage={(e) => (currentPage = e.detail.page)}
	/>
</div>

<div class="add-record-button-container">
	<button on:click={() => (showModal = true)} class="add-record-button view-buttons"
		>Add record</button
	>
</div>

<style>
	ul.li-tags {
		list-style: none;
		margin: 0;
		padding-left: 10px;
	}
	.li-tags > li {
		display: inline-block;
		background-color: #b7b6b6;
		color: #333;
		border-radius: 20px;
		padding: 5px 10px;
		margin-right: 5px;
		margin-bottom: 5px;
	}
	.refresh-button {
		order: 10;
		width: 7em;
		text-align: center;
	}
	.website-record-list {
		list-style-type: none;
		padding: 10px;
		width: 90%;
		margin-left: auto;
		margin-right: auto;	

	}
	.website-record-li {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		padding: 10px;
		margin: 5px;
		border-style: solid;
		border-width: medium;
		border-color: black;
		border-radius: 10px;
		
	}
	.fields-container {
		order: 0;
		flex-grow: 2;
	}
	.record-buttons-container {
		order: 1;
		flex-grow: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 25px;

		margin-left: 10px;
	}

	.li-fields {
		border-style: solid;
		border-width: thin;
		border-color: black;
		border-radius: 5px;
		padding: 5px;
		margin: 2px 2px 2px 2px;
	}
	.pagination-div {
		position: fixed;
		z-index: 100;
		bottom: 5px;
		left: 50%;
		transform: translateX(-50%);
		background-color: beige;
	}
	.pagination-div :global(.option) {
		background-color: beige;
		border: solid black thin;
	}
	.search-bar {
		display: flex;
		flex-direction: row;
		position: fixed;
		z-index: 100;
		width: 90%;
		top: 0;
		border: solid medium black;
		border-radius: 5px;
		padding: 10px;
		margin: 0px 10px 5px 10px;
		background-color: beige;
		left: 50%;
		transform: translateX(-50%);
	}
	.add-record-button-container {
		border: thick solid;
		border-color: rgba(0, 0, 0, 0.1);
		border-radius: 5px;
		padding: 0;
		position: fixed;
		z-index: 100;
		bottom: 5px;
		right: 5px;
	}
	:global(.view-buttons) {
		border: solid medium black;
		border-radius: 5px;
		padding: 10px;
		background-color: beige;
		font-size: medium;
		font-weight: bold;
	}
	:global(.view-buttons:hover) {
		background-color: bisque;
	}

	body {
		margin-top: 5%;
		margin-bottom: 5%;
	}

	.no-results-wrapper {
		position: absolute;
		top: 50%;
		width: 100%;
	}

	.loading-spinner {
		position: relative;
		display: block;
		min-height: 20px;
	}

	.loading-spinner::before {
		content: '';
		box-sizing: border-box;
		position: absolute;
		top: 50%;
		left: 50%;
		width: 20px;
		height: 20px;
		margin-top: -10px;
		margin-left: -10px;
		border-radius: 50%;
		border: 3px solid #888484;
		border-top-color: #333;
		animation: spinner 1s linear infinite;
	}
	@keyframes spinner {
		to {
			transform: rotate(360deg);
		}
	}
</style>
