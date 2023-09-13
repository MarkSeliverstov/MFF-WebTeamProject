import ExecutionModel from '$db/models/ExecutionModel';
import { json, error } from '@sveltejs/kit';

export async function GET({ params }) {
	const executionModel = new ExecutionModel();
	const data = await executionModel.getAllByWebsiteRecordId(params.id);

	return json(
		data.map((execution) => ({
			executionId: execution.executionId?.toString(),
			websiteRecordId: execution.websiteRecordId.toString(),
			crawlTimeStart: execution.crawlTimeStart,
			crawlTimeEnd: execution.crawlTimeEnd,
			status: execution.status,
			sitesCrawled: execution.sitesCrawled
		}))
	);
}

export async function DELETE({ params }) {
	const executionModel = new ExecutionModel();
	const result = await executionModel.deleteAllByWebsiteRecordId(params.id);

	if (!result) {
		throw error(404, 'No executions with this ID found');
	}

	return json({
		success: result
	});
}
