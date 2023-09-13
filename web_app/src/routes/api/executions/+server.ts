import ExecutionModel from '$db/models/ExecutionModel';
import { json } from '@sveltejs/kit';

export async function GET() {
	const executionModel = new ExecutionModel();
	const data = await executionModel.getAll();

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
