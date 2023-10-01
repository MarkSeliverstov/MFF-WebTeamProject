<script lang="ts">
    import ViewModeButton from "$components/ViewModeButton.svelte";
    import WebsiteGraph from "$components//WebsiteGraph.svelte";
    import DomainGraph from "$components//DomainGraph.svelte";
	import LivePreviewButton from "./LivePreviewButton.svelte";
	import type { Execution } from '$lib/types';
    import { viewModeStore, websiteGraphData, domainGraphData, websiteNodes, websiteEdges, domainEdges, domainNodes} from '$lib/graphDataStore';
	import getNodesAndEdges from "$lib/getNodesAndEdges";
    export let showModal : boolean;
	export let rootExecutions : Execution[];
    let dialog : HTMLDialogElement;

	$: if (dialog && showModal) dialog.showModal();
	$: if (!showModal) dialog.close();

	getNodesAndEdges(rootExecutions);
	const mapWeb = new Map<
		string,
		{
			data: {
				id: string;
				status: string;
                root: boolean;
				title: string | undefined;
				crawlTimeStart: number | undefined;
				crawlTimeEnd: number | undefined;
				links: string[];
			};
		}
	>();
	const mapDomain = new Map<
		string,
		{
			data: {
				id: string;
                title: string;
				links: string[];
                root: boolean;
                successCount: number;
                failedCount: number;
                invalidCount: number;
                notCrawledCount: number;
			};
		}
	>();
	const set = new Set();
</script>



<dialog id="visualizationModalDialog"
	bind:this={dialog}
	on:close={() => {
		showModal = false;
		websiteEdges.update((array) => {
			array = [];
			return array;
		});
		domainEdges.update((set) => {
			set.clear();
			return set;
		});
		domainNodes.update((map) => {
			map.clear();
			return map;
		});
		websiteGraphData.update((object) => {
			object.nodes = [];
			object.edges = [];
			return object;
		});
		websiteNodes.update((map) => {
			map.clear();
			return map;
		});
		$domainGraphData = {
			nodes: [],
			edges: []
		}
}}>

	<nav>
		<div id="closeButtonContainer"><button class="view-buttons close-button" on:click={() => dialog.close()}>X</button></div>

		<div id="viewModeButtonContainer">
		<ViewModeButton />
		</div>

		<LivePreviewButton />

		<h2>
			Visualization
		</h2>
	</nav>

	{#if $viewModeStore}
	<WebsiteGraph />
	{:else}
	<DomainGraph />
	{/if}

</dialog>

<style>
	h2 {
		font-size: medium;
		text-align: center;
		margin-top: 10px;
	}	
	
	.close-button {
		position: absolute;
		padding: 10px 30px 10px 30px;
		right: 5px;
	}
		dialog {
		display:flex;
		flex-direction: column;
		width: 100vw;
		height: 100vh;
		border-radius: 5px;
		border: solid medium black;
		padding: 0;
		background-color: white;
	}

	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
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
		display:flex;
		flex-direction: row;
		padding: 5px;
		margin-top: 0%;
		background-color: beige;
		position: sticky;
		top: 0;	
		order: 0;
	}
	#viewModeButtonContainer {
		flex-grow: 1;
		order: 1;
	}

	nav h2 {
		flex-grow: 1;
		order: 2;
	}

	#closeButtonContainer {
		flex-grow: 1;
		order: 3;
	}

	:global(#cytoscape) {
		width: 100%;	
		height: 100%;
		order: 1;
		flex-grow: 5;
	}

	
</style>
