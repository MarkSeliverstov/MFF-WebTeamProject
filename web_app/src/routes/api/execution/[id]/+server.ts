import ExecutionModel from '$db/models/ExecutionModel';
import type { Execution } from '$lib/types';
import { json, error } from '@sveltejs/kit';

export async function GET({ params }) {
	const executionModel = new ExecutionModel();
	const execution = await executionModel.getByID(params.id);

	if (!execution) {
		throw error(404, 'No execution with this ID found');
	}

	return json({
		executionId: execution.executionId?.toString(),
		websiteRecordId: execution.websiteRecordId.toString(),
		crawlTimeStart: execution.crawlTimeStart,
		crawlTimeEnd: execution.crawlTimeEnd,
		status: execution.status,
		sitesCrawled: execution.sitesCrawled
	});
}

export async function PUT({ params, request }) {
	const executionModel = new ExecutionModel();
	const execution = await request.json();
	const updatedExecution = await executionModel.update(params.id, execution as Execution);

	if (!updatedExecution) {
		throw error(404, 'No execution with this ID found');
	}

	return json({
		executionId: execution.executionId?.toString(),
		websiteRecordId: execution.websiteRecordId.toString(),
		crawlTimeStart: execution.crawlTimeStart,
		crawlTimeEnd: execution.crawlTimeEnd,
		status: execution.status,
		sitesCrawled: execution.sitesCrawled
	});
}

export async function DELETE({ params }) {
	const executionModel = new ExecutionModel();
	const result = await executionModel.delete(params.id);

	if (!result) {
		throw error(404, 'No execution with this ID found');
	}

	return json({
		success: result
	});
}
