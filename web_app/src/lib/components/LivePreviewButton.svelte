<script lang="ts">
	// TRUE FOR LIVE PREVIEW; FALSE FOR STATIC
	import { livePreview } from '$lib/graphDataStore';
	import { onMount } from 'svelte';
	onMount(() => {
		livePreview.set(false);
	});
</script>

<button id="viewModeButton" on:click={() => livePreview.update((mode) => !mode)}>
	{#if $livePreview}
		Live preview
	{:else}
		Static
	{/if}
</button>

<style>
	#viewModeButton {
        width: 10vw;		
		border: solid medium black;
		border-radius: 5px;
		padding: 10px;
		background-color: beige;
		font-size: medium;
		font-weight: bold;
	}
	#viewModeButton:hover {
		background-color: bisque;
	}	
</style>