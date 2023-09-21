import ExecutionModel from '$db/models/ExecutionModel';
import { isError, type Execution } from '$lib/types';
import { json, error } from '@sveltejs/kit';

export async function POST({ request }) {
	const executionModel = new ExecutionModel();
	let execution;
	try {
		execution = await request.json();
	} catch (error) {
		execution = null;
	}

	if (!execution) {
		throw error(400, 'Invalid JSON');
	}
	
	const createdId = await executionModel.create(execution as Execution);

	if (isError(createdId)) {
		throw error(createdId.code, createdId.message);
	}

	return json(createdId);
}
