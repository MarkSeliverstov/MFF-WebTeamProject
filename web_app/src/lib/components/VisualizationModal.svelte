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

</script>



<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
>   
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
</style>