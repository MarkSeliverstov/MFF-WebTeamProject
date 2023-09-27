<script lang="ts">
	export let searchTerm : String;
    export let placeholder : string;
    export let searchMethods : string[];
    export let sortBy : string = "URL";    
</script>


<div id="search-input-cont">
	<input type="text" 
        id="search-field" 
        disabled={!searchMethods.length}
        placeholder={placeholder}
        autocomplete="off"
        bind:value={searchTerm}
        on:input 
    />   
    
    <div class="filter-label-container">             
        <label class="filter-label"><input type="checkbox" bind:group={searchMethods} value="URL"/>URL</label>
        <label class="filter-label"><input type="checkbox" bind:group={searchMethods} value="Label"/>Label</label>
        <label class="filter-label"><input type="checkbox" bind:group={searchMethods} value="Tags"/>Tags</label>
    </div>

    <div class="sort-by-container">
        <label for="sort-by" class="sort-by-label"><b>Sort by:</b></label>
        <select name="sort-by" class="sort-by" id="sort-by" bind:value={sortBy}>
            <option value="URL">URL</option>
            <option value="LastCrawl">Crawl date</option>
        </select>
    </div>
</div> 

<style>
    #search-input-cont {
		width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
	}

	#search-field {

        order: 0;
        flex-grow: 2;
		font-size: 1.3rem;
		border: medium solid black;
		border-radius: 5px;
		padding: 8px;
		margin: 0 10px 0;
	}

    .filter-label {
        margin: 2px;
        padding: 2px;
    }

    .filter-label-container {
        order: 1;
        flex-grow: 1;
        position: relative;
    }
 
    .sort-by-container {
        margin-top: 0;
        padding-top: 0;
        height: 100%;
        order: 2;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
    }

    .sort-by {
        height: 100%;
        width: 70%;
    }
   
</style>