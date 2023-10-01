<script lang="ts">
	import type { Execution, WebsiteRecord } from "$lib/types";
    import { paginate, LightPaginationNav } from 'svelte-paginate'; 
    import NoResults from '$components/NoResults.svelte';

	export let showModal : boolean;
    export let executions : Execution[] = [];
	export let record : WebsiteRecord | null = null;
	

    let dialog : HTMLDialogElement;

    let paginatedItems: any;
    let currentPage = 1;
    let pageSize = 10;

	
	if (executions.length) {	
		
		
		// sort executions by crawl end date in descending order
		executions.sort((a, b) => {
			if (!(a instanceof Date)) {return 1}

			if (!(b instanceof Date)) {return -1}

		   return ((b.crawlTimeEnd as Date).getTime() - (a.crawlTimeEnd as Date).getTime());
		})
	}

	$: if (dialog && showModal) dialog.showModal();
	
    $: paginatedItems = paginate({ items: executions, pageSize, currentPage });	
	
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
>   
	<nav>
		<div class="close-button-container"><button class="view-buttons close-button" on:click={() => dialog.close()}>X</button></div>

		<h2>
			{#if (record != null)}
				Executions that belong to record {record.label}:
			{:else}
				All executions
			{/if}
		</h2>
	</nav>
	<div 		
		on:click|stopPropagation		
		class="ul-container"
	>	
		{#if (executions.length)}
            <ul class="execution-list">
                {#each paginatedItems as execution}
                    <li class="execution-li">
						<div class="fields-container">
							{#if (execution.label)}
								<h3>{execution.label}</h3>
							{/if}

							<p class="li-fields li-url"><b>URL:</b> {execution.url}</p>
							<p class="li-fields li-status"><b>Status:</b> {execution.status}</p>
							{#if (execution.status != "running")}
								<p class="li-fields li-end-date"><b>Crawl end:</b> {new Date(execution.crawlTimeEnd).toLocaleString("en-GB")}</p>
							{/if}
							<p class="li-fields li-start-date"><b>Crawl start:</b> {new Date(execution.crawlTimeStart).toLocaleString("en-GB")}</p>
							<p class="li-fields li-sites-crawled"><b>Sites crawled:</b> {execution.sitesCrawled}</p>
						</div>
                    </li>
                {/each}
            </ul>
        {:else}
            <NoResults />
        {/if}
	</div>

	<div class="pagination-div">
		 <LightPaginationNav
		 	totalItems={executions.length}
			{pageSize}
			{currentPage}
			limit={1}
			showStepOptions={false}
			on:setPage={(e) => (currentPage = e.detail.page)}
		/>
	</div>

</dialog>

<style>
	.fields-container {
		order: 0;
		flex-grow: 2;
	}
	ul {
		list-style-type: none;
		padding-left: 0%;

	}
	.li-fields {
		border-style: solid;
		border-width: thin;
		border-color: black;
		border-radius: 5px;
		padding: 5px;
		margin: 2px 2px 2px 2px;
	}
	.execution-li {
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

	h2 {
		text-align: center;
		margin-top: 10px;
	}		
	.pagination-div {
		position: sticky;
		bottom: 0;
		z-index: 100;		
		background-color: beige;
	}

	.pagination-div :global(.option) {
		background-color: beige;
		border: solid black thin;
	}
	
	:global(.validation-alert) {
		font-size: small;
		font-style: italic;
		color: red;
	}
	
	.close-button {
		position: absolute;
		padding: 15px;
		right: 5px;
	}

	dialog {
		max-width: 50em;
		width: 60%;
		border-radius: 5px;
		border: solid medium black;
		padding: 0;
		background-color: white;
	}

	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	div.ul-container {
		padding: 1em;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	button {
		display: block;
	}

	nav {
		padding: 5px;
		margin-top: 0%;
		background-color: beige;
		position: sticky;
		top: 0;	
	}
</style>