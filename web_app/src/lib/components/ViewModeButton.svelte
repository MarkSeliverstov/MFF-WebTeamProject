<script lang="ts">
	// TRUE FOR WEBSITE VIEW; FALSE FOR DOMAIN VIEW
	import { viewModeStore } from '$lib/graphDataStore';
	import { onMount } from 'svelte';
	onMount(() => {
		viewModeStore.set(true);
	});
</script>

<button id="viewModeButton" on:click={() => viewModeStore.update((mode) => !mode)}>
	{#if $viewModeStore}
		Website view
	{:else}
		Domain view
	{/if}
</button>

<style>
	#viewModeButton {
		
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