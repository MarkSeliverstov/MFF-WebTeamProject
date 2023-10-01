<script lang="ts">
	import type { PageData } from './$types';
	import WebsiteGraph from '$components/WebsiteGraph.svelte';
	import DomainGraph from '$components/DomainGraph.svelte';
	import ViewModeButton from '$components/ViewModeButton.svelte';
	import { domainGraphData, websiteGraphData, viewModeStore } from '$lib/graphDataStore';
	import type { CrawledWebPage, Execution } from '$lib/types';

	export let data: PageData;
	// process data for further usage
	const nodesJSON: Execution[] = data.nodes as Execution[];

	const websiteNodes = new Map<string,{
		data: {
			id: string;
			status: string;
			title: string | undefined;
			crawlTimeStart: number | undefined;
			crawlTimeEnd: number | undefined;
			links: string[];
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
		};
	}>();

	const domainEdges: Set<{
		data: {
			source: string;
			target: string;
		};
	}> = new Set();

	// create links (edges) between nodes representing the crawling results
	nodesJSON.forEach((sourceNode) => {
		const websiteNode = {
			data: {
				id: sourceNode.url,
				status: sourceNode.status,
				title: sourceNode.title,
				crawlTimeStart: sourceNode.crawlTimeStart,
				crawlTimeEnd: sourceNode.crawlTimeEnd,
				links: sourceNode.links
			}
		};

		websiteNodes.set(sourceNode.url, websiteNode);

		let matches = sourceNode.url.match(/^https?\:\/\/([^\/:?#]+)(?:[\/:?#]|$)/i)!;
		let domain = matches && matches[1];	
		let uniqueLinks = new Set<string>();	

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
						target: targetDomain
					}
				};
				domainEdges.add(domainEdge);
				
				if (!domainNodes.has(targetDomain)) {
					domainNodes.set(targetDomain, {
						data: {
							id: targetDomain,
							links: []
						}
					})
				}
				const domainNode = {
					data: {
						id: domain,
						links: Array.from(uniqueLinks)
					}
				}
		
				domainNodes.set(domain, domainNode);
			}			
			
			// create nodes for links that were not yet crawled
			if (!websiteNodes.has(targetUrl)) {
				websiteNodes.set(targetUrl, {
					data: {
						id: targetUrl,
						title: "",
						status: 'notYetCrawled',
						crawlTimeStart: undefined,
						crawlTimeEnd: undefined,
						links: [],
					}
				})
			}
		});

	});
	$: websiteGraphData.set({ nodes: Array.from(websiteNodes.values()), edges: websiteEdges });
	$: domainGraphData.set({ nodes: Array.from(domainNodes.values()), edges: Array.from(domainEdges) });
</script>

<meta name="viewport" content="width=device-width, initial-scale=1.0" />

<div id="viewModeButtonContainer">
<ViewModeButton />
</div>

{#if $viewModeStore}
<WebsiteGraph />
{:else}
<DomainGraph />
{/if}

<style>
	:global(#cytoscape) {
		height: 100vh;
		width: 100vw;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 0;
	}

	#viewModeButtonContainer {
		position: fixed;
		top: 5px;
		left: 5px;
		z-index: 100;		
	}


</style>