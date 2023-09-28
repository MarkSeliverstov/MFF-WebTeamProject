import { websiteGraphData, domainGraphData } from "./graphDataStore";
import type { Execution } from '$lib/types'

export default function getNodesAndEdges(executions: Execution[]) {
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
		const domain = matches && matches[1];	
		const uniqueLinks = new Set<string>();
		
		if (domainNodes.has(domain)) {
			switch (sourceNode.status) {
				case "success" :
					domainNodes.get(domain)!.data.successCount++;
                    break;
				case "failed":
					domainNodes.get(domain)!.data.failedCount++;
                    break;
				case "running":
					domainNodes.get(domain)!.data.successCount++;
                    break;
				case "queued":
					domainNodes.get(domain)!.data.notCrawledCount++;
                    break;
				case "notValid":
					domainNodes.get(domain)!.data.invalidCount++;
                    break;
			}
		}

		sourceNode.links.forEach((targetUrl) => {

			matches = targetUrl.match(/^https?\:\/\/([^\/:?#]+)(?:[\/:?#]|$)/i)!;			
			const targetDomain = matches && matches[1];
			
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
	websiteGraphData.set({ nodes: Array.from(websiteNodes.values()), edges: websiteEdges });
	domainGraphData.set({ nodes: Array.from(domainNodes.values()), edges: Array.from(domainEdges) });
}