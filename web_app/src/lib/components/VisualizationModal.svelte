<script lang="ts">
    import ViewModeButton from "$components/ViewModeButton.svelte";
    import WebsiteGraph from "$components//WebsiteGraph.svelte";
    import DomainGraph from "$components//DomainGraph.svelte";
	import type { Execution } from '$lib/types';
    import { domainGraphData, websiteGraphData, viewModeStore } from '$lib/graphDataStore';
    export let showModal : boolean;
	export let executions: Execution[];
    let dialog : HTMLDialogElement;

	$: if (dialog && showModal) dialog.showModal();
	$: if (!showModal) dialog.close();

	const websiteNodes = new Map<string,{
		data: {
			id: string;
			status: string;
			title: string | undefined;
			crawlTimeStart: number | undefined;
			crawlTimeEnd: number | undefined;
			links: string[];
			root: boolean;
		};
	}>();

	const websiteEdges: {
		data: {
			source: string;
			target: string;
		};
	}[] = [];

	// sets instead of arrays to gain performance - converting crawler data
	// for domain view will inevitably generate many domain nodes with duplicit id's
	const domainNodes = new Map<string, {
		data: {
			id: string;
			links: string[];
			root: boolean;
			successCount: number;
			failedCount: number;
			invalidCount: number;
			notCrawledCount: number;
		};
	}>();

	const domainEdges: Set<{
		data: {
			source: string;
			target: string;
		};
	}> = new Set();
	// create links (edges) between nodes representing the crawling results
	executions.forEach((sourceNode) => {
		const websiteNode = {
			data: {
				id: sourceNode.url,
				status: sourceNode.status,
				title: sourceNode.title,
				crawlTimeStart: sourceNode.crawlTimeStart,
				crawlTimeEnd: sourceNode.crawlTimeEnd,
				links: sourceNode.links,
				root: sourceNode.root,
			}
		};

		websiteNodes.set(sourceNode.url, websiteNode);

		let matches = sourceNode.url.match(/^https?\:\/\/([^\/:?#]+)(?:[\/:?#]|$)/i)!;
		let domain = matches && matches[1];	
		let uniqueLinks = new Set<string>();
		
		if (domainNodes.has(domain)) {
			switch (sourceNode.status) {
				case "success" :
					domainNodes.get(domain)!.data.successCount++;
				case "failed":
					domainNodes.get(domain)!.data.failedCount++;
				case "running":
					domainNodes.get(domain)!.data.successCount++;
				case "queued":
					domainNodes.get(domain)!.data.notCrawledCount++;
				case "notValid":
					domainNodes.get(domain)!.data.invalidCount++;
			}
		}

		sourceNode.links.forEach((targetUrl) => {

			matches = targetUrl.match(/^https?\:\/\/([^\/:?#]+)(?:[\/:?#]|$)/i)!;			
			let targetDomain = matches && matches[1];
			
			const websiteEdge = {
				data: {
					source: sourceNode.url,
					target: targetUrl
				}
			};
			websiteEdges.push(websiteEdge);		
			

			// this check is necessary because the domain of the source node occured to be undefined multiple times
			if (targetDomain != undefined && targetDomain != null) {
				uniqueLinks.add(targetDomain);
				const domainEdge = {
					data: {
						source: domain,
						target: targetDomain,
					}
				};
				domainEdges.add(domainEdge);
				
				// nodes that are created not by the crawler but to serve as target nodes for edges
				if (!domainNodes.has(targetDomain)) {
					domainNodes.set(targetDomain, {
						data: {
							id: targetDomain,
							links: [],
							root: false,
							successCount: 0,
							failedCount: 0,
							invalidCount: 0,
							notCrawledCount: 1,
						}
					})
				}				
			}			
			
			// create nodes for links that were not yet crawled
			if (!websiteNodes.has(targetUrl)) {
				websiteNodes.set(targetUrl, {
					data: {
						id: targetUrl,
						title: "",
						root: false,
						status: 'notYetCrawled',
						crawlTimeStart: undefined,
						crawlTimeEnd: undefined,
						links: [],
					}
				})
			}
			if (!domainNodes.has(domain)) {
				const domainNode = {
							data: {
								id: domain,
								links: Array.from(uniqueLinks),
								root: sourceNode.root,
								successCount: 0,
								failedCount: 0,
								invalidCount: 0,
								notCrawledCount: 0,
							}
						}				
				
				domainNodes.set(domain, domainNode);
			}
			else {
				if (sourceNode.root) {domainNodes.get(domain)!.data.root = sourceNode.root;}
				domainNodes.get(domain)!.data.links = Array.from(uniqueLinks);
			}
		});


	});
	$: websiteGraphData.set({ nodes: Array.from(websiteNodes.values()), edges: websiteEdges });
	$: domainGraphData.set({ nodes: Array.from(domainNodes.values()), edges: Array.from(domainEdges) });

</script>



<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}>

	<nav>
		<div id="closeButtonContainer"><button class="view-buttons close-button" on:click={() => dialog.close()}>X</button></div>

		<div id="viewModeButtonContainer">
		<ViewModeButton />
		</div>
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
