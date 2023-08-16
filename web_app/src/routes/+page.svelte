<Graph />

<script lang="ts">
    import Graph from '$components/CytoscapeGraph.svelte';
    import {graphData} from '../lib/graphDataStore';
	import type { CrawledWebPage } from '../lib/types';
    	
    // process data for further usage
    import dataJSON from '../lib/result.json';
	const nodesJSON: CrawledWebPage[] = dataJSON as CrawledWebPage[];
    const nodes: {data: {id: string, status: string, title: string | undefined, crawlTimeStart: number | undefined, crawlTimeEnd: number | undefined}}[] = [];
	const edges: {data: {source: string, target: string}}[] = [];
    
	// create links (edges) between nodes representing the crawling results
	nodesJSON.forEach((sourceNode) => {
        const node = {
            data: {
            id: sourceNode.url,
            status: sourceNode.status,
            title: sourceNode.title,
            crawlTimeStart: sourceNode.crawlTimeStart,
            crawlTimeEnd: sourceNode.crawlTimeEnd
            }
        };

        nodes.push(node);

		sourceNode.links.forEach((targetUrl) => {
            const edge = {
                data: {
                    source: sourceNode.url,
                    target: targetUrl
                }
            };			
            edges.push(edge);        
		});

	});

    $: graphData.set({nodes, edges});
</script>
