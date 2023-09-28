<script lang="ts">
	import type { Execution } from '$lib/types';
	import cytoscape from 'cytoscape';
	import { websiteGraphData, executionsStore } from '$lib/graphDataStore';
	import { onMount, onDestroy } from 'svelte';
	import NodeDetail from './NodeDetail.svelte';
	import getNodesAndEdges from '$lib/getNodesAndEdges';

	let cy: cytoscape.Core;

	function applyStylesAndLayout(cy : cytoscape.Core) {
		cy.style()
		.selector('node')
		.style({
			'background-color': (node) => getColorForStatus(node.data('status')),
			width: '35px',
			height: '35px',
			label: 'data(id)'
		})
		.selector('node.detailedView')
		.style({
			width: '90px',
			height: '90px',
			'border-color': 'black',
			'border-width': '10px',
			'font-weight': 'bold',
			'font-size': 20,
			'text-transform': 'uppercase',
			'text-background-color': 'white',
			'text-background-opacity': 1,
			'text-background-shape': 'roundrectangle',
			'text-border-opacity': 1,
			'text-border-color': 'black',
			'text-border-width': 5,
			'text-background-padding': '5px',
			'z-index': 5
		})
		.selector('node.root')
		.style({
			width: '75px',
			height: '75px',
			'border-color': 'black',
			'border-width': '5px',
			'font-weight': 'bold',
			'font-size': 20,
			'text-transform': 'uppercase',
			'text-background-color': 'beige',
			'text-background-opacity': 1,
			'text-background-shape': 'roundrectangle',
			'text-background-padding': '5px',
			'z-index': 5
		})
		.selector('edge')
		.style({
			'curve-style': 'haystack',
			'line-color': 'gray',
			'mid-target-arrow-color': 'black',
			'mid-target-arrow-shape': 'triangle',
			'arrow-scale': 1.5
		})
		.update();		

		cy.removeListener('click', 'node');
		cy.on('click', 'node', (event) => showNodeDetail(event, cy));
	}

	let updateInterval: NodeJS.Timer;
	onMount(() => {
		// check if the graph data is available
		if ($websiteGraphData.nodes.length && $websiteGraphData.edges.length) {
			cy = cytoscape({
				container: document.getElementById('cytoscape')
			});
			cy.minZoom(0.2);
			cy.maxZoom(1.2);
			
			cy.add({
				nodes: $websiteGraphData.nodes,
				edges: $websiteGraphData.edges
			});	

			cy.nodes().forEach((node) => {
				const root = node.data("root");
				if (root) {
					node.addClass('root');
				}				
			})
			var layout = cy.layout({
				name: 'cose',
				animate: false,
				nodeRepulsion(node) {
					return 50000000;
				},
				idealEdgeLength(edge) {
					return 512;
				},
				edgeElasticity(edge) {
					return 256;
				},
				avoidOverlap: true,
			});

			layout.on("layoutstop", () => {
						cy.nodes().forEach(node => {
							node.unlock();
						})
					})
			
			layout.run();

			applyStylesAndLayout(cy);
			
			let i = 0;
			const batch = 1;
			updateInterval = setInterval(() => {
				if (i < $executionsStore.length) {
					const endIndex = Math.min(i+batch, $executionsStore.length);
					getNodesAndEdges($executionsStore.slice(i, endIndex));

					cy.nodes().forEach(node => {
						node.lock();
					})

					cy.add({
					nodes: $websiteGraphData.nodes,
					edges: $websiteGraphData.edges
					});	
					layout.run();

				
					i += batch;
				}
			}, 2000);			
		}
	});
	onDestroy(() => {
		clearInterval(updateInterval);
	});

	let clicks = 0;
	function showNodeDetail(event: cytoscape.EventObject, cy: cytoscape.Core) {
		++clicks;
		if (clicks <= 1) {
			setTimeout(() => {
				clicks = 0;
			}, 250);
		} else if (clicks === 2) {
			clicks = 0;

			//set default style on previous selected node
			cy.nodes('.detailedView').removeClass('detailedView');
	
			//remove a previous node detail if it exists
			let previousTooltip = document.getElementById('nodeDetail');
			if (previousTooltip) {
				previousTooltip.parentElement?.removeChild(previousTooltip);
			}
	
			//animate graph centering on the clicked node
			cy.animate({
				center: {
					eles: event.target
				},
				zoom: 0.75
			});
	
			//add a style class to the clicked node
			event.target.addClass('detailedView');
	
			//create a new node detail
			const node = event.target.data();
			const target = document.getElementById('visualizationModalDialog')!;
			const tooltip = new NodeDetail({
				target: target,
				props: {
					node: node,
					onClose: () => nodeDetailOnClose(cy, event.target)
				}
			});
	
			//prevent input from affecting the graph underneath the node detail
			const detail = document.getElementById('nodeDetail')!;
	
			detail.addEventListener('mouseover', () => {
				cy.userPanningEnabled(false);
				cy.userZoomingEnabled(false);
			});
	
			detail.addEventListener('mouseout', () => {
				cy.userPanningEnabled(true);
				cy.userZoomingEnabled(true);
			});
		}
	}

	// function passed to the button on node detail; handles closing
	function nodeDetailOnClose(cy: cytoscape.Core, node: cytoscape.NodeSingular) {
		const tooltip = document.getElementById('nodeDetail');
		tooltip?.parentElement?.removeChild(tooltip);
		cy.animate({
			fit: {
				eles: cy.nodes(),
				padding: 0
			}
		});
		node.removeClass('detailedView');

		// without this, the user pan&zoom may stay disabled after closing the detail
		cy.userPanningEnabled(true);
		cy.userZoomingEnabled(true);
	}

	function getColorForStatus(status: string): string {
		switch (status) {
			case 'running':
				return 'blue';
			case 'success':
				return 'green';
			case 'notValid':
				return 'orange';
			case 'failed':
				return 'red';
			case 'queued':
				return 'purple'
			default:
				return 'gray';
		}
	}
	
</script>

<div id="cytoscape" />

<style>
	:global(#recordModalDialog) {
        z-index: 100000;
    }

	#cytoscape {
		z-index: 0;
	}
</style>
