import ExecutionModel from '$db/models/ExecutionModel';
import { isError } from '$lib/types';
import { json, error } from '@sveltejs/kit';

export async function GET() {
	const executionModel = new ExecutionModel();
	const data = await executionModel.getCompletelyAll();
	if (isError(data)) {
		throw error(data.code, data.message);
	}
	return json(
		data.map((execution) => ({
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
		}))
	);
}
