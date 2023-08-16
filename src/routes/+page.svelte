<script lang="ts">
	import Graph from '$components/CytoscapeGraph.svelte';
	import ViewModeButton from '$components/ViewModeButton.svelte';
	import { domainGraphData, websiteGraphData } from '$lib/graphDataStore';
	import type { CrawledWebPage } from '../types';

	// process data for further usage
	import dataJSON from '../lib/result.json';
	const nodesJSON: CrawledWebPage[] = dataJSON as CrawledWebPage[];

	const websiteNodes: {
		data: {
			id: string;
			status: string;
			title: string | undefined;
			crawlTimeStart: number | undefined;
			crawlTimeEnd: number | undefined;
			links: string[];
		};
	}[] = [];

	const websiteEdges: {
		data: {
			source: string;
			target: string;
		};
	}[] = [];

	// sets instead of arrays to gain performance - converting crawler data
	// for domain view will inevitably generate many domain nodes with duplicit id's
	const domainNodes: Set<{
		data: {
			id: string;
			links: string[];
		};
	}> = new Set();

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

		websiteNodes.push(websiteNode);

		let matches = sourceNode.url.match(/^https?\:\/\/([^\/:?#]+)(?:[\/:?#]|$)/i)!;
		let domain = matches && matches[1];

		const domainNode = {
			data: {
				id: domain,
				links: [] as any[]
			}
		};

		sourceNode.links.forEach((targetUrl) => {
			matches = targetUrl.match(/^https?\:\/\/([^\/:?#]+)(?:[\/:?#]|$)/i)!;
			let targetDomain = matches && matches[1];
			domainNode.data.links.push(targetDomain);
			const websiteEdge = {
				data: {
					source: sourceNode.url,
					target: targetUrl
				}
			};
			websiteEdges.push(websiteEdge);

			const domainEdge = {
				data: {
					source: domain,
					target: targetDomain
				}
			};
			domainEdges.add(domainEdge);
		});

		domainNodes.add(domainNode);
	});
	$: websiteGraphData.set({ nodes: websiteNodes, edges: websiteEdges });
	$: domainGraphData.set({ nodes: Array.from(domainNodes), edges: Array.from(domainEdges) });
</script>

<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<ViewModeButton />
<Graph />
