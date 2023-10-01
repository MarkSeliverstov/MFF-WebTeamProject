<script lang="ts">
    import {ValidationError, object, string} from 'yup';

    let tagSchema = string().required().trim().lowercase().matches(RegExp(/^[a-z0-9]+$/i), "Tag can consist only of alphanum characters").label("tag");
    let error = ""

    export let tags : string[] = [];
        
    let currentTagInput : string;   
    let validationError : string;   
    let tagListEle : HTMLUListElement;

    // Add an event listener for keydown on the input element
    const inputFunc = (event : any) => {

        // Check if the key pressed is 'Enter'
        if (event.key === 'Enter') {            
          
            // Prevent the default action of the keypress
            // event (submitting the form)
            event.preventDefault();
          
            // If the trimmed value is not an empty string
            if (currentTagInput !== '') {
                try {
                    tagSchema.validateSync(currentTagInput);
                }
                catch (e) {
                    if (e instanceof ValidationError) {
                        error = e.message;
                    }
                    return
                }
                
                tags.push(currentTagInput)
                tags = tags; // hack to make svelte recognize change to the tags array
                
                // Clear the input element's value
                currentTagInput = '';
            }
        }
    };

    // Add an event listener for click on the tags list
    const tagFunc = (event : any) => {

        // If the clicked element has the class 'delete-button'
        if (event.target.classList.contains('delete-button')) {          
            // Remove the parent element (the tag)
            event.target.parentNode.remove();
        }
    };
</script>  

<div class="tags-input-container">    
    <label for="tags-input" class="tags-label">
        Tags:
        {#if (error.length)}
            <span class="validation-alert">{error}</span>
        {/if}
    </label>
    <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
    <ul bind:this={tagListEle} on:click={(event) => tagFunc(event)}>
        {#each tags as tag }
            <li>
                {tag}
                <button class="delete-button">X</button>
            </li>
        {/each}
    </ul>
    <input
        bind:value={currentTagInput}
        name="tags-input"
        type="text" 
        id="input-tag" 
        placeholder="Enter tag name (whitespaces not allowed, 3-20 characters per tag)"
        on:keydown={(event) => inputFunc(event)}
     />
</div>

<style>
    .tags-input-container {
        display: inline-block;
        position: relative;
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 5px;
        box-shadow: 2px 2px 5px #00000033;
        width: 100%;
    }

    .tags-input-container ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .tags-input-container li {
        display: inline-block;
        background-color: #f2f2f2;
        color: #333;
        border-radius: 20px;
        padding: 5px 10px;
        margin-right: 5px;
        margin-bottom: 5px;
    }

    .tags-input-container input[type="text"] {
        border: none;
        outline: none;
        padding: 5px;
        font-size: 14px;
        width: 90%;
    }

    .tags-input-container input[type="text"]:focus {
        outline: none;
    }

    .tags-input-container .delete-button {
        background-color: transparent;
        border: none;
        color: #999;
        cursor: pointer;
        margin-left: 5px;
    }
</style>