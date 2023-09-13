import ExecutionModel from '$db/models/ExecutionModel';
import type { Execution } from '$lib/types';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	const executionModel = new ExecutionModel();
	const execution = await request.json();
	const createdId = await executionModel.create(execution as Execution);

	return json(createdId);
}
