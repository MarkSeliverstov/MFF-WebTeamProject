import ExecutionModel from '$db/models/ExecutionModel';
import  { isError, type Execution } from '$lib/types';
import { json, error } from '@sveltejs/kit';

export async function GET({ params }) {
	const executionModel = new ExecutionModel();
	const execution = await executionModel.getByID(params.id);

	if (isError(execution)) {
		throw error(execution.code, execution.message);
	}

	return json({
		id: execution.id?.toString(),
		ownerId: execution.ownerId.toString(),
		groupId: execution.groupId,
		root: execution.root,
		url: execution.url,
		crawlTimeStart: execution.crawlTimeStart,
		crawlTimeEnd: execution.crawlTimeEnd,
		status: execution.status,
		sitesCrawled: execution.sitesCrawled,
		links: execution.links,
		title: execution.title
	});
}

export async function PUT({ params, request }) {
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

	const updatedExecution = await executionModel.update(params.id, execution as Execution);

	if (isError(updatedExecution)) {
		throw error(updatedExecution.code, updatedExecution.message);
	}

	return json({
		id: updatedExecution.id?.toString(),
		ownerId: updatedExecution.ownerId.toString(),
		groupId: updatedExecution.groupId,
		root: updatedExecution.root,
		url: updatedExecution.url,
		crawlTimeStart: updatedExecution.crawlTimeStart,
		crawlTimeEnd: updatedExecution.crawlTimeEnd,
		status: updatedExecution.status,
		sitesCrawled: updatedExecution.sitesCrawled,
		links: updatedExecution.links,
		title: updatedExecution.title
	});
}

export async function DELETE({ params }) {
	const executionModel = new ExecutionModel();
	const result = await executionModel.delete(params.id);

	if (isError(result)) {
		throw error(result.code, result.message);
	}

	return json({
		success: result
	});
}
