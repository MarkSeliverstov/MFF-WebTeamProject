import {
	websiteGraphData,
	domainGraphData,
	websiteNodes,
	websiteEdges,
	domainNodes,
	domainEdges
} from '$lib/graphDataStore';
import type { Execution } from '$lib/types';

export default function getNodesAndEdges(executions: Execution[]) {
	// sets instead of arrays to gain performance - converting crawler data
	// for domain view will inevitably generate many domain nodes with duplicit id's
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
				root: sourceNode.root
			}
		};
		websiteNodes.update((lastMap) => {
			lastMap.set(sourceNode.url, websiteNode);
			return lastMap;
		});

		let matches = sourceNode.url.match(/^https?\:\/\/([^\/:?#]+)(?:[\/:?#]|$)/i)!;
		const domain = matches && matches[1];
		const uniqueLinks = new Set<string>();
		const unsubscribeDomainNodes = domainNodes.subscribe((map) => {
			if (map.has(domain)) {
				switch (sourceNode.status) {
					case 'success':
						map.get(domain)!.data.successCount++;

						break;
					case 'failed':
						map.get(domain)!.data.failedCount++;
						break;
					case 'running':
						map.get(domain)!.data.successCount++;
						break;
					case 'queued':
						map.get(domain)!.data.notCrawledCount++;
						break;
					case 'notValid':
						map.get(domain)!.data.invalidCount++;
						break;
				}
			}
		});
		unsubscribeDomainNodes();

		sourceNode.links.forEach((targetUrl) => {
			matches = targetUrl.match(/^https?\:\/\/([^\/:?#]+)(?:[\/:?#]|$)/i)!;
			const targetDomain = matches && matches[1];

			const websiteEdge = {
				data: {
					source: sourceNode.url,
					target: targetUrl
				}
			};
			websiteEdges.update((array) => {
				array.push(websiteEdge);
				return array;
			});

			// this check is necessary because the domain of the source node occured to be undefined multiple times
			if (targetDomain != undefined && targetDomain != null) {
				uniqueLinks.add(targetDomain);
				const domainEdge = {
					data: {
						source: domain,
						target: targetDomain
					}
				};
				domainEdges.update((set) => {
					set.add(domainEdge);
					return set;
				});

				// nodes that are created not by the crawler but to serve as target nodes for edges
				const unsubscribeDomainNodes = domainNodes.subscribe((map) => {
					if (!map.has(targetDomain)) {
						map.set(targetDomain, {
							data: {
								id: targetDomain,
								title: "",
								links: [],
								root: false,
								successCount: 0,
								failedCount: 0,
								invalidCount: 0,
								notCrawledCount: 1
							}
						});
					}
				});
				unsubscribeDomainNodes();
			}

			// create nodes for links that were not yet crawled
			const unsubscribeWebsiteNodes = websiteNodes.subscribe((map) => {
				if (!map.has(targetUrl)) {
					map.set(targetUrl, {
						data: {
							id: targetUrl,
							title: '',
							root: false,
							status: 'queued',
							crawlTimeStart: undefined,
							crawlTimeEnd: undefined,
							links: []
						}
					});
				}
			});
			unsubscribeWebsiteNodes();
			const unsubscribeDomainNodes = domainNodes.subscribe((map) => {
				if (!map.has(domain)) {
					const domainNode = {
						data: {
							id: domain,
							title: "",
							links: Array.from(uniqueLinks),
							root: sourceNode.root,
							successCount: 0,
							failedCount: 0,
							invalidCount: 0,
							notCrawledCount: 0
						}
					};

					map.set(domain, domainNode);
				} else {
					if (sourceNode.root) {
						map.get(domain)!.data.root = sourceNode.root;
					}
					map.get(domain)!.data.links = Array.from(uniqueLinks);
				}
			});
			unsubscribeDomainNodes();
		});
	});
	
	const unsubscribeWebsiteNodes = websiteNodes.subscribe((map) => {
		const unsubscribeWebsiteEdges = websiteEdges.subscribe((array) => {
			websiteGraphData.set({ nodes: Array.from(map.values()), edges: array });
		}
		);
		unsubscribeWebsiteEdges();
	}
	);
	unsubscribeWebsiteNodes();

	const unsubscribeDomainNodes = domainNodes.subscribe((mapNodes) => {
		const unsubscribeDomainEdges = domainEdges.subscribe((setEdges) => {
			domainGraphData.set({ nodes: Array.from(mapNodes.values()), edges: Array.from(setEdges) });
		}
		);
		unsubscribeDomainEdges();
	}
	);
	unsubscribeDomainNodes();
}
