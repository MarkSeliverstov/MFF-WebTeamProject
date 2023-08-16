<body>
	<div id="cytoscape" />
</body>

<style>
	#cytoscape {
		width:1080px;
		height: 1080px;
	}
</style>

<script lang="ts">
	import cytoscape from 'cytoscape';
    import popper from 'cytoscape-popper';
    import { graphData } from '../graphDataStore';
	import { onMount } from 'svelte';

	let isMounted = false;
    cytoscape.use( popper );
    
	onMount(() => {
        isMounted = true;
        
        // check if the graph data is available
		if ($graphData.nodes.length && $graphData.edges.length) {
			var cy = cytoscape({
                container: document.getElementById('cytoscape')
			});

            cy.add({
                nodes: $graphData.nodes,
                edges: $graphData.edges
            });

            cy.style()
            .selector('node')
            .style({
                'background-color': node => getColorForStatus(node.data('status')),
                'label': 'data(id)'
            })
            .selector('edge')
            .style({
                'line-color': 'gray',
                "target-arrow-color": 'gray',
                'target-arrow-shape': 'triangle'
            })
            .update();

            cy.on('click', 'node', event => {
                let node = event.target;
                let popper = node.popper({
                    content: () => {
                        let div = document.createElement('div');
                        div.innerHTML = 'mockup node text';
                        document.body.appendChild( div );
                        
                        return div;
                    }
                });

                let update = () => {
                    popper.update();
                };

                node.on('position', update);
                cy.on('pan zoom resize', update);       
                //console.log('clicked', event.target.data().url);
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
            })          
            

            layout.run();
		}
	});

    function getColorForStatus(status: string) {
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
