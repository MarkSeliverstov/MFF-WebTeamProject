import ExecutionModel from '$db/models/ExecutionModel';
import { json, error } from '@sveltejs/kit';

export async function DELETE({ params }) {
	const executionModel = new ExecutionModel();
	const result = await executionModel.deleteAllByOwnerId(params.id);

	if (!result) {
		throw error(404, 'No executions with this Website Record ID found');
	}

	return json({
		success: result
	});
}
