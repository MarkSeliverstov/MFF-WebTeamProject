<script lang="ts">
	import type { WebsiteRecord , Periodicity} from "$lib/types";
	import Tags from "./Tags.svelte";    
	import { object, string, number, boolean, ValidationError } from 'yup';

	export let showModal : boolean;

	// null value means that the modal has been passed no website record to edit,
	// therefore it is supposed to create one and vice versa
	export let websiteRecord : WebsiteRecord | null = null;	

	
	let errors = {} as any; // validation errors
	
	// errors object gets populated by the function below ran on scheme validation   
	const extractErrors = (err : any)  => {
		return err.inner.reduce((acc : any, err : any) => {
			return {...acc, [err.path]: err.message};
		}, {});
	};

    let dialog : HTMLDialogElement;

	// this array is bound to tags component
	let tags : string[] = [];

	// yup schema for validating input
	const recordSchema = object({
		url: string().required().url(),
		label: string().required().min(3).max(50),
		periodicity: object({
			minutes: number().default(0).min(0).max(59).label("Minutes"),
			hours: number().default(0).min(0).max(23).label("Hours"),
			days: number().default(0).min(0).max(20).label("Days"),
		}).test(
			'Non-zero period', 
			"The period must be non-zero",
			(value) => {
			if (value != null) {
				return value.days + value.hours + value.minutes != 0;
			}
			else {
				return false;
			}
		}, ),
		regexp: string().defined().nonNullable().test(
			"Empty or valid regex",
			"This field must be empty or a valid regex",
			(value) => {
				if (value === "") {
					return true;
				}
				
				let isValid = true;
				try {
					new RegExp(value);
				}
				catch {
					isValid = false;
				}
				return isValid;
			},
		),
		active: boolean().default(false)
	});	

	// object that is bound to the inputs
	let recordData = {
		url: "",
		label: "",
		periodicity: {
			minutes: 0,
			hours: 0,
			days: 0,
		} as Periodicity,	
		regexp: "",
		active: false,
		tags : [] as string[],
		latestGroupId : 0,
	};

	$: if (dialog && showModal) dialog.showModal();
	
	// if this is an edit modal, populate the local record object 
	// with fields from the record to edit 
	if (websiteRecord != null) {
		recordData["tags"] = websiteRecord.tags;

		recordData["url"] = websiteRecord.url;
		recordData["label"] = websiteRecord.label;

		if (websiteRecord.periodicity != null) {
			recordData["periodicity"] = {
				minutes: websiteRecord.periodicity.minutes,
				hours: websiteRecord.periodicity.hours,
				days: websiteRecord.periodicity.days,
			}			
		}

		recordData["active"] = websiteRecord.active;
		recordData["regexp"] = websiteRecord.regexp;
		recordData["latestGroupId"] = websiteRecord.latestGroupId;
		tags = websiteRecord.tags;
	}	

	function submitRecord() {
		try {
			recordSchema.validateSync(recordData, { abortEarly: false});
		}
		catch (e) {
			// abort submitting if any errors in form input were found
			if (e instanceof ValidationError) {
				errors = extractErrors(e);				
				return;
			}
		}

		recordData["tags"] = tags;

		const stringifiedRecord = JSON.stringify(recordData);			

		
		if (websiteRecord === null) {
			fetch("/api/record/", {
				method: "POST",
				headers: {"Content-Type": "application/json",
				},
				body: stringifiedRecord
			})
			.then(() => dialog.close())
			.catch((error) => window.alert(error));			
		}
		else {
			fetch("/api/record/" + websiteRecord.id, {
				method: "PUT",
				headers: {"Content-Type": "application/json",
				},
				body: stringifiedRecord
			})
			.then(() => dialog.close())
			.catch((error) => window.alert(error));
		}
		

	}
	
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
>

	<div 		
		on:click|stopPropagation		
		class="div-form"
	>	
		{#if (errors.length)}
			<span class="validation-alert">Errors found</span>		
		{/if}
		<label for="label" class="label-label">
			Label: 
			{#if (errors.label)}
				<span class="validation-alert">{errors.label}</span>			
			{/if}
		</label>
		<input required type="text" name="label" class="label-input" bind:value={recordData["label"]}
		placeholder="Insert label here (required, 3-50 characters)">

		<label for="url" class="url-label">
			URL:
			{#if (errors.url)}
				<span class="validation-alert">{errors.url}</span>
			{/if}
			</label>
		<input required type="text" name="url" class="url-input" bind:value={recordData["url"]}
		placeholder="Insert url here (required, 3-50 characters)">

		<div class="periodicity-inputs-container">

			<p>
				Periodicity:
				{#if (errors.periodicity)}
					<span class="validation-alert">{errors.periodicity}</span>
				{/if}
			</p>
			
			<label class="days-label" for="days">				
				<input  type="number" name="days" class="periodicity-input" 
				placeholder="Days (0-20)" bind:value={recordData["periodicity"]["days"]}>
				<span>days</span>
				{#if (errors["periodicity.days"])}
					<span class="validation-alert">{errors["periodicity.days"]}</span>
				{/if}
			</label>

			<label class="hours-label" for="hours">
				<input  type="number" name="hours" class="periodicity-input" 
				placeholder="Hours (0-23)" bind:value={recordData["periodicity"]["hours"]}>
				<span>hours</span>
				{#if (errors["periodicity.hours"])}
					<span class="validation-alert">{errors["periodicity.hours"]}</span>
				{/if}
			</label>

			<label class="minutes-label" for="minutes">
				<input  type="number" name="minutes" class="periodicity-input" 
				placeholder="Minutes (0-59)" bind:value={recordData["periodicity"]["minutes"]}>
				<span>minutes</span>
				{#if (errors["periodicity.minutes"])}
					<span class="validation-alert">{errors["periodicity.minutes"]}</span>
				{/if}
			</label>
		</div>			
		
		<label for="regexp" class="regex-label">
			Regex: 
			{#if (errors.regexp)}		
				<span class="validation-alert">{errors.regexp}</span>
			{/if}
		</label>
		<input required type="text" name="regexp" class="regex-input"
		placeholder="Insert regular expression here (0-30 characters)"
		bind:value={recordData["regexp"]}>		

		<label for="active" class="active-label">
			<input type="checkbox" name="active" class="active-input" bind:checked={recordData["active"]}>
			Active
		</label>
		
		<div class="tag-input-container">
			<Tags
				bind:tags={tags}							
			/>
		</div>
		
		<!-- TODO: Time+status of last execution goes here -->

		<button class="view-buttons" on:click={submitRecord}>
			{#if (websiteRecord === null)}
				Create
			{:else}
				Edit
			{/if}
		</button>
	</div>

	<div class="close-button-container"><button class="view-buttons close-button" on:click={() => dialog.close()}>X</button></div>
</dialog>

<style>		
	.active-label {
		display: block;
		position: relative;
		margin-bottom: 12px;
		cursor: pointer;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}
	:global(.validation-alert) {
		font-size: small;
		font-style: italic;
		color: red;
	}
	.periodicity-inputs-container {
		display: flex;
		flex-direction: column;
		gap: 5px;
	}

	.periodicity-inputs-container > label > span {
		margin-left: 5px;
	}

	.periodicity-input {
		width: 30%;
		display: inline-block;
        position: relative;
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 5px;
        box-shadow: 2px 2px 5px #00000033;
        font-size: 14px;		
	}
	input[type="text"] {
		display: inline-block;
        position: relative;
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 5px;
        box-shadow: 2px 2px 5px #00000033;
        font-size: 14px;		
	}
	.close-button {
		position:absolute;
		padding: 15px;
		top: 5px;
		right: 5px;
	}

	dialog {
		max-width: 30em;
		width: 60%;
		border-radius: 5px;
		border: solid medium black;
		padding: 0;
		background-color: blanchedalmond;
	}

	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	div.div-form {
		margin-top: 30px;
		padding: 1em;
		display: flex;
		flex-direction: column;
		gap: 10px;
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
</style>