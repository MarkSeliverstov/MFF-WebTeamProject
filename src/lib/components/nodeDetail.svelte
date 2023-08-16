<script lang='ts'>
    export let node : any;
    export let onClose : any;
</script>

<div id="nodeDetail">
    <button on:click={onClose} id="nodeDetailClose">X</button>
    <h5>{node.id}</h5>    
    <h5>Status: {node.status}</h5>
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
</div>

<style>
    #nodeDetail {
            position: fixed;
            z-index: 100;
            right: 0;
            top: 0;
            height: 100vh;
            width: 20vw;
            background-color: white;
            border: 1px solid #ccc;
            padding: 10px;                   
        }
    #nodeDetail ul {
        overflow: scroll;
        height: 50vh;
    }    
</style>