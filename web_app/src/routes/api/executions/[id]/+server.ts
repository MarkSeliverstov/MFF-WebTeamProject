import ExecutionModel from '$db/models/ExecutionModel';
import  { isError } from '$lib/types';
import { json, error } from '@sveltejs/kit';

export async function DELETE({ params }) {
	const executionModel = new ExecutionModel();
	const result = await executionModel.deleteAllByOwnerId(params.id);

	if (isError(result)) {
		throw error(result.code, result.message);
	}

	return json({
		success: result
	});
}
