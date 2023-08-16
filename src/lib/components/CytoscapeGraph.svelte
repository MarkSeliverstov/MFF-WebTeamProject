<script lang="ts">
	import cytoscape from 'cytoscape';
	import fcose from 'cytoscape-fcose';
	import { graphData } from '$lib/graphDataStore';
	import { onMount } from 'svelte';
	import NodeDetail from './nodeDetail.svelte';

	let isMounted = false;	
	onMount(() => {
		isMounted = true;

		cytoscape.use(fcose);
		// check if the graph data is available
		if ($graphData.nodes.length && $graphData.edges.length) {
			var cy = cytoscape({
				container: document.getElementById('cytoscape')
			});

			cy.add({
				nodes: $graphData.nodes,
				edges: $graphData.edges
			});

			cy.minZoom(0.2);
			cy.maxZoom(1.2);

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
					"border-color": "black",
					'border-width': '10px',
					"font-weight": 'bold',
					'font-size': 20,
					'text-transform': 'uppercase' ,
					'text-background-color': 'white',
					'text-background-opacity': 1,
					'text-background-shape': 'roundrectangle',
					'text-border-opacity': 1,
					'text-border-color': 'black',
					'text-border-width': 5,
					'text-background-padding': '5px',
					'z-index': 5,
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

			cy.on('dblclick', 'node', (event) => showNodeDetail(event, cy));

			/*
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
				}
			});
			*/

			var layout = cy.layout({
				name: 'fcose',
				quality: "proof",
				randomize: false,
				animate: false,
				nodeDimensionsIncludeLabels: true,
				nodeRepulsion: node => 50000000,
				idealEdgeLength: edge => 512,
				edgeElasticity: edge => 256
			});

			layout.run();
		}
	});

	function showNodeDetail(event: cytoscape.EventObject, cy: cytoscape.Core) {
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
		const target = document.getElementById('cytoscape')!;
		const tooltip = new NodeDetail({
			target: target,
			props: {
				node: node,
				onClose: () => nodeDetailOnClose(cy, event.target)
			}
		});
	}	

	// function passed to the button on node detail; used to close it
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
	}

	function getColorForStatus(status: string): string {
		switch (status) {
			case 'notYetCrawled':
				return 'gray';
			case 'success':
				return 'green';
			case 'notValidUrl':
				return 'orange';
			case 'failed':
				return 'red';
			default:
				return 'gray';
		}
	}
</script>

<body>
	<div id="cytoscape" />
</body>

<style>
	#cytoscape {
		width: 100vw;
		height: 100vh;
	}
</style>
