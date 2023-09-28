<script lang='ts'>
    import type { WebsiteRecord, Periodicity } from '$lib/types';
    import RecordModal from "./RecordModal.svelte";
    export let node : any;
    export let onClose : any;
    let showModal = false;
    let newWebsiteRecord = {
        url: node.id,
        periodicity: {
			minutes: 0,
			hours: 0,
			days: 0,
        } as Periodicity,
        regexp: "",
        label: "",
        active: false,
        tags: [],
        latestGroupId: 0,
    } as WebsiteRecord;
</script>

<div id="nodeDetail">
    <button on:click={onClose} class="view-buttons">X</button>
    <h5>{node.id}</h5>
    {#if node.status}    
    <h5>Status: {node.status}</h5>
    {/if}
    {#if node.crawlTimeEnd && node.crawlTimeStart}
    <h5>Crawl time: {(node.crawlTimeEnd-node.crawlTimeStart).toString()} seconds</h5>
    {/if}   

    {#if node.links.length}
    <h5>Links:</h5>
    <ul>
        {#each node.links as link}
            <li>{link}</li>
        {/each}
    </ul>
    {/if}
    {#if node.status === 'notValid'} 
        <button on:click={() => showModal = true} class="view-buttons">Add record</button>
    {/if}
    {#if showModal}
        <RecordModal bind:showModal bind:websiteRecord={newWebsiteRecord} create={true} />
    {/if}
</div>

<style>
    
    #nodeDetail {
            position: fixed;
            z-index: 100;
            right: 0;
            top: 0;
            height: 100vh;
            width: 30vw;
            background-color: beige;
            border: medium solid black;
            padding: 10px;    
            border-radius: 5px;               
        }
    #nodeDetail ul {
        overflow: scroll;
        height: 50vh;
        border: thin solid black;
        border-radius: 5px;
        background-color: whitesmoke;
    }
    
    #nodeDetail li {
        margin-top: 10px;
        margin-bottom: 10px;

    }

    .view-buttons {
		border: solid medium black;
		border-radius: 5px;
		padding: 10px;
		background-color: beige;
		font-size: medium;
		font-weight: bold;
	}
    .view-buttons:hover {
        background-color: bisque;
	}
</style>